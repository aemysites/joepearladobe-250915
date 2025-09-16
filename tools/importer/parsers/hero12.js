/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row
  const headerRow = ['Hero (hero12)'];

  // Find the two main grid columns
  const grid = element.querySelector('.w-layout-grid');
  const gridDivs = grid ? grid.querySelectorAll(':scope > div') : [];

  // Row 2: Background image (first grid cell, first img)
  let bgImgCell = '';
  if (gridDivs.length > 0) {
    const bgImg = gridDivs[0].querySelector('img');
    if (bgImg) bgImgCell = bgImg;
  }

  // Row 3: Content (second grid cell)
  let contentCell = '';
  if (gridDivs.length > 1) {
    // Find the card body
    const cardBody = gridDivs[1].querySelector('.card-body');
    if (cardBody) {
      // The card body contains a grid: first child is the square image, second is the text/button block
      const cardGrid = cardBody.querySelector('.w-layout-grid');
      if (cardGrid) {
        // We'll combine the inner grid's children into a single cell, preserving order and structure
        // This will include the square image and the text/button column
        const fragment = document.createDocumentFragment();
        Array.from(cardGrid.children).forEach(child => {
          // Only append if not empty
          if (child.tagName === 'IMG' || (child.textContent && child.textContent.trim().length > 0) || child.querySelector('*')) {
            fragment.appendChild(child.cloneNode(true));
          }
        });
        contentCell = fragment;
      } else {
        // fallback: use the card body itself
        contentCell = cardBody.cloneNode(true);
      }
    } else {
      // fallback: use the gridDiv
      contentCell = gridDivs[1].cloneNode(true);
    }
  }

  const tableRows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
