/* ================================
   BLOOM & BOW
   WEBSITE JAVASCRIPT
================================ */

const products = [

  {
    id: 1,
    name: "Blush Baby",
    price: 899,
    description: "Pink roses and baby's breath with a soft bow.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 2,
    name: "Cherry Love",
    price: 1099,
    description: "Deep red roses with elegant satin ribbon.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 3,
    name: "Sweet Pea",
    price: 999,
    description: "Pastel pink and white flowers.",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 4,
    name: "Lavender Kiss",
    price: 1199,
    description: "Dreamy purple blooms with greenery.",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 5,
    name: "Sunshine Girl",
    price: 899,
    description: "Bright sunflowers for a happy heart.",
    image: "https://images.unsplash.com/photo-1495231916356-a86217efff12?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 6,
    name: "Pretty in Pink",
    price: 1299,
    description: "Pink tulips and roses wrapped beautifully.",
    image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 7,
    name: "Cloud Nine",
    price: 1099,
    description: "White flowers with soft pink accents.",
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 8,
    name: "Coquette Bloom",
    price: 1499,
    description: "Pink roses, baby's breath and a giant satin bow.",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=700&q=80"
  }

];


let cart =
  JSON.parse(localStorage.getItem("bloomCart")) || [];

let wishlist =
  JSON.parse(localStorage.getItem("bloomWishlist")) || [];


/* ================================
   FORMAT PRICE
================================ */

function money(number) {

  return "₹" +
    Number(number).toLocaleString("en-IN");

}


/* ================================
   PRODUCT DISPLAY
================================ */

function renderProducts() {

  const grid =
    document.getElementById("productGrid");

  grid.innerHTML = products.map(product => {

    const liked =
      wishlist.includes(product.id);

    return `

      <article class="product">

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
          >

          <button
            class="wishlist ${liked ? "active" : ""}"
            onclick="toggleWishlist(${product.id})"
          >
            ${liked ? "♥" : "♡"}
          </button>

        </div>


        <div class="product-info">

          <div class="stars">
            ★★★★★
          </div>

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.description}
          </p>


          <div class="product-bottom">

            <span class="price">
              ${money(product.price)}
            </span>

            <button
              class="add-cart"
              onclick="addToCart(${product.id})"
            >
              Add to Cart
            </button>

          </div>

        </div>

      </article>

    `;

  }).join("");

}


/* ================================
   CART
================================ */

function addToCart(id) {

  const existing =
    cart.find(item => item.id === id);

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      id: id,
      quantity: 1
    });

  }

  saveData();

  renderCart();

  showToast(
    "Added to your little cart 🎀"
  );

}


function changeQuantity(id, amount) {

  const item =
    cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    cart =
      cart.filter(item => item.id !== id);

  }

  saveData();

  renderCart();

}


function removeItem(id) {

  cart =
    cart.filter(item => item.id !== id);

  saveData();

  renderCart();

}


function renderCart() {

  const container =
    document.getElementById("cartItems");

  if (cart.length === 0) {

    container.innerHTML = `
      <div style="
        text-align:center;
        padding:60px 20px;
        color:#806d73;
        font-family:'Playfair Display',serif;
        font-size:19px;
      ">
        Your cart is waiting for
        a little love ♡
        <br><br>
        🌷 🎀 🌷
      </div>
    `;

    document.getElementById("cartTotal")
      .textContent = "₹0";

    updateCounts();

    return;
  }


  let total = 0;


  container.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          product => product.id === item.id
        );

      const subtotal =
        product.price * item.quantity;

      total += subtotal;


      return `

        <div class="cart-item">

          <img
            src="${product.image}"
            alt="${product.name}"
          >


          <div class="cart-info">

            <strong>
              ${product.name}
            </strong>

            <small>
              ${money(product.price)}
            </small>


            <div class="quantity">

              <button
                onclick="changeQuantity(${product.id}, -1)"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                onclick="changeQuantity(${product.id}, 1)"
              >
                +
              </button>

            </div>

          </div>


          <button
            class="remove"
            onclick="removeItem(${product.id})"
          >
            ×
          </button>

        </div>

      `;

    }).join("");


  document.getElementById("cartTotal")
    .textContent = money(total);

  updateCounts();

}


/* ================================
   WISHLIST
================================ */

function toggleWishlist(id) {

  if (wishlist.includes(id)) {

    wishlist =
      wishlist.filter(item => item !== id);

    showToast(
      "Removed from wishlist"
    );

  } else {

    wishlist.push(id);

    showToast(
      "Saved to your wishlist ♡"
    );

  }

  saveData();

  renderProducts();

  renderWishlist();

}


function renderWishlist() {

  const container =
    document.getElementById("wishlistItems");

  const items =
    products.filter(product =>
      wishlist.includes(product.id)
    );


  if (items.length === 0) {

    container.innerHTML = `
      <div style="
        text-align:center;
        padding:60px 20px;
        color:#806d73;
      ">
        Your wishlist is waiting
        for something pretty ♡
        <br><br>
        🎀 🌷 ✨
      </div>
    `;

    return;

  }


  container.innerHTML =
    items.map(product => `

      <div class="cart-item">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="cart-info">

          <strong>
            ${product.name}
          </strong>

          <small>
            ${money(product.price)}
          </small>

        </div>

        <button
          class="add-cart"
          onclick="addToCart(${product.id})"
        >
          Add
        </button>

      </div>

    `).join("");

}


/* ================================
   DRAWERS
================================ */

