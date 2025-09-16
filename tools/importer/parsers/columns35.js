/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Table header as required by block spec
  const headerRow = ['Columns block (columns35)'];

  // Each cell is the DOM node(s) for that column
  const contentRow = columns.map((col) => {
    // If the column is an <a> or <div> with children, preserve its structure
    if (col.children.length === 1) {
      return col.firstElementChild;
    } else if (col.children.length > 1) {
      // If multiple children, return an array of elements
      return Array.from(col.children);
    } else {
      // If no children, return the column itself (e.g., for plain text)
      return col;
    }
  });

  // Build the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original section with the table
  element.replaceWith(table);
}
