## Project Architecture

### API Layer

The application follows the Repository Pattern for API interactions, providing a clean separation between the data access logic and business logic. This pattern helps in:

- Centralizing data access logic
- Making the code more maintainable and testable
- Providing a consistent interface for data operations

### Naming Conventions

The project follows strict naming conventions to maintain consistency and clarity:

#### Pages

- Files: `[name].page.tsx`
- Example: `dashboard.page.tsx`, `transactions.page.tsx`

#### Components

- Files: `[name].component.tsx`
- Example: `header.component.tsx`, `transaction-list.component.tsx`

#### Hooks

- Files: `[name].hook.ts`
- Example: `use-auth.hook.ts`, `use-transactions.hook.ts`

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically

## Running E2E Tests

The project uses Cypress for end-to-end testing. To run the tests:

1. Start the development server:

```bash
pnpm dev
```

2. In a new terminal, run Cypress:

```bash
pnpm cypress open
```

Or run tests headlessly:

```bash
pnpm cypress run
```

The E2E tests are located in the `cypress/e2e` directory.

## Project Structure

- `/src` - Source code
- `/api` - API layer and repositories
- `/components` - React components
- `/hooks` - Custom React hooks
- `/pages` - Next.js pages
- `/utils` - Utility functions
- `/types` - TypeScript type definitions
- `/constants` - Application constants
- `/public` - Static assets
- `/cypress` - E2E tests
- `/locales` - Internationalization files
- `/.next` - Next.js build output
- `/node_modules` - Dependencies
