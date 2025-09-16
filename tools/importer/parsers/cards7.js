/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct header row
  const headerRow = ['Cards (cards7)'];

  // Get all immediate card containers (each card is a div.utility-aspect-1x1)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div.utility-aspect-1x1'));

  // For each card, extract the image (first child) and OMIT the second column entirely, since there is no text content
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img ? img : '']; // Only image column, no empty or unnecessary columns
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
