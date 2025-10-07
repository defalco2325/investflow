# Investment Form Application

A modern, responsive investment form built with React, TypeScript, and Express. This application allows users to complete a multi-step investment process with investor profile creation, investment amount selection with bonus tiers, and detailed investor information collection.

## 📋 What This App Does

This is a multi-step investment form application that guides users through:

1. **Investor Profile** - Collect basic information (name, email, phone) and accreditation status
2. **Investment Amount** - Select investment tier (MEMBER, SELECT, ELITE, PREMIER, PRESIDENTIAL) with bonus share calculations
3. **Investor Information** - Gather detailed information based on investor type (Individual, Joint, Trust, IRA, Corporation)

The app features:
- Real-time investment calculations with bonus share percentages
- Responsive design that works on mobile and desktop
- Interactive tier selection with visual feedback
- Form validation and error handling
- Sticky investment summary footer

---

## 🎨 How to Make Edits

### Changing Text Content

#### Investment Tier Names
To modify tier names (MEMBER, SELECT, ELITE, etc.):

**File:** `client/src/components/investment-form/InvestmentAmount.tsx`

```typescript
// Lines 16-21 (Non-Accredited Tiers)
const PRICING_TIERS_NON_ACCREDITED = [
  { amount: 1000, bonusPercentage: 5, label: "MEMBER", displayAmount: "$1,000" },
  { amount: 2500, bonusPercentage: 10, label: "SELECT", displayAmount: "$2,500" },
  // ... modify labels here
];
```

**File:** `client/src/lib/investment-calculations.ts`

```typescript
// Lines 3-8 (Also update the calculation file)
export const INVESTMENT_TIERS_NON_ACCREDITED: InvestmentTier[] = [
  { amount: 1000, bonusPercentage: 5, label: "MEMBER" },
  // ... update labels here too
];
```

#### Form Field Labels
To change form labels and placeholders:

**Investor Profile:** `client/src/components/investment-form/InvestorProfile.tsx`
**Investment Amount:** `client/src/components/investment-form/InvestmentAmount.tsx`
**Investor Information:** `client/src/components/investment-form/InvestorInformation.tsx`

Example:
```typescript
<FormLabel>Email Address</FormLabel>  // Change this text
<Input placeholder="Email Address" /> // And this placeholder
```

### Changing Colors

All colors are managed through CSS custom properties in `client/src/index.css`:

#### Primary Brand Color (Orange)
```css
/* Line 13 - Main primary color */
--primary: hsl(25, 85%, 53%);

/* To change, modify the HSL values:
   - First number (25): Hue (0-360)
   - Second number (85%): Saturation
   - Third number (53%): Lightness
*/
```

#### Background Colors
```css
/* Line 7 - Page background */
--background: hsl(35, 15%, 96%);

/* Line 9 - Card background */
--card: hsl(0, 0%, 100%);
```

#### Text Colors
```css
/* Line 8 - Main text color */
--foreground: hsl(210, 40%, 15%);

/* Line 18 - Muted/secondary text */
--muted-foreground: hsl(210, 20%, 45%);
```

#### Button Text Color
The investment buttons use black text. To change:

**File:** `client/src/index.css` (Line 240)
```css
.premium-button {
  @apply bg-primary text-black /* Change text-black to your color */
}
```

#### Tier Badge Colors
Investment tier bonus badges (yellow/orange gradient):

**File:** `client/src/components/investment-form/InvestmentAmount.tsx` (Lines 92-100)
```typescript
const getBonusBadgeColor = (index: number) => {
  const colors = [
    'bg-yellow-300',  // MEMBER tier
    'bg-yellow-400',  // SELECT tier
    'bg-orange-500',  // ELITE tier
    'bg-orange-600',  // PREMIER tier
    'bg-orange-700'   // PRESIDENTIAL tier
  ];
  return colors[index] || colors[colors.length - 1];
};
```

### Changing Images or Assets

1. **Upload New Images:**
   - Drag and drop images into the `attached_assets` folder in Replit
   - Or use the file browser to upload

2. **Reference Images in Code:**
   ```typescript
   import myImage from "@assets/my-image.png"
   <img src={myImage} alt="Description" />
   ```

3. **Example Usage:**
   - See how images are referenced in components using the `@assets/` prefix

### Modifying Form Fields

#### Adding a New Field

**File:** `client/src/components/investment-form/forms/IndividualForm.tsx`

Example - Adding a "Middle Name" field:

