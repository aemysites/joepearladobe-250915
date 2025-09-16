/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header as per spec
  const headerRow = ['Columns block (columns36)'];

  // Find the main grid (should contain two columns: text and images)
  const grid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: heading, subheading, buttons
  const leftCol = columns[0];
  const leftContent = [];
  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  // Subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: images (in a nested grid)
  const rightCol = columns[1];
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }
  // Defensive: only add images that exist
  const rightContent = images.length ? images : [];

  // Table row: two columns, left and right
  const contentRow = [leftContent, rightContent];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
