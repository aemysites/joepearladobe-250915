/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block guidelines
  const headerRow = ['Columns block (columns38)'];

  // Get all immediate children (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the main image if present, otherwise fallback to the div
  const columns = columnDivs.map((colDiv) => {
    const img = colDiv.querySelector('img');
    if (img) {
      // Reference the actual image element from the document
      return img;
    }
    // Fallback: reference the column div itself
    return colDiv;
  });

  // Build the table rows
  const rows = [
    headerRow,
    columns,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
