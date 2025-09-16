/* global WebImporter */
export default function parse(element, { document }) {
  function extractCardContent(card) {
    // Find image (if present)
    const img = card.querySelector('img');
    // Find all heading and description elements inside the card
    const textContent = document.createElement('div');
    // Get all elements that could be part of the text cell
    // This includes h3, .h4-heading, .paragraph-sm (in order)
    const heading = card.querySelector('h3, .h4-heading');
    const descs = card.querySelectorAll('.paragraph-sm');
    if (heading) textContent.appendChild(heading.cloneNode(true));
    descs.forEach(desc => {
      textContent.appendChild(desc.cloneNode(true));
    });
    // Only add row if image is present
    if (img) {
      return [img.cloneNode(true), textContent.childNodes.length ? textContent : ''];
    } else {
      // Skip cards without images (do not create empty cell)
      return null;
    }
  }

  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll(':scope > a'));
    const rows = cards.map(extractCardContent).filter(Boolean);
    if (rows.length) {
      const cells = [['Cards (cards23)'], ...rows];
      const block = WebImporter.DOMUtils.createTable(cells, document);
      grid.replaceWith(block);
    }
  });
}
