/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // --- LEFT COLUMN ---
  // The first child is the large left column block (anchor)
  const leftCol = grid.children[0];

  // --- RIGHT COLUMN ---
  // The next two children are vertical flex containers
  // 1. Top right: contains two image cards (anchors)
  // 2. Bottom right: contains a vertical list of text cards (anchors with dividers)
  const rightTop = grid.children[1];
  const rightBottom = grid.children[2];

  // Compose left column cell
  // Use the entire anchor block for left column
  const leftCell = leftCol;

  // Compose right column cell
  // We'll combine the two flex containers into a single cell
  // Defensive: create a fragment to hold both blocks
  const rightCellFragment = document.createDocumentFragment();
  if (rightTop) rightCellFragment.appendChild(rightTop);
  if (rightBottom) rightCellFragment.appendChild(rightBottom);

  // Table header
  const headerRow = ['Columns block (columns2)'];
  // Table content row: two columns
  const contentRow = [leftCell, rightCellFragment];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
