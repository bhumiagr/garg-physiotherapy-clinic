// Smooth Scroll for Navbar Links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e) {

        const target = document.querySelector(this.getAttribute('href'));

        if(target){

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
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
// ===============================
// Loading Screen
// ===============================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("loader-hide");

    }, 2000);

});
// ===============================
// Scroll Progress Bar
// ===============================

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    document.getElementById("progress-bar").style.width = progress + "%";



});
// ===============================
// Gallery Lightbox
// ===============================

const sliderImage = document.getElementById("slider-image");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.getElementById("close-lightbox");

if (sliderImage && lightbox && lightboxImg && closeLightbox) {

    sliderImage.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = sliderImage.src;
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

}

// Close Button
closeLightbox.addEventListener("click", () => {

    lightbox.style.display = "none";

});

// Close when clicking outside image
lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }

});
// ===============================
// Active Navbar Link on Scroll
// ===============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("#nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});
// WhatsApp Appointment
// ===============================

const whatsappBtn = document.getElementById("whatsapp-book");

if (whatsappBtn) {

    whatsappBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const name = document.querySelector('input[name="Name"]').value;
        const phone = document.querySelector('input[name="Phone"]').value;
        const problem = document.querySelector('textarea[name="Message"]').value;

        const message =
`Hello Garg Physiotherapy Clinic,

Name: ${name}
Phone: ${phone}
Problem: ${problem}

I would like to book an appointment.`;

        const url =
`https://wa.me/919876543210?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

    });

}