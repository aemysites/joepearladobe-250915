/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Header row: must match block name exactly
  const headerRow = ['Columns block (columns31)'];

  // Second row: each cell is the actual DOM node from the column
  const contentRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
