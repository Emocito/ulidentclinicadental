/**
 * Clínica Dental Ulident - Javascript Core
 * Handles: Scroll Reveal, Navbar state, Mobile Menu, Testimonial Carousel, and Cal.com Embed
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. NAVBAR SCROLL EFFECT & MOBILE MENU UPGRADE (NAVIGATION DRAWER) ---
  const header = document.querySelector('header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  
  // Sticky header background shift
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('shadow-md');
        header.classList.remove('py-5');
        header.classList.add('py-3');
      } else {
        header.classList.remove('shadow-md');
        header.classList.remove('py-3');
        header.classList.add('py-5');
      }
    }
  });

  const upgradeMobileNavigation = () => {
    const oldMobileMenu = document.getElementById('mobile-menu');
    if (oldMobileMenu) {
      oldMobileMenu.remove(); // Remove old static dropdown
    }

    if (!mobileMenuBtn) return;

    // Create backdrop element
    const backdrop = document.createElement('div');
    backdrop.id = 'mobile-menu-backdrop';
    backdrop.className = 'fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 hidden opacity-0 transition-opacity duration-300 pointer-events-none';
    document.body.appendChild(backdrop);

    // Create drawer element
    const drawer = document.createElement('div');
    drawer.id = 'mobile-menu-drawer';
    drawer.className = 'fixed inset-y-0 right-0 w-4/5 max-w-sm h-full bg-[#0B3A70] shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto transform translate-x-full transition-transform duration-300 ease-in-out lg:hidden';
    
    drawer.innerHTML = `
      <!-- Drawer Header -->
      <div class="flex items-center justify-between pb-6 border-b border-white/10 flex-shrink-0">
        <a href="index.html" class="flex items-center space-x-3 group">
          <svg viewBox="0 0 100 100" class="w-8 h-8 text-white fill-none stroke-white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M50,80 C22,58 10,40 10,26 C10,14 19,8 29,8 C37,8 44,13 50,18 C56,13 63,8 71,8 C81,8 90,14 90,26 C90,40 78,58 50,80 Z" />
            <path d="M50,18 L73,41 L50,64 L27,41 Z" />
          </svg>
          <div class="flex flex-col">
            <span class="font-heading font-extrabold text-lg tracking-wide text-white leading-none">ULIDENT</span>
            <span class="text-[6.5px] uppercase tracking-[0.2em] text-white/80 font-semibold mt-1">PERFECT & NATURAL SMILE</span>
          </div>
        </a>
        <button id="mobile-menu-close-btn" class="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all" aria-label="Cerrar menú">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
      </div>

      <!-- Drawer Content -->
      <nav class="flex-grow py-6 flex flex-col space-y-6 overflow-y-auto pr-1">
        <div class="space-y-3">
          <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold border-l-2 border-brand-gold pl-2">Nuestros Tratamientos</p>
          <div class="grid grid-cols-1 gap-1.5 pl-2">
            <a href="odontologia-general.html" class="flex items-center space-x-3 text-sm font-semibold text-slate-200 hover:text-brand-gold py-1.5 transition-colors drawer-link">
              <i data-lucide="stethoscope" class="w-4 h-4 text-white/60 flex-shrink-0"></i>
              <span>Odontología General</span>
            </a>
            <a href="implantologia.html" class="flex items-center space-x-3 text-sm font-semibold text-slate-200 hover:text-brand-gold py-1.5 transition-colors drawer-link">
              <i data-lucide="crown" class="w-4 h-4 text-white/60 flex-shrink-0"></i>
              <span>Implantología</span>
            </a>
            <a href="ortodoncia.html" class="flex items-center space-x-3 text-sm font-semibold text-slate-200 hover:text-brand-gold py-1.5 transition-colors drawer-link">
              <i data-lucide="grid" class="w-4 h-4 text-white/60 flex-shrink-0"></i>
              <span>Ortodoncia</span>
            </a>
            <a href="odontopediatria.html" class="flex items-center space-x-3 text-sm font-semibold text-slate-200 hover:text-brand-gold py-1.5 transition-colors drawer-link">
              <i data-lucide="baby" class="w-4 h-4 text-white/60 flex-shrink-0"></i>
              <span>Odontopediatría</span>
            </a>
            <a href="estetica-dental.html#blanqueamiento" class="flex items-center space-x-3 text-sm font-semibold text-slate-200 hover:text-brand-gold py-1.5 transition-colors drawer-link">
              <i data-lucide="sun" class="w-4 h-4 text-white/60 flex-shrink-0"></i>
              <span>Blanqueamiento Dental</span>
            </a>
            <a href="estetica-dental.html#carillas" class="flex items-center space-x-3 text-sm font-semibold text-slate-200 hover:text-brand-gold py-1.5 transition-colors drawer-link">
              <i data-lucide="layers" class="w-4 h-4 text-white/60 flex-shrink-0"></i>
              <span>Carillas</span>
            </a>
            <a href="estetica-dental.html#dsd" class="flex items-center space-x-3 text-sm font-semibold text-slate-200 hover:text-brand-gold py-1.5 transition-colors drawer-link">
              <i data-lucide="monitor" class="w-4 h-4 text-white/60 flex-shrink-0"></i>
              <span>Digital Smile Design</span>
            </a>
            <a href="estetica-dental.html#joya-dental" class="flex items-center space-x-3 text-sm font-semibold text-slate-200 hover:text-brand-gold py-1.5 transition-colors drawer-link">
              <i data-lucide="gem" class="w-4 h-4 text-white/60 flex-shrink-0"></i>
              <span>Joya Dental</span>
            </a>
          </div>
        </div>

        <hr class="border-white/10">

        <div class="space-y-3 flex flex-col pl-2">
          <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold border-l-2 border-brand-gold pl-2 mb-1">Clínica</p>
          <a href="nosotros.html" class="flex items-center space-x-3 text-sm font-semibold text-white/90 hover:text-brand-gold py-1.5 transition-colors drawer-link">
            <i data-lucide="users" class="w-4 h-4 text-white/60 flex-shrink-0"></i>
            <span>Sobre Nosotros</span>
          </a>
          <a href="index.html#financiacion" class="flex items-center space-x-3 text-sm font-semibold text-white/90 hover:text-brand-gold py-1.5 transition-colors drawer-link">
            <i data-lucide="credit-card" class="w-4 h-4 text-white/60 flex-shrink-0"></i>
            <span>Financiación</span>
          </a>
          <a href="contacto.html" class="flex items-center space-x-3 text-sm font-semibold text-white/90 hover:text-brand-gold py-1.5 transition-colors drawer-link">
            <i data-lucide="mail" class="w-4 h-4 text-white/60 flex-shrink-0"></i>
            <span>Contacto</span>
          </a>
        </div>
      </nav>

      <!-- Drawer Footer -->
      <div class="pt-6 border-t border-white/10 space-y-4 flex-shrink-0">
        <a href="tel:+34910248447" class="w-full py-3 rounded-xl text-sm font-bold text-[#0B3A70] bg-white hover:bg-slate-100 transition-colors flex items-center justify-center space-x-2 shadow-lg">
          <i data-lucide="phone" class="w-4 h-4 fill-current"></i>
          <span>Llamar: 910 248 447</span>
        </a>
        <div class="text-center text-[10px] text-slate-300 space-y-1">
          <p class="font-medium text-slate-200">Av. del Marqués de Corbera, 14, Madrid</p>
          <p class="text-slate-400">L-V: 10:00-14:00 | 16:00-20:00</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(drawer);

    // Dynamic Active Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    const drawerLinks = drawer.querySelectorAll('.drawer-link');
    
    drawerLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const [linkPath, linkHash] = href.split('#');
      
      const pathMatches = (linkPath === currentPath) || (linkPath === '' && currentPath === 'index.html') || (linkPath === 'index.html' && currentPath === '');
      const hashMatches = !linkHash ? !currentHash : currentHash === `#${linkHash}`;
      
      if (pathMatches && hashMatches) {
        link.classList.add('text-brand-gold', 'font-bold');
        link.classList.remove('text-slate-200', 'text-white/90');
        const icon = link.querySelector('i');
        if (icon) {
          icon.classList.add('text-brand-gold');
          icon.classList.remove('text-white/60');
        }
      }
    });

    // Setup transitions
    const openDrawer = () => {
      backdrop.classList.remove('hidden');
      // Trigger reflow
      backdrop.offsetHeight;
      backdrop.classList.add('active');
      drawer.classList.add('active');
      document.body.classList.add('overflow-hidden');
      
      const menuIcon = mobileMenuBtn.querySelector('i');
      if (menuIcon) {
        menuIcon.setAttribute('data-lucide', 'x');
        lucide.createIcons();
      }
    };

    const closeDrawer = () => {
      backdrop.classList.remove('active');
      drawer.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      
      const menuIcon = mobileMenuBtn.querySelector('i');
      if (menuIcon) {
        menuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      }

      setTimeout(() => {
        if (!drawer.classList.contains('active')) {
          backdrop.classList.add('hidden');
        }
      }, 350);
    };

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (drawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    backdrop.addEventListener('click', closeDrawer);
    
    const closeBtn = drawer.querySelector('#mobile-menu-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Also close drawer if links inside are clicked (useful for anchors on same page)
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Reinitialize Lucide Icons for the newly added HTML content
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  upgradeMobileNavigation();

  // --- 1.1 MOBILE STICKY CTA BOTTOM BAR ---
  const injectMobileStickyCta = () => {
    if (document.getElementById('mobile-sticky-cta')) return;

    const stickyCta = document.createElement('div');
    stickyCta.id = 'mobile-sticky-cta';
    stickyCta.className = 'fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex justify-between items-center px-2 py-2 pb-safe';
    
    stickyCta.innerHTML = `
      <!-- Llamar -->
      <a href="tel:+34910248447" class="flex-1 flex flex-col items-center justify-center text-slate-600 hover:text-brand-blue py-1 transition-colors">
        <i data-lucide="phone" class="w-5 h-5 mb-1 text-slate-500"></i>
        <span class="text-[10px] font-bold uppercase tracking-wider">Llamar</span>
      </a>

      <!-- WhatsApp -->
      <a href="https://wa.me/34679926552" target="_blank" rel="noopener noreferrer" class="flex-1 flex flex-col items-center justify-center text-slate-600 hover:text-[#25D366] py-1 transition-colors border-x border-slate-100">
        <svg viewBox="0 0 24 24" class="w-5 h-5 mb-1 text-[#25D366] fill-current">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.419 9.86-9.857.002-2.635-1.02-5.11-2.883-6.975C16.577 1.907 14.1 .883 11.468.883 6.03.883 1.61 5.303 1.608 10.742c-.001 1.666.438 3.293 1.272 4.739l-.951 3.472 3.557-.933c1.558.85 3.125 1.271 4.544 1.271h.001L6.647 19.15zm10.963-7.533c-.324-.162-1.92-.949-2.217-1.058-.297-.108-.513-.162-.73.162-.216.324-.838 1.058-1.027 1.274-.189.216-.378.243-.702.08-2.673-1.335-4.308-3.013-5.15-4.471-.223-.387-.024-.597.17-.79.175-.173.378-.432.568-.649.189-.216.253-.378.378-.629.124-.25.064-.47-.03-.649-.093-.18-.73-1.758-.999-2.407-.262-.63-.53-.54-.73-.55l-.624-.011c-.216 0-.568.08-.865.405-.297.324-1.135 1.108-1.135 2.702 0 1.594 1.162 3.136 1.324 3.352.162.216 2.284 3.488 5.534 4.894.773.334 1.377.534 1.847.684.777.247 1.485.212 2.043.129.622-.093 1.92-.785 2.19-1.542.27-.757.27-1.406.189-1.542-.089-.136-.306-.216-.63-.378z"/>
        </svg>
        <span class="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
      </a>

      <!-- Pedir Cita -->
      <a href="index.html#reserva" class="flex-1 flex flex-col items-center justify-center bg-brand-blue hover:bg-brand-bluedark text-white rounded-xl py-1 mx-1.5 transition-colors shadow-sm">
        <i data-lucide="calendar" class="w-5 h-5 mb-1 text-white"></i>
        <span class="text-[10px] font-bold uppercase tracking-wider">Pedir Cita</span>
      </a>
    `;

    document.body.appendChild(stickyCta);
    document.body.classList.add('pb-20', 'lg:pb-0');

    // Reinitialize Lucide for phone/calendar icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  injectMobileStickyCta();

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

  // --- 6. FLOATING WHATSAPP BUTTON ---
  const injectWhatsAppButton = () => {
    const waButton = document.createElement('a');
    waButton.href = 'https://wa.me/34679926552';
    waButton.target = '_blank';
    waButton.rel = 'noopener noreferrer';
    waButton.className = 'fixed bottom-6 right-6 z-40 hidden lg:flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA56] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none hover:shadow-[0_0_20px_rgba(37,211,102,0.6)]';
    waButton.setAttribute('aria-label', 'Contactar por WhatsApp');
    waButton.innerHTML = `
      <svg viewBox="0 0 24 24" class="w-7 h-7 fill-current">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.419 9.86-9.857.002-2.635-1.02-5.11-2.883-6.975C16.577 1.907 14.1 .883 11.468.883 6.03.883 1.61 5.303 1.608 10.742c-.001 1.666.438 3.293 1.272 4.739l-.951 3.472 3.557-.933c1.558.85 3.125 1.271 4.544 1.271h.001L6.647 19.15zm10.963-7.533c-.324-.162-1.92-.949-2.217-1.058-.297-.108-.513-.162-.73.162-.216.324-.838 1.058-1.027 1.274-.189.216-.378.243-.702.08-2.673-1.335-4.308-3.013-5.15-4.471-.223-.387-.024-.597.17-.79.175-.173.378-.432.568-.649.189-.216.253-.378.378-.629.124-.25.064-.47-.03-.649-.093-.18-.73-1.758-.999-2.407-.262-.63-.53-.54-.73-.55l-.624-.011c-.216 0-.568.08-.865.405-.297.324-1.135 1.108-1.135 2.702 0 1.594 1.162 3.136 1.324 3.352.162.216 2.284 3.488 5.534 4.894.773.334 1.377.534 1.847.684.777.247 1.485.212 2.043.129.622-.093 1.92-.785 2.19-1.542.27-.757.27-1.406.189-1.542-.089-.136-.306-.216-.63-.378z"/>
      </svg>
    `;
    document.body.appendChild(waButton);
  };
  
  injectWhatsAppButton();
});

