const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
  const expanded = navLinks?.classList.contains("open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(expanded));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks?.classList.remove("open"));
});

const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];

const updateActiveNav = () => {
  const marker = window.scrollY + 180;
  let current = sections[0]?.id;

  for (const section of sections) {
    if (section.offsetTop <= marker) current = section.id;
  }

  navItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === "#" + current);
  });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();
