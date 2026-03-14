import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CabecalhoTelaProps {
  titulo: string;
  textoBotao?: string;
  aoPressionarBotao?: () => void;
}

export function CabecalhoTela({ titulo, textoBotao, aoPressionarBotao }: CabecalhoTelaProps) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{titulo}</Text>
      {textoBotao && (
        <TouchableOpacity onPress={aoPressionarBotao} accessibilityRole="button">
          <Text style={estilos.botaoTexto}>{textoBotao}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9B59B6",
  },
});
