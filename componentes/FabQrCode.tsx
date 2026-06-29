import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function FabQrCode() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={[estilos.fab, { bottom: 28 + insets.bottom }]}
      onPress={() => router.push("/qrCode")}
      accessibilityRole="button"
      accessibilityLabel="Ver QR Code AR"
    >
      <Ionicons name="qr-code-outline" size={20} color="#FFFFFF" />
      <Text style={estilos.texto}>QR Code</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 28,
    right: 24,
    backgroundColor: "#9B59B6",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  texto: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
