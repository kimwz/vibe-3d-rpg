import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import Assets from "../../assets.json";

interface GrassProps {
  width?: number;
  density?: number;
}

export const Grass: React.FC<GrassProps> = ({ 
  width = 100, 
  density = 0.3 
}) => {
  // Load grass patch models
  const { scene: grassPatchScene } = useGLTF(Assets.objects.grassPatch.url);
  const { scene: grassPatchLargeScene } = useGLTF(Assets.objects.grassPatchLarge.url);
  
  // Calculate number of patches based on density and width
  // Reduced count since each patch will be larger
  const patchCount = Math.floor((width * width * density) / 100);
  
  // Generate grass patch positions
  const grassPatches = useMemo(() => {
    const patches = [];
    const halfWidth = width / 2;
    
    for (let i = 0; i < patchCount; i++) {
      // Random position within the width
      const x = Math.random() * width - halfWidth;
      const z = Math.random() * width - halfWidth;
      
      // Avoid placing grass in the center where the character starts
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      if (distanceFromCenter > 8) { // Increased clearance for larger patches
        // Random patch type and scale
        const patchType = Math.random() > 0.3 ? "small" : "large";
        // Base scale increased by 5x, with some variation
        const scale = (4 + Math.random() * 2);
        
        patches.push({
          position: [x, 0, z],
          rotation: [0, Math.random() * Math.PI * 2, 0],
          scale: [scale, scale, scale],
          type: patchType
        });
      }
    }
    
    return patches;
  }, [width, patchCount]);
  
  return (
    <group>
      {grassPatches.map((patch, index) => (
        <primitive
          key={index}
          object={SkeletonUtils.clone(
            patch.type === "small" ? grassPatchScene : grassPatchLargeScene
          )}
          position={patch.position as [number, number, number]}
          rotation={patch.rotation as [number, number, number]}
          scale={patch.scale as [number, number, number]}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
};

// Preload models
useGLTF.preload(Assets.objects.grassPatch.url);
useGLTF.preload(Assets.objects.grassPatchLarge.url);
