const grid = document.getElementById("propertyGrid");

grid.innerHTML = properties.map(p => `
  <div class="property-card">
    <img src="${p.images[0]}">
    <div class="card-body">
      <span class="badge">${p.status}</span>
      <h3>${p.title}</h3>
      <p>${formatPrice(p.price)} • ${p.location}</p>

      <div class="card-actions">
        <button onclick="toggleWishlist('${p.id}')">
          ${isWishlisted(p.id) ? "❤️" : "♡"}
        </button>
        <button onclick="location.href='property.html?id=${p.id}'">
          View
        </button>
      </div>
    </div>
  </div>
`).join("");
