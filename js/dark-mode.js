let lastScrollTop = 0

window.addEventListener('scroll', function () {
    // Get the current scroll position
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Sticky menu logic
    let headerMenu = document.querySelector('.header-menu')

    if (scrollTop > 36) {
        headerMenu.classList.add('sticky')
    } else {
        headerMenu.classList.remove('sticky')
    }

    // Slide menu up or down based on scroll direction
    if (scrollTop > lastScrollTop) {
        headerMenu.style.transform = 'translateY(-100%)'
    } else {
        headerMenu.style.transform = 'translateY(0)'
    }

    // Update the last scroll position
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
})

document.addEventListener('DOMContentLoaded', function () {
    // Hero Dark/Light Mode Demo Toggle
    const darkBtn = document.querySelector('.dark-btn')
    const lightBtn = document.querySelector('.light-btn')
    const darkDemo = document.querySelector('.dark-demo')
    const lightDemo = document.querySelector('.light-demo')

    if (darkBtn && lightBtn && darkDemo && lightDemo) {
        // Dark button click handler
        darkBtn.addEventListener('click', function () {
            // Add active class to dark button
            darkBtn.querySelector('img').style.border = '1px solid #B8D7F9'
            lightBtn.querySelector('img').style.border = ''
            darkBtn.classList.add('active')
            lightBtn.classList.remove('active')

            // Show dark demo, hide light demo
            darkDemo.classList.remove('hidden')
            darkDemo.classList.add('block')
            lightDemo.classList.remove('block')
            lightDemo.classList.add('hidden')
        })

        // Light button click handler
        lightBtn.addEventListener('click', function () {
            // Add active class to light button
            lightBtn.querySelector('img').style.border = '1px solid #B8D7F9'
            darkBtn.querySelector('img').style.border = ''
            lightBtn.classList.add('active')
            darkBtn.classList.remove('active')

            // Show light demo, hide dark demo
            lightDemo.classList.remove('hidden')
            lightDemo.classList.add('block')
            darkDemo.classList.remove('block')
            darkDemo.classList.add('hidden')
        })

        // Auto-toggle between dark and light mode every 3 seconds
        setInterval(function () {
            if (darkBtn.classList.contains('active')) {
                // Switch to light mode
                lightBtn.querySelector('img').style.border = '1px solid #B8D7F9'
                darkBtn.querySelector('img').style.border = ''
                lightBtn.classList.add('active')
                darkBtn.classList.remove('active')
                lightDemo.classList.remove('hidden')
                lightDemo.classList.add('block')
                darkDemo.classList.remove('block')
                darkDemo.classList.add('hidden')
            } else {
                // Switch to dark mode
                darkBtn.querySelector('img').style.border = '1px solid #B8D7F9'
                lightBtn.querySelector('img').style.border = ''
                darkBtn.classList.add('active')
                lightBtn.classList.remove('active')
                darkDemo.classList.remove('hidden')
                darkDemo.classList.add('block')
                lightDemo.classList.remove('block')
                lightDemo.classList.add('hidden')
            }
        }, 3000)
    }
})


