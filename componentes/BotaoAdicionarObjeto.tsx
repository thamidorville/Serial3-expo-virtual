import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface BotaoAdicionarObjetoProps {
  aoPresionar: () => void;
}

export function BotaoAdicionarObjeto({ aoPresionar }: BotaoAdicionarObjetoProps) {
  return (
    <TouchableOpacity
      style={estilos.botao}
      onPress={aoPresionar}
      accessibilityRole="button"
      accessibilityLabel="Adicionar novo objeto"
    >
      <Text style={estilos.icone}>+</Text>
      <Text style={estilos.texto}>Adicionar Objeto</Text>
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
    width: "100%",
    height: 158,
    justifyContent: "center",
    alignItems: "center",
  },
  icone: {
    fontSize: 28,
    color: "#9B59B6",
    fontWeight: "300",
    marginBottom: 4,
  },
  texto: {
    fontSize: 12,
    color: "#9B59B6",
    fontWeight: "600",
  },
});
