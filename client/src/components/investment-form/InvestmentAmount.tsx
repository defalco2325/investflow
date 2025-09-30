import { motion } from "framer-motion";
import { useState } from "react";
import { UseInvestmentFormReturn } from "@/hooks/use-investment-form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatNumber, calculateInvestment, SHARE_PRICE } from "@/lib/investment-calculations";

interface InvestmentAmountProps {
  formManager: UseInvestmentFormReturn;
}

// Specific pricing tiers from the design
const PRICING_TIERS = [
  { amount: 1500, bonusPercentage: 5, label: "$1,500" },
  { amount: 3500, bonusPercentage: 10, label: "$3,500" },
  { amount: 7500, bonusPercentage: 15, label: "$7,500" },
  { amount: 9500, bonusPercentage: 25, label: "$9,500" },
  { amount: 24950, bonusPercentage: 50, label: "$24,950" },
  { amount: 49500, bonusPercentage: 80, label: "$49,500" },
  { amount: 99500, bonusPercentage: 120, label: "$99,500" },
];

export default function InvestmentAmount({ formManager }: InvestmentAmountProps) {
  const { updateInvestmentAmount, formData } = formManager;
  const [selectedAmount, setSelectedAmount] = useState(formData.investmentAmount?.amount || 99500);
  const [customAmount, setCustomAmount] = useState("");

  const calculation = calculateInvestment(selectedAmount);

  const handleTierSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (!isNaN(numValue) && numValue >= 999.90) {
      setSelectedAmount(numValue);
      setCustomAmount(value);
    } else {
      setCustomAmount(value);
    }
  };

  const handleContinue = () => {
    if (selectedAmount >= 999.90) {
      updateInvestmentAmount(selectedAmount);
    }
  };

  // Find selected tier for bonus percentage display
  const selectedTier = PRICING_TIERS.find(t => t.amount === selectedAmount);

  return (
    <div className="space-y-6">
      {/* Share Price and Min Investment */}
      <div className="flex justify-between items-center text-sm">
        <div>
          <p className="text-muted-foreground">Share Price</p>
          <p className="font-semibold">{formatCurrency(SHARE_PRICE)}</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Min Investment</p>
          <p className="font-semibold">{formatCurrency(999.90)}</p>
        </div>
      </div>

      {/* Pricing Tiers */}
      <RadioGroup value={selectedAmount.toString()} onValueChange={(val) => handleTierSelect(Number(val))}>
        <div className="space-y-3">
          {PRICING_TIERS.map((tier) => {
            const isSelected = selectedAmount === tier.amount;
            const tierCalc = calculateInvestment(tier.amount);
            
            return (
              <div
                key={tier.amount}
                className={`relative flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleTierSelect(tier.amount)}
                data-testid={`investment-tier-${tier.amount}`}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={tier.amount.toString()} id={`tier-${tier.amount}`} />
                  <div>
                    <p className="font-semibold">{tier.label}</p>
                    <p className="text-sm text-success line-through text-muted-foreground">
                      ${(tier.amount / SHARE_PRICE).toLocaleString('en-US', {maximumFractionDigits: 0})}
                    </p>
                    <p className="text-sm text-success">
                      {formatNumber(tierCalc.totalShares)} Shares
                    </p>
                  </div>
                </div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap">
                  {tier.bonusPercentage}% Bonus Shares
                </div>
              </div>
            );
          })}
        </div>
      </RadioGroup>

      {/* Custom Amount Input */}
      <div className="space-y-2">
        <Label htmlFor="custom-amount">Enter investment amount</Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground font-semibold">
            $
          </span>
          <Input
            id="custom-amount"
            type="text"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="pl-8 py-6 text-lg bg-input border-border"
            placeholder="25000"
            data-testid="input-custom-amount"
          />
        </div>
      </div>

      {/* Calculation Summary */}
      {selectedAmount >= 999.90 && (
        <motion.div
          className="space-y-4 pt-4 border-t border-border"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Total Investment</p>
              <p className="text-lg font-semibold">{formatCurrency(selectedAmount)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">No. of Shares</p>
              <p className="text-lg font-semibold">{formatNumber(calculation.baseShares)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Bonus Shares</p>
              <p className="text-lg font-semibold text-success">
                ({calculation.bonusPercentage}%) {formatNumber(calculation.bonusShares)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Effective Share Price</p>
              <p className="text-lg font-semibold">
                <span className="text-muted-foreground line-through text-sm mr-2">
                  {formatCurrency(SHARE_PRICE)}
                </span>
                <span className="text-success">{formatCurrency(calculation.effectivePrice)}</span>
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            *Bonus Shares are not viewable at checkout because they are assigned at the offering's conclusion and
            reflected in your share total along with the shares you purchased.
          </p>
        </motion.div>
      )}

      <Button 
        onClick={handleContinue}
        className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold py-6 rounded-lg transition-all text-lg"
        disabled={selectedAmount < 999.90}
        data-testid="button-continue-step2"
      >
        Continue
      </Button>
    </div>
  );
}
