/* ============================================================
   CONFIGURATION – Fully Personalized for Anjali ❤️
   ============================================================ */
const birthdayConfig = {
    name: "Anjali",                         // Her full name
    nickname: "Anju",                       // Her nickname
    birthdayDate: "2026-08-17T00:00:00",    // 17th August – tomorrow!
    music: "assets/music/Birthday-music.mp3",
    
    // Photo Gallery – each memory with a loving caption
    gallery: [
        { title: "Your Smile 💖", desc: "The most beautiful smile that lights up my entire world." },
        { title: "Every Moment 🌸", desc: "Every second with you feels like a dream I never want to wake up from." },
        { title: "My Sunshine ☀️", desc: "You are the warmth that makes my darkest days bright." },
        { title: "Forever & Always 💕", desc: "In your eyes, I found my home. In your heart, I found my peace." },
        { title: "My Everything 🌹", desc: "You are not just my love – you are my reason to be a better person every day." }
    ],
    
    // Memory Timeline – beautiful stories about your journey
    timeline: [
        { date: "Aug 2024", title: "The Day My World Changed", desc: "The first time I saw you, I knew my life would never be the same. You walked in, and suddenly everything made sense. ❤️", img: "assets/images/photo1.jpeg" },
        { date: "Oct 2024", title: "Stolen Sunsets", desc: "Watching the sunset with you is my favorite thing. The sky turns orange and pink, but nothing is as beautiful as you. 🌅", img: "assets/images/photo2.jpeg" },
        { date: "Dec 2024", title: "Cozy Winters", desc: "Cold nights, warm hugs, and your laughter filling the room – that's my definition of heaven. 🤗", img: "assets/images/photo3.jpeg" },
        { date: "Mar 2025", title: "A New Beginning", desc: "Spring came, and so did our love – blooming, growing, and becoming more beautiful with every passing day. 🌸", img: "assets/images/photo4.jpeg" },
        { date: "Jun 2025", title: "Unforgettable Summer", desc: "Late night talks, endless laughter, and a love so deep that I forgot where I ended and you began. ☀️", img: "assets/images/photo5.jpeg" }
    ],
    
    // Birthday Letter – A heartfelt, handwritten-style message
    letter: "My Dearest Anju,\n\nThey say that some people come into our lives like a gentle breeze, changing everything without making a sound. That is exactly what you did to me.\n\nEvery single day with you feels like a gift. Your kindness, your strength, your beautiful soul – they inspire me to be the best version of myself. When I look at you, I see not just my girlfriend, but my best friend, my partner, and my home.\n\nToday, on your birthday, I want you to know that you are celebrated, cherished, and deeply loved – not just today, but every single moment of every single day.\n\nMay this new year of your life bring you everything you have ever wished for. May your heart always be full of joy, your days full of sunshine, and your nights full of peaceful dreams.\n\nAnd remember, no matter where life takes us, I will always be right here – loving you, cheering for you, and holding your hand through it all.\n\nHappy Birthday, my Anju. You are my forever. 💌\n\nWith all my love, always,\n[Your Name] ❤️"
};

// (Everything below is the engine – do not change unless you know what you're doing)
// ============================================================
// HELPER – Create a fallback emoji div
// ============================================================
function createFallbackDiv(emoji, bgColor) {
    const div = document.createElement('div');
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.fontSize = '4rem';
    div.style.background = bgColor || 'linear-gradient(135deg, #FF6B6B, #2c3e50)';
    div.style.borderRadius = '10px';
    div.textContent = emoji || '📸';
    return div;
}

// ============================================================
// GLOBALS & STATE
// ============================================================
let music = null;
let musicPlaying = false;
let musicEnabled = true;
let confettiActive = false;
let fireworksActive = false;
let lightboxImages = [];
let lightboxIndex = 0;
let candlesLit = 4;
let wishMade = false;
let countdownInterval = null;

// ============================================================
// DOM REFS
// ============================================================
const openingScreen = document.getElementById('openingScreen');
const mainContent = document.getElementById('mainContent');
const btnOpen = document.getElementById('btnOpen');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicLabel = document.getElementById('musicLabel');
const birthdayNameSpan = document.getElementById('birthdayName');
const finalNameSpan = document.getElementById('finalName');
const galleryGrid = document.getElementById('galleryGrid');
const timelineContainer = document.getElementById('timelineContainer');
const letterContent = document.getElementById('letterContent');
const cdDays = document.getElementById('cdDays');
const cdHours = document.getElementById('cdHours');
const cdMinutes = document.getElementById('cdMinutes');
const cdSeconds = document.getElementById('cdSeconds');
const countdownMessage = document.getElementById('countdownMessage');
const btnSurprise = document.getElementById('btnSurprise');
const finalOverlay = document.getElementById('finalOverlay');
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCounter = document.getElementById('lbCounter');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');

