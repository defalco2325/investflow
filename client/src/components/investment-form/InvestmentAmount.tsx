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

  const selectedTier = PRICING_TIERS.find(t => t.amount === selectedAmount);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center text-xs sm:text-sm">
        <div>
          <p className="text-muted-foreground">Share Price</p>
          <p className="font-semibold">{formatCurrency(SHARE_PRICE)}</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Min Investment</p>
          <p className="font-semibold">{formatCurrency(999.90)}</p>
        </div>
      </motion.div>

      <RadioGroup value={selectedAmount.toString()} onValueChange={(val) => handleTierSelect(Number(val))}>
        <motion.div className="space-y-3" variants={containerVariants}>
          {PRICING_TIERS.map((tier) => {
            const isSelected = selectedAmount === tier.amount;
            const tierCalc = calculateInvestment(tier.amount);
            
            return (
              <motion.div
                key={tier.amount}
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 gap-2 sm:gap-0 rounded-lg border-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleTierSelect(tier.amount)}
                data-testid={`investment-tier-${tier.amount}`}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={tier.amount.toString()} id={`tier-${tier.amount}`} />
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{tier.label}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground line-through decoration-red-500">
                      ${(tier.amount / SHARE_PRICE).toLocaleString('en-US', {maximumFractionDigits: 0})}
                    </p>
                    <p className="text-xs sm:text-sm text-success">
                      {formatNumber(tierCalc.totalShares)} Shares
                    </p>
                  </div>
                </div>
                <div className="bg-[#E9A961] text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm whitespace-nowrap ml-auto sm:ml-0">
                  {tier.bonusPercentage}% Bonus Shares
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </RadioGroup>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="custom-amount" className="text-sm sm:text-base">Enter investment amount</Label>
        <div className="relative">
          <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground font-semibold text-sm sm:text-base">
            $
          </span>
          <Input
            id="custom-amount"
            type="text"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="pl-7 sm:pl-8 py-4 sm:py-6 text-base sm:text-lg bg-input border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            placeholder="25000"
            data-testid="input-custom-amount"
          />
        </div>
      </motion.div>

      {selectedAmount >= 999.90 && (
        <motion.div
          className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-border"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-xs sm:text-sm text-muted-foreground">Total Investment</p>
              <p className="text-base sm:text-lg font-semibold">{formatCurrency(selectedAmount)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs sm:text-sm text-muted-foreground">No. of Shares</p>
              <p className="text-base sm:text-lg font-semibold">{formatNumber(calculation.baseShares)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs sm:text-sm text-muted-foreground">Bonus Shares</p>
              <p className="text-base sm:text-lg font-semibold">
                <span className="text-success">({calculation.bonusPercentage}%)</span> {formatNumber(calculation.bonusShares)}
              </p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <p className="text-xs sm:text-sm text-muted-foreground">Effective Share Price</p>
              <p className="text-base sm:text-lg font-semibold flex items-center flex-wrap justify-end gap-1 sm:gap-2">
                <span className="text-muted-foreground line-through decoration-red-500 text-xs sm:text-sm">
                  {formatCurrency(SHARE_PRICE)}
                </span>
                <span className="text-success">{formatCurrency(calculation.effectivePrice)}</span>
              </p>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
            *Bonus Shares are not viewable at checkout because they are assigned at the offering's conclusion and
            reflected in your share total along with the shares you purchased.
          </p>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Button 
          onClick={handleContinue}
          className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold py-4 sm:py-6 rounded-lg transition-all duration-200 text-base sm:text-lg hover:scale-[1.02] active:scale-[0.98]"
          disabled={selectedAmount < 999.90}
          data-testid="button-continue-step2"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}
