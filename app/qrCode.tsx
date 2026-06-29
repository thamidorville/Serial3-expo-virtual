import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 5 cm em dp: 1dp = 1/160 polegada → 5cm / 2.54 * 160 ≈ 315 dp
const TAMANHO_QR_DP = Math.round((5 / 2.54) * 160);

async function obterUriLocal(): Promise<string> {
  const asset = Asset.fromModule(require("@/assets/images/qr_code.png"));
  await asset.downloadAsync();
  return asset.localUri!;
}

export default function TelaQrCode() {
  const [compartilhando, setCompartilhando] = useState(false);
  const [gerandoPdf, setGerandoPdf] = useState(false);

  const handleCompartilharImagem = async () => {
    setCompartilhando(true);
    try {
      const uri = await obterUriLocal();
      await Sharing.shareAsync(uri, { mimeType: "image/png" });
    } catch {
      Alert.alert("Erro", "Não foi possível compartilhar a imagem.");
    } finally {
      setCompartilhando(false);
    }
  };

  const handleGerarPdf = async () => {
    setGerandoPdf(true);
    try {
      const uri = await obterUriLocal();
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        font-family: sans-serif;
      }
      p {
        font-size: 13px;
        text-align: center;
        color: #444;
        margin-bottom: 20px;
        max-width: 300px;
        line-height: 1.5;
      }
      .nota {
        font-size: 11px;
        color: #888;
        margin-top: 12px;
      }
      img {
        width: 5cm;
        height: 5cm;
      }
    </style>
  </head>
  <body>
    <p>
      Use este código para posicionar objetos 3D em realidade aumentada.<br/>
      Instale o app em outro celular ou imprima esta página.
    </p>
    <img src="data:image/png;base64,${base64}" />
    <p class="nota">Imprima em zoom 100% para manter o tamanho correto (5 cm).</p>
  </body>
</html>`;

      const { uri: pdfUri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(pdfUri, { mimeType: "application/pdf" });
    } catch {
      Alert.alert("Erro", "Não foi possível gerar o PDF.");
    } finally {
      setGerandoPdf(false);
    }
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Código AR</Text>

        <Text style={estilos.instrucao}>
          Use este código para posicionar objetos 3D em realidade aumentada.
          Instale o app em outro celular ou imprima esta página.
        </Text>

        <View style={estilos.qrContainer}>
          <Image
            source={require("@/assets/images/qr_code.png")}
            style={estilos.qrImagem}
            resizeMode="contain"
          />
        </View>

        <Text style={estilos.nota}>
          Ao imprimir, use zoom 100% para manter o tamanho correto (5 cm).
        </Text>

        <View style={estilos.botoes}>
          <TouchableOpacity
            style={estilos.botaoSecundario}
            onPress={handleCompartilharImagem}
            disabled={compartilhando || gerandoPdf}
          >
            {compartilhando ? (
              <ActivityIndicator color="#9B59B6" />
            ) : (
              <Text style={estilos.botaoSecundarioTexto}>Compartilhar imagem</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.botaoPrimario}
            onPress={handleGerarPdf}
            disabled={compartilhando || gerandoPdf}
          >
            {gerandoPdf ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={estilos.botaoPrimarioTexto}>Gerar PDF para impressão</Text>
            )}
          </TouchableOpacity>
        </View>
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
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  instrucao: {
    fontSize: 15,
    color: "#4B4B4B",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  qrContainer: {
    borderRadius: 16,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 16,
    marginBottom: 16,
  },
  qrImagem: {
    width: TAMANHO_QR_DP,
    height: TAMANHO_QR_DP,
  },
  nota: {
    fontSize: 12,
    color: "#AAAAAA",
    textAlign: "center",
    marginBottom: 32,
  },
  botoes: {
    width: "100%",
    gap: 12,
  },
  botaoSecundario: {
    borderWidth: 1.5,
    borderColor: "#9B59B6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  botaoSecundarioTexto: {
    color: "#9B59B6",
    fontSize: 15,
    fontWeight: "600",
  },
  botaoPrimario: {
    backgroundColor: "#9B59B6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  botaoPrimarioTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
