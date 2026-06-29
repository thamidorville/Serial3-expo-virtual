import { FabQrCode } from "@/componentes/FabQrCode";
import { Stack, useSegments } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { inicializarBancoDeDados } from "@/dados/db/init";

// Componente filho para garantir acesso ao contexto de navegação
function FabCondicional() {
  const segments = useSegments();
  const tela = segments[segments.length - 1];
  if (tela === "exposicaoAR" || tela === "qrCode") return null;
  return <FabQrCode />;
}

export default function Layout() {
  return (
    <>
      <SQLiteProvider databaseName="exposition.db" onInit={inicializarBancoDeDados}>
        <View style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="objetosTema" options={{ title: "Objetos do Tema" }} />
            <Stack.Screen name="objeto" options={{ title: "Objeto" }} />
            <Stack.Screen name="exposicaoAR" options={{ title: "Exposição AR" }} />
            <Stack.Screen name="temaForm" options={{ title: "Novo Tema" }} />
            <Stack.Screen name="objetoForm" options={{ title: "Novo Objeto" }} />
            <Stack.Screen name="qrCode" options={{ title: "Código AR" }} />
          </Stack>
          <FabCondicional />
        </View>
      </SQLiteProvider>
      <StatusBar style="auto" />
    </>
  );
}
