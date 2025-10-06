import { InvestmentTier, InvestmentCalculation } from "@shared/schema";

export const INVESTMENT_TIERS_NON_ACCREDITED: InvestmentTier[] = [
  { amount: 1000, bonusPercentage: 5, label: "MEMBER" },
  { amount: 2500, bonusPercentage: 10, label: "SELECT" },
  { amount: 5000, bonusPercentage: 25, label: "ELITE" },
  { amount: 10000, bonusPercentage: 50, label: "PREMIER" },
  { amount: 25000, bonusPercentage: 80, label: "PRESIDENTIAL" },
];

export const INVESTMENT_TIERS_ACCREDITED: InvestmentTier[] = [
  { amount: 10000, bonusPercentage: 5, label: "MEMBER" },
  { amount: 25000, bonusPercentage: 10, label: "SELECT" },
  { amount: 50000, bonusPercentage: 25, label: "ELITE" },
  { amount: 100000, bonusPercentage: 50, label: "PREMIER" },
  { amount: 200000, bonusPercentage: 80, label: "PRESIDENTIAL" },
];

// Legacy export for backward compatibility
export const INVESTMENT_TIERS = INVESTMENT_TIERS_NON_ACCREDITED;

export const SHARE_PRICE = 0.30;

export function calculateInvestment(amount: number, isAccredited: boolean = false): InvestmentCalculation {
  // Use appropriate tier based on accreditation status
  const tiers = isAccredited ? INVESTMENT_TIERS_ACCREDITED : INVESTMENT_TIERS_NON_ACCREDITED;
  
  // Find the appropriate tier
  let bonusPercentage = 0;
  for (const tier of tiers) {
    if (amount >= tier.amount) {
      bonusPercentage = tier.bonusPercentage;
    }
  }

  const baseShares = Math.floor(amount / SHARE_PRICE);
  const bonusShares = Math.floor((baseShares * bonusPercentage) / 100);
  const totalShares = baseShares + bonusShares;
  const effectivePrice = totalShares > 0 ? amount / totalShares : SHARE_PRICE;

  return {
    baseShares,
    bonusShares,
    totalShares,
    effectivePrice: Number(effectivePrice.toFixed(4)),
    bonusPercentage,
    totalInvestment: amount,
  };
}

export function getInvestmentTier(amount: number, isAccredited: boolean = false): InvestmentTier {
  const tiers = isAccredited ? INVESTMENT_TIERS_ACCREDITED : INVESTMENT_TIERS_NON_ACCREDITED;
  let selectedTier = tiers[0];
  for (const tier of tiers) {
    if (amount >= tier.amount) {
      selectedTier = tier;
    }
  }
  return selectedTier;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
