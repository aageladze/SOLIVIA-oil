// =========================
// SOLIVIA PRODUCT DATABASE
// =========================

const products = [
    {
        id: 1,
        name: "Classic EVOO",
        price: 18.90,
        category: "Classic",
        description: "Balanced and versatile Spanish Extra Virgin Olive Oil."
    },

    {
        id: 2,
        name: "Premium Selection",
        price: 24.90,
        category: "Premium",
        description: "A refined selection with a rich and elegant character."
    },

    {
        id: 3,
        name: "Chef's Choice",
        price: 29.90,
        category: "Chef",
        description: "Created for elevated everyday cooking."
    }
];
// =========================
// RENDER PRODUCTS
// =========================

const productGrid = document.getElementById("productGrid");

function renderProducts() {

    if (!productGrid) return;

    productGrid.innerHTML = "";

    products.forEach((product) => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-number">
                ${String(product.id).padStart(2, "0")}
            </div>

            <div class="product-icon">
                🫒
            </div>

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.description}
            </p>

            <div class="product-price">
                €${product.price.toFixed(2)}
            </div>

            <button class="add-to-cart" data-id="${product.id}">
                ADD TO CART →
            </button>
        `;

        productGrid.appendChild(card);
    });
}

function renderProducts() {
    const productGrid = document.querySelector(".product-grid") || document.querySelector(".products-grid") || document.getElementById("product-grid");

    if (!productGrid) return;

    productGrid.innerHTML = "";

    products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-number">${String(product.id).padStart(2, "0")}</div>
            <div class="product-icon">🫒</div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">€${product.price.toFixed(2)}</div>
            
            <!-- სწორედ აქ ვამატებთ ორივე ღილაკს -->
            <button class="view-product-btn" onclick="openProductModal(${product.id})">
                View Product →
            </button>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                ADD TO CART →
            </button>
        `;

        productGrid.appendChild(card);
    });
}
// =========================
// SOLIVIA — JAVASCRIPT
// =========================

document.addEventListener("DOMContentLoaded", () => {

    console.log("SOLIVIA is ready 🫒");

    // =========================
    // TASTE PROFILE
    // =========================

    const tasteButton = document.getElementById("tasteButton");
    const tasteResult = document.getElementById("tasteResult");

    if (tasteButton && tasteResult) {

        tasteButton.addEventListener("click", () => {

            const profiles = [
                "Your profile: FRESH & FRUITY 🍃",
                "Your profile: BALANCED & ELEGANT ✨",
                "Your profile: BOLD & INTENSE 🌿"
            ];

            const randomProfile =
                profiles[Math.floor(Math.random() * profiles.length)];

            tasteResult.textContent = randomProfile;

        });

    }


    // =========================
    // SCROLL REVEAL
    // =========================

    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });


    // =========================
    // NAVBAR SCROLL EFFECT
    // =========================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}) // =========================
// MOBILE MENU
// =========================

const menuButton = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navbar nav");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("mobile-open");
});// 1. სცენის, კამერისა და რენდერერის ინიციალიზაცია
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true // გამჭვირვალე ფონი
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// 2. ოქროსფერი ნაწილაკების (გალაქტიკის) შექმნა
const count = 3000; // ნაწილაკების რაოდენობა
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 80;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// ოქროსფერი ზეთის ეფექტისთვის
const material = new THREE.PointsMaterial({
  size: 0.15,
  color: 0xd4af37, // ოქროსფერი (Olive/Gold tone)
  transparent: true,
  opacity: 0.8
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// 3. ანიმაციის ციკლი
const clock = new THREE.Clock();

function tick() {
  const elapsedTime = clock.getElapsedTime();

  // კამერის ნელი ბრუნვა ცენტრის გარშემო
  camera.position.x = Math.cos(elapsedTime * 0.15) * 30;
  camera.position.z = Math.sin(elapsedTime * 0.15) * 30;
  camera.lookAt(0, 0, 0);

  // ნაწილაკების საკუთარი ღერძის გარშემო ბრუნვა
  particles.rotation.y = elapsedTime * 0.03;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();

// ეკრანის ზომის შეცვლისას (Resize) ანიმაციის ადაპტაცია
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
// --- ხმის მართვის კოდი ---
const audio = document.getElementById('bg-music');
const soundBtn = document.getElementById('sound-btn');

soundBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    soundBtn.textContent = '🔇 Mute';
  } else {
    audio.pause();
    soundBtn.textContent = '🔊 Sound On';
  }
});
function showMatch(preference) {
    const resultBox = document.getElementById('quiz-result');
    if (preference === 'smooth') {
        resultBox.innerHTML = "✨ We recommend: <strong>Classic EVOO</strong> — Perfect for salads and light pasta.";
    } else if (preference === 'balanced') {
        resultBox.innerHTML = "✨ We recommend: <strong>Premium Selection</strong> — Ideal for dipping bread and finishing dishes.";
    } else if (preference === 'bold') {
        resultBox.innerHTML = "✨ We recommend: <strong>Chef's Choice</strong> — Best for grilled meats and rich sauces.";
    }
} // Floating Heart Effect
document.addEventListener("click", function (e) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML = "❤️";
    
    // Position the heart at mouse click coordinates
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    
    document.body.appendChild(heart);
    
    // Remove heart after animation finishes
    setTimeout(() => {
        heart.remove();
    }, 1000);
}); 
// ====================
// SHOPPING CART LOGIC
// ====================

