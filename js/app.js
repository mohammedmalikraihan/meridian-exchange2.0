document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Top Indicator Line (Scroll Progress)
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // 2. Mobile Responsive Navigation Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && menuToggle) {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });

    // 3. Intersection Observer (Scroll Reveal)
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));

    // 4. Countdown Timer Logic
    function updateCountdown() {
        const countdownContainer = document.getElementById("countdown");
        if (!countdownContainer) return;

        const targetDate = new Date("September 8, 2026 00:00:00").getTime();
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff < 0) {
            countdownContainer.innerHTML = "Event in Progress";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        const dEl = document.getElementById("days");
        const hEl = document.getElementById("hours");
        const mEl = document.getElementById("minutes");
        const sEl = document.getElementById("seconds");

        if (dEl && hEl && mEl && sEl) {
            dEl.innerText = String(d).padStart(2, '0');
            hEl.innerText = String(h).padStart(2, '0');
            mEl.innerText = String(m).padStart(2, '0');
            sEl.innerText = String(s).padStart(2, '0');
        }
    }

    if (document.getElementById("countdown")) {
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }
});
