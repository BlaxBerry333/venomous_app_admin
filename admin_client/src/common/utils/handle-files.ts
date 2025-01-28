/**
 * 通过创建临时的 a 标签实现下载文件
 */
export function downloadFile(params: { blob?: Blob; url?: string; fileName: string }): void {
  const { blob, fileName, url } = params;
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
