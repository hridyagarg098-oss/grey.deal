// Render Properties
const propertyGrid = document.querySelector(".property-grid");

propertyGrid.innerHTML = properties.map(p => `
  <div class="property-card">
    <img src="${p.image}" alt="Property">
    <div class="card-body">
      <h3>${p.title}</h3>
      <p class="price">${p.price}</p>
      <p class="meta">${p.bhk} • ${p.location}</p>
    </div>
  </div>
`).join("");

// Render Brokers
const brokerGrid = document.querySelector(".broker-grid");

brokerGrid.innerHTML = brokers.map(b => `
  <div class="broker-card">
    <img src="${b.photo}" alt="${b.name}">
    <h4>${b.name}</h4>
    <p>${b.experience}</p>
    <div class="stars">
      ${"⭐".repeat(Math.round(b.rating))}
      <span>(${b.rating})</span>
    </div>
  </div>
`).join("");
const grid = document.querySelector(".property-grid");

function toggleWishlist(id){
  wishlist.includes(id)
    ? wishlist = wishlist.filter(x => x !== id)
    : wishlist.push(id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function renderProperties() {
  grid.innerHTML = "";

  properties.forEach(p => {
    const broker = brokers.find(b => b.id === p.brokerId);
    const saved = wishlist.includes(p.id);

    grid.innerHTML += `
      <div class="property-card">
        <img src="${p.images[0]}" alt="Property">
        <div class="card-body">
          <h3>${p.title}</h3>
          <p class="price">₹ ${(p.price/100000).toFixed(1)} Cr</p>
          <p class="location">${p.location}</p>
          <p class="broker">Broker: ${broker.name} ${broker.verified ? "✔" : ""}</p>
          <div class="card-actions">
            <button onclick="location.href='property.html?id=${p.id}'">View</button>
            <button onclick="toggleWishlist(${p.id})">${saved ? "💖" : "🤍"}</button>
          </div>
        </div>
      </div>
    `;
  });
}

renderProperties();
