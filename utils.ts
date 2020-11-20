/**
 * 公用函数库
 */

/**
 * 获取URl的html内容
 * @param url 
 */
const fetchHtml = async (url: string): Promise<string> => {
  return await (await fetch(url)).text();
};

/**
 * 根据文件src下载文件内容到path
 * @param src 
 * @param path 
 */
const downloadFile = async (src: string, path: string) => {
  try {
    const res = await fetch(src);
    Deno.writeFileSync(
      path,
      new Uint8Array(await res.arrayBuffer()),
    );
  } catch (error) {
    throw ("File download error, " + error);
  }
};

/**
 * TODO: 格式化时间
 */
const formatDate = (d: Date, format = "YYYY-MM-DD"): string => {
  const year = d.getFullYear();
  const month = d.getMonth();
  const date = d.getDate();

  return year + "-" + month + "-" + date;
};

export { downloadFile, fetchHtml, formatDate };
