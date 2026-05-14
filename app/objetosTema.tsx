import { BotaoAdicionarObjeto } from "@/componentes/BotaoAdicionarObjeto";
import { Objeto } from "@/tipos/objeto";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useLayoutEffect } from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ObjetosTema() {
  const navigation = useNavigation();
  const router = useRouter();
  const { temaId, temaNome, original } = useLocalSearchParams();
  const database = useSQLiteContext();

  const idTema = temaId ? Number(temaId) : null;
  const temaOriginal = original === 'true';

  const [objetos, setObjetos] = React.useState<Objeto[]>([]);

  useLayoutEffect(() => {
    if (idTema) {
      navigation.setOptions({
        title: temaNome ? String(temaNome) : "Objetos",
      });
    }
  }, [idTema, temaNome, navigation]);

  const handleObjetoPress = (urlGlb: string) => {
    router.push({
      pathname: "/exposicaoAR",
      params: {
        urlGlb,
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        if (!idTema) return;
        const resultadoObjetos = await database.getAllAsync<Objeto>(
          `SELECT * FROM objetos WHERE tema_id = ${idTema}`
        );
        setObjetos(resultadoObjetos ?? []);
      };

      loadData();
    }, [idTema])
  );

  if (!idTema) {
    return (
      <SafeAreaView>
        <Text>ID do tema não informado</Text>
      </SafeAreaView>
    );
  }

  type ItemGrid = { id: string; tipo: "botao" } | { id: string; tipo: "objeto"; nome: string; url_glb: string };

  const dadosGrid: ItemGrid[] = [];

  if (!temaOriginal) {
    dadosGrid.push({ id: "botao-adicionar", tipo: "botao" });
  }

  objetos.forEach((objeto) => {
    dadosGrid.push({ id: String(objeto.id), tipo: "objeto", nome: objeto.nome, url_glb: objeto.url_glb });
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
                <BotaoAdicionarObjeto aoPresionar={() => Alert.alert("Adicionar Objeto")} />
              </View>
            );
          }

          return (
            <TouchableOpacity
              style={estilos.card}
              onPress={() => handleObjetoPress(item.url_glb)}
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
});
