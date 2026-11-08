/**
 * Small, pure text helpers for copy held in `content/`.
 *
 * A caller passes the text it already holds, so nothing here decides what a
 * page says. The sentence marks cover English and Urdu punctuation.
 */

const SENTENCE = /^[^.!?۔]*[.!?۔]/;

/**
 * The first sentence of a paragraph, with English and Urdu full stops both
 * recognised. Used where a page shows one line of a longer lede.
 */
export function firstSentence(text: string): string {
  const trimmed = text.trim();
  const match = SENTENCE.exec(trimmed);
  return match ? match[0].trim() : trimmed;
}
