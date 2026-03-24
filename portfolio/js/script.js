// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Log form data
        console.log({
            name,
            email,
            subject,
            message
        });

        // Show success message
        alert('Thank you! Your message Dry run step-by-stephas been sent successfully. I will get back to you soon!');

        // Reset form
        contactForm.reset();
    });
}

// Highlight current page in nav
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Smooth scroll for animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe fade-in elements
const fadeInElements = document.querySelectorAll('.fade-in, .skill-card, .project-card, .education-card, .timeline-item, .info-card');
fadeInElements.forEach(el => {
    observer.observe(el);
});

// Draggable Skill Cards
const skillCards = document.querySelectorAll('.skill-card');
let draggedCard = null;
let offset = { x: 0, y: 0 };
let isTouch = false;

skillCards.forEach(card => {
    // Mouse events
    card.addEventListener('mousedown', startDrag);

    // Touch events
    card.addEventListener('touchstart', startDrag);
});

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('mouseup', stopDrag);
document.addEventListener('touchend', stopDrag);

function startDrag(e) {
    const card = e.target.closest('.skill-card');
    if (!card) return;

    draggedCard = card;
    isTouch = e.type.startsWith('touch');

    const rect = card.getBoundingClientRect();
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    offset.x = clientX - rect.left;
    offset.y = clientY - rect.top;

    card.classList.add('dragging');
    card.style.position = 'fixed';
    card.style.zIndex = '1000';
    card.style.transition = 'none';
}

function drag(e) {
    if (!draggedCard) return;

    if (e.type.startsWith('touch')) {
        e.preventDefault();
    }

    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    draggedCard.style.left = (clientX - offset.x) + 'px';
    draggedCard.style.top = (clientY - offset.y) + 'px';
}

function stopDrag() {
    if (!draggedCard) return;

    draggedCard.classList.remove('dragging');
    draggedCard.style.position = '';
    draggedCard.style.zIndex = '';
    draggedCard.style.transition = '';
    draggedCard = null;
}
