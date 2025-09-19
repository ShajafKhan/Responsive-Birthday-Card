console.info('Birthday Card Script: Initializing...');

const performanceTracker = {
    startTime: performance.now(),

    logPerformance(label) {
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        console.log(`PERFORMANCE: ${label} - ${elapsed.toFixed(2)}ms`);
    },

    trackAnimation(animationType, count) {
        console.log(`ANIMATION STATS: ${animationType} - Active: ${count}`);
    }
};

const features = {
    animations: 'animate' in document.createElement('div'),
    localStorage: typeof Storage !== 'undefined',
    audioContext: 'AudioContext' in window || 'webkitAudioContext' in window
};

console.log('FEATURES: Browser support detected:', features);

function storeParamsToLocalStorageAndReloadOnce() {
    console.group('URL Parameter Processing');
    console.log('Checking URL parameters...');

    const params = new URLSearchParams(window.location.search);
    const hasParams = params.has('n');
    const isReloaded = sessionStorage.getItem('birthdayReloaded');

    console.log('URL parameters found:', hasParams);
    console.log('Already reloaded?', !!isReloaded);
    console.log('Current URL:', window.location.href);

    if (hasParams && !isReloaded) {
        console.warn('Processing parameters and preparing to reload...');

        if (params.has('n')) {
            const nameParam = params.get('n');
            console.log('Name parameter found:', nameParam);
            try {
                localStorage.setItem('n', nameParam);
                console.log('SUCCESS: Name saved to localStorage');
            } catch (error) {
                console.error('ERROR: Failed to save name to localStorage:', error);
            }
        }

        sessionStorage.setItem('birthdayReloaded', 'true');
        console.log('SUCCESS: Reload flag set');
        console.warn('REDIRECT: Redirecting to clean URL...');

        window.location.href = window.location.pathname;
    } else {
        console.log('SUCCESS: No processing needed - proceeding normally');
    }
    console.groupEnd();
}

console.time('Script initialization time');
storeParamsToLocalStorageAndReloadOnce();

console.group('DOM Element References');
const startContainer = document.getElementById('startContainer');
const birthdayCard = document.getElementById('birthdayCard');
const specialMessage = document.getElementById('specialMessage');
const celebrationSound = document.getElementById('celebrationSound');
const nameElement = document.getElementById('name');
const announcements = document.getElementById('announcements');

console.log('Start container:', startContainer ? 'SUCCESS: Found' : 'ERROR: Not found');
console.log('Birthday card:', birthdayCard ? 'SUCCESS: Found' : 'ERROR: Not found');
console.log('Special message:', specialMessage ? 'SUCCESS: Found' : 'ERROR: Not found');
console.log('Audio element:', celebrationSound ? 'SUCCESS: Found' : 'ERROR: Not found');
console.log('Name element:', nameElement ? 'SUCCESS: Found' : 'ERROR: Not found');
console.log('Announcements:', announcements ? 'SUCCESS: Found' : 'ERROR: Not found');
console.groupEnd();

function redirectToIndex() {
    console.info('REDIRECT: Navigating to index3.html');
    try {
        window.location.href = "index3.html";
    } catch (error) {
        console.error('REDIRECT ERROR:', error);
    }
}

function announceToScreenReader(message) {
    if (announcements) {
        announcements.textContent = message;
        setTimeout(() => {
            announcements.textContent = '';
        }, 1000);
    }
}

function toggleDropdown() {
    console.group('Theme Dropdown Toggle');
    console.log('Toggle dropdown function called');

    try {
        const menuBtn = document.querySelector('.menu-btn');
        const options = document.querySelector('.options');

        if (!menuBtn || !options) {
            console.error('ERROR: Menu elements not found');
            console.groupEnd();
            return;
        }

        const isOpen = menuBtn.classList.toggle('open');

        console.log('Menu button found:', !!menuBtn);
        console.log('Options found:', !!options);
        console.log('Dropdown is now:', isOpen ? 'OPEN' : 'CLOSED');

        options.classList.toggle('open', isOpen);
        menuBtn.setAttribute('aria-expanded', isOpen.toString());

        if (isOpen) {
            const firstOption = options.querySelector('.option');
            if (firstOption) {
                firstOption.focus();
            }
        }

        console.log('SUCCESS: Dropdown state updated');
    } catch (error) {
        console.error('ERROR: Toggle dropdown failed:', error);
    }
    console.groupEnd();
}

