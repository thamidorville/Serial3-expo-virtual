import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useLayoutEffect, useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TelaObjeto() {
  const router = useRouter();
  const navigation = useNavigation();
  const database = useSQLiteContext();
  const { objetoId, nome, urlGlb, temaOriginal } = useLocalSearchParams();

  const id = Number(objetoId);
  const nomeObjeto = String(nome ?? "Objeto");
  const urlModelo = String(urlGlb ?? "");
  const ehTemaOriginal = temaOriginal === "true";

  const [modalVisivel, setModalVisivel] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: nomeObjeto });
  }, [nomeObjeto, navigation]);

  const handleVisualizarAR = () => {
    router.push({
      pathname: "/exposicaoAR",
      params: { urlGlb: urlModelo },
    });
  };

  const handleExcluirObjeto = async () => {
    await database.runAsync("DELETE FROM objetos WHERE id = ?", [id]);
    setModalVisivel(false);
    router.back();
  };

  const handleEditarObjeto = () => {
    // Funcionalidade será implementada em breve
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.conteudo}>
        <View style={estilos.imagemContainer}>
          <Image
            source={require("@/assets/images/miniatura-teste.png")}
            style={estilos.imagem}
            resizeMode="contain"
          />
        </View>

        <Text style={estilos.nomeObjeto}>{nomeObjeto}</Text>

        {!ehTemaOriginal && (
          <View style={estilos.iconesContainer}>
            <TouchableOpacity
              style={estilos.botaoIcone}
              onPress={handleEditarObjeto}
              accessibilityRole="button"
              accessibilityLabel="Editar objeto"
            >
              <Ionicons name="pencil-outline" size={22} color="#6B6B6B" />
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.botaoIcone}
              onPress={() => setModalVisivel(true)}
              accessibilityRole="button"
              accessibilityLabel="Excluir objeto"
            >
              <Ionicons name="trash-outline" size={22} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        )}

        <View style={estilos.botoesContainer}>
          <TouchableOpacity
            style={estilos.botaoAR}
            onPress={handleVisualizarAR}
            accessibilityRole="button"
            accessibilityLabel="Visualizar objeto em realidade aumentada"
          >
            <Text style={estilos.botaoARTexto}>Visualizar em AR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={estilos.modalFundo}>
          <View style={estilos.modalCard}>
            <Text style={estilos.modalTitulo}>Excluir Objeto</Text>
            <Text style={estilos.modalMensagem}>
              Tem certeza que deseja excluir "{nomeObjeto}"?
            </Text>

            <View style={estilos.modalBotoes}>
              <TouchableOpacity
                style={estilos.modalBotaoCancelar}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={estilos.modalTextoCancelar}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={estilos.modalBotaoExcluir}
                onPress={handleExcluirObjeto}
              >
                <Text style={estilos.modalTextoExcluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: "center",
  },
  imagemContainer: {
    width: "100%",
    aspectRatio: 1,
    maxHeight: 320,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 24,
  },
  imagem: {
    width: "80%",
    height: "80%",
  },
  nomeObjeto: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 16,
  },
  iconesContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  botaoIcone: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  botoesContainer: {
    width: "100%",
    gap: 12,
  },
  botaoAR: {
    backgroundColor: "#9B59B6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  botaoARTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  modalMensagem: {
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "center",
    marginBottom: 24,
  },
  modalBotoes: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  modalBotaoCancelar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  modalTextoCancelar: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B6B6B",
  },
  modalBotaoExcluir: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#E74C3C",
    alignItems: "center",
  },
  modalTextoExcluir: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
