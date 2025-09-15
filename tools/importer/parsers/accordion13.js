/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Table header row as required
  const headerRow = ['Accordion (accordion13)'];
  const rows = [headerRow];

  // Each accordion item is a .divider child
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach((divider) => {
    // Each divider contains a grid-layout with two children: title and content
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return;
    const children = grid.children;
    // Defensive: expect 2 children (title, content)
    if (children.length < 2) return;
    const title = children[0]; // usually a heading
    const content = children[1]; // usually a rich-text div
    rows.push([title, content]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
