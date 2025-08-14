// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYX-5N6IHFlm3GqRayhRjZVsIwBbh3Jj4",
    authDomain: "monde-international.firebaseapp.com",
    projectId: "monde-international",
    storageBucket: "monde-international.firebasestorage.app",
    messagingSenderId: "1081688733326",
    appId: "1:1081688733326:web:86cffd843cc401a8ebbbdf",
    measurementId: "G-X57X1X4P39"
};

// Firebase will be loaded dynamically to avoid module errors
let app = null;
let db = null;

// Enhanced Mobile Navigation Toggle
function toggleMobileNav() {
    const navTabs = document.querySelector('.nav-tabs');
    const navActions = document.querySelector('.nav-actions');
    const toggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;

    if (!navTabs || !toggle) return;

    // Toggle mobile menu
    navTabs.classList.toggle('mobile-open');
    toggle.classList.toggle('active');

    // Update ARIA attributes
    const isOpen = navTabs.classList.contains('mobile-open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Close mobile navigation' : 'Open mobile navigation');

    if (isOpen) {
        // Show nav actions when menu is open
        if (navActions) {
            navActions.style.display = 'flex';
        }

        // Prevent body scroll when menu is open
        body.style.overflow = 'hidden';

        // Focus management - focus first nav item
        setTimeout(() => {
            const firstNavItem = navTabs.querySelector('.nav-tab');
            if (firstNavItem) firstNavItem.focus();
        }, 300);
    } else {
        // Hide nav actions when menu is closed
        if (navActions) {
            navActions.style.display = 'none';
        }

        // Restore body scroll
        body.style.overflow = '';
    }
}

// Close mobile menu when clicking on nav links
function closeMobileNav() {
    const navTabs = document.querySelector('.nav-tabs');
    const navActions = document.querySelector('.nav-actions');
    const toggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;

    if (navTabs && navTabs.classList.contains('mobile-open')) {
        navTabs.classList.remove('mobile-open');
        toggle.classList.remove('active');

        // Update ARIA attributes
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open mobile navigation');

        // Hide nav actions
        if (navActions) {
            navActions.style.display = 'none';
        }

        // Restore body scroll
        body.style.overflow = '';
    }
}

// Language switching functionality
let currentLanguage = 'en';

const translations = {
    en: {
        'Monde International': 'Monde International',
        'Sdn Bhd': 'Sdn Bhd',
        'Connecting Continents': 'Connecting Continents',
        'Home': 'Home',
        'Services': 'Services',
        'Equipment': 'Equipment',
        'About': 'About',
        'Contact': 'Contact',
        'Get Quote': 'Get Quote',
        'Emergency': 'Emergency',
        'Online': 'Online',
        'Active Shipments: ': 'Active: ',
        'Connecting Malaysia to the World': 'Connecting Malaysia to the World',
        'Premier logistics solutions for Malaysia-China machinery & electronics trade. Your trusted partner in international commerce.': 'Premier logistics solutions for Malaysia-China machinery & electronics trade. Your trusted partner in international commerce.'
    },
    zh: {
        'Monde International': '世界国际',
        'Sdn Bhd': '有限公司',
        'Connecting Continents': '连接大陆',
        'Home': '首页',
        'Services': '服务',
        'Equipment': '设备',
        'About': '关于我们',
        'Contact': '联系我们',
        'Get Quote': '获取报价',
        'Emergency': '紧急联系',
        'Online': '在线',
        'Active Shipments: ': '活跃货运: ',
        'Connecting Malaysia to the World': '连接马来西亚与世界',
        'Premier logistics solutions for Malaysia-China machinery & electronics trade. Your trusted partner in international commerce.': '马来西亚-中国机械电子贸易的首选物流解决方案。您值得信赖的国际贸易伙伴。'
    }
};

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(element => {
        const enText = element.getAttribute('data-en');
        const zhText = element.getAttribute('data-zh');
        
        if (lang === 'zh' && zhText) {
            // For navigation tabs, update the span inside
            const span = element.querySelector('span');
            if (span) {
                span.textContent = zhText;
            } else {
                element.textContent = zhText;
            }
        } else if (lang === 'en' && enText) {
            // For navigation tabs, update the span inside
            const span = element.querySelector('span');
            if (span) {
                span.textContent = enText;
            } else {
                element.textContent = enText;
            }
        }
    });
    
    console.log(`Language switched to: ${lang}`);
}

