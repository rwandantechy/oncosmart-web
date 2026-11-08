const BULLET = /^\s*[-*•]\s+/;
const NUMBERED = /^\s*\d+[.)]\s+/;

function isBullet(line) {
  return BULLET.test(line);
}

function isNumbered(line) {
  return NUMBERED.test(line);
}

function itemText(line) {
  return line.replace(BULLET, "").replace(NUMBERED, "").trim();
}

/**
 * Turns an assistant answer string into paragraphs and lists so counts and
 * notices can display the way they were written, without a markdown library.
 */
export function blocksFromAnswer(text) {
  const blocks = [];
  let list = null;
  let paragraph = [];

  function flushParagraph() {
    const value = paragraph.join(" ").trim();
    paragraph = [];
    if (value) blocks.push({ type: "p", text: value });
  }

  function flushList() {
    if (!list) return;
    blocks.push(list);
    list = null;
  }

  for (const raw of String(text || "").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }
    if (isBullet(line) || isNumbered(line)) {
      flushParagraph();
      const ordered = isNumbered(line);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { type: "list", ordered, items: [] };
      }
      list.items.push(itemText(line));
      continue;
    }
    flushList();
    paragraph.push(line);
  }
  flushParagraph();
  flushList();
  return blocks;
}
