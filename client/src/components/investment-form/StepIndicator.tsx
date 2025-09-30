import { motion } from "framer-motion";
import { Check, Edit } from "lucide-react";
import { UseInvestmentFormReturn, FormStep } from "@/hooks/use-investment-form";
import { Button } from "@/components/ui/button";

interface StepIndicatorProps {
  formManager: UseInvestmentFormReturn;
}

interface StepConfig {
  number: FormStep;
  title: string;
  description?: string;
}

const steps: StepConfig[] = [
  { number: 1, title: "Investor Profile" },
  { number: 2, title: "Investment Amount" },
  { number: 3, title: "Investor Information" },
];

export default function StepIndicator({ formManager }: StepIndicatorProps) {
  const { currentStep, isStepComplete, canGoToStep, goToStep, formData } = formManager;

  const getStepStatus = (stepNumber: FormStep) => {
    if (isStepComplete(stepNumber)) return "complete";
    if (currentStep === stepNumber) return "active";
    return "incomplete";
  };

  const handleEditStep = (stepNumber: FormStep) => {
    if (canGoToStep(stepNumber)) {
      goToStep(stepNumber);
    }
  };

  const getStepClasses = (status: string) => {
    switch (status) {
      case "complete":
        return "step-complete";
      case "active":
        return "step-active";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <motion.div 
      className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.number);
          const canEdit = canGoToStep(step.number) && isStepComplete(step.number);
          
          return (
            <div key={step.number} className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div 
                  className={`step-indicator w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getStepClasses(status)}`}
                  data-testid={`step-indicator-${step.number}`}
                >
                  {status === "complete" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    {step.title}
                  </span>
                  {step.number === 2 && formData.investmentAmount && (
                    <span className="text-xs text-muted-foreground">
                      ${formData.investmentAmount.amount.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              
              {canEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditStep(step.number)}
                  className="text-muted-foreground hover:text-foreground p-1"
                  data-testid={`edit-step-${step.number}`}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
              
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-border mx-4" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
