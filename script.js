gsap.registerPlugin(ScrollTrigger);

/* ================= GSAP DEFAULTS ================= */
ScrollTrigger.defaults({ once: true });

/* ================= HERO ================= */
if (document.querySelector(".hero-text")) {
  gsap.from(".hero-text h1", { y: 80, opacity: 0, duration: 1.4, ease: "power4.out" });
  gsap.from(".hero-text p", { y: 40, opacity: 0, delay: 0.3, duration: 1, ease: "power3.out" });
  gsap.from(".search-box", { y: 30, opacity: 0, delay: 0.6, duration: 1, ease: "power3.out" });
}

/* ================= PROPERTY CARDS ================= */
if (document.querySelector(".property-grid")) {
  gsap.from(".property-card", {
    scrollTrigger: { trigger: ".property-grid", start: "top 80%" },
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  });
}

/* ================= BROKERS ================= */
if (document.querySelector(".broker-grid")) {
  gsap.from(".broker-card", {
    scrollTrigger: { trigger: ".broker-grid", start: "top 85%" },
    scale: 0.7,
    opacity: 0,
    duration: 0.9,
    stagger: 0.25,
    ease: "back.out(1.7)"
  });
}

/* ================= WISHLIST ================= */
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.querySelectorAll(".wishlist").forEach(btn => {
  const card = btn.closest(".property-card");
  if (!card) return;

  const item = {
    id: card.dataset.id || card.querySelector("h3")?.innerText.trim(),
    title: card.querySelector("h3")?.innerText,
    price: card.querySelector("p")?.innerText,
    image: card.querySelector("img")?.src
  };

  if (wishlist.some(w => w.id === item.id)) {
    btn.classList.add("active");
    btn.textContent = "❤️";
  }

  btn.addEventListener("click", e => {
    e.stopPropagation();

    const active = btn.classList.toggle("active");
    btn.textContent = active ? "❤️" : "♡";

    if (active && !wishlist.some(w => w.id === item.id)) {
      wishlist.push(item);
    } else if (!active) {
      wishlist = wishlist.filter(w => w.id !== item.id);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });
});

/* ================= THEME TOGGLE ================= */
const toggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

/* ================= PAGE TRANSITION ================= */
const transition = document.getElementById("pageTransition");

function navigate(url) {
  if (!transition) {
    window.location.href = url;
    return;
  }

  gsap.to(transition, {
    y: "0%",
    duration: 0.6,
    ease: "power4.in",
    onComplete: () => window.location.href = url
  });
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

/* ================= PROPERTY CARD CLICK ================= */
function openProperty(e) {
  if (e.target.classList.contains("wishlist")) return;
  navigate("property.html");
}

/* ================= SITE VISIT MODAL ================= */
function openVisitModal() {
  const modal = document.getElementById("visitModal");
  if (!modal) return;

  modal.style.display = "flex";
  gsap.from(".visit-box", {
    scale: 0.7,
    opacity: 0,
    duration: 0.5,
    ease: "back.out(1.7)"
  });
}

function closeVisitModal() {
  const modal = document.getElementById("visitModal");
  if (modal) modal.style.display = "none";
}

/* ================= AUTH / ROLE LOGIN ================= */
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

let notifOpen = false;

function toggleNotifications() {
  const panel = document.getElementById("notificationsPanel");
  const badge = document.getElementById("notifBadge");

  if (!panel) return;

  notifOpen = !notifOpen;

  if (notifOpen) {
    panel.style.display = "block";

    gsap.from(panel, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power3.out"
    });

    // mark as read
    badge.style.display = "none";
    panel.querySelectorAll(".notification-item").forEach(n => {
      n.classList.remove("unread");
    });
  } else {
    panel.style.display = "none";
  }
}

// AI RECOMMENDATIONS ANIMATION
if (document.querySelector(".ai-section")) {
  gsap.from(".ai-card", {
    scrollTrigger: {
      trigger: ".ai-section",
      start: "top 80%"
    },
    y: 50,
    opacity: 0,
    duration: 0.9,
    stagger: 0.2,
    ease: "power3.out"
  });
}

// GOOGLE MAP ANIMATION
if (document.querySelector(".map-box")) {
  gsap.from(".map-box", {
    scrollTrigger: {
      trigger: ".map-box",
      start: "top 85%"
    },
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });
}

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

    const match =
      (!location || location === cardLocation) &&
      (!type || type === cardType) &&
      (!bhk || bhk === cardBhk) &&
      cardPrice >= min &&
      cardPrice <= max;

    card.style.display = match ? "block" : "none";
  });
}

function clearFilters() {
  document.querySelectorAll(".filter-bar select, .filter-bar input")
    .forEach(el => el.value = "");

  document.querySelectorAll(".property-card")
    .forEach(card => card.style.display = "block");
}

let compareList = [];

document.querySelectorAll(".compareBox").forEach(box => {
  box.addEventListener("change", e => {
    const card = e.target.closest(".property-card");
    const title = card.querySelector("h3").innerText;

    if (e.target.checked) {
      if (compareList.length < 2) {
        compareList.push(title);
      } else {
        alert("Only 2 properties can be compared");
        e.target.checked = false;
      }
    } else {
      compareList = compareList.filter(t => t !== title);
    }

    updateCompareBar();
  });
});

function updateCompareBar() {
  const bar = document.getElementById("compareBar");
  const count = document.getElementById("compareCount");

  count.innerText = compareList.length;

  bar.style.display = compareList.length > 0 ? "flex" : "none";
}

function goToCompare() {
  localStorage.setItem("compare", JSON.stringify(compareList));
  navigate("compare.html");
}

// ===== AI COMPARE LOGIC =====
if (window.location.pathname.includes("compare.html")) {
  const data = JSON.parse(localStorage.getItem("compare")) || [];

  // demo data (same order as index.html)
  const properties = {
    "Luxury Villa": {
      price: 24000000,
      location: "Mumbai",
      type: "Villa",
      bhk: 4
    },
    "Premium Flat": {
      price: 8500000,
      location: "Delhi",
      type: "Apartment",
      bhk: 3
    }
  };

  const [p1, p2] = data;

  if (p1 && p2) {
    document.getElementById("p1").innerText = p1;
    document.getElementById("p2").innerText = p2;

    document.getElementById("price1").innerText = "₹" + properties[p1].price;
    document.getElementById("price2").innerText = "₹" + properties[p2].price;

    document.getElementById("loc1").innerText = properties[p1].location;
    document.getElementById("loc2").innerText = properties[p2].location;

    document.getElementById("type1").innerText = properties[p1].type;
    document.getElementById("type2").innerText = properties[p2].type;

    document.getElementById("bhk1").innerText = properties[p1].bhk;
    document.getElementById("bhk2").innerText = properties[p2].bhk;

    // AI verdict
    const verdict = document.getElementById("aiVerdict");

    verdict.innerText =
      properties[p1].price < properties[p2].price
        ? `🧠 AI Suggests: ${p1} is better value for money`
        : `🧠 AI Suggests: ${p2} offers a more premium lifestyle`;
  }
}

function shareProperty(e) {
  e.stopPropagation(); // card click block

  const card = e.target.closest(".property-card");
  if (!card) return;

  const title = card.querySelector("h3").innerText;
  const price = card.querySelector("p").innerText;

  const message = `🏠 ${title}\n💰 ${price}\nCheck this property on Grey Deal`;
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

