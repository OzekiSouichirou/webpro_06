"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

// リセット用の「初期在庫」
const ORIGINAL_ITEMS = [
  { id: "N0001", name: "エイト特製カツサンド", price: 480, stock: 15 },
  { id: "N0002", name: "エイトプレミアムコーヒー", price: 210, stock: 50 },
  { id: "N0003", name: "エイト手巻きおにぎり こだわりシャケ", price: 120, stock: 20 },
];

// 実際に操作される在庫データ　起動時は ORIGINAL_ITEMS をコピーして使用
let items = JSON.parse(JSON.stringify(ORIGINAL_ITEMS));

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    // 静的ファイルの配信 (box.html, box.js 等)
    let filePath = "";
    if (req.url === "/public/box") {
      filePath = path.join(__dirname, "public", "box.html");
    } else {
      filePath = path.join(__dirname, "public", req.url.replace("/public/", ""));
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        return res.end("File not found");
      }
      // 拡張子で Content-Type を切り替え
      if (filePath.endsWith(".html")) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
      } else if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript; charset=utf-8");
      }
      res.statusCode = 200;
      res.end(data);
    });

  } else if (req.method === "POST") {
    if (req.url === "/api/getItems") {
      // 在庫一覧取得
      let bodyData = "";
      req.on("data", (chunk) => { bodyData += chunk; });
      req.on("end", () => {
        const responseObj = { items: items };
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(responseObj));
      });

    } else if (req.url === "/api/buyItem") {
      // 購入処理
      let bodyData = "";
      req.on("data", (chunk) => { bodyData += chunk; });
      req.on("end", () => {
        try {
          const body = JSON.parse(bodyData);
          const { itemId, quantity } = body;
          if (!itemId || !quantity) {
            throw new Error("リクエスト形式が不正です");
          }
          // 商品を検索
          const target = items.find((i) => i.id === itemId);
          if (!target) {
            const resp = { success: false, msg: "商品が見つかりません" };
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            return res.end(JSON.stringify(resp));
          }
          if (target.stock < quantity) {
            const resp = { success: false, msg: "在庫が不足しています" };
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            return res.end(JSON.stringify(resp));
          }
          // 在庫を減算
          target.stock -= quantity;
          // 購入情報をレスポンスに含める
          const resp = {
            success: true,
            msg: "購入が完了しました",
            purchasedItem: {
              name: target.name,
              quantity: quantity,
              price: target.price,
            },
          };
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          return res.end(JSON.stringify(resp));

        } catch (e) {
          const resp = { success: false, msg: "JSON parse error" };
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          return res.end(JSON.stringify(resp));
        }
      });

    } else if (req.url === "/api/resetItems") {
      // 在庫リセット
      items = JSON.parse(JSON.stringify(ORIGINAL_ITEMS));
      const resp = {
        success: true,
        msg: "在庫をリセットしました",
        items: items,
      };
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify(resp));

    } else {
      res.statusCode = 404;
      res.end("Not Found");
    }
  } else {
    // GET, POST 以外は 405 (Method Not Allowed)
    res.statusCode = 405;
    res.end("Method Not Allowed");
  }
});

// ポート8080でサーバ起動
server.listen(8080, () => {
  console.log("Example app listening on http://localhost:8080/public/box");
});