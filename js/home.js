/* Home page: fill the area dropdown and show the top 3 rated rooms */
(function () {
  const sel = document.getElementById("h-area");
  if (sel) sel.insertAdjacentHTML("beforeend", AREAS.map(a => `<option value="${a}">${a}</option>`).join(""));
  const f = document.getElementById("featured");
  if (f) f.innerHTML = [...LISTINGS].sort((a, b) => b.rating - a.rating).slice(0, 3).map(roomCard).join("");
})();
