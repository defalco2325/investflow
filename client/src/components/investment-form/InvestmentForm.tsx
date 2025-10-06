import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { CheckCircle, Edit2 } from "lucide-react";
import { useInvestmentForm } from "@/hooks/use-investment-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import InvestorProfile from "./InvestorProfile";
import InvestmentAmount from "./InvestmentAmount";
import InvestorInformation from "./InvestorInformation";
import { CountUpNumber } from "./CountUpNumber";
import { formatCurrency, formatNumber, calculateInvestment, SHARE_PRICE } from "@/lib/investment-calculations";

export default function InvestmentForm() {
  const formManager = useInvestmentForm();
  const [openStep, setOpenStep] = useState<string>("step-1");
  const [currentAmount, setCurrentAmount] = useState<number | null>(null);
  
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  // Auto-expand next step when current step is completed
  useEffect(() => {
    if (formManager.isStepComplete(1) && !formManager.isStepComplete(2) && openStep === "step-1") {
      setOpenStep("step-2");
    } else if (formManager.isStepComplete(2) && !formManager.isStepComplete(3) && openStep === "step-2") {
      setOpenStep("step-3");
    }
  }, [formManager.completedSteps]);

  // Scroll to step when it opens
  useEffect(() => {
    const scrollToStep = () => {
      let ref;
      if (openStep === "step-1") ref = step1Ref;
      else if (openStep === "step-2") ref = step2Ref;
      else if (openStep === "step-3") ref = step3Ref;
      
      if (ref?.current) {
        // Use nearest to ensure it scrolls into view, and start to align to top
        ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        // Then scroll window to ensure the step header is at the top
        setTimeout(() => {
          const rect = ref.current?.getBoundingClientRect();
          if (rect) {
            window.scrollBy({ top: rect.top - 20, behavior: "smooth" });
          }
        }, 50);
      }
    };
    
    // Delay to allow accordion animation to complete
    const timer = setTimeout(scrollToStep, 300);
    return () => clearTimeout(timer);
  }, [openStep]);

  // Handle accordion value change with gating logic
  const handleAccordionChange = (value: string) => {
    // Gate Step 2 - can only open if Step 1 is complete
    if (value === "step-2" && !formManager.isStepComplete(1)) {
      return;
    }
    
    // Gate Step 3 - can only open if Step 2 is complete
    if (value === "step-3" && !formManager.isStepComplete(2)) {
      return;
    }
    
    setOpenStep(value);
  };

  // Callback to receive live investment amount updates from InvestmentAmount component
  const handleAmountChange = (amount: number) => {
    setCurrentAmount(amount);
  };

  // Determine which amount to display in sticky footer
  // On Step 2: use live currentAmount for real-time updates
  // On Step 3: use saved formData amount since user is no longer editing
  const displayAmount = useMemo(() => {
    if (openStep === "step-2" && currentAmount !== null && currentAmount >= 999.90) {
      return currentAmount;
    }
    if (openStep === "step-3" && formManager.formData.investmentAmount?.amount) {
      return formManager.formData.investmentAmount.amount;
    }
    return null;
  }, [openStep, currentAmount, formManager.formData.investmentAmount?.amount]);

  // Calculate investment details for sticky footer
  const calculation = useMemo(() => {
    const isAccredited = formManager.formData.investorProfile?.isAccredited || false;
    return displayAmount ? calculateInvestment(displayAmount, isAccredited) : null;
  }, [displayAmount, formManager.formData.investorProfile?.isAccredited]);

  return (
    <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-4 bg-background">
      <div className="max-w-xl mx-auto">
        {/* Accordion Form */}
        <motion.div
          className="bg-card rounded-lg shadow-sm border border-border relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible value={openStep} onValueChange={handleAccordionChange} className="w-full">
            {/* Step 1: Investor Profile */}
            <AccordionItem value="step-1" className="border-b border-border">
              <div ref={step1Ref}>
                <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-2 sm:pr-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-base sm:text-lg font-semibold">1. Investor Profile</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      {formManager.isStepComplete(1) ? (
                        <>
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" data-testid="step-1-complete" />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenStep("step-1");
                            }}
                            className="p-1 hover:bg-secondary rounded"
                            data-testid="edit-step-1"
                          >
                            <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </>
                      ) : (
                        <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">Incomplete</span>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <InvestorProfile formManager={formManager} />
                </div>
              </AccordionContent>
              </div>
            </AccordionItem>

            {/* Step 2: Investment Amount */}
            <AccordionItem value="step-2" className="border-b border-border">
              <div ref={step2Ref}>
                <AccordionTrigger 
                  className={`px-4 sm:px-6 py-3 sm:py-4 hover:no-underline ${!formManager.isStepComplete(1) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!formManager.isStepComplete(1)}
                >
                  <div className="flex items-center justify-between w-full pr-2 sm:pr-4">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap">
                      <span className="text-base sm:text-lg font-semibold">2. Investment Amount</span>
                      {formManager.isStepComplete(2) && formManager.formData.investmentAmount && (
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {formatCurrency(formManager.formData.investmentAmount.amount)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      {formManager.isStepComplete(2) && (
                        <>
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" data-testid="step-2-complete" />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenStep("step-2");
                            }}
                            className="p-1 hover:bg-secondary rounded"
                            data-testid="edit-step-2"
                          >
                            <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </>
                      )}
                    </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <InvestmentAmount formManager={formManager} onAmountChange={handleAmountChange} />
                </div>
              </AccordionContent>
              </div>
            </AccordionItem>

            {/* Step 3: Investor Information */}
            <AccordionItem value="step-3" className="border-b-0">
              <div ref={step3Ref}>
                <AccordionTrigger 
                  className={`px-4 sm:px-6 py-3 sm:py-4 hover:no-underline ${!formManager.isStepComplete(2) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!formManager.isStepComplete(2)}
                >
                  <div className="flex items-center justify-between w-full pr-2 sm:pr-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-base sm:text-lg font-semibold">3. Investor Information</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      {formManager.isStepComplete(3) && (
                        <>
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" data-testid="step-3-complete" />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenStep("step-3");
                            }}
                            className="p-1 hover:bg-secondary rounded"
                            data-testid="edit-step-3"
                          >
                            <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <InvestorInformation formManager={formManager} />
                </div>
              </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>

          {/* Sticky Investment Summary - Shows on Step 2 and Step 3 */}
          {(openStep === "step-2" || openStep === "step-3") && (
            <div className="sticky bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg p-4 z-50 -mx-px" data-testid="sticky-investment-summary">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Total Investment</p>
                  <p className="text-sm font-semibold">
                    {displayAmount ? formatCurrency(displayAmount) : "$0.00"}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Bonus Shares</p>
                  <p className="text-sm font-semibold">
                    {calculation ? (
                      <>
                        <span className="text-success">({calculation.bonusPercentage}%)</span>{" "}
                        <CountUpNumber 
                          end={calculation.bonusShares} 
                          duration={600}
                          decimals={0}
                        />
                      </>
                    ) : (
                      <span>(0%) 0</span>
                    )}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Total Shares</p>
                  <p className="text-sm font-semibold">
                    {calculation ? (
                      <CountUpNumber 
                        end={calculation.totalShares} 
                        duration={600}
                        decimals={0}
                      />
                    ) : "0"}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Effective Share Price</p>
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <span className="text-muted-foreground line-through decoration-red-500 text-xs">
                      {formatCurrency(SHARE_PRICE)}
                    </span>
                    <span className="text-success">
                      {calculation ? formatCurrency(calculation.effectivePrice) : formatCurrency(SHARE_PRICE)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
