document.addEventListener("DOMContentLoaded", function () {
    // Handle active navigation link
    let currentLocation = window.location.href;
    let navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add("active");
        }
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Show or hide the page loader
    let spinner = document.getElementById("spinner");
    if (spinner) {
        document.onreadystatechange = function () {
            if (document.readyState !== "complete") {
                spinner.style.display = "block";
                document.body.style.opacity = "0.5";
            } else {
                spinner.style.display = "none";
                document.body.style.opacity = "1";
            }
        };
    }

    // "Read More" toggle functionality
    document.querySelectorAll(".read-more").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            let parent = this.closest("div");
            let extraContent = parent.querySelector("p");

            if (extraContent.style.display === "none" || !extraContent.style.display) {
                extraContent.style.display = "block";
                this.textContent = "Read Less";
            } else {
                extraContent.style.display = "none";
                this.textContent = "Read More";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const welcomeText = document.querySelector(".welcome-text");
    const paragraphs = document.querySelectorAll(".welcome-text p");
    
    let currentTextIndex = 0;

    // Observer to trigger the animation
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    welcomeText.classList.add("visible"); // Apply the fade-in effect
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    observer.observe(welcomeText);

    // Function to reveal text one by one as user scrolls
    function revealNextText() {
        if (currentTextIndex < paragraphs.length) {
            paragraphs[currentTextIndex].classList.add("show");
            currentTextIndex++;
        }
    }

    // Scroll event listener to reveal text progressively
    window.addEventListener("scroll", () => {
        let scrollPosition = window.scrollY + window.innerHeight;
        let textPosition = welcomeText.offsetTop + welcomeText.clientHeight / 3;

        if (scrollPosition > textPosition) {
            revealNextText();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textParts = document.querySelectorAll(".text-part");

    function revealTextOnScroll() {
        const scrollPosition = window.scrollY + window.innerHeight * 0.7;

        textParts.forEach((part, index) => {
            if (part.getBoundingClientRect().top + window.scrollY < scrollPosition) {
                setTimeout(() => {
                    part.classList.add("visible");
                }, index * 500); // Delays each part appearing
            }
        });
    }

    window.addEventListener("scroll", revealTextOnScroll);
    revealTextOnScroll(); // Run on page load in case it's already in view
});
