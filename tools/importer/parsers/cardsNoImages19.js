/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cardsNoImages19)'];

  // Get all immediate children (each card)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build card rows
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Defensive: find the <p> inside each card div
    const p = cardDiv.querySelector('p');
    // If no <p>, fallback to textContent
    if (p) {
      return [p];
    } else {
      // fallback: create a paragraph with the cardDiv's text
      const fallbackP = document.createElement('p');
      fallbackP.textContent = cardDiv.textContent.trim();
      return [fallbackP];
    }
  });

  // Compose table data
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(table);
}
