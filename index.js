document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');

    // Toggle mobile menu
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active');
            }
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active');
            }
        });
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
        }
    });
});


// Reveal animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Dynamic progress bars
document.querySelectorAll('.skill-progress-bar').forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => bar.style.width = targetWidth, 500);
});

 // Animate progress bars on scroll
 document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.getAttribute('data-width');
            }
        });
    }, { threshold: 0.1 });

    progressBars.forEach(bar => {
        bar.setAttribute('data-width', bar.style.width);
        bar.style.width = '0';
        observer.observe(bar);
    });
});


document.querySelectorAll('.project-card').forEach(card => {
    const gallery = card.querySelector('.gallery-container');
    const prevBtn = card.querySelector('.scroll-btn.left');
    const nextBtn = card.querySelector('.scroll-btn.right');
    let scrollAmount = 0;

    const scrollTo = (element, direction) => {
        const cardWidth = element.clientWidth;
        scrollAmount += direction * cardWidth;
        element.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    prevBtn.addEventListener('click', () => scrollTo(gallery, -1));
    nextBtn.addEventListener('click', () => scrollTo(gallery, 1));

    // Touch/swipe support
    let touchStartX = 0;
    gallery.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    gallery.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            scrollTo(gallery, diff > 0 ? 1 : -1);
        }
    });
});