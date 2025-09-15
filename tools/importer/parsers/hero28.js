/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Find the background image (second row)
  let imageEl = null;
  for (const child of gridChildren) {
    const imgWrap = child.querySelector('.ix-parallax-scale-out-hero');
    if (imgWrap) {
      imageEl = imgWrap.querySelector('img');
      break;
    }
  }

  // Find the content container (third row)
  let contentCell = null;
  for (const child of gridChildren) {
    const container = child.querySelector('.container');
    if (container) {
      // Collect all content inside the container
      const cellDiv = document.createElement('div');
      Array.from(container.childNodes).forEach(node => {
        cellDiv.appendChild(node.cloneNode(true));
      });
      if (cellDiv.childNodes.length > 0) {
        contentCell = cellDiv;
      }
      break;
    }
  }

  // Compose the table rows (header, image, and content only if content exists)
  const headerRow = ['Hero (hero28)'];
  const imageRow = [imageEl ? imageEl : ''];
  const cells = [headerRow, imageRow];
  if (contentCell) {
    cells.push([contentCell]);
  }

  // If contentCell is empty, ensure the third row is omitted
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
