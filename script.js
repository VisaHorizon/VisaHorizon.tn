// ==============================================
// FONCTIONS PRINCIPALES
// ==============================================

/**
 * Charge les composants (header/footer) selon la langue
 */
async function loadComponents() {
  const isEnglish = document.documentElement.lang === 'en' || 
                   window.location.pathname.includes('-en.html');

  try {
    // Chargement du header
    const headerFile = isEnglish ? 'header-en.html' : 'header.html';
    const headerHTML = await fetchHTML(headerFile);
    document.getElementById(isEnglish ? 'header-en' : 'header').innerHTML = headerHTML;

    // Chargement du footer
    const footerFile = isEnglish ? 'footer-en.html' : 'footer.html';
    const footerHTML = await fetchHTML(footerFile);
    document.getElementById(isEnglish ? 'footer-en' : 'footer').innerHTML = footerHTML;

    // Initialisation des fonctionnalités
    initFeatures();
  } catch (error) {
    console.error('Erreur de chargement:', error);
  }
}

/**
 * Helper pour fetch avec gestion d'erreur
 */
async function fetchHTML(file) {
  const response = await fetch(file);
  if (!response.ok) throw new Error(`Erreur de chargement: ${file}`);
  return await response.text();
}

// ==============================================
// FONCTIONNALITÉS COMMUNES
// ==============================================

function initFeatures() {
  setupMobileMenu();
  hideCurrentPageLink();
  setupScrollAnimations();
  setupSmoothScrolling();
  setupHoverEffects();
  setupForms();
}

function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Fermer le menu au clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }
}

function hideCurrentPageLink() {
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.style.opacity = '0.5';
      link.style.pointerEvents = 'none';
    }
  });
}

// ==============================================
// ÉVÉNEMENTS
// ==============================================

document.addEventListener("DOMContentLoaded", loadComponents);

// [Restez votre code existant pour les animations, formulaires etc...]
// (Gardez toutes vos autres fonctions comme setupScrollAnimations(), 
// setupForms(), etc. qui restent identiques)

