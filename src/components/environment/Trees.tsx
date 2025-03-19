import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import Assets from "../../assets.json";

interface TreesProps {
  count?: number;
  radius?: number;
}

export const Trees: React.FC<TreesProps> = ({ 
  count = 20, 
  radius = 30 
}) => {
  // Load tree models
  const { scene: treeScene } = useGLTF(Assets.objects.tree.url);
  const { scene: tallTreeScene } = useGLTF(Assets.objects.tallTree.url);
  
  // Generate tree positions
  const trees = useMemo(() => {
    const positions = [];
    
    for (let i = 0; i < count; i++) {
      // Random position in a circle
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.6 + Math.random() * 0.4); // Vary the radius
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      
      // Random tree type and scale
      const treeType = Math.random() > 0.5 ? "tree" : "tallTree";
      // Base scale increased by 5x, with some variation
      const scale = (5 + Math.random() * 2.5);
      
      positions.push({
        position: [x, 0, z],
        rotation: [0, Math.random() * Math.PI * 2, 0],
        scale: [scale, scale, scale],
        type: treeType
      });
    }
    
    return positions;
  }, [count, radius]);
  
  return (
    <group>
      {trees.map((tree, index) => (
        <primitive
          key={index}
          object={SkeletonUtils.clone(tree.type === "tree" ? treeScene : tallTreeScene)}
          position={tree.position as [number, number, number]}
          rotation={tree.rotation as [number, number, number]}
          scale={tree.scale as [number, number, number]}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
};

// Preload models
useGLTF.preload(Assets.objects.tree.url);
useGLTF.preload(Assets.objects.tallTree.url);
