/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.classList.contains('w-layout-grid')) return;

  // Table header as per block name (must be exactly one column)
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Each direct child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Find the image in the card
    const img = cardDiv.querySelector('img');
    if (!img) return; // skip if no image
    // Try to extract any text content from the card div (if present)
    let textContent = '';
    // Check for alt text as possible description/title
    if (img.alt && img.alt.trim()) {
      textContent = img.alt.trim();
    } else {
      // fallback: get any other text content from the card div
      textContent = cardDiv.textContent.trim();
    }
    // If still empty, use a generic placeholder
    if (!textContent) textContent = 'Card';
    rows.push([img, textContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
