// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Menu filter
const tabs = document.querySelectorAll(".tab");
const tickets = document.querySelectorAll(".ticket");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    const filter = tab.dataset.filter;
    tickets.forEach((t) => {
      const show = filter === "all" || t.dataset.cat === filter;
      t.hidden = !show;
      t.classList.remove("in");
      if (show) {
        void t.offsetWidth; // restart animation
        t.classList.add("in");
      }
    });
  });
});

// Opening hours: highlight today and show open/closed status.
// Edit these to match your real schedule (24h format, day 0 = Sunday).
const HOURS = {
  0: [8, 20],
  1: [7, 21], 2: [7, 21], 3: [7, 21], 4: [7, 21], 5: [7, 21],
  6: [8, 23],
};
const now = new Date();
const day = now.getDay();
document.querySelectorAll(".hours tr").forEach((row) => {
  if (row.dataset.days.split(",").includes(String(day))) row.classList.add("today");
});
const status = document.getElementById("openStatus");
const [openH, closeH] = HOURS[day];
const hour = now.getHours() + now.getMinutes() / 60;
if (hour >= openH && hour < closeH) {
  status.textContent = "Garage door is up. We're open.";
  status.classList.add("open");
} else {
  status.textContent = "Garage door is down. Back soon.";
}

// Booking form (front-end only: connect to your email service or backend)
const form = document.getElementById("bookForm");
const msg = document.getElementById("formMsg");
form.date.min = new Date().toISOString().split("T")[0];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("input").forEach((input) => {
    const valid = input.checkValidity() && input.value.trim() !== "";
    input.classList.toggle("invalid", !valid);
    if (!valid) ok = false;
  });
  if (!ok) {
    msg.textContent = "Please fill in every field with a valid entry.";
    return;
  }
  msg.textContent = `Request sent. We'll email ${form.email.value} to confirm your bay.`;
  form.reset();
  form.size.value = 4;
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
