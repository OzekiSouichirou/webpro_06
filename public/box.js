"use strict";

// 購入履歴をクライアント側で管理
let purchaseHistory = [];
let totalCost = 0;

// 「在庫一覧を表示」ボタン
document.getElementById("showItems").addEventListener("click", async () => {
  await fetchAndRenderItems();
});

// 「在庫リセット」ボタン
document.getElementById("resetBtn").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/resetItems", { method: "POST" });
    if (!res.ok) {
      throw new Error("サーバがエラーを返しました");
    }
    const data = await res.json();
    alert(data.msg); // 例: 在庫をリセットしました
    if (data.success) {
      // サーバが返してきた初期在庫を描画
      renderItems(data.items);
      // 履歴をクリア
      purchaseHistory = [];
      totalCost = 0;
      renderHistory();
    }
  } catch (err) {
    console.error("在庫リセット中にエラー:", err);
    alert("在庫リセット中にエラーが発生しました");
  }
});

/**
 * 在庫一覧をサーバから取得して画面に描画
 */
async function fetchAndRenderItems() {
  try {
    const res = await fetch("/api/getItems", { method: "POST" });
    if (!res.ok) {
      throw new Error("サーバがエラーを返しました");
    }
    const data = await res.json();
    renderItems(data.items);
  } catch (err) {
    console.error("在庫一覧取得エラー:", err);
    alert("在庫一覧を取得できませんでした");
  }
}

/**
 * 在庫一覧を画面に描画する
 */
function renderItems(items) {
  const area = document.getElementById("itemsArea");
  area.innerHTML = ""; // 一度クリア

  items.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = `${item.name} - ${item.price}円 - 在庫:${item.stock}`;

    // 購入ボタン
    const buyBtn = document.createElement("button");
    buyBtn.textContent = "購入";
    buyBtn.style.marginLeft = "10px";
    buyBtn.onclick = () => handleBuy(item.id);

    div.appendChild(buyBtn);
    area.appendChild(div);
  });
}

/**
 * 購入処理
 */
async function handleBuy(itemId) {
  const quantityStr = prompt("購入数を入力してください", "1");
  if (!quantityStr) return;

  const quantity = parseInt(quantityStr, 10);
  if (isNaN(quantity) || quantity <= 0) {
    alert("正しい数値を入力してください");
    return;
  }

  try {
    const res = await fetch("/api/buyItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, quantity })
    });
    if (!res.ok) {
      throw new Error("サーバがエラーを返しました");
    }
    const data = await res.json();
    alert(data.msg);

    if (data.success) {
      // purchasedItem には { name, quantity, price } が入っている
      const pItem = data.purchasedItem;
      // 履歴に追加
      purchaseHistory.push({
        name: pItem.name,
        quantity: pItem.quantity,
        price: pItem.price
      });
      totalCost += pItem.price * pItem.quantity;
      renderHistory();

      // 在庫一覧を再取得
      await fetchAndRenderItems();
    }
  } catch (err) {
    console.error("購入処理エラー:", err);
    alert("サーバに接続できませんでした");
  }
}

/**
 * 購入履歴と合計金額を画面に再描画する
 */
function renderHistory() {
  const historyList = document.getElementById("historyList");
  const costSpan = document.getElementById("totalCost");
  historyList.innerHTML = "";

  purchaseHistory.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "historyItem";
    const subtotal = item.price * item.quantity;
    div.textContent = `${idx + 1}. ${item.name} x${item.quantity} (小計: ${subtotal}円)`;
    historyList.appendChild(div);
  });
  costSpan.textContent = totalCost;
}