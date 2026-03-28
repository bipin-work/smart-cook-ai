import { scrapeBlogText } from "./scrapeBlog";
import { isYoutubeUrl } from "./url";
import { getYoutubeTranscript } from "./youtube";

export async function extractRawContent(input: string) {
  if (isYoutubeUrl(input)) {
    return await getYoutubeTranscript(input);
  }
  return await scrapeBlogText(input);
}
