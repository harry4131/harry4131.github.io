const work = document.getElementById("pdfWork");

function showMerge() {
  work.innerHTML = `
    <h3>Merge PDFs</h3>
    <input type="file" id="pdfFiles" multiple accept="application/pdf">
    <br><br>
    <button onclick="mergePDF()">Merge PDF</button>
  `;
}

function showSplit() {
  work.innerHTML = `
    <h3>Split PDF</h3>
    <input type="file" id="pdfFile" accept="application/pdf">
    <br><br>
    <button onclick="splitPDF()">Split PDF</button>
  `;
}

function showImageToPDF() {
  work.innerHTML = `
    <h3>Image to PDF</h3>
    <input type="file" id="imgFiles" multiple accept="image/*">
    <br><br>
    <button onclick="imageToPDF()">Convert</button>
  `;
}

async function mergePDF() {
  const files = document.getElementById("pdfFiles").files;
  if (files.length < 2) return alert("Select at least 2 PDFs");

  const mergedPdf = await PDFLib.PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFLib.PDFDocument.load(bytes);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(p => mergedPdf.addPage(p));
  }

  downloadPDF(await mergedPdf.save(), "merged.pdf");
}

async function imageToPDF() {
  const files = document.getElementById("imgFiles").files;
  if (!files.length) return alert("Select images");

  const pdf = await PDFLib.PDFDocument.create();

  for (const img of files) {
    const bytes = await img.arrayBuffer();
    const image = img.type.includes("png")
      ? await pdf.embedPng(bytes)
      : await pdf.embedJpg(bytes);

    const page = pdf.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height
    });
  }

  downloadPDF(await pdf.save(), "images.pdf");
}

function splitPDF() {
  alert("PDF split coming next version.");
}

function downloadPDF(bytes, name) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}
