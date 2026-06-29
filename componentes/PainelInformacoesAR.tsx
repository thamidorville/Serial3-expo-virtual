import { InformacaoObjeto } from "@/tipos/informacaoObjeto";

import { BotaoTextoAR } from "./BotaoTextoAR";

export type ModoInformacoes = "fechado" | "menu" | "detalhe";

interface PainelInformacoesARProps {
  modo: ModoInformacoes;
  informacoes: InformacaoObjeto[];
  secaoSelecionada: number | null;
  aoSelecionarSecao: (indice: number) => void;
  aoVoltar: () => void;
  // Altura (lift, em metros) acima do marcador e escala do painel. São derivadas
  // do tamanho do objeto em exposicaoAR; caem nos defaults se não informadas.
  altura?: number;
  escala?: number;
}

// --- Calibração (defaults) ---
// O painel é desenhado num espaço LOCAL "grande" e depois encolhido pelo
// `escala` do ViroNode pai. `altura` é a folga (em metros) acima do objeto.
const ESCALA_PADRAO = 0.05; // encolhe todo o painel
const ALTURA_PADRAO = 0.18; // metros acima do objeto

// Medidas em espaço LOCAL (antes do escala). O conteúdo é ancorado pela BASE
// (y ≥ 0), crescendo para cima a partir do lift, para nunca invadir o objeto.
// Botões de seção do modo "menu": exibem só o título (altura original, um pouco
// mais largos); o conteúdo completo aparece no modo "detalhe".
const ALTURA_BOTAO = 0.5; // altura de cada botão de seção
const LARGURA_BOTAO = 3.6; // largura de cada botão de seção
const ESPACAMENTO = ALTURA_BOTAO + 0.4; // distância vertical entre botões
const Y_VOLTAR = 0; // posição (local) do botão "Voltar" no modo detalhe
const LARGURA_PAINEL = 3.4; // largura do bloco de texto (modo detalhe)
const ALTURA_PAINEL = 3.8; // altura do bloco de texto (modo detalhe)
// Bloco de texto centrado acima do botão "Voltar" (base do bloco fica em y ≥ 0).
const ALTURA_TEXTO_DETALHE = Y_VOLTAR + 0.7 + ALTURA_PAINEL / 2;

/**
 * Parte 3D do painel de informações. Renderizada dentro do ViroARImageMarker,
 * logo acima do objeto. Mostra a coluna de títulos (modo "menu") ou o texto
 * da seção selecionada com um botão "Voltar" (modo "detalhe").
 */
export function PainelInformacoesAR({
  modo,
  informacoes,
  secaoSelecionada,
  aoSelecionarSecao,
  aoVoltar,
  altura = ALTURA_PADRAO,
  escala = ESCALA_PADRAO,
}: PainelInformacoesARProps) {
  const Viro = require("@reactvision/react-viro");
  const { ViroNode, ViroText, ViroFlexView } = Viro;

  if (modo === "fechado") return null;

  const conteudo = (() => {
    if (modo === "menu") {
      // Coluna ancorada pela base: o último botão fica em y=0 (no lift, logo
      // acima do objeto) e os demais crescem para cima.
      return informacoes.map((informacao, indice) => (
        <BotaoTextoAR
          key={informacao.id}
          texto={informacao.titulo}
          largura={LARGURA_BOTAO}
          altura={ALTURA_BOTAO}
          position={[0, (informacoes.length - 1 - indice) * ESPACAMENTO, 0]}
          aoClicar={() => aoSelecionarSecao(indice)}
        />
      ));
    }

    if (modo === "detalhe" && secaoSelecionada !== null) {
      const informacao = informacoes[secaoSelecionada];
      if (!informacao) return null;

      return (
        <>
          {/* Fundo translúcido como backdrop independente: o texto longo é
              renderizado À FRENTE (não como filho), senão o layout do flexview
              "espreme" o ViroText e ele some. */}
          <ViroFlexView
            position={[0, ALTURA_TEXTO_DETALHE, 0]}
            width={LARGURA_PAINEL}
            height={ALTURA_PAINEL}
            style={estilos.painel}
          />
          <ViroText
            text={informacao.titulo}
            position={[0, ALTURA_TEXTO_DETALHE + ALTURA_PAINEL / 2 - 0.4, 0.05]}
            width={LARGURA_PAINEL - 0.4}
            height={0.7}
            style={estiloTitulo}
          />
          <ViroText
            text={informacao.conteudo}
            position={[0, ALTURA_TEXTO_DETALHE - 0.2, 0.05]}
            width={LARGURA_PAINEL - 0.4}
            height={ALTURA_PAINEL - 1.2}
            style={estiloConteudo}
          />
          <BotaoTextoAR
            texto="Voltar"
            position={[0, Y_VOLTAR, 0]}
            aoClicar={aoVoltar}
          />
        </>
      );
    }

    return null;
  })();

  if (!conteudo) return null;

  return (
    <ViroNode
      position={[0, altura, 0]}
      scale={[escala, escala, escala]}
      transformBehaviors={["billboard"]}
    >
      {conteudo}
    </ViroNode>
  );
}

const estilos = {
  painel: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
};

const estiloTitulo = {
  fontFamily: "Arial",
  fontSize: 26,
  fontWeight: "700" as const,
  color: "#FFFFFF",
  textAlign: "center" as const,
  textAlignVertical: "center" as const,
  textLineBreakMode: "wordwrap" as const,
};

const estiloConteudo = {
  fontFamily: "Arial",
  fontSize: 20,
  fontWeight: "400" as const,
  color: "#FFFFFF",
  textAlign: "center" as const,
  textAlignVertical: "top" as const,
  textLineBreakMode: "wordwrap" as const,
};
