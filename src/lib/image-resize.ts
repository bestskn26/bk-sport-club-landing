export type ProcessedImage = {
  blob: Blob;
  previewUrl: string;
  filename: string;
};

const LOGO_HEIGHT = 56;
const FAVICON_SIZE = 32;

export async function processLogoFile(file: File): Promise<ProcessedImage> {
  if (isSvg(file)) {
    return {
      blob: file,
      previewUrl: URL.createObjectURL(file),
      filename: file.name.toLowerCase().endsWith(".svg")
        ? file.name
        : "logo.svg",
    };
  }

  const img = await loadImage(file);
  const scale = LOGO_HEIGHT / img.naturalHeight;
  const width = Math.max(1, Math.round(img.naturalWidth * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = LOGO_HEIGHT;
  const ctx = getContext(canvas);
  ctx.drawImage(img, 0, 0, width, LOGO_HEIGHT);

  const blob = await canvasToBlob(canvas);
  return {
    blob,
    previewUrl: canvas.toDataURL("image/png"),
    filename: "logo.png",
  };
}

export async function processFaviconFile(file: File): Promise<ProcessedImage> {
  const img = await loadImage(file);
  const scale = Math.min(
    FAVICON_SIZE / img.naturalWidth,
    FAVICON_SIZE / img.naturalHeight,
  );
  const width = Math.max(1, Math.round(img.naturalWidth * scale));
  const height = Math.max(1, Math.round(img.naturalHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = FAVICON_SIZE;
  canvas.height = FAVICON_SIZE;
  const ctx = getContext(canvas);
  ctx.clearRect(0, 0, FAVICON_SIZE, FAVICON_SIZE);
  ctx.drawImage(
    img,
    (FAVICON_SIZE - width) / 2,
    (FAVICON_SIZE - height) / 2,
    width,
    height,
  );

  const blob = await canvasToBlob(canvas);
  return {
    blob,
    previewUrl: canvas.toDataURL("image/png"),
    filename: "favicon.png",
  };
}

function isSvg(file: File) {
  return (
    file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")
  );
}

function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("เบราว์เซอร์นี้ไม่รองรับการปรับขนาดรูปภาพ");
  return ctx;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve(img);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(
        new Error(
          "ไม่สามารถอ่านไฟล์รูปภาพนี้ได้ อาจเป็นไฟล์ที่เสียหายหรือไม่รองรับ (ลองใช้ไฟล์ PNG หรือ JPG แทน)",
        ),
      );
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("แปลงรูปภาพไม่สำเร็จ"));
    }, "image/png");
  });
}
