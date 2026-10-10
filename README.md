# To-Do List Life Dashboard

A clean, minimalist personal life dashboard designed to help users organize their daily routine effectively. Built with semantic HTML, modern CSS, and pure Vanilla JavaScript without external frameworks or backend dependencies.

This project is built according to the **CCSE CodingCamp** curriculum and submission specifications.

---

## 📌 Project Overview

The dashboard provides four central productivity widgets:
1. **Dynamic Greeting & Digital Clock**: Displays real-time 24-hour clock (`HH:MM:SS`), date, and greeting tailored to the time of day.
2. **Focus Timer (Pomodoro)**: A 25-minute countdown timer for deep work sessions with Start, Stop, and Reset controls.
3. **To-Do List (Tasks)**: A task manager supporting adding, inline editing, completing, deleting, and duplicate prevention.
4. **Quick Links**: Quick-access bookmarks for frequently visited web applications.

---

## 🚀 Features & Requirements

### 1. Required Features (MVP)
- **Greeting**:
  - Live digital clock updated every second (`HH:MM:SS`).
  - Current date formatted cleanly (e.g., `Tuesday, October 6, 2026`).
  - Contextual greeting based on hour of day (*Good Morning*, *Good Afternoon*, *Good Evening*, *Good Night*).
- **Focus Timer**:
  - Standard 25-minute focus countdown timer.
  - Interactive **Start**, **Stop**, and **Reset** controls.
  - Web Audio synthesized chime and alert upon session completion.
- **To-Do List**:
  - Add new tasks with instant feedback.
  - Edit existing tasks inline (via double-click or the **Edit** button).
  - Mark tasks as completed with a checkbox (visual strike-through and muted text).
  - Delete tasks from the list.
  - Persistent client-side data via browser `localStorage`.
- **Quick Links**:
  - Add favorite website buttons with custom name and URL.
  - Open links safely in new browser tabs (`target="_blank"`, `rel="noopener noreferrer"`).
  - Delete links with a quick `×` action.
  - Persistent client-side data via browser `localStorage`.

### 2. Chosen Challenges (Exactly 3 of 5)
- [x] **Light / Dark Mode**: Full theme toggle with persistent preference in `localStorage`.
- [x] **Custom Name in Greeting**: Set and edit your name to personalize the greeting banner (e.g., *"Good Morning, Alex"*).
- [x] **Prevent Duplicate Tasks**: Case-insensitive duplicate checking prevents adding existing tasks and displays a friendly alert.

---

## 📁 Folder Structure

Strictly complies with the CCSE Brief folder rules:
```text
life-dashboard/
├── .kiro/
│   ├── project.json       # Project constraints and metadata for Kiro
│   └── .gitkeep           # Memastikan folder .kiro terlacak di Git
├── css/
│   └── style.css          # Tepat 1 file CSS untuk seluruh styling & tema
├── js/
│   └── app.js             # Tepat 1 file Vanilla JavaScript untuk seluruh logika
├── index.html             # Dokumen HTML semantik
└── README.md              # Dokumentasi lengkap & panduan deployment
```

---

## 🛠️ Technical Constraints

- **TC-1**: HTML for structure, CSS for styling, Vanilla JavaScript only (no React, Vue, etc.), no backend required.
- **TC-2**: All data stored client-side via Browser `localStorage` API.
- **TC-3**: Compatible with all modern browsers (Chrome, Firefox, Safari, Edge).
- **NFR-1**: Simple, clean, minimal user interface with zero build/test setup required.
- **NFR-2**: Lightning-fast load times and instant UI updates.
- **NFR-3**: Clear visual hierarchy, pleasant purple/indigo aesthetic matching the CCSE brief reference.

---

## 💻 How to Run Locally

No installations, build steps, or package managers required!

1. Download or clone this repository.
2. Open `index.html` directly in any web browser (Double-click or drag into Chrome/Firefox/Safari/Edge).
3. Alternatively, serve via VS Code Live Server or Python HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## 📤 GitHub & Deployment Instructions

### 1. Repository Naming Format
Follow the required naming format:
```text
CodingCamp-[batch date (ddmmmyy)]-[participantname]
```
*Example:* `CodingCamp-24August26-yamaroni`

### 2. Push to GitHub
1. In **GitHub Desktop** (or Git CLI):
   - Create a new repository named as above.
   - Copy all project files (`index.html`, `css/`, `js/`, `.kiro/`, `README.md`) into the repository folder.
   - Commit changes: `feat: complete To-Do List Life Dashboard with 3 chosen challenges`.
   - Publish / Push repository to GitHub.

### 3. Publish to GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages** (under the "Code and automation" section).
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**.
5. Wait ~1 minute, and your site will be live at:
   `https://[username].github.io/CodingCamp-[batch date]-[participantname]/`

---

## 📝 Submission Checklist

Before submitting to the Paperform:
- [ ] AWS Builder ID verified.
- [ ] GitHub Repository URL created with the correct naming convention.
- [ ] `.kiro` folder is included in the GitHub repository.
- [ ] Website published and accessible via GitHub Pages.
- [ ] Submit all required links via the official Paperform.
