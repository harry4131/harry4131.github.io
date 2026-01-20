// ===== IMAGE COMPRESSOR SCRIPT =====

const fileInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const downloadBtn = document.getElementById("downloadBtn");

let compressedBlob = null;

fileInput.addEventListener("change", async function () {
    const file = this.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
        const MAX_WIDTH = 1280;   // change if needed
        const MAX_HEIGHT = 1280;
        const QUALITY = 0.7;      // 0.1 = max compression | 1 = best quality

        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            const ratio = Math.min(
                MAX_WIDTH / width,
                MAX_HEIGHT / height
            );
            width *= ratio;
            height *= ratio;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
            (blob) => {
                compressedBlob = blob;

                const compressedURL = URL.createObjectURL(blob);
                preview.src = compressedURL;

                downloadBtn.style.display = "inline-block";
            },
            "image/jpeg",
            QUALITY
        );
    };
});

// DOWNLOAD COMPRESSED IMAGE
downloadBtn.addEventListener("click", () => {
    if (!compressedBlob) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(compressedBlob);
    link.download = "compressed-image.jpg";
    link.click();
});
