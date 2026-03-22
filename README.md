
# Serial3 — Virtual Expositions

Aplicativo de Realidade Aumentada desenvolvido em React Native com Expo. Permite ao usuário criar exposições customizadas de objetos 3D — artefatos históricos, peças icônicas ou objetos pouco convencionais — e visualizá-los no ambiente físico através da câmera do celular.

Projeto acadêmico desenvolvido para a disciplina de Projeto de Desenvolvimento Mobile do curso de Ciência da Computação da UNIFESO.

## Como rodar

### 1. Instalação de dependências

```bash
npm install
```

### 2. Execução via Expo Go (funcionalidades limitadas)

O Expo Go pode ser utilizado para visualizar a interface e navegação, porém, funcionalidades de Realidade Aumentada (Viro React) não estarão disponíveis.

```bash
npx expo start
```

### 3. Execução via Development Client (processo um pouco complexo, mas que irá cobrir todas as funcionalidades)

Para utilizar as funcionalidades de Realidade Aumentada, é necessário um build de desenvolvimento. Como o projeto está vinculado a uma organização, o gerenciamento de builds é centralizado no EAS.

#### Acesso à Organização

Caso você ainda não faça parte da organização no Expo:

1.  [Crie uma conta no Expo](https://expo.dev/signup)
    
2.  Envie uma solicitação de convite seguida do e-mail cadastrado para felipegomes@unifeso.com.vc *(ou apenas solicite no grupo do WhatsApp caso seja integrante da equipe)*
    
3.  Aceite o convite enviado para o seu e-mail ou através do painel de notificações do Expo

#### Uso de builds existentes

Se uma build de desenvolvimento (`development profile`) da sua plataforma de testes (Android oi iOS) já foi gerada por outro membro da organização, não é necessário gerar um novo, a menos que as dependências nativas tenham sido alteradas.

-   **Android:** Basta baixar o APK existente pelo painel da Expo e instalar no dispositivo.
        
-   **iOS:** Requer que o dispositivo esteja registrado no perfil de provisionamento da Apple da organização antes do build ser gerado.
    

#### Gerar novo build (EAS)

Caso precise gerar um novo binário, utilize os comandos abaixo:

```bash
# Android
eas build --profile development --platform android

# iOS (exige configuração adicional após rodar o comando)
eas build --profile development --platform io
```

#### Iniciando o servidor de desenvolvimento

Após instalar o build (APK/APP) no seu dispositivo ou simulador, inicie o servidor local para carregar o código JavaScript:

```bash
npx expo start --dev-client
```

### 4. Execução via Local Prebuild (processo mais simples, porém exige a instalação de ferramentas externas e, no caso do iOS, só funciona se for feito em MacBook)


Esta opção é ideal para quem possui as ferramentas de desenvolvimento nativas instaladas (Android Studio / Xcode) e deseja rodar o projeto sem depender dos servidores da Expo ou de contas na organização.

**Requisitos:** 
 - Android: Android Studio e SDK configurados.
 - iOS: macOS e Xcode instalados (necessário para gerar o binário de iOS).

Comandos para gerar e rodar o código nativo localmente:

```bash
# Gerar as pastas /android e /ios localmente
npx expo prebuild

# Executar no Android
npx expo run:android

# Executar no iOS (Somente macOS)
npx expo run:ios
```

## Estrutura do projeto

```
app/              → Telas e rotas (Expo Router)
componentes/      → Componentes reutilizáveis
tipos/            → Interfaces e tipos TypeScript
dados/json/       → Dados mock (simula API futura em .NET + Postgres)
assets/images/    → Imagens e miniaturas dos temas
```
