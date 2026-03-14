import miniaturas from "@/assets/images/miniaturas";
import { Tema } from "@/tipos/tema";
import { Image, StyleSheet, Text, View } from "react-native";

interface CartaoTemaProps {
  tema: Tema;
}

export function CartaoTema({ tema }: CartaoTemaProps) {
  return (
    <View style={estilos.cartao}>
      <View style={estilos.miniatura}>
        {miniaturas[tema.miniatura] ? (
          <Image source={miniaturas[tema.miniatura]} style={estilos.imagem} />
        ) : (
          <View style={estilos.imagemVazia} />
        )}
      </View>

      <View style={estilos.info}>
        <Text style={estilos.nome}>{tema.nome}</Text>
        {tema.categoria === "original" && (
          <View style={estilos.badge}>
            <Text style={estilos.badgeTexto}>Serial3 Originals</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  miniatura: {
    width: 76,
    height: 76,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 16,
  },
  imagem: {
    width: "100%",
    height: "100%",
  },
  imagemVazia: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#6B21A8",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeTexto: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
});
