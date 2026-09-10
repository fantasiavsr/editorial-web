import { Users } from "lucide-react";

export default function DashboardProfilesContent() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-primary-black dark:text-primary-white">
        Profiles
      </h2>
      <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10">
        <div className="space-y-4 p-6">
          {[
            { name: "John Doe", email: "john@example.com", role: "Admin" },
            { name: "Jane Smith", email: "jane@example.com", role: "Editor" },
            { name: "Mike Johnson", email: "mike@example.com", role: "Viewer" },
          ].map((user, idx) => (
            <div key={idx} className="p-4 border border-primary-black/10 dark:border-primary-white/10 rounded-lg">
              <p className="font-medium text-primary-black dark:text-primary-white">{user.name}</p>
              <p className="text-sm text-primary-black/80 dark:text-primary-white/80">{user.email}</p>
              <p className="text-sm text-primary-orange">{user.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
