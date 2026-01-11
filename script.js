// ==================== TYPING EFFECT ====================
const typedTextSpan = document.querySelector('.typed-text');
const textArray = ['Developer 💻', 'Entrepreneur 💰', 'Dreamer ✨', 'Self-made 🔥', 'Inspiration 🚀'];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = textArray[textArrayIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// ==================== NAVBAR ====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '15px 50px';
        navbar.style.background = 'rgba(15, 15, 26, 0.95)';
    } else {
        navbar.style.padding = '20px 50px';
        navbar.style.background = 'rgba(15, 15, 26, 0.8)';
    }
});

// ==================== SMOOTH SCROLL ====================
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

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill bars when skills section is visible
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            
            // Animate stats when message section is visible
            if (entry.target.classList.contains('message')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ==================== SKILL BARS ANIMATION ====================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// ==================== STATS COUNTER ANIMATION ====================
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.float-item');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// ==================== FORM HANDLING ====================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const subject = contactForm.querySelector('select[name="subject"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;
    
    // Create mailto link with form data
    const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject} - von ${name}`);
    const mailtoBody = encodeURIComponent(
        `Hallo Talha!\n\n` +
        `Name: ${name}\n` +
        `E-Mail: ${email}\n` +
        `Betreff: ${subject}\n\n` +
        `Nachricht:\n${message}\n\n` +
        `---\nGesendet über dein Portfolio`
    );
    
    // Open email client
    window.location.href = `mailto:kontakt@txlha.vip?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
            padding: 40px 60px;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
            max-width: 90%;
        ">
            <i class="fas fa-envelope-open-text" style="font-size: 4rem; color: white; margin-bottom: 20px; display: block;"></i>
            <h3 style="color: white; font-size: 1.5rem; margin-bottom: 10px;">E-Mail wird geöffnet! 📧</h3>
            <p style="color: rgba(255,255,255,0.9);">Hey ${name}! Dein E-Mail-Programm sollte sich jetzt öffnen.</p>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-top: 10px;">Falls nicht, schreib mir direkt an: <strong>kontakt@txlha.vip</strong></p>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 9999;
            cursor: pointer;
        " onclick="this.parentElement.remove()"></div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (successMessage.parentElement) {
            successMessage.remove();
        }
    }, 5000);
    
    // Reset form
    contactForm.reset();
});

// ==================== CURSOR GLOW EFFECT ====================
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.about-card, .message-card, .timeline-content');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ==================== EASTER EGG ====================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Fun Easter egg animation
        document.body.style.animation = 'rainbow 2s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
                padding: 40px 60px;
                border-radius: 20px;
                text-align: center;
                z-index: 10000;
            ">
                <h2 style="color: white; font-size: 2rem;">🎮 KONAMI CODE! 🎮</h2>
                <p style="color: white;">Du bist ein echter Gamer! 💪</p>
            </div>
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }
});

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active style
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #8B5CF6 !important;
    }
    .nav-links a.active::after {
        width: 100% !important;
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);

console.log('%c🚀 Hey! Du schaust dir den Code an?', 'font-size: 20px; color: #8B5CF6; font-weight: bold;');
console.log('%cDas ist der Spirit! Keep learning, keep coding! 💪', 'font-size: 14px; color: #06B6D4;');
console.log('%c- Talha', 'font-size: 12px; color: #F59E0B; font-style: italic;');
