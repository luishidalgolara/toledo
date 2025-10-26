/*
 * ==========================================
 * TOLEDO BIKES - PREMIUM JAVASCRIPT
 * Modern & Interactive Features
 * ========================================== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚲 Toledo Bikes - Sistema cargado correctamente');
    
    // ============================================
    // PRELOADER
    // ============================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // ============================================
    // PARTICLES.JS CONFIGURATION
    // ============================================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#76ff03'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#76ff03',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // ============================================
    // AOS (ANIMATE ON SCROLL) INITIALIZATION
    // ============================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }

    // ============================================
    // NAVEGACIÓN MÓVIL
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer click en un enlace
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // ============================================
    // NAVEGACIÓN ACTIVA AL SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    function activateNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('.glass-header');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        activateNavOnScroll();
    }

    window.addEventListener('scroll', handleScroll);

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    }

    // ============================================
    // CONTADOR ANIMADO
    // ============================================
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    }

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                hasAnimated = true;
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-premium');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // ============================================
    // FORMULARIO DE RESERVA
    // ============================================
    const reservaForm = document.getElementById('reservaForm');

    if (reservaForm) {
        // Establecer fecha mínima (hoy)
        const fechaInput = document.getElementById('fecha');
        if (fechaInput) {
            const hoy = new Date();
            const manana = new Date(hoy);
            manana.setDate(manana.getDate() + 1);
            fechaInput.setAttribute('min', manana.toISOString().split('T')[0]);
        }

        // Manejar envío del formulario
        reservaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = {
                nombre: document.getElementById('nombre').value,
                telefono: document.getElementById('telefono').value,
                tipoBicicleta: document.getElementById('tipoBicicleta').value,
                servicio: document.getElementById('servicio').value,
                urgencia: document.getElementById('urgencia').value,
                fecha: document.getElementById('fecha').value,
                descripcion: document.getElementById('descripcion').value
            };

            // Crear mensaje de WhatsApp
            const mensaje = `
🚲 *NUEVA RESERVA - TOLEDO BIKES*

━━━━━━━━━━━━━━━━━━━━━━━━
📋 *INFORMACIÓN DEL CLIENTE*
━━━━━━━━━━━━━━━━━━━━━━━━

👤 *Nombre:* ${formData.nombre}
📞 *Teléfono:* ${formData.telefono}

━━━━━━━━━━━━━━━━━━━━━━━━
🔧 *DETALLES DEL SERVICIO*
━━━━━━━━━━━━━━━━━━━━━━━━

🚴 *Tipo de Bicicleta:* ${formData.tipoBicicleta}
⚙️ *Servicio Solicitado:* ${formData.servicio}
⏱️ *Urgencia:* ${formData.urgencia}
📅 *Fecha Preferida:* ${formatearFecha(formData.fecha)}

━━━━━━━━━━━━━━━━━━━━━━━━
📝 *DESCRIPCIÓN DEL PROBLEMA*
━━━━━━━━━━━━━━━━━━━━━━━━

${formData.descripcion}

━━━━━━━━━━━━━━━━━━━━━━━━
✅ *Solicitud enviada desde la web*
            `.trim();

            // Número de WhatsApp del taller
            const numeroWhatsApp = '56945675529';
            
            // Detectar si es dispositivo móvil
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            // Usar URL correcta según el dispositivo
            let urlWhatsApp;
            if (isMobile) {
                // Para móviles: usar api.whatsapp.com (abre la app directamente)
                urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;
            } else {
                // Para PC: usar wa.me (funciona con WhatsApp Web y Desktop)
                urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
            }

            // Abrir WhatsApp
            window.open(urlWhatsApp, '_blank');

            // Mostrar mensaje de éxito
            mostrarNotificacion('¡Reserva enviada con éxito! 🎉', 'Te redirigimos a WhatsApp para confirmar tu cita.', 'success');

            // Limpiar formulario después de 2 segundos
            setTimeout(() => {
                reservaForm.reset();
            }, 2000);
        });
    }

    // ============================================
    // CONTADOR DE CARACTERES EN TEXTAREA
    // ============================================
    const descripcionTextarea = document.getElementById('descripcion');
    const charCount = document.getElementById('charCount');
    
    if (descripcionTextarea && charCount) {
        const maxLength = 500;
        descripcionTextarea.setAttribute('maxlength', maxLength);

        descripcionTextarea.addEventListener('input', function() {
            const remaining = this.value.length;
            charCount.textContent = remaining;
            
            if (remaining > maxLength - 50) {
                charCount.style.color = '#ff5252';
            } else {
                charCount.style.color = '#76ff03';
            }
        });
    }

    // ============================================
    // VALIDACIÓN Y FORMATO DE TELÉFONO
    // ============================================
    const telefonoInput = document.getElementById('telefono');
    
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Formato chileno: +56 9 1234 5678
            if (value.length > 0) {
                if (value.startsWith('56')) {
                    value = value.substring(2);
                }
                if (value.startsWith('9')) {
                    value = '+56 ' + value;
                    if (value.length > 7) {
                        value = value.substring(0, 7) + ' ' + value.substring(7);
                    }
                    if (value.length > 12) {
                        value = value.substring(0, 12) + ' ' + value.substring(12, 16);
                    }
                } else if (value.length > 0) {
                    value = '+56 9 ' + value;
                    if (value.length > 12) {
                        value = value.substring(0, 12) + ' ' + value.substring(12, 16);
                    }
                }
            }
            
            e.target.value = value.substring(0, 17); // Limitar longitud
        });
    }

    // ============================================
    // FILTRO DE GALERÍA
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-premium');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // FORMULARIO NEWSLETTER
    // ============================================
    const newsletterForms = document.querySelectorAll('.newsletter-form-premium');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                mostrarNotificacion('¡Suscripción exitosa! ✉️', 'Recibirás nuestras novedades y promociones.', 'success');
                this.reset();
            }
        });
    });

    // ============================================
    // FUNCIÓN PARA MOSTRAR NOTIFICACIONES
    // ============================================
    function mostrarNotificacion(titulo, texto, tipo) {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion-${tipo}`;
        notificacion.innerHTML = `
            <div class="notificacion-icono">
                <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            </div>
            <div class="notificacion-contenido">
                <h4>${titulo}</h4>
                <p>${texto}</p>
            </div>
            <button class="notificacion-cerrar">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Agregar estilos en línea
        Object.assign(notificacion.style, {
            position: 'fixed',
            top: '100px',
            right: '-400px',
            maxWidth: '380px',
            padding: '20px',
            background: tipo === 'success' ? 'linear-gradient(135deg, #76ff03, #64dd17)' : 'linear-gradient(135deg, #ff5252, #f44336)',
            color: '#0a1128',
            borderRadius: '15px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            transition: 'right 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            fontFamily: 'Poppins, sans-serif'
        });

        document.body.appendChild(notificacion);

        // Animar entrada
        setTimeout(() => {
            notificacion.style.right = '20px';
        }, 100);

        // Botón cerrar
        const cerrarBtn = notificacion.querySelector('.notificacion-cerrar');
        cerrarBtn.style.cssText = `
            background: transparent;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #0a1128;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        `;
        cerrarBtn.addEventListener('click', () => cerrarNotificacion(notificacion));
        cerrarBtn.addEventListener('mouseenter', () => cerrarBtn.style.opacity = '1');
        cerrarBtn.addEventListener('mouseleave', () => cerrarBtn.style.opacity = '0.7');

        // Auto cerrar después de 5 segundos
        setTimeout(() => cerrarNotificacion(notificacion), 5000);
    }

    function cerrarNotificacion(notificacion) {
        notificacion.style.right = '-400px';
        setTimeout(() => {
            notificacion.remove();
        }, 500);
    }

    // ============================================
    // FUNCIÓN PARA FORMATEAR FECHA
    // ============================================
    function formatearFecha(fecha) {
        const fechaObj = new Date(fecha + 'T00:00:00');
        const opciones = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return fechaObj.toLocaleDateString('es-CL', opciones);
    }

    // ============================================
    // LAZY LOADING DE IMÁGENES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // DETECCIÓN DE DISPOSITIVO
    // ============================================
    function detectDevice() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
        
        if (isMobile) {
            document.body.classList.add('mobile-device');
        }
        if (isTablet) {
            document.body.classList.add('tablet-device');
        }
    }
    detectDevice();

    // ============================================
    // PERFORMANCE: THROTTLE SCROLL
    // ============================================
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Aplicar throttle al scroll
    window.addEventListener('scroll', throttle(handleScroll, 100));

    // ============================================
    // LOG DE INICIALIZACIÓN
    // ============================================
    console.log('✅ Todas las funcionalidades iniciadas correctamente');
    console.log('🚲 Toledo Bikes - Premium Experience Ready');
    
    // Easter egg
    console.log('%c¡Hola ciclista! 🚴', 'color: #76ff03; font-size: 20px; font-weight: bold;');
    console.log('%c¿Te gusta nuestro sitio? Contáctanos: contacto@toledobikes.cl', 'color: #76ff03; font-size: 14px;');
});

// ============================================
// DETECTAR CONEXIÓN LENTA
// ============================================
if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        console.warn('⚠️ Conexión lenta detectada');
        // Podrías implementar una versión lite aquí
    }
}