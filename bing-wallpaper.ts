/**
 * 爬取必应搜索每日壁纸
 * 
 * 步骤：
 * 1. fetch(https://cn.bing.com/)
 * 2. 解析出<div id="bgImgProgLoad" data-ultra-definition-src="/th?id=xxx.jpg;">
 * 3. 拼接出 https://cn.bing.com/th?id=xxxx.jpg，download it
 */
import { downloadFile, fetchHtml } from "./utils.ts";

const BING_SEARCH_URL = "https://cn.bing.com";
// File save path
const FILT_SAVE_PATH = "bing-imgs/";
// Bing图片src正则
const IMG_SRC_REG =
  /<div id=\"bgImgProgLoad\" data-ultra-definition-src=\"\/th\?id=(.*?)&/s;

const downloadBingWallpaper = async () => {
  console.log("Requesting HTML string...");
  const htmlStr = await fetchHtml(BING_SEARCH_URL);
  console.log("Requesting HTML succeed");
  const regResult = IMG_SRC_REG.exec(htmlStr);

  if (regResult && regResult.length > 1) {
    console.log("Parsing image src succeed\nTry to download image");
    const imgName: string = regResult[1];
    const imgSrc: string = BING_SEARCH_URL + "/th?id=" + imgName;
    const fileSavePath: string = FILT_SAVE_PATH + imgName;

    await downloadFile(imgSrc, fileSavePath);
    console.log("Image download succeed~");
  } else {
    throw ("Failed in Parsing image src. QAQ");
  }
};

try {
  downloadBingWallpaper();
} catch (error) {
  console.error(error);
}
