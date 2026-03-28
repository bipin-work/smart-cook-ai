import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeBlogText(url: string) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  $("script, style, noscript").remove();

  return $("body").text().replace(/\s+/g, " ").trim();
}
