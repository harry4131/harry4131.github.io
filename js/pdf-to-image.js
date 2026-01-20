pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const dropArea = document.getElementById("dropArea");
const input = document.getElementById("pdfInput");
const preview = document.getElementById("preview");

dropArea.onclick = () => input.click();

dropArea.ondragover = e => {
  e.preventDefault();
  dropArea.classList.add("drag");
};

dropArea.ondrop = e => {
  e.preventDefault();
  dropArea.classList.remove("drag");
  input.files = e.dataTransfer.files;
  loadPDF();
};

input.onchange = loadPDF;

async function loadPDF() {
  preview.innerHTML = "";

  const file = input.files[0];
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;

    const img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    img.style.width = "100%";
    img.style.marginBottom = "20px";

    preview.appendChild(img);
  }
}
