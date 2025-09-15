/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row
  let bgImg = '';
  const gridDivs = element.querySelectorAll(':scope > div');
  if (gridDivs.length > 0) {
    const firstGridCell = gridDivs[0];
    const img = firstGridCell.querySelector('img');
    if (img) bgImg = img;
  }
  const imageRow = [bgImg];

  // 3. Content row (headline, paragraph, CTA)
  let cellContent = [];
  if (gridDivs.length > 1) {
    const secondGridCell = gridDivs[1];
    // Find the inner grid for content
    const innerGrid = secondGridCell.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Headline
      const h1 = innerGrid.querySelector('h1');
      if (h1) cellContent.push(h1);
      // Paragraph(s)
      innerGrid.querySelectorAll('p').forEach(p => cellContent.push(p));
      // CTA(s)
      innerGrid.querySelectorAll('.button-group a').forEach(a => cellContent.push(a));
    } else {
      // Fallback: collect all h1, p, a in secondGridCell
      secondGridCell.querySelectorAll('h1, p, a').forEach(el => cellContent.push(el));
    }
  }
  // Always add the content row, but if empty, use an empty array (not empty string)
  const contentRow = [cellContent];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
