# 📅 開発ログレポート: 2025-12-30
> 生成時刻: 23:21

## 📊 1. 本日のハイライト（概要）
今日の作業全体のボリュームです。
 -  15 files changed, 10336 insertions(+), 8005 deletions(-)

## 📝 2. 作業履歴リスト
どのような意図で修正を行ったかの記録です。
### ⏰ 16:59 : fix(ci/purchases): 環境変数名の修正と課金パッケージ取得ロジックの改善
- - **ID**: `6a56e2f`
- - **Files**:
- .github/workflows/build-ios-device.yml
- .github/workflows/logs_53184067796/0_Build & Submit IPA.txt
- .github/workflows/logs_53184067796/Build & Submit IPA/system.txt
- src/services/proService.ts

### ⏰ 18:23 : fix(audio): タップ音の切り替え不具合修正と重複再生の廃止
- - **ID**: `74d1043`
- - **Files**:
- "20251222_2318_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
- "20251227_2131_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
- "20251227_2240_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
- "20251230_1820_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
- assets/sounds/click.wav
- assets/sounds/pop.wav
- src/core/sensory/SoundManager.ts
- src/features/habit/useHabitRecord.ts

### ⏰ 19:05 : feat(settings): 設定画面のポップオーバーをレスポンシブ対応し、スクロール動作を改善
- - **ID**: `599e638`
- - **Files**:
- "20251230_1859_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
- app/settings/index.tsx

### ⏰ 19:36 : fix(settings): 言語リストの余白をSafe Areaに基づいて動的に計算・適用
- - **ID**: `8e4a6ea`
- - **Files**:
- "20251230_1935_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
- app/settings/index.tsx

## 🔍 3. 技術的詳細（コード差分）
AI解析および詳細確認用の生データです。
```diff
# --------------------------------------------------
# Commit: 6a56e2f - fix(ci/purchases): 環境変数名の修正と課金パッケージ取得ロジックの改善
# --------------------------------------------------
diff --git a/.github/workflows/build-ios-device.yml b/.github/workflows/build-ios-device.yml
index e4db274..6aa14ce 100644
--- a/.github/workflows/build-ios-device.yml
+++ b/.github/workflows/build-ios-device.yml
@@ -33,11 +33,24 @@ jobs:
 
       # 3. 【重要】環境変数の作成
       # これがないと、アプリの中にAPIキーが含まれず、起動してもエラーになります
+      - name: 🔎 RevenueCatキーの存在チェック
+        env:
+          REVENUECAT_IOS_API_KEY: ${{ secrets.REVENUECAT_IOS_API_KEY }}
+          REVENUECAT_ANDROID_API_KEY: ${{ secrets.REVENUECAT_ANDROID_API_KEY }}
+        run: |
+          if [ -z "$REVENUECAT_IOS_API_KEY" ]; then
+            echo "REVENUECAT_IOS_API_KEY is empty"
+            exit 1
+          fi
+
       - name: 🔓 .envファイルを作成
+        env:
+          REVENUECAT_IOS_API_KEY: ${{ secrets.REVENUECAT_IOS_API_KEY }}
+          REVENUECAT_ANDROID_API_KEY: ${{ secrets.REVENUECAT_ANDROID_API_KEY }}
         run: |
           # 必要なキーをここに追加してください
-          echo "EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=${{ secrets.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY }}" >> .env
-          echo "EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY=${{ secrets.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY }}" >> .env
+          echo "REVENUECAT_IOS_API_KEY=${REVENUECAT_IOS_API_KEY}" > .env
+          echo "REVENUECAT_ANDROID_API_KEY=${REVENUECAT_ANDROID_API_KEY}" >> .env
         # 注意: GitHubのSecretsにこれらのキーを登録しておく必要があります
 
       # 4. ビルド（IPA作成）
@@ -58,4 +71,4 @@ jobs:
         uses: actions/upload-artifact@v4
         with:
           name: DotChain-iOS-IPA
-          path: DotChain.ipa
\ No newline at end of file
+          path: DotChain.ipa
diff --git a/.github/workflows/logs_53184067796/0_Build & Submit IPA.txt b/.github/workflows/logs_53184067796/0_Build & Submit IPA.txt
new file mode 100644
index 0000000..665bbaa
--- /dev/null
+++ b/.github/workflows/logs_53184067796/0_Build & Submit IPA.txt	
@@ -0,0 +1,2117 @@
+﻿2025-12-29T14:31:14.4717350Z Current runner version: '2.330.0'
+2025-12-29T14:31:14.4734460Z ##[group]Runner Image Provisioner
+2025-12-29T14:31:14.4735010Z Hosted Compute Agent
+2025-12-29T14:31:14.4735370Z Version: 20251211.462
+2025-12-29T14:31:14.4735770Z Commit: 6cbad8c2bb55d58165063d031ccabf57e2d2db61
+2025-12-29T14:31:14.4736250Z Build Date: 2025-12-11T16:28:49Z
+2025-12-29T14:31:14.4736690Z Worker ID: {7b04b6f0-14c6-4977-b689-151b1d3158eb}
+2025-12-29T14:31:14.4737140Z ##[endgroup]
+2025-12-29T14:31:14.4737510Z ##[group]Operating System
+2025-12-29T14:31:14.4737870Z macOS
+2025-12-29T14:31:14.4738180Z 15.7.2
+2025-12-29T14:31:14.4738500Z 24G325
+2025-12-29T14:31:14.4738800Z ##[endgroup]
+2025-12-29T14:31:14.4739140Z ##[group]Runner Image
+2025-12-29T14:31:14.4739520Z Image: macos-15-arm64
+2025-12-29T14:31:14.4739860Z Version: 20251215.0075.1
+2025-12-29T14:31:14.4740590Z Included Software: https://github.com/actions/runner-images/blob/macos-15-arm64/20251215.0075/images/macos/macos-15-arm64-Readme.md
+2025-12-29T14:31:14.4741710Z Image Release: https://github.com/actions/runner-images/releases/tag/macos-15-arm64%2F20251215.0075
+2025-12-29T14:31:14.4742370Z ##[endgroup]
+2025-12-29T14:31:14.4743140Z ##[group]GITHUB_TOKEN Permissions
+2025-12-29T14:31:14.4744340Z Contents: read
+2025-12-29T14:31:14.4744680Z Metadata: read
+2025-12-29T14:31:14.4744990Z Packages: read
+2025-12-29T14:31:14.4745310Z ##[endgroup]
+2025-12-29T14:31:14.4746810Z Secret source: Actions
+2025-12-29T14:31:14.4747220Z Prepare workflow directory
+2025-12-29T14:31:14.5136600Z Prepare all required actions
+2025-12-29T14:31:14.5170790Z Getting action download info
+2025-12-29T14:31:14.9234050Z Download action repository 'actions/checkout@v4' (SHA:34e114876b0b11c390a56381ad16ebd13914f8d5)
+2025-12-29T14:31:15.5566640Z Download action repository 'pnpm/action-setup@v3' (SHA:a3252b78c470c02df07e9d59298aecedc3ccdd6d)
+2025-12-29T14:31:16.9383480Z Download action repository 'actions/setup-node@v4' (SHA:49933ea5288caeca8642d1e84afbd3f7d6820020)
+2025-12-29T14:31:17.1366850Z Download action repository 'actions/upload-artifact@v4' (SHA:ea165f8d65b6e75b540449e92b4886f43607fa02)
+2025-12-29T14:31:17.4840710Z Complete job name: Build & Submit IPA
+2025-12-29T14:31:17.5517900Z ##[group]Run actions/checkout@v4
+2025-12-29T14:31:17.5518640Z with:
+2025-12-29T14:31:17.5519100Z   repository: doooooraku/DotChain
+2025-12-29T14:31:17.5519940Z   token: ***
+2025-12-29T14:31:17.5520360Z   ssh-strict: true
+2025-12-29T14:31:17.5520820Z   ssh-user: git
+2025-12-29T14:31:17.5521280Z   persist-credentials: true
+2025-12-29T14:31:17.5521790Z   clean: true
+2025-12-29T14:31:17.5522270Z   sparse-checkout-cone-mode: true
+2025-12-29T14:31:17.5522830Z   fetch-depth: 1
+2025-12-29T14:31:17.5523280Z   fetch-tags: false
+2025-12-29T14:31:17.5523750Z   show-progress: true
+2025-12-29T14:31:17.5524230Z   lfs: false
+2025-12-29T14:31:17.5524660Z   submodules: false
+2025-12-29T14:31:17.5525130Z   set-safe-directory: true
+2025-12-29T14:31:17.5525780Z ##[endgroup]
+2025-12-29T14:31:18.2912570Z Syncing repository: doooooraku/DotChain
+2025-12-29T14:31:18.3018270Z ##[group]Getting Git version info
+2025-12-29T14:31:18.3038290Z Working directory is '/Users/runner/work/DotChain/DotChain'
+2025-12-29T14:31:18.3111270Z [command]/opt/homebrew/bin/git version
+2025-12-29T14:31:18.3112790Z git version 2.50.1
+2025-12-29T14:31:18.3509700Z ##[endgroup]
+2025-12-29T14:31:18.3614750Z Copying '/Users/runner/.gitconfig' to '/Users/runner/work/_temp/8a5d53bf-af89-4d6f-8e7a-1ca67964f7dc/.gitconfig'
+2025-12-29T14:31:18.3618080Z Temporarily overriding HOME='/Users/runner/work/_temp/8a5d53bf-af89-4d6f-8e7a-1ca67964f7dc' before making global git config changes
+2025-12-29T14:31:18.3633840Z Adding repository directory to the temporary git global config as a safe directory
+2025-12-29T14:31:18.3636180Z [command]/opt/homebrew/bin/git config --global --add safe.directory /Users/runner/work/DotChain/DotChain
+2025-12-29T14:31:18.3663770Z Deleting the contents of '/Users/runner/work/DotChain/DotChain'
+2025-12-29T14:31:18.3669020Z ##[group]Initializing the repository
+2025-12-29T14:31:18.3674020Z [command]/opt/homebrew/bin/git init /Users/runner/work/DotChain/DotChain
+2025-12-29T14:31:18.4126450Z hint: Using 'master' as the name for the initial branch. This default branch name
+2025-12-29T14:31:18.4129920Z hint: is subject to change. To configure the initial branch name to use in all
+2025-12-29T14:31:18.4133190Z hint: of your new repositories, which will suppress this warning, call:
+2025-12-29T14:31:18.4134280Z hint:
+2025-12-29T14:31:18.4134940Z hint: 	git config --global init.defaultBranch <name>
+2025-12-29T14:31:18.4135670Z hint:
+2025-12-29T14:31:18.4136350Z hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
+2025-12-29T14:31:18.4137440Z hint: 'development'. The just-created branch can be renamed via this command:
+2025-12-29T14:31:18.4138330Z hint:
+2025-12-29T14:31:18.4139040Z hint: 	git branch -m <name>
+2025-12-29T14:31:18.4139600Z hint:
+2025-12-29T14:31:18.4140340Z hint: Disable this message with "git config set advice.defaultBranchName false"
+2025-12-29T14:31:18.4145080Z Initialized empty Git repository in /Users/runner/work/DotChain/DotChain/.git/
+2025-12-29T14:31:18.4172150Z [command]/opt/homebrew/bin/git remote add origin https://github.com/doooooraku/DotChain
+2025-12-29T14:31:18.4311230Z ##[endgroup]
+2025-12-29T14:31:18.4312330Z ##[group]Disabling automatic garbage collection
+2025-12-29T14:31:18.4313660Z [command]/opt/homebrew/bin/git config --local gc.auto 0
+2025-12-29T14:31:18.4581460Z ##[endgroup]
+2025-12-29T14:31:18.4582280Z ##[group]Setting up auth
+2025-12-29T14:31:18.4583320Z [command]/opt/homebrew/bin/git config --local --name-only --get-regexp core\.sshCommand
+2025-12-29T14:31:18.4589330Z [command]/opt/homebrew/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
+2025-12-29T14:31:18.5906620Z [command]/opt/homebrew/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
+2025-12-29T14:31:18.6014170Z [command]/opt/homebrew/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
+2025-12-29T14:31:18.7623830Z [command]/opt/homebrew/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
+2025-12-29T14:31:18.7963240Z [command]/opt/homebrew/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
+2025-12-29T14:31:18.9621460Z [command]/opt/homebrew/bin/git config --local http.https://github.com/.extraheader AUTHORIZATION: basic ***
+2025-12-29T14:31:18.9624780Z ##[endgroup]
+2025-12-29T14:31:18.9625710Z ##[group]Fetching the repository
+2025-12-29T14:31:18.9630290Z [command]/opt/homebrew/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +e1f4416a5e2badf5632cb8a1eaa9f000579e8f4b:refs/remotes/origin/main
+2025-12-29T14:31:19.9872010Z From https://github.com/doooooraku/DotChain
+2025-12-29T14:31:19.9973320Z  * [new ref]         e1f4416a5e2badf5632cb8a1eaa9f000579e8f4b -> origin/main
+2025-12-29T14:31:20.0400960Z ##[endgroup]
+2025-12-29T14:31:20.0504320Z ##[group]Determining the checkout info
+2025-12-29T14:31:20.0606530Z ##[endgroup]
+2025-12-29T14:31:20.0630220Z [command]/opt/homebrew/bin/git sparse-checkout disable
+2025-12-29T14:31:20.0939580Z [command]/opt/homebrew/bin/git config --local --unset-all extensions.worktreeConfig
+2025-12-29T14:31:20.1312780Z ##[group]Checking out the ref
+2025-12-29T14:31:20.1419380Z [command]/opt/homebrew/bin/git checkout --progress --force -B main refs/remotes/origin/main
+2025-12-29T14:31:20.1521710Z Switched to a new branch 'main'
+2025-12-29T14:31:20.1628460Z branch 'main' set up to track 'origin/main'.
+2025-12-29T14:31:20.1980350Z ##[endgroup]
+2025-12-29T14:31:20.2246210Z [command]/opt/homebrew/bin/git log -1 --format=%H
+2025-12-29T14:31:20.2357350Z e1f4416a5e2badf5632cb8a1eaa9f000579e8f4b
+2025-12-29T14:31:20.3054020Z ##[group]Run pnpm/action-setup@v3
+2025-12-29T14:31:20.3054920Z with:
+2025-12-29T14:31:20.3055280Z   version: 9
+2025-12-29T14:31:20.3055580Z   dest: ~/setup-pnpm
+2025-12-29T14:31:20.3056100Z   run_install: null
+2025-12-29T14:31:20.3056440Z   package_json_file: package.json
+2025-12-29T14:31:20.3056780Z   standalone: false
+2025-12-29T14:31:20.3057230Z ##[endgroup]
+2025-12-29T14:31:20.4929990Z ##[group]Running self-installer...
+2025-12-29T14:31:21.3808260Z Progress: resolved 1, reused 0, downloaded 0, added 0
+2025-12-29T14:31:21.4530030Z Packages: +1
+2025-12-29T14:31:21.4682800Z +
+2025-12-29T14:31:22.4926470Z Progress: resolved 1, reused 0, downloaded 1, added 0
+2025-12-29T14:31:22.9527750Z Progress: resolved 1, reused 0, downloaded 1, added 1, done
+2025-12-29T14:31:23.0304020Z 
+2025-12-29T14:31:23.0405630Z dependencies:
+2025-12-29T14:31:23.0521620Z + pnpm 9.15.9 (10.26.2 is available)
+2025-12-29T14:31:23.0636970Z 
+2025-12-29T14:31:23.0739550Z Done in 2.2s
+2025-12-29T14:31:23.0843610Z ##[endgroup]
+2025-12-29T14:31:23.0947460Z Installation Completed!
+2025-12-29T14:31:23.1152820Z ##[group]Run actions/setup-node@v4
+2025-12-29T14:31:23.1153310Z with:
+2025-12-29T14:31:23.1153750Z   node-version: 20
+2025-12-29T14:31:23.1154090Z   cache: pnpm
+2025-12-29T14:31:23.1154420Z   always-auth: false
+2025-12-29T14:31:23.1154790Z   check-latest: false
+2025-12-29T14:31:23.1158260Z   token: ***
+2025-12-29T14:31:23.1159240Z env:
+2025-12-29T14:31:23.1160180Z   PNPM_HOME: /Users/runner/setup-pnpm/node_modules/.bin
+2025-12-29T14:31:23.1161450Z ##[endgroup]
+2025-12-29T14:31:23.4895530Z Found in cache @ /Users/runner/hostedtoolcache/node/20.19.6/arm64
+2025-12-29T14:31:23.4997130Z ##[group]Environment details
+2025-12-29T14:31:24.3024770Z node: v20.19.6
+2025-12-29T14:31:24.3127460Z npm: 10.8.2
+2025-12-29T14:31:24.3232260Z yarn: 1.22.22
+2025-12-29T14:31:24.3336350Z ##[endgroup]
+2025-12-29T14:31:24.3453880Z [command]/Users/runner/setup-pnpm/node_modules/.bin/pnpm store path --silent
+2025-12-29T14:31:24.8425060Z /Users/runner/setup-pnpm/node_modules/.bin/store/v3
+2025-12-29T14:31:25.1849410Z Cache hit for: node-cache-macOS-arm64-pnpm-8dfefac57cacc1eec6ff4c86072be7efed1ed7ab442bad6d34ba4730a8e38e34
+2025-12-29T14:31:26.3279400Z Received 37748736 of 159251964 (23.7%), 36.0 MBs/sec
+2025-12-29T14:31:27.9029220Z Received 134217728 of 159251964 (84.3%), 49.7 MBs/sec
+2025-12-29T14:31:28.3264570Z Received 159251964 of 159251964 (100.0%), 50.6 MBs/sec
+2025-12-29T14:31:28.3441780Z Cache Size: ~152 MB (159251964 B)
+2025-12-29T14:31:28.3650480Z [command]/opt/homebrew/bin/gtar -xf /Users/runner/work/_temp/c78348e7-4aa6-48a0-86aa-9a32f93d94ea/cache.tzst -P -C /Users/runner/work/DotChain/DotChain --delay-directory-restore --use-compress-program unzstd
+2025-12-29T14:31:51.8042720Z Cache restored successfully
+2025-12-29T14:31:51.8101690Z Cache restored from key: node-cache-macOS-arm64-pnpm-8dfefac57cacc1eec6ff4c86072be7efed1ed7ab442bad6d34ba4730a8e38e34
+2025-12-29T14:31:51.8627430Z ##[group]Run npm install -g eas-cli
+2025-12-29T14:31:51.8629040Z [36;1mnpm install -g eas-cli[0m
+2025-12-29T14:31:52.1809600Z shell: /bin/bash -e {0}
+2025-12-29T14:31:52.1810490Z env:
+2025-12-29T14:31:52.1811110Z   PNPM_HOME: /Users/runner/setup-pnpm/node_modules/.bin
+2025-12-29T14:31:52.1811860Z ##[endgroup]
+2025-12-29T14:32:08.5642210Z npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
+2025-12-29T14:32:10.0130750Z npm warn deprecated glob@6.0.4: Glob versions prior to v9 are no longer supported
+2025-12-29T14:32:10.0770430Z npm warn deprecated rimraf@2.4.5: Rimraf versions prior to v4 are no longer supported
+2025-12-29T14:32:10.2413020Z npm warn deprecated lodash.get@4.4.2: This package is deprecated. Use the optional chaining (?.) operator instead.
+2025-12-29T14:32:10.2515520Z npm warn deprecated @oclif/screen@3.0.8: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
+2025-12-29T14:32:10.6104230Z npm warn deprecated sudo-prompt@9.1.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
+2025-12-29T14:32:11.4880280Z npm warn deprecated @xmldom/xmldom@0.7.13: this version is no longer supported, please update to at least 0.8.*
+2025-12-29T14:32:32.4804270Z 
+2025-12-29T14:32:32.4893440Z added 465 packages in 39s
+2025-12-29T14:32:32.4995160Z 
+2025-12-29T14:32:32.5104020Z 60 packages are looking for funding
+2025-12-29T14:32:32.5206030Z   run `npm fund` for details
+2025-12-29T14:32:32.5845640Z ##[group]Run pnpm install
+2025-12-29T14:32:32.5846090Z [36;1mpnpm install[0m
+2025-12-29T14:32:32.6018560Z shell: /bin/bash -e {0}
+2025-12-29T14:32:32.6019420Z env:
+2025-12-29T14:32:32.6020190Z   PNPM_HOME: /Users/runner/setup-pnpm/node_modules/.bin
+2025-12-29T14:32:32.6020860Z ##[endgroup]
+2025-12-29T14:32:33.5202120Z Lockfile is up to date, resolution step is skipped
+2025-12-29T14:32:33.6337680Z Progress: resolved 1, reused 0, downloaded 0, added 0
+2025-12-29T14:32:33.9176860Z Packages: +1306
+2025-12-29T14:32:33.9292030Z ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+2025-12-29T14:32:34.6367210Z Progress: resolved 1306, reused 83, downloaded 0, added 0
+2025-12-29T14:32:35.6349000Z Progress: resolved 1306, reused 385, downloaded 0, added 0
+2025-12-29T14:32:36.6411030Z Progress: resolved 1306, reused 669, downloaded 0, added 0
+2025-12-29T14:32:37.6427870Z Progress: resolved 1306, reused 827, downloaded 0, added 0
+2025-12-29T14:32:38.6460810Z Progress: resolved 1306, reused 988, downloaded 0, added 0
+2025-12-29T14:32:39.6409990Z Progress: resolved 1306, reused 1135, downloaded 0, added 0
+2025-12-29T14:32:40.6577670Z Progress: resolved 1306, reused 1306, downloaded 0, added 1
+2025-12-29T14:32:41.6615650Z Progress: resolved 1306, reused 1306, downloaded 0, added 39
+2025-12-29T14:32:42.6634700Z Progress: resolved 1306, reused 1306, downloaded 0, added 126
+2025-12-29T14:32:43.6696790Z Progress: resolved 1306, reused 1306, downloaded 0, added 217
+2025-12-29T14:32:44.6788300Z Progress: resolved 1306, reused 1306, downloaded 0, added 338
+2025-12-29T14:32:45.6834980Z Progress: resolved 1306, reused 1306, downloaded 0, added 391
+2025-12-29T14:32:46.6811000Z Progress: resolved 1306, reused 1306, downloaded 0, added 504
+2025-12-29T14:32:47.6963000Z Progress: resolved 1306, reused 1306, downloaded 0, added 512
+2025-12-29T14:32:48.6991180Z Progress: resolved 1306, reused 1306, downloaded 0, added 534
+2025-12-29T14:32:49.7027380Z Progress: resolved 1306, reused 1306, downloaded 0, added 563
+2025-12-29T14:32:50.7106950Z Progress: resolved 1306, reused 1306, downloaded 0, added 640
+2025-12-29T14:32:51.7081810Z Progress: resolved 1306, reused 1306, downloaded 0, added 660
+2025-12-29T14:32:52.7054090Z Progress: resolved 1306, reused 1306, downloaded 0, added 695
+2025-12-29T14:32:53.7153360Z Progress: resolved 1306, reused 1306, downloaded 0, added 772
+2025-12-29T14:32:54.7074720Z Progress: resolved 1306, reused 1306, downloaded 0, added 795
+2025-12-29T14:32:55.7084340Z Progress: resolved 1306, reused 1306, downloaded 0, added 862
+2025-12-29T14:32:56.7084200Z Progress: resolved 1306, reused 1306, downloaded 0, added 962
+2025-12-29T14:32:57.7112250Z Progress: resolved 1306, reused 1306, downloaded 0, added 1039
+2025-12-29T14:32:58.7170660Z Progress: resolved 1306, reused 1306, downloaded 0, added 1059
+2025-12-29T14:32:59.7161440Z Progress: resolved 1306, reused 1306, downloaded 0, added 1111
+2025-12-29T14:33:00.7225680Z Progress: resolved 1306, reused 1306, downloaded 0, added 1134
+2025-12-29T14:33:01.7339440Z Progress: resolved 1306, reused 1306, downloaded 0, added 1140
+2025-12-29T14:33:02.7508500Z Progress: resolved 1306, reused 1306, downloaded 0, added 1141
+2025-12-29T14:33:03.7531980Z Progress: resolved 1306, reused 1306, downloaded 0, added 1200
+2025-12-29T14:33:04.7551880Z Progress: resolved 1306, reused 1306, downloaded 0, added 1219
+2025-12-29T14:33:05.7613710Z Progress: resolved 1306, reused 1306, downloaded 0, added 1286
+2025-12-29T14:33:06.7644840Z Progress: resolved 1306, reused 1306, downloaded 0, added 1305
+2025-12-29T14:33:10.5836250Z Progress: resolved 1306, reused 1306, downloaded 0, added 1306
+2025-12-29T14:33:10.5881620Z Progress: resolved 1306, reused 1306, downloaded 0, added 1306, done
+2025-12-29T14:33:12.6235810Z 
+2025-12-29T14:33:12.6337710Z dependencies:
+2025-12-29T14:33:12.6440830Z + @expo/vector-icons 15.0.3
+2025-12-29T14:33:12.6549520Z + @react-native-async-storage/async-storage 2.2.0
+2025-12-29T14:33:12.6663930Z + @react-native-community/datetimepicker 8.4.4
+2025-12-29T14:33:12.6788180Z + @react-navigation/bottom-tabs 7.8.5
+2025-12-29T14:33:12.6889900Z + @react-navigation/elements 2.8.2
+2025-12-29T14:33:12.6991850Z + @react-navigation/native 7.1.20
+2025-12-29T14:33:12.7121060Z + @supabase/supabase-js 2.81.1
+2025-12-29T14:33:12.7122760Z + @tamagui/animations-react-native 1.138.5
+2025-12-29T14:33:12.7223870Z + @tamagui/core 1.138.5
+2025-12-29T14:33:12.7325820Z + @tamagui/lucide-icons 1.138.5
+2025-12-29T14:33:12.7428260Z + @tamagui/portal 1.138.5
+2025-12-29T14:33:12.7529860Z + @tanstack/react-query 5.90.10
+2025-12-29T14:33:12.7632050Z + dotenv 17.2.3
+2025-12-29T14:33:12.7720480Z + expo 54.0.27
+2025-12-29T14:33:12.7821470Z + expo-av 16.0.8
+2025-12-29T14:33:12.7922440Z + expo-constants 18.0.11
+2025-12-29T14:33:12.8022890Z + expo-crypto 15.0.8
+2025-12-29T14:33:12.8125940Z + expo-dev-client 6.0.20
+2025-12-29T14:33:12.8227190Z + expo-font 14.0.10
+2025-12-29T14:33:12.8328280Z + expo-haptics 15.0.8
+2025-12-29T14:33:12.8429240Z + expo-image 3.0.11
+2025-12-29T14:33:12.8530720Z + expo-linear-gradient 15.0.8
+2025-12-29T14:33:12.8631220Z + expo-linking 8.0.10
+2025-12-29T14:33:12.8732480Z + expo-localization 17.0.8
+2025-12-29T14:33:12.8833170Z + expo-notifications 0.32.14
+2025-12-29T14:33:12.8934060Z + expo-router 6.0.17
+2025-12-29T14:33:12.9035490Z + expo-secure-store 15.0.8
+2025-12-29T14:33:12.9135770Z + expo-splash-screen 31.0.12
+2025-12-29T14:33:12.9236870Z + expo-sqlite 16.0.10
+2025-12-29T14:33:12.9337950Z + expo-status-bar 3.0.9
+2025-12-29T14:33:12.9440530Z + expo-store-review 9.0.9
+2025-12-29T14:33:12.9541930Z + expo-symbols 1.0.8
+2025-12-29T14:33:12.9643460Z + expo-system-ui 6.0.9
+2025-12-29T14:33:12.9744840Z + expo-web-browser 15.0.10
+2025-12-29T14:33:12.9845700Z + react 19.1.0
+2025-12-29T14:33:12.9946620Z + react-dom 19.1.0
+2025-12-29T14:33:13.0047330Z + react-native 0.81.5
+2025-12-29T14:33:13.0149170Z + react-native-confetti-cannon 1.5.2
+2025-12-29T14:33:13.0249070Z + react-native-gesture-handler 2.28.0
+2025-12-29T14:33:13.0352820Z + react-native-purchases 9.6.6
+2025-12-29T14:33:13.0452390Z + react-native-reanimated 4.1.5
+2025-12-29T14:33:13.0559500Z + react-native-safe-area-context 5.6.2
+2025-12-29T14:33:13.0660120Z + react-native-screens 4.16.0
+2025-12-29T14:33:13.0761330Z + react-native-svg 15.12.1
+2025-12-29T14:33:13.0864500Z + react-native-web 0.21.2
+2025-12-29T14:33:13.0967040Z + react-native-worklets 0.5.1
+2025-12-29T14:33:13.1067520Z + tamagui 1.138.5
+2025-12-29T14:33:13.1170850Z + zustand 5.0.8
+2025-12-29T14:33:13.1271910Z 
+2025-12-29T14:33:13.1370120Z devDependencies:
+2025-12-29T14:33:13.1471390Z + @react-native/eslint-config 0.82.1
+2025-12-29T14:33:13.1571560Z + @tamagui/babel-plugin 1.138.5
+2025-12-29T14:33:13.1674100Z + @testing-library/jest-native 5.4.3
+2025-12-29T14:33:13.1773820Z + @testing-library/react-native 13.3.3
+2025-12-29T14:33:13.1875780Z + @types/jest 29.5.14
+2025-12-29T14:33:13.1977530Z + @types/react 19.1.17
+2025-12-29T14:33:13.2080520Z + eslint 9.39.1
+2025-12-29T14:33:13.2182190Z + eslint-config-expo 10.0.0
+2025-12-29T14:33:13.2283340Z + eslint-config-prettier 10.1.8
+2025-12-29T14:33:13.2384350Z + eslint-plugin-react 7.37.5
+2025-12-29T14:33:13.2487510Z + eslint-plugin-react-hooks 7.0.1
+2025-12-29T14:33:13.2592520Z + jest 29.7.0
+2025-12-29T14:33:13.2701460Z + jest-expo 54.0.14
+2025-12-29T14:33:13.2802450Z + prettier 3.6.2
+2025-12-29T14:33:13.2904840Z + react-native-svg-transformer 1.5.2
+2025-12-29T14:33:13.3006560Z + react-test-renderer 19.1.0
+2025-12-29T14:33:13.3109120Z + ts-jest 29.4.5
+2025-12-29T14:33:13.3211530Z + typescript 5.9.3
+2025-12-29T14:33:13.3311930Z 
+2025-12-29T14:33:13.3413810Z Done in 39.8s using pnpm v9.15.9
+2025-12-29T14:33:13.3927260Z ##[group]Run # 必要なキーをここに追加してください
+2025-12-29T14:33:13.3927830Z [36;1m# 必要なキーをここに追加してください[0m
+2025-12-29T14:33:13.3928170Z [36;1mecho "EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=" >> .env[0m
+2025-12-29T14:33:13.3928580Z [36;1mecho "EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY=" >> .env[0m
+2025-12-29T14:33:13.9450370Z shell: /bin/bash -e {0}
+2025-12-29T14:33:13.9451000Z env:
+2025-12-29T14:33:13.9451490Z   PNPM_HOME: /Users/runner/setup-pnpm/node_modules/.bin
+2025-12-29T14:33:13.9452160Z ##[endgroup]
+2025-12-29T14:33:14.0957650Z ##[group]Run eas build --platform ios --profile production --local --non-interactive --output=DotChain.ipa
+2025-12-29T14:33:14.0959130Z [36;1meas build --platform ios --profile production --local --non-interactive --output=DotChain.ipa[0m
+2025-12-29T14:33:14.1008210Z shell: /bin/bash -e {0}
+2025-12-29T14:33:14.1008550Z env:
+2025-12-29T14:33:14.1008810Z   PNPM_HOME: /Users/runner/setup-pnpm/node_modules/.bin
+2025-12-29T14:33:14.1009460Z   EXPO_TOKEN: ***
+2025-12-29T14:33:14.1009700Z ##[endgroup]
+2025-12-29T14:33:21.9438500Z Resolved "production" environment for the build. Learn more: https://docs.expo.dev/eas/environment-variables/#setting-the-environment-for-your-builds
+2025-12-29T14:33:22.0354460Z No environment variables with visibility "Plain text" and "Sensitive" found for the "production" environment on EAS.
+2025-12-29T14:33:22.0411250Z 
+2025-12-29T14:33:26.9335940Z Resource class m1-medium is deprecated. Use m-medium instead.
+2025-12-29T14:33:29.5691690Z - Incrementing buildNumber from 1.0.10 to 1.0.11.
+2025-12-29T14:33:29.7162470Z ✔ Incremented buildNumber from 1.0.10 to 1.0.11.
+2025-12-29T14:33:29.7267820Z ios.buildNumber field in app config is ignored when version source is set to remote, but this value will still be in the manifest available via expo-constants. It's recommended to remove this value from app config.
+2025-12-29T14:33:29.7371550Z ✔ Using remote iOS credentials (Expo server)
+2025-12-29T14:33:29.7473030Z 
+2025-12-29T14:33:30.0614700Z Distribution Certificate is not validated for non-interactive builds.
+2025-12-29T14:33:30.4305220Z Skipping Provisioning Profile validation on Apple Servers because we aren't authenticated.
+2025-12-29T14:33:30.4406890Z 
+2025-12-29T14:33:30.4509040Z Project Credentials Configuration
+2025-12-29T14:33:30.4611610Z 
+2025-12-29T14:33:30.4713740Z Project                   @dooraku/dotchain
+2025-12-29T14:33:30.4821200Z Bundle Identifier         com.doooooraku.dotchain
+2025-12-29T14:33:30.4923070Z                           
+2025-12-29T14:33:30.5026250Z App Store Configuration   
+2025-12-29T14:33:30.5133120Z                           
+2025-12-29T14:33:30.5234810Z Distribution Certificate  
+2025-12-29T14:33:30.5343000Z Serial Number             2D28305DDA6411BC13553F69848EF8D5
+2025-12-29T14:33:30.5345320Z Expiration Date           Sat, 26 Dec 2026 04:23:13 UTC
+2025-12-29T14:33:30.5449200Z Apple Team                HSH4HJ72Y8 (MAKOTO NAKAGAWA (Individual))
+2025-12-29T14:33:30.5552180Z Updated                   3 days ago
+2025-12-29T14:33:30.5654840Z                           
+2025-12-29T14:33:30.5758330Z Provisioning Profile      
+2025-12-29T14:33:30.5851660Z Developer Portal ID       A9QBDJ44SW
+2025-12-29T14:33:30.5954190Z Status                    active
+2025-12-29T14:33:30.6056970Z Expiration                Sat, 26 Dec 2026 04:23:13 UTC
+2025-12-29T14:33:30.6159550Z Apple Team                HSH4HJ72Y8 (MAKOTO NAKAGAWA (Individual))
+2025-12-29T14:33:30.6260790Z Updated                   3 days ago
+2025-12-29T14:33:30.6363360Z                           
+2025-12-29T14:33:30.6465180Z All credentials are ready to build @dooraku/dotchain (com.doooooraku.dotchain)
+2025-12-29T14:33:30.6566290Z 
+2025-12-29T14:33:31.4407320Z - Compressing project files
+2025-12-29T14:33:31.4716000Z - Computing project fingerprint
+2025-12-29T14:33:33.6672180Z ✔ Computed project fingerprint
+2025-12-29T14:33:47.4181840Z npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
+2025-12-29T14:33:47.4423080Z npm warn deprecated rimraf@2.4.5: Rimraf versions prior to v4 are no longer supported
+2025-12-29T14:33:47.4763130Z npm warn deprecated lodash.get@4.4.2: This package is deprecated. Use the optional chaining (?.) operator instead.
+2025-12-29T14:33:47.7265680Z npm warn deprecated glob@6.0.4: Glob versions prior to v9 are no longer supported
+2025-12-29T14:33:47.7487250Z npm warn deprecated sudo-prompt@9.1.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
+2025-12-29T14:33:48.1528880Z npm warn deprecated @xmldom/xmldom@0.7.13: this version is no longer supported, please update to at least 0.8.*
+2025-12-29T14:34:07.2913610Z [SETUP_WORKINGDIR] Preparing workingdir /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059
+2025-12-29T14:34:07.3019330Z [START_BUILD] Starting build
+2025-12-29T14:34:07.3035060Z Local build, skipping project archive refresh
+2025-12-29T14:34:07.3241560Z   "job": {
+2025-12-29T14:34:07.3327200Z     "type": "managed",
+2025-12-29T14:34:07.3428910Z     "platform": "ios",
+2025-12-29T14:34:07.3530390Z     "projectArchive": {
+2025-12-29T14:34:07.3599970Z       "type": "PATH",
+2025-12-29T14:34:07.3720370Z       "path": "/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-cli-nodejs/fbeb7cdf-92e6-45f6-abd1-72fa08f3fcdb.tar.gz"
+2025-12-29T14:34:07.3822860Z     },
+2025-12-29T14:34:07.3924520Z     "projectRootDirectory": ".",
+2025-12-29T14:34:07.4026790Z     "builderEnvironment": {
+2025-12-29T14:34:07.4128520Z       "env": {}
+2025-12-29T14:34:07.4233540Z     },
+2025-12-29T14:34:07.4336850Z     "cache": {
+2025-12-29T14:34:07.4439990Z       "disabled": false,
+2025-12-29T14:34:07.4541130Z       "paths": [],
+2025-12-29T14:34:07.4643640Z       "clear": false
+2025-12-29T14:34:07.4745090Z     },
+2025-12-29T14:34:07.4847040Z     "updates": {},
+2025-12-29T14:34:07.4948800Z     "scheme": "DotChain",
+2025-12-29T14:34:07.5050020Z     "username": "dooraku",
+2025-12-29T14:34:07.5151280Z     "version": {
+2025-12-29T14:34:07.5252530Z       "buildNumber": "1.0.11"
+2025-12-29T14:34:07.5387330Z     },
+2025-12-29T14:34:07.5503800Z     "experimental": {},
+2025-12-29T14:34:07.5621230Z     "mode": "build",
+2025-12-29T14:34:07.5757520Z     "triggeredBy": "EAS_CLI",
+2025-12-29T14:34:07.5763600Z     "appId": "9a84b4b9-5b2b-4b2a-95c1-9a163afa6c12",
+2025-12-29T14:34:07.5864790Z     "initiatingUserId": "54180263-d81e-43db-bf75-0f5d97f4e454"
+2025-12-29T14:34:07.5966210Z   }
+2025-12-29T14:34:07.6088190Z [READ_PACKAGE_JSON] Using package.json:
+2025-12-29T14:34:07.6199970Z [READ_PACKAGE_JSON] {
+2025-12-29T14:34:07.6303570Z   "name": "dotchain",
+2025-12-29T14:34:07.6407310Z   "main": "expo-router/entry",
+2025-12-29T14:34:07.6509970Z   "version": "1.0.0",
+2025-12-29T14:34:07.6628120Z   "scripts": {
+2025-12-29T14:34:07.6730720Z     "dev": "expo start",
+2025-12-29T14:34:07.6832400Z     "start": "expo start",
+2025-12-29T14:34:07.6934170Z     "android": "expo run:android",
+2025-12-29T14:34:07.7040660Z     "ios": "expo run:ios",
+2025-12-29T14:34:07.7145600Z     "web": "expo start --web",
+2025-12-29T14:34:07.7248210Z     "lint": "eslint .",
+2025-12-29T14:34:07.7349050Z     "type-check": "tsc --noEmit",
+2025-12-29T14:34:07.7452610Z     "test": "jest --passWithNoTests",
+2025-12-29T14:34:07.7576590Z     "test:e2e": "maestro test maestro/flows/smoke.yml",
+2025-12-29T14:34:07.7679930Z     "prebuild": "expo prebuild",
+2025-12-29T14:34:07.7781840Z     "build:android": "expo prebuild --platform android && cd android && ./gradlew bundleRelease"
+2025-12-29T14:34:07.7889440Z   },
+2025-12-29T14:34:07.7992530Z   "dependencies": {
+2025-12-29T14:34:07.8104590Z     "@expo/vector-icons": "^15.0.3",
+2025-12-29T14:34:07.8205990Z     "@react-native-async-storage/async-storage": "^2.2.0",
+2025-12-29T14:34:07.8308330Z     "@react-native-community/datetimepicker": "8.4.4",
+2025-12-29T14:34:07.8416740Z     "@react-navigation/bottom-tabs": "^7.4.0",
+2025-12-29T14:34:07.8520110Z     "@react-navigation/elements": "^2.6.3",
+2025-12-29T14:34:07.8623250Z     "@react-navigation/native": "^7.1.8",
+2025-12-29T14:34:07.8725040Z     "@supabase/supabase-js": "^2.81.1",
+2025-12-29T14:34:07.8826370Z     "@tamagui/animations-react-native": "^1.138.5",
+2025-12-29T14:34:07.8929460Z     "@tamagui/core": "1.138.5",
+2025-12-29T14:34:07.9031210Z     "@tamagui/lucide-icons": "1.138.5",
+2025-12-29T14:34:07.9135750Z     "@tamagui/portal": "1.138.5",
+2025-12-29T14:34:07.9250490Z     "@tanstack/react-query": "^5.90.10",
+2025-12-29T14:34:07.9353890Z     "dotenv": "^17.2.3",
+2025-12-29T14:34:07.9455790Z     "expo": "~54.0.27",
+2025-12-29T14:34:07.9559770Z     "expo-av": "^16.0.8",
+2025-12-29T14:34:07.9663680Z     "expo-constants": "~18.0.11",
+2025-12-29T14:34:07.9764880Z     "expo-crypto": "^15.0.8",
+2025-12-29T14:34:07.9867080Z     "expo-dev-client": "~6.0.20",
+2025-12-29T14:34:07.9968050Z     "expo-font": "~14.0.10",
+2025-12-29T14:34:08.0070330Z     "expo-haptics": "~15.0.8",
+2025-12-29T14:34:08.0166100Z     "expo-image": "~3.0.11",
+2025-12-29T14:34:08.0267330Z     "expo-linear-gradient": "^15.0.8",
+2025-12-29T14:34:08.0368780Z     "expo-linking": "~8.0.10",
+2025-12-29T14:34:08.0470330Z     "expo-localization": "~17.0.8",
+2025-12-29T14:34:08.0572600Z     "expo-notifications": "^0.32.14",
+2025-12-29T14:34:08.0675630Z     "expo-router": "~6.0.17",
+2025-12-29T14:34:08.0777570Z     "expo-secure-store": "^15.0.8",
+2025-12-29T14:34:08.0878670Z     "expo-splash-screen": "~31.0.12",
+2025-12-29T14:34:08.0980840Z     "expo-sqlite": "^16.0.10",
+2025-12-29T14:34:08.1092690Z     "expo-status-bar": "~3.0.9",
+2025-12-29T14:34:08.1232930Z     "expo-store-review": "~9.0.9",
+2025-12-29T14:34:08.1359930Z     "expo-symbols": "~1.0.8",
+2025-12-29T14:34:08.1466710Z     "expo-system-ui": "~6.0.9",
+2025-12-29T14:34:08.1587320Z     "expo-web-browser": "~15.0.10",
+2025-12-29T14:34:08.1693580Z     "react": "19.1.0",
+2025-12-29T14:34:08.1801420Z     "react-dom": "19.1.0",
+2025-12-29T14:34:08.1902820Z     "react-native": "0.81.5",
+2025-12-29T14:34:08.2040140Z     "react-native-confetti-cannon": "^1.5.2",
+2025-12-29T14:34:08.2141740Z     "react-native-gesture-handler": "~2.28.0",
+2025-12-29T14:34:08.2244570Z     "react-native-purchases": "^9.6.6",
+2025-12-29T14:34:08.2345890Z     "react-native-reanimated": "~4.1.1",
+2025-12-29T14:34:08.2800560Z     "react-native-safe-area-context": "~5.6.0",
+2025-12-29T14:34:08.2939560Z     "react-native-screens": "~4.16.0",
+2025-12-29T14:34:08.3054860Z     "react-native-svg": "15.12.1",
+2025-12-29T14:34:08.3156450Z     "react-native-web": "~0.21.0",
+2025-12-29T14:34:08.3263100Z     "react-native-worklets": "0.5.1",
+2025-12-29T14:34:08.3365620Z     "tamagui": "1.138.5",
+2025-12-29T14:34:08.3468490Z     "zustand": "^5.0.8"
+2025-12-29T14:34:08.3572490Z   },
+2025-12-29T14:34:08.3683130Z   "devDependencies": {
+2025-12-29T14:34:08.3804060Z     "@react-native/eslint-config": "^0.82.1",
+2025-12-29T14:34:08.3805230Z     "@tamagui/babel-plugin": "1.138.5",
+2025-12-29T14:34:08.4005700Z     "@testing-library/jest-native": "^5.4.3",
+2025-12-29T14:34:08.4107310Z     "@testing-library/react-native": "^13.3.3",
+2025-12-29T14:34:08.4130070Z     "@types/jest": "29.5.14",
+2025-12-29T14:34:08.4236100Z     "@types/react": "~19.1.0",
+2025-12-29T14:34:08.4340730Z     "eslint": "^9.39.1",
+2025-12-29T14:34:08.4443010Z     "eslint-config-expo": "~10.0.0",
+2025-12-29T14:34:08.4542780Z     "eslint-config-prettier": "^10.1.8",
+2025-12-29T14:34:08.4646040Z     "eslint-plugin-react": "^7.37.5",
+2025-12-29T14:34:08.4748470Z     "eslint-plugin-react-hooks": "^7.0.1",
+2025-12-29T14:34:08.4850760Z     "jest": "~29.7.0",
+2025-12-29T14:34:08.4952070Z     "jest-expo": "~54.0.14",
+2025-12-29T14:34:08.5053950Z     "prettier": "^3.6.2",
+2025-12-29T14:34:08.5155370Z     "react-native-svg-transformer": "^1.5.2",
+2025-12-29T14:34:08.5256690Z     "react-test-renderer": "19.1.0",
+2025-12-29T14:34:08.5370300Z     "ts-jest": "^29.4.5",
+2025-12-29T14:34:08.5451720Z     "typescript": "~5.9.2"
+2025-12-29T14:34:08.5582320Z   },
+2025-12-29T14:34:08.5722790Z   "private": true,
+2025-12-29T14:34:08.5822790Z   "jest": {
+2025-12-29T14:34:08.5929190Z     "preset": "jest-expo"
+2025-12-29T14:34:08.6078790Z   }
+2025-12-29T14:34:08.6179920Z }
+2025-12-29T14:34:08.6284540Z [INSTALL_DEPENDENCIES] Running "pnpm install --frozen-lockfile" in /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build directory
+2025-12-29T14:34:08.6393190Z [INSTALL_DEPENDENCIES] Lockfile is up to date, resolution step is skipped
+2025-12-29T14:34:08.6492630Z [INSTALL_DEPENDENCIES] Progress: resolved 1, reused 0, downloaded 0, added 0
+2025-12-29T14:34:08.6595000Z [INSTALL_DEPENDENCIES] Packages: +1306
+2025-12-29T14:34:08.6699180Z [INSTALL_DEPENDENCIES] ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+2025-12-29T14:34:09.4003940Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 21, downloaded 0, added 0
+2025-12-29T14:34:10.4054160Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 72, downloaded 0, added 0
+2025-12-29T14:34:11.4050130Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 200, downloaded 0, added 0
+2025-12-29T14:34:12.4074160Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 463, downloaded 0, added 0
+2025-12-29T14:34:13.4131780Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 770, downloaded 0, added 0
+2025-12-29T14:34:14.4317850Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 875, downloaded 0, added 0
+2025-12-29T14:34:15.4354660Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1038, downloaded 0, added 0
+2025-12-29T14:34:16.4405630Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1183, downloaded 0, added 0
+2025-12-29T14:34:17.4525440Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 2
+2025-12-29T14:34:18.4510250Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 59
+2025-12-29T14:34:19.4626100Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 154
+2025-12-29T14:34:20.4722630Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 255
+2025-12-29T14:34:21.4769270Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 382
+2025-12-29T14:34:22.4789870Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 504
+2025-12-29T14:34:23.4863210Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 540
+2025-12-29T14:34:24.4857410Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 565
+2025-12-29T14:34:25.4978430Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 640
+2025-12-29T14:34:26.4890210Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 692
+2025-12-29T14:34:27.4924290Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 786
+2025-12-29T14:34:28.4994170Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 809
+2025-12-29T14:34:29.5136020Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 877
+2025-12-29T14:34:30.5142560Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 921
+2025-12-29T14:34:31.5139410Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 967
+2025-12-29T14:34:32.5193120Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 1034
+2025-12-29T14:34:33.5237580Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 1057
+2025-12-29T14:34:34.5200770Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 1121
+2025-12-29T14:34:35.5253830Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 1154
+2025-12-29T14:34:36.5271290Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 1206
+2025-12-29T14:34:37.5330200Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 1287
+2025-12-29T14:34:38.5353990Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 1305
+2025-12-29T14:34:41.1557400Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 1306
+2025-12-29T14:34:41.1560830Z [INSTALL_DEPENDENCIES] Progress: resolved 1306, reused 1306, downloaded 0, added 1306, done
+2025-12-29T14:34:42.2664760Z [INSTALL_DEPENDENCIES] dependencies:
+2025-12-29T14:34:42.2690440Z [INSTALL_DEPENDENCIES] + @expo/vector-icons 15.0.3
+2025-12-29T14:34:42.2726090Z [INSTALL_DEPENDENCIES] + @react-native-async-storage/async-storage 2.2.0
+2025-12-29T14:34:42.2727200Z [INSTALL_DEPENDENCIES] + @react-native-community/datetimepicker 8.4.4
+2025-12-29T14:34:42.2727690Z [INSTALL_DEPENDENCIES] + @react-navigation/bottom-tabs 7.8.5
+2025-12-29T14:34:42.2728140Z [INSTALL_DEPENDENCIES] + @react-navigation/elements 2.8.2
+2025-12-29T14:34:42.2728550Z [INSTALL_DEPENDENCIES] + @react-navigation/native 7.1.20
+2025-12-29T14:34:42.2729040Z [INSTALL_DEPENDENCIES] + @supabase/supabase-js 2.81.1
+2025-12-29T14:34:42.2729460Z [INSTALL_DEPENDENCIES] + @tamagui/animations-react-native 1.138.5
+2025-12-29T14:34:42.2729850Z [INSTALL_DEPENDENCIES] + @tamagui/core 1.138.5
+2025-12-29T14:34:42.2730260Z [INSTALL_DEPENDENCIES] + @tamagui/lucide-icons 1.138.5
+2025-12-29T14:34:42.2730670Z [INSTALL_DEPENDENCIES] + @tamagui/portal 1.138.5
+2025-12-29T14:34:42.2731160Z [INSTALL_DEPENDENCIES] + @tanstack/react-query 5.90.10
+2025-12-29T14:34:42.2731520Z [INSTALL_DEPENDENCIES] + dotenv 17.2.3
+2025-12-29T14:34:42.2731830Z [INSTALL_DEPENDENCIES] + expo 54.0.27
+2025-12-29T14:34:42.2732190Z [INSTALL_DEPENDENCIES] + expo-av 16.0.8
+2025-12-29T14:34:42.2732530Z [INSTALL_DEPENDENCIES] + expo-constants 18.0.11
+2025-12-29T14:34:42.2732910Z [INSTALL_DEPENDENCIES] + expo-crypto 15.0.8
+2025-12-29T14:34:42.2733250Z [INSTALL_DEPENDENCIES] + expo-dev-client 6.0.20
+2025-12-29T14:34:42.2733620Z [INSTALL_DEPENDENCIES] + expo-font 14.0.10
+2025-12-29T14:34:42.2733940Z [INSTALL_DEPENDENCIES] + expo-haptics 15.0.8
+2025-12-29T14:34:42.2735140Z [INSTALL_DEPENDENCIES] + expo-image 3.0.11
+2025-12-29T14:34:42.2736570Z [INSTALL_DEPENDENCIES] + expo-linear-gradient 15.0.8
+2025-12-29T14:34:42.2737820Z [INSTALL_DEPENDENCIES] + expo-linking 8.0.10
+2025-12-29T14:34:42.2740290Z [INSTALL_DEPENDENCIES] + expo-localization 17.0.8
+2025-12-29T14:34:42.2741710Z [INSTALL_DEPENDENCIES] + expo-notifications 0.32.14
+2025-12-29T14:34:42.2744590Z [INSTALL_DEPENDENCIES] + expo-router 6.0.17
+2025-12-29T14:34:42.2746090Z [INSTALL_DEPENDENCIES] + expo-secure-store 15.0.8
+2025-12-29T14:34:42.2748010Z [INSTALL_DEPENDENCIES] + expo-splash-screen 31.0.12
+2025-12-29T14:34:42.2749720Z [INSTALL_DEPENDENCIES] + expo-sqlite 16.0.10
+2025-12-29T14:34:42.2751190Z [INSTALL_DEPENDENCIES] + expo-status-bar 3.0.9
+2025-12-29T14:34:42.2754130Z [INSTALL_DEPENDENCIES] + expo-store-review 9.0.9
+2025-12-29T14:34:42.2754490Z [INSTALL_DEPENDENCIES] + expo-symbols 1.0.8
+2025-12-29T14:34:42.2754890Z [INSTALL_DEPENDENCIES] + expo-system-ui 6.0.9
+2025-12-29T14:34:42.2755300Z [INSTALL_DEPENDENCIES] + expo-web-browser 15.0.10
+2025-12-29T14:34:42.2755620Z [INSTALL_DEPENDENCIES] + react 19.1.0
+2025-12-29T14:34:42.2755970Z [INSTALL_DEPENDENCIES] + react-dom 19.1.0
+2025-12-29T14:34:42.2756330Z [INSTALL_DEPENDENCIES] + react-native 0.81.5
+2025-12-29T14:34:42.2756720Z [INSTALL_DEPENDENCIES] + react-native-confetti-cannon 1.5.2
+2025-12-29T14:34:42.2758050Z [INSTALL_DEPENDENCIES] + react-native-gesture-handler 2.28.0
+2025-12-29T14:34:42.2759330Z [INSTALL_DEPENDENCIES] + react-native-purchases 9.6.6
+2025-12-29T14:34:42.2760610Z [INSTALL_DEPENDENCIES] + react-native-reanimated 4.1.5
+2025-12-29T14:34:42.2761040Z [INSTALL_DEPENDENCIES] + react-native-safe-area-context 5.6.2
+2025-12-29T14:34:42.2761500Z [INSTALL_DEPENDENCIES] + react-native-screens 4.16.0
+2025-12-29T14:34:42.2762140Z [INSTALL_DEPENDENCIES] + react-native-svg 15.12.1
+2025-12-29T14:34:42.2762510Z [INSTALL_DEPENDENCIES] + react-native-web 0.21.2
+2025-12-29T14:34:42.2834030Z [INSTALL_DEPENDENCIES] + react-native-worklets 0.5.1
+2025-12-29T14:34:42.2834470Z [INSTALL_DEPENDENCIES] + tamagui 1.138.5
+2025-12-29T14:34:42.2834830Z [INSTALL_DEPENDENCIES] + zustand 5.0.8
+2025-12-29T14:34:42.2835080Z [INSTALL_DEPENDENCIES] 
+2025-12-29T14:34:42.2835420Z [INSTALL_DEPENDENCIES] devDependencies:
+2025-12-29T14:34:42.2836920Z [INSTALL_DEPENDENCIES] + @react-native/eslint-config 0.82.1
+2025-12-29T14:34:42.2837390Z [INSTALL_DEPENDENCIES] + @tamagui/babel-plugin 1.138.5
+2025-12-29T14:34:42.2837810Z [INSTALL_DEPENDENCIES] + @testing-library/jest-native 5.4.3
+2025-12-29T14:34:42.2841430Z [INSTALL_DEPENDENCIES] + @testing-library/react-native 13.3.3
+2025-12-29T14:34:42.2841910Z [INSTALL_DEPENDENCIES] + @types/jest 29.5.14
+2025-12-29T14:34:42.2842270Z [INSTALL_DEPENDENCIES] + @types/react 19.1.17
+2025-12-29T14:34:42.2842640Z [INSTALL_DEPENDENCIES] + eslint 9.39.1
+2025-12-29T14:34:42.2843130Z [INSTALL_DEPENDENCIES] + eslint-config-expo 10.0.0
+2025-12-29T14:34:42.2843590Z [INSTALL_DEPENDENCIES] + eslint-config-prettier 10.1.8
+2025-12-29T14:34:42.2843980Z [INSTALL_DEPENDENCIES] + eslint-plugin-react 7.37.5
+2025-12-29T14:34:42.2844380Z [INSTALL_DEPENDENCIES] + eslint-plugin-react-hooks 7.0.1
+2025-12-29T14:34:42.2844770Z [INSTALL_DEPENDENCIES] + jest 29.7.0
+2025-12-29T14:34:42.2845090Z [INSTALL_DEPENDENCIES] + jest-expo 54.0.14
+2025-12-29T14:34:42.2845930Z [INSTALL_DEPENDENCIES] + prettier 3.6.2
+2025-12-29T14:34:42.2846370Z [INSTALL_DEPENDENCIES] + react-native-svg-transformer 1.5.2
+2025-12-29T14:34:42.2849450Z [INSTALL_DEPENDENCIES] + react-test-renderer 19.1.0
+2025-12-29T14:34:42.2849780Z [INSTALL_DEPENDENCIES] + ts-jest 29.4.5
+2025-12-29T14:34:42.2850140Z [INSTALL_DEPENDENCIES] + typescript 5.9.3
+2025-12-29T14:34:42.3060890Z [INSTALL_DEPENDENCIES] Done in 34.6s using pnpm v9.15.9
+2025-12-29T14:34:42.3476710Z The NODE_ENV environment variable is required but was not specified. Ensure the project is bundled with Expo CLI or NODE_ENV is set.
+2025-12-29T14:34:42.3477540Z Proceeding without mode-specific .env
+2025-12-29T14:34:42.7417060Z [READ_APP_CONFIG] Using app configuration:
+2025-12-29T14:34:42.7418250Z [READ_APP_CONFIG] {
+2025-12-29T14:34:42.7418920Z   "name": "DotChain",
+2025-12-29T14:34:42.7419640Z   "slug": "dotchain",
+2025-12-29T14:34:42.7420970Z   "version": "1.0.0",
+2025-12-29T14:34:42.7421530Z   "orientation": "portrait",
+2025-12-29T14:34:42.7422490Z   "icon": "./assets/images/icon.png",
+2025-12-29T14:34:42.7423120Z   "scheme": "dotchain",
+2025-12-29T14:34:42.7423880Z   "userInterfaceStyle": "automatic",
+2025-12-29T14:34:42.7424510Z   "newArchEnabled": true,
+2025-12-29T14:34:42.7425070Z   "ios": {
+2025-12-29T14:34:42.7425670Z     "supportsTablet": true,
+2025-12-29T14:34:42.7426480Z     "bundleIdentifier": "com.doooooraku.dotchain",
+2025-12-29T14:34:42.7427360Z     "buildNumber": "1.0.0",
+2025-12-29T14:34:42.7428060Z     "infoPlist": {
+2025-12-29T14:34:42.7428720Z       "ITSAppUsesNonExemptEncryption": false
+2025-12-29T14:34:42.7429420Z     }
+2025-12-29T14:34:42.7430020Z   },
+2025-12-29T14:34:42.7430520Z   "android": {
+2025-12-29T14:34:42.7431270Z     "package": "com.doooooraku.dotchain",
+2025-12-29T14:34:42.7431890Z     "versionCode": 1,
+2025-12-29T14:34:42.7432370Z     "adaptiveIcon": {
+2025-12-29T14:34:42.7433030Z       "backgroundColor": "#E6F4FE",
+2025-12-29T14:34:42.7434020Z       "foregroundImage": "./assets/images/android-icon-foreground.png",
+2025-12-29T14:34:42.7435530Z       "backgroundImage": "./assets/images/android-icon-background.png",
+2025-12-29T14:34:42.7436830Z       "monochromeImage": "./assets/images/android-icon-monochrome.png"
+2025-12-29T14:34:42.7437690Z     },
+2025-12-29T14:34:42.7438350Z     "edgeToEdgeEnabled": true,
+2025-12-29T14:34:42.7439120Z     "predictiveBackGestureEnabled": false
+2025-12-29T14:34:42.7439920Z   },
+2025-12-29T14:34:42.7440410Z   "web": {
+2025-12-29T14:34:42.7440950Z     "output": "static",
+2025-12-29T14:34:42.7441640Z     "favicon": "./assets/images/favicon.png"
+2025-12-29T14:34:42.7442310Z   },
+2025-12-29T14:34:42.7442820Z   "plugins": [
+2025-12-29T14:34:42.7445550Z     "expo-router",
+2025-12-29T14:34:42.7446130Z     [
+2025-12-29T14:34:42.7446610Z       "expo-splash-screen",
+2025-12-29T14:34:42.7447200Z       {
+2025-12-29T14:34:42.7447940Z         "image": "./assets/images/splash-icon.png",
+2025-12-29T14:34:42.7448660Z         "imageWidth": 200,
+2025-12-29T14:34:42.7449390Z         "resizeMode": "contain",
+2025-12-29T14:34:42.7450060Z         "backgroundColor": "#ffffff",
+2025-12-29T14:34:42.7450640Z         "dark": {
+2025-12-29T14:34:42.7451270Z           "backgroundColor": "#000000"
+2025-12-29T14:34:42.7451840Z         }
+2025-12-29T14:34:42.7453000Z       }
+2025-12-29T14:34:42.7453500Z     ],
+2025-12-29T14:34:42.7453930Z     "expo-localization",
+2025-12-29T14:34:42.7454600Z     "expo-notifications",
+2025-12-29T14:34:42.7455130Z     "expo-font",
+2025-12-29T14:34:42.7470090Z     "expo-secure-store",
+2025-12-29T14:34:42.7470480Z     "expo-sqlite",
+2025-12-29T14:34:42.7470680Z     "expo-web-browser"
+2025-12-29T14:34:42.7470940Z   ],
+2025-12-29T14:34:42.7471120Z   "experiments": {
+2025-12-29T14:34:42.7471350Z     "typedRoutes": true,
+2025-12-29T14:34:42.7471560Z     "reactCompiler": true
+2025-12-29T14:34:42.7471810Z   },
+2025-12-29T14:34:42.7471960Z   "extra": {
+2025-12-29T14:34:42.7472140Z     "router": {},
+2025-12-29T14:34:42.7472360Z     "eas": {
+2025-12-29T14:34:42.7472630Z       "projectId": "9a84b4b9-5b2b-4b2a-95c1-9a163afa6c12"
+2025-12-29T14:34:42.7472920Z     }
+2025-12-29T14:34:42.7473080Z   },
+2025-12-29T14:34:42.7473250Z   "owner": "dooraku",
+2025-12-29T14:34:42.7473500Z   "sdkVersion": "54.0.0",
+2025-12-29T14:34:42.7473730Z   "platforms": [
+2025-12-29T14:34:42.7473990Z     "ios",
+2025-12-29T14:34:42.7474180Z     "android",
+2025-12-29T14:34:42.7474340Z     "web"
+2025-12-29T14:34:42.7474530Z   ],
+2025-12-29T14:34:42.7474690Z   "androidStatusBar": {
+2025-12-29T14:34:42.7474990Z     "backgroundColor": "#ffffff"
+2025-12-29T14:34:42.7475210Z   }
+2025-12-29T14:34:42.7475450Z }
+2025-12-29T14:34:42.7475890Z [RUN_EXPO_DOCTOR] Running "expo doctor"
+2025-12-29T14:34:53.9969520Z [RUN_EXPO_DOCTOR] Running 17 checks on your project...
+2025-12-29T14:35:13.3801260Z [RUN_EXPO_DOCTOR] "expo doctor" timed out, skipping...
+2025-12-29T14:35:13.3848990Z [PREPARE_CREDENTIALS] Preparing credentials
+2025-12-29T14:35:13.3849390Z [PREPARE_CREDENTIALS] Creating keychain
+2025-12-29T14:35:17.6313800Z [PREPARE_CREDENTIALS] Preparing credentials for target 'DotChain'
+2025-12-29T14:35:17.6380910Z [PREPARE_CREDENTIALS] Getting distribution certificate fingerprint and common name
+2025-12-29T14:35:17.7448960Z [PREPARE_CREDENTIALS] Fingerprint = "F0A58C6D4DCE8B28FFAF7CD03F0C8091512B5054", common name = iPhone Distribution: MAKOTO NAKAGAWA (HSH4HJ72Y8)
+2025-12-29T14:35:17.7551340Z [PREPARE_CREDENTIALS] Writing distribution certificate to /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/a83d82ab-55e9-4c31-a583-8c50c0b26574.p12
+2025-12-29T14:35:17.7656600Z [PREPARE_CREDENTIALS] Importing distribution certificate into the keychain
+2025-12-29T14:35:19.8232770Z [PREPARE_CREDENTIALS] Initializing provisioning profile
+2025-12-29T14:35:19.9237840Z [PREPARE_CREDENTIALS] Validating whether the distribution certificate has been imported successfully
+2025-12-29T14:35:19.9943190Z [PREPARE_CREDENTIALS] Verifying whether the distribution certificate and provisioning profile match
+2025-12-29T14:35:21.4124880Z [PREBUILD] - Creating native directory (./ios)
+2025-12-29T14:35:23.6915530Z [PREBUILD] ✔ Created native directory
+2025-12-29T14:35:23.7018140Z [PREBUILD] - Updating package.json
+2025-12-29T14:35:23.7117990Z [PREBUILD] ✔ Updated package.json | no changes
+2025-12-29T14:35:23.7219190Z [PREBUILD] - Running prebuild
+2025-12-29T14:35:25.9092450Z [PREBUILD] ✔ Finished prebuild
+2025-12-29T14:35:25.9845720Z [PREBUILD] Running "pnpm install --no-frozen-lockfile" in /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build directory
+2025-12-29T14:35:26.8011430Z [PREBUILD] Lockfile is up to date, resolution step is skipped
+2025-12-29T14:35:26.9874950Z [PREBUILD] Already up to date
+2025-12-29T14:35:28.0222520Z [PREBUILD] 
+2025-12-29T14:35:28.0547870Z [PREBUILD] Done in 1.9s using pnpm v9.15.9
+2025-12-29T14:35:31.2683680Z [INSTALL_PODS] Using Expo modules
+2025-12-29T14:35:31.2691610Z [INSTALL_PODS] [Expo] Enabling modular headers for pod ExpoModulesCore
+2025-12-29T14:35:31.2694450Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-RCTAppDelegate
+2025-12-29T14:35:31.2697800Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-RCTFabric
+2025-12-29T14:35:31.2711940Z [INSTALL_PODS] [Expo] Enabling modular headers for pod ReactAppDependencyProvider
+2025-12-29T14:35:31.2715590Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-Core
+2025-12-29T14:35:31.2718570Z [INSTALL_PODS] [Expo] Enabling modular headers for pod ReactCodegen
+2025-12-29T14:35:31.2721180Z [INSTALL_PODS] [Expo] Enabling modular headers for pod RCTRequired
+2025-12-29T14:35:31.2724070Z [INSTALL_PODS] [Expo] Enabling modular headers for pod RCTTypeSafety
+2025-12-29T14:35:31.2726030Z [INSTALL_PODS] [Expo] Enabling modular headers for pod ReactCommon
+2025-12-29T14:35:31.2743650Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-NativeModulesApple
+2025-12-29T14:35:31.2744460Z [INSTALL_PODS] [Expo] Enabling modular headers for pod Yoga
+2025-12-29T14:35:31.2745070Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-Fabric
+2025-12-29T14:35:31.2745760Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-graphics
+2025-12-29T14:35:31.2746410Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-utils
+2025-12-29T14:35:31.2747050Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-featureflags
+2025-12-29T14:35:31.2747650Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-debug
+2025-12-29T14:35:31.2748330Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-ImageManager
+2025-12-29T14:35:31.2748990Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-rendererdebug
+2025-12-29T14:35:31.2749680Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-jsi
+2025-12-29T14:35:31.2750280Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-renderercss
+2025-12-29T14:35:31.2750970Z [INSTALL_PODS] [Expo] Enabling modular headers for pod hermes-engine
+2025-12-29T14:35:31.2751520Z [INSTALL_PODS] [Expo] Enabling modular headers for pod glog
+2025-12-29T14:35:31.2752070Z [INSTALL_PODS] [Expo] Enabling modular headers for pod boost
+2025-12-29T14:35:31.2752730Z [INSTALL_PODS] [Expo] Enabling modular headers for pod DoubleConversion
+2025-12-29T14:35:31.2803150Z [INSTALL_PODS] [Expo] Enabling modular headers for pod fast_float
+2025-12-29T14:35:31.2804510Z [INSTALL_PODS] [Expo] Enabling modular headers for pod fmt
+2025-12-29T14:35:31.2805070Z [INSTALL_PODS] [Expo] Enabling modular headers for pod RCT-Folly
+2025-12-29T14:35:31.2805710Z [INSTALL_PODS] [Expo] Enabling modular headers for pod SocketRocket
+2025-12-29T14:35:31.2806670Z [INSTALL_PODS] [Expo] Enabling modular headers for pod expo-dev-menu-interface
+2025-12-29T14:35:31.2807370Z [INSTALL_PODS] [Expo] Enabling modular headers for pod EXManifests
+2025-12-29T14:35:31.2808040Z [INSTALL_PODS] [Expo] Enabling modular headers for pod EXUpdatesInterface
+2025-12-29T14:35:31.2808950Z [INSTALL_PODS] [Expo] Enabling modular headers for pod expo-dev-menu
+2025-12-29T14:35:31.2809650Z [INSTALL_PODS] [Expo] Enabling modular headers for pod React-jsinspector
+2025-12-29T14:35:31.2810380Z [INSTALL_PODS] [Expo] Enabling modular headers for pod expo-dev-launcher
+2025-12-29T14:35:31.2811320Z [INSTALL_PODS] [Expo] Enabling modular headers for pod SDWebImage
+2025-12-29T14:35:31.2811990Z [INSTALL_PODS] [Expo] Enabling modular headers for pod SDWebImageAVIFCoder
+2025-12-29T14:35:31.2812710Z [INSTALL_PODS] [Expo] Enabling modular headers for pod SDWebImageSVGCoder
+2025-12-29T14:35:31.2813580Z [INSTALL_PODS] [Expo] Enabling modular headers for pod SDWebImageWebPCoder
+2025-12-29T14:35:31.2814240Z [INSTALL_PODS] [Expo] Enabling modular headers for pod libavif
+2025-12-29T14:35:31.2816570Z [INSTALL_PODS] [Expo] Enabling modular headers for pod RNScreens
+2025-12-29T14:35:33.0210310Z [INSTALL_PODS] Found 10 modules for target `DotChain`
+2025-12-29T14:35:33.0289710Z [INSTALL_PODS] link_native_modules! {:ios_packages=>[{:configurations=>[], :name=>"@react-native-async-storage/async-storage", :root=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/@react-native-async-storage+async-storage@2.2.0_react-native@0.81.5_@babel+core@7.28.5_@types_ig6lagr6sa7lblnafinownlff4/node_modules/@react-native-async-storage/async-storage", :path=>"../node_modules/.pnpm/@react-native-async-storage+async-storage@2.2.0_react-native@0.81.5_@babel+core@7.28.5_@types_ig6lagr6sa7lblnafinownlff4/node_modules/@react-native-async-storage/async-storage", :podspec_path=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/@react-native-async-storage+async-storage@2.2.0_react-native@0.81.5_@babel+core@7.28.5_@types_ig6lagr6sa7lblnafinownlff4/node_modules/@react-native-async-storage/async-storage/RNCAsyncStorage.podspec", :script_phases=>[]}, {:configurations=>[], :name=>"@react-native-community/datetimepicker", :root=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/@react-native-community+datetimepicker@8.4.4_expo@54.0.27_react-native@0.81.5_@babel+core@7.2_z7uungys5lxx4piyiggwegajcy/node_modules/@react-native-community/datetimepicker", :path=>"../node_modules/.pnpm/@react-native-community+datetimepicker@8.4.4_expo@54.0.27_react-native@0.81.5_@babel+core@7.2_z7uungys5lxx4piyiggwegajcy/node_modules/@react-native-community/datetimepicker", :podspec_path=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/@react-native-community+datetimepicker@8.4.4_expo@54.0.27_react-native@0.81.5_@babel+core@7.2_z7uungys5lxx4piyiggwegajcy/node_modules/@react-native-community/datetimepicker/RNDateTimePicker.podspec", :script_phases=>[]}, {:configurations=>[], :name=>"expo", :root=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/expo@54.0.27_@babel+core@7.28.5_@expo+metro-runtime@6.1.2_expo-router@6.0.17_react-native@0.8_4u54jrrh4kxasoodu7va63w4zi/node_modules/expo", :path=>"../node_modules/.pnpm/expo@54.0.27_@babel+core@7.28.5_@expo+metro-runtime@6.1.2_expo-router@6.0.17_react-native@0.8_4u54jrrh4kxasoodu7va63w4zi/node_modules/expo", :podspec_path=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/expo@54.0.27_@babel+core@7.28.5_@expo+metro-runtime@6.1.2_expo-router@6.0.17_react-native@0.8_4u54jrrh4kxasoodu7va63w4zi/node_modules/expo/Expo.podspec", :script_phases=>[]}, {:configurations=>[], :name=>"react-native-gesture-handler", :root=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-gesture-handler@2.28.0_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1._qbzv7laykrxztkvayyug35d6ey/node_modules/react-native-gesture-handler", :path=>"../node_modules/.pnpm/react-native-gesture-handler@2.28.0_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1._qbzv7laykrxztkvayyug35d6ey/node_modules/react-native-gesture-handler", :podspec_path=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-gesture-handler@2.28.0_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1._qbzv7laykrxztkvayyug35d6ey/node_modules/react-native-gesture-handler/RNGestureHandler.podspec", :script_phases=>[]}, {:configurations=>[], :name=>"react-native-purchases", :root=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-purchases@9.6.6_react-native-web@0.21.2_react-dom@19.1.0_react@19.1.0__react@19._j4pzrffecsgjens25ymie2x5sa/node_modules/react-native-purchases", :path=>"../node_modules/.pnpm/react-native-purchases@9.6.6_react-native-web@0.21.2_react-dom@19.1.0_react@19.1.0__react@19._j4pzrffecsgjens25ymie2x5sa/node_modules/react-native-purchases", :podspec_path=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-purchases@9.6.6_react-native-web@0.21.2_react-dom@19.1.0_react@19.1.0__react@19._j4pzrffecsgjens25ymie2x5sa/node_modules/react-native-purchases/RNPurchases.podspec", :script_phases=>[]}, {:configurations=>[], :name=>"react-native-reanimated", :root=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-reanimated@4.1.5_@babel+core@7.28.5_react-native-worklets@0.5.1_@babel+core@7.28_okigqxn2csipfaa2d3y6vh4zje/node_modules/react-native-reanimated", :path=>"../node_modules/.pnpm/react-native-reanimated@4.1.5_@babel+core@7.28.5_react-native-worklets@0.5.1_@babel+core@7.28_okigqxn2csipfaa2d3y6vh4zje/node_modules/react-native-reanimated", :podspec_path=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-reanimated@4.1.5_@babel+core@7.28.5_react-native-worklets@0.5.1_@babel+core@7.28_okigqxn2csipfaa2d3y6vh4zje/node_modules/react-native-reanimated/RNReanimated.podspec", :script_phases=>[]}, {:configurations=>[], :name=>"react-native-safe-area-context", :root=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-safe-area-context@5.6.2_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1_pbkoky4dbqac2bcj7rtlvmamy4/node_modules/react-native-safe-area-context", :path=>"../node_modules/.pnpm/react-native-safe-area-context@5.6.2_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1_pbkoky4dbqac2bcj7rtlvmamy4/node_modules/react-native-safe-area-context", :podspec_path=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-safe-area-context@5.6.2_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1_pbkoky4dbqac2bcj7rtlvmamy4/node_modules/react-native-safe-area-context/react-native-safe-area-context.podspec", :script_phases=>[]}, {:configurations=>[], :name=>"react-native-screens", :root=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-screens@4.16.0_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0__react@19.1.0/node_modules/react-native-screens", :path=>"../node_modules/.pnpm/react-native-screens@4.16.0_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0__react@19.1.0/node_modules/react-native-screens", :podspec_path=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-screens@4.16.0_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0__react@19.1.0/node_modules/react-native-screens/RNScreens.podspec", :script_phases=>[]}, {:configurations=>[], :name=>"react-native-svg", :root=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-svg@15.12.1_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0__react@19.1.0/node_modules/react-native-svg", :path=>"../node_modules/.pnpm/react-native-svg@15.12.1_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0__react@19.1.0/node_modules/react-native-svg", :podspec_path=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-svg@15.12.1_
+2025-12-29T14:35:33.0371200Z [INSTALL_PODS] react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0__react@19.1.0/node_modules/react-native-svg/RNSVG.podspec", :script_phases=>[]}, {:configurations=>[], :name=>"react-native-worklets", :root=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-worklets@0.5.1_@babel+core@7.28.5_react-native@0.81.5_@babel+core@7.28.5_@types+_fog62ib43qx3xg22wqkeejfxa4/node_modules/react-native-worklets", :path=>"../node_modules/.pnpm/react-native-worklets@0.5.1_@babel+core@7.28.5_react-native@0.81.5_@babel+core@7.28.5_@types+_fog62ib43qx3xg22wqkeejfxa4/node_modules/react-native-worklets", :podspec_path=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-worklets@0.5.1_@babel+core@7.28.5_react-native@0.81.5_@babel+core@7.28.5_@types+_fog62ib43qx3xg22wqkeejfxa4/node_modules/react-native-worklets/RNWorklets.podspec", :script_phases=>[]}], :ios_project_root_path=>"/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios", :react_native_path=>"../node_modules/.pnpm/react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0/node_modules/react-native"}
+2025-12-29T14:35:33.7802670Z [INSTALL_PODS] Auto-linking React Native modules for target `DotChain`: RNCAsyncStorage, RNDateTimePicker, RNGestureHandler, RNPurchases, RNReanimated, RNSVG, RNScreens, RNWorklets, and react-native-safe-area-context
+2025-12-29T14:35:33.9318320Z [INSTALL_PODS] Framework build type is static library
+2025-12-29T14:35:33.9503320Z [INSTALL_PODS] [ReactNativeDependencies] Setting up ReactNativeDependencies...
+2025-12-29T14:35:34.0788220Z [INSTALL_PODS] [ReactNativeDependencies] Building from source: false
+2025-12-29T14:35:34.0792800Z [INSTALL_PODS] [ReactNativeDependencies] Using release tarball
+2025-12-29T14:35:34.0797470Z [INSTALL_PODS] [ReactNativeDependencies] Using tarball from URL: https://repo1.maven.org/maven2/com/facebook/react/react-native-artifacts/0.81.5/react-native-artifacts-0.81.5-reactnative-dependencies-debug.tar.gz
+2025-12-29T14:35:34.1091080Z [INSTALL_PODS] % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
+2025-12-29T14:35:34.1092000Z [INSTALL_PODS] Dload  Upload   Total   Spent    Left  Speed
+2025-12-29T14:35:34.1092580Z [INSTALL_PODS] 
+2025-12-29T14:35:34.1093310Z   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
+2025-12-29T14:35:34.4459540Z [INSTALL_PODS] 100 18.3M  100 18.3M    0     0  54.8M      0 --:--:-- --:--:-- --:--:-- 54.9M
+2025-12-29T14:35:34.5269830Z [INSTALL_PODS] % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
+2025-12-29T14:35:34.5300410Z [INSTALL_PODS]                                  Dload  Upload   Total   Spent    Left  Speed
+2025-12-29T14:35:34.5312590Z [INSTALL_PODS] 
+2025-12-29T14:35:34.5413380Z   0
+2025-12-29T14:35:34.5514700Z [INSTALL_PODS] 0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
+2025-12-29T14:35:34.6760510Z [INSTALL_PODS] 5  9.9M    5  567k    0     0  3811k      0  0:00:02 --:--:--  0:00:02 3811k
+2025-12-29T14:35:34.8322770Z [INSTALL_PODS] 100  9.9M  100  9.9M    0     0  32.4M      0 --:--:-- --:--:-- --:--:-- 32.
+2025-12-29T14:35:34.8344150Z [INSTALL_PODS] 4M
+2025-12-29T14:35:34.8443580Z [INSTALL_PODS] [ReactNativeDependencies] Source: {:http=>"https://repo1.maven.org/maven2/com/facebook/react/react-native-artifacts/0.81.5/react-native-artifacts-0.81.5-reactnative-dependencies-debug.tar.gz"}
+2025-12-29T14:35:34.8539020Z [INSTALL_PODS] [ReactNativeCore] Setting up ReactNativeCore...
+2025-12-29T14:35:34.9626600Z [INSTALL_PODS] [ReactNativeCore] Building from source: false
+2025-12-29T14:35:34.9703780Z [INSTALL_PODS] [ReactNativeCore] Using tarball from URL: https://repo1.maven.org/maven2/com/facebook/react/react-native-artifacts/0.81.5/react-native-artifacts-0.81.5-reactnative-core-debug.tar.gz
+2025-12-29T14:35:34.9967800Z [INSTALL_PODS] % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
+2025-12-29T14:35:35.0021160Z [INSTALL_PODS]                                  Dload  Upload   Total   Spent    Left  Speed
+2025-12-29T14:35:35.0027690Z [INSTALL_PODS] 
+2025-12-29T14:35:35.0029050Z   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
+2025-12-29T14:35:35.6693170Z [INSTALL_PODS] 53 78.5M   53 41.8M    0     0  62.9M      0  0:00:01 --:--:--  0:00:01 62.9M
+2025-12-29T14:35:36.0830970Z [INSTALL_PODS] 100 78.5M  100 78.5M    0     0  72.7M      0  0:00:01  0:00:01 --:--:-- 72.8M
+2025-12-29T14:35:36.1438240Z [INSTALL_PODS] % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
+2025-12-29T14:35:36.1538810Z [INSTALL_PODS]                                  Dload  Upload   Total   Spent    Left  Speed
+2025-12-29T14:35:36.1639880Z [INSTALL_PODS] 
+2025-12-29T14:35:36.1669550Z   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
+2025-12-29T14:35:36.5880510Z [INSTALL_PODS] 100 26.3M  100 26.3M    0     0  59.6M      0
+2025-12-29T14:35:36.5983280Z [INSTALL_PODS] --:--:-- --:--:-- --:--:-- 59.8M
+2025-12-29T14:35:36.6083870Z [INSTALL_PODS] [ReactNativeCore] Source: {:http=>"https://repo1.maven.org/maven2/com/facebook/react/react-native-artifacts/0.81.5/react-native-artifacts-0.81.5-reactnative-core-debug.tar.gz"}
+2025-12-29T14:35:36.6185810Z [INSTALL_PODS] Configuring the target with the New Architecture
+2025-12-29T14:35:36.6287440Z [INSTALL_PODS] [ReactNativeCore] Using React Native Core and React Native Dependencies prebuilt versions.
+2025-12-29T14:35:37.4077830Z [INSTALL_PODS] [36m[1m[Codegen][0m Analyzing /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/package.json[0m
+2025-12-29T14:35:37.4079530Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mSearching for codegen-enabled libraries in the app.[0m
+2025-12-29T14:35:37.4080810Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mThe "codegenConfig" field is not defined in package.json. Assuming there is nothing to generate at the app level.[0m
+2025-12-29T14:35:37.4082060Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mSearching for codegen-enabled libraries in react-native.config.js[0m
+2025-12-29T14:35:37.4082910Z [INSTALL_PODS] [36m[1m[Codegen][0m Found @react-native-async-storage/async-storage[0m
+2025-12-29T14:35:37.4083720Z [INSTALL_PODS] [36m[1m[Codegen][0m Found @react-native-community/datetimepicker[0m
+2025-12-29T14:35:37.4084610Z [INSTALL_PODS] [36m[1m[Codegen][0m Found react-native-gesture-handler[0m
+2025-12-29T14:35:37.4085380Z [INSTALL_PODS] [36m[1m[Codegen][0m Found react-native-reanimated[0m
+2025-12-29T14:35:37.4086260Z [INSTALL_PODS] [36m[1m[Codegen][0m Found react-native-safe-area-context[0m
+2025-12-29T14:35:37.4087040Z [INSTALL_PODS] [36m[1m[Codegen][0m Found react-native-screens[0m
+2025-12-29T14:35:37.4087710Z [INSTALL_PODS] [36m[1m[Codegen][0m Found react-native-svg[0m
+2025-12-29T14:35:37.4088310Z [INSTALL_PODS] [36m[1m[Codegen][0m Found react-native-worklets[0m
+2025-12-29T14:35:37.4089080Z [INSTALL_PODS] [36m[1m[Codegen][0m Processing rnasyncstorage[0m
+2025-12-29T14:35:37.4090090Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mSearching for podspec in the project dependencies.[0m
+2025-12-29T14:35:37.4091080Z [INSTALL_PODS] [36m[1m[Codegen][0m Supported Apple platforms: ios, macos, tvos, visionos for rnasyncstorage[0m
+2025-12-29T14:35:37.4091980Z [INSTALL_PODS] [36m[1m[Codegen][0m Processing RNDateTimePickerCGen[0m
+2025-12-29T14:35:37.4093140Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mSearching for podspec in the project dependencies.[0m
+2025-12-29T14:35:37.4094020Z [INSTALL_PODS] [36m[1m[Codegen][0m Supported Apple platforms: ios, visionos for RNDateTimePickerCGen[0m
+2025-12-29T14:35:37.4095710Z [INSTALL_PODS] [36m[1m[Codegen][0m Processing rngesturehandler_codegen[0m
+2025-12-29T14:35:37.4096330Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mSearching for podspec in the project dependencies.[0m
+2025-12-29T14:35:37.4097350Z [INSTALL_PODS] [36m[1m[Codegen][0m Supported Apple platforms: ios, macos, tvos, visionos for rngesturehandler_codegen[0m
+2025-12-29T14:35:37.4098100Z [INSTALL_PODS] [36m[1m[Codegen][0m Processing rnreanimated[0m
+2025-12-29T14:35:37.4098790Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mSearching for podspec in the project dependencies.[0m
+2025-12-29T14:35:37.4099940Z [INSTALL_PODS] [36m[1m[Codegen][0m Supported Apple platforms: ios, macos, tvos, visionos for rnreanimated[0m
+2025-12-29T14:35:37.4100600Z [INSTALL_PODS] [36m[1m[Codegen][0m Processing safeareacontext[0m
+2025-12-29T14:35:37.4101190Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mSearching for podspec in the project dependencies.[0m
+2025-12-29T14:35:37.4102000Z [INSTALL_PODS] [36m[1m[Codegen][0m Supported Apple platforms: ios, macos, tvos, visionos for safeareacontext[0m
+2025-12-29T14:35:37.4102610Z [INSTALL_PODS] [36m[1m[Codegen][0m Processing rnscreens[0m
+2025-12-29T14:35:37.4103280Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mSearching for podspec in the project dependencies.[0m
+2025-12-29T14:35:37.4103970Z [INSTALL_PODS] [36m[1m[Codegen][0m Supported Apple platforms: ios, tvos, visionos for rnscreens[0m
+2025-12-29T14:35:37.4104570Z [INSTALL_PODS] [36m[1m[Codegen][0m Processing rnsvg[0m
+2025-12-29T14:35:37.4105170Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mSearching for podspec in the project dependencies.[0m
+2025-12-29T14:35:37.4105920Z [INSTALL_PODS] [36m[1m[Codegen][0m Supported Apple platforms: ios, macos, tvos, visionos for rnsvg[0m
+2025-12-29T14:35:37.4106560Z [INSTALL_PODS] [36m[1m[Codegen][0m Processing rnworklets[0m
+2025-12-29T14:35:37.4107160Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mSearching for podspec in the project dependencies.[0m
+2025-12-29T14:35:37.4107950Z [INSTALL_PODS] [36m[1m[Codegen][0m Supported Apple platforms: ios, macos, tvos, visionos for rnworklets[0m
+2025-12-29T14:35:37.4108610Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating Native Code for rnasyncstorage - ios[0m
+2025-12-29T14:35:37.4109830Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifacts: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios[0m
+2025-12-29T14:35:37.4110820Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating Native Code for RNDateTimePickerCGen - ios[0m
+2025-12-29T14:35:37.4112130Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifacts: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios[0m
+2025-12-29T14:35:37.4113200Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating Native Code for rngesturehandler_codegen - ios[0m
+2025-12-29T14:35:37.4114400Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifacts: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios[0m
+2025-12-29T14:35:37.4115410Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating Native Code for rnreanimated - ios[0m
+2025-12-29T14:35:37.4116580Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifacts: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios[0m
+2025-12-29T14:35:37.4117640Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating Native Code for safeareacontext - ios[0m
+2025-12-29T14:35:37.4118830Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifacts: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios[0m
+2025-12-29T14:35:37.4119830Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating Native Code for rnscreens - ios[0m
+2025-12-29T14:35:37.4121260Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifacts: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios[0m
+2025-12-29T14:35:37.4122270Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating Native Code for rnsvg - ios[0m
+2025-12-29T14:35:37.4123520Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifacts: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios[0m
+2025-12-29T14:35:37.4125190Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating Native Code for rnworklets - ios[0m
+2025-12-29T14:35:37.4126590Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifacts: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios[0m
+2025-12-29T14:35:37.4127670Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating RCTThirdPartyComponentsProvider.h[0m
+2025-12-29T14:35:37.4129310Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifact: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios/RCTThirdPartyComponentsProvider.h[0m
+2025-12-29T14:35:37.4131140Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating RCTThirdPartyComponentsProvider.mm[0m
+2025-12-29T14:35:37.4132630Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifact: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios/RCTThirdPartyComponentsProvider.mm[0m
+2025-12-29T14:35:37.4133780Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating RCTModulesProvider.h[0m
+2025-12-29T14:35:37.4135170Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifact: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios/RCTModuleProviders.h[0m
+2025-12-29T14:35:37.4136400Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating RCTModuleProviders.mm[0m
+2025-12-29T14:35:37.4137830Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifact: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios/RCTModuleProviders.mm[0m
+2025-12-29T14:35:37.4139070Z [INSTALL_PODS] [36m[1m[Codegen][0m Generating RCTAppDependencyProvider[0m
+2025-12-29T14:35:37.4140470Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifact: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios/RCTAppDependencyProvider.h[0m
+2025-12-29T14:35:37.4142370Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated artifact: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios/RCTAppDependencyProvider.mm[0m
+2025-12-29T14:35:37.4144220Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated podspec: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios/ReactAppDependencyProvider.podspec[0m
+2025-12-29T14:35:37.4146050Z [INSTALL_PODS] [36m[1m[Codegen][0m Generated podspec: /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/generated/ios/ReactCodegen.podspec[0m
+2025-12-29T14:35:37.4147900Z [INSTALL_PODS] [36m[1m[Codegen][0m [33mDone.[0m
+2025-12-29T14:35:37.4148780Z [INSTALL_PODS] Analyzing dependencies
+2025-12-29T14:35:38.0717010Z [INSTALL_PODS] Fetching podspec for `React-Core-prebuilt` from `../node_modules/.pnpm/react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0/node_modules/react-native/React-Core-prebuilt.podspec`
+2025-12-29T14:35:38.0719840Z [INSTALL_PODS] [ReactNativeCore] Using tarball from URL: https://repo1.maven.org/maven2/com/facebook/react/react-native-artifacts/0.81.5/react-native-artifacts-0.81.5-reactnative-core-debug.tar.gz
+2025-12-29T14:35:38.2132550Z [INSTALL_PODS] Fetching podspec for `ReactNativeDependencies` from `../node_modules/.pnpm/react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0/node_modules/react-native/third-party-podspecs/ReactNativeDependencies.podspec`
+2025-12-29T14:35:38.2737280Z [INSTALL_PODS] [ReactNativeDependencies] Using release tarball
+2025-12-29T14:35:38.2740930Z [INSTALL_PODS] [ReactNativeDependencies] Using tarball from URL: https://repo1.maven.org/maven2/com/facebook/react/react-native-artifacts/0.81.5/react-native-artifacts-0.81.5-reactnative-dependencies-debug.tar.gz
+2025-12-29T14:35:38.3949410Z [INSTALL_PODS] Fetching podspec for `hermes-engine` from `../node_modules/.pnpm/react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0/node_modules/react-native/sdks/hermes-engine/hermes-engine.podspec`
+2025-12-29T14:35:38.5859050Z [INSTALL_PODS] [Hermes] Using release tarball from URL: https://repo1.maven.org/maven2/com/facebook/react/react-native-artifacts/0.81.5/react-native-artifacts-0.81.5-hermes-ios-debug.tar.gz
+2025-12-29T14:35:38.6160010Z [INSTALL_PODS] % Total    % Received % Xferd  Average Speed   Time
+2025-12-29T14:35:38.6261310Z [INSTALL_PODS] Time     Time  Current
+2025-12-29T14:35:38.6362140Z [INSTALL_PODS]                                  Dload  Upload   Total   Spent    Left  Speed
+2025-12-29T14:35:38.6463850Z [INSTALL_PODS] 
+2025-12-29T14:35:38.6565210Z   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
+2025-12-29T14:35:38.6765800Z [INSTALL_PODS] 0 29.0M    0  100k    0     0  1674k      0  0:00:17
+2025-12-29T14:35:38.6866920Z [INSTALL_PODS] --:--:--  0:00:17 1651k
+2025-12-29T14:35:38.9963590Z [INSTALL_PODS] 100 29.0M  100 29.0M    0     0  76.9M      0 --:--:-- --:--:-- --:--:-- 76.9M
+2025-12-29T14:35:39.0607520Z [INSTALL_PODS] % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
+2025-12-29T14:35:39.0718810Z [INSTALL_PODS]                                  Dload  Upload   Total   Spent    Left  Speed
+2025-12-29T14:35:39.0819900Z [INSTALL_PODS] 
+2025-12-29T14:35:39.0922620Z   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
+2025-12-29T14:35:39.3270880Z [INSTALL_PODS] 100 20.3M  100 20.3M    0     0  77.7M      0 --:--:-- --:--:-- --:--:-- 77.9M
+2025-12-29T14:35:44.4400340Z [INSTALL_PODS] Adding spec repo `trunk` with CDN `https://cdn.cocoapods.org/`
+2025-12-29T14:35:44.4503390Z [INSTALL_PODS] Downloading dependencies
+2025-12-29T14:35:44.4606610Z [INSTALL_PODS] Installing EXAV (16.0.8)
+2025-12-29T14:35:44.4709770Z [INSTALL_PODS] Installing EXApplication (7.0.8)
+2025-12-29T14:35:44.4812000Z [INSTALL_PODS] Installing EXConstants (18.0.11)
+2025-12-29T14:35:44.4913660Z [INSTALL_PODS] Installing EXJSONUtils (0.15.0)
+2025-12-29T14:35:44.5015200Z [INSTALL_PODS] Installing EXManifests (1.0.10)
+2025-12-29T14:35:44.5119030Z [INSTALL_PODS] Installing EXNotifications (0.32.14)
+2025-12-29T14:35:44.5220640Z [INSTALL_PODS] Installing EXUpdatesInterface (2.0.0)
+2025-12-29T14:35:44.5322060Z [INSTALL_PODS] Installing Expo (54.0.27)
+2025-12-29T14:35:44.5424380Z [INSTALL_PODS] Installing ExpoAsset (12.0.11)
+2025-12-29T14:35:44.5524730Z [INSTALL_PODS] Installing ExpoCrypto (15.0.8)
+2025-12-29T14:35:44.5625860Z [INSTALL_PODS] Installing ExpoFileSystem (19.0.20)
+2025-12-29T14:35:44.5726970Z [INSTALL_PODS] Installing ExpoFont (14.0.10)
+2025-12-29T14:35:44.5849330Z [INSTALL_PODS] Installing ExpoHaptics (15.0.8)
+2025-12-29T14:35:44.5951410Z [INSTALL_PODS] Installing ExpoHead (6.0.17)
+2025-12-29T14:35:44.6053540Z [INSTALL_PODS] Installing ExpoImage (3.0.11)
+2025-12-29T14:35:44.6157420Z [INSTALL_PODS] Installing ExpoKeepAwake (15.0.8)
+2025-12-29T14:35:44.6261150Z [INSTALL_PODS] Installing ExpoLinearGradient (15.0.8)
+2025-12-29T14:35:44.6320060Z [INSTALL_PODS] Installing ExpoLinking (8.0.10)
+2025-12-29T14:35:44.6321660Z [INSTALL_PODS] Installing ExpoLocalization (17.0.8)
+2025-12-29T14:35:44.6347200Z [INSTALL_PODS] Installing ExpoModulesCore (3.0.28)
+2025-12-29T14:35:44.6348690Z [INSTALL_PODS] Installing ExpoSQLite (16.0.10)
+2025-12-29T14:35:44.6350180Z [INSTALL_PODS] Installing ExpoSecureStore (15.0.8)
+2025-12-29T14:35:44.6353270Z [INSTALL_PODS] Installing ExpoSplashScreen (31.0.12)
+2025-12-29T14:35:44.6354740Z [INSTALL_PODS] Installing ExpoStoreReview (9.0.9)
+2025-12-29T14:35:44.6356030Z [INSTALL_PODS] Installing ExpoSymbols (1.0.8)
+2025-12-29T14:35:44.6357310Z [INSTALL_PODS] Installing ExpoSystemUI (6.0.9)
+2025-12-29T14:35:44.6362100Z [INSTALL_PODS] Installing ExpoWebBrowser (15.0.10)
+2025-12-29T14:35:44.6363830Z [INSTALL_PODS] Installing FBLazyVector (0.81.5)
+2025-12-29T14:35:44.6382460Z [INSTALL_PODS] Installing PurchasesHybridCommon (17.18.0)
+2025-12-29T14:35:50.5773060Z [INSTALL_PODS] Installing RCTDeprecation (0.81.5)
+2025-12-29T14:35:50.5871270Z [INSTALL_PODS] Installing RCTRequired (0.81.5)
+2025-12-29T14:35:50.6087830Z [INSTALL_PODS] Installing RCTTypeSafety (0.81.5)
+2025-12-29T14:35:50.6089500Z [INSTALL_PODS] Installing RNCAsyncStorage (2.2.0)
+2025-12-29T14:35:50.6195320Z [INSTALL_PODS] Installing RNDateTimePicker (8.4.4)
+2025-12-29T14:35:50.6296560Z [INSTALL_PODS] Installing RNGestureHandler (2.28.0)
+2025-12-29T14:35:50.6420960Z [INSTALL_PODS] Installing RNPurchases (9.6.6)
+2025-12-29T14:35:50.6523030Z [INSTALL_PODS] Installing RNReanimated (4.1.5)
+2025-12-29T14:35:50.6624770Z [INSTALL_PODS] Installing RNSVG (15.12.1)
+2025-12-29T14:35:50.6726830Z [INSTALL_PODS] Installing RNScreens (4.16.0)
+2025-12-29T14:35:50.6829850Z [INSTALL_PODS] Installing RNWorklets (0.5.1)
+2025-12-29T14:35:50.6942750Z [INSTALL_PODS] Installing React (0.81.5)
+2025-12-29T14:35:50.7048890Z [INSTALL_PODS] Installing React-Core (0.81.5)
+2025-12-29T14:35:50.7168160Z [INSTALL_PODS] Installing React-Core-prebuilt (0.81.5)
+2025-12-29T14:36:11.0972170Z [INSTALL_PODS] Installing React-CoreModules (0.81.5)
+2025-12-29T14:36:11.1075880Z [INSTALL_PODS] Installing React-Fabric (0.81.5)
+2025-12-29T14:36:11.1181530Z [INSTALL_PODS] Installing React-FabricComponents (0.81.5)
+2025-12-29T14:36:11.1284400Z [INSTALL_PODS] Installing React-FabricImage (0.81.5)
+2025-12-29T14:36:11.1393810Z [INSTALL_PODS] Installing React-ImageManager (0.81.5)
+2025-12-29T14:36:11.1495620Z [INSTALL_PODS] Installing React-Mapbuffer (0.81.5)
+2025-12-29T14:36:11.1597170Z [INSTALL_PODS] Installing React-NativeModulesApple (0.81.5)
+2025-12-29T14:36:11.1617660Z [INSTALL_PODS] Installing React-RCTActionSheet (0.81.5)
+2025-12-29T14:36:11.1618260Z [INSTALL_PODS] Installing React-RCTAnimation (0.81.5)
+2025-12-29T14:36:11.1618870Z [INSTALL_PODS] Installing React-RCTAppDelegate (0.81.5)
+2025-12-29T14:36:11.1619350Z [INSTALL_PODS] Installing React-RCTBlob (0.81.5)
+2025-12-29T14:36:11.1619930Z [INSTALL_PODS] Installing React-RCTFBReactNativeSpec (0.81.5)
+2025-12-29T14:36:11.1620500Z [INSTALL_PODS] Installing React-RCTFabric (0.81.5)
+2025-12-29T14:36:11.1620970Z [INSTALL_PODS] Installing React-RCTImage (0.81.5)
+2025-12-29T14:36:11.1621490Z [INSTALL_PODS] Installing React-RCTLinking (0.81.5)
+2025-12-29T14:36:11.1621970Z [INSTALL_PODS] Installing React-RCTNetwork (0.81.5)
+2025-12-29T14:36:11.1622490Z [INSTALL_PODS] Installing React-RCTRuntime (0.81.5)
+2025-12-29T14:36:11.1622960Z [INSTALL_PODS] Installing React-RCTSettings (0.81.5)
+2025-12-29T14:36:11.1623460Z [INSTALL_PODS] Installing React-RCTText (0.81.5)
+2025-12-29T14:36:11.1623990Z [INSTALL_PODS] Installing React-RCTVibration (0.81.5)
+2025-12-29T14:36:11.1624510Z [INSTALL_PODS] Installing React-RuntimeApple (0.81.5)
+2025-12-29T14:36:11.1625040Z [INSTALL_PODS] Installing React-RuntimeCore (0.81.5)
+2025-12-29T14:36:11.1625580Z [INSTALL_PODS] Installing React-RuntimeHermes (0.81.5)
+2025-12-29T14:36:11.1626110Z [INSTALL_PODS] Installing React-callinvoker (0.81.5)
+2025-12-29T14:36:11.1626590Z [INSTALL_PODS] Installing React-cxxreact (0.81.5)
+2025-12-29T14:36:11.1627150Z [INSTALL_PODS] Installing React-debug (0.81.5)
+2025-12-29T14:36:11.1627700Z [INSTALL_PODS] Installing React-defaultsnativemodule (0.81.5)
+2025-12-29T14:36:11.1629310Z [INSTALL_PODS] Installing React-domnativemodule (0.81.5)
+2025-12-29T14:36:11.1629870Z [INSTALL_PODS] Installing React-featureflags (0.81.5)
+2025-12-29T14:36:11.1630780Z [INSTALL_PODS] Installing React-featureflagsnativemodule (0.81.5)
+2025-12-29T14:36:11.1631370Z [INSTALL_PODS] Installing React-graphics (0.81.5)
+2025-12-29T14:36:11.1632040Z [INSTALL_PODS] Installing React-hermes (0.81.5)
+2025-12-29T14:36:11.1633020Z [INSTALL_PODS] Installing React-idlecallbacksnativemodule (0.81.5)
+2025-12-29T14:36:11.1633620Z [INSTALL_PODS] Installing React-jserrorhandler (0.81.5)
+2025-12-29T14:36:11.1671640Z [INSTALL_PODS] Installing React-jsi (0.81.5)
+2025-12-29T14:36:11.1672670Z [INSTALL_PODS] Installing React-jsiexecutor (0.81.5)
+2025-12-29T14:36:11.1673160Z [INSTALL_PODS] Installing React-jsinspector (0.81.5)
+2025-12-29T14:36:11.1673580Z [INSTALL_PODS] Installing React-jsinspectorcdp (0.81.5)
+2025-12-29T14:36:11.1674080Z [INSTALL_PODS] Installing React-jsinspectornetwork (0.81.5)
+2025-12-29T14:36:11.1674560Z [INSTALL_PODS] Installing React-jsinspectortracing (0.81.5)
+2025-12-29T14:36:11.1675280Z [INSTALL_PODS] Installing React-jsitooling (0.81.5)
+2025-12-29T14:36:11.1676060Z [INSTALL_PODS] Installing React-jsitracing (0.81.5)
+2025-12-29T14:36:11.1676730Z [INSTALL_PODS] Installing React-logger (0.81.5)
+2025-12-29T14:36:11.1687450Z [INSTALL_PODS] Installing React-microtasksnativemodule (0.81.5)
+2025-12-29T14:36:11.1688700Z [INSTALL_PODS] Installing React-oscompat (0.81.5)
+2025-12-29T14:36:11.1689810Z [INSTALL_PODS] Installing React-perflogger (0.81.5)
+2025-12-29T14:36:11.1690920Z [INSTALL_PODS] Installing React-performancetimeline (0.81.5)
+2025-12-29T14:36:11.1692080Z [INSTALL_PODS] Installing React-rendererconsistency (0.81.5)
+2025-12-29T14:36:11.1693220Z [INSTALL_PODS] Installing React-renderercss (0.81.5)
+2025-12-29T14:36:11.1694290Z [INSTALL_PODS] Installing React-rendererdebug (0.81.5)
+2025-12-29T14:36:11.1695420Z [INSTALL_PODS] Installing React-runtimeexecutor (0.81.5)
+2025-12-29T14:36:11.1696500Z [INSTALL_PODS] Installing React-runtimescheduler (0.81.5)
+2025-12-29T14:36:11.1697530Z [INSTALL_PODS] Installing React-timing (0.81.5)
+2025-12-29T14:36:11.1698500Z [INSTALL_PODS] Installing React-utils (0.81.5)
+2025-12-29T14:36:11.1699590Z [INSTALL_PODS] Installing ReactAppDependencyProvider (0.81.5)
+2025-12-29T14:36:11.1700720Z [INSTALL_PODS] Installing ReactCodegen (0.81.5)
+2025-12-29T14:36:11.1701630Z [INSTALL_PODS] Installing ReactCommon (0.81.5)
+2025-12-29T14:36:11.1702770Z [INSTALL_PODS] Installing ReactNativeDependencies (0.81.5)
+2025-12-29T14:36:21.4558510Z [INSTALL_PODS] Installing RevenueCat (5.48.0)
+2025-12-29T14:36:30.3344540Z [INSTALL_PODS] Installing SDWebImage (5.21.5)
+2025-12-29T14:36:34.0370380Z [INSTALL_PODS] Installing SDWebImageAVIFCoder (0.11.1)
+2025-12-29T14:36:37.5478430Z [INSTALL_PODS] Installing SDWebImageSVGCoder (1.7.0)
+2025-12-29T14:36:38.6738610Z [INSTALL_PODS] Installing SDWebImageWebPCoder (0.14.6)
+2025-12-29T14:36:40.0247560Z [INSTALL_PODS] Installing Yoga (0.0.0)
+2025-12-29T14:36:40.0257910Z [INSTALL_PODS] Installing expo-dev-client (6.0.20)
+2025-12-29T14:36:40.0267200Z [INSTALL_PODS] Installing expo-dev-launcher (6.0.20)
+2025-12-29T14:36:40.0289880Z [INSTALL_PODS] Installing expo-dev-menu (7.0.18)
+2025-12-29T14:36:40.0331020Z [INSTALL_PODS] Installing expo-dev-menu-interface (2.0.0)
+2025-12-29T14:36:40.0433460Z [INSTALL_PODS] Installing hermes-engine (0.81.5)
+2025-12-29T14:36:42.2922940Z [INSTALL_PODS] Installing libavif (0.11.1)
+2025-12-29T14:36:44.1490670Z [INSTALL_PODS] Installing libdav1d (1.2.0)
+2025-12-29T14:36:49.0389310Z [INSTALL_PODS] Installing libwebp (1.5.0)
+2025-12-29T14:37:12.3339750Z [INSTALL_PODS] Installing react-native-safe-area-context (5.6.2)
+2025-12-29T14:37:12.3342730Z [INSTALL_PODS] Generating Pods project
+2025-12-29T14:37:12.3343650Z [INSTALL_PODS] Setting USE_HERMES build settings
+2025-12-29T14:37:12.3344390Z [INSTALL_PODS] Setting REACT_NATIVE_PATH build settings
+2025-12-29T14:37:12.3345090Z [INSTALL_PODS] Setting SWIFT_ACTIVE_COMPILATION_CONDITIONS build settings
+2025-12-29T14:37:14.2650880Z [INSTALL_PODS] [Ccache]: Removing Ccache from CC, LD, CXX & LDPLUSPLUS build settings
+2025-12-29T14:37:14.2651830Z [INSTALL_PODS] Setting SWIFT_ENABLE_EXPLICIT_MODULES build settings
+2025-12-29T14:37:14.2653170Z [INSTALL_PODS] [SPM] Cleaning old SPM dependencies from Pods project
+2025-12-29T14:37:14.2653930Z [INSTALL_PODS] [SPM] Adding SPM dependencies to Pods project
+2025-12-29T14:37:14.2654880Z [INSTALL_PODS] [Privacy Manifest Aggregation] No existing PrivacyInfo.xcprivacy file found, creating a new one.
+2025-12-29T14:37:14.2660610Z [INSTALL_PODS] [Privacy Manifest Aggregation] Reading .xcprivacy files to aggregate all used Required Reason APIs.
+2025-12-29T14:37:14.2661500Z [INSTALL_PODS] file_root: DotChain
+2025-12-29T14:37:14.2662550Z [INSTALL_PODS] Setting CLANG_CXX_LANGUAGE_STANDARD to c++20 on /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/DotChain.xcodeproj
+2025-12-29T14:37:16.7247660Z [INSTALL_PODS] ==================== DEPRECATION NOTICE =====================
+2025-12-29T14:37:16.7318150Z [INSTALL_PODS] Calling `pod install` directly is deprecated in React Native
+2025-12-29T14:37:16.7329550Z [INSTALL_PODS] because we are moving away from Cocoapods toward alternative
+2025-12-29T14:37:16.7343030Z [INSTALL_PODS] solutions to build the project.
+2025-12-29T14:37:16.7344560Z [INSTALL_PODS] * If you are using Expo, please run:
+2025-12-29T14:37:16.7345760Z [INSTALL_PODS] `npx expo run:ios`
+2025-12-29T14:37:16.7346920Z [INSTALL_PODS] * If you are using the Community CLI, please run:
+2025-12-29T14:37:16.7348080Z [INSTALL_PODS] `yarn ios`
+2025-12-29T14:37:16.7349210Z [INSTALL_PODS] =============================================================
+2025-12-29T14:37:16.7350390Z [INSTALL_PODS] Pod install took 104 [s] to run
+2025-12-29T14:37:16.7357130Z [INSTALL_PODS] Integrating client project
+2025-12-29T14:37:16.7357930Z [INSTALL_PODS] [!] Please close any current Xcode sessions and use `DotChain.xcworkspace` for this project from now on.
+2025-12-29T14:37:18.0911360Z [INSTALL_PODS] [!] React-Core-prebuilt has added 1 script phase. Please inspect before executing a build. See `https://guides.cocoapods.org/syntax/podspec.html#script_phases` for more information.
+2025-12-29T14:37:18.0912470Z [INSTALL_PODS] [Expo] Installing the build script for target DotChain
+2025-12-29T14:37:18.0928500Z [INSTALL_PODS] [!] ReactNativeDependencies has added 1 script phase. Please inspect before executing a build. See `https://guides.cocoapods.org/syntax/podspec.html#script_phases` for more information.
+2025-12-29T14:37:18.0929870Z [INSTALL_PODS] Pod installation complete! There are 108 dependencies from the Podfile and 116 total pods installed.
+2025-12-29T14:37:18.0940760Z [INSTALL_PODS] [!] hermes-engine has added 1 script phase. Please inspect before executing a build. See `https://guides.cocoapods.org/syntax/podspec.html#script_phases` for more information.
+2025-12-29T14:37:18.0941880Z [INSTALL_PODS] [Expo] Adding '[Expo Autolinking] Run Codegen with autolinking' build phase to ReactCodegen
+2025-12-29T14:37:18.1279770Z [CONFIGURE_XCODE_PROJECT] Configuring Xcode project
+2025-12-29T14:37:18.1283460Z [CONFIGURE_XCODE_PROJECT] Assigning provisioning profile '*[expo] com.doooooraku.dotchain AppStore 2025-12-26T04:33:44.466Z' (Apple Team ID: HSH4HJ72Y8) to target 'DotChain'
+2025-12-29T14:37:18.3363110Z [CONFIGURE_XCODE_PROJECT] Updating versions in /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/DotChain/Info.plist
+2025-12-29T14:37:21.1285070Z [EAGER_BUNDLE] React Compiler enabled
+2025-12-29T14:37:21.6601760Z [EAGER_BUNDLE] Starting Metro Bundler
+2025-12-29T14:37:32.0021890Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ░░░░░░░░░░░░░░░░  0.0% (0/1)
+2025-12-29T14:37:35.5047950Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓░░░░░░░░░░░░░░ 16.0% ( 9/25)
+2025-12-29T14:37:39.0252960Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓░░░░░░░░░░░░░░ 16.0% ( 47/196)
+2025-12-29T14:37:42.5171000Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓░░░░░░░░░░ 37.7% (291/474)
+2025-12-29T14:37:46.0198210Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓░░░░░░░░ 54.4% (441/598)
+2025-12-29T14:37:48.9807140Z [EAGER_BUNDLE] |  🐥 [tamagui]  [33mnative[0m edit                       ·    8 found   ·    7 opt   ·    0 flat  2229ms
+2025-12-29T14:37:49.5591310Z [EAGER_BUNDLE] |  🐥 [tamagui]  [33mnative[0m index                      ·   32 found   ·   30 opt   ·   10 flat   165ms
+2025-12-29T14:37:49.5715940Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓░░░░░░░ 61.4% (485/632)
+2025-12-29T14:37:49.7457210Z [EAGER_BUNDLE] |  🐥 [tamagui]  [33mnative[0m index                      ·   46 found   ·   45 opt   ·   19 flat   113ms
+2025-12-29T14:37:49.8890080Z [EAGER_BUNDLE] |  🐥 [tamagui]  [33mnative[0m index                      ·   54 found   ·   50 opt   ·   15 flat   179ms
+2025-12-29T14:37:53.0625310Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓░░░░░░ 66.1% (588/723)
+2025-12-29T14:37:54.1743130Z [EAGER_BUNDLE] |  🐥 [tamagui]  [33mnative[0m IconPicker                 ·    9 found   ·    8 opt   ·    4 flat    68ms
+2025-12-29T14:37:54.2090520Z [EAGER_BUNDLE] |  🐥 [tamagui]  [33mnative[0m TutorialOverlay            ·    6 found   ·    6 opt   ·    0 flat    25ms
+2025-12-29T14:37:54.4615980Z [EAGER_BUNDLE] |  🐥 [tamagui]  [33mnative[0m HabitButton                ·    2 found   ·    2 opt   ·    1 flat    11ms
+2025-12-29T14:37:54.5216510Z [EAGER_BUNDLE] |  🐥 [tamagui]  [33mnative[0m HeatmapChain               ·    2 found   ·    2 opt   ·    0 flat    23ms
+2025-12-29T14:37:56.6022630Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓░░░░░ 69.7% (714/955)
+2025-12-29T14:38:00.1164380Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓░░░░░ 69.7% ( 762/2771)
+2025-12-29T14:38:00.9119080Z [EAGER_BUNDLE] |  🐥 [tamagui]  [33mnative[0m Toast                      ·    3 found   ·    2 opt   ·    1 flat    18ms
+2025-12-29T14:38:03.5950640Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓░░░░░ 69.7% ( 999/2971)
+2025-12-29T14:38:07.1215820Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓░░░░░ 69.7% (1306/2971)
+2025-12-29T14:38:10.6268470Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓░░░░░ 69.7% (1573/2971)
+2025-12-29T14:38:14.1931140Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓░░░░░ 69.7% (1917/2971)
+2025-12-29T14:38:17.6989340Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓░░░░░ 69.7% (2305/2971)
+2025-12-29T14:38:21.2408800Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ 84.3% (2738/2982)
+2025-12-29T14:38:24.7625440Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ 84.5% (2958/3229)
+2025-12-29T14:38:28.3581240Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░ 87.7% (3095/3305)
+2025-12-29T14:38:31.8836330Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 95.1% (3352/3440)
+2025-12-29T14:38:35.3850140Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 95.3% (3557/3646)
+2025-12-29T14:38:38.8930480Z [EAGER_BUNDLE] iOS node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 96.8% (3696/3757)
+2025-12-29T14:38:41.7793990Z [EAGER_BUNDLE] iOS Bundled 69808ms node_modules/.pnpm/expo-router@6.0.17_3412a78c7a0525044777a190114c172c/node_modules/expo-router/entry.js (3826 modules)
+2025-12-29T14:38:41.8507110Z [EAGER_BUNDLE] Writing bundle output to: /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/ea57kfly7w/main.jsbundle
+2025-12-29T14:38:41.8611450Z [EAGER_BUNDLE] Copying 45 asset files
+2025-12-29T14:38:41.9592720Z [EAGER_BUNDLE] Done writing bundle output
+2025-12-29T14:38:45.8356000Z [RUN_FASTLANE] Creating Gymfile
+2025-12-29T14:38:45.8425730Z [RUN_FASTLANE] Gymfile created
+2025-12-29T14:38:50.0910940Z [RUN_FASTLANE] Successfully loaded '/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/Gymfile' 📄
+2025-12-29T14:38:50.1015970Z [RUN_FASTLANE] +---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
+2025-12-29T14:38:50.1119600Z [RUN_FASTLANE] |                                                                  Detected Values from './Gymfile'                                                                   |
+2025-12-29T14:38:50.1125890Z [RUN_FASTLANE] +-----------------------+---------------------------------------------------------------------------------------------------------------------------------------------+
+2025-12-29T14:38:50.1127350Z [RUN_FASTLANE] | suppress_xcode_output | true                                                                                                                                        |
+2025-12-29T14:38:50.1128360Z [RUN_FASTLANE] | clean                 | false                                                                                                                                       |
+2025-12-29T14:38:50.1129320Z [RUN_FASTLANE] | scheme                | DotChain                                                                                                                                    |
+2025-12-29T14:38:50.1130510Z [RUN_FASTLANE] | configuration         | Release                                                                                                                                     |
+2025-12-29T14:38:50.1131460Z [RUN_FASTLANE] | export_options        |                                                                                                                                             |
+2025-12-29T14:38:50.1132560Z [RUN_FASTLANE] | export_xcargs         | OTHER_CODE_SIGN_FLAGS="--keychain /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-b0701371-a856-4610-9e51-3a2bee0dd654.keychain" |
+2025-12-29T14:38:50.1133670Z [RUN_FASTLANE] | disable_xcpretty      | true                                                                                                                                        |
+2025-12-29T14:38:50.1138280Z [RUN_FASTLANE] | buildlog_path         | /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/logs                           |
+2025-12-29T14:38:50.1153070Z [RUN_FASTLANE] | output_directory      | ./build                                                                                                                                     |
+2025-12-29T14:38:50.1154210Z [RUN_FASTLANE] +-----------------------+---------------------------------------------------------------------------------------------------------------------------------------------+
+2025-12-29T14:38:50.2190050Z [RUN_FASTLANE] Resolving Swift Package Manager dependencies...
+2025-12-29T14:38:50.2193190Z [RUN_FASTLANE] $ xcodebuild -resolvePackageDependencies -workspace ./DotChain.xcworkspace -scheme DotChain -configuration Release
+2025-12-29T14:38:54.0997200Z [RUN_FASTLANE] ▸ Command line invocation:
+2025-12-29T14:38:54.1011170Z [RUN_FASTLANE] ▸     /Applications/Xcode_16.4.app/Contents/Developer/usr/bin/xcodebuild -resolvePackageDependencies -workspace ./DotChain.xcworkspace -scheme DotChain -configuration Release
+2025-12-29T14:39:05.5210890Z [RUN_FASTLANE] ▸ resolved source packages:
+2025-12-29T14:39:05.5576260Z [RUN_FASTLANE] $ xcodebuild -showBuildSettings -workspace ./DotChain.xcworkspace -scheme DotChain -configuration Release 2>&1
+2025-12-29T14:39:08.5670970Z [RUN_FASTLANE] Command timed out after 3 seconds on try 1 of 4, trying again with a 6 second timeout...
+2025-12-29T14:39:14.6045390Z [RUN_FASTLANE] Command timed out after 6 seconds on try 2 of 4, trying again with a 12 second timeout...
+2025-12-29T14:39:24.8006780Z [RUN_FASTLANE] Detected provisioning profile mapping: {:"com.doooooraku.dotchain"=>"cb3b951c-7c4f-4bd3-9e0d-fc613e52b630"}
+2025-12-29T14:39:24.8618570Z [RUN_FASTLANE] 
+2025-12-29T14:39:24.8651560Z [RUN_FASTLANE] +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
+2025-12-29T14:39:24.8687780Z [RUN_FASTLANE] |                                                                                          Summary for gym 2.229.1                                                                                          |
+2025-12-29T14:39:24.8691700Z [RUN_FASTLANE] +-------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------+
+2025-12-29T14:39:24.8694810Z [RUN_FASTLANE] | workspace                                                   | ./DotChain.xcworkspace                                                                                                                      |
+2025-12-29T14:39:24.8697670Z [RUN_FASTLANE] | scheme                                                      | DotChain                                                                                                                                    |
+2025-12-29T14:39:24.8700600Z [RUN_FASTLANE] | clean                                                       | false                                                                                                                                       |
+2025-12-29T14:39:24.8703300Z [RUN_FASTLANE] | output_directory                                            | ./build                                                                                                                                     |
+2025-12-29T14:39:24.8706230Z [RUN_FASTLANE] | output_name                                                 | DotChain                                                                                                                                    |
+2025-12-29T14:39:24.8708910Z [RUN_FASTLANE] | configuration                                               | Release                                                                                                                                     |
+2025-12-29T14:39:24.8711620Z [RUN_FASTLANE] | silent                                                      | false                                                                                                                                       |
+2025-12-29T14:39:24.8715310Z [RUN_FASTLANE] | skip_package_ipa                                            | false                                                                                                                                       |
+2025-12-29T14:39:24.8732540Z [RUN_FASTLANE] | skip_package_pkg                                            | false                                                                                                                                       |
+2025-12-29T14:39:24.8733570Z [RUN_FASTLANE] | export_options.method                                       | app-store                                                                                                                                   |
+2025-12-29T14:39:24.8738320Z [RUN_FASTLANE] | export_options.provisioningProfiles.com.doooooraku.dotchain | cb3b951c-7c4f-4bd3-9e0d-fc613e52b630                                                                                                        |
+2025-12-29T14:39:24.8739920Z [RUN_FASTLANE] | export_xcargs                                               | OTHER_CODE_SIGN_FLAGS="--keychain /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-b0701371-a856-4610-9e51-3a2bee0dd654.keychain" |
+2025-12-29T14:39:24.8741370Z [RUN_FASTLANE] | build_path                                                  | /Users/runner/Library/Developer/Xcode/Archives/2025-12-29                                                                                   |
+2025-12-29T14:39:24.8742570Z [RUN_FASTLANE] | result_bundle                                               | false                                                                                                                                       |
+2025-12-29T14:39:24.8743910Z [RUN_FASTLANE] | buildlog_path                                               | /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/logs                           |
+2025-12-29T14:39:24.8745330Z [RUN_FASTLANE] | destination                                                 | generic/platform=iOS                                                                                                                        |
+2025-12-29T14:39:24.8746540Z [RUN_FASTLANE] | suppress_xcode_output                                       | true                                                                                                                                        |
+2025-12-29T14:39:24.8747600Z [RUN_FASTLANE] | xcodebuild_formatter                                        | xcbeautify                                                                                                                                  |
+2025-12-29T14:39:24.8748760Z [RUN_FASTLANE] | build_timing_summary                                        | false                                                                                                                                       |
+2025-12-29T14:39:24.8749820Z [RUN_FASTLANE] | disable_xcpretty                                            | true                                                                                                                                        |
+2025-12-29T14:39:24.8750940Z [RUN_FASTLANE] | skip_profile_detection                                      | false                                                                                                                                       |
+2025-12-29T14:39:24.8751980Z [RUN_FASTLANE] | xcodebuild_command                                          | xcodebuild                                                                                                                                  |
+2025-12-29T14:39:24.8753100Z [RUN_FASTLANE] | skip_package_dependencies_resolution                        | false                                                                                                                                       |
+2025-12-29T14:39:24.8754270Z [RUN_FASTLANE] | disable_package_automatic_updates                           | false                                                                                                                                       |
+2025-12-29T14:39:24.8755330Z [RUN_FASTLANE] | use_system_scm                                              | false                                                                                                                                       |
+2025-12-29T14:39:24.8756920Z [RUN_FASTLANE] | xcode_path                                                  | /Applications/Xcode_16.4.app                                                                                                                |
+2025-12-29T14:39:24.8758230Z [RUN_FASTLANE] +-------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------+
+2025-12-29T14:39:24.8761230Z [RUN_FASTLANE] $ set -o pipefail && xcodebuild -workspace ./DotChain.xcworkspace -scheme DotChain -configuration Release -destination 'generic/platform=iOS' -archivePath /Users/runner/Library/Developer/Xcode/Archives/2025-12-29/DotChain\ 2025-12-29\ 14.39.24.xcarchive archive | tee /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/logs/DotChain-DotChain.log > /dev/null
+2025-12-29T14:40:04.7042010Z [RUN_FASTLANE] › Executing react-native Pods/hermes-engine » [CP-User] [Hermes] Replace Hermes for the right configuration, if needed
+2025-12-29T14:40:04.9879520Z [RUN_FASTLANE] › Executing react-native Pods/ReactNativeDependencies » [CP-User] [RNDeps] Replace React Native Dependencies for the right configuration, if needed
+2025-12-29T14:40:05.4131900Z [RUN_FASTLANE] › Executing react-native Pods/hermes-engine » [CP] Copy XCFrameworks
+2025-12-29T14:40:12.4822830Z [RUN_FASTLANE] › Executing react-native Pods/ReactNativeDependencies » [CP] Copy XCFrameworks
+2025-12-29T14:40:12.5068850Z [RUN_FASTLANE] › Preparing Pods/expo-dev-menu-EXDevMenu » ResourceBundle-EXDevMenu-expo-dev-menu-Info.plist
+2025-12-29T14:41:02.4534060Z [RUN_FASTLANE] › Preparing expo-image Pods/SDWebImage-SDWebImage » ResourceBundle-SDWebImage-SDWebImage-Info.plist
+2025-12-29T14:41:02.4627210Z [RUN_FASTLANE] › Copying   expo-image ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/SDWebImage.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/Pods/SDWebImage/WebImage/PrivacyInfo.xcprivacy
+2025-12-29T14:41:02.4742150Z [RUN_FASTLANE] › Preparing react-native-purchases Pods/RevenueCat-RevenueCat » ResourceBundle-RevenueCat-RevenueCat-Info.plist
+2025-12-29T14:41:02.4844160Z [RUN_FASTLANE] › Copying   react-native-purchases ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/RevenueCat.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/Pods/RevenueCat/Sources/PrivacyInfo.xcprivacy
+2025-12-29T14:41:02.4950800Z [RUN_FASTLANE] › Preparing Pods/React-cxxreact-React-cxxreact_privacy » ResourceBundle-React-cxxreact_privacy-React-cxxreact-Info.plist
+2025-12-29T14:41:02.5029060Z [RUN_FASTLANE] › Copying   ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/React-cxxreact_privacy.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0/node_modules/react-native/ReactCommon/cxxreact/PrivacyInfo.xcprivacy
+2025-12-29T14:41:02.5132710Z [RUN_FASTLANE] › Preparing Pods/React-Core-React-Core_privacy » ResourceBundle-React-Core_privacy-React-Core-Info.plist
+2025-12-29T14:41:02.5242470Z [RUN_FASTLANE] › Copying   ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/React-Core_privacy.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0/node_modules/react-native/React/Resources/PrivacyInfo.xcprivacy
+2025-12-29T14:41:02.5386730Z [RUN_FASTLANE] › Preparing Pods/RNSVG-RNSVGFilters » ResourceBundle-RNSVGFilters-RNSVG-Info.plist
+2025-12-29T14:41:02.5468850Z [RUN_FASTLANE] › Copying   ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/RNSVGFilters.bundle/RNSVGCompositeXor.iphoneos.metallib ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-svg@15.12.1_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0__react@19.1.0/node_modules/react-native-svg/apple/Filters/MetalCI/RNSVGCompositeXor.iphoneos.metallib
+2025-12-29T14:41:02.5587410Z [RUN_FASTLANE] › Copying   ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/RNSVGFilters.bundle/RNSVGArithmeticFilter.iphoneos.metallib ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/react-native-svg@15.12.1_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0__react@19.1.0/node_modules/react-native-svg/apple/Filters/MetalCI/RNSVGArithmeticFilter.iphoneos.metallib
+2025-12-29T14:41:02.5691580Z [RUN_FASTLANE] › Preparing Pods/RNCAsyncStorage-RNCAsyncStorage_resources » ResourceBundle-RNCAsyncStorage_resources-RNCAsyncStorage-Info.plist
+2025-12-29T14:41:02.5763000Z [RUN_FASTLANE] › Copying   ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/RNCAsyncStorage_resources.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/@react-native-async-storage+async-storage@2.2.0_react-native@0.81.5_@babel+core@7.28.5_@types_ig6lagr6sa7lblnafinownlff4/node_modules/@react-native-async-storage/async-storage/ios/PrivacyInfo.xcprivacy
+2025-12-29T14:41:02.5898690Z [RUN_FASTLANE] › Preparing react-native-purchases Pods/PurchasesHybridCommon-PurchasesHybridCommon » ResourceBundle-PurchasesHybridCommon-PurchasesHybridCommon-Info.plist
+2025-12-29T14:41:02.6002380Z [RUN_FASTLANE] › Copying   react-native-purchases ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/PurchasesHybridCommon.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/Pods/PurchasesHybridCommon/ios/PurchasesHybridCommon/PurchasesHybridCommon/PrivacyInfo.xcprivacy
+2025-12-29T14:41:02.6101630Z [RUN_FASTLANE] › Preparing Pods/ExpoSystemUI-ExpoSystemUI_privacy » ResourceBundle-ExpoSystemUI_privacy-ExpoSystemUI-Info.plist
+2025-12-29T14:41:02.6206150Z [RUN_FASTLANE] › Copying   ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/ExpoSystemUI_privacy.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/expo-system-ui@6.0.9_expo@54.0.27_react-native-web@0.21.2_react-dom@19.1.0_react@19.1.0__reac_4i34v546mwikoagsofjkngo6eu/node_modules/expo-system-ui/ios/PrivacyInfo.xcprivacy
+2025-12-29T14:44:31.5154400Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » yuv_sse41.c
+2025-12-29T14:44:31.5554460Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » yuv_sse2.c
+2025-12-29T14:44:31.5558840Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » yuv_mips_dsp_r2.c
+2025-12-29T14:44:31.5707530Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » yuv_mips32.c
+2025-12-29T14:44:31.5980970Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » yuv_neon.c
+2025-12-29T14:44:31.6085420Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » yuv.c
+2025-12-29T14:44:31.6185450Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » webp_enc.c
+2025-12-29T14:44:31.6289190Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » webp_dec.c
+2025-12-29T14:44:31.6393540Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » vp8l_enc.c
+2025-12-29T14:44:31.6516380Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » vp8l_dec.c
+2025-12-29T14:44:31.6610680Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » vp8_dec.c
+2025-12-29T14:44:31.6628030Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » utils.c
+2025-12-29T14:44:31.6629240Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » upsampling_sse41.c
+2025-12-29T14:44:31.6630740Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » upsampling_sse2.c
+2025-12-29T14:44:31.6813260Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » upsampling_neon.c
+2025-12-29T14:44:31.6917350Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » upsampling_msa.c
+2025-12-29T14:44:31.7022130Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » upsampling_mips_dsp_r2.c
+2025-12-29T14:44:31.7126600Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » upsampling.c
+2025-12-29T14:44:31.7229640Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » tree_enc.c
+2025-12-29T14:44:31.7333290Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » tree_dec.c
+2025-12-29T14:44:31.7436330Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » token_enc.c
+2025-12-29T14:44:31.7543290Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » thread_utils.c
+2025-12-29T14:44:31.7640470Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » syntax_enc.c
+2025-12-29T14:44:31.7641530Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » ssim_sse2.c
+2025-12-29T14:44:31.7645130Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » ssim.c
+2025-12-29T14:44:31.7762140Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » sharpyuv_sse2.c
+2025-12-29T14:44:31.7881840Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » sharpyuv_neon.c
+2025-12-29T14:44:31.7985880Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » sharpyuv_dsp.c
+2025-12-29T14:44:31.8130960Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » sharpyuv_gamma.c
+2025-12-29T14:44:31.8248500Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » sharpyuv_csp.c
+2025-12-29T14:44:31.8370120Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » sharpyuv_cpu.c
+2025-12-29T14:44:31.8794270Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » rescaler_sse2.c
+2025-12-29T14:44:31.8893730Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » sharpyuv.c
+2025-12-29T14:44:31.8997610Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » rescaler_utils.c
+2025-12-29T14:44:31.9097260Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » rescaler_neon.c
+2025-12-29T14:44:31.9199470Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » rescaler_msa.c
+2025-12-29T14:44:31.9316520Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » rescaler_mips_dsp_r2.c
+2025-12-29T14:44:31.9420100Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » rescaler_mips32.c
+2025-12-29T14:44:31.9528820Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » rescaler.c
+2025-12-29T14:44:31.9630890Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » random_utils.c
+2025-12-29T14:44:31.9660740Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » quant_levels_utils.c
+2025-12-29T14:44:31.9712520Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » quant_levels_dec_utils.c
+2025-12-29T14:44:31.9713510Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » quant_enc.c
+2025-12-29T14:44:31.9819660Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » quant_dec.c
+2025-12-29T14:44:31.9922180Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » predictor_enc.c
+2025-12-29T14:44:32.0032790Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » picture_tools_enc.c
+2025-12-29T14:44:32.0135290Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » picture_rescale_enc.c
+2025-12-29T14:44:32.0136190Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » picture_psnr_enc.c
+2025-12-29T14:44:32.0241690Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » picture_enc.c
+2025-12-29T14:44:32.0343600Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » picture_csp_enc.c
+2025-12-29T14:44:32.0447640Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » palette.c
+2025-12-29T14:44:32.0562450Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » near_lossless_enc.c
+2025-12-29T14:44:32.0666510Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » muxread.c
+2025-12-29T14:44:32.0766820Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » muxinternal.c
+2025-12-29T14:44:32.0769880Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless_sse41.c
+2025-12-29T14:44:32.0772280Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless_neon.c
+2025-12-29T14:44:32.0806610Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless_msa.c
+2025-12-29T14:44:32.0807690Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless_mips_dsp_r2.c
+2025-12-29T14:44:32.0910330Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless_enc_sse41.c
+2025-12-29T14:44:32.1014220Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless_enc_sse2.c
+2025-12-29T14:44:32.1159990Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless_enc_neon.c
+2025-12-29T14:44:32.1262330Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless_enc_msa.c
+2025-12-29T14:44:32.1382880Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless_enc_mips_dsp_r2.c
+2025-12-29T14:44:32.1486350Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless_enc_mips32.c
+2025-12-29T14:44:32.1596810Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless_enc.c
+2025-12-29T14:44:32.1700360Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » lossless.c
+2025-12-29T14:44:32.1807320Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » iterator_enc.c
+2025-12-29T14:44:32.1808510Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » io_dec.c
+2025-12-29T14:44:32.2068980Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » idec_dec.c
+2025-12-29T14:44:32.2178770Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » huffman_utils.c
+2025-12-29T14:44:32.2267360Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » huffman_encode_utils.c
+2025-12-29T14:44:32.2373400Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » histogram_enc.c
+2025-12-29T14:44:32.2474710Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » frame_enc.c
+2025-12-29T14:44:32.2576300Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » libwebp-dummy.m
+2025-12-29T14:44:32.2678470Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » frame_dec.c
+2025-12-29T14:44:32.2784550Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » filters_utils.c
+2025-12-29T14:44:32.2889540Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » filters_sse2.c
+2025-12-29T14:44:32.2993330Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » filters_neon.c
+2025-12-29T14:44:32.3092320Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » filters_msa.c
+2025-12-29T14:44:32.3194340Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » filters_mips_dsp_r2.c
+2025-12-29T14:44:32.3297290Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » filters.c
+2025-12-29T14:44:32.3385750Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » filter_enc.c
+2025-12-29T14:44:32.3509190Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » enc_sse41.c
+2025-12-29T14:44:32.3632040Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » enc_sse2.c
+2025-12-29T14:44:32.3740070Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » enc_neon.c
+2025-12-29T14:44:32.3844810Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » enc_msa.c
+2025-12-29T14:44:32.3950640Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » enc_mips_dsp_r2.c
+2025-12-29T14:44:32.4050810Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » enc_mips32.c
+2025-12-29T14:44:32.4154270Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » demux.c
+2025-12-29T14:44:32.4254150Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » dec_sse41.c
+2025-12-29T14:44:32.4356620Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » enc.c
+2025-12-29T14:44:32.4457130Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » dec_sse2.c
+2025-12-29T14:44:32.4609250Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » dec_neon.c
+2025-12-29T14:44:32.4719170Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » dec_msa.c
+2025-12-29T14:44:32.4829520Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » dec_mips_dsp_r2.c
+2025-12-29T14:44:32.4933420Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » dec_mips32.c
+2025-12-29T14:44:32.5036090Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » dec_clip_tables.c
+2025-12-29T14:44:32.5138340Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » dec.c
+2025-12-29T14:44:32.5141510Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » cpu.c
+2025-12-29T14:44:32.5242930Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » cost_sse2.c
+2025-12-29T14:44:32.5344760Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » cost_neon.c
+2025-12-29T14:44:32.5448000Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » cost_mips_dsp_r2.c
+2025-12-29T14:44:32.5552430Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » cost_mips32.c
+2025-12-29T14:44:32.5689420Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » cost.c
+2025-12-29T14:44:32.5791560Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » config_enc.c
+2025-12-29T14:44:32.5893250Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » cost_enc.c
+2025-12-29T14:44:32.5966290Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » color_cache_utils.c
+2025-12-29T14:44:32.5978370Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » buffer_dec.c
+2025-12-29T14:44:32.5980330Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » bit_writer_utils.c
+2025-12-29T14:44:32.5981980Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » bit_reader_utils.c
+2025-12-29T14:44:32.5984620Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » backward_references_enc.c
+2025-12-29T14:44:32.6191860Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » anim_decode.c
+2025-12-29T14:44:32.6193010Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » anim_encode.c
+2025-12-29T14:44:32.6193540Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » analysis_enc.c
+2025-12-29T14:44:32.6194850Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » alpha_processing_sse41.c
+2025-12-29T14:44:32.6195700Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » alpha_processing_sse2.c
+2025-12-29T14:44:32.6199360Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » alpha_processing_neon.c
+2025-12-29T14:44:32.6200200Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » alpha_processing_mips_dsp_r2.c
+2025-12-29T14:44:32.6296560Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » alpha_processing.c
+2025-12-29T14:44:32.6398470Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » alpha_enc.c
+2025-12-29T14:44:32.6500330Z [RUN_FASTLANE] › Compiling expo-image Pods/libwebp » alpha_dec.c
+2025-12-29T14:44:32.6604210Z [RUN_FASTLANE] › Packaging expo-image Pods/libwebp » liblibwebp.a
+2025-12-29T14:44:32.7919360Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » tables.c
+2025-12-29T14:44:32.8044610Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » scan.c
+2025-12-29T14:44:32.8045970Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » wedge.c
+2025-12-29T14:44:32.8046600Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » qm.c
+2025-12-29T14:44:32.8366990Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » warpmv.c
+2025-12-29T14:44:32.8522310Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » thread_task.c
+2025-12-29T14:44:32.8624150Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » refmvs.c
+2025-12-29T14:44:32.8727270Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » recon_tmpl_16.c
+2025-12-29T14:44:32.8940560Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » picture.c
+2025-12-29T14:44:32.9051830Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » obu.c
+2025-12-29T14:44:32.9579060Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » msac.c
+2025-12-29T14:44:32.9682860Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » mem.c
+2025-12-29T14:44:32.9785670Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » mc_tmpl_16.c
+2025-12-29T14:44:32.9888600Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » mc_tmpl.c
+2025-12-29T14:44:32.9992150Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » lr_apply_tmpl_16.c
+2025-12-29T14:44:33.0105900Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » lr_apply_tmpl.c
+2025-12-29T14:44:33.0285190Z [RUN_FASTLANE] › Compiling looprestoration_tmpl_16.c
+2025-12-29T14:44:33.0406520Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » looprestoration_tmpl.c
+2025-12-29T14:44:33.0511450Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » loopfilter_tmpl_16.c
+2025-12-29T14:44:33.0625100Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » log.c
+2025-12-29T14:44:33.0728970Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » lib.c
+2025-12-29T14:44:33.0834000Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » lf_mask.c
+2025-12-29T14:44:33.0940340Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » lf_apply_tmpl_16.c
+2025-12-29T14:44:33.1043430Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » lf_apply_tmpl.c
+2025-12-29T14:44:33.1235320Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » libdav1d-dummy.m
+2025-12-29T14:44:33.1238180Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » itx_tmpl_16.c
+2025-12-29T14:44:33.1342210Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » itx_tmpl.c
+2025-12-29T14:44:33.1450390Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » itx_1d.c
+2025-12-29T14:44:33.1553790Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » ipred_tmpl_16.c
+2025-12-29T14:44:33.1657980Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » ipred_tmpl.c
+2025-12-29T14:44:33.1834640Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » ipred_prepare_tmpl_16.c
+2025-12-29T14:44:33.1937960Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » ipred_prepare_tmpl.c
+2025-12-29T14:44:33.2040590Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » intra_edge.c
+2025-12-29T14:44:33.2143830Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » getbits.c
+2025-12-29T14:44:33.2272850Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » filmgrain_tmpl_16.c
+2025-12-29T14:44:33.2402700Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » filmgrain_tmpl.c
+2025-12-29T14:44:33.2505160Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » fg_apply_tmpl_16.c
+2025-12-29T14:44:33.2607290Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » fg_apply_tmpl.c
+2025-12-29T14:44:33.2717410Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » dequant_tables.c
+2025-12-29T14:44:33.2837130Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » data.c
+2025-12-29T14:44:33.2941370Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » decode.c
+2025-12-29T14:44:33.2943340Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » cpu.c
+2025-12-29T14:44:33.2944850Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » cdf.c
+2025-12-29T14:44:33.2947570Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » cdef_tmpl_16.c
+2025-12-29T14:44:33.3056170Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » cdef_tmpl.c
+2025-12-29T14:44:33.3244720Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » cdef_apply_tmpl_16.c
+2025-12-29T14:44:33.3346160Z [RUN_FASTLANE] › Compiling expo-image Pods/libdav1d » cdef_apply_tmpl.c
+2025-12-29T14:44:33.3448130Z [RUN_FASTLANE] › Packaging expo-image Pods/libdav1d » liblibdav1d.a
+2025-12-29T14:44:33.3551260Z [RUN_FASTLANE] › Compiling Pods/libavif » scale.c
+2025-12-29T14:44:33.3654580Z [RUN_FASTLANE] › Compiling Pods/libavif » reformat_libyuv.c
+2025-12-29T14:44:33.3757880Z [RUN_FASTLANE] › Compiling Pods/libavif » reformat_libsharpyuv.c
+2025-12-29T14:44:33.3862620Z [RUN_FASTLANE] › Compiling Pods/libavif » write.c
+2025-12-29T14:44:33.3966150Z [RUN_FASTLANE] › Compiling Pods/libavif » utils.c
+2025-12-29T14:44:33.4068210Z [RUN_FASTLANE] › Compiling Pods/libavif » reformat.c
+2025-12-29T14:44:33.4170050Z [RUN_FASTLANE] › Compiling Pods/libavif » rawdata.c
+2025-12-29T14:44:33.4276760Z [RUN_FASTLANE] › Compiling Pods/libavif » obu.c
+2025-12-29T14:44:33.4380490Z [RUN_FASTLANE] › Compiling Pods/libavif » stream.c
+2025-12-29T14:44:33.4483890Z [RUN_FASTLANE] › Compiling Pods/libavif » read.c
+2025-12-29T14:44:33.4595420Z [RUN_FASTLANE] › Compiling Pods/libavif » mem.c
+2025-12-29T14:44:33.4699090Z [RUN_FASTLANE] › Compiling Pods/libavif » exif.c
+2025-12-29T14:44:33.4806620Z [RUN_FASTLANE] › Compiling Pods/libavif » colr.c
+2025-12-29T14:44:33.4949440Z [RUN_FASTLANE] › Compiling codec_dav1d.c
+2025-12-29T14:44:33.5053440Z [RUN_FASTLANE] › Compiling Pods/libavif » avif.c
+2025-12-29T14:44:33.5160050Z [RUN_FASTLANE] › Compiling Pods/libavif » alpha.c
+2025-12-29T14:44:33.5335640Z [RUN_FASTLANE] › Preparing Pods/expo-dev-launcher-EXDevLauncher » ResourceBundle-EXDevLauncher-expo-dev-launcher-Info.plist
+2025-12-29T14:44:33.6326130Z [RUN_FASTLANE] › Compiling Pods/libavif » libavif-dummy.m
+2025-12-29T14:44:33.6356270Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImageSVGCoder » SDWebImageSVGCoder-dummy.m
+2025-12-29T14:44:33.6475870Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImageSVGCoder » SDImageSVGCoder.m
+2025-12-29T14:44:33.6576340Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImageAVIFCoder » SDWebImageAVIFCoder-dummy.m
+2025-12-29T14:44:33.6682120Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImageAVIFCoder » SDImageAVIFCoder.m
+2025-12-29T14:44:33.6784490Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImageAVIFCoder » Conversion.m
+2025-12-29T14:44:33.6785790Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImageAVIFCoder » ColorSpace.m
+2025-12-29T14:44:33.7189110Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImageWebPCoder » UIImage+WebP.m
+2025-12-29T14:44:33.7294400Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImageWebPCoder » SDWebImageWebPCoderDefine.m
+2025-12-29T14:44:33.7381200Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImageWebPCoder » SDWebImageWebPCoder-dummy.m
+2025-12-29T14:44:33.7435530Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImageWebPCoder » SDImageWebPCoder.m
+2025-12-29T14:44:33.7547140Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIView+WebCacheState.m
+2025-12-29T14:44:33.7760870Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIView+WebCacheOperation.m
+2025-12-29T14:44:33.7866940Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIView+WebCache.m
+2025-12-29T14:44:33.7969810Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIImageView+WebCache.m
+2025-12-29T14:44:33.8072750Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIImageView+HighlightedWebCache.m
+2025-12-29T14:44:33.8175340Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIImage+Transform.m
+2025-12-29T14:44:33.8278400Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIImage+MultiFormat.m
+2025-12-29T14:44:33.8380380Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIImage+Metadata.m
+2025-12-29T14:44:33.8482310Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIImage+MemoryCacheCost.m
+2025-12-29T14:44:33.8585290Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIImage+GIF.m
+2025-12-29T14:44:33.8697600Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIImage+ForceDecode.m
+2025-12-29T14:44:33.8812390Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIImage+ExtendedCacheData.m
+2025-12-29T14:44:33.8814880Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIColor+SDHexString.m
+2025-12-29T14:44:33.8916490Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » UIButton+WebCache.m
+2025-12-29T14:44:33.9137820Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImagePrefetcher.m
+2025-12-29T14:44:33.9244880Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageOptionsProcessor.m
+2025-12-29T14:44:33.9349270Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageOperation.m
+2025-12-29T14:44:33.9351040Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageManager.m
+2025-12-29T14:44:33.9457430Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageIndicator.m
+2025-12-29T14:44:33.9471860Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageError.m
+2025-12-29T14:44:33.9575970Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageDownloaderResponseModifier.m
+2025-12-29T14:44:33.9688510Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageDownloaderRequestModifier.m
+2025-12-29T14:44:33.9792760Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageDownloaderOperation.m
+2025-12-29T14:44:33.9899080Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageDownloaderConfig.m
+2025-12-29T14:44:34.0005190Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageDownloader.m
+2025-12-29T14:44:34.0109800Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageDefine.m
+2025-12-29T14:44:34.0256110Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageCompat.m
+2025-12-29T14:44:34.0468610Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageCacheSerializer.m
+2025-12-29T14:44:34.0470480Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImageCacheKeyFilter.m
+2025-12-29T14:44:34.0494360Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWebImage-dummy.m
+2025-12-29T14:44:34.0496000Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDMemoryCache.m
+2025-12-29T14:44:34.0598600Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDInternalMacros.m
+2025-12-29T14:44:34.0701810Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDWeakProxy.m
+2025-12-29T14:44:34.0805620Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageLoadersManager.m
+2025-12-29T14:44:34.0954800Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageLoader.m
+2025-12-29T14:44:34.1057190Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageHEICCoder.m
+2025-12-29T14:44:34.1159180Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageIOCoder.m
+2025-12-29T14:44:34.1261780Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageIOAnimatedCoder.m
+2025-12-29T14:44:34.1365160Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageGraphics.m
+2025-12-29T14:44:34.1468150Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageFramePool.m
+2025-12-29T14:44:34.1538000Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageFrame.m
+2025-12-29T14:44:34.1538900Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageCodersManager.m
+2025-12-29T14:44:34.1541240Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageCoderHelper.m
+2025-12-29T14:44:34.1642650Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageCoder.m
+2025-12-29T14:44:34.1914210Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageCachesManager.m
+2025-12-29T14:44:34.2017380Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageCacheDefine.m
+2025-12-29T14:44:34.2018960Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageCacheConfig.m
+2025-12-29T14:44:34.2122340Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageCache.m
+2025-12-29T14:44:34.2235890Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageAssetManager.m
+2025-12-29T14:44:34.2338470Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageAWebPCoder.m
+2025-12-29T14:44:34.2460580Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDImageAPNGCoder.m
+2025-12-29T14:44:34.2570640Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDFileAttributeHelper.m
+2025-12-29T14:44:34.2571640Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDGraphicsImageRenderer.m
+2025-12-29T14:44:34.2574650Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDDeviceHelper.m
+2025-12-29T14:44:34.3359870Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDDiskCache.m
+2025-12-29T14:44:34.3461670Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDCallbackQueue.m
+2025-12-29T14:44:34.3821440Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDAsyncBlockOperation.m
+2025-12-29T14:44:34.3945230Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDAssociatedObject.m
+2025-12-29T14:44:34.4155300Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDAnimatedImageView.m
+2025-12-29T14:44:34.4456990Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDAnimatedImageView+WebCache.m
+2025-12-29T14:44:34.4558690Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDAnimatedImageRep.m
+2025-12-29T14:44:34.4980860Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDAnimatedImage.m
+2025-12-29T14:44:34.5384930Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » SDAnimatedImagePlayer.m
+2025-12-29T14:44:34.5488190Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » NSImage+Compatibility.m
+2025-12-29T14:44:34.5590560Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » NSData+ImageContentType.m
+2025-12-29T14:44:34.5696270Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » NSButton+WebCache.m
+2025-12-29T14:44:34.5799700Z [RUN_FASTLANE] › Compiling expo-image Pods/SDWebImage » NSBezierPath+SDRoundedCorners.m
+2025-12-29T14:44:34.6105050Z [RUN_FASTLANE] › Preparing Pods/ExpoLocalization-ExpoLocalization_privacy » ResourceBundle-ExpoLocalization_privacy-ExpoLocalization-Info.plist
+2025-12-29T14:44:34.6219240Z [RUN_FASTLANE] › Copying   ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/ExpoLocalization_privacy.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/expo-localization@17.0.8_expo@54.0.27_react@19.1.0/node_modules/expo-localization/ios/PrivacyInfo.xcprivacy
+2025-12-29T14:44:34.6226110Z [RUN_FASTLANE] › Executing react-native Pods/React-Core-prebuilt » [CP-User] [RNDeps] Replace React Native Core for the right configuration, if needed
+2025-12-29T14:44:34.6685270Z [RUN_FASTLANE] › Preparing Pods/ExpoFileSystem-ExpoFileSystem_privacy » ResourceBundle-ExpoFileSystem_privacy-ExpoFileSystem-Info.plist
+2025-12-29T14:44:34.6836070Z [RUN_FASTLANE] › Copying   ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/ExpoFileSystem_privacy.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/expo-file-system@19.0.20_expo@54.0.27_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0_/node_modules/expo-file-system/ios/PrivacyInfo.xcprivacy
+2025-12-29T14:44:34.6945520Z [RUN_FASTLANE] › Preparing Pods/EXNotifications-ExpoNotifications_privacy » ResourceBundle-ExpoNotifications_privacy-EXNotifications-Info.plist
+2025-12-29T14:44:34.6956620Z [RUN_FASTLANE] › Copying   ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/ExpoNotifications_privacy.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/expo-notifications@0.32.14_expo@54.0.27_react-native@0.81.5_@babel+core@7.28.5_@types+react@1_qsua77eixqnndwidhxbiini7r4/node_modules/expo-notifications/ios/PrivacyInfo.xcprivacy
+2025-12-29T14:44:34.7148920Z [RUN_FASTLANE] › Copying   ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/ExpoConstants_privacy.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/expo-constants@18.0.11_expo@54.0.27_react-native@0.81.5_@babel+core@7.28.5_@types+react@19.1.17_react@19.1.0_/node_modules/expo-constants/ios/PrivacyInfo.xcprivacy
+2025-12-29T14:44:34.7267010Z [RUN_FASTLANE] › Preparing expo-constants Pods/EXConstants-EXConstants » ResourceBundle-EXConstants-EXConstants-Info.plist
+2025-12-29T14:44:34.7372390Z [RUN_FASTLANE] › Preparing Pods/EXApplication-ExpoApplication_privacy » ResourceBundle-ExpoApplication_privacy-EXApplication-Info.plist
+2025-12-29T14:44:34.7477550Z [RUN_FASTLANE] › Copying   ../../../Library/Developer/Xcode/DerivedData/DotChain-dhnhvsetotpdqucsyuvxdeuzmfqc/Build/Intermediates.noindex/ArchiveIntermediates/DotChain/IntermediateBuildFilesPath/UninstalledProducts/iphoneos/ExpoApplication_privacy.bundle/PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/node_modules/.pnpm/expo-application@7.0.8_expo@54.0.27/node_modules/expo-application/ios/PrivacyInfo.xcprivacy
+2025-12-29T14:44:34.7485790Z [RUN_FASTLANE] › Compiling expo-json-utils Pods/EXJSONUtils » NSDictionary+EXJSONUtils.m
+2025-12-29T14:44:34.7634100Z [RUN_FASTLANE] › Packaging expo-dev-menu-interface Pods/expo-dev-menu-interface » libexpo-dev-menu-interface.a
+2025-12-29T14:44:34.7732490Z [RUN_FASTLANE] › Compiling expo-json-utils Pods/EXJSONUtils » EXJSONUtils-dummy.m
+2025-12-29T14:44:34.7733580Z [RUN_FASTLANE] › Executing expo-dev-menu-interface Pods/expo-dev-menu-interface » Copy generated compatibility header
+2025-12-29T14:44:34.8045970Z [RUN_FASTLANE] › Packaging expo-json-utils Pods/EXJSONUtils » libEXJSONUtils.a
+2025-12-29T14:44:34.8248480Z [RUN_FASTLANE] › Creating  Pods/expo-dev-menu-EXDevMenu » EXDevMenu.bundle
+2025-12-29T14:44:34.8351440Z [RUN_FASTLANE] › Creating  expo-image Pods/SDWebImage-SDWebImage » SDWebImage.bundle
+2025-12-29T14:44:34.8455210Z [RUN_FASTLANE] › Creating  react-native-purchases Pods/RevenueCat-RevenueCat » RevenueCat.bundle
+2025-12-29T14:44:34.8558460Z [RUN_FASTLANE] › Creating  Pods/React-cxxreact-React-cxxreact_privacy » React-cxxreact_privacy.bundle
+2025-12-29T14:44:34.8723520Z [RUN_FASTLANE] › Creating  Pods/React-Core-React-Core_privacy » React-Core_privacy.bundle
+2025-12-29T14:44:34.8780630Z [RUN_FASTLANE] › Creating  Build/
+2025-12-29T14:44:34.8781660Z [RUN_FASTLANE] › Creating  Pods/RNSVG-RNSVGFilters » RNSVGFilters.bundle
+2025-12-29T14:44:34.8886070Z [RUN_FASTLANE] › Packaging expo-image Pods/SDWebImage » libSDWebImage.a
+2025-12-29T14:44:34.8997870Z [RUN_FASTLANE] › Creating  Pods/RNCAsyncStorage-RNCAsyncStorage_resources » RNCAsyncStorage_resources.bundle
+2025-12-29T14:44:34.9109030Z [RUN_FASTLANE] › Creating  react-native-purchases Pods/PurchasesHybridCommon-PurchasesHybridCommon » PurchasesHybridCommon.bundle
+2025-12-29T14:44:34.9211640Z [RUN_FASTLANE] › Creating  Pods/ExpoSystemUI-ExpoSystemUI_privacy » ExpoSystemUI_privacy.bundle
+2025-12-29T14:44:34.9314620Z [RUN_FASTLANE] › Packaging Pods/libavif » liblibavif.a
+2025-12-29T14:44:34.9421290Z [RUN_FASTLANE] › Creating  Pods/ExpoLocalization-ExpoLocalization_privacy » ExpoLocalization_privacy.bundle
+2025-12-29T14:44:34.9524640Z [RUN_FASTLANE] › Creating  Uninstalle
+2025-12-29T14:44:34.9630540Z [RUN_FASTLANE] › Creating  Pods/EXNotifications-ExpoNotifications_privacy » ExpoNotifications_privacy.bundle
+2025-12-29T14:44:34.9712080Z [RUN_FASTLANE] › Creating  Pods/EXConstants-ExpoConstants_privacy » ExpoConstants_privacy.bundle
+2025-12-29T14:44:34.9814000Z [RUN_FASTLANE] › Creating  expo-constants Pods/EXConstants-EXConstants » EXConstants.bundle
+2025-12-29T14:44:34.9920020Z [RUN_FASTLANE] › Creating  Pods/EXApplication-ExpoApplication_privacy » ExpoApplication_privacy.bundle
+2025-12-29T14:44:35.0028340Z [RUN_FASTLANE] › Packaging expo-image Pods/SDWebImageWebPCoder » libSDWebImageWebPCoder.a
+2025-12-29T14:44:35.0132060Z [RUN_FASTLANE] › Packaging expo-image Pods/SDWebImageSVGCoder » libSDWebImageSVGCoder.a
+2025-12-29T14:44:35.0305860Z [RUN_FASTLANE] › Packaging expo-image Pods/SDWebImageAVIFCoder » libSDWebImageAVIFCoder.a
+2025-12-29T14:44:35.0411390Z [RUN_FASTLANE] › Executing react-native Pods/React-Core-prebuilt » [CP] Copy XCFrameworks
+2025-12-29T14:44:35.0514470Z [RUN_FASTLANE] › Executing react-native Pods/React-RCTFBReactNativeSpec » [CP-User] [RN]Check FBReactNativeSpec
+2025-12-29T14:44:35.0719860Z [RUN_FASTLANE] › Executing dotchain Pods/ReactCodegen » [CP-User] Generate Specs
+2025-12-29T14:44:35.1431580Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » safeareacontextJSI-generated.cpp
+2025-12-29T14:44:35.1533120Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » safeareacontext-generated.mm
+2025-12-29T14:44:35.1639530Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » rnworkletsJSI-generated.cpp
+2025-12-29T14:44:35.1811010Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » rnworklets-generated.mm
+2025-12-29T14:44:35.1917780Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » rnsvgJSI-generated.cpp
+2025-12-29T14:44:35.2019540Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » rnscreensJSI-generated.cpp
+2025-12-29T14:44:35.2121150Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » rnscreens-generated.mm
+2025-12-29T14:44:35.2224160Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » rnreanimatedJSI-generated.cpp
+2025-12-29T14:44:35.2325840Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » rnreanimated-generated.mm
+2025-12-29T14:44:35.2430900Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » rngesturehandler_codegenJSI-generated.cpp
+2025-12-29T14:44:35.2434070Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » rngesturehandler_codegen-generated.mm
+2025-12-29T14:44:35.2539850Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » rnasyncstorageJSI-generated.cpp
+2025-12-29T14:44:35.2649510Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » rnasyncstorage-generated.mm
+2025-12-29T14:44:35.2759090Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » States.cpp
+2025-12-29T14:44:35.2861980Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » States.cpp
+2025-12-29T14:44:35.2971030Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » States.cpp
+2025-12-29T14:44:35.3076530Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » States.cpp
+2025-12-29T14:44:35.3183450Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » States.cpp
+2025-12-29T14:44:35.3285910Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » ShadowNodes.cpp
+2025-12-29T14:44:35.3363600Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » ShadowNodes.cpp
+2025-12-29T14:44:35.3468290Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » ShadowNodes.cpp
+2025-12-29T14:44:35.3577120Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » ShadowNodes.cpp
+2025-12-29T14:44:35.3700440Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » RNDateTimePickerCGenJSI-generated.cpp
+2025-12-29T14:44:35.3791260Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » RNDateTimePickerCGen-generated.mm
+2025-12-29T14:44:35.3893150Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » RCTUnstableModulesRequiringMainQueueSetupProvider.mm
+2025-12-29T14:44:35.3995130Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » RCTThirdPartyComponentsProvider.mm
+2025-12-29T14:44:35.4098040Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » RCTModuleProviders.mm
+2025-12-29T14:44:35.4201570Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » Props.cpp
+2025-12-29T14:44:35.4302120Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » Props.cpp
+2025-12-29T14:44:35.4410120Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » Props.cpp
+2025-12-29T14:44:35.4495220Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » Props.cpp
+2025-12-29T14:44:35.4600470Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » Props.cpp
+2025-12-29T14:44:35.4703240Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » EventEmitters.cpp
+2025-12-29T14:44:35.4802930Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » EventEmitters.cpp
+2025-12-29T14:44:35.4904710Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » EventEmitters.cpp
+2025-12-29T14:44:35.5011610Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » EventEmitters.cpp
+2025-12-29T14:44:35.5116620Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » EventEmitters.cpp
+2025-12-29T14:44:35.5118690Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » ComponentDescriptors.cpp
+2025-12-29T14:44:35.5223880Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » ComponentDescriptors.cpp
+2025-12-29T14:44:35.5328270Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » ComponentDescriptors.cpp
+2025-12-29T14:44:35.5432930Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » ComponentDescriptors.cpp
+2025-12-29T14:44:37.6179650Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactCodegen » ReactCodegen-dummy.m
+2025-12-29T14:44:37.6284100Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaViewState.cpp
+2025-12-29T14:44:37.7365740Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaViewShadowNode.cpp
+2025-12-29T14:44:40.6583700Z [RUN_FASTLANE] › Packaging dotchain Pods/ReactCodegen » libReactCodegen.a
+2025-12-29T14:44:40.6680840Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaViewComponentView.mm
+2025-12-29T14:44:45.8457090Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaProviderComponentView.mm
+2025-12-29T14:44:45.8501480Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaContext.mm
+2025-12-29T14:44:47.0472820Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » react-native-safe-area-context-dummy.m
+2025-12-29T14:44:47.8057590Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » WorkletsVersion.cpp
+2025-12-29T14:44:50.8982790Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » UIViewController+RNScreens.mm
+2025-12-29T14:44:56.1081210Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » UIWindow+RNScreens.mm
+2025-12-29T14:44:56.1426790Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactAppDependencyProvider » RCTAppDependencyProvider.mm
+2025-12-29T14:46:06.3399210Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » WorkletsModuleProxy.cpp
+2025-12-29T14:46:06.3517530Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » WorkletsModule.mm
+2025-12-29T14:46:06.3661630Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » WorkletsMessageThread.mm
+2025-12-29T14:46:06.3800280Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » WorkletsJSIUtils.cpp
+2025-12-29T14:46:06.3916010Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » WorkletRuntimeRegistry.cpp
+2025-12-29T14:46:06.4002080Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » WorkletRuntimeDecorator.cpp
+2025-12-29T14:46:06.4505720Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » WorkletRuntime.cpp
+2025-12-29T14:46:06.4607880Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » WorkletHermesRuntime.cpp
+2025-12-29T14:46:06.4684420Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » WorkletEventHandler.cpp
+2025-12-29T14:46:06.4686940Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » VersionUtils.cpp
+2025-12-29T14:46:06.4689060Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » ValueUnpacker.cpp
+2025-12-29T14:46:06.4698360Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » UIScheduler.cpp
+2025-12-29T14:46:06.4803800Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » SynchronizableUnpacker.cpp
+2025-12-29T14:46:06.4908110Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » SynchronizableAccess.cpp
+2025-12-29T14:46:06.5012600Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » Synchronizable.cpp
+2025-12-29T14:46:06.5139250Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » SlowAnimations.mm
+2025-12-29T14:46:06.5243860Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » RuntimeManager.cpp
+2025-12-29T14:46:06.5354360Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » RuntimeData.cpp
+2025-12-29T14:46:06.5491850Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » RNRuntimeWorkletDecorator.cpp
+2025-12-29T14:46:06.5596090Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » PlatformLogger.mm
+2025-12-29T14:46:06.5702490Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » JSLogger.cpp
+2025-12-29T14:46:06.5744790Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » JSIWorkletsModuleProxy.cpp
+2025-12-29T14:46:09.6985520Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » JSISerializer.cpp
+2025-12-29T14:46:09.7129980Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » IOSUIScheduler.mm
+2025-12-29T14:46:09.7233890Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » FeatureFlags.cpp
+2025-12-29T14:46:09.7340260Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » EventLoop.cpp
+2025-12-29T14:46:09.7440940Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » EventHandlerRegistry.cpp
+2025-12-29T14:46:11.9143380Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » AsyncQueueImpl.cpp
+2025-12-29T14:46:11.9246900Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » AnimationFrameQueue.mm
+2025-12-29T14:46:13.1694970Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » AnimationFrameBatchinator.cpp
+2025-12-29T14:46:13.6507260Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » UIView+RNSUtility.mm
+2025-12-29T14:46:19.1641920Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » UIScrollView+RNScreens.mm
+2025-12-29T14:46:19.1645920Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » UINavigationBar+RNSUtility.mm
+2025-12-29T14:46:19.1754560Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNScreensTurboModule.cpp
+2025-12-29T14:46:19.1863380Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSViewControllerInvalidator.mm
+2025-12-29T14:46:22.4523480Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSTabsScreenViewController.mm
+2025-12-29T14:46:26.5172650Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSTabBarControllerDelegate.mm
+2025-12-29T14:46:27.0989230Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSTabBarController.mm
+2025-12-29T14:46:30.8246760Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSTabBarAppearanceCoordinator.mm
+2025-12-29T14:46:35.7781800Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSSplitViewScreenShadowNode.cpp
+2025-12-29T14:46:35.7899660Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSSearchBar.mm
+2025-12-29T14:46:41.9861220Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScrollViewHelper.mm
+2025-12-29T14:46:41.9949620Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScrollViewFinder.mm
+2025-12-29T14:46:42.0057390Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenWindowTraits.mm
+2025-12-29T14:46:43.3025050Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenViewEvent.mm
+2025-12-29T14:46:43.3151420Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenState.cpp
+2025-12-29T14:46:43.3256820Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenStackHeaderSubviewState.cpp
+2025-12-29T14:46:45.7239490Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenStackHeaderSubviewShadowNode.cpp
+2025-12-29T14:46:48.1262630Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenStackHeaderSubview.mm
+2025-12-29T14:46:51.1471870Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenStackHeaderConfigState.cpp
+2025-12-29T14:46:51.1545960Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenStackHeaderConfigShadowNode.cpp
+2025-12-29T14:46:55.0624300Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenStackHeaderConfig.mm
+2025-12-29T14:47:07.5246070Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenStackAnimator.mm
+2025-12-29T14:47:07.5334630Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenStack.mm
+2025-12-29T14:47:18.1817110Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenShadowNode.cpp
+2025-12-29T14:47:18.1888930Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenRemovalListener.cpp
+2025-12-29T14:47:18.9559540Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenNavigationContainer.mm
+2025-12-29T14:47:26.2533400Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenFooter.mm
+2025-12-29T14:47:26.2643080Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenContentWrapper.mm
+2025-12-29T14:47:26.8412840Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreenContainer.mm
+2025-12-29T14:47:34.0851120Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSScreen.mm
+2025-12-29T14:47:35.4481820Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSReactBaseView.mm
+2025-12-29T14:47:35.4487250Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSPercentDrivenInteractiveTransition.mm
+2025-12-29T14:47:38.6580780Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSModule.mm
+2025-12-29T14:47:41.1351440Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSModalScreenShadowNode.cpp
+2025-12-29T14:47:41.1446110Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSModalScreen.mm
+2025-12-29T14:47:46.1004500Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSInvalidatedComponentsRegistry.mm
+2025-12-29T14:47:46.1006850Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSHeaderHeightChangeEvent.mm
+2025-12-29T14:47:46.1057860Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSGammaStubs.mm
+2025-12-29T14:47:46.1061270Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSFullWindowOverlayShadowNode.cpp
+2025-12-29T14:47:47.5370990Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSFullWindowOverlay.mm
+2025-12-29T14:47:51.3810520Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSConvert.mm
+2025-12-29T14:47:51.3915780Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSConversions.mm
+2025-12-29T14:47:53.8247230Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSConversions-SplitView.mm
+2025-12-29T14:47:57.1924100Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSConversions-Fabric.mm
+2025-12-29T14:47:57.2027710Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSConversions-BottomTabs.mm
+2025-12-29T14:48:01.4926150Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSBottomTabsState.cpp
+2025-12-29T14:48:01.7999650Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSBottomTabsShadowNode.cpp
+2025-12-29T14:48:03.8542730Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSBottomTabsScreenEventEmitter.mm
+2025-12-29T14:48:07.7404760Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSBottomTabsScreenComponentViewManager.mm
+2025-12-29T14:48:07.7408120Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSBottomTabsScreenComponentView.mm
+2025-12-29T14:48:11.9481000Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSBottomTabsHostEventEmitter.mm
+2025-12-29T14:48:11.9587150Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSBottomTabsHostComponentViewManager.mm
+2025-12-29T14:48:11.9669690Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSBottomTabsHostComponentView.mm
+2025-12-29T14:48:16.8810510Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSBottomTabsHostComponentView+RNSImageLoader.mm
+2025-12-29T14:48:16.8916670Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNSBackBarButtonItem.mm
+2025-12-29T14:48:16.9019230Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RCTTouchHandler+RNSUtility.mm
+2025-12-29T14:48:16.9124290Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RCTSurfaceTouchHandler+RNSUtility.mm
+2025-12-29T14:48:16.9226640Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RCTImageComponentView+RNSScreenStackHeaderConfig.mm
+2025-12-29T14:48:19.9814690Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RCTConvert+RNScreens.mm
+2025-12-29T14:48:19.9920060Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RCTConvert+RNSBottomTabs.mm
+2025-12-29T14:48:20.0020170Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » NSString+RNSUtility.mm
+2025-12-29T14:48:20.0124090Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGViewBox.mm
+2025-12-29T14:48:22.3267250Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGUseManager.mm
+2025-12-29T14:48:22.3928890Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGUse.mm
+2025-12-29T14:48:39.3580180Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGTopAlignedLabel.ios.mm
+2025-12-29T14:48:39.3686640Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGTextProperties.mm
+2025-12-29T14:48:39.3791350Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGTextPathManager.mm
+2025-12-29T14:48:39.5429630Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGTextPath.mm
+2025-12-29T14:48:45.6614040Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGTextManager.mm
+2025-12-29T14:48:48.3216080Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGText.mm
+2025-12-29T14:48:50.5845480Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGTSpanManager.mm
+2025-12-29T14:48:51.2667600Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGTSpan.mm
+2025-12-29T14:48:56.3328950Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGSymbolManager.mm
+2025-12-29T14:48:56.3434960Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGSymbol.mm
+2025-12-29T14:48:57.8198220Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGSvgViewModule.mm
+2025-12-29T14:49:01.7116750Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGSvgViewManager.mm
+2025-12-29T14:49:01.7209600Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGSvgView.mm
+2025-12-29T14:49:06.5145590Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGSolidColorBrush.mm
+2025-12-29T14:49:07.2670260Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGShadowNodes.cpp
+2025-12-29T14:49:07.2773360Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGRenderableModule.mm
+2025-12-29T14:49:11.2958820Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGRenderableManager.mm
+2025-12-29T14:49:11.3063430Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGRenderable.mm
+2025-12-29T14:49:11.6062700Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGRenderUtils.mm
+2025-12-29T14:49:14.6637960Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGRectManager.mm
+2025-12-29T14:49:14.6757520Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGRect.mm
+2025-12-29T14:49:16.2737980Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGRadialGradientManager.mm
+2025-12-29T14:49:18.0945140Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGRadialGradient.mm
+2025-12-29T14:49:19.6364190Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGPropHelper.mm
+2025-12-29T14:49:19.8806630Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGPatternManager.mm
+2025-12-29T14:49:21.6292650Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGPattern.mm
+2025-12-29T14:49:25.0258190Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGPathParser.mm
+2025-12-29T14:49:25.0369820Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGPathMeasure.mm
+2025-12-29T14:49:25.6207840Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGPathManager.mm
+2025-12-29T14:49:26.9820690Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGPath.mm
+2025-12-29T14:49:32.3782660Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGPainterBrush.mm
+2025-12-29T14:49:32.3892970Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGPainter.mm
+2025-12-29T14:49:32.3997790Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGNodeManager.mm
+2025-12-29T14:49:35.7426060Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGNode.mm
+2025-12-29T14:49:36.9298880Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGMaskManager.mm
+2025-12-29T14:49:37.7447010Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGMask.mm
+2025-12-29T14:49:42.1232680Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGMarkerPosition.mm
+2025-12-29T14:49:42.1380410Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGMarkerManager.mm
+2025-12-29T14:49:42.1484370Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGMarker.mm
+2025-12-29T14:49:47.1424730Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGLinearGradientManager.mm
+2025-12-29T14:49:47.1543270Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGLinearGradient.mm
+2025-12-29T14:49:49.6091930Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGLineManager.mm
+2025-12-29T14:49:50.5800800Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGLine.mm
+2025-12-29T14:50:03.1445680Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGLength.mm
+2025-12-29T14:50:03.1550910Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGLayoutableShadowNode.cpp
+2025-12-29T14:50:03.1653040Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGImageState.cpp
+2025-12-29T14:50:05.3437300Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGImageShadowNode.cpp
+2025-12-29T14:50:06.8177120Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGImageManager.mm
+2025-12-29T14:50:08.5296910Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGImage.mm
+2025-12-29T14:50:11.4336360Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGGroupManager.mm
+2025-12-29T14:50:11.4340170Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGGroup.mm
+2025-12-29T14:50:13.8339990Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGGlyphContext.mm
+2025-12-29T14:50:14.8143590Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGForeignObjectManager.mm
+2025-12-29T14:50:14.8277070Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGForeignObject.mm
+2025-12-29T14:50:20.4766130Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFontData.mm
+2025-12-29T14:50:20.4872500Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFilterRegion.mm
+2025-12-29T14:50:20.4975800Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFilterPrimitiveManager.mm
+2025-12-29T14:50:23.4207930Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFilterPrimitive.mm
+2025-12-29T14:50:25.1191450Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFilterManager.mm
+2025-12-29T14:50:26.3817860Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFilter.mm
+2025-12-29T14:50:31.7431430Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeOffsetManager.mm
+2025-12-29T14:50:31.7560060Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeOffset.mm
+2025-12-29T14:50:34.4059430Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeMergeManager.mm
+2025-12-29T14:50:35.5880000Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeMerge.mm
+2025-12-29T14:50:37.7286600Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeGaussianBlurManager.mm
+2025-12-29T14:50:38.3539010Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeGaussianBlur.mm
+2025-12-29T14:50:41.0674070Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeFloodManager.mm
+2025-12-29T14:50:42.0815790Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeFlood.mm
+2025-12-29T14:50:43.5060530Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeCompositeManager.mm
+2025-12-29T14:50:44.4885730Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeComposite.mm
+2025-12-29T14:50:48.8627350Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeColorMatrixManager.mm
+2025-12-29T14:50:49.2778190Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeColorMatrix.mm
+2025-12-29T14:50:54.0519650Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeBlendManager.mm
+2025-12-29T14:50:55.3677330Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGFeBlend.mm
+2025-12-29T14:50:58.7908570Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGEllipseManager.mm
+2025-12-29T14:51:01.2338190Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGEllipse.mm
+2025-12-29T14:51:09.8823520Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGDefsManager.mm
+2025-12-29T14:51:10.0390310Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGDefs.mm
+2025-12-29T14:51:15.7333000Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGCustomFilter.mm
+2025-12-29T14:51:15.7437540Z [RUN_FASTLANE] › Compiling react-native-svg RNSVGConvert.mm
+2025-12-29T14:51:16.7174390Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGContextBrush.mm
+2025-12-29T14:51:18.3600280Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGCompositeXor.mm
+2025-12-29T14:51:18.3704480Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGClipPathManager.mm
+2025-12-29T14:51:25.3440540Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGClipPath.mm
+2025-12-29T14:51:28.0580050Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGCircleManager.mm
+2025-12-29T14:51:33.5023590Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGBrush.mm
+2025-12-29T14:51:33.5128070Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGBezierElement.mm
+2025-12-29T14:51:33.5230290Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVGArithmeticFilter.mm
+2025-12-29T14:51:33.5332090Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RCTConvert+RNSVG.mm
+2025-12-29T14:51:37.6413190Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNNativeViewHandler.mm
+2025-12-29T14:51:37.9187960Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGestureHandlerRootViewComponentView.mm
+2025-12-29T14:51:37.9290190Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGestureHandlerModule.mm
+2025-12-29T14:51:43.7113990Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGestureHandlerManager.mm
+2025-12-29T14:51:43.7268370Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGestureHandlerButtonManager.mm
+2025-12-29T14:51:43.7379620Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGestureHandlerButtonComponentView.mm
+2025-12-29T14:51:45.3909490Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGestureHandlerButton.mm
+2025-12-29T14:51:50.3496200Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGestureHandler.mm
+2025-12-29T14:51:51.5785510Z [RUN_FASTLANE] › Compiling @react-native-community/datetimepicker Pods/RNDateTimePicker » ShadowNodes.cpp
+2025-12-29T14:51:52.0361670Z [RUN_FASTLANE] › Compiling @react-native-community/datetimepicker Pods/RNDateTimePicker » RNDateTimePickerState.cpp
+2025-12-29T14:51:53.0133500Z [RUN_FASTLANE] › Compiling @react-native-community/datetimepicker Pods/RNDateTimePicker » RNDateTimePickerComponentView.mm
+2025-12-29T14:52:06.0362270Z [RUN_FASTLANE] › Compiling @react-native-async-storage/async-storage Pods/RNCAsyncStorage » RNCAsyncStorage.mm
+2025-12-29T14:52:06.0831380Z [RUN_FASTLANE] › Compiling react-native-purchases Pods/RevenueCat » RevenueCat-dummy.m
+2025-12-29T14:52:06.0934960Z [RUN_FASTLANE] › Packaging react-native-purchases Pods/RevenueCat » libRevenueCat.a
+2025-12-29T14:52:06.1054870Z [RUN_FASTLANE] › Compiling dotchain Pods/ReactAppDependencyProvider » ReactAppDependencyProvider-dummy.m
+2025-12-29T14:52:06.1261160Z [RUN_FASTLANE] › Compiling react-native-screens Pods/RNScreens » RNScreens-dummy.m
+2025-12-29T14:52:09.0951280Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaViewMode.m
+2025-12-29T14:52:09.1042300Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaViewManager.m
+2025-12-29T14:52:09.1146050Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaViewLocalData.m
+2025-12-29T14:52:09.1271510Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaViewEdges.m
+2025-12-29T14:52:09.1372480Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaViewEdgeMode.m
+2025-12-29T14:52:09.1480650Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaView.m
+2025-12-29T14:52:09.1592540Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaUtils.m
+2025-12-29T14:52:09.1743050Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaShadowView.m
+2025-12-29T14:52:09.4275380Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaProviderManager.m
+2025-12-29T14:52:09.4381380Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCSafeAreaProvider.m
+2025-12-29T14:52:09.5673300Z [RUN_FASTLANE] › Compiling react-native-safe-area-context Pods/react-native-safe-area-context » RNCOnInsetsChangeEvent.m
+2025-12-29T14:52:12.5423650Z [RUN_FASTLANE] › Compiling react-native-svg Pods/RNSVG » RNSVG-dummy.m
+2025-12-29T14:52:12.5526750Z [RUN_FASTLANE] › Compiling react-native-worklets Pods/RNWorklets » RNWorklets-dummy.m
+2025-12-29T14:52:14.2911020Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGestureHandler-dummy.m
+2025-12-29T14:52:14.3023140Z [RUN_FASTLANE] › Compiling @react-native-community/datetimepicker Pods/RNDateTimePicker » RNDateTimePickerShadowView.m
+2025-12-29T14:52:14.5471570Z [RUN_FASTLANE] › Compiling @react-native-community/datetimepicker Pods/RNDateTimePicker » RNDateTimePickerManager.m
+2025-12-29T14:52:14.6080390Z [RUN_FASTLANE] › Compiling @react-native-community/datetimepicker Pods/RNDateTimePicker » RNDateTimePicker.m
+2025-12-29T14:52:16.0779290Z [RUN_FASTLANE] › Compiling @react-native-community/datetimepicker Pods/RNDateTimePicker » RNDateTimePicker-dummy.m
+2025-12-29T14:52:16.0888440Z [RUN_FASTLANE] › Compiling @react-native-async-storage/async-storage Pods/RNCAsyncStorage » RNCAsyncStorage-dummy.m
+2025-12-29T14:52:16.1017970Z [RUN_FASTLANE] › Executing react-native-purchases Pods/RevenueCat » Copy generated compatibility header
+2025-12-29T14:52:16.1253320Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » TypedArray.cpp
+2025-12-29T14:52:17.5596090Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » SwiftUIVirtualViewObjC.mm
+2025-12-29T14:52:22.8580030Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » SharedRef.cpp
+2025-12-29T14:52:22.8586870Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » SharedObject.cpp
+2025-12-29T14:52:22.8689660Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » ObjectDeallocator.cpp
+2025-12-29T14:52:22.8791600Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » NativeModule.cpp
+2025-12-29T14:52:22.8894570Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » MainThreadInvoker.mm
+2025-12-29T14:52:22.8997060Z [RUN_FASTLANE] › Compiling expo-modules-core LazyObject.cpp
+2025-12-29T14:52:22.9099340Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » JSIUtils.cpp
+2025-12-29T14:52:25.5038960Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » ExpoViewShadowNode.cpp
+2025-12-29T14:52:31.4336650Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » ExpoViewProps.cpp
+2025-12-29T14:52:32.8886870Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » ExpoViewEventEmitter.cpp
+2025-12-29T14:52:33.3210590Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » ExpoViewComponentDescriptor.cpp
+2025-12-29T14:52:41.6383650Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » ExpoModulesHostObject.mm
+2025-12-29T14:52:43.5978120Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » ExpoFabricViewObjC.mm
+2025-12-29T14:52:43.6014010Z [RUN_FASTLANE] 
+2025-12-29T14:52:43.6116570Z ⚠️  (../../../../../../../../ios/Legacy/NativeModulesProxy/EXNativeModulesProxy.h:13:4)
+2025-12-29T14:52:43.6217960Z 
+2025-12-29T14:52:43.6320800Z - (instancetype)initWithConstants:(nonnull NSDictionary *)constants
+2025-12-29T14:52:43.6425530Z    ^ pointer is missing a nullability type specifier [-Wnullability-completeness]
+2025-12-29T14:52:43.6523500Z 
+2025-12-29T14:52:44.1946270Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » ExpoBridgeModule.mm
+2025-12-29T14:52:48.7741740Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EventEmitter.cpp
+2025-12-29T14:52:48.7746330Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXStringUtils.cpp
+2025-12-29T14:52:48.7848850Z [RUN_FASTLANE] › Compiling expo-modules-core EXSharedObjectUtils.mm
+2025-12-29T14:52:48.7958120Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXReactNativeAdapter.mm
+2025-12-29T14:52:52.1592560Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXReactDelegateWrapper.mm
+2025-12-29T14:52:54.6822060Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXRawJavaScriptFunction.mm
+2025-12-29T14:52:54.6928630Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXNativeModulesProxy.mm
+2025-12-29T14:52:59.2512330Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXJavaScriptWeakObject.mm
+2025-12-29T14:52:59.2624340Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXJavaScriptValue.mm
+2025-12-29T14:52:59.2633970Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXJavaScriptTypedArray.mm
+2025-12-29T14:52:59.2635210Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXJavaScriptSharedObjectBinding.mm
+2025-12-29T14:53:00.4364720Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXJavaScriptRuntime.mm
+2025-12-29T14:53:05.7566460Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXJavaScriptObject.mm
+2025-12-29T14:53:05.7657240Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXJSIUtils.mm
+2025-12-29T14:53:05.7772840Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXJSIInstaller.mm
+2025-12-29T14:53:09.2951810Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXJSIConversions.mm
+2025-12-29T14:53:09.3173430Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNTapHandler.m
+2025-12-29T14:53:09.3285780Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNRotationHandler.m
+2025-12-29T14:53:09.3388020Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNRootViewGestureRecognizer.m
+2025-12-29T14:53:09.3493290Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNPinchHandler.m
+2025-12-29T14:53:09.3578990Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNPanHandler.m
+2025-12-29T14:53:09.3624040Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNManualHandler.m
+2025-12-29T14:53:09.3750340Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNManualActivationRecognizer.m
+2025-12-29T14:53:09.3861200Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNLongPressHandler.m
+2025-12-29T14:53:09.4605140Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNHoverHandler.m
+2025-12-29T14:53:09.5245350Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGestureHandlerRegistry.m
+2025-12-29T14:53:09.5349750Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGestureHandlerPointerTracker.m
+2025-12-29T14:53:09.5893100Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGestureHandlerEvents.m
+2025-12-29T14:53:09.6196260Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGHVector.m
+2025-12-29T14:53:09.6313870Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNGHStylusData.m
+2025-12-29T14:53:09.6416210Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNForceTouchHandler.m
+2025-12-29T14:53:09.7637960Z [RUN_FASTLANE] › Compiling react-native-gesture-handler Pods/RNGestureHandler » RNFlingHandler.m
+2025-12-29T14:53:12.2169160Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » vectors.cpp
+2025-12-29T14:53:13.0695910Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » steps.cpp
+2025-12-29T14:53:13.5893580Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » props.cpp
+2025-12-29T14:53:16.0497780Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » matrix.cpp
+2025-12-29T14:53:16.4149460Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » linear.cpp
+2025-12-29T14:53:16.4297680Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » keyframes.cpp
+2025-12-29T14:53:16.4402060Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » interpolators.cpp
+2025-12-29T14:53:18.8965740Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » cubicBezier.cpp
+2025-12-29T14:53:18.9068670Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » common.cpp
+2025-12-29T14:53:18.9173950Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » algorithms.cpp
+2025-12-29T14:53:18.9286320Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ViewStylesRepository.cpp
+2025-12-29T14:53:20.4197080Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ValueInterpolator.cpp
+2025-12-29T14:53:21.4181930Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » UpdatesRegistryManager.cpp
+2025-12-29T14:53:23.1288310Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » UpdatesRegistry.cpp
+2025-12-29T14:53:24.9529630Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » UIRuntimeDecorator.cpp
+2025-12-29T14:53:25.3049180Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » TransitionStyleInterpolator.cpp
+2025-12-29T14:53:28.0521310Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » TransitionProgressProvider.cpp
+2025-12-29T14:53:30.3807080Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » TransformsStyleInterpolator.cpp
+2025-12-29T14:53:31.2934580Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » TransformOperationInterpolator.cpp
+2025-12-29T14:53:33.2753930Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » TransformOperation.cpp
+2025-12-29T14:53:35.9536560Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » TransformOp.cpp
+2025-12-29T14:53:35.9640630Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » TransformMatrix3D.cpp
+2025-12-29T14:53:36.1570910Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » TransformMatrix2D.cpp
+2025-12-29T14:53:36.1572080Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » StaticPropsRegistry.cpp
+2025-12-29T14:53:37.7725370Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » SimpleValueInterpolator.cpp
+2025-12-29T14:53:39.7909380Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ShadowTreeCloner.cpp
+2025-12-29T14:53:39.8013520Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » SetGestureState.mm
+2025-12-29T14:53:39.8115820Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » SVGStrokeDashArray.cpp
+2025-12-29T14:53:42.4705710Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » SVGLength.cpp
+2025-12-29T14:53:42.4707890Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ResolvableValueInterpolator.cpp
+2025-12-29T14:53:43.5018020Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » RecordPropertiesInterpolator.cpp
+2025-12-29T14:53:53.2138020Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ReanimatedVersion.cpp
+2025-12-29T14:53:53.2244580Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ReanimatedMountHook.cpp
+2025-12-29T14:53:54.0071700Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ReanimatedModuleProxySpec.cpp
+2025-12-29T14:53:54.0194280Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ReanimatedModuleProxy.cpp
+2025-12-29T14:54:12.6576930Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ReanimatedModule.mm
+2025-12-29T14:54:12.6809210Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ReanimatedCommitHook.cpp
+2025-12-29T14:54:12.6913860Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » RawProgressProvider.cpp
+2025-12-29T14:54:12.7014950Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » RNRuntimeDecorator.cpp
+2025-12-29T14:54:13.5440960Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » REASlowAnimations.mm
+2025-12-29T14:54:13.5589100Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » REANodesManager.mm
+2025-12-29T14:54:13.5692600Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » REAKeyboardEventObserver.mm
+2025-12-29T14:54:13.5763850Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » Quaternion.cpp
+2025-12-29T14:54:13.5779390Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » PropertyInterpolator.cpp
+2025-12-29T14:54:16.9175350Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » PropValueProcessor.cpp
+2025-12-29T14:54:17.0374330Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » PlatformDepMethodsHolderImpl.mm
+2025-12-29T14:54:17.8177640Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » NativeProxy.mm
+2025-12-29T14:54:25.0568190Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » LayoutAnimationsProxy.cpp
+2025-12-29T14:54:28.4041190Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » LayoutAnimationsManager.cpp
+2025-12-29T14:54:28.4129560Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » InterpolatorRegistry.cpp
+2025-12-29T14:54:37.6678330Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » InterpolatorFactory.cpp
+2025-12-29T14:54:37.6791740Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » GroupPropertiesInterpolator.cpp
+2025-12-29T14:54:37.6903430Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » FeatureFlags.cpp
+2025-12-29T14:54:37.7005920Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » EasingFunctions.cpp
+2025-12-29T14:54:37.7108410Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » DelayedItemsManager.cpp
+2025-12-29T14:54:40.1726750Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSValueVariant.cpp
+2025-12-29T14:54:42.8142390Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSTransitionsRegistry.cpp
+2025-12-29T14:54:42.8245770Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSTransitionConfig.cpp
+2025-12-29T14:54:42.8350060Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSTransition.cpp
+2025-12-29T14:54:47.2359330Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSNumber.cpp
+2025-12-29T14:54:47.2362840Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSLength.cpp
+2025-12-29T14:54:47.2477380Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSKeyword.cpp
+2025-12-29T14:54:52.2085340Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSKeyframesRegistry.cpp
+2025-12-29T14:54:53.1356850Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSKeyframesConfig.cpp
+2025-12-29T14:54:53.6672510Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSDiscreteArray.cpp
+2025-12-29T14:54:58.0682010Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSColor.cpp
+2025-12-29T14:54:58.3839510Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSBoolean.cpp
+2025-12-29T14:54:58.8203070Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSAnimationsRegistry.cpp
+2025-12-29T14:55:09.8816860Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSAnimationConfig.cpp
+2025-12-29T14:55:09.8823900Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSAnimation.cpp
+2025-12-29T14:55:09.8931300Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » CSSAngle.cpp
+2025-12-29T14:55:25.7962050Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ArrayPropertiesInterpolator.cpp
+2025-12-29T14:55:25.7970310Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » AnimationProgressProvider.cpp
+2025-12-29T14:55:25.7972110Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » AnimatedSensorModule.cpp
+2025-12-29T14:55:29.6736730Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » AnimatedPropsRegistry.cpp
+2025-12-29T14:55:31.5932700Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » RCTComponentData+Privates.m
+2025-12-29T14:55:31.6045820Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » ExpoModulesCore-dummy.m
+2025-12-29T14:55:31.6160400Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXUtilities.m
+2025-12-29T14:55:31.6290550Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXReactNativeUserNotificationCenterProxy.m
+2025-12-29T14:55:31.6399860Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXReactLogHandler.m
+2025-12-29T14:55:31.6509520Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXPermissionsService.m
+2025-12-29T14:55:31.6614120Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXPermissionsMethodsDelegate.m
+2025-12-29T14:55:31.6718440Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXModuleRegistryAdapter.m
+2025-12-29T14:55:31.6822080Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXLogManager.m
+2025-12-29T14:55:31.6925520Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXExportedModule.m
+2025-12-29T14:55:31.7032050Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXAppDefines.m
+2025-12-29T14:55:31.7130500Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » CoreModuleHelper.m
+2025-12-29T14:55:34.5898700Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXReactNativeEventEmitter.m
+2025-12-29T14:55:34.6202950Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXModuleRegistryProvider.m
+2025-12-29T14:55:34.6304920Z [RUN_FASTLANE] › Compiling expo-modules-core Pods/ExpoModulesCore » EXModuleRegistry.m
+2025-12-29T14:55:43.0432000Z [RUN_FASTLANE] › Packaging react-native-safe-area-context Pods/react-native-safe-area-context » libreact-native-safe-area-context.a
+2025-12-29T14:55:43.0558990Z [RUN_FASTLANE] › Packaging dotchain Pods/ReactAppDependencyProvider » libReactAppDependencyProvider.a
+2025-12-29T14:55:43.0662000Z [RUN_FASTLANE] › Packaging react-native-worklets Pods/RNWorklets » libRNWorklets.a
+2025-12-29T14:55:43.0777050Z [RUN_FASTLANE] › Packaging react-native-screens Pods/RNScreens » libRNScreens.a
+2025-12-29T14:55:43.0878840Z [RUN_FASTLANE] › Packaging react-native-svg Pods/RNSVG » libRNSVG.a
+2025-12-29T14:55:43.0983050Z [RUN_FASTLANE] › Packaging react-native-gesture-handler Pods/RNGestureHandler » libRNGestureHandler.a
+2025-12-29T14:55:43.1085970Z [RUN_FASTLANE] › Packaging @react-native-community/datetimepicker Pods/RNDateTimePicker » libRNDateTimePicker.a
+2025-12-29T14:55:43.1187900Z [RUN_FASTLANE] › Packaging @react-native-async-storage/async-storage Pods/RNCAsyncStorage » libRNCAsyncStorage.a
+2025-12-29T14:55:43.1293180Z [RUN_FASTLANE] › Packaging expo-modules-core Pods/ExpoModulesCore » libExpoModulesCore.a
+2025-12-29T14:55:43.1396100Z [RUN_FASTLANE] › Executing expo-modules-core Pods/ExpoModulesCore » Copy generated compatibility header
+2025-12-29T14:55:43.1498220Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ReanimatedSensorContainer.m
+2025-12-29T14:55:43.1597400Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » ReanimatedSensor.m
+2025-12-29T14:55:43.1599250Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » RCTUIView+Reanimated.m
+2025-12-29T14:56:18.9102990Z [RUN_FASTLANE] › Compiling react-native-reanimated Pods/RNReanimated » RNReanimated-dummy.m
+2025-12-29T14:56:19.3978390Z [RUN_FASTLANE] › Compiling expo-router Pods/ExpoHead » LinkPreviewNativeNavigation.mm
+2025-12-29T14:56:19.4038230Z [RUN_FASTLANE] › Compiling expo Pods/Expo » EXReactRootViewFactory.mm
+2025-12-29T14:56:37.1211930Z [RUN_FASTLANE] › Compiling react-native-purchases Pods/PurchasesHybridCommon » PurchasesHybridCommon-dummy.m
+2025-12-29T14:56:37.1436710Z [RUN_FASTLANE] › Compiling expo-web-browser Pods/ExpoWebBrowser » ExpoWebBrowser-dummy.m
+2025-12-29T14:56:37.1542610Z [RUN_FASTLANE] › Packaging react-native-purchases Pods/PurchasesHybridCommon » libPurchasesHybridCommon.a
+2025-12-29T14:56:37.1798360Z [RUN_FASTLANE] › Compiling expo-system-ui Pods/ExpoSystemUI » ExpoSystemUI-dummy.m
+2025-12-29T14:56:37.1911480Z [RUN_FASTLANE] › Compiling expo-symbols Pods/ExpoSymbols » ExpoSymbols-dummy.m
+2025-12-29T14:56:37.2013600Z [RUN_FASTLANE] › Compiling expo-store-review Pods/ExpoStoreReview » ExpoStoreReview-dummy.m
+2025-12-29T14:56:37.2141080Z [RUN_FASTLANE] › Compiling expo-splash-screen Pods/ExpoSplashScreen » ExpoSplashScreen-dummy.m
+2025-12-29T14:56:37.2298920Z [RUN_FASTLANE] › Compiling expo-secure-store Pods/ExpoSecureStore » ExpoSecureStore-dummy.m
+2025-12-29T14:56:37.2574220Z [RUN_FASTLANE] › Compiling expo-localization Pods/ExpoLocalization » ExpoLocalization-dummy.m
+2025-12-29T14:56:37.2589060Z [RUN_FASTLANE] › Compiling expo-sqlite Pods/ExpoSQLite » sqlite3.c
+2025-12-29T14:56:38.6722440Z [RUN_FASTLANE] 
+2025-12-29T14:56:38.6833280Z ⚠️  (../../../../../../../../ios/sqlite3.c:244053:18)
+2025-12-29T14:56:38.6934320Z 
+2025-12-29T14:56:38.7060520Z       int nMin = MIN(p1->nKey, p2->nKey);
+2025-12-29T14:56:38.7165580Z                  ^ ambiguous expansion of macro 'MIN' [-Wambiguous-macro]
+2025-12-29T14:56:38.7267000Z 
+2025-12-29T14:57:16.2684340Z [RUN_FASTLANE] › Compiling expo-linking Pods/ExpoLinking » ExpoLinking-dummy.m
+2025-12-29T14:57:16.2787680Z [RUN_FASTLANE] › Compiling expo-linear-gradient Pods/ExpoLinearGradient » ExpoLinearGradient-dummy.m
+2025-12-29T14:57:16.2892220Z [RUN_FASTLANE] › Compiling expo-keep-awake Pods/ExpoKeepAwake » ExpoKeepAwake-dummy.m
+2025-12-29T14:57:16.2996030Z [RUN_FASTLANE] › Compiling expo-image Pods/ExpoImage » ExpoImage-dummy.m
+2025-12-29T14:57:16.3121130Z [RUN_FASTLANE] › Compiling expo-router Pods/ExpoHead » ExpoHead-dummy.m
+2025-12-29T14:57:16.3224600Z [RUN_FASTLANE] › Compiling expo-haptics Pods/ExpoHaptics » ExpoHaptics-dummy.m
+2025-12-29T14:57:16.3328370Z [RUN_FASTLANE] › Compiling expo-font Pods/ExpoFont » ExpoFont-dummy.m
+2025-12-29T14:57:16.3431500Z [RUN_FASTLANE] › Compiling expo-file-system Pods/ExpoFileSystem » NSData+EXFileSystem.m
+2025-12-29T14:57:16.3543000Z [RUN_FASTLANE] › Compiling expo-file-system Pods/ExpoFileSystem » EXTaskHandlersManager.m
+2025-12-29T14:57:16.3646020Z [RUN_FASTLANE] › Compiling expo-file-system Pods/ExpoFileSystem » EXSessionUploadTaskDelegate.m
+2025-12-29T14:57:16.4722730Z [RUN_FASTLANE] › Compiling expo-file-system Pods/ExpoFileSystem » EXSessionTaskDelegate.m
+2025-12-29T14:57:16.5438400Z [RUN_FASTLANE] › Compiling expo-file-system Pods/ExpoFileSystem » EXSessionResumableDownloadTaskDelegate.m
+2025-12-29T14:57:16.6265830Z [RUN_FASTLANE] › Compiling expo-file-system Pods/ExpoFileSystem » EXSessionHandler.m
+2025-12-29T14:57:16.7031800Z [RUN_FASTLANE] › Compiling expo-file-system Pods/ExpoFileSystem » EXSessionCancelableUploadTaskDelegate.m
+2025-12-29T14:57:16.7472060Z [RUN_FASTLANE] › Compiling expo-sqlite Pods/ExpoSQLite » ExpoSQLite-dummy.m
+2025-12-29T14:57:16.7578420Z [RUN_FASTLANE] › Compiling expo-crypto Pods/ExpoCrypto » ExpoCrypto-dummy.m
+2025-12-29T14:57:16.7709630Z [RUN_FASTLANE] › Compiling expo-asset Pods/ExpoAsset » ExpoAsset-dummy.m
+2025-12-29T14:57:16.7846840Z [RUN_FASTLANE] › Compiling expo Pods/Expo » Expo-dummy.m
+2025-12-29T14:57:16.7993880Z [RUN_FASTLANE] › Compiling expo-file-system Pods/ExpoFileSystem » EXFileSystemLocalFileHandler.m
+2025-12-29T14:57:16.8313340Z [RUN_FASTLANE] › Compiling expo-file-system Pods/ExpoFileSystem » EXFileSystemAssetLibraryHandler.m
+2025-12-29T14:57:16.8906270Z [RUN_FASTLANE] › Compiling expo-updates-interface Pods/EXUpdatesInterface » noop-file.m
+2025-12-29T14:57:16.9014080Z [RUN_FASTLANE] › Compiling expo-updates-interface Pods/EXUpdatesInterface » EXUpdatesInterface-dummy.m
+2025-12-29T14:57:16.9118430Z [RUN_FASTLANE] › Compiling expo-manifests Pods/EXManifests » EXManifests-dummy.m
+2025-12-29T14:57:16.9222170Z [RUN_FASTLANE] › Compiling expo-application Pods/EXApplication » EXProvisioningProfile.m
+2025-12-29T14:57:16.9326790Z [RUN_FASTLANE] › Executing react-native-purchases Pods/PurchasesHybridCommon » Copy generated compatibility header
+2025-12-29T14:57:16.9660930Z [RUN_FASTLANE] › Compiling expo-application Pods/EXApplication » EXApplication-dummy.m
+2025-12-29T14:57:16.9763260Z [RUN_FASTLANE] › Compiling expo-av Pods/EXAV » EXAudioSampleCallback.mm
+2025-12-29T14:57:16.9865350Z [RUN_FASTLANE] › Compiling expo-av Pods/EXAV » CallbackWrapper.mm
+2025-12-29T14:57:16.9966850Z [RUN_FASTLANE] › Compiling expo-av Pods/EXAV » AudioSampleCallbackWrapper.mm
+2025-12-29T14:57:17.0070810Z [RUN_FASTLANE] › Compiling expo Pods/Expo » EXLegacyAppDelegateWrapper.m
+2025-12-29T14:57:17.0176240Z [RUN_FASTLANE] › Packaging react-native-reanimated Pods/RNReanimated » libRNReanimated.a
+2025-12-29T14:57:17.0279070Z [RUN_FASTLANE] › Compiling expo-notifications Pods/EXNotifications » EXUserFacingNotificationsPermissionsRequester.m
+2025-12-29T14:57:17.0379300Z [RUN_FASTLANE] › Compiling expo-notifications Pods/EXNotifications » EXNotificationSerializer.m
+2025-12-29T14:57:17.0502870Z [RUN_FASTLANE] › Compiling expo Pods/Expo » EXAppDelegatesLoader.m
+2025-12-29T14:57:17.0605560Z [RUN_FASTLANE] › Compiling expo Pods/Expo » EXAppDefinesLoader.m
+2025-12-29T14:57:17.2679530Z [RUN_FASTLANE] › Compiling expo-av Pods/EXAV » EXVideoPlayerViewController.m
+2025-12-29T14:57:17.2781490Z [RUN_FASTLANE] › Compiling expo-av Pods/EXAV » EXAudioSessionManager.m
+2025-12-29T14:57:17.2885540Z [RUN_FASTLANE] › Compiling expo-av Pods/EXAV » EXAudioRecordingPermissionRequester.m
+2025-12-29T14:57:17.3089500Z [RUN_FASTLANE] › Compiling expo-av Pods/EXAV » EXAVPlayerData.m
+2025-12-29T14:57:17.3289800Z [RUN_FASTLANE] › Compiling expo-av Pods/EXAV » EXAV-dummy.m
+2025-12-29T14:57:17.3705940Z [RUN_FASTLANE] › Compiling expo-av Pods/EXAV » EXAV.m
+2025-12-29T14:57:17.5155600Z [RUN_FASTLANE] › Packaging expo-web-browser Pods/ExpoWebBrowser » libExpoWebBrowser.a
+2025-12-29T14:57:17.5255640Z [RUN_FASTLANE] › Packaging expo-system-ui Pods/ExpoSystemUI » libExpoSystemUI.a
+2025-12-29T14:57:17.5358850Z [RUN_FASTLANE] › Packaging expo-symbols Pods/ExpoSymbols » libExpoSymbols.a
+2025-12-29T14:57:17.5458770Z [RUN_FASTLANE] › Packaging expo-store-review Pods/ExpoStoreReview » libExpoStoreReview.a
+2025-12-29T14:57:17.5570070Z [RUN_FASTLANE] › Packaging expo-splash-screen Pods/ExpoSplashScreen » libExpoSplashScreen.a
+2025-12-29T14:57:17.5661870Z [RUN_FASTLANE] › Executing expo-web-browser Pods/ExpoWebBrowser » Copy generated compatibility header
+2025-12-29T14:57:17.5679910Z [RUN_FASTLANE] › Executing expo-system-ui Pods/ExpoSystemUI » Copy generated compatibility header
+2025-12-29T14:57:17.5897820Z [RUN_FASTLANE] › Executing expo-symbols Pods/ExpoSymbols » Copy generated compatibility header
+2025-12-29T14:57:17.6328660Z [RUN_FASTLANE] › Packaging expo-secure-store Pods/ExpoSecureStore » libExpoSecureStore.a
+2025-12-29T14:57:17.6431130Z [RUN_FASTLANE] › Packaging expo-localization Pods/ExpoLocalization » libExpoLocalization.a
+2025-12-29T14:57:17.6537290Z [RUN_FASTLANE] › Packaging expo-linking Pods/ExpoLinking » libExpoLinking.a
+2025-12-29T14:57:17.6661980Z [RUN_FASTLANE] › Packaging expo-linear-gradient Pods/ExpoLinearGradient » libExpoLinearGradient.a
+2025-12-29T14:57:17.6764310Z [RUN_FASTLANE] › Packaging expo-keep-awake Pods/ExpoKeepAwake » libExpoKeepAwake.a
+2025-12-29T14:57:17.6868310Z [RUN_FASTLANE] › Packaging expo-image Pods/ExpoImage » libExpoImage.a
+2025-12-29T14:57:17.6970540Z [RUN_FASTLANE] › Packaging expo-router Pods/ExpoHead » libExpoHead.a
+2025-12-29T14:57:17.7073230Z [RUN_FASTLANE] › Packaging expo-haptics Pods/ExpoHaptics » libExpoHaptics.a
+2025-12-29T14:57:17.7175140Z [RUN_FASTLANE] › Packaging expo-font Pods/ExpoFont » libExpoFont.a
+2025-12-29T14:57:17.7276780Z [RUN_FASTLANE] › Packaging expo-file-system Pods/ExpoFileSystem » libExpoFileSystem.a
+2025-12-29T14:57:17.7381760Z [RUN_FASTLANE] › Packaging expo-crypto Pods/ExpoCrypto » libExpoCrypto.a
+2025-12-29T14:57:17.7486710Z [RUN_FASTLANE] › Packaging expo-asset Pods/ExpoAsset » libExpoAsset.a
+2025-12-29T14:57:17.7549210Z [RUN_FASTLANE] › Packaging expo Pods/Expo » libExpo.a
+2025-12-29T14:57:17.7550080Z [RUN_FASTLANE] › Packaging expo-updates-interface Pods/EXUpdatesInterface » libEXUpdatesInterface.a
+2025-12-29T14:57:17.7551140Z [RUN_FASTLANE] › Packaging expo-notifications Pods/EXNotifications » libEXNotifications.a
+2025-12-29T14:57:17.7551860Z [RUN_FASTLANE] › Packaging expo-manifests Pods/EXManifests » libEXManifests.a
+2025-12-29T14:57:17.7560660Z [RUN_FASTLANE] › Executing expo-constants Pods/EXConstants » [CP-User] Generate app.config for prebuilt Constants.manifest
+2025-12-29T14:57:17.7562010Z [RUN_FASTLANE] › Packaging expo-application Pods/EXApplication » libEXApplication.a
+2025-12-29T14:57:17.7563120Z [RUN_FASTLANE] › Packaging expo-av Pods/EXAV » libEXAV.a
+2025-12-29T14:57:17.8266310Z [RUN_FASTLANE] › Executing expo-store-review Pods/ExpoStoreReview » Copy generated compatibility header
+2025-12-29T14:57:17.9514680Z [RUN_FASTLANE] › Executing expo-splash-screen Pods/ExpoSplashScreen » Copy generated compatibility header
+2025-12-29T14:57:17.9737140Z [RUN_FASTLANE] › Executing expo-secure-store Pods/ExpoSecureStore » Copy generated compatibility header
+2025-12-29T14:57:18.0042610Z [RUN_FASTLANE] › Executing expo-localization Pods/ExpoLocalization » Copy generated compatibility header
+2025-12-29T14:57:18.0145250Z [RUN_FASTLANE] › Executing expo-linking Pods/ExpoLinking » Copy generated compatibility header
+2025-12-29T14:57:18.0248330Z [RUN_FASTLANE] › Executing expo-linear-gradient Pods/ExpoLinearGradient » Copy generated compatibility header
+2025-12-29T14:57:18.0545920Z [RUN_FASTLANE] › Executing expo-keep-awake Pods/ExpoKeepAwake » Copy generated compatibility header
+2025-12-29T14:57:18.0679950Z [RUN_FASTLANE] › Executing expo-image Pods/ExpoImage » Copy generated compatibility header
+2025-12-29T14:57:18.0891480Z [RUN_FASTLANE] › Executing expo-router Pods/ExpoHead » Copy generated compatibility header
+2025-12-29T14:57:18.1094620Z [RUN_FASTLANE] › Executing expo-haptics Pods/ExpoHaptics » Copy generated compatibility header
+2025-12-29T14:57:18.1308130Z [RUN_FASTLANE] › Executing expo-font Pods/ExpoFont » Copy generated compatibility header
+2025-12-29T14:57:18.1518470Z [RUN_FASTLANE] › Executing Copy generated compatibility header
+2025-12-29T14:57:18.1926750Z [RUN_FASTLANE] › Executing expo-crypto Pods/ExpoCrypto » Copy generated compatibility header
+2025-12-29T14:57:18.2330870Z [RUN_FASTLANE] › Executing expo-asset Pods/ExpoAsset » Copy generated compatibility header
+2025-12-29T14:57:18.2433660Z [RUN_FASTLANE] › Executing expo Pods/Expo » Copy generated compatibility header
+2025-12-29T14:57:18.2737470Z [RUN_FASTLANE] › Executing expo-updates-interface Pods/EXUpdatesInterface » Copy generated compatibility header
+2025-12-29T14:57:18.4534730Z [RUN_FASTLANE] › Executing expo-notifications Pods/EXNotifications » Copy generated compatibility header
+2025-12-29T14:57:18.4844540Z [RUN_FASTLANE] › Executing expo-manifests Pods/EXManifests » Copy generated compatibility header
+2025-12-29T14:57:18.5008470Z [RUN_FASTLANE] › Executing expo-application Pods/EXApplication » Copy generated compatibility header
+2025-12-29T14:57:18.5211390Z [RUN_FASTLANE] › Executing expo-av Pods/EXAV » Copy generated compatibility header
+2025-12-29T14:57:18.5413530Z [RUN_FASTLANE] › Compiling react-native-purchases Pods/RNPurchases » RNPurchases-dummy.m
+2025-12-29T14:57:18.5515690Z [RUN_FASTLANE] › Packaging expo-sqlite Pods/ExpoSQLite » libExpoSQLite.a
+2025-12-29T14:57:18.5629210Z [RUN_FASTLANE] › Compiling react-native-purchases Pods/RNPurchases » RNPurchases.m
+2025-12-29T14:57:18.6435630Z [RUN_FASTLANE] › Executing expo-sqlite Pods/ExpoSQLite » Copy generated compatibility header
+2025-12-29T14:57:19.3782830Z [RUN_FASTLANE] › Compiling expo-constants Pods/EXConstants » EXConstants-dummy.m
+2025-12-29T14:57:19.3984230Z [RUN_FASTLANE] › Compiling expo-constants Pods/EXConstants » EXConstantsInstallationIdProvider.m
+2025-12-29T14:57:19.8438450Z [RUN_FASTLANE] › Packaging react-native-purchases Pods/RNPurchases » libRNPurchases.a
+2025-12-29T14:57:19.8541020Z [RUN_FASTLANE] › Packaging expo-constants Pods/EXConstants » libEXConstants.a
+2025-12-29T14:57:19.8643030Z [RUN_FASTLANE] › Executing react-native-purchases Pods/RNPurchases » Copy generated compatibility header
+2025-12-29T14:57:19.8746700Z [RUN_FASTLANE] › Executing expo-constants Pods/EXConstants » Copy generated compatibility header
+2025-12-29T14:57:40.6979800Z [RUN_FASTLANE] › Compiling expo-dev-menu Pods/expo-dev-menu » expo-dev-menu-dummy.m
+2025-12-29T14:57:40.8332910Z [RUN_FASTLANE] › Compiling expo-dev-menu Pods/expo-dev-menu » DevClientNoOpLoadingView.m
+2025-12-29T14:57:41.1913370Z [RUN_FASTLANE] › Compiling expo-dev-menu Pods/expo-dev-menu » EXDevMenuAppInfo.m
+2025-12-29T14:57:41.3379930Z [RUN_FASTLANE] › Packaging expo-dev-menu Pods/expo-dev-menu » libexpo-dev-menu.a
+2025-12-29T14:57:41.3903790Z [RUN_FASTLANE] › Executing expo-dev-menu Pods/expo-dev-menu » Copy generated compatibility header
+2025-12-29T14:58:06.5901310Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » RCTPackagerConnection+EXDevLauncherPackagerConnectionInterceptor.m
+2025-12-29T14:58:13.5151950Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » EXDevLauncherReactNativeFactory.mm
+2025-12-29T14:58:16.7879440Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » EXDevLauncherUpdatesHelper.m
+2025-12-29T14:58:16.7983430Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » EXDevLauncherRCTDevSettings.m
+2025-12-29T14:58:16.8085290Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » EXDevLauncherDeferredRCTRootView.m
+2025-12-29T14:58:16.8982780Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » EXDevLauncherRCTBridge.m
+2025-12-29T14:58:17.0118770Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » EXDevLauncherDevMenuExtensions.m
+2025-12-29T14:58:17.0222450Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » expo-dev-launcher-dummy.m
+2025-12-29T14:58:17.0327730Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » EXDevLauncherRedBox.m
+2025-12-29T14:58:17.3615160Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » EXDevLauncherManifestParser.m
+2025-12-29T14:58:17.3846320Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » EXDevLauncher.m
+2025-12-29T14:58:17.3952420Z [RUN_FASTLANE] › Compiling expo-dev-launcher Pods/expo-dev-launcher » EXDevLauncherController.m
+2025-12-29T14:58:17.7455410Z [RUN_FASTLANE] › Packaging expo-dev-launcher Pods/expo-dev-launcher » libexpo-dev-launcher.a
+2025-12-29T14:58:17.9806920Z [RUN_FASTLANE] › Executing expo-dev-launcher Pods/expo-dev-launcher » Copy generated compatibility header
+2025-12-29T14:58:21.3249350Z [RUN_FASTLANE] › Compiling Pods/Pods-DotChain » Pods-DotChain-dummy.m
+2025-12-29T14:58:21.3927950Z [RUN_FASTLANE] › Packaging Pods/Pods-DotChain » libPods-DotChain.a
+2025-12-29T14:58:21.4120080Z [RUN_FASTLANE] › Executing DotChain » [CP] Check Pods Manifest.lock
+2025-12-29T14:58:21.5186150Z [RUN_FASTLANE] › Executing DotChain » [Expo] Configure project
+2025-12-29T14:58:23.0423580Z [RUN_FASTLANE] › Copying   ./PrivacyInfo.xcprivacy ➜ ../../../../../var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/DotChain/PrivacyInfo.xcprivacy
+2025-12-29T14:58:29.5110180Z [RUN_FASTLANE] › Copying   ios/DotChain/Supporting/Expo.plist ➜ ./Expo.plist
+2025-12-29T14:58:29.5250210Z [RUN_FASTLANE] › Compiling DotChain » SplashScreen.storyboard
+2025-12-29T14:58:57.6463480Z [RUN_FASTLANE] › Preparing DotChain » Info.plist
+2025-12-29T14:58:58.7873770Z [RUN_FASTLANE] › Compiling DotChain » DotChain_vers.c
+2025-12-29T14:58:58.7979490Z [RUN_FASTLANE] › Linking   DotChain » DotChain
+2025-12-29T14:59:00.9177090Z [RUN_FASTLANE] ⚠️  ld: ignoring duplicate libraries: '-lc++'
+2025-12-29T14:59:00.9243950Z [RUN_FASTLANE] › Generating debug DotChain » DotChain.app.dSYM
+2025-12-29T14:59:23.5155550Z [RUN_FASTLANE] › Executing DotChain » Bundle React Native code and images
+2025-12-29T14:59:50.7027400Z [RUN_FASTLANE] › Executing DotChain » [CP] Copy Pods Resources
+2025-12-29T14:59:55.8324120Z [RUN_FASTLANE] › Executing DotChain » [CP] Embed Pods Frameworks
+2025-12-29T14:59:57.4819930Z [RUN_FASTLANE] › Signing   DotChain » DotChain.app
+2025-12-29T14:59:57.7212860Z [RUN_FASTLANE] › Creating  DotChain » DotChain.app
+2025-12-29T14:59:58.6620040Z [RUN_FASTLANE]     Run script build phase '[CP-User] [Hermes] Replace Hermes for the right configuration, if needed' will be run during every build because it does not specify any outputs. To address this issue, either add output dependencies to the script phase, or configure it to run in every build by unchecking "Based on dependency analysis" in the script phase. (in target 'hermes-engine' from project 'Pods')
+2025-12-29T14:59:59.1519680Z [RUN_FASTLANE] › Archive Succeeded
+2025-12-29T14:59:59.5003770Z [RUN_FASTLANE] Generated plist file with the following values:
+2025-12-29T14:59:59.5092370Z [RUN_FASTLANE] ▸ -----------------------------------------
+2025-12-29T14:59:59.5095830Z [RUN_FASTLANE] ▸ {
+2025-12-29T14:59:59.5097020Z [RUN_FASTLANE] ▸   "method": "app-store",
+2025-12-29T14:59:59.5098590Z [RUN_FASTLANE] ▸   "provisioningProfiles": {
+2025-12-29T14:59:59.5100510Z [RUN_FASTLANE] ▸     "com.doooooraku.dotchain": "cb3b951c-7c4f-4bd3-9e0d-fc613e52b630"
+2025-12-29T14:59:59.5102090Z [RUN_FASTLANE] ▸   },
+2025-12-29T14:59:59.5103460Z [RUN_FASTLANE] ▸   "signingStyle": "manual"
+2025-12-29T14:59:59.5104470Z [RUN_FASTLANE] ▸ }
+2025-12-29T14:59:59.5106260Z [RUN_FASTLANE] ▸ -----------------------------------------
+2025-12-29T14:59:59.5115000Z [RUN_FASTLANE] $ /usr/bin/xcrun /opt/homebrew/lib/ruby/gems/3.3.0/gems/fastlane-2.229.1/gym/lib/assets/wrap_xcodebuild/xcbuild-safe.sh -exportArchive -exportOptionsPlist '/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/gym_config20251229-46011-t4ugp7.plist' -archivePath /Users/runner/Library/Developer/Xcode/Archives/2025-12-29/DotChain\ 2025-12-29\ 14.39.24.xcarchive -exportPath '/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/gym_output20251229-46011-7egobe' OTHER_CODE_SIGN_FLAGS="--keychain /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-b0701371-a856-4610-9e51-3a2bee0dd654.keychain"
+2025-12-29T15:00:08.6142280Z [RUN_FASTLANE] Compressing 1 dSYM(s)
+2025-12-29T15:00:08.6319700Z [RUN_FASTLANE] $ cd '/Users/runner/Library/Developer/Xcode/Archives/2025-12-29/DotChain 2025-12-29 14.39.24.xcarchive/dSYMs' && zip -r '/private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/DotChain.app.dSYM.zip' *.dSYM
+2025-12-29T15:00:12.9652570Z [RUN_FASTLANE] ▸   adding: DotChain.app.dSYM/ (stored 0%)
+2025-12-29T15:00:12.9659470Z [RUN_FASTLANE] ▸   adding: DotChain.app.dSYM/Contents/ (stored 0%)
+2025-12-29T15:00:12.9670810Z [RUN_FASTLANE] ▸   adding: DotChain.app.dSYM/Contents/Resources/ (stored 0%)
+2025-12-29T15:00:12.9672510Z [RUN_FASTLANE] ▸   adding: DotChain.app.dSYM/Contents/Resources/Relocations/ (stored 0%)
+2025-12-29T15:00:12.9674810Z [RUN_FASTLANE] ▸   adding: DotChain.app.dSYM/Contents/Resources/Relocations/aarch64/ (stored 0%)
+2025-12-29T15:00:12.9676920Z [RUN_FASTLANE] ▸   adding: DotChain.app.dSYM/Contents/Resources/Relocations/aarch64/DotChain.yml (deflated 89%)
+2025-12-29T15:00:12.9678680Z [RUN_FASTLANE] ▸   adding: DotChain.app.dSYM/Contents/Resources/DWARF/ (stored 0%)
+2025-12-29T15:00:12.9679890Z [RUN_FASTLANE] ▸   adding: DotChain.app.dSYM/Contents/Resources/DWARF/DotChain (deflated 74%)
+2025-12-29T15:00:12.9680750Z [RUN_FASTLANE] ▸   adding: DotChain.app.dSYM/Contents/Info.plist (deflated 52%)
+2025-12-29T15:00:12.9681530Z [RUN_FASTLANE] Successfully exported and compressed dSYM file
+2025-12-29T15:00:13.0030880Z [RUN_FASTLANE] Successfully exported and signed the ipa file:
+2025-12-29T15:00:13.0038090Z [RUN_FASTLANE] /private/var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/DotChain.ipa
+2025-12-29T15:00:13.1904140Z [CLEAN_UP_CREDENTIALS] Destroying keychain - /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-b0701371-a856-4610-9e51-3a2bee0dd654.keychain
+2025-12-29T15:00:16.4674490Z [CLEAN_UP_CREDENTIALS] Removing provisioning profile
+2025-12-29T15:00:16.4902990Z [UPLOAD_APPLICATION_ARCHIVE] Application archives:
+2025-12-29T15:00:16.4908670Z [UPLOAD_APPLICATION_ARCHIVE]   - /var/folders/bp/kmfmhnl95kx1c8x321z7twbw0000gn/T/eas-build-local-nodejs/41db1f6d-9c90-4be0-ae54-2010f57c9059/build/ios/build/DotChain.ipa (22.2 MB)
+2025-12-29T15:00:16.4911040Z [UPLOAD_APPLICATION_ARCHIVE] Uploading application archive...
+2025-12-29T15:00:16.4913620Z [PREPARE_ARTIFACTS] Preparing artifacts
+2025-12-29T15:00:16.5469400Z [PREPARE_ARTIFACTS] Writing artifacts to /Users/runner/work/DotChain/DotChain/DotChain.ipa
+2025-12-29T15:00:16.5579200Z 
+2025-12-29T15:00:16.5580120Z Build successful
+2025-12-29T15:00:16.5581650Z You can find the build artifacts in /Users/runner/work/DotChain/DotChain/DotChain.ipa
+2025-12-29T15:00:54.9653090Z ##[group]Run eas submit --platform ios --path DotChain.ipa --profile production --non-interactive
+2025-12-29T15:00:54.9654300Z [36;1meas submit --platform ios --path DotChain.ipa --profile production --non-interactive[0m
+2025-12-29T15:00:55.6328890Z shell: /bin/bash -e {0}
+2025-12-29T15:00:55.6330890Z env:
+2025-12-29T15:00:55.6331220Z   PNPM_HOME: /Users/runner/setup-pnpm/node_modules/.bin
+2025-12-29T15:00:55.6334770Z   EXPO_TOKEN: ***
+2025-12-29T15:00:55.6335060Z ##[endgroup]
+2025-12-29T15:01:03.7457990Z 
+2025-12-29T15:01:03.7463250Z Uploading your app archive to EAS Submit
+2025-12-29T15:01:03.8543320Z - Uploading to EAS Submit 0%
+2025-12-29T15:01:04.7240970Z ✔ Uploaded to EAS Submit 
+2025-12-29T15:01:04.8135710Z Looking up credentials configuration for com.doooooraku.dotchain...
+2025-12-29T15:01:05.1805180Z ✔ App Store Connect API Key already set up.
+2025-12-29T15:01:05.1808430Z Using Api Key ID: 6768KZU85A (iOS)
+2025-12-29T15:01:05.1814690Z 
+2025-12-29T15:01:05.1817990Z ASC App ID:                 6756904225
+2025-12-29T15:01:05.1819530Z Project ID:                 9a84b4b9-5b2b-4b2a-95c1-9a163afa6c12
+2025-12-29T15:01:05.1827790Z App Store Connect API Key:  
+2025-12-29T15:01:05.1832030Z     Key Name  :  iOS
+2025-12-29T15:01:05.1832720Z     Key ID    :  6768KZU85A
+2025-12-29T15:01:05.1833130Z     Key Source:  EAS servers
+2025-12-29T15:01:05.1833490Z Archive Path:               DotChain.ipa
+2025-12-29T15:01:05.1833900Z 
+2025-12-29T15:01:05.1834080Z - Scheduling iOS submission
+2025-12-29T15:01:05.8895550Z ✔ Scheduled iOS submission
+2025-12-29T15:01:05.8906460Z 
+2025-12-29T15:01:05.8907530Z Submission details: https://expo.dev/accounts/dooraku/projects/dotchain/submissions/7ca7a8fb-5b3d-47b4-8034-fbf790c47336
+2025-12-29T15:01:05.8908340Z 
+2025-12-29T15:01:05.8910220Z Waiting for submission to complete. You can press Ctrl+C to exit.
+2025-12-29T15:01:05.8912220Z - Submitting
+2025-12-29T15:03:15.2308300Z ✔ Submitted your app to Apple App Store Connect!
+2025-12-29T15:03:15.2311510Z 
+2025-12-29T15:03:15.2319060Z Your binary has been successfully uploaded to App Store Connect!
+2025-12-29T15:03:15.2320290Z - It is now being processed by Apple - you will receive an email when the processing finishes.
+2025-12-29T15:03:15.2433260Z - It usually takes about 5-10 minutes depending on how busy Apple servers are.
+2025-12-29T15:03:15.2536760Z - When it's done, you can see your build here: https://appstoreconnect.apple.com/apps/6756904225/testflight/ios
+2025-12-29T15:03:15.2903740Z ##[group]Run actions/upload-artifact@v4
+2025-12-29T15:03:15.2904430Z with:
+2025-12-29T15:03:15.2904730Z   name: DotChain-iOS-IPA
+2025-12-29T15:03:15.2904960Z   path: DotChain.ipa
+2025-12-29T15:03:15.2905260Z   if-no-files-found: warn
+2025-12-29T15:03:15.2905500Z   compression-level: 6
+2025-12-29T15:03:15.2905870Z   overwrite: false
+2025-12-29T15:03:15.2906170Z   include-hidden-files: false
+2025-12-29T15:03:15.2906390Z env:
+2025-12-29T15:03:15.2906700Z   PNPM_HOME: /Users/runner/setup-pnpm/node_modules/.bin
+2025-12-29T15:03:15.2906990Z ##[endgroup]
+2025-12-29T15:03:16.1475570Z With the provided path, there will be 1 file uploaded
+2025-12-29T15:03:16.1476510Z Artifact name is valid!
+2025-12-29T15:03:16.1477140Z Root directory input is valid!
+2025-12-29T15:03:16.2786290Z Beginning upload of artifact content to blob storage
+2025-12-29T15:03:17.6885730Z Uploaded bytes 8388608
+2025-12-29T15:03:17.9598910Z Uploaded bytes 16777216
+2025-12-29T15:03:18.2630510Z Uploaded bytes 23097138
+2025-12-29T15:03:18.3090800Z Finished uploading artifact content to blob storage!
+2025-12-29T15:03:18.3094780Z SHA256 digest of uploaded artifact zip is 1bba8437e46a49508e459144f644ace2df1b51d2f6e520667d5d3c51ac8da615
+2025-12-29T15:03:18.3096420Z Finalizing artifact upload
+2025-12-29T15:03:18.4267200Z Artifact DotChain-iOS-IPA.zip successfully finalized. Artifact ID 4984597039
+2025-12-29T15:03:18.4270100Z Artifact DotChain-iOS-IPA has been successfully uploaded! Final size is 23097138 bytes. Artifact ID is 4984597039
+2025-12-29T15:03:18.4273040Z Artifact download URL: https://github.com/doooooraku/DotChain/actions/runs/20575272775/artifacts/4984597039
+2025-12-29T15:03:18.4612050Z Post job cleanup.
+2025-12-29T15:03:18.6863780Z Cache hit occurred on the primary key node-cache-macOS-arm64-pnpm-8dfefac57cacc1eec6ff4c86072be7efed1ed7ab442bad6d34ba4730a8e38e34, not saving cache.
+2025-12-29T15:03:18.7204210Z Post job cleanup.
+2025-12-29T15:03:18.8750840Z Pruning is unnecessary.
+2025-12-29T15:03:18.8972800Z Post job cleanup.
+2025-12-29T15:03:19.0896090Z [command]/opt/homebrew/bin/git version
+2025-12-29T15:03:19.0997870Z git version 2.50.1
+2025-12-29T15:03:19.1665290Z Copying '/Users/runner/.gitconfig' to '/Users/runner/work/_temp/78158192-a862-4f24-ad79-9783e5af4a8e/.gitconfig'
+2025-12-29T15:03:19.1765280Z Temporarily overriding HOME='/Users/runner/work/_temp/78158192-a862-4f24-ad79-9783e5af4a8e' before making global git config changes
+2025-12-29T15:03:19.1868120Z Adding repository directory to the temporary git global config as a safe directory
+2025-12-29T15:03:19.1988130Z [command]/opt/homebrew/bin/git config --global --add safe.directory /Users/runner/work/DotChain/DotChain
+2025-12-29T15:03:19.2358860Z [command]/opt/homebrew/bin/git config --local --name-only --get-regexp core\.sshCommand
+2025-12-29T15:03:19.2683560Z [command]/opt/homebrew/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
+2025-12-29T15:03:19.4817980Z [command]/opt/homebrew/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
+2025-12-29T15:03:19.4988840Z http.https://github.com/.extraheader
+2025-12-29T15:03:19.5356400Z [command]/opt/homebrew/bin/git config --local --unset-all http.https://github.com/.extraheader
+2025-12-29T15:03:19.5607310Z [command]/opt/homebrew/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
+2025-12-29T15:03:19.7205340Z [command]/opt/homebrew/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
+2025-12-29T15:03:19.7544840Z [command]/opt/homebrew/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
+2025-12-29T15:03:19.9337700Z Cleaning up orphan processes
diff --git a/.github/workflows/logs_53184067796/Build & Submit IPA/system.txt b/.github/workflows/logs_53184067796/Build & Submit IPA/system.txt
new file mode 100644
index 0000000..a173fb7
--- /dev/null
+++ b/.github/workflows/logs_53184067796/Build & Submit IPA/system.txt	
@@ -0,0 +1,5 @@
+2025-12-29T14:31:11.6880000Z Requested labels: macos-latest
+2025-12-29T14:31:11.6880000Z Job defined at: doooooraku/DotChain/.github/workflows/build-ios-device.yml@refs/heads/main
+2025-12-29T14:31:11.6880000Z Waiting for a runner to pick up this job...
+2025-12-29T14:31:11.6950000Z Job is waiting for a hosted runner to come online.
+2025-12-29T14:31:11.6950000Z Job is about to start running on the hosted runner: GitHub Actions 1000000066
\ No newline at end of file
diff --git a/src/services/proService.ts b/src/services/proService.ts
index 0382b73..d01bcc8 100644
--- a/src/services/proService.ts
+++ b/src/services/proService.ts
@@ -9,10 +9,6 @@ export type PlanType = 'monthly' | 'yearly';
 
 const PRO_STATE_KEY = 'dotchain_pro_state_v1';
 const ENTITLEMENT_ID = 'Pro_Plan';
-// RevenueCatのPackage ID（iOS/Android共通で使う）
-const RC_PACKAGE_MONTHLY_ID = 'dotchain_pro_monthly';
-const RC_PACKAGE_YEARLY_ID = 'dotchain_pro_yearly';
-
 let configured = false;
 
 const isNative = Platform.OS === 'ios' || Platform.OS === 'android';
@@ -69,8 +65,7 @@ async function getCurrentOffering(): Promise<PurchasesOffering | null> {
 
 function findPackage(offering: PurchasesOffering | null, plan: PlanType): PurchasesPackage | null {
   if (!offering) return null;
-  const targetId = plan === 'monthly' ? RC_PACKAGE_MONTHLY_ID : RC_PACKAGE_YEARLY_ID;
-  return offering.availablePackages.find((pkg) => pkg.identifier === targetId) ?? null;
+  return plan === 'monthly' ? offering.monthly : offering.annual;
 }
 
 export const proService = {

# --------------------------------------------------
# Commit: 74d1043 - fix(audio): タップ音の切り替え不具合修正と重複再生の廃止
# --------------------------------------------------
diff --git "a/20251222_2318_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251222_2318_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
deleted file mode 100644
index 5a20c7e..0000000
--- "a/20251222_2318_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+++ /dev/null
@@ -1,1984 +0,0 @@
-diff --git "a/20251221_1106_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251221_1106_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-deleted file mode 100644
-index 5b3d4db..0000000
---- "a/20251221_1106_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-+++ /dev/null
-@@ -1,204 +0,0 @@
--diff --git a/app/habit/edit.tsx b/app/habit/edit.tsx
--index 994da7a..9fb36b0 100644
----- a/app/habit/edit.tsx
--+++ b/app/habit/edit.tsx
--@@ -179,7 +179,7 @@ export default function EditScreen() {
--           allowPassthrough
--           backdropOpacity={0}
--           verticalAlign="bottom"
---          cardOffsetY={-24}
--+          cardOffsetY={250}
--         />
--       )}
-- 
--@@ -191,7 +191,7 @@ export default function EditScreen() {
--           allowPassthrough
--           backdropOpacity={0}
--           verticalAlign="center"
---          cardOffsetY={48}
--+          cardOffsetY={250}
--         />
--       )}
-- 
--@@ -203,7 +203,7 @@ export default function EditScreen() {
--           allowPassthrough
--           backdropOpacity={0}
--           verticalAlign="bottom"
---          cardOffsetY={-24}
--+          cardOffsetY={-124}
--         />
--       )}
--     </ScrollView>
--diff --git a/app/pro/index.tsx b/app/pro/index.tsx
--index 51df945..1eaa4f4 100644
----- a/app/pro/index.tsx
--+++ b/app/pro/index.tsx
--@@ -3,15 +3,14 @@ import { LinearGradient } from 'expo-linear-gradient';
-- import { Ionicons } from '@expo/vector-icons';
-- import { ScrollView, Stack, Text, YStack, XStack, Button, useTheme } from 'tamagui';
-- 
---import { t } from '@/src/core/i18n/i18n';
---
---type TKey = Parameters<typeof t>[0];
--+import { useTranslation, type TranslationKey as TKey } from '@/src/core/i18n/i18n';
-- 
-- type PlanType = 'monthly' | 'yearly';
-- 
-- function PlanPriceCard({ type, onPress }: { type: PlanType; onPress: () => void }) {
--   const theme = useTheme();
--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
--+  const { t } = useTranslation();
--   const titleKey: TKey = type === 'monthly' ? 'proPlanMonthlyTitle' : 'proPlanYearlyTitle';
--   const priceKey: TKey = type === 'monthly' ? 'priceMonthly' : 'priceYearly';
--   const taglineKey: TKey = type === 'monthly' ? 'proMonthlyTagline' : 'proYearlyTagline';
--@@ -63,6 +62,7 @@ function PlanPriceCard({ type, onPress }: { type: PlanType; onPress: () => void
-- }
-- 
-- function CompareRow({ featureKey, freeKey, proKey }: { featureKey: TKey; freeKey: TKey; proKey: TKey }) {
--+  const { t } = useTranslation();
--   return (
--     <XStack paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
--       <YStack flex={1.2}>
--@@ -88,6 +88,7 @@ export default function PaywallScreen() {
--   const theme = useTheme();
--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
--   const bg = theme?.background?.val?.toString() ?? '#000';
--+  const { t } = useTranslation();
-- 
--   const handlePlan = () => {
--     Alert.alert(t('comingSoonTitle') ?? 'Coming soon', t('paywallNote'));
--diff --git a/app/settings/index.tsx b/app/settings/index.tsx
--index 9dbac7d..c59d55a 100644
----- a/app/settings/index.tsx
--+++ b/app/settings/index.tsx
--@@ -6,7 +6,7 @@ import { Check } from '@tamagui/lucide-icons';
-- import { setLang as setLangGlobal } from '@/src/core/i18n/i18n';
-- import DateTimePicker from '@react-native-community/datetimepicker';
-- import { useSettingsStore, type HeatmapDaysOption } from '@/src/stores/settingsStore';
---import { t, useTranslation, type Lang, type TranslationKey } from '@/src/core/i18n/i18n';
--+import { useTranslation, type Lang, type TranslationKey } from '@/src/core/i18n/i18n';
-- 
-- export default function SettingsScreen() {
--   const sound = useSettingsStore((s) => s.sound);
--@@ -25,7 +25,7 @@ export default function SettingsScreen() {
--   const reminderTime = useSettingsStore((s) => s.reminderTime);
--   const setReminderEnabled = useSettingsStore((s) => s.setReminderEnabled);
--   const setReminderTime = useSettingsStore((s) => s.setReminderTime);
---  const { lang, setLang: setLangStore } = useTranslation();
--+  const { t, lang, setLang: setLangStore } = useTranslation();
--   const theme = useTheme();
--   const isPro = useSettingsStore((s) => s.isPro ?? false);
--   const [langOpen, setLangOpen] = React.useState(false);
--diff --git a/src/features/habit/HabitButton.tsx b/src/features/habit/HabitButton.tsx
--index c519546..29657a0 100644
----- a/src/features/habit/HabitButton.tsx
--+++ b/src/features/habit/HabitButton.tsx
--@@ -2,7 +2,7 @@ import { Text, YStack, useTheme } from 'tamagui';
-- import { Ionicons } from '@expo/vector-icons';
-- import { Pressable, Animated, Easing } from 'react-native';
-- import { useEffect, useRef, type ComponentProps } from 'react';
---import { t } from '@/src/core/i18n/i18n';
--+import { useTranslation } from '@/src/core/i18n/i18n';
-- 
-- type IconName = ComponentProps<typeof Ionicons>['name'];
-- 
--@@ -23,6 +23,7 @@ type Props = {
-- export function HabitButton({ label, size, active, iconName = 'checkbox', onPress, onLongPress }: Props) {
--   const height = size === 'big' ? 160 : 110;
--   const theme = useTheme();
--+  const { t } = useTranslation();
--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
--   const bg = theme?.background?.val?.toString() ?? '#000';
--   const border = theme?.gray?.val?.toString() ?? '#222';
--diff --git a/src/features/habit/HeatmapChain.tsx b/src/features/habit/HeatmapChain.tsx
--index f43f89c..5228664 100644
----- a/src/features/habit/HeatmapChain.tsx
--+++ b/src/features/habit/HeatmapChain.tsx
--@@ -133,6 +133,8 @@ export const HeatmapChain = memo(function HeatmapChain({
--           colorBg={colorBg}
--           colorBorder={colorBorder}
--           scale={scale}
--+          opacityBoost={isToday ? 0.05 : 0}
--+          isToday={isToday}
--         />
-- 
--         {idx < dates.length - 1 && (
--@@ -173,6 +175,8 @@ function Node({
--   colorBg,
--   colorBorder,
--   scale,
--+  opacityBoost = 0,
--+  isToday,
-- }: {
--   size: number;
--   radius: number;
--@@ -183,7 +187,11 @@ function Node({
--   colorBg: string;
--   colorBorder: string;
--   scale: Animated.AnimatedInterpolation<number>;
--+  opacityBoost?: number;
-- }) {
--+  const boostedOpacity = Math.min(1, opacity + opacityBoost);
--+  const activeBorder = isToday ? lighten(colorBorder, 0.1) : colorBorder;
--+
--   return (
--     <Animated.View
--       style={[
--@@ -192,8 +200,8 @@ function Node({
--           width: size,
--           height: size,
--           borderRadius: radius,
---          borderColor: active ? colorBorder : 'rgba(255,255,255,0.12)',
---          opacity,
--+          borderColor: active ? activeBorder : 'rgba(255,255,255,0.12)',
--+          opacity: boostedOpacity,
--           transform: [{ scale: active ? (scale as any) : 1 }],
--         },
--       ]}>
--@@ -207,7 +215,7 @@ function Node({
--         />
--       )}
--       <View style={[styles.nodeHighlight, { borderRadius: radius }]} />
---      {isToday && active && <View style={[styles.nodeDot, { borderRadius: radius / 2 }]} />}
--+      {active && <View style={[styles.nodeDot, { borderRadius: radius / 2 }]} />}
--     </Animated.View>
--   );
-- }
--@@ -309,3 +317,16 @@ function rgba(hex: string, a: number) {
--   const b = parseInt(c.slice(4, 6), 16);
--   return `rgba(${r},${g},${b},${a})`;
-- }
--+
--+function lighten(hex: string, amount: number) {
--+  const c = hex.replace('#', '').trim();
--+  if (c.length !== 6) return hex;
--+  const r = parseInt(c.slice(0, 2), 16);
--+  const g = parseInt(c.slice(2, 4), 16);
--+  const b = parseInt(c.slice(4, 6), 16);
--+  const mix = (v: number) => Math.min(255, Math.round(v + (255 - v) * amount));
--+  const rr = mix(r).toString(16).padStart(2, '0');
--+  const gg = mix(g).toString(16).padStart(2, '0');
--+  const bb = mix(b).toString(16).padStart(2, '0');
--+  return `#${rr}${gg}${bb}`;
--+}
--diff --git a/src/features/habit/IconPicker.tsx b/src/features/habit/IconPicker.tsx
--index a61cb0f..97959d0 100644
----- a/src/features/habit/IconPicker.tsx
--+++ b/src/features/habit/IconPicker.tsx
--@@ -1,7 +1,7 @@
-- import { memo, useEffect, useMemo, useState } from 'react';
-- import { Button, Stack, Text, XStack, YStack, ScrollView, useTheme } from 'tamagui';
-- 
---import { t } from '@/src/core/i18n/i18n';
--+import { useTranslation } from '@/src/core/i18n/i18n';
-- 
-- export type IconPickerProps = {
--   value?: string | null;
--@@ -89,6 +89,7 @@ function findCategoryIdByIconId(iconId: string | null | undefined): IconCategory
-- export const IconPicker = memo(function IconPicker({ value, onChange }: IconPickerProps) {
--   const theme = useTheme();
--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
--+  const { t } = useTranslation();
-- 
--   // 初期カテゴリは現在の value に合わせる（なければ basic）
--   const [activeCategoryId, setActiveCategoryId] = useState<IconCategoryId>(() => {
-diff --git "a/20251221_1454_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251221_1454_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-deleted file mode 100644
-index 9e3e4a9..0000000
---- "a/20251221_1454_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-+++ /dev/null
-@@ -1,169 +0,0 @@
--diff --git a/app/_layout.tsx b/app/_layout.tsx
--index a24c586..8161d3d 100644
----- a/app/_layout.tsx
--+++ b/app/_layout.tsx
--@@ -23,6 +23,7 @@ import { getLocalDateKey } from '@/src/core/dateKey';
-- export default function RootLayout() {
--   const appState = useRef(AppState.currentState);
--   const lastDate = useRef(getLocalDateKey());
--+  const midnightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
--   const themeName = useSettingsStore((s) => s.theme);
--   const { t } = useTranslation();
--   const isDark = themeName === 'dark';
--@@ -35,6 +36,23 @@ export default function RootLayout() {
--   } as const;
-- 
--   useEffect(() => {
--+    const scheduleMidnightSync = () => {
--+      const now = new Date();
--+      const next = new Date(now);
--+      next.setHours(24, 0, 0, 0);
--+      const delay = next.getTime() - now.getTime();
--+      return setTimeout(() => {
--+        const today = getLocalDateKey();
--+        if (today !== lastDate.current) {
--+          useHabitStore.getState().loadAll();
--+          lastDate.current = today;
--+        }
--+        midnightTimer.current = scheduleMidnightSync();
--+      }, delay);
--+    };
--+
--+    midnightTimer.current = scheduleMidnightSync();
--+
--     const sub = AppState.addEventListener('change', (state) => {
--       if (appState.current.match(/inactive|background/) && state === 'active') {
--         const today = getLocalDateKey();
--@@ -45,7 +63,14 @@ export default function RootLayout() {
--       }
--       appState.current = state;
--     });
---    return () => sub.remove();
--+
--+    return () => {
--+      sub.remove();
--+      if (midnightTimer.current) {
--+        clearTimeout(midnightTimer.current);
--+        midnightTimer.current = null;
--+      }
--+    };
--   }, []);
-- 
--   return (
--diff --git a/src/features/habit/HeatmapChain.tsx b/src/features/habit/HeatmapChain.tsx
--index 5228664..387dc93 100644
----- a/src/features/habit/HeatmapChain.tsx
--+++ b/src/features/habit/HeatmapChain.tsx
--@@ -1,5 +1,5 @@
-- import { memo, useEffect, useMemo, useRef } from 'react';
---import { Animated, Easing, StyleSheet, View } from 'react-native';
--+import { Animated, Easing, StyleSheet, View, type ColorValue } from 'react-native';
-- import { XStack } from 'tamagui';
-- import { LinearGradient } from 'expo-linear-gradient';
-- import { getLocalDateKey } from '@/src/core/dateKey';
--@@ -103,8 +103,9 @@ export const HeatmapChain = memo(function HeatmapChain({
--   const isWeek = variant === 'week' && days === 7;
--   const DOT = isWeek ? 24 : 18;
--   const DOT_RADIUS = Math.round(DOT * (isWeek ? 0.42 : 0.45));
---  const LINK_WIDTH = isWeek ? 16 : 12; // weekでは flexGrow と組み合わせて幅を使い切る
---  const LINK_HEIGHT = isWeek ? 3 : 2;
--+  // 線を少し太めにして「流れている」ことが分かりやすいようにする
--+  const LINK_WIDTH = isWeek ? 22 : 16; // weekでは flexGrow と組み合わせて幅を使い切る
--+  const LINK_HEIGHT = 3;
--   const OUTER_GAP = isWeek ? '$1' : '$2';
--   const INNER_GAP = '$1';
-- 
--@@ -134,7 +135,6 @@ export const HeatmapChain = memo(function HeatmapChain({
--           colorBorder={colorBorder}
--           scale={scale}
--           opacityBoost={isToday ? 0.05 : 0}
---          isToday={isToday}
--         />
-- 
--         {idx < dates.length - 1 && (
--@@ -176,7 +176,6 @@ function Node({
--   colorBorder,
--   scale,
--   opacityBoost = 0,
---  isToday,
-- }: {
--   size: number;
--   radius: number;
--@@ -247,6 +246,9 @@ function Link({
--   });
-- 
--   const show = active || keepSpace;
--+  const linkColors: readonly [ColorValue, ColorValue, ColorValue] = active
--+    ? [rgba(colorActive, 0.35), rgba(colorActive, 1), rgba(colorActive, 0.35)]
--+    : [rgba(colorActive, 0.06), rgba(colorActive, 0.2), rgba(colorActive, 0.06)];
-- 
--   return (
--     <Animated.View
--@@ -261,11 +263,7 @@ function Link({
--       ]}>
--       {show && (
--         <LinearGradient
---          colors={[
---            rgba(colorActive, 0.08),
---            rgba(colorActive, 0.9),
---            rgba(colorActive, 0.08),
---          ]}
--+          colors={linkColors}
--           start={{ x: phase, y: 0.5 }}
--           end={{ x: phase + 1, y: 0.5 }}
--           style={StyleSheet.absoluteFill}
--diff --git a/src/stores/habitStore.ts b/src/stores/habitStore.ts
--index 1e3949e..83ef1bf 100644
----- a/src/stores/habitStore.ts
--+++ b/src/stores/habitStore.ts
--@@ -121,7 +121,8 @@ export const useHabitStore = create<HabitState>()(
--     {
--       name: 'dotchain-habits',
--       storage: createJSONStorage(() => AsyncStorage),
---      partialize: (state) => ({ today: state.today, habits: state.habits, logs: state.logs }),
--+      // today は日付依存の一時データなので永続化しない（ズレ防止）
--+      partialize: (state) => ({ habits: state.habits, logs: state.logs }),
--     },
--   ),
-- );
--diff --git a/src/stores/settingsStore.ts b/src/stores/settingsStore.ts
--index 0ffd153..1e3fdd2 100644
----- a/src/stores/settingsStore.ts
--+++ b/src/stores/settingsStore.ts
--@@ -14,6 +14,7 @@ type SettingsState = {
--   hasSeenOnboarding: boolean;
--   heatmapDays: HeatmapDaysOption;
--   electricFlow: boolean;
--+  electricFlowUserToggled: boolean;
--   hasRequestedReview: boolean;
--   isPro: boolean;
--   reminderEnabled: boolean;
--@@ -40,7 +41,9 @@ export const useSettingsStore = create<SettingsState>()(
--       tapSound: 'click',
--       hasSeenOnboarding: false,
--       heatmapDays: 7,
---      electricFlow: false,
--+      // 短期レンジ（〜60日）は初期ON、長期レンジ（180/365）は初期OFFとする
--+      electricFlow: true,
--+      electricFlowUserToggled: false,
--       hasRequestedReview: false,
--       isPro: false,
--       reminderEnabled: false,
--@@ -53,9 +56,15 @@ export const useSettingsStore = create<SettingsState>()(
--       setHeatmapDays: (days) => {
--         const allowed: HeatmapDaysOption[] = [7, 30, 60, 180, 365];
--         const safe = allowed.includes(days) ? days : 7;
---        set({ heatmapDays: safe });
--+        // ユーザーが手動で電流をいじっていなければ、レンジに応じて自動切替
--+        if (!get().electricFlowUserToggled) {
--+          const nextFlowDefault = safe <= 60; // 1週/1か月/2か月はON、半年/1年はOFF
--+          set({ heatmapDays: safe, electricFlow: nextFlowDefault });
--+        } else {
--+          set({ heatmapDays: safe });
--+        }
--       },
---      setElectricFlow: (v) => set({ electricFlow: Boolean(v) }),
--+      setElectricFlow: (v) => set({ electricFlow: Boolean(v), electricFlowUserToggled: true }),
--       setHasRequestedReview: (v) => set({ hasRequestedReview: Boolean(v) }),
--       setIsPro: (v) => set({ isPro: Boolean(v) }),
--       setReminderEnabled: async (v) => {
-diff --git "a/20251222_1430_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251222_1430_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-deleted file mode 100644
-index 392276a..0000000
---- "a/20251222_1430_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-+++ /dev/null
-@@ -1,819 +0,0 @@
--diff --git a/app/habit/edit.tsx b/app/habit/edit.tsx
--index 9fb36b0..fd01597 100644
----- a/app/habit/edit.tsx
--+++ b/app/habit/edit.tsx
--@@ -7,6 +7,7 @@ import { useHabitStore } from '@/src/stores/habitStore';
-- import { useTranslation } from '@/src/core/i18n/i18n';
-- import { IconPicker } from '@/src/features/habit/IconPicker';
-- import { TutorialOverlay } from '@/src/features/tutorial/TutorialOverlay';
--+import { normalizeHabitIconName } from '@/src/features/habit/habitIcons';
-- 
-- const HABIT_TITLE_MAX_LENGTH = 20;
-- const MAX_FREE_HABITS = 3;
--@@ -21,7 +22,7 @@ export default function EditScreen() {
-- 
--   const target = habits.find((h) => h.id === id);
--   const [name, setName] = useState(target?.title ?? '');
---  const [selectedIcon, setSelectedIcon] = useState(target?.icon ?? 'walk');
--+  const [selectedIcon, setSelectedIcon] = useState(() => normalizeHabitIconName(target?.icon));
--   const isEdit = Boolean(id);
--   const isTutorial = tutorial === '1' && !isEdit;
-- 
--@@ -30,7 +31,7 @@ export default function EditScreen() {
-- 
--   useEffect(() => {
--     setName(target?.title ?? '');
---    setSelectedIcon(target?.icon ?? 'walk');
--+    setSelectedIcon(normalizeHabitIconName(target?.icon));
--   }, [target?.title, target?.icon]);
-- 
--   useEffect(() => {
--diff --git a/app/index.tsx b/app/index.tsx
--index da3cdf7..0278ae1 100644
----- a/app/index.tsx
--+++ b/app/index.tsx
--@@ -1,4 +1,4 @@
---import { useEffect, useRef, useState, type ComponentProps } from 'react';
--+import { useEffect, useRef, useState } from 'react';
-- import { Href, useLocalSearchParams, useRouter } from 'expo-router';
-- import { Ionicons } from '@expo/vector-icons';
-- import { ScrollView, Stack, Text, XStack, YStack, Button, Spinner, useTheme } from 'tamagui';
--@@ -18,8 +18,6 @@ import { useTranslation } from '@/src/core/i18n/i18n';
-- import { useSettingsStore } from '@/src/stores/settingsStore';
-- 
-- type TutorialStep = 'none' | 'welcome' | 'pressFab' | 'pressHabit' | 'explainChain';
---type IconName = ComponentProps<typeof Ionicons>['name'];
---
-- export default function HomeScreen() {
--   const router = useRouter();
--   const params = useLocalSearchParams<{ fromTutorial?: string }>();
--@@ -111,7 +109,7 @@ export default function HomeScreen() {
--           label={habit.title}
--           size={idx === 0 ? 'big' : 'medium'}
--           active={Boolean(today[habit.id])}
---          iconName={habit.icon as IconName}
--+          iconName={habit.icon}
--           onPress={handlePressHabit}
--           onLongPress={() => router.push(`/habit/edit?id=${habit.id}` as Href)}
--         />
--diff --git a/package.json b/package.json
--index e30f2f2..47fc01a 100644
----- a/package.json
--+++ b/package.json
--@@ -58,6 +58,7 @@
--     "react-native-reanimated": "~4.1.1",
--     "react-native-safe-area-context": "~5.6.0",
--     "react-native-screens": "~4.16.0",
--+    "react-native-svg": "15.12.1",
--     "react-native-web": "~0.21.0",
--     "react-native-worklets": "0.5.1",
--     "tamagui": "1.138.5",
--@@ -78,6 +79,7 @@
--     "jest": "~29.7.0",
--     "jest-expo": "~54.0.14",
--     "prettier": "^3.6.2",
--+    "react-native-svg-transformer": "^1.5.2",
--     "react-test-renderer": "19.1.0",
--     "ts-jest": "^29.4.5",
--     "typescript": "~5.9.2"
--diff --git a/pnpm-lock.yaml b/pnpm-lock.yaml
--index ac0285b..85f2ea0 100644
----- a/pnpm-lock.yaml
--+++ b/pnpm-lock.yaml
--@@ -37,7 +37,7 @@ importers:
--         version: 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--       '@tamagui/lucide-icons':
--         specifier: 1.138.5
---        version: 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--+        version: 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--       '@tamagui/portal':
--         specifier: 1.138.5
--         version: 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--@@ -134,6 +134,9 @@ importers:
--       react-native-screens:
--         specifier: ~4.16.0
--         version: 4.16.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--+      react-native-svg:
--+        specifier: 15.12.1
--+        version: 15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--       react-native-web:
--         specifier: ~0.21.0
--         version: 0.21.2(react-dom@19.1.0(react@19.1.0))(react@19.1.0)
--@@ -189,6 +192,9 @@ importers:
--       prettier:
--         specifier: ^3.6.2
--         version: 3.6.2
--+      react-native-svg-transformer:
--+        specifier: ^1.5.2
--+        version: 1.5.2(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(typescript@5.9.3)
--       react-test-renderer:
--         specifier: 19.1.0
--         version: 19.1.0(react@19.1.0)
--@@ -1680,6 +1686,80 @@ packages:
--     resolution: {integrity: sha512-KSdY7xb2L0DlLmlYzIOghdw/na4gsMcqJ8u4sD6tOQJr+x3hLujU9s4R8N3ob84/1bkvpvlU5PYKa1ae+OICnw==}
--     engines: {node: '>=20.0.0'}
-- 
--+  '@svgr/babel-plugin-add-jsx-attribute@8.0.0':
--+    resolution: {integrity: sha512-b9MIk7yhdS1pMCZM8VeNfUlSKVRhsHZNMl5O9SfaX0l0t5wjdgu4IDzGB8bpnGBBOjGST3rRFVsaaEtI4W6f7g==}
--+    engines: {node: '>=14'}
--+    peerDependencies:
--+      '@babel/core': ^7.0.0-0
--+
--+  '@svgr/babel-plugin-remove-jsx-attribute@8.0.0':
--+    resolution: {integrity: sha512-BcCkm/STipKvbCl6b7QFrMh/vx00vIP63k2eM66MfHJzPr6O2U0jYEViXkHJWqXqQYjdeA9cuCl5KWmlwjDvbA==}
--+    engines: {node: '>=14'}
--+    peerDependencies:
--+      '@babel/core': ^7.0.0-0
--+
--+  '@svgr/babel-plugin-remove-jsx-empty-expression@8.0.0':
--+    resolution: {integrity: sha512-5BcGCBfBxB5+XSDSWnhTThfI9jcO5f0Ai2V24gZpG+wXF14BzwxxdDb4g6trdOux0rhibGs385BeFMSmxtS3uA==}
--+    engines: {node: '>=14'}
--+    peerDependencies:
--+      '@babel/core': ^7.0.0-0
--+
--+  '@svgr/babel-plugin-replace-jsx-attribute-value@8.0.0':
--+    resolution: {integrity: sha512-KVQ+PtIjb1BuYT3ht8M5KbzWBhdAjjUPdlMtpuw/VjT8coTrItWX6Qafl9+ji831JaJcu6PJNKCV0bp01lBNzQ==}
--+    engines: {node: '>=14'}
--+    peerDependencies:
--+      '@babel/core': ^7.0.0-0
--+
--+  '@svgr/babel-plugin-svg-dynamic-title@8.0.0':
--+    resolution: {integrity: sha512-omNiKqwjNmOQJ2v6ge4SErBbkooV2aAWwaPFs2vUY7p7GhVkzRkJ00kILXQvRhA6miHnNpXv7MRnnSjdRjK8og==}
--+    engines: {node: '>=14'}
--+    peerDependencies:
--+      '@babel/core': ^7.0.0-0
--+
--+  '@svgr/babel-plugin-svg-em-dimensions@8.0.0':
--+    resolution: {integrity: sha512-mURHYnu6Iw3UBTbhGwE/vsngtCIbHE43xCRK7kCw4t01xyGqb2Pd+WXekRRoFOBIY29ZoOhUCTEweDMdrjfi9g==}
--+    engines: {node: '>=14'}
--+    peerDependencies:
--+      '@babel/core': ^7.0.0-0
--+
--+  '@svgr/babel-plugin-transform-react-native-svg@8.1.0':
--+    resolution: {integrity: sha512-Tx8T58CHo+7nwJ+EhUwx3LfdNSG9R2OKfaIXXs5soiy5HtgoAEkDay9LIimLOcG8dJQH1wPZp/cnAv6S9CrR1Q==}
--+    engines: {node: '>=14'}
--+    peerDependencies:
--+      '@babel/core': ^7.0.0-0
--+
--+  '@svgr/babel-plugin-transform-svg-component@8.0.0':
--+    resolution: {integrity: sha512-DFx8xa3cZXTdb/k3kfPeaixecQLgKh5NVBMwD0AQxOzcZawK4oo1Jh9LbrcACUivsCA7TLG8eeWgrDXjTMhRmw==}
--+    engines: {node: '>=12'}
--+    peerDependencies:
--+      '@babel/core': ^7.0.0-0
--+
--+  '@svgr/babel-preset@8.1.0':
--+    resolution: {integrity: sha512-7EYDbHE7MxHpv4sxvnVPngw5fuR6pw79SkcrILHJ/iMpuKySNCl5W1qcwPEpU+LgyRXOaAFgH0KhwD18wwg6ug==}
--+    engines: {node: '>=14'}
--+    peerDependencies:
--+      '@babel/core': ^7.0.0-0
--+
--+  '@svgr/core@8.1.0':
--+    resolution: {integrity: sha512-8QqtOQT5ACVlmsvKOJNEaWmRPmcojMOzCz4Hs2BGG/toAp/K38LcsMRyLp349glq5AzJbCEeimEoxaX6v/fLrA==}
--+    engines: {node: '>=14'}
--+
--+  '@svgr/hast-util-to-babel-ast@8.0.0':
--+    resolution: {integrity: sha512-EbDKwO9GpfWP4jN9sGdYwPBU0kdomaPIL2Eu4YwmgP+sJeXT+L7bMwJUBnhzfH8Q2qMBqZ4fJwpCyYsAN3mt2Q==}
--+    engines: {node: '>=14'}
--+
--+  '@svgr/plugin-jsx@8.1.0':
--+    resolution: {integrity: sha512-0xiIyBsLlr8quN+WyuxooNW9RJ0Dpr8uOnH/xrCVO8GLUcwHISwj1AG0k+LFzteTkAA0GbX0kj9q6Dk70PTiPA==}
--+    engines: {node: '>=14'}
--+    peerDependencies:
--+      '@svgr/core': '*'
--+
--+  '@svgr/plugin-svgo@8.1.0':
--+    resolution: {integrity: sha512-Ywtl837OGO9pTLIN/onoWLmDQ4zFUycI1g76vuKGEz6evR/ZTJlJuz3G/fIkb6OVBJ2g0o6CGJzaEjfmEo3AHA==}
--+    engines: {node: '>=14'}
--+    peerDependencies:
--+      '@svgr/core': '*'
--+
--   '@tamagui/accordion@1.138.5':
--     resolution: {integrity: sha512-hUxHRxgKi3oMd+mQCsgZSlcO/ESO++8vepGRmWtGcOFcDbXG8eSBEjk3XLkdXMNp5oAXs6E9tsc96VAjnnjeTw==}
--     peerDependencies:
--@@ -2237,6 +2317,10 @@ packages:
--     resolution: {integrity: sha512-XCuKFP5PS55gnMVu3dty8KPatLqUoy/ZYzDzAGCQ8JNFCkLXzmI7vNHCR+XpbZaMWQK/vQubr7PkYq8g470J/A==}
--     engines: {node: '>= 10'}
-- 
--+  '@trysound/sax@0.2.0':
--+    resolution: {integrity: sha512-L7z9BgrNEcYyUYtF+HaEfiS5ebkh9jXqbszz7pC0hRBPaatV0XjSD3+eHrpqFemQfgwiFF0QPIarnIihIDn7OA==}
--+    engines: {node: '>=10.13.0'}
--+
--   '@tybys/wasm-util@0.10.1':
--     resolution: {integrity: sha512-9tTaPJLSiejZKx+Bmog4uSubteqTvFrVrURwkmHixBo0G4seD0zUxp98E1DzUBJxLQ3NPwXrGKDiVjwx/DpPsg==}
-- 
--@@ -2969,6 +3053,15 @@ packages:
--   core-js-compat@3.46.0:
--     resolution: {integrity: sha512-p9hObIIEENxSV8xIu+V68JjSeARg6UVMG5mR+JEUguG3sI6MsiS1njz2jHmyJDvA+8jX/sytkBHup6kxhM9law==}
-- 
--+  cosmiconfig@8.3.6:
--+    resolution: {integrity: sha512-kcZ6+W5QzcJ3P1Mt+83OUv/oHFqZHIx8DuxG6eZ5RGMERoLqp4BuGjhHLYGK+Kf5XVkQvqBSmAy/nGWN3qDgEA==}
--+    engines: {node: '>=14'}
--+    peerDependencies:
--+      typescript: '>=4.9.5'
--+    peerDependenciesMeta:
--+      typescript:
--+        optional: true
--+
--   create-jest@29.7.0:
--     resolution: {integrity: sha512-Adz2bdH0Vq3F53KEMJOoftQFutWCukm6J24wbPWRO4k1kMY7gS7ds/uoJkNuV8wDCtWWnuwGcJwpWcih+zEW1Q==}
--     engines: {node: ^14.15.0 || ^16.10.0 || >=18.0.0}
--@@ -2995,10 +3088,22 @@ packages:
--     resolution: {integrity: sha512-tRpdppF7TRazZrjJ6v3stzv93qxRcSsFmW6cX0Zm2NVKpxE1WV1HblnghVv9TreireHkqI/VDEsfolRF1p6y7Q==}
--     engines: {node: '>=8.0.0'}
-- 
--+  css-tree@2.2.1:
--+    resolution: {integrity: sha512-OA0mILzGc1kCOCSJerOeqDxDQ4HOh+G8NbOJFOTgOCzpw7fCBubk0fEyxp8AgOL/jvLgYA/uV0cMbe43ElF1JA==}
--+    engines: {node: ^10 || ^12.20.0 || ^14.13.0 || >=15.0.0, npm: '>=7.0.0'}
--+
--+  css-tree@2.3.1:
--+    resolution: {integrity: sha512-6Fv1DV/TYw//QF5IzQdqsNDjx/wc8TrMBZsqjL9eW01tWb7R7k/mq+/VXfJCl7SoD5emsJop9cOByJZfs8hYIw==}
--+    engines: {node: ^10 || ^12.20.0 || ^14.13.0 || >=15.0.0}
--+
--   css-what@6.2.2:
--     resolution: {integrity: sha512-u/O3vwbptzhMs3L1fQE82ZSLHQQfto5gyZzwteVIEyeaY5Fc7R4dapF/BvRoSYFeqfBk4m0V1Vafq5Pjv25wvA==}
--     engines: {node: '>= 6'}
-- 
--+  csso@5.0.5:
--+    resolution: {integrity: sha512-0LrrStPOdJj+SPCCrGhzryycLjwcgUSHBtxNA8aIDxf0GLsRh1cKYhB00Gd1lDOS4yGH69+SNn13+TWbVHETFQ==}
--+    engines: {node: ^10 || ^12.20.0 || ^14.13.0 || >=15.0.0, npm: '>=7.0.0'}
--+
--   cssom@0.3.8:
--     resolution: {integrity: sha512-b0tGHbfegbhPJpxpiBPU2sCkigAqtM9O121le6bbOlgyV+NyGyCmVfJ6QW9eRjz8CpNfWEOYBIMIGRYkLwsIYg==}
-- 
--@@ -3151,6 +3256,9 @@ packages:
--   domutils@3.2.2:
--     resolution: {integrity: sha512-6kZKyUajlDuqlHKVX1w7gyslj9MPIXzIFiz/rGu35uC1wMi+kMhQwGhl4lt9unC9Vb9INnY9Z3/ZA3+FhASLaw==}
-- 
--+  dot-case@3.0.4:
--+    resolution: {integrity: sha512-Kv5nKlh6yRrdrGvxeJ2e5y2eRUpkUosIW4A2AS38zwSz27zu7ufDwQPi5Jhs3XAlGNetl3bmnGhQsMtkKJnj3w==}
--+
--   dotenv-expand@11.0.7:
--     resolution: {integrity: sha512-zIHwmZPRshsCdpMDyVsqGmgyP0yT8GAgXUnkdAoJisxvf33k7yO6OuoKmcTGuXPWSsm8Oh88nZicRLA9Y0rUeA==}
--     engines: {node: '>=12'}
--@@ -4615,6 +4723,9 @@ packages:
--     resolution: {integrity: sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==}
--     hasBin: true
-- 
--+  lower-case@2.0.2:
--+    resolution: {integrity: sha512-7fm3l3NAF9WfN6W3JOmf5drwpVqX78JtoGJ3A6W0a6ZnldM41w2fV5D490psKFTpMds8TJse/eHLFFsNHHjHgg==}
--+
--   lru-cache@10.4.3:
--     resolution: {integrity: sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==}
-- 
--@@ -4649,6 +4760,12 @@ packages:
--   mdn-data@2.0.14:
--     resolution: {integrity: sha512-dn6wd0uw5GsdswPFfsgMp5NSB0/aDe6fK94YJV/AJDYXL6HVLWBsxeq7js7Ad+mU2K9LAlwpk6kN2D5mwCPVow==}
-- 
--+  mdn-data@2.0.28:
--+    resolution: {integrity: sha512-aylIc7Z9y4yzHYAJNuESG3hfhC+0Ibp/MAMiaOZgNv4pmEdFyfZhhhny4MNiAfWdBQ1RQ2mfDWmM1x8SvGyp8g==}
--+
--+  mdn-data@2.0.30:
--+    resolution: {integrity: sha512-GaqWWShW4kv/G9IEucWScBx9G1/vsFZZJUO+tD26M8J8z3Kw5RDQjaoZe03YAClgeS/SWPOcb4nkFBTEi5DUEA==}
--+
--   memoize-one@5.2.1:
--     resolution: {integrity: sha512-zYiwtZUcYyXKo/np96AGZAckk+FWWsUdJ3cHGGmld7+AhvcWmQyGCYUh1hc4Q/pkOhb65dQR/pqCyK0cOaHz4Q==}
-- 
--@@ -4878,6 +4995,9 @@ packages:
--   nested-error-stacks@2.0.1:
--     resolution: {integrity: sha512-SrQrok4CATudVzBS7coSz26QRSmlK9TzzoFbeKfcPBUFPjcQM9Rqvr/DlJkOrwI/0KcgvMub1n1g5Jt9EgRn4A==}
-- 
--+  no-case@3.0.4:
--+    resolution: {integrity: sha512-fgAN3jGAh+RoxUGZHTSOLJIqUc2wmoBwGR4tbpNAKmmovFoWq0OdRkb0VkldReO2a2iBT/OEulG9XSUc10r3zg==}
--+
--   node-fetch@2.7.0:
--     resolution: {integrity: sha512-c4FRfUm/dbcWZ7U+1Wq0AwCyFL+3nt2bEw05wfxSz+DWpWsitgmSgYmy2dQdWyKC1694ELPqMs/YzUSNozLt8A==}
--     engines: {node: 4.x || >=6.0.0}
--@@ -5044,6 +5164,9 @@ packages:
--     resolution: {integrity: sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==}
--     engines: {node: '>= 0.8'}
-- 
--+  path-dirname@1.0.2:
--+    resolution: {integrity: sha512-ALzNPpyNq9AqXMBjeymIjFDAkAFH06mHJH/cSBHAgU0s4vfpBn6b2nf8tiRLvagKD8RbTpq2FKTBg7cl9l3c7Q==}
--+
--   path-exists@4.0.0:
--     resolution: {integrity: sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==}
--     engines: {node: '>=8'}
--@@ -5268,8 +5391,14 @@ packages:
--       react: '*'
--       react-native: '*'
-- 
---  react-native-svg@15.15.0:
---    resolution: {integrity: sha512-/Wx6F/IZ88B/GcF88bK8K7ZseJDYt+7WGaiggyzLvTowChQ8BM5idmcd4pK+6QJP6a6DmzL2sfOMukFUn/NArg==}
--+  react-native-svg-transformer@1.5.2:
--+    resolution: {integrity: sha512-eW4hOtrd30s4SRdN4X1XYxTCu1czsxDGQKmfQ3RFbZMN5yw4ZmiKGGr+lXbQW4uDGZvSoGd9FHL1f+rgGoKg8Q==}
--+    peerDependencies:
--+      react-native: '>=0.59.0'
--+      react-native-svg: '>=12.0.0'
--+
--+  react-native-svg@15.12.1:
--+    resolution: {integrity: sha512-vCuZJDf8a5aNC2dlMovEv4Z0jjEUET53lm/iILFnFewa15b4atjVxU6Wirm6O9y6dEsdjDZVD7Q3QM4T1wlI8g==}
--     peerDependencies:
--       react: '*'
--       react-native: '*'
--@@ -5605,6 +5734,9 @@ packages:
--     resolution: {integrity: sha512-h+z7HKHYXj6wJU+AnS/+IH8Uh9fdcX1Lrhg1/VMdf9PwoBQXFcXiAdsy2tSK0P6gKwJLXp02r90ahUCqHk9rrw==}
--     engines: {node: '>=8.0.0'}
-- 
--+  snake-case@3.0.4:
--+    resolution: {integrity: sha512-LAOh4z89bGQvl9pFfNF8V146i7o7/CqFPbqzYgP+yYzDIDeS9HaNFtXABamRW+AQzEVODcvE79ljJ+8a9YSdMg==}
--+
--   source-map-js@1.2.1:
--     resolution: {integrity: sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==}
--     engines: {node: '>=0.10.0'}
--@@ -5778,6 +5910,14 @@ packages:
--     resolution: {integrity: sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==}
--     engines: {node: '>= 0.4'}
-- 
--+  svg-parser@2.0.4:
--+    resolution: {integrity: sha512-e4hG1hRwoOdRb37cIMSgzNsxyzKfayW6VOflrwvR+/bzrkyxY/31WkbgnQpgtrNp1SdpJvpUAGTa/ZoiPNDuRQ==}
--+
--+  svgo@3.3.2:
--+    resolution: {integrity: sha512-OoohrmuUlBs8B8o6MB2Aevn+pRIH9zDALSR+6hhqVfa6fRwG/Qw9VUMSMW9VNg2CFc/MTIfabtdOVl9ODIJjpw==}
--+    engines: {node: '>=14.0.0'}
--+    hasBin: true
--+
--   symbol-tree@3.2.4:
--     resolution: {integrity: sha512-9QNk5KwDF+Bvz+PyObkmSYjI5ksVUYtjW7AU22r2NKcfLJcXp96hkDWU3+XndOsUb+AQ9QhfzfCT2O+CNWT5Tw==}
-- 
--@@ -8166,6 +8306,85 @@ snapshots:
--       - bufferutil
--       - utf-8-validate
-- 
--+  '@svgr/babel-plugin-add-jsx-attribute@8.0.0(@babel/core@7.28.5)':
--+    dependencies:
--+      '@babel/core': 7.28.5
--+
--+  '@svgr/babel-plugin-remove-jsx-attribute@8.0.0(@babel/core@7.28.5)':
--+    dependencies:
--+      '@babel/core': 7.28.5
--+
--+  '@svgr/babel-plugin-remove-jsx-empty-expression@8.0.0(@babel/core@7.28.5)':
--+    dependencies:
--+      '@babel/core': 7.28.5
--+
--+  '@svgr/babel-plugin-replace-jsx-attribute-value@8.0.0(@babel/core@7.28.5)':
--+    dependencies:
--+      '@babel/core': 7.28.5
--+
--+  '@svgr/babel-plugin-svg-dynamic-title@8.0.0(@babel/core@7.28.5)':
--+    dependencies:
--+      '@babel/core': 7.28.5
--+
--+  '@svgr/babel-plugin-svg-em-dimensions@8.0.0(@babel/core@7.28.5)':
--+    dependencies:
--+      '@babel/core': 7.28.5
--+
--+  '@svgr/babel-plugin-transform-react-native-svg@8.1.0(@babel/core@7.28.5)':
--+    dependencies:
--+      '@babel/core': 7.28.5
--+
--+  '@svgr/babel-plugin-transform-svg-component@8.0.0(@babel/core@7.28.5)':
--+    dependencies:
--+      '@babel/core': 7.28.5
--+
--+  '@svgr/babel-preset@8.1.0(@babel/core@7.28.5)':
--+    dependencies:
--+      '@babel/core': 7.28.5
--+      '@svgr/babel-plugin-add-jsx-attribute': 8.0.0(@babel/core@7.28.5)
--+      '@svgr/babel-plugin-remove-jsx-attribute': 8.0.0(@babel/core@7.28.5)
--+      '@svgr/babel-plugin-remove-jsx-empty-expression': 8.0.0(@babel/core@7.28.5)
--+      '@svgr/babel-plugin-replace-jsx-attribute-value': 8.0.0(@babel/core@7.28.5)
--+      '@svgr/babel-plugin-svg-dynamic-title': 8.0.0(@babel/core@7.28.5)
--+      '@svgr/babel-plugin-svg-em-dimensions': 8.0.0(@babel/core@7.28.5)
--+      '@svgr/babel-plugin-transform-react-native-svg': 8.1.0(@babel/core@7.28.5)
--+      '@svgr/babel-plugin-transform-svg-component': 8.0.0(@babel/core@7.28.5)
--+
--+  '@svgr/core@8.1.0(typescript@5.9.3)':
--+    dependencies:
--+      '@babel/core': 7.28.5
--+      '@svgr/babel-preset': 8.1.0(@babel/core@7.28.5)
--+      camelcase: 6.3.0
--+      cosmiconfig: 8.3.6(typescript@5.9.3)
--+      snake-case: 3.0.4
--+    transitivePeerDependencies:
--+      - supports-color
--+      - typescript
--+
--+  '@svgr/hast-util-to-babel-ast@8.0.0':
--+    dependencies:
--+      '@babel/types': 7.28.5
--+      entities: 4.5.0
--+
--+  '@svgr/plugin-jsx@8.1.0(@svgr/core@8.1.0(typescript@5.9.3))':
--+    dependencies:
--+      '@babel/core': 7.28.5
--+      '@svgr/babel-preset': 8.1.0(@babel/core@7.28.5)
--+      '@svgr/core': 8.1.0(typescript@5.9.3)
--+      '@svgr/hast-util-to-babel-ast': 8.0.0
--+      svg-parser: 2.0.4
--+    transitivePeerDependencies:
--+      - supports-color
--+
--+  '@svgr/plugin-svgo@8.1.0(@svgr/core@8.1.0(typescript@5.9.3))(typescript@5.9.3)':
--+    dependencies:
--+      '@svgr/core': 8.1.0(typescript@5.9.3)
--+      cosmiconfig: 8.3.6(typescript@5.9.3)
--+      deepmerge: 4.3.1
--+      svgo: 3.3.2
--+    transitivePeerDependencies:
--+      - typescript
--+
--   '@tamagui/accordion@1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)':
--     dependencies:
--       '@tamagui/collapsible': 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--@@ -8587,11 +8806,11 @@ snapshots:
--     transitivePeerDependencies:
--       - react-dom
-- 
---  '@tamagui/helpers-icon@1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)':
--+  '@tamagui/helpers-icon@1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)':
--     dependencies:
--       '@tamagui/core': 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--       react: 19.1.0
---      react-native-svg: 15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--+      react-native-svg: 15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--     transitivePeerDependencies:
--       - react-dom
--       - react-native
--@@ -8669,12 +8888,12 @@ snapshots:
--       - react-dom
--       - react-native
-- 
---  '@tamagui/lucide-icons@1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)':
--+  '@tamagui/lucide-icons@1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)':
--     dependencies:
--       '@tamagui/core': 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
---      '@tamagui/helpers-icon': 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--+      '@tamagui/helpers-icon': 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--       react: 19.1.0
---      react-native-svg: 15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--+      react-native-svg: 15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--     transitivePeerDependencies:
--       - react-dom
--       - react-native
--@@ -9294,6 +9513,8 @@ snapshots:
-- 
--   '@tootallnate/once@2.0.0': {}
-- 
--+  '@trysound/sax@0.2.0': {}
--+
--   '@tybys/wasm-util@0.10.1':
--     dependencies:
--       tslib: 2.8.1
--@@ -10151,6 +10372,15 @@ snapshots:
--     dependencies:
--       browserslist: 4.28.0
-- 
--+  cosmiconfig@8.3.6(typescript@5.9.3):
--+    dependencies:
--+      import-fresh: 3.3.1
--+      js-yaml: 4.1.1
--+      parse-json: 5.2.0
--+      path-type: 4.0.0
--+    optionalDependencies:
--+      typescript: 5.9.3
--+
--   create-jest@29.7.0(@types/node@24.10.1):
--     dependencies:
--       '@jest/types': 29.6.3
--@@ -10197,8 +10427,22 @@ snapshots:
--       mdn-data: 2.0.14
--       source-map: 0.6.1
-- 
--+  css-tree@2.2.1:
--+    dependencies:
--+      mdn-data: 2.0.28
--+      source-map-js: 1.2.1
--+
--+  css-tree@2.3.1:
--+    dependencies:
--+      mdn-data: 2.0.30
--+      source-map-js: 1.2.1
--+
--   css-what@6.2.2: {}
-- 
--+  csso@5.0.5:
--+    dependencies:
--+      css-tree: 2.2.1
--+
--   cssom@0.3.8: {}
-- 
--   cssom@0.5.0: {}
--@@ -10321,6 +10565,11 @@ snapshots:
--       domelementtype: 2.3.0
--       domhandler: 5.0.3
-- 
--+  dot-case@3.0.4:
--+    dependencies:
--+      no-case: 3.0.4
--+      tslib: 2.8.1
--+
--   dotenv-expand@11.0.7:
--     dependencies:
--       dotenv: 16.4.7
--@@ -12224,6 +12473,10 @@ snapshots:
--     dependencies:
--       js-tokens: 4.0.0
-- 
--+  lower-case@2.0.2:
--+    dependencies:
--+      tslib: 2.8.1
--+
--   lru-cache@10.4.3: {}
-- 
--   lru-cache@11.2.4: {}
--@@ -12252,6 +12505,10 @@ snapshots:
-- 
--   mdn-data@2.0.14: {}
-- 
--+  mdn-data@2.0.28: {}
--+
--+  mdn-data@2.0.30: {}
--+
--   memoize-one@5.2.1: {}
-- 
--   memoize-one@6.0.0: {}
--@@ -12681,6 +12938,11 @@ snapshots:
-- 
--   nested-error-stacks@2.0.1: {}
-- 
--+  no-case@3.0.4:
--+    dependencies:
--+      lower-case: 2.0.2
--+      tslib: 2.8.1
--+
--   node-fetch@2.7.0:
--     dependencies:
--       whatwg-url: 5.0.0
--@@ -12863,6 +13125,8 @@ snapshots:
-- 
--   parseurl@1.3.3: {}
-- 
--+  path-dirname@1.0.2: {}
--+
--   path-exists@4.0.0: {}
-- 
--   path-is-absolute@1.0.1: {}
--@@ -13069,7 +13333,19 @@ snapshots:
--       react-native-is-edge-to-edge: 1.2.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--       warn-once: 0.1.1
-- 
---  react-native-svg@15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0):
--+  react-native-svg-transformer@1.5.2(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(typescript@5.9.3):
--+    dependencies:
--+      '@svgr/core': 8.1.0(typescript@5.9.3)
--+      '@svgr/plugin-jsx': 8.1.0(@svgr/core@8.1.0(typescript@5.9.3))
--+      '@svgr/plugin-svgo': 8.1.0(@svgr/core@8.1.0(typescript@5.9.3))(typescript@5.9.3)
--+      path-dirname: 1.0.2
--+      react-native: 0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0)
--+      react-native-svg: 15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
--+    transitivePeerDependencies:
--+      - supports-color
--+      - typescript
--+
--+  react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0):
--     dependencies:
--       css-select: 5.2.2
--       css-tree: 1.1.3
--@@ -13496,6 +13772,11 @@ snapshots:
-- 
--   slugify@1.6.6: {}
-- 
--+  snake-case@3.0.4:
--+    dependencies:
--+      dot-case: 3.0.4
--+      tslib: 2.8.1
--+
--   source-map-js@1.2.1: {}
-- 
--   source-map-support@0.5.13:
--@@ -13679,6 +13960,18 @@ snapshots:
-- 
--   supports-preserve-symlinks-flag@1.0.0: {}
-- 
--+  svg-parser@2.0.4: {}
--+
--+  svgo@3.3.2:
--+    dependencies:
--+      '@trysound/sax': 0.2.0
--+      commander: 7.2.0
--+      css-select: 5.2.2
--+      css-tree: 2.3.1
--+      css-what: 6.2.2
--+      csso: 5.0.5
--+      picocolors: 1.1.1
--+
--   symbol-tree@3.2.4: {}
-- 
--   synckit@0.9.3:
--diff --git a/src/features/habit/HabitButton.tsx b/src/features/habit/HabitButton.tsx
--index 29657a0..f695e31 100644
----- a/src/features/habit/HabitButton.tsx
--+++ b/src/features/habit/HabitButton.tsx
--@@ -1,10 +1,9 @@
-- import { Text, YStack, useTheme } from 'tamagui';
-- import { Ionicons } from '@expo/vector-icons';
-- import { Pressable, Animated, Easing } from 'react-native';
---import { useEffect, useRef, type ComponentProps } from 'react';
--+import { useEffect, useRef } from 'react';
-- import { useTranslation } from '@/src/core/i18n/i18n';
---
---type IconName = ComponentProps<typeof Ionicons>['name'];
--+import { normalizeHabitIconName } from '@/src/features/habit/habitIcons';
-- 
-- type Props = {
--   /**
--@@ -15,18 +14,19 @@ type Props = {
--   label: string;
--   size: 'big' | 'medium';
--   active: boolean;
---  iconName?: IconName;
--+  iconName?: string | null;
--   onPress: () => void;
--   onLongPress?: () => void;
-- };
-- 
---export function HabitButton({ label, size, active, iconName = 'checkbox', onPress, onLongPress }: Props) {
--+export function HabitButton({ label, size, active, iconName, onPress, onLongPress }: Props) {
--   const height = size === 'big' ? 160 : 110;
--   const theme = useTheme();
--   const { t } = useTranslation();
--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
--   const bg = theme?.background?.val?.toString() ?? '#000';
--   const border = theme?.gray?.val?.toString() ?? '#222';
--+  const resolvedIcon = normalizeHabitIconName(iconName);
--   const glow = useRef(new Animated.Value(0)).current;
--   const pressScale = useRef(new Animated.Value(1)).current;
-- 
--@@ -112,7 +112,7 @@ export function HabitButton({ label, size, active, iconName = 'checkbox', onPres
--             transform: [{ scale: pressScale }],
--           }}>
--           <Ionicons
---            name={iconName}
--+            name={resolvedIcon}
--             size={size === 'big' ? 52 : 36}
--             color={active ? '#000000' : '#EEEEEE'}
--           />
--diff --git a/src/features/habit/IconPicker.tsx b/src/features/habit/IconPicker.tsx
--index 97959d0..f38f52b 100644
----- a/src/features/habit/IconPicker.tsx
--+++ b/src/features/habit/IconPicker.tsx
--@@ -1,88 +1,24 @@
-- import { memo, useEffect, useMemo, useState } from 'react';
-- import { Button, Stack, Text, XStack, YStack, ScrollView, useTheme } from 'tamagui';
--+import { Ionicons } from '@expo/vector-icons';
-- 
-- import { useTranslation } from '@/src/core/i18n/i18n';
--+import {
--+  HABIT_ICON_CATEGORIES,
--+  type HabitIconName,
--+  type IconCategoryId,
--+  normalizeHabitIconName,
--+} from '@/src/features/habit/habitIcons';
-- 
-- export type IconPickerProps = {
--   value?: string | null;
---  onChange: (value: string) => void;
--+  onChange: (value: HabitIconName) => void;
-- };
-- 
---// 使ってよいアイコンIDの一覧（既存IDは変更しない）
---type IconId =
---  | 'flame'
---  | 'checkbox'
---  | 'sparkles'
---  | 'water'
---  | 'walk'
---  | 'moon'
---  | 'fitness'
---  | 'book'
---  | 'brush'
---  | 'tv'
---  | 'clean'
---  | 'laundry'
---  | 'pc'
---  | 'study'
---  | 'language';
---
---// カテゴリIDとタイトルキーを型で縛る
---type IconCategoryId = 'basic' | 'health' | 'learning';
---type IconCategoryTitleKey = 'iconCatBasic' | 'iconCatHealth' | 'iconCatLearning';
---
---type IconOption = {
---  id: IconId; // DB に保存する値（習慣.icon）
---  emoji: string;
---  label: string; // アクセシビリティ用（英語固定）
---};
---
---type IconCategory = {
---  id: IconCategoryId;
---  titleKey: IconCategoryTitleKey; // i18n キー
---  icons: IconOption[];
---};
---
---// 既存IDは変えない（既存データのアイコンを壊さないため）
---const ICON_CATEGORIES: IconCategory[] = [
---  {
---    id: 'basic',
---    titleKey: 'iconCatBasic',
---    icons: [
---      { id: 'flame', emoji: '🔥', label: 'Streak' },
---      { id: 'checkbox', emoji: '☑️', label: 'Task' },
---      { id: 'sparkles', emoji: '✨', label: 'Shine' },
---      { id: 'clean', emoji: '🧹', label: 'Cleaning' },
---      { id: 'laundry', emoji: '🧺', label: 'Laundry' },
---    ],
---  },
---  {
---    id: 'health',
---    titleKey: 'iconCatHealth',
---    icons: [
---      { id: 'water', emoji: '💧', label: 'Water' },
---      { id: 'walk', emoji: '🚶‍♂️', label: 'Walk' },
---      { id: 'moon', emoji: '🌙', label: 'Sleep' },
---      { id: 'fitness', emoji: '🏋️‍♂️', label: 'Workout' },
---    ],
---  },
---  {
---    id: 'learning',
---    titleKey: 'iconCatLearning',
---    icons: [
---      { id: 'book', emoji: '📚', label: 'Read' },
---      { id: 'brush', emoji: '🖌️', label: 'Art' },
---      { id: 'tv', emoji: '📺', label: 'Media' },
---      { id: 'pc', emoji: '💻', label: 'PC work' },
---      { id: 'study', emoji: '✏️', label: 'Study' },
---      { id: 'language', emoji: '🌐', label: 'Language' },
---    ],
---  },
---];
---
-- // iconId から所属カテゴリを検索
-- function findCategoryIdByIconId(iconId: string | null | undefined): IconCategoryId | null {
--   if (!iconId) return null;
---  const category = ICON_CATEGORIES.find((cat) => cat.icons.some((opt) => opt.id === iconId));
--+  const category = HABIT_ICON_CATEGORIES.find((cat) => cat.icons.some((opt) => opt.id === iconId));
--   return category?.id ?? null;
-- }
-- 
--@@ -91,21 +27,23 @@ export const IconPicker = memo(function IconPicker({ value, onChange }: IconPick
--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
--   const { t } = useTranslation();
-- 
--+  const normalizedValue = normalizeHabitIconName(value);
--+
--   // 初期カテゴリは現在の value に合わせる（なければ basic）
--   const [activeCategoryId, setActiveCategoryId] = useState<IconCategoryId>(() => {
---    const fromValue = findCategoryIdByIconId(value);
---    return fromValue ?? (ICON_CATEGORIES[0]?.id ?? 'basic');
--+    const fromValue = findCategoryIdByIconId(normalizedValue);
--+    return fromValue ?? (HABIT_ICON_CATEGORIES[0]?.id ?? 'basic');
--   });
-- 
--   // value が変わったらカテゴリも追従
--   useEffect(() => {
---    const catId = findCategoryIdByIconId(value);
--+    const catId = findCategoryIdByIconId(normalizeHabitIconName(value));
--     // value が変わったときだけ初期カテゴリを合わせる（タブ操作で強制リセットしない）
--     setActiveCategoryId((prev) => (catId && catId !== prev ? catId : prev));
--   }, [value]);
-- 
--   const activeCategory = useMemo(
---    () => ICON_CATEGORIES.find((cat) => cat.id === activeCategoryId) ?? ICON_CATEGORIES[0],
--+    () => HABIT_ICON_CATEGORIES.find((cat) => cat.id === activeCategoryId) ?? HABIT_ICON_CATEGORIES[0],
--     [activeCategoryId],
--   );
-- 
--@@ -113,7 +51,7 @@ export const IconPicker = memo(function IconPicker({ value, onChange }: IconPick
--     <YStack gap="$4">
--       {/* カテゴリタブ */}
--       <XStack gap="$2" flexWrap="wrap" justifyContent="center">
---        {ICON_CATEGORIES.map((cat) => {
--+        {HABIT_ICON_CATEGORIES.map((cat) => {
--           const isActive = cat.id === activeCategoryId;
--           return (
--             <Button
--@@ -144,7 +82,7 @@ export const IconPicker = memo(function IconPicker({ value, onChange }: IconPick
--           contentContainerStyle={{ paddingVertical: 4 }}>
--           <XStack flexWrap="wrap" gap="$3" justifyContent="center" width="100%">
--             {activeCategory.icons.map((opt) => {
---              const active = value === opt.id;
--+              const active = normalizedValue === opt.id;
--               return (
--                 <Stack
--                   key={opt.id}
--@@ -167,9 +105,11 @@ export const IconPicker = memo(function IconPicker({ value, onChange }: IconPick
--                     width="100%"
--                     height="100%"
--                     onPress={() => onChange(opt.id)}>
---                    <Text fontSize={28} textAlign="center">
---                      {opt.emoji}
---                    </Text>
--+                    <Ionicons
--+                      name={opt.id}
--+                      size={26}
--+                      color={active ? '#000000' : '#EEEEEE'}
--+                    />
--                   </Button>
--                 </Stack>
--               );
-diff --git "a/20251222_1650_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251222_1650_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-deleted file mode 100644
-index ff29ad0..0000000
---- "a/20251222_1650_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-+++ /dev/null
-@@ -1,58 +0,0 @@
--diff --git a/app/index.tsx b/app/index.tsx
--index 0278ae1..824ca1a 100644
----- a/app/index.tsx
--+++ b/app/index.tsx
--@@ -1,20 +1,20 @@
---import { useEffect, useRef, useState } from 'react';
---import { Href, useLocalSearchParams, useRouter } from 'expo-router';
-- import { Ionicons } from '@expo/vector-icons';
---import { ScrollView, Stack, Text, XStack, YStack, Button, Spinner, useTheme } from 'tamagui';
--+import { Href, useLocalSearchParams, useRouter } from 'expo-router';
--+import { useEffect, useRef, useState } from 'react';
-- import { useSafeAreaInsets } from 'react-native-safe-area-context';
--+import { Button, ScrollView, Spinner, Stack, Text, useTheme, XStack, YStack } from 'tamagui';
-- 
--+import { useTranslation } from '@/src/core/i18n/i18n';
-- import { HabitButton } from '@/src/features/habit/HabitButton';
-- import { HeatmapChain } from '@/src/features/habit/HeatmapChain';
---import { TutorialOverlay } from '@/src/features/tutorial/TutorialOverlay';
-- import { useHabitRecord } from '@/src/features/habit/useHabitRecord';
--+import { TutorialOverlay } from '@/src/features/tutorial/TutorialOverlay';
-- import {
--+  selectAllDoneDays,
--   selectHeatmapIntensity,
--   selectStreak,
---  selectAllDoneDays,
--   useHabitStore,
-- } from '@/src/stores/habitStore';
---import { useTranslation } from '@/src/core/i18n/i18n';
-- import { useSettingsStore } from '@/src/stores/settingsStore';
-- 
-- type TutorialStep = 'none' | 'welcome' | 'pressFab' | 'pressHabit' | 'explainChain';
--@@ -160,7 +160,7 @@ export default function HomeScreen() {
--             {t('daysStreak')}
--           </Text>
--           <XStack alignItems="center" gap="$2">
---            <Text fontSize={24}>🔥</Text>
--+            <Ionicons name="trending-up-outline" size={44} color={neon} />
--             <Text color={neon} fontSize={28} fontWeight="800" textAlign="center">
--               {streak}
--             </Text>
--@@ -182,7 +182,7 @@ export default function HomeScreen() {
--             {t('allDoneDays')}
--           </Text>
--           <XStack alignItems="center" gap="$2">
---            <Text fontSize={24}>✅</Text>
--+            <Ionicons name="trophy-outline" size={34} color={neon} />
--             <Text color={neon} fontSize={28} fontWeight="800" textAlign="center">
--               {allDoneDays}
--             </Text>
--@@ -255,7 +255,7 @@ export default function HomeScreen() {
--         backgroundColor="$background"
--         contentContainerStyle={{
--           paddingHorizontal: 16,
---          paddingTop: 16 + insets.top,
--+          paddingTop: 8,
--           paddingBottom: listPaddingBottom,
--         }}>
--         <YStack gap="$4">
-diff --git "a/20251222_1905_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251222_1905_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-deleted file mode 100644
-index 23efa20..0000000
---- "a/20251222_1905_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-+++ /dev/null
-@@ -1,334 +0,0 @@
--diff --git a/app/pro/index.tsx b/app/pro/index.tsx
--index 1eaa4f4..deb2f50 100644
----- a/app/pro/index.tsx
--+++ b/app/pro/index.tsx
--@@ -2,42 +2,116 @@ import { Alert } from 'react-native';
-- import { LinearGradient } from 'expo-linear-gradient';
-- import { Ionicons } from '@expo/vector-icons';
-- import { ScrollView, Stack, Text, YStack, XStack, Button, useTheme } from 'tamagui';
--+import { useState, type ComponentProps } from 'react';
--+import { useRouter } from 'expo-router';
--+import { useSafeAreaInsets } from 'react-native-safe-area-context';
-- 
-- import { useTranslation, type TranslationKey as TKey } from '@/src/core/i18n/i18n';
-- 
-- type PlanType = 'monthly' | 'yearly';
-- 
---function PlanPriceCard({ type, onPress }: { type: PlanType; onPress: () => void }) {
--+function BenefitItem({
--+  icon,
--+  title,
--+  color,
--+}: {
--+  icon: ComponentProps<typeof Ionicons>['name'];
--+  title: string;
--+  color: string;
--+}) {
--+  return (
--+    <XStack alignItems="center" gap="$3">
--+      <Stack
--+        width={36}
--+        height={36}
--+        borderRadius={10}
--+        alignItems="center"
--+        justifyContent="center"
--+        backgroundColor="$surface"
--+        borderWidth={1}
--+        borderColor="$gray">
--+        <Ionicons name={icon} size={18} color={color} />
--+      </Stack>
--+      <Text color="$text" fontSize={14} fontWeight="700">
--+        {title}
--+      </Text>
--+    </XStack>
--+  );
--+}
--+
--+function CompareRow({ featureKey, freeKey, proKey }: { featureKey: TKey; freeKey: TKey; proKey: TKey }) {
--+  const { t } = useTranslation();
--+  return (
--+    <XStack paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
--+      <YStack flex={1.2}>
--+        <Text color="$muted" fontSize={12}>
--+          {t(featureKey)}
--+        </Text>
--+      </YStack>
--+      <YStack flex={0.9}>
--+        <Text color="$text" fontSize={12}>
--+          {t(freeKey)}
--+        </Text>
--+      </YStack>
--+      <YStack flex={0.9}>
--+        <Text color="$neonGreen" fontSize={12}>
--+          {t(proKey)}
--+        </Text>
--+      </YStack>
--+    </XStack>
--+  );
--+}
--+
--+function PlanCard({
--+  type,
--+  selected,
--+  onPress,
--+}: {
--+  type: PlanType;
--+  selected: boolean;
--+  onPress: () => void;
--+}) {
--   const theme = useTheme();
--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
--   const { t } = useTranslation();
--   const titleKey: TKey = type === 'monthly' ? 'proPlanMonthlyTitle' : 'proPlanYearlyTitle';
--   const priceKey: TKey = type === 'monthly' ? 'priceMonthly' : 'priceYearly';
--   const taglineKey: TKey = type === 'monthly' ? 'proMonthlyTagline' : 'proYearlyTagline';
---  const ctaKey: TKey = type === 'monthly' ? 'proCtaMonthly' : 'proCtaYearly';
--   const isYearly = type === 'yearly';
-- 
--   return (
--     <YStack
--       flex={1}
--       padding="$4"
---      borderRadius="$4"
---      borderWidth={1}
---      borderColor={isYearly ? '$neonGreen' : '$gray'}
--+      borderRadius="$6"
--+      borderWidth={2}
--+      borderColor={selected ? '$neonGreen' : '$gray'}
--       backgroundColor="$surface"
---      gap="$2">
--+      gap="$2"
--+      shadowColor={selected ? neon : 'transparent'}
--+      shadowOpacity={selected ? 0.5 : 0}
--+      shadowRadius={selected ? 16 : 0}
--+      shadowOffset={{ width: 0, height: 6 }}
--+      onPress={onPress}>
--       <XStack justifyContent="space-between" alignItems="center">
---        <Text color="$text" fontSize={16} fontWeight="700">
--+        <Text color="$text" fontSize={16} fontWeight="800">
--           {t(titleKey)}
--         </Text>
---        {isYearly && (
---          <Text color={neon ?? '#39FF14'} fontSize={12} fontWeight="800">
---            {t('proPlanYearlyBadge')}
---          </Text>
---        )}
--+        <XStack alignItems="center" gap="$2">
--+          {isYearly && (
--+            <Text color={neon} fontSize={12} fontWeight="800">
--+              {t('proPlanYearlyBadge')}
--+            </Text>
--+          )}
--+          <Ionicons
--+            name={selected ? 'checkmark-circle' : 'ellipse-outline'}
--+            size={18}
--+            color={selected ? neon : theme?.gray?.val?.toString() ?? '#666'}
--+          />
--+        </XStack>
--       </XStack>
-- 
---      <Text color={neon ?? '#39FF14'} fontSize={20} fontWeight="800">
--+      <Text color={neon} fontSize={22} fontWeight="900">
--         {t(priceKey)}
--       </Text>
-- 
--@@ -45,60 +119,34 @@ function PlanPriceCard({ type, onPress }: { type: PlanType; onPress: () => void
--         {t(taglineKey)}
--       </Text>
-- 
---      <Button
---        marginTop="$3"
---        borderRadius={999}
---        backgroundColor={isYearly ? '$neonGreen' : '$surface'}
---        borderWidth={1}
---        borderColor="$neonGreen"
---        onPress={onPress}
---        iconAfter={<Ionicons name="arrow-forward" size={18} color={isYearly ? '#000' : neon} />}>
---        <Text color={isYearly ? '#000' : neon} fontWeight="700">
---          {t(ctaKey)}
---        </Text>
---      </Button>
--     </YStack>
--   );
-- }
-- 
---function CompareRow({ featureKey, freeKey, proKey }: { featureKey: TKey; freeKey: TKey; proKey: TKey }) {
---  const { t } = useTranslation();
---  return (
---    <XStack paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
---      <YStack flex={1.2}>
---        <Text color="$muted" fontSize={12}>
---          {t(featureKey)}
---        </Text>
---      </YStack>
---      <YStack flex={0.9}>
---        <Text color="$text" fontSize={12}>
---          {t(freeKey)}
---        </Text>
---      </YStack>
---      <YStack flex={0.9}>
---        <Text color="$neonGreen" fontSize={12}>
---          {t(proKey)}
---        </Text>
---      </YStack>
---    </XStack>
---  );
---}
---
-- export default function PaywallScreen() {
--   const theme = useTheme();
--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
--   const bg = theme?.background?.val?.toString() ?? '#000';
--   const { t } = useTranslation();
--+  const router = useRouter();
--+  const insets = useSafeAreaInsets();
--+  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');
--+
--+  const handlePurchase = () => {
--+    Alert.alert(t('proHeaderTitle'), t('proFinePrint'));
--+  };
-- 
---  const handlePlan = () => {
---    Alert.alert(t('comingSoonTitle') ?? 'Coming soon', t('paywallNote'));
--+  const handleStayFree = () => {
--+    if (router.canGoBack()) {
--+      router.back();
--+    }
--   };
-- 
--   return (
--     <Stack flex={1} backgroundColor="$background">
--       <ScrollView
--         flex={1}
---        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}>
--+        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 120 }}>
--         {/* ヒーロー */}
--         <YStack borderRadius="$6" overflow="hidden">
--           <LinearGradient
--@@ -106,9 +154,20 @@ export default function PaywallScreen() {
--             start={{ x: 0, y: 0 }}
--             end={{ x: 1, y: 1 }}
--             style={{ padding: 20 }}>
---            <Text color="#000" fontSize={22} fontWeight="800" marginBottom="$2">
---              {t('proTitle')}
---            </Text>
--+            <XStack alignItems="center" gap="$3" marginBottom="$2">
--+              <Stack
--+                width={42}
--+                height={42}
--+                borderRadius={12}
--+                alignItems="center"
--+                justifyContent="center"
--+                backgroundColor="#00000020">
--+                <Ionicons name="trophy-outline" size={24} color="#000" />
--+              </Stack>
--+              <Text color="#000" fontSize={22} fontWeight="900">
--+                {t('proTitle')}
--+              </Text>
--+            </XStack>
--             <Text color="#000" fontSize={14} fontWeight="600" marginBottom="$3">
--               {t('proSubtitle')}
--             </Text>
--@@ -118,26 +177,35 @@ export default function PaywallScreen() {
--           </LinearGradient>
--         </YStack>
-- 
--+        {/* ベネフィット */}
--+        <YStack gap="$3" padding="$4" borderRadius="$6" backgroundColor="$surface">
--+          <Text color="$text" fontSize={16} fontWeight="800">
--+            {t('proCompareTitle')}
--+          </Text>
--+          <BenefitItem icon="infinite-outline" title={t('proFeatureUnlimited')} color={neon} />
--+          <BenefitItem icon="color-palette-outline" title={t('proFeatureThemes')} color={neon} />
--+        </YStack>
--+
--         {/* プランカード */}
--         <XStack gap="$3">
---          <PlanPriceCard type="monthly" onPress={handlePlan} />
---          <PlanPriceCard type="yearly" onPress={handlePlan} />
--+          <PlanCard
--+            type="monthly"
--+            selected={selectedPlan === 'monthly'}
--+            onPress={() => setSelectedPlan('monthly')}
--+          />
--+          <PlanCard
--+            type="yearly"
--+            selected={selectedPlan === 'yearly'}
--+            onPress={() => setSelectedPlan('yearly')}
--+          />
--         </XStack>
-- 
---        {/* 年額お得説明 */}
--         <Text color="$neonGreen" fontSize={12} fontWeight="700">
--           {t('proYearlySavingShort')}
--         </Text>
-- 
--         {/* Free vs Pro 比較 */}
---        <YStack gap="$2" marginTop="$3">
---          <Text color="$text" fontSize={16} fontWeight="700">
---            {t('proCompareTitle')}
---          </Text>
---          <Text color="$muted" fontSize={12}>
---            {t('proCompareSubtitle')}
---          </Text>
---
--+        <YStack gap="$2" marginTop="$2">
--           <XStack marginTop="$2" paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
--             <YStack flex={1.2}>
--               <Text color="$muted" fontSize={11} fontWeight="700">
--@@ -159,25 +227,37 @@ export default function PaywallScreen() {
--           <CompareRow featureKey="proFeatureHabits" freeKey="proFeatureHabitsFree" proKey="proFeatureHabitsPro" />
--           <CompareRow featureKey="proFeatureThemes" freeKey="proFeatureThemesFree" proKey="proFeatureThemesPro" />
--         </YStack>
--+      </ScrollView>
-- 
---        {/* Stay free + 注意書き */}
---        <YStack gap="$3" marginTop="$4">
---          <Button
---            borderRadius={999}
---            backgroundColor="$surface"
---            borderWidth={1}
---            borderColor="$gray"
---            onPress={() => Alert.alert(t('proPlanFreeTitle'), t('paywallNote'))}>
---            <Text color="$muted" fontWeight="600">
---              {t('proCtaStayFree')}
---            </Text>
---          </Button>
---
---          <Text color="$muted" fontSize={10} lineHeight={14}>
---            {t('proFinePrint')}
--+      {/* 固定CTA */}
--+      <YStack
--+        padding="$4"
--+        paddingBottom={Math.max(insets.bottom, 12)}
--+        borderTopWidth={1}
--+        borderColor="$gray"
--+        backgroundColor="$background"
--+        gap="$2">
--+        <Button
--+          borderRadius={999}
--+          backgroundColor="$neonGreen"
--+          onPress={handlePurchase}
--+          pressStyle={{ opacity: 0.85 }}>
--+          <Text color="#000" fontWeight="800">
--+            {selectedPlan === 'yearly' ? t('proCtaYearly') : t('proCtaMonthly')}
--           </Text>
---        </YStack>
---      </ScrollView>
---      </Stack>
--+        </Button>
--+        <Text color="$muted" fontSize={10} lineHeight={14} textAlign="center">
--+          {t('proFinePrint')}
--+        </Text>
--+        <Button
--+          chromeless
--+          onPress={handleStayFree}
--+          accessibilityLabel={t('proCtaStayFree')}>
--+          <Text color="$muted" fontWeight="600">
--+            {t('proCtaStayFree')}
--+          </Text>
--+        </Button>
--+      </YStack>
--+    </Stack>
--   );
-- }
-diff --git "a/20251222_2037_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251222_2037_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-deleted file mode 100644
-index fcfb9ec..0000000
---- "a/20251222_2037_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
-+++ /dev/null
-@@ -1,364 +0,0 @@
--diff --git a/app/pro/index.tsx b/app/pro/index.tsx
--index 1eaa4f4..451520b 100644
----- a/app/pro/index.tsx
--+++ b/app/pro/index.tsx
--@@ -2,62 +2,40 @@ import { Alert } from 'react-native';
-- import { LinearGradient } from 'expo-linear-gradient';
-- import { Ionicons } from '@expo/vector-icons';
-- import { ScrollView, Stack, Text, YStack, XStack, Button, useTheme } from 'tamagui';
--+import { useState, type ComponentProps } from 'react';
--+import { useRouter } from 'expo-router';
--+import { useSafeAreaInsets } from 'react-native-safe-area-context';
-- 
-- import { useTranslation, type TranslationKey as TKey } from '@/src/core/i18n/i18n';
-- 
-- type PlanType = 'monthly' | 'yearly';
-- 
---function PlanPriceCard({ type, onPress }: { type: PlanType; onPress: () => void }) {
---  const theme = useTheme();
---  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
---  const { t } = useTranslation();
---  const titleKey: TKey = type === 'monthly' ? 'proPlanMonthlyTitle' : 'proPlanYearlyTitle';
---  const priceKey: TKey = type === 'monthly' ? 'priceMonthly' : 'priceYearly';
---  const taglineKey: TKey = type === 'monthly' ? 'proMonthlyTagline' : 'proYearlyTagline';
---  const ctaKey: TKey = type === 'monthly' ? 'proCtaMonthly' : 'proCtaYearly';
---  const isYearly = type === 'yearly';
---
--+function BenefitItem({
--+  icon,
--+  title,
--+  color,
--+}: {
--+  icon: ComponentProps<typeof Ionicons>['name'];
--+  title: string;
--+  color: string;
--+}) {
--   return (
---    <YStack
---      flex={1}
---      padding="$4"
---      borderRadius="$4"
---      borderWidth={1}
---      borderColor={isYearly ? '$neonGreen' : '$gray'}
---      backgroundColor="$surface"
---      gap="$2">
---      <XStack justifyContent="space-between" alignItems="center">
---        <Text color="$text" fontSize={16} fontWeight="700">
---          {t(titleKey)}
---        </Text>
---        {isYearly && (
---          <Text color={neon ?? '#39FF14'} fontSize={12} fontWeight="800">
---            {t('proPlanYearlyBadge')}
---          </Text>
---        )}
---      </XStack>
---
---      <Text color={neon ?? '#39FF14'} fontSize={20} fontWeight="800">
---        {t(priceKey)}
---      </Text>
---
---      <Text color="$muted" fontSize={12}>
---        {t(taglineKey)}
---      </Text>
---
---      <Button
---        marginTop="$3"
---        borderRadius={999}
---        backgroundColor={isYearly ? '$neonGreen' : '$surface'}
--+    <XStack alignItems="center" gap="$3" width="100%">
--+      <Stack
--+        width={36}
--+        height={36}
--+        borderRadius={10}
--+        alignItems="center"
--+        justifyContent="center"
--+        backgroundColor="$surface"
--         borderWidth={1}
---        borderColor="$neonGreen"
---        onPress={onPress}
---        iconAfter={<Ionicons name="arrow-forward" size={18} color={isYearly ? '#000' : neon} />}>
---        <Text color={isYearly ? '#000' : neon} fontWeight="700">
---          {t(ctaKey)}
---        </Text>
---      </Button>
---    </YStack>
--+        borderColor="$gray">
--+        <Ionicons name={icon} size={18} color={color} />
--+      </Stack>
--+      <Text color="$text" fontSize={14} fontWeight="700" flexShrink={1}>
--+        {title}
--+      </Text>
--+    </XStack>
--   );
-- }
-- 
--@@ -84,21 +62,102 @@ function CompareRow({ featureKey, freeKey, proKey }: { featureKey: TKey; freeKey
--   );
-- }
-- 
--+function PlanCard({
--+  type,
--+  selected,
--+  onPress,
--+}: {
--+  type: PlanType;
--+  selected: boolean;
--+  onPress: () => void;
--+}) {
--+  const theme = useTheme();
--+  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
--+  const { t } = useTranslation();
--+  const titleKey: TKey = type === 'monthly' ? 'proPlanMonthlyTitle' : 'proPlanYearlyTitle';
--+  const priceKey: TKey = type === 'monthly' ? 'priceMonthly' : 'priceYearly';
--+  const taglineKey: TKey = type === 'monthly' ? 'proMonthlyTagline' : 'proYearlyTagline';
--+  const isYearly = type === 'yearly';
--+
--+  return (
--+    <YStack
--+      flex={1}
--+      padding="$4"
--+      borderRadius="$6"
--+      borderWidth={2}
--+      borderColor={selected ? '$neonGreen' : '$gray'}
--+      backgroundColor="$surface"
--+      gap="$2"
--+      shadowColor={selected ? neon : 'transparent'}
--+      shadowOpacity={selected ? 0.5 : 0}
--+      shadowRadius={selected ? 16 : 0}
--+      shadowOffset={{ width: 0, height: 6 }}
--+      onPress={onPress}>
--+      <XStack justifyContent="space-between" alignItems="center" gap="$2">
--+        <XStack alignItems="center" gap="$2" flex={1} minWidth={0} flexWrap="wrap">
--+          <Text color="$text" fontSize={16} fontWeight="800" flexShrink={1}>
--+            {t(titleKey)}
--+          </Text>
--+          {isYearly && (
--+            <Text color={neon} fontSize={12} fontWeight="800" flexShrink={0}>
--+              {t('proPlanYearlyBadge')}
--+            </Text>
--+          )}
--+        </XStack>
--+        <XStack alignItems="center" flexShrink={0}>
--+          {isYearly && (
--+            <Ionicons
--+              name={selected ? 'checkmark-circle' : 'ellipse-outline'}
--+              size={18}
--+              color={selected ? neon : theme?.gray?.val?.toString() ?? '#666'}
--+            />
--+          )}
--+          {!isYearly && (
--+            <Ionicons
--+              name={selected ? 'checkmark-circle' : 'ellipse-outline'}
--+              size={18}
--+              color={selected ? neon : theme?.gray?.val?.toString() ?? '#666'}
--+            />
--+          )}
--+        </XStack>
--+      </XStack>
--+
--+      <Text color={neon} fontSize={22} fontWeight="900">
--+        {t(priceKey)}
--+      </Text>
--+
--+      <Text color="$muted" fontSize={12}>
--+        {t(taglineKey)}
--+      </Text>
--+
--+    </YStack>
--+  );
--+}
--+
-- export default function PaywallScreen() {
--   const theme = useTheme();
--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
--   const bg = theme?.background?.val?.toString() ?? '#000';
--   const { t } = useTranslation();
--+  const router = useRouter();
--+  const insets = useSafeAreaInsets();
--+  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');
-- 
---  const handlePlan = () => {
---    Alert.alert(t('comingSoonTitle') ?? 'Coming soon', t('paywallNote'));
--+  const handlePurchase = () => {
--+    Alert.alert(t('proHeaderTitle'), t('proFinePrint'));
--+  };
--+
--+  const handleStayFree = () => {
--+    if (router.canGoBack()) {
--+      router.back();
--+    }
--   };
-- 
--   return (
--     <Stack flex={1} backgroundColor="$background">
--       <ScrollView
--         flex={1}
---        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}>
--+        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 120 }}>
--         {/* ヒーロー */}
--         <YStack borderRadius="$6" overflow="hidden">
--           <LinearGradient
--@@ -106,9 +165,20 @@ export default function PaywallScreen() {
--             start={{ x: 0, y: 0 }}
--             end={{ x: 1, y: 1 }}
--             style={{ padding: 20 }}>
---            <Text color="#000" fontSize={22} fontWeight="800" marginBottom="$2">
--+            <XStack alignItems="center" gap="$3" marginBottom="$2">
--+              <Stack
--+                width={42}
--+                height={42}
--+                borderRadius={12}
--+                alignItems="center"
--+                justifyContent="center"
--+                backgroundColor="#00000020">
--+                <Ionicons name="trophy-outline" size={24} color="#000" />
--+              </Stack>
--+            <Text color="#000" fontSize={22} fontWeight="900" flexShrink={1}>
--               {t('proTitle')}
--             </Text>
--+            </XStack>
--             <Text color="#000" fontSize={14} fontWeight="600" marginBottom="$3">
--               {t('proSubtitle')}
--             </Text>
--@@ -118,39 +188,48 @@ export default function PaywallScreen() {
--           </LinearGradient>
--         </YStack>
-- 
--+        {/* ベネフィット */}
--+        <YStack gap="$3" padding="$4" borderRadius="$6" backgroundColor="$surface">
--+          <Text color="$text" fontSize={16} fontWeight="800">
--+            {t('proCompareTitle')}
--+          </Text>
--+          <BenefitItem icon="infinite-outline" title={t('proFeatureUnlimited')} color={neon} />
--+          <BenefitItem icon="color-palette-outline" title={t('proFeatureThemes')} color={neon} />
--+        </YStack>
--+
--         {/* プランカード */}
--         <XStack gap="$3">
---          <PlanPriceCard type="monthly" onPress={handlePlan} />
---          <PlanPriceCard type="yearly" onPress={handlePlan} />
--+          <PlanCard
--+            type="monthly"
--+            selected={selectedPlan === 'monthly'}
--+            onPress={() => setSelectedPlan('monthly')}
--+          />
--+          <PlanCard
--+            type="yearly"
--+            selected={selectedPlan === 'yearly'}
--+            onPress={() => setSelectedPlan('yearly')}
--+          />
--         </XStack>
-- 
---        {/* 年額お得説明 */}
--         <Text color="$neonGreen" fontSize={12} fontWeight="700">
--           {t('proYearlySavingShort')}
--         </Text>
-- 
--         {/* Free vs Pro 比較 */}
---        <YStack gap="$2" marginTop="$3">
---          <Text color="$text" fontSize={16} fontWeight="700">
---            {t('proCompareTitle')}
---          </Text>
---          <Text color="$muted" fontSize={12}>
---            {t('proCompareSubtitle')}
---          </Text>
---
--+        <YStack gap="$2" marginTop="$2">
--           <XStack marginTop="$2" paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
---            <YStack flex={1.2}>
---              <Text color="$muted" fontSize={11} fontWeight="700">
--+            <YStack flex={1.2} minWidth={0}>
--+              <Text color="$muted" fontSize={11} fontWeight="700" flexShrink={1}>
--                 {t('proCompareHeaderFeature')}
--               </Text>
--             </YStack>
---            <YStack flex={0.9}>
---              <Text color="$muted" fontSize={11} fontWeight="700">
--+            <YStack flex={0.9} minWidth={0}>
--+              <Text color="$muted" fontSize={11} fontWeight="700" flexShrink={1}>
--                 {t('proCompareHeaderFree')}
--               </Text>
--             </YStack>
---            <YStack flex={0.9}>
---              <Text color="$muted" fontSize={11} fontWeight="700">
--+            <YStack flex={0.9} minWidth={0}>
--+              <Text color="$muted" fontSize={11} fontWeight="700" flexShrink={1}>
--                 {t('proCompareHeaderPro')}
--               </Text>
--             </YStack>
--@@ -159,25 +238,37 @@ export default function PaywallScreen() {
--           <CompareRow featureKey="proFeatureHabits" freeKey="proFeatureHabitsFree" proKey="proFeatureHabitsPro" />
--           <CompareRow featureKey="proFeatureThemes" freeKey="proFeatureThemesFree" proKey="proFeatureThemesPro" />
--         </YStack>
--+      </ScrollView>
-- 
---        {/* Stay free + 注意書き */}
---        <YStack gap="$3" marginTop="$4">
---          <Button
---            borderRadius={999}
---            backgroundColor="$surface"
---            borderWidth={1}
---            borderColor="$gray"
---            onPress={() => Alert.alert(t('proPlanFreeTitle'), t('paywallNote'))}>
---            <Text color="$muted" fontWeight="600">
---              {t('proCtaStayFree')}
---            </Text>
---          </Button>
---
---          <Text color="$muted" fontSize={10} lineHeight={14}>
---            {t('proFinePrint')}
--+      {/* 固定CTA */}
--+      <YStack
--+        padding="$4"
--+        paddingBottom={Math.max(insets.bottom, 12)}
--+        borderTopWidth={1}
--+        borderColor="$gray"
--+        backgroundColor="$background"
--+        gap="$2">
--+        <Button
--+          borderRadius={999}
--+          backgroundColor="$neonGreen"
--+          onPress={handlePurchase}
--+          pressStyle={{ opacity: 0.85 }}>
--+          <Text color="#000" fontWeight="800">
--+            {selectedPlan === 'yearly' ? t('proCtaYearly') : t('proCtaMonthly')}
--           </Text>
---        </YStack>
---      </ScrollView>
---      </Stack>
--+        </Button>
--+        <Text color="$muted" fontSize={10} lineHeight={14} textAlign="center">
--+          {t('proFinePrint')}
--+        </Text>
--+        <Button
--+          chromeless
--+          onPress={handleStayFree}
--+          accessibilityLabel={t('proCtaStayFree')}>
--+          <Text color="$muted" fontWeight="600">
--+            {t('proCtaStayFree')}
--+          </Text>
--+        </Button>
--+      </YStack>
--+    </Stack>
--   );
-- }
--diff --git a/src/features/habit/habitIcons.ts b/src/features/habit/habitIcons.ts
--index 555045b..6015221 100644
----- a/src/features/habit/habitIcons.ts
--+++ b/src/features/habit/habitIcons.ts
--@@ -69,6 +69,7 @@ export const HABIT_ICON_CATEGORIES: HabitIconCategory[] = [
--       { id: 'walk-outline', label: 'Walk' },
--       { id: 'moon-outline', label: 'Sleep' },
--       { id: 'fitness-outline', label: 'Workout' },
--+      { id: 'barbell-outline', label: 'Barbell' },
--     ],
--   },
--   {
--@@ -78,7 +79,6 @@ export const HABIT_ICON_CATEGORIES: HabitIconCategory[] = [
--       { id: 'book-outline', label: 'Read' },
--       { id: 'brush-outline', label: 'Art' },
--       { id: 'tv-outline', label: 'Media' },
---      { id: 'laptop-outline', label: 'PC work' },
--       { id: 'school-outline', label: 'Study' },
--       { id: 'globe-outline', label: 'Language' },
--     ],
diff --git "a/20251227_2131_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251227_2131_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
deleted file mode 100644
index 22c0034..0000000
--- "a/20251227_2131_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+++ /dev/null
@@ -1,5489 +0,0 @@
-diff --git a/src/core/i18n/locales/de.ts b/src/core/i18n/locales/de.ts
-index cde5732..b78fbee 100644
---- a/src/core/i18n/locales/de.ts
-+++ b/src/core/i18n/locales/de.ts
-@@ -1,176 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'Tage in Folge',
--    yourChain: 'Deine Kette',
--    allDoneDays: 'Tage mit allen erledigten Gewohnheiten',
--    settings: 'Einstellungen',
--    hapticOff: 'Vibration aus',
--    language: 'Sprache',
--    sound: 'Sound',
--    haptics: 'Vibration',
--    theme: 'Theme',
--    restore: 'Käufe wiederherstellen',
--    version: 'App-Version',
--    tapSound: 'Tippsound',
--    click: 'Klick',
--    pop: 'Plopp',
--    flowEffectTitle: 'Elektrische Fluss-Animation',
--    flowEffectHelp:
--      'Lässt einen neonfarbenen Strom über deine Kettenlinie laufen. Ausschalten, wenn du es ruhiger magst.',
--    heatmapRangeTitle: 'Zeitraum der Kettenanzeige',
--    heatmapRangeHelp: 'Wähle, wie viele Tage deiner Kette auf der Heatmap angezeigt werden.',
--    heatmapRange7: '1 Woche',
--    heatmapRange30: '1 Monat',
--    heatmapRange60: '2 Monate',
--    heatmapRange180: '6 Monate',
--    heatmapRange365: '1 Jahr',
--    heatmapSummaryPrefix: 'Letzte ',
--    heatmapSummarySuffix: ' Tage',
--    heatmapAgoSuffix: ' Tage zuvor',
--    heatmapToday: 'Heute',
--    freeThemeNote: 'Gratis: nur Dark / Pro schaltet Neon Pink & Cyber Blue frei',
--    proThemeNote: 'Pro-Themes werden nach dem Kauf freigeschaltet.',
--    restoreDesc: 'Wiederherstellen (später)',
--    licenses: 'Open-Source-Lizenzen (später)',
--    openPro: 'DotChain Pro öffnen',
--    heroPaywall: 'Upgrade in die Neon-Welt',
--    priceMonthly: '$1.99 / Monat',
--    onboardingTitle: 'Willkommen bei DotChain',
--    onboardingBody: 'Ein Tap, starke Vibration. Lass uns die heutige Kette bauen.',
--    start: 'Loslegen',
--    paywallNote: 'Abrechnung und Werbung werden später hinzugefügt.',
--    homeLoading: 'Laden...',
--    homeAddHabitLabel: 'Gewohnheit hinzufügen',
--    editNewHabit: 'Neue Gewohnheit',
--    editHabitTitle: 'Gewohnheit bearbeiten',
--    editCategoryLabel: 'Kategorie',
--    editNameLabel: 'Name (max. 20 Zeichen)',
--    editNamePlaceholder: 'Benenne deine Gewohnheit...',
--    editSaveChanges: 'Änderungen speichern',
--    editCreateHabit: 'Gewohnheit anlegen',
--    editDeleteHabit: 'Gewohnheit löschen',
--    proTitle: 'Entfessle deine Kette.',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'Unbegrenzte Gewohnheiten',
--    proFeatureThemes: 'Alle Themes freigeschaltet (Neon Pink / Cyber Blue)',
--    proFeatureAds: 'Keine Werbung',
--    habitButtonSuffix: ' Gewohnheitsbutton',
--    iconCatBasic: 'Basis',
--    iconCatHealth: 'Gesundheit',
--    iconCatLearning: 'Lernen & Arbeit',
--    errorLoadFailed: 'Daten konnten nicht geladen werden',
--    errorTitleRequired: 'Titel ist erforderlich.',
--    errorTitleTooLong: 'Der Titel darf höchstens 20 Zeichen haben.',
--    errorSaveFailed: 'Speichern fehlgeschlagen.',
--    errorDeleteFailed: 'Löschen fehlgeschlagen.',
--    errorToggleFailed: 'Aktualisierung fehlgeschlagen.',
--    habitLimitTitle: 'Limit des Gratis-Tarifs',
--    habitLimitBody: 'Im Gratis-Tarif kannst du bis zu 3 Gewohnheiten erstellen.',
--    hapticsDescription: 'Haptisches Feedback',
--    reminderSectionTitle: 'Erinnerungsbenachrichtigung',
--    reminderToggleLabel: 'Erinnerung verwenden',
--    reminderTimeLabel: 'Benachrichtigungszeit',
--    reminderNotificationBody: 'Zeit, deine Kette aufzubauen.',
--    streak7Title: '7-Tage-Serie!',
--    streak7Message: 'Du hast deine Kette eine ganze Woche gehalten. Super!',
--    ok: 'OK',
--    languageChange: 'Sprache ändern',
--    currentLanguage: 'Aktuell',
--    languageNameEn: 'Englisch',
--    languageNameJa: 'Japanisch',
--    languageNameFr: 'Französisch',
--    languageNameEs: 'Spanisch',
--    languageNameDe: 'Deutsch',
--    languageNameIt: 'Italienisch',
--    languageNamePt: 'Portugiesisch',
--    languageNameRu: 'Russisch',
--    languageNameZh: 'Chinesisch',
--    languageNameKo: 'Koreanisch',
--    languageNameHi: 'Hindi',
--    languageNameId: 'Indonesisch',
--    languageNameTh: 'Thailändisch',
--    languageNameVi: 'Vietnamesisch',
--    languageNameMs: 'Malaiisch',
--    languageNameTr: 'Türkisch',
--    languageNameNl: 'Niederländisch',
--    languageNameSv: 'Schwedisch',
--    soundSwitchLabel: 'Ton einschalten',
--    tapSoundLabel: 'Tippgeräusch-Stil',
--    proOnlyTitle: 'Nur für Pro',
--    proOnlyTheme: 'Dieses Theme ist nur mit Pro verfügbar.',
--
--    // Fehlende Keys ergänzt für vollständige de-Lokalisierung
--    cancel: 'Abbrechen',
--    delete: 'Löschen',
--    deleteConfirmBody: 'Möchtest du wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
--    comingSoonTitle: 'Bald verfügbar',
--    onboardingPunch: 'Das ist DotChain.',
--
--    paywallBestValueBadge: 'Bestes Preis-Leistungs-Verhältnis',
--    paywallMonthlyLabel: 'Monatsplan',
--    paywallMonthlySub: 'Monatliche Abrechnung. Jederzeit kündbar.',
--    paywallYearlyLabel: 'Jahresplan',
--    paywallYearlySub: 'Jährliche Abrechnung. Jederzeit kündbar.',
--
--    priceFree: '$0 / für immer',
--    priceYearly: '$14.99 / Jahr',
--
--    proCompareHeaderFeature: 'Funktion',
--    proCompareHeaderFree: 'Gratis',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      'Du kannst immer im Gratis-Plan bleiben. Pro entfernt nur die Grenzen.',
--    proCompareTitle: 'Das bekommst du mit Pro',
--
--    proCtaMonthly: 'Pro monatlich holen',
--    proCtaStayFree: 'Beim Gratis-Plan bleiben',
--    proCtaYearly: 'Pro jährlich holen',
--
--    proFeatureAdsFree: 'Bannerwerbung unten',
--    proFeatureAdsPro: 'Keine Werbung, voller Fokus',
--    proFeatureHabits: 'Gewohnheiten, die du verfolgen kannst',
--    proFeatureHabitsFree: 'Bis zu 3 Gewohnheiten',
--    proFeatureHabitsPro: 'Unbegrenzte Gewohnheiten',
--    proFeatureThemesFree: '1 Theme (Dark)',
--    proFeatureThemesPro: 'Alle Themes freigeschaltet',
--
--    proFinePrint:
--      'Das Abo verlängert sich automatisch. Du kannst es jederzeit in den Kontoeinstellungen von App Store oder Google Play kündigen.',
--    proMonthlyTagline: 'Starte klein, kündige jederzeit.',
--    proPlanFreeTitle: 'Gratis',
--    proPlanMonthlyTitle: 'Monatlich',
--    proPlanYearlyBadge: 'Bestes Preis-Leistungs-Verhältnis',
--    proPlanYearlyTitle: 'Jährlich',
--    proSubtitle: 'Gehe über 3 Gewohnheiten hinaus und mache deine Punkte unaufhaltsam.',
--    proYearlySavingShort: 'Spare etwa 37 % (wie 8 Monate gratis).',
--    proYearlyTagline: 'Für alle, die ihre Kette ernst nehmen.',
--
--    restoreSoon: 'Die Wiederherstellung von Käufen wird in einem kommenden Update hinzugefügt.',
--
--    themeCyberBlueLabel: 'Cyber-Blau',
--    themeDarkLabel: 'Dunkel',
--    themeDesc: 'Wähle die Stimmung der App. (Pro-Themes kommen später.)',
--    themeNeonPinkLabel: 'Neon Pink',
--
--    tutorialEditIconBody:
--      'Wähle zuerst ein Icon, das zu deiner Gewohnheit passt.',
--    tutorialEditNameBody:
--      'Gib als Nächstes einen Namen für deine Gewohnheit ein.\nZum Beispiel: „Wasser trinken“, „Buch lesen“.',
--    tutorialEditSubmitBody:
--      'Fertig!\nTippe unten auf den Erstellen-Button, um diese Gewohnheit zum Startbildschirm hinzuzufügen.',
--    tutorialExplainChainBody:
--      'Durch das Tippen steigt deine TAGE-IN-FOLGE-Anzahl und heute wird in DEINER KETTE hervorgehoben.\nMach weiter, um deine Kette zu verlängern.',
--    tutorialGotIt: 'Verstanden',
--    tutorialNext: 'Weiter',
--    tutorialPressFabBody:
--      'Tippe unten rechts auf den +-Button, um deine erste Gewohnheit zu erstellen.',
--    tutorialPressHabitBody:
--      'Tippe jetzt auf die Gewohnheit, die du gerade erstellt hast.\nDurch Tippen markierst du heute als „erledigt“.',
--    tutorialStart: 'Starten',
--    tutorialWelcomeBody:
--      'Willkommen!\nMit DotChain baust du deine Gewohnheitskette.\nBeginne, indem du deine erste Gewohnheit mit dem +-Button erstellst.',
-+  ...baseEn,
-+  // --- Home / Header (ホーム画面のヘッダー) ---
-+  daysStreak: 'TAGE IN FOLGE',       // 英語: DAYS STREAK
-+  yourChain: 'DEINE KETTE',          // 英語: YOUR CHAIN
-+  allDoneDays: 'TAGE KOMPLETT',      // 英語: ALL DONE DAYS (「完了した日」を短く表現)
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: 'Einstellungen',         // 設定
-+  hapticOff: 'Vibration aus',        // 振動オフ
-+  language: 'Sprache',               // 言語
-+  sound: 'Ton',                      // 音
-+  haptics: 'Haptik',                 // 触覚フィードバック
-+  theme: 'Design',                   // テーマ（ドイツ語ではDesignもよく使われます）
-+
-+  // --- Purchase / Restore (課金・復元) ---
-+  restore: 'Käufe wiederherstellen', // 購入の復元
-+  purchaseSuccess: 'Pro-Plan ist jetzt aktiv.', // 購入成功
-+  purchaseFailed: 'Kauf fehlgeschlagen. Bitte später erneut versuchen.', // 購入失敗
-+  restoreSuccess: 'Kaufhistorie wiederhergestellt.', // 復元成功
-+  restoreNotFound: 'Keine Käufe zum Wiederherstellen gefunden.', // 復元データなし
-+  restoreFailed: 'Wiederherstellung fehlgeschlagen.', // 復元失敗
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: 'App-Version',            // アプリバージョン
-+  tapSound: 'Tipp-Sound',            // タップ音
-+  click: 'Klick',                    // カチッ
-+  pop: 'Pop',                        // ポップ
-+  soundSwitchLabel: 'Soundeffekte',  // 効果音
-+
-+  // --- Pro Screen (Paywall) (課金画面) ---
-+  proTitle: 'Entfessle deine Kette.', // 英語: Unlock your chain. (直訳より「解き放つ」感じ)
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: 'Mehr als 3 Gewohnheiten: Mach deine Punkte unaufhaltsam.',
-+  proPlanFreeTitle: 'Gratis',        // 無料
-+  proPlanMonthlyTitle: 'Monatlich',  // 月額
-+  proPlanYearlyTitle: 'Jährlich',    // 年額
-+  proPlanYearlyBadge: 'Beste Wahl',  // 英語: Best value (ベストな選択)
-+  proBadgeShort: 'PRO',
-+  priceFree: '0 € / für immer',      // ずっと0円
-+  proOnlyTitle: 'Pro-Funktion',      // Pro限定機能
-+  proOnlyTheme: 'Wechsle zu Pro, um dieses Design zu nutzen.',
-+  openPro: 'Pro-Plan ansehen',       // Proプランを見る
-+  cancel: 'Abbrechen',               // キャンセル
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: 'Elektrische Fluss-Animation',
-+  flowEffectHelp:
-+    'Lass einen Neon-Strom entlang deiner Kette fließen. Schalte es aus, wenn du es ruhiger magst.',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップの表示期間) ---
-+  heatmapRangeTitle: 'Anzeigezeitraum der Kette',
-+  heatmapRangeHelp: 'Wähle, wie viele Tage deiner Kette auf der Startseite angezeigt werden.',
-+  heatmapRange7: '1 Woche',
-+  heatmapRange30: '1 Monat',
-+  heatmapRange60: '2 Monate',
-+  heatmapRange90: '3 Monate',
-+  heatmapRange180: '6 Monate',
-+  heatmapRange365: '1 Jahr',
-+  heatmapSummaryPrefix: 'Letzte ',
-+  heatmapSummarySuffix: ' Tage',
-+  heatmapAgoSuffix: ' Tage her',
-+  heatmapToday: 'Heute',             // 今日
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: 'Ändere das Erscheinungsbild der App.',
-+  themeDarkLabel: 'Dunkel',          // Dark
-+  themeNeonPinkLabel: 'Neon Pink',
-+  themeCyberBlueLabel: 'Cyber Blau',
-+  freeThemeNote: 'Gratis: Nur Dunkel / Pro schaltet Neon Pink & Cyber Blau frei',
-+  proThemeNote: 'Pro-Designs sind bald verfügbar.',
-+
-+  // --- Habit Management (習慣の管理) ---
-+  newHabitTitle: 'Neue Gewohnheit',
-+  editHabitTitle: 'Gewohnheit bearbeiten',
-+  habitNameLabel: 'Name',
-+  habitNamePlaceholder: 'z. B. Buch lesen, Wasser trinken',
-+  habitIconLabel: 'Icon',
-+  deleteHabit: 'Diese Gewohnheit löschen',
-+  deleteConfirmationTitle: 'Gewohnheit löschen?',
-+  deleteConfirmationMessage: 'Diese Aktion kann nicht rückgängig gemacht werden. Der gesamte Verlauf geht verloren.',
-+  save: 'Speichern',
-+  create: 'Erstellen',
-+
-+  // --- Icon Categories & Labels (アイコンのカテゴリとラベル) ---
-+  iconCatBasic: 'Basis',
-+  iconCatHealth: 'Gesundheit',
-+  iconCatLearning: 'Lernen',         // 英語: Learning
-+
-+  iconLabelStreak: 'Serie',          // Streak (連続)
-+  iconLabelTask: 'Aufgabe',          // Task
-+  iconLabelShine: 'Glanz',           // Shine
-+  iconLabelClean: 'Putzen',          // Clean
-+  iconLabelLaundry: 'Wäsche',        // Laundry
-+  iconLabelWater: 'Wasser',          // Water
-+  iconLabelWalk: 'Gehen',            // Walk
-+  iconLabelSleep: 'Schlaf',          // Sleep
-+  iconLabelWorkout: 'Training',      // Workout
-+  iconLabelBarbell: 'Hantel',        // Barbell
-+  iconLabelRead: 'Lesen',            // Read
-+  iconLabelArt: 'Kunst',             // Art
-+  iconLabelMedia: 'Medien',          // Media
-+  iconLabelStudy: 'Lernen',          // Study
-+  iconLabelLanguage: 'Sprache',      // Language
-+
-+  // --- Misc / Errors (その他・エラー) ---
-+  habitButtonSuffix: ' Gewohnheits-Button', // アクセシビリティ用
-+  errorLoadFailed: 'Daten konnten nicht geladen werden.',
-+  errorTitleRequired: 'Titel ist erforderlich.',
-+  errorTitleTooLong: 'Der Titel darf maximal 20 Zeichen lang sein.',
-+  errorSaveFailed: 'Speichern fehlgeschlagen.',
-+  errorDeleteFailed: 'Löschen fehlgeschlagen.',
-+  errorToggleFailed: 'Update fehlgeschlagen.',
-+  habitLimitTitle: 'Limit des kostenlosen Plans',
-+  habitLimitBody: 'Im kostenlosen Plan kannst du bis zu 3 Gewohnheiten erstellen.',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: 'Haptisches Feedback (Vibration)',
-+
-+  // --- Reminder (リマインダー・通知) ---
-+  reminderSectionTitle: 'Erinnerung',
-+  reminderToggleLabel: 'Erinnerung nutzen',
-+  reminderTimeLabel: 'Benachrichtigungszeit',
-+  reminderNotificationBody: 'Es ist Zeit, deine Kette zu bauen!',
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: '7-Tage-Serie!',
-+  streak7Message: 'Du hast deine Kette eine ganze Woche gehalten. Super Arbeit!',
-+  ok: 'Spitze',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: 'Sprache ändern',
-+  currentLanguage: 'Aktuell',
-+  languageNameEn: 'Englisch',
-+  languageNameJa: 'Japanisch',
-+  languageNameFr: 'Französisch',
-+  languageNameEs: 'Spanisch',
-+  languageNameDe: 'Deutsch',
-+  languageNameIt: 'Italienisch',
-+  languageNamePt: 'Portugiesisch',
-+  languageNameRu: 'Russisch',
-+  languageNameZh: 'Chinesisch',
-+  languageNameKo: 'Koreanisch',
-+  languageNameHi: 'Hindi',
-+  languageNameId: 'Indonesisch',
-+  languageNameTh: 'Thailändisch',
-+  languageNameVi: 'Vietnamesisch',
-+  languageNameMs: 'Malaiisch',
-+  languageNameTr: 'Türkisch',
-+  languageNameNl: 'Niederländisch',
-+  languageNameSv: 'Schwedisch',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: 'Weiter',
-+  tutorialWelcome: 'Willkommen bei DotChain',
-+  tutorialDesc1: 'Verbinde deine täglichen Gewohnheiten und baue deine eigene Kette.',
-+  tutorialDesc2: 'Unterbrich die Kette nicht, damit die Gewohnheit bleibt.',
-+  tutorialStart: 'Loslegen',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/en.ts b/src/core/i18n/locales/en.ts
-index a495f84..b3d3247 100644
---- a/src/core/i18n/locales/en.ts
-+++ b/src/core/i18n/locales/en.ts
-@@ -1,24 +1,35 @@
- const baseEn = {
-+  // --- Home / Header ---
-   daysStreak: 'DAYS STREAK',
-   yourChain: 'YOUR CHAIN',
-   allDoneDays: 'ALL DONE DAYS',
-+
-+  // --- Settings (General) ---
-   settings: 'Settings',
-   hapticOff: 'Haptics off',
-   language: 'Language',
-   sound: 'Sound',
-   haptics: 'Haptics',
-   theme: 'Theme',
--  restore: 'Restore Purchase',
-+
-+  // --- Purchase / Restore ---
-+  restore: 'Restore Purchases',
-   purchaseSuccess: 'Pro plan is now active.',
-   purchaseFailed: 'Purchase failed. Please try again later.',
-   restoreSuccess: 'Purchase history restored.',
-   restoreNotFound: 'No purchases were found to restore.',
-   restoreFailed: 'Failed to restore purchases.',
-+
-+  // --- Settings (Sound & Info) ---
-   version: 'App Version',
-   tapSound: 'Tap sound',
-   click: 'Click',
-   pop: 'Pop',
--  // Paywall / Pro Screen
-+  soundSwitchLabel: 'Sound Effects',
-+
-+  // --- Pro Screen (Paywall) ---
-+  proTitle: 'Unlock your chain.',
-+  proHeaderTitle: 'DotChain Pro',
-   proSubtitle: 'Go beyond 3 habits and make your dots unstoppable.',
-   proPlanFreeTitle: 'Free',
-   proPlanMonthlyTitle: 'Monthly',
-@@ -26,100 +37,55 @@ const baseEn = {
-   proPlanYearlyBadge: 'Best value',
-   proBadgeShort: 'PRO',
-   priceFree: '$0 / forever',
-+  proOnlyTitle: 'Pro Feature',
-+  proOnlyTheme: 'Upgrade to Pro to use this theme.',
-+  openPro: 'View Pro Plan',
-+  cancel: 'Cancel',
-+
-+  // --- Settings (Appearance) ---
-   flowEffectTitle: 'Electric flow animation',
-   flowEffectHelp:
-     'Let a neon electric flow run along your chain line. Turn this off if you prefer a calmer look.',
--  // Heatmap range
-+
-+  // --- Heatmap Range (Settings) ---
-   heatmapRangeTitle: 'Chain display range',
-   heatmapRangeHelp: 'Choose how many days of your chain to show in the home heatmap.',
-   heatmapRange7: '1 week',
-   heatmapRange30: '1 month',
-   heatmapRange60: '2 months',
-+  heatmapRange90: '3 months',
-   heatmapRange180: '6 months',
-   heatmapRange365: '1 year',
--  heatmapSummaryPrefix: 'Past ',
-+  heatmapSummaryPrefix: 'Last ',
-   heatmapSummarySuffix: ' days',
-   heatmapAgoSuffix: ' days ago',
-   heatmapToday: 'Today',
--  priceMonthly: '$1.99 / month',
--  priceYearly: '$14.99 / year',
--  proMonthlyTagline: 'Start small, cancel anytime.',
--  proYearlyTagline: 'For serious chain builders.',
--  proYearlySavingShort: 'Save about 37% (like 8 months free).',
--  proCompareTitle: 'What you get with Pro',
--  proCompareSubtitle: 'You can always stay on Free. Pro just removes the limits.',
--  proCompareHeaderFeature: 'Feature',
--  proCompareHeaderFree: 'Free',
--  proCompareHeaderPro: 'Pro',
--  proFeatureHabits: 'Habits you can track',
--  proFeatureHabitsFree: 'Up to 3 habits',
--  proFeatureHabitsPro: 'Unlimited habits',
--  proFeatureThemesFree: '1 theme (Dark)',
--  proFeatureThemesPro: 'All themes unlocked',
--  proFeatureAdsFree: '',
--  proFeatureAdsPro: '',
--  proOnlyTitle: 'Pro only feature',
--  proOnlyTheme: 'This theme is available with Pro.',
--  proCtaYearly: 'Get Yearly Pro',
--  proCtaMonthly: 'Get Monthly Pro',
--  proCtaStayFree: 'Continue with Free',
--  proFinePrint:
--    'Subscription renews automatically. You can cancel anytime in your App Store or Google Play account settings.',
--  paywallMonthlyLabel: 'Monthly plan',
--  paywallYearlyLabel: 'Yearly plan',
--  paywallBestValueBadge: 'Best value',
--  paywallYearlySub: 'Billed once a year. Cancel anytime.',
--  paywallMonthlySub: 'Billed every month. Cancel anytime.',
--  comingSoonTitle: 'Coming soon',
--  // Theme labels
-+
-+  // --- Themes ---
-+  themeDesc: 'Change the appearance of the app.',
-   themeDarkLabel: 'Dark',
-   themeNeonPinkLabel: 'Neon Pink',
-   themeCyberBlueLabel: 'Cyber Blue',
--  themeDesc: 'Pick your vibe. (Pro themes are coming later.)',
--  restoreSoon: 'Restore purchase will be added in a future update.',
--  freeThemeNote: 'Free: Dark only / Pro unlocks Neon Pink, Cyber Blue',
--  proThemeNote: 'Pro themes unlock after paywall implementation.',
--  restoreDesc: 'Restore purchases made on this account.',
--  licenses: 'Open Source Licenses (later)',
--  openPro: 'Open DotChain Pro',
--  heroPaywall: 'Upgrade to neon world',
--  onboardingTitle: 'Welcome to DotChain',
--  onboardingBody: 'One tap, heavy haptics. Let’s build today’s chain.',
--  onboardingPunch: 'This is DotChain.',
--  start: 'Get started',
--  paywallNote: 'Billing/Ads will be added later.',
--  // --- Tutorial / Onboarding flow ---
--  tutorialWelcomeBody:
--    'Welcome!\nDotChain lets you build your habit chain.\nStart by creating your first habit from the + button.',
--  tutorialPressFabBody: 'Tap the + button at the bottom-right to create your first habit.',
--  tutorialPressHabitBody: 'Now tap the habit you just created.\nTapping marks today as "done".',
--  tutorialExplainChainBody:
--    'By tapping, your DAYS STREAK increased and today lit up on YOUR CHAIN.\nKeep going to extend your chain.',
--  tutorialEditIconBody: 'First, pick an icon that matches your habit.',
--  tutorialEditNameBody: 'Next, enter a name for your habit.\nFor example: "Drink water", "Read a book".',
--  tutorialEditSubmitBody: 'You are ready!\nTap the create button below to add this habit to your home screen.',
--  tutorialNext: 'Next',
--  tutorialStart: 'Start',
--  tutorialGotIt: 'Got it',
--  // --- Home ---
--  homeLoading: 'Loading...',
--  homeAddHabitLabel: 'Add habit',
--  // --- Edit ---
--  editNewHabit: 'New Habit',
-+  freeThemeNote: 'Free: Dark only / Pro unlocks Neon Pink & Cyber Blue',
-+  proThemeNote: 'Pro themes will be available soon.',
-+
-+  // --- Habit Management ---
-+  newHabitTitle: 'New Habit',
-   editHabitTitle: 'Edit Habit',
--  editCategoryLabel: 'Category',
--  editNameLabel: 'Name (max 20 characters)',
--  editNamePlaceholder: 'Name your habit...',
--  editSaveChanges: 'Save Changes',
--  editCreateHabit: 'Create Habit',
--  editDeleteHabit: 'Delete Habit',
--  deleteConfirmBody: 'Are you sure? This action cannot be undone.',
--  cancel: 'Cancel',
--  delete: 'Delete',
--  // Icon categories
-+  habitNameLabel: 'Name',
-+  habitNamePlaceholder: 'e.g. Read a book, Drink water',
-+  habitIconLabel: 'Icon',
-+  deleteHabit: 'Delete this habit',
-+  deleteConfirmationTitle: 'Delete habit?',
-+  deleteConfirmationMessage: 'This action cannot be undone. All history will be lost.',
-+  save: 'Save',
-+  create: 'Create',
-+
-+  // --- Icon Categories & Labels ---
-   iconCatBasic: 'Basic',
-   iconCatHealth: 'Health',
--  iconCatLearning: 'Learning & Work',
-+  iconCatLearning: 'Learning',
-+
-   iconLabelStreak: 'Streak',
-   iconLabelTask: 'Task',
-   iconLabelShine: 'Shine',
-@@ -135,16 +101,10 @@ const baseEn = {
-   iconLabelMedia: 'Media',
-   iconLabelStudy: 'Study',
-   iconLabelLanguage: 'Language',
--  // --- Pro ---
--  proTitle: 'Unlock your chain.',
--  proHeaderTitle: 'DotChain Pro',
--  proFeatureUnlimited: 'Unlimited habits',
--  proFeatureThemes: 'All themes unlocked (Neon Pink / Cyber Blue)',
--  proFeatureAds: '',
--  // --- Accessibility ---
-+
-+  // --- Misc / Errors ---
-   habitButtonSuffix: ' habit button',
--  // --- Errors ---
--  errorLoadFailed: 'Failed to load data',
-+  errorLoadFailed: 'Failed to load data.',
-   errorTitleRequired: 'Title is required.',
-   errorTitleTooLong: 'Title must be 20 characters or less.',
-   errorSaveFailed: 'Failed to save.',
-@@ -152,17 +112,21 @@ const baseEn = {
-   errorToggleFailed: 'Failed to update record.',
-   habitLimitTitle: 'Free plan limit',
-   habitLimitBody: 'On the free plan you can create up to 3 habits.',
-+
-   // --- Settings description ---
--  hapticsDescription: 'Haptic feedback',
-+  hapticsDescription: 'Haptic feedback (vibration)',
-+
-   // --- Reminder ---
--  reminderSectionTitle: 'Reminder notification',
-+  reminderSectionTitle: 'Reminder',
-   reminderToggleLabel: 'Use reminder',
-   reminderTimeLabel: 'Notification time',
--  reminderNotificationBody: 'Time to build your chain.',
-+  reminderNotificationBody: 'It’s time to build your chain!',
-+
-   // --- Review (7-day streak) ---
-   streak7Title: '7-day streak!',
-   streak7Message: 'You have kept your chain for a full week. Great job!',
--  ok: 'OK',
-+  ok: 'Awesome',
-+
-   // --- Language labels ---
-   languageChange: 'Change language',
-   currentLanguage: 'Current',
-@@ -184,10 +148,13 @@ const baseEn = {
-   languageNameTr: 'Turkish',
-   languageNameNl: 'Dutch',
-   languageNameSv: 'Swedish',
--  // --- Sound labels ---
--  soundSwitchLabel: 'Enable sound',
--  tapSoundLabel: 'Tap sound style',
-+
-+  // --- Tutorial ---
-+  tutorialNext: 'Next',
-+  tutorialWelcome: 'Welcome to DotChain',
-+  tutorialDesc1: 'Connect your daily habits and build your own chain.',
-+  tutorialDesc2: 'Don’t break the chain to make habits stick.',
-+  tutorialStart: 'Get Started',
- };
- 
--export type TranslationKey = keyof typeof baseEn;
--export default baseEn;
-+export default baseEn;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/es.ts b/src/core/i18n/locales/es.ts
-index ec2e40b..26b4bfd 100644
---- a/src/core/i18n/locales/es.ts
-+++ b/src/core/i18n/locales/es.ts
-@@ -1,175 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'DÍAS SEGUIDOS',
--    yourChain: 'TU CADENA',
--    allDoneDays: 'DÍAS COMPLETADOS',
--    settings: 'Ajustes',
--    hapticOff: 'Vibración desactivada',
--    language: 'Idioma',
--    sound: 'Sonido',
--    haptics: 'Vibración',
--    theme: 'Tema',
--    restore: 'Restaurar compras',
--    version: 'Versión de la app',
--    tapSound: 'Sonido de toque',
--    click: 'Clic',
--    pop: 'Pop',
--    flowEffectTitle: 'Animación de flujo eléctrico',
--    flowEffectHelp:
--      'Haz que un flujo de neón recorra la línea de tu cadena. Apágalo si prefieres una vista más tranquila.',
--    heatmapRangeTitle: 'Periodo de visualización de la cadena',
--    heatmapRangeHelp: 'Elige cuántos días de tu cadena mostrar en el mapa de calor del inicio.',
--    heatmapRange7: '1 semana',
--    heatmapRange30: '1 mes',
--    heatmapRange60: '2 meses',
--    heatmapRange180: '6 meses',
--    heatmapRange365: '1 año',
--    heatmapSummaryPrefix: 'Últimos ',
--    heatmapSummarySuffix: ' días',
--    heatmapAgoSuffix: ' días atrás',
--    heatmapToday: 'Hoy',
--    freeThemeNote: 'Gratis: solo Dark / Pro desbloquea Neon Pink y Cyber Blue',
--    proThemeNote: 'Los temas Pro se activarán después del pago.',
--    restoreDesc: 'Restaurar compras (más adelante)',
--    licenses: 'Licencias de código abierto (más adelante)',
--    openPro: 'Abrir DotChain Pro',
--    heroPaywall: 'Actualiza al mundo neón',
--    priceMonthly: '$1.99 / mes',
--    onboardingTitle: 'Bienvenido a DotChain',
--    onboardingBody: 'Un toque, vibración fuerte. Construyamos la cadena de hoy.',
--    start: 'Empezar',
--    paywallNote: 'La facturación y los anuncios se añadirán más adelante.',
--    homeLoading: 'Cargando...',
--    homeAddHabitLabel: 'Añadir hábito',
--    editNewHabit: 'Nuevo hábito',
--    editHabitTitle: 'Editar hábito',
--    editCategoryLabel: 'Categoría',
--    editNameLabel: 'Nombre (máx 20 caracteres)',
--    editNamePlaceholder: 'Pon nombre a tu hábito...',
--    editSaveChanges: 'Guardar cambios',
--    editCreateHabit: 'Crear hábito',
--    editDeleteHabit: 'Eliminar hábito',
--    proTitle: 'Desbloquea tu cadena.',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'Hábitos ilimitados',
--    proFeatureThemes: 'Todos los temas desbloqueados (Neon Pink / Cyber Blue)',
--    proFeatureAds: 'Sin anuncios',
--    habitButtonSuffix: ' botón de hábito',
--    iconCatBasic: 'Básico',
--    iconCatHealth: 'Salud',
--    iconCatLearning: 'Aprendizaje y Trabajo',
--    errorLoadFailed: 'Error al cargar datos',
--    errorTitleRequired: 'El título es obligatorio.',
--    errorTitleTooLong: 'El título debe tener 20 caracteres o menos.',
--    errorSaveFailed: 'Error al guardar.',
--    errorDeleteFailed: 'Error al eliminar.',
--    errorToggleFailed: 'Error al actualizar.',
--    habitLimitTitle: 'Límite del plan gratuito',
--    habitLimitBody: 'En el plan gratuito puedes crear hasta 3 hábitos.',
--    hapticsDescription: 'Retroalimentación háptica',
--    reminderSectionTitle: 'Notificación de recordatorio',
--    reminderToggleLabel: 'Usar recordatorio',
--    reminderTimeLabel: 'Hora de notificación',
--    reminderNotificationBody: 'Es hora de construir tu cadena.',
--    streak7Title: '¡Racha de 7 días!',
--    streak7Message: 'Has mantenido tu cadena durante una semana completa. ¡Excelente!',
--    ok: 'OK',
--    languageChange: 'Cambiar idioma',
--    currentLanguage: 'Actual',
--    languageNameEn: 'Inglés',
--    languageNameJa: 'Japonés',
--    languageNameFr: 'Francés',
--    languageNameEs: 'Español',
--    languageNameDe: 'Alemán',
--    languageNameIt: 'Italiano',
--    languageNamePt: 'Portugués',
--    languageNameRu: 'Ruso',
--    languageNameZh: 'Chino',
--    languageNameKo: 'Coreano',
--    languageNameHi: 'Hindi',
--    languageNameId: 'Indonesio',
--    languageNameTh: 'Tailandés',
--    languageNameVi: 'Vietnamita',
--    languageNameMs: 'Malayo',
--    languageNameTr: 'Turco',
--    languageNameNl: 'Neerlandés',
--    languageNameSv: 'Sueco',
--    soundSwitchLabel: 'Activar sonido',
--    tapSoundLabel: 'Estilo del sonido de toque',
--    proOnlyTitle: 'Función solo Pro',
--    proOnlyTheme: 'Este tema está disponible con Pro.',
--
--    // --- Nuevos keys para cobertura completa ---
--    cancel: 'Cancelar',
--    delete: 'Eliminar',
--    deleteConfirmBody: '¿Seguro que quieres eliminarlo? Esta acción no se puede deshacer.',
--    comingSoonTitle: 'Próximamente',
--    onboardingPunch: 'Esto es DotChain.',
--
--    paywallBestValueBadge: 'Mejor oferta',
--    paywallMonthlyLabel: 'Plan mensual',
--    paywallMonthlySub: 'Se factura cada mes. Puedes cancelar en cualquier momento.',
--    paywallYearlyLabel: 'Plan anual',
--    paywallYearlySub: 'Se factura una vez al año. Puedes cancelar en cualquier momento.',
--
--    priceFree: '$0 / para siempre',
--    priceYearly: '$14.99 / año',
--
--    proCompareHeaderFeature: 'Función',
--    proCompareHeaderFree: 'Gratis',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      'Siempre puedes quedarte en el plan Gratis. Pro solo quita los límites.',
--    proCompareTitle: 'Lo que obtienes con Pro',
--
--    proCtaMonthly: 'Obtener Pro mensual',
--    proCtaStayFree: 'Seguir con la versión gratuita',
--    proCtaYearly: 'Obtener Pro anual',
--
--    proFeatureAdsFree: 'Banners de anuncios en la parte inferior',
--    proFeatureAdsPro: 'Sin anuncios, máxima concentración',
--    proFeatureHabits: 'Hábitos que puedes seguir',
--    proFeatureHabitsFree: 'Hasta 3 hábitos',
--    proFeatureHabitsPro: 'Hábitos ilimitados',
--    proFeatureThemesFree: '1 tema (Dark)',
--    proFeatureThemesPro: 'Todos los temas desbloqueados',
--
--    proFinePrint:
--      'La suscripción se renueva automáticamente. Puedes cancelarla en cualquier momento desde los ajustes de tu cuenta de App Store o Google Play.',
--    proMonthlyTagline: 'Empieza poco a poco, cancela cuando quieras.',
--    proPlanFreeTitle: 'Gratis',
--    proPlanMonthlyTitle: 'Mensual',
--    proPlanYearlyBadge: 'Mejor oferta',
--    proPlanYearlyTitle: 'Anual',
--    proSubtitle: 'Ve más allá de 3 hábitos y haz que tus puntos sean imparables.',
--    proYearlySavingShort: 'Ahorra alrededor de un 37% (como 8 meses gratis).',
--    proYearlyTagline: 'Para quienes se toman en serio su cadena.',
--
--    restoreSoon: 'La opción de restaurar compras se añadirá en una próxima actualización.',
--
--    themeCyberBlueLabel: 'Cyber Blue',
--    themeDarkLabel: 'Oscuro',
--    themeDesc: 'Elige el estilo de la app. (Los temas Pro llegarán más adelante.)',
--    themeNeonPinkLabel: 'Neon Pink',
--
--    tutorialEditIconBody: 'Primero, elige un ícono que coincida con tu hábito.',
--    tutorialEditNameBody:
--      'Después, escribe un nombre para tu hábito.\nPor ejemplo: "Beber agua", "Leer un libro".',
--    tutorialEditSubmitBody:
--      '¡Listo!\nPulsa el botón de crear de abajo para añadir este hábito a tu pantalla de inicio.',
--    tutorialExplainChainBody:
--      'Al tocar, tu contador de DÍAS SEGUIDOS aumenta y hoy se ilumina en TU CADENA.\nSigue para extender tu cadena.',
--    tutorialGotIt: 'Entendido',
--    tutorialNext: 'Siguiente',
--    tutorialPressFabBody:
--      'Toca el botón + en la esquina inferior derecha para crear tu primer hábito.',
--    tutorialPressHabitBody:
--      'Ahora toca el hábito que acabas de crear.\nAl tocarlo, marcas hoy como "hecho".',
--    tutorialStart: 'Empezar',
--    tutorialWelcomeBody:
--      '¡Bienvenido!\nDotChain te permite construir tu cadena de hábitos.\nEmpieza creando tu primer hábito con el botón +.',
-+  ...baseEn,
-+  // --- Home / Header ---
-+  daysStreak: 'DÍAS SEGUIDOS',
-+  yourChain: 'TU CADENA',
-+  allDoneDays: 'DÍAS COMPLETOS',
-+
-+  // --- Settings (General) ---
-+  settings: 'Ajustes',
-+  hapticOff: 'Vibración desactivada',
-+  language: 'Idioma',
-+  sound: 'Sonido',
-+  haptics: 'Respuesta háptica',
-+  theme: 'Tema',
-+
-+  // --- Purchase / Restore ---
-+  restore: 'Restaurar compras',
-+  purchaseSuccess: 'El plan Pro está activo.',
-+  purchaseFailed: 'Error en la compra. Inténtalo más tarde.',
-+  restoreSuccess: 'Historial de compras restaurado.',
-+  restoreNotFound: 'No se encontraron compras para restaurar.',
-+  restoreFailed: 'Error al restaurar las compras.',
-+
-+  // --- Settings (Sound & Info) ---
-+  version: 'Versión de la app',
-+  tapSound: 'Sonido al tocar',
-+  click: 'Clic',
-+  pop: 'Pop',
-+  soundSwitchLabel: 'Efectos de sonido',
-+
-+  // --- Pro Screen (Paywall) ---
-+  proTitle: 'Desbloquea tu cadena.',
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: 'Crea hábitos ilimitados y haz que tus puntos sean imparables.',
-+  proPlanFreeTitle: 'Gratis',
-+  proPlanMonthlyTitle: 'Mensual',
-+  proPlanYearlyTitle: 'Anual',
-+  proPlanYearlyBadge: 'Mejor opción',
-+  proBadgeShort: 'PRO',
-+  priceFree: '0 € / para siempre',
-+  proOnlyTitle: 'Función Pro',
-+  proOnlyTheme: 'Pásate a Pro para usar este tema.',
-+  openPro: 'Ver plan Pro',
-+  cancel: 'Cancelar',
-+
-+  // --- Settings (Appearance) ---
-+  flowEffectTitle: 'Animación de flujo eléctrico',
-+  flowEffectHelp:
-+    'Haz que un flujo de neón recorra la línea de tu cadena. Apágalo si prefieres una vista más tranquila.',
-+
-+  // --- Heatmap Range (Settings) ---
-+  heatmapRangeTitle: 'Periodo de visualización',
-+  heatmapRangeHelp: 'Elige cuántos días de tu cadena mostrar en el mapa de calor.',
-+  heatmapRange7: '1 semana',
-+  heatmapRange30: '1 mes',
-+  heatmapRange60: '2 meses',
-+  heatmapRange90: '3 meses',
-+  heatmapRange180: '6 meses',
-+  heatmapRange365: '1 año',
-+  heatmapSummaryPrefix: 'Últimos ',
-+  heatmapSummarySuffix: ' días',
-+  heatmapAgoSuffix: ' días atrás',
-+  heatmapToday: 'Hoy',
-+
-+  // --- Themes ---
-+  themeDesc: 'Cambia la apariencia de la aplicación.',
-+  themeDarkLabel: 'Oscuro',
-+  themeNeonPinkLabel: 'Neón Rosa',
-+  themeCyberBlueLabel: 'Ciber Azul',
-+  freeThemeNote: 'Gratis: Solo Oscuro / Pro desbloquea Neón Rosa y Ciber Azul',
-+  proThemeNote: 'Los temas Pro estarán disponibles pronto.',
-+
-+  // --- Habit Management ---
-+  newHabitTitle: 'Nuevo hábito',
-+  editHabitTitle: 'Editar hábito',
-+  habitNameLabel: 'Nombre',
-+  habitNamePlaceholder: 'ej: Leer un libro, Beber agua',
-+  habitIconLabel: 'Icono',
-+  deleteHabit: 'Eliminar este hábito',
-+  deleteConfirmationTitle: '¿Eliminar?',
-+  deleteConfirmationMessage: 'Esta acción no se puede deshacer. Se perderá todo el historial.',
-+  save: 'Guardar',
-+  create: 'Crear',
-+
-+  // --- Icon Categories & Labels ---
-+  iconCatBasic: 'Básico',
-+  iconCatHealth: 'Salud',
-+  iconCatLearning: 'Aprendizaje',
-+
-+  iconLabelStreak: 'Racha',
-+  iconLabelTask: 'Tarea',
-+  iconLabelShine: 'Brillo',
-+  iconLabelClean: 'Limpieza',
-+  iconLabelLaundry: 'Colada',
-+  iconLabelWater: 'Agua',
-+  iconLabelWalk: 'Paseo',
-+  iconLabelSleep: 'Sueño',
-+  iconLabelWorkout: 'Entreno',
-+  iconLabelBarbell: 'Pesas',
-+  iconLabelRead: 'Lectura',
-+  iconLabelArt: 'Arte',
-+  iconLabelMedia: 'Medios',
-+  iconLabelStudy: 'Estudio',
-+  iconLabelLanguage: 'Idiomas',
-+
-+  // --- Misc / Errors ---
-+  habitButtonSuffix: ' botón de hábito',
-+  errorLoadFailed: 'Error al cargar los datos.',
-+  errorTitleRequired: 'El título es obligatorio.',
-+  errorTitleTooLong: 'El título debe tener 20 caracteres o menos.',
-+  errorSaveFailed: 'Error al guardar.',
-+  errorDeleteFailed: 'Error al eliminar.',
-+  errorToggleFailed: 'Error al actualizar.',
-+  habitLimitTitle: 'Límite del plan gratuito',
-+  habitLimitBody: 'En el plan gratuito puedes crear hasta 3 hábitos.',
-+
-+  // --- Settings description ---
-+  hapticsDescription: 'Respuesta háptica (vibración)',
-+
-+  // --- Reminder ---
-+  reminderSectionTitle: 'Recordatorios',
-+  reminderToggleLabel: 'Usar recordatorio',
-+  reminderTimeLabel: 'Hora de notificación',
-+  reminderNotificationBody: '¡Es hora de construir tu cadena!',
-+
-+  // --- Review (7-day streak) ---
-+  streak7Title: '¡Racha de 7 días!',
-+  streak7Message: 'Has mantenido tu cadena una semana completa. ¡Buen trabajo!',
-+  ok: 'Genial',
-+
-+  // --- Language labels ---
-+  languageChange: 'Cambiar idioma',
-+  currentLanguage: 'Actual',
-+  languageNameEn: 'Inglés',
-+  languageNameJa: 'Japonés',
-+  languageNameFr: 'Francés',
-+  languageNameEs: 'Español',
-+  languageNameDe: 'Alemán',
-+  languageNameIt: 'Italiano',
-+  languageNamePt: 'Portugués',
-+  languageNameRu: 'Ruso',
-+  languageNameZh: 'Chino',
-+  languageNameKo: 'Coreano',
-+  languageNameHi: 'Hindi',
-+  languageNameId: 'Indonesio',
-+  languageNameTh: 'Tailandés',
-+  languageNameVi: 'Vietnamita',
-+  languageNameMs: 'Malayo',
-+  languageNameTr: 'Turco',
-+  languageNameNl: 'Holandés',
-+  languageNameSv: 'Sueco',
-+
-+  // --- Tutorial ---
-+  tutorialNext: 'Siguiente',
-+  tutorialWelcome: 'Bienvenido a DotChain',
-+  tutorialDesc1: 'Conecta tus hábitos diarios y construye tu propia cadena.',
-+  tutorialDesc2: 'No rompas la cadena para que el hábito perdure.',
-+  tutorialStart: '¡Empezar!',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/fr.ts b/src/core/i18n/locales/fr.ts
-index 462b995..a267c06 100644
---- a/src/core/i18n/locales/fr.ts
-+++ b/src/core/i18n/locales/fr.ts
-@@ -1,177 +1,224 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'JOURS DE SUITE',
--    yourChain: 'TA CHAÎNE',
--    allDoneDays: 'JOURS COMPLÈTS',
--    settings: 'Réglages',
--    hapticOff: 'Vibrations désactivées',
--    language: 'Langue',
--    sound: 'Son',
--    haptics: 'Vibrations',
--    theme: 'Thème',
--    restore: 'Restaurer les achats',
--    version: "Version de l’app",
--    tapSound: 'Son du tap',
--    click: 'Clic',
--    pop: 'Pop',
--    flowEffectTitle: 'Animation de flux électrique',
--    flowEffectHelp:
--      'Fais circuler un flux néon le long de ta chaîne. Désactive si tu préfères un rendu plus calme.',
--    heatmapRangeTitle: 'Période d’affichage de la chaîne',
--    heatmapRangeHelp: 'Choisissez combien de jours de votre chaîne afficher sur la heatmap d’accueil.',
--    heatmapRange7: '1 semaine',
--    heatmapRange30: '1 mois',
--    heatmapRange60: '2 mois',
--    heatmapRange180: '6 mois',
--    heatmapRange365: '1 an',
--    heatmapSummaryPrefix: 'Derniers ',
--    heatmapSummarySuffix: ' jours',
--    heatmapAgoSuffix: ' jours auparavant',
--    heatmapToday: "Aujourd`hui",
--    freeThemeNote: `Gratuit : Dark uniquement / Pro déverrouille Neon Pink et Cyber Blue`,
--    proThemeNote: `Les thèmes Pro seront déverrouillés plus tard.`,
--    restoreDesc: `Restaurer les achats (plus tard)`,
--    licenses: `Licences open source (plus tard)`,
--    openPro: `Ouvrir DotChain Pro`,
--    heroPaywall: `Passe en mode néon`,
--    priceMonthly: `$1.99 / mois`,
--    priceFree: `$0 / pour toujours`,
--    priceYearly: `$14.99 / an`,
--
--    onboardingTitle: `Bienvenue sur DotChain`,
--    onboardingBody: `Un tap, grosse vibration. Construisons la chaîne du jour.`,
--    onboardingPunch: `Ceci est DotChain.`,
--    start: `Commencer`,
--    paywallNote: `La facturation et les annonces seront ajoutées plus tard.`,
--
--    // Paywall / Pro
--    paywallMonthlyLabel: `Abonnement mensuel`,
--    paywallMonthlySub: `Facturé chaque mois. Résiliable à tout moment.`,
--    paywallYearlyLabel: `Abonnement annuel`,
--    paywallYearlySub: `Facturé une fois par an. Résiliable à tout moment.`,
--    paywallBestValueBadge: `Meilleur rapport qualité-prix`,
--    comingSoonTitle: `Bientôt disponible`,
--
--    proSubtitle: `Dépasse 3 habitudes et rends ta chaîne inarrêtable.`,
--    proPlanFreeTitle: `Gratuit`,
--    proPlanMonthlyTitle: `Mensuel`,
--    proPlanYearlyTitle: `Annuel`,
--    proPlanYearlyBadge: `Meilleur choix`,
--    proMonthlyTagline: `Commence petit, résilie quand tu veux.`,
--    proYearlyTagline: `Pour les bâtisseurs de chaîne déterminés.`,
--    proYearlySavingShort: `Économise environ 37 % (comme 8 mois offerts).`,
--
--    proCompareTitle: `Ce que tu obtiens avec Pro`,
--    proCompareSubtitle:
--      `Tu peux rester sur Gratuit. Pro enlève simplement les limites.`,
--    proCompareHeaderFeature: `Fonction`,
--    proCompareHeaderFree: `Gratuit`,
--    proCompareHeaderPro: `Pro`,
--    proFeatureHabits: `Habitudes que tu peux suivre`,
--    proFeatureHabitsFree: `Jusqu’à 3 habitudes`,
--    proFeatureHabitsPro: `Habitudes illimitées`,
--    proFeatureThemesFree: `1 thème (Dark)`,
--    proFeatureThemesPro: `Tous les thèmes débloqués`,
--    proFeatureAdsFree: `Bannière pub en bas`,
--    proFeatureAdsPro: `Pas de pub, concentration totale`,
--
--    proTitle: `Déverrouille ta chaîne.`,
--    proHeaderTitle: `DotChain Pro`,
--    proFeatureUnlimited: `Habitudes illimitées`,
--    proFeatureThemes: `Tous les thèmes débloqués (Neon Pink / Cyber Blue)`,
--    proFeatureAds: `Sans publicité`,
--    proCtaYearly: `Choisir Pro annuel`,
--    proCtaMonthly: `Choisir Pro mensuel`,
--    proCtaStayFree: `Continuer en gratuit`,
--    proFinePrint:
--      `L’abonnement se renouvelle automatiquement. Tu peux le résilier à tout moment dans les réglages de ton compte App Store ou Google Play.`,
--
--    // Thèmes
--    themeDarkLabel: `Sombre`,
--    themeNeonPinkLabel: `Neon Pink`,
--    themeCyberBlueLabel: `Cyber Blue`,
--    themeDesc: `Choisis l’ambiance qui te plaît. (Les thèmes Pro arrivent plus tard.)`,
--    restoreSoon: `La restauration des achats sera ajoutée dans une prochaine mise à jour.`,
--
--    // Onboarding / Tutoriel
--    tutorialWelcomeBody:
--      `Bienvenue !\\nDotChain t’aide à construire ta chaîne d’habitudes.\\nCommence en créant ta première habitude avec le bouton +.`,
--    tutorialPressFabBody:
--      `Appuie sur le bouton + en bas à droite pour créer ta première habitude.`,
--    tutorialPressHabitBody:
--      `Appuie maintenant sur l’habitude que tu viens de créer.\\nChaque appui marque le jour comme « fait ».`,
--    tutorialExplainChainBody:
--      `En appuyant, tes JOURS DE SUITE augmentent et aujourd’hui s’allume sur TA CHAÎNE.\\nContinue pour allonger ta chaîne.`,
--    tutorialEditIconBody:
--      `Choisis d’abord une icône qui correspond à ton habitude.`,
--    tutorialEditNameBody:
--      `Ensuite, donne un nom à ton habitude.\\nPar exemple : « Boire de l’eau », « Lire un livre ».`,
--    tutorialEditSubmitBody:
--      `C’est prêt !\\nAppuie sur le bouton de création ci-dessous pour ajouter cette habitude à ton écran d’accueil.`,
--    tutorialNext: `Suivant`,
--    tutorialStart: `Commencer`,
--    tutorialGotIt: `Compris`,
--
--    // Suppression
--    deleteConfirmBody: `Voulez-vous vraiment supprimer ? Cette action est irréversible.`,
--    cancel: `Annuler`,
--    delete: `Supprimer`,
--    homeLoading: `Chargement...`,
--    homeAddHabitLabel: `Ajouter une habitude`,
--    editNewHabit: `Nouvelle habitude`,
--    editHabitTitle: "Modifier l`habitude",
--    editCategoryLabel: 'Catégorie',
--    editNameLabel: 'Nom (20 caractères max)',
--    editNamePlaceholder: 'Nomme ton habitude...',
--    editSaveChanges: 'Enregistrer',
--    editCreateHabit: "Créer l`habitude",
--    editDeleteHabit: "Supprimer l`habitude",
--    habitButtonSuffix: " bouton d’habitude",
--    iconCatBasic: 'Basique',
--    iconCatHealth: 'Santé',
--    iconCatLearning: 'Apprentissage & Travail',
--    errorLoadFailed: 'Échec du chargement des données',
--    errorTitleRequired: 'Le titre est obligatoire.',
--    errorTitleTooLong: 'Le titre doit comporter au maximum 20 caractères.',
--    errorSaveFailed: 'Échec de la sauvegarde.',
--    errorDeleteFailed: 'Échec de la suppression.',
--    errorToggleFailed: 'Échec de la mise à jour.',
--    habitLimitTitle: 'Limite de l’offre gratuite',
--    habitLimitBody: 'Avec l’offre gratuite, vous pouvez créer jusqu’à 3 habitudes.',
--    hapticsDescription: 'Retour haptique',
--    reminderSectionTitle: 'Notification de rappel',
--    reminderToggleLabel: 'Activer le rappel',
--    reminderTimeLabel: "Heure de notification",
--    reminderNotificationBody: 'Il est temps de renforcer ta chaîne.',
--    streak7Title: 'Série de 7 jours !',
--    streak7Message: 'Vous avez tenu votre chaîne pendant une semaine complète. Bravo !',
--    ok: 'OK',
--    languageChange: 'Changer la langue',
--    currentLanguage: 'Actuelle',
--    languageNameEn: 'Anglais',
--    languageNameJa: 'Japonais',
--    languageNameFr: 'Français',
--    languageNameEs: 'Espagnol',
--    languageNameDe: 'Allemand',
--    languageNameIt: 'Italien',
--    languageNamePt: 'Portugais',
--    languageNameRu: 'Russe',
--    languageNameZh: 'Chinois',
--    languageNameKo: 'Coréen',
--    languageNameHi: 'Hindi',
--    languageNameId: 'Indonésien',
--    languageNameTh: 'Thaï',
--    languageNameVi: 'Vietnamien',
--    languageNameMs: 'Malais',
--    languageNameTr: 'Turc',
--    languageNameNl: 'Néerlandais',
--    languageNameSv: 'Suédois',
--    soundSwitchLabel: 'Activer le son',
--    tapSoundLabel: 'Style du son de tap',
--    proOnlyTitle: 'Fonction réservée au Pro',
--    proOnlyTheme: 'Ce thème est disponible avec Pro.',
-+  ...baseEn,
-+  // --- Home / Header ---
-+  daysStreak: 'JOURS DE SUITE',
-+  yourChain: 'TA CHAÎNE',
-+  allDoneDays: 'JOURS TERMINÉS',
-+
-+  // --- Settings (General) ---
-+  settings: 'Paramètres',
-+  hapticOff: 'Vibrations désactivées',
-+  language: 'Langue',
-+  sound: 'Son',
-+  haptics: 'Vibrations',
-+  theme: 'Thème',
-+
-+  // --- Purchase / Restore ---
-+  restore: 'Restaurer les achats',
-+  purchaseSuccess: 'Le plan Pro est maintenant actif.',
-+  purchaseFailed: 'L’achat a échoué. Veuillez réessayer plus tard.',
-+  restoreSuccess: 'Historique d’achat restauré.',
-+  restoreNotFound: 'Aucun achat trouvé à restaurer.',
-+  restoreFailed: 'Échec de la restauration des achats.',
-+
-+  // --- Settings (Sound & Info) ---
-+  version: 'Version de l’app',
-+  tapSound: 'Son du tap',
-+  click: 'Clic',
-+  pop: 'Pop',
-+  
-+  // --- Paywall / Pro Screen ---
-+  proSubtitle: 'Dépasse 3 habitudes et rends tes points inarrêtables.',
-+  proPlanFreeTitle: 'Gratuit',
-+  proPlanMonthlyTitle: 'Mensuel',
-+  proPlanYearlyTitle: 'Annuel',
-+  proPlanYearlyBadge: 'Meilleure offre',
-+  proBadgeShort: 'PRO',
-+  priceFree: '0 € / pour toujours',
-+  
-+  flowEffectTitle: 'Animation de flux électrique',
-+  flowEffectHelp:
-+    'Laisse un flux néon parcourir ta chaîne. Désactive-le si tu préfères un rendu plus calme.',
-+
-+  // --- Heatmap Range (Settings) ---
-+  heatmapRangeTitle: 'Plage d’affichage de la chaîne',
-+  heatmapRangeHelp: 'Choisis le nombre de jours de ta chaîne à afficher sur la carte thermique.',
-+  heatmapRange7: '1 semaine',
-+  heatmapRange30: '1 mois',
-+  heatmapRange60: '2 mois',
-+  heatmapRange180: '6 mois',
-+  heatmapRange365: '1 an',
-+  heatmapSummaryPrefix: 'Les derniers ',
-+  heatmapSummarySuffix: ' jours',
-+  heatmapAgoSuffix: ' jours plus tôt',
-+  heatmapToday: 'Aujourd’hui',
-+
-+  priceMonthly: '1,99 € / mois',
-+  priceYearly: '14,99 € / an',
-+  proMonthlyTagline: 'Commence petit, annule à tout moment.',
-+  proYearlyTagline: 'Pour les bâtisseurs de chaîne sérieux.',
-+  proYearlySavingShort: 'Économise environ 37 % (soit 8 mois gratuits).',
-+
-+  proCompareTitle: 'Ce que tu obtiens avec Pro',
-+  proCompareSubtitle: 'Tu peux rester en Gratuit. Pro supprime juste les limites.',
-+  proCompareHeaderFeature: 'Fonctionnalité',
-+  proCompareHeaderFree: 'Gratuit',
-+  proCompareHeaderPro: 'Pro',
-+  proFeatureHabits: 'Habitudes suivies',
-+  proFeatureHabitsFree: 'Jusqu’à 3 habitudes',
-+  proFeatureHabitsPro: 'Habitudes illimitées',
-+  proFeatureThemesFree: '1 thème (Sombre)',
-+  proFeatureThemesPro: 'Tous les thèmes débloqués',
-+  proFeatureAdsFree: '',
-+  proFeatureAdsPro: '',
-+
-+  proOnlyTitle: 'Fonctionnalité Pro',
-+  proOnlyTheme: 'Ce thème est disponible avec Pro.',
-+  proCtaYearly: 'Prendre Pro Annuel',
-+  proCtaMonthly: 'Prendre Pro Mensuel',
-+  proCtaStayFree: 'Continuer en Gratuit',
-+  proFinePrint:
-+    'L’abonnement se renouvelle automatiquement. Tu peux annuler à tout moment dans les paramètres de ton compte App Store ou Google Play.',
-+
-+  paywallMonthlyLabel: 'Forfait mensuel',
-+  paywallYearlyLabel: 'Forfait annuel',
-+  paywallBestValueBadge: 'Meilleure valeur',
-+  paywallYearlySub: 'Facturé une fois par an. Annule quand tu veux.',
-+  paywallMonthlySub: 'Facturé chaque mois. Annule quand tu veux.',
-+  comingSoonTitle: 'Bientôt disponible',
-+
-+  // --- Themes ---
-+  themeDarkLabel: 'Sombre',
-+  themeNeonPinkLabel: 'Néon Rose',
-+  themeCyberBlueLabel: 'Cyber Bleu',
-+  themeDesc: 'Choisis ton ambiance. (Les thèmes Pro arriveront plus tard.)',
-+  restoreSoon: 'La restauration des achats sera ajoutée dans une future mise à jour.',
-+  freeThemeNote: 'Gratuit : Sombre uniquement / Pro débloque Néon Rose et Cyber Bleu',
-+  proThemeNote: 'Les thèmes Pro se débloquent après l’implémentation du paywall.',
-+  restoreDesc: 'Restaurer les achats effectués sur ce compte.',
-+  licenses: 'Licences Open Source (plus tard)',
-+  openPro: 'Ouvrir DotChain Pro',
-+  heroPaywall: 'Passe au monde néon',
-+  
-+  onboardingTitle: 'Bienvenue sur DotChain',
-+  onboardingBody: 'Un tap, une vibration forte. Construisons la chaîne d’aujourd’hui.',
-+  onboardingPunch: 'C’est DotChain.',
-+  start: 'Commencer',
-+  paywallNote: 'Facturation/Pubs seront ajoutées plus tard.',
-+
-+  // --- Tutorial / Onboarding flow ---
-+  tutorialWelcomeBody:
-+    'Bienvenue !\nDotChain te permet de construire ta chaîne d’habitudes.\nCommence par créer ta première habitude avec le bouton +.',
-+  tutorialPressFabBody: 'Appuie sur le bouton + en bas à droite pour créer ta première habitude.',
-+  tutorialPressHabitBody: 'Maintenant, appuie sur l’habitude que tu viens de créer.\nAppuyer marque la journée comme "faite".',
-+  tutorialExplainChainBody:
-+    'En appuyant, ta SÉRIE DE JOURS augmente et aujourd’hui s’allume sur TA CHAÎNE.\nContinue pour étendre ta chaîne.',
-+  tutorialEditIconBody: 'D’abord, choisis une icône qui correspond à ton habitude.',
-+  tutorialEditNameBody: 'Ensuite, entre un nom pour ton habitude.\nPar exemple : "Boire de l’eau", "Lire un livre".',
-+  tutorialEditSubmitBody: 'Tu es prêt !\nAppuie sur le bouton créer ci-dessous pour ajouter cette habitude à ton écran d’accueil.',
-+  tutorialNext: 'Suivant',
-+  tutorialStart: 'Démarrer',
-+  tutorialGotIt: 'Compris',
-+
-+  // --- Home ---
-+  homeLoading: 'Chargement...',
-+  homeAddHabitLabel: 'Ajouter une habitude',
-+
-+  // --- Edit ---
-+  editNewHabit: 'Nouvelle habitude',
-+  editHabitTitle: 'Modifier l’habitude',
-+  editCategoryLabel: 'Catégorie',
-+  editNameLabel: 'Nom (max 20 caractères)',
-+  editNamePlaceholder: 'Nomme ton habitude...',
-+  editSaveChanges: 'Enregistrer',
-+  editCreateHabit: 'Créer l’habitude',
-+  editDeleteHabit: 'Supprimer l’habitude',
-+  deleteConfirmBody: 'Es-tu sûr ? Cette action est irréversible.',
-+  cancel: 'Annuler',
-+  delete: 'Supprimer',
-+
-+  // --- Icon Categories & Labels ---
-+  iconCatBasic: 'Basique',
-+  iconCatHealth: 'Santé',
-+  iconCatLearning: 'Apprentissage & Travail',
-+
-+  iconLabelStreak: 'Série',
-+  iconLabelTask: 'Tâche',
-+  iconLabelShine: 'Briller',
-+  iconLabelClean: 'Nettoyer',
-+  iconLabelLaundry: 'Lessive',
-+  iconLabelWater: 'Eau',
-+  iconLabelWalk: 'Marche',
-+  iconLabelSleep: 'Sommeil',
-+  iconLabelWorkout: 'Entraînement',
-+  iconLabelBarbell: 'Haltère',
-+  iconLabelRead: 'Lire',
-+  iconLabelArt: 'Art',
-+  iconLabelMedia: 'Média',
-+  iconLabelStudy: 'Études',
-+  iconLabelLanguage: 'Langue',
-+
-+  // --- Pro ---
-+  proTitle: 'Débloque ta chaîne.',
-+  proHeaderTitle: 'DotChain Pro',
-+  proFeatureUnlimited: 'Habitudes illimitées',
-+  proFeatureThemes: 'Tous les thèmes débloqués (Néon Rose / Cyber Bleu)',
-+  proFeatureAds: '',
-+
-+  // --- Accessibility ---
-+  habitButtonSuffix: ' bouton d’habitude',
-+
-+  // --- Misc / Errors ---
-+  errorLoadFailed: 'Échec du chargement des données',
-+  errorTitleRequired: 'Le titre est requis.',
-+  errorTitleTooLong: 'Le titre doit faire 20 caractères ou moins.',
-+  errorSaveFailed: 'Échec de l’enregistrement.',
-+  errorDeleteFailed: 'Échec de la suppression.',
-+  errorToggleFailed: 'Échec de la mise à jour.',
-+  habitLimitTitle: 'Limite du plan gratuit',
-+  habitLimitBody: 'Sur le plan gratuit, tu peux créer jusqu’à 3 habitudes.',
-+
-+  // --- Settings description ---
-+  hapticsDescription: 'Retour haptique',
-+
-+  // --- Reminder ---
-+  reminderSectionTitle: 'Notification de rappel',
-+  reminderToggleLabel: 'Utiliser le rappel',
-+  reminderTimeLabel: 'Heure de notification',
-+  reminderNotificationBody: 'Il est temps de construire ta chaîne.',
-+
-+  // --- Review (7-day streak) ---
-+  streak7Title: 'Série de 7 jours !',
-+  streak7Message: 'Tu as gardé ta chaîne pendant une semaine entière. Bravo !',
-+  ok: 'OK',
-+
-+  // --- Language labels ---
-+  languageChange: 'Changer de langue',
-+  currentLanguage: 'Actuel',
-+  languageNameEn: 'Anglais',
-+  languageNameJa: 'Japonais',
-+  languageNameFr: 'Français',
-+  languageNameEs: 'Espagnol',
-+  languageNameDe: 'Allemand',
-+  languageNameIt: 'Italien',
-+  languageNamePt: 'Portugais',
-+  languageNameRu: 'Russe',
-+  languageNameZh: 'Chinois',
-+  languageNameKo: 'Coréen',
-+  languageNameHi: 'Hindi',
-+  languageNameId: 'Indonésien',
-+  languageNameTh: 'Thaï',
-+  languageNameVi: 'Vietnamien',
-+  languageNameMs: 'Malais',
-+  languageNameTr: 'Turc',
-+  languageNameNl: 'Néerlandais',
-+  languageNameSv: 'Suédois',
-+
-+  // --- Sound labels ---
-+  soundSwitchLabel: 'Activer le son',
-+  tapSoundLabel: 'Style de son au toucher',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/hi.ts b/src/core/i18n/locales/hi.ts
-index 39be7fe..b8ae366 100644
---- a/src/core/i18n/locales/hi.ts
-+++ b/src/core/i18n/locales/hi.ts
-@@ -1,174 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'लगातार दिन',
--    yourChain: 'आपकी चेन',
--    allDoneDays: 'सभी पूरे हुए दिन',
--    settings: 'सेटिंग्स',
--    hapticOff: 'वाइब्रेशन बंद',
--    language: 'भाषा',
--    sound: 'साउंड',
--    haptics: 'वाइब्रेशन',
--    theme: 'थीम',
--    restore: 'खरीद पुनर्स्थापित करें',
--    version: 'ऐप संस्करण',
--    tapSound: 'टैप साउंड',
--    click: 'क्लिक',
--    pop: 'पॉप',
--    flowEffectTitle: 'इलेक्ट्रिक फ्लो ऐनिमेशन',
--    flowEffectHelp: 'चेन की लाइन पर नियोन जैसी धारा बहती है। शांत लुक चाहिए तो इसे बंद करें।',
--    heatmapRangeTitle: 'चेन दिखाने की अवधि',
--    heatmapRangeHelp: 'होम हीटमैप में चेन के कितने दिन दिखाने हैं, चुनें।',
--    heatmapRange7: '1 सप्ताह',
--    heatmapRange30: '1 माह',
--    heatmapRange60: '2 माह',
--    heatmapRange180: '6 माह',
--    heatmapRange365: '1 वर्ष',
--    heatmapSummaryPrefix: 'पिछले ',
--    heatmapSummarySuffix: ' दिन',
--    heatmapAgoSuffix: ' दिन पहले',
--    heatmapToday: 'आज',
--    freeThemeNote: 'फ्री: केवल डार्क / Pro में Neon Pink और Cyber Blue अनलॉक होते हैं',
--    proThemeNote: 'Pro थीम भुगतान के बाद सक्रिय होंगे।',
--    restoreDesc: 'खरीद पुनर्स्थापित (जल्द)',
--    licenses: 'ओपन सोर्स लाइसेंस (जल्द)',
--    openPro: 'DotChain Pro खोलें',
--    heroPaywall: 'नीऑन दुनिया में अपग्रेड करें',
--    priceMonthly: '$1.99 / माह',
--    onboardingTitle: 'DotChain में स्वागत है',
--    onboardingBody: 'एक टैप, तेज वाइब्रेशन। आज की चेन बनाएं।',
--    start: 'शुरू करें',
--    paywallNote: 'बिलिंग और विज्ञापन सुविधाएँ बाद में जोड़ी जाएँगी।',
--    homeLoading: 'लोड हो रहा है...',
--    homeAddHabitLabel: 'आदत जोड़ें',
--    editNewHabit: 'नई आदत',
--    editHabitTitle: 'आदत संपादित करें',
--    editCategoryLabel: 'श्रेणी',
--    editNameLabel: 'नाम (अधिकतम 20 अक्षर)',
--    editNamePlaceholder: 'अपनी आदत का नाम लिखें...',
--    editSaveChanges: 'परिवर्तन सहेजें',
--    editCreateHabit: 'आदत बनाएं',
--    editDeleteHabit: 'आदत हटाएं',
--    proTitle: 'अपनी चेन अनलॉक करें।',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'असीमित आदतें',
--    proFeatureThemes: 'सभी थीम अनलॉक (Neon Pink / Cyber Blue)',
--    proFeatureAds: 'कोई विज्ञापन नहीं',
--    habitButtonSuffix: ' आदत बटन',
--    iconCatBasic: 'बेसिक',
--    iconCatHealth: 'स्वास्थ्य',
--    iconCatLearning: 'सीखना व काम',
--    errorLoadFailed: 'डेटा लोड करने में विफल',
--    errorTitleRequired: 'शीर्षक आवश्यक है।',
--    errorTitleTooLong: 'शीर्षक 20 वर्ण या उससे कम होना चाहिए।',
--    errorSaveFailed: 'सहेजने में विफल।',
--    errorDeleteFailed: 'हटाने में विफल।',
--    errorToggleFailed: 'रिकॉर्ड अपडेट करने में विफल।',
--    habitLimitTitle: 'मुफ़्त योजना की सीमा',
--    habitLimitBody: 'मुफ़्त योजना में आप अधिकतम 3 आदतें बना सकते हैं।',
--    hapticsDescription: 'हैप्टिक फीडबैक',
--    reminderSectionTitle: 'रिमाइंडर सूचना',
--    reminderToggleLabel: 'रिमाइंडर उपयोग करें',
--    reminderTimeLabel: 'सूचना का समय',
--    reminderNotificationBody: 'अपनी चेन आगे बढ़ाने का समय है।',
--    streak7Title: '7 दिन की श्रृंखला!',
--    streak7Message: 'आपने पूरा एक सप्ताह श्रृंखला बनाए रखी। शानदार!',
--    ok: 'ठीक है',
--    languageChange: 'भाषा बदलें',
--    currentLanguage: 'वर्तमान',
--    languageNameEn: 'अंग्रेज़ी',
--    languageNameJa: 'जापानी',
--    languageNameFr: 'फ़्रेंच',
--    languageNameEs: 'स्पेनिश',
--    languageNameDe: 'जर्मन',
--    languageNameIt: 'इतालवी',
--    languageNamePt: 'पुर्तगाली',
--    languageNameRu: 'रूसी',
--    languageNameZh: 'चीनी',
--    languageNameKo: 'कोरियाई',
--    languageNameHi: 'हिन्दी',
--    languageNameId: 'इंडोनेशियाई',
--    languageNameTh: 'थाई',
--    languageNameVi: 'वियतनामी',
--    languageNameMs: 'मलय',
--    languageNameTr: 'तुर्की',
--    languageNameNl: 'डच',
--    languageNameSv: 'स्वीडिश',
--    soundSwitchLabel: 'ध्वनि चालू करें',
--    tapSoundLabel: 'टैप ध्वनि शैली',
--    proOnlyTitle: 'केवल प्रो के लिए',
--    proOnlyTheme: 'यह थीम प्रो में उपलब्ध है।',
--
--    // अनुपस्थित कुंजियों का追加
--    cancel: 'रद्द करें',
--    delete: 'हटाएँ',
--    deleteConfirmBody: 'क्या आप वाकई हटाना चाहते हैं? यह क्रिया वापस नहीं ली जा सकती।',
--    comingSoonTitle: 'जल्द ही आ रहा है',
--    onboardingPunch: 'यही है DotChain।',
--
--    paywallBestValueBadge: 'सबसे किफायती',
--    paywallMonthlyLabel: 'मासिक योजना',
--    paywallMonthlySub: 'हर महीने बिलिंग। कभी भी रद्द करें।',
--    paywallYearlyLabel: 'वार्षिक योजना',
--    paywallYearlySub: 'साल में एक बार बिलिंग। कभी भी रद्द करें।',
--
--    priceFree: '$0 / हमेशा के लिए',
--    priceYearly: '$14.99 / वर्ष',
--
--    proCompareHeaderFeature: 'फ़ीचर',
--    proCompareHeaderFree: 'मुफ़्त',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      'आप चाहें तो हमेशा मुफ़्त प्लान पर रह सकते हैं। Pro सिर्फ़ सीमाएँ हटाता है।',
--    proCompareTitle: 'Pro लेने पर आपको क्या मिलता है',
--
--    proCtaMonthly: 'मासिक Pro प्लान लें',
--    proCtaStayFree: 'मुफ़्त संस्करण जारी रखें',
--    proCtaYearly: 'वार्षिक Pro प्लान लें',
--
--    proFeatureAdsFree: 'स्क्रीन के नीचे बैनर विज्ञापन',
--    proFeatureAdsPro: 'कोई विज्ञापन नहीं, पूरा ध्यान',
--    proFeatureHabits: 'जिन आदतों को आप ट्रैक कर सकते हैं',
--    proFeatureHabitsFree: 'अधिकतम 3 आदतें',
--    proFeatureHabitsPro: 'असीमित आदतें',
--    proFeatureThemesFree: '1 थीम (डार्क)',
--    proFeatureThemesPro: 'सभी थीम अनलॉक',
--
--    proFinePrint:
--      'सदस्यता अपने-आप नवीनीकृत हो जाती है। आप App Store या Google Play की अकाउंट सेटिंग्स से कभी भी रद्द कर सकते हैं।',
--    proMonthlyTagline: 'छोटे से शुरुआत करें, कभी भी रद्द करें।',
--    proPlanFreeTitle: 'मुफ़्त',
--    proPlanMonthlyTitle: 'मासिक',
--    proPlanYearlyBadge: 'सबसे किफायती',
--    proPlanYearlyTitle: 'वार्षिक',
--    proSubtitle: '3 आदतों की सीमा से आगे बढ़ें और अपनी चेन को रोकना मुश्किल बनाएं।',
--    proYearlySavingShort: 'लगभग 37% बचत (लगभग 8 महीने मुफ़्त के बराबर)।',
--    proYearlyTagline: 'जो अपनी चेन को गंभीरता से बनाना चाहते हैं, उनके लिए।',
--
--    restoreSoon: 'खरीद बहाल करने का विकल्प आने वाले अपडेट में जोड़ा जाएगा।',
--
--    themeCyberBlueLabel: 'साइबर ब्लू',
--    themeDarkLabel: 'डार्क',
--    themeDesc: 'ऐप का माहौल चुनें। (Pro थीम बाद में जोड़े जाएंगे।)',
--    themeNeonPinkLabel: 'नियोन पिंक',
--
--    tutorialEditIconBody: 'सबसे पहले, अपनी आदत से मेल खाता एक आइकन चुनें।',
--    tutorialEditNameBody:
--      'फिर, अपनी आदत के लिए नाम लिखें।\nजैसे: "पानी पिएँ", "किताब पढ़ें"।',
--    tutorialEditSubmitBody:
--      'सब तैयार है!\nइस आदत को होम स्क्रीन में जोड़ने के लिए नीचे दिए गए "बनाएँ" बटन को टैप करें।',
--    tutorialExplainChainBody:
--      'हर टैप पर आपका "लगातार दिन" काउंटर बढ़ता है और आज का दिन "आपकी चेन" पर हाइलाइट हो जाता है।\nलगातार करते रहें, आपकी चेन लंबी होती जाएगी।',
--    tutorialGotIt: 'समझ गया',
--    tutorialNext: 'आगे',
--    tutorialPressFabBody:
--      'नीचे दाएँ कोने में + बटन दबाकर पहली आदत बनाएं।',
--    tutorialPressHabitBody:
--      'अब वह आदत टैप करें जो आपने अभी बनाई है।\nटैप करने से आज "पूरा" चिन्हित हो जाएगा।',
--    tutorialStart: 'शुरू करें',
--    tutorialWelcomeBody:
--      'स्वागत है!\nDotChain आपको आदतों की चेन बनाने में मदद करता है।\nसबसे पहले + बटन से अपनी पहली आदत बनाएँ।',
-+  ...baseEn,
-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
-+  daysStreak: 'लगातार दिन',          // 英語: DAYS STREAK (連続日数)
-+  yourChain: 'आपकी चेन',             // 英語: YOUR CHAIN (あなたのチェーン)
-+  allDoneDays: 'पूरे किए गए दिन',    // 英語: ALL DONE DAYS (全て完了した日)
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: 'सेटिंग्स',              // 設定 (Settings)
-+  hapticOff: 'वाइब्रेशन बंद',        // 振動オフ
-+  language: 'भाषा',                  // 言語
-+  sound: 'साउंड',                    // 音 (Sound)
-+  haptics: 'हैप्टिक्स',              // 振動 (Haptics)
-+  theme: 'थीम',                      // テーマ
-+
-+  // --- Purchase / Restore (購入 / 復元) ---
-+  restore: 'खरीद बहाल करें',         // 購入の復元 (Restore purchases)
-+  purchaseSuccess: 'Pro प्लान अब सक्रिय है।', // 購入成功
-+  purchaseFailed: 'खरीदारी विफल रही। कृपया बाद में पुनः प्रयास करें।', // 購入失敗
-+  restoreSuccess: 'खरीद इतिहास बहाल कर दिया गया।', // 復元成功
-+  restoreNotFound: 'बहाल करने के लिए कोई खरीदारी नहीं मिली।', // 復元データなし
-+  restoreFailed: 'खरीद बहाल करने में विफल।', // 復元失敗
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: 'ऐप वर्ज़न',              // アプリバージョン
-+  tapSound: 'टैप साउंड',             // タップ音
-+  click: 'क्लिक',                    // クリック
-+  pop: 'पॉप',                        // ポップ
-+  soundSwitchLabel: 'साउंड इफेक्ट्स', // 効果音
-+
-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
-+  proTitle: 'अपनी चेन को अनलॉक करें।', // 英語: Unlock your chain.
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: '3 आदतों से आगे बढ़ें और अपने डॉट्स को रोकना मुश्किल बनाएं।',
-+  proPlanFreeTitle: 'फ्री',          // 無料
-+  proPlanMonthlyTitle: 'मासिक',      // 月額
-+  proPlanYearlyTitle: 'वार्षिक',     // 年額
-+  proPlanYearlyBadge: 'सबसे किफायती', // 英語: Best value (最も価値がある/お得)
-+  proBadgeShort: 'PRO',
-+  priceFree: '₹0 / हमेशा के लिए',    // ずっと0ルピー (または $0)
-+  proOnlyTitle: 'Pro फीचर',          // Pro機能
-+  proOnlyTheme: 'इस थीम का उपयोग करने के लिए Pro में अपग्रेड करें।',
-+  openPro: 'Pro प्लान देखें',        // Proプランを見る
-+  cancel: 'रद्द करें',               // キャンセル
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: 'इलेक्ट्रिक फ्लो ऐनिमेशन', // 電気の流れのアニメーション
-+  flowEffectHelp:
-+    'अपनी चेन लाइन पर एक नियन प्रवाह चलने दें। यदि आप शांत लुक चाहते हैं तो इसे बंद कर दें।',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
-+  heatmapRangeTitle: 'चेन दिखाने की अवधि',
-+  heatmapRangeHelp: 'चुनें कि होम स्क्रीन हीटमैप पर आपकी चेन के कितने दिन दिखाई दें।',
-+  heatmapRange7: '1 सप्ताह',
-+  heatmapRange30: '1 महीना',
-+  heatmapRange60: '2 महीने',
-+  heatmapRange90: '3 महीने',
-+  heatmapRange180: '6 महीने',
-+  heatmapRange365: '1 साल',
-+  heatmapSummaryPrefix: 'पिछले ',      // 「過去〜」
-+  heatmapSummarySuffix: ' दिन',        // 「〜日」
-+  heatmapAgoSuffix: ' दिन पहले',       // 「〜日前」
-+  heatmapToday: 'आज',
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: 'ऐप का स्वरूप बदलें।',
-+  themeDarkLabel: 'डार्क',             // Dark
-+  themeNeonPinkLabel: 'नियन पिंक',
-+  themeCyberBlueLabel: 'साइबर ब्लू',
-+  freeThemeNote: 'फ्री: केवल डार्क / Pro में नियन पिंक और साइबर ब्लू अनलॉक होते हैं',
-+  proThemeNote: 'Pro थीम सदस्यता के बाद उपलब्ध होंगे।',
-+
-+  // --- Habit Management (習慣管理) ---
-+  newHabitTitle: 'नई आदत',
-+  editHabitTitle: 'आदत बदलें',
-+  habitNameLabel: 'नाम',
-+  habitNamePlaceholder: 'जैसे: पानी पीना, किताब पढ़ना',
-+  habitIconLabel: 'आइकन',
-+  deleteHabit: 'यह आदत हटाएं',
-+  deleteConfirmationTitle: 'हटाएं?',
-+  deleteConfirmationMessage: 'इसे पूर्ववत नहीं किया जा सकता। सारा इतिहास मिट जाएगा।',
-+  save: 'सेव करें',
-+  create: 'बनाएं',
-+
-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
-+  iconCatBasic: 'बेसिक',
-+  iconCatHealth: 'सेहत',
-+  iconCatLearning: 'सीखना',
-+
-+  iconLabelStreak: 'लगातार',         // Streak
-+  iconLabelTask: 'कार्य',            // Task
-+  iconLabelShine: 'चमक',             // Shine
-+  iconLabelClean: 'सफाई',            // Clean
-+  iconLabelLaundry: 'धुलाई',         // Laundry
-+  iconLabelWater: 'पानी',            // Water
-+  iconLabelWalk: 'चलना',             // Walk
-+  iconLabelSleep: 'नींद',            // Sleep
-+  iconLabelWorkout: 'कसरत',          // Workout
-+  iconLabelBarbell: 'डंबल',          // Barbell
-+  iconLabelRead: 'पढ़ना',            // Read
-+  iconLabelArt: 'कला',               // Art
-+  iconLabelMedia: 'मीडिया',          // Media
-+  iconLabelStudy: 'पढ़ाई',           // Study
-+  iconLabelLanguage: 'भाषा',         // Language
-+
-+  // --- Misc / Errors (その他 / エラー) ---
-+  habitButtonSuffix: ' आदत बटन',     // アクセシビリティ用
-+  errorLoadFailed: 'डेटा लोड करने में विफल।',
-+  errorTitleRequired: 'नाम आवश्यक है।',
-+  errorTitleTooLong: 'नाम 20 अक्षरों या उससे कम का होना चाहिए।',
-+  errorSaveFailed: 'सेव करने में विफल।',
-+  errorDeleteFailed: 'हटाने में विफल।',
-+  errorToggleFailed: 'अपडेट करने में विफल।',
-+  habitLimitTitle: 'फ्री प्लान की सीमा',
-+  habitLimitBody: 'फ्री प्लान में आप 3 आदतें तक बना सकते हैं।',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: 'हैप्टिक फीडबैक (कंपन)',
-+
-+  // --- Reminder (リマインダー) ---
-+  reminderSectionTitle: 'रिमाइंडर',
-+  reminderToggleLabel: 'रिमाइंडर का उपयोग करें',
-+  reminderTimeLabel: 'नोटिफिकेशन का समय',
-+  reminderNotificationBody: 'यह आपकी चेन बनाने का समय है!', // チェーンを作る時間だよ！
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: '7 दिन लगातार!',
-+  streak7Message: 'आपने पूरे एक सप्ताह अपनी चेन बनाए रखी। बहुत बढ़िया!',
-+  ok: 'शानदार',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: 'भाषा बदलें',
-+  currentLanguage: 'वर्तमान',
-+  languageNameEn: 'अंग्रेजी',
-+  languageNameJa: 'जापानी',
-+  languageNameFr: 'फ्रेंच',
-+  languageNameEs: 'स्पेनिश',
-+  languageNameDe: 'जर्मन',
-+  languageNameIt: 'इतालवी',
-+  languageNamePt: 'पुर्तगाली',
-+  languageNameRu: 'रूसी',
-+  languageNameZh: 'चीनी',
-+  languageNameKo: 'कोरियाई',
-+  languageNameHi: 'हिन्दी',
-+  languageNameId: 'इंडोनेशियाई',
-+  languageNameTh: 'थाई',
-+  languageNameVi: 'वियतनामी',
-+  languageNameMs: 'मलय',
-+  languageNameTr: 'तुर्की',
-+  languageNameNl: 'डच',
-+  languageNameSv: 'स्वीडिश',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: 'आगे',
-+  tutorialWelcome: 'DotChain में आपका स्वागत है',
-+  tutorialDesc1: 'अपनी दैनिक आदतों को जोड़ें और अपनी खुद की चेन बनाएं।',
-+  tutorialDesc2: 'आदत बनाए रखने के लिए चेन को टूटने न दें।',
-+  tutorialStart: 'शुरू करें',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/id.ts b/src/core/i18n/locales/id.ts
-index 8d412c1..42297b9 100644
---- a/src/core/i18n/locales/id.ts
-+++ b/src/core/i18n/locales/id.ts
-@@ -1,174 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'HARI BERUNTUN',
--    yourChain: 'RANTAI KAMU',
--    allDoneDays: 'HARI SEMUA SELESAI',
--    settings: 'Pengaturan',
--    hapticOff: 'Getar mati',
--    language: 'Bahasa',
--    sound: 'Suara',
--    haptics: 'Getaran',
--    theme: 'Tema',
--    restore: 'Pulihkan pembelian',
--    version: 'Versi aplikasi',
--    tapSound: 'Suara tap',
--    click: 'Klik',
--    pop: 'Pop',
--    flowEffectTitle: 'Animasi aliran listrik',
--    flowEffectHelp: 'Biarkan aliran neon mengalir di garis rantai. Matikan jika ingin tampilan lebih tenang.',
--    heatmapRangeTitle: 'Rentang tampilan rantai',
--    heatmapRangeHelp: 'Pilih berapa hari rantai yang ditampilkan di heatmap beranda.',
--    heatmapRange7: '1 minggu',
--    heatmapRange30: '1 bulan',
--    heatmapRange60: '2 bulan',
--    heatmapRange180: '6 bulan',
--    heatmapRange365: '1 tahun',
--    heatmapSummaryPrefix: '',
--    heatmapSummarySuffix: ' hari terakhir',
--    heatmapAgoSuffix: ' hari yang lalu',
--    heatmapToday: 'Hari ini',
--    freeThemeNote: 'Gratis: hanya Dark / Pro membuka Neon Pink & Cyber Blue',
--    proThemeNote: 'Tema Pro aktif setelah pembayaran.',
--    restoreDesc: 'Pulihkan pembelian (segera)',
--    licenses: 'Lisensi sumber terbuka (segera)',
--    openPro: 'Buka DotChain Pro',
--    heroPaywall: 'Upgrade ke dunia neon',
--    priceMonthly: '$1.99 / bulan',
--    onboardingTitle: 'Selamat datang di DotChain',
--    onboardingBody: 'Sekali tap, getaran kuat. Bangun rantai hari ini.',
--    start: 'Mulai',
--    paywallNote: 'Fitur penagihan dan iklan akan ditambahkan nanti.',
--    homeLoading: 'Memuat...',
--    homeAddHabitLabel: 'Tambah kebiasaan',
--    editNewHabit: 'Kebiasaan baru',
--    editHabitTitle: 'Edit kebiasaan',
--    editCategoryLabel: 'Kategori',
--    editNameLabel: 'Nama (maks 20 karakter)',
--    editNamePlaceholder: 'Beri nama kebiasaanmu...',
--    editSaveChanges: 'Simpan perubahan',
--    editCreateHabit: 'Buat kebiasaan',
--    editDeleteHabit: 'Hapus kebiasaan',
--    proTitle: 'Bebaskan rantaimu.',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'Kebiasaan tak terbatas',
--    proFeatureThemes: 'Semua tema terbuka (Neon Pink / Cyber Blue)',
--    proFeatureAds: 'Tanpa iklan',
--    habitButtonSuffix: ' tombol kebiasaan',
--    iconCatBasic: 'Dasar',
--    iconCatHealth: 'Kesehatan',
--    iconCatLearning: 'Belajar & Kerja',
--    errorLoadFailed: 'Gagal memuat data',
--    errorTitleRequired: 'Judul wajib diisi.',
--    errorTitleTooLong: 'Judul harus 20 karakter atau kurang.',
--    errorSaveFailed: 'Gagal menyimpan.',
--    errorDeleteFailed: 'Gagal menghapus.',
--    errorToggleFailed: 'Gagal memperbarui.',
--    habitLimitTitle: 'Batas paket gratis',
--    habitLimitBody: 'Dalam paket gratis kamu bisa membuat hingga 3 kebiasaan.',
--    hapticsDescription: 'Umpan balik haptik',
--    reminderSectionTitle: 'Notifikasi pengingat',
--    reminderToggleLabel: 'Gunakan pengingat',
--    reminderTimeLabel: 'Waktu notifikasi',
--    reminderNotificationBody: 'Saatnya membangun rantaimu.',
--    streak7Title: 'Rangkaian 7 hari!',
--    streak7Message: 'Kamu menjaga rantaimu selama satu minggu penuh. Kerja bagus!',
--    ok: 'OK',
--    languageChange: 'Ganti bahasa',
--    currentLanguage: 'Saat ini',
--    languageNameEn: 'Inggris',
--    languageNameJa: 'Jepang',
--    languageNameFr: 'Perancis',
--    languageNameEs: 'Spanyol',
--    languageNameDe: 'Jerman',
--    languageNameIt: 'Italia',
--    languageNamePt: 'Portugis',
--    languageNameRu: 'Rusia',
--    languageNameZh: 'Tionghoa',
--    languageNameKo: 'Korea',
--    languageNameHi: 'Hindi',
--    languageNameId: 'Bahasa Indonesia',
--    languageNameTh: 'Thai',
--    languageNameVi: 'Vietnam',
--    languageNameMs: 'Melayu',
--    languageNameTr: 'Turki',
--    languageNameNl: 'Belanda',
--    languageNameSv: 'Swedia',
--    soundSwitchLabel: 'Aktifkan suara',
--    tapSoundLabel: 'Gaya suara ketukan',
--    proOnlyTitle: 'Hanya untuk Pro',
--    proOnlyTheme: 'Tema ini tersedia di Pro.',
--
--    // Melengkapi 51 kunci yang hilang
--    cancel: 'Batal',
--    delete: 'Hapus',
--    deleteConfirmBody: 'Yakin ingin menghapus? Tindakan ini tidak bisa dibatalkan.',
--    comingSoonTitle: 'Segera hadir',
--    onboardingPunch: 'Inilah DotChain.',
--
--    paywallBestValueBadge: 'Paling hemat',
--    paywallMonthlyLabel: 'Paket bulanan',
--    paywallMonthlySub: 'Ditagih setiap bulan. Bisa dibatalkan kapan saja.',
--    paywallYearlyLabel: 'Paket tahunan',
--    paywallYearlySub: 'Ditagih setahun sekali. Bisa dibatalkan kapan saja.',
--
--    priceFree: '$0 / selamanya',
--    priceYearly: '$14.99 / tahun',
--
--    proCompareHeaderFeature: 'Fitur',
--    proCompareHeaderFree: 'Gratis',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      'Kamu selalu bisa tetap di paket Gratis. Pro hanya menghapus batas-batasnya.',
--    proCompareTitle: 'Apa yang kamu dapatkan dengan Pro',
--
--    proCtaMonthly: 'Dapatkan Pro bulanan',
--    proCtaStayFree: 'Lanjut dengan versi gratis',
--    proCtaYearly: 'Dapatkan Pro tahunan',
--
--    proFeatureAdsFree: 'Banner iklan di bagian bawah',
--    proFeatureAdsPro: 'Tanpa iklan, fokus penuh',
--    proFeatureHabits: 'Kebiasaan yang bisa kamu lacak',
--    proFeatureHabitsFree: 'Maksimal 3 kebiasaan',
--    proFeatureHabitsPro: 'Kebiasaan tak terbatas',
--    proFeatureThemesFree: '1 tema (Gelap)',
--    proFeatureThemesPro: 'Semua tema terbuka',
--
--    proFinePrint:
--      'Langganan diperpanjang otomatis. Kamu bisa membatalkannya kapan saja dari pengaturan akun App Store atau Google Play.',
--    proMonthlyTagline: 'Mulai kecil, bisa dibatalkan kapan saja.',
--    proPlanFreeTitle: 'Gratis',
--    proPlanMonthlyTitle: 'Bulanan',
--    proPlanYearlyBadge: 'Paling hemat',
--    proPlanYearlyTitle: 'Tahunan',
--    proSubtitle: 'Lewati 3 kebiasaan dan buat titik-titikmu tak terhentikan.',
--    proYearlySavingShort: 'Hemat sekitar 37% (seperti 8 bulan gratis).',
--    proYearlyTagline: 'Untuk pembangun rantai yang benar-benar serius.',
--
--    restoreSoon: 'Fitur memulihkan pembelian akan ditambahkan di pembaruan berikutnya.',
--
--    themeCyberBlueLabel: 'Cyber Blue',
--    themeDarkLabel: 'Gelap',
--    themeDesc: 'Pilih suasana aplikasi. (Tema Pro akan hadir belakangan.)',
--    themeNeonPinkLabel: 'Neon Pink',
--
--    tutorialEditIconBody: 'Pertama, pilih ikon yang sesuai dengan kebiasaanmu.',
--    tutorialEditNameBody:
--      'Berikutnya, beri nama untuk kebiasaanmu.\nContoh: "Minum air", "Membaca buku".',
--    tutorialEditSubmitBody:
--      'Semua siap!\nKetuk tombol buat di bawah untuk menambahkan kebiasaan ini ke beranda.',
--    tutorialExplainChainBody:
--      'Setiap kali kamu mengetuk, hitungan HARI BERUNTUN bertambah dan hari ini akan menyala di RANTAI KAMU.\nTerus lanjutkan untuk memanjangkan rantaimu.',
--    tutorialGotIt: 'Mengerti',
--    tutorialNext: 'Berikutnya',
--    tutorialPressFabBody:
--      'Ketuk tombol + di kanan bawah untuk membuat kebiasaan pertamamu.',
--    tutorialPressHabitBody:
--      'Sekarang ketuk kebiasaan yang baru kamu buat.\nDengan mengetuknya, hari ini akan ditandai sebagai "selesai".',
--    tutorialStart: 'Mulai',
--    tutorialWelcomeBody:
--      'Selamat datang!\nDotChain membantu kamu membangun rantai kebiasaan.\nMulai dengan membuat kebiasaan pertama lewat tombol +.',
-+  ...baseEn,
-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
-+  daysStreak: 'HARI BERUNTUN',       // 英語: DAYS STREAK (連続日数)
-+  yourChain: 'RANTAI KAMU',          // 英語: YOUR CHAIN (あなたのチェーン)
-+  allDoneDays: 'HARI TUNTAS',        // 英語: ALL DONE DAYS (全て完了した日)
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: 'Pengaturan',            // 設定
-+  hapticOff: 'Getaran mati',         // 振動オフ
-+  language: 'Bahasa',                // 言語
-+  sound: 'Suara',                    // 音
-+  haptics: 'Getaran',                // 振動 (Haptics)
-+  theme: 'Tema',                     // テーマ
-+
-+  // --- Purchase / Restore (購入 / 復元) ---
-+  restore: 'Pulihkan Pembelian',     // 購入の復元
-+  purchaseSuccess: 'Paket Pro kini aktif.', // 購入成功
-+  purchaseFailed: 'Pembelian gagal. Silakan coba lagi nanti.', // 購入失敗
-+  restoreSuccess: 'Riwayat pembelian dipulihkan.', // 復元成功
-+  restoreNotFound: 'Tidak ada pembelian untuk dipulihkan.', // 復元データなし
-+  restoreFailed: 'Gagal memulihkan pembelian.', // 復元失敗
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: 'Versi Aplikasi',         // アプリバージョン
-+  tapSound: 'Suara Tap',             // タップ音
-+  click: 'Klik',                     // クリック
-+  pop: 'Pop',                        // ポップ
-+  soundSwitchLabel: 'Efek Suara',    // 効果音
-+
-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
-+  proTitle: 'Buka rantaimu.',        // 英語: Unlock your chain.
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: 'Lebih dari 3 kebiasaan dan buat titik-titikmu tak terhentikan.',
-+  proPlanFreeTitle: 'Gratis',        // 無料
-+  proPlanMonthlyTitle: 'Bulanan',    // 月額
-+  proPlanYearlyTitle: 'Tahunan',     // 年額
-+  proPlanYearlyBadge: 'Paling Hemat', // 英語: Best value (一番お得/節約できる)
-+  proBadgeShort: 'PRO',
-+  priceFree: 'Rp0 / selamanya',      // ずっと0ルピア (または $0)
-+  proOnlyTitle: 'Fitur Pro',         // Pro機能
-+  proOnlyTheme: 'Upgrade ke Pro untuk menggunakan tema ini.',
-+  openPro: 'Lihat Paket Pro',        // Proプランを見る
-+  cancel: 'Batal',                   // キャンセル
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: 'Animasi Aliran Listrik', // 電気の流れのアニメーション
-+  flowEffectHelp:
-+    'Biarkan aliran neon mengalir di sepanjang rantaimu. Matikan jika ingin tampilan yang lebih tenang.',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
-+  heatmapRangeTitle: 'Rentang Tampilan',
-+  heatmapRangeHelp: 'Pilih berapa hari rantai yang akan ditampilkan di peta panas beranda.',
-+  heatmapRange7: '1 minggu',
-+  heatmapRange30: '1 bulan',
-+  heatmapRange60: '2 bulan',
-+  heatmapRange90: '3 bulan',
-+  heatmapRange180: '6 bulan',
-+  heatmapRange365: '1 tahun',
-+  heatmapSummaryPrefix: '',          // 空文字 (数字の後ろに言葉が来るため)
-+  heatmapSummarySuffix: ' hari terakhir', // 「〜 hari terakhir (過去〜日間)」
-+  heatmapAgoSuffix: ' hari lalu',    // 「〜日前」
-+  heatmapToday: 'Hari ini',
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: 'Ubah tampilan aplikasi.',
-+  themeDarkLabel: 'Gelap',           // Dark
-+  themeNeonPinkLabel: 'Neon Pink',
-+  themeCyberBlueLabel: 'Cyber Blue',
-+  freeThemeNote: 'Gratis: Hanya Gelap / Pro membuka Neon Pink & Cyber Blue',
-+  proThemeNote: 'Tema Pro akan terbuka setelah berlangganan.',
-+
-+  // --- Habit Management (習慣管理) ---
-+  newHabitTitle: 'Kebiasaan Baru',
-+  editHabitTitle: 'Edit Kebiasaan',
-+  habitNameLabel: 'Nama',
-+  habitNamePlaceholder: 'Cth: Minum air, Baca buku',
-+  habitIconLabel: 'Ikon',
-+  deleteHabit: 'Hapus kebiasaan ini',
-+  deleteConfirmationTitle: 'Hapus?',
-+  deleteConfirmationMessage: 'Tindakan ini tidak bisa dibatalkan. Semua riwayat akan hilang.',
-+  save: 'Simpan',
-+  create: 'Buat',
-+
-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
-+  iconCatBasic: 'Dasar',
-+  iconCatHealth: 'Kesehatan',
-+  iconCatLearning: 'Belajar',
-+
-+  iconLabelStreak: 'Runtun',         // Streak
-+  iconLabelTask: 'Tugas',            // Task
-+  iconLabelShine: 'Kilau',           // Shine
-+  iconLabelClean: 'Bersih',          // Clean
-+  iconLabelLaundry: 'Cucian',        // Laundry
-+  iconLabelWater: 'Air',             // Water
-+  iconLabelWalk: 'Jalan',            // Walk
-+  iconLabelSleep: 'Tidur',           // Sleep
-+  iconLabelWorkout: 'Olahraga',      // Workout
-+  iconLabelBarbell: 'Barbel',        // Barbell
-+  iconLabelRead: 'Baca',             // Read
-+  iconLabelArt: 'Seni',              // Art
-+  iconLabelMedia: 'Media',           // Media
-+  iconLabelStudy: 'Belajar',         // Study
-+  iconLabelLanguage: 'Bahasa',       // Language
-+
-+  // --- Misc / Errors (その他 / エラー) ---
-+  habitButtonSuffix: ' tombol kebiasaan', // アクセシビリティ用
-+  errorLoadFailed: 'Gagal memuat data.',
-+  errorTitleRequired: 'Nama wajib diisi.',
-+  errorTitleTooLong: 'Nama maksimal 20 karakter.',
-+  errorSaveFailed: 'Gagal menyimpan.',
-+  errorDeleteFailed: 'Gagal menghapus.',
-+  errorToggleFailed: 'Gagal memperbarui.',
-+  habitLimitTitle: 'Batas Paket Gratis',
-+  habitLimitBody: 'Di paket gratis, kamu hanya bisa membuat hingga 3 kebiasaan.',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: 'Umpan balik getaran',
-+
-+  // --- Reminder (リマインダー) ---
-+  reminderSectionTitle: 'Pengingat',
-+  reminderToggleLabel: 'Gunakan pengingat',
-+  reminderTimeLabel: 'Waktu notifikasi',
-+  reminderNotificationBody: 'Waktunya membangun rantaimu!', // チェーンを作る時間だよ！
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: '7 hari beruntun!',
-+  streak7Message: 'Kamu telah menjaga rantaimu selama seminggu penuh. Kerja bagus!',
-+  ok: 'Mantap',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: 'Ganti Bahasa',
-+  currentLanguage: 'Saat ini',
-+  languageNameEn: 'Inggris',
-+  languageNameJa: 'Jepang',
-+  languageNameFr: 'Prancis',
-+  languageNameEs: 'Spanyol',
-+  languageNameDe: 'Jerman',
-+  languageNameIt: 'Italia',
-+  languageNamePt: 'Portugis',
-+  languageNameRu: 'Rusia',
-+  languageNameZh: 'Mandarin',
-+  languageNameKo: 'Korea',
-+  languageNameHi: 'Hindi',
-+  languageNameId: 'Indonesia',
-+  languageNameTh: 'Thailand',
-+  languageNameVi: 'Vietnam',
-+  languageNameMs: 'Melayu',
-+  languageNameTr: 'Turki',
-+  languageNameNl: 'Belanda',
-+  languageNameSv: 'Swedia',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: 'Lanjut',
-+  tutorialWelcome: 'Selamat datang di DotChain',
-+  tutorialDesc1: 'Hubungkan kebiasaan harianmu dan bangun rantaimu sendiri.',
-+  tutorialDesc2: 'Jangan putus rantainya agar kebiasaanmu tetap terjaga.',
-+  tutorialStart: 'Mulai',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/it.ts b/src/core/i18n/locales/it.ts
-index 9b3623a..669ed43 100644
---- a/src/core/i18n/locales/it.ts
-+++ b/src/core/i18n/locales/it.ts
-@@ -1,178 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'GIORNI DI FILA',
--    yourChain: 'LA TUA CATENA',
--    allDoneDays: 'GIORNI COMPLETI',
--    settings: 'Impostazioni',
--    hapticOff: 'Vibrazione disattivata',
--    language: 'Lingua',
--    sound: 'Suono',
--    haptics: 'Vibrazione',
--    theme: 'Tema',
--    restore: 'Ripristina acquisti',
--    version: "Versione dell`app",
--    tapSound: `Suono tocco`,
--    click: `Click`,
--    pop: `Pop`,
--    flowEffectTitle: `Animazione del flusso elettrico`,
--    flowEffectHelp:
--      `Fa scorrere un flusso neon lungo la linea della catena. Disattiva se preferisci un aspetto più calmo.`,
--    heatmapRangeTitle: `Intervallo di visualizzazione della catena`,
--    heatmapRangeHelp:
--      `Scegli quanti giorni della catena mostrare nella mappa di calore della schermata iniziale.`,
--    heatmapRange7: '1 settimana',
--    heatmapRange30: `1 mese`,
--    heatmapRange60: `2 mesi`,
--    heatmapRange180: `6 mesi`,
--    heatmapRange365: `1 anno`,
--    heatmapSummaryPrefix: `Ultimi `,
--    heatmapSummarySuffix: ` giorni`,
--    heatmapAgoSuffix: ` giorni fa`,
--    heatmapToday: `Oggi`,
--    freeThemeNote: `Gratis: solo Dark / Pro sblocca Neon Pink & Cyber Blue`,
--    proThemeNote: `I temi Pro si attivano dopo il pagamento.`,
--    restoreDesc: `Ripristina acquisti (a breve)`,
--    licenses: `Licenze open source (a breve)`,
--    openPro: `Apri DotChain Pro`,
--    heroPaywall: `Passa al mondo neon`,
--    priceMonthly: `$1.99 / mese`,
--    onboardingTitle: `Benvenuto su DotChain`,
--    onboardingBody: `Un tap, vibrazione forte. Costruiamo la catena di oggi.`,
--    start: `Inizia`,
--    paywallNote: `Fatturazione e annunci saranno aggiunti più avanti.`,
--    homeLoading: `Caricamento...`,
--    homeAddHabitLabel: `Aggiungi abitudine`,
--    editNewHabit: `Nuova abitudine`,
--    editHabitTitle: `Modifica abitudine`,
--    editCategoryLabel: `Categoria`,
--    editNameLabel: `Nome (max 20 caratteri)`,
--    editNamePlaceholder: `Dai un nome alla tua abitudine...`,
--    editSaveChanges: `Salva modifiche`,
--    editCreateHabit: `Crea abitudine`,
--    editDeleteHabit: `Elimina abitudine`,
--    proTitle: `Sblocca la tua catena.`,
--    proHeaderTitle: `DotChain Pro`,
--    proFeatureUnlimited: `Abitudini illimitate`,
--    proFeatureThemes: `Tutti i temi sbloccati (Neon Pink / Cyber Blue)`,
--    proFeatureAds: `Nessuna pubblicità`,
--    habitButtonSuffix: ` pulsante abitudine`,
--    iconCatBasic: `Base`,
--    iconCatHealth: `Salute`,
--    iconCatLearning: `Studio & Lavoro`,
--    errorLoadFailed: `Caricamento dei dati fallito`,
--    errorTitleRequired: `Il titolo è obbligatorio.`,
--    errorTitleTooLong: `Il titolo deve avere al massimo 20 caratteri.`,
--    errorSaveFailed: `Salvataggio fallito.`,
--    errorDeleteFailed: `Eliminazione fallita.`,
--    errorToggleFailed: `Aggiornamento fallito.`,
--    habitLimitTitle: `Limite del piano gratuito`,
--    habitLimitBody: `Nel piano gratuito puoi creare fino a 3 abitudini.`,
--    hapticsDescription: `Feedback aptico`,
--    reminderSectionTitle: `Notifica promemoria`,
--    reminderToggleLabel: `Usa il promemoria`,
--    reminderTimeLabel: `Orario notifica`,
--    reminderNotificationBody: `È il momento di far crescere la tua catena.`,
--    streak7Title: `Serie di 7 giorni!`,
--    streak7Message: `Hai tenuto la tua catena per una settimana intera. Ottimo lavoro!`,
--    ok: `OK`,
--    languageChange: `Cambia lingua`,
--    currentLanguage: `Attuale`,
--    languageNameEn: `Inglese`,
--    languageNameJa: `Giapponese`,
--    languageNameFr: `Francese`,
--    languageNameEs: `Spagnolo`,
--    languageNameDe: `Tedesco`,
--    languageNameIt: `Italiano`,
--    languageNamePt: `Portoghese`,
--    languageNameRu: `Russo`,
--    languageNameZh: `Cinese`,
--    languageNameKo: `Coreano`,
--    languageNameHi: `Hindi`,
--    languageNameId: `Indonesiano`,
--    languageNameTh: `Thailandese`,
--    languageNameVi: `Vietnamita`,
--    languageNameMs: `Malese`,
--    languageNameTr: `Turco`,
--    languageNameNl: `Olandese`,
--    languageNameSv: `Svedese`,
--    soundSwitchLabel: `Attiva audio`,
--    tapSoundLabel: `Stile suono tocco`,
--    proOnlyTitle: `Solo per Pro`,
--    proOnlyTheme: `Questo tema è disponibile con Pro.`,
--
--    // Completamento delle chiavi mancanti
--    cancel: `Annulla`,
--    delete: `Elimina`,
--    deleteConfirmBody: `Sei sicuro? Questa azione non può essere annullata.`,
--    comingSoonTitle: `In arrivo`,
--    onboardingPunch: `Questo è DotChain.`,
--
--    paywallBestValueBadge: `Più conveniente`,
--    paywallMonthlyLabel: `Piano mensile`,
--    paywallMonthlySub: `Fatturato ogni mese. Puoi annullare quando vuoi.`,
--    paywallYearlyLabel: `Piano annuale`,
--    paywallYearlySub: `Fatturato una volta l’anno. Puoi annullare quando vuoi.`,
--
--    priceFree: `$0 / per sempre`,
--    priceYearly: `$14.99 / anno`,
--
--    proCompareHeaderFeature: `Funzione`,
--    proCompareHeaderFree: `Gratis`,
--    proCompareHeaderPro: `Pro`,
--    proCompareSubtitle:
--      `Puoi sempre restare nel piano Gratis. Pro serve solo a togliere i limiti.`,
--    proCompareTitle: `Cosa ottieni con Pro`,
--
--    proCtaMonthly: `Ottieni Pro mensile`,
--    proCtaStayFree: `Continua con il piano Gratis`,
--    proCtaYearly: `Ottieni Pro annuale`,
--
--    proFeatureAdsFree: `Banner pubblicitari in basso`,
--    proFeatureAdsPro: `Nessuna pubblicità, massima concentrazione`,
--    proFeatureHabits: `Abitudini che puoi tracciare`,
--    proFeatureHabitsFree: `Fino a 3 abitudini`,
--    proFeatureHabitsPro: `Abitudini illimitate`,
--    proFeatureThemesFree: `1 tema (Dark)`,
--    proFeatureThemesPro: `Tutti i temi sbloccati`,
--
--    proFinePrint:
--      `L’abbonamento si rinnova automaticamente. Puoi annullare in qualsiasi momento dalle impostazioni del tuo account App Store o Google Play.`,
--    proMonthlyTagline: `Inizia in piccolo, annulla quando vuoi.`,
--    proPlanFreeTitle: `Gratis`,
--    proPlanMonthlyTitle: `Mensile`,
--    proPlanYearlyBadge: `Più conveniente`,
--    proPlanYearlyTitle: `Annuale`,
--    proSubtitle:
--      `Supera il limite di 3 abitudini e rendi inarrestabile la tua catena di punti.`,
--    proYearlySavingShort: `Risparmi circa il 37% (come 8 mesi gratis).`,
--    proYearlyTagline: `Per chi vuole costruire la catena sul serio.`,
--
--    restoreSoon: `La funzione di ripristino degli acquisti sarà aggiunta in un aggiornamento futuro.`,
--
--    themeCyberBlueLabel: `Blu cyber`,
--    themeDarkLabel: `Scuro`,
--    themeDesc: `Scegli lo stile che preferisci. (I temi Pro arriveranno più avanti.)`,
--    themeNeonPinkLabel: `Neon rosa`,
--
--    tutorialEditIconBody:
--      `Per prima cosa, scegli un’icona che rappresenti la tua abitudine.`,
--    tutorialEditNameBody:
--      `Poi inserisci un nome per la tua abitudine.\nPer esempio: "Bere acqua", "Leggere un libro".`,
--    tutorialEditSubmitBody:
--      `Ci sei!\nTocca il pulsante di creazione qui sotto per aggiungere questa abitudine alla schermata iniziale.`,
--    tutorialExplainChainBody:
--      `Ogni volta che tocchi, i tuoi GIORNI DI FILA aumentano e oggi si accende nella TUA CATENA.\nContinua per allungare sempre di più la catena.`,
--    tutorialGotIt: `Capito!`,
--    tutorialNext: `Avanti`,
--    tutorialPressFabBody:
--      `Tocca il pulsante + in basso a destra per creare la tua prima abitudine.`,
--    tutorialPressHabitBody:
--      `Ora tocca l’abitudine che hai appena creato.\nOgni tocco segna oggi come "completato".`,
--    tutorialStart: `Inizia`,
--    tutorialWelcomeBody:
--      `Benvenuto!\nDotChain ti aiuta a costruire la tua catena di abitudini.\nInizia creando la tua prima abitudine dal pulsante +.`,
-+  ...baseEn,
-+  // --- Home / Header (ホーム画面のヘッダー) ---
-+  daysStreak: 'GIORNI DI FILA',      // 英語: DAYS STREAK (連続日数)
-+  yourChain: 'LA TUA CATENA',        // 英語: YOUR CHAIN
-+  allDoneDays: 'GIORNI COMPLETATI',  // 英語: ALL DONE DAYS (全て完了した日)
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: 'Impostazioni',          // 設定
-+  hapticOff: 'Vibrazione disattivata', // 振動オフ
-+  language: 'Lingua',                // 言語
-+  sound: 'Suoni',                    // 音
-+  haptics: 'Vibrazione',             // 英語: Haptics (わかりやすく「振動」と翻訳)
-+  theme: 'Tema',                     // テーマ
-+
-+  // --- Purchase / Restore (課金・復元) ---
-+  restore: 'Ripristina acquisti',    // 購入の復元
-+  purchaseSuccess: 'Il piano Pro è attivo.', // 購入成功
-+  purchaseFailed: 'Acquisto fallito. Riprova più tardi.', // 購入失敗
-+  restoreSuccess: 'Cronologia acquisti ripristinata.', // 復元成功
-+  restoreNotFound: 'Nessun acquisto trovato da ripristinare.', // 復元データなし
-+  restoreFailed: 'Impossibile ripristinare gli acquisti.', // 復元失敗
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: 'Versione App',           // アプリバージョン
-+  tapSound: 'Suono al tocco',        // タップ音
-+  click: 'Click',                    // クリック
-+  pop: 'Pop',                        // ポップ
-+  soundSwitchLabel: 'Effetti sonori', // 効果音
-+
-+  // --- Pro Screen (Paywall) (課金画面) ---
-+  proTitle: 'Sblocca la tua catena.', // 英語: Unlock your chain.
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: 'Crea abitudini illimitate e rendi i tuoi punti inarrestabili.',
-+  proPlanFreeTitle: 'Gratis',
-+  proPlanMonthlyTitle: 'Mensile',
-+  proPlanYearlyTitle: 'Annuale',
-+  proPlanYearlyBadge: 'Migliore offerta', // 英語: Best value (一番お得)
-+  proBadgeShort: 'PRO',
-+  priceFree: '0 € / per sempre',     // ずっと0円
-+  proOnlyTitle: 'Funzione Pro',      // Pro機能
-+  proOnlyTheme: 'Passa a Pro per usare questo tema.',
-+  openPro: 'Vedi piano Pro',         // Proプランを見る
-+  cancel: 'Annulla',                 // キャンセル
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: 'Animazione flusso elettrico',
-+  flowEffectHelp:
-+    'Fai scorrere un flusso al neon lungo la tua catena. Disattivalo se preferisci un aspetto più calmo.',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップの表示期間) ---
-+  heatmapRangeTitle: 'Intervallo visualizzazione',
-+  heatmapRangeHelp: 'Scegli quanti giorni della tua catena mostrare nella mappa di calore.',
-+  heatmapRange7: '1 settimana',
-+  heatmapRange30: '1 mese',
-+  heatmapRange60: '2 mesi',
-+  heatmapRange90: '3 mesi',
-+  heatmapRange180: '6 mesi',
-+  heatmapRange365: '1 anno',
-+  heatmapSummaryPrefix: 'Ultimi ',
-+  heatmapSummarySuffix: ' giorni',
-+  heatmapAgoSuffix: ' giorni fa',
-+  heatmapToday: 'Oggi',              // 今日
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: 'Cambia l’aspetto dell’applicazione.',
-+  themeDarkLabel: 'Scuro',           // Dark
-+  themeNeonPinkLabel: 'Neon Rosa',
-+  themeCyberBlueLabel: 'Cyber Blu',
-+  freeThemeNote: 'Gratis: Solo Scuro / Pro sblocca Neon Rosa e Cyber Blu',
-+  proThemeNote: 'I temi Pro saranno disponibili presto.',
-+
-+  // --- Habit Management (習慣の管理) ---
-+  newHabitTitle: 'Nuova abitudine',
-+  editHabitTitle: 'Modifica abitudine',
-+  habitNameLabel: 'Nome',
-+  habitNamePlaceholder: 'es. Leggere un libro, Bere acqua',
-+  habitIconLabel: 'Icona',
-+  deleteHabit: 'Elimina questa abitudine',
-+  deleteConfirmationTitle: 'Eliminare?',
-+  deleteConfirmationMessage: 'Questa azione non può essere annullata. Tutta la cronologia andrà persa.',
-+  save: 'Salva',
-+  create: 'Crea',
-+
-+  // --- Icon Categories & Labels (アイコンのカテゴリとラベル) ---
-+  iconCatBasic: 'Base',
-+  iconCatHealth: 'Salute',
-+  iconCatLearning: 'Apprendimento',  // 学び
-+
-+  iconLabelStreak: 'Serie',          // Streak
-+  iconLabelTask: 'Task',
-+  iconLabelShine: 'Scintilla',       // Shine
-+  iconLabelClean: 'Pulizia',         // Clean
-+  iconLabelLaundry: 'Bucato',        // Laundry
-+  iconLabelWater: 'Acqua',           // Water
-+  iconLabelWalk: 'Passeggiata',      // Walk
-+  iconLabelSleep: 'Sonno',           // Sleep
-+  iconLabelWorkout: 'Allenamento',   // Workout
-+  iconLabelBarbell: 'Pesi',          // Barbell
-+  iconLabelRead: 'Lettura',          // Read
-+  iconLabelArt: 'Arte',              // Art
-+  iconLabelMedia: 'Media',           // Media
-+  iconLabelStudy: 'Studio',          // Study
-+  iconLabelLanguage: 'Lingua',       // Language
-+
-+  // --- Misc / Errors (その他・エラー) ---
-+  habitButtonSuffix: ' pulsante abitudine',
-+  errorLoadFailed: 'Caricamento dati fallito.',
-+  errorTitleRequired: 'Il titolo è obbligatorio.',
-+  errorTitleTooLong: 'Il titolo deve avere 20 caratteri o meno.',
-+  errorSaveFailed: 'Salvataggio fallito.',
-+  errorDeleteFailed: 'Eliminazione fallita.',
-+  errorToggleFailed: 'Aggiornamento fallito.',
-+  habitLimitTitle: 'Limite piano gratuito',
-+  habitLimitBody: 'Col piano gratuito puoi creare fino a 3 abitudini.',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: 'Feedback tattile (vibrazione)',
-+
-+  // --- Reminder (リマインダー・通知) ---
-+  reminderSectionTitle: 'Promemoria',
-+  reminderToggleLabel: 'Usa promemoria',
-+  reminderTimeLabel: 'Orario notifica',
-+  reminderNotificationBody: 'È ora di costruire la tua catena!', // チェーンを作る時間だよ！
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: 'Serie di 7 giorni!',
-+  streak7Message: 'Hai mantenuto la catena per una settimana intera. Ottimo lavoro!',
-+  ok: 'Fantastico',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: 'Cambia lingua',
-+  currentLanguage: 'Attuale',
-+  languageNameEn: 'Inglese',
-+  languageNameJa: 'Giapponese',
-+  languageNameFr: 'Francese',
-+  languageNameEs: 'Spagnolo',
-+  languageNameDe: 'Tedesco',
-+  languageNameIt: 'Italiano',
-+  languageNamePt: 'Portoghese',
-+  languageNameRu: 'Russo',
-+  languageNameZh: 'Cinese',
-+  languageNameKo: 'Coreano',
-+  languageNameHi: 'Hindi',
-+  languageNameId: 'Indonesiano',
-+  languageNameTh: 'Tailandese',
-+  languageNameVi: 'Vietnamita',
-+  languageNameMs: 'Malese',
-+  languageNameTr: 'Turco',
-+  languageNameNl: 'Olandese',
-+  languageNameSv: 'Svedese',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: 'Avanti',
-+  tutorialWelcome: 'Benvenuto in DotChain',
-+  tutorialDesc1: 'Collega le tue abitudini quotidiane e costruisci la tua catena.',
-+  tutorialDesc2: 'Non spezzare la catena per far durare l’abitudine.',
-+  tutorialStart: 'Inizia',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/ja.ts b/src/core/i18n/locales/ja.ts
-index 6ff4fe9..3ddc11a 100644
---- a/src/core/i18n/locales/ja.ts
-+++ b/src/core/i18n/locales/ja.ts
-@@ -2,9 +2,9 @@ import baseEn from './en';
- 
- const dict = {
-     ...baseEn,
--    daysStreak: '連続日数',
-+    daysStreak: '連続達成日数',
-     yourChain: 'チェーン',
--    allDoneDays: 'All Done 日数',
-+    allDoneDays: '全習慣達成日数',
-     settings: '設定',
-     hapticOff: '振動オフ',
-     language: '言語',
-@@ -175,7 +175,7 @@ const dict = {
-     languageNameTr: 'トルコ語',
-     languageNameNl: 'オランダ語',
-     languageNameSv: 'スウェーデン語',
--    soundSwitchLabel: 'サウンドを鳴らす',
-+    soundSwitchLabel: 'サウンド効果',
-     tapSoundLabel: 'タップ音の種類',
-     proOnlyTitle: 'Pro専用機能',
-     proOnlyTheme: 'このテーマはProで利用できます。',
-diff --git a/src/core/i18n/locales/ko.ts b/src/core/i18n/locales/ko.ts
-index 71fb6d4..6df0d32 100644
---- a/src/core/i18n/locales/ko.ts
-+++ b/src/core/i18n/locales/ko.ts
-@@ -1,175 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: '연속 일수',
--    yourChain: '당신의 체인',
--    allDoneDays: '모든 습관을 완료한 날 수',
--    settings: '설정',
--    hapticOff: '진동 꺼짐',
--    language: '언어',
--    sound: '사운드',
--    haptics: '진동',
--    theme: '테마',
--    restore: '구매 복원',
--    version: '앱 버전',
--    tapSound: '탭 사운드',
--    click: '클릭',
--    pop: '팝',
--    flowEffectTitle: '전류 애니메이션',
--    flowEffectHelp:
--      '체인 라인을 따라 네온 전류가 흐릅니다. 더 차분한 화면을 원하면 꺼두세요.',
--    heatmapRangeTitle: '체인 표시 기간',
--    heatmapRangeHelp: '홈 히트맵에 체인을 며칠치까지 보여줄지 선택하세요.',
--    heatmapRange7: '1주',
--    heatmapRange30: '1개월',
--    heatmapRange60: '2개월',
--    heatmapRange180: '6개월',
--    heatmapRange365: '1년',
--    heatmapSummaryPrefix: '지난 ',
--    heatmapSummarySuffix: '일',
--    heatmapAgoSuffix: '일 전',
--    heatmapToday: '오늘',
--    freeThemeNote: '무료: 다크 테마만 사용 가능 / Pro에서 네온 핑크·사이버 블루 사용 가능',
--    proThemeNote: 'Pro 테마는 결제 이후에 활성화됩니다.',
--    restoreDesc: '구매 복원(추후)',
--    licenses: '오픈 소스 라이선스(추후)',
--    openPro: 'DotChain Pro 열기',
--    heroPaywall: '네온 세계로 업그레이드',
--    priceMonthly: '$1.99 / 월',
--    onboardingTitle: 'DotChain에 오신 것을 환영합니다',
--    onboardingBody: '한 번 탭, 강한 진동. 오늘의 체인을 쌓아요.',
--    start: '시작하기',
--    paywallNote: '결제와 광고 기능은 나중에 추가될 예정입니다.',
--    homeLoading: '로딩 중...',
--    homeAddHabitLabel: '습관 추가',
--    editNewHabit: '새 습관',
--    editHabitTitle: '습관 편집',
--    editCategoryLabel: '카테고리',
--    editNameLabel: '이름 (최대 20자)',
--    editNamePlaceholder: '습관 이름을 입력...',
--    editSaveChanges: '변경사항 저장',
--    editCreateHabit: '습관 만들기',
--    editDeleteHabit: '습관 삭제',
--    proTitle: '체인을 해방하세요.',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: '무제한 습관',
--    proFeatureThemes: '모든 테마 잠금 해제 (Neon Pink / Cyber Blue)',
--    proFeatureAds: '광고 없음',
--    habitButtonSuffix: ' 습관 버튼',
--    iconCatBasic: '기본',
--    iconCatHealth: '건강',
--    iconCatLearning: '학습·업무',
--    errorLoadFailed: '데이터 로드 실패',
--    errorTitleRequired: '제목이 필요합니다.',
--    errorTitleTooLong: '제목은 20자 이내여야 합니다.',
--    errorSaveFailed: '저장 실패',
--    errorDeleteFailed: '삭제 실패',
--    errorToggleFailed: '업데이트 실패',
--    habitLimitTitle: '무료 플랜 한도',
--    habitLimitBody: '무료 플랜에서는 최대 3개의 습관만 만들 수 있습니다.',
--    hapticsDescription: '햅틱 피드백',
--    reminderSectionTitle: '리마인더 알림',
--    reminderToggleLabel: '리마인더 사용',
--    reminderTimeLabel: '알림 시간',
--    reminderNotificationBody: '지금 당신의 체인을 이어갈 시간입니다.',
--    streak7Title: '7일 연속 달성!',
--    streak7Message: '일주일 내내 체인을 이어갔어요. 훌륭합니다!',
--    ok: '확인',
--    languageChange: '언어 변경',
--    currentLanguage: '현재',
--    languageNameEn: '영어',
--    languageNameJa: '일본어',
--    languageNameFr: '프랑스어',
--    languageNameEs: '스페인어',
--    languageNameDe: '독일어',
--    languageNameIt: '이탈리아어',
--    languageNamePt: '포르투갈어',
--    languageNameRu: '러시아어',
--    languageNameZh: '중국어',
--    languageNameKo: '한국어',
--    languageNameHi: '힌디어',
--    languageNameId: '인도네시아어',
--    languageNameTh: '태국어',
--    languageNameVi: '베트남어',
--    languageNameMs: '말레이어',
--    languageNameTr: '터키어',
--    languageNameNl: '네덜란드어',
--    languageNameSv: '스웨덴어',
--    soundSwitchLabel: '사운드 켜기',
--    tapSoundLabel: '탭 사운드 스타일',
--    proOnlyTitle: 'Pro 전용 기능',
--    proOnlyTheme: '이 테마는 Pro에서만 사용 가능합니다.',
--
--    // 결손된 키 보충
--    cancel: '취소',
--    delete: '삭제',
--    deleteConfirmBody: '정말 삭제하시겠어요? 이 작업은 되돌릴 수 없습니다.',
--    comingSoonTitle: '곧 제공 예정',
--    onboardingPunch: '이것이 DotChain입니다.',
--
--    paywallBestValueBadge: '최고 혜택',
--    paywallMonthlyLabel: '월간 플랜',
--    paywallMonthlySub: '매달 결제됩니다. 언제든 취소할 수 있습니다.',
--    paywallYearlyLabel: '연간 플랜',
--    paywallYearlySub: '연 1회 결제됩니다. 언제든 취소할 수 있습니다.',
--
--    priceFree: '$0 / 평생',
--    priceYearly: '$14.99 / 년',
--
--    proCompareHeaderFeature: '기능',
--    proCompareHeaderFree: '무료',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      '언제든 무료 플랜에 머물 수 있습니다. Pro는 단지 제한을 없앨 뿐입니다.',
--    proCompareTitle: 'Pro로 얻는 것',
--
--    proCtaMonthly: '월간 Pro 시작',
--    proCtaStayFree: '무료 플랜 계속 사용',
--    proCtaYearly: '연간 Pro 시작',
--
--    proFeatureAdsFree: '하단 배너 광고',
--    proFeatureAdsPro: '광고 없음, 온전히 집중',
--    proFeatureHabits: '추적 가능한 습관 수',
--    proFeatureHabitsFree: '최대 3개 습관',
--    proFeatureHabitsPro: '무제한 습관',
--    proFeatureThemesFree: '1개 테마 (다크)',
--    proFeatureThemesPro: '모든 테마 사용 가능',
--
--    proFinePrint:
--      '구독은 자동 갱신됩니다. App Store 또는 Google Play 계정 설정에서 언제든 취소할 수 있습니다.',
--    proMonthlyTagline: '작게 시작해서 언제든 취소하세요.',
--    proPlanFreeTitle: '무료',
--    proPlanMonthlyTitle: '월간',
--    proPlanYearlyBadge: '최고 혜택',
--    proPlanYearlyTitle: '연간',
--    proSubtitle: '3개 제한을 넘어 점의 체인을 멈추지 않게 하세요.',
--    proYearlySavingShort: '약 37% 절약 (8개월 무료와 비슷).',
--    proYearlyTagline: '체인을 진지하게 관리하는 사람을 위해.',
--
--    restoreSoon: '구매 복원 기능은 향후 업데이트에서 추가될 예정입니다.',
--
--    themeCyberBlueLabel: '사이버 블루',
--    themeDarkLabel: '다크',
--    themeDesc: '원하는 분위기를 골라 보세요. (Pro 테마는 추후 추가 예정입니다.)',
--    themeNeonPinkLabel: '네온 핑크',
--
--    tutorialEditIconBody: '먼저, 습관에 어울리는 아이콘을 선택하세요.',
--    tutorialEditNameBody:
--      '다음으로, 습관 이름을 입력하세요.\n예: "물 마시기", "책 읽기".',
--    tutorialEditSubmitBody:
--      '준비됐어요!\n아래 만들기 버튼을 눌러 이 습관을 홈 화면에 추가하세요.',
--    tutorialExplainChainBody:
--      '탭할 때마다 연속 일수가 늘어나고, 오늘이 체인 위에서 빛납니다.\n계속해서 체인을 더 길게 이어 보세요.',
--    tutorialGotIt: '알겠어요',
--    tutorialNext: '다음',
--    tutorialPressFabBody:
--      '오른쪽 아래 + 버튼을 눌러 첫 습관을 만들어 보세요.',
--    tutorialPressHabitBody:
--      '방금 만든 습관을 탭하세요.\n탭하면 오늘이 "완료"로 표시됩니다.',
--    tutorialStart: '시작하기',
--    tutorialWelcomeBody:
--      '환영합니다!\nDotChain은 당신의 습관 체인을 쌓을 수 있게 도와줍니다.\n먼저 + 버튼을 눌러 첫 번째 습관을 만들어 보세요.',
-+  ...baseEn,
-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
-+  daysStreak: '연속 일수',           // 英語: DAYS STREAK
-+  yourChain: '나의 체인',            // 英語: YOUR CHAIN
-+  allDoneDays: '완료한 날',          // 英語: ALL DONE DAYS (短く「完了日」のニュアンス)
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: '설정',                  // 設定
-+  hapticOff: '진동 끄기',            // 振動オフ
-+  language: '언어',                  // 言語
-+  sound: '사운드',                   // 音（サウンド）
-+  haptics: '진동',                   // 振動（わかりやすく「振動」を採用）
-+  theme: '테마',                     // テーマ
-+
-+  // --- Purchase / Restore (購入 / 復元) ---
-+  restore: '구매 복원',              // 購入履歴の復元
-+  purchaseSuccess: 'Pro 플랜이 활성화되었습니다.', // 購入成功
-+  purchaseFailed: '결제에 실패했습니다. 나중에 다시 시도해 주세요.', // 購入失敗
-+  restoreSuccess: '구매 기록이 복원되었습니다.', // 復元成功
-+  restoreNotFound: '복원할 구매 기록이 없습니다.', // 復元データなし
-+  restoreFailed: '구매 복원에 실패했습니다.', // 復元失敗
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: '앱 버전',                // アプリバージョン
-+  tapSound: '탭 사운드',             // タップ音
-+  click: '클릭',                     // クリック
-+  pop: '팝',                         // ポップ
-+  soundSwitchLabel: '사운드 효과',   // 効果音
-+
-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
-+  proTitle: '체인을 잠금 해제하세요.', // 英語: Unlock your chain.
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: '3개의 습관을 넘어, 멈추지 않는 점을 만드세요.',
-+  proPlanFreeTitle: '무료',          // 無料
-+  proPlanMonthlyTitle: '월간',       // 月額
-+  proPlanYearlyTitle: '연간',        // 年額
-+  proPlanYearlyBadge: '최고의 선택', // 英語: Best value (直訳より「ベストチョイス」)
-+  proBadgeShort: 'PRO',
-+  priceFree: '₩0 / 평생',            // ずっと0ウォン
-+  proOnlyTitle: 'Pro 기능',          // Pro機能
-+  proOnlyTheme: '이 테마는 Pro에서 사용할 수 있습니다.',
-+  openPro: 'Pro 플랜 보기',          // Proプランを見る
-+  cancel: '취소',                    // キャンセル
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: '전류 애니메이션', // 直訳より「電気の流れ」のイメージ
-+  flowEffectHelp:
-+    '체인 라인을 따라 네온 전류가 흐릅니다. 차분한 화면을 원하면 끄셔도 좋습니다.',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
-+  heatmapRangeTitle: '표시 기간',
-+  heatmapRangeHelp: '홈 화면의 히트맵에 체인을 며칠 동안 표시할지 선택하세요.',
-+  heatmapRange7: '1주',
-+  heatmapRange30: '1개월',
-+  heatmapRange60: '2개월',
-+  heatmapRange90: '3개월',
-+  heatmapRange180: '6개월',
-+  heatmapRange365: '1년',
-+  heatmapSummaryPrefix: '최근 ',     // 「最近」
-+  heatmapSummarySuffix: '일',        // 「日」
-+  heatmapAgoSuffix: '일 전',         // 「日前」
-+  heatmapToday: '오늘',
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: '앱의 분위기를 바꿔보세요.',
-+  themeDarkLabel: '다크',            // Dark
-+  themeNeonPinkLabel: '네온 핑크',
-+  themeCyberBlueLabel: '사이버 블루',
-+  freeThemeNote: '무료: 다크만 사용 가능 / Pro: 네온 핑크, 사이버 블루 잠금 해제',
-+  proThemeNote: 'Pro 테마는 곧 출시됩니다.',
-+
-+  // --- Habit Management (習慣管理) ---
-+  newHabitTitle: '새로운 습관',
-+  editHabitTitle: '습관 수정',
-+  habitNameLabel: '이름',
-+  habitNamePlaceholder: '예: 물 마시기, 책 읽기',
-+  habitIconLabel: '아이콘',
-+  deleteHabit: '이 습관 삭제',
-+  deleteConfirmationTitle: '삭제하시겠습니까?',
-+  deleteConfirmationMessage: '이 작업은 되돌릴 수 없습니다. 모든 기록이 사라집니다.',
-+  save: '저장',
-+  create: '만들기',
-+
-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
-+  iconCatBasic: '기본',
-+  iconCatHealth: '건강',
-+  iconCatLearning: '학습',
-+
-+  iconLabelStreak: '연속',
-+  iconLabelTask: '할 일',
-+  iconLabelShine: '반짝임',
-+  iconLabelClean: '청소',
-+  iconLabelLaundry: '세탁',
-+  iconLabelWater: '물',
-+  iconLabelWalk: '걷기',
-+  iconLabelSleep: '수면',
-+  iconLabelWorkout: '운동',
-+  iconLabelBarbell: '바벨',
-+  iconLabelRead: '독서',
-+  iconLabelArt: '예술',
-+  iconLabelMedia: '미디어',
-+  iconLabelStudy: '공부',
-+  iconLabelLanguage: '언어',
-+
-+  // --- Misc / Errors (その他 / エラー) ---
-+  habitButtonSuffix: ' 습관 버튼',   // アクセシビリティ用
-+  errorLoadFailed: '데이터를 불러오지 못했습니다.',
-+  errorTitleRequired: '이름을 입력해야 합니다.',
-+  errorTitleTooLong: '이름은 20자 이내여야 합니다.',
-+  errorSaveFailed: '저장에 실패했습니다.',
-+  errorDeleteFailed: '삭제에 실패했습니다.',
-+  errorToggleFailed: '업데이트에 실패했습니다.',
-+  habitLimitTitle: '무료 플랜 제한',
-+  habitLimitBody: '무료 플랜에서는 최대 3개의 습관만 만들 수 있습니다.',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: '햅틱 피드백 (진동)',
-+
-+  // --- Reminder (リマインダー) ---
-+  reminderSectionTitle: '리마인더',
-+  reminderToggleLabel: '리마인더 사용',
-+  reminderTimeLabel: '알림 시간',
-+  reminderNotificationBody: '체인을 연결할 시간입니다!', // 「チェーンを作る時間！」
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: '7일 연속 달성!',
-+  streak7Message: '일주일 동안 체인을 끊지 않았군요. 정말 대단해요!',
-+  ok: '최고예요',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: '언어 변경',
-+  currentLanguage: '현재 언어',
-+  languageNameEn: '영어',
-+  languageNameJa: '일본어',
-+  languageNameFr: '프랑스어',
-+  languageNameEs: '스페인어',
-+  languageNameDe: '독일어',
-+  languageNameIt: '이탈리아어',
-+  languageNamePt: '포르투갈어',
-+  languageNameRu: '러시아어',
-+  languageNameZh: '중국어',
-+  languageNameKo: '한국어',
-+  languageNameHi: '힌디어',
-+  languageNameId: '인도네시아어',
-+  languageNameTh: '태국어',
-+  languageNameVi: '베트남어',
-+  languageNameMs: '말레이어',
-+  languageNameTr: '튀르키예어',
-+  languageNameNl: '네덜란드어',
-+  languageNameSv: '스웨덴어',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: '다음',
-+  tutorialWelcome: 'DotChain에 오신 것을 환영합니다',
-+  tutorialDesc1: '매일의 습관을 연결하고 나만의 체인을 만드세요.',
-+  tutorialDesc2: '습관이 몸에 배도록 체인을 끊지 마세요.',
-+  tutorialStart: '시작하기',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/ms.ts b/src/core/i18n/locales/ms.ts
-deleted file mode 100644
-index aab2cd2..0000000
---- a/src/core/i18n/locales/ms.ts
-+++ /dev/null
-@@ -1,181 +0,0 @@
--import baseEn from './en';
--
--const dict = {
--    ...baseEn,
--    daysStreak: 'HARI BERTURUT',
--    yourChain: 'RANTAI ANDA',
--    allDoneDays: 'HARI LENGKAP SEPENUHNYA',
--    settings: 'Tetapan',
--    hapticOff: 'Getaran dimatikan',
--    language: 'Bahasa',
--    sound: 'Bunyi',
--    haptics: 'Getaran',
--    theme: 'Tema',
--    restore: 'Pulihkan pembelian',
--    version: 'Versi aplikasi',
--    tapSound: 'Bunyi ketukan',
--    click: 'Klik',
--    pop: 'Pop',
--    flowEffectTitle: 'Animasi aliran elektrik',
--    flowEffectHelp: 'Biarkan aliran neon mengalir di garisan rantaian. Matikan jika mahu paparan lebih tenang.',
--    heatmapRangeTitle: 'Tempoh paparan rantaian',
--    heatmapRangeHelp: 'Pilih berapa hari rantaian dipaparkan pada peta haba Laman Utama.',
--    heatmapRange7: '1 minggu',
--    heatmapRange30: '1 bulan',
--    heatmapRange60: '2 bulan',
--    heatmapRange180: '6 bulan',
--    heatmapRange365: '1 tahun',
--    heatmapSummaryPrefix: '',
--    heatmapSummarySuffix: ' hari lepas',
--    heatmapAgoSuffix: ' hari yang lalu',
--    heatmapToday: 'Hari ini',
--    freeThemeNote: 'Percuma: hanya Dark / Pro buka kunci Neon Pink & Cyber Blue',
--    proThemeNote: 'Tema Pro akan dibuka selepas anda membuat pembayaran.',
--    restoreDesc: 'Pulihkan pembelian (akan datang)',
--    licenses: 'Lesen sumber terbuka (akan datang)',
--    openPro: 'Buka DotChain Pro',
--    heroPaywall: 'Tingkatkan ke dunia neon',
--    priceMonthly: '$1.99 / bulan',
--    onboardingTitle: 'Selamat datang ke DotChain',
--    onboardingBody: 'Satu ketukan, getaran kuat. Bina rantai hari ini.',
--    start: 'Mula',
--    paywallNote: 'Ciri pengebilan dan iklan akan ditambah kemudian.',
--    homeLoading: 'Memuat...',
--    homeAddHabitLabel: 'Tambah tabiat',
--    editNewHabit: 'Tabiat baharu',
--    editHabitTitle: 'Edit tabiat',
--    editCategoryLabel: 'Kategori',
--    editNameLabel: 'Nama (maks 20 aksara)',
--    editNamePlaceholder: 'Namakan tabiat anda...',
--    editSaveChanges: 'Simpan perubahan',
--    editCreateHabit: 'Cipta tabiat',
--    editDeleteHabit: 'Padam tabiat',
--    proTitle: 'Buka kunci rantai anda.',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'Tabiat tanpa had',
--    proFeatureThemes: 'Semua tema dibuka (Neon Pink / Cyber Blue)',
--    proFeatureAds: 'Tiada iklan',
--    habitButtonSuffix: ' butang tabiat',
--    iconCatBasic: 'Asas',
--    iconCatHealth: 'Kesihatan',
--    iconCatLearning: 'Pembelajaran & Kerja',
--    errorLoadFailed: 'Gagal memuatkan data',
--    errorTitleRequired: 'Tajuk diperlukan.',
--    errorTitleTooLong: 'Tajuk mesti 20 aksara atau kurang.',
--    errorSaveFailed: 'Gagal menyimpan.',
--    errorDeleteFailed: 'Gagal memadam.',
--    errorToggleFailed: 'Gagal mengemas kini.',
--    habitLimitTitle: 'Had pelan percuma',
--    habitLimitBody: 'Dalam pelan percuma anda boleh membuat hingga 3 tabiat.',
--    hapticsDescription: 'Maklum balas haptik',
--    reminderSectionTitle: 'Pemberitahuan peringatan',
--    reminderToggleLabel: 'Gunakan peringatan',
--    reminderTimeLabel: 'Masa pemberitahuan',
--    reminderNotificationBody: 'Sudah tiba masanya menyambung rantai anda.',
--    streak7Title: 'Rantai 7 hari!',
--    streak7Message: 'Anda mengekalkan rantai selama seminggu penuh. Hebat!',
--    ok: 'OK',
--    languageChange: 'Tukar bahasa',
--    currentLanguage: 'Semasa',
--    languageNameEn: 'Bahasa Inggeris',
--    languageNameJa: 'Bahasa Jepun',
--    languageNameFr: 'Bahasa Perancis',
--    languageNameEs: 'Bahasa Sepanyol',
--    languageNameDe: 'Bahasa Jerman',
--    languageNameIt: 'Bahasa Itali',
--    languageNamePt: 'Bahasa Portugis',
--    languageNameRu: 'Bahasa Rusia',
--    languageNameZh: 'Bahasa Cina',
--    languageNameKo: 'Bahasa Korea',
--    languageNameHi: 'Bahasa Hindi',
--    languageNameId: 'Bahasa Indonesia',
--    languageNameTh: 'Bahasa Thai',
--    languageNameVi: 'Bahasa Vietnam',
--    languageNameMs: 'Bahasa Melayu',
--    languageNameTr: 'Bahasa Turki',
--    languageNameNl: 'Bahasa Belanda',
--    languageNameSv: 'Bahasa Sweden',
--    soundSwitchLabel: 'Hidupkan bunyi',
--    tapSoundLabel: 'Gaya bunyi ketukan',
--    proOnlyTitle: 'Khas untuk Pro',
--    proOnlyTheme: 'Tema ini hanya tersedia dalam Pro.',
--
--    cancel: 'Batal',
--    delete: 'Padam',
--    deleteConfirmBody: 'Adakah anda pasti? Tindakan ini tidak boleh dibatalkan.',
--    comingSoonTitle: 'Akan datang',
--    onboardingPunch: 'Inilah DotChain.',
--
--    paywallBestValueBadge: 'Paling berbaloi',
--    paywallMonthlyLabel: 'Pelan bulanan',
--    paywallMonthlySub: 'Dibilkan setiap bulan. Boleh batal bila-bila masa.',
--    paywallYearlyLabel: 'Pelan tahunan',
--    paywallYearlySub: 'Dibilkan sekali setahun. Boleh batal bila-bila masa.',
--
--    priceFree: '$0 / selamanya',
--    priceYearly: '$14.99 / tahun',
--
--    proCompareHeaderFeature: 'Ciri',
--    proCompareHeaderFree: 'Percuma',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      'Anda sentiasa boleh kekal pada Pelan Percuma. Pro hanya membuang had.',
--    proCompareTitle: 'Apa yang anda dapat dengan Pro',
--
--    proCtaMonthly: 'Dapatkan Pro Bulanan',
--    proCtaStayFree: 'Teruskan dengan Pelan Percuma',
--    proCtaYearly: 'Dapatkan Pro Tahunan',
--
--    proFeatureAdsFree: 'Iklan banner di bahagian bawah',
--    proFeatureAdsPro: 'Tiada iklan, fokus sepenuhnya',
--    proFeatureHabits: 'Tabiat yang boleh anda jejak',
--    proFeatureHabitsFree: 'Sehingga 3 tabiat',
--    proFeatureHabitsPro: 'Tabiat tanpa had',
--    proFeatureThemesFree: '1 tema (Dark)',
--    proFeatureThemesPro: 'Semua tema dibuka',
--
--    proFinePrint:
--      'Langganan diperbaharui secara automatik. Anda boleh batal bila-bila masa dalam tetapan akaun App Store atau Google Play anda.',
--    proMonthlyTagline: 'Mulakan kecil, boleh batal bila-bila masa.',
--    proPlanFreeTitle: 'Percuma',
--    proPlanMonthlyTitle: 'Bulanan',
--    proPlanYearlyBadge: 'Paling berbaloi',
--    proPlanYearlyTitle: 'Tahunan',
--    proSubtitle: 'Lebihi had 3 tabiat dan jadikan titik anda tidak terhentikan.',
--    proYearlySavingShort: 'Jimat kira-kira 37% (seperti 8 bulan percuma).',
--    proYearlyTagline: 'Untuk pembina rantai yang serius.',
--
--    restoreSoon:
--      'Fungsi memulihkan pembelian akan ditambah dalam kemas kini akan datang.',
--
--    themeCyberBlueLabel: 'Cyber Blue',
--    themeDarkLabel: 'Dark',
--    themeDesc: 'Pilih suasana yang anda suka. (Tema Pro akan ditambah kemudian.)',
--    themeNeonPinkLabel: 'Neon Pink',
--
--    tutorialEditIconBody:
--      'Pertama, pilih ikon yang sepadan dengan tabiat anda.',
--    tutorialEditNameBody:
--      `Kemudian, masukkan nama untuk tabiat anda.
--Contohnya: "Minum air", "Baca buku".`,
--    tutorialEditSubmitBody:
--      `Anda sudah bersedia!
--Ketuk tombol cipta di bawah untuk menambah tabiat ini ke skrin utama.`,
--    tutorialExplainChainBody:
--      `Dengan setiap ketukan, HARI BERTURUT anda meningkat dan hari ini menyala pada RANTAI ANDA.
--Teruskan untuk memanjangkan lagi rantai anda.`,
--    tutorialGotIt: 'Faham',
--    tutorialNext: 'Seterusnya',
--    tutorialPressFabBody:
--      'Ketuk butang + di bahagian bawah kanan untuk mencipta tabiat pertama anda.',
--    tutorialPressHabitBody:
--      `Sekarang ketuk tabiat yang anda baru cipta.
--Ketukan menandakan hari ini sebagai "siap".`,
--    tutorialStart: 'Mula',
--    tutorialWelcomeBody:
--      `Selamat datang!
--DotChain membantu anda membina rantai tabiat.
--Mula dengan mencipta tabiat pertama anda melalui butang +.`,
--};
--
--export default dict;
-diff --git a/src/core/i18n/locales/nl.ts b/src/core/i18n/locales/nl.ts
-index 8547607..8898d80 100644
---- a/src/core/i18n/locales/nl.ts
-+++ b/src/core/i18n/locales/nl.ts
-@@ -1,182 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'Dagen op rij',
--    yourChain: 'Jouw keten',
--    allDoneDays: 'Volledig voltooide dagen',
--    settings: 'Instellingen',
--    hapticOff: 'Trillen uit',
--    language: 'Taal',
--    sound: 'Geluid',
--    haptics: 'Trillen',
--    theme: 'Thema',
--    restore: 'Aankopen herstellen',
--    version: 'App-versie',
--    tapSound: 'Tikgeluid',
--    click: 'Klik',
--    pop: 'Pop',
--    flowEffectTitle: 'Elektrische stroom-animatie',
--    flowEffectHelp:
--      'Laat een neonstroom over je ketenlijn lopen. Zet uit als je een rustiger beeld wilt.',
--    heatmapRangeTitle: 'Weergaveperiode van de keten',
--    heatmapRangeHelp:
--      'Kies hoeveel dagen van je keten op de heatmap van het startscherm worden getoond.',
--    heatmapRange7: '1 week',
--    heatmapRange30: '1 maand',
--    heatmapRange60: '2 maanden',
--    heatmapRange180: '6 maanden',
--    heatmapRange365: '1 jaar',
--    heatmapSummaryPrefix: 'Afgelopen ',
--    heatmapSummarySuffix: ' dagen',
--    heatmapAgoSuffix: ' dagen geleden',
--    heatmapToday: 'Vandaag',
--    freeThemeNote: 'Gratis: alleen Donker / Pro ontgrendelt Neon Pink & Cyber Blue',
--    proThemeNote: 'Pro-thema\'s worden later ontgrendeld.',
--    restoreDesc: 'Aankopen herstellen (binnenkort)',
--    licenses: 'Open-source licenties (binnenkort)',
--    openPro: 'Open DotChain Pro',
--    heroPaywall: 'Upgrade naar de neonwereld',
--    priceMonthly: '$1.99 / maand',
--    onboardingTitle: 'Welkom bij DotChain',
--    onboardingBody: 'Eén tik, sterke trilling. Bouw de keten van vandaag.',
--    start: 'Start',
--    paywallNote: 'Facturering en advertenties worden later toegevoegd.',
--    homeLoading: 'Bezig met laden...',
--    homeAddHabitLabel: 'Gewoonte toevoegen',
--    editNewHabit: 'Nieuwe gewoonte',
--    editHabitTitle: 'Gewoonte bewerken',
--    editCategoryLabel: 'Categorie',
--    editNameLabel: 'Naam (max 20 tekens)',
--    editNamePlaceholder: 'Geef je gewoonte een naam...',
--    editSaveChanges: 'Wijzigingen opslaan',
--    editCreateHabit: 'Gewoonte maken',
--    editDeleteHabit: 'Gewoonte verwijderen',
--    proTitle: 'Ontgrendel je keten.',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'Onbeperkte gewoonten',
--    proFeatureThemes: 'Alle thema’s ontgrendeld (Neon Pink / Cyber Blue)',
--    proFeatureAds: 'Geen advertenties',
--    habitButtonSuffix: ' gewoonteknop',
--    iconCatBasic: 'Basis',
--    iconCatHealth: 'Gezondheid',
--    iconCatLearning: 'Leren & Werk',
--    errorLoadFailed: 'Gegevens laden mislukt',
--    errorTitleRequired: 'Titel is verplicht.',
--    errorTitleTooLong: 'Titel mag maximaal 20 tekens bevatten.',
--    errorSaveFailed: 'Opslaan mislukt.',
--    errorDeleteFailed: 'Verwijderen mislukt.',
--    errorToggleFailed: 'Bijwerken mislukt.',
--    habitLimitTitle: 'Limiet van gratis abonnement',
--    habitLimitBody: 'In het gratis abonnement kun je maximaal 3 gewoonten aanmaken.',
--    hapticsDescription: 'Haptische feedback',
--    reminderSectionTitle: 'Herinneringsmelding',
--    reminderToggleLabel: 'Herinnering gebruiken',
--    reminderTimeLabel: 'Meldingtijd',
--    reminderNotificationBody: 'Tijd om je keten voort te zetten.',
--    streak7Title: '7 dagen op rij!',
--    streak7Message: 'Je hield je keten een volle week vol. Goed gedaan!',
--    ok: 'OK',
--    languageChange: 'Taal wijzigen',
--    currentLanguage: 'Huidig',
--    languageNameEn: 'Engels',
--    languageNameJa: 'Japans',
--    languageNameFr: 'Frans',
--    languageNameEs: 'Spaans',
--    languageNameDe: 'Duits',
--    languageNameIt: 'Italiaans',
--    languageNamePt: 'Portugees',
--    languageNameRu: 'Russisch',
--    languageNameZh: 'Chinees',
--    languageNameKo: 'Koreaans',
--    languageNameHi: 'Hindi',
--    languageNameId: 'Indonesisch',
--    languageNameTh: 'Thais',
--    languageNameVi: 'Vietnamees',
--    languageNameMs: 'Maleis',
--    languageNameTr: 'Turks',
--    languageNameNl: 'Nederlands',
--    languageNameSv: 'Zweeds',
--    soundSwitchLabel: 'Geluid inschakelen',
--    tapSoundLabel: 'Tikgeluidstijl',
--    proOnlyTitle: 'Alleen voor Pro',
--    proOnlyTheme: 'Dit thema is beschikbaar met Pro.',
--
--    // Aanvullen ontbrekende 51 keys
--    cancel: 'Annuleren',
--    delete: 'Verwijderen',
--    deleteConfirmBody:
--      'Weet je het zeker? Deze actie kan niet ongedaan worden gemaakt.',
--    comingSoonTitle: 'Binnenkort beschikbaar',
--    onboardingPunch: 'Dit is DotChain.',
--
--    paywallBestValueBadge: 'Meest voordelig',
--    paywallMonthlyLabel: 'Maandelijks abonnement',
--    paywallMonthlySub:
--      'Maandelijks gefactureerd. Op elk moment opzegbaar.',
--    paywallYearlyLabel: 'Jaarlijks abonnement',
--    paywallYearlySub:
--      'Jaarlijks één keer gefactureerd. Op elk moment opzegbaar.',
--
--    priceFree: '$0 / voor altijd',
--    priceYearly: '$14.99 / jaar',
--
--    proCompareHeaderFeature: 'Functie',
--    proCompareHeaderFree: 'Gratis',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      'Je kunt altijd bij het gratis abonnement blijven. Pro haalt alleen de limieten weg.',
--    proCompareTitle: 'Wat je krijgt met Pro',
--
--    proCtaMonthly: 'Pro maandelijks nemen',
--    proCtaStayFree: 'Gratis blijven gebruiken',
--    proCtaYearly: 'Pro jaarlijks nemen',
--
--    proFeatureAdsFree: 'Advertentiebanner onderin',
--    proFeatureAdsPro: 'Geen advertenties, volledige focus',
--    proFeatureHabits: 'Gewoonten die je kunt bijhouden',
--    proFeatureHabitsFree: 'Maximaal 3 gewoonten',
--    proFeatureHabitsPro: 'Onbeperkt aantal gewoonten',
--    proFeatureThemesFree: '1 thema (Donker)',
--    proFeatureThemesPro: 'Alle thema\'s ontgrendeld',
--
--    proFinePrint:
--      'Abonnement wordt automatisch verlengd. Je kunt op elk moment opzeggen via de instellingen van je App Store- of Google Play-account.',
--    proMonthlyTagline: 'Begin klein, opzeggen kan altijd.',
--    proPlanFreeTitle: 'Gratis',
--    proPlanMonthlyTitle: 'Maandelijks',
--    proPlanYearlyBadge: 'Meest voordelig',
--    proPlanYearlyTitle: 'Jaarlijks',
--    proSubtitle: 'Ga verder dan 3 gewoonten en maak je keten niet te stoppen.',
--    proYearlySavingShort: 'Bespaar ongeveer 37% (alsof 8 maanden gratis zijn).',
--    proYearlyTagline: 'Voor echte ketenbouwers.',
--
--    restoreSoon:
--      'Herstellen van aankopen wordt in een volgende update toegevoegd.',
--
--    themeCyberBlueLabel: 'Cyber Blue',
--    themeDarkLabel: 'Donker',
--    themeDesc:
--      'Kies de sfeer die bij je past. (Pro-thema\'s worden later toegevoegd.)',
--    themeNeonPinkLabel: 'Neon Pink',
--
--    tutorialEditIconBody:
--      'Kies eerst een pictogram dat bij je gewoonte past.',
--    tutorialEditNameBody:
--      'Geef je gewoonte daarna een naam.\nBijvoorbeeld: "Water drinken", "Boek lezen".',
--    tutorialEditSubmitBody:
--      'Klaar!\nTik op de knop hieronder om deze gewoonte aan je startscherm toe te voegen.',
--    tutorialExplainChainBody:
--      'Door te tikken is je DAGEN OP RIJ toegenomen en licht vandaag op in JOUW KETEN.\nGa zo door om je keten langer te maken.',
--    tutorialGotIt: 'Begrepen',
--    tutorialNext: 'Volgende',
--    tutorialPressFabBody:
--      'Tik op de +-knop rechtsonder om je eerste gewoonte te maken.',
--    tutorialPressHabitBody:
--      'Tik nu op de gewoonte die je zojuist hebt gemaakt.\nDoor te tikken wordt vandaag als "gedaan" gemarkeerd.',
--    tutorialStart: 'Start',
--    tutorialWelcomeBody:
--      'Welkom!\nMet DotChain bouw je jouw gewoontenketen.\nBegin met het maken van je eerste gewoonte via de +-knop.',
-+  ...baseEn,
-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
-+  daysStreak: 'DAGEN OP RIJ',        // 英語: DAYS STREAK (連続日数)
-+  yourChain: 'JOUW KETEN',           // 英語: YOUR CHAIN
-+  allDoneDays: 'DAGEN VOLTOOID',     // 英語: ALL DONE DAYS (全て完了した日)
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: 'Instellingen',          // 設定
-+  hapticOff: 'Trillen uit',          // 振動オフ
-+  language: 'Taal',                  // 言語
-+  sound: 'Geluid',                   // 音
-+  haptics: 'Trillen',                // 振動 (Haptics - 一般的にTrillen)
-+  theme: 'Thema',                    // テーマ
-+
-+  // --- Purchase / Restore (購入 / 復元) ---
-+  restore: 'Aankopen herstellen',    // 購入の復元
-+  purchaseSuccess: 'Pro-abonnement is nu actief.', // 購入成功
-+  purchaseFailed: 'Aankoop mislukt. Probeer het later opnieuw.', // 購入失敗
-+  restoreSuccess: 'Aankoopgeschiedenis hersteld.', // 復元成功 (長い単語ですがここは大丈夫)
-+  restoreNotFound: 'Geen aankopen gevonden om te herstellen.', // 復元データなし
-+  restoreFailed: 'Herstellen van aankopen mislukt.', // 復元失敗
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: 'App-versie',             // アプリバージョン
-+  tapSound: 'Tikgeluid',             // タップ音
-+  click: 'Klik',                     // クリック
-+  pop: 'Pop',                        // ポップ
-+  soundSwitchLabel: 'Geluidseffecten', // 効果音
-+
-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
-+  proTitle: 'Ontgrendel je keten.',  // 英語: Unlock your chain.
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: 'Ga verder dan 3 gewoonten en maak je stippen onstuitbaar.',
-+  proPlanFreeTitle: 'Gratis',        // 無料
-+  proPlanMonthlyTitle: 'Maandelijks', // 月額
-+  proPlanYearlyTitle: 'Jaarlijks',   // 年額
-+  proPlanYearlyBadge: 'Beste keus',  // 英語: Best value (一番お得/ベストチョイス)
-+  proBadgeShort: 'PRO',
-+  priceFree: '€0 / voor altijd',     // ずっと0ユーロ (または $0)
-+  proOnlyTitle: 'Pro-functie',       // Pro機能
-+  proOnlyTheme: 'Upgrade naar Pro om dit thema te gebruiken.',
-+  openPro: 'Bekijk Pro-plan',        // Proプランを見る
-+  cancel: 'Annuleren',               // キャンセル
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: 'Elektrische stroom-animatie', // 電気の流れのアニメーション
-+  flowEffectHelp:
-+    'Laat een neonstroom over je ketenlijn lopen. Zet uit als je een rustiger beeld wilt.',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
-+  heatmapRangeTitle: 'Weergaveperiode',
-+  heatmapRangeHelp: 'Kies hoeveel dagen van je keten op de heatmap van het startscherm worden getoond.',
-+  heatmapRange7: '1 week',
-+  heatmapRange30: '1 maand',
-+  heatmapRange60: '2 maanden',
-+  heatmapRange90: '3 maanden',
-+  heatmapRange180: '6 maanden',
-+  heatmapRange365: '1 jaar',
-+  heatmapSummaryPrefix: 'Afgelopen ', // 「Afgelopen (過去〜/終わった〜)」
-+  heatmapSummarySuffix: ' dagen',     // 「dagen (〜日間)」
-+  heatmapAgoSuffix: ' dagen geleden', // 「〜日前」
-+  heatmapToday: 'Vandaag',
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: 'Verander het uiterlijk van de app.',
-+  themeDarkLabel: 'Donker',          // Dark
-+  themeNeonPinkLabel: 'Neon Pink',
-+  themeCyberBlueLabel: 'Cyber Blue',
-+  freeThemeNote: 'Gratis: alleen Donker / Pro ontgrendelt Neon Pink & Cyber Blue',
-+  proThemeNote: 'Pro-thema\'s komen binnenkort.',
-+
-+  // --- Habit Management (習慣管理) ---
-+  newHabitTitle: 'Nieuwe gewoonte',
-+  editHabitTitle: 'Gewoonte bewerken',
-+  habitNameLabel: 'Naam',
-+  habitNamePlaceholder: 'bijv. Water drinken, Lezen',
-+  habitIconLabel: 'Icoon',
-+  deleteHabit: 'Verwijder deze gewoonte',
-+  deleteConfirmationTitle: 'Verwijderen?',
-+  deleteConfirmationMessage: 'Dit kan niet ongedaan worden gemaakt. Alle geschiedenis gaat verloren.',
-+  save: 'Opslaan',
-+  create: 'Aanmaken',
-+
-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
-+  iconCatBasic: 'Basis',
-+  iconCatHealth: 'Gezondheid',
-+  iconCatLearning: 'Leren',
-+
-+  iconLabelStreak: 'Reeks',          // Streak (連続)
-+  iconLabelTask: 'Taak',             // Task
-+  iconLabelShine: 'Glans',           // Shine
-+  iconLabelClean: 'Schoonmaken',     // Clean
-+  iconLabelLaundry: 'De was',        // Laundry
-+  iconLabelWater: 'Water',           // Water
-+  iconLabelWalk: 'Wandelen',         // Walk
-+  iconLabelSleep: 'Slapen',          // Sleep
-+  iconLabelWorkout: 'Training',      // Workout
-+  iconLabelBarbell: 'Halter',        // Barbell
-+  iconLabelRead: 'Lezen',            // Read
-+  iconLabelArt: 'Kunst',             // Art
-+  iconLabelMedia: 'Media',           // Media
-+  iconLabelStudy: 'Studie',          // Study
-+  iconLabelLanguage: 'Taal',         // Language
-+
-+  // --- Misc / Errors (その他 / エラー) ---
-+  habitButtonSuffix: ' gewoonteknop', // アクセシビリティ用
-+  errorLoadFailed: 'Gegevens laden mislukt.',
-+  errorTitleRequired: 'Naam is verplicht.',
-+  errorTitleTooLong: 'Naam mag maximaal 20 tekens bevatten.',
-+  errorSaveFailed: 'Opslaan mislukt.',
-+  errorDeleteFailed: 'Verwijderen mislukt.',
-+  errorToggleFailed: 'Updaten mislukt.',
-+  habitLimitTitle: 'Limiet gratis plan',
-+  habitLimitBody: 'In het gratis plan kun je maximaal 3 gewoonten aanmaken.',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: 'Haptische feedback (trillen)',
-+
-+  // --- Reminder (リマインダー) ---
-+  reminderSectionTitle: 'Herinnering',
-+  reminderToggleLabel: 'Gebruik herinnering',
-+  reminderTimeLabel: 'Tijdstip melding',
-+  reminderNotificationBody: 'Het is tijd om aan je keten te bouwen!', // チェーンを作る時間だよ！
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: '7 dagen op rij!',
-+  streak7Message: 'Je hebt je keten een hele week volgehouden. Goed bezig!',
-+  ok: 'Geweldig',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: 'Taal wijzigen',
-+  currentLanguage: 'Huidige',
-+  languageNameEn: 'Engels',
-+  languageNameJa: 'Japans',
-+  languageNameFr: 'Frans',
-+  languageNameEs: 'Spaans',
-+  languageNameDe: 'Duits',
-+  languageNameIt: 'Italiaans',
-+  languageNamePt: 'Portugees',
-+  languageNameRu: 'Russisch',
-+  languageNameZh: 'Chinees',
-+  languageNameKo: 'Koreaans',
-+  languageNameHi: 'Hindi',
-+  languageNameId: 'Indonesisch',
-+  languageNameTh: 'Thais',
-+  languageNameVi: 'Vietnamees',
-+  languageNameMs: 'Maleis',
-+  languageNameTr: 'Turks',
-+  languageNameNl: 'Nederlands',
-+  languageNameSv: 'Zweeds',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: 'Volgende',
-+  tutorialWelcome: 'Welkom bij DotChain',
-+  tutorialDesc1: 'Verbind je dagelijkse gewoonten en bouw je eigen keten.',
-+  tutorialDesc2: 'Breek de keten niet om de gewoonte vast te houden.',
-+  tutorialStart: 'Starten',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/pt.ts b/src/core/i18n/locales/pt.ts
-index 0ef0436..b883613 100644
---- a/src/core/i18n/locales/pt.ts
-+++ b/src/core/i18n/locales/pt.ts
-@@ -1,176 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'DIAS SEGUIDOS',
--    yourChain: 'SUA CORRENTE',
--    allDoneDays: 'DIAS COMPLETOS',
--    settings: 'Configurações',
--    hapticOff: 'Vibração desligada',
--    language: 'Idioma',
--    sound: 'Som',
--    haptics: 'Vibração',
--    theme: 'Tema',
--    restore: 'Restaurar compras',
--    version: 'Versão do app',
--    tapSound: 'Som do toque',
--    click: 'Clique',
--    pop: 'Pop',
--    flowEffectTitle: 'Animação de fluxo elétrico',
--    flowEffectHelp:
--      'Deixe um fluxo de néon correr pela sua linha de corrente. Desative se preferir um visual mais calmo.',
--    heatmapRangeTitle: 'Intervalo de exibição da corrente',
--    heatmapRangeHelp: 'Escolha quantos dias da sua corrente mostrar no mapa de calor da tela inicial.',
--    heatmapRange7: '1 semana',
--    heatmapRange30: '1 mês',
--    heatmapRange60: '2 meses',
--    heatmapRange180: '6 meses',
--    heatmapRange365: '1 ano',
--    heatmapSummaryPrefix: 'Últimos ',
--    heatmapSummarySuffix: ' dias',
--    heatmapAgoSuffix: ' dias atrás',
--    heatmapToday: 'Hoje',
--    freeThemeNote: 'Grátis: só Dark / Pro libera Neon Pink e Cyber Blue',
--    proThemeNote: 'Temas Pro serão desbloqueados depois do pagamento.',
--    restoreDesc: 'Restaurar compras (em breve)',
--    licenses: 'Licenças de código aberto (em breve)',
--    openPro: 'Abrir DotChain Pro',
--    heroPaywall: 'Atualize para o mundo neon',
--    priceMonthly: 'US$1.99 / mês',
--    onboardingTitle: 'Bem-vindo ao DotChain',
--    onboardingBody: 'Um toque, vibração forte. Vamos construir a cadeia de hoje.',
--    start: 'Começar',
--    paywallNote: 'Cobrança e anúncios serão adicionados depois.',
--    homeLoading: 'Carregando...',
--    homeAddHabitLabel: 'Adicionar hábito',
--    editNewHabit: 'Novo hábito',
--    editHabitTitle: 'Editar hábito',
--    editCategoryLabel: 'Categoria',
--    editNameLabel: 'Nome (máx. 20 caracteres)',
--    editNamePlaceholder: 'Nomeie seu hábito...',
--    editSaveChanges: 'Salvar alterações',
--    editCreateHabit: 'Criar hábito',
--    editDeleteHabit: 'Excluir hábito',
--    proTitle: 'Desbloqueie sua corrente.',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'Hábitos ilimitados',
--    proFeatureThemes: 'Todos os temas liberados (Neon Pink / Cyber Blue)',
--    proFeatureAds: 'Sem anúncios',
--    habitButtonSuffix: ' botão de hábito',
--    iconCatBasic: 'Básico',
--    iconCatHealth: 'Saúde',
--    iconCatLearning: 'Aprendizado e Trabalho',
--    errorLoadFailed: 'Falha ao carregar dados',
--    errorTitleRequired: 'Título é obrigatório.',
--    errorTitleTooLong: 'O título deve ter no máximo 20 caracteres.',
--    errorSaveFailed: 'Falha ao salvar.',
--    errorDeleteFailed: 'Falha ao excluir.',
--    errorToggleFailed: 'Falha ao atualizar.',
--    habitLimitTitle: 'Limite do plano gratuito',
--    habitLimitBody: 'No plano gratuito você pode criar até 3 hábitos.',
--    hapticsDescription: 'Feedback tátil',
--    reminderSectionTitle: 'Notificação de lembrete',
--    reminderToggleLabel: 'Usar lembrete',
--    reminderTimeLabel: 'Horário da notificação',
--    reminderNotificationBody: 'É hora de construir sua cadeia.',
--    streak7Title: 'Sequência de 7 dias!',
--    streak7Message: 'Você manteve sua cadeia por uma semana inteira. Ótimo trabalho!',
--    ok: 'OK',
--    languageChange: 'Alterar idioma',
--    currentLanguage: 'Atual',
--    languageNameEn: 'Inglês',
--    languageNameJa: 'Japonês',
--    languageNameFr: 'Francês',
--    languageNameEs: 'Espanhol',
--    languageNameDe: 'Alemão',
--    languageNameIt: 'Italiano',
--    languageNamePt: 'Português',
--    languageNameRu: 'Russo',
--    languageNameZh: 'Chinês',
--    languageNameKo: 'Coreano',
--    languageNameHi: 'Hindi',
--    languageNameId: 'Indonésio',
--    languageNameTh: 'Tailandês',
--    languageNameVi: 'Vietnamita',
--    languageNameMs: 'Malaio',
--    languageNameTr: 'Turco',
--    languageNameNl: 'Holandês',
--    languageNameSv: 'Sueco',
--    soundSwitchLabel: 'Ativar som',
--    tapSoundLabel: 'Estilo do som de toque',
--    proOnlyTitle: 'Recurso exclusivo do Pro',
--    proOnlyTheme: 'Este tema está disponível no Pro.',
--
--    // Chaves faltantes para pt
--    cancel: 'Cancelar',
--    delete: 'Excluir',
--    deleteConfirmBody: 'Tem certeza? Esta ação não pode ser desfeita.',
--    comingSoonTitle: 'Em breve',
--    onboardingPunch: 'Este é o DotChain.',
--
--    paywallBestValueBadge: 'Melhor custo-benefício',
--    paywallMonthlyLabel: 'Plano mensal',
--    paywallMonthlySub: 'Cobrado todo mês. Pode cancelar quando quiser.',
--    paywallYearlyLabel: 'Plano anual',
--    paywallYearlySub: 'Cobrança uma vez ao ano. Pode cancelar quando quiser.',
--
--    priceFree: 'US$0 / para sempre',
--    priceYearly: 'US$14.99 / ano',
--
--    proCompareHeaderFeature: 'Recurso',
--    proCompareHeaderFree: 'Grátis',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      'Você sempre pode continuar no plano Gratuito. Pro só remove os limites.',
--    proCompareTitle: 'O que você ganha com Pro',
--
--    proCtaMonthly: 'Assinar Pro mensal',
--    proCtaStayFree: 'Continuar no gratuito',
--    proCtaYearly: 'Assinar Pro anual',
--
--    proFeatureAdsFree: 'Banner de anúncios na parte inferior',
--    proFeatureAdsPro: 'Sem anúncios, foco total',
--    proFeatureHabits: 'Hábitos que você pode acompanhar',
--    proFeatureHabitsFree: 'Até 3 hábitos',
--    proFeatureHabitsPro: 'Hábitos ilimitados',
--    proFeatureThemesFree: '1 tema (Dark)',
--    proFeatureThemesPro: 'Todos os temas liberados',
--
--    proFinePrint:
--      'A assinatura renova automaticamente. Você pode cancelar a qualquer momento nas configurações da sua conta App Store ou Google Play.',
--    proMonthlyTagline: 'Comece pequeno, cancele quando quiser.',
--    proPlanFreeTitle: 'Gratuito',
--    proPlanMonthlyTitle: 'Mensal',
--    proPlanYearlyBadge: 'Melhor opção',
--    proPlanYearlyTitle: 'Anual',
--    proSubtitle: 'Vá além de 3 hábitos e torne sua corrente imparável.',
--    proYearlySavingShort: 'Economize cerca de 37% (como 8 meses grátis).',
--    proYearlyTagline: 'Para quem leva a corrente a sério.',
--
--    restoreSoon: 'A opção de restaurar compras será adicionada em uma próxima atualização.',
--
--    themeCyberBlueLabel: 'Cyber Blue',
--    themeDarkLabel: 'Dark',
--    themeDesc: 'Escolha o clima que preferir. (Temas Pro serão adicionados depois.)',
--    themeNeonPinkLabel: 'Neon Pink',
--
--    tutorialEditIconBody:
--      'Primeiro, escolha um ícone que combine com seu hábito.',
--    tutorialEditNameBody:
--      'Depois, dê um nome ao seu hábito.\nExemplo: "Beber água", "Ler um livro".',
--    tutorialEditSubmitBody:
--      'Pronto!\nToque no botão de criar abaixo para adicionar este hábito à tela inicial.',
--    tutorialExplainChainBody:
--      'Ao tocar, seu contador de DIAS SEGUIDOS aumenta e hoje acende na SUA CORRENTE.\nContinue para alongar ainda mais a corrente.',
--    tutorialGotIt: 'Entendi',
--    tutorialNext: 'Avançar',
--    tutorialPressFabBody:
--      'Toque no botão + no canto inferior direito para criar seu primeiro hábito.',
--    tutorialPressHabitBody:
--      'Agora toque no hábito que você acabou de criar.\nAo tocar, hoje fica marcado como "concluído".',
--    tutorialStart: 'Começar',
--    tutorialWelcomeBody:
--      'Bem-vindo!\nO DotChain ajuda você a construir sua corrente de hábitos.\nComece criando seu primeiro hábito pelo botão +.',
-+  ...baseEn,
-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
-+  daysStreak: 'DIAS SEGUIDOS',
-+  yourChain: 'SUA CORRENTE',
-+  allDoneDays: 'DIAS COMPLETOS',
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: 'Configurações',
-+  hapticOff: 'Vibração desativada',
-+  language: 'Idioma',
-+  sound: 'Som',
-+  haptics: 'Vibração',
-+  theme: 'Tema',
-+
-+  // --- Purchase / Restore (購入 / 復元) ---
-+  restore: 'Restaurar Compras',
-+  purchaseSuccess: 'O plano Pro está ativo agora.',
-+  purchaseFailed: 'Falha na compra. Tente novamente mais tarde.',
-+  restoreSuccess: 'Histórico de compras restaurado.',
-+  restoreNotFound: 'Nenhuma compra encontrada para restaurar.',
-+  restoreFailed: 'Falha ao restaurar compras.',
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: 'Versão do App',
-+  tapSound: 'Som do toque',
-+  click: 'Clique',
-+  pop: 'Pop',
-+  soundSwitchLabel: 'Efeitos Sonoros',
-+
-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
-+  proTitle: 'Desbloqueie sua corrente.',
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: 'Vá além de 3 hábitos e torne seus pontos imparáveis.',
-+  proPlanFreeTitle: 'Grátis',
-+  proPlanMonthlyTitle: 'Mensal',
-+  proPlanYearlyTitle: 'Anual',
-+  proPlanYearlyBadge: 'Melhor opção',
-+  proBadgeShort: 'PRO',
-+  priceFree: '$0 / para sempre', // または 'Grátis / para sempre'
-+  proOnlyTitle: 'Recurso Pro',
-+  proOnlyTheme: 'Faça upgrade para o Pro para usar este tema.',
-+  openPro: 'Ver Plano Pro',
-+  cancel: 'Cancelar',
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: 'Animação de fluxo elétrico',
-+  flowEffectHelp:
-+    'Deixe um fluxo neon percorrer sua linha de corrente. Desative se preferir um visual mais calmo.',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
-+  heatmapRangeTitle: 'Intervalo de exibição',
-+  heatmapRangeHelp: 'Escolha quantos dias da sua corrente mostrar no mapa de calor da tela inicial.',
-+  heatmapRange7: '1 semana',
-+  heatmapRange30: '1 mês',
-+  heatmapRange60: '2 meses',
-+  heatmapRange90: '3 meses',
-+  heatmapRange180: '6 meses',
-+  heatmapRange365: '1 ano',
-+  heatmapSummaryPrefix: 'Últimos ',
-+  heatmapSummarySuffix: ' dias',
-+  heatmapAgoSuffix: ' dias atrás',
-+  heatmapToday: 'Hoje',
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: 'Mude a aparência do aplicativo.',
-+  themeDarkLabel: 'Escuro',
-+  themeNeonPinkLabel: 'Neon Rosa',
-+  themeCyberBlueLabel: 'Cyber Azul',
-+  freeThemeNote: 'Grátis: Apenas Escuro / Pro desbloqueia Neon Rosa e Cyber Azul',
-+  proThemeNote: 'Temas Pro estarão disponíveis em breve.',
-+
-+  // --- Habit Management (習慣管理) ---
-+  newHabitTitle: 'Novo Hábito',
-+  editHabitTitle: 'Editar Hábito',
-+  habitNameLabel: 'Nome',
-+  habitNamePlaceholder: 'ex: Ler um livro, Beber água',
-+  habitIconLabel: 'Ícone',
-+  deleteHabit: 'Excluir este hábito',
-+  deleteConfirmationTitle: 'Excluir hábito?',
-+  deleteConfirmationMessage: 'Esta ação não pode ser desfeita. Todo o histórico será perdido.',
-+  save: 'Salvar',
-+  create: 'Criar',
-+
-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
-+  iconCatBasic: 'Básico',
-+  iconCatHealth: 'Saúde',
-+  iconCatLearning: 'Aprendizado',
-+
-+  iconLabelStreak: 'Sequência',
-+  iconLabelTask: 'Tarefa',
-+  iconLabelShine: 'Brilho',
-+  iconLabelClean: 'Limpeza',
-+  iconLabelLaundry: 'Lavanderia',
-+  iconLabelWater: 'Água',
-+  iconLabelWalk: 'Caminhada',
-+  iconLabelSleep: 'Sono',
-+  iconLabelWorkout: 'Treino',
-+  iconLabelBarbell: 'Haltere',
-+  iconLabelRead: 'Leitura',
-+  iconLabelArt: 'Arte',
-+  iconLabelMedia: 'Mídia',
-+  iconLabelStudy: 'Estudo',
-+  iconLabelLanguage: 'Idioma',
-+
-+  // --- Misc / Errors (その他 / エラー) ---
-+  habitButtonSuffix: ' botão de hábito',
-+  errorLoadFailed: 'Falha ao carregar dados.',
-+  errorTitleRequired: 'O título é obrigatório.',
-+  errorTitleTooLong: 'O título deve ter 20 caracteres ou menos.',
-+  errorSaveFailed: 'Falha ao salvar.',
-+  errorDeleteFailed: 'Falha ao excluir.',
-+  errorToggleFailed: 'Falha ao atualizar registro.',
-+  habitLimitTitle: 'Limite do plano gratuito',
-+  habitLimitBody: 'No plano gratuito você pode criar até 3 hábitos.',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: 'Feedback tátil (vibração)',
-+
-+  // --- Reminder (リマインダー) ---
-+  reminderSectionTitle: 'Lembrete',
-+  reminderToggleLabel: 'Usar lembrete',
-+  reminderTimeLabel: 'Horário da notificação',
-+  reminderNotificationBody: 'É hora de construir sua corrente!',
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: 'Sequência de 7 dias!',
-+  streak7Message: 'Você manteve sua corrente por uma semana inteira. Ótimo trabalho!',
-+  ok: 'Incrível',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: 'Mudar idioma',
-+  currentLanguage: 'Atual',
-+  languageNameEn: 'Inglês',
-+  languageNameJa: 'Japonês',
-+  languageNameFr: 'Francês',
-+  languageNameEs: 'Espanhol',
-+  languageNameDe: 'Alemão',
-+  languageNameIt: 'Italiano',
-+  languageNamePt: 'Português',
-+  languageNameRu: 'Russo',
-+  languageNameZh: 'Chinês',
-+  languageNameKo: 'Coreano',
-+  languageNameHi: 'Hindi',
-+  languageNameId: 'Indonésio',
-+  languageNameTh: 'Tailandês',
-+  languageNameVi: 'Vietnamita',
-+  languageNameMs: 'Malaio',
-+  languageNameTr: 'Turco',
-+  languageNameNl: 'Holandês',
-+  languageNameSv: 'Sueco',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: 'Próximo',
-+  tutorialWelcome: 'Bem-vindo ao DotChain',
-+  tutorialDesc1: 'Conecte seus hábitos diários e construa sua própria corrente.',
-+  tutorialDesc2: 'Não quebre a corrente para manter o hábito.',
-+  tutorialStart: 'Começar',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/ru.ts b/src/core/i18n/locales/ru.ts
-index 5479482..082ec39 100644
---- a/src/core/i18n/locales/ru.ts
-+++ b/src/core/i18n/locales/ru.ts
-@@ -1,177 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'Серия дней',
--    yourChain: 'Твоя цепочка',
--    allDoneDays: 'Дни, когда все привычки выполнены',
--    settings: 'Настройки',
--    hapticOff: 'Вибрация выключена',
--    language: 'Язык',
--    sound: 'Звук',
--    haptics: 'Вибрация',
--    theme: 'Тема',
--    restore: 'Восстановить покупки',
--    version: 'Версия приложения',
--    tapSound: 'Звук нажатия',
--    click: 'Клик',
--    pop: 'Поп',
--    flowEffectTitle: 'Анимация электрического потока',
--    flowEffectHelp:
--      'Неоновый поток бежит по линии цепочки. Выключите, если хотите более спокойный вид.',
--    heatmapRangeTitle: 'Период отображения цепочки',
--    heatmapRangeHelp: 'Выберите, сколько дней цепочки показывать на теплокарте главного экрана.',
--    heatmapRange7: '1 неделя',
--    heatmapRange30: '1 месяц',
--    heatmapRange60: '2 месяца',
--    heatmapRange180: '6 месяцев',
--    heatmapRange365: '1 год',
--    heatmapSummaryPrefix: 'За последние ',
--    heatmapSummarySuffix: ' дней',
--    heatmapAgoSuffix: ' дней назад',
--    heatmapToday: 'Сегодня',
--    freeThemeNote: 'Бесплатно: доступна только тема Dark. В Pro открываются Neon Pink и Cyber Blue.',
--    proThemeNote: 'Темы Pro станут доступны после оплаты.',
--    restoreDesc: 'Восстановление покупок (скоро)',
--    licenses: 'Лицензии открытого ПО (скоро)',
--    openPro: 'Открыть DotChain Pro',
--    heroPaywall: 'В неоновый мир',
--    priceMonthly: '$1.99 / месяц',
--    onboardingTitle: 'Добро пожаловать в DotChain',
--    onboardingBody: 'Одно нажатие — мощная вибрация. Соберём цепочку сегодня.',
--    start: 'Начать',
--    paywallNote: 'Оплата и реклама будут добавлены позже.',
--    homeLoading: 'Загрузка...',
--    homeAddHabitLabel: 'Добавить привычку',
--    editNewHabit: 'Новая привычка',
--    editHabitTitle: 'Редактировать привычку',
--    editCategoryLabel: 'Категория',
--    editNameLabel: 'Название (до 20 символов)',
--    editNamePlaceholder: 'Назови свою привычку...',
--    editSaveChanges: 'Сохранить изменения',
--    editCreateHabit: 'Создать привычку',
--    editDeleteHabit: 'Удалить привычку',
--    proTitle: 'Разблокируй свою цепочку.',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'Безлимитные привычки',
--    proFeatureThemes: 'Все темы разблокированы (Neon Pink / Cyber Blue)',
--    proFeatureAds: 'Без рекламы',
--    habitButtonSuffix: ' кнопка привычки',
--    iconCatBasic: 'Базовые',
--    iconCatHealth: 'Здоровье',
--    iconCatLearning: 'Обучение и работа',
--    errorLoadFailed: 'Не удалось загрузить данные',
--    errorTitleRequired: 'Требуется название.',
--    errorTitleTooLong: 'Название должно быть не длиннее 20 символов.',
--    errorSaveFailed: 'Не удалось сохранить.',
--    errorDeleteFailed: 'Не удалось удалить.',
--    errorToggleFailed: 'Не удалось обновить запись.',
--    habitLimitTitle: 'Лимит бесплатного плана',
--    habitLimitBody: 'В бесплатном плане можно создать до 3 привычек.',
--    hapticsDescription: 'Тактильная отдача',
--    reminderSectionTitle: 'Уведомление-напоминание',
--    reminderToggleLabel: 'Использовать напоминание',
--    reminderTimeLabel: 'Время уведомления',
--    reminderNotificationBody: 'Пора продолжить свою цепочку.',
--    streak7Title: 'Серия 7 дней!',
--    streak7Message: 'Вы держали цепочку целую неделю. Отличная работа!',
--    ok: 'OK',
--    languageChange: 'Сменить язык',
--    currentLanguage: 'Текущий',
--    languageNameEn: 'Английский',
--    languageNameJa: 'Японский',
--    languageNameFr: 'Французский',
--    languageNameEs: 'Испанский',
--    languageNameDe: 'Немецкий',
--    languageNameIt: 'Итальянский',
--    languageNamePt: 'Португальский',
--    languageNameRu: 'Русский',
--    languageNameZh: 'Китайский',
--    languageNameKo: 'Корейский',
--    languageNameHi: 'Хинди',
--    languageNameId: 'Индонезийский',
--    languageNameTh: 'Тайский',
--    languageNameVi: 'Вьетнамский',
--    languageNameMs: 'Малайский',
--    languageNameTr: 'Турецкий',
--    languageNameNl: 'Нидерландский',
--    languageNameSv: 'Шведский',
--    soundSwitchLabel: 'Включить звук',
--    tapSoundLabel: 'Стиль звука нажатия',
--    proOnlyTitle: 'Только для Pro',
--    proOnlyTheme: 'Эта тема доступна в Pro.',
--
--    // Полное заполнение ru-локали (новые ключи)
--    cancel: 'Отмена',
--    delete: 'Удалить',
--    deleteConfirmBody: 'Действительно удалить? Это действие нельзя отменить.',
--    comingSoonTitle: 'Скоро',
--    onboardingPunch: 'Это DotChain.',
--
--    paywallBestValueBadge: 'Самое выгодное',
--    paywallMonthlyLabel: 'Месячный план',
--    paywallMonthlySub: 'Списывается каждый месяц. Можно отменить в любое время.',
--    paywallYearlyLabel: 'Годовой план',
--    paywallYearlySub: 'Списывается раз в год. Можно отменить в любое время.',
--
--    priceFree: '$0 / всегда бесплатно',
--    priceYearly: '$14.99 / год',
--
--    proCompareHeaderFeature: 'Функция',
--    proCompareHeaderFree: 'Бесплатно',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      'Ты всегда можешь остаться на бесплатном плане. Pro просто убирает ограничения.',
--    proCompareTitle: 'Что дает Pro',
--
--    proCtaMonthly: 'Оформить Pro на месяц',
--    proCtaStayFree: 'Остаться на бесплатном',
--    proCtaYearly: 'Оформить Pro на год',
--
--    proFeatureAdsFree: 'Баннерная реклама внизу',
--    proFeatureAdsPro: 'Без рекламы, максимум фокуса',
--    proFeatureHabits: 'Сколько привычек можно отслеживать',
--    proFeatureHabitsFree: 'До 3 привычек',
--    proFeatureHabitsPro: 'Неограниченное количество привычек',
--    proFeatureThemesFree: '1 тема (темная)',
--    proFeatureThemesPro: 'Все темы разблокированы',
--
--    proFinePrint:
--      'Подписка продлевается автоматически. Отменить можно в любое время в настройках аккаунта App Store или Google Play.',
--    proMonthlyTagline: 'Начни с малого, отменить можно в любое время.',
--    proPlanFreeTitle: 'Бесплатно',
--    proPlanMonthlyTitle: 'Месячный',
--    proPlanYearlyBadge: 'Самое выгодное',
--    proPlanYearlyTitle: 'Годовой',
--    proSubtitle:
--      'Отслеживай более 3 привычек — и твои точки будут неостановимы.',
--    proYearlySavingShort: 'Экономия около 37% (примерно как 8 бесплатных месяцев).',
--    proYearlyTagline: 'Для тех, кто настроен серьёзно.',
--
--    restoreSoon: 'Функция восстановления покупок появится в одном из следующих обновлений.',
--
--    themeCyberBlueLabel: 'Кибер-синий',
--    themeDarkLabel: 'Темная',
--    themeDesc: 'Выберите настроение приложения. (Темы Pro появятся позже.)',
--    themeNeonPinkLabel: 'Неоново-розовый',
--
--    tutorialEditIconBody:
--      'Сначала выбери иконку, которая подходит твоей привычке.',
--    tutorialEditNameBody:
--      'Теперь введи название привычки.\nНапример: «Пей воду», «Читай книгу».',
--    tutorialEditSubmitBody:
--      'Готово!\nНажми кнопку создания ниже, чтобы добавить привычку на главный экран.',
--    tutorialExplainChainBody:
--      'Когда отмечаешь привычку, серия дней растёт, а на цепочке загорается сегодняшняя точка.\nПродолжай, чтобы удлинять цепочку.',
--    tutorialGotIt: 'Понятно',
--    tutorialNext: 'Далее',
--    tutorialPressFabBody:
--      'Нажми кнопку + в правом нижнем углу, чтобы создать первую привычку.',
--    tutorialPressHabitBody:
--      'Теперь нажми на только что созданную привычку.\nНажатие отмечает сегодняшний день как «выполнено».',
--    tutorialStart: 'Начать',
--    tutorialWelcomeBody:
--      'Добро пожаловать!\nDotChain помогает строить цепочки привычек.\nСначала создай свою первую привычку с помощью кнопки +.',
-+  ...baseEn,
-+  // --- Home / Header (ホーム / ヘッダー) ---
-+  daysStreak: 'СЕРИЯ ДНЕЙ',
-+  yourChain: 'ТВОЯ ЦЕПОЧКА',
-+  allDoneDays: 'ВСЕ ВЫПОЛНЕНО', // 直訳より「全て完了」のニュアンス
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: 'Настройки',
-+  hapticOff: 'Вибрация выкл.',
-+  language: 'Язык',
-+  sound: 'Звук',
-+  haptics: 'Вибрация',
-+  theme: 'Тема',
-+
-+  // --- Purchase / Restore (購入 / 復元) ---
-+  restore: 'Восстановить покупки',
-+  purchaseSuccess: 'Pro план активирован.',
-+  purchaseFailed: 'Ошибка покупки. Попробуйте позже.',
-+  restoreSuccess: 'История покупок восстановлена.',
-+  restoreNotFound: 'Покупки для восстановления не найдены.',
-+  restoreFailed: 'Не удалось восстановить покупки.',
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: 'Версия',
-+  tapSound: 'Звук нажатия',
-+  click: 'Клик',
-+  pop: 'Поп',
-+  soundSwitchLabel: 'Звуковые эффекты',
-+
-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
-+  proTitle: 'Разблокируй цепь.',
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: 'Больше 3 привычек и неудержимые точки.',
-+  proPlanFreeTitle: 'Бесплатно',
-+  proPlanMonthlyTitle: 'Месяц',
-+  proPlanYearlyTitle: 'Год',
-+  proPlanYearlyBadge: 'Выгодно', // 「Best value」の自然な意訳
-+  proBadgeShort: 'PRO',
-+  priceFree: '0 ₽ / навсегда', // 通貨記号は適宜ですが、一般的に₽または$
-+  proOnlyTitle: 'Pro функция',
-+  proOnlyTheme: 'Перейди на Pro для этой темы.',
-+  openPro: 'Смотреть Pro',
-+  cancel: 'Отмена',
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: 'Эффект электротока',
-+  flowEffectHelp:
-+    'Пусти неоновый ток по своей цепочке. Выключи, если хочешь спокойствия.',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
-+  heatmapRangeTitle: 'Период отображения',
-+  heatmapRangeHelp: 'Сколько дней цепочки показывать на главном экране.',
-+  heatmapRange7: '1 неделя',
-+  heatmapRange30: '1 месяц',
-+  heatmapRange60: '2 месяца',
-+  heatmapRange90: '3 месяца',
-+  heatmapRange180: '6 месяцев',
-+  heatmapRange365: '1 год',
-+  heatmapSummaryPrefix: 'За ',
-+  heatmapSummarySuffix: ' дн.', // "days" の短縮形（文法回避のため）
-+  heatmapAgoSuffix: ' дн. назад',
-+  heatmapToday: 'Сегодня',
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: 'Измени внешний вид приложения.',
-+  themeDarkLabel: 'Темная',
-+  themeNeonPinkLabel: 'Неон Розовый',
-+  themeCyberBlueLabel: 'Кибер Синий',
-+  freeThemeNote: 'Free: Темная / Pro: Неон и Кибер',
-+  proThemeNote: 'Pro темы скоро появятся.',
-+
-+  // --- Habit Management (習慣管理) ---
-+  newHabitTitle: 'Новая привычка',
-+  editHabitTitle: 'Редактировать',
-+  habitNameLabel: 'Название',
-+  habitNamePlaceholder: 'Напр.: Читать книгу, Пить воду',
-+  habitIconLabel: 'Иконка',
-+  deleteHabit: 'Удалить привычку',
-+  deleteConfirmationTitle: 'Удалить?',
-+  deleteConfirmationMessage: 'Это действие нельзя отменить. История будет потеряна.',
-+  save: 'Сохранить',
-+  create: 'Создать',
-+
-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
-+  iconCatBasic: 'Базовые',
-+  iconCatHealth: 'Здоровье',
-+  iconCatLearning: 'Обучение',
-+
-+  iconLabelStreak: 'Серия',
-+  iconLabelTask: 'Задача',
-+  iconLabelShine: 'Сияние',
-+  iconLabelClean: 'Уборка',
-+  iconLabelLaundry: 'Стирка',
-+  iconLabelWater: 'Вода',
-+  iconLabelWalk: 'Прогулка',
-+  iconLabelSleep: 'Сон',
-+  iconLabelWorkout: 'Тренировка',
-+  iconLabelBarbell: 'Штанга',
-+  iconLabelRead: 'Чтение',
-+  iconLabelArt: 'Искусство',
-+  iconLabelMedia: 'Медиа',
-+  iconLabelStudy: 'Учеба',
-+  iconLabelLanguage: 'Язык',
-+
-+  // --- Misc / Errors (その他 / エラー) ---
-+  habitButtonSuffix: ' кнопка привычки',
-+  errorLoadFailed: 'Ошибка загрузки данных.',
-+  errorTitleRequired: 'Название обязательно.',
-+  errorTitleTooLong: 'Название не более 20 символов.',
-+  errorSaveFailed: 'Ошибка сохранения.',
-+  errorDeleteFailed: 'Ошибка удаления.',
-+  errorToggleFailed: 'Ошибка обновления.',
-+  habitLimitTitle: 'Лимит бесплатного плана',
-+  habitLimitBody: 'В бесплатном плане можно создать до 3 привычек.',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: 'Тактильный отклик (вибрация)',
-+
-+  // --- Reminder (リマインダー) ---
-+  reminderSectionTitle: 'Напоминание',
-+  reminderToggleLabel: 'Включить напоминание',
-+  reminderTimeLabel: 'Время уведомления',
-+  reminderNotificationBody: 'Пора строить свою цепочку!',
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: 'Серия 7 дней!',
-+  streak7Message: 'Ты держишь цепочку целую неделю. Отличная работа!',
-+  ok: 'Круто',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: 'Сменить язык',
-+  currentLanguage: 'Текущий',
-+  languageNameEn: 'Английский',
-+  languageNameJa: 'Японский',
-+  languageNameFr: 'Французский',
-+  languageNameEs: 'Испанский',
-+  languageNameDe: 'Немецкий',
-+  languageNameIt: 'Итальянский',
-+  languageNamePt: 'Португальский',
-+  languageNameRu: 'Русский',
-+  languageNameZh: 'Китайский',
-+  languageNameKo: 'Корейский',
-+  languageNameHi: 'Хинди',
-+  languageNameId: 'Индонезийский',
-+  languageNameTh: 'Тайский',
-+  languageNameVi: 'Вьетнамский',
-+  languageNameMs: 'Малайский',
-+  languageNameTr: 'Турецкий',
-+  languageNameNl: 'Нидерландский',
-+  languageNameSv: 'Шведский',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: 'Далее',
-+  tutorialWelcome: 'Добро пожаловать в DotChain',
-+  tutorialDesc1: 'Соединяй ежедневные привычки и строй свою цепочку.',
-+  tutorialDesc2: 'Не прерывай цепочку, чтобы привычка закрепилась.',
-+  tutorialStart: 'Начать',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/sv.ts b/src/core/i18n/locales/sv.ts
-index f6af6d3..ca7e019 100644
---- a/src/core/i18n/locales/sv.ts
-+++ b/src/core/i18n/locales/sv.ts
-@@ -1,183 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'Dagar i rad',
--    yourChain: 'Din kedja',
--    allDoneDays: 'Dagar då alla vanor är klara',
--    settings: 'Inställningar',
--    hapticOff: 'Vibration av',
--    language: 'Språk',
--    sound: 'Ljud',
--    haptics: 'Vibration',
--    theme: 'Tema',
--    restore: 'Återställ köp',
--    version: 'App-version',
--    tapSound: 'Tryckljud',
--    click: 'Klick',
--    pop: 'Pop',
--    flowEffectTitle: 'Elflödesanimation',
--    flowEffectHelp:
--      'Låt ett neonströmflöde löpa längs kedjan. Stäng av om du vill ha ett lugnare intryck.',
--    heatmapRangeTitle: 'Visningsperiod för kedjan',
--    heatmapRangeHelp:
--      'Välj hur många dagar av kedjan som ska visas i heatmapen på startsidan.',
--    heatmapRange7: '1 vecka',
--    heatmapRange30: '1 månad',
--    heatmapRange60: '2 månader',
--    heatmapRange180: '6 månader',
--    heatmapRange365: '1 år',
--    heatmapSummaryPrefix: 'Senaste ',
--    heatmapSummarySuffix: ' dagar',
--    heatmapAgoSuffix: ' dagar sedan',
--    heatmapToday: 'Idag',
--    freeThemeNote: 'Gratis: bara Dark / Pro låser upp Neon Pink & Cyber Blue',
--    proThemeNote: 'Pro-teman låses upp senare.',
--    restoreDesc: 'Återställ (snart)',
--    licenses: 'Open-source-licenser (snart)',
--    openPro: 'Öppna DotChain Pro',
--    heroPaywall: 'Uppgradera till neonvärlden',
--    priceMonthly: '$1.99 / månad',
--    onboardingTitle: 'Välkommen till DotChain',
--    onboardingBody: 'Ett tryck, stark vibration. Bygg dagens kedja.',
--    start: 'Starta',
--    paywallNote: 'Fakturering och annonser läggs till senare.',
--    homeLoading: 'Laddar...',
--    homeAddHabitLabel: 'Lägg till vana',
--    editNewHabit: 'Ny vana',
--    editHabitTitle: 'Redigera vana',
--    editCategoryLabel: 'Kategori',
--    editNameLabel: 'Namn (max 20 tecken)',
--    editNamePlaceholder: 'Namnge din vana...',
--    editSaveChanges: 'Spara ändringar',
--    editCreateHabit: 'Skapa vana',
--    editDeleteHabit: 'Ta bort vana',
--    proTitle: 'Lås upp din kedja.',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'Obegränsade vanor',
--    proFeatureThemes: 'Alla teman upplåsta (Neon Pink / Cyber Blue)',
--    proFeatureAds: 'Inga annonser',
--    habitButtonSuffix: ' vaneknapp',
--    iconCatBasic: 'Bas',
--    iconCatHealth: 'Hälsa',
--    iconCatLearning: 'Lärande & Arbete',
--    errorLoadFailed: 'Misslyckades att läsa in data',
--    errorTitleRequired: 'Titel krävs.',
--    errorTitleTooLong: 'Titeln får vara högst 20 tecken.',
--    errorSaveFailed: 'Misslyckades att spara.',
--    errorDeleteFailed: 'Misslyckades att ta bort.',
--    errorToggleFailed: 'Misslyckades att uppdatera.',
--    habitLimitTitle: 'Gräns för gratisplanen',
--    habitLimitBody: 'I gratisplanen kan du skapa upp till 3 vanor.',
--    hapticsDescription: 'Haptisk feedback',
--    reminderSectionTitle: 'Påminnelseavisering',
--    reminderToggleLabel: 'Använd påminnelse',
--    reminderTimeLabel: 'Notistid',
--    reminderNotificationBody: 'Dags att bygga vidare på din kedja.',
--    streak7Title: '7 dagars svit!',
--    streak7Message: 'Du höll din kedja i en hel vecka. Grymt jobbat!',
--    ok: 'OK',
--    languageChange: 'Ändra språk',
--    currentLanguage: 'Aktuell',
--    languageNameEn: 'Engelska',
--    languageNameJa: 'Japanska',
--    languageNameFr: 'Franska',
--    languageNameEs: 'Spanska',
--    languageNameDe: 'Tyska',
--    languageNameIt: 'Italienska',
--    languageNamePt: 'Portugisiska',
--    languageNameRu: 'Ryska',
--    languageNameZh: 'Kinesiska',
--    languageNameKo: 'Koreanska',
--    languageNameHi: 'Hindi',
--    languageNameId: 'Indonesiska',
--    languageNameTh: 'Thai',
--    languageNameVi: 'Vietnamesiska',
--    languageNameMs: 'Malajiska',
--    languageNameTr: 'Turkiska',
--    languageNameNl: 'Nederländska',
--    languageNameSv: 'Svenska',
--    soundSwitchLabel: 'Aktivera ljud',
--    tapSoundLabel: 'Tryckljudsstil',
--    proOnlyTitle: 'Endast för Pro',
--    proOnlyTheme: 'Det här temat finns med Pro.',
--
--    cancel: 'Avbryt',
--    delete: 'Ta bort',
--    deleteConfirmBody: 'Är du säker? Det här går inte att ångra.',
--    comingSoonTitle: 'Kommer snart',
--    onboardingPunch: 'Det här är DotChain.',
--
--    paywallBestValueBadge: 'Bästa värdet',
--    paywallMonthlyLabel: 'Månadsabonnemang',
--    paywallMonthlySub: 'Faktureras varje månad. Kan sägas upp när som helst.',
--    paywallYearlyLabel: 'Årsabonnemang',
--    paywallYearlySub: 'Faktureras en gång per år. Kan sägas upp när som helst.',
--
--    priceFree: '$0 / för alltid',
--    priceYearly: '$14.99 / år',
--
--    proCompareHeaderFeature: 'Funktion',
--    proCompareHeaderFree: 'Gratis',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      'Du kan alltid stanna på Gratis. Pro tar bara bort begränsningarna.',
--    proCompareTitle: 'Det här får du med Pro',
--
--    proCtaMonthly: 'Välj Pro månadsvis',
--    proCtaStayFree: 'Fortsätt med gratis',
--    proCtaYearly: 'Välj Pro årsvis',
--
--    proFeatureAdsFree: 'Annonsbanner längst ned',
--    proFeatureAdsPro: 'Inga annonser, full fokus',
--    proFeatureHabits: 'Vanor du kan följa upp',
--    proFeatureHabitsFree: 'Upp till 3 vanor',
--    proFeatureHabitsPro: 'Obegränsat antal vanor',
--    proFeatureThemesFree: '1 tema (Mörk)',
--    proFeatureThemesPro: 'Alla teman upplåsta',
--
--    proFinePrint:
--      'Abonnemanget förnyas automatiskt. Du kan säga upp när som helst via inställningarna för ditt App Store- eller Google Play-konto.',
--    proMonthlyTagline: 'Börja smått, avsluta när du vill.',
--    proPlanFreeTitle: 'Gratis',
--    proPlanMonthlyTitle: 'Månadsvis',
--    proPlanYearlyBadge: 'Bästa värdet',
--    proPlanYearlyTitle: 'Årsvis',
--    proSubtitle:
--      'Gå bortom 3 vanor och gör din kedja ostoppbar.',
--    proYearlySavingShort: 'Spara cirka 37 % (som 8 månader gratis).',
--    proYearlyTagline: 'För seriösa kedjebyggare.',
--
--    restoreSoon: 'Återställning av köp läggs till i en kommande uppdatering.',
--
--    themeCyberBlueLabel: 'Cyber Blue',
--    themeDarkLabel: 'Mörk',
--    themeDesc: 'Välj den känsla som passar dig. (Pro-teman läggs till senare.)',
--    themeNeonPinkLabel: 'Neon Pink',
--
--    tutorialEditIconBody: 'Välj först en ikon som passar din vana.',
--    tutorialEditNameBody:
--      `Ge sedan din vana ett namn.
--Till exempel: "Dricka vatten", "Läsa en bok".`,
--    tutorialEditSubmitBody:
--      `Klart!
--Tryck på skapa-knappen nedan för att lägga till den här vanan på startsidan.`,
--    tutorialExplainChainBody:
--      `När du trycker ökar dina DAGAR I RAD och idag lyser upp i DIN KEDJA.
--Fortsätt för att förlänga kedjan.`,
--    tutorialGotIt: 'Förstått',
--    tutorialNext: 'Nästa',
--    tutorialPressFabBody:
--      'Tryck på +-knappen nere till höger för att skapa din första vana.',
--    tutorialPressHabitBody:
--      `Tryck nu på vanan du just skapade.
--När du trycker räknas idag som "klar".`,
--    tutorialStart: 'Starta',
--    tutorialWelcomeBody:
--      `Välkommen!
--Med DotChain bygger du din egen vanekedja.
--Börja med att skapa din första vana via +-knappen.`,
--  }
--
--
--export default dict;
-+  ...baseEn,
-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
-+  daysStreak: 'DAGAR I RAD',         // 英語: DAYS STREAK (直訳：一列に並んだ日々＝連続記録)
-+  yourChain: 'DIN KEDJA',            // 英語: YOUR CHAIN
-+  allDoneDays: 'HELDAGAR',           // 英語: ALL DONE DAYS (「完全に完了した日」を短く表現)
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: 'Inställningar',         // 設定
-+  hapticOff: 'Vibration av',         // 振動オフ
-+  language: 'Språk',                 // 言語
-+  sound: 'Ljud',                     // 音
-+  haptics: 'Haptik',                 // 振動 (Haptics)
-+  theme: 'Tema',                     // テーマ
-+
-+  // --- Purchase / Restore (購入 / 復元) ---
-+  restore: 'Återställ köp',          // 購入の復元
-+  purchaseSuccess: 'Pro-planen är nu aktiv.', // 購入成功
-+  purchaseFailed: 'Köpet misslyckades. Försök igen senare.', // 購入失敗
-+  restoreSuccess: 'Köphistorik återställd.', // 復元成功
-+  restoreNotFound: 'Inga köp hittades att återställa.', // 復元データなし
-+  restoreFailed: 'Misslyckades med att återställa köp.', // 復元失敗
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: 'App-version',            // アプリバージョン
-+  tapSound: 'Tryckljud',             // タップ音
-+  click: 'Klick',                    // クリック
-+  pop: 'Pop',                        // ポップ
-+  soundSwitchLabel: 'Ljudeffekter',  // 効果音
-+
-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
-+  proTitle: 'Lås upp din kedja.',    // 英語: Unlock your chain.
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: 'Gå bortom 3 vanor och gör dina prickar ostoppbara.',
-+  proPlanFreeTitle: 'Gratis',        // 無料
-+  proPlanMonthlyTitle: 'Månadsvis',  // 月額
-+  proPlanYearlyTitle: 'Årsvis',      // 年額
-+  proPlanYearlyBadge: 'Bästa värde', // 英語: Best value (一番お得)
-+  proBadgeShort: 'PRO',
-+  priceFree: '0 kr / för alltid',    // ずっと0クローナ (または $0)
-+  proOnlyTitle: 'Pro-funktion',      // Pro機能
-+  proOnlyTheme: 'Uppgradera till Pro för att använda detta tema.',
-+  openPro: 'Se Pro-planen',          // Proプランを見る
-+  cancel: 'Avbryt',                  // キャンセル
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: 'Elektrisk flödesanimation', // 電気の流れのアニメーション
-+  flowEffectHelp:
-+    'Låt ett neonflöde strömma längs din kedja. Stäng av om du föredrar en lugnare vy.',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
-+  heatmapRangeTitle: 'Visningsperiod',
-+  heatmapRangeHelp: 'Välj hur många dagar av din kedja som ska visas på hemskärmen.',
-+  heatmapRange7: '1 vecka',
-+  heatmapRange30: '1 månad',
-+  heatmapRange60: '2 månader',
-+  heatmapRange90: '3 månader',
-+  heatmapRange180: '6 månader',
-+  heatmapRange365: '1 år',
-+  heatmapSummaryPrefix: 'Senaste ',  // 「Senaste (最新の/過去の)」
-+  heatmapSummarySuffix: ' dagarna',  // 「dagarna (その日々)」
-+  heatmapAgoSuffix: ' dagar sedan',  // 「〜日前」
-+  heatmapToday: 'Idag',
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: 'Ändra appens utseende.',
-+  themeDarkLabel: 'Mörk',            // Dark
-+  themeNeonPinkLabel: 'Neonrosa',
-+  themeCyberBlueLabel: 'Cyberblå',
-+  freeThemeNote: 'Gratis: Endast Mörk / Pro låser upp Neonrosa och Cyberblå',
-+  proThemeNote: 'Pro-teman blir tillgängliga efter köp.',
-+
-+  // --- Habit Management (習慣管理) ---
-+  newHabitTitle: 'Ny vana',
-+  editHabitTitle: 'Redigera vana',
-+  habitNameLabel: 'Namn',
-+  habitNamePlaceholder: 't.ex. Dricka vatten, Läsa bok',
-+  habitIconLabel: 'Ikon',
-+  deleteHabit: 'Ta bort denna vana',
-+  deleteConfirmationTitle: 'Ta bort?',
-+  deleteConfirmationMessage: 'Detta går inte att ångra. All historik försvinner.',
-+  save: 'Spara',
-+  create: 'Skapa',
-+
-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
-+  iconCatBasic: 'Grundläggande',
-+  iconCatHealth: 'Hälsa',
-+  iconCatLearning: 'Lärande',
-+
-+  iconLabelStreak: 'Svit',           // Streak (連続記録)
-+  iconLabelTask: 'Uppgift',          // Task
-+  iconLabelShine: 'Glans',           // Shine
-+  iconLabelClean: 'Städa',           // Clean
-+  iconLabelLaundry: 'Tvätt',         // Laundry
-+  iconLabelWater: 'Vatten',          // Water
-+  iconLabelWalk: 'Promenad',         // Walk
-+  iconLabelSleep: 'Sömn',            // Sleep
-+  iconLabelWorkout: 'Träning',       // Workout
-+  iconLabelBarbell: 'Skivstång',     // Barbell
-+  iconLabelRead: 'Läsa',             // Read
-+  iconLabelArt: 'Konst',             // Art
-+  iconLabelMedia: 'Media',           // Media
-+  iconLabelStudy: 'Studera',         // Study
-+  iconLabelLanguage: 'Språk',        // Language
-+
-+  // --- Misc / Errors (その他 / エラー) ---
-+  habitButtonSuffix: ' vaneknapp',   // アクセシビリティ用
-+  errorLoadFailed: 'Kunde inte ladda data.',
-+  errorTitleRequired: 'Namn krävs.',
-+  errorTitleTooLong: 'Namnet får vara max 20 tecken.',
-+  errorSaveFailed: 'Kunde inte spara.',
-+  errorDeleteFailed: 'Kunde inte ta bort.',
-+  errorToggleFailed: 'Kunde inte uppdatera.',
-+  habitLimitTitle: 'Gräns för gratisplan',
-+  habitLimitBody: 'På gratisplanen kan du skapa upp till 3 vanor.',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: 'Haptisk feedback (vibration)',
-+
-+  // --- Reminder (リマインダー) ---
-+  reminderSectionTitle: 'Påminnelse',
-+  reminderToggleLabel: 'Använd påminnelse',
-+  reminderTimeLabel: 'Tid för notis',
-+  reminderNotificationBody: 'Det är dags att bygga din kedja!', // チェーンを作る時間だよ！
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: '7 dagars svit!',
-+  streak7Message: 'Du har hållit din kedja i en hel vecka. Bra jobbat!',
-+  ok: 'Grymt',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: 'Byt språk',
-+  currentLanguage: 'Nuvarande',
-+  languageNameEn: 'Engelska',
-+  languageNameJa: 'Japanska',
-+  languageNameFr: 'Franska',
-+  languageNameEs: 'Spanska',
-+  languageNameDe: 'Tyska',
-+  languageNameIt: 'Italienska',
-+  languageNamePt: 'Portugisiska',
-+  languageNameRu: 'Ryska',
-+  languageNameZh: 'Kinesiska',
-+  languageNameKo: 'Koreanska',
-+  languageNameHi: 'Hindi',
-+  languageNameId: 'Indonesiska',
-+  languageNameTh: 'Thailändska',
-+  languageNameVi: 'Vietnamesiska',
-+  languageNameMs: 'Malaysiska',
-+  languageNameTr: 'Turkiska',
-+  languageNameNl: 'Holländska',
-+  languageNameSv: 'Svenska',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: 'Nästa',
-+  tutorialWelcome: 'Välkommen till DotChain',
-+  tutorialDesc1: 'Koppla ihop dina dagliga vanor och bygg din egen kedja.',
-+  tutorialDesc2: 'Bryt inte kedjan för att få vanan att fastna.',
-+  tutorialStart: 'Börja',
-+};
-+
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/th.ts b/src/core/i18n/locales/th.ts
-index e8faf9a..7ac7b49 100644
---- a/src/core/i18n/locales/th.ts
-+++ b/src/core/i18n/locales/th.ts
-@@ -1,185 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'จำนวนวันต่อเนื่อง',
--    yourChain: 'เชนของคุณ',
--    allDoneDays: 'จำนวนวันที่ทำครบทั้งหมด',
--    settings: 'การตั้งค่า',
--    hapticOff: 'ปิดการสั่น',
--    language: 'ภาษา',
--    sound: 'เสียง',
--    haptics: 'การสั่น',
--    theme: 'ธีม',
--    restore: 'กู้คืนการซื้อ',
--    version: 'เวอร์ชันแอป',
--    tapSound: 'เสียงแตะ',
--    click: 'คลิก',
--    pop: 'ป็อป',
--    flowEffectTitle: 'แอนิเมชันกระแสไฟ',
--    flowEffectHelp:
--      'ให้กระแสไฟนีออนไหลไปตามเชนของคุณ หากต้องการหน้าจอที่นิ่งกว่านี้ให้ปิดฟีเจอร์นี้ได้',
--    heatmapRangeTitle: 'ช่วงวันที่แสดงเชน',
--    heatmapRangeHelp: 'เลือกจำนวนวันที่จะแสดงเชนในฮีตแมปหน้าหลัก',
--    heatmapRange7: '1 สัปดาห์',
--    heatmapRange30: '1 เดือน',
--    heatmapRange60: '2 เดือน',
--    heatmapRange180: '6 เดือน',
--    heatmapRange365: '1 ปี',
--    heatmapSummaryPrefix: 'ย้อนหลัง ',
--    heatmapSummarySuffix: ' วัน',
--    heatmapAgoSuffix: ' วันที่แล้ว',
--    heatmapToday: 'วันนี้',
--    freeThemeNote: 'ฟรี: ธีมมืดเท่านั้น / Pro ปลดล็อก Neon Pink และ Cyber Blue',
--    proThemeNote: 'ธีม Pro จะใช้ได้หลังจากเปิดระบบ Pro แล้ว',
--    restoreDesc: 'กู้คืน (เร็ว ๆ นี้)',
--    licenses: 'สัญญาอนุญาต OSS (เร็ว ๆ นี้)',
--    openPro: 'เปิด DotChain Pro',
--    heroPaywall: 'อัปเกรดสู่โลกนีออน',
--    priceMonthly: '$1.99 / เดือน',
--    onboardingTitle: 'ยินดีต้อนรับสู่ DotChain',
--    onboardingBody: 'แตะครั้งเดียว สั่นแรง มาสร้างเชนของวันนี้กัน',
--    start: 'เริ่ม',
--    paywallNote: 'การชำระเงินและโฆษณาจะถูกเพิ่มภายหลัง',
--    homeLoading: 'กำลังโหลด...',
--    homeAddHabitLabel: 'เพิ่มนิสัย',
--    editNewHabit: 'นิสัยใหม่',
--    editHabitTitle: 'แก้ไขนิสัย',
--    editCategoryLabel: 'หมวดหมู่',
--    editNameLabel: 'ชื่อ (สูงสุด 20 ตัวอักษร)',
--    editNamePlaceholder: 'ตั้งชื่อนิสัยของคุณ...',
--    editSaveChanges: 'บันทึกการเปลี่ยนแปลง',
--    editCreateHabit: 'สร้างนิสัย',
--    editDeleteHabit: 'ลบนิสัย',
--    proTitle: 'ปลดล็อกเชนของคุณ',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'นิสัยไม่จำกัด',
--    proFeatureThemes: 'ปลดล็อกทุกธีม (Neon Pink / Cyber Blue)',
--    proFeatureAds: 'ไม่มีโฆษณา',
--    habitButtonSuffix: ' ปุ่มนิสัย',
--    iconCatBasic: 'พื้นฐาน',
--    iconCatHealth: 'สุขภาพ',
--    iconCatLearning: 'การเรียนรู้และงาน',
--    errorLoadFailed: 'โหลดข้อมูลล้มเหลว',
--    errorTitleRequired: 'ต้องใส่ชื่อเรื่อง',
--    errorTitleTooLong: 'ชื่อเรื่องต้องไม่เกิน 20 อักขระ',
--    errorSaveFailed: 'บันทึกล้มเหลว',
--    errorDeleteFailed: 'ลบล้มเหลว',
--    errorToggleFailed: 'อัปเดตไม่สำเร็จ',
--    habitLimitTitle: 'ขีดจำกัดแพ็กเกจฟรี',
--    habitLimitBody: 'แพ็กเกจฟรีสร้างนิสัยได้สูงสุด 3 รายการ',
--    hapticsDescription: 'การตอบสนองแบบสั่น',
--    reminderSectionTitle: 'การแจ้งเตือนนิสัย',
--    reminderToggleLabel: 'ใช้การเตือนความจำ',
--    reminderTimeLabel: 'เวลาการแจ้งเตือน',
--    reminderNotificationBody: 'ถึงเวลาสร้างเชนของคุณแล้ว',
--    streak7Title: 'ต่อเนื่อง 7 วัน!',
--    streak7Message: 'คุณรักษาเชนต่อเนื่องได้ครบหนึ่งสัปดาห์ เยี่ยมมาก!',
--    ok: 'ตกลง',
--    languageChange: 'เปลี่ยนภาษา',
--    currentLanguage: 'ปัจจุบัน',
--    languageNameEn: 'อังกฤษ',
--    languageNameJa: 'ญี่ปุ่น',
--    languageNameFr: 'ฝรั่งเศส',
--    languageNameEs: 'สเปน',
--    languageNameDe: 'เยอรมัน',
--    languageNameIt: 'อิตาลี',
--    languageNamePt: 'โปรตุเกส',
--    languageNameRu: 'รัสเซีย',
--    languageNameZh: 'จีน',
--    languageNameKo: 'เกาหลี',
--    languageNameHi: 'ฮินดี',
--    languageNameId: 'อินโดนีเซีย',
--    languageNameTh: 'ไทย',
--    languageNameVi: 'เวียดนาม',
--    languageNameMs: 'มาเลย์',
--    languageNameTr: 'ตุรกี',
--    languageNameNl: 'ดัตช์',
--    languageNameSv: 'สวีเดน',
--    soundSwitchLabel: 'เปิดเสียง',
--    tapSoundLabel: 'สไตล์เสียงแตะ',
--    proOnlyTitle: 'สำหรับ Pro เท่านั้น',
--    proOnlyTheme: 'ธีมนี้ใช้ได้เฉพาะใน Pro',
--
--    cancel: 'ยกเลิก',
--    delete: 'ลบ',
--    deleteConfirmBody: 'แน่ใจหรือไม่ว่าต้องการลบ? การกระทำนี้ไม่สามารถย้อนกลับได้.',
--    comingSoonTitle: 'เร็ว ๆ นี้',
--    onboardingPunch: 'นี่คือ DotChain.',
--
--    paywallBestValueBadge: 'คุ้มที่สุด',
--    paywallMonthlyLabel: 'แพ็กเกจรายเดือน',
--    paywallMonthlySub: 'ตัดบิลทุกเดือน ยกเลิกได้ทุกเมื่อ.',
--    paywallYearlyLabel: 'แพ็กเกจรายปี',
--    paywallYearlySub: 'ตัดบิลปีละครั้ง ยกเลิกได้ทุกเมื่อ.',
--
--    priceFree: '$0 / ตลอดไป',
--    priceYearly: '$14.99 / ปี',
--
--    proCompareHeaderFeature: 'ฟีเจอร์',
--    proCompareHeaderFree: 'ฟรี',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      'คุณสามารถใช้แบบฟรีต่อไปได้เสมอ Pro แค่เอาข้อจำกัดออก.',
--    proCompareTitle: 'คุณจะได้อะไรจาก Pro',
--
--    proCtaMonthly: 'สมัคร Pro รายเดือน',
--    proCtaStayFree: 'ใช้แบบฟรีต่อไป',
--    proCtaYearly: 'สมัคร Pro รายปี',
--
--    proFeatureAdsFree: 'แบนเนอร์โฆษณาด้านล่าง',
--    proFeatureAdsPro: 'ไม่มีโฆษณา โฟกัสได้เต็มที่',
--    proFeatureHabits: 'จำนวนพฤติกรรมที่ติดตามได้',
--    proFeatureHabitsFree: 'นิสัยได้สูงสุด 3 รายการ',
--    proFeatureHabitsPro: 'นิสัยไม่จำกัด',
--    proFeatureThemesFree: '1 ธีม (ธีมมืด)',
--    proFeatureThemesPro: 'ปลดล็อกทุกธีม',
--
--    proFinePrint:
--      'การสมัครจะต่ออายุอัตโนมัติ คุณสามารถยกเลิกได้ตลอดเวลาในการตั้งค่าบัญชี App Store หรือ Google Play ของคุณ.',
--    proMonthlyTagline: 'เริ่มแบบเล็ก ๆ ยกเลิกเมื่อไหร่ก็ได้.',
--    proPlanFreeTitle: 'ฟรี',
--    proPlanMonthlyTitle: 'รายเดือน',
--    proPlanYearlyBadge: 'คุ้มที่สุด',
--    proPlanYearlyTitle: 'รายปี',
--    proSubtitle:
--      'ไปให้ไกลกว่า 3 นิสัย แล้วทำให้เชนของคุณหยุดไม่อยู่.',
--    proYearlySavingShort:
--      'ประหยัดประมาณ 37% (เหมือนได้ใช้ฟรี 8 เดือน).',
--    proYearlyTagline: 'สำหรับคนสร้างเชนตัวจริง.',
--
--    restoreSoon:
--      'ฟังก์ชันกู้คืนการซื้อจะถูกเพิ่มในอัปเดตถัดไป.',
--
--    themeCyberBlueLabel: 'Cyber Blue',
--    themeDarkLabel: 'ธีมมืด',
--    themeDesc:
--      'เลือกบรรยากาศที่คุณชอบ (ธีม Pro จะถูกเพิ่มในภายหลัง).',
--    themeNeonPinkLabel: 'Neon Pink',
--
--    tutorialEditIconBody:
--      'ก่อนอื่น เลือกไอคอนที่เข้ากับนิสัยของคุณ.',
--    tutorialEditNameBody:
--      `ถัดไป ตั้งชื่อนิสัยของคุณ
--ตัวอย่างเช่น "ดื่มน้ำ", "อ่านหนังสือ".`,
--    tutorialEditSubmitBody:
--      `พร้อมแล้ว!
--แตะปุ่มสร้างด้านล่างเพื่อเพิ่มนิสัยนี้ไปยังหน้าหลักของคุณ.`,
--    tutorialExplainChainBody:
--      `เมื่อแตะแล้ว จำนวนวันต่อเนื่องของคุณจะเพิ่มขึ้น และวันนี้จะติดสว่างบนเชนของคุณ
--ทำต่อไปเพื่อยืดเชนให้ยาวขึ้น.`,
--    tutorialGotIt: 'เข้าใจแล้ว',
--    tutorialNext: 'ถัดไป',
--    tutorialPressFabBody:
--      'แตะปุ่ม + ด้านล่างขวาเพื่อสร้างนิสัยแรกของคุณ.',
--    tutorialPressHabitBody:
--      `ตอนนี้ให้แตะนิสัยที่คุณเพิ่งสร้าง
--การแตะจะนับว่าวันนี้ "ทำแล้ว".`,
--    tutorialStart: 'เริ่มเลย',
--    tutorialWelcomeBody:
--      `ยินดีต้อนรับ!
--DotChain ช่วยให้คุณสร้างเชนนิสัยของตัวเองได้
--เริ่มจากการสร้างนิสัยแรกของคุณด้วยปุ่ม +.`,
-+  ...baseEn,
-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
-+  daysStreak: 'วันต่อเนื่อง',        // 英語: DAYS STREAK (連続日数)
-+  yourChain: 'เชนของคุณ',            // 英語: YOUR CHAIN (あなたのチェーン)
-+  allDoneDays: 'วันที่ทำครบ',        // 英語: ALL DONE DAYS (全て完了した日)
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: 'การตั้งค่า',            // 設定
-+  hapticOff: 'ปิดการสั่น',           // 振動オフ
-+  language: 'ภาษา',                  // 言語
-+  sound: 'เสียง',                    // 音
-+  haptics: 'การสั่น',                // 振動 (Haptics)
-+  theme: 'ธีม',                      // テーマ
-+
-+  // --- Purchase / Restore (購入 / 復元) ---
-+  restore: 'กู้คืนการซื้อ',          // 購入の復元
-+  purchaseSuccess: 'แพ็กเกจ Pro ใช้งานได้แล้ว', // 購入成功
-+  purchaseFailed: 'การสั่งซื้อล้มเหลว โปรดลองใหม่ภายหลัง', // 購入失敗
-+  restoreSuccess: 'กู้คืนประวัติการซื้อแล้ว', // 復元成功
-+  restoreNotFound: 'ไม่พบประวัติการซื้อ',    // 復元データなし
-+  restoreFailed: 'กู้คืนการซื้อไม่สำเร็จ',   // 復元失敗
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: 'เวอร์ชันแอป',            // アプリバージョン
-+  tapSound: 'เสียงกด',               // タップ音
-+  click: 'คลิก',                     // クリック
-+  pop: 'ป๊อป',                       // ポップ
-+  soundSwitchLabel: 'เอฟเฟกต์เสียง', // 効果音
-+
-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
-+  proTitle: 'ปลดล็อกเชนของคุณ',      // 英語: Unlock your chain.
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: 'ก้าวข้ามขีดจำกัด 3 นิสัย และทำให้จุดของคุณไม่หยุดนิ่ง',
-+  proPlanFreeTitle: 'ฟรี',           // 無料
-+  proPlanMonthlyTitle: 'รายเดือน',   // 月額
-+  proPlanYearlyTitle: 'รายปี',       // 年額
-+  proPlanYearlyBadge: 'คุ้มที่สุด',  // 英語: Best value (一番お得/価値がある)
-+  proBadgeShort: 'PRO',
-+  priceFree: '฿0 / ตลอดไป',          // ずっと0バーツ (または $0)
-+  proOnlyTitle: 'ฟีเจอร์ Pro',       // Pro機能
-+  proOnlyTheme: 'อัปเกรดเป็น Pro เพื่อใช้ธีมนี้',
-+  openPro: 'ดูแพ็กเกจ Pro',          // Proプランを見る
-+  cancel: 'ยกเลิก',                  // キャンセル
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: 'แอนิเมชันกระแสไฟ', // 電気の流れのアニメーション
-+  flowEffectHelp:
-+    'ให้แสงนีออนไหลผ่านเส้นเชนของคุณ ปิดได้หากต้องการหน้าจอที่นิ่งสงบ',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
-+  heatmapRangeTitle: 'ระยะเวลาแสดงผล',
-+  heatmapRangeHelp: 'เลือกจำนวนวันที่ต้องการแสดงเชนบนหน้าโฮม',
-+  heatmapRange7: '1 สัปดาห์',
-+  heatmapRange30: '1 เดือน',
-+  heatmapRange60: '2 เดือน',
-+  heatmapRange90: '3 เดือน',
-+  heatmapRange180: '6 เดือน',
-+  heatmapRange365: '1 ปี',
-+  heatmapSummaryPrefix: 'ย้อนหลัง ', // 「過去〜」
-+  heatmapSummarySuffix: ' วัน',      // 「〜日」
-+  heatmapAgoSuffix: ' วันที่แล้ว',   // 「〜日前」
-+  heatmapToday: 'วันนี้',
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: 'เปลี่ยนหน้าตาของแอป',
-+  themeDarkLabel: 'มืด',             // Dark
-+  themeNeonPinkLabel: 'นีออนชมพู',
-+  themeCyberBlueLabel: 'ไซเบอร์บลู',
-+  freeThemeNote: 'ฟรี: ใช้ได้เฉพาะธีมมืด / Pro: ปลดล็อกนีออนชมพูและไซเบอร์บลู',
-+  proThemeNote: 'ธีม Pro จะใช้ได้หลังจากสมัครสมาชิก',
-+
-+  // --- Habit Management (習慣管理) ---
-+  newHabitTitle: 'นิสัยใหม่',
-+  editHabitTitle: 'แก้ไขนิสัย',
-+  habitNameLabel: 'ชื่อ',
-+  habitNamePlaceholder: 'เช่น ดื่มน้ำ, อ่านหนังสือ',
-+  habitIconLabel: 'ไอคอน',
-+  deleteHabit: 'ลบนิสัยนี้',
-+  deleteConfirmationTitle: 'ยืนยันการลบ?',
-+  deleteConfirmationMessage: 'การกระทำนี้ไม่สามารถย้อนกลับได้ ประวัติทั้งหมดจะหายไป',
-+  save: 'บันทึก',
-+  create: 'สร้าง',
-+
-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
-+  iconCatBasic: 'พื้นฐาน',
-+  iconCatHealth: 'สุขภาพ',
-+  iconCatLearning: 'การเรียนรู้',
-+
-+  iconLabelStreak: 'ต่อเนื่อง',      // Streak
-+  iconLabelTask: 'งาน',              // Task
-+  iconLabelShine: 'สดใส',            // Shine
-+  iconLabelClean: 'ทำความสะอาด',     // Clean
-+  iconLabelLaundry: 'ซักผ้า',        // Laundry
-+  iconLabelWater: 'ดื่มน้ำ',         // Water
-+  iconLabelWalk: 'เดิน',             // Walk
-+  iconLabelSleep: 'นอนหลับ',         // Sleep
-+  iconLabelWorkout: 'ออกกำลังกาย',   // Workout
-+  iconLabelBarbell: 'ยกน้ำหนัก',     // Barbell
-+  iconLabelRead: 'อ่าน',             // Read
-+  iconLabelArt: 'ศิลปะ',             // Art
-+  iconLabelMedia: 'สื่อ',            // Media
-+  iconLabelStudy: 'เรียน',           // Study
-+  iconLabelLanguage: 'ภาษา',         // Language
-+
-+  // --- Misc / Errors (その他 / エラー) ---
-+  habitButtonSuffix: ' ปุ่มนิสัย',   // アクセシビリティ用
-+  errorLoadFailed: 'โหลดข้อมูลล้มเหลว',
-+  errorTitleRequired: 'กรุณาระบุชื่อ',
-+  errorTitleTooLong: 'ชื่อต้องไม่เกิน 20 ตัวอักษร',
-+  errorSaveFailed: 'บันทึกไม่สำเร็จ',
-+  errorDeleteFailed: 'ลบไม่สำเร็จ',
-+  errorToggleFailed: 'อัปเดตไม่สำเร็จ',
-+  habitLimitTitle: 'ขีดจำกัดแพ็กเกจฟรี',
-+  habitLimitBody: 'แพ็กเกจฟรีสร้างได้สูงสุด 3 นิสัย',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: 'ระบบสั่นตอบสนอง (Haptic)',
-+
-+  // --- Reminder (リマインダー) ---
-+  reminderSectionTitle: 'แจ้งเตือน',
-+  reminderToggleLabel: 'เปิดใช้แจ้งเตือน',
-+  reminderTimeLabel: 'เวลาแจ้งเตือน',
-+  reminderNotificationBody: 'ได้เวลาสร้างเชนของคุณแล้ว!', // チェーンを作る時間だよ！
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: 'ต่อเนื่อง 7 วัน!',
-+  streak7Message: 'คุณรักษาเชนได้ครบหนึ่งสัปดาห์แล้ว สุดยอดมาก!',
-+  ok: 'ยอดเยี่ยม',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: 'เปลี่ยนภาษา',
-+  currentLanguage: 'ปัจจุบัน',
-+  languageNameEn: 'อังกฤษ',
-+  languageNameJa: 'ญี่ปุ่น',
-+  languageNameFr: 'ฝรั่งเศส',
-+  languageNameEs: 'สเปน',
-+  languageNameDe: 'เยอรมัน',
-+  languageNameIt: 'อิตาลี',
-+  languageNamePt: 'โปรตุเกส',
-+  languageNameRu: 'รัสเซีย',
-+  languageNameZh: 'จีน',
-+  languageNameKo: 'เกาหลี',
-+  languageNameHi: 'ฮินดี',
-+  languageNameId: 'อินโดนีเซีย',
-+  languageNameTh: 'ไทย',
-+  languageNameVi: 'เวียดนาม',
-+  languageNameMs: 'มาเลย์',
-+  languageNameTr: 'ตุรกี',
-+  languageNameNl: 'ดัตช์',
-+  languageNameSv: 'สวีเดน',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: 'ถัดไป',
-+  tutorialWelcome: 'ยินดีต้อนรับสู่ DotChain',
-+  tutorialDesc1: 'เชื่อมต่อนิสัยประจำวันและสร้างเชนของคุณเอง',
-+  tutorialDesc2: 'อย่าให้เชนขาด เพื่อให้นิสัยคงอยู่ตลอดไป',
-+  tutorialStart: 'เริ่มต้น',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/tr.ts b/src/core/i18n/locales/tr.ts
-index ed22c65..8b1b398 100644
---- a/src/core/i18n/locales/tr.ts
-+++ b/src/core/i18n/locales/tr.ts
-@@ -1,182 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'GÜN SERİSİ',
--    yourChain: 'ZİNCİRİN',
--    allDoneDays: 'TAMAMEN YAPILAN GÜNLER',
--    settings: 'Ayarlar',
--    hapticOff: 'Titreşim kapalı',
--    language: 'Dil',
--    sound: 'Ses',
--    haptics: 'Titreşim',
--    theme: 'Tema',
--    restore: 'Satın alımı geri yükle',
--    version: 'Uygulama sürümü',
--    tapSound: 'Dokunma sesi',
--    click: 'Tık',
--    pop: 'Pop',
--    flowEffectTitle: 'Elektrik akışı animasyonu',
--    flowEffectHelp:
--      'Zincir çizgin boyunca neon bir akış dolaşır. Daha sakin bir görünüm istersen kapatabilirsin.',
--    heatmapRangeTitle: 'Zincir gösterim süresi',
--    heatmapRangeHelp: 'Ana ekrandaki ısı haritasında zincirin kaç günü gösterileceğini seç.',
--    heatmapRange7: '1 hafta',
--    heatmapRange30: '1 ay',
--    heatmapRange60: '2 ay',
--    heatmapRange180: '6 ay',
--    heatmapRange365: '1 yıl',
--    heatmapSummaryPrefix: 'Son ',
--    heatmapSummarySuffix: ' gün',
--    heatmapAgoSuffix: ' gün önce',
--    heatmapToday: 'Bugün',
--    freeThemeNote: 'Ücretsiz: yalnızca Dark / Pro Neon Pink, Cyber Blue açar',
--    proThemeNote: 'Pro temalar paywall sonrası.',
--    restoreDesc: 'Geri yükleme (yakında)',
--    licenses: 'OSS lisansları (yakında)',
--    openPro: "DotChain Pro`yu aç",
--    heroPaywall: `Neon dünyasına geç`,
--    priceMonthly: `$2.99 / ay`,
--    onboardingTitle: "DotChain`e hoş geldin",
--    onboardingBody: 'Tek dokunuş, güçlü titreşim. Bugünün zincirini kur.',
--    start: 'Başla',
--    paywallNote: 'Faturalama/reklam sonra.',
--    homeLoading: 'Yükleniyor...',
--    homeAddHabitLabel: 'Alışkanlık ekle',
--    editNewHabit: 'Yeni alışkanlık',
--    editHabitTitle: 'Alışkanlık düzenle',
--    editCategoryLabel: 'Kategori',
--    editNameLabel: 'Ad (en fazla 20 karakter)',
--    editNamePlaceholder: 'Alışkanlığına ad ver...',
--    editSaveChanges: 'Değişiklikleri kaydet',
--    editCreateHabit: 'Alışkanlık oluştur',
--    editDeleteHabit: 'Alışkanlığı sil',
--    proTitle: 'DotChain Pro',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'Sınırsız alışkanlık',
--    proFeatureThemes: 'Tüm temalar açık (Neon Pink / Cyber Blue)',
--        proFeatureAds: 'Reklamsız',
--    habitButtonSuffix: ' alışkanlık düğmesi',
--    iconCatBasic: 'Temel',
--    iconCatHealth: 'Sağlık',
--    iconCatLearning: 'Öğrenme ve İş',
--    errorLoadFailed: 'Veri yüklenemedi',
--    errorTitleRequired: 'Başlık gerekli.',
--    errorTitleTooLong: 'Başlık en fazla 20 karakter olmalı.',
--    errorSaveFailed: 'Kaydetme başarısız.',
--    errorDeleteFailed: 'Silme başarısız.',
--    errorToggleFailed: 'Güncelleme başarısız.',
--    habitLimitTitle: 'Ücretsiz plan sınırı',
--    habitLimitBody: 'Ücretsiz planda en fazla 3 alışkanlık oluşturabilirsiniz.',
--    hapticsDescription: 'Dokunsal geri bildirim',
--    reminderSectionTitle: 'Hatırlatma bildirimi',
--    reminderToggleLabel: 'Hatırlatıcıyı kullan',
--    reminderTimeLabel: 'Bildirim zamanı',
--    reminderNotificationBody: 'Zincirini ilerletme zamanı.',
--    streak7Title: '7 günlük seri!',
--    streak7Message: 'Bir hafta boyunca zincirini sürdürdün. Harika!',
--    ok: 'Tamam',
--    languageChange: 'Dili değiştir',
--    currentLanguage: 'Geçerli',
--    languageNameEn: 'İngilizce',
--    languageNameJa: 'Japonca',
--    languageNameFr: 'Fransızca',
--    languageNameEs: 'İspanyolca',
--    languageNameDe: 'Almanca',
--    languageNameIt: 'İtalyanca',
--    languageNamePt: 'Portekizce',
--    languageNameRu: 'Rusça',
--    languageNameZh: 'Çince',
--    languageNameKo: 'Korece',
--    languageNameHi: 'Hintçe',
--    languageNameId: 'Endonezce',
--    languageNameTh: 'Tayca',
--    languageNameVi: 'Vietnamca',
--    languageNameMs: 'Malayca',
--    languageNameTr: 'Türkçe',
--    languageNameNl: 'Flemenkçe',
--    languageNameSv: 'İsveççe',
--    soundSwitchLabel: 'Sesi aç',
--    tapSoundLabel: 'Dokunma sesi stili',
--    proOnlyTitle: 'Yalnızca Pro için',
--    proOnlyTheme: 'Bu tema Pro ile kullanılabilir.',
--
--    // Dialogs
--    cancel: 'İptal',
--    delete: 'Sil',
--    deleteConfirmBody: 'Emin misin? Bu işlem geri alınamaz.',
--
--    // Onboarding / punch
--    onboardingPunch: 'İşte DotChain.',
--
--    // Pricing / paywall labels
--    priceFree: '$0 / sonsuza kadar',
--    priceYearly: '$14.99 / yıl',
--    paywallMonthlyLabel: 'Aylık plan',
--    paywallMonthlySub: 'Her ay faturalandırılır. İstediğin zaman iptal edebilirsin.',
--    paywallYearlyLabel: 'Yıllık plan',
--    paywallYearlySub: 'Yılda bir kez faturalandırılır. İstediğin zaman iptal edebilirsin.',
--    paywallBestValueBadge: 'En avantajlı',
--    comingSoonTitle: 'Yakında geliyor',
--    restoreSoon:
--      'Satın alımları geri yükleme özelliği ilerideki bir güncellemede eklenecek.',
--
--    // Themes
--    themeDarkLabel: 'Dark',
--    themeNeonPinkLabel: 'Neon Pink',
--    themeCyberBlueLabel: 'Cyber Blue',
--    themeDesc: 'Sevdiğin havayı seç. (Pro temalar daha sonra eklenecek.)',
--
--    // Pro plan descriptions
--    proSubtitle:
--      '3 alışkanlık sınırını aş ve nokta zincirini durdurulamaz hale getir.',
--    proPlanFreeTitle: 'Ücretsiz',
--    proPlanMonthlyTitle: 'Aylık',
--    proPlanYearlyTitle: 'Yıllık',
--    proPlanYearlyBadge: 'En avantajlı',
--
--    proCompareTitle: 'Pro ile neler kazanırsın',
--    proCompareSubtitle:
--      'Her zaman Ücretsiz planda kalabilirsin. Pro sadece sınırları kaldırır.',
--    proCompareHeaderFeature: 'Özellik',
--    proCompareHeaderFree: 'Ücretsiz',
--    proCompareHeaderPro: 'Pro',
--
--    proFeatureHabits: 'Takip edebileceğin alışkanlık sayısı',
--    proFeatureHabitsFree: 'En fazla 3 alışkanlık',
--    proFeatureHabitsPro: 'Sınırsız alışkanlık',
--    proFeatureThemesFree: '1 tema (Dark)',
--    proFeatureThemesPro: 'Tüm temalar açılır',
--    proFeatureAdsFree: 'Alt kısımda banner reklam',
--    proFeatureAdsPro: 'Reklam yok, tam odak',
--
--    proMonthlyTagline: 'Küçük başla, istediğin zaman iptal et.',
--    proYearlyTagline: 'Zincirini ciddiye alanlar için.',
--    proYearlySavingShort: 'Yaklaşık %37 tasarruf (8 ay bedava gibi).',
--
--    proCtaMonthly: 'Aylık Pro al',
--    proCtaYearly: 'Yıllık Pro al',
--    proCtaStayFree: 'Ücretsiz planda kal',
--    proFinePrint:
--      'Abonelik otomatik olarak yenilenir. İstediğin zaman App Store veya Google Play hesap ayarlarından iptal edebilirsin.',
--
--    // Tutorial
--    tutorialWelcomeBody:
--      'Hoş geldin!\nDotChain, alışkanlık zincirini kurmana yardım eder.\nİlk alışkanlığını + düğmesinden oluşturarak başla.',
--    tutorialPressFabBody:
--      'Sağ alttaki + düğmesine dokunarak ilk alışkanlığını oluştur.',
--    tutorialPressHabitBody:
--      'Şimdi az önce oluşturduğun alışkanlığa dokun.\nHer dokunuş bugün için "yapıldı" olarak işaretler.',
--    tutorialExplainChainBody:
--      'Her dokunduğunda GÜN SERİSİN artar ve bugün ZİNCİRİN üzerinde yanar.\nZincirini uzatmak için devam et.',
--    tutorialEditIconBody: 'Önce, alışkanlığına uyan bir ikon seç.',
--    tutorialEditNameBody:
--      'Sonra, alışkanlığına bir ad yaz.\nÖrneğin: "Su iç", "Kitap oku".',
--    tutorialEditSubmitBody:
--      'Hazırsın!\nBu alışkanlığı ana ekrana eklemek için aşağıdaki oluştur düğmesine dokun.',
--    tutorialNext: 'İleri',
--    tutorialStart: 'Başla',
--    tutorialGotIt: 'Anladım',
-+  ...baseEn,
-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
-+  daysStreak: 'GÜN SERİSİ',         // 英語: DAYS STREAK (連続日数)
-+  yourChain: 'ZİNCİRİN',             // 英語: YOUR CHAIN (あなたのチェーン)
-+  allDoneDays: 'TAMAMLANAN GÜNLER',  // 英語: ALL DONE DAYS (全て完了した日)
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: 'Ayarlar',               // 設定
-+  hapticOff: 'Titreşim kapalı',      // 振動オフ
-+  language: 'Dil',                   // 言語
-+  sound: 'Ses',                      // 音
-+  haptics: 'Titreşim',               // 振動 (Haptics)
-+  theme: 'Tema',                     // テーマ
-+
-+  // --- Purchase / Restore (購入 / 復元) ---
-+  restore: 'Satın Alımları Yükle',   // 購入の復元 (少し短縮してボタンに収める)
-+  purchaseSuccess: 'Pro plan artık aktif.', // 購入成功
-+  purchaseFailed: 'Satın alma başarısız. Lütfen sonra tekrar dene.', // 購入失敗
-+  restoreSuccess: 'Satın alma geçmişi yüklendi.', // 復元成功
-+  restoreNotFound: 'Geri yüklenecek satın alma bulunamadı.', // 復元データなし
-+  restoreFailed: 'Satın alımlar yüklenemedi.', // 復元失敗
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: 'Uygulama Sürümü',        // アプリバージョン
-+  tapSound: 'Dokunma sesi',          // タップ音
-+  click: 'Tık',                      // クリック
-+  pop: 'Pop',                        // ポップ
-+  soundSwitchLabel: 'Ses Efektleri', // 効果音
-+
-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
-+  proTitle: 'Zincirinin kilidini aç.', // 英語: Unlock your chain.
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: '3 alışkanlığın ötesine geç ve noktalarını durdurulamaz yap.',
-+  proPlanFreeTitle: 'Ücretsiz',      // 無料
-+  proPlanMonthlyTitle: 'Aylık',      // 月額
-+  proPlanYearlyTitle: 'Yıllık',      // 年額
-+  proPlanYearlyBadge: 'En Avantajlı', // 英語: Best value (一番お得)
-+  proBadgeShort: 'PRO',
-+  priceFree: '₺0 / sonsuza kadar',   // ずっと0リラ (または $0)
-+  proOnlyTitle: 'Pro Özellik',       // Pro機能
-+  proOnlyTheme: 'Bu temayı kullanmak için Pro\'ya geç.',
-+  openPro: 'Pro Planı Gör',          // Proプランを見る
-+  cancel: 'İptal',                   // キャンセル
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: 'Elektrik Akışı Animasyonu', // 電気の流れのアニメーション
-+  flowEffectHelp:
-+    'Zincir hattın boyunca neon bir akışın gezinmesine izin ver. Daha sakin bir görünüm istersen kapat.',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
-+  heatmapRangeTitle: 'Görüntüleme Aralığı',
-+  heatmapRangeHelp: 'Ana ekrandaki ısı haritasında zincirinin kaç gününün gösterileceğini seç.',
-+  heatmapRange7: '1 hafta',
-+  heatmapRange30: '1 ay',
-+  heatmapRange60: '2 ay',
-+  heatmapRange90: '3 ay',
-+  heatmapRange180: '6 ay',
-+  heatmapRange365: '1 yıl',
-+  heatmapSummaryPrefix: 'Son ',      // 「Son (最後の/過去の)」
-+  heatmapSummarySuffix: ' gün',      // 「gün (日)」
-+  heatmapAgoSuffix: ' gün önce',     // 「gün önce (日前)」
-+  heatmapToday: 'Bugün',
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: 'Uygulama görünümünü değiştir.',
-+  themeDarkLabel: 'Koyu',            // Dark
-+  themeNeonPinkLabel: 'Neon Pembe',
-+  themeCyberBlueLabel: 'Siber Mavi',
-+  freeThemeNote: 'Ücretsiz: Sadece Koyu / Pro: Neon Pembe ve Siber Mavi\'yi açar',
-+  proThemeNote: 'Pro temalar yakında gelecek.',
-+
-+  // --- Habit Management (習慣管理) ---
-+  newHabitTitle: 'Yeni Alışkanlık',
-+  editHabitTitle: 'Alışkanlığı Düzenle',
-+  habitNameLabel: 'İsim',
-+  habitNamePlaceholder: 'ör: Su iç, Kitap oku',
-+  habitIconLabel: 'Simge',
-+  deleteHabit: 'Bu alışkanlığı sil',
-+  deleteConfirmationTitle: 'Silinsin mi?',
-+  deleteConfirmationMessage: 'Bu işlem geri alınamaz. Tüm geçmiş kaybolacak.',
-+  save: 'Kaydet',
-+  create: 'Oluştur',
-+
-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
-+  iconCatBasic: 'Temel',
-+  iconCatHealth: 'Sağlık',
-+  iconCatLearning: 'Öğrenme',
-+
-+  iconLabelStreak: 'Seri',           // Streak
-+  iconLabelTask: 'Görev',            // Task
-+  iconLabelShine: 'Parıltı',         // Shine
-+  iconLabelClean: 'Temizlik',        // Clean
-+  iconLabelLaundry: 'Çamaşır',       // Laundry
-+  iconLabelWater: 'Su',              // Water
-+  iconLabelWalk: 'Yürüyüş',          // Walk
-+  iconLabelSleep: 'Uyku',            // Sleep
-+  iconLabelWorkout: 'Antrenman',     // Workout
-+  iconLabelBarbell: 'Halter',        // Barbell
-+  iconLabelRead: 'Okuma',            // Read
-+  iconLabelArt: 'Sanat',             // Art
-+  iconLabelMedia: 'Medya',           // Media
-+  iconLabelStudy: 'Ders',            // Study
-+  iconLabelLanguage: 'Dil',          // Language
-+
-+  // --- Misc / Errors (その他 / エラー) ---
-+  habitButtonSuffix: ' alışkanlık düğmesi', // アクセシビリティ用
-+  errorLoadFailed: 'Veri yüklenemedi.',
-+  errorTitleRequired: 'İsim gerekli.',
-+  errorTitleTooLong: 'İsim 20 karakterden kısa olmalı.',
-+  errorSaveFailed: 'Kaydedilemedi.',
-+  errorDeleteFailed: 'Silinemedi.',
-+  errorToggleFailed: 'Güncellenemedi.',
-+  habitLimitTitle: 'Ücretsiz plan limiti',
-+  habitLimitBody: 'Ücretsiz planda en fazla 3 alışkanlık oluşturabilirsin.',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: 'Dokunsal geri bildirim (titreşim)',
-+
-+  // --- Reminder (リマインダー) ---
-+  reminderSectionTitle: 'Hatırlatıcı',
-+  reminderToggleLabel: 'Hatırlatıcı kullan',
-+  reminderTimeLabel: 'Bildirim zamanı',
-+  reminderNotificationBody: 'Zincirini kurma zamanı!', // チェーンを作る時間だよ！
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: '7 günlük seri!',
-+  streak7Message: 'Zincirini tam bir hafta korudun. Harika iş!',
-+  ok: 'Süper',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: 'Dili değiştir',
-+  currentLanguage: 'Mevcut',
-+  languageNameEn: 'İngilizce',
-+  languageNameJa: 'Japonca',
-+  languageNameFr: 'Fransızca',
-+  languageNameEs: 'İspanyolca',
-+  languageNameDe: 'Almanca',
-+  languageNameIt: 'İtalyanca',
-+  languageNamePt: 'Portekizce',
-+  languageNameRu: 'Rusça',
-+  languageNameZh: 'Çince',
-+  languageNameKo: 'Korece',
-+  languageNameHi: 'Hintçe',
-+  languageNameId: 'Endonezce',
-+  languageNameTh: 'Tayca',
-+  languageNameVi: 'Vietnamca',
-+  languageNameMs: 'Malayca',
-+  languageNameTr: 'Türkçe',
-+  languageNameNl: 'Felemenkçe',
-+  languageNameSv: 'İsveççe',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: 'İleri',
-+  tutorialWelcome: 'DotChain\'e Hoş Geldin',
-+  tutorialDesc1: 'Günlük alışkanlıklarını birleştir ve kendi zincirini kur.',
-+  tutorialDesc2: 'Alışkanlığın kalıcı olması için zinciri kırma.',
-+  tutorialStart: 'Başla',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/vi.ts b/src/core/i18n/locales/vi.ts
-index beefe83..b43f68a 100644
---- a/src/core/i18n/locales/vi.ts
-+++ b/src/core/i18n/locales/vi.ts
-@@ -1,185 +1,163 @@
- import baseEn from './en';
- 
- const dict = {
--    ...baseEn,
--    daysStreak: 'SỐ NGÀY LIÊN TIẾP',
--    yourChain: 'CHUỖI CỦA BẠN',
--    allDoneDays: 'SỐ NGÀY HOÀN THÀNH TẤT CẢ',
--    settings: 'Cài đặt',
--    hapticOff: 'Tắt rung',
--    language: 'Ngôn ngữ',
--    sound: 'Âm thanh',
--    haptics: 'Rung',
--    theme: 'Chủ đề',
--    restore: 'Khôi phục mua hàng',
--    version: 'Phiên bản ứng dụng',
--    tapSound: 'Âm thanh khi chạm',
--    click: 'Click',
--    pop: 'Pop',
--    flowEffectTitle: 'Hiệu ứng dòng điện',
--    flowEffectHelp:
--      'Cho dòng điện neon chạy dọc chuỗi của bạn. Tắt đi nếu bạn muốn giao diện yên tĩnh hơn.',
--    heatmapRangeTitle: 'Khoảng thời gian hiển thị chuỗi',
--    heatmapRangeHelp:
--      'Chọn số ngày chuỗi hiển thị trên bản đồ nhiệt màn hình chính.',
--    heatmapRange7: '1 tuần',
--    heatmapRange30: '1 tháng',
--    heatmapRange60: '2 tháng',
--    heatmapRange180: '6 tháng',
--    heatmapRange365: '1 năm',
--    heatmapSummaryPrefix: '',
--    heatmapSummarySuffix: ' ngày qua',
--    heatmapAgoSuffix: ' ngày trước',
--    heatmapToday: 'Hôm nay',
--    freeThemeNote: 'Miễn phí: chỉ Dark / Pro mở khóa Neon Pink & Cyber Blue',
--    proThemeNote: 'Chủ đề Pro sẽ được mở khóa sau khi thanh toán.',
--    restoreDesc: 'Khôi phục mua hàng (sắp tới)',
--    licenses: 'Giấy phép mã nguồn mở (sắp tới)',
--    openPro: 'Mở DotChain Pro',
--    heroPaywall: 'Nâng cấp vào thế giới neon',
--    priceMonthly: '$1.99 / tháng',
--    onboardingTitle: 'Chào mừng đến DotChain',
--    onboardingBody: 'Một chạm, rung mạnh. Xây chuỗi hôm nay.',
--    start: 'Bắt đầu',
--    paywallNote: 'Tính năng thanh toán và quảng cáo sẽ được thêm sau.',
--    homeLoading: 'Đang tải...',
--    homeAddHabitLabel: 'Thêm thói quen',
--    editNewHabit: 'Thói quen mới',
--    editHabitTitle: 'Chỉnh sửa thói quen',
--    editCategoryLabel: 'Danh mục',
--    editNameLabel: 'Tên (tối đa 20 ký tự)',
--    editNamePlaceholder: 'Đặt tên cho thói quen...',
--    editSaveChanges: 'Lưu thay đổi',
--    editCreateHabit: 'Tạo thói quen',
--    editDeleteHabit: 'Xóa thói quen',
--    proTitle: 'Mở khóa chuỗi của bạn.',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: 'Thói quen không giới hạn',
--    proFeatureThemes: 'Tất cả chủ đề mở (Neon Pink / Cyber Blue)',
--    proFeatureAds: 'Không quảng cáo',
--    habitButtonSuffix: ' nút thói quen',
--    iconCatBasic: 'Cơ bản',
--    iconCatHealth: 'Sức khỏe',
--    iconCatLearning: 'Học tập & Công việc',
--    errorLoadFailed: 'Không tải được dữ liệu',
--    errorTitleRequired: 'Tiêu đề là bắt buộc.',
--    errorTitleTooLong: 'Tiêu đề phải 20 ký tự trở xuống.',
--    errorSaveFailed: 'Lưu thất bại.',
--    errorDeleteFailed: 'Xóa thất bại.',
--    errorToggleFailed: 'Cập nhật thất bại.',
--    habitLimitTitle: 'Giới hạn gói miễn phí',
--    habitLimitBody: 'Trong gói miễn phí bạn có thể tạo tối đa 3 thói quen.',
--    hapticsDescription: 'Phản hồi rung',
--    reminderSectionTitle: 'Thông báo nhắc nhở',
--    reminderToggleLabel: 'Dùng nhắc nhở',
--    reminderTimeLabel: 'Thời gian thông báo',
--    reminderNotificationBody: 'Đã đến lúc nối tiếp chuỗi của bạn.',
--    streak7Title: 'Chuỗi 7 ngày!',
--    streak7Message: 'Bạn giữ được chuỗi một tuần liền. Tuyệt vời!',
--    ok: 'OK',
--    languageChange: 'Đổi ngôn ngữ',
--    currentLanguage: 'Hiện tại',
--    languageNameEn: 'Tiếng Anh',
--    languageNameJa: 'Tiếng Nhật',
--    languageNameFr: 'Tiếng Pháp',
--    languageNameEs: 'Tiếng Tây Ban Nha',
--    languageNameDe: 'Tiếng Đức',
--    languageNameIt: 'Tiếng Ý',
--    languageNamePt: 'Tiếng Bồ Đào Nha',
--    languageNameRu: 'Tiếng Nga',
--    languageNameZh: 'Tiếng Trung',
--    languageNameKo: 'Tiếng Hàn',
--    languageNameHi: 'Tiếng Hindi',
--    languageNameId: 'Tiếng Indonesia',
--    languageNameTh: 'Tiếng Thái',
--    languageNameVi: 'Tiếng Việt',
--    languageNameMs: 'Tiếng Mã Lai',
--    languageNameTr: 'Tiếng Thổ Nhĩ Kỳ',
--    languageNameNl: 'Tiếng Hà Lan',
--    languageNameSv: 'Tiếng Thụy Điển',
--    soundSwitchLabel: 'Bật âm thanh',
--    tapSoundLabel: 'Kiểu âm thanh khi chạm',
--    proOnlyTitle: 'Chỉ dành cho Pro',
--    proOnlyTheme: 'Chủ đề này chỉ dành cho Pro.',
--
--    cancel: 'Hủy',
--    delete: 'Xóa',
--    deleteConfirmBody: 'Bạn có chắc không? Hành động này không thể hoàn tác.',
--    comingSoonTitle: 'Sắp ra mắt',
--    onboardingPunch: 'Đây chính là DotChain.',
--
--    paywallBestValueBadge: 'Tiết kiệm nhất',
--    paywallMonthlyLabel: 'Gói theo tháng',
--    paywallMonthlySub: 'Thanh toán mỗi tháng. Có thể hủy bất cứ lúc nào.',
--    paywallYearlyLabel: 'Gói theo năm',
--    paywallYearlySub: 'Thanh toán mỗi năm một lần. Có thể hủy bất cứ lúc nào.',
--
--    priceFree: '$0 / dùng mãi mãi',
--    priceYearly: '$14.99 / năm',
--
--    proCompareHeaderFeature: 'Mục',
--    proCompareHeaderFree: 'Miễn phí',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      'Bạn luôn có thể dùng gói Miễn phí. Pro chỉ đơn giản là gỡ bỏ mọi giới hạn.',
--    proCompareTitle: 'Bạn nhận được gì với Pro',
--
--    proCtaMonthly: 'Dùng Pro theo tháng',
--    proCtaStayFree: 'Tiếp tục dùng gói Miễn phí',
--    proCtaYearly: 'Dùng Pro theo năm',
--
--    proFeatureAdsFree: 'Có banner quảng cáo ở dưới cùng',
--    proFeatureAdsPro: 'Không quảng cáo, tập trung tối đa',
--    proFeatureHabits: 'Số thói quen có thể theo dõi',
--    proFeatureHabitsFree: 'Tối đa 3 thói quen',
--    proFeatureHabitsPro: 'Thói quen không giới hạn',
--    proFeatureThemesFree: '1 chủ đề (Dark)',
--    proFeatureThemesPro: 'Mở khóa tất cả chủ đề',
--
--    proFinePrint:
--      'Gói đăng ký tự động gia hạn. Bạn có thể hủy bất cứ lúc nào trong phần cài đặt tài khoản App Store hoặc Google Play.',
--    proMonthlyTagline: 'Bắt đầu nhỏ, có thể hủy bất cứ lúc nào.',
--    proPlanFreeTitle: 'Miễn phí',
--    proPlanMonthlyTitle: 'Theo tháng',
--    proPlanYearlyBadge: 'Tiết kiệm nhất',
--    proPlanYearlyTitle: 'Theo năm',
--    proSubtitle:
--      'Vượt qua giới hạn 3 thói quen và khiến chuỗi chấm của bạn không thể bị ngăn lại.',
--    proYearlySavingShort: 'Tiết kiệm khoảng 37% (tương đương 8 tháng miễn phí).',
--    proYearlyTagline:
--      'Dành cho những người thật sự nghiêm túc với chuỗi thói quen.',
--
--    restoreSoon:
--      'Tính năng khôi phục mua hàng sẽ được thêm trong bản cập nhật sau.',
--
--    themeCyberBlueLabel: 'Cyber Blue',
--    themeDarkLabel: 'Dark',
--    themeDesc: 'Chọn phong cách bạn thích. (Chủ đề Pro sẽ được thêm sau.)',
--    themeNeonPinkLabel: 'Neon Pink',
--
--    tutorialEditIconBody:
--      'Trước tiên, hãy chọn một biểu tượng phù hợp với thói quen của bạn.',
--    tutorialEditNameBody:
--      `Tiếp theo, hãy nhập tên cho thói quen.
--Ví dụ: "Uống nước", "Đọc sách".`,
--    tutorialEditSubmitBody:
--      `Bạn đã sẵn sàng!
--Nhấn nút tạo bên dưới để thêm thói quen này vào màn hình chính.`,
--    tutorialExplainChainBody:
--      `Mỗi lần chạm, SỐ NGÀY LIÊN TIẾP của bạn tăng lên và hôm nay được thắp sáng trên CHUỖI CỦA BẠN.
--Hãy tiếp tục để kéo dài chuỗi hơn nữa.`,
--    tutorialGotIt: 'Hiểu rồi',
--    tutorialNext: 'Tiếp theo',
--    tutorialPressFabBody:
--      'Nhấn nút + ở góc dưới bên phải để tạo thói quen đầu tiên.',
--    tutorialPressHabitBody:
--      `Bây giờ hãy nhấn vào thói quen bạn vừa tạo.
--Mỗi lần nhấn sẽ đánh dấu hôm nay là "đã xong".`,
--    tutorialStart: 'Bắt đầu',
--    tutorialWelcomeBody:
--      `Chào mừng!
--DotChain giúp bạn xây dựng chuỗi thói quen.
--Bắt đầu bằng cách tạo thói quen đầu tiên từ nút +.`,
-+  ...baseEn,
-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
-+  daysStreak: 'CHUỖI NGÀY',          // 英語: DAYS STREAK (連続日数 - 短くインパクトのある表現)
-+  yourChain: 'CHUỖI CỦA BẠN',        // 英語: YOUR CHAIN
-+  allDoneDays: 'NGÀY HOÀN TẤT',      // 英語: ALL DONE DAYS (全て完了した日)
-+
-+  // --- Settings (General) (設定：一般) ---
-+  settings: 'Cài đặt',               // 設定
-+  hapticOff: 'Tắt rung',             // 振動オフ
-+  language: 'Ngôn ngữ',              // 言語
-+  sound: 'Âm thanh',                 // 音
-+  haptics: 'Rung',                   // 振動 (Haptics - 一般的に「Rung」)
-+  theme: 'Giao diện',                // テーマ (Chủ đềとも言うがGiao diệnはUI全体を指す)
-+
-+  // --- Purchase / Restore (購入 / 復元) ---
-+  restore: 'Khôi phục mua hàng',     // 購入の復元
-+  purchaseSuccess: 'Gói Pro đã được kích hoạt.', // 購入成功
-+  purchaseFailed: 'Giao dịch thất bại. Vui lòng thử lại sau.', // 購入失敗
-+  restoreSuccess: 'Đã khôi phục lịch sử mua hàng.', // 復元成功
-+  restoreNotFound: 'Không tìm thấy đơn hàng để khôi phục.', // 復元データなし
-+  restoreFailed: 'Khôi phục thất bại.', // 復元失敗
-+
-+  // --- Settings (Sound & Info) (設定：音と情報) ---
-+  version: 'Phiên bản ứng dụng',     // アプリバージョン
-+  tapSound: 'Âm thanh chạm',         // タップ音
-+  click: 'Click',                    // クリック (英語のままで通じやすい)
-+  pop: 'Pop',                        // ポップ
-+  soundSwitchLabel: 'Hiệu ứng âm thanh', // 効果音
-+
-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
-+  proTitle: 'Mở khóa chuỗi của bạn.', // 英語: Unlock your chain.
-+  proHeaderTitle: 'DotChain Pro',
-+  proSubtitle: 'Vượt qua giới hạn 3 thói quen và khiến các điểm của bạn không thể dừng lại.',
-+  proPlanFreeTitle: 'Miễn phí',      // 無料
-+  proPlanMonthlyTitle: 'Hàng tháng', // 月額
-+  proPlanYearlyTitle: 'Hàng năm',    // 年額
-+  proPlanYearlyBadge: 'Tốt nhất',    // 英語: Best value (一番お得/ベスト)
-+  proBadgeShort: 'PRO',
-+  priceFree: '0đ / vĩnh viễn',       // ずっと0ドン (または $0)
-+  proOnlyTitle: 'Tính năng Pro',     // Pro機能
-+  proOnlyTheme: 'Nâng cấp lên Pro để dùng giao diện này.',
-+  openPro: 'Xem gói Pro',            // Proプランを見る
-+  cancel: 'Hủy',                     // キャンセル
-+
-+  // --- Settings (Appearance) (設定：見た目) ---
-+  flowEffectTitle: 'Hiệu ứng dòng điện', // 電気の流れのアニメーション
-+  flowEffectHelp:
-+    'Cho dòng điện neon chạy dọc chuỗi của bạn. Tắt đi nếu bạn muốn giao diện tĩnh lặng hơn.',
-+
-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
-+  heatmapRangeTitle: 'Khoảng thời gian hiển thị',
-+  heatmapRangeHelp: 'Chọn số ngày của chuỗi sẽ hiển thị trên bản đồ nhiệt ở màn hình chính.',
-+  heatmapRange7: '1 tuần',
-+  heatmapRange30: '1 tháng',
-+  heatmapRange60: '2 tháng',
-+  heatmapRange90: '3 tháng',
-+  heatmapRange180: '6 tháng',
-+  heatmapRange365: '1 năm',
-+  heatmapSummaryPrefix: '',          // 空文字 (ベトナム語は数字の後ろに言葉が来る)
-+  heatmapSummarySuffix: ' ngày qua', // 「〜 ngày qua (過去〜日間)」
-+  heatmapAgoSuffix: ' ngày trước',   // 「〜日前」
-+  heatmapToday: 'Hôm nay',
-+
-+  // --- Themes (テーマ) ---
-+  themeDesc: 'Thay đổi giao diện ứng dụng.',
-+  themeDarkLabel: 'Tối',             // Dark
-+  themeNeonPinkLabel: 'Neon Hồng',
-+  themeCyberBlueLabel: 'Cyber Xanh',
-+  freeThemeNote: 'Miễn phí: Chỉ Giao diện Tối / Pro mở khóa Neon Hồng & Cyber Xanh',
-+  proThemeNote: 'Giao diện Pro sẽ mở sau khi đăng ký.',
-+
-+  // --- Habit Management (習慣管理) ---
-+  newHabitTitle: 'Thói quen mới',
-+  editHabitTitle: 'Sửa thói quen',
-+  habitNameLabel: 'Tên',
-+  habitNamePlaceholder: 'VD: Uống nước, Đọc sách',
-+  habitIconLabel: 'Biểu tượng',
-+  deleteHabit: 'Xóa thói quen này',
-+  deleteConfirmationTitle: 'Xóa thói quen?',
-+  deleteConfirmationMessage: 'Hành động này không thể hoàn tác. Mọi lịch sử sẽ bị mất.',
-+  save: 'Lưu',
-+  create: 'Tạo',
-+
-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
-+  iconCatBasic: 'Cơ bản',
-+  iconCatHealth: 'Sức khỏe',
-+  iconCatLearning: 'Học tập',
-+
-+  iconLabelStreak: 'Chuỗi',          // Streak
-+  iconLabelTask: 'Tác vụ',           // Task
-+  iconLabelShine: 'Tỏa sáng',        // Shine
-+  iconLabelClean: 'Dọn dẹp',         // Clean
-+  iconLabelLaundry: 'Giặt ủi',       // Laundry
-+  iconLabelWater: 'Nước',            // Water
-+  iconLabelWalk: 'Đi bộ',            // Walk
-+  iconLabelSleep: 'Giấc ngủ',        // Sleep
-+  iconLabelWorkout: 'Tập luyện',     // Workout
-+  iconLabelBarbell: 'Tạ',            // Barbell
-+  iconLabelRead: 'Đọc',              // Read
-+  iconLabelArt: 'Nghệ thuật',        // Art
-+  iconLabelMedia: 'Giải trí',        // Media
-+  iconLabelStudy: 'Học',             // Study
-+  iconLabelLanguage: 'Ngôn ngữ',     // Language
-+
-+  // --- Misc / Errors (その他 / エラー) ---
-+  habitButtonSuffix: ' nút thói quen', // アクセシビリティ用
-+  errorLoadFailed: 'Tải dữ liệu thất bại.',
-+  errorTitleRequired: 'Vui lòng nhập tên.',
-+  errorTitleTooLong: 'Tên không được quá 20 ký tự.',
-+  errorSaveFailed: 'Lưu thất bại.',
-+  errorDeleteFailed: 'Xóa thất bại.',
-+  errorToggleFailed: 'Cập nhật thất bại.',
-+  habitLimitTitle: 'Giới hạn gói miễn phí',
-+  habitLimitBody: 'Ở gói miễn phí, bạn chỉ có thể tạo tối đa 3 thói quen.',
-+
-+  // --- Settings description (設定の説明) ---
-+  hapticsDescription: 'Phản hồi rung',
-+
-+  // --- Reminder (リマインダー) ---
-+  reminderSectionTitle: 'Nhắc nhở',
-+  reminderToggleLabel: 'Bật nhắc nhở',
-+  reminderTimeLabel: 'Thời gian thông báo',
-+  reminderNotificationBody: 'Đã đến lúc nối dài chuỗi của bạn!', // チェーンを作る時間だよ！
-+
-+  // --- Review (7-day streak) (レビュー依頼) ---
-+  streak7Title: 'Chuỗi 7 ngày!',
-+  streak7Message: 'Bạn đã giữ chuỗi liên tục trong một tuần. Làm tốt lắm!',
-+  ok: 'Tuyệt vời',
-+
-+  // --- Language labels (言語名) ---
-+  languageChange: 'Đổi ngôn ngữ',
-+  currentLanguage: 'Hiện tại',
-+  languageNameEn: 'Tiếng Anh',
-+  languageNameJa: 'Tiếng Nhật',
-+  languageNameFr: 'Tiếng Pháp',
-+  languageNameEs: 'Tiếng Tây Ban Nha',
-+  languageNameDe: 'Tiếng Đức',
-+  languageNameIt: 'Tiếng Ý',
-+  languageNamePt: 'Tiếng Bồ Đào Nha',
-+  languageNameRu: 'Tiếng Nga',
-+  languageNameZh: 'Tiếng Trung',
-+  languageNameKo: 'Tiếng Hàn',
-+  languageNameHi: 'Tiếng Hindi',
-+  languageNameId: 'Tiếng Indo',
-+  languageNameTh: 'Tiếng Thái',
-+  languageNameVi: 'Tiếng Việt',
-+  languageNameMs: 'Tiếng Malay',
-+  languageNameTr: 'Tiếng Thổ Nhĩ Kỳ',
-+  languageNameNl: 'Tiếng Hà Lan',
-+  languageNameSv: 'Tiếng Thụy Điển',
-+
-+  // --- Tutorial (チュートリアル) ---
-+  tutorialNext: 'Tiếp theo',
-+  tutorialWelcome: 'Chào mừng đến với DotChain',
-+  tutorialDesc1: 'Kết nối các thói quen hàng ngày và xây dựng chuỗi của riêng bạn.',
-+  tutorialDesc2: 'Đừng để đứt chuỗi để duy trì thói quen.',
-+  tutorialStart: 'Bắt đầu',
- };
- 
--export default dict;
-+export default dict;
-\ No newline at end of file
-diff --git a/src/core/i18n/locales/zh.ts b/src/core/i18n/locales/zh.ts
-deleted file mode 100644
-index 8a6cf0a..0000000
---- a/src/core/i18n/locales/zh.ts
-+++ /dev/null
-@@ -1,174 +0,0 @@
--import baseEn from './en';
--
--const dict = {
--    ...baseEn,
--    daysStreak: '连续天数',
--    yourChain: '你的链条',
--    allDoneDays: '全部完成的天数',
--    settings: '设置',
--    hapticOff: '振动已关',
--    language: '语言',
--    sound: '声音',
--    haptics: '振动',
--    theme: '主题',
--    restore: '恢复购买',
--    version: '应用版本',
--    tapSound: '点击声音',
--    click: '点击',
--    pop: '砰',
--    flowEffectTitle: '电流动画',
--    flowEffectHelp: '让霓虹电流沿链条流动。如需更安静的效果，可关闭此动画。',
--    heatmapRangeTitle: '链条显示范围',
--    heatmapRangeHelp: '选择在主页热力图中显示多少天的链条。',
--    heatmapRange7: '1周',
--    heatmapRange30: '1 个月',
--    heatmapRange60: '2 个月',
--    heatmapRange180: '6 个月',
--    heatmapRange365: '1 年',
--    heatmapSummaryPrefix: '过去',
--    heatmapSummarySuffix: ' 天',
--    heatmapAgoSuffix: ' 天前',
--    heatmapToday: '今天',
--    freeThemeNote: '免费：仅 Dark / Pro 解锁霓虹粉和赛博蓝',
--    proThemeNote: '专业版付费后可使用 Pro 主题。',
--    restoreDesc: '恢复购买（稍后）',
--    licenses: '开源许可证（稍后）',
--    openPro: '打开 DotChain Pro',
--    heroPaywall: '升级到霓虹世界',
--    priceMonthly: '$1.99 / 月',
--    onboardingTitle: '欢迎使用 DotChain',
--    onboardingBody: '一触即振，构建今天的链条。',
--    start: '开始',
--    paywallNote: '计费和广告将稍后添加。',
--    homeLoading: '加载中...',
--    homeAddHabitLabel: '添加习惯',
--    editNewHabit: '新增习惯',
--    editHabitTitle: '编辑习惯',
--    editCategoryLabel: '分类',
--    editNameLabel: '名称（最多20字符）',
--    editNamePlaceholder: '为习惯命名...',
--    editSaveChanges: '保存更改',
--    editCreateHabit: '创建习惯',
--    editDeleteHabit: '删除习惯',
--    proTitle: '解锁你的链条。',
--    proHeaderTitle: 'DotChain Pro',
--    proFeatureUnlimited: '无限习惯',
--    proFeatureThemes: '解锁所有主题（Neon Pink / Cyber Blue）',
--    proFeatureAds: '无广告',
--    habitButtonSuffix: ' 习惯按钮',
--    iconCatBasic: '基础',
--    iconCatHealth: '健康',
--    iconCatLearning: '学习与工作',
--    errorLoadFailed: '数据加载失败',
--    errorTitleRequired: '标题为必填项。',
--    errorTitleTooLong: '标题长度需不超过20个字符。',
--    errorSaveFailed: '保存失败。',
--    errorDeleteFailed: '删除失败。',
--    errorToggleFailed: '更新失败。',
--    habitLimitTitle: '免费版限制',
--    habitLimitBody: '免费版最多可创建3个习惯。',
--    hapticsDescription: '触觉反馈',
--    reminderSectionTitle: '提醒通知',
--    reminderToggleLabel: '启用提醒',
--    reminderTimeLabel: '通知时间',
--    reminderNotificationBody: '是时候继续你的链条了。',
--    streak7Title: '连续7天！',
--    streak7Message: '你已经连续一周保持链条，干得好！',
--    ok: 'OK',
--    languageChange: '更改语言',
--    currentLanguage: '当前',
--    languageNameEn: '英语',
--    languageNameJa: '日语',
--    languageNameFr: '法语',
--    languageNameEs: '西班牙语',
--    languageNameDe: '德语',
--    languageNameIt: '意大利语',
--    languageNamePt: '葡萄牙语',
--    languageNameRu: '俄语',
--    languageNameZh: '中文',
--    languageNameKo: '韩语',
--    languageNameHi: '印地语',
--    languageNameId: '印尼语',
--    languageNameTh: '泰语',
--    languageNameVi: '越南语',
--    languageNameMs: '马来语',
--    languageNameTr: '土耳其语',
--    languageNameNl: '荷兰语',
--    languageNameSv: '瑞典语',
--    soundSwitchLabel: '启用声音',
--    tapSoundLabel: '点击音样式',
--    proOnlyTitle: '仅限 Pro 功能',
--    proOnlyTheme: '此主题仅在 Pro 中可用。',
--
--    // 填充缺失键，完成 zh 本地化
--    cancel: '取消',
--    delete: '删除',
--    deleteConfirmBody: '确定要删除吗？此操作无法撤销。',
--    comingSoonTitle: '即将上线',
--    onboardingPunch: '这就是 DotChain。',
--
--    paywallBestValueBadge: '最优惠',
--    paywallMonthlyLabel: '月度计划',
--    paywallMonthlySub: '每月扣费，可随时取消。',
--    paywallYearlyLabel: '年度计划',
--    paywallYearlySub: '每年扣费一次，可随时取消。',
--
--    priceFree: '$0 / 永久',
--    priceYearly: '$14.99 / 年',
--
--    proCompareHeaderFeature: '功能',
--    proCompareHeaderFree: '免费',
--    proCompareHeaderPro: 'Pro',
--    proCompareSubtitle:
--      '你随时可以继续使用免费版，Pro 只是帮你解除限制。',
--    proCompareTitle: '升级 Pro 你能获得什么',
--
--    proCtaMonthly: '开通月度 Pro',
--    proCtaStayFree: '继续使用免费版',
--    proCtaYearly: '开通年度 Pro',
--
--    proFeatureAdsFree: '底部显示横幅广告',
--    proFeatureAdsPro: '无广告，专注体验',
--    proFeatureHabits: '可跟踪的习惯数量',
--    proFeatureHabitsFree: '最多 3 个习惯',
--    proFeatureHabitsPro: '习惯数量不限',
--    proFeatureThemesFree: '1 个主题（暗色）',
--    proFeatureThemesPro: '解锁所有主题',
--
--    proFinePrint:
--      '订阅会自动续费。你可以随时在 App Store 或 Google Play 的账户设置中取消。',
--    proMonthlyTagline: '从小开始，随时可取消。',
--    proPlanFreeTitle: '免费版',
--    proPlanMonthlyTitle: '月度计划',
--    proPlanYearlyBadge: '最划算',
--    proPlanYearlyTitle: '年度计划',
--    proSubtitle: '突破 3 个习惯的限制，让你的链条停不下来。',
--    proYearlySavingShort: '大约节省 37%（相当于 8 个月免费）。',
--    proYearlyTagline: '为认真打造链条的人准备。',
--
--    restoreSoon: '恢复购买功能将在后续更新中提供。',
--
--    themeCyberBlueLabel: '赛博蓝',
--    themeDarkLabel: '暗色',
--    themeDesc: '选择你喜欢的界面风格。（Pro 主题稍后提供。）',
--    themeNeonPinkLabel: '霓虹粉',
--
--    tutorialEditIconBody: '首先，选择一个与习惯相符的图标。',
--    tutorialEditNameBody:
--      '然后给这个习惯起个名字。\n例如：“喝水”、“读书”。',
--    tutorialEditSubmitBody:
--      '准备就绪！\n点击下面的创建按钮，将此习惯添加到首页。',
--    tutorialExplainChainBody:
--      '每点一次，连续天数增加，今天会在你的链条上点亮。\n坚持下去，链条会越来越长。',
--    tutorialGotIt: '明白了',
--    tutorialNext: '下一步',
--    tutorialPressFabBody:
--      '点击右下角的 + 按钮，创建第一个习惯。',
--    tutorialPressHabitBody:
--      '现在点一下刚创建的习惯。\n点击即表示今天已完成。',
--    tutorialStart: '开始',
--    tutorialWelcomeBody:
--      '欢迎！\nDotChain 帮助你构建习惯链。\n先用 + 按钮创建第一个习惯吧。',
--};
--
--export default dict;
diff --git "a/20251227_2240_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251227_2240_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
deleted file mode 100644
index c596f6d..0000000
--- "a/20251227_2240_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+++ /dev/null
@@ -1,511 +0,0 @@
-diff --git a/app/settings/index.tsx b/app/settings/index.tsx
-index aca7fad..be5bfd5 100644
---- a/app/settings/index.tsx
-+++ b/app/settings/index.tsx
-@@ -36,7 +36,26 @@ export default function SettingsScreen() {
-   const [langOpen, setLangOpen] = React.useState(false);
- 
-   const heatmapOptions: HeatmapDaysOption[] = [7, 30, 60, 180, 365];
--  const languageOptions: Lang[] = ['en','ja','fr','es','de','it','pt','ru','zh','ko','hi','id','th','vi','ms','tr','nl','sv'];
-+  const languageOptions: Lang[] = [
-+    'en',
-+    'ja',
-+    'fr',
-+    'es',
-+    'de',
-+    'it',
-+    'pt',
-+    'ru',
-+    'zhHans',
-+    'zhHant',
-+    'ko',
-+    'hi',
-+    'id',
-+    'th',
-+    'vi',
-+    'tr',
-+    'nl',
-+    'sv',
-+  ];
-   const LANGUAGE_META: Record<Lang, { flag: string; labelKey: TranslationKey }> = {
-     en: { flag: '🇺🇸', labelKey: 'languageNameEn' },
-     ja: { flag: '🇯🇵', labelKey: 'languageNameJa' },
-@@ -46,13 +65,13 @@ export default function SettingsScreen() {
-     it: { flag: '🇮🇹', labelKey: 'languageNameIt' },
-     pt: { flag: '🇵🇹', labelKey: 'languageNamePt' },
-     ru: { flag: '🇷🇺', labelKey: 'languageNameRu' },
--    zh: { flag: '🇨🇳', labelKey: 'languageNameZh' },
-+    zhHans: { flag: '🇨🇳', labelKey: 'languageNameZhHans' },
-+    zhHant: { flag: '🇹🇼', labelKey: 'languageNameZhHant' },
-     ko: { flag: '🇰🇷', labelKey: 'languageNameKo' },
-     hi: { flag: '🇮🇳', labelKey: 'languageNameHi' },
-     id: { flag: '🇮🇩', labelKey: 'languageNameId' },
-     th: { flag: '🇹🇭', labelKey: 'languageNameTh' },
-     vi: { flag: '🇻🇳', labelKey: 'languageNameVi' },
--    ms: { flag: '🇲🇾', labelKey: 'languageNameMs' },
-     tr: { flag: '🇹🇷', labelKey: 'languageNameTr' },
-     nl: { flag: '🇳🇱', labelKey: 'languageNameNl' },
-     sv: { flag: '🇸🇪', labelKey: 'languageNameSv' },
-diff --git a/src/core/i18n/i18n.ts b/src/core/i18n/i18n.ts
-index 183e793..649b464 100644
---- a/src/core/i18n/i18n.ts
-+++ b/src/core/i18n/i18n.ts
-@@ -11,13 +11,13 @@ import de from './locales/de';
- import it from './locales/it';
- import pt from './locales/pt';
- import ru from './locales/ru';
--import zh from './locales/zh';
-+import zhHans from './locales/zhHans';
-+import zhHant from './locales/zhHant';
- import ko from './locales/ko';
- import hi from './locales/hi';
- import id from './locales/id';
- import th from './locales/th';
- import vi from './locales/vi';
--import ms from './locales/ms';
- import tr from './locales/tr';
- import nl from './locales/nl';
- import sv from './locales/sv';
-@@ -31,13 +31,13 @@ const dictionaries = {
-   it,
-   pt,
-   ru,
--  zh,
-+  zhHans,
-+  zhHant,
-   ko,
-   hi,
-   id,
-   th,
-   vi,
--  ms,
-   tr,
-   nl,
-   sv,
-@@ -50,13 +50,43 @@ const isSupportedLang = (code?: string): code is Lang => {
-   return code in dictionaries;
- };
- 
-+const normalizeLang = (
-+  rawCode?: string,
-+  tag?: string,
-+  script?: string | null,
-+  region?: string | null,
-+): Lang => {
-+  if (rawCode && isSupportedLang(rawCode)) return rawCode;
-+
-+  const code = rawCode?.toLowerCase();
-+  const tagLower = tag?.toLowerCase();
-+  const regionUpper = region?.toUpperCase();
-+
-+  if (code === 'zh' || tagLower?.startsWith('zh')) {
-+    const isHant =
-+      tagLower?.includes('hant') ||
-+      script === 'Hant' ||
-+      (regionUpper != null && ['TW', 'HK', 'MO'].includes(regionUpper));
-+    return isHant ? 'zhHant' : 'zhHans';
-+  }
-+
-+  if (code === 'ms') return 'zhHans';
-+
-+  if (code && isSupportedLang(code)) return code;
-+
-+  return 'en';
-+};
-+
- const detectInitialLang = (): Lang => {
-   try {
-     const locales = Localization.getLocales();
-     const primary = locales?.[0];
--    const code = primary?.languageCode?.toLowerCase();
--    if (isSupportedLang(code)) return code;
--    return 'en';
-+    return normalizeLang(
-+      primary?.languageCode,
-+      primary?.languageTag,
-+      primary?.languageScriptCode,
-+      primary?.regionCode,
-+    );
-   } catch {
-     return 'en';
-   }
-@@ -71,11 +101,18 @@ const useI18nStore = create<I18nState>()(
-   persist(
-     (set) => ({
-       lang: detectInitialLang(),
--      setLang: (lang) => set({ lang: isSupportedLang(lang) ? lang : 'en' }),
-+      setLang: (lang) => set({ lang: normalizeLang(lang) }),
-     }),
-     {
-       name: 'dotchain-i18n',
-       storage: createJSONStorage(() => AsyncStorage),
-+      onRehydrateStorage: () => (state) => {
-+        if (!state) return;
-+        const normalized = normalizeLang(state.lang);
-+        if (state.lang !== normalized) {
-+          state.setLang(normalized);
-+        }
-+      },
-     },
-   ),
- );
-diff --git a/src/core/i18n/locales/de.ts b/src/core/i18n/locales/de.ts
-index b78fbee..21e9601 100644
---- a/src/core/i18n/locales/de.ts
-+++ b/src/core/i18n/locales/de.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'Italienisch',
-   languageNamePt: 'Portugiesisch',
-   languageNameRu: 'Russisch',
--  languageNameZh: 'Chinesisch',
-+  languageNameZhHans: 'Chinesisch (简体)',
-+  languageNameZhHant: 'Chinesisch (繁體)',
-   languageNameKo: 'Koreanisch',
-   languageNameHi: 'Hindi',
-   languageNameId: 'Indonesisch',
-   languageNameTh: 'Thailändisch',
-   languageNameVi: 'Vietnamesisch',
--  languageNameMs: 'Malaiisch',
-   languageNameTr: 'Türkisch',
-   languageNameNl: 'Niederländisch',
-   languageNameSv: 'Schwedisch',
-diff --git a/src/core/i18n/locales/en.ts b/src/core/i18n/locales/en.ts
-index b3d3247..5b423ff 100644
---- a/src/core/i18n/locales/en.ts
-+++ b/src/core/i18n/locales/en.ts
-@@ -138,13 +138,13 @@ const baseEn = {
-   languageNameIt: 'Italian',
-   languageNamePt: 'Portuguese',
-   languageNameRu: 'Russian',
--  languageNameZh: 'Chinese',
-+  languageNameZhHans: 'Chinese (Simplified)',
-+  languageNameZhHant: 'Chinese (Traditional)',
-   languageNameKo: 'Korean',
-   languageNameHi: 'Hindi',
-   languageNameId: 'Indonesian',
-   languageNameTh: 'Thai',
-   languageNameVi: 'Vietnamese',
--  languageNameMs: 'Malay',
-   languageNameTr: 'Turkish',
-   languageNameNl: 'Dutch',
-   languageNameSv: 'Swedish',
-diff --git a/src/core/i18n/locales/es.ts b/src/core/i18n/locales/es.ts
-index 26b4bfd..68d08cc 100644
---- a/src/core/i18n/locales/es.ts
-+++ b/src/core/i18n/locales/es.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'Italiano',
-   languageNamePt: 'Portugués',
-   languageNameRu: 'Ruso',
--  languageNameZh: 'Chino',
-+  languageNameZhHans: 'Chino (简体)',
-+  languageNameZhHant: 'Chino (繁體)',
-   languageNameKo: 'Coreano',
-   languageNameHi: 'Hindi',
-   languageNameId: 'Indonesio',
-   languageNameTh: 'Tailandés',
-   languageNameVi: 'Vietnamita',
--  languageNameMs: 'Malayo',
-   languageNameTr: 'Turco',
-   languageNameNl: 'Holandés',
-   languageNameSv: 'Sueco',
-diff --git a/src/core/i18n/locales/fr.ts b/src/core/i18n/locales/fr.ts
-index a267c06..3062768 100644
---- a/src/core/i18n/locales/fr.ts
-+++ b/src/core/i18n/locales/fr.ts
-@@ -205,13 +205,13 @@ const dict = {
-   languageNameIt: 'Italien',
-   languageNamePt: 'Portugais',
-   languageNameRu: 'Russe',
--  languageNameZh: 'Chinois',
-+  languageNameZhHans: 'Chinois (简体)',
-+  languageNameZhHant: 'Chinois (繁體)',
-   languageNameKo: 'Coréen',
-   languageNameHi: 'Hindi',
-   languageNameId: 'Indonésien',
-   languageNameTh: 'Thaï',
-   languageNameVi: 'Vietnamien',
--  languageNameMs: 'Malais',
-   languageNameTr: 'Turc',
-   languageNameNl: 'Néerlandais',
-   languageNameSv: 'Suédois',
-diff --git a/src/core/i18n/locales/hi.ts b/src/core/i18n/locales/hi.ts
-index b8ae366..accdbde 100644
---- a/src/core/i18n/locales/hi.ts
-+++ b/src/core/i18n/locales/hi.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'इतालवी',
-   languageNamePt: 'पुर्तगाली',
-   languageNameRu: 'रूसी',
--  languageNameZh: 'चीनी',
-+  languageNameZhHans: 'चीनी (简体)',
-+  languageNameZhHant: 'चीनी (繁體)',
-   languageNameKo: 'कोरियाई',
-   languageNameHi: 'हिन्दी',
-   languageNameId: 'इंडोनेशियाई',
-   languageNameTh: 'थाई',
-   languageNameVi: 'वियतनामी',
--  languageNameMs: 'मलय',
-   languageNameTr: 'तुर्की',
-   languageNameNl: 'डच',
-   languageNameSv: 'स्वीडिश',
-diff --git a/src/core/i18n/locales/id.ts b/src/core/i18n/locales/id.ts
-index 42297b9..f1e6363 100644
---- a/src/core/i18n/locales/id.ts
-+++ b/src/core/i18n/locales/id.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'Italia',
-   languageNamePt: 'Portugis',
-   languageNameRu: 'Rusia',
--  languageNameZh: 'Mandarin',
-+  languageNameZhHans: 'Mandarin (简体)',
-+  languageNameZhHant: 'Mandarin (繁體)',
-   languageNameKo: 'Korea',
-   languageNameHi: 'Hindi',
-   languageNameId: 'Indonesia',
-   languageNameTh: 'Thailand',
-   languageNameVi: 'Vietnam',
--  languageNameMs: 'Melayu',
-   languageNameTr: 'Turki',
-   languageNameNl: 'Belanda',
-   languageNameSv: 'Swedia',
-diff --git a/src/core/i18n/locales/it.ts b/src/core/i18n/locales/it.ts
-index 669ed43..ccff58f 100644
---- a/src/core/i18n/locales/it.ts
-+++ b/src/core/i18n/locales/it.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'Italiano',
-   languageNamePt: 'Portoghese',
-   languageNameRu: 'Russo',
--  languageNameZh: 'Cinese',
-+  languageNameZhHans: 'Cinese (简体)',
-+  languageNameZhHant: 'Cinese (繁體)',
-   languageNameKo: 'Coreano',
-   languageNameHi: 'Hindi',
-   languageNameId: 'Indonesiano',
-   languageNameTh: 'Tailandese',
-   languageNameVi: 'Vietnamita',
--  languageNameMs: 'Malese',
-   languageNameTr: 'Turco',
-   languageNameNl: 'Olandese',
-   languageNameSv: 'Svedese',
-diff --git a/src/core/i18n/locales/ja.ts b/src/core/i18n/locales/ja.ts
-index 3ddc11a..1633f9f 100644
---- a/src/core/i18n/locales/ja.ts
-+++ b/src/core/i18n/locales/ja.ts
-@@ -165,13 +165,13 @@ const dict = {
-     languageNameIt: 'イタリア語',
-     languageNamePt: 'ポルトガル語',
-     languageNameRu: 'ロシア語',
--    languageNameZh: '中国語',
-+    languageNameZhHans: '中国語（簡体）',
-+    languageNameZhHant: '中国語（繁体）',
-     languageNameKo: '韓国語',
-     languageNameHi: 'ヒンディー語',
-     languageNameId: 'インドネシア語',
-     languageNameTh: 'タイ語',
-     languageNameVi: 'ベトナム語',
--    languageNameMs: 'マレー語',
-     languageNameTr: 'トルコ語',
-     languageNameNl: 'オランダ語',
-     languageNameSv: 'スウェーデン語',
-diff --git a/src/core/i18n/locales/ko.ts b/src/core/i18n/locales/ko.ts
-index 6df0d32..5c51e1c 100644
---- a/src/core/i18n/locales/ko.ts
-+++ b/src/core/i18n/locales/ko.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: '이탈리아어',
-   languageNamePt: '포르투갈어',
-   languageNameRu: '러시아어',
--  languageNameZh: '중국어',
-+  languageNameZhHans: '중국어 (简体)',
-+  languageNameZhHant: '중국어 (繁體)',
-   languageNameKo: '한국어',
-   languageNameHi: '힌디어',
-   languageNameId: '인도네시아어',
-   languageNameTh: '태국어',
-   languageNameVi: '베트남어',
--  languageNameMs: '말레이어',
-   languageNameTr: '튀르키예어',
-   languageNameNl: '네덜란드어',
-   languageNameSv: '스웨덴어',
-diff --git a/src/core/i18n/locales/nl.ts b/src/core/i18n/locales/nl.ts
-index 8898d80..f16b43e 100644
---- a/src/core/i18n/locales/nl.ts
-+++ b/src/core/i18n/locales/nl.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'Italiaans',
-   languageNamePt: 'Portugees',
-   languageNameRu: 'Russisch',
--  languageNameZh: 'Chinees',
-+  languageNameZhHans: 'Chinees (简体)',
-+  languageNameZhHant: 'Chinees (繁體)',
-   languageNameKo: 'Koreaans',
-   languageNameHi: 'Hindi',
-   languageNameId: 'Indonesisch',
-   languageNameTh: 'Thais',
-   languageNameVi: 'Vietnamees',
--  languageNameMs: 'Maleis',
-   languageNameTr: 'Turks',
-   languageNameNl: 'Nederlands',
-   languageNameSv: 'Zweeds',
-diff --git a/src/core/i18n/locales/pt.ts b/src/core/i18n/locales/pt.ts
-index b883613..61821ce 100644
---- a/src/core/i18n/locales/pt.ts
-+++ b/src/core/i18n/locales/pt.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'Italiano',
-   languageNamePt: 'Português',
-   languageNameRu: 'Russo',
--  languageNameZh: 'Chinês',
-+  languageNameZhHans: 'Chinês (简体)',
-+  languageNameZhHant: 'Chinês (繁體)',
-   languageNameKo: 'Coreano',
-   languageNameHi: 'Hindi',
-   languageNameId: 'Indonésio',
-   languageNameTh: 'Tailandês',
-   languageNameVi: 'Vietnamita',
--  languageNameMs: 'Malaio',
-   languageNameTr: 'Turco',
-   languageNameNl: 'Holandês',
-   languageNameSv: 'Sueco',
-diff --git a/src/core/i18n/locales/ru.ts b/src/core/i18n/locales/ru.ts
-index 082ec39..86db500 100644
---- a/src/core/i18n/locales/ru.ts
-+++ b/src/core/i18n/locales/ru.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'Итальянский',
-   languageNamePt: 'Португальский',
-   languageNameRu: 'Русский',
--  languageNameZh: 'Китайский',
-+  languageNameZhHans: 'Китайский (简体)',
-+  languageNameZhHant: 'Китайский (繁體)',
-   languageNameKo: 'Корейский',
-   languageNameHi: 'Хинди',
-   languageNameId: 'Индонезийский',
-   languageNameTh: 'Тайский',
-   languageNameVi: 'Вьетнамский',
--  languageNameMs: 'Малайский',
-   languageNameTr: 'Турецкий',
-   languageNameNl: 'Нидерландский',
-   languageNameSv: 'Шведский',
-diff --git a/src/core/i18n/locales/sv.ts b/src/core/i18n/locales/sv.ts
-index ca7e019..cdcb01c 100644
---- a/src/core/i18n/locales/sv.ts
-+++ b/src/core/i18n/locales/sv.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'Italienska',
-   languageNamePt: 'Portugisiska',
-   languageNameRu: 'Ryska',
--  languageNameZh: 'Kinesiska',
-+  languageNameZhHans: 'Kinesiska (简体)',
-+  languageNameZhHant: 'Kinesiska (繁體)',
-   languageNameKo: 'Koreanska',
-   languageNameHi: 'Hindi',
-   languageNameId: 'Indonesiska',
-   languageNameTh: 'Thailändska',
-   languageNameVi: 'Vietnamesiska',
--  languageNameMs: 'Malaysiska',
-   languageNameTr: 'Turkiska',
-   languageNameNl: 'Holländska',
-   languageNameSv: 'Svenska',
-diff --git a/src/core/i18n/locales/th.ts b/src/core/i18n/locales/th.ts
-index 7ac7b49..7857a4c 100644
---- a/src/core/i18n/locales/th.ts
-+++ b/src/core/i18n/locales/th.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'อิตาลี',
-   languageNamePt: 'โปรตุเกส',
-   languageNameRu: 'รัสเซีย',
--  languageNameZh: 'จีน',
-+  languageNameZhHans: 'จีน (简体)',
-+  languageNameZhHant: 'จีน (繁體)',
-   languageNameKo: 'เกาหลี',
-   languageNameHi: 'ฮินดี',
-   languageNameId: 'อินโดนีเซีย',
-   languageNameTh: 'ไทย',
-   languageNameVi: 'เวียดนาม',
--  languageNameMs: 'มาเลย์',
-   languageNameTr: 'ตุรกี',
-   languageNameNl: 'ดัตช์',
-   languageNameSv: 'สวีเดน',
-diff --git a/src/core/i18n/locales/tr.ts b/src/core/i18n/locales/tr.ts
-index 8b1b398..1be3f18 100644
---- a/src/core/i18n/locales/tr.ts
-+++ b/src/core/i18n/locales/tr.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'İtalyanca',
-   languageNamePt: 'Portekizce',
-   languageNameRu: 'Rusça',
--  languageNameZh: 'Çince',
-+  languageNameZhHans: 'Çince (简体)',
-+  languageNameZhHant: 'Çince (繁體)',
-   languageNameKo: 'Korece',
-   languageNameHi: 'Hintçe',
-   languageNameId: 'Endonezce',
-   languageNameTh: 'Tayca',
-   languageNameVi: 'Vietnamca',
--  languageNameMs: 'Malayca',
-   languageNameTr: 'Türkçe',
-   languageNameNl: 'Felemenkçe',
-   languageNameSv: 'İsveççe',
-diff --git a/src/core/i18n/locales/vi.ts b/src/core/i18n/locales/vi.ts
-index b43f68a..dc9d399 100644
---- a/src/core/i18n/locales/vi.ts
-+++ b/src/core/i18n/locales/vi.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: 'Tiếng Ý',
-   languageNamePt: 'Tiếng Bồ Đào Nha',
-   languageNameRu: 'Tiếng Nga',
--  languageNameZh: 'Tiếng Trung',
-+  languageNameZhHans: 'Tiếng Trung (简体)',
-+  languageNameZhHant: 'Tiếng Trung (繁體)',
-   languageNameKo: 'Tiếng Hàn',
-   languageNameHi: 'Tiếng Hindi',
-   languageNameId: 'Tiếng Indo',
-   languageNameTh: 'Tiếng Thái',
-   languageNameVi: 'Tiếng Việt',
--  languageNameMs: 'Tiếng Malay',
-   languageNameTr: 'Tiếng Thổ Nhĩ Kỳ',
-   languageNameNl: 'Tiếng Hà Lan',
-   languageNameSv: 'Tiếng Thụy Điển',
-diff --git a/src/core/i18n/locales/zhHans.ts b/src/core/i18n/locales/zhHans.ts
-index bb8a045..f9aab50 100644
---- a/src/core/i18n/locales/zhHans.ts
-+++ b/src/core/i18n/locales/zhHans.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: '意大利语',
-   languageNamePt: '葡萄牙语',
-   languageNameRu: '俄语',
--  languageNameZh: '中文 (简体)',
-+  languageNameZhHans: '简体中文',
-+  languageNameZhHant: '繁體中文',
-   languageNameKo: '韩语',
-   languageNameHi: '印地语',
-   languageNameId: '印尼语',
-   languageNameTh: '泰语',
-   languageNameVi: '越南语',
--  languageNameMs: '马来语',
-   languageNameTr: '土耳其语',
-   languageNameNl: '荷兰语',
-   languageNameSv: '瑞典语',
-diff --git a/src/core/i18n/locales/zhHant.ts b/src/core/i18n/locales/zhHant.ts
-index 19ceaef..ffa785e 100644
---- a/src/core/i18n/locales/zhHant.ts
-+++ b/src/core/i18n/locales/zhHant.ts
-@@ -141,13 +141,13 @@ const dict = {
-   languageNameIt: '義大利語',
-   languageNamePt: '葡萄牙語',
-   languageNameRu: '俄語',
--  languageNameZh: '中文 (繁體)',
-+  languageNameZhHans: '簡體中文',
-+  languageNameZhHant: '繁體中文',
-   languageNameKo: '韓語',
-   languageNameHi: '印地語',
-   languageNameId: '印尼語',
-   languageNameTh: '泰語',
-   languageNameVi: '越南語',
--  languageNameMs: '馬來語',
-   languageNameTr: '土耳其語',
-   languageNameNl: '荷蘭語',
-   languageNameSv: '瑞典語',
diff --git "a/20251230_1820_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251230_1820_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
new file mode 100644
index 0000000..c0d626a
--- /dev/null
+++ "b/20251230_1820_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
@@ -0,0 +1,8075 @@
+diff --git "a/20251222_2318_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251222_2318_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+deleted file mode 100644
+index 5a20c7e..0000000
+--- "a/20251222_2318_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
++++ /dev/null
+@@ -1,1984 +0,0 @@
+-diff --git "a/20251221_1106_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251221_1106_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-deleted file mode 100644
+-index 5b3d4db..0000000
+---- "a/20251221_1106_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-+++ /dev/null
+-@@ -1,204 +0,0 @@
+--diff --git a/app/habit/edit.tsx b/app/habit/edit.tsx
+--index 994da7a..9fb36b0 100644
+----- a/app/habit/edit.tsx
+--+++ b/app/habit/edit.tsx
+--@@ -179,7 +179,7 @@ export default function EditScreen() {
+--           allowPassthrough
+--           backdropOpacity={0}
+--           verticalAlign="bottom"
+---          cardOffsetY={-24}
+--+          cardOffsetY={250}
+--         />
+--       )}
+-- 
+--@@ -191,7 +191,7 @@ export default function EditScreen() {
+--           allowPassthrough
+--           backdropOpacity={0}
+--           verticalAlign="center"
+---          cardOffsetY={48}
+--+          cardOffsetY={250}
+--         />
+--       )}
+-- 
+--@@ -203,7 +203,7 @@ export default function EditScreen() {
+--           allowPassthrough
+--           backdropOpacity={0}
+--           verticalAlign="bottom"
+---          cardOffsetY={-24}
+--+          cardOffsetY={-124}
+--         />
+--       )}
+--     </ScrollView>
+--diff --git a/app/pro/index.tsx b/app/pro/index.tsx
+--index 51df945..1eaa4f4 100644
+----- a/app/pro/index.tsx
+--+++ b/app/pro/index.tsx
+--@@ -3,15 +3,14 @@ import { LinearGradient } from 'expo-linear-gradient';
+-- import { Ionicons } from '@expo/vector-icons';
+-- import { ScrollView, Stack, Text, YStack, XStack, Button, useTheme } from 'tamagui';
+-- 
+---import { t } from '@/src/core/i18n/i18n';
+---
+---type TKey = Parameters<typeof t>[0];
+--+import { useTranslation, type TranslationKey as TKey } from '@/src/core/i18n/i18n';
+-- 
+-- type PlanType = 'monthly' | 'yearly';
+-- 
+-- function PlanPriceCard({ type, onPress }: { type: PlanType; onPress: () => void }) {
+--   const theme = useTheme();
+--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
+--+  const { t } = useTranslation();
+--   const titleKey: TKey = type === 'monthly' ? 'proPlanMonthlyTitle' : 'proPlanYearlyTitle';
+--   const priceKey: TKey = type === 'monthly' ? 'priceMonthly' : 'priceYearly';
+--   const taglineKey: TKey = type === 'monthly' ? 'proMonthlyTagline' : 'proYearlyTagline';
+--@@ -63,6 +62,7 @@ function PlanPriceCard({ type, onPress }: { type: PlanType; onPress: () => void
+-- }
+-- 
+-- function CompareRow({ featureKey, freeKey, proKey }: { featureKey: TKey; freeKey: TKey; proKey: TKey }) {
+--+  const { t } = useTranslation();
+--   return (
+--     <XStack paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
+--       <YStack flex={1.2}>
+--@@ -88,6 +88,7 @@ export default function PaywallScreen() {
+--   const theme = useTheme();
+--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
+--   const bg = theme?.background?.val?.toString() ?? '#000';
+--+  const { t } = useTranslation();
+-- 
+--   const handlePlan = () => {
+--     Alert.alert(t('comingSoonTitle') ?? 'Coming soon', t('paywallNote'));
+--diff --git a/app/settings/index.tsx b/app/settings/index.tsx
+--index 9dbac7d..c59d55a 100644
+----- a/app/settings/index.tsx
+--+++ b/app/settings/index.tsx
+--@@ -6,7 +6,7 @@ import { Check } from '@tamagui/lucide-icons';
+-- import { setLang as setLangGlobal } from '@/src/core/i18n/i18n';
+-- import DateTimePicker from '@react-native-community/datetimepicker';
+-- import { useSettingsStore, type HeatmapDaysOption } from '@/src/stores/settingsStore';
+---import { t, useTranslation, type Lang, type TranslationKey } from '@/src/core/i18n/i18n';
+--+import { useTranslation, type Lang, type TranslationKey } from '@/src/core/i18n/i18n';
+-- 
+-- export default function SettingsScreen() {
+--   const sound = useSettingsStore((s) => s.sound);
+--@@ -25,7 +25,7 @@ export default function SettingsScreen() {
+--   const reminderTime = useSettingsStore((s) => s.reminderTime);
+--   const setReminderEnabled = useSettingsStore((s) => s.setReminderEnabled);
+--   const setReminderTime = useSettingsStore((s) => s.setReminderTime);
+---  const { lang, setLang: setLangStore } = useTranslation();
+--+  const { t, lang, setLang: setLangStore } = useTranslation();
+--   const theme = useTheme();
+--   const isPro = useSettingsStore((s) => s.isPro ?? false);
+--   const [langOpen, setLangOpen] = React.useState(false);
+--diff --git a/src/features/habit/HabitButton.tsx b/src/features/habit/HabitButton.tsx
+--index c519546..29657a0 100644
+----- a/src/features/habit/HabitButton.tsx
+--+++ b/src/features/habit/HabitButton.tsx
+--@@ -2,7 +2,7 @@ import { Text, YStack, useTheme } from 'tamagui';
+-- import { Ionicons } from '@expo/vector-icons';
+-- import { Pressable, Animated, Easing } from 'react-native';
+-- import { useEffect, useRef, type ComponentProps } from 'react';
+---import { t } from '@/src/core/i18n/i18n';
+--+import { useTranslation } from '@/src/core/i18n/i18n';
+-- 
+-- type IconName = ComponentProps<typeof Ionicons>['name'];
+-- 
+--@@ -23,6 +23,7 @@ type Props = {
+-- export function HabitButton({ label, size, active, iconName = 'checkbox', onPress, onLongPress }: Props) {
+--   const height = size === 'big' ? 160 : 110;
+--   const theme = useTheme();
+--+  const { t } = useTranslation();
+--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
+--   const bg = theme?.background?.val?.toString() ?? '#000';
+--   const border = theme?.gray?.val?.toString() ?? '#222';
+--diff --git a/src/features/habit/HeatmapChain.tsx b/src/features/habit/HeatmapChain.tsx
+--index f43f89c..5228664 100644
+----- a/src/features/habit/HeatmapChain.tsx
+--+++ b/src/features/habit/HeatmapChain.tsx
+--@@ -133,6 +133,8 @@ export const HeatmapChain = memo(function HeatmapChain({
+--           colorBg={colorBg}
+--           colorBorder={colorBorder}
+--           scale={scale}
+--+          opacityBoost={isToday ? 0.05 : 0}
+--+          isToday={isToday}
+--         />
+-- 
+--         {idx < dates.length - 1 && (
+--@@ -173,6 +175,8 @@ function Node({
+--   colorBg,
+--   colorBorder,
+--   scale,
+--+  opacityBoost = 0,
+--+  isToday,
+-- }: {
+--   size: number;
+--   radius: number;
+--@@ -183,7 +187,11 @@ function Node({
+--   colorBg: string;
+--   colorBorder: string;
+--   scale: Animated.AnimatedInterpolation<number>;
+--+  opacityBoost?: number;
+-- }) {
+--+  const boostedOpacity = Math.min(1, opacity + opacityBoost);
+--+  const activeBorder = isToday ? lighten(colorBorder, 0.1) : colorBorder;
+--+
+--   return (
+--     <Animated.View
+--       style={[
+--@@ -192,8 +200,8 @@ function Node({
+--           width: size,
+--           height: size,
+--           borderRadius: radius,
+---          borderColor: active ? colorBorder : 'rgba(255,255,255,0.12)',
+---          opacity,
+--+          borderColor: active ? activeBorder : 'rgba(255,255,255,0.12)',
+--+          opacity: boostedOpacity,
+--           transform: [{ scale: active ? (scale as any) : 1 }],
+--         },
+--       ]}>
+--@@ -207,7 +215,7 @@ function Node({
+--         />
+--       )}
+--       <View style={[styles.nodeHighlight, { borderRadius: radius }]} />
+---      {isToday && active && <View style={[styles.nodeDot, { borderRadius: radius / 2 }]} />}
+--+      {active && <View style={[styles.nodeDot, { borderRadius: radius / 2 }]} />}
+--     </Animated.View>
+--   );
+-- }
+--@@ -309,3 +317,16 @@ function rgba(hex: string, a: number) {
+--   const b = parseInt(c.slice(4, 6), 16);
+--   return `rgba(${r},${g},${b},${a})`;
+-- }
+--+
+--+function lighten(hex: string, amount: number) {
+--+  const c = hex.replace('#', '').trim();
+--+  if (c.length !== 6) return hex;
+--+  const r = parseInt(c.slice(0, 2), 16);
+--+  const g = parseInt(c.slice(2, 4), 16);
+--+  const b = parseInt(c.slice(4, 6), 16);
+--+  const mix = (v: number) => Math.min(255, Math.round(v + (255 - v) * amount));
+--+  const rr = mix(r).toString(16).padStart(2, '0');
+--+  const gg = mix(g).toString(16).padStart(2, '0');
+--+  const bb = mix(b).toString(16).padStart(2, '0');
+--+  return `#${rr}${gg}${bb}`;
+--+}
+--diff --git a/src/features/habit/IconPicker.tsx b/src/features/habit/IconPicker.tsx
+--index a61cb0f..97959d0 100644
+----- a/src/features/habit/IconPicker.tsx
+--+++ b/src/features/habit/IconPicker.tsx
+--@@ -1,7 +1,7 @@
+-- import { memo, useEffect, useMemo, useState } from 'react';
+-- import { Button, Stack, Text, XStack, YStack, ScrollView, useTheme } from 'tamagui';
+-- 
+---import { t } from '@/src/core/i18n/i18n';
+--+import { useTranslation } from '@/src/core/i18n/i18n';
+-- 
+-- export type IconPickerProps = {
+--   value?: string | null;
+--@@ -89,6 +89,7 @@ function findCategoryIdByIconId(iconId: string | null | undefined): IconCategory
+-- export const IconPicker = memo(function IconPicker({ value, onChange }: IconPickerProps) {
+--   const theme = useTheme();
+--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
+--+  const { t } = useTranslation();
+-- 
+--   // 初期カテゴリは現在の value に合わせる（なければ basic）
+--   const [activeCategoryId, setActiveCategoryId] = useState<IconCategoryId>(() => {
+-diff --git "a/20251221_1454_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251221_1454_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-deleted file mode 100644
+-index 9e3e4a9..0000000
+---- "a/20251221_1454_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-+++ /dev/null
+-@@ -1,169 +0,0 @@
+--diff --git a/app/_layout.tsx b/app/_layout.tsx
+--index a24c586..8161d3d 100644
+----- a/app/_layout.tsx
+--+++ b/app/_layout.tsx
+--@@ -23,6 +23,7 @@ import { getLocalDateKey } from '@/src/core/dateKey';
+-- export default function RootLayout() {
+--   const appState = useRef(AppState.currentState);
+--   const lastDate = useRef(getLocalDateKey());
+--+  const midnightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
+--   const themeName = useSettingsStore((s) => s.theme);
+--   const { t } = useTranslation();
+--   const isDark = themeName === 'dark';
+--@@ -35,6 +36,23 @@ export default function RootLayout() {
+--   } as const;
+-- 
+--   useEffect(() => {
+--+    const scheduleMidnightSync = () => {
+--+      const now = new Date();
+--+      const next = new Date(now);
+--+      next.setHours(24, 0, 0, 0);
+--+      const delay = next.getTime() - now.getTime();
+--+      return setTimeout(() => {
+--+        const today = getLocalDateKey();
+--+        if (today !== lastDate.current) {
+--+          useHabitStore.getState().loadAll();
+--+          lastDate.current = today;
+--+        }
+--+        midnightTimer.current = scheduleMidnightSync();
+--+      }, delay);
+--+    };
+--+
+--+    midnightTimer.current = scheduleMidnightSync();
+--+
+--     const sub = AppState.addEventListener('change', (state) => {
+--       if (appState.current.match(/inactive|background/) && state === 'active') {
+--         const today = getLocalDateKey();
+--@@ -45,7 +63,14 @@ export default function RootLayout() {
+--       }
+--       appState.current = state;
+--     });
+---    return () => sub.remove();
+--+
+--+    return () => {
+--+      sub.remove();
+--+      if (midnightTimer.current) {
+--+        clearTimeout(midnightTimer.current);
+--+        midnightTimer.current = null;
+--+      }
+--+    };
+--   }, []);
+-- 
+--   return (
+--diff --git a/src/features/habit/HeatmapChain.tsx b/src/features/habit/HeatmapChain.tsx
+--index 5228664..387dc93 100644
+----- a/src/features/habit/HeatmapChain.tsx
+--+++ b/src/features/habit/HeatmapChain.tsx
+--@@ -1,5 +1,5 @@
+-- import { memo, useEffect, useMemo, useRef } from 'react';
+---import { Animated, Easing, StyleSheet, View } from 'react-native';
+--+import { Animated, Easing, StyleSheet, View, type ColorValue } from 'react-native';
+-- import { XStack } from 'tamagui';
+-- import { LinearGradient } from 'expo-linear-gradient';
+-- import { getLocalDateKey } from '@/src/core/dateKey';
+--@@ -103,8 +103,9 @@ export const HeatmapChain = memo(function HeatmapChain({
+--   const isWeek = variant === 'week' && days === 7;
+--   const DOT = isWeek ? 24 : 18;
+--   const DOT_RADIUS = Math.round(DOT * (isWeek ? 0.42 : 0.45));
+---  const LINK_WIDTH = isWeek ? 16 : 12; // weekでは flexGrow と組み合わせて幅を使い切る
+---  const LINK_HEIGHT = isWeek ? 3 : 2;
+--+  // 線を少し太めにして「流れている」ことが分かりやすいようにする
+--+  const LINK_WIDTH = isWeek ? 22 : 16; // weekでは flexGrow と組み合わせて幅を使い切る
+--+  const LINK_HEIGHT = 3;
+--   const OUTER_GAP = isWeek ? '$1' : '$2';
+--   const INNER_GAP = '$1';
+-- 
+--@@ -134,7 +135,6 @@ export const HeatmapChain = memo(function HeatmapChain({
+--           colorBorder={colorBorder}
+--           scale={scale}
+--           opacityBoost={isToday ? 0.05 : 0}
+---          isToday={isToday}
+--         />
+-- 
+--         {idx < dates.length - 1 && (
+--@@ -176,7 +176,6 @@ function Node({
+--   colorBorder,
+--   scale,
+--   opacityBoost = 0,
+---  isToday,
+-- }: {
+--   size: number;
+--   radius: number;
+--@@ -247,6 +246,9 @@ function Link({
+--   });
+-- 
+--   const show = active || keepSpace;
+--+  const linkColors: readonly [ColorValue, ColorValue, ColorValue] = active
+--+    ? [rgba(colorActive, 0.35), rgba(colorActive, 1), rgba(colorActive, 0.35)]
+--+    : [rgba(colorActive, 0.06), rgba(colorActive, 0.2), rgba(colorActive, 0.06)];
+-- 
+--   return (
+--     <Animated.View
+--@@ -261,11 +263,7 @@ function Link({
+--       ]}>
+--       {show && (
+--         <LinearGradient
+---          colors={[
+---            rgba(colorActive, 0.08),
+---            rgba(colorActive, 0.9),
+---            rgba(colorActive, 0.08),
+---          ]}
+--+          colors={linkColors}
+--           start={{ x: phase, y: 0.5 }}
+--           end={{ x: phase + 1, y: 0.5 }}
+--           style={StyleSheet.absoluteFill}
+--diff --git a/src/stores/habitStore.ts b/src/stores/habitStore.ts
+--index 1e3949e..83ef1bf 100644
+----- a/src/stores/habitStore.ts
+--+++ b/src/stores/habitStore.ts
+--@@ -121,7 +121,8 @@ export const useHabitStore = create<HabitState>()(
+--     {
+--       name: 'dotchain-habits',
+--       storage: createJSONStorage(() => AsyncStorage),
+---      partialize: (state) => ({ today: state.today, habits: state.habits, logs: state.logs }),
+--+      // today は日付依存の一時データなので永続化しない（ズレ防止）
+--+      partialize: (state) => ({ habits: state.habits, logs: state.logs }),
+--     },
+--   ),
+-- );
+--diff --git a/src/stores/settingsStore.ts b/src/stores/settingsStore.ts
+--index 0ffd153..1e3fdd2 100644
+----- a/src/stores/settingsStore.ts
+--+++ b/src/stores/settingsStore.ts
+--@@ -14,6 +14,7 @@ type SettingsState = {
+--   hasSeenOnboarding: boolean;
+--   heatmapDays: HeatmapDaysOption;
+--   electricFlow: boolean;
+--+  electricFlowUserToggled: boolean;
+--   hasRequestedReview: boolean;
+--   isPro: boolean;
+--   reminderEnabled: boolean;
+--@@ -40,7 +41,9 @@ export const useSettingsStore = create<SettingsState>()(
+--       tapSound: 'click',
+--       hasSeenOnboarding: false,
+--       heatmapDays: 7,
+---      electricFlow: false,
+--+      // 短期レンジ（〜60日）は初期ON、長期レンジ（180/365）は初期OFFとする
+--+      electricFlow: true,
+--+      electricFlowUserToggled: false,
+--       hasRequestedReview: false,
+--       isPro: false,
+--       reminderEnabled: false,
+--@@ -53,9 +56,15 @@ export const useSettingsStore = create<SettingsState>()(
+--       setHeatmapDays: (days) => {
+--         const allowed: HeatmapDaysOption[] = [7, 30, 60, 180, 365];
+--         const safe = allowed.includes(days) ? days : 7;
+---        set({ heatmapDays: safe });
+--+        // ユーザーが手動で電流をいじっていなければ、レンジに応じて自動切替
+--+        if (!get().electricFlowUserToggled) {
+--+          const nextFlowDefault = safe <= 60; // 1週/1か月/2か月はON、半年/1年はOFF
+--+          set({ heatmapDays: safe, electricFlow: nextFlowDefault });
+--+        } else {
+--+          set({ heatmapDays: safe });
+--+        }
+--       },
+---      setElectricFlow: (v) => set({ electricFlow: Boolean(v) }),
+--+      setElectricFlow: (v) => set({ electricFlow: Boolean(v), electricFlowUserToggled: true }),
+--       setHasRequestedReview: (v) => set({ hasRequestedReview: Boolean(v) }),
+--       setIsPro: (v) => set({ isPro: Boolean(v) }),
+--       setReminderEnabled: async (v) => {
+-diff --git "a/20251222_1430_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251222_1430_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-deleted file mode 100644
+-index 392276a..0000000
+---- "a/20251222_1430_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-+++ /dev/null
+-@@ -1,819 +0,0 @@
+--diff --git a/app/habit/edit.tsx b/app/habit/edit.tsx
+--index 9fb36b0..fd01597 100644
+----- a/app/habit/edit.tsx
+--+++ b/app/habit/edit.tsx
+--@@ -7,6 +7,7 @@ import { useHabitStore } from '@/src/stores/habitStore';
+-- import { useTranslation } from '@/src/core/i18n/i18n';
+-- import { IconPicker } from '@/src/features/habit/IconPicker';
+-- import { TutorialOverlay } from '@/src/features/tutorial/TutorialOverlay';
+--+import { normalizeHabitIconName } from '@/src/features/habit/habitIcons';
+-- 
+-- const HABIT_TITLE_MAX_LENGTH = 20;
+-- const MAX_FREE_HABITS = 3;
+--@@ -21,7 +22,7 @@ export default function EditScreen() {
+-- 
+--   const target = habits.find((h) => h.id === id);
+--   const [name, setName] = useState(target?.title ?? '');
+---  const [selectedIcon, setSelectedIcon] = useState(target?.icon ?? 'walk');
+--+  const [selectedIcon, setSelectedIcon] = useState(() => normalizeHabitIconName(target?.icon));
+--   const isEdit = Boolean(id);
+--   const isTutorial = tutorial === '1' && !isEdit;
+-- 
+--@@ -30,7 +31,7 @@ export default function EditScreen() {
+-- 
+--   useEffect(() => {
+--     setName(target?.title ?? '');
+---    setSelectedIcon(target?.icon ?? 'walk');
+--+    setSelectedIcon(normalizeHabitIconName(target?.icon));
+--   }, [target?.title, target?.icon]);
+-- 
+--   useEffect(() => {
+--diff --git a/app/index.tsx b/app/index.tsx
+--index da3cdf7..0278ae1 100644
+----- a/app/index.tsx
+--+++ b/app/index.tsx
+--@@ -1,4 +1,4 @@
+---import { useEffect, useRef, useState, type ComponentProps } from 'react';
+--+import { useEffect, useRef, useState } from 'react';
+-- import { Href, useLocalSearchParams, useRouter } from 'expo-router';
+-- import { Ionicons } from '@expo/vector-icons';
+-- import { ScrollView, Stack, Text, XStack, YStack, Button, Spinner, useTheme } from 'tamagui';
+--@@ -18,8 +18,6 @@ import { useTranslation } from '@/src/core/i18n/i18n';
+-- import { useSettingsStore } from '@/src/stores/settingsStore';
+-- 
+-- type TutorialStep = 'none' | 'welcome' | 'pressFab' | 'pressHabit' | 'explainChain';
+---type IconName = ComponentProps<typeof Ionicons>['name'];
+---
+-- export default function HomeScreen() {
+--   const router = useRouter();
+--   const params = useLocalSearchParams<{ fromTutorial?: string }>();
+--@@ -111,7 +109,7 @@ export default function HomeScreen() {
+--           label={habit.title}
+--           size={idx === 0 ? 'big' : 'medium'}
+--           active={Boolean(today[habit.id])}
+---          iconName={habit.icon as IconName}
+--+          iconName={habit.icon}
+--           onPress={handlePressHabit}
+--           onLongPress={() => router.push(`/habit/edit?id=${habit.id}` as Href)}
+--         />
+--diff --git a/package.json b/package.json
+--index e30f2f2..47fc01a 100644
+----- a/package.json
+--+++ b/package.json
+--@@ -58,6 +58,7 @@
+--     "react-native-reanimated": "~4.1.1",
+--     "react-native-safe-area-context": "~5.6.0",
+--     "react-native-screens": "~4.16.0",
+--+    "react-native-svg": "15.12.1",
+--     "react-native-web": "~0.21.0",
+--     "react-native-worklets": "0.5.1",
+--     "tamagui": "1.138.5",
+--@@ -78,6 +79,7 @@
+--     "jest": "~29.7.0",
+--     "jest-expo": "~54.0.14",
+--     "prettier": "^3.6.2",
+--+    "react-native-svg-transformer": "^1.5.2",
+--     "react-test-renderer": "19.1.0",
+--     "ts-jest": "^29.4.5",
+--     "typescript": "~5.9.2"
+--diff --git a/pnpm-lock.yaml b/pnpm-lock.yaml
+--index ac0285b..85f2ea0 100644
+----- a/pnpm-lock.yaml
+--+++ b/pnpm-lock.yaml
+--@@ -37,7 +37,7 @@ importers:
+--         version: 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--       '@tamagui/lucide-icons':
+--         specifier: 1.138.5
+---        version: 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--+        version: 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--       '@tamagui/portal':
+--         specifier: 1.138.5
+--         version: 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--@@ -134,6 +134,9 @@ importers:
+--       react-native-screens:
+--         specifier: ~4.16.0
+--         version: 4.16.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--+      react-native-svg:
+--+        specifier: 15.12.1
+--+        version: 15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--       react-native-web:
+--         specifier: ~0.21.0
+--         version: 0.21.2(react-dom@19.1.0(react@19.1.0))(react@19.1.0)
+--@@ -189,6 +192,9 @@ importers:
+--       prettier:
+--         specifier: ^3.6.2
+--         version: 3.6.2
+--+      react-native-svg-transformer:
+--+        specifier: ^1.5.2
+--+        version: 1.5.2(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(typescript@5.9.3)
+--       react-test-renderer:
+--         specifier: 19.1.0
+--         version: 19.1.0(react@19.1.0)
+--@@ -1680,6 +1686,80 @@ packages:
+--     resolution: {integrity: sha512-KSdY7xb2L0DlLmlYzIOghdw/na4gsMcqJ8u4sD6tOQJr+x3hLujU9s4R8N3ob84/1bkvpvlU5PYKa1ae+OICnw==}
+--     engines: {node: '>=20.0.0'}
+-- 
+--+  '@svgr/babel-plugin-add-jsx-attribute@8.0.0':
+--+    resolution: {integrity: sha512-b9MIk7yhdS1pMCZM8VeNfUlSKVRhsHZNMl5O9SfaX0l0t5wjdgu4IDzGB8bpnGBBOjGST3rRFVsaaEtI4W6f7g==}
+--+    engines: {node: '>=14'}
+--+    peerDependencies:
+--+      '@babel/core': ^7.0.0-0
+--+
+--+  '@svgr/babel-plugin-remove-jsx-attribute@8.0.0':
+--+    resolution: {integrity: sha512-BcCkm/STipKvbCl6b7QFrMh/vx00vIP63k2eM66MfHJzPr6O2U0jYEViXkHJWqXqQYjdeA9cuCl5KWmlwjDvbA==}
+--+    engines: {node: '>=14'}
+--+    peerDependencies:
+--+      '@babel/core': ^7.0.0-0
+--+
+--+  '@svgr/babel-plugin-remove-jsx-empty-expression@8.0.0':
+--+    resolution: {integrity: sha512-5BcGCBfBxB5+XSDSWnhTThfI9jcO5f0Ai2V24gZpG+wXF14BzwxxdDb4g6trdOux0rhibGs385BeFMSmxtS3uA==}
+--+    engines: {node: '>=14'}
+--+    peerDependencies:
+--+      '@babel/core': ^7.0.0-0
+--+
+--+  '@svgr/babel-plugin-replace-jsx-attribute-value@8.0.0':
+--+    resolution: {integrity: sha512-KVQ+PtIjb1BuYT3ht8M5KbzWBhdAjjUPdlMtpuw/VjT8coTrItWX6Qafl9+ji831JaJcu6PJNKCV0bp01lBNzQ==}
+--+    engines: {node: '>=14'}
+--+    peerDependencies:
+--+      '@babel/core': ^7.0.0-0
+--+
+--+  '@svgr/babel-plugin-svg-dynamic-title@8.0.0':
+--+    resolution: {integrity: sha512-omNiKqwjNmOQJ2v6ge4SErBbkooV2aAWwaPFs2vUY7p7GhVkzRkJ00kILXQvRhA6miHnNpXv7MRnnSjdRjK8og==}
+--+    engines: {node: '>=14'}
+--+    peerDependencies:
+--+      '@babel/core': ^7.0.0-0
+--+
+--+  '@svgr/babel-plugin-svg-em-dimensions@8.0.0':
+--+    resolution: {integrity: sha512-mURHYnu6Iw3UBTbhGwE/vsngtCIbHE43xCRK7kCw4t01xyGqb2Pd+WXekRRoFOBIY29ZoOhUCTEweDMdrjfi9g==}
+--+    engines: {node: '>=14'}
+--+    peerDependencies:
+--+      '@babel/core': ^7.0.0-0
+--+
+--+  '@svgr/babel-plugin-transform-react-native-svg@8.1.0':
+--+    resolution: {integrity: sha512-Tx8T58CHo+7nwJ+EhUwx3LfdNSG9R2OKfaIXXs5soiy5HtgoAEkDay9LIimLOcG8dJQH1wPZp/cnAv6S9CrR1Q==}
+--+    engines: {node: '>=14'}
+--+    peerDependencies:
+--+      '@babel/core': ^7.0.0-0
+--+
+--+  '@svgr/babel-plugin-transform-svg-component@8.0.0':
+--+    resolution: {integrity: sha512-DFx8xa3cZXTdb/k3kfPeaixecQLgKh5NVBMwD0AQxOzcZawK4oo1Jh9LbrcACUivsCA7TLG8eeWgrDXjTMhRmw==}
+--+    engines: {node: '>=12'}
+--+    peerDependencies:
+--+      '@babel/core': ^7.0.0-0
+--+
+--+  '@svgr/babel-preset@8.1.0':
+--+    resolution: {integrity: sha512-7EYDbHE7MxHpv4sxvnVPngw5fuR6pw79SkcrILHJ/iMpuKySNCl5W1qcwPEpU+LgyRXOaAFgH0KhwD18wwg6ug==}
+--+    engines: {node: '>=14'}
+--+    peerDependencies:
+--+      '@babel/core': ^7.0.0-0
+--+
+--+  '@svgr/core@8.1.0':
+--+    resolution: {integrity: sha512-8QqtOQT5ACVlmsvKOJNEaWmRPmcojMOzCz4Hs2BGG/toAp/K38LcsMRyLp349glq5AzJbCEeimEoxaX6v/fLrA==}
+--+    engines: {node: '>=14'}
+--+
+--+  '@svgr/hast-util-to-babel-ast@8.0.0':
+--+    resolution: {integrity: sha512-EbDKwO9GpfWP4jN9sGdYwPBU0kdomaPIL2Eu4YwmgP+sJeXT+L7bMwJUBnhzfH8Q2qMBqZ4fJwpCyYsAN3mt2Q==}
+--+    engines: {node: '>=14'}
+--+
+--+  '@svgr/plugin-jsx@8.1.0':
+--+    resolution: {integrity: sha512-0xiIyBsLlr8quN+WyuxooNW9RJ0Dpr8uOnH/xrCVO8GLUcwHISwj1AG0k+LFzteTkAA0GbX0kj9q6Dk70PTiPA==}
+--+    engines: {node: '>=14'}
+--+    peerDependencies:
+--+      '@svgr/core': '*'
+--+
+--+  '@svgr/plugin-svgo@8.1.0':
+--+    resolution: {integrity: sha512-Ywtl837OGO9pTLIN/onoWLmDQ4zFUycI1g76vuKGEz6evR/ZTJlJuz3G/fIkb6OVBJ2g0o6CGJzaEjfmEo3AHA==}
+--+    engines: {node: '>=14'}
+--+    peerDependencies:
+--+      '@svgr/core': '*'
+--+
+--   '@tamagui/accordion@1.138.5':
+--     resolution: {integrity: sha512-hUxHRxgKi3oMd+mQCsgZSlcO/ESO++8vepGRmWtGcOFcDbXG8eSBEjk3XLkdXMNp5oAXs6E9tsc96VAjnnjeTw==}
+--     peerDependencies:
+--@@ -2237,6 +2317,10 @@ packages:
+--     resolution: {integrity: sha512-XCuKFP5PS55gnMVu3dty8KPatLqUoy/ZYzDzAGCQ8JNFCkLXzmI7vNHCR+XpbZaMWQK/vQubr7PkYq8g470J/A==}
+--     engines: {node: '>= 10'}
+-- 
+--+  '@trysound/sax@0.2.0':
+--+    resolution: {integrity: sha512-L7z9BgrNEcYyUYtF+HaEfiS5ebkh9jXqbszz7pC0hRBPaatV0XjSD3+eHrpqFemQfgwiFF0QPIarnIihIDn7OA==}
+--+    engines: {node: '>=10.13.0'}
+--+
+--   '@tybys/wasm-util@0.10.1':
+--     resolution: {integrity: sha512-9tTaPJLSiejZKx+Bmog4uSubteqTvFrVrURwkmHixBo0G4seD0zUxp98E1DzUBJxLQ3NPwXrGKDiVjwx/DpPsg==}
+-- 
+--@@ -2969,6 +3053,15 @@ packages:
+--   core-js-compat@3.46.0:
+--     resolution: {integrity: sha512-p9hObIIEENxSV8xIu+V68JjSeARg6UVMG5mR+JEUguG3sI6MsiS1njz2jHmyJDvA+8jX/sytkBHup6kxhM9law==}
+-- 
+--+  cosmiconfig@8.3.6:
+--+    resolution: {integrity: sha512-kcZ6+W5QzcJ3P1Mt+83OUv/oHFqZHIx8DuxG6eZ5RGMERoLqp4BuGjhHLYGK+Kf5XVkQvqBSmAy/nGWN3qDgEA==}
+--+    engines: {node: '>=14'}
+--+    peerDependencies:
+--+      typescript: '>=4.9.5'
+--+    peerDependenciesMeta:
+--+      typescript:
+--+        optional: true
+--+
+--   create-jest@29.7.0:
+--     resolution: {integrity: sha512-Adz2bdH0Vq3F53KEMJOoftQFutWCukm6J24wbPWRO4k1kMY7gS7ds/uoJkNuV8wDCtWWnuwGcJwpWcih+zEW1Q==}
+--     engines: {node: ^14.15.0 || ^16.10.0 || >=18.0.0}
+--@@ -2995,10 +3088,22 @@ packages:
+--     resolution: {integrity: sha512-tRpdppF7TRazZrjJ6v3stzv93qxRcSsFmW6cX0Zm2NVKpxE1WV1HblnghVv9TreireHkqI/VDEsfolRF1p6y7Q==}
+--     engines: {node: '>=8.0.0'}
+-- 
+--+  css-tree@2.2.1:
+--+    resolution: {integrity: sha512-OA0mILzGc1kCOCSJerOeqDxDQ4HOh+G8NbOJFOTgOCzpw7fCBubk0fEyxp8AgOL/jvLgYA/uV0cMbe43ElF1JA==}
+--+    engines: {node: ^10 || ^12.20.0 || ^14.13.0 || >=15.0.0, npm: '>=7.0.0'}
+--+
+--+  css-tree@2.3.1:
+--+    resolution: {integrity: sha512-6Fv1DV/TYw//QF5IzQdqsNDjx/wc8TrMBZsqjL9eW01tWb7R7k/mq+/VXfJCl7SoD5emsJop9cOByJZfs8hYIw==}
+--+    engines: {node: ^10 || ^12.20.0 || ^14.13.0 || >=15.0.0}
+--+
+--   css-what@6.2.2:
+--     resolution: {integrity: sha512-u/O3vwbptzhMs3L1fQE82ZSLHQQfto5gyZzwteVIEyeaY5Fc7R4dapF/BvRoSYFeqfBk4m0V1Vafq5Pjv25wvA==}
+--     engines: {node: '>= 6'}
+-- 
+--+  csso@5.0.5:
+--+    resolution: {integrity: sha512-0LrrStPOdJj+SPCCrGhzryycLjwcgUSHBtxNA8aIDxf0GLsRh1cKYhB00Gd1lDOS4yGH69+SNn13+TWbVHETFQ==}
+--+    engines: {node: ^10 || ^12.20.0 || ^14.13.0 || >=15.0.0, npm: '>=7.0.0'}
+--+
+--   cssom@0.3.8:
+--     resolution: {integrity: sha512-b0tGHbfegbhPJpxpiBPU2sCkigAqtM9O121le6bbOlgyV+NyGyCmVfJ6QW9eRjz8CpNfWEOYBIMIGRYkLwsIYg==}
+-- 
+--@@ -3151,6 +3256,9 @@ packages:
+--   domutils@3.2.2:
+--     resolution: {integrity: sha512-6kZKyUajlDuqlHKVX1w7gyslj9MPIXzIFiz/rGu35uC1wMi+kMhQwGhl4lt9unC9Vb9INnY9Z3/ZA3+FhASLaw==}
+-- 
+--+  dot-case@3.0.4:
+--+    resolution: {integrity: sha512-Kv5nKlh6yRrdrGvxeJ2e5y2eRUpkUosIW4A2AS38zwSz27zu7ufDwQPi5Jhs3XAlGNetl3bmnGhQsMtkKJnj3w==}
+--+
+--   dotenv-expand@11.0.7:
+--     resolution: {integrity: sha512-zIHwmZPRshsCdpMDyVsqGmgyP0yT8GAgXUnkdAoJisxvf33k7yO6OuoKmcTGuXPWSsm8Oh88nZicRLA9Y0rUeA==}
+--     engines: {node: '>=12'}
+--@@ -4615,6 +4723,9 @@ packages:
+--     resolution: {integrity: sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==}
+--     hasBin: true
+-- 
+--+  lower-case@2.0.2:
+--+    resolution: {integrity: sha512-7fm3l3NAF9WfN6W3JOmf5drwpVqX78JtoGJ3A6W0a6ZnldM41w2fV5D490psKFTpMds8TJse/eHLFFsNHHjHgg==}
+--+
+--   lru-cache@10.4.3:
+--     resolution: {integrity: sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==}
+-- 
+--@@ -4649,6 +4760,12 @@ packages:
+--   mdn-data@2.0.14:
+--     resolution: {integrity: sha512-dn6wd0uw5GsdswPFfsgMp5NSB0/aDe6fK94YJV/AJDYXL6HVLWBsxeq7js7Ad+mU2K9LAlwpk6kN2D5mwCPVow==}
+-- 
+--+  mdn-data@2.0.28:
+--+    resolution: {integrity: sha512-aylIc7Z9y4yzHYAJNuESG3hfhC+0Ibp/MAMiaOZgNv4pmEdFyfZhhhny4MNiAfWdBQ1RQ2mfDWmM1x8SvGyp8g==}
+--+
+--+  mdn-data@2.0.30:
+--+    resolution: {integrity: sha512-GaqWWShW4kv/G9IEucWScBx9G1/vsFZZJUO+tD26M8J8z3Kw5RDQjaoZe03YAClgeS/SWPOcb4nkFBTEi5DUEA==}
+--+
+--   memoize-one@5.2.1:
+--     resolution: {integrity: sha512-zYiwtZUcYyXKo/np96AGZAckk+FWWsUdJ3cHGGmld7+AhvcWmQyGCYUh1hc4Q/pkOhb65dQR/pqCyK0cOaHz4Q==}
+-- 
+--@@ -4878,6 +4995,9 @@ packages:
+--   nested-error-stacks@2.0.1:
+--     resolution: {integrity: sha512-SrQrok4CATudVzBS7coSz26QRSmlK9TzzoFbeKfcPBUFPjcQM9Rqvr/DlJkOrwI/0KcgvMub1n1g5Jt9EgRn4A==}
+-- 
+--+  no-case@3.0.4:
+--+    resolution: {integrity: sha512-fgAN3jGAh+RoxUGZHTSOLJIqUc2wmoBwGR4tbpNAKmmovFoWq0OdRkb0VkldReO2a2iBT/OEulG9XSUc10r3zg==}
+--+
+--   node-fetch@2.7.0:
+--     resolution: {integrity: sha512-c4FRfUm/dbcWZ7U+1Wq0AwCyFL+3nt2bEw05wfxSz+DWpWsitgmSgYmy2dQdWyKC1694ELPqMs/YzUSNozLt8A==}
+--     engines: {node: 4.x || >=6.0.0}
+--@@ -5044,6 +5164,9 @@ packages:
+--     resolution: {integrity: sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==}
+--     engines: {node: '>= 0.8'}
+-- 
+--+  path-dirname@1.0.2:
+--+    resolution: {integrity: sha512-ALzNPpyNq9AqXMBjeymIjFDAkAFH06mHJH/cSBHAgU0s4vfpBn6b2nf8tiRLvagKD8RbTpq2FKTBg7cl9l3c7Q==}
+--+
+--   path-exists@4.0.0:
+--     resolution: {integrity: sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==}
+--     engines: {node: '>=8'}
+--@@ -5268,8 +5391,14 @@ packages:
+--       react: '*'
+--       react-native: '*'
+-- 
+---  react-native-svg@15.15.0:
+---    resolution: {integrity: sha512-/Wx6F/IZ88B/GcF88bK8K7ZseJDYt+7WGaiggyzLvTowChQ8BM5idmcd4pK+6QJP6a6DmzL2sfOMukFUn/NArg==}
+--+  react-native-svg-transformer@1.5.2:
+--+    resolution: {integrity: sha512-eW4hOtrd30s4SRdN4X1XYxTCu1czsxDGQKmfQ3RFbZMN5yw4ZmiKGGr+lXbQW4uDGZvSoGd9FHL1f+rgGoKg8Q==}
+--+    peerDependencies:
+--+      react-native: '>=0.59.0'
+--+      react-native-svg: '>=12.0.0'
+--+
+--+  react-native-svg@15.12.1:
+--+    resolution: {integrity: sha512-vCuZJDf8a5aNC2dlMovEv4Z0jjEUET53lm/iILFnFewa15b4atjVxU6Wirm6O9y6dEsdjDZVD7Q3QM4T1wlI8g==}
+--     peerDependencies:
+--       react: '*'
+--       react-native: '*'
+--@@ -5605,6 +5734,9 @@ packages:
+--     resolution: {integrity: sha512-h+z7HKHYXj6wJU+AnS/+IH8Uh9fdcX1Lrhg1/VMdf9PwoBQXFcXiAdsy2tSK0P6gKwJLXp02r90ahUCqHk9rrw==}
+--     engines: {node: '>=8.0.0'}
+-- 
+--+  snake-case@3.0.4:
+--+    resolution: {integrity: sha512-LAOh4z89bGQvl9pFfNF8V146i7o7/CqFPbqzYgP+yYzDIDeS9HaNFtXABamRW+AQzEVODcvE79ljJ+8a9YSdMg==}
+--+
+--   source-map-js@1.2.1:
+--     resolution: {integrity: sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==}
+--     engines: {node: '>=0.10.0'}
+--@@ -5778,6 +5910,14 @@ packages:
+--     resolution: {integrity: sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==}
+--     engines: {node: '>= 0.4'}
+-- 
+--+  svg-parser@2.0.4:
+--+    resolution: {integrity: sha512-e4hG1hRwoOdRb37cIMSgzNsxyzKfayW6VOflrwvR+/bzrkyxY/31WkbgnQpgtrNp1SdpJvpUAGTa/ZoiPNDuRQ==}
+--+
+--+  svgo@3.3.2:
+--+    resolution: {integrity: sha512-OoohrmuUlBs8B8o6MB2Aevn+pRIH9zDALSR+6hhqVfa6fRwG/Qw9VUMSMW9VNg2CFc/MTIfabtdOVl9ODIJjpw==}
+--+    engines: {node: '>=14.0.0'}
+--+    hasBin: true
+--+
+--   symbol-tree@3.2.4:
+--     resolution: {integrity: sha512-9QNk5KwDF+Bvz+PyObkmSYjI5ksVUYtjW7AU22r2NKcfLJcXp96hkDWU3+XndOsUb+AQ9QhfzfCT2O+CNWT5Tw==}
+-- 
+--@@ -8166,6 +8306,85 @@ snapshots:
+--       - bufferutil
+--       - utf-8-validate
+-- 
+--+  '@svgr/babel-plugin-add-jsx-attribute@8.0.0(@babel/core@7.28.5)':
+--+    dependencies:
+--+      '@babel/core': 7.28.5
+--+
+--+  '@svgr/babel-plugin-remove-jsx-attribute@8.0.0(@babel/core@7.28.5)':
+--+    dependencies:
+--+      '@babel/core': 7.28.5
+--+
+--+  '@svgr/babel-plugin-remove-jsx-empty-expression@8.0.0(@babel/core@7.28.5)':
+--+    dependencies:
+--+      '@babel/core': 7.28.5
+--+
+--+  '@svgr/babel-plugin-replace-jsx-attribute-value@8.0.0(@babel/core@7.28.5)':
+--+    dependencies:
+--+      '@babel/core': 7.28.5
+--+
+--+  '@svgr/babel-plugin-svg-dynamic-title@8.0.0(@babel/core@7.28.5)':
+--+    dependencies:
+--+      '@babel/core': 7.28.5
+--+
+--+  '@svgr/babel-plugin-svg-em-dimensions@8.0.0(@babel/core@7.28.5)':
+--+    dependencies:
+--+      '@babel/core': 7.28.5
+--+
+--+  '@svgr/babel-plugin-transform-react-native-svg@8.1.0(@babel/core@7.28.5)':
+--+    dependencies:
+--+      '@babel/core': 7.28.5
+--+
+--+  '@svgr/babel-plugin-transform-svg-component@8.0.0(@babel/core@7.28.5)':
+--+    dependencies:
+--+      '@babel/core': 7.28.5
+--+
+--+  '@svgr/babel-preset@8.1.0(@babel/core@7.28.5)':
+--+    dependencies:
+--+      '@babel/core': 7.28.5
+--+      '@svgr/babel-plugin-add-jsx-attribute': 8.0.0(@babel/core@7.28.5)
+--+      '@svgr/babel-plugin-remove-jsx-attribute': 8.0.0(@babel/core@7.28.5)
+--+      '@svgr/babel-plugin-remove-jsx-empty-expression': 8.0.0(@babel/core@7.28.5)
+--+      '@svgr/babel-plugin-replace-jsx-attribute-value': 8.0.0(@babel/core@7.28.5)
+--+      '@svgr/babel-plugin-svg-dynamic-title': 8.0.0(@babel/core@7.28.5)
+--+      '@svgr/babel-plugin-svg-em-dimensions': 8.0.0(@babel/core@7.28.5)
+--+      '@svgr/babel-plugin-transform-react-native-svg': 8.1.0(@babel/core@7.28.5)
+--+      '@svgr/babel-plugin-transform-svg-component': 8.0.0(@babel/core@7.28.5)
+--+
+--+  '@svgr/core@8.1.0(typescript@5.9.3)':
+--+    dependencies:
+--+      '@babel/core': 7.28.5
+--+      '@svgr/babel-preset': 8.1.0(@babel/core@7.28.5)
+--+      camelcase: 6.3.0
+--+      cosmiconfig: 8.3.6(typescript@5.9.3)
+--+      snake-case: 3.0.4
+--+    transitivePeerDependencies:
+--+      - supports-color
+--+      - typescript
+--+
+--+  '@svgr/hast-util-to-babel-ast@8.0.0':
+--+    dependencies:
+--+      '@babel/types': 7.28.5
+--+      entities: 4.5.0
+--+
+--+  '@svgr/plugin-jsx@8.1.0(@svgr/core@8.1.0(typescript@5.9.3))':
+--+    dependencies:
+--+      '@babel/core': 7.28.5
+--+      '@svgr/babel-preset': 8.1.0(@babel/core@7.28.5)
+--+      '@svgr/core': 8.1.0(typescript@5.9.3)
+--+      '@svgr/hast-util-to-babel-ast': 8.0.0
+--+      svg-parser: 2.0.4
+--+    transitivePeerDependencies:
+--+      - supports-color
+--+
+--+  '@svgr/plugin-svgo@8.1.0(@svgr/core@8.1.0(typescript@5.9.3))(typescript@5.9.3)':
+--+    dependencies:
+--+      '@svgr/core': 8.1.0(typescript@5.9.3)
+--+      cosmiconfig: 8.3.6(typescript@5.9.3)
+--+      deepmerge: 4.3.1
+--+      svgo: 3.3.2
+--+    transitivePeerDependencies:
+--+      - typescript
+--+
+--   '@tamagui/accordion@1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)':
+--     dependencies:
+--       '@tamagui/collapsible': 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--@@ -8587,11 +8806,11 @@ snapshots:
+--     transitivePeerDependencies:
+--       - react-dom
+-- 
+---  '@tamagui/helpers-icon@1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)':
+--+  '@tamagui/helpers-icon@1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)':
+--     dependencies:
+--       '@tamagui/core': 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--       react: 19.1.0
+---      react-native-svg: 15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--+      react-native-svg: 15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--     transitivePeerDependencies:
+--       - react-dom
+--       - react-native
+--@@ -8669,12 +8888,12 @@ snapshots:
+--       - react-dom
+--       - react-native
+-- 
+---  '@tamagui/lucide-icons@1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)':
+--+  '@tamagui/lucide-icons@1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)':
+--     dependencies:
+--       '@tamagui/core': 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+---      '@tamagui/helpers-icon': 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--+      '@tamagui/helpers-icon': 1.138.5(react-dom@19.1.0(react@19.1.0))(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--       react: 19.1.0
+---      react-native-svg: 15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--+      react-native-svg: 15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--     transitivePeerDependencies:
+--       - react-dom
+--       - react-native
+--@@ -9294,6 +9513,8 @@ snapshots:
+-- 
+--   '@tootallnate/once@2.0.0': {}
+-- 
+--+  '@trysound/sax@0.2.0': {}
+--+
+--   '@tybys/wasm-util@0.10.1':
+--     dependencies:
+--       tslib: 2.8.1
+--@@ -10151,6 +10372,15 @@ snapshots:
+--     dependencies:
+--       browserslist: 4.28.0
+-- 
+--+  cosmiconfig@8.3.6(typescript@5.9.3):
+--+    dependencies:
+--+      import-fresh: 3.3.1
+--+      js-yaml: 4.1.1
+--+      parse-json: 5.2.0
+--+      path-type: 4.0.0
+--+    optionalDependencies:
+--+      typescript: 5.9.3
+--+
+--   create-jest@29.7.0(@types/node@24.10.1):
+--     dependencies:
+--       '@jest/types': 29.6.3
+--@@ -10197,8 +10427,22 @@ snapshots:
+--       mdn-data: 2.0.14
+--       source-map: 0.6.1
+-- 
+--+  css-tree@2.2.1:
+--+    dependencies:
+--+      mdn-data: 2.0.28
+--+      source-map-js: 1.2.1
+--+
+--+  css-tree@2.3.1:
+--+    dependencies:
+--+      mdn-data: 2.0.30
+--+      source-map-js: 1.2.1
+--+
+--   css-what@6.2.2: {}
+-- 
+--+  csso@5.0.5:
+--+    dependencies:
+--+      css-tree: 2.2.1
+--+
+--   cssom@0.3.8: {}
+-- 
+--   cssom@0.5.0: {}
+--@@ -10321,6 +10565,11 @@ snapshots:
+--       domelementtype: 2.3.0
+--       domhandler: 5.0.3
+-- 
+--+  dot-case@3.0.4:
+--+    dependencies:
+--+      no-case: 3.0.4
+--+      tslib: 2.8.1
+--+
+--   dotenv-expand@11.0.7:
+--     dependencies:
+--       dotenv: 16.4.7
+--@@ -12224,6 +12473,10 @@ snapshots:
+--     dependencies:
+--       js-tokens: 4.0.0
+-- 
+--+  lower-case@2.0.2:
+--+    dependencies:
+--+      tslib: 2.8.1
+--+
+--   lru-cache@10.4.3: {}
+-- 
+--   lru-cache@11.2.4: {}
+--@@ -12252,6 +12505,10 @@ snapshots:
+-- 
+--   mdn-data@2.0.14: {}
+-- 
+--+  mdn-data@2.0.28: {}
+--+
+--+  mdn-data@2.0.30: {}
+--+
+--   memoize-one@5.2.1: {}
+-- 
+--   memoize-one@6.0.0: {}
+--@@ -12681,6 +12938,11 @@ snapshots:
+-- 
+--   nested-error-stacks@2.0.1: {}
+-- 
+--+  no-case@3.0.4:
+--+    dependencies:
+--+      lower-case: 2.0.2
+--+      tslib: 2.8.1
+--+
+--   node-fetch@2.7.0:
+--     dependencies:
+--       whatwg-url: 5.0.0
+--@@ -12863,6 +13125,8 @@ snapshots:
+-- 
+--   parseurl@1.3.3: {}
+-- 
+--+  path-dirname@1.0.2: {}
+--+
+--   path-exists@4.0.0: {}
+-- 
+--   path-is-absolute@1.0.1: {}
+--@@ -13069,7 +13333,19 @@ snapshots:
+--       react-native-is-edge-to-edge: 1.2.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--       warn-once: 0.1.1
+-- 
+---  react-native-svg@15.15.0(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0):
+--+  react-native-svg-transformer@1.5.2(react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0))(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(typescript@5.9.3):
+--+    dependencies:
+--+      '@svgr/core': 8.1.0(typescript@5.9.3)
+--+      '@svgr/plugin-jsx': 8.1.0(@svgr/core@8.1.0(typescript@5.9.3))
+--+      '@svgr/plugin-svgo': 8.1.0(@svgr/core@8.1.0(typescript@5.9.3))(typescript@5.9.3)
+--+      path-dirname: 1.0.2
+--+      react-native: 0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0)
+--+      react-native-svg: 15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0)
+--+    transitivePeerDependencies:
+--+      - supports-color
+--+      - typescript
+--+
+--+  react-native-svg@15.12.1(react-native@0.81.5(@babel/core@7.28.5)(@types/react@19.1.17)(react@19.1.0))(react@19.1.0):
+--     dependencies:
+--       css-select: 5.2.2
+--       css-tree: 1.1.3
+--@@ -13496,6 +13772,11 @@ snapshots:
+-- 
+--   slugify@1.6.6: {}
+-- 
+--+  snake-case@3.0.4:
+--+    dependencies:
+--+      dot-case: 3.0.4
+--+      tslib: 2.8.1
+--+
+--   source-map-js@1.2.1: {}
+-- 
+--   source-map-support@0.5.13:
+--@@ -13679,6 +13960,18 @@ snapshots:
+-- 
+--   supports-preserve-symlinks-flag@1.0.0: {}
+-- 
+--+  svg-parser@2.0.4: {}
+--+
+--+  svgo@3.3.2:
+--+    dependencies:
+--+      '@trysound/sax': 0.2.0
+--+      commander: 7.2.0
+--+      css-select: 5.2.2
+--+      css-tree: 2.3.1
+--+      css-what: 6.2.2
+--+      csso: 5.0.5
+--+      picocolors: 1.1.1
+--+
+--   symbol-tree@3.2.4: {}
+-- 
+--   synckit@0.9.3:
+--diff --git a/src/features/habit/HabitButton.tsx b/src/features/habit/HabitButton.tsx
+--index 29657a0..f695e31 100644
+----- a/src/features/habit/HabitButton.tsx
+--+++ b/src/features/habit/HabitButton.tsx
+--@@ -1,10 +1,9 @@
+-- import { Text, YStack, useTheme } from 'tamagui';
+-- import { Ionicons } from '@expo/vector-icons';
+-- import { Pressable, Animated, Easing } from 'react-native';
+---import { useEffect, useRef, type ComponentProps } from 'react';
+--+import { useEffect, useRef } from 'react';
+-- import { useTranslation } from '@/src/core/i18n/i18n';
+---
+---type IconName = ComponentProps<typeof Ionicons>['name'];
+--+import { normalizeHabitIconName } from '@/src/features/habit/habitIcons';
+-- 
+-- type Props = {
+--   /**
+--@@ -15,18 +14,19 @@ type Props = {
+--   label: string;
+--   size: 'big' | 'medium';
+--   active: boolean;
+---  iconName?: IconName;
+--+  iconName?: string | null;
+--   onPress: () => void;
+--   onLongPress?: () => void;
+-- };
+-- 
+---export function HabitButton({ label, size, active, iconName = 'checkbox', onPress, onLongPress }: Props) {
+--+export function HabitButton({ label, size, active, iconName, onPress, onLongPress }: Props) {
+--   const height = size === 'big' ? 160 : 110;
+--   const theme = useTheme();
+--   const { t } = useTranslation();
+--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
+--   const bg = theme?.background?.val?.toString() ?? '#000';
+--   const border = theme?.gray?.val?.toString() ?? '#222';
+--+  const resolvedIcon = normalizeHabitIconName(iconName);
+--   const glow = useRef(new Animated.Value(0)).current;
+--   const pressScale = useRef(new Animated.Value(1)).current;
+-- 
+--@@ -112,7 +112,7 @@ export function HabitButton({ label, size, active, iconName = 'checkbox', onPres
+--             transform: [{ scale: pressScale }],
+--           }}>
+--           <Ionicons
+---            name={iconName}
+--+            name={resolvedIcon}
+--             size={size === 'big' ? 52 : 36}
+--             color={active ? '#000000' : '#EEEEEE'}
+--           />
+--diff --git a/src/features/habit/IconPicker.tsx b/src/features/habit/IconPicker.tsx
+--index 97959d0..f38f52b 100644
+----- a/src/features/habit/IconPicker.tsx
+--+++ b/src/features/habit/IconPicker.tsx
+--@@ -1,88 +1,24 @@
+-- import { memo, useEffect, useMemo, useState } from 'react';
+-- import { Button, Stack, Text, XStack, YStack, ScrollView, useTheme } from 'tamagui';
+--+import { Ionicons } from '@expo/vector-icons';
+-- 
+-- import { useTranslation } from '@/src/core/i18n/i18n';
+--+import {
+--+  HABIT_ICON_CATEGORIES,
+--+  type HabitIconName,
+--+  type IconCategoryId,
+--+  normalizeHabitIconName,
+--+} from '@/src/features/habit/habitIcons';
+-- 
+-- export type IconPickerProps = {
+--   value?: string | null;
+---  onChange: (value: string) => void;
+--+  onChange: (value: HabitIconName) => void;
+-- };
+-- 
+---// 使ってよいアイコンIDの一覧（既存IDは変更しない）
+---type IconId =
+---  | 'flame'
+---  | 'checkbox'
+---  | 'sparkles'
+---  | 'water'
+---  | 'walk'
+---  | 'moon'
+---  | 'fitness'
+---  | 'book'
+---  | 'brush'
+---  | 'tv'
+---  | 'clean'
+---  | 'laundry'
+---  | 'pc'
+---  | 'study'
+---  | 'language';
+---
+---// カテゴリIDとタイトルキーを型で縛る
+---type IconCategoryId = 'basic' | 'health' | 'learning';
+---type IconCategoryTitleKey = 'iconCatBasic' | 'iconCatHealth' | 'iconCatLearning';
+---
+---type IconOption = {
+---  id: IconId; // DB に保存する値（習慣.icon）
+---  emoji: string;
+---  label: string; // アクセシビリティ用（英語固定）
+---};
+---
+---type IconCategory = {
+---  id: IconCategoryId;
+---  titleKey: IconCategoryTitleKey; // i18n キー
+---  icons: IconOption[];
+---};
+---
+---// 既存IDは変えない（既存データのアイコンを壊さないため）
+---const ICON_CATEGORIES: IconCategory[] = [
+---  {
+---    id: 'basic',
+---    titleKey: 'iconCatBasic',
+---    icons: [
+---      { id: 'flame', emoji: '🔥', label: 'Streak' },
+---      { id: 'checkbox', emoji: '☑️', label: 'Task' },
+---      { id: 'sparkles', emoji: '✨', label: 'Shine' },
+---      { id: 'clean', emoji: '🧹', label: 'Cleaning' },
+---      { id: 'laundry', emoji: '🧺', label: 'Laundry' },
+---    ],
+---  },
+---  {
+---    id: 'health',
+---    titleKey: 'iconCatHealth',
+---    icons: [
+---      { id: 'water', emoji: '💧', label: 'Water' },
+---      { id: 'walk', emoji: '🚶‍♂️', label: 'Walk' },
+---      { id: 'moon', emoji: '🌙', label: 'Sleep' },
+---      { id: 'fitness', emoji: '🏋️‍♂️', label: 'Workout' },
+---    ],
+---  },
+---  {
+---    id: 'learning',
+---    titleKey: 'iconCatLearning',
+---    icons: [
+---      { id: 'book', emoji: '📚', label: 'Read' },
+---      { id: 'brush', emoji: '🖌️', label: 'Art' },
+---      { id: 'tv', emoji: '📺', label: 'Media' },
+---      { id: 'pc', emoji: '💻', label: 'PC work' },
+---      { id: 'study', emoji: '✏️', label: 'Study' },
+---      { id: 'language', emoji: '🌐', label: 'Language' },
+---    ],
+---  },
+---];
+---
+-- // iconId から所属カテゴリを検索
+-- function findCategoryIdByIconId(iconId: string | null | undefined): IconCategoryId | null {
+--   if (!iconId) return null;
+---  const category = ICON_CATEGORIES.find((cat) => cat.icons.some((opt) => opt.id === iconId));
+--+  const category = HABIT_ICON_CATEGORIES.find((cat) => cat.icons.some((opt) => opt.id === iconId));
+--   return category?.id ?? null;
+-- }
+-- 
+--@@ -91,21 +27,23 @@ export const IconPicker = memo(function IconPicker({ value, onChange }: IconPick
+--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
+--   const { t } = useTranslation();
+-- 
+--+  const normalizedValue = normalizeHabitIconName(value);
+--+
+--   // 初期カテゴリは現在の value に合わせる（なければ basic）
+--   const [activeCategoryId, setActiveCategoryId] = useState<IconCategoryId>(() => {
+---    const fromValue = findCategoryIdByIconId(value);
+---    return fromValue ?? (ICON_CATEGORIES[0]?.id ?? 'basic');
+--+    const fromValue = findCategoryIdByIconId(normalizedValue);
+--+    return fromValue ?? (HABIT_ICON_CATEGORIES[0]?.id ?? 'basic');
+--   });
+-- 
+--   // value が変わったらカテゴリも追従
+--   useEffect(() => {
+---    const catId = findCategoryIdByIconId(value);
+--+    const catId = findCategoryIdByIconId(normalizeHabitIconName(value));
+--     // value が変わったときだけ初期カテゴリを合わせる（タブ操作で強制リセットしない）
+--     setActiveCategoryId((prev) => (catId && catId !== prev ? catId : prev));
+--   }, [value]);
+-- 
+--   const activeCategory = useMemo(
+---    () => ICON_CATEGORIES.find((cat) => cat.id === activeCategoryId) ?? ICON_CATEGORIES[0],
+--+    () => HABIT_ICON_CATEGORIES.find((cat) => cat.id === activeCategoryId) ?? HABIT_ICON_CATEGORIES[0],
+--     [activeCategoryId],
+--   );
+-- 
+--@@ -113,7 +51,7 @@ export const IconPicker = memo(function IconPicker({ value, onChange }: IconPick
+--     <YStack gap="$4">
+--       {/* カテゴリタブ */}
+--       <XStack gap="$2" flexWrap="wrap" justifyContent="center">
+---        {ICON_CATEGORIES.map((cat) => {
+--+        {HABIT_ICON_CATEGORIES.map((cat) => {
+--           const isActive = cat.id === activeCategoryId;
+--           return (
+--             <Button
+--@@ -144,7 +82,7 @@ export const IconPicker = memo(function IconPicker({ value, onChange }: IconPick
+--           contentContainerStyle={{ paddingVertical: 4 }}>
+--           <XStack flexWrap="wrap" gap="$3" justifyContent="center" width="100%">
+--             {activeCategory.icons.map((opt) => {
+---              const active = value === opt.id;
+--+              const active = normalizedValue === opt.id;
+--               return (
+--                 <Stack
+--                   key={opt.id}
+--@@ -167,9 +105,11 @@ export const IconPicker = memo(function IconPicker({ value, onChange }: IconPick
+--                     width="100%"
+--                     height="100%"
+--                     onPress={() => onChange(opt.id)}>
+---                    <Text fontSize={28} textAlign="center">
+---                      {opt.emoji}
+---                    </Text>
+--+                    <Ionicons
+--+                      name={opt.id}
+--+                      size={26}
+--+                      color={active ? '#000000' : '#EEEEEE'}
+--+                    />
+--                   </Button>
+--                 </Stack>
+--               );
+-diff --git "a/20251222_1650_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251222_1650_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-deleted file mode 100644
+-index ff29ad0..0000000
+---- "a/20251222_1650_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-+++ /dev/null
+-@@ -1,58 +0,0 @@
+--diff --git a/app/index.tsx b/app/index.tsx
+--index 0278ae1..824ca1a 100644
+----- a/app/index.tsx
+--+++ b/app/index.tsx
+--@@ -1,20 +1,20 @@
+---import { useEffect, useRef, useState } from 'react';
+---import { Href, useLocalSearchParams, useRouter } from 'expo-router';
+-- import { Ionicons } from '@expo/vector-icons';
+---import { ScrollView, Stack, Text, XStack, YStack, Button, Spinner, useTheme } from 'tamagui';
+--+import { Href, useLocalSearchParams, useRouter } from 'expo-router';
+--+import { useEffect, useRef, useState } from 'react';
+-- import { useSafeAreaInsets } from 'react-native-safe-area-context';
+--+import { Button, ScrollView, Spinner, Stack, Text, useTheme, XStack, YStack } from 'tamagui';
+-- 
+--+import { useTranslation } from '@/src/core/i18n/i18n';
+-- import { HabitButton } from '@/src/features/habit/HabitButton';
+-- import { HeatmapChain } from '@/src/features/habit/HeatmapChain';
+---import { TutorialOverlay } from '@/src/features/tutorial/TutorialOverlay';
+-- import { useHabitRecord } from '@/src/features/habit/useHabitRecord';
+--+import { TutorialOverlay } from '@/src/features/tutorial/TutorialOverlay';
+-- import {
+--+  selectAllDoneDays,
+--   selectHeatmapIntensity,
+--   selectStreak,
+---  selectAllDoneDays,
+--   useHabitStore,
+-- } from '@/src/stores/habitStore';
+---import { useTranslation } from '@/src/core/i18n/i18n';
+-- import { useSettingsStore } from '@/src/stores/settingsStore';
+-- 
+-- type TutorialStep = 'none' | 'welcome' | 'pressFab' | 'pressHabit' | 'explainChain';
+--@@ -160,7 +160,7 @@ export default function HomeScreen() {
+--             {t('daysStreak')}
+--           </Text>
+--           <XStack alignItems="center" gap="$2">
+---            <Text fontSize={24}>🔥</Text>
+--+            <Ionicons name="trending-up-outline" size={44} color={neon} />
+--             <Text color={neon} fontSize={28} fontWeight="800" textAlign="center">
+--               {streak}
+--             </Text>
+--@@ -182,7 +182,7 @@ export default function HomeScreen() {
+--             {t('allDoneDays')}
+--           </Text>
+--           <XStack alignItems="center" gap="$2">
+---            <Text fontSize={24}>✅</Text>
+--+            <Ionicons name="trophy-outline" size={34} color={neon} />
+--             <Text color={neon} fontSize={28} fontWeight="800" textAlign="center">
+--               {allDoneDays}
+--             </Text>
+--@@ -255,7 +255,7 @@ export default function HomeScreen() {
+--         backgroundColor="$background"
+--         contentContainerStyle={{
+--           paddingHorizontal: 16,
+---          paddingTop: 16 + insets.top,
+--+          paddingTop: 8,
+--           paddingBottom: listPaddingBottom,
+--         }}>
+--         <YStack gap="$4">
+-diff --git "a/20251222_1905_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251222_1905_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-deleted file mode 100644
+-index 23efa20..0000000
+---- "a/20251222_1905_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-+++ /dev/null
+-@@ -1,334 +0,0 @@
+--diff --git a/app/pro/index.tsx b/app/pro/index.tsx
+--index 1eaa4f4..deb2f50 100644
+----- a/app/pro/index.tsx
+--+++ b/app/pro/index.tsx
+--@@ -2,42 +2,116 @@ import { Alert } from 'react-native';
+-- import { LinearGradient } from 'expo-linear-gradient';
+-- import { Ionicons } from '@expo/vector-icons';
+-- import { ScrollView, Stack, Text, YStack, XStack, Button, useTheme } from 'tamagui';
+--+import { useState, type ComponentProps } from 'react';
+--+import { useRouter } from 'expo-router';
+--+import { useSafeAreaInsets } from 'react-native-safe-area-context';
+-- 
+-- import { useTranslation, type TranslationKey as TKey } from '@/src/core/i18n/i18n';
+-- 
+-- type PlanType = 'monthly' | 'yearly';
+-- 
+---function PlanPriceCard({ type, onPress }: { type: PlanType; onPress: () => void }) {
+--+function BenefitItem({
+--+  icon,
+--+  title,
+--+  color,
+--+}: {
+--+  icon: ComponentProps<typeof Ionicons>['name'];
+--+  title: string;
+--+  color: string;
+--+}) {
+--+  return (
+--+    <XStack alignItems="center" gap="$3">
+--+      <Stack
+--+        width={36}
+--+        height={36}
+--+        borderRadius={10}
+--+        alignItems="center"
+--+        justifyContent="center"
+--+        backgroundColor="$surface"
+--+        borderWidth={1}
+--+        borderColor="$gray">
+--+        <Ionicons name={icon} size={18} color={color} />
+--+      </Stack>
+--+      <Text color="$text" fontSize={14} fontWeight="700">
+--+        {title}
+--+      </Text>
+--+    </XStack>
+--+  );
+--+}
+--+
+--+function CompareRow({ featureKey, freeKey, proKey }: { featureKey: TKey; freeKey: TKey; proKey: TKey }) {
+--+  const { t } = useTranslation();
+--+  return (
+--+    <XStack paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
+--+      <YStack flex={1.2}>
+--+        <Text color="$muted" fontSize={12}>
+--+          {t(featureKey)}
+--+        </Text>
+--+      </YStack>
+--+      <YStack flex={0.9}>
+--+        <Text color="$text" fontSize={12}>
+--+          {t(freeKey)}
+--+        </Text>
+--+      </YStack>
+--+      <YStack flex={0.9}>
+--+        <Text color="$neonGreen" fontSize={12}>
+--+          {t(proKey)}
+--+        </Text>
+--+      </YStack>
+--+    </XStack>
+--+  );
+--+}
+--+
+--+function PlanCard({
+--+  type,
+--+  selected,
+--+  onPress,
+--+}: {
+--+  type: PlanType;
+--+  selected: boolean;
+--+  onPress: () => void;
+--+}) {
+--   const theme = useTheme();
+--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
+--   const { t } = useTranslation();
+--   const titleKey: TKey = type === 'monthly' ? 'proPlanMonthlyTitle' : 'proPlanYearlyTitle';
+--   const priceKey: TKey = type === 'monthly' ? 'priceMonthly' : 'priceYearly';
+--   const taglineKey: TKey = type === 'monthly' ? 'proMonthlyTagline' : 'proYearlyTagline';
+---  const ctaKey: TKey = type === 'monthly' ? 'proCtaMonthly' : 'proCtaYearly';
+--   const isYearly = type === 'yearly';
+-- 
+--   return (
+--     <YStack
+--       flex={1}
+--       padding="$4"
+---      borderRadius="$4"
+---      borderWidth={1}
+---      borderColor={isYearly ? '$neonGreen' : '$gray'}
+--+      borderRadius="$6"
+--+      borderWidth={2}
+--+      borderColor={selected ? '$neonGreen' : '$gray'}
+--       backgroundColor="$surface"
+---      gap="$2">
+--+      gap="$2"
+--+      shadowColor={selected ? neon : 'transparent'}
+--+      shadowOpacity={selected ? 0.5 : 0}
+--+      shadowRadius={selected ? 16 : 0}
+--+      shadowOffset={{ width: 0, height: 6 }}
+--+      onPress={onPress}>
+--       <XStack justifyContent="space-between" alignItems="center">
+---        <Text color="$text" fontSize={16} fontWeight="700">
+--+        <Text color="$text" fontSize={16} fontWeight="800">
+--           {t(titleKey)}
+--         </Text>
+---        {isYearly && (
+---          <Text color={neon ?? '#39FF14'} fontSize={12} fontWeight="800">
+---            {t('proPlanYearlyBadge')}
+---          </Text>
+---        )}
+--+        <XStack alignItems="center" gap="$2">
+--+          {isYearly && (
+--+            <Text color={neon} fontSize={12} fontWeight="800">
+--+              {t('proPlanYearlyBadge')}
+--+            </Text>
+--+          )}
+--+          <Ionicons
+--+            name={selected ? 'checkmark-circle' : 'ellipse-outline'}
+--+            size={18}
+--+            color={selected ? neon : theme?.gray?.val?.toString() ?? '#666'}
+--+          />
+--+        </XStack>
+--       </XStack>
+-- 
+---      <Text color={neon ?? '#39FF14'} fontSize={20} fontWeight="800">
+--+      <Text color={neon} fontSize={22} fontWeight="900">
+--         {t(priceKey)}
+--       </Text>
+-- 
+--@@ -45,60 +119,34 @@ function PlanPriceCard({ type, onPress }: { type: PlanType; onPress: () => void
+--         {t(taglineKey)}
+--       </Text>
+-- 
+---      <Button
+---        marginTop="$3"
+---        borderRadius={999}
+---        backgroundColor={isYearly ? '$neonGreen' : '$surface'}
+---        borderWidth={1}
+---        borderColor="$neonGreen"
+---        onPress={onPress}
+---        iconAfter={<Ionicons name="arrow-forward" size={18} color={isYearly ? '#000' : neon} />}>
+---        <Text color={isYearly ? '#000' : neon} fontWeight="700">
+---          {t(ctaKey)}
+---        </Text>
+---      </Button>
+--     </YStack>
+--   );
+-- }
+-- 
+---function CompareRow({ featureKey, freeKey, proKey }: { featureKey: TKey; freeKey: TKey; proKey: TKey }) {
+---  const { t } = useTranslation();
+---  return (
+---    <XStack paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
+---      <YStack flex={1.2}>
+---        <Text color="$muted" fontSize={12}>
+---          {t(featureKey)}
+---        </Text>
+---      </YStack>
+---      <YStack flex={0.9}>
+---        <Text color="$text" fontSize={12}>
+---          {t(freeKey)}
+---        </Text>
+---      </YStack>
+---      <YStack flex={0.9}>
+---        <Text color="$neonGreen" fontSize={12}>
+---          {t(proKey)}
+---        </Text>
+---      </YStack>
+---    </XStack>
+---  );
+---}
+---
+-- export default function PaywallScreen() {
+--   const theme = useTheme();
+--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
+--   const bg = theme?.background?.val?.toString() ?? '#000';
+--   const { t } = useTranslation();
+--+  const router = useRouter();
+--+  const insets = useSafeAreaInsets();
+--+  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');
+--+
+--+  const handlePurchase = () => {
+--+    Alert.alert(t('proHeaderTitle'), t('proFinePrint'));
+--+  };
+-- 
+---  const handlePlan = () => {
+---    Alert.alert(t('comingSoonTitle') ?? 'Coming soon', t('paywallNote'));
+--+  const handleStayFree = () => {
+--+    if (router.canGoBack()) {
+--+      router.back();
+--+    }
+--   };
+-- 
+--   return (
+--     <Stack flex={1} backgroundColor="$background">
+--       <ScrollView
+--         flex={1}
+---        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}>
+--+        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 120 }}>
+--         {/* ヒーロー */}
+--         <YStack borderRadius="$6" overflow="hidden">
+--           <LinearGradient
+--@@ -106,9 +154,20 @@ export default function PaywallScreen() {
+--             start={{ x: 0, y: 0 }}
+--             end={{ x: 1, y: 1 }}
+--             style={{ padding: 20 }}>
+---            <Text color="#000" fontSize={22} fontWeight="800" marginBottom="$2">
+---              {t('proTitle')}
+---            </Text>
+--+            <XStack alignItems="center" gap="$3" marginBottom="$2">
+--+              <Stack
+--+                width={42}
+--+                height={42}
+--+                borderRadius={12}
+--+                alignItems="center"
+--+                justifyContent="center"
+--+                backgroundColor="#00000020">
+--+                <Ionicons name="trophy-outline" size={24} color="#000" />
+--+              </Stack>
+--+              <Text color="#000" fontSize={22} fontWeight="900">
+--+                {t('proTitle')}
+--+              </Text>
+--+            </XStack>
+--             <Text color="#000" fontSize={14} fontWeight="600" marginBottom="$3">
+--               {t('proSubtitle')}
+--             </Text>
+--@@ -118,26 +177,35 @@ export default function PaywallScreen() {
+--           </LinearGradient>
+--         </YStack>
+-- 
+--+        {/* ベネフィット */}
+--+        <YStack gap="$3" padding="$4" borderRadius="$6" backgroundColor="$surface">
+--+          <Text color="$text" fontSize={16} fontWeight="800">
+--+            {t('proCompareTitle')}
+--+          </Text>
+--+          <BenefitItem icon="infinite-outline" title={t('proFeatureUnlimited')} color={neon} />
+--+          <BenefitItem icon="color-palette-outline" title={t('proFeatureThemes')} color={neon} />
+--+        </YStack>
+--+
+--         {/* プランカード */}
+--         <XStack gap="$3">
+---          <PlanPriceCard type="monthly" onPress={handlePlan} />
+---          <PlanPriceCard type="yearly" onPress={handlePlan} />
+--+          <PlanCard
+--+            type="monthly"
+--+            selected={selectedPlan === 'monthly'}
+--+            onPress={() => setSelectedPlan('monthly')}
+--+          />
+--+          <PlanCard
+--+            type="yearly"
+--+            selected={selectedPlan === 'yearly'}
+--+            onPress={() => setSelectedPlan('yearly')}
+--+          />
+--         </XStack>
+-- 
+---        {/* 年額お得説明 */}
+--         <Text color="$neonGreen" fontSize={12} fontWeight="700">
+--           {t('proYearlySavingShort')}
+--         </Text>
+-- 
+--         {/* Free vs Pro 比較 */}
+---        <YStack gap="$2" marginTop="$3">
+---          <Text color="$text" fontSize={16} fontWeight="700">
+---            {t('proCompareTitle')}
+---          </Text>
+---          <Text color="$muted" fontSize={12}>
+---            {t('proCompareSubtitle')}
+---          </Text>
+---
+--+        <YStack gap="$2" marginTop="$2">
+--           <XStack marginTop="$2" paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
+--             <YStack flex={1.2}>
+--               <Text color="$muted" fontSize={11} fontWeight="700">
+--@@ -159,25 +227,37 @@ export default function PaywallScreen() {
+--           <CompareRow featureKey="proFeatureHabits" freeKey="proFeatureHabitsFree" proKey="proFeatureHabitsPro" />
+--           <CompareRow featureKey="proFeatureThemes" freeKey="proFeatureThemesFree" proKey="proFeatureThemesPro" />
+--         </YStack>
+--+      </ScrollView>
+-- 
+---        {/* Stay free + 注意書き */}
+---        <YStack gap="$3" marginTop="$4">
+---          <Button
+---            borderRadius={999}
+---            backgroundColor="$surface"
+---            borderWidth={1}
+---            borderColor="$gray"
+---            onPress={() => Alert.alert(t('proPlanFreeTitle'), t('paywallNote'))}>
+---            <Text color="$muted" fontWeight="600">
+---              {t('proCtaStayFree')}
+---            </Text>
+---          </Button>
+---
+---          <Text color="$muted" fontSize={10} lineHeight={14}>
+---            {t('proFinePrint')}
+--+      {/* 固定CTA */}
+--+      <YStack
+--+        padding="$4"
+--+        paddingBottom={Math.max(insets.bottom, 12)}
+--+        borderTopWidth={1}
+--+        borderColor="$gray"
+--+        backgroundColor="$background"
+--+        gap="$2">
+--+        <Button
+--+          borderRadius={999}
+--+          backgroundColor="$neonGreen"
+--+          onPress={handlePurchase}
+--+          pressStyle={{ opacity: 0.85 }}>
+--+          <Text color="#000" fontWeight="800">
+--+            {selectedPlan === 'yearly' ? t('proCtaYearly') : t('proCtaMonthly')}
+--           </Text>
+---        </YStack>
+---      </ScrollView>
+---      </Stack>
+--+        </Button>
+--+        <Text color="$muted" fontSize={10} lineHeight={14} textAlign="center">
+--+          {t('proFinePrint')}
+--+        </Text>
+--+        <Button
+--+          chromeless
+--+          onPress={handleStayFree}
+--+          accessibilityLabel={t('proCtaStayFree')}>
+--+          <Text color="$muted" fontWeight="600">
+--+            {t('proCtaStayFree')}
+--+          </Text>
+--+        </Button>
+--+      </YStack>
+--+    </Stack>
+--   );
+-- }
+-diff --git "a/20251222_2037_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251222_2037_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-deleted file mode 100644
+-index fcfb9ec..0000000
+---- "a/20251222_2037_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+-+++ /dev/null
+-@@ -1,364 +0,0 @@
+--diff --git a/app/pro/index.tsx b/app/pro/index.tsx
+--index 1eaa4f4..451520b 100644
+----- a/app/pro/index.tsx
+--+++ b/app/pro/index.tsx
+--@@ -2,62 +2,40 @@ import { Alert } from 'react-native';
+-- import { LinearGradient } from 'expo-linear-gradient';
+-- import { Ionicons } from '@expo/vector-icons';
+-- import { ScrollView, Stack, Text, YStack, XStack, Button, useTheme } from 'tamagui';
+--+import { useState, type ComponentProps } from 'react';
+--+import { useRouter } from 'expo-router';
+--+import { useSafeAreaInsets } from 'react-native-safe-area-context';
+-- 
+-- import { useTranslation, type TranslationKey as TKey } from '@/src/core/i18n/i18n';
+-- 
+-- type PlanType = 'monthly' | 'yearly';
+-- 
+---function PlanPriceCard({ type, onPress }: { type: PlanType; onPress: () => void }) {
+---  const theme = useTheme();
+---  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
+---  const { t } = useTranslation();
+---  const titleKey: TKey = type === 'monthly' ? 'proPlanMonthlyTitle' : 'proPlanYearlyTitle';
+---  const priceKey: TKey = type === 'monthly' ? 'priceMonthly' : 'priceYearly';
+---  const taglineKey: TKey = type === 'monthly' ? 'proMonthlyTagline' : 'proYearlyTagline';
+---  const ctaKey: TKey = type === 'monthly' ? 'proCtaMonthly' : 'proCtaYearly';
+---  const isYearly = type === 'yearly';
+---
+--+function BenefitItem({
+--+  icon,
+--+  title,
+--+  color,
+--+}: {
+--+  icon: ComponentProps<typeof Ionicons>['name'];
+--+  title: string;
+--+  color: string;
+--+}) {
+--   return (
+---    <YStack
+---      flex={1}
+---      padding="$4"
+---      borderRadius="$4"
+---      borderWidth={1}
+---      borderColor={isYearly ? '$neonGreen' : '$gray'}
+---      backgroundColor="$surface"
+---      gap="$2">
+---      <XStack justifyContent="space-between" alignItems="center">
+---        <Text color="$text" fontSize={16} fontWeight="700">
+---          {t(titleKey)}
+---        </Text>
+---        {isYearly && (
+---          <Text color={neon ?? '#39FF14'} fontSize={12} fontWeight="800">
+---            {t('proPlanYearlyBadge')}
+---          </Text>
+---        )}
+---      </XStack>
+---
+---      <Text color={neon ?? '#39FF14'} fontSize={20} fontWeight="800">
+---        {t(priceKey)}
+---      </Text>
+---
+---      <Text color="$muted" fontSize={12}>
+---        {t(taglineKey)}
+---      </Text>
+---
+---      <Button
+---        marginTop="$3"
+---        borderRadius={999}
+---        backgroundColor={isYearly ? '$neonGreen' : '$surface'}
+--+    <XStack alignItems="center" gap="$3" width="100%">
+--+      <Stack
+--+        width={36}
+--+        height={36}
+--+        borderRadius={10}
+--+        alignItems="center"
+--+        justifyContent="center"
+--+        backgroundColor="$surface"
+--         borderWidth={1}
+---        borderColor="$neonGreen"
+---        onPress={onPress}
+---        iconAfter={<Ionicons name="arrow-forward" size={18} color={isYearly ? '#000' : neon} />}>
+---        <Text color={isYearly ? '#000' : neon} fontWeight="700">
+---          {t(ctaKey)}
+---        </Text>
+---      </Button>
+---    </YStack>
+--+        borderColor="$gray">
+--+        <Ionicons name={icon} size={18} color={color} />
+--+      </Stack>
+--+      <Text color="$text" fontSize={14} fontWeight="700" flexShrink={1}>
+--+        {title}
+--+      </Text>
+--+    </XStack>
+--   );
+-- }
+-- 
+--@@ -84,21 +62,102 @@ function CompareRow({ featureKey, freeKey, proKey }: { featureKey: TKey; freeKey
+--   );
+-- }
+-- 
+--+function PlanCard({
+--+  type,
+--+  selected,
+--+  onPress,
+--+}: {
+--+  type: PlanType;
+--+  selected: boolean;
+--+  onPress: () => void;
+--+}) {
+--+  const theme = useTheme();
+--+  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
+--+  const { t } = useTranslation();
+--+  const titleKey: TKey = type === 'monthly' ? 'proPlanMonthlyTitle' : 'proPlanYearlyTitle';
+--+  const priceKey: TKey = type === 'monthly' ? 'priceMonthly' : 'priceYearly';
+--+  const taglineKey: TKey = type === 'monthly' ? 'proMonthlyTagline' : 'proYearlyTagline';
+--+  const isYearly = type === 'yearly';
+--+
+--+  return (
+--+    <YStack
+--+      flex={1}
+--+      padding="$4"
+--+      borderRadius="$6"
+--+      borderWidth={2}
+--+      borderColor={selected ? '$neonGreen' : '$gray'}
+--+      backgroundColor="$surface"
+--+      gap="$2"
+--+      shadowColor={selected ? neon : 'transparent'}
+--+      shadowOpacity={selected ? 0.5 : 0}
+--+      shadowRadius={selected ? 16 : 0}
+--+      shadowOffset={{ width: 0, height: 6 }}
+--+      onPress={onPress}>
+--+      <XStack justifyContent="space-between" alignItems="center" gap="$2">
+--+        <XStack alignItems="center" gap="$2" flex={1} minWidth={0} flexWrap="wrap">
+--+          <Text color="$text" fontSize={16} fontWeight="800" flexShrink={1}>
+--+            {t(titleKey)}
+--+          </Text>
+--+          {isYearly && (
+--+            <Text color={neon} fontSize={12} fontWeight="800" flexShrink={0}>
+--+              {t('proPlanYearlyBadge')}
+--+            </Text>
+--+          )}
+--+        </XStack>
+--+        <XStack alignItems="center" flexShrink={0}>
+--+          {isYearly && (
+--+            <Ionicons
+--+              name={selected ? 'checkmark-circle' : 'ellipse-outline'}
+--+              size={18}
+--+              color={selected ? neon : theme?.gray?.val?.toString() ?? '#666'}
+--+            />
+--+          )}
+--+          {!isYearly && (
+--+            <Ionicons
+--+              name={selected ? 'checkmark-circle' : 'ellipse-outline'}
+--+              size={18}
+--+              color={selected ? neon : theme?.gray?.val?.toString() ?? '#666'}
+--+            />
+--+          )}
+--+        </XStack>
+--+      </XStack>
+--+
+--+      <Text color={neon} fontSize={22} fontWeight="900">
+--+        {t(priceKey)}
+--+      </Text>
+--+
+--+      <Text color="$muted" fontSize={12}>
+--+        {t(taglineKey)}
+--+      </Text>
+--+
+--+    </YStack>
+--+  );
+--+}
+--+
+-- export default function PaywallScreen() {
+--   const theme = useTheme();
+--   const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
+--   const bg = theme?.background?.val?.toString() ?? '#000';
+--   const { t } = useTranslation();
+--+  const router = useRouter();
+--+  const insets = useSafeAreaInsets();
+--+  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');
+-- 
+---  const handlePlan = () => {
+---    Alert.alert(t('comingSoonTitle') ?? 'Coming soon', t('paywallNote'));
+--+  const handlePurchase = () => {
+--+    Alert.alert(t('proHeaderTitle'), t('proFinePrint'));
+--+  };
+--+
+--+  const handleStayFree = () => {
+--+    if (router.canGoBack()) {
+--+      router.back();
+--+    }
+--   };
+-- 
+--   return (
+--     <Stack flex={1} backgroundColor="$background">
+--       <ScrollView
+--         flex={1}
+---        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}>
+--+        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 120 }}>
+--         {/* ヒーロー */}
+--         <YStack borderRadius="$6" overflow="hidden">
+--           <LinearGradient
+--@@ -106,9 +165,20 @@ export default function PaywallScreen() {
+--             start={{ x: 0, y: 0 }}
+--             end={{ x: 1, y: 1 }}
+--             style={{ padding: 20 }}>
+---            <Text color="#000" fontSize={22} fontWeight="800" marginBottom="$2">
+--+            <XStack alignItems="center" gap="$3" marginBottom="$2">
+--+              <Stack
+--+                width={42}
+--+                height={42}
+--+                borderRadius={12}
+--+                alignItems="center"
+--+                justifyContent="center"
+--+                backgroundColor="#00000020">
+--+                <Ionicons name="trophy-outline" size={24} color="#000" />
+--+              </Stack>
+--+            <Text color="#000" fontSize={22} fontWeight="900" flexShrink={1}>
+--               {t('proTitle')}
+--             </Text>
+--+            </XStack>
+--             <Text color="#000" fontSize={14} fontWeight="600" marginBottom="$3">
+--               {t('proSubtitle')}
+--             </Text>
+--@@ -118,39 +188,48 @@ export default function PaywallScreen() {
+--           </LinearGradient>
+--         </YStack>
+-- 
+--+        {/* ベネフィット */}
+--+        <YStack gap="$3" padding="$4" borderRadius="$6" backgroundColor="$surface">
+--+          <Text color="$text" fontSize={16} fontWeight="800">
+--+            {t('proCompareTitle')}
+--+          </Text>
+--+          <BenefitItem icon="infinite-outline" title={t('proFeatureUnlimited')} color={neon} />
+--+          <BenefitItem icon="color-palette-outline" title={t('proFeatureThemes')} color={neon} />
+--+        </YStack>
+--+
+--         {/* プランカード */}
+--         <XStack gap="$3">
+---          <PlanPriceCard type="monthly" onPress={handlePlan} />
+---          <PlanPriceCard type="yearly" onPress={handlePlan} />
+--+          <PlanCard
+--+            type="monthly"
+--+            selected={selectedPlan === 'monthly'}
+--+            onPress={() => setSelectedPlan('monthly')}
+--+          />
+--+          <PlanCard
+--+            type="yearly"
+--+            selected={selectedPlan === 'yearly'}
+--+            onPress={() => setSelectedPlan('yearly')}
+--+          />
+--         </XStack>
+-- 
+---        {/* 年額お得説明 */}
+--         <Text color="$neonGreen" fontSize={12} fontWeight="700">
+--           {t('proYearlySavingShort')}
+--         </Text>
+-- 
+--         {/* Free vs Pro 比較 */}
+---        <YStack gap="$2" marginTop="$3">
+---          <Text color="$text" fontSize={16} fontWeight="700">
+---            {t('proCompareTitle')}
+---          </Text>
+---          <Text color="$muted" fontSize={12}>
+---            {t('proCompareSubtitle')}
+---          </Text>
+---
+--+        <YStack gap="$2" marginTop="$2">
+--           <XStack marginTop="$2" paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
+---            <YStack flex={1.2}>
+---              <Text color="$muted" fontSize={11} fontWeight="700">
+--+            <YStack flex={1.2} minWidth={0}>
+--+              <Text color="$muted" fontSize={11} fontWeight="700" flexShrink={1}>
+--                 {t('proCompareHeaderFeature')}
+--               </Text>
+--             </YStack>
+---            <YStack flex={0.9}>
+---              <Text color="$muted" fontSize={11} fontWeight="700">
+--+            <YStack flex={0.9} minWidth={0}>
+--+              <Text color="$muted" fontSize={11} fontWeight="700" flexShrink={1}>
+--                 {t('proCompareHeaderFree')}
+--               </Text>
+--             </YStack>
+---            <YStack flex={0.9}>
+---              <Text color="$muted" fontSize={11} fontWeight="700">
+--+            <YStack flex={0.9} minWidth={0}>
+--+              <Text color="$muted" fontSize={11} fontWeight="700" flexShrink={1}>
+--                 {t('proCompareHeaderPro')}
+--               </Text>
+--             </YStack>
+--@@ -159,25 +238,37 @@ export default function PaywallScreen() {
+--           <CompareRow featureKey="proFeatureHabits" freeKey="proFeatureHabitsFree" proKey="proFeatureHabitsPro" />
+--           <CompareRow featureKey="proFeatureThemes" freeKey="proFeatureThemesFree" proKey="proFeatureThemesPro" />
+--         </YStack>
+--+      </ScrollView>
+-- 
+---        {/* Stay free + 注意書き */}
+---        <YStack gap="$3" marginTop="$4">
+---          <Button
+---            borderRadius={999}
+---            backgroundColor="$surface"
+---            borderWidth={1}
+---            borderColor="$gray"
+---            onPress={() => Alert.alert(t('proPlanFreeTitle'), t('paywallNote'))}>
+---            <Text color="$muted" fontWeight="600">
+---              {t('proCtaStayFree')}
+---            </Text>
+---          </Button>
+---
+---          <Text color="$muted" fontSize={10} lineHeight={14}>
+---            {t('proFinePrint')}
+--+      {/* 固定CTA */}
+--+      <YStack
+--+        padding="$4"
+--+        paddingBottom={Math.max(insets.bottom, 12)}
+--+        borderTopWidth={1}
+--+        borderColor="$gray"
+--+        backgroundColor="$background"
+--+        gap="$2">
+--+        <Button
+--+          borderRadius={999}
+--+          backgroundColor="$neonGreen"
+--+          onPress={handlePurchase}
+--+          pressStyle={{ opacity: 0.85 }}>
+--+          <Text color="#000" fontWeight="800">
+--+            {selectedPlan === 'yearly' ? t('proCtaYearly') : t('proCtaMonthly')}
+--           </Text>
+---        </YStack>
+---      </ScrollView>
+---      </Stack>
+--+        </Button>
+--+        <Text color="$muted" fontSize={10} lineHeight={14} textAlign="center">
+--+          {t('proFinePrint')}
+--+        </Text>
+--+        <Button
+--+          chromeless
+--+          onPress={handleStayFree}
+--+          accessibilityLabel={t('proCtaStayFree')}>
+--+          <Text color="$muted" fontWeight="600">
+--+            {t('proCtaStayFree')}
+--+          </Text>
+--+        </Button>
+--+      </YStack>
+--+    </Stack>
+--   );
+-- }
+--diff --git a/src/features/habit/habitIcons.ts b/src/features/habit/habitIcons.ts
+--index 555045b..6015221 100644
+----- a/src/features/habit/habitIcons.ts
+--+++ b/src/features/habit/habitIcons.ts
+--@@ -69,6 +69,7 @@ export const HABIT_ICON_CATEGORIES: HabitIconCategory[] = [
+--       { id: 'walk-outline', label: 'Walk' },
+--       { id: 'moon-outline', label: 'Sleep' },
+--       { id: 'fitness-outline', label: 'Workout' },
+--+      { id: 'barbell-outline', label: 'Barbell' },
+--     ],
+--   },
+--   {
+--@@ -78,7 +79,6 @@ export const HABIT_ICON_CATEGORIES: HabitIconCategory[] = [
+--       { id: 'book-outline', label: 'Read' },
+--       { id: 'brush-outline', label: 'Art' },
+--       { id: 'tv-outline', label: 'Media' },
+---      { id: 'laptop-outline', label: 'PC work' },
+--       { id: 'school-outline', label: 'Study' },
+--       { id: 'globe-outline', label: 'Language' },
+--     ],
+diff --git "a/20251227_2131_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251227_2131_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+deleted file mode 100644
+index 22c0034..0000000
+--- "a/20251227_2131_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
++++ /dev/null
+@@ -1,5489 +0,0 @@
+-diff --git a/src/core/i18n/locales/de.ts b/src/core/i18n/locales/de.ts
+-index cde5732..b78fbee 100644
+---- a/src/core/i18n/locales/de.ts
+-+++ b/src/core/i18n/locales/de.ts
+-@@ -1,176 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'Tage in Folge',
+--    yourChain: 'Deine Kette',
+--    allDoneDays: 'Tage mit allen erledigten Gewohnheiten',
+--    settings: 'Einstellungen',
+--    hapticOff: 'Vibration aus',
+--    language: 'Sprache',
+--    sound: 'Sound',
+--    haptics: 'Vibration',
+--    theme: 'Theme',
+--    restore: 'Käufe wiederherstellen',
+--    version: 'App-Version',
+--    tapSound: 'Tippsound',
+--    click: 'Klick',
+--    pop: 'Plopp',
+--    flowEffectTitle: 'Elektrische Fluss-Animation',
+--    flowEffectHelp:
+--      'Lässt einen neonfarbenen Strom über deine Kettenlinie laufen. Ausschalten, wenn du es ruhiger magst.',
+--    heatmapRangeTitle: 'Zeitraum der Kettenanzeige',
+--    heatmapRangeHelp: 'Wähle, wie viele Tage deiner Kette auf der Heatmap angezeigt werden.',
+--    heatmapRange7: '1 Woche',
+--    heatmapRange30: '1 Monat',
+--    heatmapRange60: '2 Monate',
+--    heatmapRange180: '6 Monate',
+--    heatmapRange365: '1 Jahr',
+--    heatmapSummaryPrefix: 'Letzte ',
+--    heatmapSummarySuffix: ' Tage',
+--    heatmapAgoSuffix: ' Tage zuvor',
+--    heatmapToday: 'Heute',
+--    freeThemeNote: 'Gratis: nur Dark / Pro schaltet Neon Pink & Cyber Blue frei',
+--    proThemeNote: 'Pro-Themes werden nach dem Kauf freigeschaltet.',
+--    restoreDesc: 'Wiederherstellen (später)',
+--    licenses: 'Open-Source-Lizenzen (später)',
+--    openPro: 'DotChain Pro öffnen',
+--    heroPaywall: 'Upgrade in die Neon-Welt',
+--    priceMonthly: '$1.99 / Monat',
+--    onboardingTitle: 'Willkommen bei DotChain',
+--    onboardingBody: 'Ein Tap, starke Vibration. Lass uns die heutige Kette bauen.',
+--    start: 'Loslegen',
+--    paywallNote: 'Abrechnung und Werbung werden später hinzugefügt.',
+--    homeLoading: 'Laden...',
+--    homeAddHabitLabel: 'Gewohnheit hinzufügen',
+--    editNewHabit: 'Neue Gewohnheit',
+--    editHabitTitle: 'Gewohnheit bearbeiten',
+--    editCategoryLabel: 'Kategorie',
+--    editNameLabel: 'Name (max. 20 Zeichen)',
+--    editNamePlaceholder: 'Benenne deine Gewohnheit...',
+--    editSaveChanges: 'Änderungen speichern',
+--    editCreateHabit: 'Gewohnheit anlegen',
+--    editDeleteHabit: 'Gewohnheit löschen',
+--    proTitle: 'Entfessle deine Kette.',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'Unbegrenzte Gewohnheiten',
+--    proFeatureThemes: 'Alle Themes freigeschaltet (Neon Pink / Cyber Blue)',
+--    proFeatureAds: 'Keine Werbung',
+--    habitButtonSuffix: ' Gewohnheitsbutton',
+--    iconCatBasic: 'Basis',
+--    iconCatHealth: 'Gesundheit',
+--    iconCatLearning: 'Lernen & Arbeit',
+--    errorLoadFailed: 'Daten konnten nicht geladen werden',
+--    errorTitleRequired: 'Titel ist erforderlich.',
+--    errorTitleTooLong: 'Der Titel darf höchstens 20 Zeichen haben.',
+--    errorSaveFailed: 'Speichern fehlgeschlagen.',
+--    errorDeleteFailed: 'Löschen fehlgeschlagen.',
+--    errorToggleFailed: 'Aktualisierung fehlgeschlagen.',
+--    habitLimitTitle: 'Limit des Gratis-Tarifs',
+--    habitLimitBody: 'Im Gratis-Tarif kannst du bis zu 3 Gewohnheiten erstellen.',
+--    hapticsDescription: 'Haptisches Feedback',
+--    reminderSectionTitle: 'Erinnerungsbenachrichtigung',
+--    reminderToggleLabel: 'Erinnerung verwenden',
+--    reminderTimeLabel: 'Benachrichtigungszeit',
+--    reminderNotificationBody: 'Zeit, deine Kette aufzubauen.',
+--    streak7Title: '7-Tage-Serie!',
+--    streak7Message: 'Du hast deine Kette eine ganze Woche gehalten. Super!',
+--    ok: 'OK',
+--    languageChange: 'Sprache ändern',
+--    currentLanguage: 'Aktuell',
+--    languageNameEn: 'Englisch',
+--    languageNameJa: 'Japanisch',
+--    languageNameFr: 'Französisch',
+--    languageNameEs: 'Spanisch',
+--    languageNameDe: 'Deutsch',
+--    languageNameIt: 'Italienisch',
+--    languageNamePt: 'Portugiesisch',
+--    languageNameRu: 'Russisch',
+--    languageNameZh: 'Chinesisch',
+--    languageNameKo: 'Koreanisch',
+--    languageNameHi: 'Hindi',
+--    languageNameId: 'Indonesisch',
+--    languageNameTh: 'Thailändisch',
+--    languageNameVi: 'Vietnamesisch',
+--    languageNameMs: 'Malaiisch',
+--    languageNameTr: 'Türkisch',
+--    languageNameNl: 'Niederländisch',
+--    languageNameSv: 'Schwedisch',
+--    soundSwitchLabel: 'Ton einschalten',
+--    tapSoundLabel: 'Tippgeräusch-Stil',
+--    proOnlyTitle: 'Nur für Pro',
+--    proOnlyTheme: 'Dieses Theme ist nur mit Pro verfügbar.',
+--
+--    // Fehlende Keys ergänzt für vollständige de-Lokalisierung
+--    cancel: 'Abbrechen',
+--    delete: 'Löschen',
+--    deleteConfirmBody: 'Möchtest du wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
+--    comingSoonTitle: 'Bald verfügbar',
+--    onboardingPunch: 'Das ist DotChain.',
+--
+--    paywallBestValueBadge: 'Bestes Preis-Leistungs-Verhältnis',
+--    paywallMonthlyLabel: 'Monatsplan',
+--    paywallMonthlySub: 'Monatliche Abrechnung. Jederzeit kündbar.',
+--    paywallYearlyLabel: 'Jahresplan',
+--    paywallYearlySub: 'Jährliche Abrechnung. Jederzeit kündbar.',
+--
+--    priceFree: '$0 / für immer',
+--    priceYearly: '$14.99 / Jahr',
+--
+--    proCompareHeaderFeature: 'Funktion',
+--    proCompareHeaderFree: 'Gratis',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      'Du kannst immer im Gratis-Plan bleiben. Pro entfernt nur die Grenzen.',
+--    proCompareTitle: 'Das bekommst du mit Pro',
+--
+--    proCtaMonthly: 'Pro monatlich holen',
+--    proCtaStayFree: 'Beim Gratis-Plan bleiben',
+--    proCtaYearly: 'Pro jährlich holen',
+--
+--    proFeatureAdsFree: 'Bannerwerbung unten',
+--    proFeatureAdsPro: 'Keine Werbung, voller Fokus',
+--    proFeatureHabits: 'Gewohnheiten, die du verfolgen kannst',
+--    proFeatureHabitsFree: 'Bis zu 3 Gewohnheiten',
+--    proFeatureHabitsPro: 'Unbegrenzte Gewohnheiten',
+--    proFeatureThemesFree: '1 Theme (Dark)',
+--    proFeatureThemesPro: 'Alle Themes freigeschaltet',
+--
+--    proFinePrint:
+--      'Das Abo verlängert sich automatisch. Du kannst es jederzeit in den Kontoeinstellungen von App Store oder Google Play kündigen.',
+--    proMonthlyTagline: 'Starte klein, kündige jederzeit.',
+--    proPlanFreeTitle: 'Gratis',
+--    proPlanMonthlyTitle: 'Monatlich',
+--    proPlanYearlyBadge: 'Bestes Preis-Leistungs-Verhältnis',
+--    proPlanYearlyTitle: 'Jährlich',
+--    proSubtitle: 'Gehe über 3 Gewohnheiten hinaus und mache deine Punkte unaufhaltsam.',
+--    proYearlySavingShort: 'Spare etwa 37 % (wie 8 Monate gratis).',
+--    proYearlyTagline: 'Für alle, die ihre Kette ernst nehmen.',
+--
+--    restoreSoon: 'Die Wiederherstellung von Käufen wird in einem kommenden Update hinzugefügt.',
+--
+--    themeCyberBlueLabel: 'Cyber-Blau',
+--    themeDarkLabel: 'Dunkel',
+--    themeDesc: 'Wähle die Stimmung der App. (Pro-Themes kommen später.)',
+--    themeNeonPinkLabel: 'Neon Pink',
+--
+--    tutorialEditIconBody:
+--      'Wähle zuerst ein Icon, das zu deiner Gewohnheit passt.',
+--    tutorialEditNameBody:
+--      'Gib als Nächstes einen Namen für deine Gewohnheit ein.\nZum Beispiel: „Wasser trinken“, „Buch lesen“.',
+--    tutorialEditSubmitBody:
+--      'Fertig!\nTippe unten auf den Erstellen-Button, um diese Gewohnheit zum Startbildschirm hinzuzufügen.',
+--    tutorialExplainChainBody:
+--      'Durch das Tippen steigt deine TAGE-IN-FOLGE-Anzahl und heute wird in DEINER KETTE hervorgehoben.\nMach weiter, um deine Kette zu verlängern.',
+--    tutorialGotIt: 'Verstanden',
+--    tutorialNext: 'Weiter',
+--    tutorialPressFabBody:
+--      'Tippe unten rechts auf den +-Button, um deine erste Gewohnheit zu erstellen.',
+--    tutorialPressHabitBody:
+--      'Tippe jetzt auf die Gewohnheit, die du gerade erstellt hast.\nDurch Tippen markierst du heute als „erledigt“.',
+--    tutorialStart: 'Starten',
+--    tutorialWelcomeBody:
+--      'Willkommen!\nMit DotChain baust du deine Gewohnheitskette.\nBeginne, indem du deine erste Gewohnheit mit dem +-Button erstellst.',
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム画面のヘッダー) ---
+-+  daysStreak: 'TAGE IN FOLGE',       // 英語: DAYS STREAK
+-+  yourChain: 'DEINE KETTE',          // 英語: YOUR CHAIN
+-+  allDoneDays: 'TAGE KOMPLETT',      // 英語: ALL DONE DAYS (「完了した日」を短く表現)
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: 'Einstellungen',         // 設定
+-+  hapticOff: 'Vibration aus',        // 振動オフ
+-+  language: 'Sprache',               // 言語
+-+  sound: 'Ton',                      // 音
+-+  haptics: 'Haptik',                 // 触覚フィードバック
+-+  theme: 'Design',                   // テーマ（ドイツ語ではDesignもよく使われます）
+-+
+-+  // --- Purchase / Restore (課金・復元) ---
+-+  restore: 'Käufe wiederherstellen', // 購入の復元
+-+  purchaseSuccess: 'Pro-Plan ist jetzt aktiv.', // 購入成功
+-+  purchaseFailed: 'Kauf fehlgeschlagen. Bitte später erneut versuchen.', // 購入失敗
+-+  restoreSuccess: 'Kaufhistorie wiederhergestellt.', // 復元成功
+-+  restoreNotFound: 'Keine Käufe zum Wiederherstellen gefunden.', // 復元データなし
+-+  restoreFailed: 'Wiederherstellung fehlgeschlagen.', // 復元失敗
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: 'App-Version',            // アプリバージョン
+-+  tapSound: 'Tipp-Sound',            // タップ音
+-+  click: 'Klick',                    // カチッ
+-+  pop: 'Pop',                        // ポップ
+-+  soundSwitchLabel: 'Soundeffekte',  // 効果音
+-+
+-+  // --- Pro Screen (Paywall) (課金画面) ---
+-+  proTitle: 'Entfessle deine Kette.', // 英語: Unlock your chain. (直訳より「解き放つ」感じ)
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: 'Mehr als 3 Gewohnheiten: Mach deine Punkte unaufhaltsam.',
+-+  proPlanFreeTitle: 'Gratis',        // 無料
+-+  proPlanMonthlyTitle: 'Monatlich',  // 月額
+-+  proPlanYearlyTitle: 'Jährlich',    // 年額
+-+  proPlanYearlyBadge: 'Beste Wahl',  // 英語: Best value (ベストな選択)
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '0 € / für immer',      // ずっと0円
+-+  proOnlyTitle: 'Pro-Funktion',      // Pro限定機能
+-+  proOnlyTheme: 'Wechsle zu Pro, um dieses Design zu nutzen.',
+-+  openPro: 'Pro-Plan ansehen',       // Proプランを見る
+-+  cancel: 'Abbrechen',               // キャンセル
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: 'Elektrische Fluss-Animation',
+-+  flowEffectHelp:
+-+    'Lass einen Neon-Strom entlang deiner Kette fließen. Schalte es aus, wenn du es ruhiger magst.',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップの表示期間) ---
+-+  heatmapRangeTitle: 'Anzeigezeitraum der Kette',
+-+  heatmapRangeHelp: 'Wähle, wie viele Tage deiner Kette auf der Startseite angezeigt werden.',
+-+  heatmapRange7: '1 Woche',
+-+  heatmapRange30: '1 Monat',
+-+  heatmapRange60: '2 Monate',
+-+  heatmapRange90: '3 Monate',
+-+  heatmapRange180: '6 Monate',
+-+  heatmapRange365: '1 Jahr',
+-+  heatmapSummaryPrefix: 'Letzte ',
+-+  heatmapSummarySuffix: ' Tage',
+-+  heatmapAgoSuffix: ' Tage her',
+-+  heatmapToday: 'Heute',             // 今日
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: 'Ändere das Erscheinungsbild der App.',
+-+  themeDarkLabel: 'Dunkel',          // Dark
+-+  themeNeonPinkLabel: 'Neon Pink',
+-+  themeCyberBlueLabel: 'Cyber Blau',
+-+  freeThemeNote: 'Gratis: Nur Dunkel / Pro schaltet Neon Pink & Cyber Blau frei',
+-+  proThemeNote: 'Pro-Designs sind bald verfügbar.',
+-+
+-+  // --- Habit Management (習慣の管理) ---
+-+  newHabitTitle: 'Neue Gewohnheit',
+-+  editHabitTitle: 'Gewohnheit bearbeiten',
+-+  habitNameLabel: 'Name',
+-+  habitNamePlaceholder: 'z. B. Buch lesen, Wasser trinken',
+-+  habitIconLabel: 'Icon',
+-+  deleteHabit: 'Diese Gewohnheit löschen',
+-+  deleteConfirmationTitle: 'Gewohnheit löschen?',
+-+  deleteConfirmationMessage: 'Diese Aktion kann nicht rückgängig gemacht werden. Der gesamte Verlauf geht verloren.',
+-+  save: 'Speichern',
+-+  create: 'Erstellen',
+-+
+-+  // --- Icon Categories & Labels (アイコンのカテゴリとラベル) ---
+-+  iconCatBasic: 'Basis',
+-+  iconCatHealth: 'Gesundheit',
+-+  iconCatLearning: 'Lernen',         // 英語: Learning
+-+
+-+  iconLabelStreak: 'Serie',          // Streak (連続)
+-+  iconLabelTask: 'Aufgabe',          // Task
+-+  iconLabelShine: 'Glanz',           // Shine
+-+  iconLabelClean: 'Putzen',          // Clean
+-+  iconLabelLaundry: 'Wäsche',        // Laundry
+-+  iconLabelWater: 'Wasser',          // Water
+-+  iconLabelWalk: 'Gehen',            // Walk
+-+  iconLabelSleep: 'Schlaf',          // Sleep
+-+  iconLabelWorkout: 'Training',      // Workout
+-+  iconLabelBarbell: 'Hantel',        // Barbell
+-+  iconLabelRead: 'Lesen',            // Read
+-+  iconLabelArt: 'Kunst',             // Art
+-+  iconLabelMedia: 'Medien',          // Media
+-+  iconLabelStudy: 'Lernen',          // Study
+-+  iconLabelLanguage: 'Sprache',      // Language
+-+
+-+  // --- Misc / Errors (その他・エラー) ---
+-+  habitButtonSuffix: ' Gewohnheits-Button', // アクセシビリティ用
+-+  errorLoadFailed: 'Daten konnten nicht geladen werden.',
+-+  errorTitleRequired: 'Titel ist erforderlich.',
+-+  errorTitleTooLong: 'Der Titel darf maximal 20 Zeichen lang sein.',
+-+  errorSaveFailed: 'Speichern fehlgeschlagen.',
+-+  errorDeleteFailed: 'Löschen fehlgeschlagen.',
+-+  errorToggleFailed: 'Update fehlgeschlagen.',
+-+  habitLimitTitle: 'Limit des kostenlosen Plans',
+-+  habitLimitBody: 'Im kostenlosen Plan kannst du bis zu 3 Gewohnheiten erstellen.',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: 'Haptisches Feedback (Vibration)',
+-+
+-+  // --- Reminder (リマインダー・通知) ---
+-+  reminderSectionTitle: 'Erinnerung',
+-+  reminderToggleLabel: 'Erinnerung nutzen',
+-+  reminderTimeLabel: 'Benachrichtigungszeit',
+-+  reminderNotificationBody: 'Es ist Zeit, deine Kette zu bauen!',
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: '7-Tage-Serie!',
+-+  streak7Message: 'Du hast deine Kette eine ganze Woche gehalten. Super Arbeit!',
+-+  ok: 'Spitze',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: 'Sprache ändern',
+-+  currentLanguage: 'Aktuell',
+-+  languageNameEn: 'Englisch',
+-+  languageNameJa: 'Japanisch',
+-+  languageNameFr: 'Französisch',
+-+  languageNameEs: 'Spanisch',
+-+  languageNameDe: 'Deutsch',
+-+  languageNameIt: 'Italienisch',
+-+  languageNamePt: 'Portugiesisch',
+-+  languageNameRu: 'Russisch',
+-+  languageNameZh: 'Chinesisch',
+-+  languageNameKo: 'Koreanisch',
+-+  languageNameHi: 'Hindi',
+-+  languageNameId: 'Indonesisch',
+-+  languageNameTh: 'Thailändisch',
+-+  languageNameVi: 'Vietnamesisch',
+-+  languageNameMs: 'Malaiisch',
+-+  languageNameTr: 'Türkisch',
+-+  languageNameNl: 'Niederländisch',
+-+  languageNameSv: 'Schwedisch',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: 'Weiter',
+-+  tutorialWelcome: 'Willkommen bei DotChain',
+-+  tutorialDesc1: 'Verbinde deine täglichen Gewohnheiten und baue deine eigene Kette.',
+-+  tutorialDesc2: 'Unterbrich die Kette nicht, damit die Gewohnheit bleibt.',
+-+  tutorialStart: 'Loslegen',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/en.ts b/src/core/i18n/locales/en.ts
+-index a495f84..b3d3247 100644
+---- a/src/core/i18n/locales/en.ts
+-+++ b/src/core/i18n/locales/en.ts
+-@@ -1,24 +1,35 @@
+- const baseEn = {
+-+  // --- Home / Header ---
+-   daysStreak: 'DAYS STREAK',
+-   yourChain: 'YOUR CHAIN',
+-   allDoneDays: 'ALL DONE DAYS',
+-+
+-+  // --- Settings (General) ---
+-   settings: 'Settings',
+-   hapticOff: 'Haptics off',
+-   language: 'Language',
+-   sound: 'Sound',
+-   haptics: 'Haptics',
+-   theme: 'Theme',
+--  restore: 'Restore Purchase',
+-+
+-+  // --- Purchase / Restore ---
+-+  restore: 'Restore Purchases',
+-   purchaseSuccess: 'Pro plan is now active.',
+-   purchaseFailed: 'Purchase failed. Please try again later.',
+-   restoreSuccess: 'Purchase history restored.',
+-   restoreNotFound: 'No purchases were found to restore.',
+-   restoreFailed: 'Failed to restore purchases.',
+-+
+-+  // --- Settings (Sound & Info) ---
+-   version: 'App Version',
+-   tapSound: 'Tap sound',
+-   click: 'Click',
+-   pop: 'Pop',
+--  // Paywall / Pro Screen
+-+  soundSwitchLabel: 'Sound Effects',
+-+
+-+  // --- Pro Screen (Paywall) ---
+-+  proTitle: 'Unlock your chain.',
+-+  proHeaderTitle: 'DotChain Pro',
+-   proSubtitle: 'Go beyond 3 habits and make your dots unstoppable.',
+-   proPlanFreeTitle: 'Free',
+-   proPlanMonthlyTitle: 'Monthly',
+-@@ -26,100 +37,55 @@ const baseEn = {
+-   proPlanYearlyBadge: 'Best value',
+-   proBadgeShort: 'PRO',
+-   priceFree: '$0 / forever',
+-+  proOnlyTitle: 'Pro Feature',
+-+  proOnlyTheme: 'Upgrade to Pro to use this theme.',
+-+  openPro: 'View Pro Plan',
+-+  cancel: 'Cancel',
+-+
+-+  // --- Settings (Appearance) ---
+-   flowEffectTitle: 'Electric flow animation',
+-   flowEffectHelp:
+-     'Let a neon electric flow run along your chain line. Turn this off if you prefer a calmer look.',
+--  // Heatmap range
+-+
+-+  // --- Heatmap Range (Settings) ---
+-   heatmapRangeTitle: 'Chain display range',
+-   heatmapRangeHelp: 'Choose how many days of your chain to show in the home heatmap.',
+-   heatmapRange7: '1 week',
+-   heatmapRange30: '1 month',
+-   heatmapRange60: '2 months',
+-+  heatmapRange90: '3 months',
+-   heatmapRange180: '6 months',
+-   heatmapRange365: '1 year',
+--  heatmapSummaryPrefix: 'Past ',
+-+  heatmapSummaryPrefix: 'Last ',
+-   heatmapSummarySuffix: ' days',
+-   heatmapAgoSuffix: ' days ago',
+-   heatmapToday: 'Today',
+--  priceMonthly: '$1.99 / month',
+--  priceYearly: '$14.99 / year',
+--  proMonthlyTagline: 'Start small, cancel anytime.',
+--  proYearlyTagline: 'For serious chain builders.',
+--  proYearlySavingShort: 'Save about 37% (like 8 months free).',
+--  proCompareTitle: 'What you get with Pro',
+--  proCompareSubtitle: 'You can always stay on Free. Pro just removes the limits.',
+--  proCompareHeaderFeature: 'Feature',
+--  proCompareHeaderFree: 'Free',
+--  proCompareHeaderPro: 'Pro',
+--  proFeatureHabits: 'Habits you can track',
+--  proFeatureHabitsFree: 'Up to 3 habits',
+--  proFeatureHabitsPro: 'Unlimited habits',
+--  proFeatureThemesFree: '1 theme (Dark)',
+--  proFeatureThemesPro: 'All themes unlocked',
+--  proFeatureAdsFree: '',
+--  proFeatureAdsPro: '',
+--  proOnlyTitle: 'Pro only feature',
+--  proOnlyTheme: 'This theme is available with Pro.',
+--  proCtaYearly: 'Get Yearly Pro',
+--  proCtaMonthly: 'Get Monthly Pro',
+--  proCtaStayFree: 'Continue with Free',
+--  proFinePrint:
+--    'Subscription renews automatically. You can cancel anytime in your App Store or Google Play account settings.',
+--  paywallMonthlyLabel: 'Monthly plan',
+--  paywallYearlyLabel: 'Yearly plan',
+--  paywallBestValueBadge: 'Best value',
+--  paywallYearlySub: 'Billed once a year. Cancel anytime.',
+--  paywallMonthlySub: 'Billed every month. Cancel anytime.',
+--  comingSoonTitle: 'Coming soon',
+--  // Theme labels
+-+
+-+  // --- Themes ---
+-+  themeDesc: 'Change the appearance of the app.',
+-   themeDarkLabel: 'Dark',
+-   themeNeonPinkLabel: 'Neon Pink',
+-   themeCyberBlueLabel: 'Cyber Blue',
+--  themeDesc: 'Pick your vibe. (Pro themes are coming later.)',
+--  restoreSoon: 'Restore purchase will be added in a future update.',
+--  freeThemeNote: 'Free: Dark only / Pro unlocks Neon Pink, Cyber Blue',
+--  proThemeNote: 'Pro themes unlock after paywall implementation.',
+--  restoreDesc: 'Restore purchases made on this account.',
+--  licenses: 'Open Source Licenses (later)',
+--  openPro: 'Open DotChain Pro',
+--  heroPaywall: 'Upgrade to neon world',
+--  onboardingTitle: 'Welcome to DotChain',
+--  onboardingBody: 'One tap, heavy haptics. Let’s build today’s chain.',
+--  onboardingPunch: 'This is DotChain.',
+--  start: 'Get started',
+--  paywallNote: 'Billing/Ads will be added later.',
+--  // --- Tutorial / Onboarding flow ---
+--  tutorialWelcomeBody:
+--    'Welcome!\nDotChain lets you build your habit chain.\nStart by creating your first habit from the + button.',
+--  tutorialPressFabBody: 'Tap the + button at the bottom-right to create your first habit.',
+--  tutorialPressHabitBody: 'Now tap the habit you just created.\nTapping marks today as "done".',
+--  tutorialExplainChainBody:
+--    'By tapping, your DAYS STREAK increased and today lit up on YOUR CHAIN.\nKeep going to extend your chain.',
+--  tutorialEditIconBody: 'First, pick an icon that matches your habit.',
+--  tutorialEditNameBody: 'Next, enter a name for your habit.\nFor example: "Drink water", "Read a book".',
+--  tutorialEditSubmitBody: 'You are ready!\nTap the create button below to add this habit to your home screen.',
+--  tutorialNext: 'Next',
+--  tutorialStart: 'Start',
+--  tutorialGotIt: 'Got it',
+--  // --- Home ---
+--  homeLoading: 'Loading...',
+--  homeAddHabitLabel: 'Add habit',
+--  // --- Edit ---
+--  editNewHabit: 'New Habit',
+-+  freeThemeNote: 'Free: Dark only / Pro unlocks Neon Pink & Cyber Blue',
+-+  proThemeNote: 'Pro themes will be available soon.',
+-+
+-+  // --- Habit Management ---
+-+  newHabitTitle: 'New Habit',
+-   editHabitTitle: 'Edit Habit',
+--  editCategoryLabel: 'Category',
+--  editNameLabel: 'Name (max 20 characters)',
+--  editNamePlaceholder: 'Name your habit...',
+--  editSaveChanges: 'Save Changes',
+--  editCreateHabit: 'Create Habit',
+--  editDeleteHabit: 'Delete Habit',
+--  deleteConfirmBody: 'Are you sure? This action cannot be undone.',
+--  cancel: 'Cancel',
+--  delete: 'Delete',
+--  // Icon categories
+-+  habitNameLabel: 'Name',
+-+  habitNamePlaceholder: 'e.g. Read a book, Drink water',
+-+  habitIconLabel: 'Icon',
+-+  deleteHabit: 'Delete this habit',
+-+  deleteConfirmationTitle: 'Delete habit?',
+-+  deleteConfirmationMessage: 'This action cannot be undone. All history will be lost.',
+-+  save: 'Save',
+-+  create: 'Create',
+-+
+-+  // --- Icon Categories & Labels ---
+-   iconCatBasic: 'Basic',
+-   iconCatHealth: 'Health',
+--  iconCatLearning: 'Learning & Work',
+-+  iconCatLearning: 'Learning',
+-+
+-   iconLabelStreak: 'Streak',
+-   iconLabelTask: 'Task',
+-   iconLabelShine: 'Shine',
+-@@ -135,16 +101,10 @@ const baseEn = {
+-   iconLabelMedia: 'Media',
+-   iconLabelStudy: 'Study',
+-   iconLabelLanguage: 'Language',
+--  // --- Pro ---
+--  proTitle: 'Unlock your chain.',
+--  proHeaderTitle: 'DotChain Pro',
+--  proFeatureUnlimited: 'Unlimited habits',
+--  proFeatureThemes: 'All themes unlocked (Neon Pink / Cyber Blue)',
+--  proFeatureAds: '',
+--  // --- Accessibility ---
+-+
+-+  // --- Misc / Errors ---
+-   habitButtonSuffix: ' habit button',
+--  // --- Errors ---
+--  errorLoadFailed: 'Failed to load data',
+-+  errorLoadFailed: 'Failed to load data.',
+-   errorTitleRequired: 'Title is required.',
+-   errorTitleTooLong: 'Title must be 20 characters or less.',
+-   errorSaveFailed: 'Failed to save.',
+-@@ -152,17 +112,21 @@ const baseEn = {
+-   errorToggleFailed: 'Failed to update record.',
+-   habitLimitTitle: 'Free plan limit',
+-   habitLimitBody: 'On the free plan you can create up to 3 habits.',
+-+
+-   // --- Settings description ---
+--  hapticsDescription: 'Haptic feedback',
+-+  hapticsDescription: 'Haptic feedback (vibration)',
+-+
+-   // --- Reminder ---
+--  reminderSectionTitle: 'Reminder notification',
+-+  reminderSectionTitle: 'Reminder',
+-   reminderToggleLabel: 'Use reminder',
+-   reminderTimeLabel: 'Notification time',
+--  reminderNotificationBody: 'Time to build your chain.',
+-+  reminderNotificationBody: 'It’s time to build your chain!',
+-+
+-   // --- Review (7-day streak) ---
+-   streak7Title: '7-day streak!',
+-   streak7Message: 'You have kept your chain for a full week. Great job!',
+--  ok: 'OK',
+-+  ok: 'Awesome',
+-+
+-   // --- Language labels ---
+-   languageChange: 'Change language',
+-   currentLanguage: 'Current',
+-@@ -184,10 +148,13 @@ const baseEn = {
+-   languageNameTr: 'Turkish',
+-   languageNameNl: 'Dutch',
+-   languageNameSv: 'Swedish',
+--  // --- Sound labels ---
+--  soundSwitchLabel: 'Enable sound',
+--  tapSoundLabel: 'Tap sound style',
+-+
+-+  // --- Tutorial ---
+-+  tutorialNext: 'Next',
+-+  tutorialWelcome: 'Welcome to DotChain',
+-+  tutorialDesc1: 'Connect your daily habits and build your own chain.',
+-+  tutorialDesc2: 'Don’t break the chain to make habits stick.',
+-+  tutorialStart: 'Get Started',
+- };
+- 
+--export type TranslationKey = keyof typeof baseEn;
+--export default baseEn;
+-+export default baseEn;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/es.ts b/src/core/i18n/locales/es.ts
+-index ec2e40b..26b4bfd 100644
+---- a/src/core/i18n/locales/es.ts
+-+++ b/src/core/i18n/locales/es.ts
+-@@ -1,175 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'DÍAS SEGUIDOS',
+--    yourChain: 'TU CADENA',
+--    allDoneDays: 'DÍAS COMPLETADOS',
+--    settings: 'Ajustes',
+--    hapticOff: 'Vibración desactivada',
+--    language: 'Idioma',
+--    sound: 'Sonido',
+--    haptics: 'Vibración',
+--    theme: 'Tema',
+--    restore: 'Restaurar compras',
+--    version: 'Versión de la app',
+--    tapSound: 'Sonido de toque',
+--    click: 'Clic',
+--    pop: 'Pop',
+--    flowEffectTitle: 'Animación de flujo eléctrico',
+--    flowEffectHelp:
+--      'Haz que un flujo de neón recorra la línea de tu cadena. Apágalo si prefieres una vista más tranquila.',
+--    heatmapRangeTitle: 'Periodo de visualización de la cadena',
+--    heatmapRangeHelp: 'Elige cuántos días de tu cadena mostrar en el mapa de calor del inicio.',
+--    heatmapRange7: '1 semana',
+--    heatmapRange30: '1 mes',
+--    heatmapRange60: '2 meses',
+--    heatmapRange180: '6 meses',
+--    heatmapRange365: '1 año',
+--    heatmapSummaryPrefix: 'Últimos ',
+--    heatmapSummarySuffix: ' días',
+--    heatmapAgoSuffix: ' días atrás',
+--    heatmapToday: 'Hoy',
+--    freeThemeNote: 'Gratis: solo Dark / Pro desbloquea Neon Pink y Cyber Blue',
+--    proThemeNote: 'Los temas Pro se activarán después del pago.',
+--    restoreDesc: 'Restaurar compras (más adelante)',
+--    licenses: 'Licencias de código abierto (más adelante)',
+--    openPro: 'Abrir DotChain Pro',
+--    heroPaywall: 'Actualiza al mundo neón',
+--    priceMonthly: '$1.99 / mes',
+--    onboardingTitle: 'Bienvenido a DotChain',
+--    onboardingBody: 'Un toque, vibración fuerte. Construyamos la cadena de hoy.',
+--    start: 'Empezar',
+--    paywallNote: 'La facturación y los anuncios se añadirán más adelante.',
+--    homeLoading: 'Cargando...',
+--    homeAddHabitLabel: 'Añadir hábito',
+--    editNewHabit: 'Nuevo hábito',
+--    editHabitTitle: 'Editar hábito',
+--    editCategoryLabel: 'Categoría',
+--    editNameLabel: 'Nombre (máx 20 caracteres)',
+--    editNamePlaceholder: 'Pon nombre a tu hábito...',
+--    editSaveChanges: 'Guardar cambios',
+--    editCreateHabit: 'Crear hábito',
+--    editDeleteHabit: 'Eliminar hábito',
+--    proTitle: 'Desbloquea tu cadena.',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'Hábitos ilimitados',
+--    proFeatureThemes: 'Todos los temas desbloqueados (Neon Pink / Cyber Blue)',
+--    proFeatureAds: 'Sin anuncios',
+--    habitButtonSuffix: ' botón de hábito',
+--    iconCatBasic: 'Básico',
+--    iconCatHealth: 'Salud',
+--    iconCatLearning: 'Aprendizaje y Trabajo',
+--    errorLoadFailed: 'Error al cargar datos',
+--    errorTitleRequired: 'El título es obligatorio.',
+--    errorTitleTooLong: 'El título debe tener 20 caracteres o menos.',
+--    errorSaveFailed: 'Error al guardar.',
+--    errorDeleteFailed: 'Error al eliminar.',
+--    errorToggleFailed: 'Error al actualizar.',
+--    habitLimitTitle: 'Límite del plan gratuito',
+--    habitLimitBody: 'En el plan gratuito puedes crear hasta 3 hábitos.',
+--    hapticsDescription: 'Retroalimentación háptica',
+--    reminderSectionTitle: 'Notificación de recordatorio',
+--    reminderToggleLabel: 'Usar recordatorio',
+--    reminderTimeLabel: 'Hora de notificación',
+--    reminderNotificationBody: 'Es hora de construir tu cadena.',
+--    streak7Title: '¡Racha de 7 días!',
+--    streak7Message: 'Has mantenido tu cadena durante una semana completa. ¡Excelente!',
+--    ok: 'OK',
+--    languageChange: 'Cambiar idioma',
+--    currentLanguage: 'Actual',
+--    languageNameEn: 'Inglés',
+--    languageNameJa: 'Japonés',
+--    languageNameFr: 'Francés',
+--    languageNameEs: 'Español',
+--    languageNameDe: 'Alemán',
+--    languageNameIt: 'Italiano',
+--    languageNamePt: 'Portugués',
+--    languageNameRu: 'Ruso',
+--    languageNameZh: 'Chino',
+--    languageNameKo: 'Coreano',
+--    languageNameHi: 'Hindi',
+--    languageNameId: 'Indonesio',
+--    languageNameTh: 'Tailandés',
+--    languageNameVi: 'Vietnamita',
+--    languageNameMs: 'Malayo',
+--    languageNameTr: 'Turco',
+--    languageNameNl: 'Neerlandés',
+--    languageNameSv: 'Sueco',
+--    soundSwitchLabel: 'Activar sonido',
+--    tapSoundLabel: 'Estilo del sonido de toque',
+--    proOnlyTitle: 'Función solo Pro',
+--    proOnlyTheme: 'Este tema está disponible con Pro.',
+--
+--    // --- Nuevos keys para cobertura completa ---
+--    cancel: 'Cancelar',
+--    delete: 'Eliminar',
+--    deleteConfirmBody: '¿Seguro que quieres eliminarlo? Esta acción no se puede deshacer.',
+--    comingSoonTitle: 'Próximamente',
+--    onboardingPunch: 'Esto es DotChain.',
+--
+--    paywallBestValueBadge: 'Mejor oferta',
+--    paywallMonthlyLabel: 'Plan mensual',
+--    paywallMonthlySub: 'Se factura cada mes. Puedes cancelar en cualquier momento.',
+--    paywallYearlyLabel: 'Plan anual',
+--    paywallYearlySub: 'Se factura una vez al año. Puedes cancelar en cualquier momento.',
+--
+--    priceFree: '$0 / para siempre',
+--    priceYearly: '$14.99 / año',
+--
+--    proCompareHeaderFeature: 'Función',
+--    proCompareHeaderFree: 'Gratis',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      'Siempre puedes quedarte en el plan Gratis. Pro solo quita los límites.',
+--    proCompareTitle: 'Lo que obtienes con Pro',
+--
+--    proCtaMonthly: 'Obtener Pro mensual',
+--    proCtaStayFree: 'Seguir con la versión gratuita',
+--    proCtaYearly: 'Obtener Pro anual',
+--
+--    proFeatureAdsFree: 'Banners de anuncios en la parte inferior',
+--    proFeatureAdsPro: 'Sin anuncios, máxima concentración',
+--    proFeatureHabits: 'Hábitos que puedes seguir',
+--    proFeatureHabitsFree: 'Hasta 3 hábitos',
+--    proFeatureHabitsPro: 'Hábitos ilimitados',
+--    proFeatureThemesFree: '1 tema (Dark)',
+--    proFeatureThemesPro: 'Todos los temas desbloqueados',
+--
+--    proFinePrint:
+--      'La suscripción se renueva automáticamente. Puedes cancelarla en cualquier momento desde los ajustes de tu cuenta de App Store o Google Play.',
+--    proMonthlyTagline: 'Empieza poco a poco, cancela cuando quieras.',
+--    proPlanFreeTitle: 'Gratis',
+--    proPlanMonthlyTitle: 'Mensual',
+--    proPlanYearlyBadge: 'Mejor oferta',
+--    proPlanYearlyTitle: 'Anual',
+--    proSubtitle: 'Ve más allá de 3 hábitos y haz que tus puntos sean imparables.',
+--    proYearlySavingShort: 'Ahorra alrededor de un 37% (como 8 meses gratis).',
+--    proYearlyTagline: 'Para quienes se toman en serio su cadena.',
+--
+--    restoreSoon: 'La opción de restaurar compras se añadirá en una próxima actualización.',
+--
+--    themeCyberBlueLabel: 'Cyber Blue',
+--    themeDarkLabel: 'Oscuro',
+--    themeDesc: 'Elige el estilo de la app. (Los temas Pro llegarán más adelante.)',
+--    themeNeonPinkLabel: 'Neon Pink',
+--
+--    tutorialEditIconBody: 'Primero, elige un ícono que coincida con tu hábito.',
+--    tutorialEditNameBody:
+--      'Después, escribe un nombre para tu hábito.\nPor ejemplo: "Beber agua", "Leer un libro".',
+--    tutorialEditSubmitBody:
+--      '¡Listo!\nPulsa el botón de crear de abajo para añadir este hábito a tu pantalla de inicio.',
+--    tutorialExplainChainBody:
+--      'Al tocar, tu contador de DÍAS SEGUIDOS aumenta y hoy se ilumina en TU CADENA.\nSigue para extender tu cadena.',
+--    tutorialGotIt: 'Entendido',
+--    tutorialNext: 'Siguiente',
+--    tutorialPressFabBody:
+--      'Toca el botón + en la esquina inferior derecha para crear tu primer hábito.',
+--    tutorialPressHabitBody:
+--      'Ahora toca el hábito que acabas de crear.\nAl tocarlo, marcas hoy como "hecho".',
+--    tutorialStart: 'Empezar',
+--    tutorialWelcomeBody:
+--      '¡Bienvenido!\nDotChain te permite construir tu cadena de hábitos.\nEmpieza creando tu primer hábito con el botón +.',
+-+  ...baseEn,
+-+  // --- Home / Header ---
+-+  daysStreak: 'DÍAS SEGUIDOS',
+-+  yourChain: 'TU CADENA',
+-+  allDoneDays: 'DÍAS COMPLETOS',
+-+
+-+  // --- Settings (General) ---
+-+  settings: 'Ajustes',
+-+  hapticOff: 'Vibración desactivada',
+-+  language: 'Idioma',
+-+  sound: 'Sonido',
+-+  haptics: 'Respuesta háptica',
+-+  theme: 'Tema',
+-+
+-+  // --- Purchase / Restore ---
+-+  restore: 'Restaurar compras',
+-+  purchaseSuccess: 'El plan Pro está activo.',
+-+  purchaseFailed: 'Error en la compra. Inténtalo más tarde.',
+-+  restoreSuccess: 'Historial de compras restaurado.',
+-+  restoreNotFound: 'No se encontraron compras para restaurar.',
+-+  restoreFailed: 'Error al restaurar las compras.',
+-+
+-+  // --- Settings (Sound & Info) ---
+-+  version: 'Versión de la app',
+-+  tapSound: 'Sonido al tocar',
+-+  click: 'Clic',
+-+  pop: 'Pop',
+-+  soundSwitchLabel: 'Efectos de sonido',
+-+
+-+  // --- Pro Screen (Paywall) ---
+-+  proTitle: 'Desbloquea tu cadena.',
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: 'Crea hábitos ilimitados y haz que tus puntos sean imparables.',
+-+  proPlanFreeTitle: 'Gratis',
+-+  proPlanMonthlyTitle: 'Mensual',
+-+  proPlanYearlyTitle: 'Anual',
+-+  proPlanYearlyBadge: 'Mejor opción',
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '0 € / para siempre',
+-+  proOnlyTitle: 'Función Pro',
+-+  proOnlyTheme: 'Pásate a Pro para usar este tema.',
+-+  openPro: 'Ver plan Pro',
+-+  cancel: 'Cancelar',
+-+
+-+  // --- Settings (Appearance) ---
+-+  flowEffectTitle: 'Animación de flujo eléctrico',
+-+  flowEffectHelp:
+-+    'Haz que un flujo de neón recorra la línea de tu cadena. Apágalo si prefieres una vista más tranquila.',
+-+
+-+  // --- Heatmap Range (Settings) ---
+-+  heatmapRangeTitle: 'Periodo de visualización',
+-+  heatmapRangeHelp: 'Elige cuántos días de tu cadena mostrar en el mapa de calor.',
+-+  heatmapRange7: '1 semana',
+-+  heatmapRange30: '1 mes',
+-+  heatmapRange60: '2 meses',
+-+  heatmapRange90: '3 meses',
+-+  heatmapRange180: '6 meses',
+-+  heatmapRange365: '1 año',
+-+  heatmapSummaryPrefix: 'Últimos ',
+-+  heatmapSummarySuffix: ' días',
+-+  heatmapAgoSuffix: ' días atrás',
+-+  heatmapToday: 'Hoy',
+-+
+-+  // --- Themes ---
+-+  themeDesc: 'Cambia la apariencia de la aplicación.',
+-+  themeDarkLabel: 'Oscuro',
+-+  themeNeonPinkLabel: 'Neón Rosa',
+-+  themeCyberBlueLabel: 'Ciber Azul',
+-+  freeThemeNote: 'Gratis: Solo Oscuro / Pro desbloquea Neón Rosa y Ciber Azul',
+-+  proThemeNote: 'Los temas Pro estarán disponibles pronto.',
+-+
+-+  // --- Habit Management ---
+-+  newHabitTitle: 'Nuevo hábito',
+-+  editHabitTitle: 'Editar hábito',
+-+  habitNameLabel: 'Nombre',
+-+  habitNamePlaceholder: 'ej: Leer un libro, Beber agua',
+-+  habitIconLabel: 'Icono',
+-+  deleteHabit: 'Eliminar este hábito',
+-+  deleteConfirmationTitle: '¿Eliminar?',
+-+  deleteConfirmationMessage: 'Esta acción no se puede deshacer. Se perderá todo el historial.',
+-+  save: 'Guardar',
+-+  create: 'Crear',
+-+
+-+  // --- Icon Categories & Labels ---
+-+  iconCatBasic: 'Básico',
+-+  iconCatHealth: 'Salud',
+-+  iconCatLearning: 'Aprendizaje',
+-+
+-+  iconLabelStreak: 'Racha',
+-+  iconLabelTask: 'Tarea',
+-+  iconLabelShine: 'Brillo',
+-+  iconLabelClean: 'Limpieza',
+-+  iconLabelLaundry: 'Colada',
+-+  iconLabelWater: 'Agua',
+-+  iconLabelWalk: 'Paseo',
+-+  iconLabelSleep: 'Sueño',
+-+  iconLabelWorkout: 'Entreno',
+-+  iconLabelBarbell: 'Pesas',
+-+  iconLabelRead: 'Lectura',
+-+  iconLabelArt: 'Arte',
+-+  iconLabelMedia: 'Medios',
+-+  iconLabelStudy: 'Estudio',
+-+  iconLabelLanguage: 'Idiomas',
+-+
+-+  // --- Misc / Errors ---
+-+  habitButtonSuffix: ' botón de hábito',
+-+  errorLoadFailed: 'Error al cargar los datos.',
+-+  errorTitleRequired: 'El título es obligatorio.',
+-+  errorTitleTooLong: 'El título debe tener 20 caracteres o menos.',
+-+  errorSaveFailed: 'Error al guardar.',
+-+  errorDeleteFailed: 'Error al eliminar.',
+-+  errorToggleFailed: 'Error al actualizar.',
+-+  habitLimitTitle: 'Límite del plan gratuito',
+-+  habitLimitBody: 'En el plan gratuito puedes crear hasta 3 hábitos.',
+-+
+-+  // --- Settings description ---
+-+  hapticsDescription: 'Respuesta háptica (vibración)',
+-+
+-+  // --- Reminder ---
+-+  reminderSectionTitle: 'Recordatorios',
+-+  reminderToggleLabel: 'Usar recordatorio',
+-+  reminderTimeLabel: 'Hora de notificación',
+-+  reminderNotificationBody: '¡Es hora de construir tu cadena!',
+-+
+-+  // --- Review (7-day streak) ---
+-+  streak7Title: '¡Racha de 7 días!',
+-+  streak7Message: 'Has mantenido tu cadena una semana completa. ¡Buen trabajo!',
+-+  ok: 'Genial',
+-+
+-+  // --- Language labels ---
+-+  languageChange: 'Cambiar idioma',
+-+  currentLanguage: 'Actual',
+-+  languageNameEn: 'Inglés',
+-+  languageNameJa: 'Japonés',
+-+  languageNameFr: 'Francés',
+-+  languageNameEs: 'Español',
+-+  languageNameDe: 'Alemán',
+-+  languageNameIt: 'Italiano',
+-+  languageNamePt: 'Portugués',
+-+  languageNameRu: 'Ruso',
+-+  languageNameZh: 'Chino',
+-+  languageNameKo: 'Coreano',
+-+  languageNameHi: 'Hindi',
+-+  languageNameId: 'Indonesio',
+-+  languageNameTh: 'Tailandés',
+-+  languageNameVi: 'Vietnamita',
+-+  languageNameMs: 'Malayo',
+-+  languageNameTr: 'Turco',
+-+  languageNameNl: 'Holandés',
+-+  languageNameSv: 'Sueco',
+-+
+-+  // --- Tutorial ---
+-+  tutorialNext: 'Siguiente',
+-+  tutorialWelcome: 'Bienvenido a DotChain',
+-+  tutorialDesc1: 'Conecta tus hábitos diarios y construye tu propia cadena.',
+-+  tutorialDesc2: 'No rompas la cadena para que el hábito perdure.',
+-+  tutorialStart: '¡Empezar!',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/fr.ts b/src/core/i18n/locales/fr.ts
+-index 462b995..a267c06 100644
+---- a/src/core/i18n/locales/fr.ts
+-+++ b/src/core/i18n/locales/fr.ts
+-@@ -1,177 +1,224 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'JOURS DE SUITE',
+--    yourChain: 'TA CHAÎNE',
+--    allDoneDays: 'JOURS COMPLÈTS',
+--    settings: 'Réglages',
+--    hapticOff: 'Vibrations désactivées',
+--    language: 'Langue',
+--    sound: 'Son',
+--    haptics: 'Vibrations',
+--    theme: 'Thème',
+--    restore: 'Restaurer les achats',
+--    version: "Version de l’app",
+--    tapSound: 'Son du tap',
+--    click: 'Clic',
+--    pop: 'Pop',
+--    flowEffectTitle: 'Animation de flux électrique',
+--    flowEffectHelp:
+--      'Fais circuler un flux néon le long de ta chaîne. Désactive si tu préfères un rendu plus calme.',
+--    heatmapRangeTitle: 'Période d’affichage de la chaîne',
+--    heatmapRangeHelp: 'Choisissez combien de jours de votre chaîne afficher sur la heatmap d’accueil.',
+--    heatmapRange7: '1 semaine',
+--    heatmapRange30: '1 mois',
+--    heatmapRange60: '2 mois',
+--    heatmapRange180: '6 mois',
+--    heatmapRange365: '1 an',
+--    heatmapSummaryPrefix: 'Derniers ',
+--    heatmapSummarySuffix: ' jours',
+--    heatmapAgoSuffix: ' jours auparavant',
+--    heatmapToday: "Aujourd`hui",
+--    freeThemeNote: `Gratuit : Dark uniquement / Pro déverrouille Neon Pink et Cyber Blue`,
+--    proThemeNote: `Les thèmes Pro seront déverrouillés plus tard.`,
+--    restoreDesc: `Restaurer les achats (plus tard)`,
+--    licenses: `Licences open source (plus tard)`,
+--    openPro: `Ouvrir DotChain Pro`,
+--    heroPaywall: `Passe en mode néon`,
+--    priceMonthly: `$1.99 / mois`,
+--    priceFree: `$0 / pour toujours`,
+--    priceYearly: `$14.99 / an`,
+--
+--    onboardingTitle: `Bienvenue sur DotChain`,
+--    onboardingBody: `Un tap, grosse vibration. Construisons la chaîne du jour.`,
+--    onboardingPunch: `Ceci est DotChain.`,
+--    start: `Commencer`,
+--    paywallNote: `La facturation et les annonces seront ajoutées plus tard.`,
+--
+--    // Paywall / Pro
+--    paywallMonthlyLabel: `Abonnement mensuel`,
+--    paywallMonthlySub: `Facturé chaque mois. Résiliable à tout moment.`,
+--    paywallYearlyLabel: `Abonnement annuel`,
+--    paywallYearlySub: `Facturé une fois par an. Résiliable à tout moment.`,
+--    paywallBestValueBadge: `Meilleur rapport qualité-prix`,
+--    comingSoonTitle: `Bientôt disponible`,
+--
+--    proSubtitle: `Dépasse 3 habitudes et rends ta chaîne inarrêtable.`,
+--    proPlanFreeTitle: `Gratuit`,
+--    proPlanMonthlyTitle: `Mensuel`,
+--    proPlanYearlyTitle: `Annuel`,
+--    proPlanYearlyBadge: `Meilleur choix`,
+--    proMonthlyTagline: `Commence petit, résilie quand tu veux.`,
+--    proYearlyTagline: `Pour les bâtisseurs de chaîne déterminés.`,
+--    proYearlySavingShort: `Économise environ 37 % (comme 8 mois offerts).`,
+--
+--    proCompareTitle: `Ce que tu obtiens avec Pro`,
+--    proCompareSubtitle:
+--      `Tu peux rester sur Gratuit. Pro enlève simplement les limites.`,
+--    proCompareHeaderFeature: `Fonction`,
+--    proCompareHeaderFree: `Gratuit`,
+--    proCompareHeaderPro: `Pro`,
+--    proFeatureHabits: `Habitudes que tu peux suivre`,
+--    proFeatureHabitsFree: `Jusqu’à 3 habitudes`,
+--    proFeatureHabitsPro: `Habitudes illimitées`,
+--    proFeatureThemesFree: `1 thème (Dark)`,
+--    proFeatureThemesPro: `Tous les thèmes débloqués`,
+--    proFeatureAdsFree: `Bannière pub en bas`,
+--    proFeatureAdsPro: `Pas de pub, concentration totale`,
+--
+--    proTitle: `Déverrouille ta chaîne.`,
+--    proHeaderTitle: `DotChain Pro`,
+--    proFeatureUnlimited: `Habitudes illimitées`,
+--    proFeatureThemes: `Tous les thèmes débloqués (Neon Pink / Cyber Blue)`,
+--    proFeatureAds: `Sans publicité`,
+--    proCtaYearly: `Choisir Pro annuel`,
+--    proCtaMonthly: `Choisir Pro mensuel`,
+--    proCtaStayFree: `Continuer en gratuit`,
+--    proFinePrint:
+--      `L’abonnement se renouvelle automatiquement. Tu peux le résilier à tout moment dans les réglages de ton compte App Store ou Google Play.`,
+--
+--    // Thèmes
+--    themeDarkLabel: `Sombre`,
+--    themeNeonPinkLabel: `Neon Pink`,
+--    themeCyberBlueLabel: `Cyber Blue`,
+--    themeDesc: `Choisis l’ambiance qui te plaît. (Les thèmes Pro arrivent plus tard.)`,
+--    restoreSoon: `La restauration des achats sera ajoutée dans une prochaine mise à jour.`,
+--
+--    // Onboarding / Tutoriel
+--    tutorialWelcomeBody:
+--      `Bienvenue !\\nDotChain t’aide à construire ta chaîne d’habitudes.\\nCommence en créant ta première habitude avec le bouton +.`,
+--    tutorialPressFabBody:
+--      `Appuie sur le bouton + en bas à droite pour créer ta première habitude.`,
+--    tutorialPressHabitBody:
+--      `Appuie maintenant sur l’habitude que tu viens de créer.\\nChaque appui marque le jour comme « fait ».`,
+--    tutorialExplainChainBody:
+--      `En appuyant, tes JOURS DE SUITE augmentent et aujourd’hui s’allume sur TA CHAÎNE.\\nContinue pour allonger ta chaîne.`,
+--    tutorialEditIconBody:
+--      `Choisis d’abord une icône qui correspond à ton habitude.`,
+--    tutorialEditNameBody:
+--      `Ensuite, donne un nom à ton habitude.\\nPar exemple : « Boire de l’eau », « Lire un livre ».`,
+--    tutorialEditSubmitBody:
+--      `C’est prêt !\\nAppuie sur le bouton de création ci-dessous pour ajouter cette habitude à ton écran d’accueil.`,
+--    tutorialNext: `Suivant`,
+--    tutorialStart: `Commencer`,
+--    tutorialGotIt: `Compris`,
+--
+--    // Suppression
+--    deleteConfirmBody: `Voulez-vous vraiment supprimer ? Cette action est irréversible.`,
+--    cancel: `Annuler`,
+--    delete: `Supprimer`,
+--    homeLoading: `Chargement...`,
+--    homeAddHabitLabel: `Ajouter une habitude`,
+--    editNewHabit: `Nouvelle habitude`,
+--    editHabitTitle: "Modifier l`habitude",
+--    editCategoryLabel: 'Catégorie',
+--    editNameLabel: 'Nom (20 caractères max)',
+--    editNamePlaceholder: 'Nomme ton habitude...',
+--    editSaveChanges: 'Enregistrer',
+--    editCreateHabit: "Créer l`habitude",
+--    editDeleteHabit: "Supprimer l`habitude",
+--    habitButtonSuffix: " bouton d’habitude",
+--    iconCatBasic: 'Basique',
+--    iconCatHealth: 'Santé',
+--    iconCatLearning: 'Apprentissage & Travail',
+--    errorLoadFailed: 'Échec du chargement des données',
+--    errorTitleRequired: 'Le titre est obligatoire.',
+--    errorTitleTooLong: 'Le titre doit comporter au maximum 20 caractères.',
+--    errorSaveFailed: 'Échec de la sauvegarde.',
+--    errorDeleteFailed: 'Échec de la suppression.',
+--    errorToggleFailed: 'Échec de la mise à jour.',
+--    habitLimitTitle: 'Limite de l’offre gratuite',
+--    habitLimitBody: 'Avec l’offre gratuite, vous pouvez créer jusqu’à 3 habitudes.',
+--    hapticsDescription: 'Retour haptique',
+--    reminderSectionTitle: 'Notification de rappel',
+--    reminderToggleLabel: 'Activer le rappel',
+--    reminderTimeLabel: "Heure de notification",
+--    reminderNotificationBody: 'Il est temps de renforcer ta chaîne.',
+--    streak7Title: 'Série de 7 jours !',
+--    streak7Message: 'Vous avez tenu votre chaîne pendant une semaine complète. Bravo !',
+--    ok: 'OK',
+--    languageChange: 'Changer la langue',
+--    currentLanguage: 'Actuelle',
+--    languageNameEn: 'Anglais',
+--    languageNameJa: 'Japonais',
+--    languageNameFr: 'Français',
+--    languageNameEs: 'Espagnol',
+--    languageNameDe: 'Allemand',
+--    languageNameIt: 'Italien',
+--    languageNamePt: 'Portugais',
+--    languageNameRu: 'Russe',
+--    languageNameZh: 'Chinois',
+--    languageNameKo: 'Coréen',
+--    languageNameHi: 'Hindi',
+--    languageNameId: 'Indonésien',
+--    languageNameTh: 'Thaï',
+--    languageNameVi: 'Vietnamien',
+--    languageNameMs: 'Malais',
+--    languageNameTr: 'Turc',
+--    languageNameNl: 'Néerlandais',
+--    languageNameSv: 'Suédois',
+--    soundSwitchLabel: 'Activer le son',
+--    tapSoundLabel: 'Style du son de tap',
+--    proOnlyTitle: 'Fonction réservée au Pro',
+--    proOnlyTheme: 'Ce thème est disponible avec Pro.',
+-+  ...baseEn,
+-+  // --- Home / Header ---
+-+  daysStreak: 'JOURS DE SUITE',
+-+  yourChain: 'TA CHAÎNE',
+-+  allDoneDays: 'JOURS TERMINÉS',
+-+
+-+  // --- Settings (General) ---
+-+  settings: 'Paramètres',
+-+  hapticOff: 'Vibrations désactivées',
+-+  language: 'Langue',
+-+  sound: 'Son',
+-+  haptics: 'Vibrations',
+-+  theme: 'Thème',
+-+
+-+  // --- Purchase / Restore ---
+-+  restore: 'Restaurer les achats',
+-+  purchaseSuccess: 'Le plan Pro est maintenant actif.',
+-+  purchaseFailed: 'L’achat a échoué. Veuillez réessayer plus tard.',
+-+  restoreSuccess: 'Historique d’achat restauré.',
+-+  restoreNotFound: 'Aucun achat trouvé à restaurer.',
+-+  restoreFailed: 'Échec de la restauration des achats.',
+-+
+-+  // --- Settings (Sound & Info) ---
+-+  version: 'Version de l’app',
+-+  tapSound: 'Son du tap',
+-+  click: 'Clic',
+-+  pop: 'Pop',
+-+  
+-+  // --- Paywall / Pro Screen ---
+-+  proSubtitle: 'Dépasse 3 habitudes et rends tes points inarrêtables.',
+-+  proPlanFreeTitle: 'Gratuit',
+-+  proPlanMonthlyTitle: 'Mensuel',
+-+  proPlanYearlyTitle: 'Annuel',
+-+  proPlanYearlyBadge: 'Meilleure offre',
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '0 € / pour toujours',
+-+  
+-+  flowEffectTitle: 'Animation de flux électrique',
+-+  flowEffectHelp:
+-+    'Laisse un flux néon parcourir ta chaîne. Désactive-le si tu préfères un rendu plus calme.',
+-+
+-+  // --- Heatmap Range (Settings) ---
+-+  heatmapRangeTitle: 'Plage d’affichage de la chaîne',
+-+  heatmapRangeHelp: 'Choisis le nombre de jours de ta chaîne à afficher sur la carte thermique.',
+-+  heatmapRange7: '1 semaine',
+-+  heatmapRange30: '1 mois',
+-+  heatmapRange60: '2 mois',
+-+  heatmapRange180: '6 mois',
+-+  heatmapRange365: '1 an',
+-+  heatmapSummaryPrefix: 'Les derniers ',
+-+  heatmapSummarySuffix: ' jours',
+-+  heatmapAgoSuffix: ' jours plus tôt',
+-+  heatmapToday: 'Aujourd’hui',
+-+
+-+  priceMonthly: '1,99 € / mois',
+-+  priceYearly: '14,99 € / an',
+-+  proMonthlyTagline: 'Commence petit, annule à tout moment.',
+-+  proYearlyTagline: 'Pour les bâtisseurs de chaîne sérieux.',
+-+  proYearlySavingShort: 'Économise environ 37 % (soit 8 mois gratuits).',
+-+
+-+  proCompareTitle: 'Ce que tu obtiens avec Pro',
+-+  proCompareSubtitle: 'Tu peux rester en Gratuit. Pro supprime juste les limites.',
+-+  proCompareHeaderFeature: 'Fonctionnalité',
+-+  proCompareHeaderFree: 'Gratuit',
+-+  proCompareHeaderPro: 'Pro',
+-+  proFeatureHabits: 'Habitudes suivies',
+-+  proFeatureHabitsFree: 'Jusqu’à 3 habitudes',
+-+  proFeatureHabitsPro: 'Habitudes illimitées',
+-+  proFeatureThemesFree: '1 thème (Sombre)',
+-+  proFeatureThemesPro: 'Tous les thèmes débloqués',
+-+  proFeatureAdsFree: '',
+-+  proFeatureAdsPro: '',
+-+
+-+  proOnlyTitle: 'Fonctionnalité Pro',
+-+  proOnlyTheme: 'Ce thème est disponible avec Pro.',
+-+  proCtaYearly: 'Prendre Pro Annuel',
+-+  proCtaMonthly: 'Prendre Pro Mensuel',
+-+  proCtaStayFree: 'Continuer en Gratuit',
+-+  proFinePrint:
+-+    'L’abonnement se renouvelle automatiquement. Tu peux annuler à tout moment dans les paramètres de ton compte App Store ou Google Play.',
+-+
+-+  paywallMonthlyLabel: 'Forfait mensuel',
+-+  paywallYearlyLabel: 'Forfait annuel',
+-+  paywallBestValueBadge: 'Meilleure valeur',
+-+  paywallYearlySub: 'Facturé une fois par an. Annule quand tu veux.',
+-+  paywallMonthlySub: 'Facturé chaque mois. Annule quand tu veux.',
+-+  comingSoonTitle: 'Bientôt disponible',
+-+
+-+  // --- Themes ---
+-+  themeDarkLabel: 'Sombre',
+-+  themeNeonPinkLabel: 'Néon Rose',
+-+  themeCyberBlueLabel: 'Cyber Bleu',
+-+  themeDesc: 'Choisis ton ambiance. (Les thèmes Pro arriveront plus tard.)',
+-+  restoreSoon: 'La restauration des achats sera ajoutée dans une future mise à jour.',
+-+  freeThemeNote: 'Gratuit : Sombre uniquement / Pro débloque Néon Rose et Cyber Bleu',
+-+  proThemeNote: 'Les thèmes Pro se débloquent après l’implémentation du paywall.',
+-+  restoreDesc: 'Restaurer les achats effectués sur ce compte.',
+-+  licenses: 'Licences Open Source (plus tard)',
+-+  openPro: 'Ouvrir DotChain Pro',
+-+  heroPaywall: 'Passe au monde néon',
+-+  
+-+  onboardingTitle: 'Bienvenue sur DotChain',
+-+  onboardingBody: 'Un tap, une vibration forte. Construisons la chaîne d’aujourd’hui.',
+-+  onboardingPunch: 'C’est DotChain.',
+-+  start: 'Commencer',
+-+  paywallNote: 'Facturation/Pubs seront ajoutées plus tard.',
+-+
+-+  // --- Tutorial / Onboarding flow ---
+-+  tutorialWelcomeBody:
+-+    'Bienvenue !\nDotChain te permet de construire ta chaîne d’habitudes.\nCommence par créer ta première habitude avec le bouton +.',
+-+  tutorialPressFabBody: 'Appuie sur le bouton + en bas à droite pour créer ta première habitude.',
+-+  tutorialPressHabitBody: 'Maintenant, appuie sur l’habitude que tu viens de créer.\nAppuyer marque la journée comme "faite".',
+-+  tutorialExplainChainBody:
+-+    'En appuyant, ta SÉRIE DE JOURS augmente et aujourd’hui s’allume sur TA CHAÎNE.\nContinue pour étendre ta chaîne.',
+-+  tutorialEditIconBody: 'D’abord, choisis une icône qui correspond à ton habitude.',
+-+  tutorialEditNameBody: 'Ensuite, entre un nom pour ton habitude.\nPar exemple : "Boire de l’eau", "Lire un livre".',
+-+  tutorialEditSubmitBody: 'Tu es prêt !\nAppuie sur le bouton créer ci-dessous pour ajouter cette habitude à ton écran d’accueil.',
+-+  tutorialNext: 'Suivant',
+-+  tutorialStart: 'Démarrer',
+-+  tutorialGotIt: 'Compris',
+-+
+-+  // --- Home ---
+-+  homeLoading: 'Chargement...',
+-+  homeAddHabitLabel: 'Ajouter une habitude',
+-+
+-+  // --- Edit ---
+-+  editNewHabit: 'Nouvelle habitude',
+-+  editHabitTitle: 'Modifier l’habitude',
+-+  editCategoryLabel: 'Catégorie',
+-+  editNameLabel: 'Nom (max 20 caractères)',
+-+  editNamePlaceholder: 'Nomme ton habitude...',
+-+  editSaveChanges: 'Enregistrer',
+-+  editCreateHabit: 'Créer l’habitude',
+-+  editDeleteHabit: 'Supprimer l’habitude',
+-+  deleteConfirmBody: 'Es-tu sûr ? Cette action est irréversible.',
+-+  cancel: 'Annuler',
+-+  delete: 'Supprimer',
+-+
+-+  // --- Icon Categories & Labels ---
+-+  iconCatBasic: 'Basique',
+-+  iconCatHealth: 'Santé',
+-+  iconCatLearning: 'Apprentissage & Travail',
+-+
+-+  iconLabelStreak: 'Série',
+-+  iconLabelTask: 'Tâche',
+-+  iconLabelShine: 'Briller',
+-+  iconLabelClean: 'Nettoyer',
+-+  iconLabelLaundry: 'Lessive',
+-+  iconLabelWater: 'Eau',
+-+  iconLabelWalk: 'Marche',
+-+  iconLabelSleep: 'Sommeil',
+-+  iconLabelWorkout: 'Entraînement',
+-+  iconLabelBarbell: 'Haltère',
+-+  iconLabelRead: 'Lire',
+-+  iconLabelArt: 'Art',
+-+  iconLabelMedia: 'Média',
+-+  iconLabelStudy: 'Études',
+-+  iconLabelLanguage: 'Langue',
+-+
+-+  // --- Pro ---
+-+  proTitle: 'Débloque ta chaîne.',
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proFeatureUnlimited: 'Habitudes illimitées',
+-+  proFeatureThemes: 'Tous les thèmes débloqués (Néon Rose / Cyber Bleu)',
+-+  proFeatureAds: '',
+-+
+-+  // --- Accessibility ---
+-+  habitButtonSuffix: ' bouton d’habitude',
+-+
+-+  // --- Misc / Errors ---
+-+  errorLoadFailed: 'Échec du chargement des données',
+-+  errorTitleRequired: 'Le titre est requis.',
+-+  errorTitleTooLong: 'Le titre doit faire 20 caractères ou moins.',
+-+  errorSaveFailed: 'Échec de l’enregistrement.',
+-+  errorDeleteFailed: 'Échec de la suppression.',
+-+  errorToggleFailed: 'Échec de la mise à jour.',
+-+  habitLimitTitle: 'Limite du plan gratuit',
+-+  habitLimitBody: 'Sur le plan gratuit, tu peux créer jusqu’à 3 habitudes.',
+-+
+-+  // --- Settings description ---
+-+  hapticsDescription: 'Retour haptique',
+-+
+-+  // --- Reminder ---
+-+  reminderSectionTitle: 'Notification de rappel',
+-+  reminderToggleLabel: 'Utiliser le rappel',
+-+  reminderTimeLabel: 'Heure de notification',
+-+  reminderNotificationBody: 'Il est temps de construire ta chaîne.',
+-+
+-+  // --- Review (7-day streak) ---
+-+  streak7Title: 'Série de 7 jours !',
+-+  streak7Message: 'Tu as gardé ta chaîne pendant une semaine entière. Bravo !',
+-+  ok: 'OK',
+-+
+-+  // --- Language labels ---
+-+  languageChange: 'Changer de langue',
+-+  currentLanguage: 'Actuel',
+-+  languageNameEn: 'Anglais',
+-+  languageNameJa: 'Japonais',
+-+  languageNameFr: 'Français',
+-+  languageNameEs: 'Espagnol',
+-+  languageNameDe: 'Allemand',
+-+  languageNameIt: 'Italien',
+-+  languageNamePt: 'Portugais',
+-+  languageNameRu: 'Russe',
+-+  languageNameZh: 'Chinois',
+-+  languageNameKo: 'Coréen',
+-+  languageNameHi: 'Hindi',
+-+  languageNameId: 'Indonésien',
+-+  languageNameTh: 'Thaï',
+-+  languageNameVi: 'Vietnamien',
+-+  languageNameMs: 'Malais',
+-+  languageNameTr: 'Turc',
+-+  languageNameNl: 'Néerlandais',
+-+  languageNameSv: 'Suédois',
+-+
+-+  // --- Sound labels ---
+-+  soundSwitchLabel: 'Activer le son',
+-+  tapSoundLabel: 'Style de son au toucher',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/hi.ts b/src/core/i18n/locales/hi.ts
+-index 39be7fe..b8ae366 100644
+---- a/src/core/i18n/locales/hi.ts
+-+++ b/src/core/i18n/locales/hi.ts
+-@@ -1,174 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'लगातार दिन',
+--    yourChain: 'आपकी चेन',
+--    allDoneDays: 'सभी पूरे हुए दिन',
+--    settings: 'सेटिंग्स',
+--    hapticOff: 'वाइब्रेशन बंद',
+--    language: 'भाषा',
+--    sound: 'साउंड',
+--    haptics: 'वाइब्रेशन',
+--    theme: 'थीम',
+--    restore: 'खरीद पुनर्स्थापित करें',
+--    version: 'ऐप संस्करण',
+--    tapSound: 'टैप साउंड',
+--    click: 'क्लिक',
+--    pop: 'पॉप',
+--    flowEffectTitle: 'इलेक्ट्रिक फ्लो ऐनिमेशन',
+--    flowEffectHelp: 'चेन की लाइन पर नियोन जैसी धारा बहती है। शांत लुक चाहिए तो इसे बंद करें।',
+--    heatmapRangeTitle: 'चेन दिखाने की अवधि',
+--    heatmapRangeHelp: 'होम हीटमैप में चेन के कितने दिन दिखाने हैं, चुनें।',
+--    heatmapRange7: '1 सप्ताह',
+--    heatmapRange30: '1 माह',
+--    heatmapRange60: '2 माह',
+--    heatmapRange180: '6 माह',
+--    heatmapRange365: '1 वर्ष',
+--    heatmapSummaryPrefix: 'पिछले ',
+--    heatmapSummarySuffix: ' दिन',
+--    heatmapAgoSuffix: ' दिन पहले',
+--    heatmapToday: 'आज',
+--    freeThemeNote: 'फ्री: केवल डार्क / Pro में Neon Pink और Cyber Blue अनलॉक होते हैं',
+--    proThemeNote: 'Pro थीम भुगतान के बाद सक्रिय होंगे।',
+--    restoreDesc: 'खरीद पुनर्स्थापित (जल्द)',
+--    licenses: 'ओपन सोर्स लाइसेंस (जल्द)',
+--    openPro: 'DotChain Pro खोलें',
+--    heroPaywall: 'नीऑन दुनिया में अपग्रेड करें',
+--    priceMonthly: '$1.99 / माह',
+--    onboardingTitle: 'DotChain में स्वागत है',
+--    onboardingBody: 'एक टैप, तेज वाइब्रेशन। आज की चेन बनाएं।',
+--    start: 'शुरू करें',
+--    paywallNote: 'बिलिंग और विज्ञापन सुविधाएँ बाद में जोड़ी जाएँगी।',
+--    homeLoading: 'लोड हो रहा है...',
+--    homeAddHabitLabel: 'आदत जोड़ें',
+--    editNewHabit: 'नई आदत',
+--    editHabitTitle: 'आदत संपादित करें',
+--    editCategoryLabel: 'श्रेणी',
+--    editNameLabel: 'नाम (अधिकतम 20 अक्षर)',
+--    editNamePlaceholder: 'अपनी आदत का नाम लिखें...',
+--    editSaveChanges: 'परिवर्तन सहेजें',
+--    editCreateHabit: 'आदत बनाएं',
+--    editDeleteHabit: 'आदत हटाएं',
+--    proTitle: 'अपनी चेन अनलॉक करें।',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'असीमित आदतें',
+--    proFeatureThemes: 'सभी थीम अनलॉक (Neon Pink / Cyber Blue)',
+--    proFeatureAds: 'कोई विज्ञापन नहीं',
+--    habitButtonSuffix: ' आदत बटन',
+--    iconCatBasic: 'बेसिक',
+--    iconCatHealth: 'स्वास्थ्य',
+--    iconCatLearning: 'सीखना व काम',
+--    errorLoadFailed: 'डेटा लोड करने में विफल',
+--    errorTitleRequired: 'शीर्षक आवश्यक है।',
+--    errorTitleTooLong: 'शीर्षक 20 वर्ण या उससे कम होना चाहिए।',
+--    errorSaveFailed: 'सहेजने में विफल।',
+--    errorDeleteFailed: 'हटाने में विफल।',
+--    errorToggleFailed: 'रिकॉर्ड अपडेट करने में विफल।',
+--    habitLimitTitle: 'मुफ़्त योजना की सीमा',
+--    habitLimitBody: 'मुफ़्त योजना में आप अधिकतम 3 आदतें बना सकते हैं।',
+--    hapticsDescription: 'हैप्टिक फीडबैक',
+--    reminderSectionTitle: 'रिमाइंडर सूचना',
+--    reminderToggleLabel: 'रिमाइंडर उपयोग करें',
+--    reminderTimeLabel: 'सूचना का समय',
+--    reminderNotificationBody: 'अपनी चेन आगे बढ़ाने का समय है।',
+--    streak7Title: '7 दिन की श्रृंखला!',
+--    streak7Message: 'आपने पूरा एक सप्ताह श्रृंखला बनाए रखी। शानदार!',
+--    ok: 'ठीक है',
+--    languageChange: 'भाषा बदलें',
+--    currentLanguage: 'वर्तमान',
+--    languageNameEn: 'अंग्रेज़ी',
+--    languageNameJa: 'जापानी',
+--    languageNameFr: 'फ़्रेंच',
+--    languageNameEs: 'स्पेनिश',
+--    languageNameDe: 'जर्मन',
+--    languageNameIt: 'इतालवी',
+--    languageNamePt: 'पुर्तगाली',
+--    languageNameRu: 'रूसी',
+--    languageNameZh: 'चीनी',
+--    languageNameKo: 'कोरियाई',
+--    languageNameHi: 'हिन्दी',
+--    languageNameId: 'इंडोनेशियाई',
+--    languageNameTh: 'थाई',
+--    languageNameVi: 'वियतनामी',
+--    languageNameMs: 'मलय',
+--    languageNameTr: 'तुर्की',
+--    languageNameNl: 'डच',
+--    languageNameSv: 'स्वीडिश',
+--    soundSwitchLabel: 'ध्वनि चालू करें',
+--    tapSoundLabel: 'टैप ध्वनि शैली',
+--    proOnlyTitle: 'केवल प्रो के लिए',
+--    proOnlyTheme: 'यह थीम प्रो में उपलब्ध है।',
+--
+--    // अनुपस्थित कुंजियों का追加
+--    cancel: 'रद्द करें',
+--    delete: 'हटाएँ',
+--    deleteConfirmBody: 'क्या आप वाकई हटाना चाहते हैं? यह क्रिया वापस नहीं ली जा सकती।',
+--    comingSoonTitle: 'जल्द ही आ रहा है',
+--    onboardingPunch: 'यही है DotChain।',
+--
+--    paywallBestValueBadge: 'सबसे किफायती',
+--    paywallMonthlyLabel: 'मासिक योजना',
+--    paywallMonthlySub: 'हर महीने बिलिंग। कभी भी रद्द करें।',
+--    paywallYearlyLabel: 'वार्षिक योजना',
+--    paywallYearlySub: 'साल में एक बार बिलिंग। कभी भी रद्द करें।',
+--
+--    priceFree: '$0 / हमेशा के लिए',
+--    priceYearly: '$14.99 / वर्ष',
+--
+--    proCompareHeaderFeature: 'फ़ीचर',
+--    proCompareHeaderFree: 'मुफ़्त',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      'आप चाहें तो हमेशा मुफ़्त प्लान पर रह सकते हैं। Pro सिर्फ़ सीमाएँ हटाता है।',
+--    proCompareTitle: 'Pro लेने पर आपको क्या मिलता है',
+--
+--    proCtaMonthly: 'मासिक Pro प्लान लें',
+--    proCtaStayFree: 'मुफ़्त संस्करण जारी रखें',
+--    proCtaYearly: 'वार्षिक Pro प्लान लें',
+--
+--    proFeatureAdsFree: 'स्क्रीन के नीचे बैनर विज्ञापन',
+--    proFeatureAdsPro: 'कोई विज्ञापन नहीं, पूरा ध्यान',
+--    proFeatureHabits: 'जिन आदतों को आप ट्रैक कर सकते हैं',
+--    proFeatureHabitsFree: 'अधिकतम 3 आदतें',
+--    proFeatureHabitsPro: 'असीमित आदतें',
+--    proFeatureThemesFree: '1 थीम (डार्क)',
+--    proFeatureThemesPro: 'सभी थीम अनलॉक',
+--
+--    proFinePrint:
+--      'सदस्यता अपने-आप नवीनीकृत हो जाती है। आप App Store या Google Play की अकाउंट सेटिंग्स से कभी भी रद्द कर सकते हैं।',
+--    proMonthlyTagline: 'छोटे से शुरुआत करें, कभी भी रद्द करें।',
+--    proPlanFreeTitle: 'मुफ़्त',
+--    proPlanMonthlyTitle: 'मासिक',
+--    proPlanYearlyBadge: 'सबसे किफायती',
+--    proPlanYearlyTitle: 'वार्षिक',
+--    proSubtitle: '3 आदतों की सीमा से आगे बढ़ें और अपनी चेन को रोकना मुश्किल बनाएं।',
+--    proYearlySavingShort: 'लगभग 37% बचत (लगभग 8 महीने मुफ़्त के बराबर)।',
+--    proYearlyTagline: 'जो अपनी चेन को गंभीरता से बनाना चाहते हैं, उनके लिए।',
+--
+--    restoreSoon: 'खरीद बहाल करने का विकल्प आने वाले अपडेट में जोड़ा जाएगा।',
+--
+--    themeCyberBlueLabel: 'साइबर ब्लू',
+--    themeDarkLabel: 'डार्क',
+--    themeDesc: 'ऐप का माहौल चुनें। (Pro थीम बाद में जोड़े जाएंगे।)',
+--    themeNeonPinkLabel: 'नियोन पिंक',
+--
+--    tutorialEditIconBody: 'सबसे पहले, अपनी आदत से मेल खाता एक आइकन चुनें।',
+--    tutorialEditNameBody:
+--      'फिर, अपनी आदत के लिए नाम लिखें।\nजैसे: "पानी पिएँ", "किताब पढ़ें"।',
+--    tutorialEditSubmitBody:
+--      'सब तैयार है!\nइस आदत को होम स्क्रीन में जोड़ने के लिए नीचे दिए गए "बनाएँ" बटन को टैप करें।',
+--    tutorialExplainChainBody:
+--      'हर टैप पर आपका "लगातार दिन" काउंटर बढ़ता है और आज का दिन "आपकी चेन" पर हाइलाइट हो जाता है।\nलगातार करते रहें, आपकी चेन लंबी होती जाएगी।',
+--    tutorialGotIt: 'समझ गया',
+--    tutorialNext: 'आगे',
+--    tutorialPressFabBody:
+--      'नीचे दाएँ कोने में + बटन दबाकर पहली आदत बनाएं।',
+--    tutorialPressHabitBody:
+--      'अब वह आदत टैप करें जो आपने अभी बनाई है।\nटैप करने से आज "पूरा" चिन्हित हो जाएगा।',
+--    tutorialStart: 'शुरू करें',
+--    tutorialWelcomeBody:
+--      'स्वागत है!\nDotChain आपको आदतों की चेन बनाने में मदद करता है।\nसबसे पहले + बटन से अपनी पहली आदत बनाएँ।',
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
+-+  daysStreak: 'लगातार दिन',          // 英語: DAYS STREAK (連続日数)
+-+  yourChain: 'आपकी चेन',             // 英語: YOUR CHAIN (あなたのチェーン)
+-+  allDoneDays: 'पूरे किए गए दिन',    // 英語: ALL DONE DAYS (全て完了した日)
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: 'सेटिंग्स',              // 設定 (Settings)
+-+  hapticOff: 'वाइब्रेशन बंद',        // 振動オフ
+-+  language: 'भाषा',                  // 言語
+-+  sound: 'साउंड',                    // 音 (Sound)
+-+  haptics: 'हैप्टिक्स',              // 振動 (Haptics)
+-+  theme: 'थीम',                      // テーマ
+-+
+-+  // --- Purchase / Restore (購入 / 復元) ---
+-+  restore: 'खरीद बहाल करें',         // 購入の復元 (Restore purchases)
+-+  purchaseSuccess: 'Pro प्लान अब सक्रिय है।', // 購入成功
+-+  purchaseFailed: 'खरीदारी विफल रही। कृपया बाद में पुनः प्रयास करें।', // 購入失敗
+-+  restoreSuccess: 'खरीद इतिहास बहाल कर दिया गया।', // 復元成功
+-+  restoreNotFound: 'बहाल करने के लिए कोई खरीदारी नहीं मिली।', // 復元データなし
+-+  restoreFailed: 'खरीद बहाल करने में विफल।', // 復元失敗
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: 'ऐप वर्ज़न',              // アプリバージョン
+-+  tapSound: 'टैप साउंड',             // タップ音
+-+  click: 'क्लिक',                    // クリック
+-+  pop: 'पॉप',                        // ポップ
+-+  soundSwitchLabel: 'साउंड इफेक्ट्स', // 効果音
+-+
+-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
+-+  proTitle: 'अपनी चेन को अनलॉक करें।', // 英語: Unlock your chain.
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: '3 आदतों से आगे बढ़ें और अपने डॉट्स को रोकना मुश्किल बनाएं।',
+-+  proPlanFreeTitle: 'फ्री',          // 無料
+-+  proPlanMonthlyTitle: 'मासिक',      // 月額
+-+  proPlanYearlyTitle: 'वार्षिक',     // 年額
+-+  proPlanYearlyBadge: 'सबसे किफायती', // 英語: Best value (最も価値がある/お得)
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '₹0 / हमेशा के लिए',    // ずっと0ルピー (または $0)
+-+  proOnlyTitle: 'Pro फीचर',          // Pro機能
+-+  proOnlyTheme: 'इस थीम का उपयोग करने के लिए Pro में अपग्रेड करें।',
+-+  openPro: 'Pro प्लान देखें',        // Proプランを見る
+-+  cancel: 'रद्द करें',               // キャンセル
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: 'इलेक्ट्रिक फ्लो ऐनिमेशन', // 電気の流れのアニメーション
+-+  flowEffectHelp:
+-+    'अपनी चेन लाइन पर एक नियन प्रवाह चलने दें। यदि आप शांत लुक चाहते हैं तो इसे बंद कर दें।',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
+-+  heatmapRangeTitle: 'चेन दिखाने की अवधि',
+-+  heatmapRangeHelp: 'चुनें कि होम स्क्रीन हीटमैप पर आपकी चेन के कितने दिन दिखाई दें।',
+-+  heatmapRange7: '1 सप्ताह',
+-+  heatmapRange30: '1 महीना',
+-+  heatmapRange60: '2 महीने',
+-+  heatmapRange90: '3 महीने',
+-+  heatmapRange180: '6 महीने',
+-+  heatmapRange365: '1 साल',
+-+  heatmapSummaryPrefix: 'पिछले ',      // 「過去〜」
+-+  heatmapSummarySuffix: ' दिन',        // 「〜日」
+-+  heatmapAgoSuffix: ' दिन पहले',       // 「〜日前」
+-+  heatmapToday: 'आज',
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: 'ऐप का स्वरूप बदलें।',
+-+  themeDarkLabel: 'डार्क',             // Dark
+-+  themeNeonPinkLabel: 'नियन पिंक',
+-+  themeCyberBlueLabel: 'साइबर ब्लू',
+-+  freeThemeNote: 'फ्री: केवल डार्क / Pro में नियन पिंक और साइबर ब्लू अनलॉक होते हैं',
+-+  proThemeNote: 'Pro थीम सदस्यता के बाद उपलब्ध होंगे।',
+-+
+-+  // --- Habit Management (習慣管理) ---
+-+  newHabitTitle: 'नई आदत',
+-+  editHabitTitle: 'आदत बदलें',
+-+  habitNameLabel: 'नाम',
+-+  habitNamePlaceholder: 'जैसे: पानी पीना, किताब पढ़ना',
+-+  habitIconLabel: 'आइकन',
+-+  deleteHabit: 'यह आदत हटाएं',
+-+  deleteConfirmationTitle: 'हटाएं?',
+-+  deleteConfirmationMessage: 'इसे पूर्ववत नहीं किया जा सकता। सारा इतिहास मिट जाएगा।',
+-+  save: 'सेव करें',
+-+  create: 'बनाएं',
+-+
+-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
+-+  iconCatBasic: 'बेसिक',
+-+  iconCatHealth: 'सेहत',
+-+  iconCatLearning: 'सीखना',
+-+
+-+  iconLabelStreak: 'लगातार',         // Streak
+-+  iconLabelTask: 'कार्य',            // Task
+-+  iconLabelShine: 'चमक',             // Shine
+-+  iconLabelClean: 'सफाई',            // Clean
+-+  iconLabelLaundry: 'धुलाई',         // Laundry
+-+  iconLabelWater: 'पानी',            // Water
+-+  iconLabelWalk: 'चलना',             // Walk
+-+  iconLabelSleep: 'नींद',            // Sleep
+-+  iconLabelWorkout: 'कसरत',          // Workout
+-+  iconLabelBarbell: 'डंबल',          // Barbell
+-+  iconLabelRead: 'पढ़ना',            // Read
+-+  iconLabelArt: 'कला',               // Art
+-+  iconLabelMedia: 'मीडिया',          // Media
+-+  iconLabelStudy: 'पढ़ाई',           // Study
+-+  iconLabelLanguage: 'भाषा',         // Language
+-+
+-+  // --- Misc / Errors (その他 / エラー) ---
+-+  habitButtonSuffix: ' आदत बटन',     // アクセシビリティ用
+-+  errorLoadFailed: 'डेटा लोड करने में विफल।',
+-+  errorTitleRequired: 'नाम आवश्यक है।',
+-+  errorTitleTooLong: 'नाम 20 अक्षरों या उससे कम का होना चाहिए।',
+-+  errorSaveFailed: 'सेव करने में विफल।',
+-+  errorDeleteFailed: 'हटाने में विफल।',
+-+  errorToggleFailed: 'अपडेट करने में विफल।',
+-+  habitLimitTitle: 'फ्री प्लान की सीमा',
+-+  habitLimitBody: 'फ्री प्लान में आप 3 आदतें तक बना सकते हैं।',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: 'हैप्टिक फीडबैक (कंपन)',
+-+
+-+  // --- Reminder (リマインダー) ---
+-+  reminderSectionTitle: 'रिमाइंडर',
+-+  reminderToggleLabel: 'रिमाइंडर का उपयोग करें',
+-+  reminderTimeLabel: 'नोटिफिकेशन का समय',
+-+  reminderNotificationBody: 'यह आपकी चेन बनाने का समय है!', // チェーンを作る時間だよ！
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: '7 दिन लगातार!',
+-+  streak7Message: 'आपने पूरे एक सप्ताह अपनी चेन बनाए रखी। बहुत बढ़िया!',
+-+  ok: 'शानदार',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: 'भाषा बदलें',
+-+  currentLanguage: 'वर्तमान',
+-+  languageNameEn: 'अंग्रेजी',
+-+  languageNameJa: 'जापानी',
+-+  languageNameFr: 'फ्रेंच',
+-+  languageNameEs: 'स्पेनिश',
+-+  languageNameDe: 'जर्मन',
+-+  languageNameIt: 'इतालवी',
+-+  languageNamePt: 'पुर्तगाली',
+-+  languageNameRu: 'रूसी',
+-+  languageNameZh: 'चीनी',
+-+  languageNameKo: 'कोरियाई',
+-+  languageNameHi: 'हिन्दी',
+-+  languageNameId: 'इंडोनेशियाई',
+-+  languageNameTh: 'थाई',
+-+  languageNameVi: 'वियतनामी',
+-+  languageNameMs: 'मलय',
+-+  languageNameTr: 'तुर्की',
+-+  languageNameNl: 'डच',
+-+  languageNameSv: 'स्वीडिश',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: 'आगे',
+-+  tutorialWelcome: 'DotChain में आपका स्वागत है',
+-+  tutorialDesc1: 'अपनी दैनिक आदतों को जोड़ें और अपनी खुद की चेन बनाएं।',
+-+  tutorialDesc2: 'आदत बनाए रखने के लिए चेन को टूटने न दें।',
+-+  tutorialStart: 'शुरू करें',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/id.ts b/src/core/i18n/locales/id.ts
+-index 8d412c1..42297b9 100644
+---- a/src/core/i18n/locales/id.ts
+-+++ b/src/core/i18n/locales/id.ts
+-@@ -1,174 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'HARI BERUNTUN',
+--    yourChain: 'RANTAI KAMU',
+--    allDoneDays: 'HARI SEMUA SELESAI',
+--    settings: 'Pengaturan',
+--    hapticOff: 'Getar mati',
+--    language: 'Bahasa',
+--    sound: 'Suara',
+--    haptics: 'Getaran',
+--    theme: 'Tema',
+--    restore: 'Pulihkan pembelian',
+--    version: 'Versi aplikasi',
+--    tapSound: 'Suara tap',
+--    click: 'Klik',
+--    pop: 'Pop',
+--    flowEffectTitle: 'Animasi aliran listrik',
+--    flowEffectHelp: 'Biarkan aliran neon mengalir di garis rantai. Matikan jika ingin tampilan lebih tenang.',
+--    heatmapRangeTitle: 'Rentang tampilan rantai',
+--    heatmapRangeHelp: 'Pilih berapa hari rantai yang ditampilkan di heatmap beranda.',
+--    heatmapRange7: '1 minggu',
+--    heatmapRange30: '1 bulan',
+--    heatmapRange60: '2 bulan',
+--    heatmapRange180: '6 bulan',
+--    heatmapRange365: '1 tahun',
+--    heatmapSummaryPrefix: '',
+--    heatmapSummarySuffix: ' hari terakhir',
+--    heatmapAgoSuffix: ' hari yang lalu',
+--    heatmapToday: 'Hari ini',
+--    freeThemeNote: 'Gratis: hanya Dark / Pro membuka Neon Pink & Cyber Blue',
+--    proThemeNote: 'Tema Pro aktif setelah pembayaran.',
+--    restoreDesc: 'Pulihkan pembelian (segera)',
+--    licenses: 'Lisensi sumber terbuka (segera)',
+--    openPro: 'Buka DotChain Pro',
+--    heroPaywall: 'Upgrade ke dunia neon',
+--    priceMonthly: '$1.99 / bulan',
+--    onboardingTitle: 'Selamat datang di DotChain',
+--    onboardingBody: 'Sekali tap, getaran kuat. Bangun rantai hari ini.',
+--    start: 'Mulai',
+--    paywallNote: 'Fitur penagihan dan iklan akan ditambahkan nanti.',
+--    homeLoading: 'Memuat...',
+--    homeAddHabitLabel: 'Tambah kebiasaan',
+--    editNewHabit: 'Kebiasaan baru',
+--    editHabitTitle: 'Edit kebiasaan',
+--    editCategoryLabel: 'Kategori',
+--    editNameLabel: 'Nama (maks 20 karakter)',
+--    editNamePlaceholder: 'Beri nama kebiasaanmu...',
+--    editSaveChanges: 'Simpan perubahan',
+--    editCreateHabit: 'Buat kebiasaan',
+--    editDeleteHabit: 'Hapus kebiasaan',
+--    proTitle: 'Bebaskan rantaimu.',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'Kebiasaan tak terbatas',
+--    proFeatureThemes: 'Semua tema terbuka (Neon Pink / Cyber Blue)',
+--    proFeatureAds: 'Tanpa iklan',
+--    habitButtonSuffix: ' tombol kebiasaan',
+--    iconCatBasic: 'Dasar',
+--    iconCatHealth: 'Kesehatan',
+--    iconCatLearning: 'Belajar & Kerja',
+--    errorLoadFailed: 'Gagal memuat data',
+--    errorTitleRequired: 'Judul wajib diisi.',
+--    errorTitleTooLong: 'Judul harus 20 karakter atau kurang.',
+--    errorSaveFailed: 'Gagal menyimpan.',
+--    errorDeleteFailed: 'Gagal menghapus.',
+--    errorToggleFailed: 'Gagal memperbarui.',
+--    habitLimitTitle: 'Batas paket gratis',
+--    habitLimitBody: 'Dalam paket gratis kamu bisa membuat hingga 3 kebiasaan.',
+--    hapticsDescription: 'Umpan balik haptik',
+--    reminderSectionTitle: 'Notifikasi pengingat',
+--    reminderToggleLabel: 'Gunakan pengingat',
+--    reminderTimeLabel: 'Waktu notifikasi',
+--    reminderNotificationBody: 'Saatnya membangun rantaimu.',
+--    streak7Title: 'Rangkaian 7 hari!',
+--    streak7Message: 'Kamu menjaga rantaimu selama satu minggu penuh. Kerja bagus!',
+--    ok: 'OK',
+--    languageChange: 'Ganti bahasa',
+--    currentLanguage: 'Saat ini',
+--    languageNameEn: 'Inggris',
+--    languageNameJa: 'Jepang',
+--    languageNameFr: 'Perancis',
+--    languageNameEs: 'Spanyol',
+--    languageNameDe: 'Jerman',
+--    languageNameIt: 'Italia',
+--    languageNamePt: 'Portugis',
+--    languageNameRu: 'Rusia',
+--    languageNameZh: 'Tionghoa',
+--    languageNameKo: 'Korea',
+--    languageNameHi: 'Hindi',
+--    languageNameId: 'Bahasa Indonesia',
+--    languageNameTh: 'Thai',
+--    languageNameVi: 'Vietnam',
+--    languageNameMs: 'Melayu',
+--    languageNameTr: 'Turki',
+--    languageNameNl: 'Belanda',
+--    languageNameSv: 'Swedia',
+--    soundSwitchLabel: 'Aktifkan suara',
+--    tapSoundLabel: 'Gaya suara ketukan',
+--    proOnlyTitle: 'Hanya untuk Pro',
+--    proOnlyTheme: 'Tema ini tersedia di Pro.',
+--
+--    // Melengkapi 51 kunci yang hilang
+--    cancel: 'Batal',
+--    delete: 'Hapus',
+--    deleteConfirmBody: 'Yakin ingin menghapus? Tindakan ini tidak bisa dibatalkan.',
+--    comingSoonTitle: 'Segera hadir',
+--    onboardingPunch: 'Inilah DotChain.',
+--
+--    paywallBestValueBadge: 'Paling hemat',
+--    paywallMonthlyLabel: 'Paket bulanan',
+--    paywallMonthlySub: 'Ditagih setiap bulan. Bisa dibatalkan kapan saja.',
+--    paywallYearlyLabel: 'Paket tahunan',
+--    paywallYearlySub: 'Ditagih setahun sekali. Bisa dibatalkan kapan saja.',
+--
+--    priceFree: '$0 / selamanya',
+--    priceYearly: '$14.99 / tahun',
+--
+--    proCompareHeaderFeature: 'Fitur',
+--    proCompareHeaderFree: 'Gratis',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      'Kamu selalu bisa tetap di paket Gratis. Pro hanya menghapus batas-batasnya.',
+--    proCompareTitle: 'Apa yang kamu dapatkan dengan Pro',
+--
+--    proCtaMonthly: 'Dapatkan Pro bulanan',
+--    proCtaStayFree: 'Lanjut dengan versi gratis',
+--    proCtaYearly: 'Dapatkan Pro tahunan',
+--
+--    proFeatureAdsFree: 'Banner iklan di bagian bawah',
+--    proFeatureAdsPro: 'Tanpa iklan, fokus penuh',
+--    proFeatureHabits: 'Kebiasaan yang bisa kamu lacak',
+--    proFeatureHabitsFree: 'Maksimal 3 kebiasaan',
+--    proFeatureHabitsPro: 'Kebiasaan tak terbatas',
+--    proFeatureThemesFree: '1 tema (Gelap)',
+--    proFeatureThemesPro: 'Semua tema terbuka',
+--
+--    proFinePrint:
+--      'Langganan diperpanjang otomatis. Kamu bisa membatalkannya kapan saja dari pengaturan akun App Store atau Google Play.',
+--    proMonthlyTagline: 'Mulai kecil, bisa dibatalkan kapan saja.',
+--    proPlanFreeTitle: 'Gratis',
+--    proPlanMonthlyTitle: 'Bulanan',
+--    proPlanYearlyBadge: 'Paling hemat',
+--    proPlanYearlyTitle: 'Tahunan',
+--    proSubtitle: 'Lewati 3 kebiasaan dan buat titik-titikmu tak terhentikan.',
+--    proYearlySavingShort: 'Hemat sekitar 37% (seperti 8 bulan gratis).',
+--    proYearlyTagline: 'Untuk pembangun rantai yang benar-benar serius.',
+--
+--    restoreSoon: 'Fitur memulihkan pembelian akan ditambahkan di pembaruan berikutnya.',
+--
+--    themeCyberBlueLabel: 'Cyber Blue',
+--    themeDarkLabel: 'Gelap',
+--    themeDesc: 'Pilih suasana aplikasi. (Tema Pro akan hadir belakangan.)',
+--    themeNeonPinkLabel: 'Neon Pink',
+--
+--    tutorialEditIconBody: 'Pertama, pilih ikon yang sesuai dengan kebiasaanmu.',
+--    tutorialEditNameBody:
+--      'Berikutnya, beri nama untuk kebiasaanmu.\nContoh: "Minum air", "Membaca buku".',
+--    tutorialEditSubmitBody:
+--      'Semua siap!\nKetuk tombol buat di bawah untuk menambahkan kebiasaan ini ke beranda.',
+--    tutorialExplainChainBody:
+--      'Setiap kali kamu mengetuk, hitungan HARI BERUNTUN bertambah dan hari ini akan menyala di RANTAI KAMU.\nTerus lanjutkan untuk memanjangkan rantaimu.',
+--    tutorialGotIt: 'Mengerti',
+--    tutorialNext: 'Berikutnya',
+--    tutorialPressFabBody:
+--      'Ketuk tombol + di kanan bawah untuk membuat kebiasaan pertamamu.',
+--    tutorialPressHabitBody:
+--      'Sekarang ketuk kebiasaan yang baru kamu buat.\nDengan mengetuknya, hari ini akan ditandai sebagai "selesai".',
+--    tutorialStart: 'Mulai',
+--    tutorialWelcomeBody:
+--      'Selamat datang!\nDotChain membantu kamu membangun rantai kebiasaan.\nMulai dengan membuat kebiasaan pertama lewat tombol +.',
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
+-+  daysStreak: 'HARI BERUNTUN',       // 英語: DAYS STREAK (連続日数)
+-+  yourChain: 'RANTAI KAMU',          // 英語: YOUR CHAIN (あなたのチェーン)
+-+  allDoneDays: 'HARI TUNTAS',        // 英語: ALL DONE DAYS (全て完了した日)
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: 'Pengaturan',            // 設定
+-+  hapticOff: 'Getaran mati',         // 振動オフ
+-+  language: 'Bahasa',                // 言語
+-+  sound: 'Suara',                    // 音
+-+  haptics: 'Getaran',                // 振動 (Haptics)
+-+  theme: 'Tema',                     // テーマ
+-+
+-+  // --- Purchase / Restore (購入 / 復元) ---
+-+  restore: 'Pulihkan Pembelian',     // 購入の復元
+-+  purchaseSuccess: 'Paket Pro kini aktif.', // 購入成功
+-+  purchaseFailed: 'Pembelian gagal. Silakan coba lagi nanti.', // 購入失敗
+-+  restoreSuccess: 'Riwayat pembelian dipulihkan.', // 復元成功
+-+  restoreNotFound: 'Tidak ada pembelian untuk dipulihkan.', // 復元データなし
+-+  restoreFailed: 'Gagal memulihkan pembelian.', // 復元失敗
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: 'Versi Aplikasi',         // アプリバージョン
+-+  tapSound: 'Suara Tap',             // タップ音
+-+  click: 'Klik',                     // クリック
+-+  pop: 'Pop',                        // ポップ
+-+  soundSwitchLabel: 'Efek Suara',    // 効果音
+-+
+-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
+-+  proTitle: 'Buka rantaimu.',        // 英語: Unlock your chain.
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: 'Lebih dari 3 kebiasaan dan buat titik-titikmu tak terhentikan.',
+-+  proPlanFreeTitle: 'Gratis',        // 無料
+-+  proPlanMonthlyTitle: 'Bulanan',    // 月額
+-+  proPlanYearlyTitle: 'Tahunan',     // 年額
+-+  proPlanYearlyBadge: 'Paling Hemat', // 英語: Best value (一番お得/節約できる)
+-+  proBadgeShort: 'PRO',
+-+  priceFree: 'Rp0 / selamanya',      // ずっと0ルピア (または $0)
+-+  proOnlyTitle: 'Fitur Pro',         // Pro機能
+-+  proOnlyTheme: 'Upgrade ke Pro untuk menggunakan tema ini.',
+-+  openPro: 'Lihat Paket Pro',        // Proプランを見る
+-+  cancel: 'Batal',                   // キャンセル
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: 'Animasi Aliran Listrik', // 電気の流れのアニメーション
+-+  flowEffectHelp:
+-+    'Biarkan aliran neon mengalir di sepanjang rantaimu. Matikan jika ingin tampilan yang lebih tenang.',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
+-+  heatmapRangeTitle: 'Rentang Tampilan',
+-+  heatmapRangeHelp: 'Pilih berapa hari rantai yang akan ditampilkan di peta panas beranda.',
+-+  heatmapRange7: '1 minggu',
+-+  heatmapRange30: '1 bulan',
+-+  heatmapRange60: '2 bulan',
+-+  heatmapRange90: '3 bulan',
+-+  heatmapRange180: '6 bulan',
+-+  heatmapRange365: '1 tahun',
+-+  heatmapSummaryPrefix: '',          // 空文字 (数字の後ろに言葉が来るため)
+-+  heatmapSummarySuffix: ' hari terakhir', // 「〜 hari terakhir (過去〜日間)」
+-+  heatmapAgoSuffix: ' hari lalu',    // 「〜日前」
+-+  heatmapToday: 'Hari ini',
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: 'Ubah tampilan aplikasi.',
+-+  themeDarkLabel: 'Gelap',           // Dark
+-+  themeNeonPinkLabel: 'Neon Pink',
+-+  themeCyberBlueLabel: 'Cyber Blue',
+-+  freeThemeNote: 'Gratis: Hanya Gelap / Pro membuka Neon Pink & Cyber Blue',
+-+  proThemeNote: 'Tema Pro akan terbuka setelah berlangganan.',
+-+
+-+  // --- Habit Management (習慣管理) ---
+-+  newHabitTitle: 'Kebiasaan Baru',
+-+  editHabitTitle: 'Edit Kebiasaan',
+-+  habitNameLabel: 'Nama',
+-+  habitNamePlaceholder: 'Cth: Minum air, Baca buku',
+-+  habitIconLabel: 'Ikon',
+-+  deleteHabit: 'Hapus kebiasaan ini',
+-+  deleteConfirmationTitle: 'Hapus?',
+-+  deleteConfirmationMessage: 'Tindakan ini tidak bisa dibatalkan. Semua riwayat akan hilang.',
+-+  save: 'Simpan',
+-+  create: 'Buat',
+-+
+-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
+-+  iconCatBasic: 'Dasar',
+-+  iconCatHealth: 'Kesehatan',
+-+  iconCatLearning: 'Belajar',
+-+
+-+  iconLabelStreak: 'Runtun',         // Streak
+-+  iconLabelTask: 'Tugas',            // Task
+-+  iconLabelShine: 'Kilau',           // Shine
+-+  iconLabelClean: 'Bersih',          // Clean
+-+  iconLabelLaundry: 'Cucian',        // Laundry
+-+  iconLabelWater: 'Air',             // Water
+-+  iconLabelWalk: 'Jalan',            // Walk
+-+  iconLabelSleep: 'Tidur',           // Sleep
+-+  iconLabelWorkout: 'Olahraga',      // Workout
+-+  iconLabelBarbell: 'Barbel',        // Barbell
+-+  iconLabelRead: 'Baca',             // Read
+-+  iconLabelArt: 'Seni',              // Art
+-+  iconLabelMedia: 'Media',           // Media
+-+  iconLabelStudy: 'Belajar',         // Study
+-+  iconLabelLanguage: 'Bahasa',       // Language
+-+
+-+  // --- Misc / Errors (その他 / エラー) ---
+-+  habitButtonSuffix: ' tombol kebiasaan', // アクセシビリティ用
+-+  errorLoadFailed: 'Gagal memuat data.',
+-+  errorTitleRequired: 'Nama wajib diisi.',
+-+  errorTitleTooLong: 'Nama maksimal 20 karakter.',
+-+  errorSaveFailed: 'Gagal menyimpan.',
+-+  errorDeleteFailed: 'Gagal menghapus.',
+-+  errorToggleFailed: 'Gagal memperbarui.',
+-+  habitLimitTitle: 'Batas Paket Gratis',
+-+  habitLimitBody: 'Di paket gratis, kamu hanya bisa membuat hingga 3 kebiasaan.',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: 'Umpan balik getaran',
+-+
+-+  // --- Reminder (リマインダー) ---
+-+  reminderSectionTitle: 'Pengingat',
+-+  reminderToggleLabel: 'Gunakan pengingat',
+-+  reminderTimeLabel: 'Waktu notifikasi',
+-+  reminderNotificationBody: 'Waktunya membangun rantaimu!', // チェーンを作る時間だよ！
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: '7 hari beruntun!',
+-+  streak7Message: 'Kamu telah menjaga rantaimu selama seminggu penuh. Kerja bagus!',
+-+  ok: 'Mantap',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: 'Ganti Bahasa',
+-+  currentLanguage: 'Saat ini',
+-+  languageNameEn: 'Inggris',
+-+  languageNameJa: 'Jepang',
+-+  languageNameFr: 'Prancis',
+-+  languageNameEs: 'Spanyol',
+-+  languageNameDe: 'Jerman',
+-+  languageNameIt: 'Italia',
+-+  languageNamePt: 'Portugis',
+-+  languageNameRu: 'Rusia',
+-+  languageNameZh: 'Mandarin',
+-+  languageNameKo: 'Korea',
+-+  languageNameHi: 'Hindi',
+-+  languageNameId: 'Indonesia',
+-+  languageNameTh: 'Thailand',
+-+  languageNameVi: 'Vietnam',
+-+  languageNameMs: 'Melayu',
+-+  languageNameTr: 'Turki',
+-+  languageNameNl: 'Belanda',
+-+  languageNameSv: 'Swedia',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: 'Lanjut',
+-+  tutorialWelcome: 'Selamat datang di DotChain',
+-+  tutorialDesc1: 'Hubungkan kebiasaan harianmu dan bangun rantaimu sendiri.',
+-+  tutorialDesc2: 'Jangan putus rantainya agar kebiasaanmu tetap terjaga.',
+-+  tutorialStart: 'Mulai',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/it.ts b/src/core/i18n/locales/it.ts
+-index 9b3623a..669ed43 100644
+---- a/src/core/i18n/locales/it.ts
+-+++ b/src/core/i18n/locales/it.ts
+-@@ -1,178 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'GIORNI DI FILA',
+--    yourChain: 'LA TUA CATENA',
+--    allDoneDays: 'GIORNI COMPLETI',
+--    settings: 'Impostazioni',
+--    hapticOff: 'Vibrazione disattivata',
+--    language: 'Lingua',
+--    sound: 'Suono',
+--    haptics: 'Vibrazione',
+--    theme: 'Tema',
+--    restore: 'Ripristina acquisti',
+--    version: "Versione dell`app",
+--    tapSound: `Suono tocco`,
+--    click: `Click`,
+--    pop: `Pop`,
+--    flowEffectTitle: `Animazione del flusso elettrico`,
+--    flowEffectHelp:
+--      `Fa scorrere un flusso neon lungo la linea della catena. Disattiva se preferisci un aspetto più calmo.`,
+--    heatmapRangeTitle: `Intervallo di visualizzazione della catena`,
+--    heatmapRangeHelp:
+--      `Scegli quanti giorni della catena mostrare nella mappa di calore della schermata iniziale.`,
+--    heatmapRange7: '1 settimana',
+--    heatmapRange30: `1 mese`,
+--    heatmapRange60: `2 mesi`,
+--    heatmapRange180: `6 mesi`,
+--    heatmapRange365: `1 anno`,
+--    heatmapSummaryPrefix: `Ultimi `,
+--    heatmapSummarySuffix: ` giorni`,
+--    heatmapAgoSuffix: ` giorni fa`,
+--    heatmapToday: `Oggi`,
+--    freeThemeNote: `Gratis: solo Dark / Pro sblocca Neon Pink & Cyber Blue`,
+--    proThemeNote: `I temi Pro si attivano dopo il pagamento.`,
+--    restoreDesc: `Ripristina acquisti (a breve)`,
+--    licenses: `Licenze open source (a breve)`,
+--    openPro: `Apri DotChain Pro`,
+--    heroPaywall: `Passa al mondo neon`,
+--    priceMonthly: `$1.99 / mese`,
+--    onboardingTitle: `Benvenuto su DotChain`,
+--    onboardingBody: `Un tap, vibrazione forte. Costruiamo la catena di oggi.`,
+--    start: `Inizia`,
+--    paywallNote: `Fatturazione e annunci saranno aggiunti più avanti.`,
+--    homeLoading: `Caricamento...`,
+--    homeAddHabitLabel: `Aggiungi abitudine`,
+--    editNewHabit: `Nuova abitudine`,
+--    editHabitTitle: `Modifica abitudine`,
+--    editCategoryLabel: `Categoria`,
+--    editNameLabel: `Nome (max 20 caratteri)`,
+--    editNamePlaceholder: `Dai un nome alla tua abitudine...`,
+--    editSaveChanges: `Salva modifiche`,
+--    editCreateHabit: `Crea abitudine`,
+--    editDeleteHabit: `Elimina abitudine`,
+--    proTitle: `Sblocca la tua catena.`,
+--    proHeaderTitle: `DotChain Pro`,
+--    proFeatureUnlimited: `Abitudini illimitate`,
+--    proFeatureThemes: `Tutti i temi sbloccati (Neon Pink / Cyber Blue)`,
+--    proFeatureAds: `Nessuna pubblicità`,
+--    habitButtonSuffix: ` pulsante abitudine`,
+--    iconCatBasic: `Base`,
+--    iconCatHealth: `Salute`,
+--    iconCatLearning: `Studio & Lavoro`,
+--    errorLoadFailed: `Caricamento dei dati fallito`,
+--    errorTitleRequired: `Il titolo è obbligatorio.`,
+--    errorTitleTooLong: `Il titolo deve avere al massimo 20 caratteri.`,
+--    errorSaveFailed: `Salvataggio fallito.`,
+--    errorDeleteFailed: `Eliminazione fallita.`,
+--    errorToggleFailed: `Aggiornamento fallito.`,
+--    habitLimitTitle: `Limite del piano gratuito`,
+--    habitLimitBody: `Nel piano gratuito puoi creare fino a 3 abitudini.`,
+--    hapticsDescription: `Feedback aptico`,
+--    reminderSectionTitle: `Notifica promemoria`,
+--    reminderToggleLabel: `Usa il promemoria`,
+--    reminderTimeLabel: `Orario notifica`,
+--    reminderNotificationBody: `È il momento di far crescere la tua catena.`,
+--    streak7Title: `Serie di 7 giorni!`,
+--    streak7Message: `Hai tenuto la tua catena per una settimana intera. Ottimo lavoro!`,
+--    ok: `OK`,
+--    languageChange: `Cambia lingua`,
+--    currentLanguage: `Attuale`,
+--    languageNameEn: `Inglese`,
+--    languageNameJa: `Giapponese`,
+--    languageNameFr: `Francese`,
+--    languageNameEs: `Spagnolo`,
+--    languageNameDe: `Tedesco`,
+--    languageNameIt: `Italiano`,
+--    languageNamePt: `Portoghese`,
+--    languageNameRu: `Russo`,
+--    languageNameZh: `Cinese`,
+--    languageNameKo: `Coreano`,
+--    languageNameHi: `Hindi`,
+--    languageNameId: `Indonesiano`,
+--    languageNameTh: `Thailandese`,
+--    languageNameVi: `Vietnamita`,
+--    languageNameMs: `Malese`,
+--    languageNameTr: `Turco`,
+--    languageNameNl: `Olandese`,
+--    languageNameSv: `Svedese`,
+--    soundSwitchLabel: `Attiva audio`,
+--    tapSoundLabel: `Stile suono tocco`,
+--    proOnlyTitle: `Solo per Pro`,
+--    proOnlyTheme: `Questo tema è disponibile con Pro.`,
+--
+--    // Completamento delle chiavi mancanti
+--    cancel: `Annulla`,
+--    delete: `Elimina`,
+--    deleteConfirmBody: `Sei sicuro? Questa azione non può essere annullata.`,
+--    comingSoonTitle: `In arrivo`,
+--    onboardingPunch: `Questo è DotChain.`,
+--
+--    paywallBestValueBadge: `Più conveniente`,
+--    paywallMonthlyLabel: `Piano mensile`,
+--    paywallMonthlySub: `Fatturato ogni mese. Puoi annullare quando vuoi.`,
+--    paywallYearlyLabel: `Piano annuale`,
+--    paywallYearlySub: `Fatturato una volta l’anno. Puoi annullare quando vuoi.`,
+--
+--    priceFree: `$0 / per sempre`,
+--    priceYearly: `$14.99 / anno`,
+--
+--    proCompareHeaderFeature: `Funzione`,
+--    proCompareHeaderFree: `Gratis`,
+--    proCompareHeaderPro: `Pro`,
+--    proCompareSubtitle:
+--      `Puoi sempre restare nel piano Gratis. Pro serve solo a togliere i limiti.`,
+--    proCompareTitle: `Cosa ottieni con Pro`,
+--
+--    proCtaMonthly: `Ottieni Pro mensile`,
+--    proCtaStayFree: `Continua con il piano Gratis`,
+--    proCtaYearly: `Ottieni Pro annuale`,
+--
+--    proFeatureAdsFree: `Banner pubblicitari in basso`,
+--    proFeatureAdsPro: `Nessuna pubblicità, massima concentrazione`,
+--    proFeatureHabits: `Abitudini che puoi tracciare`,
+--    proFeatureHabitsFree: `Fino a 3 abitudini`,
+--    proFeatureHabitsPro: `Abitudini illimitate`,
+--    proFeatureThemesFree: `1 tema (Dark)`,
+--    proFeatureThemesPro: `Tutti i temi sbloccati`,
+--
+--    proFinePrint:
+--      `L’abbonamento si rinnova automaticamente. Puoi annullare in qualsiasi momento dalle impostazioni del tuo account App Store o Google Play.`,
+--    proMonthlyTagline: `Inizia in piccolo, annulla quando vuoi.`,
+--    proPlanFreeTitle: `Gratis`,
+--    proPlanMonthlyTitle: `Mensile`,
+--    proPlanYearlyBadge: `Più conveniente`,
+--    proPlanYearlyTitle: `Annuale`,
+--    proSubtitle:
+--      `Supera il limite di 3 abitudini e rendi inarrestabile la tua catena di punti.`,
+--    proYearlySavingShort: `Risparmi circa il 37% (come 8 mesi gratis).`,
+--    proYearlyTagline: `Per chi vuole costruire la catena sul serio.`,
+--
+--    restoreSoon: `La funzione di ripristino degli acquisti sarà aggiunta in un aggiornamento futuro.`,
+--
+--    themeCyberBlueLabel: `Blu cyber`,
+--    themeDarkLabel: `Scuro`,
+--    themeDesc: `Scegli lo stile che preferisci. (I temi Pro arriveranno più avanti.)`,
+--    themeNeonPinkLabel: `Neon rosa`,
+--
+--    tutorialEditIconBody:
+--      `Per prima cosa, scegli un’icona che rappresenti la tua abitudine.`,
+--    tutorialEditNameBody:
+--      `Poi inserisci un nome per la tua abitudine.\nPer esempio: "Bere acqua", "Leggere un libro".`,
+--    tutorialEditSubmitBody:
+--      `Ci sei!\nTocca il pulsante di creazione qui sotto per aggiungere questa abitudine alla schermata iniziale.`,
+--    tutorialExplainChainBody:
+--      `Ogni volta che tocchi, i tuoi GIORNI DI FILA aumentano e oggi si accende nella TUA CATENA.\nContinua per allungare sempre di più la catena.`,
+--    tutorialGotIt: `Capito!`,
+--    tutorialNext: `Avanti`,
+--    tutorialPressFabBody:
+--      `Tocca il pulsante + in basso a destra per creare la tua prima abitudine.`,
+--    tutorialPressHabitBody:
+--      `Ora tocca l’abitudine che hai appena creato.\nOgni tocco segna oggi come "completato".`,
+--    tutorialStart: `Inizia`,
+--    tutorialWelcomeBody:
+--      `Benvenuto!\nDotChain ti aiuta a costruire la tua catena di abitudini.\nInizia creando la tua prima abitudine dal pulsante +.`,
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム画面のヘッダー) ---
+-+  daysStreak: 'GIORNI DI FILA',      // 英語: DAYS STREAK (連続日数)
+-+  yourChain: 'LA TUA CATENA',        // 英語: YOUR CHAIN
+-+  allDoneDays: 'GIORNI COMPLETATI',  // 英語: ALL DONE DAYS (全て完了した日)
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: 'Impostazioni',          // 設定
+-+  hapticOff: 'Vibrazione disattivata', // 振動オフ
+-+  language: 'Lingua',                // 言語
+-+  sound: 'Suoni',                    // 音
+-+  haptics: 'Vibrazione',             // 英語: Haptics (わかりやすく「振動」と翻訳)
+-+  theme: 'Tema',                     // テーマ
+-+
+-+  // --- Purchase / Restore (課金・復元) ---
+-+  restore: 'Ripristina acquisti',    // 購入の復元
+-+  purchaseSuccess: 'Il piano Pro è attivo.', // 購入成功
+-+  purchaseFailed: 'Acquisto fallito. Riprova più tardi.', // 購入失敗
+-+  restoreSuccess: 'Cronologia acquisti ripristinata.', // 復元成功
+-+  restoreNotFound: 'Nessun acquisto trovato da ripristinare.', // 復元データなし
+-+  restoreFailed: 'Impossibile ripristinare gli acquisti.', // 復元失敗
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: 'Versione App',           // アプリバージョン
+-+  tapSound: 'Suono al tocco',        // タップ音
+-+  click: 'Click',                    // クリック
+-+  pop: 'Pop',                        // ポップ
+-+  soundSwitchLabel: 'Effetti sonori', // 効果音
+-+
+-+  // --- Pro Screen (Paywall) (課金画面) ---
+-+  proTitle: 'Sblocca la tua catena.', // 英語: Unlock your chain.
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: 'Crea abitudini illimitate e rendi i tuoi punti inarrestabili.',
+-+  proPlanFreeTitle: 'Gratis',
+-+  proPlanMonthlyTitle: 'Mensile',
+-+  proPlanYearlyTitle: 'Annuale',
+-+  proPlanYearlyBadge: 'Migliore offerta', // 英語: Best value (一番お得)
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '0 € / per sempre',     // ずっと0円
+-+  proOnlyTitle: 'Funzione Pro',      // Pro機能
+-+  proOnlyTheme: 'Passa a Pro per usare questo tema.',
+-+  openPro: 'Vedi piano Pro',         // Proプランを見る
+-+  cancel: 'Annulla',                 // キャンセル
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: 'Animazione flusso elettrico',
+-+  flowEffectHelp:
+-+    'Fai scorrere un flusso al neon lungo la tua catena. Disattivalo se preferisci un aspetto più calmo.',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップの表示期間) ---
+-+  heatmapRangeTitle: 'Intervallo visualizzazione',
+-+  heatmapRangeHelp: 'Scegli quanti giorni della tua catena mostrare nella mappa di calore.',
+-+  heatmapRange7: '1 settimana',
+-+  heatmapRange30: '1 mese',
+-+  heatmapRange60: '2 mesi',
+-+  heatmapRange90: '3 mesi',
+-+  heatmapRange180: '6 mesi',
+-+  heatmapRange365: '1 anno',
+-+  heatmapSummaryPrefix: 'Ultimi ',
+-+  heatmapSummarySuffix: ' giorni',
+-+  heatmapAgoSuffix: ' giorni fa',
+-+  heatmapToday: 'Oggi',              // 今日
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: 'Cambia l’aspetto dell’applicazione.',
+-+  themeDarkLabel: 'Scuro',           // Dark
+-+  themeNeonPinkLabel: 'Neon Rosa',
+-+  themeCyberBlueLabel: 'Cyber Blu',
+-+  freeThemeNote: 'Gratis: Solo Scuro / Pro sblocca Neon Rosa e Cyber Blu',
+-+  proThemeNote: 'I temi Pro saranno disponibili presto.',
+-+
+-+  // --- Habit Management (習慣の管理) ---
+-+  newHabitTitle: 'Nuova abitudine',
+-+  editHabitTitle: 'Modifica abitudine',
+-+  habitNameLabel: 'Nome',
+-+  habitNamePlaceholder: 'es. Leggere un libro, Bere acqua',
+-+  habitIconLabel: 'Icona',
+-+  deleteHabit: 'Elimina questa abitudine',
+-+  deleteConfirmationTitle: 'Eliminare?',
+-+  deleteConfirmationMessage: 'Questa azione non può essere annullata. Tutta la cronologia andrà persa.',
+-+  save: 'Salva',
+-+  create: 'Crea',
+-+
+-+  // --- Icon Categories & Labels (アイコンのカテゴリとラベル) ---
+-+  iconCatBasic: 'Base',
+-+  iconCatHealth: 'Salute',
+-+  iconCatLearning: 'Apprendimento',  // 学び
+-+
+-+  iconLabelStreak: 'Serie',          // Streak
+-+  iconLabelTask: 'Task',
+-+  iconLabelShine: 'Scintilla',       // Shine
+-+  iconLabelClean: 'Pulizia',         // Clean
+-+  iconLabelLaundry: 'Bucato',        // Laundry
+-+  iconLabelWater: 'Acqua',           // Water
+-+  iconLabelWalk: 'Passeggiata',      // Walk
+-+  iconLabelSleep: 'Sonno',           // Sleep
+-+  iconLabelWorkout: 'Allenamento',   // Workout
+-+  iconLabelBarbell: 'Pesi',          // Barbell
+-+  iconLabelRead: 'Lettura',          // Read
+-+  iconLabelArt: 'Arte',              // Art
+-+  iconLabelMedia: 'Media',           // Media
+-+  iconLabelStudy: 'Studio',          // Study
+-+  iconLabelLanguage: 'Lingua',       // Language
+-+
+-+  // --- Misc / Errors (その他・エラー) ---
+-+  habitButtonSuffix: ' pulsante abitudine',
+-+  errorLoadFailed: 'Caricamento dati fallito.',
+-+  errorTitleRequired: 'Il titolo è obbligatorio.',
+-+  errorTitleTooLong: 'Il titolo deve avere 20 caratteri o meno.',
+-+  errorSaveFailed: 'Salvataggio fallito.',
+-+  errorDeleteFailed: 'Eliminazione fallita.',
+-+  errorToggleFailed: 'Aggiornamento fallito.',
+-+  habitLimitTitle: 'Limite piano gratuito',
+-+  habitLimitBody: 'Col piano gratuito puoi creare fino a 3 abitudini.',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: 'Feedback tattile (vibrazione)',
+-+
+-+  // --- Reminder (リマインダー・通知) ---
+-+  reminderSectionTitle: 'Promemoria',
+-+  reminderToggleLabel: 'Usa promemoria',
+-+  reminderTimeLabel: 'Orario notifica',
+-+  reminderNotificationBody: 'È ora di costruire la tua catena!', // チェーンを作る時間だよ！
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: 'Serie di 7 giorni!',
+-+  streak7Message: 'Hai mantenuto la catena per una settimana intera. Ottimo lavoro!',
+-+  ok: 'Fantastico',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: 'Cambia lingua',
+-+  currentLanguage: 'Attuale',
+-+  languageNameEn: 'Inglese',
+-+  languageNameJa: 'Giapponese',
+-+  languageNameFr: 'Francese',
+-+  languageNameEs: 'Spagnolo',
+-+  languageNameDe: 'Tedesco',
+-+  languageNameIt: 'Italiano',
+-+  languageNamePt: 'Portoghese',
+-+  languageNameRu: 'Russo',
+-+  languageNameZh: 'Cinese',
+-+  languageNameKo: 'Coreano',
+-+  languageNameHi: 'Hindi',
+-+  languageNameId: 'Indonesiano',
+-+  languageNameTh: 'Tailandese',
+-+  languageNameVi: 'Vietnamita',
+-+  languageNameMs: 'Malese',
+-+  languageNameTr: 'Turco',
+-+  languageNameNl: 'Olandese',
+-+  languageNameSv: 'Svedese',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: 'Avanti',
+-+  tutorialWelcome: 'Benvenuto in DotChain',
+-+  tutorialDesc1: 'Collega le tue abitudini quotidiane e costruisci la tua catena.',
+-+  tutorialDesc2: 'Non spezzare la catena per far durare l’abitudine.',
+-+  tutorialStart: 'Inizia',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/ja.ts b/src/core/i18n/locales/ja.ts
+-index 6ff4fe9..3ddc11a 100644
+---- a/src/core/i18n/locales/ja.ts
+-+++ b/src/core/i18n/locales/ja.ts
+-@@ -2,9 +2,9 @@ import baseEn from './en';
+- 
+- const dict = {
+-     ...baseEn,
+--    daysStreak: '連続日数',
+-+    daysStreak: '連続達成日数',
+-     yourChain: 'チェーン',
+--    allDoneDays: 'All Done 日数',
+-+    allDoneDays: '全習慣達成日数',
+-     settings: '設定',
+-     hapticOff: '振動オフ',
+-     language: '言語',
+-@@ -175,7 +175,7 @@ const dict = {
+-     languageNameTr: 'トルコ語',
+-     languageNameNl: 'オランダ語',
+-     languageNameSv: 'スウェーデン語',
+--    soundSwitchLabel: 'サウンドを鳴らす',
+-+    soundSwitchLabel: 'サウンド効果',
+-     tapSoundLabel: 'タップ音の種類',
+-     proOnlyTitle: 'Pro専用機能',
+-     proOnlyTheme: 'このテーマはProで利用できます。',
+-diff --git a/src/core/i18n/locales/ko.ts b/src/core/i18n/locales/ko.ts
+-index 71fb6d4..6df0d32 100644
+---- a/src/core/i18n/locales/ko.ts
+-+++ b/src/core/i18n/locales/ko.ts
+-@@ -1,175 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: '연속 일수',
+--    yourChain: '당신의 체인',
+--    allDoneDays: '모든 습관을 완료한 날 수',
+--    settings: '설정',
+--    hapticOff: '진동 꺼짐',
+--    language: '언어',
+--    sound: '사운드',
+--    haptics: '진동',
+--    theme: '테마',
+--    restore: '구매 복원',
+--    version: '앱 버전',
+--    tapSound: '탭 사운드',
+--    click: '클릭',
+--    pop: '팝',
+--    flowEffectTitle: '전류 애니메이션',
+--    flowEffectHelp:
+--      '체인 라인을 따라 네온 전류가 흐릅니다. 더 차분한 화면을 원하면 꺼두세요.',
+--    heatmapRangeTitle: '체인 표시 기간',
+--    heatmapRangeHelp: '홈 히트맵에 체인을 며칠치까지 보여줄지 선택하세요.',
+--    heatmapRange7: '1주',
+--    heatmapRange30: '1개월',
+--    heatmapRange60: '2개월',
+--    heatmapRange180: '6개월',
+--    heatmapRange365: '1년',
+--    heatmapSummaryPrefix: '지난 ',
+--    heatmapSummarySuffix: '일',
+--    heatmapAgoSuffix: '일 전',
+--    heatmapToday: '오늘',
+--    freeThemeNote: '무료: 다크 테마만 사용 가능 / Pro에서 네온 핑크·사이버 블루 사용 가능',
+--    proThemeNote: 'Pro 테마는 결제 이후에 활성화됩니다.',
+--    restoreDesc: '구매 복원(추후)',
+--    licenses: '오픈 소스 라이선스(추후)',
+--    openPro: 'DotChain Pro 열기',
+--    heroPaywall: '네온 세계로 업그레이드',
+--    priceMonthly: '$1.99 / 월',
+--    onboardingTitle: 'DotChain에 오신 것을 환영합니다',
+--    onboardingBody: '한 번 탭, 강한 진동. 오늘의 체인을 쌓아요.',
+--    start: '시작하기',
+--    paywallNote: '결제와 광고 기능은 나중에 추가될 예정입니다.',
+--    homeLoading: '로딩 중...',
+--    homeAddHabitLabel: '습관 추가',
+--    editNewHabit: '새 습관',
+--    editHabitTitle: '습관 편집',
+--    editCategoryLabel: '카테고리',
+--    editNameLabel: '이름 (최대 20자)',
+--    editNamePlaceholder: '습관 이름을 입력...',
+--    editSaveChanges: '변경사항 저장',
+--    editCreateHabit: '습관 만들기',
+--    editDeleteHabit: '습관 삭제',
+--    proTitle: '체인을 해방하세요.',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: '무제한 습관',
+--    proFeatureThemes: '모든 테마 잠금 해제 (Neon Pink / Cyber Blue)',
+--    proFeatureAds: '광고 없음',
+--    habitButtonSuffix: ' 습관 버튼',
+--    iconCatBasic: '기본',
+--    iconCatHealth: '건강',
+--    iconCatLearning: '학습·업무',
+--    errorLoadFailed: '데이터 로드 실패',
+--    errorTitleRequired: '제목이 필요합니다.',
+--    errorTitleTooLong: '제목은 20자 이내여야 합니다.',
+--    errorSaveFailed: '저장 실패',
+--    errorDeleteFailed: '삭제 실패',
+--    errorToggleFailed: '업데이트 실패',
+--    habitLimitTitle: '무료 플랜 한도',
+--    habitLimitBody: '무료 플랜에서는 최대 3개의 습관만 만들 수 있습니다.',
+--    hapticsDescription: '햅틱 피드백',
+--    reminderSectionTitle: '리마인더 알림',
+--    reminderToggleLabel: '리마인더 사용',
+--    reminderTimeLabel: '알림 시간',
+--    reminderNotificationBody: '지금 당신의 체인을 이어갈 시간입니다.',
+--    streak7Title: '7일 연속 달성!',
+--    streak7Message: '일주일 내내 체인을 이어갔어요. 훌륭합니다!',
+--    ok: '확인',
+--    languageChange: '언어 변경',
+--    currentLanguage: '현재',
+--    languageNameEn: '영어',
+--    languageNameJa: '일본어',
+--    languageNameFr: '프랑스어',
+--    languageNameEs: '스페인어',
+--    languageNameDe: '독일어',
+--    languageNameIt: '이탈리아어',
+--    languageNamePt: '포르투갈어',
+--    languageNameRu: '러시아어',
+--    languageNameZh: '중국어',
+--    languageNameKo: '한국어',
+--    languageNameHi: '힌디어',
+--    languageNameId: '인도네시아어',
+--    languageNameTh: '태국어',
+--    languageNameVi: '베트남어',
+--    languageNameMs: '말레이어',
+--    languageNameTr: '터키어',
+--    languageNameNl: '네덜란드어',
+--    languageNameSv: '스웨덴어',
+--    soundSwitchLabel: '사운드 켜기',
+--    tapSoundLabel: '탭 사운드 스타일',
+--    proOnlyTitle: 'Pro 전용 기능',
+--    proOnlyTheme: '이 테마는 Pro에서만 사용 가능합니다.',
+--
+--    // 결손된 키 보충
+--    cancel: '취소',
+--    delete: '삭제',
+--    deleteConfirmBody: '정말 삭제하시겠어요? 이 작업은 되돌릴 수 없습니다.',
+--    comingSoonTitle: '곧 제공 예정',
+--    onboardingPunch: '이것이 DotChain입니다.',
+--
+--    paywallBestValueBadge: '최고 혜택',
+--    paywallMonthlyLabel: '월간 플랜',
+--    paywallMonthlySub: '매달 결제됩니다. 언제든 취소할 수 있습니다.',
+--    paywallYearlyLabel: '연간 플랜',
+--    paywallYearlySub: '연 1회 결제됩니다. 언제든 취소할 수 있습니다.',
+--
+--    priceFree: '$0 / 평생',
+--    priceYearly: '$14.99 / 년',
+--
+--    proCompareHeaderFeature: '기능',
+--    proCompareHeaderFree: '무료',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      '언제든 무료 플랜에 머물 수 있습니다. Pro는 단지 제한을 없앨 뿐입니다.',
+--    proCompareTitle: 'Pro로 얻는 것',
+--
+--    proCtaMonthly: '월간 Pro 시작',
+--    proCtaStayFree: '무료 플랜 계속 사용',
+--    proCtaYearly: '연간 Pro 시작',
+--
+--    proFeatureAdsFree: '하단 배너 광고',
+--    proFeatureAdsPro: '광고 없음, 온전히 집중',
+--    proFeatureHabits: '추적 가능한 습관 수',
+--    proFeatureHabitsFree: '최대 3개 습관',
+--    proFeatureHabitsPro: '무제한 습관',
+--    proFeatureThemesFree: '1개 테마 (다크)',
+--    proFeatureThemesPro: '모든 테마 사용 가능',
+--
+--    proFinePrint:
+--      '구독은 자동 갱신됩니다. App Store 또는 Google Play 계정 설정에서 언제든 취소할 수 있습니다.',
+--    proMonthlyTagline: '작게 시작해서 언제든 취소하세요.',
+--    proPlanFreeTitle: '무료',
+--    proPlanMonthlyTitle: '월간',
+--    proPlanYearlyBadge: '최고 혜택',
+--    proPlanYearlyTitle: '연간',
+--    proSubtitle: '3개 제한을 넘어 점의 체인을 멈추지 않게 하세요.',
+--    proYearlySavingShort: '약 37% 절약 (8개월 무료와 비슷).',
+--    proYearlyTagline: '체인을 진지하게 관리하는 사람을 위해.',
+--
+--    restoreSoon: '구매 복원 기능은 향후 업데이트에서 추가될 예정입니다.',
+--
+--    themeCyberBlueLabel: '사이버 블루',
+--    themeDarkLabel: '다크',
+--    themeDesc: '원하는 분위기를 골라 보세요. (Pro 테마는 추후 추가 예정입니다.)',
+--    themeNeonPinkLabel: '네온 핑크',
+--
+--    tutorialEditIconBody: '먼저, 습관에 어울리는 아이콘을 선택하세요.',
+--    tutorialEditNameBody:
+--      '다음으로, 습관 이름을 입력하세요.\n예: "물 마시기", "책 읽기".',
+--    tutorialEditSubmitBody:
+--      '준비됐어요!\n아래 만들기 버튼을 눌러 이 습관을 홈 화면에 추가하세요.',
+--    tutorialExplainChainBody:
+--      '탭할 때마다 연속 일수가 늘어나고, 오늘이 체인 위에서 빛납니다.\n계속해서 체인을 더 길게 이어 보세요.',
+--    tutorialGotIt: '알겠어요',
+--    tutorialNext: '다음',
+--    tutorialPressFabBody:
+--      '오른쪽 아래 + 버튼을 눌러 첫 습관을 만들어 보세요.',
+--    tutorialPressHabitBody:
+--      '방금 만든 습관을 탭하세요.\n탭하면 오늘이 "완료"로 표시됩니다.',
+--    tutorialStart: '시작하기',
+--    tutorialWelcomeBody:
+--      '환영합니다!\nDotChain은 당신의 습관 체인을 쌓을 수 있게 도와줍니다.\n먼저 + 버튼을 눌러 첫 번째 습관을 만들어 보세요.',
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
+-+  daysStreak: '연속 일수',           // 英語: DAYS STREAK
+-+  yourChain: '나의 체인',            // 英語: YOUR CHAIN
+-+  allDoneDays: '완료한 날',          // 英語: ALL DONE DAYS (短く「完了日」のニュアンス)
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: '설정',                  // 設定
+-+  hapticOff: '진동 끄기',            // 振動オフ
+-+  language: '언어',                  // 言語
+-+  sound: '사운드',                   // 音（サウンド）
+-+  haptics: '진동',                   // 振動（わかりやすく「振動」を採用）
+-+  theme: '테마',                     // テーマ
+-+
+-+  // --- Purchase / Restore (購入 / 復元) ---
+-+  restore: '구매 복원',              // 購入履歴の復元
+-+  purchaseSuccess: 'Pro 플랜이 활성화되었습니다.', // 購入成功
+-+  purchaseFailed: '결제에 실패했습니다. 나중에 다시 시도해 주세요.', // 購入失敗
+-+  restoreSuccess: '구매 기록이 복원되었습니다.', // 復元成功
+-+  restoreNotFound: '복원할 구매 기록이 없습니다.', // 復元データなし
+-+  restoreFailed: '구매 복원에 실패했습니다.', // 復元失敗
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: '앱 버전',                // アプリバージョン
+-+  tapSound: '탭 사운드',             // タップ音
+-+  click: '클릭',                     // クリック
+-+  pop: '팝',                         // ポップ
+-+  soundSwitchLabel: '사운드 효과',   // 効果音
+-+
+-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
+-+  proTitle: '체인을 잠금 해제하세요.', // 英語: Unlock your chain.
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: '3개의 습관을 넘어, 멈추지 않는 점을 만드세요.',
+-+  proPlanFreeTitle: '무료',          // 無料
+-+  proPlanMonthlyTitle: '월간',       // 月額
+-+  proPlanYearlyTitle: '연간',        // 年額
+-+  proPlanYearlyBadge: '최고의 선택', // 英語: Best value (直訳より「ベストチョイス」)
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '₩0 / 평생',            // ずっと0ウォン
+-+  proOnlyTitle: 'Pro 기능',          // Pro機能
+-+  proOnlyTheme: '이 테마는 Pro에서 사용할 수 있습니다.',
+-+  openPro: 'Pro 플랜 보기',          // Proプランを見る
+-+  cancel: '취소',                    // キャンセル
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: '전류 애니메이션', // 直訳より「電気の流れ」のイメージ
+-+  flowEffectHelp:
+-+    '체인 라인을 따라 네온 전류가 흐릅니다. 차분한 화면을 원하면 끄셔도 좋습니다.',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
+-+  heatmapRangeTitle: '표시 기간',
+-+  heatmapRangeHelp: '홈 화면의 히트맵에 체인을 며칠 동안 표시할지 선택하세요.',
+-+  heatmapRange7: '1주',
+-+  heatmapRange30: '1개월',
+-+  heatmapRange60: '2개월',
+-+  heatmapRange90: '3개월',
+-+  heatmapRange180: '6개월',
+-+  heatmapRange365: '1년',
+-+  heatmapSummaryPrefix: '최근 ',     // 「最近」
+-+  heatmapSummarySuffix: '일',        // 「日」
+-+  heatmapAgoSuffix: '일 전',         // 「日前」
+-+  heatmapToday: '오늘',
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: '앱의 분위기를 바꿔보세요.',
+-+  themeDarkLabel: '다크',            // Dark
+-+  themeNeonPinkLabel: '네온 핑크',
+-+  themeCyberBlueLabel: '사이버 블루',
+-+  freeThemeNote: '무료: 다크만 사용 가능 / Pro: 네온 핑크, 사이버 블루 잠금 해제',
+-+  proThemeNote: 'Pro 테마는 곧 출시됩니다.',
+-+
+-+  // --- Habit Management (習慣管理) ---
+-+  newHabitTitle: '새로운 습관',
+-+  editHabitTitle: '습관 수정',
+-+  habitNameLabel: '이름',
+-+  habitNamePlaceholder: '예: 물 마시기, 책 읽기',
+-+  habitIconLabel: '아이콘',
+-+  deleteHabit: '이 습관 삭제',
+-+  deleteConfirmationTitle: '삭제하시겠습니까?',
+-+  deleteConfirmationMessage: '이 작업은 되돌릴 수 없습니다. 모든 기록이 사라집니다.',
+-+  save: '저장',
+-+  create: '만들기',
+-+
+-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
+-+  iconCatBasic: '기본',
+-+  iconCatHealth: '건강',
+-+  iconCatLearning: '학습',
+-+
+-+  iconLabelStreak: '연속',
+-+  iconLabelTask: '할 일',
+-+  iconLabelShine: '반짝임',
+-+  iconLabelClean: '청소',
+-+  iconLabelLaundry: '세탁',
+-+  iconLabelWater: '물',
+-+  iconLabelWalk: '걷기',
+-+  iconLabelSleep: '수면',
+-+  iconLabelWorkout: '운동',
+-+  iconLabelBarbell: '바벨',
+-+  iconLabelRead: '독서',
+-+  iconLabelArt: '예술',
+-+  iconLabelMedia: '미디어',
+-+  iconLabelStudy: '공부',
+-+  iconLabelLanguage: '언어',
+-+
+-+  // --- Misc / Errors (その他 / エラー) ---
+-+  habitButtonSuffix: ' 습관 버튼',   // アクセシビリティ用
+-+  errorLoadFailed: '데이터를 불러오지 못했습니다.',
+-+  errorTitleRequired: '이름을 입력해야 합니다.',
+-+  errorTitleTooLong: '이름은 20자 이내여야 합니다.',
+-+  errorSaveFailed: '저장에 실패했습니다.',
+-+  errorDeleteFailed: '삭제에 실패했습니다.',
+-+  errorToggleFailed: '업데이트에 실패했습니다.',
+-+  habitLimitTitle: '무료 플랜 제한',
+-+  habitLimitBody: '무료 플랜에서는 최대 3개의 습관만 만들 수 있습니다.',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: '햅틱 피드백 (진동)',
+-+
+-+  // --- Reminder (リマインダー) ---
+-+  reminderSectionTitle: '리마인더',
+-+  reminderToggleLabel: '리마인더 사용',
+-+  reminderTimeLabel: '알림 시간',
+-+  reminderNotificationBody: '체인을 연결할 시간입니다!', // 「チェーンを作る時間！」
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: '7일 연속 달성!',
+-+  streak7Message: '일주일 동안 체인을 끊지 않았군요. 정말 대단해요!',
+-+  ok: '최고예요',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: '언어 변경',
+-+  currentLanguage: '현재 언어',
+-+  languageNameEn: '영어',
+-+  languageNameJa: '일본어',
+-+  languageNameFr: '프랑스어',
+-+  languageNameEs: '스페인어',
+-+  languageNameDe: '독일어',
+-+  languageNameIt: '이탈리아어',
+-+  languageNamePt: '포르투갈어',
+-+  languageNameRu: '러시아어',
+-+  languageNameZh: '중국어',
+-+  languageNameKo: '한국어',
+-+  languageNameHi: '힌디어',
+-+  languageNameId: '인도네시아어',
+-+  languageNameTh: '태국어',
+-+  languageNameVi: '베트남어',
+-+  languageNameMs: '말레이어',
+-+  languageNameTr: '튀르키예어',
+-+  languageNameNl: '네덜란드어',
+-+  languageNameSv: '스웨덴어',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: '다음',
+-+  tutorialWelcome: 'DotChain에 오신 것을 환영합니다',
+-+  tutorialDesc1: '매일의 습관을 연결하고 나만의 체인을 만드세요.',
+-+  tutorialDesc2: '습관이 몸에 배도록 체인을 끊지 마세요.',
+-+  tutorialStart: '시작하기',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/ms.ts b/src/core/i18n/locales/ms.ts
+-deleted file mode 100644
+-index aab2cd2..0000000
+---- a/src/core/i18n/locales/ms.ts
+-+++ /dev/null
+-@@ -1,181 +0,0 @@
+--import baseEn from './en';
+--
+--const dict = {
+--    ...baseEn,
+--    daysStreak: 'HARI BERTURUT',
+--    yourChain: 'RANTAI ANDA',
+--    allDoneDays: 'HARI LENGKAP SEPENUHNYA',
+--    settings: 'Tetapan',
+--    hapticOff: 'Getaran dimatikan',
+--    language: 'Bahasa',
+--    sound: 'Bunyi',
+--    haptics: 'Getaran',
+--    theme: 'Tema',
+--    restore: 'Pulihkan pembelian',
+--    version: 'Versi aplikasi',
+--    tapSound: 'Bunyi ketukan',
+--    click: 'Klik',
+--    pop: 'Pop',
+--    flowEffectTitle: 'Animasi aliran elektrik',
+--    flowEffectHelp: 'Biarkan aliran neon mengalir di garisan rantaian. Matikan jika mahu paparan lebih tenang.',
+--    heatmapRangeTitle: 'Tempoh paparan rantaian',
+--    heatmapRangeHelp: 'Pilih berapa hari rantaian dipaparkan pada peta haba Laman Utama.',
+--    heatmapRange7: '1 minggu',
+--    heatmapRange30: '1 bulan',
+--    heatmapRange60: '2 bulan',
+--    heatmapRange180: '6 bulan',
+--    heatmapRange365: '1 tahun',
+--    heatmapSummaryPrefix: '',
+--    heatmapSummarySuffix: ' hari lepas',
+--    heatmapAgoSuffix: ' hari yang lalu',
+--    heatmapToday: 'Hari ini',
+--    freeThemeNote: 'Percuma: hanya Dark / Pro buka kunci Neon Pink & Cyber Blue',
+--    proThemeNote: 'Tema Pro akan dibuka selepas anda membuat pembayaran.',
+--    restoreDesc: 'Pulihkan pembelian (akan datang)',
+--    licenses: 'Lesen sumber terbuka (akan datang)',
+--    openPro: 'Buka DotChain Pro',
+--    heroPaywall: 'Tingkatkan ke dunia neon',
+--    priceMonthly: '$1.99 / bulan',
+--    onboardingTitle: 'Selamat datang ke DotChain',
+--    onboardingBody: 'Satu ketukan, getaran kuat. Bina rantai hari ini.',
+--    start: 'Mula',
+--    paywallNote: 'Ciri pengebilan dan iklan akan ditambah kemudian.',
+--    homeLoading: 'Memuat...',
+--    homeAddHabitLabel: 'Tambah tabiat',
+--    editNewHabit: 'Tabiat baharu',
+--    editHabitTitle: 'Edit tabiat',
+--    editCategoryLabel: 'Kategori',
+--    editNameLabel: 'Nama (maks 20 aksara)',
+--    editNamePlaceholder: 'Namakan tabiat anda...',
+--    editSaveChanges: 'Simpan perubahan',
+--    editCreateHabit: 'Cipta tabiat',
+--    editDeleteHabit: 'Padam tabiat',
+--    proTitle: 'Buka kunci rantai anda.',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'Tabiat tanpa had',
+--    proFeatureThemes: 'Semua tema dibuka (Neon Pink / Cyber Blue)',
+--    proFeatureAds: 'Tiada iklan',
+--    habitButtonSuffix: ' butang tabiat',
+--    iconCatBasic: 'Asas',
+--    iconCatHealth: 'Kesihatan',
+--    iconCatLearning: 'Pembelajaran & Kerja',
+--    errorLoadFailed: 'Gagal memuatkan data',
+--    errorTitleRequired: 'Tajuk diperlukan.',
+--    errorTitleTooLong: 'Tajuk mesti 20 aksara atau kurang.',
+--    errorSaveFailed: 'Gagal menyimpan.',
+--    errorDeleteFailed: 'Gagal memadam.',
+--    errorToggleFailed: 'Gagal mengemas kini.',
+--    habitLimitTitle: 'Had pelan percuma',
+--    habitLimitBody: 'Dalam pelan percuma anda boleh membuat hingga 3 tabiat.',
+--    hapticsDescription: 'Maklum balas haptik',
+--    reminderSectionTitle: 'Pemberitahuan peringatan',
+--    reminderToggleLabel: 'Gunakan peringatan',
+--    reminderTimeLabel: 'Masa pemberitahuan',
+--    reminderNotificationBody: 'Sudah tiba masanya menyambung rantai anda.',
+--    streak7Title: 'Rantai 7 hari!',
+--    streak7Message: 'Anda mengekalkan rantai selama seminggu penuh. Hebat!',
+--    ok: 'OK',
+--    languageChange: 'Tukar bahasa',
+--    currentLanguage: 'Semasa',
+--    languageNameEn: 'Bahasa Inggeris',
+--    languageNameJa: 'Bahasa Jepun',
+--    languageNameFr: 'Bahasa Perancis',
+--    languageNameEs: 'Bahasa Sepanyol',
+--    languageNameDe: 'Bahasa Jerman',
+--    languageNameIt: 'Bahasa Itali',
+--    languageNamePt: 'Bahasa Portugis',
+--    languageNameRu: 'Bahasa Rusia',
+--    languageNameZh: 'Bahasa Cina',
+--    languageNameKo: 'Bahasa Korea',
+--    languageNameHi: 'Bahasa Hindi',
+--    languageNameId: 'Bahasa Indonesia',
+--    languageNameTh: 'Bahasa Thai',
+--    languageNameVi: 'Bahasa Vietnam',
+--    languageNameMs: 'Bahasa Melayu',
+--    languageNameTr: 'Bahasa Turki',
+--    languageNameNl: 'Bahasa Belanda',
+--    languageNameSv: 'Bahasa Sweden',
+--    soundSwitchLabel: 'Hidupkan bunyi',
+--    tapSoundLabel: 'Gaya bunyi ketukan',
+--    proOnlyTitle: 'Khas untuk Pro',
+--    proOnlyTheme: 'Tema ini hanya tersedia dalam Pro.',
+--
+--    cancel: 'Batal',
+--    delete: 'Padam',
+--    deleteConfirmBody: 'Adakah anda pasti? Tindakan ini tidak boleh dibatalkan.',
+--    comingSoonTitle: 'Akan datang',
+--    onboardingPunch: 'Inilah DotChain.',
+--
+--    paywallBestValueBadge: 'Paling berbaloi',
+--    paywallMonthlyLabel: 'Pelan bulanan',
+--    paywallMonthlySub: 'Dibilkan setiap bulan. Boleh batal bila-bila masa.',
+--    paywallYearlyLabel: 'Pelan tahunan',
+--    paywallYearlySub: 'Dibilkan sekali setahun. Boleh batal bila-bila masa.',
+--
+--    priceFree: '$0 / selamanya',
+--    priceYearly: '$14.99 / tahun',
+--
+--    proCompareHeaderFeature: 'Ciri',
+--    proCompareHeaderFree: 'Percuma',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      'Anda sentiasa boleh kekal pada Pelan Percuma. Pro hanya membuang had.',
+--    proCompareTitle: 'Apa yang anda dapat dengan Pro',
+--
+--    proCtaMonthly: 'Dapatkan Pro Bulanan',
+--    proCtaStayFree: 'Teruskan dengan Pelan Percuma',
+--    proCtaYearly: 'Dapatkan Pro Tahunan',
+--
+--    proFeatureAdsFree: 'Iklan banner di bahagian bawah',
+--    proFeatureAdsPro: 'Tiada iklan, fokus sepenuhnya',
+--    proFeatureHabits: 'Tabiat yang boleh anda jejak',
+--    proFeatureHabitsFree: 'Sehingga 3 tabiat',
+--    proFeatureHabitsPro: 'Tabiat tanpa had',
+--    proFeatureThemesFree: '1 tema (Dark)',
+--    proFeatureThemesPro: 'Semua tema dibuka',
+--
+--    proFinePrint:
+--      'Langganan diperbaharui secara automatik. Anda boleh batal bila-bila masa dalam tetapan akaun App Store atau Google Play anda.',
+--    proMonthlyTagline: 'Mulakan kecil, boleh batal bila-bila masa.',
+--    proPlanFreeTitle: 'Percuma',
+--    proPlanMonthlyTitle: 'Bulanan',
+--    proPlanYearlyBadge: 'Paling berbaloi',
+--    proPlanYearlyTitle: 'Tahunan',
+--    proSubtitle: 'Lebihi had 3 tabiat dan jadikan titik anda tidak terhentikan.',
+--    proYearlySavingShort: 'Jimat kira-kira 37% (seperti 8 bulan percuma).',
+--    proYearlyTagline: 'Untuk pembina rantai yang serius.',
+--
+--    restoreSoon:
+--      'Fungsi memulihkan pembelian akan ditambah dalam kemas kini akan datang.',
+--
+--    themeCyberBlueLabel: 'Cyber Blue',
+--    themeDarkLabel: 'Dark',
+--    themeDesc: 'Pilih suasana yang anda suka. (Tema Pro akan ditambah kemudian.)',
+--    themeNeonPinkLabel: 'Neon Pink',
+--
+--    tutorialEditIconBody:
+--      'Pertama, pilih ikon yang sepadan dengan tabiat anda.',
+--    tutorialEditNameBody:
+--      `Kemudian, masukkan nama untuk tabiat anda.
+--Contohnya: "Minum air", "Baca buku".`,
+--    tutorialEditSubmitBody:
+--      `Anda sudah bersedia!
+--Ketuk tombol cipta di bawah untuk menambah tabiat ini ke skrin utama.`,
+--    tutorialExplainChainBody:
+--      `Dengan setiap ketukan, HARI BERTURUT anda meningkat dan hari ini menyala pada RANTAI ANDA.
+--Teruskan untuk memanjangkan lagi rantai anda.`,
+--    tutorialGotIt: 'Faham',
+--    tutorialNext: 'Seterusnya',
+--    tutorialPressFabBody:
+--      'Ketuk butang + di bahagian bawah kanan untuk mencipta tabiat pertama anda.',
+--    tutorialPressHabitBody:
+--      `Sekarang ketuk tabiat yang anda baru cipta.
+--Ketukan menandakan hari ini sebagai "siap".`,
+--    tutorialStart: 'Mula',
+--    tutorialWelcomeBody:
+--      `Selamat datang!
+--DotChain membantu anda membina rantai tabiat.
+--Mula dengan mencipta tabiat pertama anda melalui butang +.`,
+--};
+--
+--export default dict;
+-diff --git a/src/core/i18n/locales/nl.ts b/src/core/i18n/locales/nl.ts
+-index 8547607..8898d80 100644
+---- a/src/core/i18n/locales/nl.ts
+-+++ b/src/core/i18n/locales/nl.ts
+-@@ -1,182 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'Dagen op rij',
+--    yourChain: 'Jouw keten',
+--    allDoneDays: 'Volledig voltooide dagen',
+--    settings: 'Instellingen',
+--    hapticOff: 'Trillen uit',
+--    language: 'Taal',
+--    sound: 'Geluid',
+--    haptics: 'Trillen',
+--    theme: 'Thema',
+--    restore: 'Aankopen herstellen',
+--    version: 'App-versie',
+--    tapSound: 'Tikgeluid',
+--    click: 'Klik',
+--    pop: 'Pop',
+--    flowEffectTitle: 'Elektrische stroom-animatie',
+--    flowEffectHelp:
+--      'Laat een neonstroom over je ketenlijn lopen. Zet uit als je een rustiger beeld wilt.',
+--    heatmapRangeTitle: 'Weergaveperiode van de keten',
+--    heatmapRangeHelp:
+--      'Kies hoeveel dagen van je keten op de heatmap van het startscherm worden getoond.',
+--    heatmapRange7: '1 week',
+--    heatmapRange30: '1 maand',
+--    heatmapRange60: '2 maanden',
+--    heatmapRange180: '6 maanden',
+--    heatmapRange365: '1 jaar',
+--    heatmapSummaryPrefix: 'Afgelopen ',
+--    heatmapSummarySuffix: ' dagen',
+--    heatmapAgoSuffix: ' dagen geleden',
+--    heatmapToday: 'Vandaag',
+--    freeThemeNote: 'Gratis: alleen Donker / Pro ontgrendelt Neon Pink & Cyber Blue',
+--    proThemeNote: 'Pro-thema\'s worden later ontgrendeld.',
+--    restoreDesc: 'Aankopen herstellen (binnenkort)',
+--    licenses: 'Open-source licenties (binnenkort)',
+--    openPro: 'Open DotChain Pro',
+--    heroPaywall: 'Upgrade naar de neonwereld',
+--    priceMonthly: '$1.99 / maand',
+--    onboardingTitle: 'Welkom bij DotChain',
+--    onboardingBody: 'Eén tik, sterke trilling. Bouw de keten van vandaag.',
+--    start: 'Start',
+--    paywallNote: 'Facturering en advertenties worden later toegevoegd.',
+--    homeLoading: 'Bezig met laden...',
+--    homeAddHabitLabel: 'Gewoonte toevoegen',
+--    editNewHabit: 'Nieuwe gewoonte',
+--    editHabitTitle: 'Gewoonte bewerken',
+--    editCategoryLabel: 'Categorie',
+--    editNameLabel: 'Naam (max 20 tekens)',
+--    editNamePlaceholder: 'Geef je gewoonte een naam...',
+--    editSaveChanges: 'Wijzigingen opslaan',
+--    editCreateHabit: 'Gewoonte maken',
+--    editDeleteHabit: 'Gewoonte verwijderen',
+--    proTitle: 'Ontgrendel je keten.',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'Onbeperkte gewoonten',
+--    proFeatureThemes: 'Alle thema’s ontgrendeld (Neon Pink / Cyber Blue)',
+--    proFeatureAds: 'Geen advertenties',
+--    habitButtonSuffix: ' gewoonteknop',
+--    iconCatBasic: 'Basis',
+--    iconCatHealth: 'Gezondheid',
+--    iconCatLearning: 'Leren & Werk',
+--    errorLoadFailed: 'Gegevens laden mislukt',
+--    errorTitleRequired: 'Titel is verplicht.',
+--    errorTitleTooLong: 'Titel mag maximaal 20 tekens bevatten.',
+--    errorSaveFailed: 'Opslaan mislukt.',
+--    errorDeleteFailed: 'Verwijderen mislukt.',
+--    errorToggleFailed: 'Bijwerken mislukt.',
+--    habitLimitTitle: 'Limiet van gratis abonnement',
+--    habitLimitBody: 'In het gratis abonnement kun je maximaal 3 gewoonten aanmaken.',
+--    hapticsDescription: 'Haptische feedback',
+--    reminderSectionTitle: 'Herinneringsmelding',
+--    reminderToggleLabel: 'Herinnering gebruiken',
+--    reminderTimeLabel: 'Meldingtijd',
+--    reminderNotificationBody: 'Tijd om je keten voort te zetten.',
+--    streak7Title: '7 dagen op rij!',
+--    streak7Message: 'Je hield je keten een volle week vol. Goed gedaan!',
+--    ok: 'OK',
+--    languageChange: 'Taal wijzigen',
+--    currentLanguage: 'Huidig',
+--    languageNameEn: 'Engels',
+--    languageNameJa: 'Japans',
+--    languageNameFr: 'Frans',
+--    languageNameEs: 'Spaans',
+--    languageNameDe: 'Duits',
+--    languageNameIt: 'Italiaans',
+--    languageNamePt: 'Portugees',
+--    languageNameRu: 'Russisch',
+--    languageNameZh: 'Chinees',
+--    languageNameKo: 'Koreaans',
+--    languageNameHi: 'Hindi',
+--    languageNameId: 'Indonesisch',
+--    languageNameTh: 'Thais',
+--    languageNameVi: 'Vietnamees',
+--    languageNameMs: 'Maleis',
+--    languageNameTr: 'Turks',
+--    languageNameNl: 'Nederlands',
+--    languageNameSv: 'Zweeds',
+--    soundSwitchLabel: 'Geluid inschakelen',
+--    tapSoundLabel: 'Tikgeluidstijl',
+--    proOnlyTitle: 'Alleen voor Pro',
+--    proOnlyTheme: 'Dit thema is beschikbaar met Pro.',
+--
+--    // Aanvullen ontbrekende 51 keys
+--    cancel: 'Annuleren',
+--    delete: 'Verwijderen',
+--    deleteConfirmBody:
+--      'Weet je het zeker? Deze actie kan niet ongedaan worden gemaakt.',
+--    comingSoonTitle: 'Binnenkort beschikbaar',
+--    onboardingPunch: 'Dit is DotChain.',
+--
+--    paywallBestValueBadge: 'Meest voordelig',
+--    paywallMonthlyLabel: 'Maandelijks abonnement',
+--    paywallMonthlySub:
+--      'Maandelijks gefactureerd. Op elk moment opzegbaar.',
+--    paywallYearlyLabel: 'Jaarlijks abonnement',
+--    paywallYearlySub:
+--      'Jaarlijks één keer gefactureerd. Op elk moment opzegbaar.',
+--
+--    priceFree: '$0 / voor altijd',
+--    priceYearly: '$14.99 / jaar',
+--
+--    proCompareHeaderFeature: 'Functie',
+--    proCompareHeaderFree: 'Gratis',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      'Je kunt altijd bij het gratis abonnement blijven. Pro haalt alleen de limieten weg.',
+--    proCompareTitle: 'Wat je krijgt met Pro',
+--
+--    proCtaMonthly: 'Pro maandelijks nemen',
+--    proCtaStayFree: 'Gratis blijven gebruiken',
+--    proCtaYearly: 'Pro jaarlijks nemen',
+--
+--    proFeatureAdsFree: 'Advertentiebanner onderin',
+--    proFeatureAdsPro: 'Geen advertenties, volledige focus',
+--    proFeatureHabits: 'Gewoonten die je kunt bijhouden',
+--    proFeatureHabitsFree: 'Maximaal 3 gewoonten',
+--    proFeatureHabitsPro: 'Onbeperkt aantal gewoonten',
+--    proFeatureThemesFree: '1 thema (Donker)',
+--    proFeatureThemesPro: 'Alle thema\'s ontgrendeld',
+--
+--    proFinePrint:
+--      'Abonnement wordt automatisch verlengd. Je kunt op elk moment opzeggen via de instellingen van je App Store- of Google Play-account.',
+--    proMonthlyTagline: 'Begin klein, opzeggen kan altijd.',
+--    proPlanFreeTitle: 'Gratis',
+--    proPlanMonthlyTitle: 'Maandelijks',
+--    proPlanYearlyBadge: 'Meest voordelig',
+--    proPlanYearlyTitle: 'Jaarlijks',
+--    proSubtitle: 'Ga verder dan 3 gewoonten en maak je keten niet te stoppen.',
+--    proYearlySavingShort: 'Bespaar ongeveer 37% (alsof 8 maanden gratis zijn).',
+--    proYearlyTagline: 'Voor echte ketenbouwers.',
+--
+--    restoreSoon:
+--      'Herstellen van aankopen wordt in een volgende update toegevoegd.',
+--
+--    themeCyberBlueLabel: 'Cyber Blue',
+--    themeDarkLabel: 'Donker',
+--    themeDesc:
+--      'Kies de sfeer die bij je past. (Pro-thema\'s worden later toegevoegd.)',
+--    themeNeonPinkLabel: 'Neon Pink',
+--
+--    tutorialEditIconBody:
+--      'Kies eerst een pictogram dat bij je gewoonte past.',
+--    tutorialEditNameBody:
+--      'Geef je gewoonte daarna een naam.\nBijvoorbeeld: "Water drinken", "Boek lezen".',
+--    tutorialEditSubmitBody:
+--      'Klaar!\nTik op de knop hieronder om deze gewoonte aan je startscherm toe te voegen.',
+--    tutorialExplainChainBody:
+--      'Door te tikken is je DAGEN OP RIJ toegenomen en licht vandaag op in JOUW KETEN.\nGa zo door om je keten langer te maken.',
+--    tutorialGotIt: 'Begrepen',
+--    tutorialNext: 'Volgende',
+--    tutorialPressFabBody:
+--      'Tik op de +-knop rechtsonder om je eerste gewoonte te maken.',
+--    tutorialPressHabitBody:
+--      'Tik nu op de gewoonte die je zojuist hebt gemaakt.\nDoor te tikken wordt vandaag als "gedaan" gemarkeerd.',
+--    tutorialStart: 'Start',
+--    tutorialWelcomeBody:
+--      'Welkom!\nMet DotChain bouw je jouw gewoontenketen.\nBegin met het maken van je eerste gewoonte via de +-knop.',
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
+-+  daysStreak: 'DAGEN OP RIJ',        // 英語: DAYS STREAK (連続日数)
+-+  yourChain: 'JOUW KETEN',           // 英語: YOUR CHAIN
+-+  allDoneDays: 'DAGEN VOLTOOID',     // 英語: ALL DONE DAYS (全て完了した日)
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: 'Instellingen',          // 設定
+-+  hapticOff: 'Trillen uit',          // 振動オフ
+-+  language: 'Taal',                  // 言語
+-+  sound: 'Geluid',                   // 音
+-+  haptics: 'Trillen',                // 振動 (Haptics - 一般的にTrillen)
+-+  theme: 'Thema',                    // テーマ
+-+
+-+  // --- Purchase / Restore (購入 / 復元) ---
+-+  restore: 'Aankopen herstellen',    // 購入の復元
+-+  purchaseSuccess: 'Pro-abonnement is nu actief.', // 購入成功
+-+  purchaseFailed: 'Aankoop mislukt. Probeer het later opnieuw.', // 購入失敗
+-+  restoreSuccess: 'Aankoopgeschiedenis hersteld.', // 復元成功 (長い単語ですがここは大丈夫)
+-+  restoreNotFound: 'Geen aankopen gevonden om te herstellen.', // 復元データなし
+-+  restoreFailed: 'Herstellen van aankopen mislukt.', // 復元失敗
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: 'App-versie',             // アプリバージョン
+-+  tapSound: 'Tikgeluid',             // タップ音
+-+  click: 'Klik',                     // クリック
+-+  pop: 'Pop',                        // ポップ
+-+  soundSwitchLabel: 'Geluidseffecten', // 効果音
+-+
+-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
+-+  proTitle: 'Ontgrendel je keten.',  // 英語: Unlock your chain.
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: 'Ga verder dan 3 gewoonten en maak je stippen onstuitbaar.',
+-+  proPlanFreeTitle: 'Gratis',        // 無料
+-+  proPlanMonthlyTitle: 'Maandelijks', // 月額
+-+  proPlanYearlyTitle: 'Jaarlijks',   // 年額
+-+  proPlanYearlyBadge: 'Beste keus',  // 英語: Best value (一番お得/ベストチョイス)
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '€0 / voor altijd',     // ずっと0ユーロ (または $0)
+-+  proOnlyTitle: 'Pro-functie',       // Pro機能
+-+  proOnlyTheme: 'Upgrade naar Pro om dit thema te gebruiken.',
+-+  openPro: 'Bekijk Pro-plan',        // Proプランを見る
+-+  cancel: 'Annuleren',               // キャンセル
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: 'Elektrische stroom-animatie', // 電気の流れのアニメーション
+-+  flowEffectHelp:
+-+    'Laat een neonstroom over je ketenlijn lopen. Zet uit als je een rustiger beeld wilt.',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
+-+  heatmapRangeTitle: 'Weergaveperiode',
+-+  heatmapRangeHelp: 'Kies hoeveel dagen van je keten op de heatmap van het startscherm worden getoond.',
+-+  heatmapRange7: '1 week',
+-+  heatmapRange30: '1 maand',
+-+  heatmapRange60: '2 maanden',
+-+  heatmapRange90: '3 maanden',
+-+  heatmapRange180: '6 maanden',
+-+  heatmapRange365: '1 jaar',
+-+  heatmapSummaryPrefix: 'Afgelopen ', // 「Afgelopen (過去〜/終わった〜)」
+-+  heatmapSummarySuffix: ' dagen',     // 「dagen (〜日間)」
+-+  heatmapAgoSuffix: ' dagen geleden', // 「〜日前」
+-+  heatmapToday: 'Vandaag',
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: 'Verander het uiterlijk van de app.',
+-+  themeDarkLabel: 'Donker',          // Dark
+-+  themeNeonPinkLabel: 'Neon Pink',
+-+  themeCyberBlueLabel: 'Cyber Blue',
+-+  freeThemeNote: 'Gratis: alleen Donker / Pro ontgrendelt Neon Pink & Cyber Blue',
+-+  proThemeNote: 'Pro-thema\'s komen binnenkort.',
+-+
+-+  // --- Habit Management (習慣管理) ---
+-+  newHabitTitle: 'Nieuwe gewoonte',
+-+  editHabitTitle: 'Gewoonte bewerken',
+-+  habitNameLabel: 'Naam',
+-+  habitNamePlaceholder: 'bijv. Water drinken, Lezen',
+-+  habitIconLabel: 'Icoon',
+-+  deleteHabit: 'Verwijder deze gewoonte',
+-+  deleteConfirmationTitle: 'Verwijderen?',
+-+  deleteConfirmationMessage: 'Dit kan niet ongedaan worden gemaakt. Alle geschiedenis gaat verloren.',
+-+  save: 'Opslaan',
+-+  create: 'Aanmaken',
+-+
+-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
+-+  iconCatBasic: 'Basis',
+-+  iconCatHealth: 'Gezondheid',
+-+  iconCatLearning: 'Leren',
+-+
+-+  iconLabelStreak: 'Reeks',          // Streak (連続)
+-+  iconLabelTask: 'Taak',             // Task
+-+  iconLabelShine: 'Glans',           // Shine
+-+  iconLabelClean: 'Schoonmaken',     // Clean
+-+  iconLabelLaundry: 'De was',        // Laundry
+-+  iconLabelWater: 'Water',           // Water
+-+  iconLabelWalk: 'Wandelen',         // Walk
+-+  iconLabelSleep: 'Slapen',          // Sleep
+-+  iconLabelWorkout: 'Training',      // Workout
+-+  iconLabelBarbell: 'Halter',        // Barbell
+-+  iconLabelRead: 'Lezen',            // Read
+-+  iconLabelArt: 'Kunst',             // Art
+-+  iconLabelMedia: 'Media',           // Media
+-+  iconLabelStudy: 'Studie',          // Study
+-+  iconLabelLanguage: 'Taal',         // Language
+-+
+-+  // --- Misc / Errors (その他 / エラー) ---
+-+  habitButtonSuffix: ' gewoonteknop', // アクセシビリティ用
+-+  errorLoadFailed: 'Gegevens laden mislukt.',
+-+  errorTitleRequired: 'Naam is verplicht.',
+-+  errorTitleTooLong: 'Naam mag maximaal 20 tekens bevatten.',
+-+  errorSaveFailed: 'Opslaan mislukt.',
+-+  errorDeleteFailed: 'Verwijderen mislukt.',
+-+  errorToggleFailed: 'Updaten mislukt.',
+-+  habitLimitTitle: 'Limiet gratis plan',
+-+  habitLimitBody: 'In het gratis plan kun je maximaal 3 gewoonten aanmaken.',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: 'Haptische feedback (trillen)',
+-+
+-+  // --- Reminder (リマインダー) ---
+-+  reminderSectionTitle: 'Herinnering',
+-+  reminderToggleLabel: 'Gebruik herinnering',
+-+  reminderTimeLabel: 'Tijdstip melding',
+-+  reminderNotificationBody: 'Het is tijd om aan je keten te bouwen!', // チェーンを作る時間だよ！
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: '7 dagen op rij!',
+-+  streak7Message: 'Je hebt je keten een hele week volgehouden. Goed bezig!',
+-+  ok: 'Geweldig',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: 'Taal wijzigen',
+-+  currentLanguage: 'Huidige',
+-+  languageNameEn: 'Engels',
+-+  languageNameJa: 'Japans',
+-+  languageNameFr: 'Frans',
+-+  languageNameEs: 'Spaans',
+-+  languageNameDe: 'Duits',
+-+  languageNameIt: 'Italiaans',
+-+  languageNamePt: 'Portugees',
+-+  languageNameRu: 'Russisch',
+-+  languageNameZh: 'Chinees',
+-+  languageNameKo: 'Koreaans',
+-+  languageNameHi: 'Hindi',
+-+  languageNameId: 'Indonesisch',
+-+  languageNameTh: 'Thais',
+-+  languageNameVi: 'Vietnamees',
+-+  languageNameMs: 'Maleis',
+-+  languageNameTr: 'Turks',
+-+  languageNameNl: 'Nederlands',
+-+  languageNameSv: 'Zweeds',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: 'Volgende',
+-+  tutorialWelcome: 'Welkom bij DotChain',
+-+  tutorialDesc1: 'Verbind je dagelijkse gewoonten en bouw je eigen keten.',
+-+  tutorialDesc2: 'Breek de keten niet om de gewoonte vast te houden.',
+-+  tutorialStart: 'Starten',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/pt.ts b/src/core/i18n/locales/pt.ts
+-index 0ef0436..b883613 100644
+---- a/src/core/i18n/locales/pt.ts
+-+++ b/src/core/i18n/locales/pt.ts
+-@@ -1,176 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'DIAS SEGUIDOS',
+--    yourChain: 'SUA CORRENTE',
+--    allDoneDays: 'DIAS COMPLETOS',
+--    settings: 'Configurações',
+--    hapticOff: 'Vibração desligada',
+--    language: 'Idioma',
+--    sound: 'Som',
+--    haptics: 'Vibração',
+--    theme: 'Tema',
+--    restore: 'Restaurar compras',
+--    version: 'Versão do app',
+--    tapSound: 'Som do toque',
+--    click: 'Clique',
+--    pop: 'Pop',
+--    flowEffectTitle: 'Animação de fluxo elétrico',
+--    flowEffectHelp:
+--      'Deixe um fluxo de néon correr pela sua linha de corrente. Desative se preferir um visual mais calmo.',
+--    heatmapRangeTitle: 'Intervalo de exibição da corrente',
+--    heatmapRangeHelp: 'Escolha quantos dias da sua corrente mostrar no mapa de calor da tela inicial.',
+--    heatmapRange7: '1 semana',
+--    heatmapRange30: '1 mês',
+--    heatmapRange60: '2 meses',
+--    heatmapRange180: '6 meses',
+--    heatmapRange365: '1 ano',
+--    heatmapSummaryPrefix: 'Últimos ',
+--    heatmapSummarySuffix: ' dias',
+--    heatmapAgoSuffix: ' dias atrás',
+--    heatmapToday: 'Hoje',
+--    freeThemeNote: 'Grátis: só Dark / Pro libera Neon Pink e Cyber Blue',
+--    proThemeNote: 'Temas Pro serão desbloqueados depois do pagamento.',
+--    restoreDesc: 'Restaurar compras (em breve)',
+--    licenses: 'Licenças de código aberto (em breve)',
+--    openPro: 'Abrir DotChain Pro',
+--    heroPaywall: 'Atualize para o mundo neon',
+--    priceMonthly: 'US$1.99 / mês',
+--    onboardingTitle: 'Bem-vindo ao DotChain',
+--    onboardingBody: 'Um toque, vibração forte. Vamos construir a cadeia de hoje.',
+--    start: 'Começar',
+--    paywallNote: 'Cobrança e anúncios serão adicionados depois.',
+--    homeLoading: 'Carregando...',
+--    homeAddHabitLabel: 'Adicionar hábito',
+--    editNewHabit: 'Novo hábito',
+--    editHabitTitle: 'Editar hábito',
+--    editCategoryLabel: 'Categoria',
+--    editNameLabel: 'Nome (máx. 20 caracteres)',
+--    editNamePlaceholder: 'Nomeie seu hábito...',
+--    editSaveChanges: 'Salvar alterações',
+--    editCreateHabit: 'Criar hábito',
+--    editDeleteHabit: 'Excluir hábito',
+--    proTitle: 'Desbloqueie sua corrente.',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'Hábitos ilimitados',
+--    proFeatureThemes: 'Todos os temas liberados (Neon Pink / Cyber Blue)',
+--    proFeatureAds: 'Sem anúncios',
+--    habitButtonSuffix: ' botão de hábito',
+--    iconCatBasic: 'Básico',
+--    iconCatHealth: 'Saúde',
+--    iconCatLearning: 'Aprendizado e Trabalho',
+--    errorLoadFailed: 'Falha ao carregar dados',
+--    errorTitleRequired: 'Título é obrigatório.',
+--    errorTitleTooLong: 'O título deve ter no máximo 20 caracteres.',
+--    errorSaveFailed: 'Falha ao salvar.',
+--    errorDeleteFailed: 'Falha ao excluir.',
+--    errorToggleFailed: 'Falha ao atualizar.',
+--    habitLimitTitle: 'Limite do plano gratuito',
+--    habitLimitBody: 'No plano gratuito você pode criar até 3 hábitos.',
+--    hapticsDescription: 'Feedback tátil',
+--    reminderSectionTitle: 'Notificação de lembrete',
+--    reminderToggleLabel: 'Usar lembrete',
+--    reminderTimeLabel: 'Horário da notificação',
+--    reminderNotificationBody: 'É hora de construir sua cadeia.',
+--    streak7Title: 'Sequência de 7 dias!',
+--    streak7Message: 'Você manteve sua cadeia por uma semana inteira. Ótimo trabalho!',
+--    ok: 'OK',
+--    languageChange: 'Alterar idioma',
+--    currentLanguage: 'Atual',
+--    languageNameEn: 'Inglês',
+--    languageNameJa: 'Japonês',
+--    languageNameFr: 'Francês',
+--    languageNameEs: 'Espanhol',
+--    languageNameDe: 'Alemão',
+--    languageNameIt: 'Italiano',
+--    languageNamePt: 'Português',
+--    languageNameRu: 'Russo',
+--    languageNameZh: 'Chinês',
+--    languageNameKo: 'Coreano',
+--    languageNameHi: 'Hindi',
+--    languageNameId: 'Indonésio',
+--    languageNameTh: 'Tailandês',
+--    languageNameVi: 'Vietnamita',
+--    languageNameMs: 'Malaio',
+--    languageNameTr: 'Turco',
+--    languageNameNl: 'Holandês',
+--    languageNameSv: 'Sueco',
+--    soundSwitchLabel: 'Ativar som',
+--    tapSoundLabel: 'Estilo do som de toque',
+--    proOnlyTitle: 'Recurso exclusivo do Pro',
+--    proOnlyTheme: 'Este tema está disponível no Pro.',
+--
+--    // Chaves faltantes para pt
+--    cancel: 'Cancelar',
+--    delete: 'Excluir',
+--    deleteConfirmBody: 'Tem certeza? Esta ação não pode ser desfeita.',
+--    comingSoonTitle: 'Em breve',
+--    onboardingPunch: 'Este é o DotChain.',
+--
+--    paywallBestValueBadge: 'Melhor custo-benefício',
+--    paywallMonthlyLabel: 'Plano mensal',
+--    paywallMonthlySub: 'Cobrado todo mês. Pode cancelar quando quiser.',
+--    paywallYearlyLabel: 'Plano anual',
+--    paywallYearlySub: 'Cobrança uma vez ao ano. Pode cancelar quando quiser.',
+--
+--    priceFree: 'US$0 / para sempre',
+--    priceYearly: 'US$14.99 / ano',
+--
+--    proCompareHeaderFeature: 'Recurso',
+--    proCompareHeaderFree: 'Grátis',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      'Você sempre pode continuar no plano Gratuito. Pro só remove os limites.',
+--    proCompareTitle: 'O que você ganha com Pro',
+--
+--    proCtaMonthly: 'Assinar Pro mensal',
+--    proCtaStayFree: 'Continuar no gratuito',
+--    proCtaYearly: 'Assinar Pro anual',
+--
+--    proFeatureAdsFree: 'Banner de anúncios na parte inferior',
+--    proFeatureAdsPro: 'Sem anúncios, foco total',
+--    proFeatureHabits: 'Hábitos que você pode acompanhar',
+--    proFeatureHabitsFree: 'Até 3 hábitos',
+--    proFeatureHabitsPro: 'Hábitos ilimitados',
+--    proFeatureThemesFree: '1 tema (Dark)',
+--    proFeatureThemesPro: 'Todos os temas liberados',
+--
+--    proFinePrint:
+--      'A assinatura renova automaticamente. Você pode cancelar a qualquer momento nas configurações da sua conta App Store ou Google Play.',
+--    proMonthlyTagline: 'Comece pequeno, cancele quando quiser.',
+--    proPlanFreeTitle: 'Gratuito',
+--    proPlanMonthlyTitle: 'Mensal',
+--    proPlanYearlyBadge: 'Melhor opção',
+--    proPlanYearlyTitle: 'Anual',
+--    proSubtitle: 'Vá além de 3 hábitos e torne sua corrente imparável.',
+--    proYearlySavingShort: 'Economize cerca de 37% (como 8 meses grátis).',
+--    proYearlyTagline: 'Para quem leva a corrente a sério.',
+--
+--    restoreSoon: 'A opção de restaurar compras será adicionada em uma próxima atualização.',
+--
+--    themeCyberBlueLabel: 'Cyber Blue',
+--    themeDarkLabel: 'Dark',
+--    themeDesc: 'Escolha o clima que preferir. (Temas Pro serão adicionados depois.)',
+--    themeNeonPinkLabel: 'Neon Pink',
+--
+--    tutorialEditIconBody:
+--      'Primeiro, escolha um ícone que combine com seu hábito.',
+--    tutorialEditNameBody:
+--      'Depois, dê um nome ao seu hábito.\nExemplo: "Beber água", "Ler um livro".',
+--    tutorialEditSubmitBody:
+--      'Pronto!\nToque no botão de criar abaixo para adicionar este hábito à tela inicial.',
+--    tutorialExplainChainBody:
+--      'Ao tocar, seu contador de DIAS SEGUIDOS aumenta e hoje acende na SUA CORRENTE.\nContinue para alongar ainda mais a corrente.',
+--    tutorialGotIt: 'Entendi',
+--    tutorialNext: 'Avançar',
+--    tutorialPressFabBody:
+--      'Toque no botão + no canto inferior direito para criar seu primeiro hábito.',
+--    tutorialPressHabitBody:
+--      'Agora toque no hábito que você acabou de criar.\nAo tocar, hoje fica marcado como "concluído".',
+--    tutorialStart: 'Começar',
+--    tutorialWelcomeBody:
+--      'Bem-vindo!\nO DotChain ajuda você a construir sua corrente de hábitos.\nComece criando seu primeiro hábito pelo botão +.',
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
+-+  daysStreak: 'DIAS SEGUIDOS',
+-+  yourChain: 'SUA CORRENTE',
+-+  allDoneDays: 'DIAS COMPLETOS',
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: 'Configurações',
+-+  hapticOff: 'Vibração desativada',
+-+  language: 'Idioma',
+-+  sound: 'Som',
+-+  haptics: 'Vibração',
+-+  theme: 'Tema',
+-+
+-+  // --- Purchase / Restore (購入 / 復元) ---
+-+  restore: 'Restaurar Compras',
+-+  purchaseSuccess: 'O plano Pro está ativo agora.',
+-+  purchaseFailed: 'Falha na compra. Tente novamente mais tarde.',
+-+  restoreSuccess: 'Histórico de compras restaurado.',
+-+  restoreNotFound: 'Nenhuma compra encontrada para restaurar.',
+-+  restoreFailed: 'Falha ao restaurar compras.',
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: 'Versão do App',
+-+  tapSound: 'Som do toque',
+-+  click: 'Clique',
+-+  pop: 'Pop',
+-+  soundSwitchLabel: 'Efeitos Sonoros',
+-+
+-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
+-+  proTitle: 'Desbloqueie sua corrente.',
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: 'Vá além de 3 hábitos e torne seus pontos imparáveis.',
+-+  proPlanFreeTitle: 'Grátis',
+-+  proPlanMonthlyTitle: 'Mensal',
+-+  proPlanYearlyTitle: 'Anual',
+-+  proPlanYearlyBadge: 'Melhor opção',
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '$0 / para sempre', // または 'Grátis / para sempre'
+-+  proOnlyTitle: 'Recurso Pro',
+-+  proOnlyTheme: 'Faça upgrade para o Pro para usar este tema.',
+-+  openPro: 'Ver Plano Pro',
+-+  cancel: 'Cancelar',
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: 'Animação de fluxo elétrico',
+-+  flowEffectHelp:
+-+    'Deixe um fluxo neon percorrer sua linha de corrente. Desative se preferir um visual mais calmo.',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
+-+  heatmapRangeTitle: 'Intervalo de exibição',
+-+  heatmapRangeHelp: 'Escolha quantos dias da sua corrente mostrar no mapa de calor da tela inicial.',
+-+  heatmapRange7: '1 semana',
+-+  heatmapRange30: '1 mês',
+-+  heatmapRange60: '2 meses',
+-+  heatmapRange90: '3 meses',
+-+  heatmapRange180: '6 meses',
+-+  heatmapRange365: '1 ano',
+-+  heatmapSummaryPrefix: 'Últimos ',
+-+  heatmapSummarySuffix: ' dias',
+-+  heatmapAgoSuffix: ' dias atrás',
+-+  heatmapToday: 'Hoje',
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: 'Mude a aparência do aplicativo.',
+-+  themeDarkLabel: 'Escuro',
+-+  themeNeonPinkLabel: 'Neon Rosa',
+-+  themeCyberBlueLabel: 'Cyber Azul',
+-+  freeThemeNote: 'Grátis: Apenas Escuro / Pro desbloqueia Neon Rosa e Cyber Azul',
+-+  proThemeNote: 'Temas Pro estarão disponíveis em breve.',
+-+
+-+  // --- Habit Management (習慣管理) ---
+-+  newHabitTitle: 'Novo Hábito',
+-+  editHabitTitle: 'Editar Hábito',
+-+  habitNameLabel: 'Nome',
+-+  habitNamePlaceholder: 'ex: Ler um livro, Beber água',
+-+  habitIconLabel: 'Ícone',
+-+  deleteHabit: 'Excluir este hábito',
+-+  deleteConfirmationTitle: 'Excluir hábito?',
+-+  deleteConfirmationMessage: 'Esta ação não pode ser desfeita. Todo o histórico será perdido.',
+-+  save: 'Salvar',
+-+  create: 'Criar',
+-+
+-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
+-+  iconCatBasic: 'Básico',
+-+  iconCatHealth: 'Saúde',
+-+  iconCatLearning: 'Aprendizado',
+-+
+-+  iconLabelStreak: 'Sequência',
+-+  iconLabelTask: 'Tarefa',
+-+  iconLabelShine: 'Brilho',
+-+  iconLabelClean: 'Limpeza',
+-+  iconLabelLaundry: 'Lavanderia',
+-+  iconLabelWater: 'Água',
+-+  iconLabelWalk: 'Caminhada',
+-+  iconLabelSleep: 'Sono',
+-+  iconLabelWorkout: 'Treino',
+-+  iconLabelBarbell: 'Haltere',
+-+  iconLabelRead: 'Leitura',
+-+  iconLabelArt: 'Arte',
+-+  iconLabelMedia: 'Mídia',
+-+  iconLabelStudy: 'Estudo',
+-+  iconLabelLanguage: 'Idioma',
+-+
+-+  // --- Misc / Errors (その他 / エラー) ---
+-+  habitButtonSuffix: ' botão de hábito',
+-+  errorLoadFailed: 'Falha ao carregar dados.',
+-+  errorTitleRequired: 'O título é obrigatório.',
+-+  errorTitleTooLong: 'O título deve ter 20 caracteres ou menos.',
+-+  errorSaveFailed: 'Falha ao salvar.',
+-+  errorDeleteFailed: 'Falha ao excluir.',
+-+  errorToggleFailed: 'Falha ao atualizar registro.',
+-+  habitLimitTitle: 'Limite do plano gratuito',
+-+  habitLimitBody: 'No plano gratuito você pode criar até 3 hábitos.',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: 'Feedback tátil (vibração)',
+-+
+-+  // --- Reminder (リマインダー) ---
+-+  reminderSectionTitle: 'Lembrete',
+-+  reminderToggleLabel: 'Usar lembrete',
+-+  reminderTimeLabel: 'Horário da notificação',
+-+  reminderNotificationBody: 'É hora de construir sua corrente!',
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: 'Sequência de 7 dias!',
+-+  streak7Message: 'Você manteve sua corrente por uma semana inteira. Ótimo trabalho!',
+-+  ok: 'Incrível',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: 'Mudar idioma',
+-+  currentLanguage: 'Atual',
+-+  languageNameEn: 'Inglês',
+-+  languageNameJa: 'Japonês',
+-+  languageNameFr: 'Francês',
+-+  languageNameEs: 'Espanhol',
+-+  languageNameDe: 'Alemão',
+-+  languageNameIt: 'Italiano',
+-+  languageNamePt: 'Português',
+-+  languageNameRu: 'Russo',
+-+  languageNameZh: 'Chinês',
+-+  languageNameKo: 'Coreano',
+-+  languageNameHi: 'Hindi',
+-+  languageNameId: 'Indonésio',
+-+  languageNameTh: 'Tailandês',
+-+  languageNameVi: 'Vietnamita',
+-+  languageNameMs: 'Malaio',
+-+  languageNameTr: 'Turco',
+-+  languageNameNl: 'Holandês',
+-+  languageNameSv: 'Sueco',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: 'Próximo',
+-+  tutorialWelcome: 'Bem-vindo ao DotChain',
+-+  tutorialDesc1: 'Conecte seus hábitos diários e construa sua própria corrente.',
+-+  tutorialDesc2: 'Não quebre a corrente para manter o hábito.',
+-+  tutorialStart: 'Começar',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/ru.ts b/src/core/i18n/locales/ru.ts
+-index 5479482..082ec39 100644
+---- a/src/core/i18n/locales/ru.ts
+-+++ b/src/core/i18n/locales/ru.ts
+-@@ -1,177 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'Серия дней',
+--    yourChain: 'Твоя цепочка',
+--    allDoneDays: 'Дни, когда все привычки выполнены',
+--    settings: 'Настройки',
+--    hapticOff: 'Вибрация выключена',
+--    language: 'Язык',
+--    sound: 'Звук',
+--    haptics: 'Вибрация',
+--    theme: 'Тема',
+--    restore: 'Восстановить покупки',
+--    version: 'Версия приложения',
+--    tapSound: 'Звук нажатия',
+--    click: 'Клик',
+--    pop: 'Поп',
+--    flowEffectTitle: 'Анимация электрического потока',
+--    flowEffectHelp:
+--      'Неоновый поток бежит по линии цепочки. Выключите, если хотите более спокойный вид.',
+--    heatmapRangeTitle: 'Период отображения цепочки',
+--    heatmapRangeHelp: 'Выберите, сколько дней цепочки показывать на теплокарте главного экрана.',
+--    heatmapRange7: '1 неделя',
+--    heatmapRange30: '1 месяц',
+--    heatmapRange60: '2 месяца',
+--    heatmapRange180: '6 месяцев',
+--    heatmapRange365: '1 год',
+--    heatmapSummaryPrefix: 'За последние ',
+--    heatmapSummarySuffix: ' дней',
+--    heatmapAgoSuffix: ' дней назад',
+--    heatmapToday: 'Сегодня',
+--    freeThemeNote: 'Бесплатно: доступна только тема Dark. В Pro открываются Neon Pink и Cyber Blue.',
+--    proThemeNote: 'Темы Pro станут доступны после оплаты.',
+--    restoreDesc: 'Восстановление покупок (скоро)',
+--    licenses: 'Лицензии открытого ПО (скоро)',
+--    openPro: 'Открыть DotChain Pro',
+--    heroPaywall: 'В неоновый мир',
+--    priceMonthly: '$1.99 / месяц',
+--    onboardingTitle: 'Добро пожаловать в DotChain',
+--    onboardingBody: 'Одно нажатие — мощная вибрация. Соберём цепочку сегодня.',
+--    start: 'Начать',
+--    paywallNote: 'Оплата и реклама будут добавлены позже.',
+--    homeLoading: 'Загрузка...',
+--    homeAddHabitLabel: 'Добавить привычку',
+--    editNewHabit: 'Новая привычка',
+--    editHabitTitle: 'Редактировать привычку',
+--    editCategoryLabel: 'Категория',
+--    editNameLabel: 'Название (до 20 символов)',
+--    editNamePlaceholder: 'Назови свою привычку...',
+--    editSaveChanges: 'Сохранить изменения',
+--    editCreateHabit: 'Создать привычку',
+--    editDeleteHabit: 'Удалить привычку',
+--    proTitle: 'Разблокируй свою цепочку.',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'Безлимитные привычки',
+--    proFeatureThemes: 'Все темы разблокированы (Neon Pink / Cyber Blue)',
+--    proFeatureAds: 'Без рекламы',
+--    habitButtonSuffix: ' кнопка привычки',
+--    iconCatBasic: 'Базовые',
+--    iconCatHealth: 'Здоровье',
+--    iconCatLearning: 'Обучение и работа',
+--    errorLoadFailed: 'Не удалось загрузить данные',
+--    errorTitleRequired: 'Требуется название.',
+--    errorTitleTooLong: 'Название должно быть не длиннее 20 символов.',
+--    errorSaveFailed: 'Не удалось сохранить.',
+--    errorDeleteFailed: 'Не удалось удалить.',
+--    errorToggleFailed: 'Не удалось обновить запись.',
+--    habitLimitTitle: 'Лимит бесплатного плана',
+--    habitLimitBody: 'В бесплатном плане можно создать до 3 привычек.',
+--    hapticsDescription: 'Тактильная отдача',
+--    reminderSectionTitle: 'Уведомление-напоминание',
+--    reminderToggleLabel: 'Использовать напоминание',
+--    reminderTimeLabel: 'Время уведомления',
+--    reminderNotificationBody: 'Пора продолжить свою цепочку.',
+--    streak7Title: 'Серия 7 дней!',
+--    streak7Message: 'Вы держали цепочку целую неделю. Отличная работа!',
+--    ok: 'OK',
+--    languageChange: 'Сменить язык',
+--    currentLanguage: 'Текущий',
+--    languageNameEn: 'Английский',
+--    languageNameJa: 'Японский',
+--    languageNameFr: 'Французский',
+--    languageNameEs: 'Испанский',
+--    languageNameDe: 'Немецкий',
+--    languageNameIt: 'Итальянский',
+--    languageNamePt: 'Португальский',
+--    languageNameRu: 'Русский',
+--    languageNameZh: 'Китайский',
+--    languageNameKo: 'Корейский',
+--    languageNameHi: 'Хинди',
+--    languageNameId: 'Индонезийский',
+--    languageNameTh: 'Тайский',
+--    languageNameVi: 'Вьетнамский',
+--    languageNameMs: 'Малайский',
+--    languageNameTr: 'Турецкий',
+--    languageNameNl: 'Нидерландский',
+--    languageNameSv: 'Шведский',
+--    soundSwitchLabel: 'Включить звук',
+--    tapSoundLabel: 'Стиль звука нажатия',
+--    proOnlyTitle: 'Только для Pro',
+--    proOnlyTheme: 'Эта тема доступна в Pro.',
+--
+--    // Полное заполнение ru-локали (новые ключи)
+--    cancel: 'Отмена',
+--    delete: 'Удалить',
+--    deleteConfirmBody: 'Действительно удалить? Это действие нельзя отменить.',
+--    comingSoonTitle: 'Скоро',
+--    onboardingPunch: 'Это DotChain.',
+--
+--    paywallBestValueBadge: 'Самое выгодное',
+--    paywallMonthlyLabel: 'Месячный план',
+--    paywallMonthlySub: 'Списывается каждый месяц. Можно отменить в любое время.',
+--    paywallYearlyLabel: 'Годовой план',
+--    paywallYearlySub: 'Списывается раз в год. Можно отменить в любое время.',
+--
+--    priceFree: '$0 / всегда бесплатно',
+--    priceYearly: '$14.99 / год',
+--
+--    proCompareHeaderFeature: 'Функция',
+--    proCompareHeaderFree: 'Бесплатно',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      'Ты всегда можешь остаться на бесплатном плане. Pro просто убирает ограничения.',
+--    proCompareTitle: 'Что дает Pro',
+--
+--    proCtaMonthly: 'Оформить Pro на месяц',
+--    proCtaStayFree: 'Остаться на бесплатном',
+--    proCtaYearly: 'Оформить Pro на год',
+--
+--    proFeatureAdsFree: 'Баннерная реклама внизу',
+--    proFeatureAdsPro: 'Без рекламы, максимум фокуса',
+--    proFeatureHabits: 'Сколько привычек можно отслеживать',
+--    proFeatureHabitsFree: 'До 3 привычек',
+--    proFeatureHabitsPro: 'Неограниченное количество привычек',
+--    proFeatureThemesFree: '1 тема (темная)',
+--    proFeatureThemesPro: 'Все темы разблокированы',
+--
+--    proFinePrint:
+--      'Подписка продлевается автоматически. Отменить можно в любое время в настройках аккаунта App Store или Google Play.',
+--    proMonthlyTagline: 'Начни с малого, отменить можно в любое время.',
+--    proPlanFreeTitle: 'Бесплатно',
+--    proPlanMonthlyTitle: 'Месячный',
+--    proPlanYearlyBadge: 'Самое выгодное',
+--    proPlanYearlyTitle: 'Годовой',
+--    proSubtitle:
+--      'Отслеживай более 3 привычек — и твои точки будут неостановимы.',
+--    proYearlySavingShort: 'Экономия около 37% (примерно как 8 бесплатных месяцев).',
+--    proYearlyTagline: 'Для тех, кто настроен серьёзно.',
+--
+--    restoreSoon: 'Функция восстановления покупок появится в одном из следующих обновлений.',
+--
+--    themeCyberBlueLabel: 'Кибер-синий',
+--    themeDarkLabel: 'Темная',
+--    themeDesc: 'Выберите настроение приложения. (Темы Pro появятся позже.)',
+--    themeNeonPinkLabel: 'Неоново-розовый',
+--
+--    tutorialEditIconBody:
+--      'Сначала выбери иконку, которая подходит твоей привычке.',
+--    tutorialEditNameBody:
+--      'Теперь введи название привычки.\nНапример: «Пей воду», «Читай книгу».',
+--    tutorialEditSubmitBody:
+--      'Готово!\nНажми кнопку создания ниже, чтобы добавить привычку на главный экран.',
+--    tutorialExplainChainBody:
+--      'Когда отмечаешь привычку, серия дней растёт, а на цепочке загорается сегодняшняя точка.\nПродолжай, чтобы удлинять цепочку.',
+--    tutorialGotIt: 'Понятно',
+--    tutorialNext: 'Далее',
+--    tutorialPressFabBody:
+--      'Нажми кнопку + в правом нижнем углу, чтобы создать первую привычку.',
+--    tutorialPressHabitBody:
+--      'Теперь нажми на только что созданную привычку.\nНажатие отмечает сегодняшний день как «выполнено».',
+--    tutorialStart: 'Начать',
+--    tutorialWelcomeBody:
+--      'Добро пожаловать!\nDotChain помогает строить цепочки привычек.\nСначала создай свою первую привычку с помощью кнопки +.',
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム / ヘッダー) ---
+-+  daysStreak: 'СЕРИЯ ДНЕЙ',
+-+  yourChain: 'ТВОЯ ЦЕПОЧКА',
+-+  allDoneDays: 'ВСЕ ВЫПОЛНЕНО', // 直訳より「全て完了」のニュアンス
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: 'Настройки',
+-+  hapticOff: 'Вибрация выкл.',
+-+  language: 'Язык',
+-+  sound: 'Звук',
+-+  haptics: 'Вибрация',
+-+  theme: 'Тема',
+-+
+-+  // --- Purchase / Restore (購入 / 復元) ---
+-+  restore: 'Восстановить покупки',
+-+  purchaseSuccess: 'Pro план активирован.',
+-+  purchaseFailed: 'Ошибка покупки. Попробуйте позже.',
+-+  restoreSuccess: 'История покупок восстановлена.',
+-+  restoreNotFound: 'Покупки для восстановления не найдены.',
+-+  restoreFailed: 'Не удалось восстановить покупки.',
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: 'Версия',
+-+  tapSound: 'Звук нажатия',
+-+  click: 'Клик',
+-+  pop: 'Поп',
+-+  soundSwitchLabel: 'Звуковые эффекты',
+-+
+-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
+-+  proTitle: 'Разблокируй цепь.',
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: 'Больше 3 привычек и неудержимые точки.',
+-+  proPlanFreeTitle: 'Бесплатно',
+-+  proPlanMonthlyTitle: 'Месяц',
+-+  proPlanYearlyTitle: 'Год',
+-+  proPlanYearlyBadge: 'Выгодно', // 「Best value」の自然な意訳
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '0 ₽ / навсегда', // 通貨記号は適宜ですが、一般的に₽または$
+-+  proOnlyTitle: 'Pro функция',
+-+  proOnlyTheme: 'Перейди на Pro для этой темы.',
+-+  openPro: 'Смотреть Pro',
+-+  cancel: 'Отмена',
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: 'Эффект электротока',
+-+  flowEffectHelp:
+-+    'Пусти неоновый ток по своей цепочке. Выключи, если хочешь спокойствия.',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
+-+  heatmapRangeTitle: 'Период отображения',
+-+  heatmapRangeHelp: 'Сколько дней цепочки показывать на главном экране.',
+-+  heatmapRange7: '1 неделя',
+-+  heatmapRange30: '1 месяц',
+-+  heatmapRange60: '2 месяца',
+-+  heatmapRange90: '3 месяца',
+-+  heatmapRange180: '6 месяцев',
+-+  heatmapRange365: '1 год',
+-+  heatmapSummaryPrefix: 'За ',
+-+  heatmapSummarySuffix: ' дн.', // "days" の短縮形（文法回避のため）
+-+  heatmapAgoSuffix: ' дн. назад',
+-+  heatmapToday: 'Сегодня',
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: 'Измени внешний вид приложения.',
+-+  themeDarkLabel: 'Темная',
+-+  themeNeonPinkLabel: 'Неон Розовый',
+-+  themeCyberBlueLabel: 'Кибер Синий',
+-+  freeThemeNote: 'Free: Темная / Pro: Неон и Кибер',
+-+  proThemeNote: 'Pro темы скоро появятся.',
+-+
+-+  // --- Habit Management (習慣管理) ---
+-+  newHabitTitle: 'Новая привычка',
+-+  editHabitTitle: 'Редактировать',
+-+  habitNameLabel: 'Название',
+-+  habitNamePlaceholder: 'Напр.: Читать книгу, Пить воду',
+-+  habitIconLabel: 'Иконка',
+-+  deleteHabit: 'Удалить привычку',
+-+  deleteConfirmationTitle: 'Удалить?',
+-+  deleteConfirmationMessage: 'Это действие нельзя отменить. История будет потеряна.',
+-+  save: 'Сохранить',
+-+  create: 'Создать',
+-+
+-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
+-+  iconCatBasic: 'Базовые',
+-+  iconCatHealth: 'Здоровье',
+-+  iconCatLearning: 'Обучение',
+-+
+-+  iconLabelStreak: 'Серия',
+-+  iconLabelTask: 'Задача',
+-+  iconLabelShine: 'Сияние',
+-+  iconLabelClean: 'Уборка',
+-+  iconLabelLaundry: 'Стирка',
+-+  iconLabelWater: 'Вода',
+-+  iconLabelWalk: 'Прогулка',
+-+  iconLabelSleep: 'Сон',
+-+  iconLabelWorkout: 'Тренировка',
+-+  iconLabelBarbell: 'Штанга',
+-+  iconLabelRead: 'Чтение',
+-+  iconLabelArt: 'Искусство',
+-+  iconLabelMedia: 'Медиа',
+-+  iconLabelStudy: 'Учеба',
+-+  iconLabelLanguage: 'Язык',
+-+
+-+  // --- Misc / Errors (その他 / エラー) ---
+-+  habitButtonSuffix: ' кнопка привычки',
+-+  errorLoadFailed: 'Ошибка загрузки данных.',
+-+  errorTitleRequired: 'Название обязательно.',
+-+  errorTitleTooLong: 'Название не более 20 символов.',
+-+  errorSaveFailed: 'Ошибка сохранения.',
+-+  errorDeleteFailed: 'Ошибка удаления.',
+-+  errorToggleFailed: 'Ошибка обновления.',
+-+  habitLimitTitle: 'Лимит бесплатного плана',
+-+  habitLimitBody: 'В бесплатном плане можно создать до 3 привычек.',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: 'Тактильный отклик (вибрация)',
+-+
+-+  // --- Reminder (リマインダー) ---
+-+  reminderSectionTitle: 'Напоминание',
+-+  reminderToggleLabel: 'Включить напоминание',
+-+  reminderTimeLabel: 'Время уведомления',
+-+  reminderNotificationBody: 'Пора строить свою цепочку!',
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: 'Серия 7 дней!',
+-+  streak7Message: 'Ты держишь цепочку целую неделю. Отличная работа!',
+-+  ok: 'Круто',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: 'Сменить язык',
+-+  currentLanguage: 'Текущий',
+-+  languageNameEn: 'Английский',
+-+  languageNameJa: 'Японский',
+-+  languageNameFr: 'Французский',
+-+  languageNameEs: 'Испанский',
+-+  languageNameDe: 'Немецкий',
+-+  languageNameIt: 'Итальянский',
+-+  languageNamePt: 'Португальский',
+-+  languageNameRu: 'Русский',
+-+  languageNameZh: 'Китайский',
+-+  languageNameKo: 'Корейский',
+-+  languageNameHi: 'Хинди',
+-+  languageNameId: 'Индонезийский',
+-+  languageNameTh: 'Тайский',
+-+  languageNameVi: 'Вьетнамский',
+-+  languageNameMs: 'Малайский',
+-+  languageNameTr: 'Турецкий',
+-+  languageNameNl: 'Нидерландский',
+-+  languageNameSv: 'Шведский',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: 'Далее',
+-+  tutorialWelcome: 'Добро пожаловать в DotChain',
+-+  tutorialDesc1: 'Соединяй ежедневные привычки и строй свою цепочку.',
+-+  tutorialDesc2: 'Не прерывай цепочку, чтобы привычка закрепилась.',
+-+  tutorialStart: 'Начать',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/sv.ts b/src/core/i18n/locales/sv.ts
+-index f6af6d3..ca7e019 100644
+---- a/src/core/i18n/locales/sv.ts
+-+++ b/src/core/i18n/locales/sv.ts
+-@@ -1,183 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'Dagar i rad',
+--    yourChain: 'Din kedja',
+--    allDoneDays: 'Dagar då alla vanor är klara',
+--    settings: 'Inställningar',
+--    hapticOff: 'Vibration av',
+--    language: 'Språk',
+--    sound: 'Ljud',
+--    haptics: 'Vibration',
+--    theme: 'Tema',
+--    restore: 'Återställ köp',
+--    version: 'App-version',
+--    tapSound: 'Tryckljud',
+--    click: 'Klick',
+--    pop: 'Pop',
+--    flowEffectTitle: 'Elflödesanimation',
+--    flowEffectHelp:
+--      'Låt ett neonströmflöde löpa längs kedjan. Stäng av om du vill ha ett lugnare intryck.',
+--    heatmapRangeTitle: 'Visningsperiod för kedjan',
+--    heatmapRangeHelp:
+--      'Välj hur många dagar av kedjan som ska visas i heatmapen på startsidan.',
+--    heatmapRange7: '1 vecka',
+--    heatmapRange30: '1 månad',
+--    heatmapRange60: '2 månader',
+--    heatmapRange180: '6 månader',
+--    heatmapRange365: '1 år',
+--    heatmapSummaryPrefix: 'Senaste ',
+--    heatmapSummarySuffix: ' dagar',
+--    heatmapAgoSuffix: ' dagar sedan',
+--    heatmapToday: 'Idag',
+--    freeThemeNote: 'Gratis: bara Dark / Pro låser upp Neon Pink & Cyber Blue',
+--    proThemeNote: 'Pro-teman låses upp senare.',
+--    restoreDesc: 'Återställ (snart)',
+--    licenses: 'Open-source-licenser (snart)',
+--    openPro: 'Öppna DotChain Pro',
+--    heroPaywall: 'Uppgradera till neonvärlden',
+--    priceMonthly: '$1.99 / månad',
+--    onboardingTitle: 'Välkommen till DotChain',
+--    onboardingBody: 'Ett tryck, stark vibration. Bygg dagens kedja.',
+--    start: 'Starta',
+--    paywallNote: 'Fakturering och annonser läggs till senare.',
+--    homeLoading: 'Laddar...',
+--    homeAddHabitLabel: 'Lägg till vana',
+--    editNewHabit: 'Ny vana',
+--    editHabitTitle: 'Redigera vana',
+--    editCategoryLabel: 'Kategori',
+--    editNameLabel: 'Namn (max 20 tecken)',
+--    editNamePlaceholder: 'Namnge din vana...',
+--    editSaveChanges: 'Spara ändringar',
+--    editCreateHabit: 'Skapa vana',
+--    editDeleteHabit: 'Ta bort vana',
+--    proTitle: 'Lås upp din kedja.',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'Obegränsade vanor',
+--    proFeatureThemes: 'Alla teman upplåsta (Neon Pink / Cyber Blue)',
+--    proFeatureAds: 'Inga annonser',
+--    habitButtonSuffix: ' vaneknapp',
+--    iconCatBasic: 'Bas',
+--    iconCatHealth: 'Hälsa',
+--    iconCatLearning: 'Lärande & Arbete',
+--    errorLoadFailed: 'Misslyckades att läsa in data',
+--    errorTitleRequired: 'Titel krävs.',
+--    errorTitleTooLong: 'Titeln får vara högst 20 tecken.',
+--    errorSaveFailed: 'Misslyckades att spara.',
+--    errorDeleteFailed: 'Misslyckades att ta bort.',
+--    errorToggleFailed: 'Misslyckades att uppdatera.',
+--    habitLimitTitle: 'Gräns för gratisplanen',
+--    habitLimitBody: 'I gratisplanen kan du skapa upp till 3 vanor.',
+--    hapticsDescription: 'Haptisk feedback',
+--    reminderSectionTitle: 'Påminnelseavisering',
+--    reminderToggleLabel: 'Använd påminnelse',
+--    reminderTimeLabel: 'Notistid',
+--    reminderNotificationBody: 'Dags att bygga vidare på din kedja.',
+--    streak7Title: '7 dagars svit!',
+--    streak7Message: 'Du höll din kedja i en hel vecka. Grymt jobbat!',
+--    ok: 'OK',
+--    languageChange: 'Ändra språk',
+--    currentLanguage: 'Aktuell',
+--    languageNameEn: 'Engelska',
+--    languageNameJa: 'Japanska',
+--    languageNameFr: 'Franska',
+--    languageNameEs: 'Spanska',
+--    languageNameDe: 'Tyska',
+--    languageNameIt: 'Italienska',
+--    languageNamePt: 'Portugisiska',
+--    languageNameRu: 'Ryska',
+--    languageNameZh: 'Kinesiska',
+--    languageNameKo: 'Koreanska',
+--    languageNameHi: 'Hindi',
+--    languageNameId: 'Indonesiska',
+--    languageNameTh: 'Thai',
+--    languageNameVi: 'Vietnamesiska',
+--    languageNameMs: 'Malajiska',
+--    languageNameTr: 'Turkiska',
+--    languageNameNl: 'Nederländska',
+--    languageNameSv: 'Svenska',
+--    soundSwitchLabel: 'Aktivera ljud',
+--    tapSoundLabel: 'Tryckljudsstil',
+--    proOnlyTitle: 'Endast för Pro',
+--    proOnlyTheme: 'Det här temat finns med Pro.',
+--
+--    cancel: 'Avbryt',
+--    delete: 'Ta bort',
+--    deleteConfirmBody: 'Är du säker? Det här går inte att ångra.',
+--    comingSoonTitle: 'Kommer snart',
+--    onboardingPunch: 'Det här är DotChain.',
+--
+--    paywallBestValueBadge: 'Bästa värdet',
+--    paywallMonthlyLabel: 'Månadsabonnemang',
+--    paywallMonthlySub: 'Faktureras varje månad. Kan sägas upp när som helst.',
+--    paywallYearlyLabel: 'Årsabonnemang',
+--    paywallYearlySub: 'Faktureras en gång per år. Kan sägas upp när som helst.',
+--
+--    priceFree: '$0 / för alltid',
+--    priceYearly: '$14.99 / år',
+--
+--    proCompareHeaderFeature: 'Funktion',
+--    proCompareHeaderFree: 'Gratis',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      'Du kan alltid stanna på Gratis. Pro tar bara bort begränsningarna.',
+--    proCompareTitle: 'Det här får du med Pro',
+--
+--    proCtaMonthly: 'Välj Pro månadsvis',
+--    proCtaStayFree: 'Fortsätt med gratis',
+--    proCtaYearly: 'Välj Pro årsvis',
+--
+--    proFeatureAdsFree: 'Annonsbanner längst ned',
+--    proFeatureAdsPro: 'Inga annonser, full fokus',
+--    proFeatureHabits: 'Vanor du kan följa upp',
+--    proFeatureHabitsFree: 'Upp till 3 vanor',
+--    proFeatureHabitsPro: 'Obegränsat antal vanor',
+--    proFeatureThemesFree: '1 tema (Mörk)',
+--    proFeatureThemesPro: 'Alla teman upplåsta',
+--
+--    proFinePrint:
+--      'Abonnemanget förnyas automatiskt. Du kan säga upp när som helst via inställningarna för ditt App Store- eller Google Play-konto.',
+--    proMonthlyTagline: 'Börja smått, avsluta när du vill.',
+--    proPlanFreeTitle: 'Gratis',
+--    proPlanMonthlyTitle: 'Månadsvis',
+--    proPlanYearlyBadge: 'Bästa värdet',
+--    proPlanYearlyTitle: 'Årsvis',
+--    proSubtitle:
+--      'Gå bortom 3 vanor och gör din kedja ostoppbar.',
+--    proYearlySavingShort: 'Spara cirka 37 % (som 8 månader gratis).',
+--    proYearlyTagline: 'För seriösa kedjebyggare.',
+--
+--    restoreSoon: 'Återställning av köp läggs till i en kommande uppdatering.',
+--
+--    themeCyberBlueLabel: 'Cyber Blue',
+--    themeDarkLabel: 'Mörk',
+--    themeDesc: 'Välj den känsla som passar dig. (Pro-teman läggs till senare.)',
+--    themeNeonPinkLabel: 'Neon Pink',
+--
+--    tutorialEditIconBody: 'Välj först en ikon som passar din vana.',
+--    tutorialEditNameBody:
+--      `Ge sedan din vana ett namn.
+--Till exempel: "Dricka vatten", "Läsa en bok".`,
+--    tutorialEditSubmitBody:
+--      `Klart!
+--Tryck på skapa-knappen nedan för att lägga till den här vanan på startsidan.`,
+--    tutorialExplainChainBody:
+--      `När du trycker ökar dina DAGAR I RAD och idag lyser upp i DIN KEDJA.
+--Fortsätt för att förlänga kedjan.`,
+--    tutorialGotIt: 'Förstått',
+--    tutorialNext: 'Nästa',
+--    tutorialPressFabBody:
+--      'Tryck på +-knappen nere till höger för att skapa din första vana.',
+--    tutorialPressHabitBody:
+--      `Tryck nu på vanan du just skapade.
+--När du trycker räknas idag som "klar".`,
+--    tutorialStart: 'Starta',
+--    tutorialWelcomeBody:
+--      `Välkommen!
+--Med DotChain bygger du din egen vanekedja.
+--Börja med att skapa din första vana via +-knappen.`,
+--  }
+--
+--
+--export default dict;
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
+-+  daysStreak: 'DAGAR I RAD',         // 英語: DAYS STREAK (直訳：一列に並んだ日々＝連続記録)
+-+  yourChain: 'DIN KEDJA',            // 英語: YOUR CHAIN
+-+  allDoneDays: 'HELDAGAR',           // 英語: ALL DONE DAYS (「完全に完了した日」を短く表現)
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: 'Inställningar',         // 設定
+-+  hapticOff: 'Vibration av',         // 振動オフ
+-+  language: 'Språk',                 // 言語
+-+  sound: 'Ljud',                     // 音
+-+  haptics: 'Haptik',                 // 振動 (Haptics)
+-+  theme: 'Tema',                     // テーマ
+-+
+-+  // --- Purchase / Restore (購入 / 復元) ---
+-+  restore: 'Återställ köp',          // 購入の復元
+-+  purchaseSuccess: 'Pro-planen är nu aktiv.', // 購入成功
+-+  purchaseFailed: 'Köpet misslyckades. Försök igen senare.', // 購入失敗
+-+  restoreSuccess: 'Köphistorik återställd.', // 復元成功
+-+  restoreNotFound: 'Inga köp hittades att återställa.', // 復元データなし
+-+  restoreFailed: 'Misslyckades med att återställa köp.', // 復元失敗
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: 'App-version',            // アプリバージョン
+-+  tapSound: 'Tryckljud',             // タップ音
+-+  click: 'Klick',                    // クリック
+-+  pop: 'Pop',                        // ポップ
+-+  soundSwitchLabel: 'Ljudeffekter',  // 効果音
+-+
+-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
+-+  proTitle: 'Lås upp din kedja.',    // 英語: Unlock your chain.
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: 'Gå bortom 3 vanor och gör dina prickar ostoppbara.',
+-+  proPlanFreeTitle: 'Gratis',        // 無料
+-+  proPlanMonthlyTitle: 'Månadsvis',  // 月額
+-+  proPlanYearlyTitle: 'Årsvis',      // 年額
+-+  proPlanYearlyBadge: 'Bästa värde', // 英語: Best value (一番お得)
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '0 kr / för alltid',    // ずっと0クローナ (または $0)
+-+  proOnlyTitle: 'Pro-funktion',      // Pro機能
+-+  proOnlyTheme: 'Uppgradera till Pro för att använda detta tema.',
+-+  openPro: 'Se Pro-planen',          // Proプランを見る
+-+  cancel: 'Avbryt',                  // キャンセル
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: 'Elektrisk flödesanimation', // 電気の流れのアニメーション
+-+  flowEffectHelp:
+-+    'Låt ett neonflöde strömma längs din kedja. Stäng av om du föredrar en lugnare vy.',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
+-+  heatmapRangeTitle: 'Visningsperiod',
+-+  heatmapRangeHelp: 'Välj hur många dagar av din kedja som ska visas på hemskärmen.',
+-+  heatmapRange7: '1 vecka',
+-+  heatmapRange30: '1 månad',
+-+  heatmapRange60: '2 månader',
+-+  heatmapRange90: '3 månader',
+-+  heatmapRange180: '6 månader',
+-+  heatmapRange365: '1 år',
+-+  heatmapSummaryPrefix: 'Senaste ',  // 「Senaste (最新の/過去の)」
+-+  heatmapSummarySuffix: ' dagarna',  // 「dagarna (その日々)」
+-+  heatmapAgoSuffix: ' dagar sedan',  // 「〜日前」
+-+  heatmapToday: 'Idag',
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: 'Ändra appens utseende.',
+-+  themeDarkLabel: 'Mörk',            // Dark
+-+  themeNeonPinkLabel: 'Neonrosa',
+-+  themeCyberBlueLabel: 'Cyberblå',
+-+  freeThemeNote: 'Gratis: Endast Mörk / Pro låser upp Neonrosa och Cyberblå',
+-+  proThemeNote: 'Pro-teman blir tillgängliga efter köp.',
+-+
+-+  // --- Habit Management (習慣管理) ---
+-+  newHabitTitle: 'Ny vana',
+-+  editHabitTitle: 'Redigera vana',
+-+  habitNameLabel: 'Namn',
+-+  habitNamePlaceholder: 't.ex. Dricka vatten, Läsa bok',
+-+  habitIconLabel: 'Ikon',
+-+  deleteHabit: 'Ta bort denna vana',
+-+  deleteConfirmationTitle: 'Ta bort?',
+-+  deleteConfirmationMessage: 'Detta går inte att ångra. All historik försvinner.',
+-+  save: 'Spara',
+-+  create: 'Skapa',
+-+
+-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
+-+  iconCatBasic: 'Grundläggande',
+-+  iconCatHealth: 'Hälsa',
+-+  iconCatLearning: 'Lärande',
+-+
+-+  iconLabelStreak: 'Svit',           // Streak (連続記録)
+-+  iconLabelTask: 'Uppgift',          // Task
+-+  iconLabelShine: 'Glans',           // Shine
+-+  iconLabelClean: 'Städa',           // Clean
+-+  iconLabelLaundry: 'Tvätt',         // Laundry
+-+  iconLabelWater: 'Vatten',          // Water
+-+  iconLabelWalk: 'Promenad',         // Walk
+-+  iconLabelSleep: 'Sömn',            // Sleep
+-+  iconLabelWorkout: 'Träning',       // Workout
+-+  iconLabelBarbell: 'Skivstång',     // Barbell
+-+  iconLabelRead: 'Läsa',             // Read
+-+  iconLabelArt: 'Konst',             // Art
+-+  iconLabelMedia: 'Media',           // Media
+-+  iconLabelStudy: 'Studera',         // Study
+-+  iconLabelLanguage: 'Språk',        // Language
+-+
+-+  // --- Misc / Errors (その他 / エラー) ---
+-+  habitButtonSuffix: ' vaneknapp',   // アクセシビリティ用
+-+  errorLoadFailed: 'Kunde inte ladda data.',
+-+  errorTitleRequired: 'Namn krävs.',
+-+  errorTitleTooLong: 'Namnet får vara max 20 tecken.',
+-+  errorSaveFailed: 'Kunde inte spara.',
+-+  errorDeleteFailed: 'Kunde inte ta bort.',
+-+  errorToggleFailed: 'Kunde inte uppdatera.',
+-+  habitLimitTitle: 'Gräns för gratisplan',
+-+  habitLimitBody: 'På gratisplanen kan du skapa upp till 3 vanor.',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: 'Haptisk feedback (vibration)',
+-+
+-+  // --- Reminder (リマインダー) ---
+-+  reminderSectionTitle: 'Påminnelse',
+-+  reminderToggleLabel: 'Använd påminnelse',
+-+  reminderTimeLabel: 'Tid för notis',
+-+  reminderNotificationBody: 'Det är dags att bygga din kedja!', // チェーンを作る時間だよ！
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: '7 dagars svit!',
+-+  streak7Message: 'Du har hållit din kedja i en hel vecka. Bra jobbat!',
+-+  ok: 'Grymt',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: 'Byt språk',
+-+  currentLanguage: 'Nuvarande',
+-+  languageNameEn: 'Engelska',
+-+  languageNameJa: 'Japanska',
+-+  languageNameFr: 'Franska',
+-+  languageNameEs: 'Spanska',
+-+  languageNameDe: 'Tyska',
+-+  languageNameIt: 'Italienska',
+-+  languageNamePt: 'Portugisiska',
+-+  languageNameRu: 'Ryska',
+-+  languageNameZh: 'Kinesiska',
+-+  languageNameKo: 'Koreanska',
+-+  languageNameHi: 'Hindi',
+-+  languageNameId: 'Indonesiska',
+-+  languageNameTh: 'Thailändska',
+-+  languageNameVi: 'Vietnamesiska',
+-+  languageNameMs: 'Malaysiska',
+-+  languageNameTr: 'Turkiska',
+-+  languageNameNl: 'Holländska',
+-+  languageNameSv: 'Svenska',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: 'Nästa',
+-+  tutorialWelcome: 'Välkommen till DotChain',
+-+  tutorialDesc1: 'Koppla ihop dina dagliga vanor och bygg din egen kedja.',
+-+  tutorialDesc2: 'Bryt inte kedjan för att få vanan att fastna.',
+-+  tutorialStart: 'Börja',
+-+};
+-+
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/th.ts b/src/core/i18n/locales/th.ts
+-index e8faf9a..7ac7b49 100644
+---- a/src/core/i18n/locales/th.ts
+-+++ b/src/core/i18n/locales/th.ts
+-@@ -1,185 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'จำนวนวันต่อเนื่อง',
+--    yourChain: 'เชนของคุณ',
+--    allDoneDays: 'จำนวนวันที่ทำครบทั้งหมด',
+--    settings: 'การตั้งค่า',
+--    hapticOff: 'ปิดการสั่น',
+--    language: 'ภาษา',
+--    sound: 'เสียง',
+--    haptics: 'การสั่น',
+--    theme: 'ธีม',
+--    restore: 'กู้คืนการซื้อ',
+--    version: 'เวอร์ชันแอป',
+--    tapSound: 'เสียงแตะ',
+--    click: 'คลิก',
+--    pop: 'ป็อป',
+--    flowEffectTitle: 'แอนิเมชันกระแสไฟ',
+--    flowEffectHelp:
+--      'ให้กระแสไฟนีออนไหลไปตามเชนของคุณ หากต้องการหน้าจอที่นิ่งกว่านี้ให้ปิดฟีเจอร์นี้ได้',
+--    heatmapRangeTitle: 'ช่วงวันที่แสดงเชน',
+--    heatmapRangeHelp: 'เลือกจำนวนวันที่จะแสดงเชนในฮีตแมปหน้าหลัก',
+--    heatmapRange7: '1 สัปดาห์',
+--    heatmapRange30: '1 เดือน',
+--    heatmapRange60: '2 เดือน',
+--    heatmapRange180: '6 เดือน',
+--    heatmapRange365: '1 ปี',
+--    heatmapSummaryPrefix: 'ย้อนหลัง ',
+--    heatmapSummarySuffix: ' วัน',
+--    heatmapAgoSuffix: ' วันที่แล้ว',
+--    heatmapToday: 'วันนี้',
+--    freeThemeNote: 'ฟรี: ธีมมืดเท่านั้น / Pro ปลดล็อก Neon Pink และ Cyber Blue',
+--    proThemeNote: 'ธีม Pro จะใช้ได้หลังจากเปิดระบบ Pro แล้ว',
+--    restoreDesc: 'กู้คืน (เร็ว ๆ นี้)',
+--    licenses: 'สัญญาอนุญาต OSS (เร็ว ๆ นี้)',
+--    openPro: 'เปิด DotChain Pro',
+--    heroPaywall: 'อัปเกรดสู่โลกนีออน',
+--    priceMonthly: '$1.99 / เดือน',
+--    onboardingTitle: 'ยินดีต้อนรับสู่ DotChain',
+--    onboardingBody: 'แตะครั้งเดียว สั่นแรง มาสร้างเชนของวันนี้กัน',
+--    start: 'เริ่ม',
+--    paywallNote: 'การชำระเงินและโฆษณาจะถูกเพิ่มภายหลัง',
+--    homeLoading: 'กำลังโหลด...',
+--    homeAddHabitLabel: 'เพิ่มนิสัย',
+--    editNewHabit: 'นิสัยใหม่',
+--    editHabitTitle: 'แก้ไขนิสัย',
+--    editCategoryLabel: 'หมวดหมู่',
+--    editNameLabel: 'ชื่อ (สูงสุด 20 ตัวอักษร)',
+--    editNamePlaceholder: 'ตั้งชื่อนิสัยของคุณ...',
+--    editSaveChanges: 'บันทึกการเปลี่ยนแปลง',
+--    editCreateHabit: 'สร้างนิสัย',
+--    editDeleteHabit: 'ลบนิสัย',
+--    proTitle: 'ปลดล็อกเชนของคุณ',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'นิสัยไม่จำกัด',
+--    proFeatureThemes: 'ปลดล็อกทุกธีม (Neon Pink / Cyber Blue)',
+--    proFeatureAds: 'ไม่มีโฆษณา',
+--    habitButtonSuffix: ' ปุ่มนิสัย',
+--    iconCatBasic: 'พื้นฐาน',
+--    iconCatHealth: 'สุขภาพ',
+--    iconCatLearning: 'การเรียนรู้และงาน',
+--    errorLoadFailed: 'โหลดข้อมูลล้มเหลว',
+--    errorTitleRequired: 'ต้องใส่ชื่อเรื่อง',
+--    errorTitleTooLong: 'ชื่อเรื่องต้องไม่เกิน 20 อักขระ',
+--    errorSaveFailed: 'บันทึกล้มเหลว',
+--    errorDeleteFailed: 'ลบล้มเหลว',
+--    errorToggleFailed: 'อัปเดตไม่สำเร็จ',
+--    habitLimitTitle: 'ขีดจำกัดแพ็กเกจฟรี',
+--    habitLimitBody: 'แพ็กเกจฟรีสร้างนิสัยได้สูงสุด 3 รายการ',
+--    hapticsDescription: 'การตอบสนองแบบสั่น',
+--    reminderSectionTitle: 'การแจ้งเตือนนิสัย',
+--    reminderToggleLabel: 'ใช้การเตือนความจำ',
+--    reminderTimeLabel: 'เวลาการแจ้งเตือน',
+--    reminderNotificationBody: 'ถึงเวลาสร้างเชนของคุณแล้ว',
+--    streak7Title: 'ต่อเนื่อง 7 วัน!',
+--    streak7Message: 'คุณรักษาเชนต่อเนื่องได้ครบหนึ่งสัปดาห์ เยี่ยมมาก!',
+--    ok: 'ตกลง',
+--    languageChange: 'เปลี่ยนภาษา',
+--    currentLanguage: 'ปัจจุบัน',
+--    languageNameEn: 'อังกฤษ',
+--    languageNameJa: 'ญี่ปุ่น',
+--    languageNameFr: 'ฝรั่งเศส',
+--    languageNameEs: 'สเปน',
+--    languageNameDe: 'เยอรมัน',
+--    languageNameIt: 'อิตาลี',
+--    languageNamePt: 'โปรตุเกส',
+--    languageNameRu: 'รัสเซีย',
+--    languageNameZh: 'จีน',
+--    languageNameKo: 'เกาหลี',
+--    languageNameHi: 'ฮินดี',
+--    languageNameId: 'อินโดนีเซีย',
+--    languageNameTh: 'ไทย',
+--    languageNameVi: 'เวียดนาม',
+--    languageNameMs: 'มาเลย์',
+--    languageNameTr: 'ตุรกี',
+--    languageNameNl: 'ดัตช์',
+--    languageNameSv: 'สวีเดน',
+--    soundSwitchLabel: 'เปิดเสียง',
+--    tapSoundLabel: 'สไตล์เสียงแตะ',
+--    proOnlyTitle: 'สำหรับ Pro เท่านั้น',
+--    proOnlyTheme: 'ธีมนี้ใช้ได้เฉพาะใน Pro',
+--
+--    cancel: 'ยกเลิก',
+--    delete: 'ลบ',
+--    deleteConfirmBody: 'แน่ใจหรือไม่ว่าต้องการลบ? การกระทำนี้ไม่สามารถย้อนกลับได้.',
+--    comingSoonTitle: 'เร็ว ๆ นี้',
+--    onboardingPunch: 'นี่คือ DotChain.',
+--
+--    paywallBestValueBadge: 'คุ้มที่สุด',
+--    paywallMonthlyLabel: 'แพ็กเกจรายเดือน',
+--    paywallMonthlySub: 'ตัดบิลทุกเดือน ยกเลิกได้ทุกเมื่อ.',
+--    paywallYearlyLabel: 'แพ็กเกจรายปี',
+--    paywallYearlySub: 'ตัดบิลปีละครั้ง ยกเลิกได้ทุกเมื่อ.',
+--
+--    priceFree: '$0 / ตลอดไป',
+--    priceYearly: '$14.99 / ปี',
+--
+--    proCompareHeaderFeature: 'ฟีเจอร์',
+--    proCompareHeaderFree: 'ฟรี',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      'คุณสามารถใช้แบบฟรีต่อไปได้เสมอ Pro แค่เอาข้อจำกัดออก.',
+--    proCompareTitle: 'คุณจะได้อะไรจาก Pro',
+--
+--    proCtaMonthly: 'สมัคร Pro รายเดือน',
+--    proCtaStayFree: 'ใช้แบบฟรีต่อไป',
+--    proCtaYearly: 'สมัคร Pro รายปี',
+--
+--    proFeatureAdsFree: 'แบนเนอร์โฆษณาด้านล่าง',
+--    proFeatureAdsPro: 'ไม่มีโฆษณา โฟกัสได้เต็มที่',
+--    proFeatureHabits: 'จำนวนพฤติกรรมที่ติดตามได้',
+--    proFeatureHabitsFree: 'นิสัยได้สูงสุด 3 รายการ',
+--    proFeatureHabitsPro: 'นิสัยไม่จำกัด',
+--    proFeatureThemesFree: '1 ธีม (ธีมมืด)',
+--    proFeatureThemesPro: 'ปลดล็อกทุกธีม',
+--
+--    proFinePrint:
+--      'การสมัครจะต่ออายุอัตโนมัติ คุณสามารถยกเลิกได้ตลอดเวลาในการตั้งค่าบัญชี App Store หรือ Google Play ของคุณ.',
+--    proMonthlyTagline: 'เริ่มแบบเล็ก ๆ ยกเลิกเมื่อไหร่ก็ได้.',
+--    proPlanFreeTitle: 'ฟรี',
+--    proPlanMonthlyTitle: 'รายเดือน',
+--    proPlanYearlyBadge: 'คุ้มที่สุด',
+--    proPlanYearlyTitle: 'รายปี',
+--    proSubtitle:
+--      'ไปให้ไกลกว่า 3 นิสัย แล้วทำให้เชนของคุณหยุดไม่อยู่.',
+--    proYearlySavingShort:
+--      'ประหยัดประมาณ 37% (เหมือนได้ใช้ฟรี 8 เดือน).',
+--    proYearlyTagline: 'สำหรับคนสร้างเชนตัวจริง.',
+--
+--    restoreSoon:
+--      'ฟังก์ชันกู้คืนการซื้อจะถูกเพิ่มในอัปเดตถัดไป.',
+--
+--    themeCyberBlueLabel: 'Cyber Blue',
+--    themeDarkLabel: 'ธีมมืด',
+--    themeDesc:
+--      'เลือกบรรยากาศที่คุณชอบ (ธีม Pro จะถูกเพิ่มในภายหลัง).',
+--    themeNeonPinkLabel: 'Neon Pink',
+--
+--    tutorialEditIconBody:
+--      'ก่อนอื่น เลือกไอคอนที่เข้ากับนิสัยของคุณ.',
+--    tutorialEditNameBody:
+--      `ถัดไป ตั้งชื่อนิสัยของคุณ
+--ตัวอย่างเช่น "ดื่มน้ำ", "อ่านหนังสือ".`,
+--    tutorialEditSubmitBody:
+--      `พร้อมแล้ว!
+--แตะปุ่มสร้างด้านล่างเพื่อเพิ่มนิสัยนี้ไปยังหน้าหลักของคุณ.`,
+--    tutorialExplainChainBody:
+--      `เมื่อแตะแล้ว จำนวนวันต่อเนื่องของคุณจะเพิ่มขึ้น และวันนี้จะติดสว่างบนเชนของคุณ
+--ทำต่อไปเพื่อยืดเชนให้ยาวขึ้น.`,
+--    tutorialGotIt: 'เข้าใจแล้ว',
+--    tutorialNext: 'ถัดไป',
+--    tutorialPressFabBody:
+--      'แตะปุ่ม + ด้านล่างขวาเพื่อสร้างนิสัยแรกของคุณ.',
+--    tutorialPressHabitBody:
+--      `ตอนนี้ให้แตะนิสัยที่คุณเพิ่งสร้าง
+--การแตะจะนับว่าวันนี้ "ทำแล้ว".`,
+--    tutorialStart: 'เริ่มเลย',
+--    tutorialWelcomeBody:
+--      `ยินดีต้อนรับ!
+--DotChain ช่วยให้คุณสร้างเชนนิสัยของตัวเองได้
+--เริ่มจากการสร้างนิสัยแรกของคุณด้วยปุ่ม +.`,
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
+-+  daysStreak: 'วันต่อเนื่อง',        // 英語: DAYS STREAK (連続日数)
+-+  yourChain: 'เชนของคุณ',            // 英語: YOUR CHAIN (あなたのチェーン)
+-+  allDoneDays: 'วันที่ทำครบ',        // 英語: ALL DONE DAYS (全て完了した日)
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: 'การตั้งค่า',            // 設定
+-+  hapticOff: 'ปิดการสั่น',           // 振動オフ
+-+  language: 'ภาษา',                  // 言語
+-+  sound: 'เสียง',                    // 音
+-+  haptics: 'การสั่น',                // 振動 (Haptics)
+-+  theme: 'ธีม',                      // テーマ
+-+
+-+  // --- Purchase / Restore (購入 / 復元) ---
+-+  restore: 'กู้คืนการซื้อ',          // 購入の復元
+-+  purchaseSuccess: 'แพ็กเกจ Pro ใช้งานได้แล้ว', // 購入成功
+-+  purchaseFailed: 'การสั่งซื้อล้มเหลว โปรดลองใหม่ภายหลัง', // 購入失敗
+-+  restoreSuccess: 'กู้คืนประวัติการซื้อแล้ว', // 復元成功
+-+  restoreNotFound: 'ไม่พบประวัติการซื้อ',    // 復元データなし
+-+  restoreFailed: 'กู้คืนการซื้อไม่สำเร็จ',   // 復元失敗
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: 'เวอร์ชันแอป',            // アプリバージョン
+-+  tapSound: 'เสียงกด',               // タップ音
+-+  click: 'คลิก',                     // クリック
+-+  pop: 'ป๊อป',                       // ポップ
+-+  soundSwitchLabel: 'เอฟเฟกต์เสียง', // 効果音
+-+
+-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
+-+  proTitle: 'ปลดล็อกเชนของคุณ',      // 英語: Unlock your chain.
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: 'ก้าวข้ามขีดจำกัด 3 นิสัย และทำให้จุดของคุณไม่หยุดนิ่ง',
+-+  proPlanFreeTitle: 'ฟรี',           // 無料
+-+  proPlanMonthlyTitle: 'รายเดือน',   // 月額
+-+  proPlanYearlyTitle: 'รายปี',       // 年額
+-+  proPlanYearlyBadge: 'คุ้มที่สุด',  // 英語: Best value (一番お得/価値がある)
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '฿0 / ตลอดไป',          // ずっと0バーツ (または $0)
+-+  proOnlyTitle: 'ฟีเจอร์ Pro',       // Pro機能
+-+  proOnlyTheme: 'อัปเกรดเป็น Pro เพื่อใช้ธีมนี้',
+-+  openPro: 'ดูแพ็กเกจ Pro',          // Proプランを見る
+-+  cancel: 'ยกเลิก',                  // キャンセル
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: 'แอนิเมชันกระแสไฟ', // 電気の流れのアニメーション
+-+  flowEffectHelp:
+-+    'ให้แสงนีออนไหลผ่านเส้นเชนของคุณ ปิดได้หากต้องการหน้าจอที่นิ่งสงบ',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
+-+  heatmapRangeTitle: 'ระยะเวลาแสดงผล',
+-+  heatmapRangeHelp: 'เลือกจำนวนวันที่ต้องการแสดงเชนบนหน้าโฮม',
+-+  heatmapRange7: '1 สัปดาห์',
+-+  heatmapRange30: '1 เดือน',
+-+  heatmapRange60: '2 เดือน',
+-+  heatmapRange90: '3 เดือน',
+-+  heatmapRange180: '6 เดือน',
+-+  heatmapRange365: '1 ปี',
+-+  heatmapSummaryPrefix: 'ย้อนหลัง ', // 「過去〜」
+-+  heatmapSummarySuffix: ' วัน',      // 「〜日」
+-+  heatmapAgoSuffix: ' วันที่แล้ว',   // 「〜日前」
+-+  heatmapToday: 'วันนี้',
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: 'เปลี่ยนหน้าตาของแอป',
+-+  themeDarkLabel: 'มืด',             // Dark
+-+  themeNeonPinkLabel: 'นีออนชมพู',
+-+  themeCyberBlueLabel: 'ไซเบอร์บลู',
+-+  freeThemeNote: 'ฟรี: ใช้ได้เฉพาะธีมมืด / Pro: ปลดล็อกนีออนชมพูและไซเบอร์บลู',
+-+  proThemeNote: 'ธีม Pro จะใช้ได้หลังจากสมัครสมาชิก',
+-+
+-+  // --- Habit Management (習慣管理) ---
+-+  newHabitTitle: 'นิสัยใหม่',
+-+  editHabitTitle: 'แก้ไขนิสัย',
+-+  habitNameLabel: 'ชื่อ',
+-+  habitNamePlaceholder: 'เช่น ดื่มน้ำ, อ่านหนังสือ',
+-+  habitIconLabel: 'ไอคอน',
+-+  deleteHabit: 'ลบนิสัยนี้',
+-+  deleteConfirmationTitle: 'ยืนยันการลบ?',
+-+  deleteConfirmationMessage: 'การกระทำนี้ไม่สามารถย้อนกลับได้ ประวัติทั้งหมดจะหายไป',
+-+  save: 'บันทึก',
+-+  create: 'สร้าง',
+-+
+-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
+-+  iconCatBasic: 'พื้นฐาน',
+-+  iconCatHealth: 'สุขภาพ',
+-+  iconCatLearning: 'การเรียนรู้',
+-+
+-+  iconLabelStreak: 'ต่อเนื่อง',      // Streak
+-+  iconLabelTask: 'งาน',              // Task
+-+  iconLabelShine: 'สดใส',            // Shine
+-+  iconLabelClean: 'ทำความสะอาด',     // Clean
+-+  iconLabelLaundry: 'ซักผ้า',        // Laundry
+-+  iconLabelWater: 'ดื่มน้ำ',         // Water
+-+  iconLabelWalk: 'เดิน',             // Walk
+-+  iconLabelSleep: 'นอนหลับ',         // Sleep
+-+  iconLabelWorkout: 'ออกกำลังกาย',   // Workout
+-+  iconLabelBarbell: 'ยกน้ำหนัก',     // Barbell
+-+  iconLabelRead: 'อ่าน',             // Read
+-+  iconLabelArt: 'ศิลปะ',             // Art
+-+  iconLabelMedia: 'สื่อ',            // Media
+-+  iconLabelStudy: 'เรียน',           // Study
+-+  iconLabelLanguage: 'ภาษา',         // Language
+-+
+-+  // --- Misc / Errors (その他 / エラー) ---
+-+  habitButtonSuffix: ' ปุ่มนิสัย',   // アクセシビリティ用
+-+  errorLoadFailed: 'โหลดข้อมูลล้มเหลว',
+-+  errorTitleRequired: 'กรุณาระบุชื่อ',
+-+  errorTitleTooLong: 'ชื่อต้องไม่เกิน 20 ตัวอักษร',
+-+  errorSaveFailed: 'บันทึกไม่สำเร็จ',
+-+  errorDeleteFailed: 'ลบไม่สำเร็จ',
+-+  errorToggleFailed: 'อัปเดตไม่สำเร็จ',
+-+  habitLimitTitle: 'ขีดจำกัดแพ็กเกจฟรี',
+-+  habitLimitBody: 'แพ็กเกจฟรีสร้างได้สูงสุด 3 นิสัย',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: 'ระบบสั่นตอบสนอง (Haptic)',
+-+
+-+  // --- Reminder (リマインダー) ---
+-+  reminderSectionTitle: 'แจ้งเตือน',
+-+  reminderToggleLabel: 'เปิดใช้แจ้งเตือน',
+-+  reminderTimeLabel: 'เวลาแจ้งเตือน',
+-+  reminderNotificationBody: 'ได้เวลาสร้างเชนของคุณแล้ว!', // チェーンを作る時間だよ！
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: 'ต่อเนื่อง 7 วัน!',
+-+  streak7Message: 'คุณรักษาเชนได้ครบหนึ่งสัปดาห์แล้ว สุดยอดมาก!',
+-+  ok: 'ยอดเยี่ยม',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: 'เปลี่ยนภาษา',
+-+  currentLanguage: 'ปัจจุบัน',
+-+  languageNameEn: 'อังกฤษ',
+-+  languageNameJa: 'ญี่ปุ่น',
+-+  languageNameFr: 'ฝรั่งเศส',
+-+  languageNameEs: 'สเปน',
+-+  languageNameDe: 'เยอรมัน',
+-+  languageNameIt: 'อิตาลี',
+-+  languageNamePt: 'โปรตุเกส',
+-+  languageNameRu: 'รัสเซีย',
+-+  languageNameZh: 'จีน',
+-+  languageNameKo: 'เกาหลี',
+-+  languageNameHi: 'ฮินดี',
+-+  languageNameId: 'อินโดนีเซีย',
+-+  languageNameTh: 'ไทย',
+-+  languageNameVi: 'เวียดนาม',
+-+  languageNameMs: 'มาเลย์',
+-+  languageNameTr: 'ตุรกี',
+-+  languageNameNl: 'ดัตช์',
+-+  languageNameSv: 'สวีเดน',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: 'ถัดไป',
+-+  tutorialWelcome: 'ยินดีต้อนรับสู่ DotChain',
+-+  tutorialDesc1: 'เชื่อมต่อนิสัยประจำวันและสร้างเชนของคุณเอง',
+-+  tutorialDesc2: 'อย่าให้เชนขาด เพื่อให้นิสัยคงอยู่ตลอดไป',
+-+  tutorialStart: 'เริ่มต้น',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/tr.ts b/src/core/i18n/locales/tr.ts
+-index ed22c65..8b1b398 100644
+---- a/src/core/i18n/locales/tr.ts
+-+++ b/src/core/i18n/locales/tr.ts
+-@@ -1,182 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'GÜN SERİSİ',
+--    yourChain: 'ZİNCİRİN',
+--    allDoneDays: 'TAMAMEN YAPILAN GÜNLER',
+--    settings: 'Ayarlar',
+--    hapticOff: 'Titreşim kapalı',
+--    language: 'Dil',
+--    sound: 'Ses',
+--    haptics: 'Titreşim',
+--    theme: 'Tema',
+--    restore: 'Satın alımı geri yükle',
+--    version: 'Uygulama sürümü',
+--    tapSound: 'Dokunma sesi',
+--    click: 'Tık',
+--    pop: 'Pop',
+--    flowEffectTitle: 'Elektrik akışı animasyonu',
+--    flowEffectHelp:
+--      'Zincir çizgin boyunca neon bir akış dolaşır. Daha sakin bir görünüm istersen kapatabilirsin.',
+--    heatmapRangeTitle: 'Zincir gösterim süresi',
+--    heatmapRangeHelp: 'Ana ekrandaki ısı haritasında zincirin kaç günü gösterileceğini seç.',
+--    heatmapRange7: '1 hafta',
+--    heatmapRange30: '1 ay',
+--    heatmapRange60: '2 ay',
+--    heatmapRange180: '6 ay',
+--    heatmapRange365: '1 yıl',
+--    heatmapSummaryPrefix: 'Son ',
+--    heatmapSummarySuffix: ' gün',
+--    heatmapAgoSuffix: ' gün önce',
+--    heatmapToday: 'Bugün',
+--    freeThemeNote: 'Ücretsiz: yalnızca Dark / Pro Neon Pink, Cyber Blue açar',
+--    proThemeNote: 'Pro temalar paywall sonrası.',
+--    restoreDesc: 'Geri yükleme (yakında)',
+--    licenses: 'OSS lisansları (yakında)',
+--    openPro: "DotChain Pro`yu aç",
+--    heroPaywall: `Neon dünyasına geç`,
+--    priceMonthly: `$2.99 / ay`,
+--    onboardingTitle: "DotChain`e hoş geldin",
+--    onboardingBody: 'Tek dokunuş, güçlü titreşim. Bugünün zincirini kur.',
+--    start: 'Başla',
+--    paywallNote: 'Faturalama/reklam sonra.',
+--    homeLoading: 'Yükleniyor...',
+--    homeAddHabitLabel: 'Alışkanlık ekle',
+--    editNewHabit: 'Yeni alışkanlık',
+--    editHabitTitle: 'Alışkanlık düzenle',
+--    editCategoryLabel: 'Kategori',
+--    editNameLabel: 'Ad (en fazla 20 karakter)',
+--    editNamePlaceholder: 'Alışkanlığına ad ver...',
+--    editSaveChanges: 'Değişiklikleri kaydet',
+--    editCreateHabit: 'Alışkanlık oluştur',
+--    editDeleteHabit: 'Alışkanlığı sil',
+--    proTitle: 'DotChain Pro',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'Sınırsız alışkanlık',
+--    proFeatureThemes: 'Tüm temalar açık (Neon Pink / Cyber Blue)',
+--        proFeatureAds: 'Reklamsız',
+--    habitButtonSuffix: ' alışkanlık düğmesi',
+--    iconCatBasic: 'Temel',
+--    iconCatHealth: 'Sağlık',
+--    iconCatLearning: 'Öğrenme ve İş',
+--    errorLoadFailed: 'Veri yüklenemedi',
+--    errorTitleRequired: 'Başlık gerekli.',
+--    errorTitleTooLong: 'Başlık en fazla 20 karakter olmalı.',
+--    errorSaveFailed: 'Kaydetme başarısız.',
+--    errorDeleteFailed: 'Silme başarısız.',
+--    errorToggleFailed: 'Güncelleme başarısız.',
+--    habitLimitTitle: 'Ücretsiz plan sınırı',
+--    habitLimitBody: 'Ücretsiz planda en fazla 3 alışkanlık oluşturabilirsiniz.',
+--    hapticsDescription: 'Dokunsal geri bildirim',
+--    reminderSectionTitle: 'Hatırlatma bildirimi',
+--    reminderToggleLabel: 'Hatırlatıcıyı kullan',
+--    reminderTimeLabel: 'Bildirim zamanı',
+--    reminderNotificationBody: 'Zincirini ilerletme zamanı.',
+--    streak7Title: '7 günlük seri!',
+--    streak7Message: 'Bir hafta boyunca zincirini sürdürdün. Harika!',
+--    ok: 'Tamam',
+--    languageChange: 'Dili değiştir',
+--    currentLanguage: 'Geçerli',
+--    languageNameEn: 'İngilizce',
+--    languageNameJa: 'Japonca',
+--    languageNameFr: 'Fransızca',
+--    languageNameEs: 'İspanyolca',
+--    languageNameDe: 'Almanca',
+--    languageNameIt: 'İtalyanca',
+--    languageNamePt: 'Portekizce',
+--    languageNameRu: 'Rusça',
+--    languageNameZh: 'Çince',
+--    languageNameKo: 'Korece',
+--    languageNameHi: 'Hintçe',
+--    languageNameId: 'Endonezce',
+--    languageNameTh: 'Tayca',
+--    languageNameVi: 'Vietnamca',
+--    languageNameMs: 'Malayca',
+--    languageNameTr: 'Türkçe',
+--    languageNameNl: 'Flemenkçe',
+--    languageNameSv: 'İsveççe',
+--    soundSwitchLabel: 'Sesi aç',
+--    tapSoundLabel: 'Dokunma sesi stili',
+--    proOnlyTitle: 'Yalnızca Pro için',
+--    proOnlyTheme: 'Bu tema Pro ile kullanılabilir.',
+--
+--    // Dialogs
+--    cancel: 'İptal',
+--    delete: 'Sil',
+--    deleteConfirmBody: 'Emin misin? Bu işlem geri alınamaz.',
+--
+--    // Onboarding / punch
+--    onboardingPunch: 'İşte DotChain.',
+--
+--    // Pricing / paywall labels
+--    priceFree: '$0 / sonsuza kadar',
+--    priceYearly: '$14.99 / yıl',
+--    paywallMonthlyLabel: 'Aylık plan',
+--    paywallMonthlySub: 'Her ay faturalandırılır. İstediğin zaman iptal edebilirsin.',
+--    paywallYearlyLabel: 'Yıllık plan',
+--    paywallYearlySub: 'Yılda bir kez faturalandırılır. İstediğin zaman iptal edebilirsin.',
+--    paywallBestValueBadge: 'En avantajlı',
+--    comingSoonTitle: 'Yakında geliyor',
+--    restoreSoon:
+--      'Satın alımları geri yükleme özelliği ilerideki bir güncellemede eklenecek.',
+--
+--    // Themes
+--    themeDarkLabel: 'Dark',
+--    themeNeonPinkLabel: 'Neon Pink',
+--    themeCyberBlueLabel: 'Cyber Blue',
+--    themeDesc: 'Sevdiğin havayı seç. (Pro temalar daha sonra eklenecek.)',
+--
+--    // Pro plan descriptions
+--    proSubtitle:
+--      '3 alışkanlık sınırını aş ve nokta zincirini durdurulamaz hale getir.',
+--    proPlanFreeTitle: 'Ücretsiz',
+--    proPlanMonthlyTitle: 'Aylık',
+--    proPlanYearlyTitle: 'Yıllık',
+--    proPlanYearlyBadge: 'En avantajlı',
+--
+--    proCompareTitle: 'Pro ile neler kazanırsın',
+--    proCompareSubtitle:
+--      'Her zaman Ücretsiz planda kalabilirsin. Pro sadece sınırları kaldırır.',
+--    proCompareHeaderFeature: 'Özellik',
+--    proCompareHeaderFree: 'Ücretsiz',
+--    proCompareHeaderPro: 'Pro',
+--
+--    proFeatureHabits: 'Takip edebileceğin alışkanlık sayısı',
+--    proFeatureHabitsFree: 'En fazla 3 alışkanlık',
+--    proFeatureHabitsPro: 'Sınırsız alışkanlık',
+--    proFeatureThemesFree: '1 tema (Dark)',
+--    proFeatureThemesPro: 'Tüm temalar açılır',
+--    proFeatureAdsFree: 'Alt kısımda banner reklam',
+--    proFeatureAdsPro: 'Reklam yok, tam odak',
+--
+--    proMonthlyTagline: 'Küçük başla, istediğin zaman iptal et.',
+--    proYearlyTagline: 'Zincirini ciddiye alanlar için.',
+--    proYearlySavingShort: 'Yaklaşık %37 tasarruf (8 ay bedava gibi).',
+--
+--    proCtaMonthly: 'Aylık Pro al',
+--    proCtaYearly: 'Yıllık Pro al',
+--    proCtaStayFree: 'Ücretsiz planda kal',
+--    proFinePrint:
+--      'Abonelik otomatik olarak yenilenir. İstediğin zaman App Store veya Google Play hesap ayarlarından iptal edebilirsin.',
+--
+--    // Tutorial
+--    tutorialWelcomeBody:
+--      'Hoş geldin!\nDotChain, alışkanlık zincirini kurmana yardım eder.\nİlk alışkanlığını + düğmesinden oluşturarak başla.',
+--    tutorialPressFabBody:
+--      'Sağ alttaki + düğmesine dokunarak ilk alışkanlığını oluştur.',
+--    tutorialPressHabitBody:
+--      'Şimdi az önce oluşturduğun alışkanlığa dokun.\nHer dokunuş bugün için "yapıldı" olarak işaretler.',
+--    tutorialExplainChainBody:
+--      'Her dokunduğunda GÜN SERİSİN artar ve bugün ZİNCİRİN üzerinde yanar.\nZincirini uzatmak için devam et.',
+--    tutorialEditIconBody: 'Önce, alışkanlığına uyan bir ikon seç.',
+--    tutorialEditNameBody:
+--      'Sonra, alışkanlığına bir ad yaz.\nÖrneğin: "Su iç", "Kitap oku".',
+--    tutorialEditSubmitBody:
+--      'Hazırsın!\nBu alışkanlığı ana ekrana eklemek için aşağıdaki oluştur düğmesine dokun.',
+--    tutorialNext: 'İleri',
+--    tutorialStart: 'Başla',
+--    tutorialGotIt: 'Anladım',
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
+-+  daysStreak: 'GÜN SERİSİ',         // 英語: DAYS STREAK (連続日数)
+-+  yourChain: 'ZİNCİRİN',             // 英語: YOUR CHAIN (あなたのチェーン)
+-+  allDoneDays: 'TAMAMLANAN GÜNLER',  // 英語: ALL DONE DAYS (全て完了した日)
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: 'Ayarlar',               // 設定
+-+  hapticOff: 'Titreşim kapalı',      // 振動オフ
+-+  language: 'Dil',                   // 言語
+-+  sound: 'Ses',                      // 音
+-+  haptics: 'Titreşim',               // 振動 (Haptics)
+-+  theme: 'Tema',                     // テーマ
+-+
+-+  // --- Purchase / Restore (購入 / 復元) ---
+-+  restore: 'Satın Alımları Yükle',   // 購入の復元 (少し短縮してボタンに収める)
+-+  purchaseSuccess: 'Pro plan artık aktif.', // 購入成功
+-+  purchaseFailed: 'Satın alma başarısız. Lütfen sonra tekrar dene.', // 購入失敗
+-+  restoreSuccess: 'Satın alma geçmişi yüklendi.', // 復元成功
+-+  restoreNotFound: 'Geri yüklenecek satın alma bulunamadı.', // 復元データなし
+-+  restoreFailed: 'Satın alımlar yüklenemedi.', // 復元失敗
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: 'Uygulama Sürümü',        // アプリバージョン
+-+  tapSound: 'Dokunma sesi',          // タップ音
+-+  click: 'Tık',                      // クリック
+-+  pop: 'Pop',                        // ポップ
+-+  soundSwitchLabel: 'Ses Efektleri', // 効果音
+-+
+-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
+-+  proTitle: 'Zincirinin kilidini aç.', // 英語: Unlock your chain.
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: '3 alışkanlığın ötesine geç ve noktalarını durdurulamaz yap.',
+-+  proPlanFreeTitle: 'Ücretsiz',      // 無料
+-+  proPlanMonthlyTitle: 'Aylık',      // 月額
+-+  proPlanYearlyTitle: 'Yıllık',      // 年額
+-+  proPlanYearlyBadge: 'En Avantajlı', // 英語: Best value (一番お得)
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '₺0 / sonsuza kadar',   // ずっと0リラ (または $0)
+-+  proOnlyTitle: 'Pro Özellik',       // Pro機能
+-+  proOnlyTheme: 'Bu temayı kullanmak için Pro\'ya geç.',
+-+  openPro: 'Pro Planı Gör',          // Proプランを見る
+-+  cancel: 'İptal',                   // キャンセル
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: 'Elektrik Akışı Animasyonu', // 電気の流れのアニメーション
+-+  flowEffectHelp:
+-+    'Zincir hattın boyunca neon bir akışın gezinmesine izin ver. Daha sakin bir görünüm istersen kapat.',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
+-+  heatmapRangeTitle: 'Görüntüleme Aralığı',
+-+  heatmapRangeHelp: 'Ana ekrandaki ısı haritasında zincirinin kaç gününün gösterileceğini seç.',
+-+  heatmapRange7: '1 hafta',
+-+  heatmapRange30: '1 ay',
+-+  heatmapRange60: '2 ay',
+-+  heatmapRange90: '3 ay',
+-+  heatmapRange180: '6 ay',
+-+  heatmapRange365: '1 yıl',
+-+  heatmapSummaryPrefix: 'Son ',      // 「Son (最後の/過去の)」
+-+  heatmapSummarySuffix: ' gün',      // 「gün (日)」
+-+  heatmapAgoSuffix: ' gün önce',     // 「gün önce (日前)」
+-+  heatmapToday: 'Bugün',
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: 'Uygulama görünümünü değiştir.',
+-+  themeDarkLabel: 'Koyu',            // Dark
+-+  themeNeonPinkLabel: 'Neon Pembe',
+-+  themeCyberBlueLabel: 'Siber Mavi',
+-+  freeThemeNote: 'Ücretsiz: Sadece Koyu / Pro: Neon Pembe ve Siber Mavi\'yi açar',
+-+  proThemeNote: 'Pro temalar yakında gelecek.',
+-+
+-+  // --- Habit Management (習慣管理) ---
+-+  newHabitTitle: 'Yeni Alışkanlık',
+-+  editHabitTitle: 'Alışkanlığı Düzenle',
+-+  habitNameLabel: 'İsim',
+-+  habitNamePlaceholder: 'ör: Su iç, Kitap oku',
+-+  habitIconLabel: 'Simge',
+-+  deleteHabit: 'Bu alışkanlığı sil',
+-+  deleteConfirmationTitle: 'Silinsin mi?',
+-+  deleteConfirmationMessage: 'Bu işlem geri alınamaz. Tüm geçmiş kaybolacak.',
+-+  save: 'Kaydet',
+-+  create: 'Oluştur',
+-+
+-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
+-+  iconCatBasic: 'Temel',
+-+  iconCatHealth: 'Sağlık',
+-+  iconCatLearning: 'Öğrenme',
+-+
+-+  iconLabelStreak: 'Seri',           // Streak
+-+  iconLabelTask: 'Görev',            // Task
+-+  iconLabelShine: 'Parıltı',         // Shine
+-+  iconLabelClean: 'Temizlik',        // Clean
+-+  iconLabelLaundry: 'Çamaşır',       // Laundry
+-+  iconLabelWater: 'Su',              // Water
+-+  iconLabelWalk: 'Yürüyüş',          // Walk
+-+  iconLabelSleep: 'Uyku',            // Sleep
+-+  iconLabelWorkout: 'Antrenman',     // Workout
+-+  iconLabelBarbell: 'Halter',        // Barbell
+-+  iconLabelRead: 'Okuma',            // Read
+-+  iconLabelArt: 'Sanat',             // Art
+-+  iconLabelMedia: 'Medya',           // Media
+-+  iconLabelStudy: 'Ders',            // Study
+-+  iconLabelLanguage: 'Dil',          // Language
+-+
+-+  // --- Misc / Errors (その他 / エラー) ---
+-+  habitButtonSuffix: ' alışkanlık düğmesi', // アクセシビリティ用
+-+  errorLoadFailed: 'Veri yüklenemedi.',
+-+  errorTitleRequired: 'İsim gerekli.',
+-+  errorTitleTooLong: 'İsim 20 karakterden kısa olmalı.',
+-+  errorSaveFailed: 'Kaydedilemedi.',
+-+  errorDeleteFailed: 'Silinemedi.',
+-+  errorToggleFailed: 'Güncellenemedi.',
+-+  habitLimitTitle: 'Ücretsiz plan limiti',
+-+  habitLimitBody: 'Ücretsiz planda en fazla 3 alışkanlık oluşturabilirsin.',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: 'Dokunsal geri bildirim (titreşim)',
+-+
+-+  // --- Reminder (リマインダー) ---
+-+  reminderSectionTitle: 'Hatırlatıcı',
+-+  reminderToggleLabel: 'Hatırlatıcı kullan',
+-+  reminderTimeLabel: 'Bildirim zamanı',
+-+  reminderNotificationBody: 'Zincirini kurma zamanı!', // チェーンを作る時間だよ！
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: '7 günlük seri!',
+-+  streak7Message: 'Zincirini tam bir hafta korudun. Harika iş!',
+-+  ok: 'Süper',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: 'Dili değiştir',
+-+  currentLanguage: 'Mevcut',
+-+  languageNameEn: 'İngilizce',
+-+  languageNameJa: 'Japonca',
+-+  languageNameFr: 'Fransızca',
+-+  languageNameEs: 'İspanyolca',
+-+  languageNameDe: 'Almanca',
+-+  languageNameIt: 'İtalyanca',
+-+  languageNamePt: 'Portekizce',
+-+  languageNameRu: 'Rusça',
+-+  languageNameZh: 'Çince',
+-+  languageNameKo: 'Korece',
+-+  languageNameHi: 'Hintçe',
+-+  languageNameId: 'Endonezce',
+-+  languageNameTh: 'Tayca',
+-+  languageNameVi: 'Vietnamca',
+-+  languageNameMs: 'Malayca',
+-+  languageNameTr: 'Türkçe',
+-+  languageNameNl: 'Felemenkçe',
+-+  languageNameSv: 'İsveççe',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: 'İleri',
+-+  tutorialWelcome: 'DotChain\'e Hoş Geldin',
+-+  tutorialDesc1: 'Günlük alışkanlıklarını birleştir ve kendi zincirini kur.',
+-+  tutorialDesc2: 'Alışkanlığın kalıcı olması için zinciri kırma.',
+-+  tutorialStart: 'Başla',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/vi.ts b/src/core/i18n/locales/vi.ts
+-index beefe83..b43f68a 100644
+---- a/src/core/i18n/locales/vi.ts
+-+++ b/src/core/i18n/locales/vi.ts
+-@@ -1,185 +1,163 @@
+- import baseEn from './en';
+- 
+- const dict = {
+--    ...baseEn,
+--    daysStreak: 'SỐ NGÀY LIÊN TIẾP',
+--    yourChain: 'CHUỖI CỦA BẠN',
+--    allDoneDays: 'SỐ NGÀY HOÀN THÀNH TẤT CẢ',
+--    settings: 'Cài đặt',
+--    hapticOff: 'Tắt rung',
+--    language: 'Ngôn ngữ',
+--    sound: 'Âm thanh',
+--    haptics: 'Rung',
+--    theme: 'Chủ đề',
+--    restore: 'Khôi phục mua hàng',
+--    version: 'Phiên bản ứng dụng',
+--    tapSound: 'Âm thanh khi chạm',
+--    click: 'Click',
+--    pop: 'Pop',
+--    flowEffectTitle: 'Hiệu ứng dòng điện',
+--    flowEffectHelp:
+--      'Cho dòng điện neon chạy dọc chuỗi của bạn. Tắt đi nếu bạn muốn giao diện yên tĩnh hơn.',
+--    heatmapRangeTitle: 'Khoảng thời gian hiển thị chuỗi',
+--    heatmapRangeHelp:
+--      'Chọn số ngày chuỗi hiển thị trên bản đồ nhiệt màn hình chính.',
+--    heatmapRange7: '1 tuần',
+--    heatmapRange30: '1 tháng',
+--    heatmapRange60: '2 tháng',
+--    heatmapRange180: '6 tháng',
+--    heatmapRange365: '1 năm',
+--    heatmapSummaryPrefix: '',
+--    heatmapSummarySuffix: ' ngày qua',
+--    heatmapAgoSuffix: ' ngày trước',
+--    heatmapToday: 'Hôm nay',
+--    freeThemeNote: 'Miễn phí: chỉ Dark / Pro mở khóa Neon Pink & Cyber Blue',
+--    proThemeNote: 'Chủ đề Pro sẽ được mở khóa sau khi thanh toán.',
+--    restoreDesc: 'Khôi phục mua hàng (sắp tới)',
+--    licenses: 'Giấy phép mã nguồn mở (sắp tới)',
+--    openPro: 'Mở DotChain Pro',
+--    heroPaywall: 'Nâng cấp vào thế giới neon',
+--    priceMonthly: '$1.99 / tháng',
+--    onboardingTitle: 'Chào mừng đến DotChain',
+--    onboardingBody: 'Một chạm, rung mạnh. Xây chuỗi hôm nay.',
+--    start: 'Bắt đầu',
+--    paywallNote: 'Tính năng thanh toán và quảng cáo sẽ được thêm sau.',
+--    homeLoading: 'Đang tải...',
+--    homeAddHabitLabel: 'Thêm thói quen',
+--    editNewHabit: 'Thói quen mới',
+--    editHabitTitle: 'Chỉnh sửa thói quen',
+--    editCategoryLabel: 'Danh mục',
+--    editNameLabel: 'Tên (tối đa 20 ký tự)',
+--    editNamePlaceholder: 'Đặt tên cho thói quen...',
+--    editSaveChanges: 'Lưu thay đổi',
+--    editCreateHabit: 'Tạo thói quen',
+--    editDeleteHabit: 'Xóa thói quen',
+--    proTitle: 'Mở khóa chuỗi của bạn.',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: 'Thói quen không giới hạn',
+--    proFeatureThemes: 'Tất cả chủ đề mở (Neon Pink / Cyber Blue)',
+--    proFeatureAds: 'Không quảng cáo',
+--    habitButtonSuffix: ' nút thói quen',
+--    iconCatBasic: 'Cơ bản',
+--    iconCatHealth: 'Sức khỏe',
+--    iconCatLearning: 'Học tập & Công việc',
+--    errorLoadFailed: 'Không tải được dữ liệu',
+--    errorTitleRequired: 'Tiêu đề là bắt buộc.',
+--    errorTitleTooLong: 'Tiêu đề phải 20 ký tự trở xuống.',
+--    errorSaveFailed: 'Lưu thất bại.',
+--    errorDeleteFailed: 'Xóa thất bại.',
+--    errorToggleFailed: 'Cập nhật thất bại.',
+--    habitLimitTitle: 'Giới hạn gói miễn phí',
+--    habitLimitBody: 'Trong gói miễn phí bạn có thể tạo tối đa 3 thói quen.',
+--    hapticsDescription: 'Phản hồi rung',
+--    reminderSectionTitle: 'Thông báo nhắc nhở',
+--    reminderToggleLabel: 'Dùng nhắc nhở',
+--    reminderTimeLabel: 'Thời gian thông báo',
+--    reminderNotificationBody: 'Đã đến lúc nối tiếp chuỗi của bạn.',
+--    streak7Title: 'Chuỗi 7 ngày!',
+--    streak7Message: 'Bạn giữ được chuỗi một tuần liền. Tuyệt vời!',
+--    ok: 'OK',
+--    languageChange: 'Đổi ngôn ngữ',
+--    currentLanguage: 'Hiện tại',
+--    languageNameEn: 'Tiếng Anh',
+--    languageNameJa: 'Tiếng Nhật',
+--    languageNameFr: 'Tiếng Pháp',
+--    languageNameEs: 'Tiếng Tây Ban Nha',
+--    languageNameDe: 'Tiếng Đức',
+--    languageNameIt: 'Tiếng Ý',
+--    languageNamePt: 'Tiếng Bồ Đào Nha',
+--    languageNameRu: 'Tiếng Nga',
+--    languageNameZh: 'Tiếng Trung',
+--    languageNameKo: 'Tiếng Hàn',
+--    languageNameHi: 'Tiếng Hindi',
+--    languageNameId: 'Tiếng Indonesia',
+--    languageNameTh: 'Tiếng Thái',
+--    languageNameVi: 'Tiếng Việt',
+--    languageNameMs: 'Tiếng Mã Lai',
+--    languageNameTr: 'Tiếng Thổ Nhĩ Kỳ',
+--    languageNameNl: 'Tiếng Hà Lan',
+--    languageNameSv: 'Tiếng Thụy Điển',
+--    soundSwitchLabel: 'Bật âm thanh',
+--    tapSoundLabel: 'Kiểu âm thanh khi chạm',
+--    proOnlyTitle: 'Chỉ dành cho Pro',
+--    proOnlyTheme: 'Chủ đề này chỉ dành cho Pro.',
+--
+--    cancel: 'Hủy',
+--    delete: 'Xóa',
+--    deleteConfirmBody: 'Bạn có chắc không? Hành động này không thể hoàn tác.',
+--    comingSoonTitle: 'Sắp ra mắt',
+--    onboardingPunch: 'Đây chính là DotChain.',
+--
+--    paywallBestValueBadge: 'Tiết kiệm nhất',
+--    paywallMonthlyLabel: 'Gói theo tháng',
+--    paywallMonthlySub: 'Thanh toán mỗi tháng. Có thể hủy bất cứ lúc nào.',
+--    paywallYearlyLabel: 'Gói theo năm',
+--    paywallYearlySub: 'Thanh toán mỗi năm một lần. Có thể hủy bất cứ lúc nào.',
+--
+--    priceFree: '$0 / dùng mãi mãi',
+--    priceYearly: '$14.99 / năm',
+--
+--    proCompareHeaderFeature: 'Mục',
+--    proCompareHeaderFree: 'Miễn phí',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      'Bạn luôn có thể dùng gói Miễn phí. Pro chỉ đơn giản là gỡ bỏ mọi giới hạn.',
+--    proCompareTitle: 'Bạn nhận được gì với Pro',
+--
+--    proCtaMonthly: 'Dùng Pro theo tháng',
+--    proCtaStayFree: 'Tiếp tục dùng gói Miễn phí',
+--    proCtaYearly: 'Dùng Pro theo năm',
+--
+--    proFeatureAdsFree: 'Có banner quảng cáo ở dưới cùng',
+--    proFeatureAdsPro: 'Không quảng cáo, tập trung tối đa',
+--    proFeatureHabits: 'Số thói quen có thể theo dõi',
+--    proFeatureHabitsFree: 'Tối đa 3 thói quen',
+--    proFeatureHabitsPro: 'Thói quen không giới hạn',
+--    proFeatureThemesFree: '1 chủ đề (Dark)',
+--    proFeatureThemesPro: 'Mở khóa tất cả chủ đề',
+--
+--    proFinePrint:
+--      'Gói đăng ký tự động gia hạn. Bạn có thể hủy bất cứ lúc nào trong phần cài đặt tài khoản App Store hoặc Google Play.',
+--    proMonthlyTagline: 'Bắt đầu nhỏ, có thể hủy bất cứ lúc nào.',
+--    proPlanFreeTitle: 'Miễn phí',
+--    proPlanMonthlyTitle: 'Theo tháng',
+--    proPlanYearlyBadge: 'Tiết kiệm nhất',
+--    proPlanYearlyTitle: 'Theo năm',
+--    proSubtitle:
+--      'Vượt qua giới hạn 3 thói quen và khiến chuỗi chấm của bạn không thể bị ngăn lại.',
+--    proYearlySavingShort: 'Tiết kiệm khoảng 37% (tương đương 8 tháng miễn phí).',
+--    proYearlyTagline:
+--      'Dành cho những người thật sự nghiêm túc với chuỗi thói quen.',
+--
+--    restoreSoon:
+--      'Tính năng khôi phục mua hàng sẽ được thêm trong bản cập nhật sau.',
+--
+--    themeCyberBlueLabel: 'Cyber Blue',
+--    themeDarkLabel: 'Dark',
+--    themeDesc: 'Chọn phong cách bạn thích. (Chủ đề Pro sẽ được thêm sau.)',
+--    themeNeonPinkLabel: 'Neon Pink',
+--
+--    tutorialEditIconBody:
+--      'Trước tiên, hãy chọn một biểu tượng phù hợp với thói quen của bạn.',
+--    tutorialEditNameBody:
+--      `Tiếp theo, hãy nhập tên cho thói quen.
+--Ví dụ: "Uống nước", "Đọc sách".`,
+--    tutorialEditSubmitBody:
+--      `Bạn đã sẵn sàng!
+--Nhấn nút tạo bên dưới để thêm thói quen này vào màn hình chính.`,
+--    tutorialExplainChainBody:
+--      `Mỗi lần chạm, SỐ NGÀY LIÊN TIẾP của bạn tăng lên và hôm nay được thắp sáng trên CHUỖI CỦA BẠN.
+--Hãy tiếp tục để kéo dài chuỗi hơn nữa.`,
+--    tutorialGotIt: 'Hiểu rồi',
+--    tutorialNext: 'Tiếp theo',
+--    tutorialPressFabBody:
+--      'Nhấn nút + ở góc dưới bên phải để tạo thói quen đầu tiên.',
+--    tutorialPressHabitBody:
+--      `Bây giờ hãy nhấn vào thói quen bạn vừa tạo.
+--Mỗi lần nhấn sẽ đánh dấu hôm nay là "đã xong".`,
+--    tutorialStart: 'Bắt đầu',
+--    tutorialWelcomeBody:
+--      `Chào mừng!
+--DotChain giúp bạn xây dựng chuỗi thói quen.
+--Bắt đầu bằng cách tạo thói quen đầu tiên từ nút +.`,
+-+  ...baseEn,
+-+  // --- Home / Header (ホーム画面 / ヘッダー) ---
+-+  daysStreak: 'CHUỖI NGÀY',          // 英語: DAYS STREAK (連続日数 - 短くインパクトのある表現)
+-+  yourChain: 'CHUỖI CỦA BẠN',        // 英語: YOUR CHAIN
+-+  allDoneDays: 'NGÀY HOÀN TẤT',      // 英語: ALL DONE DAYS (全て完了した日)
+-+
+-+  // --- Settings (General) (設定：一般) ---
+-+  settings: 'Cài đặt',               // 設定
+-+  hapticOff: 'Tắt rung',             // 振動オフ
+-+  language: 'Ngôn ngữ',              // 言語
+-+  sound: 'Âm thanh',                 // 音
+-+  haptics: 'Rung',                   // 振動 (Haptics - 一般的に「Rung」)
+-+  theme: 'Giao diện',                // テーマ (Chủ đềとも言うがGiao diệnはUI全体を指す)
+-+
+-+  // --- Purchase / Restore (購入 / 復元) ---
+-+  restore: 'Khôi phục mua hàng',     // 購入の復元
+-+  purchaseSuccess: 'Gói Pro đã được kích hoạt.', // 購入成功
+-+  purchaseFailed: 'Giao dịch thất bại. Vui lòng thử lại sau.', // 購入失敗
+-+  restoreSuccess: 'Đã khôi phục lịch sử mua hàng.', // 復元成功
+-+  restoreNotFound: 'Không tìm thấy đơn hàng để khôi phục.', // 復元データなし
+-+  restoreFailed: 'Khôi phục thất bại.', // 復元失敗
+-+
+-+  // --- Settings (Sound & Info) (設定：音と情報) ---
+-+  version: 'Phiên bản ứng dụng',     // アプリバージョン
+-+  tapSound: 'Âm thanh chạm',         // タップ音
+-+  click: 'Click',                    // クリック (英語のままで通じやすい)
+-+  pop: 'Pop',                        // ポップ
+-+  soundSwitchLabel: 'Hiệu ứng âm thanh', // 効果音
+-+
+-+  // --- Pro Screen (Paywall) (Pro画面 / 課金) ---
+-+  proTitle: 'Mở khóa chuỗi của bạn.', // 英語: Unlock your chain.
+-+  proHeaderTitle: 'DotChain Pro',
+-+  proSubtitle: 'Vượt qua giới hạn 3 thói quen và khiến các điểm của bạn không thể dừng lại.',
+-+  proPlanFreeTitle: 'Miễn phí',      // 無料
+-+  proPlanMonthlyTitle: 'Hàng tháng', // 月額
+-+  proPlanYearlyTitle: 'Hàng năm',    // 年額
+-+  proPlanYearlyBadge: 'Tốt nhất',    // 英語: Best value (一番お得/ベスト)
+-+  proBadgeShort: 'PRO',
+-+  priceFree: '0đ / vĩnh viễn',       // ずっと0ドン (または $0)
+-+  proOnlyTitle: 'Tính năng Pro',     // Pro機能
+-+  proOnlyTheme: 'Nâng cấp lên Pro để dùng giao diện này.',
+-+  openPro: 'Xem gói Pro',            // Proプランを見る
+-+  cancel: 'Hủy',                     // キャンセル
+-+
+-+  // --- Settings (Appearance) (設定：見た目) ---
+-+  flowEffectTitle: 'Hiệu ứng dòng điện', // 電気の流れのアニメーション
+-+  flowEffectHelp:
+-+    'Cho dòng điện neon chạy dọc chuỗi của bạn. Tắt đi nếu bạn muốn giao diện tĩnh lặng hơn.',
+-+
+-+  // --- Heatmap Range (Settings) (ヒートマップ表示期間) ---
+-+  heatmapRangeTitle: 'Khoảng thời gian hiển thị',
+-+  heatmapRangeHelp: 'Chọn số ngày của chuỗi sẽ hiển thị trên bản đồ nhiệt ở màn hình chính.',
+-+  heatmapRange7: '1 tuần',
+-+  heatmapRange30: '1 tháng',
+-+  heatmapRange60: '2 tháng',
+-+  heatmapRange90: '3 tháng',
+-+  heatmapRange180: '6 tháng',
+-+  heatmapRange365: '1 năm',
+-+  heatmapSummaryPrefix: '',          // 空文字 (ベトナム語は数字の後ろに言葉が来る)
+-+  heatmapSummarySuffix: ' ngày qua', // 「〜 ngày qua (過去〜日間)」
+-+  heatmapAgoSuffix: ' ngày trước',   // 「〜日前」
+-+  heatmapToday: 'Hôm nay',
+-+
+-+  // --- Themes (テーマ) ---
+-+  themeDesc: 'Thay đổi giao diện ứng dụng.',
+-+  themeDarkLabel: 'Tối',             // Dark
+-+  themeNeonPinkLabel: 'Neon Hồng',
+-+  themeCyberBlueLabel: 'Cyber Xanh',
+-+  freeThemeNote: 'Miễn phí: Chỉ Giao diện Tối / Pro mở khóa Neon Hồng & Cyber Xanh',
+-+  proThemeNote: 'Giao diện Pro sẽ mở sau khi đăng ký.',
+-+
+-+  // --- Habit Management (習慣管理) ---
+-+  newHabitTitle: 'Thói quen mới',
+-+  editHabitTitle: 'Sửa thói quen',
+-+  habitNameLabel: 'Tên',
+-+  habitNamePlaceholder: 'VD: Uống nước, Đọc sách',
+-+  habitIconLabel: 'Biểu tượng',
+-+  deleteHabit: 'Xóa thói quen này',
+-+  deleteConfirmationTitle: 'Xóa thói quen?',
+-+  deleteConfirmationMessage: 'Hành động này không thể hoàn tác. Mọi lịch sử sẽ bị mất.',
+-+  save: 'Lưu',
+-+  create: 'Tạo',
+-+
+-+  // --- Icon Categories & Labels (アイコンカテゴリとラベル) ---
+-+  iconCatBasic: 'Cơ bản',
+-+  iconCatHealth: 'Sức khỏe',
+-+  iconCatLearning: 'Học tập',
+-+
+-+  iconLabelStreak: 'Chuỗi',          // Streak
+-+  iconLabelTask: 'Tác vụ',           // Task
+-+  iconLabelShine: 'Tỏa sáng',        // Shine
+-+  iconLabelClean: 'Dọn dẹp',         // Clean
+-+  iconLabelLaundry: 'Giặt ủi',       // Laundry
+-+  iconLabelWater: 'Nước',            // Water
+-+  iconLabelWalk: 'Đi bộ',            // Walk
+-+  iconLabelSleep: 'Giấc ngủ',        // Sleep
+-+  iconLabelWorkout: 'Tập luyện',     // Workout
+-+  iconLabelBarbell: 'Tạ',            // Barbell
+-+  iconLabelRead: 'Đọc',              // Read
+-+  iconLabelArt: 'Nghệ thuật',        // Art
+-+  iconLabelMedia: 'Giải trí',        // Media
+-+  iconLabelStudy: 'Học',             // Study
+-+  iconLabelLanguage: 'Ngôn ngữ',     // Language
+-+
+-+  // --- Misc / Errors (その他 / エラー) ---
+-+  habitButtonSuffix: ' nút thói quen', // アクセシビリティ用
+-+  errorLoadFailed: 'Tải dữ liệu thất bại.',
+-+  errorTitleRequired: 'Vui lòng nhập tên.',
+-+  errorTitleTooLong: 'Tên không được quá 20 ký tự.',
+-+  errorSaveFailed: 'Lưu thất bại.',
+-+  errorDeleteFailed: 'Xóa thất bại.',
+-+  errorToggleFailed: 'Cập nhật thất bại.',
+-+  habitLimitTitle: 'Giới hạn gói miễn phí',
+-+  habitLimitBody: 'Ở gói miễn phí, bạn chỉ có thể tạo tối đa 3 thói quen.',
+-+
+-+  // --- Settings description (設定の説明) ---
+-+  hapticsDescription: 'Phản hồi rung',
+-+
+-+  // --- Reminder (リマインダー) ---
+-+  reminderSectionTitle: 'Nhắc nhở',
+-+  reminderToggleLabel: 'Bật nhắc nhở',
+-+  reminderTimeLabel: 'Thời gian thông báo',
+-+  reminderNotificationBody: 'Đã đến lúc nối dài chuỗi của bạn!', // チェーンを作る時間だよ！
+-+
+-+  // --- Review (7-day streak) (レビュー依頼) ---
+-+  streak7Title: 'Chuỗi 7 ngày!',
+-+  streak7Message: 'Bạn đã giữ chuỗi liên tục trong một tuần. Làm tốt lắm!',
+-+  ok: 'Tuyệt vời',
+-+
+-+  // --- Language labels (言語名) ---
+-+  languageChange: 'Đổi ngôn ngữ',
+-+  currentLanguage: 'Hiện tại',
+-+  languageNameEn: 'Tiếng Anh',
+-+  languageNameJa: 'Tiếng Nhật',
+-+  languageNameFr: 'Tiếng Pháp',
+-+  languageNameEs: 'Tiếng Tây Ban Nha',
+-+  languageNameDe: 'Tiếng Đức',
+-+  languageNameIt: 'Tiếng Ý',
+-+  languageNamePt: 'Tiếng Bồ Đào Nha',
+-+  languageNameRu: 'Tiếng Nga',
+-+  languageNameZh: 'Tiếng Trung',
+-+  languageNameKo: 'Tiếng Hàn',
+-+  languageNameHi: 'Tiếng Hindi',
+-+  languageNameId: 'Tiếng Indo',
+-+  languageNameTh: 'Tiếng Thái',
+-+  languageNameVi: 'Tiếng Việt',
+-+  languageNameMs: 'Tiếng Malay',
+-+  languageNameTr: 'Tiếng Thổ Nhĩ Kỳ',
+-+  languageNameNl: 'Tiếng Hà Lan',
+-+  languageNameSv: 'Tiếng Thụy Điển',
+-+
+-+  // --- Tutorial (チュートリアル) ---
+-+  tutorialNext: 'Tiếp theo',
+-+  tutorialWelcome: 'Chào mừng đến với DotChain',
+-+  tutorialDesc1: 'Kết nối các thói quen hàng ngày và xây dựng chuỗi của riêng bạn.',
+-+  tutorialDesc2: 'Đừng để đứt chuỗi để duy trì thói quen.',
+-+  tutorialStart: 'Bắt đầu',
+- };
+- 
+--export default dict;
+-+export default dict;
+-\ No newline at end of file
+-diff --git a/src/core/i18n/locales/zh.ts b/src/core/i18n/locales/zh.ts
+-deleted file mode 100644
+-index 8a6cf0a..0000000
+---- a/src/core/i18n/locales/zh.ts
+-+++ /dev/null
+-@@ -1,174 +0,0 @@
+--import baseEn from './en';
+--
+--const dict = {
+--    ...baseEn,
+--    daysStreak: '连续天数',
+--    yourChain: '你的链条',
+--    allDoneDays: '全部完成的天数',
+--    settings: '设置',
+--    hapticOff: '振动已关',
+--    language: '语言',
+--    sound: '声音',
+--    haptics: '振动',
+--    theme: '主题',
+--    restore: '恢复购买',
+--    version: '应用版本',
+--    tapSound: '点击声音',
+--    click: '点击',
+--    pop: '砰',
+--    flowEffectTitle: '电流动画',
+--    flowEffectHelp: '让霓虹电流沿链条流动。如需更安静的效果，可关闭此动画。',
+--    heatmapRangeTitle: '链条显示范围',
+--    heatmapRangeHelp: '选择在主页热力图中显示多少天的链条。',
+--    heatmapRange7: '1周',
+--    heatmapRange30: '1 个月',
+--    heatmapRange60: '2 个月',
+--    heatmapRange180: '6 个月',
+--    heatmapRange365: '1 年',
+--    heatmapSummaryPrefix: '过去',
+--    heatmapSummarySuffix: ' 天',
+--    heatmapAgoSuffix: ' 天前',
+--    heatmapToday: '今天',
+--    freeThemeNote: '免费：仅 Dark / Pro 解锁霓虹粉和赛博蓝',
+--    proThemeNote: '专业版付费后可使用 Pro 主题。',
+--    restoreDesc: '恢复购买（稍后）',
+--    licenses: '开源许可证（稍后）',
+--    openPro: '打开 DotChain Pro',
+--    heroPaywall: '升级到霓虹世界',
+--    priceMonthly: '$1.99 / 月',
+--    onboardingTitle: '欢迎使用 DotChain',
+--    onboardingBody: '一触即振，构建今天的链条。',
+--    start: '开始',
+--    paywallNote: '计费和广告将稍后添加。',
+--    homeLoading: '加载中...',
+--    homeAddHabitLabel: '添加习惯',
+--    editNewHabit: '新增习惯',
+--    editHabitTitle: '编辑习惯',
+--    editCategoryLabel: '分类',
+--    editNameLabel: '名称（最多20字符）',
+--    editNamePlaceholder: '为习惯命名...',
+--    editSaveChanges: '保存更改',
+--    editCreateHabit: '创建习惯',
+--    editDeleteHabit: '删除习惯',
+--    proTitle: '解锁你的链条。',
+--    proHeaderTitle: 'DotChain Pro',
+--    proFeatureUnlimited: '无限习惯',
+--    proFeatureThemes: '解锁所有主题（Neon Pink / Cyber Blue）',
+--    proFeatureAds: '无广告',
+--    habitButtonSuffix: ' 习惯按钮',
+--    iconCatBasic: '基础',
+--    iconCatHealth: '健康',
+--    iconCatLearning: '学习与工作',
+--    errorLoadFailed: '数据加载失败',
+--    errorTitleRequired: '标题为必填项。',
+--    errorTitleTooLong: '标题长度需不超过20个字符。',
+--    errorSaveFailed: '保存失败。',
+--    errorDeleteFailed: '删除失败。',
+--    errorToggleFailed: '更新失败。',
+--    habitLimitTitle: '免费版限制',
+--    habitLimitBody: '免费版最多可创建3个习惯。',
+--    hapticsDescription: '触觉反馈',
+--    reminderSectionTitle: '提醒通知',
+--    reminderToggleLabel: '启用提醒',
+--    reminderTimeLabel: '通知时间',
+--    reminderNotificationBody: '是时候继续你的链条了。',
+--    streak7Title: '连续7天！',
+--    streak7Message: '你已经连续一周保持链条，干得好！',
+--    ok: 'OK',
+--    languageChange: '更改语言',
+--    currentLanguage: '当前',
+--    languageNameEn: '英语',
+--    languageNameJa: '日语',
+--    languageNameFr: '法语',
+--    languageNameEs: '西班牙语',
+--    languageNameDe: '德语',
+--    languageNameIt: '意大利语',
+--    languageNamePt: '葡萄牙语',
+--    languageNameRu: '俄语',
+--    languageNameZh: '中文',
+--    languageNameKo: '韩语',
+--    languageNameHi: '印地语',
+--    languageNameId: '印尼语',
+--    languageNameTh: '泰语',
+--    languageNameVi: '越南语',
+--    languageNameMs: '马来语',
+--    languageNameTr: '土耳其语',
+--    languageNameNl: '荷兰语',
+--    languageNameSv: '瑞典语',
+--    soundSwitchLabel: '启用声音',
+--    tapSoundLabel: '点击音样式',
+--    proOnlyTitle: '仅限 Pro 功能',
+--    proOnlyTheme: '此主题仅在 Pro 中可用。',
+--
+--    // 填充缺失键，完成 zh 本地化
+--    cancel: '取消',
+--    delete: '删除',
+--    deleteConfirmBody: '确定要删除吗？此操作无法撤销。',
+--    comingSoonTitle: '即将上线',
+--    onboardingPunch: '这就是 DotChain。',
+--
+--    paywallBestValueBadge: '最优惠',
+--    paywallMonthlyLabel: '月度计划',
+--    paywallMonthlySub: '每月扣费，可随时取消。',
+--    paywallYearlyLabel: '年度计划',
+--    paywallYearlySub: '每年扣费一次，可随时取消。',
+--
+--    priceFree: '$0 / 永久',
+--    priceYearly: '$14.99 / 年',
+--
+--    proCompareHeaderFeature: '功能',
+--    proCompareHeaderFree: '免费',
+--    proCompareHeaderPro: 'Pro',
+--    proCompareSubtitle:
+--      '你随时可以继续使用免费版，Pro 只是帮你解除限制。',
+--    proCompareTitle: '升级 Pro 你能获得什么',
+--
+--    proCtaMonthly: '开通月度 Pro',
+--    proCtaStayFree: '继续使用免费版',
+--    proCtaYearly: '开通年度 Pro',
+--
+--    proFeatureAdsFree: '底部显示横幅广告',
+--    proFeatureAdsPro: '无广告，专注体验',
+--    proFeatureHabits: '可跟踪的习惯数量',
+--    proFeatureHabitsFree: '最多 3 个习惯',
+--    proFeatureHabitsPro: '习惯数量不限',
+--    proFeatureThemesFree: '1 个主题（暗色）',
+--    proFeatureThemesPro: '解锁所有主题',
+--
+--    proFinePrint:
+--      '订阅会自动续费。你可以随时在 App Store 或 Google Play 的账户设置中取消。',
+--    proMonthlyTagline: '从小开始，随时可取消。',
+--    proPlanFreeTitle: '免费版',
+--    proPlanMonthlyTitle: '月度计划',
+--    proPlanYearlyBadge: '最划算',
+--    proPlanYearlyTitle: '年度计划',
+--    proSubtitle: '突破 3 个习惯的限制，让你的链条停不下来。',
+--    proYearlySavingShort: '大约节省 37%（相当于 8 个月免费）。',
+--    proYearlyTagline: '为认真打造链条的人准备。',
+--
+--    restoreSoon: '恢复购买功能将在后续更新中提供。',
+--
+--    themeCyberBlueLabel: '赛博蓝',
+--    themeDarkLabel: '暗色',
+--    themeDesc: '选择你喜欢的界面风格。（Pro 主题稍后提供。）',
+--    themeNeonPinkLabel: '霓虹粉',
+--
+--    tutorialEditIconBody: '首先，选择一个与习惯相符的图标。',
+--    tutorialEditNameBody:
+--      '然后给这个习惯起个名字。\n例如：“喝水”、“读书”。',
+--    tutorialEditSubmitBody:
+--      '准备就绪！\n点击下面的创建按钮，将此习惯添加到首页。',
+--    tutorialExplainChainBody:
+--      '每点一次，连续天数增加，今天会在你的链条上点亮。\n坚持下去，链条会越来越长。',
+--    tutorialGotIt: '明白了',
+--    tutorialNext: '下一步',
+--    tutorialPressFabBody:
+--      '点击右下角的 + 按钮，创建第一个习惯。',
+--    tutorialPressHabitBody:
+--      '现在点一下刚创建的习惯。\n点击即表示今天已完成。',
+--    tutorialStart: '开始',
+--    tutorialWelcomeBody:
+--      '欢迎！\nDotChain 帮助你构建习惯链。\n先用 + 按钮创建第一个习惯吧。',
+--};
+--
+--export default dict;
+diff --git "a/20251227_2240_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251227_2240_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
+deleted file mode 100644
+index c596f6d..0000000
+--- "a/20251227_2240_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
++++ /dev/null
+@@ -1,511 +0,0 @@
+-diff --git a/app/settings/index.tsx b/app/settings/index.tsx
+-index aca7fad..be5bfd5 100644
+---- a/app/settings/index.tsx
+-+++ b/app/settings/index.tsx
+-@@ -36,7 +36,26 @@ export default function SettingsScreen() {
+-   const [langOpen, setLangOpen] = React.useState(false);
+- 
+-   const heatmapOptions: HeatmapDaysOption[] = [7, 30, 60, 180, 365];
+--  const languageOptions: Lang[] = ['en','ja','fr','es','de','it','pt','ru','zh','ko','hi','id','th','vi','ms','tr','nl','sv'];
+-+  const languageOptions: Lang[] = [
+-+    'en',
+-+    'ja',
+-+    'fr',
+-+    'es',
+-+    'de',
+-+    'it',
+-+    'pt',
+-+    'ru',
+-+    'zhHans',
+-+    'zhHant',
+-+    'ko',
+-+    'hi',
+-+    'id',
+-+    'th',
+-+    'vi',
+-+    'tr',
+-+    'nl',
+-+    'sv',
+-+  ];
+-   const LANGUAGE_META: Record<Lang, { flag: string; labelKey: TranslationKey }> = {
+-     en: { flag: '🇺🇸', labelKey: 'languageNameEn' },
+-     ja: { flag: '🇯🇵', labelKey: 'languageNameJa' },
+-@@ -46,13 +65,13 @@ export default function SettingsScreen() {
+-     it: { flag: '🇮🇹', labelKey: 'languageNameIt' },
+-     pt: { flag: '🇵🇹', labelKey: 'languageNamePt' },
+-     ru: { flag: '🇷🇺', labelKey: 'languageNameRu' },
+--    zh: { flag: '🇨🇳', labelKey: 'languageNameZh' },
+-+    zhHans: { flag: '🇨🇳', labelKey: 'languageNameZhHans' },
+-+    zhHant: { flag: '🇹🇼', labelKey: 'languageNameZhHant' },
+-     ko: { flag: '🇰🇷', labelKey: 'languageNameKo' },
+-     hi: { flag: '🇮🇳', labelKey: 'languageNameHi' },
+-     id: { flag: '🇮🇩', labelKey: 'languageNameId' },
+-     th: { flag: '🇹🇭', labelKey: 'languageNameTh' },
+-     vi: { flag: '🇻🇳', labelKey: 'languageNameVi' },
+--    ms: { flag: '🇲🇾', labelKey: 'languageNameMs' },
+-     tr: { flag: '🇹🇷', labelKey: 'languageNameTr' },
+-     nl: { flag: '🇳🇱', labelKey: 'languageNameNl' },
+-     sv: { flag: '🇸🇪', labelKey: 'languageNameSv' },
+-diff --git a/src/core/i18n/i18n.ts b/src/core/i18n/i18n.ts
+-index 183e793..649b464 100644
+---- a/src/core/i18n/i18n.ts
+-+++ b/src/core/i18n/i18n.ts
+-@@ -11,13 +11,13 @@ import de from './locales/de';
+- import it from './locales/it';
+- import pt from './locales/pt';
+- import ru from './locales/ru';
+--import zh from './locales/zh';
+-+import zhHans from './locales/zhHans';
+-+import zhHant from './locales/zhHant';
+- import ko from './locales/ko';
+- import hi from './locales/hi';
+- import id from './locales/id';
+- import th from './locales/th';
+- import vi from './locales/vi';
+--import ms from './locales/ms';
+- import tr from './locales/tr';
+- import nl from './locales/nl';
+- import sv from './locales/sv';
+-@@ -31,13 +31,13 @@ const dictionaries = {
+-   it,
+-   pt,
+-   ru,
+--  zh,
+-+  zhHans,
+-+  zhHant,
+-   ko,
+-   hi,
+-   id,
+-   th,
+-   vi,
+--  ms,
+-   tr,
+-   nl,
+-   sv,
+-@@ -50,13 +50,43 @@ const isSupportedLang = (code?: string): code is Lang => {
+-   return code in dictionaries;
+- };
+- 
+-+const normalizeLang = (
+-+  rawCode?: string,
+-+  tag?: string,
+-+  script?: string | null,
+-+  region?: string | null,
+-+): Lang => {
+-+  if (rawCode && isSupportedLang(rawCode)) return rawCode;
+-+
+-+  const code = rawCode?.toLowerCase();
+-+  const tagLower = tag?.toLowerCase();
+-+  const regionUpper = region?.toUpperCase();
+-+
+-+  if (code === 'zh' || tagLower?.startsWith('zh')) {
+-+    const isHant =
+-+      tagLower?.includes('hant') ||
+-+      script === 'Hant' ||
+-+      (regionUpper != null && ['TW', 'HK', 'MO'].includes(regionUpper));
+-+    return isHant ? 'zhHant' : 'zhHans';
+-+  }
+-+
+-+  if (code === 'ms') return 'zhHans';
+-+
+-+  if (code && isSupportedLang(code)) return code;
+-+
+-+  return 'en';
+-+};
+-+
+- const detectInitialLang = (): Lang => {
+-   try {
+-     const locales = Localization.getLocales();
+-     const primary = locales?.[0];
+--    const code = primary?.languageCode?.toLowerCase();
+--    if (isSupportedLang(code)) return code;
+--    return 'en';
+-+    return normalizeLang(
+-+      primary?.languageCode,
+-+      primary?.languageTag,
+-+      primary?.languageScriptCode,
+-+      primary?.regionCode,
+-+    );
+-   } catch {
+-     return 'en';
+-   }
+-@@ -71,11 +101,18 @@ const useI18nStore = create<I18nState>()(
+-   persist(
+-     (set) => ({
+-       lang: detectInitialLang(),
+--      setLang: (lang) => set({ lang: isSupportedLang(lang) ? lang : 'en' }),
+-+      setLang: (lang) => set({ lang: normalizeLang(lang) }),
+-     }),
+-     {
+-       name: 'dotchain-i18n',
+-       storage: createJSONStorage(() => AsyncStorage),
+-+      onRehydrateStorage: () => (state) => {
+-+        if (!state) return;
+-+        const normalized = normalizeLang(state.lang);
+-+        if (state.lang !== normalized) {
+-+          state.setLang(normalized);
+-+        }
+-+      },
+-     },
+-   ),
+- );
+-diff --git a/src/core/i18n/locales/de.ts b/src/core/i18n/locales/de.ts
+-index b78fbee..21e9601 100644
+---- a/src/core/i18n/locales/de.ts
+-+++ b/src/core/i18n/locales/de.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'Italienisch',
+-   languageNamePt: 'Portugiesisch',
+-   languageNameRu: 'Russisch',
+--  languageNameZh: 'Chinesisch',
+-+  languageNameZhHans: 'Chinesisch (简体)',
+-+  languageNameZhHant: 'Chinesisch (繁體)',
+-   languageNameKo: 'Koreanisch',
+-   languageNameHi: 'Hindi',
+-   languageNameId: 'Indonesisch',
+-   languageNameTh: 'Thailändisch',
+-   languageNameVi: 'Vietnamesisch',
+--  languageNameMs: 'Malaiisch',
+-   languageNameTr: 'Türkisch',
+-   languageNameNl: 'Niederländisch',
+-   languageNameSv: 'Schwedisch',
+-diff --git a/src/core/i18n/locales/en.ts b/src/core/i18n/locales/en.ts
+-index b3d3247..5b423ff 100644
+---- a/src/core/i18n/locales/en.ts
+-+++ b/src/core/i18n/locales/en.ts
+-@@ -138,13 +138,13 @@ const baseEn = {
+-   languageNameIt: 'Italian',
+-   languageNamePt: 'Portuguese',
+-   languageNameRu: 'Russian',
+--  languageNameZh: 'Chinese',
+-+  languageNameZhHans: 'Chinese (Simplified)',
+-+  languageNameZhHant: 'Chinese (Traditional)',
+-   languageNameKo: 'Korean',
+-   languageNameHi: 'Hindi',
+-   languageNameId: 'Indonesian',
+-   languageNameTh: 'Thai',
+-   languageNameVi: 'Vietnamese',
+--  languageNameMs: 'Malay',
+-   languageNameTr: 'Turkish',
+-   languageNameNl: 'Dutch',
+-   languageNameSv: 'Swedish',
+-diff --git a/src/core/i18n/locales/es.ts b/src/core/i18n/locales/es.ts
+-index 26b4bfd..68d08cc 100644
+---- a/src/core/i18n/locales/es.ts
+-+++ b/src/core/i18n/locales/es.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'Italiano',
+-   languageNamePt: 'Portugués',
+-   languageNameRu: 'Ruso',
+--  languageNameZh: 'Chino',
+-+  languageNameZhHans: 'Chino (简体)',
+-+  languageNameZhHant: 'Chino (繁體)',
+-   languageNameKo: 'Coreano',
+-   languageNameHi: 'Hindi',
+-   languageNameId: 'Indonesio',
+-   languageNameTh: 'Tailandés',
+-   languageNameVi: 'Vietnamita',
+--  languageNameMs: 'Malayo',
+-   languageNameTr: 'Turco',
+-   languageNameNl: 'Holandés',
+-   languageNameSv: 'Sueco',
+-diff --git a/src/core/i18n/locales/fr.ts b/src/core/i18n/locales/fr.ts
+-index a267c06..3062768 100644
+---- a/src/core/i18n/locales/fr.ts
+-+++ b/src/core/i18n/locales/fr.ts
+-@@ -205,13 +205,13 @@ const dict = {
+-   languageNameIt: 'Italien',
+-   languageNamePt: 'Portugais',
+-   languageNameRu: 'Russe',
+--  languageNameZh: 'Chinois',
+-+  languageNameZhHans: 'Chinois (简体)',
+-+  languageNameZhHant: 'Chinois (繁體)',
+-   languageNameKo: 'Coréen',
+-   languageNameHi: 'Hindi',
+-   languageNameId: 'Indonésien',
+-   languageNameTh: 'Thaï',
+-   languageNameVi: 'Vietnamien',
+--  languageNameMs: 'Malais',
+-   languageNameTr: 'Turc',
+-   languageNameNl: 'Néerlandais',
+-   languageNameSv: 'Suédois',
+-diff --git a/src/core/i18n/locales/hi.ts b/src/core/i18n/locales/hi.ts
+-index b8ae366..accdbde 100644
+---- a/src/core/i18n/locales/hi.ts
+-+++ b/src/core/i18n/locales/hi.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'इतालवी',
+-   languageNamePt: 'पुर्तगाली',
+-   languageNameRu: 'रूसी',
+--  languageNameZh: 'चीनी',
+-+  languageNameZhHans: 'चीनी (简体)',
+-+  languageNameZhHant: 'चीनी (繁體)',
+-   languageNameKo: 'कोरियाई',
+-   languageNameHi: 'हिन्दी',
+-   languageNameId: 'इंडोनेशियाई',
+-   languageNameTh: 'थाई',
+-   languageNameVi: 'वियतनामी',
+--  languageNameMs: 'मलय',
+-   languageNameTr: 'तुर्की',
+-   languageNameNl: 'डच',
+-   languageNameSv: 'स्वीडिश',
+-diff --git a/src/core/i18n/locales/id.ts b/src/core/i18n/locales/id.ts
+-index 42297b9..f1e6363 100644
+---- a/src/core/i18n/locales/id.ts
+-+++ b/src/core/i18n/locales/id.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'Italia',
+-   languageNamePt: 'Portugis',
+-   languageNameRu: 'Rusia',
+--  languageNameZh: 'Mandarin',
+-+  languageNameZhHans: 'Mandarin (简体)',
+-+  languageNameZhHant: 'Mandarin (繁體)',
+-   languageNameKo: 'Korea',
+-   languageNameHi: 'Hindi',
+-   languageNameId: 'Indonesia',
+-   languageNameTh: 'Thailand',
+-   languageNameVi: 'Vietnam',
+--  languageNameMs: 'Melayu',
+-   languageNameTr: 'Turki',
+-   languageNameNl: 'Belanda',
+-   languageNameSv: 'Swedia',
+-diff --git a/src/core/i18n/locales/it.ts b/src/core/i18n/locales/it.ts
+-index 669ed43..ccff58f 100644
+---- a/src/core/i18n/locales/it.ts
+-+++ b/src/core/i18n/locales/it.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'Italiano',
+-   languageNamePt: 'Portoghese',
+-   languageNameRu: 'Russo',
+--  languageNameZh: 'Cinese',
+-+  languageNameZhHans: 'Cinese (简体)',
+-+  languageNameZhHant: 'Cinese (繁體)',
+-   languageNameKo: 'Coreano',
+-   languageNameHi: 'Hindi',
+-   languageNameId: 'Indonesiano',
+-   languageNameTh: 'Tailandese',
+-   languageNameVi: 'Vietnamita',
+--  languageNameMs: 'Malese',
+-   languageNameTr: 'Turco',
+-   languageNameNl: 'Olandese',
+-   languageNameSv: 'Svedese',
+-diff --git a/src/core/i18n/locales/ja.ts b/src/core/i18n/locales/ja.ts
+-index 3ddc11a..1633f9f 100644
+---- a/src/core/i18n/locales/ja.ts
+-+++ b/src/core/i18n/locales/ja.ts
+-@@ -165,13 +165,13 @@ const dict = {
+-     languageNameIt: 'イタリア語',
+-     languageNamePt: 'ポルトガル語',
+-     languageNameRu: 'ロシア語',
+--    languageNameZh: '中国語',
+-+    languageNameZhHans: '中国語（簡体）',
+-+    languageNameZhHant: '中国語（繁体）',
+-     languageNameKo: '韓国語',
+-     languageNameHi: 'ヒンディー語',
+-     languageNameId: 'インドネシア語',
+-     languageNameTh: 'タイ語',
+-     languageNameVi: 'ベトナム語',
+--    languageNameMs: 'マレー語',
+-     languageNameTr: 'トルコ語',
+-     languageNameNl: 'オランダ語',
+-     languageNameSv: 'スウェーデン語',
+-diff --git a/src/core/i18n/locales/ko.ts b/src/core/i18n/locales/ko.ts
+-index 6df0d32..5c51e1c 100644
+---- a/src/core/i18n/locales/ko.ts
+-+++ b/src/core/i18n/locales/ko.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: '이탈리아어',
+-   languageNamePt: '포르투갈어',
+-   languageNameRu: '러시아어',
+--  languageNameZh: '중국어',
+-+  languageNameZhHans: '중국어 (简体)',
+-+  languageNameZhHant: '중국어 (繁體)',
+-   languageNameKo: '한국어',
+-   languageNameHi: '힌디어',
+-   languageNameId: '인도네시아어',
+-   languageNameTh: '태국어',
+-   languageNameVi: '베트남어',
+--  languageNameMs: '말레이어',
+-   languageNameTr: '튀르키예어',
+-   languageNameNl: '네덜란드어',
+-   languageNameSv: '스웨덴어',
+-diff --git a/src/core/i18n/locales/nl.ts b/src/core/i18n/locales/nl.ts
+-index 8898d80..f16b43e 100644
+---- a/src/core/i18n/locales/nl.ts
+-+++ b/src/core/i18n/locales/nl.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'Italiaans',
+-   languageNamePt: 'Portugees',
+-   languageNameRu: 'Russisch',
+--  languageNameZh: 'Chinees',
+-+  languageNameZhHans: 'Chinees (简体)',
+-+  languageNameZhHant: 'Chinees (繁體)',
+-   languageNameKo: 'Koreaans',
+-   languageNameHi: 'Hindi',
+-   languageNameId: 'Indonesisch',
+-   languageNameTh: 'Thais',
+-   languageNameVi: 'Vietnamees',
+--  languageNameMs: 'Maleis',
+-   languageNameTr: 'Turks',
+-   languageNameNl: 'Nederlands',
+-   languageNameSv: 'Zweeds',
+-diff --git a/src/core/i18n/locales/pt.ts b/src/core/i18n/locales/pt.ts
+-index b883613..61821ce 100644
+---- a/src/core/i18n/locales/pt.ts
+-+++ b/src/core/i18n/locales/pt.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'Italiano',
+-   languageNamePt: 'Português',
+-   languageNameRu: 'Russo',
+--  languageNameZh: 'Chinês',
+-+  languageNameZhHans: 'Chinês (简体)',
+-+  languageNameZhHant: 'Chinês (繁體)',
+-   languageNameKo: 'Coreano',
+-   languageNameHi: 'Hindi',
+-   languageNameId: 'Indonésio',
+-   languageNameTh: 'Tailandês',
+-   languageNameVi: 'Vietnamita',
+--  languageNameMs: 'Malaio',
+-   languageNameTr: 'Turco',
+-   languageNameNl: 'Holandês',
+-   languageNameSv: 'Sueco',
+-diff --git a/src/core/i18n/locales/ru.ts b/src/core/i18n/locales/ru.ts
+-index 082ec39..86db500 100644
+---- a/src/core/i18n/locales/ru.ts
+-+++ b/src/core/i18n/locales/ru.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'Итальянский',
+-   languageNamePt: 'Португальский',
+-   languageNameRu: 'Русский',
+--  languageNameZh: 'Китайский',
+-+  languageNameZhHans: 'Китайский (简体)',
+-+  languageNameZhHant: 'Китайский (繁體)',
+-   languageNameKo: 'Корейский',
+-   languageNameHi: 'Хинди',
+-   languageNameId: 'Индонезийский',
+-   languageNameTh: 'Тайский',
+-   languageNameVi: 'Вьетнамский',
+--  languageNameMs: 'Малайский',
+-   languageNameTr: 'Турецкий',
+-   languageNameNl: 'Нидерландский',
+-   languageNameSv: 'Шведский',
+-diff --git a/src/core/i18n/locales/sv.ts b/src/core/i18n/locales/sv.ts
+-index ca7e019..cdcb01c 100644
+---- a/src/core/i18n/locales/sv.ts
+-+++ b/src/core/i18n/locales/sv.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'Italienska',
+-   languageNamePt: 'Portugisiska',
+-   languageNameRu: 'Ryska',
+--  languageNameZh: 'Kinesiska',
+-+  languageNameZhHans: 'Kinesiska (简体)',
+-+  languageNameZhHant: 'Kinesiska (繁體)',
+-   languageNameKo: 'Koreanska',
+-   languageNameHi: 'Hindi',
+-   languageNameId: 'Indonesiska',
+-   languageNameTh: 'Thailändska',
+-   languageNameVi: 'Vietnamesiska',
+--  languageNameMs: 'Malaysiska',
+-   languageNameTr: 'Turkiska',
+-   languageNameNl: 'Holländska',
+-   languageNameSv: 'Svenska',
+-diff --git a/src/core/i18n/locales/th.ts b/src/core/i18n/locales/th.ts
+-index 7ac7b49..7857a4c 100644
+---- a/src/core/i18n/locales/th.ts
+-+++ b/src/core/i18n/locales/th.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'อิตาลี',
+-   languageNamePt: 'โปรตุเกส',
+-   languageNameRu: 'รัสเซีย',
+--  languageNameZh: 'จีน',
+-+  languageNameZhHans: 'จีน (简体)',
+-+  languageNameZhHant: 'จีน (繁體)',
+-   languageNameKo: 'เกาหลี',
+-   languageNameHi: 'ฮินดี',
+-   languageNameId: 'อินโดนีเซีย',
+-   languageNameTh: 'ไทย',
+-   languageNameVi: 'เวียดนาม',
+--  languageNameMs: 'มาเลย์',
+-   languageNameTr: 'ตุรกี',
+-   languageNameNl: 'ดัตช์',
+-   languageNameSv: 'สวีเดน',
+-diff --git a/src/core/i18n/locales/tr.ts b/src/core/i18n/locales/tr.ts
+-index 8b1b398..1be3f18 100644
+---- a/src/core/i18n/locales/tr.ts
+-+++ b/src/core/i18n/locales/tr.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'İtalyanca',
+-   languageNamePt: 'Portekizce',
+-   languageNameRu: 'Rusça',
+--  languageNameZh: 'Çince',
+-+  languageNameZhHans: 'Çince (简体)',
+-+  languageNameZhHant: 'Çince (繁體)',
+-   languageNameKo: 'Korece',
+-   languageNameHi: 'Hintçe',
+-   languageNameId: 'Endonezce',
+-   languageNameTh: 'Tayca',
+-   languageNameVi: 'Vietnamca',
+--  languageNameMs: 'Malayca',
+-   languageNameTr: 'Türkçe',
+-   languageNameNl: 'Felemenkçe',
+-   languageNameSv: 'İsveççe',
+-diff --git a/src/core/i18n/locales/vi.ts b/src/core/i18n/locales/vi.ts
+-index b43f68a..dc9d399 100644
+---- a/src/core/i18n/locales/vi.ts
+-+++ b/src/core/i18n/locales/vi.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: 'Tiếng Ý',
+-   languageNamePt: 'Tiếng Bồ Đào Nha',
+-   languageNameRu: 'Tiếng Nga',
+--  languageNameZh: 'Tiếng Trung',
+-+  languageNameZhHans: 'Tiếng Trung (简体)',
+-+  languageNameZhHant: 'Tiếng Trung (繁體)',
+-   languageNameKo: 'Tiếng Hàn',
+-   languageNameHi: 'Tiếng Hindi',
+-   languageNameId: 'Tiếng Indo',
+-   languageNameTh: 'Tiếng Thái',
+-   languageNameVi: 'Tiếng Việt',
+--  languageNameMs: 'Tiếng Malay',
+-   languageNameTr: 'Tiếng Thổ Nhĩ Kỳ',
+-   languageNameNl: 'Tiếng Hà Lan',
+-   languageNameSv: 'Tiếng Thụy Điển',
+-diff --git a/src/core/i18n/locales/zhHans.ts b/src/core/i18n/locales/zhHans.ts
+-index bb8a045..f9aab50 100644
+---- a/src/core/i18n/locales/zhHans.ts
+-+++ b/src/core/i18n/locales/zhHans.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: '意大利语',
+-   languageNamePt: '葡萄牙语',
+-   languageNameRu: '俄语',
+--  languageNameZh: '中文 (简体)',
+-+  languageNameZhHans: '简体中文',
+-+  languageNameZhHant: '繁體中文',
+-   languageNameKo: '韩语',
+-   languageNameHi: '印地语',
+-   languageNameId: '印尼语',
+-   languageNameTh: '泰语',
+-   languageNameVi: '越南语',
+--  languageNameMs: '马来语',
+-   languageNameTr: '土耳其语',
+-   languageNameNl: '荷兰语',
+-   languageNameSv: '瑞典语',
+-diff --git a/src/core/i18n/locales/zhHant.ts b/src/core/i18n/locales/zhHant.ts
+-index 19ceaef..ffa785e 100644
+---- a/src/core/i18n/locales/zhHant.ts
+-+++ b/src/core/i18n/locales/zhHant.ts
+-@@ -141,13 +141,13 @@ const dict = {
+-   languageNameIt: '義大利語',
+-   languageNamePt: '葡萄牙語',
+-   languageNameRu: '俄語',
+--  languageNameZh: '中文 (繁體)',
+-+  languageNameZhHans: '簡體中文',
+-+  languageNameZhHant: '繁體中文',
+-   languageNameKo: '韓語',
+-   languageNameHi: '印地語',
+-   languageNameId: '印尼語',
+-   languageNameTh: '泰語',
+-   languageNameVi: '越南語',
+--  languageNameMs: '馬來語',
+-   languageNameTr: '土耳其語',
+-   languageNameNl: '荷蘭語',
+-   languageNameSv: '瑞典語',
+diff --git a/assets/sounds/click.wav b/assets/sounds/click.wav
+index 589f5af..23dbbc9 100644
+Binary files a/assets/sounds/click.wav and b/assets/sounds/click.wav differ
+diff --git a/assets/sounds/pop.wav b/assets/sounds/pop.wav
+index d2e6f7a..85140da 100644
+Binary files a/assets/sounds/pop.wav and b/assets/sounds/pop.wav differ
+diff --git a/src/core/sensory/SoundManager.ts b/src/core/sensory/SoundManager.ts
+index 16d0010..963852e 100644
+--- a/src/core/sensory/SoundManager.ts
++++ b/src/core/sensory/SoundManager.ts
+@@ -1,18 +1,19 @@
+ import { Audio } from 'expo-av';
+ import { useSettingsStore } from '@/src/stores/settingsStore';
+ 
+-let tapSound: Audio.Sound | null = null;
++const tapSounds: Partial<Record<TapVariant, Audio.Sound>> = {};
+ let successSound: Audio.Sound | null = null;
+ let errorSound: Audio.Sound | null = null;
+ 
+ type TapVariant = 'click' | 'pop';
+ 
+ async function loadTap(variant: TapVariant) {
+-  if (tapSound) return tapSound;
++  const cached = tapSounds[variant];
++  if (cached) return cached;
+   const asset = variant === 'pop' ? require('@/assets/sounds/pop.wav') : require('@/assets/sounds/click.wav');
+   const { sound } = await Audio.Sound.createAsync(asset);
+-  tapSound = sound;
+-  return tapSound;
++  tapSounds[variant] = sound;
++  return sound;
+ }
+ 
+ export async function playClick() {
+@@ -57,13 +58,15 @@ export async function playError() {
+ 
+ export async function unloadSound() {
+   try {
+-    await tapSound?.unloadAsync();
++    await tapSounds.click?.unloadAsync();
++    await tapSounds.pop?.unloadAsync();
+     await successSound?.unloadAsync();
+     await errorSound?.unloadAsync();
+   } catch {
+     // ignore
+   }
+-  tapSound = null;
++  tapSounds.click = undefined;
++  tapSounds.pop = undefined;
+   successSound = null;
+   errorSound = null;
+ }
+diff --git a/src/features/habit/useHabitRecord.ts b/src/features/habit/useHabitRecord.ts
+index 3fc14a7..0d5a818 100644
+--- a/src/features/habit/useHabitRecord.ts
++++ b/src/features/habit/useHabitRecord.ts
+@@ -6,7 +6,7 @@ import { selectStreak, useHabitStore } from '@/src/stores/habitStore';
+ import { useSettingsStore } from '@/src/stores/settingsStore';
+ import { t } from '@/src/core/i18n/i18n';
+ import { triggerImpact } from '@/src/core/sensory/HapticManager';
+-import { playClick, playSuccess } from '@/src/core/sensory/SoundManager';
++import { playClick } from '@/src/core/sensory/SoundManager';
+ 
+ /**
+  * レビュー依頼判定用コンテキスト
+@@ -69,7 +69,6 @@ export function useHabitRecord() {
+       void triggerImpact();
+       try {
+         await toggleToday(habitId);
+-        void playSuccess();
+ 
+         // 7日連続達成祝い＆レビュー依頼（端末1回のみ）
+         const state = getHabitState();
diff --git a/assets/sounds/click.wav b/assets/sounds/click.wav
index 589f5af..23dbbc9 100644
Binary files a/assets/sounds/click.wav and b/assets/sounds/click.wav differ
diff --git a/assets/sounds/pop.wav b/assets/sounds/pop.wav
index d2e6f7a..85140da 100644
Binary files a/assets/sounds/pop.wav and b/assets/sounds/pop.wav differ
diff --git a/src/core/sensory/SoundManager.ts b/src/core/sensory/SoundManager.ts
index 16d0010..963852e 100644
--- a/src/core/sensory/SoundManager.ts
+++ b/src/core/sensory/SoundManager.ts
@@ -1,18 +1,19 @@
 import { Audio } from 'expo-av';
 import { useSettingsStore } from '@/src/stores/settingsStore';
 
-let tapSound: Audio.Sound | null = null;
+const tapSounds: Partial<Record<TapVariant, Audio.Sound>> = {};
 let successSound: Audio.Sound | null = null;
 let errorSound: Audio.Sound | null = null;
 
 type TapVariant = 'click' | 'pop';
 
 async function loadTap(variant: TapVariant) {
-  if (tapSound) return tapSound;
+  const cached = tapSounds[variant];
+  if (cached) return cached;
   const asset = variant === 'pop' ? require('@/assets/sounds/pop.wav') : require('@/assets/sounds/click.wav');
   const { sound } = await Audio.Sound.createAsync(asset);
-  tapSound = sound;
-  return tapSound;
+  tapSounds[variant] = sound;
+  return sound;
 }
 
 export async function playClick() {
@@ -57,13 +58,15 @@ export async function playError() {
 
 export async function unloadSound() {
   try {
-    await tapSound?.unloadAsync();
+    await tapSounds.click?.unloadAsync();
+    await tapSounds.pop?.unloadAsync();
     await successSound?.unloadAsync();
     await errorSound?.unloadAsync();
   } catch {
     // ignore
   }
-  tapSound = null;
+  tapSounds.click = undefined;
+  tapSounds.pop = undefined;
   successSound = null;
   errorSound = null;
 }
diff --git a/src/features/habit/useHabitRecord.ts b/src/features/habit/useHabitRecord.ts
index 3fc14a7..0d5a818 100644
--- a/src/features/habit/useHabitRecord.ts
+++ b/src/features/habit/useHabitRecord.ts
@@ -6,7 +6,7 @@ import { selectStreak, useHabitStore } from '@/src/stores/habitStore';
 import { useSettingsStore } from '@/src/stores/settingsStore';
 import { t } from '@/src/core/i18n/i18n';
 import { triggerImpact } from '@/src/core/sensory/HapticManager';
-import { playClick, playSuccess } from '@/src/core/sensory/SoundManager';
+import { playClick } from '@/src/core/sensory/SoundManager';
 
 /**
  * レビュー依頼判定用コンテキスト
@@ -69,7 +69,6 @@ export function useHabitRecord() {
       void triggerImpact();
       try {
         await toggleToday(habitId);
-        void playSuccess();
 
         // 7日連続達成祝い＆レビュー依頼（端末1回のみ）
         const state = getHabitState();

# --------------------------------------------------
# Commit: 599e638 - feat(settings): 設定画面のポップオーバーをレスポンシブ対応し、スクロール動作を改善
# --------------------------------------------------
diff --git "a/20251230_1859_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251230_1859_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
new file mode 100644
index 0000000..0d458a8
--- /dev/null
+++ "b/20251230_1859_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
@@ -0,0 +1,48 @@
+diff --git a/app/settings/index.tsx b/app/settings/index.tsx
+index be5bfd5..bb62fc6 100644
+--- a/app/settings/index.tsx
++++ b/app/settings/index.tsx
+@@ -1,7 +1,7 @@
+ import React from 'react';
+ import { Alert, Platform } from 'react-native';
+ import { Href, useRouter } from 'expo-router';
+-import { ScrollView, Stack, Switch, Text, XStack, YStack, Button, useTheme, Popover, ToggleGroup } from 'tamagui';
++import { ScrollView, Stack, Switch, Text, XStack, YStack, Button, useTheme, Popover, ToggleGroup, Adapt } from 'tamagui';
+ import { Check } from '@tamagui/lucide-icons';
+ import { setLang as setLangGlobal } from '@/src/core/i18n/i18n';
+ import DateTimePicker from '@react-native-community/datetimepicker';
+@@ -152,6 +152,16 @@ export default function SettingsScreen() {
+             </Button>
+           </Popover.Trigger>
+ 
++          <Adapt when="maxLg">
++            <Popover.Sheet modal>
++              <Popover.Sheet.Frame padding="$2">
++                <Adapt.Contents />
++              </Popover.Sheet.Frame>
++              <Popover.Sheet.Overlay />
++              <Popover.Sheet.Handle />
++            </Popover.Sheet>
++          </Adapt>
++
+           <Popover.Content
+             elevate
+             borderRadius="$4"
+@@ -162,7 +172,7 @@ export default function SettingsScreen() {
+             maxHeight={320}
+             minWidth={260}
+             width="$18">
+-            <ScrollView
++            <Popover.ScrollView
+               showsVerticalScrollIndicator
+               persistentScrollbar
+               indicatorStyle="white"
+@@ -199,7 +209,7 @@ export default function SettingsScreen() {
+                   );
+                 })}
+               </YStack>
+-            </ScrollView>
++            </Popover.ScrollView>
+           </Popover.Content>
+         </Popover>
+       </Section>
diff --git a/app/settings/index.tsx b/app/settings/index.tsx
index be5bfd5..bb62fc6 100644
--- a/app/settings/index.tsx
+++ b/app/settings/index.tsx
@@ -1,7 +1,7 @@
 import React from 'react';
 import { Alert, Platform } from 'react-native';
 import { Href, useRouter } from 'expo-router';
-import { ScrollView, Stack, Switch, Text, XStack, YStack, Button, useTheme, Popover, ToggleGroup } from 'tamagui';
+import { ScrollView, Stack, Switch, Text, XStack, YStack, Button, useTheme, Popover, ToggleGroup, Adapt } from 'tamagui';
 import { Check } from '@tamagui/lucide-icons';
 import { setLang as setLangGlobal } from '@/src/core/i18n/i18n';
 import DateTimePicker from '@react-native-community/datetimepicker';
@@ -152,6 +152,16 @@ export default function SettingsScreen() {
             </Button>
           </Popover.Trigger>
 
+          <Adapt when="maxLg">
+            <Popover.Sheet modal>
+              <Popover.Sheet.Frame padding="$2">
+                <Adapt.Contents />
+              </Popover.Sheet.Frame>
+              <Popover.Sheet.Overlay />
+              <Popover.Sheet.Handle />
+            </Popover.Sheet>
+          </Adapt>
+
           <Popover.Content
             elevate
             borderRadius="$4"
@@ -162,7 +172,7 @@ export default function SettingsScreen() {
             maxHeight={320}
             minWidth={260}
             width="$18">
-            <ScrollView
+            <Popover.ScrollView
               showsVerticalScrollIndicator
               persistentScrollbar
               indicatorStyle="white"
@@ -199,7 +209,7 @@ export default function SettingsScreen() {
                   );
                 })}
               </YStack>
-            </ScrollView>
+            </Popover.ScrollView>
           </Popover.Content>
         </Popover>
       </Section>

# --------------------------------------------------
# Commit: 8e4a6ea - fix(settings): 言語リストの余白をSafe Areaに基づいて動的に計算・適用
# --------------------------------------------------
diff --git "a/20251230_1935_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt" "b/20251230_1935_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
new file mode 100644
index 0000000..808b1df
--- /dev/null
+++ "b/20251230_1935_WSL\343\202\277\343\203\274\343\203\237\343\203\212\343\203\253\343\203\255\343\202\260.txt"
@@ -0,0 +1,43 @@
+diff --git a/app/settings/index.tsx b/app/settings/index.tsx
+index bb62fc6..f21add8 100644
+--- a/app/settings/index.tsx
++++ b/app/settings/index.tsx
+@@ -9,6 +9,7 @@ import { useSettingsStore, type HeatmapDaysOption } from '@/src/stores/settingsS
+ import { useProStore } from '@/src/stores/proStore';
+ import { useUiStore } from '@/src/stores/uiStore';
+ import { useTranslation, type Lang, type TranslationKey } from '@/src/core/i18n/i18n';
++import { useSafeAreaInsets } from 'react-native-safe-area-context';
+ 
+ export default function SettingsScreen() {
+   const sound = useSettingsStore((s) => s.sound);
+@@ -34,6 +35,8 @@ export default function SettingsScreen() {
+   const proLoading = useProStore((s) => s.isLoading);
+   const showToast = useUiStore((s) => s.showToast);
+   const [langOpen, setLangOpen] = React.useState(false);
++  const insets = useSafeAreaInsets();
++  const listBottomPad = Math.max(12, insets.bottom + 12);
+ 
+   const heatmapOptions: HeatmapDaysOption[] = [7, 30, 60, 180, 365];
+   const languageOptions: Lang[] = [
+@@ -155,7 +158,11 @@ export default function SettingsScreen() {
+           <Adapt when="maxLg">
+             <Popover.Sheet modal>
+               <Popover.Sheet.Frame padding="$2">
+-                <Adapt.Contents />
++                <Popover.Sheet.ScrollView
++                  contentContainerStyle={{ paddingRight: 8, paddingBottom: listBottomPad }}
++                  scrollIndicatorInsets={{ right: 6 }}>
++                  <Adapt.Contents />
++                </Popover.Sheet.ScrollView>
+               </Popover.Sheet.Frame>
+               <Popover.Sheet.Overlay />
+               <Popover.Sheet.Handle />
+@@ -176,7 +183,7 @@ export default function SettingsScreen() {
+               showsVerticalScrollIndicator
+               persistentScrollbar
+               indicatorStyle="white"
+-              contentContainerStyle={{ paddingRight: 8 }}
++              contentContainerStyle={{ paddingRight: 8, paddingBottom: listBottomPad }}
+               style={{ paddingRight: 8 }}
+               scrollIndicatorInsets={{ right: 6 }}>
+               <YStack gap="$1" paddingVertical="$1">
diff --git a/app/settings/index.tsx b/app/settings/index.tsx
index bb62fc6..f21add8 100644
--- a/app/settings/index.tsx
+++ b/app/settings/index.tsx
@@ -9,6 +9,7 @@ import { useSettingsStore, type HeatmapDaysOption } from '@/src/stores/settingsS
 import { useProStore } from '@/src/stores/proStore';
 import { useUiStore } from '@/src/stores/uiStore';
 import { useTranslation, type Lang, type TranslationKey } from '@/src/core/i18n/i18n';
+import { useSafeAreaInsets } from 'react-native-safe-area-context';
 
 export default function SettingsScreen() {
   const sound = useSettingsStore((s) => s.sound);
@@ -34,6 +35,8 @@ export default function SettingsScreen() {
   const proLoading = useProStore((s) => s.isLoading);
   const showToast = useUiStore((s) => s.showToast);
   const [langOpen, setLangOpen] = React.useState(false);
+  const insets = useSafeAreaInsets();
+  const listBottomPad = Math.max(12, insets.bottom + 12);
 
   const heatmapOptions: HeatmapDaysOption[] = [7, 30, 60, 180, 365];
   const languageOptions: Lang[] = [
@@ -155,7 +158,11 @@ export default function SettingsScreen() {
           <Adapt when="maxLg">
             <Popover.Sheet modal>
               <Popover.Sheet.Frame padding="$2">
-                <Adapt.Contents />
+                <Popover.Sheet.ScrollView
+                  contentContainerStyle={{ paddingRight: 8, paddingBottom: listBottomPad }}
+                  scrollIndicatorInsets={{ right: 6 }}>
+                  <Adapt.Contents />
+                </Popover.Sheet.ScrollView>
               </Popover.Sheet.Frame>
               <Popover.Sheet.Overlay />
               <Popover.Sheet.Handle />
@@ -176,7 +183,7 @@ export default function SettingsScreen() {
               showsVerticalScrollIndicator
               persistentScrollbar
               indicatorStyle="white"
-              contentContainerStyle={{ paddingRight: 8 }}
+              contentContainerStyle={{ paddingRight: 8, paddingBottom: listBottomPad }}
               style={{ paddingRight: 8 }}
               scrollIndicatorInsets={{ right: 6 }}>
               <YStack gap="$1" paddingVertical="$1">
```
