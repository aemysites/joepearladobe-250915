/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only operate on <section>
  if (!element || !element.querySelector) return;

  // Header row: must match block name exactly
  const headerRow = ['Columns block (columns11)'];

  // Top grid: left (headline), right (intro, author, button)
  const topGrid = element.querySelector('.container > .w-layout-grid');
  let leftCol, rightCol;
  if (topGrid) {
    leftCol = topGrid.children[0];
    rightCol = topGrid.children[1];
  }

  // Bottom grid: two images
  const bottomGrid = element.querySelector('.w-layout-grid.grid-gap-md');
  let imgCol1, imgCol2;
  if (bottomGrid) {
    imgCol1 = bottomGrid.children[0];
    imgCol2 = bottomGrid.children[1];
  }

  // Compose second row: 2 columns, referencing existing elements
  const leftCellContent = [];
  if (leftCol) leftCellContent.push(leftCol);
  if (imgCol1) leftCellContent.push(imgCol1);

  const rightCellContent = [];
  if (rightCol) rightCellContent.push(rightCol);
  if (imgCol2) rightCellContent.push(imgCol2);

  // Table rows: header and content
  const rows = [
    headerRow,
    [leftCellContent, rightCellContent],
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
