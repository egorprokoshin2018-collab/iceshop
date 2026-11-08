const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Товары можно менять — просто добавляй/редактируй строки
const products = [
  { id: 1, name: "Наушники AirPods Pro 3", price: 24990, img: "https://via.placeholder.com/140?text=AirPods" },
  { id: 2, name: "Powerbank 20000 mAh", price: 2190, img: "https://via.placeholder.com/140?text=Powerbank" },
  { id: 3, name: "Клавиатура Logitech K380", price: 3490, img: "https://via.placeholder.com/140?text=K380" },
  { id: 4, name: "Чехол для iPhone 17", price: 1290, img: "https://via.placeholder.com/140?text=Case" }
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
