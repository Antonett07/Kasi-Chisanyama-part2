document.getElementById("hamburger").onclick = function () {
  document.getElementById("nav-links").classList.toggle("show");
};

function updateDateTime() {
  const now = new Date();

  const date = now.toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const time = now.toLocaleTimeString("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  document.getElementById("date-time").innerHTML = `${date} | ${time}`;
}

// Run once immediately
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);
