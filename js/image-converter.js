function convert(type) {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Select image");

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    canvas.getContext("2d").drawImage(img, 0, 0);

    canvas.toBlob(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "converted." + type;
      a.click();
    }, "image/" + type);
  };
}
