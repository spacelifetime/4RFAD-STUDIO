// Mobile Navigation Toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
function scrollToSection(sectionId) {
    const target = document.querySelector(sectionId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animated counter for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .stat, .tech-item, .portfolio-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Portfolio Modal
function openPortfolioModal(projectId) {
    const modal = document.getElementById('portfolioModal');
    const modalContent = document.getElementById('modalContent');
    
    // Project details (you can customize these)
    const projects = {
        project1: {
            title: 'Modern Business Website',
            description: 'A fully responsive business website with modern design and advanced features.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'React'],
            features: ['Responsive Design', 'SEO Optimized', 'Contact Forms', 'Blog System'],
            image: 'https://picsum.photos/600/400?random=1'
        },
        project2: {
            title: 'E-Commerce Platform',
            description: 'Complete online store with payment processing and inventory management.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            features: ['Payment Processing', 'Inventory Management', 'User Authentication', 'Order Tracking'],
            image: 'https://picsum.photos/600/400?random=2'
        },
        project3: {
            title: 'Creative Portfolio',
            description: 'Artist portfolio website with gallery and contact functionality.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
            features: ['Image Gallery', 'Contact Forms', 'Responsive Design', 'Lightbox'],
            image: 'https://picsum.photos/600/400?random=3'
        },
        project4: {
            title: 'Mobile Application',
            description: 'Cross-platform mobile app with native performance.',
            technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
            features: ['Cross-platform', 'Real-time Updates', 'Push Notifications', 'Offline Support'],
            image: 'https://picsum.photos/600/400?random=4'
        },
        project5: {
            title: 'Restaurant Website',
            description: 'Restaurant website with online ordering system.',
            technologies: ['WordPress', 'PHP', 'MySQL', 'WooCommerce'],
            features: ['Online Ordering', 'Menu Management', 'Reservation System', 'Payment Integration'],
            image: 'https://picsum.photos/600/400?random=5'
        },
        project6: {
            title: 'Fashion Store',
            description: 'Luxury fashion e-commerce platform with advanced features.',
            technologies: ['Next.js', 'Stripe', 'Sanity CMS', 'Vercel'],
            features: ['Product Catalog', 'Shopping Cart', 'Payment Processing', 'Admin Dashboard'],
            image: 'https://picsum.photos/600/400?random=6'
        }
    };
    
    const project = projects[projectId];
    
    modalContent.innerHTML = `
        <div class="modal-project">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 12px; margin-bottom: 1.5rem;">
            <h3 style="color: #a855f7; margin-bottom: 1rem;">${project.title}</h3>
            <p style="color: #cbd5e1; margin-bottom: 1.5rem; line-height: 1.6;">${project.description}</p>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="color: #ffffff; margin-bottom: 0.5rem;">Technologies Used:</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${project.technologies.map(tech => `<span style="background: rgba(168, 85, 247, 0.2); color: #a855f7; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.9rem;">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div>
                <h4 style="color: #ffffff; margin-bottom: 0.5rem;">Key Features:</h4>
                <ul style="color: #cbd5e1; padding-left: 1.5rem;">
                    ${project.features.map(feature => `<li style="margin-bottom: 0.25rem;">${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Service Details Modal
function showServiceDetails(serviceType) {
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('serviceModalContent');
    
    const services = {
        custom: {
            title: 'Custom Web Development',
            description: 'We create bespoke websites tailored to your specific needs and brand identity.',
            features: [
                'Custom design and development',
                'Responsive across all devices',
                'SEO optimization',
                'Content management system',
                'Contact forms and integrations',
                'Analytics and tracking'
            ],
            process: [
                'Discovery and planning',
                'Design and prototyping',
                'Development and testing',
                'Launch and optimization'
            ]
        },
        responsive: {
            title: 'Responsive Design',
            description: 'Websites that look and function perfectly on all devices, from desktop to mobile.',
            features: [
                'Mobile-first approach',
                'Cross-browser compatibility',
                'Touch-friendly interfaces',
                'Fast loading times',
                'Optimized images',
                'Flexible layouts'
            ],
            process: [
                'Mobile design first',
                'Desktop adaptation',
                'Testing on multiple devices',
                'Performance optimization'
            ]
        },
        ecommerce: {
            title: 'E-Commerce Solutions',
            description: 'Complete online stores with secure payment processing and inventory management.',
            features: [
                'Product catalog management',
                'Shopping cart functionality',
                'Secure payment processing',
                'Inventory tracking',
                'Order management',
                'Customer accounts'
            ],
            process: [
                'Store setup and configuration',
                'Product catalog creation',
                'Payment integration',
                'Testing and launch'
            ]
        },
        seo: {
            title: 'SEO Optimization',
            description: 'Search engine optimization to improve your website\'s visibility and rankings.',
            features: [
                'Keyword research and analysis',
                'On-page optimization',
                'Technical SEO audit',
                'Content optimization',
                'Link building strategies',
                'Performance monitoring'
            ],
            process: [
                'SEO audit and analysis',
                'Technical optimization',
                'Content optimization',
                'Ongoing monitoring'
            ]
        },
        maintenance: {
            title: 'Website Maintenance',
            description: 'Ongoing support, updates, and maintenance to keep your website running smoothly.',
            features: [
                'Regular security updates',
                'Performance monitoring',
                'Content updates',
                'Backup management',
                'Technical support',
                'Analytics reporting'
            ],
            process: [
                'Initial setup and configuration',
                'Regular maintenance schedule',
                'Monitoring and updates',
                'Monthly reporting'
            ]
        },
        performance: {
            title: 'Performance Optimization',
            description: 'Speed optimization and performance tuning for lightning-fast loading times.',
            features: [
                'Code optimization',
                'Image compression',
                'Caching implementation',
                'CDN setup',
                'Database optimization',
                'Load time monitoring'
            ],
            process: [
                'Performance audit',
                'Optimization implementation',
                'Testing and validation',
                'Ongoing monitoring'
            ]
        }
    };
    
    const service = services[serviceType];
    
    modalContent.innerHTML = `
        <div class="modal-service">
            <h3 style="color: #a855f7; margin-bottom: 1rem;">${service.title}</h3>
            <p style="color: #cbd5e1; margin-bottom: 2rem; line-height: 1.6;">${service.description}</p>
            
            <div style="margin-bottom: 2rem;">
                <h4 style="color: #ffffff; margin-bottom: 1rem;">What's Included:</h4>
                <ul style="color: #cbd5e1; padding-left: 1.5rem;">
                    ${service.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div>
                <h4 style="color: #ffffff; margin-bottom: 1rem;">Our Process:</h4>
                <ol style="color: #cbd5e1; padding-left: 1.5rem;">
                    ${service.process.map((step, index) => `<li style="margin-bottom: 0.5rem;"><strong>${index + 1}.</strong> ${step}</li>`).join('')}
                </ol>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const subject = this.querySelector('#subject').value;
        const message = this.querySelector('#message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        const speed = card.getAttribute('data-speed') || 1;
        const yPos = -(scrolled * speed * 0.5);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    const newsletterBtn = newsletterForm.querySelector('.newsletter-btn');
    const newsletterInput = newsletterForm.querySelector('input');
    
    newsletterBtn.addEventListener('click', () => {
        const email = newsletterInput.value;
        
        if (!email || !isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        newsletterInput.value = '';
    });
}

// Add loading animation to service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-card {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .service-card.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Add hover effects for buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        navMenu.classList.remove('active');
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
        } else {
            // Swipe down - could be used for navigation
        }
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #a855f7';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add ARIA labels for better screen reader support
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (hamburgerMenu) {
        hamburgerMenu.setAttribute('aria-label', 'Toggle navigation menu');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
    }
    
    // Update ARIA expanded state when menu is toggled
    hamburgerMenu.addEventListener('click', () => {
        const isExpanded = navMenu.classList.contains('active');
        hamburgerMenu.setAttribute('aria-expanded', isExpanded.toString());
    });
});

// Add smooth reveal animations for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Add CSS for reveal animations
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1;
        transform: none;
    }
`;
document.head.appendChild(revealStyle);
