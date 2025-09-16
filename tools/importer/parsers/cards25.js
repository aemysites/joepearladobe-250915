/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card element
  function extractCard(cardEl) {
    // Find the first img (mandatory)
    const img = cardEl.querySelector('img');
    // Find the text content (h3 and p)
    let textContent = [];
    // Try to find h3 and p inside nested divs
    const h3 = cardEl.querySelector('h3');
    const p = cardEl.querySelector('p');
    if (h3) textContent.push(h3);
    if (p) textContent.push(p);
    // If neither h3 nor p, leave empty
    if (textContent.length === 0) {
      // fallback: try to get all text nodes except from img
      const divs = cardEl.querySelectorAll('div');
      divs.forEach(div => {
        if (div.textContent.trim()) {
          textContent.push(document.createTextNode(div.textContent.trim()));
        }
      });
    }
    // If still empty, just add an empty string
    if (textContent.length === 0) textContent.push('');
    return [img, textContent.length === 1 ? textContent[0] : textContent];
  }

  // Get all direct children (cards)
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Only keep divs that have an image (card blocks)
  const cardRows = cards
    .map(cardEl => {
      const img = cardEl.querySelector('img');
      if (!img) return null;
      return extractCard(cardEl);
    })
    .filter(Boolean);

  // Header row as per instructions
  const headerRow = ['Cards (cards25)'];
  const tableRows = [headerRow, ...cardRows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
