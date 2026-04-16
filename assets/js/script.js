const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = document.querySelectorAll('.nav-links a');
const year = document.getElementById('year');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

if (year) {
  year.textContent = new Date().getFullYear();
}
