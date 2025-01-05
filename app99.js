"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

// 簡易的な在庫データ (メモリ上で管理)
let items = [
  { id: "A0001", name: "エイトトゥエルブサンド", price: 350, stock: 12 },
  { id: "A0002", name: "エイトトゥエルブコーヒー", price: 180, stock: 25 },
  { id: "A0003", name: "エイトトゥエルブおにぎり", price: 120, stock: 5 },
];

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    let filePath = "";
    if (req.url === "/") {
      // ルートにアクセスされた場合 box.html を返す
      filePath = path.join(__dirname, "public", "box.html");
    } else {
      // /box.js など，public ディレクトリ内の静的ファイルを返す
      filePath = path.join(__dirname, "public", req.url);
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        return res.end("File not found");
      }
      if (filePath.endsWith(".html")) {
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
      } else if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript; charset=UTF-8");
      } else if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css; charset=UTF-8");
      }
      res.statusCode = 200;
      res.end(data);
    });

  } else if (req.method === "POST") {
    // 在庫一覧を返す
    if (req.url === "/api/getItems") {
      let bodyData = "";
      req.on("data", (chunk) => {
        bodyData += chunk;
      });
      req.on("end", () => {
        // 今回は bodyData は使用しないが，読み込みだけ行う
        const jsonResponse = JSON.stringify({ items: items });
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(jsonResponse);
      });

    // 購入処理
    } else if (req.url === "/api/buyItem") {
      let bodyData = "";
      req.on("data", (chunk) => {
        bodyData += chunk;
      });
      req.on("end", () => {
        try {
          const body = JSON.parse(bodyData);
          const { itemId, quantity } = body;

          if (!itemId || !quantity) {
            throw new Error("リクエストが不正です");
          }

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

          // 在庫を減らして応答
          target.stock -= quantity;
          const resp = { success: true, msg: "購入が完了しました" };
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
    } else {
      res.statusCode = 404;
      res.end("Not found");
    }
  } else {
    res.statusCode = 405;
    res.end("Method Not Allowed");
  }
});

server.listen(8080, () => {
  console.log("Server listening on http://localhost:8080");
});