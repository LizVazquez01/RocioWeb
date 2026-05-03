// Intersection Observer para animaciones de fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = (i % 4) * 100;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Parallax effect mejorado - solo en desktop
if (window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrollTop * 0.2}px)`;
    }
  }, { passive: true });
}

// Animación adicional de entrada para elementos críticos
document.addEventListener('DOMContentLoaded', () => {
  const heroTag = document.querySelector('.hero-tag');
  const h1 = document.querySelector('.hero h1');
  const desc = document.querySelector('.hero-desc');

  if (heroTag) heroTag.style.animation = 'slideInRight 0.8s ease-out';
  if (h1) h1.style.animation = 'slideInDown 0.8s ease-out';
  if (desc) desc.style.animation = 'slideInUp 0.8s ease-out 0.2s both';
});

// Control de botones: mostrar en nav solo en móvil, ocultar hero-cta en móvil 
function handleMobileNavButtons() {
  const isMobile = window.innerWidth <= 768;
  const heroCta = document.querySelector('.hero-cta');
  const navButtons = document.querySelector('.nav-buttons-mobile');

  if (heroCta && navButtons) {
    heroCta.style.display = isMobile ? 'none' : 'flex';
    navButtons.style.display = isMobile ? 'flex' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', handleMobileNavButtons);
window.addEventListener('resize', handleMobileNavButtons);

// Respeta las preferencias de movimiento reducido
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  const styles = document.createElement('style');
  styles.textContent = `
    * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  `;
  document.head.appendChild(styles);
}

// Reemplazo de animaciones CSS con JavaScript

// Animación de flotación (float)
function animateFloat(element) {
  let direction = 1;
  let position = 0;

  function step() {
    position += direction * 0.5;
    if (position > 10 || position < -10) {
      direction *= -1;
    }
    element.style.transform = `translateY(${position}px)`;
    requestAnimationFrame(step);
  }

  step();
}

document.addEventListener('DOMContentLoaded', () => {
  const floatingElements = document.querySelectorAll('.mockup-window');
  floatingElements.forEach(el => animateFloat(el));
});

// Animación de rotación y traslación (floatWindow)
function animateFloatWindow(element) {
  let angle = 0;

  function step() {
    angle += 0.5;
    const translateY = Math.sin(angle * (Math.PI / 180)) * 15;
    element.style.transform = `rotateX(2deg) rotateY(-5deg) translateY(${translateY}px)`;
    requestAnimationFrame(step);
  }

  step();
}

document.addEventListener('DOMContentLoaded', () => {
  const floatWindows = document.querySelectorAll('.mockup-window');
  floatWindows.forEach(el => animateFloatWindow(el));
});

// ==========================================================
// ANIMACIÓN DE SEGUIMIENTO DEL CURSOR (GLOW EFFECT)
// ==========================================================
// Este código hace que el div '.cursor-glow' siga al mouse con un efecto suave.

const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

// Registramos el movimiento del mouse
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Mostramos el resplandor con una transición suave
  if (cursorGlow && (cursorGlow.style.opacity === '0' || !cursorGlow.style.opacity)) {
    cursorGlow.style.opacity = '1';
  }
});

// Ocultamos el resplandor cuando el mouse sale de la ventana
document.addEventListener('mouseleave', () => {
  if (cursorGlow) cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  if (cursorGlow) cursorGlow.style.opacity = '1';
});

// Función de animación para el seguimiento suave
function animateGlow() {
  // Interpolación lineal (lerp) para suavizar el movimiento (0.08 es la velocidad de seguimiento, más bajo = más suave)
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;

  if (cursorGlow) {
    // Usamos translate3d para mejor rendimiento (aceleración por hardware)
    cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
  }

  requestAnimationFrame(animateGlow);
}

// Iniciamos el bucle de animación
animateGlow();

// === NUEVO: Soporte para Touch (Celulares) ===
document.addEventListener('touchstart', (e) => {
  mouseX = e.touches[0].clientX;
  mouseY = e.touches[0].clientY;
  if (cursorGlow) cursorGlow.style.opacity = '1';
}, { passive: true });
document.addEventListener('touchmove', (e) => {
  mouseX = e.touches[0].clientX;
  mouseY = e.touches[0].clientY;
}, { passive: true });
document.addEventListener('touchend', () => {
  if (window.innerWidth <= 768 && cursorGlow) {
    cursorGlow.style.opacity = '0';
  }
});

// BARRA DE PROGRESO DE SCROLL Y NAV DINÁMICO
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  
  // Barra de progreso
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }

  // Nav dinámico
  const nav = document.querySelector('nav');
  if (nav) {
    if (winScroll > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }
}, { passive: true });
// EFECTO FOCUS PARA TARJETAS EN MÓVIL
if (window.innerWidth <= 768) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('mobile-focus');
      } else {
        entry.target.classList.remove('mobile-focus');
      }
    });
  }, {
    threshold: 0.7
  });
  document.querySelectorAll('.service-card').forEach(card => {
    cardObserver.observe(card);
  });
}
