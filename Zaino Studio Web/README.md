# ZAINO Studio — Sitio web

Sitio estático (sin backend) para ZAINO Studio. Las reservas se hacen por **WhatsApp**:
el formulario arma el mensaje y abre WhatsApp con todo listo para enviar.

---

## ⚠️ Lo único obligatorio antes de publicar

Abrí **`assets/js/config.js`** y cambiá el número de WhatsApp:

```js
whatsapp: "59800000000",   // ⬅️ número real, sin "+", sin espacios
```

Formato Uruguay: `598` + celular sin el `0` inicial.
Ejemplo: `092 625 804` → `"59892625804"`

Si no se cambia, el formulario avisa que falta configurarlo y no envía nada.

---

## Qué más se edita en `config.js`

Todo el contenido variable está en ese único archivo:

| Campo | Para qué sirve |
|---|---|
| `business.phoneDisplay` | Teléfono como se muestra en pantalla |
| `business.zone` | Zona de trabajo (ej: "Montevideo y Ciudad de la Costa") |
| `social.instagram` / `facebook` / `tiktok` | Redes. Dejar `""` oculta el ícono |
| `hours` | Horarios por día. `"Cerrado"` marca el día cerrado |
| `booking.slotMinutes` | Cada cuántos minutos se ofrece un turno |
| `services` | Servicios, precios y duraciones |
| `cuts` | Los 15 cortes de la Colección 2026 |

Los precios y horarios se reflejan solos en la página y en el formulario.

---

## Ver el sitio en la compu

```bash
python3 -m http.server 4600
```

Luego abrir <http://localhost:4600>

---

## Publicarlo

Es un sitio estático: sirve cualquier hosting.

- **Netlify** (lo más simple): entrar a [app.netlify.com/drop](https://app.netlify.com/drop) y
  arrastrar la carpeta completa. Queda online en segundos, gratis.
- **Vercel** / **GitHub Pages** / **Cloudflare Pages**: también funcionan sin configuración.

Para un dominio propio (ej. `zainostudio.uy`), se compra el dominio y se apunta al hosting.

---

## Estructura

```
index.html              Página completa
assets/css/styles.css   Estilos
assets/js/config.js     ← DATOS DEL NEGOCIO (editar acá)
assets/js/main.js       Lógica: menú, animaciones, reservas
assets/img/             Imágenes de marca
assets/img/cuts/        Los 15 cortes de la colección
```

---

## Notas de diseño

- **Tipografía**: títulos en **Arial Black** MAYÚSCULA, información en **Montserrat Regular**.
  Como Arial Black no existe en todos los celulares, se carga **Archivo Black** desde Google Fonts
  como respaldo: se ve igual de contundente en Android/iOS.
- **Paleta**: la del manual de marca — `#F2F2F2`, `#B4B4B4`, `#2B2B2B`, `#000000`.
- **Sin ubicación fija**: el sitio no muestra dirección ni mapa. Comunica el servicio como
  exclusivo, por turnos y en espacios seleccionados; la ubicación se pasa al confirmar
  la reserva por WhatsApp.
- Las imágenes salen del manual de marca y de la Colección 2026, en blanco y negro
  para mantener la estética del brandbook.
