# 📚 Math Base v2.0

A personal olympiad mathematics problem library application for saving, searching, and organizing math competition problems with their solutions.

## ✨ Version 2.0 Features

### 📝 Core Features:
- 📝 **Save Problems & Solutions** - Store olympiad math problems with detailed descriptions and solutions
- 🔍 **Full-Text Search** - Search problems by title, description, or solution content
- 🏷️ **Tag Management** - Create custom tags with colors to organize problems by topic, difficulty, or any category
- 🎯 **Tag Filtering** - Filter problems by one or multiple tags simultaneously
- ✏️ **Edit Problems** - Modify existing problems and their metadata
- 🗑️ **Delete Problems** - Remove problems you no longer need
- 📊 **Difficulty Levels** - Mark problems as easy, medium, or hard
- 💾 **Local Storage** - All data is stored locally in your browser using IndexedDB

### 🆕 New in v2.0:
- 📐 **LaTeX Support** - Full mathematical notation support using KaTeX
  - Inline: `$x^2 + y^2 = z^2$`
  - Display: `$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$`
- 📄 **Markdown Support** - Rich text formatting
  - Headers, bold, italic, lists, code blocks
  - Tables, blockquotes, links, and more
  - GitHub Flavored Markdown (GFM) support
- 🖼️ **Image Support** - Upload and embed images in problems
  - Add images to problem descriptions
  - Add images to solutions
  - Base64 encoding for offline storage
  - Image gallery with hover preview
- 👁️ **Live Preview** - See formatted content while editing
  - Toggle between edit and preview modes
  - Real-time markdown and LaTeX rendering

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **State Management:** Zustand
- **Database:** Dexie (IndexedDB wrapper)
- **Markdown:** react-markdown with GFM support
- **Math Rendering:** KaTeX for LaTeX
- **Styling:** CSS Modules

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/evgeniy-morgunov/math-base.git
cd math-base

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## Usage Guide

### 1. Create Tags
- Click the **"🏷️ Manage Tags"** button in the header
- Enter a tag name and select a color
- Click **"+ Add Tag"** or press Enter
- Tags help organize problems by category (e.g., "Geometry", "Algebra", "Number Theory")

### 2. Add a Problem

#### Basic Information:
- Click the **"+ Add Problem"** button
- Fill in title
- Select difficulty level and tags

#### Description & Solution (with formatting):
Supports Markdown + LaTeX:

**Markdown Examples:**
```markdown
# Heading
## Subheading
- List item
1. Numbered item
**Bold** and *italic*
[Link](https://example.com)
```

**LaTeX Examples:**
```
Inline: $x^2 + y^2 = z^2$
Display: $$\int_0^\infty e^{-x^2} dx$$
Fractions: $\frac{a}{b}$
Matrices: $\begin{matrix}a & b \\ c & d\end{matrix}$
```

#### Adding Images:
- Upload images to description or solution sections
- Click file input to select multiple images
- Images are stored locally in your browser
- Hover over images to see delete button
- Images display inline in the formatted content

#### Live Preview:
- Use the **Edit/Preview** tabs to switch between editing and viewing
- See real-time rendering of Markdown and LaTeX
- Check how images will appear

### 3. Search Problems
- Use the **search box** to find problems by keywords
- The search looks through titles, descriptions, and solutions
- Select **tag filters** to narrow results
- Use **"Clear All Filters"** to reset

### 4. View Problem Details
- Click **"▶ View Details"** on any problem card to expand it
- See the full formatted description and solution
- View all embedded images
- View creation and update dates

### 5. Edit or Delete
- Use the **✏️ Edit** button to modify a problem
- Use the **🗑️ Delete** button to remove a problem (with confirmation)

## Markdown & LaTeX Syntax Guide

### Markdown Features:
```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
***Bold and italic***

- Unordered list
  - Nested item
1. Ordered list
2. Second item

> Blockquote
> Multiple lines

`inline code`

\`\`\`
code block
multiple lines
\`\`\`

[Link text](https://example.com)
![Alt text](image.jpg)

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### LaTeX / Math Notation:

**Inline Math:**
- `$x + y = z$` → renders as inline formula

**Display Math:**
- `$$\frac{a}{b}$$` → renders as centered formula

**Common Math Commands:**
```latex
$\alpha, \beta, \gamma, \delta$ - Greek letters
$x^2, x_1$ - Superscript and subscript
$\sqrt[3]{x}$ - Roots
$\frac{a}{b}$ - Fractions
$\int, \sum, \prod$ - Calculus symbols
$\sin, \cos, \tan$ - Trigonometric
$\approx, \leq, \geq, \neq$ - Comparisons
```

**Complex Expressions:**
```latex
$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

