/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns[0];
  // Second column: text content
  const contentCol = columns[1];

  // Table header must match the block name exactly
  const headerRow = ['Columns block (columns1)'];
  const contentRow = [imageCol, contentCol];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
