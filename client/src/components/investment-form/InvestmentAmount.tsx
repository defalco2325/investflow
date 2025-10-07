import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UseInvestmentFormReturn } from "@/hooks/use-investment-form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatNumber, calculateInvestment, SHARE_PRICE } from "@/lib/investment-calculations";
import { CountUpNumber } from "./CountUpNumber";

interface InvestmentAmountProps {
  formManager: UseInvestmentFormReturn;
  onAmountChange?: (amount: number) => void;
  onComplete?: () => void;
}

const PRICING_TIERS_NON_ACCREDITED = [
  { amount: 1000, bonusPercentage: 5, label: "MEMBER", displayAmount: "$1,000" },
  { amount: 2500, bonusPercentage: 10, label: "SELECT", displayAmount: "$2,500" },
  { amount: 5000, bonusPercentage: 25, label: "ELITE", displayAmount: "$5,000" },
  { amount: 10000, bonusPercentage: 50, label: "PREMIER", displayAmount: "$10,000" },
  { amount: 25000, bonusPercentage: 80, label: "PRESIDENTIAL", displayAmount: "$25,000" },
];

const PRICING_TIERS_ACCREDITED = [
  { amount: 10000, bonusPercentage: 5, label: "MEMBER", displayAmount: "$10,000" },
  { amount: 25000, bonusPercentage: 10, label: "SELECT", displayAmount: "$25,000" },
  { amount: 50000, bonusPercentage: 25, label: "ELITE", displayAmount: "$50,000" },
  { amount: 100000, bonusPercentage: 50, label: "PREMIER", displayAmount: "$100,000" },
  { amount: 200000, bonusPercentage: 80, label: "PRESIDENTIAL", displayAmount: "$200,000" },
];

export default function InvestmentAmount({ formManager, onAmountChange, onComplete }: InvestmentAmountProps) {
  const { updateInvestmentAmount, formData } = formManager;
  const isAccredited = formData.investorProfile?.isAccredited || false;
  const PRICING_TIERS = isAccredited ? PRICING_TIERS_ACCREDITED : PRICING_TIERS_NON_ACCREDITED;
  const [selectedAmount, setSelectedAmount] = useState<number | null>(formData.investmentAmount?.amount || null);
  const [customAmount, setCustomAmount] = useState("");

  const calculation = selectedAmount ? calculateInvestment(selectedAmount, isAccredited) : null;

  const handleTierSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
    onAmountChange?.(amount);
  };
  
  // Notify parent when amount changes
  useEffect(() => {
    if (selectedAmount) {
      onAmountChange?.(selectedAmount);
    }
  }, [selectedAmount, onAmountChange]);

  const handleCustomAmountChange = (value: string) => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (!isNaN(numValue) && numValue >= 999.90) {
      setSelectedAmount(numValue);
      setCustomAmount(value);
      onAmountChange?.(numValue);
    } else {
      setCustomAmount(value);
    }
  };

  const handleContinue = () => {
    if (selectedAmount && selectedAmount >= 999.90) {
      updateInvestmentAmount(selectedAmount);
      onComplete?.();
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

  const getBonusBadgeColor = (index: number) => {
    const colors = [
      'bg-yellow-300',
      'bg-yellow-400',
      'bg-orange-500',
      'bg-orange-600',
      'bg-orange-700'
    ];
    return colors[index] || colors[colors.length - 1];
  };

  return (
    <>
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

      <RadioGroup value={selectedAmount?.toString() || ""} onValueChange={(val) => handleTierSelect(Number(val))}>
        <motion.div className="space-y-3" variants={containerVariants}>
          {PRICING_TIERS.map((tier, index) => {
            const isSelected = selectedAmount === tier.amount;
            const tierCalc = calculateInvestment(tier.amount, isAccredited);
            
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
                    <p className="font-semibold text-base sm:text-lg">{tier.displayAmount} <span className="text-xs sm:text-sm font-bold text-black">({tier.label})</span></p>
                    <p className="text-xs sm:text-sm text-muted-foreground line-through decoration-red-500">
                      {formatNumber(tierCalc.baseShares)} Shares
                    </p>
                    <p className="text-xs sm:text-sm text-success font-medium">
                      {formatNumber(tierCalc.totalShares)} Shares
                    </p>
                  </div>
                </div>
                <div className={`${getBonusBadgeColor(index)} text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm whitespace-nowrap ml-auto sm:ml-0 shadow-md`}>
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

      {selectedAmount && selectedAmount >= 999.90 && calculation && (
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
              <p className="text-xs sm:text-sm text-muted-foreground">Bonus Shares</p>
              <p className="text-base sm:text-lg font-semibold">
                <span className="text-success">({calculation.bonusPercentage}%)</span>{" "}
                <CountUpNumber 
                  end={calculation.bonusShares} 
                  duration={600}
                  decimals={0}
                  className="text-foreground"
                />
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs sm:text-sm text-muted-foreground">Total Shares</p>
              <p className="text-base sm:text-lg font-semibold">
                {formatNumber(calculation.totalShares)}
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
            className="w-full bg-primary hover:opacity-90 text-black font-semibold py-4 sm:py-6 rounded-lg transition-all duration-200 text-base sm:text-lg hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            disabled={!selectedAmount || selectedAmount < 999.90}
            data-testid="button-continue-step2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
            <span className="relative z-10">Continue</span>
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
}
