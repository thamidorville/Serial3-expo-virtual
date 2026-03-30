import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARPlaneSelector,
  ViroARScene,
  ViroARSceneNavigator
} from "@reactvision/react-viro";
import { useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";


const PlacementScene = (props?: any) => {
  const selectorRef = useRef<ViroARPlaneSelector>(null);

  const { urlGlb } = props.sceneNavigator.viroAppProps;

  return (
    <ViroARScene
      anchorDetectionTypes={"PlanesHorizontal"}
      onAnchorFound={(a) => selectorRef.current?.handleAnchorFound(a)}
      onAnchorUpdated={(a) => selectorRef.current?.handleAnchorUpdated(a)}
      onAnchorRemoved={(a) => a && selectorRef.current?.handleAnchorRemoved(a)}
    >
      <ViroARPlaneSelector
        ref={selectorRef}
        alignment="Horizontal"
        minWidth={0.15}
        minHeight={0.15}
        useActualShape={false}
      >
        <ViroAmbientLight
          color="#FFFFFF"
        />
        <Viro3DObject
          source={{ uri: urlGlb }}
          position={[0, 0, 0]}
          scale={[0.1, 0.1, 0.1]}
          type="GLB"
          onClick={() => {
            console.log("touch");
          }}        />
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

const App = () => {
  const { urlGlb } = useLocalSearchParams();

  return (
    <ViroARSceneNavigator
      initialScene={{ scene: PlacementScene }}
      viroAppProps={{ urlGlb }}
    />
  );
}

export default App;