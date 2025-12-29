// ================= CORE UTILITIES =================

// THEME
const themeToggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

// PRICE FORMAT
function formatPrice(price) {
  return price >= 10000000
    ? `₹ ${(price / 10000000).toFixed(1)} Cr`
    : `₹ ${(price / 100000).toFixed(0)} L`;
}

// WISHLIST
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(x => x !== id);
  } else {
    wishlist.push(id);
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  location.reload();
}

function isWishlisted(id) {
  return wishlist.includes(id);
}
