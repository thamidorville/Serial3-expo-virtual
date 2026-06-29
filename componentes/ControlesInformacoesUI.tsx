import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ModoInformacoes } from "./PainelInformacoesAR";

interface ControlesInformacoesUIProps {
  modo: ModoInformacoes;
  aoAbrir: () => void;
  aoFechar: () => void;
}

/**
 * Overlay de UI normal (React Native) na base da tela AR.
 * No modo "fechado" mostra "Visualizar informações"; nos demais, "Fechar".
 */
export function ControlesInformacoesUI({
  modo,
  aoAbrir,
  aoFechar,
}: ControlesInformacoesUIProps) {
  const insets = useSafeAreaInsets();
  const fechado = modo === "fechado";

  return (
    <TouchableOpacity
      style={[
        estilos.botao,
        fechado ? estilos.botaoAbrir : estilos.botaoFechar,
        { bottom: insets.bottom + 24 },
      ]}
      onPress={fechado ? aoAbrir : aoFechar}
      accessibilityRole="button"
      accessibilityLabel={
        fechado ? "Visualizar informações do objeto" : "Fechar informações"
      }
    >
      <Text style={estilos.texto}>
        {fechado ? "Visualizar informações" : "Fechar"}
      </Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    position: "absolute",
    alignSelf: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#9B59B6",
    alignItems: "center",
  },
  botaoAbrir: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  botaoFechar: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  texto: {
    color: "#FFFFFF",
    fontFamily: "monospace",
    fontSize: 16,
    fontWeight: "700",
  },
});
