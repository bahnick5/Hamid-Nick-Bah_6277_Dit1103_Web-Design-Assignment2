/* Form validation for Contact and List-a-Room forms */
(function () {
  const rules = {
    required: (v, el) => (el.type === "checkbox" ? el.checked : v.trim() !== "") || "This field is required.",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "Enter a valid email, e.g. name@example.com.",
    // Sierra Leone numbers: +232 or 0 followed by 8 digits
    slphone: v => /^(\+232|0)\d{8}$/.test(v.replace(/[\s-]/g, "")) || "Use a Sierra Leone number, e.g. +232 76 123456 or 076 123456.",
    min: (v, el) => v.trim().length >= Number(el.dataset.min) || `Please write at least ${el.dataset.min} characters.`,
    price: v => (Number(v) >= 100 && Number(v) <= 20000) || "Enter a monthly price between 100 and 20,000 NLe.",
    name: v => /^[A-Za-z][A-Za-z .'-]{1,59}$/.test(v.trim()) || "Use letters only (2–60 characters)."
  };

  function check(el) {
    const field = el.closest(".field") || el.closest(".check");
    const msg = field.querySelector(".error-msg");
    let err = "";
    const list = (el.dataset.rules || "").split(" ").filter(Boolean);
    const value = el.value || "";
    for (const r of list) {
      if (r !== "required" && value.trim() === "" && !list.includes("required")) continue;
      const res = rules[r](value, el);
      if (res !== true) { err = res; break; }
    }
    field.classList.toggle("invalid", !!err);
    el.setAttribute("aria-invalid", !!err);
    if (msg) msg.textContent = err;
    return !err;
  }

  document.querySelectorAll("form[data-validate]").forEach(form => {
    const inputs = [...form.querySelectorAll("[data-rules]")];
    inputs.forEach(i => { i.addEventListener("blur", () => check(i)); i.addEventListener("input", () => { if (i.closest(".invalid")) check(i); }); });

    // Photo preview + validation (List a Room)
    const photos = form.querySelector("#photos");
    if (photos) photos.addEventListener("change", () => {
      const prev = form.querySelector("#preview"), msg = form.querySelector("#photos-err");
      prev.innerHTML = ""; msg.textContent = "";
      const files = [...photos.files];
      if (files.length > 5) { msg.textContent = "Please choose at most 5 photos."; photos.value = ""; return; }
      for (const f of files) {
        if (!/^image\/(jpeg|png|webp)$/.test(f.type)) { msg.textContent = "Only JPG, PNG or WebP images are allowed."; photos.value = ""; prev.innerHTML = ""; return; }
        if (f.size > 2 * 1024 * 1024) { msg.textContent = `"${f.name}" is bigger than 2 MB. Please compress it to save data.`; photos.value = ""; prev.innerHTML = ""; return; }
        const img = document.createElement("img"); img.src = URL.createObjectURL(f); img.alt = "Preview of " + f.name;
        img.style.cssText = "width:90px;height:70px;object-fit:cover;border-radius:8px"; prev.appendChild(img);
      }
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      const bad = inputs.filter(i => !check(i));
      if (bad.length) {
        status.className = "form-status bad";
        status.textContent = `Please fix ${bad.length} ${bad.length === 1 ? "problem" : "problems"} highlighted above.`;
        bad[0].focus();
        return;
      }
      // Demo only: store the enquiry in the browser. Swap for Formspree/Netlify Forms when deploying.
      const data = Object.fromEntries(new FormData(form).entries());
      delete data.photos;
      try {
        const key = "fh_" + form.dataset.validate;
        const all = JSON.parse(localStorage.getItem(key) || "[]");
        all.push({ ...data, at: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(all));
      } catch (err) {}
      status.className = "form-status ok";
      status.textContent = form.dataset.success;
      form.reset();
      const prev = form.querySelector("#preview"); if (prev) prev.innerHTML = "";
      status.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
})();
