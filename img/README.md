# Imágenes del sitio

Ninguna de estas imágenes es una fotografía. Son **ilustraciones SVG planas**,
dibujadas a mano con la paleta del sitio (azul golfo, turquesa, coral, sol y
arena) para que la maqueta se vea completa sin usar fotos de terceros.

Están pensadas para sustituirse. Al reemplazarlas, conserva el mismo nombre de
archivo y así no hay que tocar el HTML; si cambias la extensión (`.svg` → `.jpg`),
actualiza también el `src` y el `alt` correspondiente.

---

## Inventario

| Archivo | Proporción | Tamaño mínimo al sustituir | Dónde se usa |
|---|---|---|---|
| `logo.svg` | 1:1 | vectorial, 48 px de base | Encabezado y pie de las 7 páginas |
| `favicon.svg` | 1:1 | vectorial | `<link rel="icon">` de las 7 páginas |
| `heroe.svg` | 3:4 | 900 × 1200 px | Héroe de `index.html`, `og:image` |
| `escena-fachada.svg` | 4:3 | 1200 × 900 px | `nosotros.html`, `galeria.html` |
| `escena-salon.svg` | 4:3 | 1200 × 900 px | `index.html`, `oferta-educativa.html`, `galeria.html` |
| `escena-biblioteca.svg` | 4:3 | 1200 × 900 px | `nosotros.html`, `galeria.html` |
| `escena-robotica.svg` | 4:3 | 1200 × 900 px | `nosotros.html`, `galeria.html` |
| `escena-arte.svg` | 4:3 | 1200 × 900 px | `nosotros.html`, `galeria.html` |
| `escena-deportes.svg` | 4:3 | 1200 × 900 px | `nosotros.html`, `galeria.html` |
| `escena-ingles.svg` | 4:3 | 1200 × 900 px | `galeria.html` |
| `escena-recreo.svg` | 4:3 | 1200 × 900 px | `admisiones.html`, `galeria.html` |
| `escena-civica.svg` | 4:3 | 1200 × 900 px | `galeria.html` |
| `retrato-01.svg` … `retrato-06.svg` | 3:4 | 600 × 800 px | Tarjetas `.persona` de `nosotros.html` |

Las imágenes se recortan con `object-fit: cover`, así que lo importante queda al
centro del encuadre. En los retratos, la cara debe caer en el tercio superior.

## Antes de publicar fotos reales

Fotografiar y publicar imágenes de menores de edad requiere **autorización
firmada del padre, madre o tutor** de cada niña o niño identificable. Es un
requisito legal, no una formalidad. Recomendaciones prácticas:

- Guarda las cartas de autorización antes de subir una sola foto.
- Cuando no tengas autorización de todos, usa tomas de espalda, de manos o de
  detalle: sirven igual y no identifican a nadie.
- No publiques nombres completos de alumnos junto a su fotografía.
- Optimiza antes de subir: JPG de calidad 80 o WebP. Ninguna foto debería pesar
  más de 300 KB.
- Escribe un `alt` que describa lo que se ve, no "foto de la escuela". El `alt`
  vacío (`alt=""`) es correcto solo para imágenes decorativas, como el escudo que
  acompaña al nombre del colegio.

## Si quieres conservar el estilo ilustrado

Los SVG se pueden editar con cualquier editor de texto o con Inkscape / Figma.
Los colores usados son los mismos tokens de `css/estilos.css`:

```
#0E4C5A  mar          #186F80  turquesa      #1D8296  turquesa vivo
#BB4019  coral        #E8703F  coral vivo    #F0B255  sol
#2F6B4F  palma        #F7F1E4  arena         #FFFCF5  crema
```

Cada archivo trae un `<title>` y un `role="img"` con `aria-label`; si editas el
dibujo, actualiza también ese texto.
