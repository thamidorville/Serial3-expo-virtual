interface BotaoTextoARProps {
  texto: string;
  position: [number, number, number];
  aoClicar: () => void;
  // Texto completo da seção, exibido abaixo do título dentro do botão.
  conteudo?: string;
  largura?: number;
  altura?: number;
}

/**
 * Botão de texto 3D para uso dentro de uma cena Viro (AR): um ViroFlexView de
 * fundo preto translúcido com um ViroText por dentro. O ViroButton nativo só
 * renderiza imagens, por isso compomos FlexView + Text.
 *
 * Quando `conteudo` é informado, o botão vira um "card": título em destaque e o
 * texto completo da seção logo abaixo.
 *
 * As medidas estão no espaço LOCAL do PainelInformacoesAR, que é encolhido por
 * um scale no ViroNode pai — por isso os valores parecem "grandes" aqui.
 */
export function BotaoTextoAR({
  texto,
  position,
  aoClicar,
  conteudo,
  largura = 3.2,
  altura = 0.5,
}: BotaoTextoARProps) {
  const Viro = require("@reactvision/react-viro");
  const { ViroFlexView, ViroText } = Viro;

  // Sem conteúdo é um botão simples (ex.: "Voltar"): título centralizado ocupa
  // o botão inteiro.
  if (!conteudo) {
    return (
      <ViroFlexView
        position={position}
        width={largura}
        height={altura}
        style={estilos.fundo}
        onClick={aoClicar}
      >
        <ViroText
          text={texto}
          width={largura - 0.2}
          height={altura}
          textAlign="center"
          textAlignVertical="center"
          textLineBreakMode="wordwrap"
          textClipMode="none"
          style={estilos.texto}
        />
      </ViroFlexView>
    );
  }

  // Card: faixa de título com altura fixa (suficiente para 2 linhas) e o texto
  // completo ocupando o restante. Sem isso o título é espremido e cortado.
  const ALTURA_TITULO = 0.6;

  return (
    <ViroFlexView
      position={position}
      width={largura}
      height={altura}
      style={estilos.fundo}
      onClick={aoClicar}
    >
      <ViroText
        text={texto}
        width={largura - 0.2}
        height={ALTURA_TITULO}
        textAlign="center"
        textAlignVertical="center"
        textLineBreakMode="wordwrap"
        textClipMode="clipToBounds"
        style={estilos.texto}
      />
      <ViroText
        text={conteudo}
        width={largura - 0.2}
        height={altura - ALTURA_TITULO - 0.1}
        textAlign="center"
        textAlignVertical="top"
        textLineBreakMode="wordwrap"
        textClipMode="clipToBounds"
        style={estilos.conteudo}
      />
    </ViroFlexView>
  );
}

const estilos = {
  fundo: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  texto: {
    fontFamily: "monospace",
    fontSize: 15,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  conteudo: {
    fontFamily: "monospace",
    fontSize: 13,
    fontWeight: "400" as const,
    color: "#FFFFFF",
  },
};
