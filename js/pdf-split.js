const dropArea = document.getElementById("dropArea");
const input = document.getElementById("pdfInput");
const downloadBtn = document.getElementById("downloadBtn");

let selectedFile = null;
let finalBlob = null;

/* CLICK UPLOAD */
dropArea.addEventListener("click", () => input.click());

/* FILE SELECT */
input.addEventListener("change", () => {
  selectedFile = input.files[0];
  dropArea.innerHTML = "✅ " + selectedFile.name;
});

/* DRAG EVENTS */
dropArea.addEventListener("dragover", e => {
  e.preventDefault();
  dropArea.classList.add("drag");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("drag");
});

dropArea.addEventListener("drop", e => {
  e.preventDefault();
  dropArea.classList.remove("drag");

  selectedFile = e.dataTransfer.files[0];
  dropArea.innerHTML = "✅ " + selectedFile.name;
});

/* SPLIT */
async function splitPDF() {

  if (!selectedFile) {
    alert("Upload PDF first");
    return;
  }

  const start = parseInt(document.getElementById("startPage").value);
  const end = parseInt(document.getElementById("endPage").value);

  const bytes = await selectedFile.arrayBuffer();
  const pdfDoc = await PDFLib.PDFDocument.load(bytes);

  const total = pdfDoc.getPageCount();

  if (start < 1 || end > total || start > end) {
    alert(`PDF has ${total} pages`);
    return;
  }

  const newPdf = await PDFLib.PDFDocument.create();

  const pages = await newPdf.copyPages(
    pdfDoc,
    Array.from({ length: end - start + 1 }, (_, i) => i + start - 1)
  );

  pages.forEach(p => newPdf.addPage(p));

  const pdfBytes = await newPdf.save();

  finalBlob = new Blob([pdfBytes], { type: "application/pdf" });

  downloadBtn.disabled = false;
  downloadBtn.classList.add("ready");
}

/* DOWNLOAD BUTTON */
downloadBtn.onclick = () => {
  if (!finalBlob) return;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(finalBlob);
  link.download = "split.pdf";
  link.click();
};
