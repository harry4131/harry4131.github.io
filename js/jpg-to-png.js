const dropZone = document.getElementById("dropZone");
const input = document.getElementById("fileInput");
const previewImg = document.getElementById("previewImg");
const convertBtn = document.getElementById("convertBtn");
const downloadBtn = document.getElementById("downloadBtn");
const progress = document.getElementById("progress");

let selectedFile = null;

/* CLICK UPLOAD */
dropZone.addEventListener("click", () => input.click());

/* FILE SELECT */
input.addEventListener("change", () => {
  if (input.files.length > 0) {
    handleFile(input.files[0]);
  }
});

/* DRAG EVENTS */
dropZone.addEventListener("dragover", e => {
  e.preventDefault();
  dropZone.classList.add("drag");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("drag");
});

dropZone.addEventListener("drop", e => {
  e.preventDefault();
  dropZone.classList.remove("drag");

  const file = e.dataTransfer.files[0];
  handleFile(file);
});

/* HANDLE FILE */
function handleFile(file) {
  if (!file || !file.type.includes("jpeg")) {
    alert("Please upload JPG image only");
    return;
  }

  selectedFile = file;

  previewImg.src = URL.createObjectURL(file);
  previewImg.style.display = "block";

  convertBtn.disabled = false;
}

/* CONVERT */
convertBtn.addEventListener("click", () => {

  progress.style.width = "0%";

  const img = new Image();
  img.src = URL.createObjectURL(selectedFile);

  img.onload = () => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    progress.style.width = "70%";

    canvas.toBlob(blob => {

      progress.style.width = "100%";

      downloadBtn.href = URL.createObjectURL(blob);
      downloadBtn.download = "converted.png";
      downloadBtn.style.display = "inline-block";

    }, "image/png");
  };
});
