/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (holds columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image only if present
  const imgCol = columns[0];
  const img = imgCol.querySelector('img');
  // Only push the image element if it exists
  const cells = [];
  if (img) cells.push(img.cloneNode(true));

  // Second column: all content (clone to avoid moving from DOM)
  const contentCol = columns[1];
  if (contentCol && contentCol.textContent.trim()) {
    // Remove the image if present in contentCol to avoid duplication
    const contentClone = contentCol.cloneNode(true);
    const imgsInContent = contentClone.querySelectorAll('img');
    imgsInContent.forEach(i => i.remove());
    cells.push(contentClone);
  }
  if (cells.length < 2) return;

  // Table header
  const headerRow = ['Columns block (columns32)'];
  // Table row: image and content, no empty columns
  const row = cells;

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the original element (section) with the table
  element.replaceWith(table);
}
