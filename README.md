# Serial3 — Virtual Expositions

Aplicativo de Realidade Aumentada desenvolvido em React Native com Expo. Permite ao usuário criar exposições customizadas de objetos 3D — artefatos históricos, peças icônicas ou objetos pouco convencionais — e visualizá-los no ambiente físico através da câmera do celular.

Projeto acadêmico desenvolvido para a disciplina de Projeto de Desenvolvimento Mobile do curso de Ciência da Computação da UNIFESO.

## Como rodar

```bash
# Instalar dependências
npm install

# Iniciar o projeto
npx expo start
```

Escaneie o QR code com o app Expo Go (Android/iOS) para visualizar no celular.

## Estrutura do projeto

```
app/              → Telas e rotas (Expo Router)
componentes/      → Componentes reutilizáveis
tipos/            → Interfaces e tipos TypeScript
dados/json/       → Dados mock (simula API futura em .NET + Postgres)
assets/images/    → Imagens e miniaturas dos temas
```
