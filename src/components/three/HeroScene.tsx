import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../layout/theme-context";

/**
 * A subtle, GPU-friendly hero backdrop.
 *
 * - Geometry: a dense plane wireframe deformed by simplex-style noise.
 * - The wave reacts to pointer (parallax) and slowly rotates with time.
 * - Color is theme-aware (accent in both modes).
 *
 * Performance:
 * - 80x80 segments (~13k tris) — fine on integrated GPUs.
 * - dpr clamped to [1, 1.5] to avoid retina blowups.
 * - `frameloop="demand"` is intentionally NOT used because we animate every frame.
 */

function Wave() {
  const { theme } = useTheme();
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(28, 16, 80, 80);
    return geom;
  }, []);

  // Color updates with theme
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: theme === "dark" ? "#8a6eff" : "#583cdc",
      wireframe: true,
      transparent: true,
      opacity: theme === "dark" ? 0.55 : 0.35,
    });
  }, [theme]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const mesh = meshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;

    // Pointer parallax (lerped towards normalized cursor)
    pointer.current.x +=
      (state.pointer.x - pointer.current.x) * Math.min(1, delta * 3);
    pointer.current.y +=
      (state.pointer.y - pointer.current.y) * Math.min(1, delta * 3);

    group.rotation.x = -1.0 + pointer.current.y * 0.18;
    group.rotation.z = pointer.current.x * 0.08;

    // Animate vertices
    const pos = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const segX = 80 + 1;
    for (let i = 0; i < arr.length; i += 3) {
      const xi = (i / 3) % segX;
      const yi = Math.floor(i / 3 / segX);
      const x = (xi / 80) * 28 - 14;
      const y = (yi / 80) * 16 - 8;
      // Layered sine waves; cheap stand-in for noise
      arr[i + 2] =
        Math.sin(x * 0.4 + t * 0.6) * 0.45 +
        Math.cos(y * 0.5 + t * 0.5) * 0.45 +
        Math.sin((x + y) * 0.35 + t * 0.8) * 0.25;
    }
    pos.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]} scale={Math.max(1, viewport.width / 18)}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
    </group>
  );
}

interface HeroSceneProps {
  className?: string;
}

export default function HeroScene({ className }: HeroSceneProps) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Wave />
      </Canvas>
    </div>
  );
}
