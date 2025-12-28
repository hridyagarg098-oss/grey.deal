gsap.registerPlugin(ScrollTrigger);

/* ================= HERO IMAGE ================= */
if (document.querySelector(".property-hero img")) {
  gsap.from(".property-hero img", {
    scale: 1.2,
    duration: 1.5,
    ease: "power4.out"
  });
}

/* ================= TITLE ================= */
if (document.querySelector(".property-title")) {
  gsap.from(".property-title", {
    y: 60,
    opacity: 0,
    delay: 0.4,
    duration: 1,
    ease: "power3.out"
  });
}

/* ================= PROPERTY INFO ================= */
if (document.querySelector(".property-info")) {
  gsap.from(".property-info", {
    scrollTrigger: {
      trigger: ".property-info",
      start: "top 80%",
      once: true
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
}

/* ================= GALLERY ================= */
if (document.querySelector(".property-gallery")) {
  gsap.from(".property-gallery img", {
    scrollTrigger: {
      trigger: ".property-gallery",
      start: "top 85%",
      once: true
    },
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
  });
}

/* ================= PRICE COUNT ================= */
const priceEl = document.getElementById("price");

if (priceEl) {
  gsap.from(priceEl, {
    innerText: 0,
    duration: 1.5,
    ease: "power1.out",
    snap: { innerText: 1 },
    scrollTrigger: {
      trigger: ".property-info",
      start: "top 80%",
      once: true
    }
  });
}

/* ================= EMI CALCULATOR ================= */
function calculateEMI() {
  const propertyPrice = +document.getElementById("priceInput").value;
  const downPayment = +document.getElementById("downPayment").value;
  const interest = +document.getElementById("interestRate").value;
  const tenureYears = +document.getElementById("tenure").value;

  // basic validation
  if (
    propertyPrice <= 0 ||
    downPayment < 0 ||
    downPayment >= propertyPrice ||
    interest <= 0 ||
    tenureYears <= 0
  ) {
    alert("Please enter valid EMI details");
    return;
  }

  const loanAmount = propertyPrice - downPayment;
  const monthlyRate = interest / 12 / 100;
  const months = tenureYears * 12;

  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  gsap.to("#emiValue", {
    innerText: Math.round(emi),
    duration: 1,
    ease: "power2.out",
    snap: { innerText: 1 }
  });
}
