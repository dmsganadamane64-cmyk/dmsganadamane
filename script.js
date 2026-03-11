// Hero image auto-slider
(function () {
    let heroIndex = 0;
    function slideHero() {
        const slides = document.querySelectorAll('.hero-slide');
        slides[heroIndex].classList.remove('active');
        heroIndex = (heroIndex + 1) % slides.length;
        slides[heroIndex].classList.add('active');
    }
    setInterval(slideHero, 2000);
})();

// Carousel functionality
let currentSlides = {
    whatWeDo: 0,
    awards: 0
};

// Product carousel
let currentProductSlide = 0;

function changeProductSlide(direction) {
    const slides = document.querySelectorAll('[data-product-slide]');
    const totalSlides = slides.length;

    // Remove active class from current slide
    slides[currentProductSlide].classList.remove('active');

    // Calculate new slide index
    currentProductSlide += direction;

    // Wrap around if necessary
    if (currentProductSlide >= totalSlides) {
        currentProductSlide = 0;
    } else if (currentProductSlide < 0) {
        currentProductSlide = totalSlides - 1;
    }

    // Add active class to new slide
    slides[currentProductSlide].classList.add('active');
}

function changeSlide(carouselName, direction) {
    const images = document.querySelectorAll(`[data-carousel="${carouselName}"]`);
    const totalSlides = images.length;

    // Remove active class from current slide
    images[currentSlides[carouselName]].classList.remove('active');

    // Calculate new slide index
    currentSlides[carouselName] += direction;

    // Wrap around if necessary
    if (currentSlides[carouselName] >= totalSlides) {
        currentSlides[carouselName] = 0;
    } else if (currentSlides[carouselName] < 0) {
        currentSlides[carouselName] = totalSlides - 1;
    }

    // Add active class to new slide
    images[currentSlides[carouselName]].classList.add('active');

    // Show overlay text only on the first slide of whatWeDo carousel
    if (carouselName === 'whatWeDo') {
        const overlay = document.querySelector('.carousel-overlay-text');
        if (overlay) {
            overlay.style.display = currentSlides[carouselName] === 0 ? 'block' : 'none';
        }
    }
}

// Auto-slide product carousel every 4 seconds
setInterval(() => {
    changeProductSlide(1);
}, 10000);

// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('cf-name');
    const phone   = document.getElementById('cf-phone');
    const email   = document.getElementById('cf-email');
    const message = document.getElementById('cf-message');
    let valid = true;

    // Reset errors
    ['cf-name','cf-phone','cf-email','cf-message'].forEach(id => {
        document.getElementById(id).classList.remove('error');
    });
    document.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));

    // Name
    if (name.value.trim() === '') {
        name.classList.add('error');
        document.getElementById('err-name').classList.add('visible');
        valid = false;
    }

    // Phone — must be at least 10 digits
    if (!/^\d{10,}$/.test(phone.value.trim())) {
        phone.classList.add('error');
        document.getElementById('err-phone').classList.add('visible');
        valid = false;
    }

    // Email — only validate if filled in
    if (email.value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.classList.add('error');
        document.getElementById('err-email').classList.add('visible');
        valid = false;
    }

    // Message
    if (message.value.trim() === '') {
        message.classList.add('error');
        document.getElementById('err-message').classList.add('visible');
        valid = false;
    }

    if (valid) {
        document.getElementById('formSuccess').style.display = 'block';
        this.reset();
        setTimeout(() => {
            document.getElementById('formSuccess').style.display = 'none';
        }, 5000);
    }
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
});

// Smooth scrolling for navigation links + close mobile menu on click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar shadow + active nav link + scroll-to-top on scroll
const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Navbar shadow
    navbar.style.boxShadow = currentScroll > 100
        ? '0 4px 20px rgba(0, 0, 0, 0.15)'
        : '0 2px 10px rgba(0, 0, 0, 0.1)';

    // Scroll-to-top button visibility
    scrollTopBtn.style.display = currentScroll > 400 ? 'block' : 'none';

    // Active nav link highlight
    let current = '';
    sections.forEach(section => {
        if (currentScroll >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Scroll to top on button click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
