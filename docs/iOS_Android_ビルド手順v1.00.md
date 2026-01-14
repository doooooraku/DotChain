# DotChain iOS / Android ビルド手順（A案：android/（＋できればios/）を Git 管理）
最終更新: 2026-01-11（JST）

> 目的  
> - 「ビルドで毎回迷わない」ために、**どの階層で**・**何のコマンドを**・**どんな意味で**打つのかを、初心者向けに“過剰なくらい”細かくまとめる。  
> - DotChain は **Expo + EAS** を使いつつ、A案として **android/ を Git 管理**（必要なら ios/ も管理）して、安定運用する。  
> - iOS は GitHub Actions の macOS ランナーで `.ipa` を作り、TestFlight へ提出する。  
> - Android は（1）普段のデバッグ用に Debug APK、（2）リリース用に 署名済み AAB を作る。

---

## 0. 結論（今回の採用方針）

### 0-1. 採用：A案（安定運用）
- **android/ を Git で管理する（＝通常のReact Native運用）**  
- 可能なら **ios/ も Git 管理**（「CI で prebuild 生成」でも回せるが、A案の“安定”を最大化するなら ios/ も置くのが一番ブレにくい）

### 0-2. A案で起きる「超重要な性質」
A案（= android/ や ios/ が存在する）では、EAS Build は **自動で prebuild（ネイティブ生成）を実行しません**。  
つまり、**app.json / app.config.ts の「ネイティブに効く設定」**（アイコン、権限、bundleIdentifier、package、plugins など）を変えても、**ネイティブ側に反映されない**ことがあります。

→ そのため、A案では次のどちらかを“必ず”選びます。

- 方式A：**ネイティブはネイティブで編集し、app.jsonは最小限にする**（RNっぽい運用）  
- 方式B：**app.json を主にして、変更したら手動で `npx expo prebuild`（※通常は --clean なし）で同期する**（Expoっぽい運用）

このガイドは **方式B（app.json中心＋必要時に同期）**を基本として書きます。  
（理由：DotChain はEAS・pluginsを使っており、設定の「見える化」がしやすい）

---

## 1. まず覚える単語（超やさしく）

- **ビルド (build)**：アプリを「インストールできる形」に作り直すこと。  
  - Android：`.apk`（デバッグ向け）や `.aab`（ストア提出向け）
  - iOS：`.ipa`（TestFlight/ストア提出向け）

- **署名 (signing)**：アプリが「本物で改ざんされていない」と証明する印鑑。  
  - Android：**keystore**（鍵束）で署名  
  - iOS：**証明書（certificate）**＋**プロビジョニングプロファイル（profile）**で署名

- **EAS (Expo Application Services)**：Expo公式のビルド/提出/認証管理サービス。  
  - `eas build`: ビルド
  - `eas submit`: ストアへ提出
  - `eas credentials`: 証明書・鍵の管理

- **プロファイル (profile)**：ビルドの“設定セット”。`eas.json` に書く。  
  - 例：development / preview / production

- **versionCode (Android)**：Play Console に提出するたびに増やす「通し番号」。  
  - 1回提出した `versionCode=10` は、次は `11` 以上が必要。

- **buildNumber (iOS)**：TestFlight へ上げるたびに増やす「通し番号」。  
  - Appleの世界では `CFBundleVersion` が該当。

---

## 2. DotChain の現状設定（具体例）

### 2-1. app.json の重要値
- アプリ名/slug：`DotChain` / `dotchain`
- iOS bundleIdentifier：`com.doooooraku.dotchain`
- Android package：`com.doooooraku.dotchain`
- iOS buildNumber：`1.0.0`
- Android versionCode：`1`
- Expo EAS projectId：`9a84b4b9-5b2b-4b2a-95c1-9a163afa6c12`
- owner：`dooraku`
- iOS：暗号化質問スキップ（`ITSAppUsesNonExemptEncryption: false`）

> 注：このガイドでは、上の値を「今のDotChainの基準」として説明します。

