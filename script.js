// -------------------- PRODUCTS --------------------
const products = [
  { id: 1, name: "Fancy Reyon Slub Kurta Set with Dupatta", price: 550, image: "assets/products/dress2.jpg" },
  { id: 2, name: "Worivoc Mannjulaas Women Maroon Ethnic Motifs Solid Kurti", price: 610, image: "assets/products/dress3.jpg" },
  { id: 3, name: "Women Ethnic Embroidery Top, Pant and Dupatta", price: 631, image: "assets/products/dress1.jpg" },
  { id: 4, name: "LOROFY Zimichoo Two Tone Chiffon Saree", price: 800, image: "assets/products/saree.jpg" },
  { id: 5, name: "Luktrima Contrast Sleeve Top", price: 250, image: "assets/products/top.jpg" },
];

let cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const giftMessage = document.getElementById("gift-message");

function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  alert(`${product.name} added to cart! 🎀`);
  updateCartSummary();
}

function updateCartSummary() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  totalPrice.textContent = `Total: ₹${total}`;

  if (total > 5000) {
    giftMessage.textContent = "🎁 You’ve earned a FREE makeup product!";
  } else {
    giftMessage.textContent = "";
  }
}

function searchProducts(term) {
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(term.toLowerCase())
  );
  displayProducts(filtered);
}

// Display all products on page load
displayProducts(products);

// -------------------- LOGIN / SIGNUP --------------------

let authMode = "login";

function openModal(mode) {
  authMode = mode;
  document.getElementById("auth-modal").style.display = "block";
  updateModal();
}

function closeModal() {
  document.getElementById("auth-modal").style.display = "none";
}

function toggleMode() {
  authMode = authMode === "login" ? "signup" : "login";
  updateModal();
}

function updateModal() {
  const title = document.getElementById("modal-title");
  const btn = document.getElementById("submit-btn");
  const switchText = document.getElementById("switch-mode");

  if (authMode === "login") {
    title.textContent = "Login";
    btn.textContent = "Login";
    switchText.textContent = "Don't have an account? Sign up";
  } else {
    title.textContent = "Sign Up";
    btn.textContent = "Sign Up";
    switchText.textContent = "Already have an account? Login";
  }
}

function handleAuth(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  if (authMode === "signup") {
    localStorage.setItem("user_" + username, password);
    alert("Sign up successful! You can now log in.");
    toggleMode();
  } else {
    const storedPassword = localStorage.getItem("user_" + username);
    if (storedPassword === password) {
      alert("Login successful! 🎉");
      closeModal();
    } else {
      alert("Incorrect username or password.");
    }
  }
}
