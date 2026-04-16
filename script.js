/**
 * WEDDING WEBSITE - LISHA & KAUSIK
 * JavaScript Functions
 * Created by: Haranath Saha
 */

// ==================== NAVIGATION ====================
var navbar = document.getElementById('navbar');
var navToggle = document.getElementById('navToggle');
var navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    var scrollToTop = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        scrollToTop.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
    }
});

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    var spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ?
        'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ?
        'rotate(-45deg) translate(7px, -6px)' : 'none';
});

document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        var spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            var offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ==================== IMAGE CAROUSEL ====================
var currentSlideIndex = 0;
var slides = document.querySelectorAll('.carousel-slide');
var indicators = document.querySelectorAll('.indicator');
var totalSlides = slides.length;
var autoSlideInterval;

function showSlide(index) {
    slides.forEach(function(slide) { slide.classList.remove('active'); });
    indicators.forEach(function(ind) { ind.classList.remove('active'); });

    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }

    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function moveCarousel(direction) {
    showSlide(currentSlideIndex + direction);
    resetAutoSlide();
}

function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(function() {
        showSlide(currentSlideIndex + 1);
    }, 1500);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

startAutoSlide();

// Pause on hover (desktop)
var carousel = document.querySelector('.carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });
    carousel.addEventListener('mouseleave', function() {
        startAutoSlide();
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') { moveCarousel(-1); }
    else if (e.key === 'ArrowRight') { moveCarousel(1); }
});

// ==================== TOUCH / TAP SUPPORT ====================
var touchStartX = 0;
var touchEndX = 0;
var touchStartY = 0;
var touchEndY = 0;

if (carousel) {
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;

        var diffX = touchStartX - touchEndX;
        var diffY = touchStartY - touchEndY;

        // Only trigger if horizontal swipe is more than vertical
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 40) {
                // Swipe left - go next
                moveCarousel(1);
            } else if (diffX < -40) {
                // Swipe right - go previous
                moveCarousel(-1);
            }
        } else {
            // It was a tap (not a swipe) - go to next slide
            if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
                moveCarousel(1);
            }
        }
    }, { passive: true });
}

// ==================== VIEW MODAL ====================
function openViewModal(title, driveUrl, photosUrl) {
    var modal = document.getElementById('viewModal');
    var modalTitle = document.getElementById('viewModalTitle');
    var driveLink = document.getElementById('driveLink');
    var photosLink = document.getElementById('photosLink');

    modalTitle.textContent = title;
    driveLink.href = driveUrl;
    photosLink.href = photosUrl;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeViewModal() {
    document.getElementById('viewModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ==================== PDF MODAL ====================
function downloadAccountPDF() {
    document.getElementById('pdfModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePdfModal() {
    document.getElementById('pdfModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function startPdfDownload() {
    var link = document.createElement('a');
    link.href = 'wedding-info.pdf';
    link.download = 'Lisha-Kausik-Wedding-Account-Info.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(function() {
        closePdfModal();
    }, 2000);
}

// Close modals on outside click
window.addEventListener('click', function(event) {
    var viewModal = document.getElementById('viewModal');
    var pdfModal = document.getElementById('pdfModal');
    if (event.target === viewModal) { closeViewModal(); }
    if (event.target === pdfModal) { closePdfModal(); }
});

// Close modals on Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeViewModal();
        closePdfModal();
    }
});

// ==================== SCROLL TO TOP ====================
var scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== PARALLAX ====================
window.addEventListener('scroll', function() {
    var scrolled = window.pageYOffset;
    var hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ==================== CONSOLE ====================
console.log('%c👰🤵 Lisha & Kausik Wedding Website', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
console.log('%cDeveloped with ❤️ by Haranath Saha', 'font-size: 14px; color: #8B0000;');

// ==================== END OF SCRIPT ====================