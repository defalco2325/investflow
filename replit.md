# Satoshi Reserve Investment Platform

## Overview

This is a **frontend-only** Regulation CF investment form for Satoshi Reserve, built with React, TypeScript, and Vite. The platform features a multi-step accordion-style form that collects investor profiles, investment amounts with tiered bonus structures, and detailed investor information for various entity types (Individual, Joint, Corporation, Trust, IRA).

## User Preferences

Preferred communication style: Simple, everyday language.

## Architecture

### Frontend Stack

**Framework**: React 18 with TypeScript, built using Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with custom `useInvestmentForm` hook for complex form state
- **UI Components**: shadcn/ui component library (Radix UI primitives with Tailwind CSS)
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Data Fetching**: TanStack Query (React Query) for any future API integration
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Animations**: Framer Motion for smooth transitions and interactive elements

### Application Features

**Investment Form Flow**:
1. **Investor Profile**: Name, email, phone, accredited investor status (required dropdown), consent
2. **Investment Amount**: 7 pricing tiers ($1,500 to $99,500) with bonus shares (5% to 120%), custom amount input
3. **Investor Information**: Dynamic forms based on investor type with international country support

**Key Features**:
- Accordion-style navigation with free movement between steps
- Real-time investment calculations showing base shares, bonus shares, and effective price
- Dynamic address fields based on country selection:
  - United States: State dropdown with all US states, "Zip Code" label
  - Canada: Province dropdown with all Canadian provinces, "Postal Code" label
  - Other countries (38+ supported): Text input for state/region, "Postal/Zip Code" label
- Edit icons on completed steps for easy revision
- Comprehensive validation with clear error messages
- Responsive design for all screen sizes
- Premium animations and transitions

### Investment Calculation Logic

**Tiered Bonus System**: 
- Base share price: $0.30
- 7 tiers ranging from $1,500 (5% bonus) to $99,500 (120% bonus)
- Real-time calculation of base shares, bonus shares, total shares, and effective price
- Tier selection syncs with investment amount input field

**Implementation**: Centralized calculation logic in `client/src/lib/investment-calculations.ts`

### International Support

**Countries**: 38+ countries supported for Reg S offering including:
- North America: United States, Canada, Mexico
- Europe: UK, Germany, France, Italy, Spain, Netherlands, Belgium, Switzerland, and more
- Asia-Pacific: Australia, Singapore, Hong Kong, Japan, South Korea, India
- Middle East: UAE, Saudi Arabia, Israel
- Latin America: Brazil, Argentina, Chile, Colombia, Peru
- "Other" option for unlisted countries

### File Structure

```
client/
  src/
    components/
      investment-form/       # Main form components
        forms/               # Individual investor type forms
      ui/                    # shadcn/ui components
    hooks/                   # Custom React hooks
    lib/                     # Utility functions and calculations
      countries.ts           # Country/region data and helpers
      investment-calculations.ts  # Investment math logic
      validation-schemas.ts  # Zod validation schemas
    types/                   # TypeScript type definitions
    pages/                   # Route pages
    App.tsx                 # Main app component
```

## Development

### Running the Application

To start the development server:
```bash
./dev.sh
```

Or directly:
```bash
npx vite
```

The application will be available at `http://localhost:5000`

### Build for Production

```bash
npm run build
```

Outputs to `dist/public/`

## Key Dependencies

### UI and Forms
- React 18 - Frontend framework
- shadcn/ui & Radix UI - Component library
- React Hook Form - Form state management
- Zod - Schema validation
- Tailwind CSS - Styling
- Framer Motion - Animations

### Routing and State
- Wouter - Client-side routing
- TanStack Query - Server state management (for future API integration)

### Development Tools
- Vite - Build tool and dev server
- TypeScript - Type safety
- Tailwind CSS - Utility-first styling

## Form Data Flow

1. User fills out Investor Profile → State updated via `updateInvestorProfile()`
2. User selects Investment Amount → Calculations performed → State updated
3. User selects investor type → Appropriate form rendered
4. User submits final form → Data logged to console (frontend-only)

All form data is stored in React state and can be logged or sent to an API endpoint when backend integration is added.

## Design Features

- Maximum form width: 640px (max-w-xl) for optimal readability
- Accordion-style steps with unrestricted navigation
- Orange accent color (#FB8037) for badges and highlights
- Check marks on completed steps with edit icons for revisions
- Premium animations with staggered field appearances
- Mobile-first responsive design
- Dark mode support via next-themes

## Future Enhancements

Since this is currently a frontend-only application, future enhancements could include:
- Backend API integration for form submission
- Database storage for investment applications
- Payment processing integration
- Email notifications
- Admin dashboard for reviewing applications
