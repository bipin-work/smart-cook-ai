import { runExtraction } from "./lib/extractor";
const Test = async () => {
  const test = await runExtraction(
    "I want to make some quick pancakes. Grab 2 cups of flour, 2 eggs, and a splash of milk. Just whisk it all together in a bowl and fry them on a pan until golden. Takes about 15 mins total."
  );

  console.log("test::", test);
  return <>Test</>;
};

export default Test;
