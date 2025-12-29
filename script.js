// ================= GSAP DEFAULTS =================
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ once: true });

// ================= UTILITIES =================
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let compareList = JSON.parse(localStorage.getItem("compare")) || [];
let currentPage = 1;
const itemsPerPage = 6;

// Centralized Theme Toggle
function initTheme() {
  const body = document.body;
  const toggle = document.getElementById("themeToggle");
  if (localStorage.getItem("theme") === "dark") body.classList.add("dark");
  if (toggle) {
    toggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
    });
  }
}

// Toast Notification for Errors/Success
function showToast(message, type = "error") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);
  gsap.from(toast, { y: -50, opacity: 0, duration: 0.5 });
  setTimeout(() => {
    gsap.to(toast, { y: -50, opacity: 0, duration: 0.5, onComplete: () => toast.remove() });
  }, 3000);
}

// ================= RENDERING FUNCTIONS =================
// Render Properties with Pagination
function renderProperties(page = 1) {
  const grid = document.getElementById("propertyGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const filtered = properties.slice(start, end);
  filtered.forEach(p => {
    const saved = wishlist.some(w => w.id === p.id);
    grid.innerHTML += `
      <div class="property-card" data-id="${p.id}" data-location="${p.location}" data-type="${p.type}" data-bhk="${p.bhk}" data-price="${p.price}" onclick="openProperty(event)">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>₹${p.price} • ${p.location}</p>
          <div class="card-actions">
            <span class="rating">⭐ ${p.rating || 4.5}</span>
            <button class="wishlist ${saved ? 'active' : ''}" onclick="toggleWishlist('${p.id}', event)">
              <i class="fas fa-heart"></i>
            </button>
            <button class="share-btn" onclick="shareProperty(event)">
              <i class="fas fa-share"></i>
            </button>
            <label class="compare-check">
              <input type="checkbox" class="compareBox" onchange="updateCompare('${p.title}')"> Compare
            </label>
          </div>
        </div>
      </div>
    `;
  });
  renderPagination();
  gsap.from(".property-card", { y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" });
}

// Render Pagination
function renderPagination() {
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  if (!pagination) return;
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `<button onclick="renderProperties(${i})" ${i === currentPage ? 'class="active"' : ''}>${i}</button>`;
  }
  currentPage = page;
}

// Render Brokers
function renderBrokers() {
  const grid = document.getElementById("brokerGrid");
  if (!grid) return;
  grid.innerHTML = brokers.map(b => `
    <div class="broker-card" onclick="navigate('broker.html')">
      <img src="${b.photo}" alt="${b.name}">
      <h3>${b.name}</h3>
      <p>⭐ ${b.rating} • ${b.experience}</p>
    </div>
  `).join("");
  gsap.from(".broker-card", { scale: 0.7, opacity: 0, duration: 0.9, stagger: 0.25, ease: "back.out(1.7)" });
}

// Render AI Recommendations
function renderAIRecommendations() {
  const grid = document.getElementById("aiGrid");
  if (!grid) return;
  const recs = properties.slice(0, 3); // Sample top 3
  grid.innerHTML = recs.map(p => `
    <div class="property-card ai-card" onclick="openProperty(event)">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <div class="card-body">
        <h3>${p.title}</h3>
        <p>₹${p.price} • ${p.location}</p>
        <span class="ai-reason">Recommended because you liked similar properties</span>
      </div>
    </div>
  `).join("");
  gsap.from(".ai-card", { y: 50, opacity: 0, duration: 0.9, stagger: 0.2, ease: "power3.out" });
}

// ================= WISHLIST =================
function toggleWishlist(id, event) {
  event.stopPropagation();
  const item = properties.find(p => p.id === id);
  if (!item) return;
  const index = wishlist.findIndex(w => w.id === id);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast("Removed from wishlist", "success");
  } else {
    wishlist.push(item);
    showToast("Added to wishlist", "success");
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderProperties(currentPage); // Re-render to update UI
}

// ================= THEME TOGGLE =================
initTheme();

// ================= PAGE TRANSITION =================
const transition = document.getElementById("pageTransition");

function navigate(url) {
  if (!transition) {
    window.location.href = url;
    return;
  }
  gsap.to(transition, { y: "0%", duration: 0.6, ease: "power4.in", onComplete: () => window.location.href = url });
}

if (transition) {
  gsap.to(transition, { y: "-100%", duration: 0.8, ease: "power4.out" });
}

document.querySelectorAll("a[href]").forEach(link => {
  const url = link.getAttribute("href");
  if (url && !url.startsWith("#") && !url.startsWith("http")) {
    link.addEventListener("click", e => {
      e.preventDefault();
      navigate(url);
    });
  }
});

// ================= PROPERTY CARD CLICK =================
function openProperty(e) {
  if (e.target.closest(".wishlist") || e.target.closest(".share-btn") || e.target.closest(".compare-check")) return;
  navigate("property.html");
}

// ================= SITE VISIT MODAL =================
function openVisitModal() {
  const modal = document.getElementById("visitModal");
  if (!modal) return;
  modal.style.display = "flex";
  gsap.from(".visit-box", { scale: 0.7, opacity: 0, duration: 0.5, ease: "back.out(1.7)" });
}

function closeVisitModal() {
  const modal = document.getElementById("visitModal");
  if (modal) modal.style.display = "none";
}

// ================= AUTH / ROLE LOGIN =================
let otpStage = false;

function openAuth() {
  const modal = document.getElementById("authModal");
  if (!modal) return;
  modal.style.display = "flex";
  gsap.from(".auth-box", { scale: 0.7, opacity: 0, duration: 0.5, ease: "back.out(1.7)" });
}

function closeAuth() {
  const modal = document.getElementById("authModal");
  if (!modal) return;
  modal.style.display = "none";
  resetAuth();
}

function resetAuth() {
  otpStage = false;
  const otp = document.getElementById("otpInput");
  const btn = document.getElementById("authAction");
  if (otp) otp.style.display = "none";
  if (btn) btn.innerText = "Send OTP";
}

function switchAuth() {
  const title = document.getElementById("authTitle");
  if (title) title.innerText = title.innerText === "Login to Grey Deal" ? "Sign up to Grey Deal" : "Login to Grey Deal";
}

const authBtn = document.getElementById("authAction");
if (authBtn) {
  authBtn.addEventListener("click", () => {
    if (!otpStage) {
      document.getElementById("otpInput").style.display = "block";
      authBtn.innerText = "Verify OTP";
      otpStage = true;
    } else {
      const role = document.getElementById("roleSelect").value;
      localStorage.setItem("role", role);
      navigate(role === "broker" ? "dashboard.html" : "user-dashboard.html");
    }
  });
}

// ================= NOTIFICATIONS =================
let notifOpen = false;

function toggleNotifications() {
  const panel = document.getElementById("notificationsPanel");
  const badge = document.getElementById("notifBadge");
  if (!panel) return;
  notifOpen = !notifOpen;
  if (notifOpen) {
    panel.style.display = "block";
    gsap.from(panel, { y: -20, opacity: 0, duration: 0.4, ease: "power3.out" });
    if (badge) badge.style.display = "none";
    panel.querySelectorAll(".notification-item").forEach(n => n.classList.remove("unread"));
  } else {
    panel.style.display = "none";
  }
}

// ================= SEARCH FUNCTIONALITY =================
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".property-card").forEach(card => {
      const title = card.querySelector("h3").innerText.toLowerCase();
      card.style.display = title.includes(query) ? "block" : "none";
    });
  });
}

