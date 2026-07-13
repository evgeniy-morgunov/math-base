# 📚 Math Base

A personal olympiad mathematics problem library application for saving, searching, and organizing math competition problems with their solutions.

## Features

✨ **Core Features:**
- 📝 **Save Problems & Solutions** - Store olympiad math problems with detailed descriptions and solutions
- 🔍 **Full-Text Search** - Search problems by title, description, or solution content
- 🏷️ **Tag Management** - Create custom tags with colors to organize problems by topic, difficulty, or any category
- 🎯 **Tag Filtering** - Filter problems by one or multiple tags simultaneously
- ✏️ **Edit Problems** - Modify existing problems and their metadata
- 🗑️ **Delete Problems** - Remove problems you no longer need
- 📊 **Difficulty Levels** - Mark problems as easy, medium, or hard
- 💾 **Local Storage** - All data is stored locally in your browser using IndexedDB

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **State Management:** Zustand
- **Database:** Dexie (IndexedDB wrapper)
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
- Click the **"+ Add Problem"** button
- Fill in:
  - **Title** - Problem name
  - **Description** - Problem statement
  - **Solution** - Complete solution
  - **Difficulty** - Select easy/medium/hard
  - **Tags** - Select relevant tags
- Click **"Create Problem"**

### 3. Search Problems
- Use the **search box** to find problems by keywords
- The search looks through titles, descriptions, and solutions
- Select **tag filters** to narrow results
- Use **"Clear All Filters"** to reset

### 4. View Problem Details
- Click **"▶ View Details"** on any problem card to expand it
- See the full description and solution
- View creation and update dates

### 5. Edit or Delete
- Use the **✏️ Edit** button to modify a problem
- Use the **🗑️ Delete** button to remove a problem (with confirmation)

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

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser supporting:
  - ES2020
  - IndexedDB
  - CSS Grid/Flexbox

## Tips & Tricks

💡 **Best Practices:**
- Use descriptive problem titles for better search results
- Create specific tags for different math areas (Geometry, Algebra, Combinatorics, etc.)
- Include detailed steps in solutions for future reference
- Use difficulty levels to track problem progression
- Combine multiple tags for more precise filtering

## Future Enhancements

Potential features for future versions:
- [ ] Export problems to PDF
- [ ] Import problems from CSV
- [ ] Sync across devices
- [ ] Problem statistics and analytics
- [ ] Favorites/bookmarks
- [ ] Problem sets/collections
- [ ] LaTeX equation support
- [ ] Dark/Light theme toggle

## Contributing

Feel free to fork, modify, and improve this application!

## License

This project is open source and available for personal use.

## Support

For issues or suggestions, please create an issue in the repository.

---

**Happy learning! Keep solving those problems! 🚀📐**
