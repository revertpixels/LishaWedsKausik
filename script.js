/**
 * WEDDING WEBSITE - LISHA & KAUSIK
 * JavaScript Functions (FIXED VERSION)
 * Created by: Haranath Saha
 */

// ==================== LOADING SCREEN (FIXED) ====================
// Hide loading screen after page loads
setTimeout(function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}, 1500); // Show loading for 1.5 seconds

// ==================== NAVIGATION ====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    const scrollToTop = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        scrollToTop.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ?
        'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ?
        'rotate(-45deg) translate(7px, -6px)' : 'none';
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== COUNTDOWN TIMER ====================
const weddingDate = new Date('March 9, 2026 19:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Check if countdown is over
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-container').innerHTML =
            '<h2 class="countdown-title">We Are Married! 🎉</h2>';
    }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// ==================== IMAGE CAROUSEL ====================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
let autoSlideInterval;

// Show specific slide
function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Handle wrap around
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Add active class to current slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Move to next/previous slide
function moveCarousel(direction) {
    showSlide(currentSlide + direction);
    resetAutoSlide(); // Reset auto-slide timer when manually navigating
}

// Go to specific slide (from indicators)
function currentSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

// Auto-slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Start auto-slide on page load
startAutoSlide();

// Pause auto-slide when hovering over carousel
const carousel = document.querySelector('.carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveCarousel(-1);
    } else if (e.key === 'ArrowRight') {
        moveCarousel(1);
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        moveCarousel(1);
    }
    if (touchEndX > touchStartX + 50) {
        moveCarousel(-1);
    }
}

// ==================== MODAL FUNCTIONS ====================
let selectedFolder = '';

// Show password modal
function showPasswordModal(folderName) {
    selectedFolder = folderName;
    const modal = document.getElementById('passwordModal');
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = `Access ${folderName}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close password modal
function closePasswordModal() {
    const modal = document.getElementById('passwordModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Proceed to download
function proceedToDownload() {
    closePasswordModal();

    // Show thank you modal
    const thankYouModal = document.getElementById('thankYouModal');
    thankYouModal.classList.add('active');

    // Trigger download after a short delay
    setTimeout(() => {
        downloadPDF();
    }, 1000);
}

// Close thank you modal
function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Download PDF function
function downloadPDF() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'wedding-info.pdf'; // Path to your PDF file
    link.download = 'Lisha-Kausik-Wedding-Access.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close thank you modal after 5 seconds
    setTimeout(() => {
        closeThankYouModal();
    }, 5000);
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const passwordModal = document.getElementById('passwordModal');
    const thankYouModal = document.getElementById('thankYouModal');

    if (event.target === passwordModal) {
        closePasswordModal();
    }
    if (event.target === thankYouModal) {
        closeThankYouModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePasswordModal();
        closeThankYouModal();
    }
});

// ==================== SCROLL TO TOP ====================
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        const speed = 0.5;
        hero.style.backgroundPositionY = `${scrolled * speed}px`;
    }
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c👰🤵 Lisha & Kausik Wedding Website', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
console.log('%cDeveloped with ❤️ by Haranath Saha', 'font-size: 14px; color: #8B0000;');
console.log('%cWedding Date: March 9, 2026', 'font-size: 12px; color: #666;');

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// ==================== PERFORMANCE MONITORING ====================
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd -
        window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// ==================== END OF SCRIPT ====================