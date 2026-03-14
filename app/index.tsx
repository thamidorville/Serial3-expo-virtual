import { BotaoCriarTema } from "@/componentes/BotaoCriarTema";
import { CabecalhoSecao } from "@/componentes/CabecalhoSecao";
import { CabecalhoTela } from "@/componentes/CabecalhoTela";
import { CartaoTema } from "@/componentes/CartaoTema";
import temasMock from "@/dados/json/temas.json";
import { Tema } from "@/tipos/tema";
import { Alert, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const temas = temasMock as Tema[];

export default function TelaTemas() {
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
