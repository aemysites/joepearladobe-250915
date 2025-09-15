/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container (should be direct child of the given element)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (should be two: h2 and content div)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  const col1 = gridChildren[0]; // h2
  const col2 = gridChildren[1]; // content div (contains p and a)

  // Compose the table rows
  const headerRow = ['Columns block (columns14)'];
  const columnsRow = [col1, col2];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
