/* Room Details (major feature): gallery, map, WhatsApp / call buttons */
(function () {
  const box = document.getElementById("room");
  if (!box) return;
  const id = Number(new URLSearchParams(location.search).get("id")) || 1;
  const l = LISTINGS.find(x => x.id === id);
  if (!l) {
    box.innerHTML = `<div class="empty"><h2>Room not found</h2><p>This room may have been removed.</p><a class="btn" href="rooms.html">Back to all rooms</a></div>`;
    return;
  }
  document.title = l.name + " | FindHome SL";
  const wa = l.phone.replace(/\D/g, "");
  const msg = encodeURIComponent(`Hello ${l.landlord}, I found "${l.name}" (${fmtLe(l.price)}/month) on FindHome SL. Is it still available?`);
  const pad = 0.012;
  const bbox = [l.lng - pad, l.lat - pad, l.lng + pad, l.lat + pad].join(",");
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${l.lat},${l.lng}`;
  const mapLink = `https://www.openstreetmap.org/?mlat=${l.lat}&mlon=${l.lng}#map=16/${l.lat}/${l.lng}`;

  box.innerHTML = `
    <a href="rooms.html">← Back to all rooms</a>
    <div class="split" style="margin-top:1rem;align-items:start">
      <div>
        <div class="card"><img id="main-img" src="${imgOf(l.id, 1)}" alt="Illustrative room interior for ${l.name}" width="640" height="400"></div>
        <div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:.8rem" role="group" aria-label="Photo thumbnails">
          ${[1, 2, 3].map(n => `<button class="card thumb" data-n="${n}" style="padding:0;cursor:pointer;border:2px solid ${n === 1 ? "var(--amber)" : "var(--line)"}" aria-label="Show photo ${n}"><img src="${imgOf(l.id, n)}" alt="Illustrative room photo ${n}" width="200" height="125"></button>`).join("")}
        </div>
      </div>
      <div>
        <div>${l.verified ? '<span class="badge">✔ Verified landlord</span>' : '<span class="badge">Not yet verified – visit with a friend</span>'}<span class="badge">${l.type}</span></div>
        <h1 style="font-size:2rem">${l.name}</h1>
        <p class="meta">📍 ${l.area}, Freetown · ${l.distance} km from campus · ★ ${l.rating}</p>
        <p class="price" style="font-size:1.8rem">${fmtLe(l.price)} <small>/ month</small></p>
        <p>${l.desc}</p><p class="hint">Photo note: these are illustrative sample images, not verified photos of this specific property. Confirm the actual room in person before paying.</p>
        <h3>Facilities</h3>
        <p>${FACILITIES.map(f => `<span class="badge" style="${l.facilities.includes(f) ? "" : "opacity:.4;text-decoration:line-through"}">${f}</span>`).join("")}</p>
        <p class="meta">Landlord / agent: <strong>${l.landlord}</strong></p>
        <div class="btn-row">
          <a class="btn" href="https://wa.me/${wa}?text=${msg}" target="_blank" rel="noopener">💬 WhatsApp landlord</a>
          <a class="btn secondary" href="tel:${l.phone}">📞 Call</a>
          <button class="btn secondary" type="button" data-fav="${l.id}" aria-pressed="${Favs.has(l.id)}">${Favs.has(l.id) ? "♥ Saved" : "♡ Save"}</button>
        </div>
        <p class="hint" style="margin-top:1rem">Safety tip: never pay a deposit before you have seen the room in person.</p>
      </div>
    </div>
    <section style="margin-top:2.5rem">
      <h2>Location &amp; distance to campus</h2>
      <p class="meta">About <strong>${l.distance} km</strong> from ${CAMPUS.name}. Map position is approximate. <a href="${mapLink}" target="_blank" rel="noopener">Open larger map</a></p>
      <div class="card"><iframe title="Map showing ${l.name}" src="${mapSrc}" width="100%" height="340" style="border:0" loading="lazy"></iframe></div>
    </section>`;

  // Thumbnail gallery
  box.addEventListener("click", e => {
    const t = e.target.closest(".thumb");
    if (!t) return;
    document.getElementById("main-img").src = imgOf(l.id, t.dataset.n);
    box.querySelectorAll(".thumb").forEach(x => x.style.borderColor = x === t ? "var(--amber)" : "var(--line)");
  });
  // Keep the Save button label in step
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-fav]");
    if (b && b.classList.contains("btn")) b.textContent = b.getAttribute("aria-pressed") === "true" ? "♥ Saved" : "♡ Save";
  });
})();
