import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ControlesInformacoesUI } from "@/componentes/ControlesInformacoesUI";
import {
  ModoInformacoes,
  PainelInformacoesAR,
} from "@/componentes/PainelInformacoesAR";
import { PlaceholderAR } from "@/componentes/PlaceholderAR";
import { InformacaoObjeto } from "@/tipos/informacaoObjeto";

// --- Calibração do painel adaptativo ao tamanho do objeto ---
// Ao carregar, medimos a altura do objeto e derivamos a escala e o lift do
// painel. ALTURA_REF é a altura "típica" que fica boa na ESCALA_BASE.
const ESCALA_BASE = 0.05;
const ALTURA_REF = 0.15; // metros
const ESCALA_MIN = 0.04;
const ESCALA_MAX = 0.2;
const MARGEM = 0.05; // folga (m) entre o topo do objeto e o painel
const FOLGA_TOPO = 0.3; // folga extra acima do topo, como fração da altura do objeto

const PlaceholderScreen = () => {
  return <PlaceholderAR />;
};

const NativeARScreen = () => {
  const router = useRouter();
  const { urlGlb, objetoId } = useLocalSearchParams();
  const database = useSQLiteContext();
  // Loading dirigido pelo ciclo do OBJETO (não pelo marcador): o GLB faz preload
  // independente da detecção do marcador, então amarrar ao marcador travava o spinner.
  const [carregando, setCarregando] = React.useState(true);
  const [objetoCarregado, setObjetoCarregado] = React.useState(false);
  const [marcadorEncontrado, setMarcadorEncontrado] = React.useState(false);
  const [informacoes, setInformacoes] = React.useState<InformacaoObjeto[]>([]);
  const [modo, setModo] = React.useState<ModoInformacoes>("fechado");
  const [secaoSelecionada, setSecaoSelecionada] = React.useState<number | null>(
    null
  );
  const [alturaPainel, setAlturaPainel] = React.useState(ALTURA_REF + MARGEM);
  const [escalaPainel, setEscalaPainel] = React.useState(ESCALA_BASE);
  const [erroCarregamento, setErroCarregamento] = React.useState(false);
  const [modalAjudaVisivel, setModalAjudaVisivel] = React.useState(false);

  const objetoRef = React.useRef<any>(null);

  // Mede o objeto ao carregar e deriva o lift (altura) e a escala do painel,
  // para que ele fique acima do topo do objeto e cresça junto com objetos grandes.
  const medirObjeto = async () => {
    try {
      const { boundingBox } = await objetoRef.current.getBoundingBoxAsync();
      const altura = boundingBox.maxY - boundingBox.minY; // metros
      if (!altura || !isFinite(altura)) return;
      const escala = Math.min(
        ESCALA_MAX,
        Math.max(ESCALA_MIN, (ESCALA_BASE * altura) / ALTURA_REF)
      );
      setAlturaPainel(altura * (1 + FOLGA_TOPO) + MARGEM);
      setEscalaPainel(escala);
    } catch {
      // Em falha, mantém os defaults (comportamento anterior).
    }
  };

  React.useEffect(() => {
    const carregarInformacoes = async () => {
      const id = Number(objetoId);
      if (!id) return;
      const resultado = await database.getAllAsync<InformacaoObjeto>(
        "SELECT id, objeto_id, titulo, conteudo FROM informacoes_objeto WHERE objeto_id = ?",
        [id]
      );
      setInformacoes(resultado ?? []);
    };

    carregarInformacoes();
  }, [database, objetoId]);

  const abrirInformacoes = () => setModo("menu");
  const fecharInformacoes = () => {
    setModo("fechado");
    setSecaoSelecionada(null);
  };
  const selecionarSecao = (indice: number) => {
    setSecaoSelecionada(indice);
    setModo("detalhe");
  };
  const voltarParaMenu = () => {
    setSecaoSelecionada(null);
    setModo("menu");
  };

  const Viro = require("@reactvision/react-viro");
  const {
    Viro3DObject,
    ViroAmbientLight,
    ViroARImageMarker,
    ViroARScene,
    ViroARSceneNavigator,
    ViroARTrackingTargets,
  } = Viro;

  // Registrar o alvo uma única vez por sessão
  const targetRegistered = React.useRef(false);
  if (!targetRegistered.current) {
    ViroARTrackingTargets.createTargets({
      qrCode: {
        source: require("@/assets/images/qr_code.png"),
        orientation: "Up",
        physicalWidth: 0.05, // largura real em metros (~5 cm)
      },
    });
    targetRegistered.current = true;
  }

  const glbUrlNormalizada = React.useMemo(() => {
    const raw = String(urlGlb ?? "");
    if (!raw) return raw;
    if (raw.startsWith("file://") || raw.startsWith("http")) return raw;
    return `file://${raw}`;
  }, [urlGlb]);

  const PlacementScene = (props?: any) => {
    const appProps = props?.sceneNavigator?.viroAppProps ?? {};
    const glbUrl = appProps.urlGlb ?? glbUrlNormalizada;

    return (
      <ViroARScene>
        <ViroAmbientLight color="#FFFFFF" />
        <ViroARImageMarker
          target="qrCode"
          opacity={appProps.objetoCarregado ? 1 : 0}
          onAnchorFound={() => appProps.onMarcadorEncontrado?.()}
        >
          <Viro3DObject
            ref={objetoRef}
            source={{ uri: glbUrl }}
            position={[0, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
            type="GLB"
            onLoadStart={() => appProps.onObjetoCarregando?.()}
            onLoadEnd={() => appProps.onObjetoCarregado?.()}
            onError={() => appProps.onObjetoErro?.()}
            onClick={() => {
              console.log("touch");
            }}
          />
          <PainelInformacoesAR
            modo={appProps.modo ?? "fechado"}
            informacoes={appProps.informacoes ?? []}
            secaoSelecionada={appProps.secaoSelecionada ?? null}
            altura={appProps.alturaPainel}
            escala={appProps.escalaPainel}
            aoSelecionarSecao={(indice: number) =>
              appProps.onSelecionarSecao?.(indice)
            }
            aoVoltar={() => appProps.onVoltar?.()}
          />
        </ViroARImageMarker>
      </ViroARScene>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        initialScene={{ scene: PlacementScene }}
        viroAppProps={{
          urlGlb: glbUrlNormalizada,
          modo,
          informacoes,
          secaoSelecionada,
          objetoCarregado,
          alturaPainel,
          escalaPainel,
          onMarcadorEncontrado: () => setMarcadorEncontrado(true),
          onObjetoCarregando: () => setCarregando(true),
          onObjetoCarregado: () => {
            setCarregando(false);
            setObjetoCarregado(true);
            medirObjeto();
          },
          onObjetoErro: () => {
            setCarregando(false);
            setErroCarregamento(true);
          },
          onSelecionarSecao: selecionarSecao,
          onVoltar: voltarParaMenu,
        }}
      />
      {carregando && (
        <View style={styles.overlay} pointerEvents="none">
          <View style={styles.card}>
            <ActivityIndicator size="large" color="#7DD3FC" />
            <Text style={styles.texto}>Carregando objeto...</Text>
          </View>
        </View>
      )}
      {erroCarregamento && (
        <View style={styles.overlay} pointerEvents="none">
          <View style={styles.card}>
            <Text style={styles.texto}>Não foi possível carregar o modelo 3D.</Text>
          </View>
        </View>
      )}
      {!carregando && (
        <TouchableOpacity
          style={styles.botaoAjuda}
          onPress={() => setModalAjudaVisivel(true)}
          accessibilityRole="button"
          accessibilityLabel="Como usar o AR"
        >
          <Ionicons name="help-circle-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      )}
      {marcadorEncontrado && objetoCarregado && informacoes.length > 0 && (
        <ControlesInformacoesUI
          modo={modo}
          aoAbrir={abrirInformacoes}
          aoFechar={fecharInformacoes}
        />
      )}
      <Modal
        visible={modalAjudaVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalAjudaVisivel(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Como usar o AR?</Text>
            <Text style={styles.modalMensagem}>
              Aponte a câmera para o QR Code abaixo do objeto. Você pode
              imprimir o código ou instalar o app em outro celular para
              tê-lo na tela.
            </Text>
            <TouchableOpacity
              style={styles.modalBotaoPrimario}
              onPress={() => {
                setModalAjudaVisivel(false);
                router.replace("/qrCode");
              }}
            >
              <Text style={styles.modalBotaoPrimarioTexto}>Ver QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBotaoSecundario}
              onPress={() => {
                setModalAjudaVisivel(false);
              }}
            >
              <Text style={styles.modalBotaoSecundarioTexto}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    alignItems: "center",
    gap: 16,
    paddingVertical: 28,
    paddingHorizontal: 36,
    borderRadius: 20,
    backgroundColor: "rgba(15, 23, 42, 0.82)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.2)",
  },
  texto: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
  },
  botaoAjuda: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 12,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  modalMensagem: {
    fontSize: 15,
    color: "#4B4B4B",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 8,
  },
  modalBotaoPrimario: {
    width: "100%",
    backgroundColor: "#9B59B6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  modalBotaoPrimarioTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  modalBotaoSecundario: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#9B59B6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  modalBotaoSecundarioTexto: {
    color: "#9B59B6",
    fontSize: 15,
    fontWeight: "600",
  },
  modalFechar: {
    fontSize: 14,
    color: "#AAAAAA",
    marginTop: 4,
  },
});

const App = () => {
  return Platform.OS === "web" ? <PlaceholderScreen /> : <NativeARScreen />;
};

export default App;
