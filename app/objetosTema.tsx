import { BotaoAdicionarObjeto } from "@/componentes/BotaoAdicionarObjeto";
import { Objeto } from "@/tipos/objeto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function ObjetosTema() {
  const navigation = useNavigation();
  const router = useRouter();
  const { temaId, temaNome, original } = useLocalSearchParams();
  const database = useSQLiteContext();

  const idTema = temaId ? Number(temaId) : null;
  const temaOriginal = original === "1";

  const [objetos, setObjetos] = useState<Objeto[]>([]);
  const [nomeAtual, setNomeAtual] = useState(temaNome ? String(temaNome) : "Objetos");
  const [modalExcluirVisivel, setModalExcluirVisivel] = useState(false);

  useLayoutEffect(() => {
    if (!idTema) return;
    navigation.setOptions({
      title: nomeAtual,
      headerRight: temaOriginal
        ? undefined
        : () => (
            <View style={estilos.headerAcoes}>
              <TouchableOpacity
                style={estilos.headerBotao}
                onPress={() =>
                  router.push({
                    pathname: "/temaForm",
                    params: { temaId: String(idTema), temaNome: nomeAtual },
                  })
                }
                accessibilityRole="button"
                accessibilityLabel="Editar tema"
              >
                <Ionicons name="pencil-outline" size={22} color="#6B6B6B" />
              </TouchableOpacity>

              <TouchableOpacity
                style={estilos.headerBotao}
                onPress={() => setModalExcluirVisivel(true)}
                accessibilityRole="button"
                accessibilityLabel="Excluir tema"
              >
                <Ionicons name="trash-outline" size={22} color="#E74C3C" />
              </TouchableOpacity>
            </View>
          ),
    });
  }, [idTema, nomeAtual, temaOriginal, navigation]);

  const handleExcluirTema = async () => {
    if (!idTema) return;
    await database.runAsync(
      "DELETE FROM temas WHERE id = ? AND tema_original = 0",
      [idTema]
    );
    setModalExcluirVisivel(false);
    router.back();
  };

  const handleObjetoPress = (id: number, nome: string, urlGlb: string) => {
    router.push({
      pathname: "/objeto",
      params: {
        objetoId: String(id),
        nome,
        urlGlb,
        temaOriginal: String(temaOriginal),
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        if (!idTema) return;

        const resultadoObjetos = await database.getAllAsync<Objeto>(
          "SELECT * FROM objetos WHERE tema_id = ?",
          [idTema]
        );
        setObjetos(resultadoObjetos ?? []);

        // Recarrega o nome do tema para refletir edições feitas em temaForm
        const tema = await database.getFirstAsync<{ nome: string }>(
          "SELECT nome FROM temas WHERE id = ?",
          [idTema]
        );
        if (tema) setNomeAtual(tema.nome);
      };

      loadData();
    }, [idTema, database])
  );

  if (!idTema) {
    return (
      <SafeAreaView>
        <Text>ID do tema não informado</Text>
      </SafeAreaView>
    );
  }

  type ItemGrid =
    | { id: string; tipo: "botao" }
    | { id: string; tipo: "objeto"; nome: string; url_glb: string };

  const dadosGrid: ItemGrid[] = [];

  if (!temaOriginal) {
    dadosGrid.push({ id: "botao-adicionar", tipo: "botao" });
  }

  objetos.forEach((objeto) => {
    dadosGrid.push({
      id: String(objeto.id),
      tipo: "objeto",
      nome: objeto.nome,
      url_glb: objeto.url_glb,
    });
  });

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={dadosGrid}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={estilos.linha}
        contentContainerStyle={estilos.lista}
        renderItem={({ item }) => {
          if (item.tipo === "botao") {
            return (
              <View style={estilos.cardBotao}>
                <BotaoAdicionarObjeto
                  aoPresionar={() =>
                    router.push({
                      pathname: "/objetoForm",
                      params: { temaId: String(idTema) },
                    })
                  }
                />
              </View>
            );
          }

          return (
            <TouchableOpacity
              style={estilos.card}
              onPress={() =>
                handleObjetoPress(Number(item.id), item.nome, item.url_glb)
              }
            >
              <Image
                source={require("@/assets/images/miniatura-teste.png")}
                style={estilos.imagemObjeto}
              />
              <Text style={estilos.nomeObjeto}>{item.nome}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <Modal
        visible={modalExcluirVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalExcluirVisivel(false)}
      >
        <View style={estilos.modalFundo}>
          <View style={estilos.modalCard}>
            <Text style={estilos.modalTitulo}>Excluir Tema</Text>
            <Text style={estilos.modalMensagem}>
              Tem certeza que deseja excluir "{nomeAtual}"? Todos os objetos
              deste tema também serão excluídos.
            </Text>

            <View style={estilos.modalBotoes}>
              <TouchableOpacity
                style={estilos.modalBotaoCancelar}
                onPress={() => setModalExcluirVisivel(false)}
              >
                <Text style={estilos.modalTextoCancelar}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={estilos.modalBotaoExcluir}
                onPress={handleExcluirTema}
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
  lista: {
    padding: 16,
  },
  linha: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "47%",
    overflow: "hidden",
  },
  cardBotao: {
    width: "47%",
  },
  imagemObjeto: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  nomeObjeto: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    padding: 10,
    textAlign: "center",
  },
  headerAcoes: {
    flexDirection: "row",
    gap: 4,
  },
  headerBotao: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
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
