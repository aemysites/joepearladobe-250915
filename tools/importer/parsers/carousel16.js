/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child divs of the grid (each is a slide)
  const slideDivs = Array.from(grid.children);

  // Table header row
  const headerRow = ['Carousel (carousel16)'];
  const rows = [headerRow];

  // For each slide, extract the image and create a row with two columns (second is always present, empty if no text)
  slideDivs.forEach((slideDiv) => {
    const img = slideDiv.querySelector('img');
    if (!img) return; // skip if no image
    // Always two columns: [image, empty string]
    rows.push([img, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
