/* FAQ accordion (one panel open at a time, keyboard accessible) */
(function () {
  const btns = document.querySelectorAll(".accordion-btn");
  btns.forEach(b => b.addEventListener("click", () => {
    const open = b.getAttribute("aria-expanded") === "true";
    btns.forEach(x => x.setAttribute("aria-expanded", "false"));
    b.setAttribute("aria-expanded", String(!open));
  }));
})();
