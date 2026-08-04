// Smooth Scroll for Navbar Links

document.querySelectorAll('nav a').forEach(anchor => {

    anchor.addEventListener('click', function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if(target){

            target.scrollIntoView({
                behavior:'smooth'
            });

        }

    });

});


// Sticky Navbar

window.addEventListener("scroll", function () {

    const navbar = document.querySelector("nav");

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

// Scroll Reveal Animation

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

hiddenElements.forEach((el) => observer.observe(el));
// Gallery Slider

const images=[

"images/gallery1.jpg",
    "images/gallery2.jpg",
    "images/gallery3.jpg",
    "images/gallery4.jpg"

];

let index=0;

const slider=document.getElementById("slider-image");

setInterval(()=>{

index++;

if(index>=images.length){

index=0;

}

slider.src=images[index];

},3000);
// ===============================
// Animated Counter
// ===============================

const counters = document.querySelectorAll(".counter");

const startCounter = () => {
    counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");
        let count = 0;

        const speed = target / 100;

        const updateCounter = () => {

            if (count < target) {

                count += speed;

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(updateCounter);

            } else {

                if (target === 1000) {
                    counter.innerText = "1000+";
                }
                else if (target === 98) {
                    counter.innerText = "98%";
                }
                else {
                    counter.innerText = target + "+";
                }

            }

        };

        updateCounter();

    });
};

const aboutSection = document.querySelector(".about");

const observerCounter = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            startCounter();

            observerCounter.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.5
});

observerCounter.observe(aboutSection);
// ===============================
// Hamburger Menu
// ===============================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    if(navLinks.classList.contains("active")){
        menuToggle.innerHTML = "✖";
    }else{
        menuToggle.innerHTML = "☰";
    }

});

// Close menu after clicking a link

document.querySelectorAll("#nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuToggle.innerHTML = "☰";

    });

});
