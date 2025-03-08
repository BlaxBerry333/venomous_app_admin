export const SUPPORTED_FILE_EXTENSIONS = [
  ".txt",
  ".html",
  ".css",
  ".js",
  ".json",
  ".pdf",
  ".xlsx",
  ".xls",
  ".csv",
  ".doc",
  ".docx",
  ".jpg",
  ".jpeg",
  ".png",
  ".svg",
  ".webp",
  ".gif",
  ".mp3",
  ".mp4",
  ".avi",
] as const;

export type SupportedFileExtensionsType = (typeof SUPPORTED_FILE_EXTENSIONS)[number];

export function getFiletypeColor(extension: SupportedFileExtensionsType) {
  switch (extension) {
    case ".jpg":
    case ".jpeg":
    case ".png":
    case ".webp":
    case ".gif":
      return "#4A90E2"; // 蓝色

    case ".svg":
      return "#F0DB4F"; // 黄色

    case ".pdf":
      return "#E94848"; // 红色

    case ".html":
      return "#E34F26"; // 橙色

    case ".css":
      return "#563d7c"; // 紫色

    case ".js":
    case ".json":
      return "#FED866"; // 黄色

    case ".xls":
    case ".xlsx":
    case ".csv":
      return "#217346"; // 绿色

    case ".doc":
    case ".docx":
      return "#2B579A"; // 蓝色

    case ".mp3":
      return "#1DB954"; // 绿色

    case ".mp4":
    case ".avi":
      return "#FF5722"; // 橙色

    case ".txt":
    default:
      return "#000000"; // 黑色
  }
}
