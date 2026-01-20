/* ===============================
   REAL VOICE SEARCH
   =============================== */

const voiceBtn = document.getElementById("voiceBtn");
const searchInput = document.getElementById("searchInput");

if ("webkitSpeechRecognition" in window) {

  const recognition = new webkitSpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceBtn.addEventListener("click", () => {

    recognition.start();

    voiceBtn.classList.add("listening");
  });

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    searchInput.value = text;

    // auto trigger your search
    searchTools();
  };

  recognition.onend = () => {
    voiceBtn.classList.remove("listening");
  };

} else {
  voiceBtn.style.display = "none";
}
