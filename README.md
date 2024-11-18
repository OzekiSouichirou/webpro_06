# app5.js ドキュメント

## 概要
`app5.js` は，node.js 環境で動作する簡易的なウェブアプリケーションであり，ユーザーに対してさまざまな機能を提供するものである．このプログラムは，`express` モジュールを利用してサーバーを構築し，`ejs` テンプレートエンジンを用いて動的なHTMLを生成する．以下の機能を含む：
- 挨拶を表示する簡単な機能（/hello1, /hello2）
- 静的ファイルを表示する機能（/icon）
- サイコロを振って運勢を占う機能（/luck）
- じゃんけんゲーム（/janken）
- 月間運勢占い機能（/monthly-fortune）
- ハイアンドローゲーム（/highlow）

## ファイル一覧

ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
icon.ejs | iconのテンプレートエンジン
janken.ejs | jankenのテンプレートエンジン
luck.ejs | luckのテンプレートエンジン
show.ejs | showのテンプレートエンジン
monthly_fortune.ejs | 月の運勢占いを表示するテンプレートエンジン
highlow.ejs | ハイアンドローゲームの入力画面テンプレートエンジン
highlow_result.ejs | ハイアンドローゲームの結果表示テンプレートエンジン
public/Apple_logo_black.svg | Apple ロゴの SVG アイコンファイル


## 起動方法とGitでのファイル管理
### 必要な環境
- node.js
- git
- npm(node.jsに含まれる)

### 起動方法
1. 必要なモジュールをインストールする．以下のコマンドを実行する：`npm install express ejs`
2. 以下のコマンドでアプリケーションを起動する．`node app5.js`
3. 起動に成功すると，コンソールに以下のメッセージが表示される:`Example app listening on port 8080!`
4. ブラウザで `http://localhost:8080` にアクセスする．


### Git による管理
1. ファイルを読み込み，変更の確認をする：git add .
2. 変更内容をローカルリポジトリ保存する：git commit -am 'コメント'
3. リモートリポジトリに変更を送信する：git push

---

## 各機能の説明と使用手順

### app5.js 機能説明

### 1. 「Hello World」の表示
#### 機能説明
ブラウザから `/hello1` または `/hello2` にアクセスすると，EJS テンプレートを利用して「Hello World」と「Bon jour」のメッセージを表示する．

#### 使用手順
以下の URL にアクセスする．
- `http://localhost:8080/hello1`
- `http://localhost:8080/hello2`

ブラウザで上記のURLにアクセスすると，挨拶のメッセージが表示される．
#### フローチャート
```mermaid
flowchart TD;
ユーザー --> /hello1または/hello2;
/hello1または/hello2 -->|/hello1| サーバでメッセージ1とメッセージ2を定義;
/hello1または/hello2 -->|/hello2| サーバで直接メッセージを渡す;
サーバでメッセージ1とメッセージ2を定義 --> show.ejsをレンダリング;
サーバで直接メッセージを渡す --> show.ejsをレンダリング;
show.ejsをレンダリング --> ブラウザにメッセージを表示;
```

### 2. アイコンの表示
#### 機能説明
/icon にアクセスすると，Apple ロゴ（SVG形式）のアイコンが表示される．
#### 使用手順
以下の URL にアクセスする．
- `http://localhost:8080/icon`

ブラウザで上記のURLにアクセスすると，Appleのロゴアイコンを表示する
#### フローチャート
```mermaid
flowchart TD;
ユーザー --> /iconにアクセス;
/iconにアクセス --> icon.ejsをレンダリング;
icon.ejsをレンダリング --> Appleロゴを表示;
Appleロゴを表示 --> ブラウザにアイコンを表示;
```

### ３. おみくじ
#### 機能説明
/luckにアクセスすると，ランダムに生成された数値に基づいて，対応する運勢を表示する．

#### 使用手順
以下の URL にアクセスする．
- `http://localhost:8080/luck`

