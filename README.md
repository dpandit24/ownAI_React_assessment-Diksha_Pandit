# Purchase Order Form — React Application

This project is a Purchase Order Form built with React, HTML, CSS, and Bootstrap.

## Tech Stack

- React
- HTML, Tailwind CSS
- Bootstrap
- Next.js (for build and dev scripts)
- Form validation libraries

## Getting Started

**🚀 Install dependencies:**
   ```bash
   npm i --legacy-peer-deps
   ```
🏃‍♂️ Run app:
      npm run dev
   
## Technical Features & Architecture

- Architecture:  
  - Modular and component-based architecture.
  - Separation of concerns: UI components in components/, hooks in hooks/, utilities in lib/, and global styles in styles/.
  - Centralized theme management via components/theme-provider.tsx.
  - Page and layout structure managed in the app/ directory.

- Best Practices:  
  - Reusable and maintainable components.
  - Strong typing with TypeScript for reliability and scalability.
  - Form validation using react-hook-form for robust user input handling.
  - Responsive design with Bootstrap and Tailwind CSS.
  - Clean code conventions and consistent folder structure.
  - Version control with .gitignore and clear separation of environment/config files.
  - Accessibility considerations in form controls and UI elements.

- Technical Features:  
  - Dynamic form sections and conditional rendering.
  - State management using React hooks.
  - Custom hooks for mobile detection and toast notifications.
  - Optimized asset management in the public/ folder.
  - Easy theming and customization.
  - Linting and build error suppression for smooth development experience.

## Folder Structure

├── app/                # Next.js app directory (layout, pages, global styles)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       theme-provider.tsx
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── public/
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
├── styles/
│   └── globals.css
├── .gitignore
├── components.json
├── next.config.mjs
├── package.json
└── README.md

## Usage

- Fill out all mandatory fields as per the requirements.
- Use "Add Another" to add REQ sections (visible for Group PO).
- Select talents and fill associated details.
- Submit to validate and log data.
- Reset to clear the form.
- After submission, view mode disables editing.

## Validation

- All fields are validated.
- Error messages are shown for invalid or missing data.

## Customization

- Add or modify UI components in components/ or components/ui/.
- Update application logic, layout, and pages in the app/ directory (e.g., app/page.tsx, `app/layout.tsx`).