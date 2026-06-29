import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Informacao = { titulo: string; conteudo: string };

const MAX_INFORMACOES = 5;

export default function ObjetoForm() {
  const router = useRouter();
  const navigation = useNavigation();
  const db = useSQLiteContext();
  const { temaId, objetoId, nome: nomeParam, urlGlb: urlGlbParam } =
    useLocalSearchParams<{
      temaId?: string;
      objetoId?: string;
      nome?: string;
      urlGlb?: string;
    }>();

  const modoEdicao = !!objetoId;

  const [nome, setNome] = useState(nomeParam ?? "");
  const [urlGlb, setUrlGlb] = useState(urlGlbParam ?? "");
  const [nomeArquivo, setNomeArquivo] = useState(
    urlGlbParam ? extrairNomeArquivo(urlGlbParam) : ""
  );
  const [informacoes, setInformacoes] = useState<Informacao[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [selecionandoArquivo, setSelecionandoArquivo] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: modoEdicao ? "Editar Objeto" : "Novo Objeto",
    });
  }, [modoEdicao, navigation]);

  useEffect(() => {
    if (!modoEdicao) return;
    const carregarInformacoes = async () => {
      const rows = await db.getAllAsync<Informacao>(
        "SELECT titulo, conteudo FROM informacoes_objeto WHERE objeto_id = ? ORDER BY id",
        [Number(objetoId)]
      );
      setInformacoes(rows);
    };
    carregarInformacoes();
  }, [modoEdicao, objetoId, db]);

  const selecionarArquivoGlb = async () => {
    setSelecionandoArquivo(true);
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: ["model/gltf-binary", "application/octet-stream", "*/*"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (resultado.canceled) return;

      const arquivo = resultado.assets[0];

      if (!arquivo.name.toLowerCase().endsWith(".glb")) {
        Alert.alert("Arquivo inválido", "Por favor, selecione um arquivo .glb");
        return;
      }

      const pastaDestino = FileSystem.documentDirectory + "objetos/";
      await FileSystem.makeDirectoryAsync(pastaDestino, { intermediates: true });
      const caminhoFinal = pastaDestino + arquivo.name;
      await FileSystem.copyAsync({ from: arquivo.uri, to: caminhoFinal });

      setUrlGlb(caminhoFinal);
      setNomeArquivo(arquivo.name);
    } catch {
      Alert.alert("Erro", "Não foi possível selecionar o arquivo.");
    } finally {
      setSelecionandoArquivo(false);
    }
  };

  const adicionarInformacao = () => {
    if (informacoes.length >= MAX_INFORMACOES) return;
    setInformacoes((prev) => [...prev, { titulo: "", conteudo: "" }]);
  };

  const removerInformacao = (indice: number) => {
    setInformacoes((prev) => prev.filter((_, i) => i !== indice));
  };

  const atualizarInformacao = (
    indice: number,
    campo: keyof Informacao,
    valor: string
  ) => {
    setInformacoes((prev) =>
      prev.map((info, i) => (i === indice ? { ...info, [campo]: valor } : info))
    );
  };

  const handleSalvar = async () => {
    const nomeTrimmed = nome.trim();
    if (!nomeTrimmed || !urlGlb) return;

    const informacoesFiltradas = informacoes.filter(
      (info) => info.titulo.trim() && info.conteudo.trim()
    );

    setSalvando(true);
    try {
      if (modoEdicao) {
        await db.withTransactionAsync(async () => {
          await db.runAsync(
            "UPDATE objetos SET nome = ?, url_glb = ? WHERE id = ?",
            [nomeTrimmed, urlGlb, Number(objetoId)]
          );
          await db.runAsync(
            "DELETE FROM informacoes_objeto WHERE objeto_id = ?",
            [Number(objetoId)]
          );
          for (const info of informacoesFiltradas) {
            await db.runAsync(
              "INSERT INTO informacoes_objeto (objeto_id, titulo, conteudo) VALUES (?, ?, ?)",
              [Number(objetoId), info.titulo.trim(), info.conteudo.trim()]
            );
          }
        });
      } else {
        await db.withTransactionAsync(async () => {
          await db.runAsync(
            "INSERT INTO objetos (tema_id, nome, url_glb) VALUES (?, ?, ?)",
            [Number(temaId), nomeTrimmed, urlGlb]
          );
          const row = await db.getFirstAsync<{ id: number }>(
            "SELECT last_insert_rowid() AS id"
          );
          for (const info of informacoesFiltradas) {
            await db.runAsync(
              "INSERT INTO informacoes_objeto (objeto_id, titulo, conteudo) VALUES (?, ?, ?)",
              [row!.id, info.titulo.trim(), info.conteudo.trim()]
            );
          }
        });
      }
      router.back();
    } catch {
      Alert.alert("Erro", "Não foi possível salvar o objeto. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  const podeSalvar = nome.trim().length > 0 && urlGlb.length > 0 && !salvando;

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView contentContainerStyle={estilos.scroll} keyboardShouldPersistTaps="handled">

        <Text style={estilos.label}>Nome do objeto</Text>
        <TextInput
          style={estilos.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Tyrannosaurus Rex, Fusca 1972..."
          placeholderTextColor="#AAAAAA"
          autoFocus
        />

        <Text style={estilos.label}>Arquivo 3D (.glb)</Text>
        <TouchableOpacity
          style={estilos.botaoArquivo}
          onPress={selecionarArquivoGlb}
          disabled={selecionandoArquivo}
        >
          {selecionandoArquivo ? (
            <ActivityIndicator color="#9B59B6" />
          ) : (
            <Text style={estilos.botaoArquivoTexto}>
              {nomeArquivo || "Selecionar arquivo .glb"}
            </Text>
          )}
        </TouchableOpacity>
        {!nomeArquivo && (
          <Text style={estilos.dica}>
            Selecione um modelo 3D do seu dispositivo. Para o objeto ser exibido no tamanho desejado, o modelo deve ser modelado 10x maior que o objeto real.
          </Text>
        )}

        <View style={estilos.cabecalhoInformacoes}>
          <Text style={estilos.label}>
            Informações ({informacoes.length}/{MAX_INFORMACOES})
          </Text>
          <TouchableOpacity
            onPress={adicionarInformacao}
            disabled={informacoes.length >= MAX_INFORMACOES}
          >
            <Text
              style={[
                estilos.botaoAdicionarInfo,
                informacoes.length >= MAX_INFORMACOES &&
                  estilos.botaoAdicionarInfoDesabilitado,
              ]}
            >
              + Adicionar
            </Text>
          </TouchableOpacity>
        </View>

        {informacoes.map((info, indice) => (
          <View key={indice} style={estilos.blocoInfo}>
            <View style={estilos.blocoInfoCabecalho}>
              <Text style={estilos.blocoInfoNumero}>Info {indice + 1}</Text>
              <TouchableOpacity onPress={() => removerInformacao(indice)}>
                <Text style={estilos.botaoRemover}>✕</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={estilos.input}
              value={info.titulo}
              onChangeText={(v) => atualizarInformacao(indice, "titulo", v)}
              placeholder="Título"
              placeholderTextColor="#AAAAAA"
            />
            <TextInput
              style={[estilos.input, estilos.inputMultilinha]}
              value={info.conteudo}
              onChangeText={(v) => atualizarInformacao(indice, "conteudo", v)}
              placeholder="Conteúdo (máx. 140 caracteres)"
              placeholderTextColor="#AAAAAA"
              maxLength={140}
              multiline
            />
            <Text style={estilos.contador}>{info.conteudo.length}/140</Text>
          </View>
        ))}

        <TouchableOpacity
          style={[estilos.botaoSalvar, !podeSalvar && estilos.botaoDesabilitado]}
          onPress={handleSalvar}
          disabled={!podeSalvar}
          accessibilityRole="button"
          accessibilityLabel="Salvar objeto"
        >
          {salvando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={estilos.botaoSalvarTexto}>Salvar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function extrairNomeArquivo(caminho: string): string {
  const partes = caminho.replace(/\\/g, "/").split("/");
  return partes[partes.length - 1] ?? "";
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    padding: 24,
    paddingBottom: 48,
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
    fontSize: 15,
    color: "#1A1A1A",
    backgroundColor: "#FAFAFA",
    marginBottom: 20,
  },
  inputMultilinha: {
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 4,
  },
  botaoArquivo: {
    borderWidth: 1.5,
    borderColor: "#9B59B6",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#F9F3FC",
    marginBottom: 4,
  },
  botaoArquivoTexto: {
    color: "#9B59B6",
    fontSize: 14,
    fontWeight: "600",
  },
  dica: {
    fontSize: 12,
    color: "#AAAAAA",
    marginBottom: 20,
  },
  cabecalhoInformacoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  botaoAdicionarInfo: {
    color: "#9B59B6",
    fontSize: 14,
    fontWeight: "600",
  },
  botaoAdicionarInfoDesabilitado: {
    opacity: 0.4,
  },
  blocoInfo: {
    backgroundColor: "#F9F3FC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8D5F5",
  },
  blocoInfoCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  blocoInfoNumero: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7B2D8B",
  },
  botaoRemover: {
    fontSize: 16,
    color: "#E74C3C",
    fontWeight: "700",
    paddingHorizontal: 4,
  },
  contador: {
    fontSize: 11,
    color: "#AAAAAA",
    textAlign: "right",
    marginBottom: 4,
  },
  botaoSalvar: {
    backgroundColor: "#9B59B6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
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
