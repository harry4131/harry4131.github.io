const dropArea = document.getElementById("dropArea");
const input = document.getElementById("pdfInput");
const downloadBtn = document.getElementById("downloadBtn");

let files = [];
let finalBlob = null;

dropArea.onclick = () => input.click();

input.onchange = () => {
  files = [...input.files];
  dropArea.innerHTML = `✅ ${files.length} PDFs selected`;
};

dropArea.ondragover = e => {
  e.preventDefault();
  dropArea.classList.add("drag");
};

dropArea.ondragleave = () => dropArea.classList.remove("drag");

dropArea.ondrop = e => {
  e.preventDefault();
  dropArea.classList.remove("drag");
  files = [...e.dataTransfer.files];
  dropArea.innerHTML = `✅ ${files.length} PDFs selected`;
};

async function mergePDF() {
  if (files.length < 2) {
    alert("Select at least 2 PDFs");
    return;
  }

  const mergedPdf = await PDFLib.PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFLib.PDFDocument.load(bytes);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(p => mergedPdf.addPage(p));
  }

  finalBlob = new Blob([await mergedPdf.save()], {
    type: "application/pdf"
  });

  downloadBtn.disabled = false;
  downloadBtn.classList.add("ready");
}

downloadBtn.onclick = () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(finalBlob);
  a.download = "merged.pdf";
  a.click();
};
