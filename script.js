// ========================================
// LIMIA'S AGENCY - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Overlay ---
    const navToggle = document.getElementById('navToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    function toggleMenu() {
        navToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // Close menu on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu();
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            toggleMenu();
        }
    });

    // --- Active Navigation Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // --- Scroll Reveal Animation ---
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.player-card, .method-card, .about-grid, .contact-item, .contact-info');
        reveals.forEach((element) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    const revealElements = document.querySelectorAll('.player-card, .method-card, .about-grid, .contact-item, .contact-info');
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    });

    // --- Navbar Shadow on Scroll ---
    const navbar = document.getElementById('navbar');
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        } else {
            navbar.style.boxShadow = '0 1px 0 rgba(0,0,0,0.05)';
        }
    }

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Event Listeners ---
    window.addEventListener('scroll', function() {
        updateActiveLink();
        revealOnScroll();
        handleNavbarScroll();
    });

    // Initial calls
    updateActiveLink();
    revealOnScroll();
    handleNavbarScroll();

    // --- Leaflet Map ---
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        const map = L.map('map').setView([42.341187131978664, -7.8756630427616425], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([42.341187131978664, -7.8756630427616425])
            .addTo(map)
            .bindPopup('<b>LIMIA\'S AGENCY</b><br>Estadio de O Couto<br>Ourense, España')
            .openPopup();
    }

    // --- Stats Counter Animation ---
    const statsSection = document.querySelector('.about-stats');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        const statsSectionTop = statsSection?.getBoundingClientRect().top;
        if (statsSectionTop && statsSectionTop < window.innerHeight - 50) {
            statsAnimated = true;
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[0-9]/g, '');
                let current = 0;
                const increment = numericValue / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + suffix;
                }, 40);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
});
