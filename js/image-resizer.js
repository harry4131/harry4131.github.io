const input = document.getElementById("fileInput");
const btn = document.getElementById("resizeBtn");

btn.onclick = () => {
  const file = input.files[0];
  if (!file) return alert("Select image");

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width.value;
    canvas.height = height.value;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "resized-image.jpg";
      a.click();
    });
  };
};
