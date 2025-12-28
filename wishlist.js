// THEME SYNC
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

// LOAD WISHLIST
const wishlistGrid = document.getElementById("wishlistGrid");
const emptyMsg = document.getElementById("emptyMsg");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

if (wishlist.length === 0) {
  emptyMsg.style.display = "block";
}

wishlist.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "property-card";

  card.innerHTML = `
    <img src="${item.image}">
    <div class="card-body">
      <h3>${item.title}</h3>
      <p>${item.price}</p>

      <div class="card-actions">
        <button class="btn-outline remove">Remove</button>
      </div>
    </div>
  `;

  // open property
  card.addEventListener("click", () => {
    window.location.href = "property.html";
  });

  // remove
  card.querySelector(".remove").addEventListener("click", e => {
    e.stopPropagation();
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    location.reload();
  });

  wishlistGrid.appendChild(card);
});

// GSAP ENTRY
gsap.from(".property-card", {
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out"
});
