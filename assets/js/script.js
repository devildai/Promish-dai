const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const topbar = document.getElementById("topbar");
const year = document.getElementById("year");
const scrollProgress = document.getElementById("scrollProgress");

const revealItems = document.querySelectorAll(".reveal-item");
const counters = document.querySelectorAll(".counter");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (event) => {
    const insideNav = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!insideNav && !clickedToggle) {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

if (year) {
  year.textContent = new Date().getFullYear();
}

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }

  if (topbar) {
    if (scrollTop > 10) {
      topbar.classList.add("scrolled");
    } else {
      topbar.classList.remove("scrolled");
    }
  }
}

window.addEventListener("scroll", updateScrollUI);
window.addEventListener("load", updateScrollUI);

function animateCounter(counter) {
  const target = Number(counter.dataset.target) || 0;
  const duration = 1400;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);

    counter.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(step);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-item");

        if (entry.target.classList.contains("counter")) {
          animateCounter(entry.target);
        }

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));
  counters.forEach((counter) => observer.observe(counter));
} else {
  revealItems.forEach((item) => item.classList.add("show-item"));
  counters.forEach((counter) => {
    counter.textContent = counter.dataset.target || "0";
  });
}

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt || "Gallery image";
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  setTimeout(() => {
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }, 200);
}

lightboxTriggers.forEach((img) => {
  img.addEventListener("click", () => {
    openLightbox(img.src, img.alt);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && lightbox.classList.contains("show")) {
    closeLightbox();
  }
});
