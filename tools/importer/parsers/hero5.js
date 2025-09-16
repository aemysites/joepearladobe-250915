/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (!grid) return;

  // Find the image (background image for the hero)
  const img = grid.querySelector('img');

  // Find the content block (should contain heading, paragraph, buttons)
  // It's the first .section inside the nested grid
  let contentBlock = null;
  const nestedGrids = grid.querySelectorAll(':scope > .w-layout-grid');
  for (const g of nestedGrids) {
    const section = g.querySelector(':scope > .section');
    if (section) {
      contentBlock = section;
      break;
    }
  }

  // Prepare the table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [img ? img : ''];
  const contentRow = [contentBlock ? contentBlock : ''];

  const cells = [headerRow, imageRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