// ================= FILTERS =================
function applyFilters() {
  const location = document.getElementById("filterLocation").value;
  const type = document.getElementById("filterType").value;
  const bhk = document.getElementById("filterBHK").value;
  const min = +document.getElementById("minPrice").value || 0;
  const max = +document.getElementById("maxPrice").value || Infinity;

  document.querySelectorAll(".property-card").forEach(card => {
    const cardLocation = card.dataset.location;
    const cardType = card.dataset.type;
    const cardBhk = card.dataset.bhk;
    const cardPrice = +card.dataset.price;

    const match = (!location || location === cardLocation) &&
                  (!type || type === cardType) &&
                  (!bhk || bhk === cardBhk) &&
                  cardPrice >= min && cardPrice <= max;
    card.style.display = match ? "block" : "none";
  });
}

function clearFilters() {
  document.querySelectorAll(".filter-bar select, .filter-bar input").forEach(el => el.value = "");
  document.querySelectorAll(".property-card").forEach(card => card.style.display = "block");
}

// ================= COMPARE =================
function updateCompare(title) {
  const checkbox = event.target;
  if (checkbox.checked) {
    if (compareList.length < 2) {
      compareList.push(title);
    } else {
      showToast("Only 2 properties can be compared");
      checkbox.checked = false;
      return;
    }
  } else {
    compareList = compareList.filter(t => t !== title);
  }
  localStorage.setItem("compare", JSON.stringify(compareList));
  updateCompareBar();
}

function updateCompareBar() {
  const bar = document.getElementById("compareBar");
  const count = document.getElementById("compareCount");
  if (!bar || !count) return;
  count.innerText = compareList.length;
  bar.style.display = compareList.length > 0 ? "flex" : "none";
}

function goToCompare() {
  localStorage.setItem("compare", JSON.stringify(compareList));
  navigate("compare.html");
}

