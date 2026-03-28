import { extractRawContent } from "@/lib/extractContent";
import { runExtraction } from "../lib/extractor";
const Test = async () => {
  const textDesc = "a simple coffee";

  const blogPost = "https://joyfoodsunshine.com/omelette-recipe/";
  const youtubePost = "https://www.youtube.com/watch?v=3q-0dPDkbZU";
  const rawContent = await extractRawContent(youtubePost);
  const test = await runExtraction(textDesc);

  console.log("test::", test);
  return <>Test</>;
};

export default Test;
