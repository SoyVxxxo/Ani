function loadPage(page, cssFile, activeSection) {
  fetch(page)
    .then(res => {
      if (!res.ok) throw new Error(`No se pudo cargar ${page}`);
      return res.text();
    })
    .then(html => {
      const content = document.getElementById('content');

      // 🧼 Limpia la clase anterior si existe
      content.classList.remove('fade-in');

      // 🧠 Inserta el nuevo contenido
      content.innerHTML = html;

      // 🔁 Reinicia la animación
      void content.offsetWidth;
      content.classList.add('fade-in');

      // 🧩 Reinsertar scripts si vienen dentro del HTML cargado
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
      });

      // 🎨 Cambiar el estilo si se especifica
      const stylesheet = document.querySelector('link[rel="stylesheet"]');
      if (stylesheet && cssFile) {
        stylesheet.href = cssFile;
      }

      // 🔘 Mostrar todos los botones
      const botones = document.querySelectorAll('.nav-buttons button');
      botones.forEach(btn => btn.style.display = 'inline-block');

      // ❌ Ocultar el botón activo
      const botonActivo = document.getElementById(`btn-${activeSection}`);
      if (botonActivo) {
        botonActivo.style.display = 'none';
      }
    })
    .catch(err => {
      console.error('Error al cargar la página:', err);
      document.getElementById('content').innerHTML = `<p>Error al cargar la página: ${page}</p>`;
    });
}

function loadInicio() {
  document.getElementById('content').innerHTML = `
    <header>
      <h1>Welcome to our page my only love 💗</h1>
      <img src="Img/Family.jpg" class="Family-img" alt="Family">
      <img src="Img/Family2.jpg" class="Family2" alt="Family2">
    </header>
    <section>
      <p>
        Esta es la página de bienvenida, puedes continuar visualizando la página y descubriendo cada cosa 
        que implementé para que pudieras verla y disfrutarla.
      </p>
      <p>
        Con audio y todo. Espero que te guste mucho, la hice con mucho esfuerzo para ti mi amor. 💗
      </p>
    </section>
  `;

  const stylesheet = document.querySelector('link[rel="stylesheet"]');
  if (stylesheet) {
    stylesheet.href = 'style/style.css';
  }

  const botones = document.querySelectorAll('.nav-buttons button');
  botones.forEach(btn => btn.style.display = 'inline-block');

  const botonInicio = document.getElementById('btn-index');
  if (botonInicio) {
    botonInicio.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audioPlayer');
  const toggleBtn = document.getElementById('audioToggle');

  // Intentar reproducir automáticamente
  audio.play().then(() => {
    toggleBtn.textContent = '⏸️ Pausar música';
  }).catch(err => {
    console.warn("Autoplay bloqueado por el navegador.");
    toggleBtn.textContent = '▶️ Reproducir música';

    document.body.addEventListener('click', () => {
      audio.play();
      toggleBtn.textContent = '⏸️ Pausar música';
    }, { once: true });
  });

  // Control manual con el botón
  toggleBtn.addEventListener('click', () => {
    if (!audio.paused) {
      audio.pause();
      toggleBtn.textContent = '▶️ Reproducir música';
    } else {
      audio.play();
      toggleBtn.textContent = '⏸️ Pausar música';
    }
  });
});
