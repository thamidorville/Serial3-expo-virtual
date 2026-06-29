interface BotaoTextoARProps {
  texto: string;
  position: [number, number, number];
  aoClicar: () => void;
  largura?: number;
  altura?: number;
}

/**
 * Botão 3D para uso dentro de uma cena Viro (AR).
 *
 * ViroText NÃO pode ser filho de ViroFlexView — o layout flex espreme o
 * bounding box do texto e ele desaparece. A solução é renderizar o
 * ViroFlexView (fundo clicável) e o ViroText como irmãos, com o texto
 * deslocado em +Z para ficar à frente do fundo.
 */
export function BotaoTextoAR({
  texto,
  position,
  aoClicar,
  largura = 3.2,
  altura = 0.5,
}: BotaoTextoARProps) {
  const Viro = require("@reactvision/react-viro");
  const { ViroFlexView, ViroText } = Viro;

  const posTexto: [number, number, number] = [
    position[0],
    position[1],
    position[2] + 0.05,
  ];

  return (
    <>
      <ViroFlexView
        position={position}
        width={largura}
        height={altura}
        style={estilos.fundo}
        onClick={aoClicar}
      />
      <ViroText
        text={texto}
        position={posTexto}
        width={largura - 0.2}
        height={altura}
        style={estilos.texto}
        onClick={aoClicar}
      />
    </>
  );
}

const estilos = {
  fundo: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  texto: {
    fontFamily: "Arial",
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    textAlign: "center" as const,
    textAlignVertical: "center" as const,
    textLineBreakMode: "wordwrap" as const,
  },
};
