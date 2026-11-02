// ===== Change this to your name =====
const MY_NAME = "Mohammed Aarish";

// Roles shown in the typing animation
const ROLES = ["Web Developer", "Frontend Developer", "Python Developer", "Problem Solver"];

// Put the name everywhere it appears
document.querySelectorAll(".my-name").forEach(el => (el.textContent = MY_NAME));
document.title = MY_NAME + " | Portfolio";
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// Typing animation
const typed = document.getElementById("typed");
let roleIndex = 0, charIndex = 0, deleting = false;
function type() {
    const word = ROLES[roleIndex];
    typed.textContent = word.slice(0, charIndex);
    if (!deleting && charIndex < word.length) charIndex++;
    else if (deleting && charIndex > 0) charIndex--;
    else if (!deleting) { deleting = true; setTimeout(type, 1500); return; }
    else { deleting = false; roleIndex = (roleIndex + 1) % ROLES.length; }
    setTimeout(type, deleting ? 50 : 100);
}
type();

// Reveal sections and fill skill bars when they scroll into view
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        entry.target.querySelectorAll(".fill").forEach(f => (f.style.width = f.dataset.level + "%"));
        observer.unobserve(entry.target);
    });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Contact form: opens WhatsApp with the message filled in
document.getElementById("contact-form").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("c-name").value.trim();
    const email = document.getElementById("c-email").value.trim();
    const message = document.getElementById("c-message").value.trim();
    const text = `Hi, I'm ${name} (${email}). ${message}`;
    window.open("https://wa.me/919121991853?text=" + encodeURIComponent(text), "_blank");
    document.getElementById("form-status").textContent = "Thanks, " + name + "! Opening WhatsApp to send your message.";
    e.target.reset();
});
