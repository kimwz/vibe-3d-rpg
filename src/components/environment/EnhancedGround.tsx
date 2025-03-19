import React from "react";
import { MeshStandardMaterial } from "three";

interface EnhancedGroundProps {
  size?: number;
}

export const EnhancedGround: React.FC<EnhancedGroundProps> = ({ 
  size = 100 
}) => {
  // Create a more visually appealing ground material
  const groundMaterial = new MeshStandardMaterial({
    color: "#2e6b30",
    roughness: 0.8,
    metalness: 0.1
  });
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
      <planeGeometry args={[size, size, 32, 32]} />
      <primitive object={groundMaterial} attach="material" />
    </mesh>
  );
};
