/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract title and content from each accordion item
  function extractAccordionItem(accordionEl) {
    // Defensive: find the title div
    let titleDiv = null;
    const toggleDiv = Array.from(accordionEl.children).find(child => child.classList.contains('w-dropdown-toggle'));
    if (toggleDiv) {
      // The title is the .paragraph-lg inside toggleDiv
      titleDiv = toggleDiv.querySelector('.paragraph-lg');
    }
    // Defensive: find the content
    let contentDiv = null;
    const navEl = Array.from(accordionEl.children).find(child => child.tagName === 'NAV' && child.classList.contains('accordion-content'));
    if (navEl) {
      // The actual content is inside navEl, possibly nested
      // We'll grab the entire navEl for resilience
      contentDiv = navEl;
    }
    return [titleDiv, contentDiv];
  }

  // Get all immediate accordion blocks
  const accordionItems = Array.from(element.children).filter(
    child => child.classList.contains('accordion') && child.classList.contains('w-dropdown')
  );

  // Build table rows
  const rows = [];
  // Header row (block name only)
  rows.push(['Accordion (accordion34)']);

  // Each accordion item becomes a row with 2 cells: title, content
  accordionItems.forEach(item => {
    const [title, content] = extractAccordionItem(item);
    // Only add row if both title and content exist
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
