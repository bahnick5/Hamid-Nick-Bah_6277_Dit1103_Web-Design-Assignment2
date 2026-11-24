/* FindHome SL – sample listings (fictional demo data for coursework).
   Replace phone numbers / WhatsApp numbers with real ones before going live. */
const CAMPUS = { name: "Limkokwing University (approx.)", lat: 8.4527, lng: -13.2640 };
const LISTINGS = [
  { id: 1, name: "Hill View Student Lodge", area: "Hill Station", type: "Single room", price: 1800, distance: 0.8, rating: 4.7, verified: true, facilities: ["Water", "Electricity", "Security", "Wi-Fi"], landlord: "Mr. Bangura", phone: "+23276000001", lat: 8.4510, lng: -13.2680, desc: "A quiet lodge a short walk from campus with a study desk, solar backup power and a night guard." },
  { id: 2, name: "Wilberforce Shared House", area: "Wilberforce", type: "Shared room", price: 950, distance: 2.4, rating: 4.3, verified: true, facilities: ["Water", "Security"], landlord: "Mrs. Kamara", phone: "+23276000002", lat: 8.4650, lng: -13.2500, desc: "Affordable two-person rooms in a friendly student house with a shared kitchen and lounge." },
  { id: 3, name: "Lumley Beach Studio", area: "Lumley", type: "Studio", price: 3400, distance: 7.5, rating: 4.8, verified: true, facilities: ["Water", "Electricity", "Security", "Wi-Fi"], landlord: "Mr. Conteh", phone: "+23276000003", lat: 8.4480, lng: -13.2840, desc: "Self-contained studio with its own bathroom and kitchenette, close to the beach and public transport." },
  { id: 4, name: "Congo Cross Campus Hostel", area: "Congo Cross", type: "Hostel", price: 700, distance: 3.1, rating: 4.0, verified: false, facilities: ["Water", "Security"], landlord: "Agent Sesay", phone: "+23276000004", lat: 8.4800, lng: -13.2380, desc: "Budget hostel beds for first-year students, with weekly cleaning and a guarded gate." },
  { id: 5, name: "Aberdeen Ridge Residence", area: "Aberdeen", type: "Single room", price: 2300, distance: 5.2, rating: 4.5, verified: true, facilities: ["Water", "Electricity", "Security", "Wi-Fi"], landlord: "Mr. Jalloh", phone: "+23276000005", lat: 8.4900, lng: -13.2780, desc: "Modern single rooms with fast Wi-Fi, a study hall and reliable power, ideal for final-year project work." },
  { id: 6, name: "Goderich Garden Rooms", area: "Goderich", type: "Single room", price: 1500, distance: 9.8, rating: 4.1, verified: false, facilities: ["Water", "Electricity", "Security"], landlord: "Mrs. Turay", phone: "+23276000006", lat: 8.4150, lng: -13.2980, desc: "Peaceful garden-side rooms. Further from campus, but with cheaper rent." },
  { id: 7, name: "Hill Station Duo Apartment", area: "Hill Station", type: "Studio", price: 2900, distance: 0.5, rating: 4.6, verified: true, facilities: ["Water", "Electricity", "Security", "Wi-Fi"], landlord: "Mr. Bangura", phone: "+23276000007", lat: 8.4535, lng: -13.2655, desc: "Compact apartment for one or two students, steps from the campus gate." },
  { id: 8, name: "Kissy Bright Hostel", area: "Kissy", type: "Hostel", price: 600, distance: 11.0, rating: 3.9, verified: false, facilities: ["Water"], landlord: "Agent Koroma", phone: "+23276000008", lat: 8.4600, lng: -13.1920, desc: "The most affordable option. Basic beds and a shared bathroom, with minibus links to the city." }
];
const AREAS = [...new Set(LISTINGS.map(l => l.area))].sort();
const FACILITIES = ["Water", "Electricity", "Security", "Wi-Fi"];
const fmtLe = n => "NLe " + Number(n).toLocaleString("en-US");
// Generated illustrative room photos for the sample listings (not verified property photos).
const imgOf = (id, n = 1) => `assets/img/bedroom-${(((id - 1) * 3 + (n - 1)) % 9) + 1}.jpg`;

/* Favourites (localStorage, wrapped in try/catch) */
const Favs = {
  get() { try { return JSON.parse(localStorage.getItem("fh_favs") || "[]"); } catch (e) { return []; } },
  has(id) { return this.get().includes(id); },
  toggle(id) {
    let f = this.get();
    f = f.includes(id) ? f.filter(x => x !== id) : [...f, id];
    try { localStorage.setItem("fh_favs", JSON.stringify(f)); } catch (e) {}
    return f.includes(id);
  }
};

function roomCard(l) {
  const fav = Favs.has(l.id);
  return `<article class="card listing-card" data-id="${l.id}">
    <div class="listing-img">
      <img src="${imgOf(l.id)}" alt="Illustrative room interior for ${l.name} in ${l.area}" loading="lazy" width="640" height="400">
      <button class="fav-btn" aria-pressed="${fav}" aria-label="Save ${l.name} to favourites" data-fav="${l.id}">${fav ? "♥" : "♡"}</button>
    </div>
    <div class="card-body">
      <div>${l.verified ? '<span class="badge">✔ Verified</span>' : ""}<span class="badge">${l.type}</span></div>
      <h3>${l.name}</h3>
      <p class="meta">📍 ${l.area} · ${l.distance} km from campus · ★ ${l.rating}</p>
      <p class="price">${fmtLe(l.price)} <small>/ month</small></p>
      <a class="btn small" href="room.html?id=${l.id}">View room</a>
    </div>
  </article>`;
}

/* One delegated handler for all heart buttons on a page */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-fav]");
  if (!b) return;
  const on = Favs.toggle(Number(b.dataset.fav));
  b.setAttribute("aria-pressed", on);
  b.textContent = on ? "♥" : "♡";
  if (window.showToast) showToast(on ? "Saved to favourites" : "Removed from favourites");
  document.dispatchEvent(new CustomEvent("favs-changed"));
});
