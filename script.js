// ===== 1. Dark mode toggle =====
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

// Use the saved choice, or the device setting if there isn't one
let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// ===== 2. Screenshot viewer (lightbox) =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".shot").forEach((button) => {
  const img = button.querySelector("img");

  // If a screenshot file is missing, show a hint instead of a broken image
  img.addEventListener("error", () => {
    const fileName = img.getAttribute("src");
    button.classList.add("missing");
    button.textContent = "Add your screenshot as " + fileName;
  });

  button.addEventListener("click", () => {
    if (button.classList.contains("missing")) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
  });
});

document.getElementById("closeLightbox").addEventListener("click", () => lightbox.close());
// Clicking the dark area around the picture also closes it
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.close();
});

// ===== 3. Trip countdown =====
// EDIT: change this to the date you'd like to take your trip
const tripDate = new Date("2028-04-01");
const daysLeft = Math.ceil((tripDate - new Date()) / (1000 * 60 * 60 * 24));
document.getElementById("countdown").textContent =
  daysLeft > 0 ? daysLeft + " days until my target departure." : "Time to book the ticket!";

// ===== 4. Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
