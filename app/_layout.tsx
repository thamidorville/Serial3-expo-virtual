import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";

import { inicializarBancoDeDados } from "@/dados/db/init";

export default function Layout() {
  return (
    <>
      <SQLiteProvider databaseName="exposition.db" onInit={inicializarBancoDeDados}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="objetosTema" options={{ title: "Objetos do Tema" }} />
          <Stack.Screen name="exposicaoAR" options={{ title: "Exposição AR" }} />
        </Stack>
      </SQLiteProvider>
      <StatusBar style="auto" />
    </>
  );
}