### 2-2. eas.json の重要値
- `appVersionSource: "remote"`（バージョン番号をEAS側で管理）
- production：`autoIncrement: true`（ストア用ビルドのたびに buildNumber/versionCode を自動で増やす）
- submit.production.ios.ascAppId：`6756904225`（App Store Connect の App ID）

---

## 3. どのフォルダ（階層）でコマンドを打つ？（最重要）

> 迷ったらここだけ読めばOK、という表です。

| やりたいこと | どこで打つ？ | コマンド例 |
|---|---|---|
| Expo の開発サーバ（Metro）を起動 | **プロジェクトルート**（`/home/doooo/04_app-factory/apps/DotChain`） | `pnpm start` / `npx expo start --clear` |
| EAS で iOS/Android をビルド | **プロジェクトルート** | `eas build -p ios --profile production ...` |
| Android を Gradle でビルド | **android/**（`.../DotChain/android`） | `./gradlew assembleDebug` / `./gradlew bundleRelease` |
| adb で端末確認 | どこでもOK（PATHが通っていれば） | `adb devices` |
| prebuild でネイティブ同期 | **プロジェクトルート** | `npx expo prebuild --platform android` |

---

## 4. A案にするための Git 設定（android/ をコミットする）

### 4-1. 何を Git 管理する？（おすすめ）
- ✅ `android/`（必須）
- ✅ `ios/`（できれば）
- ❌ `android/app/*.keystore`（秘密鍵、絶対コミットしない）
- ❌ `android/key.properties`（秘密、絶対コミットしない）
- ❌ `.env`（秘密、絶対コミットしない）

### 4-2. よくある落とし穴（これを知らないと地獄）
- `npx expo prebuild --clean` を日常的に使うと、android/ や ios/ が「丸ごと作り直し」になり、差分が爆増します。  
  → A案では **“同期のときだけ”**・しかも **基本は --clean なし**で運用します。

---

## 5. iOS（TestFlight）: GitHub Actions（macOS）で IPA を作って提出する

あなたの workflow（`.github/workflows/build-ios-device.yml`）は、次の流れです。

1) リポジトリをチェックアウト  
2) pnpm / Node を準備  
3) EAS CLI を入れる  
4) `eas build --local` で **macOS ランナー上で IPA を作る**  
5) `eas submit` で TestFlight に提出  
6) IPA を artifact として保存

### 5-1. 実行する前に必要なもの（これが無いと submit が止まる）

#### (B-2) asc-api-key.json の作り方（例）
Expo公式の例に沿って、こんなJSONを作ります（値はダミー）。

```json
{
  "keyId": "ABC123DEFG",
  "issuerId": "11223344-5566-7788-99AA-BBCCDDEEFF00",
  "key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
}
```

- `keyId`：App Store Connectで作ったAPIキーの **Key ID**
- `issuerId`：App Store Connectの **Issuer ID**
- `key`：ダウンロードした `.p8` の中身（改行は `\n` で表現）

#### (B-3) GitHub Actions で安全に使う（おすすめ手順）
- GitHub Secrets に `ASC_API_KEY_JSON_BASE64` を作る  
  - あなたの手元（WSLなど）で `asc-api-key.json` を base64 化して登録する  
- workflow では、base64 を復元して `asc-api-key.json` を生成してから `eas submit` を実行する

※ macOS の `base64` はオプションが環境差で事故りやすいので、**Node/Pythonで復元**するのが安全です。


#### (A) Expo のトークン（EXPO_TOKEN）
- GitHub Secrets に `EXPO_TOKEN` を入れる（workflow が参照する）

#### (B) App Store Connect API Key（非対話で提出するため）
`eas submit --non-interactive` で iOS 提出するには、基本的に **App Store Connect API Key を用意**します。  
（Apple ID のID/PWをCIに直置きは事故りやすいので避ける）

- Expo公式ドキュメントにある形式で `asc-api-key.json` を作る  
  - `issuerId` / `keyId` / `key` を入れる  
- GitHub Secrets に **JSONをbase64化して保存** → workflow で復元してファイル化 → `ascApiKeyPath` で指定

> これが出来ていると、毎回の提出がかなり安定します。

### 5-2. GitHub Actions 実行コマンド（あなたのworkflowに合わせた説明）

#### ① IPAを作る（ビルド）
```bash
# （実行場所）GitHub Actions 上のリポジトリroot（チェックアウトされた場所）
eas build --platform ios --profile production --local --non-interactive --output=DotChain.ipa
```

- `eas`：ExpoのEASコマンド
- `build`：ビルドする命令
- `--platform ios`：iOS向けに作る
- `--profile production`：eas.json の production 設定を使う
- `--local`：クラウドではなく「今のマシン（GitHubのMac）」で作る
- `--non-interactive`：質問を出さず自動で進める（CIに必須）
- `--output=DotChain.ipa`：成果物（IPA）をこの名前で保存する

#### ② TestFlight に提出（submit）
```bash
eas submit --platform ios --path DotChain.ipa --profile production --non-interactive
```

- `submit`：ストアにアップロードする命令
- `--path DotChain.ipa`：このIPAをアップロードする

### 5-3. iOS の「ビルド番号」ルール（超重要）
Apple では「ビルド番号（CFBundleVersion）」が毎回増えている必要があります。  
EAS側で `autoIncrement: true` かつ `appVersionSource: remote` にしている場合、**この増加はEASが自動で面倒を見ます**。

逆に、Xcodeで手動アップロードする運用を混ぜる場合は、`CFBundleVersion` を必ず増やしてください。

---

## 6. Android（デバッグ）: ローカル Gradle で Debug APK を作って emulator で動かす

### 6-1. 全体の流れ（一本道）
1) エミュレータを起動する（Android Studio など）  
2) `adb devices` で接続確認  
3) Metro（JSの配信サーバ）を起動  
4) `./gradlew assembleDebug` で Debug APK を作る  
5) APK をエミュレータにインストールして起動  
6) アプリが Metro に接続して動く

### 6-2. 手順（超具体）

#### Step 0: まずプロジェクトルートへ移動
```bash
cd /home/doooo/04_app-factory/apps/DotChain
```

#### Step 1: Metro を起動（JSを配るサーバ）
```bash
npx expo start --clear
```
- `npx`：nodeのコマンドを “今のプロジェクトに入ってる版” で実行する仕組み
- `expo start`：開発サーバ起動
- `--clear`：キャッシュを捨てて起動（変な不具合が出た時に効く）

#### Step 2: Android のビルド（Gradle）
```bash
cd android
./gradlew --stop
./gradlew clean
./gradlew assembleDebug
```

- `cd android`：Androidプロジェクトフォルダへ移動（ここが重要）
- `./gradlew`：Gradle Wrapper（プロジェクト専用のGradle起動コマンド）  
  - PCにGradleを別で入れてなくても動く
- `--stop`：過去に動いて残ってるGradleプロセスを止める（謎エラー回避）
- `clean`：前のビルド成果物を消す
- `assembleDebug`：Debug APK を作る

#### Step 3: APK の場所を確認
```bash
ls -la app/build/outputs/apk/debug/
```
通常、`app-debug.apk` ができます。

#### Step 4: エミュレータにインストール（adb）
```bash
adb devices
adb install -r app/build/outputs/apk/debug/app-debug.apk
```
- `adb devices`：接続されている端末・エミュレータ一覧
- `adb install -r`：インストール（`-r` は上書き）

> あなたは Debug APK を Windows の Downloads へコピーしているので、同じ運用もOKです。  
> 例：
> ```bash
> cp -v app/build/outputs/apk/debug/app-debug.apk /mnt/c/Users/doooo/Downloads/DotChain-debug.apk
> ```

### 6-3. 「Expo Go でデバッグしたい」場合の注意点
- Expo Go は「最初から入っているネイティブ機能の範囲内」しか動きません。  
- `expo-dev-client` を入れている（＝カスタムネイティブを含む）場合、基本は **Expo Go では動かず、Development Build（自前アプリ）**が必要です。

そのため、A案（ネイティブ運用）では、実務的には次が安定します。

- ✅ “普段は” Development Build（expo-dev-client入り）で開発
- ✅ “たまに” Release ビルドで最終確認
- ❌ Expo Go にこだわると、あとで詰まりやすい

---

## 7. Android（リリース）: 署名済み AAB を作って Play Console に出す

ここが一番事故りやすいので、2ルート用意します。

### 7-A. おすすめ（事故りにくい）: EAS で production AAB を作る（localでも可）

#### A-3. Play Console 提出（EAS Submitを使う場合）
EAS Submit で Play Console に提出するには **Google Play のサービスアカウントキー**が必要です。  
このキーは Expo側に暗号化して保管され、以降の提出に再利用できます（不要になったら削除可能）。

> 重要：**新規アプリの最初の提出は Web コンソールから行う必要**があります（EAS Submitだけでは最初の提出はできません）。

実行例（AABを提出）:
```bash
eas submit -p android --profile production --path DotChain.aab --non-interactive
```

#### A-1. 何が良い？
- `autoIncrement: true` で **versionCode を自動で増やす**（提出のたびに数字を手で上げなくてよい）
- 署名もEASが面倒を見る（1回設定したら再利用）
- “自分でkeystoreを配る”事故が減る

#### A-2. コマンド（プロジェクトルート）
```bash
cd /home/doooo/04_app-factory/apps/DotChain
eas build -p android --profile production --local --non-interactive --output=DotChain.aab
```

- `-p android` は `--platform android` の短縮
- `--output=DotChain.aab`：成果物名を指定

作られた `.aab` を Play Console にアップロードします。

> 補足：EAS Submit を使う場合は、Google Play のサービスアカウントキーが必要です。

### 7-B. こだわりルート: ローカルGradleで production AAB を作る
#### B-1. 先に知っておくべき「絶対ルール」
Play Console は **毎回 versionCode を上げないと受け付けません**。  
なので提出するたびに `versionCode` を +1 します。

#### B-2. 手順（ざっくり）
1) 署名鍵（keystore）を用意（EAS で作ったものを使う or 自前生成）  
2) `android/app/build.gradle` が `key.properties` から署名情報を読むようにする  
3) `versionCode` を増やす  
4) `./gradlew bundleRelease` で AAB を作る  
5) `app-release.aab` をアップロード

#### B-3. コマンド（android/ で実行）
```bash
cd /home/doooo/04_app-factory/apps/DotChain/android
./gradlew clean
./gradlew bundleRelease
```

成果物の例：
- `android/app/build/outputs/bundle/release/app-release.aab`

#### B-4. このルートの「最大の罠」
あなたの `eas.json` は `appVersionSource: remote` です。  
この設定のまま「Gradleだけ」で回すと、EAS側の“リモート版番号”とズレることがあります。

→ もし Bルートを本気でやるなら、次のどれかを決めてください。

- 決め方1（おすすめ）：**リリースはEASに統一**（Aルート）  
- 決め方2：**appVersionSource を local にする**（手でversionCode管理）  
- 決め方3：**EASのversion:sync等で同期してからGradle**（運用が難しいので上級者向け）

---

## 8. prebuild（ネイティブ同期）のルール（A案で必須）

### 8-1. いつ prebuild が必要？
次を変えたら「ネイティブにも変更が必要」です。

- アイコン・スプラッシュ
- bundleIdentifier / package
- 権限（通知、カメラ、課金など）
- config plugins（`app.json` の `plugins`）
- ネイティブ依存パッケージを追加/削除

### 8-2. コマンド（基本は --clean なし）
```bash
cd /home/doooo/04_app-factory/apps/DotChain
npx expo prebuild --platform android
npx expo prebuild --platform ios
```

- `prebuild`：app.json などから native を更新する
- `--platform android`：android だけ

> `--clean` は “全部作り直し” なので、日常では使わない（差分爆増）。  
> どうしても壊れた時の最終手段だけ。

---