let cart = [];
// =========================
// FIND CART ITEM
// =========================

function getCartItem(productId) {
    return cart.find(
        (item) => item.product.id === productId
    );
}

// 1. კალათის გახსნა და დახურვა
function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    if (cartModal) {
        cartModal.classList.toggle("active");
    }
}

// 2. პროდუქტის კალათაში დამატება ID-ით
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartUI();
        
        // პროდუქტის დამატებისას ავტომატურად გაახილოს კალათა
        const cartModal = document.getElementById("cart-modal");
        if (cartModal && !cartModal.classList.contains("active")) {
            cartModal.classList.add("active");
        }
    }
}

// 3. პროდუქტის წაშლა კალათიდან
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 4. კალათის ვიზუალის და ფასის განახლება
function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cartCount) cartCount.textContent = cart.length;

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Your cart is currently empty.</p>';
        if (cartTotal) cartTotal.textContent = "0.00";
        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>🫒 ${item.name}</strong>
                    <div>€${item.price.toFixed(2)}</div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
            </div>
        `;
    });

    if (cartTotal) cartTotal.textContent = total.toFixed(2);
} function renderProducts() {
    const productGrid = document.querySelector(".product-grid") || document.querySelector(".products-grid") || document.getElementById("product-grid");

    if (!productGrid) return;

    productGrid.innerHTML = ""; // ასუფთავებს ბადეს განახლებამდე

    products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-number">${String(product.id).padStart(2, "0")}</div>
            <div class="product-icon">🫒</div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">€${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                ADD TO CART →
            </button>
        `;

        productGrid.appendChild(card);
    });
} // =========================
// CART PANEL
// =========================

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");

function openCart() {
    cartPanel.classList.add("open");
    cartOverlay.classList.add("active");
}

function closeCart() {
    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("active");
}

if (cartButton) {
    cartButton.addEventListener("click", openCart);
}

if (cartClose) {
    cartClose.addEventListener("click", closeCart);
}

