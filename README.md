# ⚡ Joshua M. Madulid — Personal Developer Portfolio

A sleek, editorial-style personal portfolio website inspired by the design aesthetics and animations of **[Dymas Alfin's Personal Portfolio Website — Animations](https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations)**.

Tailored specifically for **Joshua M. Madulid** ([@envydoes](https://github.com/envydoes)) with clean typography, generous whitespace, intentional micro-interactions, and a zero-build-step architecture.

> **Zero React / Next.js Dependencies**: Built with pure, high-performance **PHP 8.4**, **HTML5**, **CSS3 / Tailwind utilities**, and **Vanilla JavaScript** engineered to run directly in your local **XAMPP / Apache** environment (`http://localhost/portfolio/`) or as a static site (`index.html`).

---

## 🌟 Key Design & Interactive Features

1. **Editorial Typographic Hierarchy**:
   - Clean, modern editorial layout prioritizing clarity, readability, and confidence without visual clutter.
   - High-contrast obsidian dark palette (`#09090b`), subtle ambient glows, and clean hairline card borders.
   - Seamless Light / Dark theme toggle saved in `localStorage`.

2. **Floating Pill Island Navigation**:
   - Glassmorphism backdrop blur with shrinking scroll transition.
   - Real-time active scroll spy highlighting sections as you scroll.
   - Instant controls: Tactile sound toggle, theme switch, interactive AI Assistant trigger, and "Let's Talk" CTA.

3. **Hero Section with Live Status & 3D Tilt Profile Card**:
   - Live Philippine Time indicator (GMT+8 Asia/Manila) updated in real-time.
   - Status pill with glowing pulsing green dot for work availability.
   - Quick one-click email copy button with floating pill toast confirmation.
   - Interactive 3D tilt card showcasing Joshua's portrait, verified status, and stats counters (166+ GitHub Contributions, 12+ Certifications, 4+ Systems).

4. **Infinite Smooth Tech Marquee / Ticker**:
   - Silky smooth CSS loop showcasing full-stack competencies, PHP, MySQL, Docker, AI tooling, and design systems.

5. **Selected Works with Smooth Filter Tabs**:
   - Filterable projects: All, Full-Stack Systems, Mobile Apps, UI/UX & Design.
   - **SumEste Portal**: Live capstone resident tracking system (`sum-este-portal.digital`).
   - **Momms Inventory Management System**: Administrative dashboard with automated stock tracking.
   - **TatakPH Mobile App**: Filipino cultural showcase hybrid mobile application.
   - **Aurora**: Tourism and accommodation platform.
   - **ATOM AI Design System**: Comprehensive Figma showcase with an interactive 20-screen gallery lightbox modal.

6. **Interactive Modals**:
   - **ATOM AI Gallery Lightbox**: Fullscreen screen viewer with prev/next navigation, keyboard arrow support, and thumbnail carousel.
   - **Certificate Lightbox**: Click any of the 12 verified certifications to view credential details, issuing body, skills covered, and direct verification link.
   - **Ask AI / Joshua Q&A Assistant**: Clickable question pills with live typewriter streaming answers covering background, stack, availability, and projects.

7. **Tactile Web Audio UI Feedback**:
   - Built-in Web Audio API synthesizer generating subtle mechanical clicks, hover tones, and success chimes. Can be toggled on or off at any time.

---

## 📁 Project Structure

```
c:/xampp/htdocs/portfolio/
├── index.php                      # 🔥 Primary entry point for XAMPP / Apache (Dynamic PHP)
├── index.html                     # 🌐 Standalone static HTML version (Opens in any browser)
├── css/
│   └── style.css                  # Modern editorial styles, glassmorphism, keyframes & theme tokens
├── js/
│   └── main.js                    # Vanilla JS interactive engine (Filters, modals, tilt, clock, audio)
├── data/
│   ├── portfolioData.php          # 📝 Master PHP data configuration (Single source of truth)
│   └── portfolioData.json         # JSON export of all portfolio data
├── images/                        # Profile photos, certificate badges, and ATOM AI screen assets
│   ├── joshua.jpg
│   ├── atom-ai/
│   └── *.png
└── README.md                      # Documentation
```

---

## 🚀 How to Run Locally

### Option 1: Via XAMPP (Recommended)
1. Ensure your XAMPP Apache server is running.
2. Place or keep this folder at `C:\xampp\htdocs\portfolio`.
3. Open your browser and navigate to:
   ```
   http://localhost/portfolio/
   ```
   or
   ```
   http://localhost/portfolio/index.php
   ```

### Option 2: Standalone Browser Opening
- You can directly double-click or open `index.html` in any web browser without needing any server or build step!

---

## ✍️ How to Edit Content

All projects, personal details, contact links, timeline entries, certifications, and AI Q&A answers are configured in:
- `data/portfolioData.php`

Simply update the values in that file, and your changes will instantly reflect on the website when refreshing `http://localhost/portfolio/`. If you want to update the static `index.html` file, run:
```bash
php index.php > index.html
```