document.addEventListener('click', function (event) {
    console.log('EVENT: Document click detected');

    try {
        const selectMenu = document.querySelector('.select-menu');
        const options = document.querySelector('.options');
        const menuBtn = document.querySelector('.menu-btn');

        if (selectMenu && options && menuBtn &&
            !selectMenu.contains(event.target) &&
            options.classList.contains('open')) {

            console.info('ACTION: Closing dropdown - clicked outside menu');
            options.classList.remove('open');
            menuBtn.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            console.log('SUCCESS: Dropdown closed');
        }
    } catch (error) {
        console.error('ERROR: Click outside handler failed:', error);
    }
});

function changeTheme(theme) {
    console.group('Theme Change');
    console.log('Changing theme to:', theme);
    console.log('Previous theme:', document.body.className || 'default');

    try {
        document.body.className = theme === 'default' ? '' : theme;

        if (features.localStorage) {
            localStorage.setItem("selectedTheme", theme);
            console.log('SUCCESS: Theme saved to localStorage');
        } else {
            console.warn('WARNING: localStorage not available');
        }

        const options = document.querySelector('.options');
        const menuBtn = document.querySelector('.menu-btn');

        if (options && menuBtn) {
            options.classList.remove('open');
            menuBtn.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
        }

        announceToScreenReader(`Theme changed to ${theme.replace('theme-', '').replace('-', ' ')}`);
        console.log('SUCCESS: Theme applied and dropdown closed');
    } catch (error) {
        console.error('ERROR: Theme change failed:', error);
    }
    console.groupEnd();
}

window.addEventListener('load', function () {
    console.group('Window Load Event');
    console.log('Page fully loaded - initializing preferences...');

    try {

        if (features.localStorage) {
            const savedTheme = localStorage.getItem("selectedTheme");
            console.log('Saved theme from localStorage:', savedTheme || 'none');

            if (savedTheme && savedTheme !== 'default') {
                changeTheme(savedTheme);
                console.log('SUCCESS: Theme restored');
            } else {
                console.log('INFO: Using default theme');
            }

            const storedName = localStorage.getItem("n");
            console.log('Stored name from localStorage:', storedName || 'none');

            if (storedName && nameElement) {
                nameElement.textContent = storedName;
                console.log('SUCCESS: Custom name applied:', storedName);
            } else {
                console.log('INFO: Using default name: Friend');
            }
        }

        document.body.classList.add('loaded');
        performanceTracker.logPerformance('Full Page Load');
        console.timeEnd('Script initialization time');

    } catch (error) {
        console.error("ERROR: Initialization failed:", error);
    }
    console.groupEnd();
});

function startCard() {
    console.group('Start Card Animation');
    console.log('Starting birthday card experience...');

    try {
        if (!startContainer || !birthdayCard) {
            console.error('ERROR: Required elements not found');
            console.groupEnd();
            return;
        }

        console.log('Adding hide class to start container...');
        startContainer.classList.add('hide');
        console.log('SUCCESS: Hide animation started');

        announceToScreenReader('Birthday celebration starting!');

        setTimeout(() => {
            console.log('TRANSITION: Switching to birthday card...');
            startContainer.style.display = 'none';
            birthdayCard.classList.add('show-card');
            birthdayCard.setAttribute('aria-hidden', 'false');

            birthdayCard.focus();

            console.log('SUCCESS: Birthday card revealed');
            performanceTracker.logPerformance('Card Animation Complete');
            console.groupEnd();
        }, 800);
    } catch (error) {
        console.error('ERROR: Start card animation failed:', error);
        console.groupEnd();
    }
}

function revealMessage() {
    console.group('Special Message Reveal');
    console.log('Revealing special message and starting effects...');

    try {
        if (!specialMessage) {
            console.error('ERROR: Special message element not found');
            console.groupEnd();
            return;
        }

        specialMessage.classList.add('reveal');
        specialMessage.setAttribute('aria-hidden', 'false');
        console.log('SUCCESS: Special message revealed');

        announceToScreenReader('Special birthday message revealed! Celebrations beginning!');

        console.log('EFFECTS: Starting confetti animation...');
        startConfetti();

        console.log('EFFECTS: Starting balloon animation...');
        startBalloons();

        console.log('AUDIO: Attempting to play celebration sound...');
        playCelebrationSound();

        performanceTracker.logPerformance('Special Message Reveal');
    } catch (error) {
        console.error('ERROR: Reveal message failed:', error);
    }
    console.groupEnd();
}

let confettiActive = false;
let confettiArray = [];
const maxConfetti = window.innerWidth < 768 ? 30 : 50;

