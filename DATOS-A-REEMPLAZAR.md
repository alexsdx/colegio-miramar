# Datos a reemplazar antes de publicar

Este sitio es una **maqueta de demostración**. Todos los datos son ficticios: la
escuela "Colegio Miramar" no existe. Antes de publicarlo con el nombre de una
escuela real hay que sustituir todo lo de esta lista.

El sitio es HTML + CSS + JS estático, sin build ni dependencias: se edita con
cualquier editor de texto y se abre con doble clic sobre `index.html`.

---

## 1. Identidad de la escuela

| Dato ficticio | Dónde aparece |
|---|---|
| Colegio Miramar | Los 7 `.html` (título, encabezado, pie, JSON-LD) |
| Primaria · Tampico | `.marca__bajada` del encabezado y del pie |
| CCT 28PPR0123L | Barra superior y pie de las 7 páginas |
| Ciclo escolar 2026–2027 | Barra superior, `avisos.html`, `admisiones.html` |
| Turno matutino, 7:30 – 14:00 h | Barra superior, pie, `oferta-educativa.html` |
| Fundación en 1998, 28 años | `index.html` y `nosotros.html` |
| `https://alexsdx.github.io/colegio-miramar/` | `<link rel="canonical">`, `og:url`, `og:image` y JSON-LD de cada página. Hoy apuntan a la URL de GitHub Pages, no a un dominio de la escuela |

Búsqueda rápida para encontrarlo todo:

```bash
grep -rn "Miramar\|28PPR0123L\|colegiomiramar" *.html
```

## 2. Contacto y ubicación

| Dato ficticio | Dónde aparece |
|---|---|
| Av. Hidalgo 1204, Col. Smith, C.P. 89140 | Pie de las 7 páginas, `contacto.html`, JSON-LD de `index.html` |
| (833) 000-0000 y (833) 000-0001 | Barra superior, pie, `contacto.html`, `admisiones.html`, botones `tel:` |
| contacto@ / admisiones@colegiomiramar.edu.mx | Barra superior, pie, `contacto.html` |
| Coordenadas 22.2553 / −97.8686 | JSON-LD de `index.html` y el `<iframe>` del mapa en `contacto.html` |

El mapa es un `<iframe>` de OpenStreetMap sin llave de API. Para moverlo, cambia
el `bbox` y el `marker` de la URL en `contacto.html`. Si prefieres Google Maps,
sustituye el `<iframe>` completo por el código que da "Compartir → Insertar un mapa".

## 3. Personas

`nosotros.html` lista seis integrantes del equipo con nombres, cargos y retratos
inventados. Sustituye nombre, cargo, descripción y la imagen de cada tarjeta
`.persona`, o borra las que sobren.

## 4. Cifras económicas

`admisiones.html`, sección `#costos`: la tabla completa de inscripción,
colegiatura, materiales, seguro, uniforme y comedor, más las tres tarjetas de
descuentos y becas. **Todos los importes son inventados.** Cámbialos por las
cuotas autorizadas y revisa que las condiciones coincidan con el reglamento
interno.

## 5. Avisos y calendario

`avisos.html` trae nueve avisos y un calendario de tres periodos con fechas
plausibles pero no oficiales. Ajústalo al calendario que publique la SEP para el
ciclo correspondiente.

Para agregar un aviso, copia un `<li class="aviso …">` completo y cambia:

- `data-categoria` — `academico`, `administrativo` o `evento` (así lo encuentra el filtro)
- la clase modificadora del `<li>` — sin modificador, `aviso--administrativo` o `aviso--evento` (el color de la barra izquierda)
- la clase de la `.etiqueta` — `etiqueta--academico`, `etiqueta--administrativo` o `etiqueta--evento`
- el `datetime` y el texto del `<time>`

Las tres cosas tienen que concordar; nada las sincroniza automáticamente.

## 6. Imágenes

Todas las imágenes son ilustraciones SVG de relleno. Ver `img/README.md` para la
lista, las medidas de sustitución y la advertencia legal sobre fotografías de
menores.

## 7. Formularios — no envían nada

Hay dos formularios: el pre-registro de `admisiones.html#preinscripcion` y el de
contacto de `contacto.html`. Los dos validan en el navegador y muestran una
confirmación, pero **no mandan la información a ningún lado**. Esto fue una
decisión explícita del proyecto, no un pendiente olvidado.

Para conectarlos de verdad hay que elegir un destino y modificar el módulo 5 de
`js/main.js` (`iniciarFormularios`), donde ahora dice:

```js
aviso.className = 'mensaje-formulario mensaje-formulario--exito';
aviso.textContent = formulario.getAttribute('data-exito') || …;
```

Ahí es donde iría el `fetch()` al servicio que se elija. Tres caminos, de menor a
mayor esfuerzo:

1. **Servicio de formularios** (Formspree, Basin, Web3Forms): se pone su URL en el
   `action` del `<form>` y se manda el `FormData` con `fetch`. Sin servidor propio.
2. **Función serverless** (Netlify Functions, Cloudflare Workers, Vercel): control
   total sobre el correo de destino y sobre dónde se guardan los datos.
3. **Backend propio** con base de datos, si la escuela ya tiene uno.

Sea cual sea: en cuanto los formularios recojan datos personales de menores hay
que publicar un **aviso de privacidad** conforme a la LFPDPPP y enlazarlo desde
la casilla de aceptación de los dos formularios. Hoy esa casilla no apunta a
ningún documento.

## 8. Antes de subirlo

- [ ] Reemplazar todo lo anterior y borrar las notas `.nota-maqueta` de las páginas
- [ ] Quitar del pie la línea "Sitio de demostración con datos ficticios"
- [ ] Publicar el aviso de privacidad y enlazarlo
- [ ] Revisar los `og:image` — apuntan a `img/heroe.svg`; para que se vea bien al
      compartir en redes conviene un PNG o JPG de 1200 × 630 px
- [ ] Cambiar `canonical`, `og:url`, `og:image` y JSON-LD de la URL de GitHub Pages
      al dominio real de la escuela
