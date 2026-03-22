import {
  ViroARPlaneSelector,
  ViroARScene,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
} from "@reactvision/react-viro";
import React, { useRef } from "react";

ViroMaterials.createMaterials({
  boxMaterial: {
    diffuseColor: "#ff8a3d",
  },
});

const PlacementScene = () => {
  const selectorRef = useRef<ViroARPlaneSelector>(null);

  return (
    <ViroARScene
      anchorDetectionTypes={["PlanesHorizontal", "PlanesVertical"]}
      onAnchorFound={(a) => selectorRef.current?.handleAnchorFound(a)}
      onAnchorUpdated={(a) => selectorRef.current?.handleAnchorUpdated(a)}
      onAnchorRemoved={(a) => a && selectorRef.current?.handleAnchorRemoved(a)}
    >
      <ViroARPlaneSelector
        ref={selectorRef}
        alignment="Horizontal"
        minWidth={0.25}
        minHeight={0.25}
        useActualShape={false}
        
        hideOverlayOnSelection={true}
        onPlaneDetected={(anchor) => {
          const width = anchor.width ?? 0;
          const height = anchor.height ?? 0;
          return width >= 0.25 && height >= 0.25;
        }}
        onPlaneSelected={(anchor, tapPosition) => {
          console.log("Plane selected:", anchor.anchorId);
          if (tapPosition) {
            console.log("Tap position:", tapPosition);
          }
        }}
      >
        <ViroBox
          position={[0, 0.05, 0]}
          scale={[0.1, 0.1, 0.1]}
          materials={["boxMaterial"]}
        />
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

const App = () => (
  <ViroARSceneNavigator initialScene={{ scene: PlacementScene }} />
);

export default App;