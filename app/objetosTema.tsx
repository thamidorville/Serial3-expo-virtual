import { BotaoAdicionarObjeto } from "@/componentes/BotaoAdicionarObjeto";
import { Tema } from "@/tipos/tema";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ObjetosTema() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tema: temaString } = useLocalSearchParams();
  
  const tema = temaString ? (JSON.parse(temaString as string) as Tema) : null;

  useLayoutEffect(() => {
    if (tema) {
      navigation.setOptions({
        title: tema.nome,
      });
    }
  }, [tema, navigation]);

  const handleObjetoPress = (urlGlb: string) => {
    router.push({
      pathname: "/exposicaoAR",
      params: {
        urlGlb
      },
    });
  };

  if (!tema) {
    return (
      <SafeAreaView>
        <Text>Tema não encontrado</Text>
      </SafeAreaView>
    );
  }

  type ItemGrid = { id: string; tipo: "botao" } | { id: string; tipo: "objeto"; nome: string; url_glb: string };

  const dadosGrid: ItemGrid[] = [];

  if (!tema.temaOriginal) {
    dadosGrid.push({ id: "botao-adicionar", tipo: "botao" });
  }

  tema.objetos.forEach((objeto) => {
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
