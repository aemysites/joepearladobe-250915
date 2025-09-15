/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main container for columns
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid that contains the column content
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get all direct children of the main grid
  const gridChildren = Array.from(mainGrid.children);

  // Defensive: ensure expected structure
  // First two children are the left and right columns (heading, quote)
  // Third child is a grid with bottom row (author, logo)
  if (gridChildren.length < 3) return;

  // Left column: heading
  const leftCol = gridChildren[0]; // <p class="h2-heading ...">Style that speaks volumes</p>
  // Right column: quote
  const rightCol = gridChildren[1]; // <p class="paragraph-lg ...">...</p>
  // Bottom row grid (author and logo)
  const bottomGrid = gridChildren[2];
  // Get its children
  const bottomChildren = Array.from(bottomGrid.children);

  // Defensive: bottomGrid expected to have 3 children:
  // [divider, author block, logo block]
  // divider can be ignored
  // author block: flex-horizontal, contains avatar and name/title
  // logo block: contains SVG logo

  // Author block
  const authorBlock = bottomChildren.find(child => child.classList.contains('flex-horizontal'));
  // Logo block
  const logoBlock = bottomChildren.find(child => child.classList.contains('utility-display-inline-block'));

  // Compose left column: heading + author
  const leftColumnContent = [];
  if (leftCol) leftColumnContent.push(leftCol);
  if (authorBlock) leftColumnContent.push(authorBlock);

  // Compose right column: quote + logo
  const rightColumnContent = [];
  if (rightCol) rightColumnContent.push(rightCol);
  if (logoBlock) rightColumnContent.push(logoBlock);

  // Table header
  const headerRow = ['Columns block (columns26)'];
  // Table content row: two columns
  const contentRow = [leftColumnContent, rightColumnContent];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
