export const cropText = (text: string, limit = 150) => {
  if (text.length <= limit) return text;

  text = text.trim().slice(0, limit);
  let lastSpace = text.lastIndexOf(" ");
  if (text[lastSpace - 1] === ",") {
    lastSpace -= lastSpace;
  }
  if (lastSpace > 0) {
    text = text.slice(0, lastSpace);
  }
  return text + "...";
};
