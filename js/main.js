/* ================= LOADER ================= */
window.onload = () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
};

/* ================= HAMBURGER ================= */

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

/* ================= STICKY + REVEAL ================= */

let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const current = window.pageYOffset;

  if (current > lastScroll && current > 120) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }

  if (current > 80) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  lastScroll = current;
});

/* ================= TOOL SEARCH ================= */

function searchTools() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".tool-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(input) ? "block" : "none";
  });
}
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

function searchTools() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".tool-card");

  cards.forEach(card => {
    card.style.display =
      card.innerText.toLowerCase().includes(input)
        ? "block"
        : "none";
  });
}
document.addEventListener("DOMContentLoaded", function () {

  const voiceBtn = document.getElementById("voiceBtn");
  const searchInput = document.getElementById("searchInput");

  if (!voiceBtn || !searchInput) return;

  if ("webkitSpeechRecognition" in window) {

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceBtn.addEventListener("click", function () {
      recognition.start();
    });

    recognition.onresult = function (event) {
      const text = event.results[0][0].transcript;
      searchInput.value = text;

      if (typeof searchTools === "function") {
        searchTools();
      }
    };

  } else {
    voiceBtn.style.display = "none";
  }

});
function searchTools() {

  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();

  const cards = document.querySelectorAll(".tool-card");
  const status = document.getElementById("searchStatus");

  let found = 0;

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();

    if (text.includes(filter)) {
      card.style.display = "flex";
      found++;
    } else {
      card.style.display = "none";
    }
  });

  if (filter.trim() === "") {
    status.style.display = "none";
    cards.forEach(card => card.style.display = "flex");
    return;
  }

  status.style.display = "block";

  if (found === 0) {
    status.textContent = "No results found";
  } else if (found === 1) {
    status.textContent = "1 result found";
  } else {
    status.textContent = found + " results found";
  }
}
document.addEventListener("DOMContentLoaded", () => {

  const micBtn = document.getElementById("voiceBtn");
  const input = document.getElementById("searchInput");

  const popup = document.getElementById("listeningPopup");
  const mobileUI = document.getElementById("mobileVoiceUI");
  const cancelBtn = document.getElementById("cancelVoice");
  const statusText = document.getElementById("voiceStatus");

  if (!micBtn || !input) return;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    micBtn.style.display = "none";
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  function isMobile() {
    return window.innerWidth < 768;
  }

  micBtn.addEventListener("click", () => {

    if (isMobile()) {
      mobileUI.style.display = "flex";
      statusText.textContent = "Listening…";
    } else {
      popup.style.display = "flex";
    }

    recognition.start();
  });

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    input.value = text;

    if (typeof searchTools === "function") {
      searchTools();
    }
  };

  recognition.onerror = () => {
    popup.style.display = "none";
    mobileUI.style.display = "none";
  };

  recognition.onend = () => {
    popup.style.display = "none";
    mobileUI.style.display = "none";
  };

  cancelBtn.addEventListener("click", () => {
    recognition.stop();
    popup.style.display = "none";
    mobileUI.style.display = "none";
  });

});
