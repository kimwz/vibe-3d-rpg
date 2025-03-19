import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import Assets from "../../assets.json";

interface RocksProps {
  count?: number;
  radius?: number;
}

export const Rocks: React.FC<RocksProps> = ({ 
  count = 15, 
  radius = 25 
}) => {
  // Load rock model
  const { scene: rockScene } = useGLTF(Assets.objects.rockFlatGrass.url);
  
  // Generate rock positions
  const rocks = useMemo(() => {
    const positions = [];
    
    for (let i = 0; i < count; i++) {
      // Random position in a circle
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.5 + Math.random() * 0.5); // Vary the radius
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      
      // Base scale increased by 5x, with some variation
      const scale = (2.5 + Math.random() * 2.5);
      
      positions.push({
        position: [x, 0, z],
        rotation: [0, Math.random() * Math.PI * 2, 0],
        scale: [scale, scale, scale]
      });
    }
    
    return positions;
  }, [count, radius]);
  
  return (
    <group>
      {rocks.map((rock, index) => (
        <primitive
          key={index}
          object={SkeletonUtils.clone(rockScene)}
          position={rock.position as [number, number, number]}
          rotation={rock.rotation as [number, number, number]}
          scale={rock.scale as [number, number, number]}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
};

// Preload model
useGLTF.preload(Assets.objects.rockFlatGrass.url);
