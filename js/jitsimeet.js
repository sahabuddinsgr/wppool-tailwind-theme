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

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
        toggle.onclick = () => {
            const content = document.getElementById(toggle.dataset.target);
            const icon = toggle.querySelector('.faq-icon');
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
            content.style.maxHeight = isOpen
                ? '0px'
                : content.querySelector('div').scrollHeight + 'px';
            icon.style.transform = `rotate(${isOpen ? 0 : 45}deg)`;
            toggle.setAttribute('aria-expanded', !isOpen);
            content.setAttribute('aria-hidden', isOpen);
        };
    });

});
