import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface BotaoCriarTemaProps {
  aoPresionar: () => void;
}

export function BotaoCriarTema({ aoPresionar }: BotaoCriarTemaProps) {
  return (
    <TouchableOpacity
      style={estilos.botao}
      onPress={aoPresionar}
      accessibilityRole="button"
      accessibilityLabel="Criar novo tema"
    >
      <Text style={estilos.texto}>+ Criar Novo Tema</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    borderWidth: 2,
    borderColor: "#9B59B6",
    borderStyle: "dashed",
    borderRadius: 12,
    backgroundColor: "#F3E8F9",
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 8,
  },
  texto: {
    color: "#9B59B6",
    fontSize: 16,
    fontWeight: "600",
  },
});
