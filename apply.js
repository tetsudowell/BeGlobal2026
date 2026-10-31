const header = document.querySelector(".site-header");
const hamburger = document.querySelector(".hamburger");
const globalNav = document.querySelector(".global-nav");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".global-nav a");
const programTabs = document.querySelectorAll(".program-tab");
const documentPanels = document.querySelectorAll(".document-panel");

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

hamburger.addEventListener("click", toggleMenu);
menuOverlay.addEventListener("click", closeMenu);
menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

programTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedProgram = tab.dataset.program;

    programTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    documentPanels.forEach((panel) => {
      const isActive = panel.id === `${selectedProgram}-program`;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  });
});
