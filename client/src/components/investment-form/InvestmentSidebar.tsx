import { motion } from "framer-motion";
import { InvestmentCalculation } from "@shared/schema";
import { INVESTMENT_TIERS, formatCurrency, formatNumber, SHARE_PRICE } from "@/lib/investment-calculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gift, TrendingUp } from "lucide-react";

interface InvestmentSidebarProps {
  calculation: InvestmentCalculation | null;
  selectedAmount?: number;
}

export default function InvestmentSidebar({ calculation, selectedAmount }: InvestmentSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Investment Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Investment Info */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">MIN INVESTMENT</span>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(999.90)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">OFFERING TYPE</span>
              <span className="text-sm font-medium text-foreground">Equity</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">SHARE PRICE</span>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(SHARE_PRICE)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">ASSET TYPE</span>
              <span className="text-sm font-medium text-foreground">
                Class AAA Common Stock
              </span>
            </div>
          </div>

          <Separator />

          {/* Investment Tiers */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Investment Packages
            </h4>
            
            <div className="space-y-3">
              {INVESTMENT_TIERS.filter(tier => tier.amount >= 999.90).map((tier) => {
                const isSelected = selectedAmount === tier.amount;
                
                return (
                  <motion.div
                    key={tier.amount}
                    className={`rounded-lg p-4 border transition-all ${
                      isSelected 
                        ? "bg-primary/10 border-primary/20" 
                        : "bg-secondary border-border"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    data-testid={`sidebar-tier-${tier.amount}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        Invest {formatCurrency(tier.amount)}
                      </span>
                      {tier.bonusPercentage > 0 && (
                        <Badge className="bonus-badge text-white text-xs">
                          <Gift className="w-3 h-3 mr-1" />
                          {tier.bonusPercentage}% Bonus Shares
                        </Badge>
                      )}
                    </div>
                    {isSelected && (
                      <div className="text-xs text-muted-foreground">
                        Selected Investment
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Investment Summary */}
          {calculation && (
            <motion.div
              className="pt-4 border-t border-border"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-md font-semibold text-foreground mb-4">
                Investment Summary
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Investment</span>
                  <span className="text-lg font-bold text-foreground">
                    {formatCurrency(calculation.totalInvestment)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">No. of Shares</span>
                  <span className="text-sm font-medium text-foreground">
                    {formatNumber(calculation.baseShares)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Bonus Shares</span>
                  <span className="text-sm font-medium text-success">
                    ({calculation.bonusPercentage}%) {formatNumber(calculation.bonusShares)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Shares</span>
                  <span className="text-sm font-bold text-foreground">
                    {formatNumber(calculation.totalShares)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Effective Share Price</span>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground line-through">
                      {formatCurrency(SHARE_PRICE)}
                    </span>
                    <span className="text-sm font-medium text-success ml-1">
                      {formatCurrency(calculation.effectivePrice)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
