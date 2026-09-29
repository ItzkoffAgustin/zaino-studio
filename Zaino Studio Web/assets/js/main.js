/* =====================================================================
   ZAINO STUDIO — main.js
   Navegación, animaciones, colección de cortes y reservas por WhatsApp.
   Todos los datos del negocio salen de config.js (window.ZAINO).
   ===================================================================== */
(function () {
  "use strict";
  const CFG = window.ZAINO || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  /* ---------------- Helpers ---------------- */
  const pad = (n) => String(n).padStart(2, "0");
  const toMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  const fromMin = (m) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
  // 0 = Lunes ... 6 = Domingo (coincide con el orden de CFG.hours)
  const isoDay = (date) => (date.getDay() + 6) % 7;
  const localDateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseLocal = (str) => { const [y, m, d] = str.split("-").map(Number); return new Date(y, m - 1, d); };
  const waNumber = (CFG.whatsapp || "").replace(/\D/g, "");
  const waUrl = (text) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  const b = CFG.business || {};

  /* ================= PRELOADER ================= */
  const preloader = $("#preloader");
  const hidePreloader = () => preloader && preloader.classList.add("is-done");
  window.addEventListener("load", () => setTimeout(hidePreloader, 400));
  setTimeout(hidePreloader, 3500); // respaldo

  /* ================= HEADER / scroll ================= */
  const header = $("#header");
  const floatWa = $("#floatWa");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
    floatWa.classList.toggle("is-visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ================= MENÚ MÓVIL ================= */
  const burger = $("#burger");
  const mobileMenu = $("#mobileMenu");
  const toggleMenu = (open) => {
    const isOpen = open ?? !mobileMenu.classList.contains("is-open");
    mobileMenu.classList.toggle("is-open", isOpen);
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggleMenu());
  $$(".mobile-menu__link, .mobile-menu__cta").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* ================= SERVICIOS ================= */
  const SERVICE_ICONS = {
    corte:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>',
    combo:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 6c4 0 6 2 9 2s3-2 9-2"/><path d="M3 6c0 6 3 11 9 13 6-2 9-7 9-13"/><path d="M9 11c1 1 2 1.5 3 1.5S14 12 15 11"/></svg>',
    barba:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 14c0-4 4-8 8-8s8 4 8 8"/><path d="M4 14c0 3 3 5 8 5s8-2 8-5"/><path d="M9 9c.5 1 1.5 1.5 3 1.5S14.5 10 15 9"/></svg>',
    asesor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="8" r="4"/><path d="M5 21c0-4 3-6 7-6s7 2 7 6"/></svg>',
  };
  const servicesGrid = $("#servicesGrid");
  const services = CFG.services || [];
  if (servicesGrid) {
    servicesGrid.innerHTML = services.map((s) => `
      <article class="service-card reveal">
        <div class="service-card__icon">${SERVICE_ICONS[s.key] || SERVICE_ICONS.corte}</div>
        <h3 class="service-card__name">${esc(s.name)}</h3>
        <p class="service-card__desc">${esc(s.desc)}</p>
        <div class="service-card__meta">
          <span class="service-card__dur">${esc(s.duration)}</span>
          <span class="service-card__price">${esc(s.price)}</span>
        </div>
      </article>`).join("");
  }

  /* ================= COLECCIÓN DE CORTES ================= */
  const cuts = CFG.cuts || [];
  const collectionGrid = $("#collectionGrid");
  if (collectionGrid) {
    collectionGrid.innerHTML = cuts.map((c) => `
      <article class="cut-card reveal">
        <div class="cut-card__media">
          <img src="assets/img/cuts/${esc(c.slug)}.jpg" alt="${esc(c.name)}" loading="lazy" />
        </div>
        <div class="cut-card__body">
          <span class="cut-card__n">${esc(c.n)}</span>
          <h3 class="cut-card__name">${esc(c.name)}</h3>
          <p class="cut-card__desc">${esc(c.desc)}</p>
        </div>
      </article>`).join("");
  }

  /* ================= CIFRAS DEL HERO ================= */
  const heroStats = $("#heroStats");
  const stats = CFG.stats || [];
  if (heroStats) {
    if (!stats.length) heroStats.remove();
    else heroStats.innerHTML = stats.map((s) => `
      <div class="stat">
        <span class="stat__num" data-count="${Number(s.value) || 0}" data-suffix="${esc(s.suffix || "")}">0</span>
        <span class="stat__label">${esc(s.label)}</span>
      </div>`).join("");
  }

  const animateCount = (el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || "";
    const dur = 1600, start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("es-UY") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { animateCount(e.target); countObserver.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  $$(".stat__num").forEach((el) => countObserver.observe(el));

  /* ================= REVEAL al hacer scroll ================= */
  const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); revealObserver.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 5) * 60}ms`;
    revealObserver.observe(el);
  });

  /* ================= NAV activo ================= */
  const navLinks = $$(".nav__link");
  const sectionMap = {};
  navLinks.forEach((l) => {
    const sec = document.getElementById(l.getAttribute("href").slice(1));
    if (sec) sectionMap[sec.id] = l;
  });
  const navObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("is-active"));
        const link = sectionMap[e.target.id];
        if (link) link.classList.add("is-active");
      }
    }), { threshold: 0.4 }
  );
  Object.keys(sectionMap).forEach((id) => navObserver.observe(document.getElementById(id)));

  /* ================= DATOS DEL NEGOCIO ================= */
  const yearEl = $("#year"); if (yearEl) yearEl.textContent = new Date().getFullYear();

  const todayIdx = isoDay(new Date());
  const renderHours = (ul) => {
    if (!ul || !CFG.hours) return;
    ul.innerHTML = CFG.hours.map((h, i) => {
      const closed = /cerrado/i.test(h.open);
      const val = closed ? "Cerrado" : `${h.open} – ${h.close}`;
      return `<li class="${i === todayIdx ? "is-today" : ""}"><span>${esc(h.day)}</span><span>${val}</span></li>`;
    }).join("");
  };
  renderHours($("#hoursList"));
  renderHours($("#hoursList2"));

  const greeting = `Hola ${b.name || "ZAINO studio"}! 👋 Quiero hacer una consulta.`;
  if (floatWa) floatWa.href = waUrl(greeting);

  // Teléfono
  const phoneLink = $("#phoneLink");
  if (phoneLink) {
    phoneLink.textContent = b.phoneDisplay || "";
    phoneLink.href = waNumber ? `tel:+${waNumber}` : "#";
  }

  // Dirección + mapa. Si no hay dirección cargada, se ocultan ambos.
  const mapQuery = b.mapQuery || [b.address, b.city].filter(Boolean).join(" ");
  if (b.address) {
    if ($("#addressText")) $("#addressText").innerHTML = `${esc(b.address)}<br>${esc(b.city || "")}`;
    if ($("#mapsLink")) $("#mapsLink").href =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
    if ($("#mapFrame")) $("#mapFrame").src =
      `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`;
  } else {
    if ($("#addressBlock")) $("#addressBlock").remove();
    if ($("#mapWrap")) $("#mapWrap").remove();
    document.querySelector(".contact__grid")?.classList.add("contact__grid--nomap");
  }

  const ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2 1.6 3.5 3.5 3.8v2.6c-1.3 0-2.5-.4-3.5-1v5.6A5.5 5.5 0 1 1 10.5 8.5v2.7a2.8 2.8 0 1 0 2 2.7V3H16z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.7-2.4-1.3-3.4-3-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2.6 1.1 3.1.9 3.7.8.6-.1 1.7-.7 2-1.4.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z"/><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7L7 20.4A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>',
  };
  const buildSocial = (container, withWa = true) => {
    if (!container) return;
    const s = CFG.social || {};
    const items = [];
    if (withWa && waNumber) items.push({ url: waUrl(greeting), svg: ICONS.whatsapp, label: "WhatsApp" });
    if (s.instagram) items.push({ url: s.instagram, svg: ICONS.instagram, label: "Instagram" });
    if (s.facebook) items.push({ url: s.facebook, svg: ICONS.facebook, label: "Facebook" });
    if (s.tiktok) items.push({ url: s.tiktok, svg: ICONS.tiktok, label: "TikTok" });
    container.innerHTML = items.map((i) =>
      `<a class="social-ic" href="${i.url}" target="_blank" rel="noopener" aria-label="${i.label}">${i.svg}</a>`).join("");
  };
  buildSocial($("#contactSocial"), false); // la tarjeta de WhatsApp ya está al lado
  buildSocial($("#footerSocial"));
  buildSocial($("#mobileSocial"));

  /* ================= RESERVA (WhatsApp) ================= */
  const form = $("#bookingForm");
  const serviceSelect = $("#bk-service");
  const cutSelect = $("#bk-cut");
  const dateInput = $("#bk-date");
  const timeSelect = $("#bk-time");
  const errorBox = $("#bookingError");

  // Opciones de servicio y de corte, desde config
  services.forEach((s) => serviceSelect.add(new Option(`${s.name} — ${s.price}`, s.name)));
  cuts.forEach((c) => cutSelect.add(new Option(`${c.n} · ${c.name}`, c.name)));

  // Límites de fecha
  const today = new Date();
  dateInput.min = localDateStr(today);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + (CFG.booking?.maxDaysAhead || 60));
  dateInput.max = localDateStr(maxDate);

  const showError = (msg) => { errorBox.textContent = msg; errorBox.hidden = !msg; };

  const buildSlots = (dateStr) => {
    timeSelect.innerHTML = "";
    const placeholder = new Option("Horario", "", true, true);
    placeholder.disabled = true;
    timeSelect.add(placeholder);
    if (!dateStr) return;

    const h = (CFG.hours || [])[isoDay(parseLocal(dateStr))];
    if (!h || /cerrado/i.test(h.open)) {
      const o = new Option("Cerrado ese día", ""); o.disabled = true; timeSelect.add(o); return;
    }
    const step = CFG.booking?.slotMinutes || 45;
    const endM = toMin(h.close);
    const now = new Date();
    const isToday = dateStr === localDateStr(now);
    const nowM = isToday ? now.getHours() * 60 + now.getMinutes() + 30 : -1; // 30 min de margen

    let added = 0;
    for (let m = toMin(h.open); m <= endM - step; m += step) {
      if (m < nowM) continue;
      timeSelect.add(new Option(fromMin(m), fromMin(m)));
      added++;
    }
    if (!added) {
      const o = new Option(isToday ? "Sin horarios para hoy" : "Sin horarios", "");
      o.disabled = true; timeSelect.add(o);
    }
  };
  dateInput.addEventListener("change", () => { buildSlots(dateInput.value); showError(""); });

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    showError("");

    if (waNumber.length < 8) {
      return showError("⚠️ Falta configurar el número de WhatsApp en config.js para activar las reservas.");
    }
    const service = serviceSelect.value;
    const cut = cutSelect.value;
    const date = dateInput.value;
    const time = timeSelect.value;
    const name = $("#bk-name").value.trim();
    const note = $("#bk-note").value.trim();

    if (!service) return showError("Elegí un servicio.");
    if (!date) return showError("Elegí una fecha.");
    if (!time) return showError("Elegí un horario disponible.");
    if (!name) return showError("Decinos tu nombre.");

    const pretty = parseLocal(date).toLocaleDateString("es-UY", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    const msg = [
      `Hola ${b.name || "ZAINO studio"}! 👋 Quiero reservar un turno:`,
      "",
      `✂️ Servicio: ${service}`,
      cut ? `💈 Corte de referencia: ${cut}` : null,
      `📅 Fecha: ${pretty}`,
      `🕐 Hora: ${time}`,
      `🙍 Nombre: ${name}`,
      note ? `📝 Nota: ${note}` : null,
      "",
      "¿Me confirmás disponibilidad? ¡Gracias!",
    ].filter(Boolean).join("\n");

    window.open(waUrl(msg), "_blank");
  });
})();
