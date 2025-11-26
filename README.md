# DotChain (Expo / React Native) 👋

DotChain のコードベースです。Expo Router + Tamagui を使ったファイルベースルーティング構成になっています。

## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Start the app

   ```bash
   pnpm dev
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Useful scripts

- `pnpm dev` : Expo 開発サーバーを起動
- `pnpm lint` : ESLint で静的解析
- `pnpm type-check` : TypeScript 型チェック
- `pnpm test` : Jest 単体テスト
- `pnpm prebuild` : ネイティブプロジェクト生成（android/ ios/ を更新）
- `pnpm build:android` : Android リリース AAB を作成

## Notes

- 依存管理は pnpm 固定です（npm/yarn は使わない想定）。
- Expo Router のルートは `app/` 配下のファイル構成に従います。
