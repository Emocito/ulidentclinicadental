/**
 * Clínica Dental Ulident - Javascript Core
 * Handles: Scroll Reveal, Navbar state, Mobile Menu, Testimonial Carousel, and Cal.com Embed
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. NAVBAR SCROLL EFFECT & MOBILE MENU ---
  const header = document.querySelector('header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  
  // Sticky header background shift
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('shadow-md');
      header.classList.remove('py-5');
      header.classList.add('py-3');
    } else {
      header.classList.remove('shadow-md');
      header.classList.remove('py-3');
      header.classList.add('py-5');
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      // Change icon between menu and close
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (mobileMenu.classList.contains('hidden')) {
          icon.setAttribute('data-lucide', 'menu');
        } else {
          icon.setAttribute('data-lucide', 'x');
        }
        lucide.createIcons();
      }
    });

    // Close menu when clicking links
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }
      });
    });
  }

  // --- 2. SCROLL REVEAL ANIMATIONS ---
  const revealElements = document.querySelectorAll('.reveal-item');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          // Once animated, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is in full view
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- 3. ACTIVE NAV LINK ON SCROLL ---
  const sections = document.querySelectorAll('section[id], div[id="invisalign-card"]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: 0.4, // Section is considered active when 40% visible
      rootMargin: '-10% 0px -50% 0px' // Adjust triggers to align with viewport center
    });

    sections.forEach(section => navObserver.observe(section));
  }

  // --- 4. TESTIMONIAL CAROUSEL ---
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  
  if (track) {
    const slides = Array.from(track.children);
    let currentIndex = 0;
    let autoPlayInterval;
    
    // Create navigation dots dynamically based on number of slides
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-blue-600 w-6' : 'bg-slate-300 hover:bg-slate-400'}`;
      dot.setAttribute('aria-label', `Ir a reseña ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
    
    const dots = Array.from(dotsContainer.children);

    function updateCarousel() {
      // Calculate translate percentage
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots styling
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('bg-blue-600', 'w-6');
          dot.classList.remove('bg-slate-300');
        } else {
          dot.classList.remove('bg-blue-600', 'w-6');
          dot.classList.add('bg-slate-300');
        }
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    function nextSlide() {
      if (currentIndex === slides.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    }

    function prevSlide() {
      if (currentIndex === 0) {
        currentIndex = slides.length - 1;
      } else {
        currentIndex--;
      }
      updateCarousel();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    // Auto Play
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 6000); // Shift every 6 seconds
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    startAutoPlay();

    // Touch Swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeDistance = touchStartX - touchEndX;
      if (swipeDistance > 50) {
        nextSlide();
        resetAutoPlay();
      } else if (swipeDistance < -50) {
        prevSlide();
        resetAutoPlay();
      }
    }
  }

  // --- 5. CAL.COM INTEGRATION ---
  // We initialize the Cal.com SDK and embed the inline widget.
  // Note: The template uses a demo username 'alice' and event type '30min'.
  // Clinicians should change 'alice/30min' to their actual cal.com link (e.g. 'ulident/primera-cita').
  const calContainer = document.getElementById('my-cal-inline');
  
  if (calContainer) {
    (function (C, A, L) {
      // Standard Cal.com embed loader snippet
      let _let = C.Cal = C.Cal || function () {
        let l = _let.q = _let.q || [];
        l.push(arguments);
      };
      let m = A.createElement(L), e = A.getElementsByTagName(L)[0];
      m.async = 1;
      m.src = "https://app.cal.com/embed/embed.js";
      m.onload = function() {
        // Callback once the script is loaded successfully
        console.log("Cal.com SDK loaded successfully");
        
        // Initialize Cal
        Cal("init", { origin: "https://cal.com" });
        
        // Embed inline calendar
        // REPLACE 'alice/30min' with your actual username and event slug, e.g., 'ulident/primera-visita'
        Cal("inline", {
          elementOrSelector: "#my-cal-inline",
          calLink: "alice/30min",
          config: {
            theme: "light",
            styles: {
              branding: {
                brandColor: "#0F52BA", // Cobalt Blue
              }
            }
          }
        });
        
        // Cal UI customization
        Cal("ui", {
          styles: {
            branding: {
              brandColor: "#0F52BA"
            }
          },
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      };
      
      e.parentNode.insertBefore(m, e);
    })(window, document, "script");
  }

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- 6. COOKIES CONSENT SYSTEM ---
  const COOKIE_CONSENT_KEY = 'ulident-cookies-consent';

  const injectCookiesMarkup = () => {
    if (document.getElementById('cookies-banner')) return; // Already exists in HTML (e.g. index.html)

    const bannerHtml = `
      <div id="cookies-banner" class="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-slate-900/95 backdrop-blur-md text-white border border-white/10 p-6 rounded-3xl shadow-2xl z-50 transform translate-y-32 opacity-0 transition-all duration-500 pointer-events-none">
        <div class="flex items-start space-x-4">
          <div class="p-3 bg-brand-blue/20 text-brand-gold rounded-2xl border border-white/10 flex-shrink-0">
            <i data-lucide="cookie" class="w-6 h-6"></i>
          </div>
          <div class="space-y-3">
            <h4 class="font-heading font-extrabold text-sm text-white tracking-wide">¿Aceptas el uso de cookies?</h4>
            <p class="text-xs text-slate-300 leading-relaxed">
              Utilizamos cookies propias y de terceros para personalizar tu experiencia, recordar tu cita previa y analizar el tráfico de forma anónima. Conoce más en nuestra <a href="politica-cookies.html" class="text-brand-gold hover:underline font-semibold">Política de Cookies</a>.
            </p>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 mt-5">
          <button id="cookies-accept-all-btn" class="flex-1 px-4 py-2.5 bg-brand-blue hover:bg-brand-bluedark text-white rounded-xl text-xs font-bold transition-all shadow-md">
            Aceptar todas
          </button>
          <button id="cookies-reject-essential-btn" class="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-bold border border-white/10 transition-all">
            Rechazar no esenciales
          </button>
          <button id="cookies-configure-btn" class="px-4 py-2.5 text-brand-gold hover:text-brand-goldhover text-xs font-bold transition-all underline">
            Configurar
          </button>
        </div>
      </div>
    `;

    const modalHtml = `
      <div id="cookies-modal" class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 hidden opacity-0 transition-opacity duration-300">
        <div class="bg-white text-slate-800 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform scale-95 transition-transform duration-300">
          
          <div class="bg-brand-bluelight p-6 border-b border-brand-blue/10 flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-brand-blue/15 text-brand-blue rounded-xl flex items-center justify-center">
                <i data-lucide="settings" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="font-heading font-extrabold text-base text-slate-900 leading-tight">Configuración de Cookies</h3>
                <p class="text-[10px] text-brand-blue font-bold uppercase tracking-wider mt-0.5">Clínica Dental Ulident</p>
              </div>
            </div>
            <button id="cookies-modal-close-btn" class="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-200/50 rounded-xl transition-all">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            <p class="text-xs text-slate-500 leading-relaxed">
              Puedes personalizar tus preferencias sobre el almacenamiento de cookies en tu navegador. Activa o desactiva las categorías según consideres necesario:
            </p>

            <div class="flex items-start justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="space-y-1 pr-4">
                <div class="flex items-center space-x-2">
                  <span class="text-xs font-bold text-slate-900">Cookies Técnicas / Esenciales</span>
                  <span class="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[9px] font-semibold uppercase">Siempre Activas</span>
                </div>
                <p class="text-[11px] text-slate-500 leading-relaxed">
                  Necesarias para el correcto funcionamiento del portal, guardar tus preferencias de consentimiento de cookies y permitir el widget de reserva de citas.
                </p>
              </div>
              <div class="relative flex items-center select-none mt-1">
                <input type="checkbox" checked disabled class="sr-only peer">
                <div class="w-9 h-5 bg-blue-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 opacity-60"></div>
                <div class="absolute left-[18px] top-[2px] bg-white w-4 h-4 rounded-full transition-all"></div>
              </div>
            </div>

            <div class="flex items-start justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="space-y-1 pr-4">
                <h4 class="text-xs font-bold text-slate-900">Cookies Analíticas</h4>
                <p class="text-[11px] text-slate-500 leading-relaxed">
                  Nos permiten medir el número de visitas, el comportamiento de navegación en la web y detectar posibles errores para mejorar continuamente nuestro portal.
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer select-none mt-1">
                <input type="checkbox" id="cookies-toggle-analytics" class="sr-only peer">
                <div class="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div class="flex items-start justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="space-y-1 pr-4">
                <h4 class="text-xs font-bold text-slate-900">Cookies Publicitarias / Marketing</h4>
                <p class="text-[11px] text-slate-500 leading-relaxed">
                  Utilizadas para rastrear la efectividad de nuestras campañas publicitarias en redes sociales y buscadores, y mostrar anuncios relevantes de Clínica Dental Ulident.
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer select-none mt-1">
                <input type="checkbox" id="cookies-toggle-marketing" class="sr-only peer">
                <div class="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div class="bg-slate-50 p-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button id="cookies-save-settings-btn" class="flex-1 px-5 py-3 bg-brand-blue hover:bg-brand-bluedark text-white rounded-xl text-xs font-bold transition-all shadow-md">
              Guardar configuración
            </button>
            <button id="cookies-accept-all-modal-btn" class="flex-1 px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all">
              Permitir todas
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', bannerHtml);
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  const getSavedConsent = () => {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch (e) {
      return null;
    }
  };

  const saveConsent = (analytics, marketing) => {
    const consent = {
      technical: true,
      analytics: analytics,
      marketing: marketing,
      acceptedAt: new Date().toISOString()
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    applyConsent(consent);
  };

  const applyConsent = (consent) => {
    console.log("%c[Cookies Ulident] Aplicando configuración de privacidad:", "color: #0F52BA; font-weight: bold;", consent);
    
    if (consent.technical) {
      console.log("[Cookies Ulident] -> Cookies técnicas y esenciales habilitadas.");
    }
    
    if (consent.analytics) {
      console.log("[Cookies Ulident] -> Google Analytics HABILITADO.");
    } else {
      console.log("[Cookies Ulident] -> Google Analytics DESHABILITADO.");
    }

    if (consent.marketing) {
      console.log("[Cookies Ulident] -> Píxel de Meta HABILITADO.");
    } else {
      console.log("[Cookies Ulident] -> Píxel de Meta DESHABILITADO.");
    }
  };

  const initCookiesSystem = () => {
    injectCookiesMarkup();

    const banner = document.getElementById('cookies-banner');
    const modal = document.getElementById('cookies-modal');
    
    const acceptAllBtn = document.getElementById('cookies-accept-all-btn');
    const rejectEssentialBtn = document.getElementById('cookies-reject-essential-btn');
    const configureBtn = document.getElementById('cookies-configure-btn');
    
    const modalCloseBtn = document.getElementById('cookies-modal-close-btn');
    const saveSettingsBtn = document.getElementById('cookies-save-settings-btn');
    const acceptAllModalBtn = document.getElementById('cookies-accept-all-modal-btn');
    
    const toggleAnalytics = document.getElementById('cookies-toggle-analytics');
    const toggleMarketing = document.getElementById('cookies-toggle-marketing');

    if (!banner || !modal) return;

    const showBanner = () => {
      setTimeout(() => {
        banner.classList.add('show');
      }, 1000);
    };

    const hideBanner = () => {
      banner.classList.remove('show');
    };

    const openModal = () => {
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.add('show');
        const content = modal.querySelector('div');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
      }, 10);

      const current = getSavedConsent();
      if (current) {
        toggleAnalytics.checked = !!current.analytics;
        toggleMarketing.checked = !!current.marketing;
      } else {
        toggleAnalytics.checked = false;
        toggleMarketing.checked = false;
      }
    };

    const closeModal = () => {
      modal.classList.remove('show');
      const content = modal.querySelector('div');
      content.classList.add('scale-95');
      content.classList.remove('scale-100');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    };

    const savedConsent = getSavedConsent();
    if (savedConsent) {
      applyConsent(savedConsent);
    } else {
      showBanner();
    }

    if (acceptAllBtn) {
      acceptAllBtn.addEventListener('click', () => {
        saveConsent(true, true);
        hideBanner();
      });
    }

    if (rejectEssentialBtn) {
      rejectEssentialBtn.addEventListener('click', () => {
        saveConsent(false, false);
        hideBanner();
      });
    }

    if (configureBtn) {
      configureBtn.addEventListener('click', openModal);
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', () => {
        saveConsent(toggleAnalytics.checked, toggleMarketing.checked);
        closeModal();
        hideBanner();
      });
    }

    if (acceptAllModalBtn) {
      acceptAllModalBtn.addEventListener('click', () => {
        saveConsent(true, true);
        closeModal();
        hideBanner();
      });
    }

    window.addEventListener('open-cookies-config', openModal);
  };

  initCookiesSystem();
});