// Close mobile menu when clicking on nav links
document.addEventListener('DOMContentLoaded', function() {
    // Language switcher event listeners
    const langEn = document.getElementById('lang-en');
    const langZh = document.getElementById('lang-zh');
    
    if (langEn) {
        langEn.addEventListener('click', () => switchLanguage('en'));
    }
    if (langZh) {
        langZh.addEventListener('click', () => switchLanguage('zh'));
    }
    
    const navLinks = document.querySelectorAll('.nav-tab');
    const navTabs = document.querySelector('.nav-tabs');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu when a link is clicked
            if (window.innerWidth <= 768) {
                navTabs.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const navbar = document.querySelector('.navbar');
            if (!navbar.contains(e.target)) {
                navTabs.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// Initialize Firebase dynamically
async function initializeFirebase() {
    if (!app) {
        try {
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
            const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            app = initializeApp(firebaseConfig);
            db = getFirestore(app);
        } catch (error) {
            console.log('Firebase not available, using fallback form handling');
        }
    }
    return { app, db };
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(element => {
        const key = element.getAttribute(`data-${lang}`);
        if (key && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Smooth scroll functions
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToMachinery() {
    const machinerySection = document.getElementById('machinery');
    if (machinerySection) {
        machinerySection.scrollIntoView({
            behavior: 'smooth'
        });
    } else {
        console.warn('Machinery section not found');
    }
}



// Close mobile menu when clicking on nav links
function closeMobileNav() {
    const navTabs = document.querySelector('.nav-tabs');
    const navActions = document.querySelector('.nav-actions');
    const toggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;

    if (navTabs.classList.contains('mobile-open')) {
        navTabs.classList.remove('mobile-open');

        // Update ARIA attributes
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open mobile navigation');

        // Reset toggle icon
        const icon = toggle.querySelector('i');
        icon.style.transform = 'rotate(-90deg)';
        setTimeout(() => {
            icon.className = 'fas fa-bars';
            icon.style.transform = 'rotate(0deg)';
        }, 150);

        // Hide nav actions
        if (navActions) {
            navActions.style.display = 'none';
        }

        // Restore body scroll
        body.style.overflow = '';
    }
}

// Timeline animation
function animateTimeline() {
    const steps = document.querySelectorAll('.timeline-step');
    let currentStep = 0;

    function activateStep() {
        steps.forEach(step => step.classList.remove('active'));
        steps[currentStep].classList.add('active');
        currentStep = (currentStep + 1) % steps.length;
    }

    // Initial activation
    activateStep();

    // Continue animation every 2 seconds
    setInterval(activateStep, 2000);
}

// Form submission handler
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Get form data
        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim(),
            company: 'Monde International Sdn Bhd',
            language: currentLanguage,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct'
        };

        // Validate form data
        if (!formData.name || !formData.email || !formData.message) {
            throw new Error('Please fill in all required fields');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            throw new Error('Please enter a valid email address');
        }

        // Try to submit to Firebase, fallback to console log
        try {
            const { app, db } = await initializeFirebase();
            if (db) {
                const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
                formData.timestamp = serverTimestamp();
                await addDoc(collection(db, 'contacts'), formData);
            } else {
                throw new Error('Firebase not available');
            }
        } catch (firebaseError) {
            console.log('Form data (Firebase unavailable):', formData);
        }
        
        // Show success message
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showNotification(error.message || 'Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Show notification
function showNotification(message, type) {
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
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer for both languages
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    const footerCopyright = document.getElementById('footer-copyright');
    
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    if (footerCopyright) {
        // Update data attributes with current year
        footerCopyright.setAttribute('data-en', `© ${currentYear} Monde International Sdn Bhd. All rights reserved.`);
        footerCopyright.setAttribute('data-zh', `© ${currentYear} 世界国际有限公司。保留所有权利。`);
    }
    
    // Mobile navigation - close menu when clicking nav links
    document.querySelectorAll('.nav-tab').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navTabs = document.querySelector('.nav-tabs');
        const toggle = document.querySelector('.mobile-nav-toggle');
        const languageSwitcher = document.querySelector('.language-switcher');

        if (navTabs.classList.contains('mobile-open') &&
            !navTabs.contains(e.target) &&
            !toggle.contains(e.target) &&
            !languageSwitcher.contains(e.target)) {
            closeMobileNav();
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        const navTabs = document.querySelector('.nav-tabs');

        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navTabs.classList.contains('mobile-open')) {
            closeMobileNav();
            document.querySelector('.mobile-nav-toggle').focus();
        }

        // Handle arrow key navigation in mobile menu
        if (navTabs.classList.contains('mobile-open') && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            e.preventDefault();
            const navItems = Array.from(navTabs.querySelectorAll('.nav-tab'));
            const currentIndex = navItems.indexOf(document.activeElement);

            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0;
            } else {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1;
            }

            navItems[nextIndex].focus();
        }
    });

    // Form submission
    document.getElementById('contact-form').addEventListener('submit', handleFormSubmission);

    // Start timeline animation
    animateTimeline();

    // Navigation tabs active state
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveTab() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('href') === `#${current}`) {
                tab.classList.add('active');
            }
        });
    }

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
            }
        });
    });

    // Navbar scroll effect and active tab update
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 51, 102, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(0, 51, 102, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        updateActiveTab();
    });
});

// Make functions globally available
window.scrollToContact = scrollToContact;
window.scrollToMachinery = scrollToMachinery;
window.switchLanguage = switchLanguage;
window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav = closeMobileNav;
