import { YoutubeTranscript } from "youtube-transcript";

export async function getYoutubeTranscript(url: string) {
  const transcript = await YoutubeTranscript.fetchTranscript(url);
  return transcript.map((t) => t.text).join(" ");
}
