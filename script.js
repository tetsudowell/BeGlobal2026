const header = document.querySelector(".site-header");
const hamburger = document.querySelector(".hamburger");
const globalNav = document.querySelector(".global-nav");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".global-nav a");
const slides = [...document.querySelectorAll(".slide")];
const currentSlide = document.querySelector(".current-slide");
const previousButton = document.querySelector(".slider-button.prev");
const nextButton = document.querySelector(".slider-button.next");

let activeSlide = 0;
let autoplayTimer;

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeMenu() {
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "メニューを開く");
  hamburger.classList.remove("active");
  globalNav.classList.remove("open");
  menuOverlay.classList.remove("open");
  menuOverlay.setAttribute("aria-hidden", "true");
  header.classList.remove("menu-active");
  document.body.classList.remove("menu-open");
}

function toggleMenu() {
  const isOpen = hamburger.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeMenu();
    return;
  }

  hamburger.setAttribute("aria-expanded", "true");
  hamburger.setAttribute("aria-label", "メニューを閉じる");
  hamburger.classList.add("active");
  globalNav.classList.add("open");
  menuOverlay.classList.add("open");
  menuOverlay.setAttribute("aria-hidden", "false");
  header.classList.add("menu-active");
  document.body.classList.add("menu-open");
}

function showSlide(index) {
  slides[activeSlide].classList.remove("is-active");
  activeSlide = (index + slides.length) % slides.length;
  slides[activeSlide].classList.add("is-active");
  currentSlide.textContent = String(activeSlide + 1).padStart(2, "0");
}

function startAutoplay() {
  window.clearInterval(autoplayTimer);
  autoplayTimer = window.setInterval(() => showSlide(activeSlide + 1), 6000);
}

function changeSlide(direction) {
  showSlide(activeSlide + direction);
  startAutoplay();
}

window.addEventListener("scroll", updateHeader, { passive: true });
hamburger.addEventListener("click", toggleMenu);
menuOverlay.addEventListener("click", closeMenu);
menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
previousButton.addEventListener("click", () => changeSlide(-1));
nextButton.addEventListener("click", () => changeSlide(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
  if (event.key === "ArrowLeft") changeSlide(-1);
  if (event.key === "ArrowRight") changeSlide(1);
});

updateHeader();
startAutoplay();
