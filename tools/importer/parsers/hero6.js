/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row: Must match block name exactly
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row: reference the <img> element directly if present
  let bgImg = '';
  const imgEl = element.querySelector('img[src]');
  if (imgEl) {
    bgImg = imgEl;
  }

  // 3. Content row: reference the card block containing heading, subheading, CTAs
  let contentBlock = '';
  const cardEl = element.querySelector('.card');
  if (cardEl) {
    contentBlock = cardEl;
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [bgImg],
    [contentBlock],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
