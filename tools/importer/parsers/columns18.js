/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container (the direct child of .container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Find the left content column (text)
  let leftColumn = null;
  let rightColumn = null;

  // Identify columns by their content
  columns.forEach(col => {
    if (col.querySelector('h2') && col.querySelector('h3')) {
      leftColumn = col;
    } else if (col.tagName === 'UL') {
      rightColumn = col;
    }
  });

  // Find the image (should be the only <img> child of grid)
  const image = grid.querySelector('img');

  // Compose the first row: block name
  const headerRow = ['Columns block (columns18)'];

  // Compose the second row: two columns
  const secondRow = [leftColumn, rightColumn];

  // Compose the third row: image only in the first column (remove unnecessary empty column)
  const thirdRow = [image];

  // Build the table
  const cells = [
    headerRow,
    secondRow,
    thirdRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
