// Products in Cart
loadProducts();

// Plugins

// AOS initialize
AOS.init();

// OwlCarousel
$('.owl-carousel').owlCarousel({
    center: true,
    items: 3,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 1500,
    responsive:{
        0:{ items:1 },
        577:{ items:2 },
        768:{ items:3 }
    }
});