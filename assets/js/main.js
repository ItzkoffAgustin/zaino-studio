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
  // Se usa api.whatsapp.com/send en vez de wa.me: wa.me hace una redirección que
  // rompe los emojis (salen como "�"), sobre todo en WhatsApp de computadora.
  const waUrl = (text) => `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(text)}`;
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
  /* ================= TEXTOS (desde config.js → textos) ================= */
  const TXT = CFG.textos || {};
  $$("[data-txt]").forEach((el) => {
    const val = TXT[el.dataset.txt];
    if (typeof val === "string" && val.trim()) el.innerHTML = val;
  });

  // Biblioteca de íconos: en config.js elegís uno por nombre con  icon: "nombre"
  const svg = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  const ICON_LIB = {
    tijera:  svg('<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>'),
    navaja:  svg('<path d="M3 21l6-6"/><path d="M9 15 19.5 4.5a2.1 2.1 0 0 1 0 3L12 15z"/><path d="M9 15l3 0"/><circle cx="9" cy="15" r="1"/>'),
    maquina: svg('<rect x="7" y="8" width="10" height="13" rx="3"/><path d="M7.5 8V5h9v3"/><path d="M9 5V3M11 5V3M13 5V3M15 5V3"/><line x1="12" y1="12" x2="12" y2="16"/>'),
    peine:   svg('<rect x="3" y="7" width="18" height="4" rx="1"/><path d="M5 11v6M8 11v6M11 11v6M14 11v6M17 11v6M20 11v4"/>'),
    secador: svg('<path d="M14 4H9a5 5 0 0 0 0 10h5z"/><path d="M14 5.5h5.5v7H14"/><path d="M9 14l-1 7h3l1-7"/><circle cx="9" cy="9" r="1.5"/>'),
    barba:   svg('<path d="M3 6c4 0 6 2 9 2s3-2 9-2"/><path d="M3 6c0 6 3 11 9 13 6-2 9-7 9-13"/><path d="M9 11c1 1 2 1.5 3 1.5S14 12 15 11"/>'),
    rostro:  svg('<path d="M4 14c0-4 4-8 8-8s8 4 8 8"/><path d="M4 14c0 3 3 5 8 5s8-2 8-5"/><path d="M9 9c.5 1 1.5 1.5 3 1.5S14.5 10 15 9"/>'),
    persona: svg('<circle cx="12" cy="8" r="4"/><path d="M5 21c0-4 3-6 7-6s7 2 7 6"/>'),
    pincel:  svg('<path d="M14 3l7 7-7.5 7.5-7-7z"/><path d="M6.5 10.5C4 11.5 3.5 14 3.5 16S3 19.5 2 20.5c4 .5 8.5-.5 9.5-4.5"/>'),
    gota:    svg('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>'),
    frasco:  svg('<rect x="9.5" y="2.5" width="5" height="3" rx=".5"/><path d="M8 5.5h8l1 3V19a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8.5z"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16.5" x2="17" y2="16.5"/>'),
    hoja:    svg('<path d="M5 19C5 11 10 5 20 4c-1 10-7 15-15 15z"/><path d="M5 19l9-9"/>'),
    toalla:  svg('<path d="M8 3c-1 1.5 1 2.5 0 4M12 3c-1 1.5 1 2.5 0 4M16 3c-1 1.5 1 2.5 0 4"/><rect x="4" y="10" width="16" height="10" rx="2"/><line x1="4" y1="14" x2="20" y2="14"/>'),
    brillo:  svg('<path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/><path d="M19 16c.3 1.6 1 2.4 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.1 2.2-.9 2.5-2.5z"/>'),
    foliculos: svg('<path d="M1 15h3M8 15h2M14 15h2M20 15h3"/><path d="M4 15c-1.3 1.8-.9 5.2 2 5.2s3.3-3.4 2-5.2"/><path d="M10 15c-1.3 1.8-.9 5.2 2 5.2s3.3-3.4 2-5.2"/><path d="M16 15c-1.3 1.8-.9 5.2 2 5.2s3.3-3.4 2-5.2"/><path d="M6 18.4c-.9 0-1.2-.9-.9-2C6 11 7.5 8 9.5 6"/><path d="M12 18.4c-.9 0-1.2-.9-.9-2C12 11 13.5 8 16 2.5"/><path d="M18 18.4c-.9 0-1.2-.9-.9-2C18 11 19.5 8 21.5 6.5"/>'),
    tinte:   svg('<g transform="rotate(-30 15 6)"><rect x="15" y="4.6" width="7.5" height="2.8" rx="1.4"/><path d="M15 3.8h-3.6v4.4H15z"/><path d="M11.4 4.6H9.6M11.4 6H9.6M11.4 7.4H9.6"/></g><path d="M2.5 14h13"/><path d="M3.3 14c0 4.6 2.4 7 5.7 7s5.7-2.4 5.7-7"/><path d="M3.6 16.4h10.8"/><path d="M4.4 14c.8-1.4 2.3-1.9 4.1-1.8 1.6.1 2.9.1 4.2-.5"/>'),
    corona:  svg('<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 10H5z"/><line x1="5" y1="21" x2="19" y2="21"/>'),
  };
  // Compatibilidad: si un servicio no tiene "icon", se usa el ícono que tenía antes
  const LEGACY_ICON = { corte: "tijera", combo: "barba", barba: "rostro", asesor: "persona" };
  const iconFor = (s) => ICON_LIB[s.icon] || ICON_LIB[LEGACY_ICON[s.key]] || ICON_LIB.tijera;

  const servicesGrid = $("#servicesGrid");
  const services = CFG.services || [];
  if (servicesGrid) {
    servicesGrid.innerHTML = services.map((s) => `
      <article class="service-card reveal">
        <div class="service-card__icon">${iconFor(s)}</div>
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
          <img src="assets/img/cuts/${esc(c.slug)}.jpg" alt="${esc(c.name)}" loading="lazy" onerror="this.style.visibility='hidden'" />
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

  /* ================= CARRUSEL (Registro fotográfico) ================= */
  (() => {
    const root = $("#galleryCarousel");
    const track = $("#galleryTrack");
    if (!root || !track) return;
    // Fotos desde config.js → galeria (todas las que haya)
    const fotos = (CFG.galeria || []).filter((g) => g && g.foto);
    if (!fotos.length) { $("#galeria")?.remove(); return; }
    track.innerHTML = fotos.map((g) => `
      <figure class="carousel__slide"><img src="${esc(g.foto)}" alt="${esc(g.texto || "")}" loading="lazy" onerror="this.parentElement.remove()" /></figure>`).join("");
    const slides = $$(".carousel__slide", track);
    const dotsBox = $("#galleryDots");
    const AUTO_MS = 4000; // cada cuánto avanza solo (en milisegundos)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const step = () => {
      const s = track.querySelector(".carousel__slide"); // la primera que exista (si una foto falla, se quita)
      if (!s) return 1;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return s.getBoundingClientRect().width + gap;
    };
    const maxIndex = () => {
      const max = track.scrollWidth - track.clientWidth;
      return Math.max(0, Math.ceil(max / step() - 0.05));
    };
    const current = () => Math.round(track.scrollLeft / step());
    const goTo = (i) => {
      const last = maxIndex();
      if (i > last) i = 0;          // al llegar al final vuelve al principio
      if (i < 0) i = last;
      track.scrollTo({ left: i * step(), behavior: reduce ? "auto" : "smooth" });
    };

    let dots = [];
    const buildDots = () => {
      const n = maxIndex() + 1;
      if (dots.length === n) return;
      dotsBox.innerHTML = Array.from({ length: n }, (_, i) =>
        `<button class="carousel__dot" aria-label="Ir a la foto ${i + 1}"></button>`).join("");
      dots = $$(".carousel__dot", dotsBox);
      dots.forEach((d, i) => d.addEventListener("click", () => { goTo(i); restart(); }));
      dotsBox.hidden = n < 2;
      paintDots();
    };
    const paintDots = () => {
      const c = Math.min(current(), dots.length - 1);
      dots.forEach((d, i) => d.classList.toggle("is-active", i === c));
    };

    $("#galleryPrev")?.addEventListener("click", () => { goTo(current() - 1); restart(); });
    $("#galleryNext")?.addEventListener("click", () => { goTo(current() + 1); restart(); });
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(current() + 1); restart(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(current() - 1); restart(); }
    });
    let raf = 0;
    track.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(paintDots); }, { passive: true });

    // Avance automático: se pausa con el mouse encima, al tocar o si no está a la vista
    let timer = 0, paused = false, visible = false;
    const stop = () => { clearInterval(timer); timer = 0; };
    const start = () => {
      stop();
      if (reduce || paused || !visible || maxIndex() === 0) return;
      timer = setInterval(() => goTo(current() + 1), AUTO_MS);
    };
    const restart = () => start();
    root.addEventListener("mouseenter", () => { paused = true; stop(); });
    root.addEventListener("mouseleave", () => { paused = false; start(); });
    root.addEventListener("focusin", () => { paused = true; stop(); });
    root.addEventListener("focusout", () => { paused = false; start(); });
    track.addEventListener("touchstart", () => { stop(); }, { passive: true });
    track.addEventListener("touchend", () => { setTimeout(start, 2000); }, { passive: true });
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting; visible ? start() : stop();
    }, { threshold: 0.3 }).observe(root);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    const ro = new ResizeObserver(() => { buildDots(); paintDots(); });
    ro.observe(track);
    buildDots();
  })();

  /* ================= BOTONES que siguen al cursor ================= */
  // Solo en compu (mouse) y si la persona no pidió menos animaciones.
  // FUERZA: cuánto se mueve hacia el cursor (0.3 = 30 %). MAX: tope en píxeles.
  (() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    const SEL = ".btn, .carousel__btn";
    const FUERZA = 0.3, MAX = 10;
    let active = null;
    const reset = (el) => { el.style.removeProperty("--mx"); el.style.removeProperty("--my"); };
    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest ? e.target.closest(SEL) : null;
      if (active && active !== el) { reset(active); active = null; }
      if (!el) return;
      active = el;
      const r = el.getBoundingClientRect();
      const clamp = (v) => Math.max(-MAX, Math.min(MAX, v));
      el.style.setProperty("--mx", `${clamp((e.clientX - (r.left + r.width / 2)) * FUERZA)}px`);
      el.style.setProperty("--my", `${clamp((e.clientY - (r.top + r.height / 2)) * FUERZA)}px`);
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => { if (active) { reset(active); active = null; } });
  })();

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
  const okBox = $("#bookingOk");
  const showOk = (html) => { if (!okBox) return; okBox.innerHTML = html || ""; okBox.hidden = !html; };
  // Link de cancelación: usa la dirección fija del sitio (config.js → siteUrl),
  // así funciona aunque la página se haya abierto desde otro lado.
  const siteBase = (() => {
    const u = String(CFG.siteUrl || "").trim();
    if (/^https?:\/\//i.test(u)) return u.endsWith("/") ? u : u + "/";
    return /^https?:$/.test(location.protocol) ? `${location.origin}${location.pathname}` : "https://zainostudio.netlify.app/";
  })();
  const cancelLink = (codigo) => `${siteBase}?cancelar=${encodeURIComponent(codigo)}`;

  const LEGACY_DUR = 45; // largo de un turno si la planilla no informa duración

  // Cuántos turnos seguidos ocupa el servicio ("slots" en config.js; por defecto 1)
  const slotsOf = (serviceName) => {
    const sv = services.find((x) => x.name === serviceName);
    return sv && Number(sv.slots) > 0 ? Number(sv.slots) : 1;
  };
  const stepMin = () => CFG.booking?.slotMinutes || LEGACY_DUR;

  // Pide a la planilla los turnos ya reservados de una fecha.
  // Devuelve [{ start, end }] en minutos desde las 00:00.
  const fetchBusy = async (dateStr) => {
    const api = CFG.booking?.api;
    if (!api) return [];
    const r = await fetch(`${api}?fecha=${encodeURIComponent(dateStr)}`);
    const data = await r.json();
    const list = Array.isArray(data) ? data : (data && (data.ocupados || data.busy)) || [];
    return list.map((v) => {
      // Formato nuevo: { hora: "10:00", duracion: 45 }. Formato viejo: "10:00"
      const isObj = v !== null && typeof v === "object";
      const m = String(isObj ? v.hora : v).match(/(\d{1,2}):(\d{2})/);
      if (!m) return null;
      const dur = isObj ? Number(v.duracion) : NaN;
      const start = Number(m[1]) * 60 + Number(m[2]);
      return { start, end: start + (dur > 0 ? dur : LEGACY_DUR) };
    }).filter(Boolean);
  };

  const busyCache = {};   // turnos ocupados por fecha (para no volver a pedirlos al cambiar de servicio)
  let slotsRequest = 0;   // evita que una respuesta vieja pise a una más nueva
  const buildSlots = async (dateStr, useCache = false) => {
    const reqId = ++slotsRequest;
    const prevTime = timeSelect.value;
    timeSelect.innerHTML = "";
    const placeholder = new Option("Horario", "", true, true);
    placeholder.disabled = true;
    timeSelect.add(placeholder);
    if (!dateStr) return;

    const h = (CFG.hours || [])[isoDay(parseLocal(dateStr))];
    if (!h || /cerrado/i.test(h.open)) {
      const o = new Option("Cerrado ese día", ""); o.disabled = true; timeSelect.add(o); return;
    }

    let busy = busyCache[dateStr];
    if (!(useCache && busy)) {
      placeholder.text = "Cargando horarios…";
      busy = [];
      try { busy = await fetchBusy(dateStr); busyCache[dateStr] = busy; }
      catch (e) { /* si falla, se muestran todos; el servidor valida igual al reservar */ }
      if (reqId !== slotsRequest) return; // el usuario cambió de fecha mientras cargaba
      placeholder.text = "Horario";
    }

    const step = stepMin();
    const dur = slotsOf(serviceSelect.value) * step; // minutos que bloquea el servicio elegido
    const endM = toMin(h.close);
    const now = new Date();
    const isToday = dateStr === localDateStr(now);
    const nowM = isToday ? now.getHours() * 60 + now.getMinutes() + 30 : -1; // 30 min de margen

    let added = 0;
    for (let m = toMin(h.open); m + dur <= endM; m += step) {   // tiene que terminar antes del cierre
      if (m < nowM) continue;
      if (busy.some((x) => m < x.end && m + dur > x.start)) continue; // se pisa con otro turno
      timeSelect.add(new Option(fromMin(m), fromMin(m)));
      added++;
    }
    if (!added) {
      const o = new Option(isToday ? "Sin horarios para hoy" : "Sin horarios disponibles", "");
      o.disabled = true; timeSelect.add(o);
    } else if (prevTime && Array.from(timeSelect.options).some((o) => o.value === prevTime)) {
      timeSelect.value = prevTime; // mantiene la elección si sigue disponible
    }
  };
  dateInput.addEventListener("change", () => { delete busyCache[dateInput.value]; buildSlots(dateInput.value); showError(""); });
  // Al cambiar de servicio cambia cuántos turnos necesita, así que se recalculan los horarios que entran
  serviceSelect.addEventListener("change", () => { if (dateInput.value) buildSlots(dateInput.value, true); showError(""); });

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    showError("");
    showOk("");

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

    // El código de reserva lo devuelve la planilla; con él se puede cancelar desde la web
    const buildMsg = (codigo) => [
      `Hola ${b.name || "ZAINO studio"}! 👋 Quiero reservar un turno:`,
      "",
      `✂️ Servicio: ${service}`,
      cut ? `💈 Corte de referencia: ${cut}` : null,
      `📅 Fecha: ${pretty}`,
      `🕐 Hora: ${time}`,
      `🙍 Nombre: ${name}`,
      note ? `📝 Nota: ${note}` : null,
      codigo ? `🔑 Código de reserva: ${codigo}` : null,
      "",
      "¿Me confirmás disponibilidad y ubicación? ¡Gracias!",
      codigo ? "" : null,
      codigo ? "❌ Si necesito cancelar, entro acá:" : null,
      codigo ? cancelLink(codigo) : null,
    ].filter((x) => x !== null).join("\n"); // los "" quedan como líneas en blanco

    const api = CFG.booking?.api;
    if (!api) { window.open(waUrl(buildMsg()), "_blank"); return; } // sin API: modo anterior

    const btn = form.querySelector("button[type=submit]");
    if (btn) btn.disabled = true;

    // Abrimos la pestaña ya (en el clic) para que el navegador no la bloquee
    // como ventana emergente; la redirigimos a WhatsApp si la reserva se guarda.
    const wa = window.open("", "_blank");
    const closeWa = () => { if (wa) wa.close(); };

    try {
      const r = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // evita el preflight CORS
        body: JSON.stringify({ fecha: date, hora: time, turnos: slotsOf(service), nombre: name, servicio: service, nota: note }),
      });
      const res = await r.json();
      if (!res.ok) {
        closeWa();
        showError(res.error === "ocupado"
          ? "Ese turno ya fue reservado por otra persona. Elegí otro horario."
          : "No pudimos guardar la reserva. Probá de nuevo.");
        delete busyCache[date];
        await buildSlots(date);
        return;
      }
      const msg = buildMsg(res.codigo);
      if (res.codigo) {
        showOk(`¡Turno guardado! Tu código de reserva es <strong>${esc(res.codigo)}</strong>. ` +
          `Va también en el mensaje de WhatsApp. Si no podés venir, <a href="${esc(cancelLink(res.codigo))}">cancelalo desde acá</a>.`);
      }
      if (wa) wa.location.href = waUrl(msg); else window.location.href = waUrl(msg);
      delete busyCache[date];
      await buildSlots(date); // el turno recién tomado desaparece de la lista
    } catch (e) {
      closeWa();
      showError("No pudimos guardar la reserva. Revisá tu conexión y probá de nuevo.");
    } finally {
      if (btn) btn.disabled = false;
    }
  });

  /* ================= CANCELAR TURNO ================= */
  // Se abre con el link ?cancelar=CÓDIGO (va en el WhatsApp de la reserva)
  // o con el botón "¿Necesitás cancelar tu turno?" de la sección Reservá.
  (() => {
    const panel = $("#cancelPanel");
    if (!panel) return;
    const api = CFG.booking?.api;
    const openBtn = $("#cancelOpen");
    if (!api) { panel.remove(); openBtn?.remove(); return; } // sin planilla no se puede cancelar

    const formC = $("#cancelForm");
    const codeInput = $("#cx-code");
    const info = $("#cancelInfo");
    const err = $("#cancelError");
    const findBtn = formC.querySelector("button[type=submit]");
    const showErr = (t) => { err.textContent = t || ""; err.hidden = !t; };
    const prettyDate = (s) => parseLocal(s).toLocaleDateString("es-UY", { weekday: "long", day: "numeric", month: "long" });
    let lastFocus = null;

    const open = (code) => {
      lastFocus = document.activeElement;
      panel.hidden = false;
      document.body.style.overflow = "hidden";
      formC.hidden = false; info.hidden = true; info.innerHTML = ""; showErr("");
      if (code) { codeInput.value = code; lookup(code); } else setTimeout(() => codeInput.focus(), 50);
    };
    const close = () => {
      panel.hidden = true;
      document.body.style.overflow = "";
      if (new URLSearchParams(location.search).has("cancelar")) history.replaceState(null, "", location.pathname + location.hash);
      lastFocus?.focus?.();
    };
    $("#cancelClose").addEventListener("click", close);
    panel.addEventListener("click", (e) => { if (e.target === panel) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) close(); });
    openBtn?.addEventListener("click", () => open());

    const ERR = {
      "no-encontrado": "No encontramos un turno con ese código. Revisalo e intentá de nuevo.",
      "ya-cancelado": "Este turno ya estaba cancelado.",
      "pasado": "Este turno ya pasó, así que no se puede cancelar.",
    };

    const showTurno = (t, codigo) => {
      formC.hidden = true;
      info.hidden = false;
      info.innerHTML = `
        <dl>
          <dt>Servicio</dt><dd>${esc(t.servicio)}</dd>
          <dt>Fecha</dt><dd>${esc(prettyDate(t.fecha))}</dd>
          <dt>Hora</dt><dd>${esc(t.hora)}</dd>
          <dt>Nombre</dt><dd>${esc(t.nombre)}</dd>
        </dl>
        <p>¿Seguro que querés cancelarlo? El horario queda libre para otra persona.</p>
        <div class="cancel__actions">
          <button type="button" class="btn btn--danger" id="cxConfirm">Sí, cancelar turno</button>
          <button type="button" class="btn btn--ghost" id="cxBack">No, mantener turno</button>
        </div>`;
      $("#cxBack").addEventListener("click", close);
      $("#cxConfirm").addEventListener("click", () => confirm(codigo, t));
    };

    const showDone = (t, codigo) => {
      const aviso = [
        `Hola ${b.name || "ZAINO studio"}! Cancelé mi turno desde la web:`,
        "",
        `✂️ Servicio: ${t.servicio}`,
        `📅 Fecha: ${prettyDate(t.fecha)}`,
        `🕐 Hora: ${t.hora}`,
        `🙍 Nombre: ${t.nombre}`,
        `🔑 Código: ${codigo}`,
      ].join("\n");
      info.innerHTML = `
        <div class="cancel__done">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>
          <p>Tu turno del <strong>${esc(prettyDate(t.fecha))}</strong> a las <strong>${esc(t.hora)}</strong> quedó cancelado.</p>
          <div class="cancel__actions">
            ${waNumber ? `<a class="btn btn--whatsapp" href="${esc(waUrl(aviso))}" target="_blank" rel="noopener">Avisar por WhatsApp</a>` : ""}
            <a class="btn btn--ghost" href="#reserva" id="cxNew">Reservar otro turno</a>
          </div>
        </div>`;
      $("#cxNew").addEventListener("click", close);
      if (dateInput.value === t.fecha) { delete busyCache[t.fecha]; buildSlots(t.fecha); }
    };

    async function lookup(raw) {
      const codigo = String(raw || "").trim().toUpperCase();
      if (!codigo) return showErr("Escribí tu código de reserva.");
      showErr(""); findBtn.disabled = true; findBtn.textContent = "Buscando…";
      try {
        const res = await (await fetch(`${api}?codigo=${encodeURIComponent(codigo)}`)).json();
        if (!res.ok) return showErr(ERR[res.error] || "No pudimos buscar el turno. Probá de nuevo.");
        if (res.turno.estado === "cancelado") return showErr(ERR["ya-cancelado"]);
        if (res.pasado) return showErr(ERR.pasado);
        showTurno(res.turno, codigo);
      } catch (e) {
        showErr("No pudimos buscar el turno. Revisá tu conexión y probá de nuevo.");
      } finally {
        findBtn.disabled = false; findBtn.textContent = "Buscar mi turno";
      }
    }

    async function confirm(codigo, t) {
      const btnC = $("#cxConfirm");
      btnC.disabled = true; btnC.textContent = "Cancelando…"; showErr("");
      try {
        const res = await (await fetch(api, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ accion: "cancelar", codigo }),
        })).json();
        if (!res.ok) { btnC.disabled = false; btnC.textContent = "Sí, cancelar turno"; return showErr(ERR[res.error] || "No pudimos cancelar el turno. Probá de nuevo."); }
        showDone(res.turno || t, codigo);
      } catch (e) {
        btnC.disabled = false; btnC.textContent = "Sí, cancelar turno";
        showErr("No pudimos cancelar el turno. Revisá tu conexión y probá de nuevo.");
      }
    }

    formC.addEventListener("submit", (e) => { e.preventDefault(); lookup(codeInput.value); });

    const fromUrl = new URLSearchParams(location.search).get("cancelar");
    if (fromUrl) open(fromUrl);
  })();
})();
