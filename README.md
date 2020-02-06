# Data Table Component

This is taken from "[Building a Data Table Component in React – Shopify Engineering](https://engineering.shopify.com/blogs/engineering/building-data-table-component-react)".

- Start With a Basic React Data Table
- Making it Responsive: Add Max-width
- Making it Responsive and Readable: Create a Scroll Container
- Adding Context: Create a Fixed First Column
- Fixing a Bug: Adjust Cell Heights
- > We’re close now, and there’s one final bug to solve. The handleCellHeightResize() is called after the component is mounted and is never called again unless the page is refreshed. This means the height values for each cell remain the same even if the window is resized.
