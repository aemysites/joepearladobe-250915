/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all direct child <a> elements (each is a card)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((cardLink) => {
    // Each card's inner grid
    const grid = cardLink.querySelector(':scope > div');
    if (!grid) return;

    // Image (first child of grid)
    const img = grid.querySelector(':scope > img');

    // Text content (second child of grid)
    // This div contains all text, tags, heading, description, CTA
    const textDiv = grid.querySelector(':scope > div');

    // Defensive: Only add row if image and textDiv exist
    if (img && textDiv) {
      rows.push([img, textDiv]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