```typescript
// 1. Add to form schema (lib/validation-schemas.ts)
middleName: z.string().optional(),

// 2. Add to form defaultValues
middleName: formData.investorInformation?.middleName || "",

// 3. Add FormField component
<FormField
  control={form.control}
  name="middleName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Middle Name</FormLabel>
      <FormControl>
        <Input
          {...field}
          className="bg-input border-border"
          placeholder="Middle Name"
          data-testid="input-middle-name"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

#### Removing a Field

1. Remove the FormField component from the form
2. Remove from the validation schema
3. Remove from defaultValues

#### Modifying Field Validation

**File:** `client/src/lib/validation-schemas.ts`

```typescript
export const individualInvestorSchema = z.object({
  email: z.string().email("Invalid email"), // Modify validation rules
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  // ... other fields
});
```

### Updating Investment Amounts and Bonuses

#### Non-Accredited Investor Tiers

**File:** `client/src/lib/investment-calculations.ts` (Lines 3-9)

```typescript
export const INVESTMENT_TIERS_NON_ACCREDITED: InvestmentTier[] = [
  { amount: 1000, bonusPercentage: 5, label: "MEMBER" },
  { amount: 2500, bonusPercentage: 10, label: "SELECT" },
  // Modify amounts and bonus percentages here
];
```

#### Accredited Investor Tiers

**File:** `client/src/lib/investment-calculations.ts` (Lines 11-17)

```typescript
export const INVESTMENT_TIERS_ACCREDITED: InvestmentTier[] = [
  { amount: 10000, bonusPercentage: 5, label: "MEMBER" },
  { amount: 25000, bonusPercentage: 10, label: "SELECT" },
  // Modify amounts and bonus percentages here
];
```

#### Share Price

**File:** `client/src/lib/investment-calculations.ts` (Line 1)

```typescript
export const SHARE_PRICE = 0.30; // Change share price here
```

### Modifying Navigation or Flow

The multi-step form flow is controlled in:

**File:** `client/src/components/investment-form/InvestmentForm.tsx`

- Step order is defined in the Accordion items (lines 107-222)
- Step validation logic is in the `handleAccordionChange` function (lines 57-69)
- Auto-advance logic is in the useEffect (lines 22-28)

---

## 📁 Key File Locations

### Frontend (Client)

| File/Folder | Purpose |
|------------|---------|
| `client/src/App.tsx` | Main application component and routing |
| `client/src/index.css` | Global styles and CSS custom properties (colors) |
| `client/src/components/investment-form/` | All investment form components |
| `client/src/components/ui/` | Reusable UI components (buttons, inputs, etc.) |
| `client/src/lib/investment-calculations.ts` | Investment tier definitions and calculations |
| `client/src/lib/validation-schemas.ts` | Form validation rules |
| `client/src/hooks/` | Custom React hooks |

### Backend (Server)

| File/Folder | Purpose |
|------------|---------|
| `server/index.ts` | Express server setup |
| `server/routes.ts` | API route definitions |
| `server/storage.ts` | Data storage interface |
| `server/vite.ts` | Vite server configuration |

### Configuration

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `vite.config.ts` | Vite build configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `tsconfig.json` | TypeScript configuration |

### Shared

| File/Folder | Purpose |
|------------|---------|
| `shared/schema.ts` | Shared TypeScript types and Zod schemas |

---

## 🌐 How to Deploy/Publish on Replit

### Publishing Your App

1. **Click the Publish Button:**
   - Look for the "Publish" button in the top-right corner of your Replit workspace
   - Or search for "Publishing" in the search bar

2. **Choose Deployment Type:**
   - **Autoscale** (Recommended): Automatically scales based on traffic, ideal for web apps
   - **Reserved VM**: For always-on applications
   - **Static**: For static sites (not applicable for this full-stack app)

3. **Configure Your Deployment:**
   - Replit will automatically detect the best deployment type
   - You can customize the deployment name and settings
   - Add a custom domain if desired (optional)

4. **Deploy:**
   - Click "Publish" to create a snapshot of your app
   - Replit will build and deploy your application
   - You'll receive a live URL to share

### Updating Your Published App

When you make changes:

1. Test your changes in the development environment (Run button)
2. Click "Publish" again to redeploy
3. The published app will update with your latest changes

**Important:** Publishing creates a snapshot, so development and production run separately.

### Monitoring Your Deployment

- Access deployment analytics from the Publishing tool
- Monitor resource usage and performance
- View deployment logs for debugging

### Custom Domains

To add a custom domain:
1. Go to your deployment settings
2. Click "Add Custom Domain"
3. Follow the DNS configuration instructions
4. Your app will be accessible at your custom domain

---

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check

# Push database schema changes
npm run db:push
```

---

## 🎯 Feel Free to Customize!

**This project is designed to be easily customizable!** 

Whether you want to:
- Change the color scheme to match your brand
- Modify investment tiers and bonus structures
- Add new form fields or remove existing ones
- Update text and labels
- Adjust the layout and spacing

...go ahead and experiment! The component-based architecture makes it easy to update individual sections without affecting the rest of the application.

### Quick Customization Tips:

1. **Start with colors** - Change the primary color in `client/src/index.css` to see immediate visual impact
2. **Update tier labels** - Make the investment levels match your terminology
3. **Adjust form fields** - Add or remove fields based on your requirements
4. **Test frequently** - The app auto-reloads, so you'll see changes immediately

### Getting Help:

- Check component comments for guidance
- Use TypeScript types for autocomplete and error checking
- Test changes in the development environment before publishing
- Replit's AI can help you understand and modify code

---

## 📝 Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Express, Node.js
- **Forms:** React Hook Form, Zod validation
- **UI Components:** Radix UI, shadcn/ui
- **Build Tool:** Vite
- **State Management:** TanStack Query

---

## 📄 License

MIT License - Feel free to use and modify for your projects!

---

**Happy Customizing! 🚀**

If you run into any issues or have questions, remember that this is your project now - make it your own!