ブラウザで上記のURLにアクセスすると，おみくじの結果が表示される．
#### フローチャート
```mermaid
flowchart TD;
ユーザー --> /luckにアクセス;
/luckにアクセス --> ランダム数値を生成;
ランダム数値を生成 --> 運勢を決定;
運勢を決定 -->|数値が1| 大吉;
運勢を決定 -->|数値が2| 中吉;
運勢を決定 -->|数値がそれ以外| その他の結果;
大吉 --> luck.ejsをレンダリング;
中吉 --> luck.ejsをレンダリング;
その他の結果 --> luck.ejsをレンダリング;
luck.ejsをレンダリング --> ブラウザに運勢を表示;
```
### ４. じゃんけんゲーム
#### 機能説明
/janken にアクセスすると，ユーザーとコンピュータがじゃんけんを行い，結果を表示する．
#### 使用手順
1. 以下の URL にアクセスする．
- `http://localhost:8080/public/janken`
2. 表示される画面で，グー，チョキ，パーのいずれかを選択する．
3. 結果を表示する．
#### フローチャート
```mermaid
flowchart TD;
ユーザー --> /jankenにアクセス;
/jankenにアクセス --> プレイヤーの手を取得;
プレイヤーの手を取得 --> CPUの手をランダム生成;
CPUの手をランダム生成 --> 勝敗を判定;
勝敗を判定 -->|手が同じ| 引き分け;
勝敗を判定 -->|プレイヤーが勝つ条件| 勝ち;
勝敗を判定 -->|それ以外| 負け;
引き分け --> janken.ejsをレンダリング;
勝ち --> janken.ejsをレンダリング;
負け --> janken.ejsをレンダリング;
janken.ejsをレンダリング --> ブラウザに結果を表示;
```

### 5. 月の運勢占い
#### 機能説明
/monthly-fortuneにアクセスすると，指定した月の運勢を表示する．

#### 使用手順
1. 以下の URL にアクセスする．
- `http://localhost:8080/public/janken`
2. 表示されるフォームで，1から12の間の月を入力する．
3. “占う”ボタンをクリックすると，その月の運勢が表示される．
#### フローチャート
```mermaid
flowchart TD;
ユーザー --> /monthly-fortuneにアクセス;
/monthly-fortuneにアクセス --> フォームで月を入力;
フォームで月を入力 --> 選択した月を取得;
選択した月を取得 -->|1月| 1月の運勢を決定;
選択した月を取得 -->|2月| 2月の運勢を決定;
選択した月を取得 -->|それ以外| その他の月の運勢を決定;
1月の運勢を決定 --> monthly_fortune.ejsをレンダリング;
2月の運勢を決定 --> monthly_fortune.ejsをレンダリング;
その他の月の運勢を決定 --> monthly_fortune.ejsをレンダリング;
monthly_fortune.ejsをレンダリング --> ブラウザに運勢を表示;
```
### 6. ハイアンドローゲーム
#### 機能説明
現在の数字よりも高いか低いかを当てるゲームである．偽チバニー（コンピュータ）が持っているカードに対し，ユーザーが”High”または”Low”を選択する．

#### 使用手順
1. 以下の URL にアクセスする．
- `http://localhost:8080/highlow`
2. 表示される画面で，“High”または”Low”のボタンをクリックする．
3. 結果を表示する．
#### フローチャート
```mermaid
flowchart TD;
ユーザー --> /highlowにアクセス;
/highlowにアクセス --> 現在の数字を生成;
現在の数字を生成 --> プレイヤーの選択を取得;
プレイヤーの選択を取得 --> 次の数字を生成;
次の数字を生成 --> 勝敗を判定;
勝敗を判定 -->|プレイヤーの選択がHigh  次の数字 > 現在の数字| 勝ち;
勝敗を判定 -->|プレイヤーの選択がLow  次の数字 < 現在の数字| 勝ち;
勝敗を判定 -->|次の数字 == 現在の数字| 引き分け;
勝敗を判定 -->|それ以外| 負け;
勝ち --> highlow_result.ejsをレンダリング;
引き分け --> highlow_result.ejsをレンダリング;
負け --> highlow_result.ejsをレンダリング;
highlow_result.ejsをレンダリング --> ブラウザに結果を表示;
```

### 注意事項

ポート番号はデフォルトで8080を使用している．他のアプリケーションと競合しないよう注意する．
テンプレートエンジンにはEJSを使用している．必要に応じてviewsフォルダ内の.ejsファイルを編集することで，表示内容をカスタマイズできる．
静的ファイル（CSSや画像など）はpublicディレクトリに配置されている．必要に応じてファイルを追加・編集する．