$$f(x) = \begin{cases}
x^2 & \text{if } x > 0 \\
0 & \text{if } x = 0 \\
-x^2 & \text{if } x < 0
\end{cases}$$

$$\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}$$
```

## Project Structure

```
math-base/
├── src/
│   ├── components/          # React components
│   │   ├── ProblemForm.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ProblemList.tsx
│   │   └── TagManager.tsx
│   ├── db.ts                # Database functions (Dexie)
│   ├── store.ts             # Zustand store
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── App.module.css       # App styles
│   ├── index.css            # Global styles
│   └── main.tsx             # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Data Storage

All data is stored in your browser's **IndexedDB** database. This means:
- 📱 Works offline
- 🔒 Your data is private and never sent to servers
- 💾 Data persists between sessions
- 🗑️ Clearing browser data will delete your problems
- 🖼️ Images are stored as Base64 within IndexedDB

## Features in Detail

### Full-Text Search
The search functionality includes:
- Case-insensitive matching
- Searches across titles, descriptions, and solutions
- Can be combined with tag filters
- Real-time results as you type

### Tag System
- Create unlimited custom tags
- Assign colors to tags for visual organization
- Assign multiple tags to a single problem
- Filter by one or multiple tags
- Delete tags (automatically removed from all problems)

### Problem Organization
- Sort by date (newest first)
- View difficulty at a glance
- Collapse/expand for clean interface
- Edit or delete with confirmation

### Rich Content Support
- **Markdown rendering** with GitHub Flavored Markdown
- **LaTeX rendering** with KaTeX
- **Image embedding** with gallery view
- **Live preview** while editing
- **Syntax highlighting** for code blocks

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser supporting:
  - ES2020
  - IndexedDB
  - CSS Grid/Flexbox
  - File API for image upload

## Tips & Tricks

💡 **Best Practices:**
- Use descriptive problem titles for better search results
- Create specific tags for different math areas (Geometry, Algebra, Combinatorics, etc.)
- Use LaTeX for mathematical formulas to make them render beautifully
- Add images of hand-written solutions or diagrams
- Use Markdown formatting to make solutions easy to read
- Combine multiple tags for more precise filtering

📐 **LaTeX Tips:**
- Use `\text{...}` for regular text within formulas
- Use `\displaystyle` for better rendering of fractions
- Wrap multi-line equations with `\begin{align*}...\end{align*}`
- Common symbols: Greek letters, calculus, logic, geometry

📸 **Image Tips:**
- Keep images under 5MB for best performance
- Use PNG or JPG format
- Add images of diagrams, drawings, or graphs
- Name your images descriptively
- Images are stored locally - no cloud dependency

## Version History

### v2.0.0 (Current)
- ✨ LaTeX/Math support with KaTeX
- ✨ Markdown formatting with GFM
- ✨ Image upload and storage
- ✨ Live preview mode
- 📈 Enhanced problem editor
- 🎨 Improved UI/UX

### v1.0.0
- Initial release with basic CRUD operations
- Tag management
- Full-text search
- Difficulty levels

## Future Enhancements

Potential features for future versions:
- [ ] Export problems to PDF with formatting
- [ ] Import problems from CSV
- [ ] Cloud sync across devices
- [ ] Problem statistics and analytics
- [ ] Favorites/bookmarks
- [ ] Problem sets/collections
- [ ] Dark/Light theme toggle
- [ ] Problem duplication
- [ ] Collaborative editing
- [ ] Problem source citations

## Contributing

Feel free to fork, modify, and improve this application!

## License

This project is open source and available for personal use.

## Support

For issues or suggestions, please create an issue in the repository.

---

**Happy learning! Keep solving those problems! 🚀📐**

**v2.0.0** - Now with LaTeX, Markdown, and Images! ✨
