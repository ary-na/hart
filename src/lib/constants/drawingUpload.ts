export const SUPPORTED_DRAWING_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const DRAWING_FILE_ACCEPT = ".jpg,.jpeg,.png,.webp,.gif";

export const DRAWING_IMAGE_TYPE_MESSAGE =
  "Only JPG, PNG, GIF, and WebP images are supported. HEIC/HEIF files are not supported on this server yet.";

export const isSupportedDrawingImageType = (type?: string | null) =>
  Boolean(type && SUPPORTED_DRAWING_IMAGE_TYPES.includes(type as (typeof SUPPORTED_DRAWING_IMAGE_TYPES)[number]));