// ================= SHARE PROPERTY =================
function shareProperty(e) {
  e.stopPropagation();
  const card = e.target.closest(".property-card");
  if (!card) return;
  const title = card.querySelector("h3").innerText;
  const price = card.querySelector("p").innerText;
  const message = `🏠 ${title}\n💰 ${price}\nCheck this property on Grey Deal`;
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ================= CONTACT FORM =================
function submitContact(event) {
  event.preventDefault();
  showToast("Message sent! We'll get back to you soon.", "success");
}

// ================= GSAP ANIMATIONS =================
if (document.querySelector(".hero-text")) {
  gsap.from(".hero-text h1", { y: 80, opacity: 0, duration: 1.4, ease: "power4.out" });
  gsap.from(".hero-text p", { y: 40, opacity: 0, delay: 0.3, duration: 1, ease: "power3.out" });
  gsap.from(".search-box", { y: 30, opacity: 0, delay: 0.6, duration: 1, ease: "power3.out" });
}

if (document.querySelector(".property-grid")) {
  gsap.from(".property-card", { scrollTrigger: { trigger: ".property-grid", start: "top 80%" }, y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
}

if (document.querySelector(".broker-grid")) {
  gsap.from(".broker-card", { scrollTrigger: { trigger: ".broker-grid", start: "top 85%" }, scale: 0.7, opacity: 0, duration: 0.9, stagger: 0.25, ease: "back.out(1.7)" });
}

if (document.querySelector(".ai-section")) {
  gsap.from(".ai-card", { scrollTrigger: { trigger: ".ai-section", start: "top 80%" }, y: 50, opacity: 0, duration: 0.9, stagger: 0.2, ease: "power3.out" });
}

if (document.querySelector(".map-box")) {
  gsap.from(".map-box", { scrollTrigger: { trigger: ".map-box", start: "top 85%" }, scale: 0.95, opacity: 0, duration: 0.8, ease: "power3.out" });
}

// ================= AI COMPARE LOGIC (for compare.html) =================
if (window.location.pathname.includes("compare.html")) {
  const data = JSON.parse(localStorage.getItem("compare")) || [];
  const propertiesMap = {
    "Luxury Villa": { price: 24000000, location: "Mumbai", type: "Villa", bhk: 4 },
    "Premium Flat": { price: 8500000, location: "Delhi", type: "Apartment", bhk: 3 }
  };
  const [p1, p2] = data;
  if (p1 && p2) {
    document.getElementById("p1").innerText = p1;
    document.getElementById("p2").innerText = p2;
    document.getElementById("price1").innerText = "₹" + propertiesMap[p1].price;
    document.getElementById("price2").innerText = "₹" + propertiesMap[p2].price;
    document.getElementById("loc1").innerText = propertiesMap[p1].location;
    document.getElementById("loc2").innerText = propertiesMap[p2].location;
    document.getElementById("type1").innerText = propertiesMap[p1].type;
    document.getElementById("type2").innerText = propertiesMap[p2].type;
    document.getElementById("bhk1").innerText = propertiesMap[p1].bhk;
    document.getElementById("bhk2").innerText = propertiesMap[p2].bhk;
    const verdict = document.getElementById("aiVerdict");
    verdict.innerText = propertiesMap[p1].price < propertiesMap[p2].price ?
      `🧠 AI Suggests: ${p1} is better value for money` :
      `🧠 AI Suggests: ${p2} offers a more premium lifestyle`;
  }
}

// ================= MOBILE MENU =================
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  if (nav) nav.classList.toggle("active");
}

// ================= INITIALIZE =================
document.addEventListener("DOMContentLoaded", () => {
  renderProperties();
  renderBrokers();
  renderAIRecommendations();
  updateCompareBar();
});

// ================= MOBILE SWIPES AND ANIMATIONS =================
let hammer;

// Initialize Hammer.js for swipes
function initSwipes() {
  hammer = new Hammer(document.body);

  // Swipe to navigate properties
  const propertyGrid = document.querySelector(".property-grid");
  if (propertyGrid) {
    const hammerProp = new Hammer(propertyGrid);
    hammerProp.on('swipeleft', () => {
      gsap.to(propertyGrid, { x: -window.innerWidth, duration: 0.5, onComplete: () => navigate('next-property') });
    });
    hammerProp.on('swiperight', () => {
      gsap.to(propertyGrid, { x: window.innerWidth, duration: 0.5, onComplete: () => navigate('prev-property') });
    });
  }

  // Swipe to dismiss notifications
  hammer.on('swipeleft', (e) => {
    if (e.target.closest('.notification-item')) {
      e.target.closest('.notification-item').classList.add('swipe-dismiss');
      setTimeout(() => e.target.closest('.notification-item').remove(), 500);
    }
  });

  // Pull-to-refresh for dashboards
  let startY;
  hammer.on('panstart', (e) => { startY = e.deltaY; });
  hammer.on('panend', (e) => {
    if (e.deltaY > 100 && startY < 0) { // Pull down
      document.querySelector('.dashboard-main').classList.add('pull-refresh');
      setTimeout(() => {
        location.reload(); // Simulate refresh
      }, 1000);
    }
  });
}

// Mobile menu toggle
function toggleMenu() {
  const nav = document.querySelector('nav');
  nav.classList.toggle('active');
  gsap.from(nav, { opacity: 0, y: -20, duration: 0.3 });
}

// Enhanced GSAP for mobile
if (window.innerWidth < 768) {
  gsap.set(".property-card", { y: 50, opacity: 0 });
  gsap.to(".property-card", { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" });
}

// Parallax on scroll (mobile-optimized)
if (document.querySelector(".hero")) {
  gsap.to(".hero", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
}

// Touch feedback
document.addEventListener('touchstart', (e) => {
  if (e.target.classList.contains('btn-primary')) {
    console.log('Haptic feedback: button pressed'); // Simulate haptic
  }
});

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initSwipes();
  // ... existing init code ...
});
