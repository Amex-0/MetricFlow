# MetricFlow — Interactive Analytics Dashboard

MetricFlow is a modern, interactive analytics dashboard built with **Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui**. It aims to make business data easier to explore through interactive visualizations, data tables, and intuitive filtering.

The project focuses on building responsive, accessible, and performant user interfaces for data-heavy applications.

## Features

- **Interactive dashboard** — Present important business metrics through clear, organized KPI cards.
- **Data visualization** — Display revenue and sales trends using Recharts.
- **Interactive data tables** — Explore records using TanStack Table.
- **Data filtering and search** — Find relevant records quickly using filters and search.
- **Sorting and pagination** — Navigate and organize datasets efficiently.
- **Responsive design** — Provide a consistent experience across desktop, tablet, and mobile devices.
- **Reusable UI components** — Build a consistent interface with shadcn/ui and Tailwind CSS.
- **Type safety** — Use TypeScript to improve maintainability and reduce common errors.

*Features will be marked as complete as they are implemented.*

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React application framework |
| React | Component-based user interface |
| TypeScript | Type safety and maintainability |
| Tailwind CSS | Responsive styling |
| shadcn/ui | Reusable interface components |
| Recharts | Data visualization |
| TanStack Table | Table state and data interactions |
| Lucide React | Icons |

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/metricflow.git
   ```

2. Navigate to the project directory:

   ```bash
   cd metricflow
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Build the production application
npm run start    # Start the production server
npm run lint     # Run ESLint (if configured in package.json)
```

## Project Structure

```text
metricflow/
├── public/
├── src/
│   ├── app/             # Application routes and layouts
│   ├── components/      # Reusable UI and dashboard components
│   ├── data/            # Sample business data
│   ├── features/        # Feature-specific logic
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript definitions
├── components.json      # shadcn/ui configuration
├── package.json
└── README.md
```

The structure may evolve as the application grows.

## Design Principles

MetricFlow is being developed around a few core principles:

- **Clarity over complexity:** Make important information easy to understand.
- **Fast interactions:** Keep common data exploration tasks responsive.
- **Consistency:** Use reusable components and predictable interaction patterns.
- **Accessibility:** Support keyboard navigation, clear focus states, and meaningful labels.
- **Maintainability:** Keep components focused and business logic easy to test.

## Project Goals

This project is an opportunity to explore frontend engineering challenges commonly found in business intelligence products:

- Coordinating chart interactions with table filters.
- Managing complex combinations of filters and sorting.
- Handling empty states and edge cases gracefully.
- Designing reusable components and consistent UI patterns.
- Testing data transformations and user interactions.
- Measuring and improving performance as datasets grow.

## Current Status

🚧 **In development**

The initial goal is to build a functional dashboard with interactive charts and data tables, then refine its usability, testing, and performance.

## Roadmap

- [ ] Build the responsive dashboard layout.
- [ ] Add KPI cards and interactive charts.
- [ ] Implement the orders data table.
- [ ] Add search, filtering, sorting, and pagination.
- [ ] Synchronize chart selections with table filters.
- [ ] Implement saved views and shareable filter URLs.
- [ ] Add automated tests for important interactions.
- [ ] Improve accessibility and performance.
- [ ] Deploy a live demo.

## Contributing

This is a personal learning and portfolio project. Suggestions, feedback, and constructive discussions are welcome.

## License

A license has not yet been selected. Until one is added, the project should not be assumed to permit redistribution or reuse.

---

**Built with Next.js, TypeScript, and a focus on thoughtful frontend engineering.**