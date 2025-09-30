import { z } from "zod";

export const investorProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please enter a valid phone number"),
  isAccredited: z.boolean(),
  consentGiven: z.boolean().refine(val => val === true, "You must give consent to continue"),
});

export const investmentAmountSchema = z.object({
  amount: z.number().min(999.90, "Minimum investment amount is $999.90"),
});

export const baseInvestorInfoSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  apartmentUnit: z.string().optional(),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(5, "Please enter a valid zip code"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});

export const individualInvestorSchema = baseInvestorInfoSchema.extend({
  type: z.literal("individual"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  tinOrSSN: z.string().min(9, "Please enter a valid TIN or SSN"),
});

export const jointInvestorSchema = baseInvestorInfoSchema.extend({
  type: z.literal("joint"),
  jointHoldingType: z.string().min(1, "Joint holding type is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  tinOrSSN: z.string().min(9, "Please enter a valid TIN or SSN"),
  secondInvestor: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    apartmentUnit: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(5, "Please enter a valid zip code"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    tinOrSSN: z.string().min(9, "Please enter a valid TIN or SSN"),
  }),
});

export const corporationInvestorSchema = baseInvestorInfoSchema.extend({
  type: z.literal("corporation"),
  entityName: z.string().min(1, "Entity name is required"),
  entityType: z.string().min(1, "Entity type is required"),
  taxId: z.string().min(9, "Please enter a valid tax ID"),
  authorizedSignatory: z.string().min(1, "Authorized signatory is required"),
});

export const trustInvestorSchema = baseInvestorInfoSchema.extend({
  type: z.literal("trust"),
  entityName: z.string().min(1, "Trust name is required"),
  taxId: z.string().min(9, "Please enter a valid tax ID"),
  authorizedSignatory: z.string().min(1, "Authorized signatory is required"),
});

export const iraInvestorSchema = baseInvestorInfoSchema.extend({
  type: z.literal("ira"),
  custodianName: z.string().min(1, "Custodian name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  iraType: z.string().min(1, "IRA type is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  tinOrSSN: z.string().min(9, "Please enter a valid TIN or SSN"),
});

export const investorInformationSchema = z.discriminatedUnion("type", [
  individualInvestorSchema,
  jointInvestorSchema,
  corporationInvestorSchema,
  trustInvestorSchema,
  iraInvestorSchema,
]);

export const fullFormSchema = z.object({
  investorProfile: investorProfileSchema,
  investmentAmount: investmentAmountSchema,
  investorInformation: investorInformationSchema,
});
