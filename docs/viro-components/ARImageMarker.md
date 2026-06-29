# ViroARImageMarker

ViroARImageMarker é um componente que tenta encontrar um alvo específico na visão do usuário, permitindo que o desenvolvedor coloque objetos em relação à imagem ou determine sua localização relativa ao alvo da imagem.

## Exemplo de uso

```javascript
// Registrar o alvo
ViroARTrackingTargets.createTargets({
    "targetOne": {
        source: require('res/targetOne.html'),
        orientation: "Up",
        physicalWidth: 0.0.5 // real world width in meters  
    },
});

// Usar o componente
<ViroARImageMarker target={"targetOne"}>
  <ViroBox position={[0, .25, 0]} scale={[.5, .5, .5]} />
</ViroARImageMarker>
```

## Props

### target * (required)
| Tipo | Descrição |
|------|-----------|
| string | Nome do alvo de imagem criado com ViroARTrackingTargets. |

### dragPlane
| Tipo | Descrição |
|------|-----------|
| ViroDragPlane | Quando um tipo de drag "FixedToPlane" é dado, o arrastar é limitado a um plano definido pelo usuário. O comportamento de arrasto é então configurado por esta propriedade (especificado por um ponto no plano e seu vetor normal). Você também pode limitar a distância máxima que o objeto arrastado pode viajar longe da câmera/controlador. |

### dragType
| Tipo | Descrição |
|------|-----------|
| "FixedDistance" \| "FixedToWorld" \| "FixedDistanceOrigin" \| "FixedToPlane" | Determina o comportamento do drag se onDrag for especificado. O valor padrão é "FixedDistance". |

**Detalhes dos tipos de drag:**
- **FixedDistance**: O arrastar é limitado a um raio fixo ao redor do usuário, arrastado a partir do ponto em que o usuário pegou a geometria contendo este nó arrastável.
- **FixedDistanceOrigin**: O arrastar é limitado a um raio fixo ao redor do usuário, arrastado a partir do ponto de posição deste nó no espaço do mundo.
- **FixedToWorld**: O arrastar é baseado em interseção com objetos do mundo real. Disponível apenas em AR.
- **FixedToPlane**: O arrastar é limitado a um plano fixo ao redor do usuário. A configuração deste plano é definida pela propriedade dragPlane.

### ignoreEventHandling
| Tipo | Descrição |
|------|-----------|
| boolean | Quando definido como true, este controle ignorará eventos e não impedirá que controles atrás dele recebam callbacks de eventos. Padrão: false |

### Callbacks de Anchor

#### onAnchorFound
| Tipo | Descrição |
|------|-----------|
| (anchor) => void | Chamado quando este componente é ancorado a um plano que tem pelo menos minHeight por minWidth. É quando o componente se torna visível. |

#### onAnchorRemoved
| Tipo | Descrição |
|------|-----------|
| () => void | Chamado quando este componente é desancorado de um plano e não é mais visível. |

#### onAnchorUpdated
| Tipo | Descrição |
|------|-----------|
| (anchor) => void | Chamado quando o anchor é atualizado. Para marcadores de imagem, há informações adicionais fornecidas no anchor retornado. |

### Event Handlers
Os seguintes event handlers são herdados de ViroNode:
- `onClick`
- `onClickState`
- `onCollision`
- `onDrag`
- `onFuse`
- `onHover`
- `onPinch`
- `onRotate`
- `onScroll`
- `onSwipe`
- `onTouch`

### Propriedades de visualização

#### opacity
| Tipo | Descrição |
|------|-----------|
| number | Um número de 0 a 1 que especifica a opacidade do objeto. Um valor de 1 é totalmente opaco enquanto 0 é totalmente transparente. |

#### pauseUpdates
| Tipo | Descrição |
|------|-----------|
| boolean | True/False para parar o posicionamento/rotação automática de componentes filhos de um ViroARPlane. Isso não interrompe onAnchorUpdated. |

#### visible
| Tipo | Descrição |
|------|-----------|
| boolean | False se o container deve ser ocultado. Por padrão o container é visível e este valor é true. |

### Transformações

#### rotation
| Tipo | Descrição |
|------|-----------|
| [number, number, number] | A rotação do componente ao redor do seu eixo local especificada como ângulos de Euler [x, y, z]. Unidades em graus. |

#### scale
| Tipo | Descrição |
|------|-----------|
| [number, number, number] | A escala da caixa no espaço 3D, especificada como [x,y,z]. Uma escala de 1 representa o tamanho atual. Valores < 1 fazem proporcional menor, > 1 proporcional maior. |

#### transformBehaviors
| Tipo | Descrição |
|------|-----------|
| string[] | Um array de constraints de transformação que afetam a transformação do objeto. Por exemplo, "billboard" garante que a caixa enfrente o usuário conforme ele rotaciona sua cabeça em qualquer eixo. |

**Valores permitidos (case-sensitive):**
- `"billboard"`: Billboard objeto nos eixos x, y, z
- `"billboardX"`: Billboard objeto no eixo x
- `"billboardY"`: Billboard objeto no eixo y
- `"billboardZ"`: Billboard objeto no eixo z

#### viroTag
| Tipo | Descrição |
|------|-----------|
| string | Uma tag dada a outros componentes quando seu physics body colide com o physics body deste componente. |

#### renderingOrder
| Tipo | Descrição |
|------|-----------|
| number | Determina a ordem em que este Node é renderizado em relação a outros Nodes. Nodes com maiores rendering orders são renderizados por último. Padrão: 0. Por exemplo, -1 renderizará antes de todos com rendering order >= 0. |

## Métodos

### setNativeProps(nativeProps)

Uma função wrapper ao redor do setNativeProps do componente nativo que permite aos usuários definir valores no componente nativo sem alterar estado/props e re-renderizar.

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| nativeProps | object | Um objeto onde as chaves são as propriedades a definir e os valores são os valores a definir |

**Exemplo:**
```javascript
componentRef.setNativeProps({ position: [0, 0, -1] });
```
