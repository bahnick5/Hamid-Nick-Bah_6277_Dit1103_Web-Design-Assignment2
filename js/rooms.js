/* Find a Room: live search, filters, sorting, favourites-only view */
(function () {
  const $ = id => document.getElementById(id);
  const grid = $("results"), count = $("count");
  if (!grid) return;

  // Fill dropdown + facility checkboxes
  $("f-area").insertAdjacentHTML("beforeend", AREAS.map(a => `<option value="${a}">${a}</option>`).join(""));
  $("f-fac").innerHTML = FACILITIES.map(f => `<label class="check"><input type="checkbox" value="${f}"> ${f}</label>`).join("");

  // Pre-fill from home-page search (?area=&max=)
  const q = new URLSearchParams(location.search);
  if (q.get("area")) $("f-area").value = q.get("area");
  if (q.get("max")) $("f-price").value = q.get("max");

  function apply() {
    const text = $("f-text").value.trim().toLowerCase();
    const area = $("f-area").value;
    const max = Number($("f-price").value) || Infinity;
    const dist = Number($("f-dist").value) || Infinity;
    const need = [...document.querySelectorAll("#f-fac input:checked")].map(i => i.value);
    const verified = $("f-verified").checked;
    const favsOnly = $("f-favs").checked;
    const favs = Favs.get();

    let list = LISTINGS.filter(l =>
      (!text || (l.name + " " + l.area + " " + l.type).toLowerCase().includes(text)) &&
      (!area || l.area === area) && l.price <= max && l.distance <= dist &&
      need.every(n => l.facilities.includes(n)) &&
      (!verified || l.verified) && (!favsOnly || favs.includes(l.id)));

    const sort = $("f-sort").value;
    list.sort({
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "distance": (a, b) => a.distance - b.distance,
      "rating": (a, b) => b.rating - a.rating
    }[sort]);

    count.textContent = list.length + (list.length === 1 ? " room found" : " rooms found");
    grid.innerHTML = list.length ? list.map(roomCard).join("") :
      `<div class="empty" style="grid-column:1/-1"><h3>No rooms match yet</h3><p>Try a higher budget, a bigger distance or fewer facilities.</p><button class="btn" id="reset-btn" type="button">Reset filters</button></div>`;
  }

  document.querySelector(".toolbar").addEventListener("input", apply);
  document.querySelector(".toolbar").addEventListener("change", apply);
  document.addEventListener("click", e => {
    if (e.target.id === "reset-btn" || e.target.id === "reset-top") {
      document.querySelector(".toolbar").reset();
      apply();
    }
  });
  document.addEventListener("favs-changed", () => { if ($("f-favs").checked) apply(); });
  apply();
})();
