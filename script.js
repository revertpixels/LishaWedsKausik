/**
 * WEDDING WEBSITE - LISHA & KAUSIK
 * JavaScript Functions
 * Created by: Haranath Saha
 */

// ==================== LOADING SCREEN ====================
(function() {
    var loadingScreen = document.getElementById('loadingScreen');
    var body = document.body;

    // Get the cover image URL based on screen size
    var coverImageUrl = '';
    if (window.innerWidth <= 768) {
        coverImageUrl = 'PROTRAIT-COVER.jpg';
    } else {
        coverImageUrl = 'LKcover.jpg';
    }

    // Create a new image to preload the cover photo
    var coverImage = new Image();
    var imageLoaded = false;
    var minimumTimePassed = false;

    // Minimum loading time (1.5 seconds) so animation is visible
    var minimumTimer = setTimeout(function() {
        minimumTimePassed = true;
        if (imageLoaded) {
            hideLoadingScreen();
        }
    }, 1500);

    // When cover image loads
    coverImage.onload = function() {
        imageLoaded = true;
        if (minimumTimePassed) {
            hideLoadingScreen();
        }
    };

    // If image fails to load, still hide after timeout
    coverImage.onerror = function() {
        imageLoaded = true;
        if (minimumTimePassed) {
            hideLoadingScreen();
        }
    };

    // Start loading the cover image
    coverImage.src = coverImageUrl;

    // Safety fallback - hide loading screen after 8 seconds no matter what
    var safetyTimer = setTimeout(function() {
        hideLoadingScreen();
    }, 8000);

    function hideLoadingScreen() {
        // Clear safety timer
        clearTimeout(safetyTimer);

        // Add hidden class for fade out animation
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');

            // Remove loading class from body to allow scrolling
            body.classList.remove('loading');

            // Remove loading screen from DOM after animation
            setTimeout(function() {
                if (loadingScreen && loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 700);
        }
    }

    // Also listen for full page load as backup
    window.addEventListener('load', function() {
        imageLoaded = true;
        if (minimumTimePassed) {
            hideLoadingScreen();
        }
    });
})();

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
        var targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            var target = document.querySelector(targetId);
            if (target) {
                var offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
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

var carousel = document.querySelector('.carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });
    carousel.addEventListener('mouseleave', function() {
        startAutoSlide();
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') { moveCarousel(-1); }
    else if (e.key === 'ArrowRight') { moveCarousel(1); }
});

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

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 40) { moveCarousel(1); }
            else if (diffX < -40) { moveCarousel(-1); }
        } else {
            if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
                moveCarousel(1);
            }
        }
    }, { passive: true });
}

// ==================== VIEW MODAL ====================
var currentDriveUrl = '';
var currentPhotosUrl = '';

function openViewModal(title, driveUrl, photosUrl) {
    var modal = document.getElementById('viewModal');
    var modalTitle = document.getElementById('viewModalTitle');

    modalTitle.textContent = title;
    currentDriveUrl = driveUrl;
    currentPhotosUrl = photosUrl;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function handleLinkClick(type) {
    var url = '';

    if (type === 'drive') {
        url = currentDriveUrl;
    } else if (type === 'photos') {
        url = currentPhotosUrl;
    }

    closeViewModal();

    setTimeout(function() {
        if (url === 'comingsoon.html') {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }
    }, 300);
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

// Email request function
function requestPasswordEmail() {
    var subject = encodeURIComponent('PDF Password Request - Lisha & Kausik Wedding');
    var body = encodeURIComponent('Hello Haranath,\n\nI would like the password for the wedding account info PDF.\n\nMy Name: \nRelation to couple: \n\nThank you!');
    var mailtoUrl = 'mailto:work.haranath@gmail.com?subject=' + subject + '&body=' + body;

    closePdfModal();

    setTimeout(function() {
        window.location.href = mailtoUrl;
    }, 300);
}

// ==================== CLOSE MODALS ====================
window.addEventListener('click', function(event) {
    var viewModal = document.getElementById('viewModal');
    var pdfModal = document.getElementById('pdfModal');
    if (event.target === viewModal) { closeViewModal(); }
    if (event.target === pdfModal) { closePdfModal(); }
});

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
console.log('%c Lisha & Kausik Wedding Website', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
console.log('%cDeveloped with love by Haranath Saha', 'font-size: 14px; color: #8B0000;');

// ==================== END OF SCRIPT ====================