function createConfettiPiece() {
    try {
        console.log('CONFETTI: Creating confetti piece. Active count:', confettiArray.length);

        if (confettiArray.length >= maxConfetti || !confettiActive) {
            console.log('CONFETTI: Skipping creation - limit reached or inactive');
            return;
        }

        const confetti = document.createElement("div");
        if (!confetti) {
            console.error('ERROR: Failed to create confetti element');
            return;
        }

        confetti.className = "confetti";

        const windowWidth = window.innerWidth || 1024;
        confetti.style.left = Math.random() * windowWidth + "px";
        confetti.style.backgroundColor = getRandomColor();

        const size = Math.random() * 6 + 4;
        confetti.style.width = size + "px";
        confetti.style.height = size + "px";
        confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
        confetti.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');

        document.body.appendChild(confetti);
        confettiArray.push(confetti);
        console.log('SUCCESS: Confetti piece created and added to DOM');

        setTimeout(() => {
            try {
                if (confetti && confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                    console.log('CLEANUP: Confetti piece removed from DOM');
                }
                confettiArray = confettiArray.filter(item => item !== confetti);
            } catch (cleanupError) {
                console.warn('CLEANUP ERROR: Failed to remove confetti:', cleanupError.message);
            }
        }, 5000);

    } catch (error) {
        console.error('ERROR: Create confetti piece failed:', error);
    }
}

function startConfetti() {
    console.group('Confetti Animation System');

    try {
        if (confettiActive) {
            console.warn('WARNING: Confetti already active - preventing duplicate instance');
            console.groupEnd();
            return;
        }

        console.log('INIT: Starting confetti system');
        console.log('Max confetti count:', maxConfetti);

        confettiActive = true;
        const confettiDuration = 8000;
        const intervalTime = 100;

        console.log('Duration:', confettiDuration + 'ms');
        console.log('Interval:', intervalTime + 'ms');

        performanceTracker.logPerformance('Confetti Start');

        const confettiInterval = setInterval(() => {
            try {
                if (confettiActive) {
                    createConfettiPiece();
                    performanceTracker.trackAnimation('Confetti', confettiArray.length);
                } else {
                    clearInterval(confettiInterval);
                    console.log('CLEANUP: Confetti interval cleared');
                }
            } catch (error) {
                console.error('ERROR: Confetti interval error:', error);
                clearInterval(confettiInterval);
            }
        }, intervalTime);

        setTimeout(() => {
            confettiActive = false;
            console.log('STOP: Confetti generation stopped after duration');
            console.groupEnd();
        }, confettiDuration);

    } catch (error) {
        console.error('ERROR: Start confetti failed:', error);
        console.groupEnd();
    }
}

let activeBalloons = 0;
const maxBalloons = window.innerWidth < 768 ? 5 : 10;

function startBalloons() {
    console.group('Balloon Animation System');
    console.log('INIT: Starting balloon system');
    console.log('Max balloons:', maxBalloons);

    try {
        performanceTracker.logPerformance('Balloons Start');

        const balloonInterval = setInterval(() => {
            try {
                console.log('BALLOON CHECK: Active balloons:', activeBalloons);

                if (activeBalloons < maxBalloons) {
                    createBalloon();
                    activeBalloons++;
                    console.log('SUCCESS: Balloon created. New count:', activeBalloons);
                    performanceTracker.trackAnimation('Balloons', activeBalloons);
                } else {
                    clearInterval(balloonInterval);
                    console.log('COMPLETE: All balloons created - interval cleared');
                    console.groupEnd();
                }
            } catch (error) {
                console.error('ERROR: Balloon interval error:', error);
                clearInterval(balloonInterval);
                console.groupEnd();
            }
        }, 1500);

    } catch (error) {
        console.error('ERROR: Start balloons failed:', error);
        console.groupEnd();
    }
}

function createBalloon() {
    try {
        console.log('BALLOON: Creating new balloon');

        const balloon = document.createElement("div");
        if (!balloon) {
            console.error('ERROR: Failed to create balloon element');
            return;
        }

        balloon.className = "balloon";

        const windowWidth = window.innerWidth || 1024;
        const leftPosition = Math.random() * (windowWidth - 40);
        balloon.style.left = leftPosition + "px";
        console.log('BALLOON: Position set to', leftPosition + 'px');

        const balloonColor = getRandomColor();
        balloon.style.backgroundColor = balloonColor;
        console.log('BALLOON: Color set to', balloonColor);

        const duration = (Math.random() * 4 + 4) + "s";
        balloon.style.animationDuration = duration;
        console.log('BALLOON: Animation duration set to', duration);

        balloon.addEventListener("animationend", () => {
            try {
                if (balloon.parentNode) {
                    balloon.parentNode.removeChild(balloon);
                }
                activeBalloons--;
                console.log('CLEANUP: Balloon animation ended and removed. Active count:', activeBalloons);
            } catch (error) {
                console.warn('CLEANUP ERROR: Balloon removal failed:', error);
            }
        });

        document.body.appendChild(balloon);
        console.log('SUCCESS: Balloon added to DOM');

    } catch (error) {
        console.error('ERROR: Create balloon failed:', error);
    }
}

