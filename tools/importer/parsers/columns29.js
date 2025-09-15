/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element || !document) return;

  // Header row as per block requirements
  const headerRow = ['Columns (columns29)'];

  // Get immediate children (should be the column wrappers)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: fallback if not found
  if (!columns.length) return;

  // For each column, extract the main content (usually a single child)
  const contentRow = columns.map(col => {
    // If the column has only one child (e.g., a wrapper for the image), use it
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Otherwise, use the column itself
    return col;
  });

  // Build the table rows
  const rows = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
