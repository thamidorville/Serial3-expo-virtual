import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { PlaceholderAR } from "@/componentes/PlaceholderAR";

const PlaceholderScreen = () => {
  return <PlaceholderAR />;
};

const NativeARScreen = () => {
  const { urlGlb } = useLocalSearchParams();

  const Viro = require("@reactvision/react-viro");
  const {
    Viro3DObject,
    ViroAmbientLight,
    ViroARPlaneSelector,
    ViroARScene,
    ViroARSceneNavigator,
  } = Viro;
  const selectorRef = React.useRef<any>(null);

  const PlacementScene = (props?: any) => {
    const glbUrl = props?.sceneNavigator?.viroAppProps?.urlGlb ?? urlGlb;

    return (
      <ViroARScene
        anchorDetectionTypes={"PlanesHorizontal"}
        onAnchorFound={(a: any) => selectorRef.current?.handleAnchorFound(a)}
        onAnchorUpdated={(a: any) => selectorRef.current?.handleAnchorUpdated(a)}
        onAnchorRemoved={(a: any) =>
          a && selectorRef.current?.handleAnchorRemoved(a)
        }
      >
        <ViroARPlaneSelector
          ref={selectorRef}
          alignment="Horizontal"
          minWidth={0.15}
          minHeight={0.15}
          useActualShape={false}
        >
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject
            source={{ uri: glbUrl }}
            position={[0, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
            type="GLB"
            onClick={() => {
              console.log("touch");
            }}
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  };

  return (
    <ViroARSceneNavigator
      initialScene={{ scene: PlacementScene }}
      viroAppProps={{ urlGlb }}
    />
  );
};

const App = () => {
  return Platform.OS === "web" ? <PlaceholderScreen /> : <NativeARScreen />;
};

export default App;
