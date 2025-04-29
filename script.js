// Import Header et Footer
function includeHTML() {
  const includes = document.querySelectorAll('[id="header"], [id="footer"]');
  includes.forEach(el => {
    let file = el.id + ".html";
    fetch(file)
      .then(response => {
        if (response.ok) return response.text();
        else throw new Error('Erreur de chargement : ' + file);
      })
      .then(data => {
        el.innerHTML = data;
        // Appeler hideHomeLink APRÈS que le header soit chargé
        if (el.id === 'header') {
          hideHomeLink();
        }
      })
      .catch(error => console.error(error));
  });
}

function hideHomeLink() {
  const homeLink = document.querySelector('.home-link');
  const path = window.location.pathname;
  if (homeLink && (path.endsWith('index.html') || path.endsWith('/') || path === '/index.html')) {
    homeLink.style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", includeHTML);
// Ici, ton ancien JavaScript fonctionnel continuera (animations, etc.)

 // Animation au scroll
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Animation des éléments
      const elements = document.querySelectorAll('.service-card, .contact-item, .contact-form');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.style.animation = 'fadeIn 0.8s forwards';
        }
      });
    });

    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Effet de survol dynamique
    document.querySelectorAll('.service-card, .contact-item').forEach(item => {
      item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    // Gestion de la newsletter
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const messageBox = document.getElementById('newsletterMessage');
      const submitBtn = this.querySelector('button[type="submit"]');
      
      // Animation du bouton
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi...';
      
      // Afficher le message après un court délai (simulation)
      setTimeout(() => {
        messageBox.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'S\'abonner';
        
        // Reset le formulaire
        this.reset();
        
        // Masquer le message après 5 secondes
        setTimeout(() => {
          messageBox.style.display = 'none';
        }, 5000);
      }, 1000);
    });

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const alertBox = document.getElementById('form-alert');
        const formData = new FormData(form);
        
        // Sauvegarde du contenu original du bouton
        const originalBtnContent = submitBtn.innerHTML;
        
        // État de chargement
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Envoi en cours...</span><i class="fas fa-spinner fa-spin"></i>';
        alertBox.style.display = 'none';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (data.ok || response.ok) {
                // Succès
                alertBox.innerHTML = '✅ Message envoyé avec succès! Nous vous contacterons bientôt.';
                alertBox.className = 'form-alert success';
                form.reset();
            } else {
                // Erreur de validation
                throw new Error(data.error || "Erreur lors de l'envoi");
            }
        } catch (error) {
            // Erreur réseau ou autre
            alertBox.innerHTML = '❌ ' + (error.message || "Erreur lors de l'envoi. Veuillez réessayer.");
            alertBox.className = 'form-alert error';
        } finally {
            alertBox.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            
            // Masquer l'alerte après 5 secondes
            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 5000);
        }
    });
}
	
// دالة لتحميل الهيدر والفوتر
function includeHTML() {
  const includes = document.querySelectorAll('[id="header"], [id="footer"]');
  includes.forEach(el => {
    let file = el.id + ".html";
    fetch(file)
      .then(response => {
        if (response.ok) return response.text();
        else throw new Error('Erreur de chargement : ' + file);
      })
      .then(data => {
        el.innerHTML = data;
        // بعد تحميل الهيدر، نقوم بإعداد القائمة المتنقلة
        if (el.id === 'header') {
          hideHomeLink();
          setupMobileMenu(); // <-- إضافة هذه الدالة
        }
      })
      .catch(error => console.error(error));
  });
}

// دالة لإعداد القائمة المتنقلة
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    // إزالة أي event listeners موجودة مسبقاً لتجنب التكرار
    mobileMenuBtn.replaceWith(mobileMenuBtn.cloneNode(true));
    const newMobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    newMobileMenuBtn.addEventListener('click', () => {
      newMobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // إغلاق القائمة عند النقر على أي رابط
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        newMobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }
}

// دالة لإخفاء رابط الصفحة الرئيسية إذا كنا فيها
function hideHomeLink() {
  const homeLink = document.querySelector('.home-link');
  const path = window.location.pathname;
  if (homeLink && (path.endsWith('index.html') || path.endsWith('/') || path === '/index.html')) {
    homeLink.style.display = 'none';
  }
}

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
  includeHTML();
  
  // إعداد القائمة المتنقلة مباشرةً (في حالة عدم استخدام includeHTML)
  setupMobileMenu();
  
  // هنا بقية الكود الخاص بك (animations, etc.)
});