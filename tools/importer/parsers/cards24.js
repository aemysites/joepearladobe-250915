/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected structure
  if (!element || !document) return;

  // Table header row
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Get all card links (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach(card => {
    // Get image (first child div contains img)
    const imageDiv = card.querySelector(':scope > div');
    let img = null;
    if (imageDiv) {
      img = imageDiv.querySelector('img');
    }

    // Get text content
    // Tag and date (second child div)
    const metaDiv = card.querySelector(':scope > div:nth-of-type(2)');
    let metaContent = [];
    if (metaDiv) {
      // Get all children (tag and date)
      metaContent = Array.from(metaDiv.children);
    }

    // Heading (h3)
    const heading = card.querySelector('h3');

    // Compose text cell: tag/date above, heading below
    const textCell = document.createElement('div');
    if (metaContent.length) {
      const metaWrap = document.createElement('div');
      metaContent.forEach(el => metaWrap.appendChild(el.cloneNode(true)));
      textCell.appendChild(metaWrap);
    }
    if (heading) {
      textCell.appendChild(heading.cloneNode(true));
    }

    // Row: [image, text]
    rows.push([
      img || '',
      textCell
    ]);
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