// ============================================================
// SET NAME
// ============================================================
birthdayNameSpan.textContent = birthdayConfig.name;
finalNameSpan.textContent = birthdayConfig.name;

// ============================================================
// NAVIGATION
// ============================================================
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ============================================================
// STARS (Canvas)
// ============================================================
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.02 + 0.005,
            brightness: Math.random() * 0.5 + 0.5
        });
    }
}
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.brightness})`;
        ctx.fill();
    });
    requestAnimationFrame(drawStars);
}
initStars();
drawStars();
window.addEventListener('resize', initStars);

// ============================================================
// MUSIC
// ============================================================
function initMusic() {
    try {
        music = new Audio(birthdayConfig.music);
        music.loop = true;
        music.volume = 0.6;
        music.addEventListener('error', () => {
            console.log('🎵 Music file not found. Continuing without music.');
            musicEnabled = false;
            musicToggle.style.opacity = '0.5';
            musicIcon.textContent = '🔇';
            musicLabel.textContent = 'No Music';
        });
    } catch (e) {
        musicEnabled = false;
        musicToggle.style.opacity = '0.5';
        musicIcon.textContent = '🔇';
        musicLabel.textContent = 'No Music';
    }
}
initMusic();

function toggleMusic() {
    if (!musicEnabled || !music) return;
    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        musicIcon.textContent = '🔇';
        musicLabel.textContent = 'Music Off';
    } else {
        music.play().catch(() => {});
        musicPlaying = true;
        musicIcon.textContent = '🎵';
        musicLabel.textContent = 'Music On';
    }
}
musicToggle.addEventListener('click', toggleMusic);

// ============================================================
// OPEN BUTTON
// ============================================================
btnOpen.addEventListener('click', () => {
    openingScreen.style.transition = 'opacity 0.8s ease';
    openingScreen.style.opacity = '0';
    setTimeout(() => {
        openingScreen.style.display = 'none';
        mainContent.style.display = 'block';
        if (musicEnabled && music) {
    music.play()
        .then(() => {
            musicPlaying = true;
            musicIcon.textContent = '🎵';
            musicLabel.textContent = 'Music On';
        })
        .catch((error) => {
            console.error('Music could not start:', error);
            musicPlaying = false;
            musicIcon.textContent = '🔇';
            musicLabel.textContent = 'Music Off';
        });
}
        launchConfetti();
        launchFireworks();
        createBalloons();
        birthdayNameSpan.textContent = birthdayConfig.name;
        initGallery();
        initTimeline();
        initLetter();
        initCountdown();
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }, 800);
});

// ============================================================
// CONFETTI & FIREWORKS
// ============================================================
function launchConfetti() {
    if (confettiActive) return;
    confettiActive = true;
    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#f9844a'];
    for (let i = 0; i < 80; i++) {
        const el = document.createElement('div');
        el.style.position = 'fixed';
        el.style.width = '10px';
        el.style.height = '10px';
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = '-10px';
        el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '9999';
        el.style.transition = 'transform 2s ease-in, opacity 2s ease-in';
        document.body.appendChild(el);
        const xOffset = (Math.random() - 0.5) * 200;
        const yFall = Math.random() * 80 + 60;
        const rotation = Math.random() * 720 - 360;
        requestAnimationFrame(() => {
            el.style.transform = `translate(${xOffset}px, ${yFall}vh) rotate(${rotation}deg)`;
            el.style.opacity = '0';
        });
        setTimeout(() => el.remove(), 2500);
    }
    setTimeout(() => confettiActive = false, 2500);
}

function launchFireworks() {
    if (fireworksActive) return;
    fireworksActive = true;
    const colors = ['#ff0040', '#ffaa00', '#00ccff', '#ff66cc', '#66ff66', '#ffcc00'];
    for (let burst = 0; burst < 3; burst++) {
        setTimeout(() => {
            const cx = 10 + Math.random() * 80;
            const cy = 10 + Math.random() * 40;
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.left = cx + 'vw';
                particle.style.top = cy + 'vh';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                particle.style.transition = 'all 0.8s ease-out';
                document.body.appendChild(particle);
                const angle = Math.random() * 2 * Math.PI;
                const dist = 50 + Math.random() * 100;
                const dx = Math.cos(angle) * dist;
                const dy = Math.sin(angle) * dist;
                requestAnimationFrame(() => {
                    particle.style.transform = `translate(${dx}px, ${dy}px)`;
                    particle.style.opacity = '0';
                });
                setTimeout(() => particle.remove(), 1000);
            }
        }, burst * 400);
    }
    setTimeout(() => fireworksActive = false, 2000);
}

// ============================================================
// BALLOONS
// ============================================================
function createBalloons() {
    const container = document.querySelector('.hero-animations');
    if (!container) return;
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bcb'];
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.style.position = 'fixed';
        balloon.style.bottom = '-100px';
        balloon.style.left = (10 + Math.random() * 80) + 'vw';
        balloon.style.width = '40px';
        balloon.style.height = '50px';
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        balloon.style.boxShadow = 'inset -5px -5px 10px rgba(0,0,0,0.2)';
        balloon.style.pointerEvents = 'none';
        balloon.style.zIndex = '999';
        balloon.style.transition = 'transform 6s ease-in';
        balloon.style.transform = `translateY(-110vh)`;
        document.body.appendChild(balloon);
        const string = document.createElement('div');
        string.style.position = 'absolute';
        string.style.width = '2px';
        string.style.height = '30px';
        string.style.background = '#aaa';
        string.style.bottom = '-20px';
        string.style.left = '50%';
        string.style.transform = 'translateX(-50%)';
        balloon.appendChild(string);
        setTimeout(() => {
            balloon.style.transform = `translateY(-110vh) scale(0.8)`;
            setTimeout(() => balloon.remove(), 6000);
        }, 100);
    }
}

// ============================================================
// CAKE
// ============================================================
const candles = document.querySelectorAll('.candle');
const wishStatus = document.getElementById('wishStatus');

candles.forEach(candle => {
    candle.addEventListener('click', function(e) {
        e.stopPropagation();
        const flame = this.querySelector('.flame');
        if (!flame) return;
        if (flame.dataset.lit === 'false') return;
        flame.dataset.lit = 'false';
        candlesLit--;
        const smokeContainer = document.getElementById('smokeContainer');
        for (let i = 0; i < 3; i++) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke';
            smoke.style.left = (Math.random() * 20 - 10) + 'px';
            smoke.style.top = (Math.random() * 10) + 'px';
            smokeContainer.appendChild(smoke);
            setTimeout(() => smoke.remove(), 1200);
        }
        if (candlesLit === 0 && !wishMade) {
            wishMade = true;
            wishStatus.textContent = 'Wish Made! 💫❤️';
            launchConfetti();
            launchFireworks();
            for (let i = 0; i < 15; i++) {
                const heart = document.createElement('div');
                heart.textContent = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = (10 + Math.random() * 80) + 'vw';
                heart.style.top = '50%';
                heart.style.fontSize = (2 + Math.random() * 2) + 'rem';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9999';
                heart.style.transition = 'transform 1.5s ease-out, opacity 1.5s ease-out';
                document.body.appendChild(heart);
                const xOff = (Math.random() - 0.5) * 200;
                requestAnimationFrame(() => {
                    heart.style.transform = `translate(${xOff}px, -${100 + Math.random()*100}px) scale(1.5)`;
                    heart.style.opacity = '0';
                });
                setTimeout(() => heart.remove(), 2000);
            }
        }
    });
});

// ============================================================
// GALLERY (with placeholder fallback)
// ============================================================
function initGallery() {
    const images = [
        'assets/images/photo1.jpeg',
        'assets/images/photo2.jpeg',
        'assets/images/photo3.jpeg',
        'assets/images/photo4.jpeg',
        'assets/images/photo5.jpeg'
    ];
    const emojis = ['❤️', '🌟', '🎂', '💫', '🎉'];
    const captions = birthdayConfig.gallery;
    galleryGrid.innerHTML = '';
    
    images.forEach((src, idx) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        wrapper.style.height = '200px';
        wrapper.style.overflow = 'hidden';
        wrapper.style.borderRadius = '10px 10px 0 0';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Memory ${idx+1}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.display = 'block';
        img.onerror = function() {
            const fallback = createFallbackDiv(emojis[idx % emojis.length], 
                ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#DDA0DD'][idx % 5]);
            this.parentNode.replaceChild(fallback, this);
        };
        wrapper.appendChild(img);
        
        const cap = document.createElement('div');
        cap.className = 'gallery-caption';
        cap.innerHTML = `<h4>${captions[idx]?.title || 'Memory'}</h4><p>${captions[idx]?.desc || ''}</p>`;
        
        item.appendChild(wrapper);
        item.appendChild(cap);
        item.addEventListener('click', () => openLightbox(idx, images));
        galleryGrid.appendChild(item);
    });
    lightboxImages = images;
}

// ============================================================
// TIMELINE (with simpler fallback)
// ============================================================
function initTimeline() {
    const items = birthdayConfig.timeline;
    timelineContainer.innerHTML = '';
    const emojis = ['🌅', '🎉', '🤗', '🙏', '💖'];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD'];
    
    items.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        
        const card = document.createElement('div');
        card.className = 'timeline-card';
        
        const dateEl = document.createElement('div');
        dateEl.className = 'timeline-date';
        dateEl.textContent = item.date;
        card.appendChild(dateEl);
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        wrapper.style.height = '140px';
        wrapper.style.overflow = 'hidden';
        wrapper.style.borderRadius = '10px';
        wrapper.style.marginBottom = '0.5rem';
        wrapper.style.background = colors[idx % colors.length];
        
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.title;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.display = 'block';
        img.onerror = function() {
            const fallback = createFallbackDiv(emojis[idx % emojis.length], 
                `linear-gradient(135deg, ${colors[idx % colors.length]}, #2c3e50)`);
            this.parentNode.replaceChild(fallback, this);
        };
        wrapper.appendChild(img);
        card.appendChild(wrapper);
        
        const titleEl = document.createElement('h4');
        titleEl.textContent = item.title;
        card.appendChild(titleEl);
        
        const descEl = document.createElement('p');
        descEl.textContent = item.desc;
        card.appendChild(descEl);
        
        div.appendChild(card);
        timelineContainer.appendChild(div);
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        observer.observe(div);
    });
}

