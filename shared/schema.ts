import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const investmentSubmissions = pgTable("investment_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  isAccredited: boolean("is_accredited").notNull(),
  consentGiven: boolean("consent_given").notNull(),
  investmentAmount: decimal("investment_amount", { precision: 10, scale: 2 }).notNull(),
  investorType: text("investor_type").notNull(), // individual, joint, corporation, trust, ira
  investorInformation: jsonb("investor_information").notNull(),
  sharePrice: decimal("share_price", { precision: 10, scale: 4 }).default("0.30"),
  baseShares: integer("base_shares").notNull(),
  bonusShares: integer("bonus_shares").notNull(),
  totalShares: integer("total_shares").notNull(),
  effectiveSharePrice: decimal("effective_share_price", { precision: 10, scale: 4 }).notNull(),
  bonusPercentage: decimal("bonus_percentage", { precision: 5, scale: 2 }).notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertInvestmentSubmissionSchema = createInsertSchema(investmentSubmissions).omit({
  id: true,
  submittedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertInvestmentSubmission = z.infer<typeof insertInvestmentSubmissionSchema>;
export type InvestmentSubmission = typeof investmentSubmissions.$inferSelect;

// Investment form data types
export type InvestorType = 'individual' | 'joint' | 'corporation' | 'trust' | 'ira';

export interface InvestorProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isAccredited: boolean;
  consentGiven: boolean;
}

export interface InvestmentAmountData {
  amount: number;
  tier: InvestmentTier;
}

export interface InvestmentTier {
  amount: number;
  bonusPercentage: number;
  label: string;
}

export interface InvestorInformationData {
  type: InvestorType;
  streetAddress: string;
  apartmentUnit?: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  dateOfBirth?: string;
  tinOrSSN?: string;
  // Joint-specific fields
  jointHoldingType?: string;
  secondInvestor?: {
    firstName: string;
    lastName: string;
    streetAddress: string;
    apartmentUnit?: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
    dateOfBirth: string;
    tinOrSSN: string;
  };
  // Corporation/Trust specific fields
  entityName?: string;
  entityType?: string;
  taxId?: string;
  authorizedSignatory?: string;
  // IRA specific fields
  custodianName?: string;
  accountNumber?: string;
  iraType?: string;
}

export interface InvestmentFormData {
  investorProfile: InvestorProfileData;
  investmentAmount: InvestmentAmountData;
  investorInformation: InvestorInformationData;
}

export interface InvestmentCalculation {
  baseShares: number;
  bonusShares: number;
  totalShares: number;
  effectivePrice: number;
  bonusPercentage: number;
  totalInvestment: number;
}
