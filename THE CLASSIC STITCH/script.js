const searchIcon = document.getElementById("searchIcon");
const searchInput = document.getElementById("searchInput");

searchIcon.addEventListener("click", () => {
    if (searchInput.style.width === "100px") {
        searchInput.style.width = "0";
        searchInput.style.opacity = "0";
    } else {
        searchInput.style.width = "100px";
        searchInput.style.opacity = "1";
        searchInput.focus();
    }
});

function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product");
  const partialMatches = [];
  let exactMatch = null;

  products.forEach(product => {
    const name = product.getAttribute("data-name").toLowerCase();

    if (name.includes(input) && input !== "") {
      product.style.display = "inline-block";
      partialMatches.push(product);

      if (name === input && !exactMatch) {
        exactMatch = product; // exact match found
      }
    } else {
      product.style.display = "none";
    }
  });

  // Scroll behavior
  if (exactMatch) {
    // Scroll to exact match if exists
    exactMatch.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  } else if (partialMatches.length >= 3) {
    // Scroll to third partial match
    partialMatches[2].scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  } else if (partialMatches.length > 0) {
    // Scroll to first partial match if less than 3
    partialMatches[0].scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}

function buyNowWhatsApp() {
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const size = document.getElementById('size').value;

            // Validate
            if (!name || !phone || !address || !size) {
                alert("Please fill out all fields!");
                return;
            }

            // Your WhatsApp number (with country code, e.g., 919876543210)
            const whatsappNumber = "03194111017";

            // Create message
            const message = `Hello! I want to buy a product.\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nSize: ${size}`;

            // Encode message
            const encodedMessage = encodeURIComponent(message);

            // Open WhatsApp
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, "_blank");
        }
// -------------------------------

let cart = [];

const cartBox = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPriceEl = document.getElementById("totalPrice");

/* Open / Close Cart */
function toggleCart() {
    cartBox.classList.toggle("open");
}

/* Add to Cart */
function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }

    updateCart();
}

/* Increase Quantity */
function increaseQty(index) {
    cart[index].qty++;
    updateCart();
}

/* Decrease Quantity */
function decreaseQty(index) {
    cart[index].qty--;
    if (cart[index].qty === 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

/* Update Cart UI */
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        count += item.qty;

        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.image}" class="cart-img">
            <div class="cart-text">
                <strong style="color:black; font-size:10px;">${item.name}<br>
                Rs. ${item.price} × ${item.qty}<br></strong>
                <button onclick="decreaseQty(${index})">−</button>
                <button onclick="increaseQty(${index})">+</button>
            </div>
        `;
        cartItems.appendChild(li);
    });

    cartCount.textContent = count;
    totalPriceEl.textContent = total;
}

function buyNow() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Order Summary:\n\n";
    cart.forEach(item => {
        message += `${item.name} × ${item.qty} = Rs. ${item.price * item.qty}\n`;
    });

    message += "\nTotal: Rs. " + totalPriceEl.textContent;
    alert(message);

    // Clear cart after buying
    cart = [];
    updateCart();
    toggleCart();
}

function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

function closeMenu() {
  document.getElementById("menu").classList.remove("show");
}

