import { useCallback, useEffect, useRef, useState } from "react";
import { safeApiMessage } from "../services/api/config";

export default function useEntityCrud(dataSource, entityLabel) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mutationError, setMutationError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const abortRef = useRef(null);

  const load = useCallback(async () => {
    // Abort any in-flight request before starting a new one
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      setError(null);
      setItems(await dataSource.getAll(controller.signal));
    } catch (err) {
      // Intentional cancellation — not a real error
      if (err.name === 'AbortError') return;
      setError(safeApiMessage(err, `Failed to load ${entityLabel.toLowerCase()}`));
    } finally {
      setLoading(false);
    }
  }, [dataSource, entityLabel]);

  useEffect(() => {
    load();
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, [load]);

  const runMutation = async (operation) => {
    const controller = new AbortController();
    try {
      setIsSaving(true);
      setMutationError(null);
      return await operation(controller.signal);
    } catch (err) {
      if (err.name === 'AbortError') return null;
      const validation = Object.values(err.errors || {}).flat().join(" ");
      setMutationError(validation || safeApiMessage(err, `${entityLabel} operation failed`));
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const create = (data) => runMutation(async (signal) => {
    const created = await dataSource.create(data, signal);
    setItems((current) => [...current, created]);
    setIsCreateOpen(false);
    return created;
  });

  const save = (data, context) => runMutation(async (signal) => {
    const updated = await dataSource.update(context.entity.id, data, signal);
    setItems((current) => current.map((item) =>
      String(item.id) === String(updated.id) ? updated : item
    ));
    return updated;
  });

  const remove = (entity) => runMutation(async (signal) => {
    await dataSource.delete(entity.id, signal);
    setItems((current) => current.filter((item) => String(item.id) !== String(entity.id)));
  });

  return {
    items, loading, error, mutationError, isSaving, isCreateOpen,
    setIsCreateOpen, setMutationError, create, save, remove, reload: load,
  };
}
