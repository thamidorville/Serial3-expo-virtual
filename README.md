
# Guia de Execução do Aplicativo (Prebuild)

O Prebuild é o processo de geração automática dos diretórios nativos (/android e /ios) a partir das configurações definidas no arquivo app.json (ou app.config.js). Ele transforma um projeto que continha apenas código JavaScript/TypeScript em um projeto mobile nativo completo, pronto para ser compilado.

## Instruções para iOS

### Requisitos
* Dispositivo iOS físico.
* Node e Watchman ([a documentação oficial do React Native](https://reactnative.dev/docs/set-up-your-environment?platform=ios&os=macos) recomenda instalar via [Homebrew](https://brew.sh/))
* Modo Desenvolvedor ativado no dispositivo (Ajustes > Privacidade e Segurança).
* Computador com macOS.
* [Xcode](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators) instalado: Necessário para fornecer o compilador e as ferramentas de build da Apple.


### Passo a passo
1. Conecte o iPhone ao Mac via USB.
2. Se aparecer o pop-up 'Confiar neste Computador?' no iPhone, confirme.
3. No terminal, dentro da pasta do projeto, execute:
   ```bash
   npx expo prebuild
   ```
   (Nota: Use `npx expo prebuild --clean` para uma instalação limpa, ciente de que isso deleta alterações manuais nas pastas /ios ou /android).
4. Para compilar e instalar no celular, execute:
   ```bash
   npx expo run:ios
   ```

## Instruções para Android

### Requisitos
* Dispositivo Android.
* Node e JDK ([a documentação oficial do React Native](https://reactnative.dev/docs/set-up-your-environment?platform=android&os=windows) recomenda instalar via [Chocolatey](https://chocolatey.org/install))
* Depuração USB ativada nas Opções do Desenvolvedor do Android.
* [Android Studio e SDK](https://developer.android.com/studio?hl=pt-br): É necessário ter o SDK Platform e as Build-Tools instaladas para que o sistema consiga compilar o binário nativo.

### Passo a passo
1. Conecte o dispositivo Android ao computador via USB.
2. Certifique-se de que o dispositivo foi reconhecido rodando 'adb devices' no terminal.
3. No terminal, dentro da pasta do projeto, execute:
   ```bash
   npx expo prebuild
   ```
   (Nota: Use `npx expo prebuild --clean` para uma instalação limpa, ciente de que isso deleta alterações manuais nas pastas /ios ou /android).
4. Para compilar e instalar no celular, execute:
   ```bash
   npx expo run:android
   ```


## Observações Importantes

### Quando usar os comandos de Run
Utilize 'npx expo run:ios' ou 'npx expo run:android' apenas quando houver mudanças no app.json, instalação de novas bibliotecas nativas ou se as pastas /ios ou /android forem removidas.

### Desenvolvimento Diário
Para mudanças de código (como criar uma nova tela, alterar o _layout.tsx ou mexer em estilos), utilize apenas:
```bash
npx expo start
```
Com o app já instalado no celular, as mudanças serão refletidas instantaneamente via Fast Refresh, sem necessidade de nova compilação nativa.

