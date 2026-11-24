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

  /* --- Dirección del sitio publicado --------------------------------
     Se usa para armar el link de cancelación que va en el WhatsApp.
     Si algún día cambiás el dominio, cambialo acá (con https:// y / al final). */
  siteUrl: "https://zainostudio.netlify.app/",

  business: {
    name: "ZAINO studio",
    phoneDisplay: "598 92 373 427",   // ⬅️ como se muestra en pantalla

    /* --- UBICACIÓN --------------------------------------------------
       ⚠️ PENDIENTE: estos datos son de ejemplo. Poné la dirección real
       antes de publicar, o dejá address: "" para ocultar la dirección
       y el mapa (el manual de marca pide no comunicar una sede fija).  */
    address: "16 de Marzo de 1984 Manzana 63 Solar 9",
    city: "Ciudad de la Costa, Canelones, Uruguay", // ⬅️ CAMBIAR
    mapQuery: "Solymar, Ciudad de la Costa, Canelones, Uruguay", // ⬅️ CAMBIAR
  },

  /* --- Cifras del hero ----------------------------------------------
     ⚠️ PENDIENTE: son valores de ejemplo. Confirmá los reales con el
     barbero antes de publicar (o poné stats: [] para ocultarlas).      */
  stats: [
    { value: 10,   suffix: "+", label: "Años de oficio" },
    { value: 8000, suffix: "+", label: "Cortes realizados" },     // ⬅️ CONFIRMAR
    { value: 100,  suffix: "%", label: "Atención personalizada" },
  ],

  /* --- Redes sociales (dejá "" para ocultar el ícono) --------------- */
  social: {
    instagram: "https://www.instagram.com/zaino.studio/",
    facebook:  "",
    tiktok:    "",
  },

  /* --- REGISTRO FOTOGRÁFICO (carrusel) ------------------------------
     Podés poner todas las fotos que quieras: agregá una línea por foto.
     • foto: nombre del archivo (dentro de assets/img/)
     • texto: descripción corta de la foto (no se ve; ayuda a Google y a
       quienes usan lector de pantalla)
     Ej. para sumar una sexta:  { foto: "assets/img/gallery-6.jpg", texto: "Fade terminado" },  */
  galeria: [
    { foto: "assets/img/gallery-1.jpg", texto: "Corte en proceso" },
    { foto: "assets/img/gallery-2.jpg", texto: "Detalle de trabajo" },
    { foto: "assets/img/gallery-3.jpg", texto: "Productos de cuidado" },
    { foto: "assets/img/gallery-4.jpg", texto: "Ambiente de trabajo" },
    { foto: "assets/img/gallery-5.jpg", texto: "Identidad ZAINO studio" },
  ],

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
    slotMinutes: 45,      // largo de cada turno de la grilla (10:00, 10:45, 11:30...)
    maxDaysAhead: 60,     // hasta cuántos días a futuro se puede reservar
    api: "https://script.google.com/macros/s/AKfycby2neuHrPmuOTEArMYduwLfTSvQNAvRN3QedbCPT5WtAZA9jQ-WTXz72hSfq_2lgmM/exec", // Google Apps Script (planilla "Turnos")
  },

  /* --- Servicios y precios (en pesos uruguayos) ---------------------
     "slots" = cuántos turnos seguidos de 45 min ocupa el servicio.
     Si no lo ponés, ocupa 1 turno. "duration" es solo el texto que se
     muestra en la tarjeta; el bloqueo lo define "slots".

     🎨 ÍCONOS: cambiá el valor de "icon" por uno de estos nombres:
        "tijera"   "navaja"   "maquina"  "peine"    "secador"
        "barba"    "rostro"   "persona"  "pincel"   "gota"
        "frasco"   "hoja"     "toalla"   "brillo"   "corona"
        "tinte"    "foliculos"
     Si escribís un nombre que no existe, se muestra la tijera.         */
  services: [
    { key: "corte",  icon: "tijera",  name: "Corte Clásico",         price: "$ 500", duration: "45 min",
      desc: "Corte a medida, lavado y peinado final. Precisión en cada línea, técnica en cada detalle." },
    { key: "combo",  icon: "barba",   name: "Corte + Barba",         price: "$ 750", duration: "90 min", slots: 2,
      desc: "La experiencia completa: corte personalizado más diseño y perfilado de barba." },
    { key: "barba",  icon: "navaja",  name: "Barba / Afeitado",      price: "$ 300", duration: "30 min",
      desc: "Perfilado, navaja y toalla caliente. El ritual clásico del afeitado." },

    /* ⚠️ Precios de ejemplo: confirmalos antes de publicar.
       Si no ofrece estos servicios, borrá la línea y desaparecen solos. */
    { key: "color",  icon: "tinte",   name: "Color & Mechas",        price: "$ 1.500", duration: "90 min", slots: 2,
      desc: "Coloración profesional, mechas y matices. Cobertura y estilo a tu medida." },
    { key: "trat",   icon: "foliculos", name: "Tratamiento Capilar",   price: "$ 800", duration: "40 min",
      desc: "Hidratación, fortalecimiento y cuidado del cuero cabelludo con productos premium." },
    { key: "asesor", icon: "persona", name: "Asesoramiento de estilo", price: "A consultar", duration: "20 min",
      desc: "Decisiones pensadas para cada cliente: definimos el corte ideal según tu rostro y tu identidad." },
  ],

  /* --- TEXTOS DE LA PÁGINA ------------------------------------------
     Cambiá lo que está entre comillas y se actualiza en el sitio.
     • <br> = salto de línea
     • <span class="italic">texto</span> = texto en cursiva
     Si borrás una línea, queda el texto original del index.html.       */
  textos: {
    // INICIO (portada)
    heroEtiqueta: "Barbería premium · Asesoramiento profesional",
    heroTitulo:   'Más que un corte,<br /><span class="italic">una experiencia.</span>',
    heroTexto:    "Una experiencia de alto nivel basada en la precisión, el detalle y el asesoramiento profesional. Cada corte, pensado para representar la mejor versión de quien lo lleva.",

    // SOBRE MÍ (va entre la marquesina y los servicios)
    // 📷 Tu foto: guardala como  assets/img/perfil.jpg  (cuadrada, ej. 800 × 800 px).
    //    Si todavía no la subiste, se muestran tus iniciales en el círculo.
    sobreMiEtiqueta: "Sobre mí",
    sobreMiNombre:   "Agustín Itzkoff",
    sobreMiRol:      "Fundador y barbero de ZAINO studio",
    sobreMiTexto1:   "Soy Agustín, barbero desde 2016. Empecé en Argentina, trabajando de forma independiente y en equipos de barbería, y hoy atiendo en Ciudad de la Costa.",
    sobreMiTexto2:   "Fundé ZAINO studio para ofrecer algo distinto: turnos sin apuro, cortes pensados para cada persona y un trato cercano. Acá vas a encontrar a alguien que te escucha antes de agarrar la tijera.",

    // SERVICIOS
    serviciosEtiqueta: "Servicios",
    serviciosTitulo:   "Primero te escuchamos, después cortamos",
    serviciosTexto:    "Cada servicio es el resultado de un análisis profesional, donde el asesoramiento personalizado define decisiones pensadas para cada cliente. Antes de empezar miramos tu tipo de cabello, la forma de tu rostro y lo que buscás. Así ninguna decisión queda librada al azar.",

    // COLECCIÓN
    coleccionEtiqueta: "Colección ZAINO studio 2026",
    coleccionTitulo:   "Cortes masculinos tendencia",
    coleccionTexto:    "El detalle en cada corte no es solo una cuestión estética, sino una expresión de técnica, dedicación y conocimiento. Elegí tu referencia y llevala a tu turno.",
    coleccionNota:     "¿No sabés cuál elegir? En el turno lo definimos juntos.",

    // EXPERIENCIA
    experienciaEtiqueta: "La experiencia",
    experienciaTitulo:   "Viví el momento<br />que diseñamos para vos.",
    experienciaTexto1:   "Desde el primer momento, la experiencia está diseñada para transmitir exclusividad, confianza y profesionalismo. La atención, el ambiente y el trato forman parte de un todo coherente, donde cada interacción refuerza el valor de la marca.",
    experienciaTexto2:   "ZAINO studio no ofrece simplemente un servicio de barbería, sino una experiencia construida sobre datos reales de nuestros clientes que pasaron por nuestras manos o siguen confiando su imagen al día de hoy, los cuales fuimos recolectando para darte una verdadera atención.",
    experienciaPunto1:   "Barberos profesionales",
    experienciaPunto2:   "Productos premium",
    experienciaPunto3:   "Ambiente exclusivo",
    experienciaPunto4:   "Atención personalizada",
    experienciaBoton:    "Viví la experiencia",

    // GALERÍA
    galeriaEtiqueta: "Registro Fotográfico",
    galeriaTitulo:   "El detalle se nota",

    // RESERVA
    reservaEtiqueta: "Reservá",
    reservaTitulo:   "Tu turno,<br />a un mensaje",
    reservaTexto:    "La reserva online es el canal principal de acceso al servicio. Atención exclusiva, por turnos y con asesoramiento personalizado.",
    reservaPunto1:   "Confirmación directa por WhatsApp",
    reservaPunto2:   "Atención exclusiva y por turnos",
    reservaPunto3:   "Asesoramiento personalizado en cada turno",

    // CONTACTO
    contactoEtiqueta: "Contacto",
    contactoTitulo:   "Te esperamos",
    contactoTexto:    "Escribinos por WhatsApp y te respondemos con disponibilidad y todos los detalles de tu turno.",

    // PIE DE PÁGINA
    pieFrase: "El verdadero lujo no es exceso, sino precisión.",
  },

  /* --- Colección 2026: cortes de referencia -------------------------
     Se usa para la galería de cortes Y para el selector de la reserva. */
  cuts: [
    { n: "01", slug: "buzz-cut",      name: "Buzz Cut",      desc: "Corte ultra corto uniforme. Líneas definidas. Minimalista y de alto impacto." },
    { n: "02", slug: "crew-cut",      name: "Crew Cut",      desc: "Parte superior corta y estructurada. Degradado medio. Clásico y masculino." },
    { n: "03", slug: "caesar-cut",    name: "Caesar Cut",    desc: "Flequillo recto y corto. Degradado medio. Clásico atemporal y elegante." },
    { n: "04", slug: "french-crop",   name: "French Crop",   desc: "Textura corta con flequillo recto. Degradado bajo. Estilo moderno y natural." },
    { n: "05", slug: "textured-crop", name: "Textured Crop", desc: "Textura desordenada arriba. Fade bajo y difuminado. Look fresco y versátil." },
    { n: "06", slug: "high-fade",     name: "High Fade",     desc: "Degradado alto y marcado. Contraste definido. Look audaz y moderno." },
    { n: "07", slug: "mid-fade",      name: "Mid Fade",      desc: "Degradado medio con transición limpia. Volumen natural arriba." },
    { n: "08", slug: "low-fade",      name: "Low Fade",      desc: "Fade bajo cerca de la línea natural. Transición sutil y elegante." },
    { n: "09", slug: "taper-fade",    name: "Taper Fade",    desc: "Degradado cónico en laterales y nuca. Transición suave y natural." },
    { n: "10", slug: "skin-fade",     name: "Skin Fade",     desc: "Degradado a piel. Máxima limpieza y contraste. Acabado ultra prolijo." },
    { n: "11", slug: "quiff",         name: "Quiff",         desc: "Volumen hacia arriba y atrás. Degradado medio. Elegante y sofisticado." },
    { n: "12", slug: "pompadour",     name: "Pompadour",     desc: "Volumen alto y peinado hacia atrás. Look clásico y refinado." },
    { n: "13", slug: "side-part",     name: "Side Part",     desc: "Raya al costado definida. Degradado medio. Estilo formal y pulido." },
    { n: "14", slug: "curtain-cut",   name: "Curtain Cut",   desc: "Partido al medio con caída natural. Capas suaves y textura." },
    { n: "15", slug: "messy-waves",   name: "Messy Waves",   desc: "Ondas naturales y desordenadas. Degradado bajo. Look casual y juvenil." },
  ],
};
