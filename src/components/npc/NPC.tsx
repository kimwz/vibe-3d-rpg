import React, { useRef, useEffect, useState } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { useGLTF, useAnimations, Text } from "@react-three/drei";
import { Group, AnimationMixer, AnimationAction } from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import Assets from "../../assets.json";

// Instead of using TextGeometry directly, we'll use the Text component from drei

interface NPCProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  modelType: "soldier" | "deadpool" | "knight" | "gunslinger";
  name: string;
}

export const NPC: React.FC<NPCProps> = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  modelType,
  name,
}) => {
  const group = useRef<Group>(null);
  const [mixer, setMixer] = useState<AnimationMixer | null>(null);
  const [idleAction, setIdleAction] = useState<AnimationAction | null>(null);
  
  // Get model URL from assets.json
  const modelUrl = Assets.characters[modelType].url;
  const idleAnimationUrl = Assets.animations.idle.url;
  
  // Load model and animations
  const { scene: modelScene } = useGLTF(modelUrl);
  const { animations: idleAnimations } = useGLTF(idleAnimationUrl);
  
  useEffect(() => {
    if (!group.current) return;
    
    // Clone the model to avoid sharing skeleton with other instances
    const clonedScene = SkeletonUtils.clone(modelScene);
    
    // Clear existing children and add the cloned scene
    while (group.current.children.length > 0) {
      group.current.remove(group.current.children[0]);
    }
    group.current.add(clonedScene);
    
    // Create a new animation mixer
    const newMixer = new AnimationMixer(clonedScene);
    setMixer(newMixer);
    
    // Create idle animation action
    if (idleAnimations && idleAnimations.length > 0) {
      const action = newMixer.clipAction(idleAnimations[0]);
      action.play();
      setIdleAction(action);
    }
    
    return () => {
      // Clean up
      newMixer.stopAllAction();
    };
  }, [modelScene, idleAnimations]);
  
  // Update animation mixer on each frame
  useFrame((_, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });
  
  return (
    <group 
      ref={group} 
      position={position} 
      rotation={[rotation[0], rotation[1], rotation[2]]} 
      scale={[scale, scale, scale]}
    >
      {/* Name label above NPC using drei's Text component instead of TextGeometry */}
      <Text
        position={[0, 2, 0]}
        color="white"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};
