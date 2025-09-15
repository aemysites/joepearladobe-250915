/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: left content, right image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: headline, subheading, buttons
  const leftCol = gridChildren[0];
  // Right column: image
  const rightCol = gridChildren[1];

  // --- Compose left column cell ---
  // Collect ALL content from leftCol (not just h1, p, button-group)
  const leftCellContent = Array.from(leftCol.childNodes).filter(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.trim().length > 0;
    }
    return true;
  });

  // --- Compose right column cell ---
  // Collect all images from rightCol
  const rightImages = Array.from(rightCol.querySelectorAll('img'));
  // Only add right column if there is content
  const contentRow = rightImages.length > 0 ? [leftCellContent, rightImages] : [leftCellContent];

  // --- Build table rows ---
  const headerRow = ['Columns block (columns15)'];
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
