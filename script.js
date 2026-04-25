const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), index * 80);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => observer.observe(item));

const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      counter.textContent = current;
    }, 35);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) startCounters();
  });
});

const stats = document.querySelector(".mini-stats");
if (stats) statsObserver.observe(stats);

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const magneticItems = document.querySelectorAll(".magnetic");

magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
  });
});

const openButtons = document.querySelectorAll(".open-project");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.modal);
    modal.classList.add("active");
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".modal").classList.remove("active");
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("active");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modals.forEach((modal) => modal.classList.remove("active"));
  }
});
