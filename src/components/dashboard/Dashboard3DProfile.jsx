import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function ProfileSphere({ mouse }) {
  const sphereRef = useRef();

  useFrame(() => {
    if (sphereRef.current && mouse.current) {
      sphereRef.current.rotation.y += 0.005;
      sphereRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial
        color="#fe7141"
        roughness={0.3}
        metalness={0.6}
        emissive="#d9572b"
        emissiveIntensity={0.15}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

function OrbitRing() {
  const ringRef = useRef();
  useFrame(({ clock }) => {
    if (ringRef.current) ringRef.current.rotation.y = clock.getElapsedTime() * 0.15;
  });
  return (
    <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[1.8, 0.05, 8, 64]} />
      <meshStandardMaterial color="#fe7141" emissive="#d9572b" emissiveIntensity={0.3} transparent opacity={0.4} />
    </mesh>
  );
}

export default function Dashboard3DProfile() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div className="bg-gradient-to-br from-primary-black/5 dark:from-primary-dark-card/50 to-primary-white/50 dark:to-primary-dark-card/30 rounded-xl border border-primary-black/10 dark:border-primary-white/10 p-6 overflow-hidden relative">
      <h3 className="text-lg font-bold text-primary-black dark:text-primary-white mb-2">Profile Shield</h3>
      <p className="text-xs text-primary-black/60 dark:text-primary-white/60 mb-4">Interactive security visualization</p>

      <div className="relative" style={{ height: "280px" }}>
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[2, 2, 2]} intensity={1} />
          <pointLight position={[-2, -2, 2]} intensity={0.5} />
          <ProfileSphere mouse={mouse} />
          <OrbitRing />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>
    </div>
  );
}