function openCart() {

  closeDrawers();

  document
    .getElementById("cartDrawer")
    .classList.add("open");

  document
    .getElementById("overlay")
    .classList.add("active");

}


function openWishlist() {

  closeDrawers();

  document
    .getElementById("wishlistDrawer")
    .classList.add("open");

  document
    .getElementById("overlay")
    .classList.add("active");

}


function closeDrawers() {

  document
    .getElementById("cartDrawer")
    .classList.remove("open");

  document
    .getElementById("wishlistDrawer")
    .classList.remove("open");

  document
    .getElementById("overlay")
    .classList.remove("active");

}


/* ================================
   COUNTERS
================================ */

function updateCounts() {

  const totalItems =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );


  document.getElementById(
    "cartCount"
  ).textContent = totalItems;


  document.getElementById(
    "wishlistCount"
  ).textContent =
    wishlist.length;

}


/* ================================
   LOCAL STORAGE
================================ */

function saveData() {

  localStorage.setItem(
    "bloomCart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "bloomWishlist",
    JSON.stringify(wishlist)
  );

  updateCounts();

}


/* ================================
   MOBILE MENU
================================ */

function toggleMenu() {

  document
    .getElementById("navLinks")
    .classList.toggle("active");

}


/* ================================
   CUSTOM BOUQUET
================================ */

function updateBuilder() {

  const flower =
    document.getElementById("flowerType");

  const flowerPrice =
    Number(flower.value);


  const size =
    Number(
      document.getElementById(
        "bouquetSize"
      ).value
    );


  const wrapping =
    Number(
      document.getElementById(
        "wrapping"
      ).value
    );


  const color =
    document.getElementById(
      "flowerColor"
    ).value;


  const price =
    899 +
    flowerPrice +
    size +
    wrapping;


  document.getElementById(
    "builderPrice"
  ).textContent =
    money(price);


  const flowerName =
    flower.options[
      flower.selectedIndex
    ].text;


  document.getElementById(
    "previewText"
  ).textContent =
    `${color} ${flowerName} Bouquet ♡`;


  const icons = {
    Roses: "🌹",
    Tulips: "🌷",
    Lilies: "🌸",
    Sunflowers: "🌻",
    "Baby's Breath": "🤍"
  };


  document.getElementById(
    "previewFlower"
  ).textContent =
    icons[flowerName] || "💐";

}


function addCustomBouquet() {

  const priceText =
    document.getElementById(
      "builderPrice"
    ).textContent;


  const price =
    Number(
      priceText.replace(
        /[₹,]/g,
        ""
      )
    );


  cart.push({

    id: Date.now(),

    quantity: 1,

    custom: true,

    name: "Custom Bouquet",

    price: price,

    image:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=700&q=80"

  });


  localStorage.setItem(
    "bloomCart",
    JSON.stringify(cart)
  );


  showToast(
    "Your custom bouquet was created 🎀"
  );


  renderCustomCart();

  openCart();

}


/* ================================
   CUSTOM CART SUPPORT
================================ */

function renderCustomCart() {

  const container =
    document.getElementById("cartItems");


  if (!cart.length) {

    renderCart();

    return;

  }


  let total = 0;


  container.innerHTML =
    cart.map(item => {

      let product;


      if (item.custom) {

        product = {

          name: "Custom Bouquet",

          price: item.price,

          image:
            "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=300&q=70"

        };

      } else {

        product =
          products.find(
            p => p.id === item.id
          );

      }


      total +=
        product.price *
        item.quantity;


      return `

        <div class="cart-item">

          <img
            src="${product.image}"
            alt="${product.name}"
          >

          <div class="cart-info">

            <strong>
              ${product.name}
            </strong>

            <small>
              ${money(product.price)}
            </small>

            <div class="quantity">

              <button
                onclick="customQuantity('${item.id}', -1)"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                onclick="customQuantity('${item.id}', 1)"
              >
                +
              </button>

            </div>

          </div>

          <button
            class="remove"
            onclick="removeCustom('${item.id}')"
          >
            ×
          </button>

        </div>

      `;

    }).join("");


  document.getElementById(
    "cartTotal"
  ).textContent =
    money(total);

  updateCounts();

}


function customQuantity(id, amount) {

  const item =
    cart.find(
      item => String(item.id) === String(id)
    );


  if (!item) return;


  item.quantity += amount;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        item =>
          String(item.id) !==
          String(id)
      );

  }


  saveData();

  renderCustomCart();

}


function removeCustom(id) {

  cart =
    cart.filter(
      item =>
        String(item.id) !==
        String(id)
    );


  saveData();

  renderCustomCart();

}


/* ================================
   CHECKOUT
================================ */

function checkout() {

  if (!cart.length) {

    showToast(
      "Your cart is empty ♡"
    );

    return;

  }


  closeDrawers();


  document
    .getElementById("contact")
    .scrollIntoView({
      behavior: "smooth"
    });


  showToast(
    "Fill the order form below 🎀"
  );

}


/* ================================
   ORDER FORM
================================ */

function submitOrder(event) {

  event.preventDefault();


  const name =
    document.getElementById(
      "name"
    ).value;


  document.getElementById(
    "successMessage"
  ).textContent =
    `Thank you, ${name}! Your flower request has been received 🎀🌷`;


  event.target.reset();

}


/* ================================
   TOAST
================================ */

function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 2200);

}


/* ================================
   INITIALIZE
================================ */

renderProducts();

renderWishlist();

renderCart();

updateBuilder();

updateCounts();
