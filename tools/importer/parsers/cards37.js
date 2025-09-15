/* global WebImporter */
export default function parse(element, { document }) {
  // Find the top-level grid containing all cards
  const gridContainers = element.querySelectorAll('.w-layout-grid.grid-layout');
  let cards = [];

  // Helper to extract card content
  function extractCard(cardEl) {
    // Find image container (may be nested)
    let imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let imgEl = imgContainer ? imgContainer.querySelector('img') : null;
    // Defensive: fallback if image not found
    if (!imgEl) {
      imgEl = cardEl.querySelector('img');
    }

    // Find heading (h3)
    let heading = cardEl.querySelector('h3');
    // Find description (p)
    let desc = cardEl.querySelector('p');
    // Find CTA (button or .button)
    let cta = cardEl.querySelector('.button, button, a.button');

    // Compose text cell
    let textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);

    // Defensive: always return array for text cell
    return [imgEl, textCell];
  }

  // The first grid contains the first card and a nested grid with the rest
  if (gridContainers.length > 0) {
    // First card is direct child (A tag)
    const firstCard = gridContainers[0].querySelector('.utility-link-content-block');
    if (firstCard) {
      cards.push(extractCard(firstCard));
    }
    // Nested grid contains remaining cards
    const nestedGrid = gridContainers[0].querySelector('.w-layout-grid.grid-layout');
    if (nestedGrid) {
      const nestedCards = nestedGrid.querySelectorAll('.utility-link-content-block');
      nestedCards.forEach(cardEl => {
        cards.push(extractCard(cardEl));
      });
    }
  }

  // Table header
  const headerRow = ['Cards (cards37)'];
  const cells = [headerRow, ...cards];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
