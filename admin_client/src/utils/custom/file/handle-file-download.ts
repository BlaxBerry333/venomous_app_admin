/**
 * 通过创建临时的 HTML `<a>` 标签实现下载文件
 *
 * @param params.fileName - 文件名称
 * @param params.url - 文件 URL
 * @param params.blob - 文件 Blob 对象
 */
export function downloadFileFromURLOrBlob({
  fileName,
  url,
  blob,
}: {
  fileName: string;
  url?: string;
  blob?: Blob;
}): void {
  let downloadURL = "";

  if (url) {
    downloadURL = url;
  }

  if (blob) {
    downloadURL = URL.createObjectURL(blob);
  }

  if (!downloadURL) {
    throw new Error("downloadURL is empty");
  }

  const a = document.createElement("a");
  a.href = downloadURL;
  a.download = fileName;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadURL);
}
