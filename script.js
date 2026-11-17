(() => {
  "use strict";
  const paginas = ["inicio", "metas", "futuro"];
  const enlaces = [...document.querySelectorAll(".main-nav a[data-page]")];
  const secciones = paginas.map(id => document.getElementById(id)).filter(Boolean);

  function mostrarPagina(id, actualizarHistorial = false) {
    const pagina = paginas.includes(id) ? id : "inicio";

    secciones.forEach(seccion => {
      const activa = seccion.id === pagina;
      seccion.hidden = !activa;
      seccion.classList.toggle("active", activa);
    });

    enlaces.forEach(enlace => {
      const activo = enlace.dataset.page === pagina;
      enlace.classList.toggle("activo", activo);
      if (activo) enlace.setAttribute("aria-current", "page");
      else enlace.removeAttribute("aria-current");
    });

    if (actualizarHistorial && location.hash !== `#${pagina}`) {
      history.pushState({ pagina }, "", `#${pagina}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Un solo documento: el menú cambia secciones sin recargar ni abrir archivos nuevos.
  document.addEventListener("click", evento => {
    const enlace = evento.target.closest('a[href^="#"]');
    if (!enlace) return;
    const destino = enlace.getAttribute("href").slice(1);
    if (!paginas.includes(destino)) return;
    evento.preventDefault();
    mostrarPagina(destino, true);
  });

  window.addEventListener("popstate", () => {
    mostrarPagina(location.hash.slice(1) || "inicio", false);
  });
  window.addEventListener("hashchange", () => {
    mostrarPagina(location.hash.slice(1) || "inicio", false);
  });

  mostrarPagina(location.hash.slice(1) || "inicio", false);
})();
