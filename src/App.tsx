import React, { useMemo } from "react";
import "./App.css";
import { KeyboardControls } from "@react-three/drei";

import { CharacterResource } from "./types/characterResource";
import { keyboardMap } from "./constants/controls.constant.ts";
import {GameScene} from "./components/GameScene.tsx";

const App: React.FC = () => {
  const characterResource: CharacterResource = useMemo(
    () => ({
      name: "Default Character",
      url: "https://agent8-games.verse8.io/assets/3d/characters/space-marine.glb",
      animations: {
        IDLE: "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/idle.glb",
        WALK: "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/walk.glb",
        RUN: "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/run.glb",
        JUMP_UP:
          "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/jump-up.glb",
        FALL_IDLE:
          "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/fall-idle.glb",
        FALL_DOWN:
          "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/fall-down.glb",
        PUNCH:
          "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/punch.glb",
        MELEE_ATTACK:
          "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/melee-attack.glb",
        AIM: "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/aimming.glb",
        SHOOT:
          "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/shoot.glb",
        AIM_RUN:
          "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/shoot-run.glb",
        HIT: "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/hit.glb",
        DIE: "https://agent8-games.verse8.io/assets/3d/animations/mixamorig/death.glb",
      },
    }),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <KeyboardControls map={keyboardMap}>
        <GameScene characterResource={characterResource} />
      </KeyboardControls>
    </div>
  );
};

export default App;