function getRandomColor() {
    const colors = [
        '#a8e6cf', '#dcedc1', '#b2dfdb', '#80cbc4', '#4db6ac',
        '#ff9a9e', '#fbc2eb', '#ffc3a0', '#ffb6b9', '#fae3d9',
        '#00bfa5', '#00897b', '#957dad', '#6d4c71', '#f8b195',
        '#f67280', '#c06c84', '#a1c4fd', '#c2e9fb'
    ];

    const selectedColor = colors[Math.floor(Math.random() * colors.length)];
    console.log('COLOR: Selected random color:', selectedColor);
    return selectedColor;
}

function playCelebrationSound() {
    console.group('Audio Playback');
    console.log('AUDIO: Checking audio element and source...');
    console.log('Audio element exists:', !!celebrationSound);

    try {
        if (!celebrationSound) {
            console.log('INFO: No audio element found - skipping playback');
            console.groupEnd();
            return;
        }

        const audioSrc = celebrationSound.src || celebrationSound.currentSrc;
        console.log('Audio source:', audioSrc || 'No source set');

        if (audioSrc && audioSrc !== window.location.href) {
            console.log('AUDIO: Valid source found - attempting playback');
            celebrationSound.currentTime = 0;

            celebrationSound.play().then(() => {
                console.log('SUCCESS: Audio playback started');
            }).catch(error => {
                console.warn('WARNING: Audio playback failed:', error.message);

                createWebAudioCelebration();
            });
        } else {
            console.log('INFO: No valid audio source - creating web audio celebration');
            createWebAudioCelebration();
        }
    } catch (error) {
        console.error('ERROR: Audio playback error:', error);
        createWebAudioCelebration();
    }
    console.groupEnd();
}

function createWebAudioCelebration() {
    try {
        if (!features.audioContext) {
            console.log('INFO: Web Audio API not available - silent celebration');
            return;
        }

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        console.log('SUCCESS: Web Audio celebration sound created');
    } catch (error) {
        console.log('INFO: Web Audio creation failed - silent celebration:', error.message);
    }
}

window.addEventListener('error', function (event) {
    console.group('Global Error Handler');
    console.error('ERROR: Global error detected:', event.error);
    console.log('Error details:', {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno
    });
    console.groupEnd();
});

document.addEventListener('keydown', function (event) {
    console.log('KEYBOARD: Key pressed:', event.key);

    try {
        const menuBtn = document.querySelector('.menu-btn');
        const options = document.querySelector('.options');

        if (event.target === menuBtn && (event.key === 'Enter' || event.key === ' ')) {
            console.log('KEYBOARD: Menu button activated via keyboard');
            event.preventDefault();
            toggleDropdown();
            return;
        }

        if (event.key === 'Escape' && options && options.classList.contains('open')) {
            console.log('KEYBOARD: Escape pressed - closing dropdown');
            options.classList.remove('open');
            menuBtn.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            if (menuBtn) {
                menuBtn.focus();
            }
            console.log('SUCCESS: Dropdown closed and focus returned to menu button');
            return;
        }

        if (options && options.classList.contains('open')) {
            const menuItems = options.querySelectorAll('.option');
            const currentIndex = Array.from(menuItems).indexOf(event.target);

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
                menuItems[nextIndex].focus();
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
                menuItems[prevIndex].focus();
            } else if (event.key === 'Enter' || event.key === ' ') {
                if (event.target.classList.contains('option')) {
                    event.preventDefault();
                    event.target.click();
                }
            }
        }
    } catch (error) {
        console.error('ERROR: Keyboard handler failed:', error);
    }
});

window.addEventListener('beforeunload', function () {
    console.group('Page Unload Cleanup');
    console.log('CLEANUP: Page is being unloaded - stopping animations');

    try {
        confettiActive = false;
        console.log('CLEANUP: Confetti system deactivated');

        const cleanupCount = confettiArray.length;
        confettiArray.forEach(confetti => {
            try {
                if (confetti && confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            } catch (error) {
                console.warn('CLEANUP: Error removing confetti:', error);
            }
        });
        console.log('CLEANUP: Attempted to remove', cleanupCount, 'confetti pieces');

        confettiArray = [];
        activeBalloons = 0;

    } catch (error) {
        console.error('CLEANUP ERROR:', error);
    }
    console.groupEnd();
});

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM READY: Content loaded, initializing early features...');
    document.body.classList.add('loaded');
    performanceTracker.logPerformance('DOM Content Loaded');
});

console.log('SUCCESS: Birthday card script fully loaded and ready');
performanceTracker.logPerformance('Script Load Complete');