// 修正版 app5.js

const path = require('path');        
const express = require("express");
const app = express();

// テンプレートエンジンと静的ファイルの設定
app.set('view engine', 'ejs');       
app.set('views', path.join(__dirname, 'views'));
app.use("/public", express.static(__dirname + "/public"));

// ------------------------------
// /hello1, /hello2
// ------------------------------
app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

// ------------------------------
// /icon
// ------------------------------
app.get("/icon", (req, res) => {
  res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

// ------------------------------
// /luck (おみくじ)
// ------------------------------
app.get("/luck", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';


  if      (num === 1) luck = '大吉';
  else if (num === 2) luck = '中吉';
  else if (num === 3) luck = '吉';
  else if (num === 4) luck = '小吉';
  else if (num === 5) luck = '末吉';
  else if (num === 6) luck = '凶';

  console.log('あなたの運勢は ' + luck + ' です');
  res.render('luck', { number: num, luck: luck });
});

// ------------------------------
// /janken (じゃんけん)
// ------------------------------
app.get('/janken', (req, res) => {
  let hand = req.query.hand; 

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num === 1) cpu = 'グー';
  else if (num === 2) cpu = 'チョキ';
  else cpu = 'パー';

  let judgement = '';
  if (hand === cpu) {
    judgement = '引き分け';
  } else if (
    (hand === 'グー'  && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー')  ||
    (hand === 'パー'  && cpu === 'グー')
  ) {
    judgement = '勝ち';
  } else {
    judgement = '負け';
  }

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
  };

  res.render('janken', display); 
});

// ------------------------------
// /monthly-fortune (月間運勢占い)
// ------------------------------
app.get("/monthly-fortune", (req, res) => {
  const month = Number(req.query.month) || 1;  
  const fortunes = {
    1:  "1月の運勢は... 幸運が舞い込むでしょう！",
    2:  "2月の運勢は... 鹿に出会えるでしょう！",
    3:  "3月の運勢は... 気をつけてください，鹿に鹿せんべいが奪われます",
    4:  "4月の運勢は... 健康に気をつけてください",
    5:  "5月の運勢は... 気づいたら奈良にいます",
    6:  "6月の運勢は... 鹿色が今月のラッキーカラー",
    7:  "7月の運勢は... 気をつけてください，背後から鹿に蹴られます",
    8:  "8月の運勢は... 鹿並みに物事を咀嚼すると，良い結果が得られるでしょう",
    9:  "9月の運勢は... 鹿並みに寝ていると，遅刻します",
    10: "10月の運勢は... 気分は鹿",
    11: "11月の運勢は... チャンスが訪れます，備えてください",
    12: "12月の運勢は... 鹿も驚くほどのサプライズがあるでしょう"
  };
  const fortune = fortunes[month] || "該当する月の運勢が見つかりません";
  res.render('monthly_fortune', { month: month, fortune: fortune });
});

// ------------------------------
// /highlow (ハイアンドロー)
// ------------------------------
app.get("/highlow", (req, res) => {
  let currentNumber = Number(req.query.currentNumber) || Math.floor(Math.random() * 13) + 1;
  const playerChoice = req.query.choice;

  if (!playerChoice) {
    // ゲーム開始画面を表示
    res.render('highlow', { currentNumber });
  } else {
    // ゲーム結果を表示
    const nextNumber = Math.floor(Math.random() * 13) + 1;
    let result = '';

    if (
      (playerChoice === 'high' && nextNumber > currentNumber) ||
      (playerChoice === 'low'  && nextNumber < currentNumber)
    ) {
      result = 'Win(偽チバニーからのコメント: すごーい！きみの勝ちだ！)';
    } else if (nextNumber === currentNumber) {
      result = '引き分け(偽チバニーからのコメント: もう一回だ！)';
    } else {
      result = 'Lose(偽チバニーからのコメント: ぼくの勝ちだ！！)';
    }

    res.render('highlow_result', { currentNumber, nextNumber, playerChoice, result });
  }
});

// ------------------------------
// サーバー起動
// ------------------------------
app.listen(8080, () => console.log("Example app listening on port 8080!"));