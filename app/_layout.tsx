import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[tema]/index" options={{ title: "Objetos do Tema" }} />
      <Stack.Screen name="exposicaoAR" options={{ title: "Exposição AR" }} />
    </Stack>
  )
}