class YouTubePopup {
    constructor() {
        this.isOpen = false;
        this.popup = null;
        this.popupbg = null;
        this.content = null;
        this.video = null;
        this.closeBtn = null;
        this.videoIdRegex = /(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;

        this.initializePopup();
        this.bindEvents();
    }

    initializePopup() {
        // Create popup DOM once and reuse it
        this.popup = document.createElement('div');
        this.popup.className = 'fixed inset-0 bg-neutral-950/80 flex items-center justify-center p-4 z-50 transition-all duration-150 ease-out opacity-0 pointer-events-none';

        this.popup.innerHTML = `
            <div class="content relative bg-black rounded-lg w-full max-w-4xl transition-all duration-150 ease-out opacity-0 transform scale-95">
                <button class="close-btn absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 z-10">×</button>
                <div class="relative w-full bg-black rounded-lg overflow-hidden" style="padding-bottom: 56.25%;">
                    <iframe title="youtube" class="video absolute inset-0 w-full h-full" allowfullscreen></iframe>
                </div>
            </div>
        `;

        // Cache DOM elements
        this.content = this.popup.querySelector('.content');
        this.video = this.popup.querySelector('.video');
        this.closeBtn = this.popup.querySelector('.close-btn');

        // Add to DOM but keep hidden
        document.body.appendChild(this.popup);

        // Bind close events once
        this.closeBtn.addEventListener('click', () => this.close());
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) this.close();
        });
    }

    bindEvents() {
        // Use event delegation for better performance
        document.addEventListener('click', (e) => {
            if (!this.isOpen && e.target.closest('.popup-youtube')) {
                e.preventDefault();
                const link = e.target.closest('.popup-youtube');
                const videoId = this.videoIdRegex.exec(link.href)?.[1];
                if (videoId) this.open(videoId);
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
    }

    open(videoId) {
        if (this.isOpen) return;
        this.isOpen = true;

        // Use requestAnimationFrame for better performance instead of setTimeout
        requestAnimationFrame(() => {
            // Set video source
            this.video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

            // Show popup
            this.popup.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden';

            // Animate in with requestAnimationFrame for smooth animation
            requestAnimationFrame(() => {
                this.popup.style.opacity = '1';
                this.popup.style.zIndex = '99999';
                this.content.style.opacity = '1';
                this.content.style.transform = 'scale(1)';
            });
        });
    }

    close() {
        if (!this.isOpen) return;
        this.isOpen = false;

        // Animate out
        this.popup.style.opacity = '0';
        this.content.style.opacity = '0';
        
        this.content.style.transform = 'scale(0.95)';

        // Use single timeout for cleanup
        setTimeout(() => {
            this.popup.style.pointerEvents = 'none';
            this.video.src = ''; // Clear video source to stop playback
            document.body.style.overflow = '';
        }, 150);
    }
}

new YouTubePopup();


// Social Share Mode Switcher - Optimized Vanilla JS
function initSocialShareModeSwitch() {
    const modeBtn = document.querySelector('.mode-btn');
    const socialShareBlock = document.querySelector('.social-share-block');

    if (!modeBtn || !socialShareBlock) return;

    // Cache button elements
    const lightBtn = modeBtn.querySelector('.light');
    const darkBtn = modeBtn.querySelector('.dark');

    // Define class arrays for better performance and readability
    const lightModeClasses = [
        '[&_.single-option]:bg-white',
        '[&_.single-option_.light-img]:block',
        '[&_.single-option_.dark-img]:hidden',
        '[&_.single-option_h2]:text-neutral-800'
    ];

    const darkModeClasses = [
        '[&_.single-option]:bg-neutral-800',
        '[&_.single-option_.dark-img]:block',
        '[&_.single-option_.light-img]:hidden',
        '[&_.single-option_h2]:text-white'
    ];

    // Optimized mode switcher function
    function switchMode(isLight) {
        requestAnimationFrame(() => {
            if (isLight) {
                // Remove dark mode classes
                socialShareBlock.classList.remove(...darkModeClasses);
                // Add light mode classes
                socialShareBlock.classList.add(...lightModeClasses);
                // Update button states
                lightBtn.classList.add('active');
                darkBtn.classList.remove('active');
            } else {
                // Remove light mode classes
                socialShareBlock.classList.remove(...lightModeClasses);
                // Add dark mode classes
                socialShareBlock.classList.add(...darkModeClasses);
                // Update button states
                darkBtn.classList.add('active');
                lightBtn.classList.remove('active');
            }
        });
    }

    // Event delegation
    modeBtn.addEventListener('click', (e) => {
        const target = e.target.closest('.light, .dark');
        if (!target) return;

        switchMode(target.classList.contains('light'));
    });
}

initSocialShareModeSwitch();

