import { Tema } from "@/tipos/tema";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView>        
        <View style={estilos.containerObjetos}>
          {tema.objetos.map((objeto) => (
            <TouchableOpacity
              key={objeto.id}
              style={estilos.card}
              onPress={() => handleObjetoPress(objeto.url_glb)}
            >
              <Text style={estilos.nomeObjeto}>{objeto.nome}</Text>
              <Text style={estilos.textoCard}>Toque para visualizar em AR</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  categoria: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textTransform: "capitalize",
  },
  containerObjetos: {
    gap: 12,
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  nomeObjeto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  textoCard: {
    fontSize: 12,
    color: "#999",
  },
});
