/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container
  if (!element || !element.children || element.children.length === 0) return;

  // Header row as required
  const headerRow = ['Columns block (columns4)'];

  // Get all immediate children (each column)
  // Each child is a div containing an img
  const columnDivs = Array.from(element.children);

  // Defensive: only proceed if there are children
  if (columnDivs.length === 0) return;

  // Second row: each cell is the content of a column (the div itself)
  // Reference the div directly (includes the image)
  const columnsRow = columnDivs.map(div => div);

  // Build the table data
  const cells = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
