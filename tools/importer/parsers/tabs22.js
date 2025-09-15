/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children
  const getChildren = (el, selector) => Array.from(el.querySelectorAll(selector));

  // Header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // Find tab menu and tab content containers
  const tabMenu = getChildren(element, ':scope > div')[0];
  const tabContent = getChildren(element, ':scope > div')[1];

  // Get tab labels
  const tabLinks = getChildren(tabMenu, ':scope > a');
  // Get tab panes (contents)
  const tabPanes = getChildren(tabContent, ':scope > div');

  // Defensive: Only process matching pairs
  const numTabs = Math.min(tabLinks.length, tabPanes.length);
  for (let i = 0; i < numTabs; i++) {
    // Tab label: Use the text content of the tab link's child div
    let labelDiv = tabLinks[i].querySelector('div');
    let tabLabel = labelDiv ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();

    // Tab content: Use the entire tab pane's content
    // Defensive: If tabPane has a single child (the grid), use that
    let tabPane = tabPanes[i];
    let paneContent = tabPane.children.length === 1 ? tabPane.firstElementChild : tabPane;
    // Place both heading and image in the cell
    rows.push([
      tabLabel,
      paneContent
    ]);
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
