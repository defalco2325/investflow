import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle, Edit2 } from "lucide-react";
import { useInvestmentForm } from "@/hooks/use-investment-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import InvestorProfile from "./InvestorProfile";
import InvestmentAmount from "./InvestmentAmount";
import InvestorInformation from "./InvestorInformation";
import { formatCurrency } from "@/lib/investment-calculations";

export default function InvestmentForm() {
  const formManager = useInvestmentForm();
  const [openStep, setOpenStep] = useState<string>("step-1");

  // Auto-expand next step when current step is completed
  useEffect(() => {
    if (formManager.isStepComplete(1) && !formManager.isStepComplete(2) && openStep === "step-1") {
      setOpenStep("step-2");
    } else if (formManager.isStepComplete(2) && !formManager.isStepComplete(3) && openStep === "step-2") {
      setOpenStep("step-3");
    }
  }, [formManager.completedSteps]);

  // Handle accordion value change with gating
  const handleAccordionChange = (value: string) => {
    // Allow opening step-1 anytime
    if (value === "step-1") {
      setOpenStep(value);
      return;
    }
    
    // Only allow opening step-2 if step-1 is complete
    if (value === "step-2" && !formManager.isStepComplete(1)) {
      return;
    }
    
    // Only allow opening step-3 if step-2 is complete
    if (value === "step-3" && !formManager.isStepComplete(2)) {
      return;
    }
    
    setOpenStep(value);
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-4 bg-background">
      <div className="max-w-xl mx-auto">
        {/* Accordion Form */}
        <motion.div
          className="bg-card rounded-lg shadow-sm border border-border overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible value={openStep} onValueChange={handleAccordionChange} className="w-full">
            {/* Step 1: Investor Profile */}
            <AccordionItem value="step-1" className="border-b border-border">
              <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-2 sm:pr-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-base sm:text-lg font-semibold">1. Investor Profile</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {formManager.isStepComplete(1) ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" data-testid="step-1-complete" />
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
            </AccordionItem>

            {/* Step 2: Investment Amount */}
            <AccordionItem value="step-2" className="border-b border-border">
              <AccordionTrigger 
                className={`px-4 sm:px-6 py-3 sm:py-4 hover:no-underline ${
                  !formManager.isStepComplete(1) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
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
                  <InvestmentAmount formManager={formManager} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 3: Investor Information */}
            <AccordionItem value="step-3" className="border-b-0">
              <AccordionTrigger 
                className={`px-4 sm:px-6 py-3 sm:py-4 hover:no-underline ${
                  !formManager.isStepComplete(2) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="flex items-center justify-between w-full pr-2 sm:pr-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-base sm:text-lg font-semibold">3. Investor Information</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {formManager.isStepComplete(3) && (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" data-testid="step-3-complete" />
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <InvestorInformation formManager={formManager} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
