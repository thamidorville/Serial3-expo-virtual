# CLAUDE.md

Guia de referência para trabalhar neste projeto.

## Documentação

### Componentes Viro
Referências técnicas dos componentes Viro utilizados no projeto estão em [`docs/viro-components/`](docs/viro-components/):

**Componentes:**
- [`ViroButton.md`](docs/viro-components/a.md) - Componente 2D interativo posicionado em espaço 3D
- [`ViroText.md`](docs/viro-components/ViroText.md) - Componente de texto 2D/3D posicionado em espaço 3D, suporta extrusion e estilos
- [`ARImageMarker.md`](docs/viro-components/ARImageMarker.md) - Componente para rastreamento de imagens em AR

**Referência:**
- [`Styles.md`](docs/viro-components/Styles.md) - Propriedades de estilo para layout e texto em componentes Viro

Para dúvidas sobre a API de qualquer componente ou estilos, consulte os arquivos correspondentes nesta pasta.

## Projeto
- **Tipo**: Expo + React Native + Viro (aplicação AR)
- **Banco de dados**: SQLite
- **Gerenciador de estado**: Context API / Local state

## Estrutura
```
src/
  components/    - Componentes React reutilizáveis
  screens/       - Telas da aplicação
  context/       - Context providers
  services/      - Serviços (DB, etc)
docs/
  viro-components/  - Documentação técnica dos componentes Viro
```
