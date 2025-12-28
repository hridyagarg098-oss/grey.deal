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

// GSAP ENTRY
gsap.from(".sidebar", {
  x: -60,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from(".stat-card", {
  y: 40,
  opacity: 0,
  stagger: 0.15,
  duration: 0.6,
  ease: "power3.out"
});

// MOBILE NAV ENTRY
if (window.innerWidth < 768) {
  gsap.from(".mobile-nav", {
    y: 80,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  });
}
