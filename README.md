# My Life in Cars

A web application for documenting your personal automotive history. Create a beautiful timeline of all the cars you've owned throughout your life.

## Features

- **User Authentication**: Sign up with email/password or Google
- **Car Collection**: Add, edit, and manage your vehicles
- **Gallery View**: See all your cars in a beautiful card layout
- **Timeline View (Virtual Showroom)**: View your cars chronologically
- **Per-Car Privacy**: Choose which cars are public or private
- **Rich Details**: Track make, model, year, color, ownership dates, and personal stories

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Ready for Supabase integration

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gregorpetri-git/antigravity-project.git
cd antigravity-project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/          # Login/Register page
│   ├── (dashboard)/
│   │   ├── collection/     # Gallery view (My Collection)
│   │   └── showroom/       # Timeline view (Virtual Showroom)
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page (redirects)
├── components/
│   ├── AddVehicleModal.tsx # Add/Edit vehicle form
│   ├── CarCard.tsx         # Vehicle card component
│   └── Header.tsx          # Navigation header
├── types/
│   └── index.ts            # TypeScript interfaces
└── lib/                    # Utilities (for future use)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Car Data Model

Each car entry includes:
- Make & Model
- Type (Sedan, Coupe, SUV, etc.)
- Color
- Year Built
- Year Bought
- Year Sold (optional - empty if still owned)
- Description (max 100 characters)
- Anecdote/Story (max 600 characters)
- Image Style (Museum/Showroom)
- Privacy Setting (Public/Private)

## Future Enhancements

- [ ] Supabase integration for persistent storage
- [ ] Google OAuth authentication
- [ ] AI-generated car images based on make/model/year/color
- [ ] Public profile pages
- [ ] Social sharing

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

## License

MIT

---

*My Life in Cars - A Timeline of Automotive Excellence*
