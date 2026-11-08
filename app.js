const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Товары можно менять — просто добавляй/редактируй строки
const products = [
  { id: 1, name: "Наушники AirPods Pro 3", price: 1500, img: "https://1drv.ms/i/c/cc8482c149c4d50f/IQDmiT9A9TQrSLUkYFHU6y3oAcxVcDu7rPLAYE9BWeSBEdE?e=yFHqQv" },
  { id: 2, name: "Powerbank 10000 mAh", price: 1000, img: "https://1drv.ms/i/c/cc8482c149c4d50f/IQDm-Btg7QlpSbze4mGA191eAYeJ_lPNDT5-Snl0MW2Sid8?e=frda7l" },
  { id: 3, name: "Блок питания 20W", price: 500, img: "https://1drv.ms/i/c/cc8482c149c4d50f/IQBVqL3U4b9AT4Rz_YvOduXlAZf-BQEVEdqTLCzlrvZHAjg?e=6DxjPW" },
  { id: 4, name: "APPLE WATCH 11", price: 2800, img: "https://1drv.ms/i/c/cc8482c149c4d50f/IQD9gMvBc5PgSZHmYjQv-EMtARmUBN3hskzNZgRziOYs8h4?e=C0XT1B" }
];

let cart = [];

function render() {
  const list = document.getElementById("products");
  list.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.price.toLocaleString("ru-RU")} ₽</p>
      </div>
      <button>В корзину</button>
    `;
    div.querySelector("button").onclick = () => addToCart(p);
    list.appendChild(div);
  });
  document.getElementById("cartCount").textContent = cart.length;
}

function addToCart(p) {
  cart.push(p);
  tg.HapticFeedback.impactOccurred("light"); // вибрация в Telegram
  render();
}

document.getElementById("cartBtn").onclick = () => {
  if (cart.length === 0) return;
  const total = cart.reduce((s, i) => s + i.price, 0);
  const items = cart.map(i => i.name).join(", ");
  tg.sendData(`Заказ: ${items} | Итого: ${total} ₽`);
};

render();
