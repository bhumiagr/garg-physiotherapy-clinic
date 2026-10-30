// ==========================================
// GARG PHYSIOTHERAPY CLINIC — FIXED JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Sticky Navbar
    const navbar = document.querySelector(".navbar") || document.querySelector("nav");

    function updateNavbar() {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 60);
    }

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });


    // Scroll Reveal Animation
    const hiddenElements = document.querySelectorAll(".hidden, .reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("show", "active");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });

        hiddenElements.forEach(el => revealObserver.observe(el));
    } else {
        hiddenElements.forEach(el => el.classList.add("show", "active"));
    }


    // Gallery Slider
    const images = [
        "images/gallery1.jpg",
        "images/gallery2.jpg",
        "images/gallery3.jpg",
        "images/gallery4.jpg"
    ];

    const slider = document.getElementById("slider-image");
    let imageIndex = 0;

    function showImage(index) {
        if (!slider) return;
        imageIndex = index % images.length;
        slider.src = images[imageIndex];
        slider.alt = "Garg Physiotherapy Clinic gallery image " + (imageIndex + 1);
    }

    if (slider) {
        showImage(0);

        if (images.length > 1) {
            setInterval(() => {
                showImage((imageIndex + 1) % images.length);
            }, 3000);
        }
    }


    // Animated Counters
    const counters = document.querySelectorAll(".counter[data-target]");
    const aboutSection = document.querySelector(".about") ||
                         document.getElementById("about");
    let countersStarted = false;

    function startCounters() {
        if (countersStarted || !counters.length) return;
        countersStarted = true;

        counters.forEach(counter => {
            const target = Number(counter.dataset.target);
            if (!Number.isFinite(target) || target < 0) return;

            const duration = 1400;
            const startTime = performance.now();

            function updateCounter(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                counter.textContent = Math.floor(target * progress);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else if (target === 1000) {
                    counter.textContent = "1000+";
                } else if (target === 98) {
                    counter.textContent = "98%";
                } else {
                    counter.textContent = target + "+";
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    if (aboutSection && "IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        counterObserver.observe(aboutSection);
    } else {
        startCounters();
    }


    // Hamburger / Mobile Menu
    const menuToggle = document.getElementById("menu-toggle") ||
                       document.getElementById("menuToggle");

    const navLinks = document.getElementById("nav-links") ||
                     document.getElementById("navLinks");

    function closeMobileMenu() {
        if (navLinks) navLinks.classList.remove("active");

        if (menuToggle) {
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");

            if (menuToggle.dataset.iconMode === "text") {
                menuToggle.textContent = "☰";
            }
        }
    }

    if (menuToggle && navLinks) {
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));

            const icon = menuToggle.textContent.trim();

            if (icon === "☰" || icon === "✖" ||
                menuToggle.dataset.iconMode === "text") {
                menuToggle.dataset.iconMode = "text";
                menuToggle.textContent = isOpen ? "✖" : "☰";
            }
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("keydown", e => {
            if (e.key === "Escape") closeMobileMenu();
        });
    }


    // Loading Screen
    const loader = document.getElementById("loader");

    function hideLoader() {
        if (!loader) return;
        loader.classList.add("loader-hide", "loader-hidden");
    }

    if (loader) {
        if (document.readyState === "complete") {
            setTimeout(hideLoader, 500);
        } else {
            window.addEventListener("load", () => {
                setTimeout(hideLoader, 500);
            }, { once: true });
        }
    }


    // Scroll Progress Bar
    const progressBar = document.getElementById("progress-bar");

    function updateProgress() {
        if (!progressBar) return;

        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = height > 0 ? (window.scrollY / height) * 100 : 0;

        progressBar.style.width =
            Math.max(0, Math.min(100, progress)) + "%";
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);


    // Gallery Lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.getElementById("close-lightbox");

    function openLightbox() {
        if (!slider || !lightbox || !lightboxImg) return;

        lightboxImg.src = slider.src;
        lightboxImg.alt = slider.alt || "Clinic gallery image";
        lightbox.style.display = "flex";
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
    }

    function hideLightbox() {
        if (!lightbox) return;

        lightbox.style.display = "none";
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
    }

    if (slider && lightbox && lightboxImg && closeLightbox) {
        slider.addEventListener("click", openLightbox);
        slider.style.cursor = "zoom-in";

        closeLightbox.addEventListener("click", hideLightbox);

        lightbox.addEventListener("click", e => {
            if (e.target === lightbox) hideLightbox();
        });

        document.addEventListener("keydown", e => {
            if (e.key === "Escape") hideLightbox();
        });
    }


    // Active Navbar Link on Scroll
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll("#nav-links a, #navLinks a");

    function updateActiveLink() {
        if (!sections.length || !navItems.length) return;

        let current = "";
        const position = window.scrollY + 140;

        sections.forEach(section => {
            if (position >= section.offsetTop) {
                current = section.id;
            }
        });

        navItems.forEach(link => {
            const active = link.getAttribute("href") === "#" + current;

            link.classList.toggle("active", active);

            if (active) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });


    // WhatsApp Appointment
    const whatsappBtn = document.getElementById("whatsapp-book");

    if (whatsappBtn) {
        whatsappBtn.addEventListener("click", e => {
            e.preventDefault();

            const nameField = document.querySelector(
                'input[name="Name"], input[name="name"]'
            );

            const phoneField = document.querySelector(
                'input[name="Phone"], input[name="phone"]'
            );

            const problemField = document.querySelector(
                'textarea[name="Message"], textarea[name="message"]'
            );

            const name = nameField ? nameField.value.trim() : "";
            const phone = phoneField ? phoneField.value.trim() : "";
            const problem = problemField ? problemField.value.trim() : "";

            if (!name || !phone) {
                alert("Please enter your name and phone number first.");

                if (!name && nameField) nameField.focus();
                else if (phoneField) phoneField.focus();

                return;
            }

            // Replace this example with the clinic's real WhatsApp number.
            const clinicWhatsAppNumber = "919876543210";

            const message =
                "Hello Garg Physiotherapy Clinic,\n\n" +
                "Name: " + name + "\n" +
                "Phone: " + phone + "\n" +
                "Problem: " + (problem || "Not specified") + "\n\n" +
                "I would like to book an appointment.";

            const url = "https://wa.me/" + clinicWhatsAppNumber +
                        "?text=" + encodeURIComponent(message);

            window.open(url, "_blank", "noopener,noreferrer");
        });
    }


    // FAQ Accordion
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            const faqItem = button.parentElement;
            if (!faqItem) return;

            const isOpen = faqItem.classList.toggle("active");
            button.setAttribute("aria-expanded", String(isOpen));
        });
    });

});