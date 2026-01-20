const dropArea = document.getElementById("dropArea");
const input = document.getElementById("imgInput");
const downloadBtn = document.getElementById("downloadBtn");

let images = [];
let finalBlob = null;

dropArea.onclick = () => input.click();

input.onchange = () => {
  images = [...input.files];
  dropArea.innerHTML = `✅ ${images.length} images selected`;
};

dropArea.ondragover = e => {
  e.preventDefault();
  dropArea.classList.add("drag");
};

dropArea.ondragleave = () => dropArea.classList.remove("drag");

dropArea.ondrop = e => {
  e.preventDefault();
  dropArea.classList.remove("drag");
  images = [...e.dataTransfer.files];
  dropArea.innerHTML = `✅ ${images.length} images selected`;
};

async function convert() {
  if (!images.length) return alert("Select images");

  const pdf = await PDFLib.PDFDocument.create();

  for (const img of images) {
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

  finalBlob = new Blob([await pdf.save()], {
    type: "application/pdf"
  });

  downloadBtn.disabled = false;
  downloadBtn.classList.add("ready");
}

downloadBtn.onclick = () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(finalBlob);
  a.download = "images.pdf";
  a.click();
};
