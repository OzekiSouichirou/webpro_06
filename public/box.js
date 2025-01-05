"use strict";

// 「商品一覧を表示」ボタンをクリックすると在庫データをサーバに要求
document.getElementById("showItems").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/getItems", {
      method: "POST"
    });
    const data = await res.json();
    renderItems(data.items);
  } catch (err) {
    console.error("サーバ通信エラー:", err);
    alert("在庫一覧を取得できませんでした");
  }
});

/**
 * 取得した商品の情報を画面に描画する関数
 */
function renderItems(items) {
  const area = document.getElementById("itemsArea");
  area.innerHTML = ""; // 一度クリアしてから再生成

  items.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = `${item.name} - ${item.price}円 - 在庫:${item.stock}`;

    // 購入ボタン
    const buyBtn = document.createElement("button");
    buyBtn.textContent = "購入";
    buyBtn.style.marginLeft = "10px";
    buyBtn.onclick = () => buyItem(item.id);

    div.appendChild(buyBtn);
    area.appendChild(div);
  });
}

/**
 * 購入処理
 */
async function buyItem(itemId) {
  const quantityStr = prompt("購入数を入力してください", "1");
  if (!quantityStr) return;

  const quantity = parseInt(quantityStr, 10);
  if (isNaN(quantity) || quantity <= 0) {
    alert("数値を正しく入力してください");
    return;
  }

  try {
    const res = await fetch("/api/buyItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ itemId, quantity })
    });
    const data = await res.json();
    alert(data.msg);

    // 成功時は在庫一覧を再取得して表示
    if (data.success) {
      const res2 = await fetch("/api/getItems", {
        method: "POST"
      });
      const data2 = await res2.json();
      renderItems(data2.items);
    }
  } catch (err) {
    console.error("購入リクエストに失敗:", err);
    alert("サーバに接続できませんでした");
  }
}