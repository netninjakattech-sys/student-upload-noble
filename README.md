# Student Upload

A simple student management app built with plain HTML, CSS, and JavaScript. It lets you add students, validate their information, view them in a register grid, and remove the most recent entry.

## Features
- Add a student with name, matric number, level, and department
- Inline form validation with clear error messages
- Duplicate matric check
- Student card grid with gold header strip
- Last-added card highlight
- Toggle to display all names as chips
- Remove last student button
- Add 3 sample students
- Responsive layout for desktop and mobile
- Light and dark mode support using prefers-color-scheme

## How to run
Open `index.html` in a browser.

## File structure
- `index.html` — page layout
- `style.css` — app styling and theme
- `script.js` — validation and student logic
- `README.md` — project notes

## Matric number rule
Matric number must match this format:

`23/024145123`

Pattern:
`^\d{2}\/\d{9}$`

This means:
- 2 digits
- a slash `/`
- 9 digits

## Theme note
The app uses a maroon and gold palette with light and dark mode adjustments. Colors are stored as CSS variables and remain readable on all backgrounds.

## Design notes
- Fonts:
  - Young Serif for headings and names
  - Karla for body text
  - Source Code Pro for matric numbers and counts
- Layout:
  - Maroon control panel on the left
  - Register panel on the right
  - Grid cards with `repeat(auto-fill, minmax(240px, 1fr))`
  - Stack into one column below 800px
