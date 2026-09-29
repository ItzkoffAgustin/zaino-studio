/* =====================================================================
   ZAINO STUDIO — CONFIGURACIÓN
   ---------------------------------------------------------------------
   👉 EDITÁ ESTE ARCHIVO con los datos reales.
      Es lo único que necesitás tocar para poner el sitio en marcha.

   Si dejás address: "" se ocultan solos la dirección y el mapa.
   Si dejás stats: [] se ocultan las cifras del hero.
   ===================================================================== */

window.ZAINO = {

  /* --- WhatsApp (CRÍTICO para las reservas) -------------------------
     Número en formato internacional, SIN "+", SIN espacios ni guiones.
     Uruguay = 598 + número sin el 0 inicial.
     Ej: el celular 092 625 804  ->  "59892625804"                      */
  whatsapp: "59892373427",

  business: {
    name: "ZAINO studio",
    phoneDisplay: "598 92 373 427",   // ⬅️ como se muestra en pantalla

    /* --- UBICACIÓN --------------------------------------------------
       ⚠️ PENDIENTE: estos datos son de ejemplo. Poné la dirección real
       antes de publicar, o dejá address: "" para ocultar la dirección
       y el mapa (el manual de marca pide no comunicar una sede fija).  */
    address: "16 DE Marzo de 1984 Manzana 63 Solar 9, Solymar",          // ⬅️ CAMBIAR
    city: "Ciudad de la Costa, Canelones, Uruguay", // ⬅️ CAMBIAR
    mapQuery: "Solymar, Ciudad de la Costa, Canelones, Uruguay", // ⬅️ CAMBIAR
  },

  /* --- Cifras del hero ----------------------------------------------
     ⚠️ PENDIENTE: son valores de ejemplo. Confirmá los reales con el
     barbero antes de publicar (o poné stats: [] para ocultarlas).      */
  stats: [
    { value: 10,   suffix: "",  label: "Años de oficio" },        // ⬅️ CONFIRMAR
    { value: 10000, suffix: "+", label: "Cortes realizados" },     // ⬅️ CONFIRMAR
    { value: 100,  suffix: "%", label: "Atención personalizada" },
  ],

  /* --- Redes sociales (dejá "" para ocultar el ícono) --------------- */
  social: {
    instagram: "https://instagram.com/",   // ⬅️ perfil real
    facebook:  "",
    tiktok:    "",
  },

  /* --- Horarios de atención ----------------------------------------
     "Cerrado" marca el día como cerrado (no genera turnos).            */
  hours: [
    { day: "Lunes",     open: "10:00", close: "19:00" },
    { day: "Martes",    open: "10:00", close: "19:00" },
    { day: "Miércoles", open: "10:00", close: "19:00" },
    { day: "Jueves",    open: "10:00", close: "19:00" },
    { day: "Viernes",   open: "10:00", close: "19:00" },
    { day: "Sábado",    open: "10:00", close: "19:00" },
    { day: "Domingo",   open: "Cerrado", close: "Cerrado" },
  ],

  booking: {
    slotMinutes: 45,      // separación entre turnos ofrecidos
    maxDaysAhead: 60,     // hasta cuántos días a futuro se puede reservar
  },

  /* --- Servicios y precios (en pesos uruguayos) --------------------- */
  services: [
    { key: "corte",  name: "Corte Clásico",         price: "$ 500", duration: "45 min",
      desc: "Corte a medida, lavado y peinado final. Precisión en cada línea, técnica en cada detalle." },
    { key: "combo",  name: "Corte + Barba",         price: "$ 750", duration: "60 min",
      desc: "La experiencia completa: corte personalizado más diseño y perfilado de barba." },
    { key: "barba",  name: "Barba / Afeitado",      price: "$ 300", duration: "30 min",
      desc: "Perfilado, navaja y toalla caliente. El ritual clásico del afeitado." },

    /* ⚠️ Precios de ejemplo: confirmalos antes de publicar.
       Si no ofrece estos servicios, borrá la línea y desaparecen solos. */
    { key: "color",  name: "Color & Mechas",        price: "$ 1.500", duration: "90 min",
      desc: "Coloración profesional, mechas y matices. Cobertura y estilo a tu medida." },
    { key: "trat",   name: "Tratamiento Capilar",   price: "$ 800", duration: "40 min",
      desc: "Hidratación, fortalecimiento y cuidado del cuero cabelludo con productos premium." },
    { key: "asesor", name: "Asesoramiento de estilo", price: "A consultar", duration: "20 min",
      desc: "Decisiones pensadas para cada cliente: definimos el corte ideal según tu rostro y tu identidad." },
  ],

  /* --- Colección 2026: cortes de referencia -------------------------
     Se usa para la galería de cortes Y para el selector de la reserva. */
  cuts: [
    { n: "01", slug: "french-crop",   name: "French Crop",   desc: "Textura corta con flequillo recto. Degradado bajo. Estilo moderno y natural." },
    { n: "02", slug: "textured-crop", name: "Textured Crop", desc: "Textura desordenada arriba. Fade bajo y difuminado. Look fresco y versátil." },
    { n: "03", slug: "caesar-cut",    name: "Caesar Cut",    desc: "Flequillo recto y corto. Degradado medio. Clásico atemporal y elegante." },
    { n: "04", slug: "mid-fade",      name: "Mid Fade",      desc: "Degradado medio con transición limpia. Volumen natural arriba." },
    { n: "05", slug: "taper-fade",    name: "Taper Fade",    desc: "Degradado cónico en laterales y nuca. Transición suave y natural." },
    { n: "06", slug: "low-fade",      name: "Low Fade",      desc: "Fade bajo cerca de la línea natural. Transición sutil y elegante." },
    { n: "07", slug: "high-fade",     name: "High Fade",     desc: "Degradado alto y marcado. Contraste definido. Look audaz y moderno." },
    { n: "08", slug: "skin-fade",     name: "Skin Fade",     desc: "Degradado a piel. Máxima limpieza y contraste. Acabado ultra prolijo." },
    { n: "09", slug: "buzz-cut",      name: "Buzz Cut",      desc: "Corte ultra corto uniforme. Líneas definidas. Minimalista y de alto impacto." },
    { n: "10", slug: "crew-cut",      name: "Crew Cut",      desc: "Parte superior corta y estructurada. Degradado medio. Clásico y masculino." },
    { n: "11", slug: "quiff",         name: "Quiff",         desc: "Volumen hacia arriba y atrás. Degradado medio. Elegante y sofisticado." },
    { n: "12", slug: "pompadour",     name: "Pompadour",     desc: "Volumen alto y peinado hacia atrás. Look clásico y refinado." },
    { n: "13", slug: "side-part",     name: "Side Part",     desc: "Raya al costado definida. Degradado medio. Estilo formal y pulido." },
    { n: "14", slug: "curtain-cut",   name: "Curtain Cut",   desc: "Partido al medio con caída natural. Capas suaves y textura." },
    { n: "15", slug: "messy-waves",   name: "Messy Waves",   desc: "Ondas naturales y desordenadas. Degradado bajo. Look casual y juvenil." },
  ],
};
