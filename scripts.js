let isExperienceStarted = false;
let bgMusic = null;

// Initialize handles as early as possible
document.addEventListener('DOMContentLoaded', () => {
    bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.volume = 0.5;
    }

    // Splash Screen Logic
    const splash = document.getElementById('splash-screen');
    if (splash) {
        splash.addEventListener('click', () => {
            if (bgMusic) {
                bgMusic.play().then(() => {
                    console.log('Music started via splash');
                    cleanupAudioListeners();
                }).catch(err => {
                    console.log('Music play failed on splash click', err);
                });
            }

            // Fade out splash screen
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.classList.add('hidden');
            }, 1000);
        });
    }
});

// Start Experience - Transition from welcome to countdown screen
function startExperience() {
    isExperienceStarted = true;
    const welcomeContainer = document.getElementById('welcome-container');
    const countdownContainer = document.getElementById('countdown-container');
    const mainContainer = document.getElementById('main-container');
    const countdownTimer = document.getElementById('countdown-timer');

    // Stop background music
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }

    // Fade out welcome screen
    welcomeContainer.classList.add('opacity-0');

    setTimeout(() => {
        welcomeContainer.classList.add('hidden');
        // Show countdown screen with fade-in
        countdownContainer.classList.add('opacity-0');
        countdownContainer.classList.remove('hidden');

        // Trigger fade-in
        setTimeout(() => {
            countdownContainer.classList.remove('opacity-0');
        }, 100); // Increased for smoother appearance

        // Start countdown from 10
        let timeLeft = 10;
        countdownTimer.textContent = timeLeft;

        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownTimer.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);

                // Fade out countdown screen
                countdownContainer.classList.add('opacity-0');

                setTimeout(() => {
                    countdownContainer.classList.add('hidden');
                    // Prepare main container for fade in
                    mainContainer.classList.add('opacity-0'); // Ensure it's initially hidden for fade-in
                    mainContainer.classList.remove('hidden');

                    // Trigger reflow
                    setTimeout(() => {
                        mainContainer.classList.remove('opacity-0');
                    }, 50);
                }, 1000);
            }
        }, 1000); // Update every second
    }, 1000);
}

let yesClickCount = 0;

//click yes btn
function clickYesButton() {
    yesClickCount++;
    const yesBtn = document.getElementById('yes-button');

    // Increase size
    let currentScale = 1 + (yesClickCount * 0.2);
    yesBtn.style.transform = `scale(${currentScale})`;

    if (yesClickCount === 5) {
        // Hide Yes and No buttons
        document.getElementById('yes-button').classList.add('hidden');
        document.getElementById('no-button').classList.add('hidden');

        // Show Hbeeeeeek button
        document.getElementById('hbeeeeeek-button').classList.remove('hidden');
    }
}

function clickHbeeeeeekButton() {
    const mainContainer = document.getElementById('main-container');
    const successContainer = document.getElementById('success-container');

    // Fade out main container
    mainContainer.classList.add('opacity-0');

    // Wait for the transition to finish (1s)
    setTimeout(() => {
        mainContainer.classList.add('hidden');

        // Prepare success container
        successContainer.classList.add('opacity-0');
        successContainer.classList.remove('hidden');

        // Trigger reflow/wait a tick to ensure transition happens
        setTimeout(() => {
            successContainer.classList.remove('opacity-0');
        }, 50);

    }, 1000);

    // Star the rain!
    createRainingHearts();
}

function hoverNoButton() {
    const noBtn = document.getElementById('no-button');
    // FIX: Select the specific buttons container inside the main container, 
    // or simply look at the button's own parent.
    const buttonsContainer = document.querySelector('#main-container .buttons');

    // Check if it's the first time (still inside buttons container)
    if (noBtn.parentNode === buttonsContainer) {

        // 1. Get initial geometry
        const rect = noBtn.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // 2. Create spacer to hold the layout
        const spacer = document.createElement('div');
        spacer.style.width = width + 'px';
        spacer.style.height = height + 'px';
        spacer.style.transition = 'all 0.5s ease'; // Smooth collapse

        // Insert spacer before moving button
        buttonsContainer.insertBefore(spacer, noBtn);

        // 3. Move button to body (fixed) at EXACT same visual position
        noBtn.style.position = 'fixed';
        noBtn.style.left = rect.left + 'px';
        noBtn.style.top = rect.top + 'px';
        noBtn.style.width = width + 'px'; // Maintain width
        document.body.appendChild(noBtn);

        // 4. Smoothly collapse spacer to center Yes button
        // Force reflow to ensure transition happens
        spacer.offsetHeight;

        spacer.style.width = '0px';
        spacer.style.marginLeft = '-2rem'; // Counteract the gap in flex container if needed
        spacer.style.opacity = '0';

        setTimeout(() => {
            spacer.remove();
        }, 500);

        // 5. Move to random position after a brief delay to allow CSS transition to detect the 'from' state
        requestAnimationFrame(() => {
            moveNoButtonRandomly(noBtn);
        });

    } else {
        // Already floating, just move
        moveNoButtonRandomly(noBtn);
    }
}

