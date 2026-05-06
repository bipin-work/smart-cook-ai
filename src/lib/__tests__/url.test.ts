import { isYoutubeUrl } from "../url";

// `describe` groups related tests under one heading in the output.
// You can nest describes if a function has multiple behaviors worth grouping.
describe("isYoutubeUrl", () => {
  // The convention is to write `it("does X")` so the full sentence reads
  // "isYoutubeUrl does X". Some teams prefer `test()` — same thing, alias.
  it("returns true for a standard youtube.com URL", () => {
    expect(isYoutubeUrl("https://www.youtube.com/watch?v=abc123")).toBe(true);
  });

  it("returns true even without protocol", () => {
    // Useful: when you scope your assertions, you also surface bugs.
    // This test would catch a future "rewrite using new URL()" refactor that
    // breaks bare hostnames.
    expect(isYoutubeUrl("youtube.com/shorts/xyz")).toBe(true);
  });

  it("returns false for a non-youtube URL", () => {
    expect(isYoutubeUrl("https://vimeo.com/12345")).toBe(false);
  });

  it("returns false for an empty string", () => {
    // Edge case worth pinning down — current impl handles this, but if
    // someone "improves" the function with `url.startsWith(...)` they
    // might forget empty-string handling.
    expect(isYoutubeUrl("")).toBe(false);
  });

  // KNOWN GAP — interview talking point:
  // The current implementation is a naive substring check. It would return
  // `true` for "https://malicious.com?fake=youtube.com" — a real-world
  // hardening would parse with `new URL()` and check the hostname against
  // a whitelist. A test for that bug would look like:
  //
  //   it.skip("rejects URLs that merely contain 'youtube.com' as a substring", () => {
  //     expect(isYoutubeUrl("https://evil.com?ref=youtube.com")).toBe(false);
  //   });
  //
  // I'd leave this skipped or as a TODO comment so reviewers see the
  // gap without breaking CI.
});
