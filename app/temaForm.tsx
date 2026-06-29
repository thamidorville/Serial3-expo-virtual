import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TemaForm() {
  const router = useRouter();
  const navigation = useNavigation();
  const db = useSQLiteContext();
  const { temaId, temaNome } = useLocalSearchParams<{
    temaId?: string;
    temaNome?: string;
  }>();

  const modoEdicao = !!temaId;
  const [nome, setNome] = useState(temaNome ?? "");
  const [salvando, setSalvando] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: modoEdicao ? "Editar Tema" : "Novo Tema",
    });
  }, [modoEdicao, navigation]);

  const handleSalvar = async () => {
    const nomeTrimmed = nome.trim();
    if (!nomeTrimmed) return;

    setSalvando(true);
    try {
      if (modoEdicao) {
        await db.runAsync(
          "UPDATE temas SET nome = ? WHERE id = ? AND tema_original = 0",
          [nomeTrimmed, Number(temaId)]
        );
      } else {
        await db.runAsync("INSERT INTO temas (nome) VALUES (?)", [nomeTrimmed]);
      }
      router.back();
    } catch {
      Alert.alert("Erro", "Não foi possível salvar o tema. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  const podeSalvar = nome.trim().length > 0 && !salvando;

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.conteudo}>
        <Text style={estilos.label}>Nome do tema</Text>
        <TextInput
          style={estilos.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Dinossauros, Carros históricos..."
          placeholderTextColor="#AAAAAA"
          autoFocus
          returnKeyType="done"
          onSubmitEditing={handleSalvar}
        />

        <TouchableOpacity
          style={[estilos.botaoSalvar, !podeSalvar && estilos.botaoDesabilitado]}
          onPress={handleSalvar}
          disabled={!podeSalvar}
          accessibilityRole="button"
          accessibilityLabel="Salvar tema"
        >
          {salvando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={estilos.botaoSalvarTexto}>Salvar</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  conteudo: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1A1A1A",
    backgroundColor: "#FAFAFA",
    marginBottom: 24,
  },
  botaoSalvar: {
    backgroundColor: "#9B59B6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  botaoDesabilitado: {
    opacity: 0.5,
  },
  botaoSalvarTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
