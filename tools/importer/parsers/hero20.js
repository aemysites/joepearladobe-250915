/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract all images from the hero collage grid
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  let images = [];
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }
  // Defensive fallback: If not found, try all images in hero
  if (images.length === 0) {
    images = Array.from(element.querySelectorAll('img'));
  }
  // Compose a div to hold all images (background collage)
  const collageDiv = document.createElement('div');
  collageDiv.className = 'hero-background-collage';
  images.forEach(img => collageDiv.appendChild(img));

  // 2. Extract the content container (headline, subheading, CTAs)
  let contentContainer = element.querySelector('.container.small-container');
  if (!contentContainer) {
    // Fallback: Try to find h1 inside the element
    const h1 = element.querySelector('h1');
    if (h1) {
      contentContainer = h1.parentElement;
    }
  }

  // 3. Compose the table rows
  const headerRow = ['Hero (hero20)'];
  const backgroundRow = [collageDiv];
  const contentRow = [contentContainer];

  const cells = [headerRow, backgroundRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