if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
} function saveCart() {
    localStorage.setItem(
        "soliviaCart",
        JSON.stringify(cart)
    );
} function loadCart() {

    const savedCart =
        localStorage.getItem("soliviaCart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
} // ====================
// PRODUCT MODAL LOGIC
// ====================

function openProductModal(productId) {
    // 1. ვპოულობთ პროდუქტს ID-ით
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById("product-modal");
    
    if (!product || !modal) return;

    // 2. ვავსებთ მონაცემებს
    const nameEl = document.getElementById("modal-product-name");
    const priceEl = document.getElementById("modal-product-price");
    const descEl = document.getElementById("modal-product-desc");
    const addBtn = document.getElementById("modal-add-btn");

    if (nameEl) nameEl.textContent = product.name;
    if (priceEl) priceEl.textContent = "€" + product.price.toFixed(2);
    if (descEl) descEl.textContent = product.description;
    
    if (addBtn) {
        addBtn.onclick = function() {
            addToCart(product.id);
            closeProductModal();
        };
    }

    // 3. ვამატებთ active კლასს და ვცვლით display-ს
    modal.classList.add("active");
    modal.style.display = "flex";
}

function closeProductModal() {
    const modal = document.getElementById("product-modal");
    if (modal) {
        modal.classList.remove("active");
        modal.style.display = "none";
    }
} // CUSTOM CURSOR
const cursor = document.createElement("div");
cursor.style.cssText = "position:fixed; width:10px; height:10px; background:#00ff66; border-radius:50%; pointer-events:none; z-index:999999; transform:translate(-50%,-50%); box-shadow: 0 0 10px #00ff66;";
document.body.appendChild(cursor);

window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
}); window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loading-screen");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 800);
        }
    }, 1000);
}); // LIVE SALES NOTIFICATION (DEMO)
function showLiveSalesNotification() {
    const cities = ["Madrid", "Barcelona", "Paris", "Milan", "Tbilisi", "Tokyo"];
    const productsList = ["Classic EVOO", "Premium Selection", "Chef's Reserve"];

    const notification = document.createElement("div");
    notification.className = "sale-notification";
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #14231a;
        border: 1px solid #00ff66;
        color: #00ff66;
        padding: 10px 18px;
        border-radius: 10px;
        font-size: 0.85rem;
        box-shadow: 0 5px 20px rgba(0,0,0,0.5);
        z-index: 999;
        transition: all 0.5s ease;
        opacity: 0;
        transform: translateY(20px);
    `;

    document.body.appendChild(notification);

    setInterval(() => {
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomProduct = productsList[Math.floor(Math.random() * productsList.length)];

        notification.innerHTML = `🛒 Someone in <strong>${randomCity}</strong> just purchased <strong>${randomProduct}</strong>`;
        notification.style.opacity = "1";
        notification.style.transform = "translateY(0)";

        setTimeout(() => {
            notification.style.opacity = "0";
            notification.style.transform = "translateY(20px)";
        }, 4000);
    }, 10000);
}

document.addEventListener("DOMContentLoaded", showLiveSalesNotification);
function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #00ff66;
        color: #000;
        padding: 10px 20px;
        border-radius: 20px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 0 15px rgba(0,255,102,0.5);
        transition: opacity 0.5s ease;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

// გამოიყენეთ addToCart ფუნქციაში:
// showToast("✨ Added to bag!");
// ==========================================
// COSMIC PARTICLES & OLIVE OIL DROPS ANIMATION
// ==========================================
function initCosmicAnimation() {
    const canvas = document.getElementById("cosmic-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let oilDrops = [];

    const particleCount = 45; // კოსმოსური ნაწილაკები
    const dropCount = 18;       // ზეთის წვეთები

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // 1. კოსმოსური მნათობი ნაწილაკების კლასი
    class CosmicParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.color = Math.random() > 0.4 ? "0, 255, 102" : "226, 192, 68";
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
        }
    }

    // 2. ზეითუნის ზეთის წვეთების კლასი (Oil Drop Class)
    class OilDrop {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * canvas.width;
            // თავიდან ეკრანზე განაწილება, შემდეგ ზემოდან ჩამოსვლა
            this.y = initial ? Math.random() * canvas.height : -20;
            this.radius = Math.random() * 3 + 2; // წვეთის სისქე
            this.length = Math.random() * 12 + 8; // წვეთის სიგრძე
            this.speed = Math.random() * 0.8 + 0.3; // ჩამოსვლის სიჩქარე (ნელი/smooth)
            this.alpha = Math.random() * 0.6 + 0.3;
            // ოქროსფერ-მწავნე ზეთის ფერები
            const colors = [
                "212, 175, 55",  // Classic Gold
                "180, 190, 40",  // Olive Oil Golden-Green
                "0, 255, 102"    // Solivia Neon Green Accent
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.y += this.speed;

            // როდესაც წვეთი ეკრანის ქვემოთ ჩადის, თავიდან იწყებს ზემოდან
            if (this.y > canvas.height + 20) {
                this.reset(false);
            }
        }

        draw() {
            ctx.beginPath();
            // ჩამოღვრილი წვეთის ფორმის დახატვა (Capsule / Drop shape)
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.lineWidth = this.radius;
            ctx.lineCap = "round";
            ctx.strokeStyle = `rgba(${this.color}, ${this.alpha})`;
            
            // ზეთის მბზინავი ეფექტი (Glow Effect)
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(${this.color}, 0.8)`;
            
            ctx.stroke();
            ctx.shadowBlur = 0; // Performance-ისთვის
        }
    }

    // ობიექტების შექმნა
    for (let i = 0; i < particleCount; i++) {
        particles.push(new CosmicParticle());
    }

    for (let i = 0; i < dropCount; i++) {
        oilDrops.push(new OilDrop());
    }

    // ანიმაციის ციკლი
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // კოსმოსური ვარსკვლავები
        particles.forEach((p) => {
            p.update();
            p.draw();
        });

        // ზეთის ჩამომავალი წვეთები
        oilDrops.forEach((drop) => {
            drop.update();
            drop.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// გვერდის ჩატვირთვისას გაშვება
window.addEventListener("DOMContentLoaded", initCosmicAnimation);