// ============================================================
// LETTER
// ============================================================
function initLetter() {
    const fullText = birthdayConfig.letter.replace(/\[NAME\]/g, birthdayConfig.name).replace(/\[NICKNAME\]/g, birthdayConfig.nickname);
    letterContent.innerHTML = '';
    let index = 0;
    function type() {
        if (index < fullText.length) {
            const char = fullText.charAt(index);
            if (char === '\n') {
                letterContent.innerHTML += '<br>';
            } else {
                letterContent.innerHTML += char;
            }
            index++;
            setTimeout(type, 40);
        }
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && letterContent.innerHTML === '') {
                type();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(document.querySelector('.letter-section'));
}

// ============================================================
// COUNTDOWN – Counting down to 17th August!
// ============================================================
function initCountdown() {
    const target = new Date(birthdayConfig.birthdayDate).getTime();
    if (isNaN(target)) {
        countdownMessage.textContent = 'Invalid date. Please check config.';
        return;
    }
    function update() {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff <= 0) {
            clearInterval(countdownInterval);
            cdDays.textContent = '00';
            cdHours.textContent = '00';
            cdMinutes.textContent = '00';
            cdSeconds.textContent = '00';
            countdownMessage.innerHTML = '🎉 It\'s Anjali\'s Birthday! 🎂❤️';
            launchConfetti();
            launchFireworks();
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        cdDays.textContent = String(days).padStart(2, '0');
        cdHours.textContent = String(hours).padStart(2, '0');
        cdMinutes.textContent = String(minutes).padStart(2, '0');
        cdSeconds.textContent = String(seconds).padStart(2, '0');
    }
    update();
    countdownInterval = setInterval(update, 1000);
}

// ============================================================
// FINAL SURPRISE – The grand finale
// ============================================================
btnSurprise.addEventListener('click', () => {
    mainContent.style.transition = 'opacity 0.8s ease';
    mainContent.style.opacity = '0';
    setTimeout(() => {
        finalOverlay.classList.add('active');
        launchConfetti();
        launchFireworks();
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = (5 + Math.random() * 90) + 'vw';
            heart.style.top = '100%';
            heart.style.fontSize = (2 + Math.random() * 3) + 'rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '4000';
            heart.style.transition = 'transform 3s ease-in, opacity 3s ease-in';
            document.body.appendChild(heart);
            const xOff = (Math.random() - 0.5) * 100;
            requestAnimationFrame(() => {
                heart.style.transform = `translate(${xOff}px, -${60 + Math.random() * 40}vh) scale(1.2)`;
                heart.style.opacity = '0';
            });
            setTimeout(() => heart.remove(), 3500);
        }
    }, 800);
});

// ============================================================
// LIGHTBOX
// ============================================================
function openLightbox(index, images) {
    lightboxImages = images;
    lightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
}
function updateLightbox() {
    if (lightboxImages.length === 0) return;
    const src = lightboxImages[lightboxIndex];
    lbImage.src = src;
    lbImage.onerror = () => {
        lbImage.src = ''; 
        lbImage.alt = 'Image not found';
    };
    lbCounter.textContent = `${lightboxIndex+1} / ${lightboxImages.length}`;
}
lbClose.addEventListener('click', () => lightbox.classList.remove('active'));
lbPrev.addEventListener('click', () => {
    if (lightboxImages.length === 0) return;
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
});
lbNext.addEventListener('click', () => {
    if (lightboxImages.length === 0) return;
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightbox();
});
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowLeft') lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
});
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
});

console.log('🎂 Happy Birthday Anjali! ✨ The website is ready for you!');