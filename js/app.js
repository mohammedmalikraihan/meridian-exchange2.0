document.addEventListener('DOMContentLoaded', () => {
    
    // Dynamic Top Indicator Line (Scroll Progress)
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Mobile Responsive Navigation Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Close menu when selecting a navigation shortcut link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && menuToggle) {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });

    // ── PARTICLE CANVAS ANIMATION BLOCK ──
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, particles = [], animId;

        // Function to handle resizing dynamically
        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }

        // Particle generator with top-right and bottom-left clustering algorithms
        function mkParticle() {
            const side = Math.random();
            let x, y;
            
            // Cluster 60% of particles toward top-right, 40% toward bottom-left
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
                r: Math.random() < 0.7 ? 1 : 1.8,
                alpha: 0.2 + Math.random() * 0.6,
                life: 0,
                maxLife: 280 + Math.random() * 200
            };
        }

        // Initialize array with 900 active particle vectors
        function init() {
            particles = [];
            for (let i = 0; i < 900; i++) {
                particles.push(mkParticle());
            }
        }

        // Core animation rendering loop
        function draw() {
            ctx.clearRect(0, 0, W, H);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life++;
                
                const progress = p.life / p.maxLife;
                // Soft fade-in at birth, sharp fade-out near structural max-life cycle
                const fade = progress < 0.15 ? progress / 0.15 : progress > 0.75 ? 1 - (progress - 0.75) / 0.25 : 1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0,188,212,${p.alpha * fade})`;
                ctx.fill();
                
                // Respawn particle once life cycles complete
                if (p.life >= p.maxLife) {
                    particles[i] = mkParticle();
                }
            }
            animId = requestAnimationFrame(draw);
        }

        // Event hooks to handle cross-device viewport changes
        window.addEventListener('resize', () => { 
            resize(); 
            init(); 
        });

        // Initialize and fire up frame rendering
        resize(); 
        init(); 
        draw();
    }
});
