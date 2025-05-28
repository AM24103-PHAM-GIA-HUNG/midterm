// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Add staggered animation to menu items
    if (navLinks.classList.contains('active')) {
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    } else {
        navItems.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    // Only close menu on mobile devices (screen width less than 768px)
    if (window.innerWidth < 768 && !navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        navItems.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
        });
    }
});


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Handle staggered animations for project cards
            if (entry.target.classList.contains('project-grid')) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
            }
            
            // Handle staggered animations for contact items
            if (entry.target.classList.contains('contact-info')) {
                const items = entry.target.querySelectorAll('.contact-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200);
                });
            }
            
            // Handle staggered animations for about content
            if (entry.target.classList.contains('about-content')) {
                const elements = entry.target.children;
                Array.from(elements).forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, index * 200);
                });
            }
        } else {
            // Remove visible class when element is no longer in view
            entry.target.classList.remove('visible');
            
            // Handle removing visible class from child elements
            if (entry.target.classList.contains('project-grid')) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach(card => card.classList.remove('visible'));
            }
            
            if (entry.target.classList.contains('contact-info')) {
                const items = entry.target.querySelectorAll('.contact-item');
                items.forEach(item => item.classList.remove('visible'));
            }
            
            if (entry.target.classList.contains('about-content')) {
                const elements = entry.target.children;
                Array.from(elements).forEach(element => element.classList.remove('visible'));
            }
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe main sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
    
    // Observe project grid for staggered animations
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) observer.observe(projectGrid);
    
    // Observe contact info for staggered animations
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) observer.observe(contactInfo);
    
    // Observe about content for staggered animations
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) observer.observe(aboutContent);

    // Initialize hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});