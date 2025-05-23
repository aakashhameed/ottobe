# Otoobe

Otoobe is a modern web application built with Next.js and React, designed to provide an administrative dashboard and user management system. The project leverages a modular folder structure and reusable UI components for scalability and maintainability.

## Features
- Admin dashboard with charts and reports
- User management
- Event management
- Settings and configuration pages
- Responsive UI with reusable components
- Theming support

## Project Structure
```
Otoobe/
├── app/                # Main application pages and layouts
│   ├── dashboard/      # Dashboard pages and layout
│   ├── events/         # Event management pages
│   ├── reports/        # Reports and analytics
│   ├── settings/       # Application settings
│   ├── users/          # User management
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Root page
├── components/         # Reusable React components
│   ├── admin-layout.tsx
│   ├── dashboard-chart.tsx
│   ├── theme-provider.tsx
│   └── ui/             # UI primitives (buttons, forms, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets (images, logos)
├── styles/             # Additional CSS files
├── next.config.mjs     # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm, pnpm, or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/otoobe.git
   cd Otoobe
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Development Server
```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production
```sh
npm run build
npm start
```

## Technologies Used
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License
This project is licensed under the MIT License.