function moveNoButtonRandomly(noBtn) {
    // Play sound effect
    const runSound = new Audio('run.WAV');
    runSound.play().catch(e => console.log('Sound play deferred until user interaction'));

    // Get actual dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Window dimensions
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    // EXTREME SAFETY MARGIN (100px)
    const margin = 100;

    const minX = margin;
    const maxX = winWidth - btnWidth - margin;
    const minY = margin;
    const maxY = winHeight - btnHeight - margin;

    // Clamp range
    const rangeX = Math.max(0, maxX - minX);
    const rangeY = Math.max(0, maxY - minY);

    // Random position
    const randomX = minX + (Math.random() * rangeX);
    const randomY = minY + (Math.random() * rangeY);

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Ensure it's on top of everything
    noBtn.style.zIndex = '9999';
}

function createRainingHearts() {
    const heartInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart-rain');
        heart.innerText = '❤️';

        // Random Position
        heart.style.left = Math.random() * 100 + 'vw';

        // Random Animation Duration
        heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // 3s to 5s

        // Random Size
        heart.style.fontSize = Math.random() * 20 + 20 + 'px'; // 20px to 40px

        document.body.appendChild(heart);

        // Cleanup after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300); // New heart every 300ms
}

function goToNextPage() {
    const successContainer = document.getElementById('success-container');
    const loveLetterContainer = document.getElementById('love-letter-container');

    // Fade out success container
    successContainer.classList.add('opacity-0');

    setTimeout(() => {
        successContainer.classList.add('hidden');

        // Prepare love letter for fade in
        loveLetterContainer.classList.add('opacity-0');
        loveLetterContainer.classList.remove('hidden');

        // Trigger reflow
        void loveLetterContainer.offsetWidth;

        // Fade in
        loveLetterContainer.classList.remove('opacity-0');

        // Initialize love letter if not already done
        if (!window.loveLetterInitialized) {
            initLoveLetter();
            window.loveLetterInitialized = true;
        }
    }, 1000);
}

function initLoveLetter() {
    var envelope = document.getElementById('loveLetterEnvelope');
    var btnOpen = document.getElementById('loveLetterOpen');
    var btnClose = document.getElementById('loveLetterClose');
    var btnNext = document.getElementById('loveLetterNext');

    if (!envelope || !btnOpen || !btnClose) {
        console.warn('Love Letter component elements not found');
        return;
    }

    // Click on envelope to open
    envelope.addEventListener('click', function () {
        openEnvelope();
    });

    // Open button
    btnOpen.addEventListener('click', function () {
        openEnvelope();
    });

    // Close button
    btnClose.addEventListener('click', function () {
        closeEnvelope();
    });

    // Next button - navigate to reasons page with smooth transition
    if (btnNext) {
        btnNext.addEventListener('click', function () {
            const loveLetterContainer = document.getElementById('love-letter-container');

            // Fade out
            loveLetterContainer.classList.add('opacity-0');

            // Navigate after transition
            setTimeout(() => {
                window.location.href = 'reasons-why-i-love-you.html';
            }, 1000);
        });
    }



    function openEnvelope() {
        envelope.classList.add('open');
        envelope.classList.remove('close');

        // Show Next button after animation
        if (btnNext) {
            setTimeout(() => {
                btnNext.classList.add('visible');
            }, 800); // Wait for flap animation
        }
    }

    function closeEnvelope() {
        envelope.classList.add('close');
        envelope.classList.remove('open');

        // Hide Next button when closed
        if (btnNext) {
            btnNext.classList.remove('visible');
        }
    }
}

// Background Music Control Logic
function tryPlayMusic() {
    if (isExperienceStarted) return;

    // Ensure we have the element
    if (!bgMusic) {
        bgMusic = document.getElementById('bg-music');
    }

    if (bgMusic) {
        bgMusic.play().then(() => {
            console.log('Background music playing');
            cleanupAudioListeners();
        }).catch(err => {
            console.log('Autoplay deferred');
        });
    }
}

function cleanupAudioListeners() {
    document.removeEventListener('click', tryPlayMusic);
    document.removeEventListener('touchstart', tryPlayMusic);
    document.removeEventListener('mousedown', tryPlayMusic);
    document.removeEventListener('keydown', tryPlayMusic);
}

// Global Click Sound for all buttons except No button
document.addEventListener('click', (e) => {
    const isButton = e.target.tagName === 'BUTTON' ||
        (e.target.tagName === 'INPUT' && e.target.type === 'button');
    const isNoButton = e.target.id === 'no-button';

    if (isButton && !isNoButton) {
        const clickSound = new Audio('click.WAV');
        clickSound.play().catch(err => console.log('Click sound deferred'));
    }
});

// Initialize background music listeners immediately
document.addEventListener('click', tryPlayMusic);
document.addEventListener('touchstart', tryPlayMusic);
document.addEventListener('mousedown', tryPlayMusic);
document.addEventListener('keydown', tryPlayMusic);

// Try playing on load anyway
window.addEventListener('load', tryPlayMusic);
