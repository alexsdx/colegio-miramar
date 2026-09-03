/* ==========================================================================
   Colegio Miramar — Primaria · Tampico, Tamaulipas
   JavaScript del sitio. Sin librerías ni dependencias.

   Módulos:
   1. Menú móvil        5. Validación de formularios
   2. Filtros           6. Año automático del pie
   3. Visor de galería  7. Revelado al hacer scroll
   4. (utilidades)
   ========================================================================== */
(function () {
  'use strict';

  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Elementos enfocables dentro de un contenedor (para atrapar el foco). */
  var SELECTOR_ENFOCABLE = 'a[href], button:not([disabled]), input:not([disabled]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /* ------------------------------------------------------------------------
     1. MENÚ MÓVIL
     El panel se oculta con el atributo hidden para que también quede oculto
     para lectores de pantalla, no solo visualmente.
     ------------------------------------------------------------------------ */
  function iniciarMenu() {
    var boton = document.querySelector('.nav-alterna');
    var panel = document.getElementById('menu-principal');
    if (!boton || !panel) return;

    var escritorio = window.matchMedia('(min-width: 980px)');

    function abrir() {
      panel.hidden = false;
      boton.setAttribute('aria-expanded', 'true');
    }
    function cerrar() {
      panel.hidden = true;
      boton.setAttribute('aria-expanded', 'false');
    }
    function sincronizar() {
      // En escritorio el menú es siempre visible; en móvil arranca cerrado.
      if (escritorio.matches) {
        panel.hidden = false;
        boton.setAttribute('aria-expanded', 'false');
      } else {
        cerrar();
      }
    }

    boton.addEventListener('click', function () {
      if (boton.getAttribute('aria-expanded') === 'true') { cerrar(); } else { abrir(); }
    });

    // Cerrar al elegir un destino.
    panel.addEventListener('click', function (evento) {
      if (evento.target.closest('a') && !escritorio.matches) cerrar();
    });

    // Cerrar con Escape y devolver el foco al botón.
    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') {
        cerrar();
        boton.focus();
      }
    });

    // Cerrar al tocar fuera del encabezado.
    document.addEventListener('click', function (evento) {
      if (escritorio.matches) return;
      if (boton.getAttribute('aria-expanded') !== 'true') return;
      if (!evento.target.closest('.encabezado')) cerrar();
    });

    if (escritorio.addEventListener) {
      escritorio.addEventListener('change', sincronizar);
    } else if (escritorio.addListener) {
      escritorio.addListener(sincronizar); // navegadores antiguos
    }

    sincronizar();
  }

  /* ------------------------------------------------------------------------
     2. FILTROS POR CATEGORÍA
     Sirve igual para los avisos y para la galería. Cada grupo de botones
     declara data-filtros="<id de la lista>"; cada pieza declara data-categoria.
     ------------------------------------------------------------------------ */
  function iniciarFiltros() {
    var grupos = document.querySelectorAll('[data-filtros]');

    Array.prototype.forEach.call(grupos, function (grupo) {
      var lista = document.getElementById(grupo.getAttribute('data-filtros'));
      if (!lista) return;

      var botones = grupo.querySelectorAll('.filtro');
      var piezas = lista.querySelectorAll('[data-categoria]');
      var conteo = document.getElementById(grupo.getAttribute('data-conteo') || '');

      function aplicar(categoria) {
        var visibles = 0;

        Array.prototype.forEach.call(piezas, function (pieza) {
          var coincide = categoria === 'todas' || pieza.getAttribute('data-categoria') === categoria;
          pieza.hidden = !coincide;
          if (coincide) visibles++;
        });

        Array.prototype.forEach.call(botones, function (boton) {
          boton.setAttribute('aria-pressed', String(boton.getAttribute('data-categoria') === categoria));
        });

        if (conteo) {
          conteo.textContent = visibles === 1
            ? 'Se muestra 1 resultado.'
            : 'Se muestran ' + visibles + ' resultados.';
        }
      }

      Array.prototype.forEach.call(botones, function (boton) {
        boton.addEventListener('click', function () {
          aplicar(boton.getAttribute('data-categoria'));
        });
      });

      aplicar('todas');
    });
  }

  /* ------------------------------------------------------------------------
     3. VISOR DE GALERÍA
     Diálogo modal accesible: atrapa el foco, cierra con Escape o con clic en
     el fondo, y devuelve el foco al botón que lo abrió.
     ------------------------------------------------------------------------ */
  function iniciarVisor() {
    var visor = document.getElementById('visor');
    if (!visor) return;

    var lienzo = visor.querySelector('.visor__lienzo');
    var titulo = visor.querySelector('.visor__titulo');
    var texto = visor.querySelector('.visor__texto');
    var cerrarBoton = visor.querySelector('.visor__cerrar');
    var disparadores = document.querySelectorAll('.galeria__boton');
    var ultimoFoco = null;

    function abrir(boton) {
      var lienzoOrigen = boton.querySelector('.galeria__lienzo');

      lienzo.innerHTML = '';
      if (lienzoOrigen) {
        Array.prototype.forEach.call(lienzoOrigen.children, function (hijo) {
          lienzo.appendChild(hijo.cloneNode(true));
        });
      }
      titulo.textContent = boton.getAttribute('data-titulo') || '';
      texto.textContent = boton.getAttribute('data-texto') || '';

      ultimoFoco = boton;
      visor.hidden = false;
      document.body.style.overflow = 'hidden';
      cerrarBoton.focus();
    }

    function cerrar() {
      visor.hidden = true;
      document.body.style.overflow = '';
      if (ultimoFoco) ultimoFoco.focus();
    }

    Array.prototype.forEach.call(disparadores, function (boton) {
      boton.addEventListener('click', function () { abrir(boton); });
    });

    cerrarBoton.addEventListener('click', cerrar);

    // Clic en el fondo oscuro (no dentro de la caja).
    visor.addEventListener('click', function (evento) {
      if (!evento.target.closest('.visor__caja')) cerrar();
    });

    visor.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape') { cerrar(); return; }
      if (evento.key !== 'Tab') return;

      // Foco atrapado dentro del diálogo.
      var enfocables = visor.querySelectorAll(SELECTOR_ENFOCABLE);
      if (!enfocables.length) return;
      var primero = enfocables[0];
      var ultimo = enfocables[enfocables.length - 1];

      if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. VALIDACIÓN DE FORMULARIOS
     MAQUETA: no se envía nada a ningún servidor. Se valida en el navegador y
     se muestra una confirmación. Para conectar un envío real, ver
     DATOS-A-REEMPLAZAR.md.
     ------------------------------------------------------------------------ */
  var PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  var PATRON_TELEFONO = /^[\d\s()+-]{10,20}$/;

  function iniciarFormularios() {
    var formularios = document.querySelectorAll('[data-validar]');

    Array.prototype.forEach.call(formularios, function (formulario) {
      var aviso = formulario.querySelector('.mensaje-formulario');
      var campos = formulario.querySelectorAll('input, select, textarea');

      function errorDe(campo) {
        return document.getElementById(campo.id + '-error');
      }

      function marcar(campo, mensaje) {
        var caja = errorDe(campo);
        if (mensaje) {
          campo.setAttribute('aria-invalid', 'true');
          if (caja) caja.textContent = mensaje;
        } else {
          campo.removeAttribute('aria-invalid');
          if (caja) caja.textContent = '';
        }
      }

      function revisar(campo) {
        var valor = (campo.value || '').trim();
        var etiqueta = campo.getAttribute('data-nombre') || 'Este campo';

        if (campo.type === 'checkbox') {
          if (campo.required && !campo.checked) return 'Debes marcar esta casilla para continuar.';
          return '';
        }
        if (campo.required && !valor) return etiqueta + ' es un dato obligatorio.';
        if (!valor) return '';
        if (campo.type === 'email' && !PATRON_CORREO.test(valor)) {
          return 'Escribe un correo válido, por ejemplo: nombre@dominio.com';
        }
        if (campo.type === 'tel' && !PATRON_TELEFONO.test(valor)) {
          return 'Escribe un teléfono a 10 dígitos, por ejemplo: 833 123 4567';
        }
        if (campo.minLength > 0 && valor.length < campo.minLength) {
          return etiqueta + ' debe tener al menos ' + campo.minLength + ' caracteres.';
        }
        return '';
      }

      // Al salir del campo se valida; una vez marcado, se corrige al escribir.
      Array.prototype.forEach.call(campos, function (campo) {
        campo.addEventListener('blur', function () { marcar(campo, revisar(campo)); });
        campo.addEventListener('input', function () {
          if (campo.getAttribute('aria-invalid') === 'true') marcar(campo, revisar(campo));
        });
      });

      formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();

        var primerFallo = null;

        Array.prototype.forEach.call(campos, function (campo) {
          var mensaje = revisar(campo);
          marcar(campo, mensaje);
          if (mensaje && !primerFallo) primerFallo = campo;
        });

        if (primerFallo) {
          aviso.className = 'mensaje-formulario mensaje-formulario--error';
          aviso.textContent = 'Revisa los campos marcados: falta información o tiene un formato incorrecto.';
          primerFallo.focus();
          return;
        }

        aviso.className = 'mensaje-formulario mensaje-formulario--exito';
        aviso.textContent = formulario.getAttribute('data-exito') ||
          'Listo, recibimos tus datos. Te contactaremos en un máximo de dos días hábiles.';

        formulario.reset();
        Array.prototype.forEach.call(campos, function (campo) { marcar(campo, ''); });
        aviso.scrollIntoView({ behavior: menosMovimiento ? 'auto' : 'smooth', block: 'center' });
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. AÑO AUTOMÁTICO DEL PIE
     ------------------------------------------------------------------------ */
  function iniciarAnio() {
    var destinos = document.querySelectorAll('[data-anio]');
    var anio = String(new Date().getFullYear());
    Array.prototype.forEach.call(destinos, function (destino) { destino.textContent = anio; });
  }

  /* ------------------------------------------------------------------------
     7. REVELADO AL HACER SCROLL
     Si el usuario pide menos movimiento, o el navegador no soporta
     IntersectionObserver, todo se muestra de inmediato.
     ------------------------------------------------------------------------ */
  function iniciarRevelado() {
    var piezas = document.querySelectorAll('.revelar');
    if (!piezas.length) return;

    if (menosMovimiento || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(piezas, function (pieza) { pieza.classList.add('visible'); });
      return;
    }

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    Array.prototype.forEach.call(piezas, function (pieza) { observador.observe(pieza); });
  }

  /* ------------------------------------------------------------------------
     Arranque
     ------------------------------------------------------------------------ */
  function iniciar() {
    iniciarMenu();
    iniciarFiltros();
    iniciarVisor();
    iniciarFormularios();
    iniciarAnio();
    iniciarRevelado();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
