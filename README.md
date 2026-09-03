# Colegio Miramar — sitio de demostración

Sitio web de ejemplo para una escuela primaria, construido como **maqueta de
demostración**. Se publica en:

**https://alexsdx.github.io/colegio-miramar/**

> [!IMPORTANT]
> **La escuela no existe.** "Colegio Miramar" es ficticio y todos los datos del
> sitio —nombre, CCT, domicilio, teléfonos, correos, personal, cuotas, calendario
> e imágenes— son inventados. No corresponden a ninguna institución real.
> Los dos formularios validan en el navegador y muestran una confirmación, pero
> **no envían la información a ningún servidor**.

## Qué es

HTML + CSS + JavaScript estático, sin build, sin dependencias y sin framework.
Se edita con cualquier editor de texto y se abre con doble clic sobre `index.html`.

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` y 6 páginas más | Inicio, nosotros, oferta educativa, admisiones, avisos, galería, contacto |
| `css/estilos.css` | Hoja única, organizada en 10 capas comentadas |
| `js/main.js` | Sin librerías: filtros, visor de galería, validación de formularios y menú móvil |
| `img/` | Ilustraciones SVG de relleno (ver `img/README.md`) |
| `DATOS-A-REEMPLAZAR.md` | Lista paso a paso de todo lo ficticio que habría que sustituir |

## Para reutilizarlo con una escuela real

Sigue `DATOS-A-REEMPLAZAR.md`. Además de sustituir los datos, hace falta publicar
un **aviso de privacidad** conforme a la LFPDPPP antes de que los formularios
recojan datos personales de menores, y leer la advertencia legal de `img/README.md`
sobre fotografías de menores de edad.
