import { extractRawContent } from "@/lib/extractContent";
import { runExtraction } from "../lib/extractor";
const Test = async () => {
  const textDesc =
    "I want to make some quick pancakes. Grab 2 cups of flour, 2 eggs, and a splash of milk. Just whisk it all together in a bowl and fry them on a pan until golden. Takes about 15 mins total.";

  const blogPost = "https://joyfoodsunshine.com/omelette-recipe/";
  const youtubePost = "https://www.youtube.com/watch?v=ixpYIgHlU60";
  const rawContent = await extractRawContent(youtubePost);
  const test = await runExtraction(rawContent);

  console.log("test::", test);
  return <>Test</>;
};

export default Test;
