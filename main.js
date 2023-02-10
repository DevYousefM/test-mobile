let done = document.getElementById("done"),
  tCom = document.getElementById("tCom"),
  rest = document.getElementById("rest"),
  total = document.getElementById("total");
dCom = document.getElementById("dCom");
(id = 0), (last = 0);
let telegram_bot_id, chat_id;
done.addEventListener("click", function () {
  let price = document.getElementById("price"),
    qtn = document.getElementById("qtn"),
    allPrice = price.value * qtn.value,
    completedTable = `<tr class="trCom" id="${id}"><td class="removeP"><button class="remove" data-id="${id}">x</button></td><td>${total.value}</td><td id="price${id}" data-priceId="${id}">${price.value}</td><td id="qtn${id}">${qtn.value}</td><td>${allPrice}</td></tr>`,
    restValue = total.value - allPrice;
  dCom.style.display = "block";
  if (restValue === 0 && allPrice === 0) {
    restValue = last;
  } else {
    last = restValue;
  }
  tCom.innerHTML += completedTable;
  rest.innerHTML = restValue;
  let t = parseInt(`${total.value}`);
  if (tCom.childElementCount >= 0) {
    if (t) {
      t = restValue;
    }
  }

  // Send Data To Telegram Bot
  // bot token
  telegram_bot_id = "5311824878:AAGYHgftCAxm83bDSqJR8HWwaMt-oAlEoh4";
  // chat id
  chat_id = 872300095;
  let textMessage = `
سعر السلعة : ${price.value}جم\n
الكمية : ${qtn.value}جم\n
المبلغ الكلي / المتبقي : ${total.value}جم\n
الباقي من المبلغ الكلي : ${restValue}جم

    `;
  total.value = restValue;
  price.value = "";
  qtn.value = "";
  id++;
  const sender = () => {
    let setting = {
      async: true,
      crossDomain: true,
      url: "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      data: JSON.stringify({
        chat_id: chat_id,
        text: textMessage,
      }),
    };
    $.ajax(setting).done(function (res) {
      console.log(res);
    });
    return false;
  };
  sender();
});
document.addEventListener("click", (e) => {
  if (e.target.className === "remove") {
    let bPrice = document.getElementById(`price${e.target.dataset.id}`),
      bQtn = document.getElementById(`qtn${e.target.dataset.id}`);

    let backPrice = bPrice.innerHTML * bQtn.innerHTML;
    const newRest = parseInt(`${rest.innerHTML}`) + backPrice;
    rest.innerHTML = parseInt(`${rest.innerHTML}`) + backPrice;
    total.value = parseInt(`${rest.innerHTML}`);
    document.getElementById(`${e.target.dataset.id}`).remove();

    // bot token
    telegram_bot_id = "5311824878:AAGYHgftCAxm83bDSqJR8HWwaMt-oAlEoh4";
    // chat id
    chat_id = 872300095;
    textMessage = `Deleted Event\n
     المبلغ المتبقي الجديد : ${newRest}
     `;
    const sender = () => {
      let setting = {
        async: true,
        crossDomain: true,
        url: "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
        },
        data: JSON.stringify({
          chat_id: chat_id,
          text: textMessage,
        }),
      };
      $.ajax(setting).done((res) => {
        console.log(res);
      });
      return false;
    };
    sender();
  }
});
document.getElementById("clear").onclick = () => {
  tCom.innerHTML = "";
  rest.innerHTML = "";
  total.value = "";
  // bot token
  telegram_bot_id = "5311824878:AAGYHgftCAxm83bDSqJR8HWwaMt-oAlEoh4";
  // chat id
  chat_id = 872300095;
  textMessage = `New Customer`;

  const sender = () => {
    let setting = {
      crossDomain: true,
      async: true,
      url: "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      data: JSON.stringify({
        chat_id: chat_id,
        text: textMessage,
      }),
    };
    $.ajax(setting).done((res) => {
      console.log(res);
    });
    return false;
  };
  sender();
  dCom.style.display = "none";

};
