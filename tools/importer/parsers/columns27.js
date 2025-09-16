/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Expecting at least 2 columns

  // Table header as specified
  const headerRow = ['Columns block (columns27)'];

  // Second row: each cell is a column's content (reference the actual DOM nodes)
  const contentRow = columns;

  // Compose table data
  const tableData = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
