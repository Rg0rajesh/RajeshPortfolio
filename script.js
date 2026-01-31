// ===== PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website initializing...');
    initializeAnimations();
    initializeScrollAnimations();
    initializeHoverEffects();
    setupCardAnimations();
    initializeContactForm();
    initializeCopyButtons();
    initializeMobileMenu();
    handleResponsive();
});

// ===== MOBILE MENU INITIALIZATION =====
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== RESPONSIVE HANDLER =====
function handleResponsive() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    window.addEventListener('resize', function() {
        // Close menu on larger screens
        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        }
    });
    
    // Adjust floating cards for mobile
    adjustFloatingCards();
}

// ===== ADJUST FLOATING CARDS FOR MOBILE =====
function adjustFloatingCards() {
    if (window.innerWidth <= 1024) {
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach(card => {
            card.style.position = 'relative';
            card.style.top = 'auto';
            card.style.left = 'auto';
            card.style.right = 'auto';
            card.style.bottom = 'auto';
        });
    }
}

// ===== INITIALIZE ANIMATIONS =====
function initializeAnimations() {
    // Stagger experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 100);
    });

    // Stagger project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 100);
    });
}

// ===== SMOOTH SCROLL NAVIGATION =====
function initializeScrollNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                // Add animation class
                target.style.animation = 'slideInUp 0.6s ease';
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                updateActiveNavLink(href);
            }
        });
    });
}

initializeScrollNavigation();

// ===== SETUP CARD ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .experience-card, .skill-category, .highlight-card, .education-card').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

initializeScrollAnimations();

// ===== SETUP CARD HOVER ANIMATIONS =====
function setupCardAnimations() {
    // Add hover ripple effect to skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add click animation to projects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'glow 0.6s ease';
        });
    });
}

setupCardAnimations();

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards and elements for fade-in animation
document.querySelectorAll('.project-card, .experience-card, .skill-category, .highlight-card, .education-card').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// ===== ENHANCED NAVBAR SCROLL EFFECTS =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(5px)';
    }
    
    updateActiveSectionOnScroll();
});

// ===== UPDATE ACTIVE SECTION ON SCROLL =====
function updateActiveSectionOnScroll() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ===== PARALLAX EFFECT FOR HERO =====
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroContent = heroSection.querySelector('.hero-content');
        const heroVisual = heroSection.querySelector('.hero-visual');
        
        if (scrollPosition < window.innerHeight) {
            // More pronounced parallax effect
            heroContent.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            heroVisual.style.transform = `translateY(${scrollPosition * 0.25}px) scale(${1 - scrollPosition * 0.0005})`;
            
            // Fade hero on scroll
            const fadeValue = Math.min(scrollPosition / (window.innerHeight * 0.5), 1);
            heroSection.style.opacity = 1 - fadeValue * 0.3;
        }
    });
}

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Animate counters when visible with better detection
const counterElements = document.querySelectorAll('.card-value');
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const value = entry.target.textContent;
            const numberMatch = value.match(/\d+/);
            if (numberMatch) {
                const number = parseInt(numberMatch[0]);
                // Add animation class
                entry.target.style.animation = 'slideInUp 0.6s ease';
                animateCounter(entry.target, number, 1500);
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.7 });

counterElements.forEach(element => counterObserver.observe(element));

// ===== ENHANCED HOVER EFFECTS FOR PROJECT CARDS =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        // Add tilt effect
        this.style.perspective = '1000px';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const rotateX = (y - 0.5) * 10;
        const rotateY = (x - 0.5) * -10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===== EXPERIENCE TIMELINE STAGGER ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px) rotateY(10deg)';
        card.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.2}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0) rotateY(0deg)';
        }, 100);
        
        // Add hover effect to experience items
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 60px rgba(91, 125, 190, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});

// ===== SCROLL TO TOP BUTTON WITH ENHANCED ANIMATIONS =====
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    
    const style = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #5B7DBE, #6C63FF);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        z-index: 99;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(10px);
    `;
    
    button.setAttribute('style', style);
    document.body.appendChild(button);
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (window.scrollY > 300) {
                    button.style.opacity = '1';
                    button.style.visibility = 'visible';
                } else {
                    button.style.opacity = '0';
                    button.style.visibility = 'hidden';
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    button.addEventListener('click', function() {
        this.style.animation = 'spin 0.6s ease';
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(180deg)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Add spin animation to stylesheet
    if (!document.getElementById('scroll-to-top-style')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'scroll-to-top-style';
        styleSheet.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg) scale(1); }
                to { transform: rotate(360deg) scale(1.1); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

createScrollToTopButton();

// ===== MOBILE MENU TOGGLE (if needed in future) =====
function setupMobileMenu() {
    // You can add mobile menu functionality here
    // For now, this is a placeholder for future enhancement
}

// ===== FORM VALIDATION (if contact form is added) =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', function() {
    document.body.style.animation = 'fadeInPage 0.8s ease forwards';
    
    // Add animations to dynamically loaded content
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInPage {
            from {
                opacity: 0;
                filter: blur(10px);
            }
            to {
                opacity: 1;
                filter: blur(0);
            }
        }
        
        @keyframes fadeInContent {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✓ Portfolio website loaded successfully with enhanced animations');
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
});

// ===== COPY TO CLIPBOARD FUNCTIONALITY =====
function initializeCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalText = this.textContent;
                this.classList.add('copied');
                this.textContent = '✓ Copied!';

                // Reset after 2 seconds
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCopyButtons);
} else {
    initializeCopyButtons();
}

// ===== PERFORMANCE: LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== LOG INITIALIZATION =====
console.log('✓ Portfolio website initialized successfully');
console.log('✓ Animations enabled: parallax, scroll effects, hover effects');
console.log('✓ All interactive elements ready');
