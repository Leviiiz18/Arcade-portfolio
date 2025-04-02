document.addEventListener("DOMContentLoaded", function () {
    // Start Button to Enter Portfolio
    document.getElementById("start-btn").addEventListener("click", function () {
        document.getElementById("hero").style.display = "none"; // Hide hero section
        document.getElementById("main-content").classList.remove("hidden"); // Show main content
        showSection('about'); // Default: Show "About Me"
    });

    // Navbar Buttons Event Listeners
    document.getElementById("about-btn").addEventListener("click", function () {
        showSection("about");
    });

    document.getElementById("projects-btn").addEventListener("click", function () {
        showSection("projects");
    });

    document.getElementById("skills-btn").addEventListener("click", function () {
        showSection("skills");
    });

    document.getElementById("contact-btn").addEventListener("click", function () {
        showSection("contact");
    });
});

// Function to Show Only One Section at a Time
function showSection(sectionId) {
    let sections = document.querySelectorAll(".section");
    sections.forEach(section => {
        section.style.display = "none"; // Hide all sections
    });

    document.getElementById(sectionId).style.display = "block"; // Show the selected section
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" }); // Scroll to section
}

// Background Music Toggle
const music = document.getElementById("arcade-music");
const muteBtn = document.getElementById("mute-btn");

muteBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        muteBtn.textContent = "🔊 Mute";
    } else {
        music.pause();
        muteBtn.textContent = "🔇 Unmute";
    }
});

// Retro Sound Effect for Hover on Score Cards
document.querySelectorAll(".score-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        new Audio('img\\power-up-type-1-230548.mp3').play();
    });
});


function showSection(sectionId) {
    let sections = document.querySelectorAll(".section");
    sections.forEach(section => {
        section.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";

    // If "About Me" is selected, show the game button and hide after 5s
    if (sectionId === "about") {
        let gameStart = document.getElementById("game-start");
        gameStart.style.display = "block";

        // Hide button after 5 seconds
        setTimeout(() => {
            gameStart.style.display = "none";
        }, 5000);
    }
}