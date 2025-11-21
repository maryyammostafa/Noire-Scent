// VARIABLES
let lastScroll = 0,
    products,
    cartProducts = [],
    favProducts = [],
    nameRegex  = /^[A-Za-z\s]{3,}$/,
    emailRegex = /^\s*[A-Za-z]+[A-Za-z0-9_\-\.]*@(gmail\.com|yahoo\.org|outlook\.com)\s*$/,
    phoneRegex = /^\s*(02)?01(0|1|2|5)[0-9]{8}\s*$/;

// MAGIC MOUSE INIT
magicMouse({
	"outerWidth": 35,
	"outerHeight": 35
});

// Calls navScrolling() on scroll to hide/show navbar based on scroll direction
$(window).scroll(() => {navScrolling();});

loadLocalStorage();
isCartEmpty();
// PREVENT CLICK PROPAGATION ON POPUPS
$(".popUp .box").click((e) => {
    e.stopPropagation(); // Prevent clicks inside popup from closing it
});

// PARTICLES CONFIG
let particles = {
    fullScreen: { enable: false },
    particles: {
        number: {
            value: 60,
            density: { enable: true, area: 800 }
        },
        color: { value: ["#ffd700", "#ffcc00", "#fff8dc"] },
        shape: { type: "circle" },
        opacity: {
            value: 0.6,
            random: true,
            animation: { enable: true, speed: 0.5, minimumValue: 0.1 }
        },
        size: {
            value: 3,
            random: true,
            animation: { enable: true, speed: 2, minimumValue: 0.5 }
        },
        move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
            attract: { enable: false }
        }
    },
    interactivity: {
        events: {
            onHover: { enable: false, mode: "repulse" },
            resize: true
        },
        modes: {
            repulse: { distance: 80, duration: 0.4 }
        }
    },
    detectRetina: true
}

// Initialize particles on element with ID 'tsparticles'
tsParticles.load("tsparticles", particles);

// DOCUMENT READY
$(document).ready(function () {
    setTimeout(function () {
        $(".loading").fadeOut(1000, function () {
            $(this).addClass("d-none");
        });
    }, 2400);
});