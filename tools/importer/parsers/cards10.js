/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check if element exists
  if (!element) return;

  // Table header as required
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a> element)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Defensive: check card structure
    // First child: image wrapper div containing <img>
    // Second child: content wrapper div
    const imageWrapper = card.children[0];
    const contentWrapper = card.children[1];

    let imageEl = null;
    if (imageWrapper) {
      imageEl = imageWrapper.querySelector('img');
    }

    // Compose the text cell: tag, heading, paragraph (all present in contentWrapper)
    // We'll preserve the tag, heading, and paragraph structure
    // Defensive: check if contentWrapper exists
    let textCellContent = [];
    if (contentWrapper) {
      // Tag (optional)
      const tagGroup = contentWrapper.querySelector('.tag-group');
      if (tagGroup) textCellContent.push(tagGroup);
      // Heading (h3)
      const heading = contentWrapper.querySelector('h3');
      if (heading) textCellContent.push(heading);
      // Paragraph
      const paragraph = contentWrapper.querySelector('p');
      if (paragraph) textCellContent.push(paragraph);
    }

    // Add the row: [image, text cell]
    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
