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

        document.getElementById("days").innerText = String(d).padStart(2, '0');
        document.getElementById("hours").innerText = String(h).padStart(2, '0');
        document.getElementById("minutes").innerText = String(m).padStart(2, '0');
        document.getElementById("seconds").innerText = String(s).padStart(2, '0');
    }

    if (document.getElementById("countdown")) {
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // 5. Particle Canvas Animation
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, particles = [];

        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }

        function mkParticle() {
            return {
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                r: Math.random() * 2 + 1,
                life: 0,
                maxLife: 300 + Math.random() * 200
            };
        }

        function init() {
            particles = [];
            for (let i = 0; i < 400; i++) particles.push(mkParticle());
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life++;
                ctx.fillStyle = `rgba(0, 0, 0, ${0.5 * (1 - p.life / p.maxLife)})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                if (p.life >= p.maxLife) particles[i] = mkParticle();
            });
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', () => { resize(); init(); });
        resize();
        init();
        draw();

        // Canvas Test (Visible only if canvas is correctly layered)
        console.log("Canvas test: Checking if red square renders...");
        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 100, 100); 
    }
});
