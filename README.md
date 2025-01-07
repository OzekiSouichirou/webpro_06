# app5.js ドキュメント

## 概要
`app5.js` は，node.js 環境で動作する簡易的なウェブアプリケーションであり，ユーザーに対してさまざまな機能を提供するものである．このプログラムは，`express` モジュールを利用してサーバーを構築し，`ejs` テンプレートエンジンを用いて動的なHTMLを生成する．以下の機能を含む：
- 挨拶を表示する簡単な機能（/hello1, /hello2）
http://localhost:8080/hello1 http://localhost:8080/hello2
- Appleのロゴを表示する機能（/icon）
http://localhost:8080/icon
- 1-6のランダムな数値で運勢を占う機能（/luck）
http://localhost:8080/luck
- じゃんけんゲーム（/janken）
http://localhost:8080/janken
- 月間運勢占い機能（/monthly-fortune）
http://localhost:8080/monthly-fortune
- ハイアンドローゲーム（/highlow）
http://localhost:8080/highlow

## ファイル一覧

ファイル名 | 説明
-|-
app5.js | プログラム本体
views/icon.ejs | iconのテンプレートエンジン
views/janken.ejs | jankenのテンプレートエンジン
views/luck.ejs | luckのテンプレートエンジン
views/show.ejs | showのテンプレートエンジン
views/monthly_fortune.ejs | 月の運勢占いを表示するテンプレートエンジン
views/highlow.ejs | ハイアンドローゲームの入力画面テンプレートエンジン
views/highlow_result.ejs | ハイアンドローゲームの結果表示テンプレートエンジン
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
1. ファイルを読み込み，変更の確認をする：`git add .`
2. 変更内容をローカルリポジトリ保存する：`git commit -am 'コメント'`
3. リモートリポジトリに変更を出力する：`git push`

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
サーバでメッセージ1とメッセージ2を定義 --> show.ejsを出力;
サーバで直接メッセージを渡す --> show.ejsを出力;
show.ejsを出力 --> ブラウザにメッセージを表示;
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
/iconにアクセス --> icon.ejsを出力;
icon.ejsを出力 --> Appleロゴを表示;
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
大吉 --> luck.ejsを出力;
中吉 --> luck.ejsを出力;
その他の結果 --> luck.ejsを出力;
luck.ejsを出力 --> ブラウザに運勢を表示;
```
### ４. じゃんけんゲーム
#### 機能説明
/janken にアクセスすると，表示される画面で「グー」「チョキ」「パー」のいずれかを選択する．「じゃんけん ポン！」ボタンをクリックすると勝敗の結果が表示される．
#### 使用手順
1. 以下の URL にアクセスする．
- `http://localhost:8080/janken`
2. 表示される画面で，グー，チョキ，パーのいずれかのボタンを選択する．
3. 勝敗の結果（勝ち，負け，引き分け）が表示される．
#### フローチャート
```mermaid
flowchart TD;
A[ユーザー] -->|/jankenにアクセス| B[フォームを表示];
B -->|選択した手を出力| C[サーバが手を受け取る];
C --> D[コンピュータの手をランダム生成];
D --> E[勝敗を判定];
E -->|手が同じ| F[結果: 引き分け];
E -->|プレイヤーの手が勝つ条件| G[結果: 勝ち];
E -->|それ以外| H[結果: 負け];
F --> I[janken.ejsに結果を出力];
G --> I[janken.ejsに結果を出力];
H --> I[janken.ejsに結果を出力];
I --> J[ブラウザに結果を表示];
```

### 5. 月の運勢占い
#### 機能説明
/monthly-fortuneにアクセスすると，指定した月の運勢を表示する．

#### 使用手順
1. 以下の URL にアクセスする．
- `http://localhost:8080/monthly-fortune`
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
1月の運勢を決定 --> monthly_fortune.ejsを出力;
2月の運勢を決定 --> monthly_fortune.ejsを出力;
その他の月の運勢を決定 --> monthly_fortune.ejsを出力;
monthly_fortune.ejsを出力 --> ブラウザに運勢を表示;
```
### 6. ハイアンドローゲーム
#### 機能説明
相手の数字よりも自分のカード(結果に行くまで自分の数字は見れない)が高いか低いかを当てるゲームである．偽チバニー（コンピュータ）が持っているカードに対し，ユーザーが”High”または”Low”を選択する．

#### 使用手順
1. 以下の URL にアクセスする．
- `http://localhost:8080/highlow`
2. 表示される画面で，“High”または”Low”のボタンをクリックする．
3. 結果と偽チバニーからのコメントが表示される．
#### フローチャート
```mermaid
sequenceDiagram
    participant Webブラウザ
    participant Webサーバ
    participant エイトNOWクライアント
    participant エイトNOWサーバ

    Webブラウザ->>Webサーバ: 1. Webページの取得
    Webサーバ-->>Webブラウザ: 2. HTML, JS, CSS

    Webブラウザ->>エイトNOWクライアント: 3. 起動
    エイトNOWクライアント->>エイトNOWサーバ: 4. GetItems(在庫一覧取得)
    エイトNOWサーバ-->>エイトNOWクライアント: 5. 在庫データ(JSON)

    エイトNOWクライアント->>エイトNOWサーバ: 6. BuyItem(商品購入)
    エイトNOWサーバ-->>エイトNOWクライアント: 7. 購入結果(JSON)

    エイトNOWクライアント->>エイトNOWサーバ: 8. ResetItems(在庫リセット)
    エイトNOWサーバ-->>エイトNOWクライアント: 9. リセット結果(JSON)
```

### 注意事項

・ポート番号はデフォルトで8080を使用している．他のアプリケーションと競合しないよう注意する．
・テンプレートエンジンにはejsを使用している．必要に応じてviewsフォルダ内の.ejsファイルを編集することで，表示内容をカスタマイズできる．
・静的ファイル（CSSや画像など）はpublicディレクトリに配置されている．必要に応じてファイルを追加・編集する．