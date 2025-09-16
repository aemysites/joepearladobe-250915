/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the card body inside the element
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image (mandatory, first column)
  const img = cardBody.querySelector('img');

  // Find the heading (optional, second column)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose the text cell (second column)
  let textCell = null;
  if (heading) {
    // Use heading as a heading element (h4)
    const h4 = document.createElement('h4');
    h4.textContent = heading.textContent;
    textCell = h4;
  }

  // Table header row
  const headerRow = ['Carousel (carousel21)'];

  // Table slide row: [image, text content]
  const slideRow = [img, textCell ? textCell : ''];

  // Build the table
  const cells = [headerRow, slideRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
