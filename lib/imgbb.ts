export type ImgbbUploadResponse = {
  data?: {
    display_url: string;
    url: string;
    image?: { url: string };
  };
  success: boolean;
  status: number;
};

const DEFAULT_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY || "ae21ac039240a7d40788bcda9a822d8e";

export async function uploadToImgbb(file: File, key: string = DEFAULT_KEY): Promise<string> {
  if (!key) throw new Error("Thiếu API key imgbb");

  // Convert file to base64
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(",")[1] || result; // strip data URI prefix
      resolve(base64Data);
    };
    reader.onerror = () => reject(new Error("Không đọc được file"));
    reader.readAsDataURL(file);
  });

  const form = new FormData();
  form.append("image", base64);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: form,
  });

  const json = (await res.json()) as ImgbbUploadResponse;
  if (!json.success) {
    throw new Error(`Upload imgbb thất bại (status ${json.status})`);
  }

  // Prefer display_url
  const url = json.data?.display_url || json.data?.url || json.data?.image?.url;
  if (!url) throw new Error("Upload thành công nhưng không có URL ảnh");
  return url;
}

