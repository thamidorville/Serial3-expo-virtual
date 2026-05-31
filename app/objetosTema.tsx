import { Objeto } from "@/tipos/objeto";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ObjetosTema() {
  const navigation = useNavigation();
  const router = useRouter();
  const { temaId, temaNome } = useLocalSearchParams();
  const database = useSQLiteContext();

  const idTema = temaId ? Number(temaId) : null;

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
        const resultado = await database.getAllAsync<Objeto>(
          `SELECT * FROM objetos WHERE tema_id = ${idTema}`
        );
        setObjetos(resultado ?? []);
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

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView>
        <View style={estilos.containerObjetos}>
          {objetos.map((objeto) => (
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
