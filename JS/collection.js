loadProducts().then(() => {
    renderProducts();
});
checkButtons();

// Plugins

// Initialize Swiper
let swiper = new Swiper('.swiper', {
    // basic
    speed: 600,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 10,
    // coverflow 3D effect
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 30,
        stretch: 10,
        depth: -100,
        modifier: 1,
        slideShadows: true,
    },
    // controls
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    // accessibility + mousewheel/keyboard
    keyboard: { enabled: true, onlyInViewport: true },
    mousewheel: { forceToAxis: true, invert: false },
    // responsive
    breakpoints: {
        320: { spaceBetween: 18 },
        900: { spaceBetween: 40 }
    }
});