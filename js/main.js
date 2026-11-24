/* FindHome SL – shared behaviour: mobile menu, dark mode, toast, footer year */
(function () {
  const root = document.documentElement;
  try { const t = localStorage.getItem("fh_theme"); if (t) root.setAttribute("data-theme", t); } catch (e) {}

  document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile hamburger menu
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open);
        toggle.textContent = open ? "✕" : "☰";
      });
      document.addEventListener("keydown", e => {
        if (e.key === "Escape" && links.classList.contains("open")) { toggle.click(); toggle.focus(); }
      });
    }
    // 2. Dark / light theme toggle (remembered)
    const btn = document.querySelector(".theme-btn");
    const label = () => { if (btn) btn.textContent = root.getAttribute("data-theme") === "dark" ? "☀ Light" : "☾ Dark"; };
    label();
    if (btn) btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("fh_theme", next); } catch (e) {}
      label();
    });
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });

  window.showToast = function (msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2200);
  };
})();
