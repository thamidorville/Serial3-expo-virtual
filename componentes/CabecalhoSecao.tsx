import { StyleSheet, Text } from "react-native";

interface CabecalhoSecaoProps {
  titulo: string;
}

export function CabecalhoSecao({ titulo }: CabecalhoSecaoProps) {
  return (
    <Text style={estilos.titulo}>{titulo.toUpperCase()}</Text>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6B6B6B",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
});
