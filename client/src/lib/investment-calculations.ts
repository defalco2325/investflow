import { InvestmentTier, InvestmentCalculation } from "@shared/schema";

export const INVESTMENT_TIERS: InvestmentTier[] = [
  { amount: 1500, bonusPercentage: 5, label: "MEMBER" },
  { amount: 3500, bonusPercentage: 10, label: "SELECT" },
  { amount: 7500, bonusPercentage: 15, label: "ELITE" },
  { amount: 9500, bonusPercentage: 25, label: "PREMIER" },
  { amount: 24950, bonusPercentage: 50, label: "PRESIDENTIAL" },
  { amount: 49500, bonusPercentage: 80, label: "TITANIUM" },
  { amount: 99500, bonusPercentage: 120, label: "IMPERIAL" },
  { amount: 199500, bonusPercentage: 150, label: "SOVEREIGN" },
];

export const SHARE_PRICE = 0.30;

export function calculateInvestment(amount: number): InvestmentCalculation {
  // Find the appropriate tier
  let bonusPercentage = 0;
  for (const tier of INVESTMENT_TIERS) {
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

export function getInvestmentTier(amount: number): InvestmentTier {
  let selectedTier = INVESTMENT_TIERS[0];
  for (const tier of INVESTMENT_TIERS) {
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
