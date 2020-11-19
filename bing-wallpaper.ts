/**
 * 爬取必应搜索每日壁纸
 * 步骤：
 * 1. fetch(https://cn.bing.com/)
 * 2. 解析出<div id="bgImgProgLoad" style=" background-image: url(/th?id=xxx.jpg);">
 * 3. 拼接出 https://cn.bing.com/th?id=xxxx.jpg，download it
 * 4. done
 */

// TODO: code clean
const BING_SEARCH_URL = "https://cn.bing.com";
const FILT_SAVE_PATH = "C:\\Users\\Leonardo\\Pictures\\BingWallpaper\\";

const fetchHtml = async (url: string): Promise<string> => {
  return await (await fetch(url)).text();
};

const downloadFile = (async (url: string, path: string) => {
  const res = await fetch(url);
  console.error(res.status);
  const fileStream = Deno.writeFileSync(
    path,
    new Uint8Array(await res.arrayBuffer()),
  );
});

const bingDocStr = await fetchHtml(BING_SEARCH_URL);

const IMG_SRC_REG =
  /<div id=\"bgImgProgLoad\" data-ultra-definition-src=\"\/th\?id=(.*?)&/s;

const regResult = IMG_SRC_REG.exec(bingDocStr);

if (regResult && regResult.length > 1) {
  const imgName = regResult[1];
  const imgSrc = BING_SEARCH_URL + "/th?id=" + imgName;

  const fileSavePath = FILT_SAVE_PATH + imgName;
  console.error(fileSavePath);
  downloadFile(imgSrc, fileSavePath);
}
