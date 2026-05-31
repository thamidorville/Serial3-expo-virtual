import { BotaoCriarTema } from "@/componentes/BotaoCriarTema";
import { CabecalhoSecao } from "@/componentes/CabecalhoSecao";
import { CabecalhoTela } from "@/componentes/CabecalhoTela";
import { CartaoTema } from "@/componentes/CartaoTema";
import { Tema } from "@/tipos/tema";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//const temas = temasMock as Tema[];

export default function TelaTemas() {
  const [temas, setTemas] = React.useState<Tema[]>([]);
  const database = useSQLiteContext();
  useFocusEffect(
    useCallback(() => {
      loadData(); 
    }, [])
  );

  const loadData = async () => {
    const resultado = await database.getAllAsync<Tema> ("SELECT * FROM temas")
    setTemas(resultado);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={temas}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <>
            <CabecalhoTela
              titulo="Temas"
              textoBotao="Editar"
              aoPressionarBotao={() => Alert.alert("Editar")}
            />
            <CabecalhoSecao titulo="Explorar" />
          </>
        }
        renderItem={({ item }) => <CartaoTema tema={item} />}
        ListFooterComponent={
          <BotaoCriarTema aoPresionar={() => Alert.alert("Criar Novo Tema")} />
        }
        contentContainerStyle={estilos.lista}
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
});
function loadData() {
  throw new Error("Function not implemented.");
}

