# ⚡ Joshua M. Madulid — Personal Developer Portfolio

A sleek, modern, and minimalist portfolio website inspired by the design aesthetics of **[bryllim.com](https://www.bryllim.com/)**, tailored specifically for **Joshua M. Madulid** ([@envydoes](https://github.com/envydoes)) with unique enhancements, interactive widgets, and a single-file editable architecture.

Built with **Next.js 14+ (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Key Features

- **Minimalist Aesthetic & Halftone Backdrop**: Signature radial halftone matrix pattern, Geist fonts, and clean dark/light/system theme transitions.
- **Interactive 3D Spotlight Project Deck**: Fanned 3D perspective cards with hover lift, click-to-cycle, and direct source links.
- **Interactive ⌘K "Ask AI" Assistant**: Built-in interactive command assistant with typewriter streaming answers for questions about your tech stack, education at NEUST, projects, and contact info.
- **Interactive ⌘J Speed Typing Test**: Retro coding typing test mini-game with real-time WPM, accuracy %, and developer quotes.
- **Tactile Web Audio UI Effects**: Crisp mechanical click, hover, and completion sound synthesis (can be toggled on/off with persistent preferences).
- **Categorized Skills Matrix**: Clean categorized pills for Frontend, Backend, Tools & Others.
- **Filterable Projects Grid**: Multi-category filter (All, Full-Stack, Mobile, Desktop, Frontend, Academic) linked directly to your GitHub repositories.
- **Education & Experience Timeline**: Vertical timeline highlighting your BSIT degree at NEUST, development milestones, and team achievements.
- **"Currently" Status Board**: Live snapshot of current learning focuses, active projects, goals, coding playlist, and fuel.
- **Desktop Sidebar + Mobile Drawer**: Responsive navigation layout with presence indicators and quick email actions.

---

## 📁 Project Structure

```
portfolio/
├── README.md                      # 📖 Comprehensive documentation & guide
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS theme & typography settings
├── next.config.js                 # Next.js image domains & settings
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with SEO metadata & halftone background
│   │   ├── page.tsx               # Main portfolio page with shortcuts & components
│   │   └── globals.css            # Halftone masks, theme variables, 3D deck styles
│   ├── components/
│   │   ├── Sidebar.tsx            # Desktop fixed navigation sidebar
│   │   ├── MobileNav.tsx          # Mobile sticky header & fullscreen sliding drawer
│   │   ├── Hero.tsx               # Avatar, verified badge, bio & quick CTAs
│   │   ├── SpotlightDeck.tsx      # 3D fanned rotating project spotlight cards
│   │   ├── TechStack.tsx          # Categorized skill badges
│   │   ├── ProjectsGrid.tsx       # Filterable repository & project grid
│   │   ├── Timeline.tsx           # Education & experience timeline
│   │   ├── Certifications.tsx     # Certifications cards (freeCodeCamp, Coursera, Oracle)
│   │   ├── CurrentlyBoard.tsx     # "Currently" status dashboard
│   │   ├── Affiliations.tsx       # Organizations, Icore team & contact cards
│   │   ├── AskAIModal.tsx         # ⌘K interactive AI assistant overlay
│   │   ├── TypingModal.tsx        # ⌘J interactive speed typing mini-game
│   │   ├── ThemeToggle.tsx        # Light / Dark / System theme switcher
│   │   ├── SoundToggle.tsx        # Web Audio sound toggle button
│   │   └── Footer.tsx             # Footer with copyright & back-to-top button
│   ├── data/
│   │   └── portfolioData.ts       # 🔥 MASTER DATA FILE (Edit all content here)
│   ├── hooks/
│   │   ├── useTheme.ts            # Theme management hook with smooth transitions
│   │   └── useSoundEffects.ts     # Synthesized Web Audio API sound effects
│   └── types/
│       └── index.ts               # TypeScript data schemas
```

---

## 🛠️ How to Edit & Update in the Future (Quick Guide)

Everything on the website is centralized in **one single master file**:
👉 `src/data/portfolioData.ts`

You do **not** need to modify any React component code to update your information!

### 1. Adding a New Project
Open `src/data/portfolioData.ts`, find the `projects` array, and add a new item:
```ts
{
  id: 'my-new-app',
  title: 'Awesome App Name',
  description: 'A brief description of what the project does.',
  tags: ['React', 'Next.js', 'Tailwind'],
  category: 'Full-Stack', // Options: 'Full-Stack' | 'Frontend' | 'Mobile' | 'Desktop' | 'Academic'
  githubUrl: 'https://github.com/envydoes/my-new-app',
  liveUrl: 'https://my-app-demo.vercel.app',
  featured: true,
  year: '2026',
}
```

### 2. Updating Spotlight Projects (3D Deck)
Edit the `spotlightProjects` array in `src/data/portfolioData.ts`. The top 3 items will appear in the 3D rotating card deck.

### 3. Updating Skills / Tech Stack
Find `techStack` in `src/data/portfolioData.ts` and add or remove skills:
```ts
{ name: 'Docker', category: 'Tools & Others' },
{ name: 'GraphQL', category: 'Backend' },
```

### 4. Updating Bio, Location, or Social Links
Edit `personalInfo` at the top of `src/data/portfolioData.ts`:
```ts
personalInfo: {
  name: 'Joshua M. Madulid',
  email: 'your-email@example.com',
  tagline: 'Your updated tagline here',
  // ...
}
```

### 5. Adding New AI Assistant Answers
Find `aiQuestions` in `src/data/portfolioData.ts` and add questions and answers:
```ts
{
  keywords: ['hackathon', 'competition', 'awards'],
  question: 'Has Joshua participated in hackathons?',
  answer: 'Yes! Joshua has participated in...',
}
```

---

## 🚀 Running Locally

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
# http://localhost:3000
```

---

## 🌐 Deploying to Vercel (Recommended)

1. Push your code to a GitHub repository under your account (`envydoes/portfolio`).
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository `portfolio`.
4. Keep the default settings (Framework: Next.js) and click **Deploy**.
5. Your portfolio is live with free automatic SSL, CDN, and continuous deployments!

