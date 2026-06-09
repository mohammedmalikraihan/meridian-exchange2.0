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

    // 3. Updated Intersection Observer (Scroll Reveal)
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
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

        revealEls.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            } else {
                observer.observe(el);
            }
        });
    }

    // 4. Updated Countdown Timer Logic
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

    // 5. Particle Canvas Animation Block
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, particles = [], animId;

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }

        function mkParticle() {
            const side = Math.random();
            let x, y;
            
            if (side < 0.6) {
                x = W * 0.5 + Math.random() * W * 0.55;
                y = Math.random() * H * 0.45;
            } else {
                x = Math.random() * W * 0.35;
                y = H * 0.6 + Math.random() * H * 0.4;
            }
            
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.08 + Math.random() * 0.12;
            
            return {
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                r: Math.random() < 0.5 ? 2.0 : 3.0, // Larger size
                alpha: 0.8 + Math.random() * 0.2,   // Very solid (80% to 100% opaque)
                life: 0,
                maxLife: 300 + Math.random() * 200
            };
        }

        function init() {
            particles = [];
            for (let i = 0; i < 900; i++) {
                particles.push(mkParticle());
            }
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life++;
                
                const progress = p.life / p.maxLife;
                const fade = progress < 0.15 ? progress / 0.15 : progress > 0.75 ? 1 - (progress - 0.75) / 0.25 : 1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#008b8b';
                ctx.fillStyle = `rgba(0, 139, 139, ${p.alpha * fade})`;
                ctx.fill();
                ctx.shadowBlur = 0;
                
                if (p.life >= p.maxLife) {
                    particles[i] = mkParticle();
                }
            }
            animId = requestAnimationFrame(draw);
        }

        window.addEventListener('resize', () => { 
            resize(); 
            init(); 
        });

        resize(); 
        init(); 
        draw();
    }
});
