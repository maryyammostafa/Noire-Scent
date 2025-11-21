// Products in Cart
loadProducts();

// Change text
let texts = [
    "Every drop we create tells a story — of elegance, devotion, and the art of finding beauty in the smallest details.",
    "Our story is written not in words, but in fragrances that speak to the soul and linger long after they’re gone.",
    "From humble beginnings to timeless creations, we craft scents that whisper luxury and awaken emotion.",
    "We believe perfume is more than fragrance — it’s identity, emotion, and memory bottled together.",
    "This is not just our story, it’s the essence of who we are."
];
fadeText();
setInterval(fadeText, 5000);

// plugins

// tsParticles Properties
tsParticles.load("tsP", particles);

// AOS initialize
AOS.init();