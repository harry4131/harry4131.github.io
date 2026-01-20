// =======================================
// AUTO SYSTEM DARK MODE + MANUAL TOGGLE
// =======================================

const darkBtn = document.querySelector(".dark-btn");
const html = document.documentElement;

// detect system theme
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

// apply theme
function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (darkBtn) darkBtn.textContent = theme === "dark" ? "☀️" : "🌙";
}

// first load
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(systemDark.matches ? "dark" : "light");
}

// listen system theme change (real-time)
systemDark.addEventListener("change", e => {
  if (!localStorage.getItem("theme")) {
    applyTheme(e.matches ? "dark" : "light");
  }
});

// manual toggle
if (darkBtn) {
  darkBtn.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}
