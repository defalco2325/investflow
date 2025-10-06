import { useState, useCallback } from "react";
import { InvestmentFormData, InvestorType, InvestmentCalculation } from "@shared/schema";
import { calculateInvestment, INVESTMENT_TIERS } from "@/lib/investment-calculations";

export type FormStep = 1 | 2 | 3;

export interface UseInvestmentFormReturn {
  currentStep: FormStep;
  completedSteps: Set<FormStep>;
  formData: Partial<InvestmentFormData>;
  calculation: InvestmentCalculation | null;
  goToStep: (step: FormStep) => void;
  markStepComplete: (step: FormStep) => void;
  updateInvestorProfile: (data: InvestmentFormData['investorProfile']) => void;
  updateInvestmentAmount: (amount: number) => void;
  updateInvestorInformation: (data: InvestmentFormData['investorInformation']) => void;
  canGoToStep: (step: FormStep) => boolean;
  isStepComplete: (step: FormStep) => boolean;
  resetForm: () => void;
}

const initialFormData: Partial<InvestmentFormData> = {
  investmentAmount: {
    amount: 99500,
    tier: INVESTMENT_TIERS[INVESTMENT_TIERS.length - 1],
  },
};

export function useInvestmentForm(): UseInvestmentFormReturn {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<FormStep>>(new Set());
  const [formData, setFormData] = useState<Partial<InvestmentFormData>>(initialFormData);
  const [calculation, setCalculation] = useState<InvestmentCalculation | null>(
    calculateInvestment(99500, false)
  );

  const goToStep = useCallback((step: FormStep) => {
    if (canGoToStep(step)) {
      setCurrentStep(step);
    }
  }, []);

  const markStepComplete = useCallback((step: FormStep) => {
    setCompletedSteps(prev => new Set([...Array.from(prev), step]));
  }, []);

  const updateInvestorProfile = useCallback((data: InvestmentFormData['investorProfile']) => {
    setFormData(prev => ({
      ...prev,
      investorProfile: data,
    }));
    markStepComplete(1);
  }, [markStepComplete]);

  const updateInvestmentAmount = useCallback((amount: number) => {
    setFormData(prev => {
      const isAccredited = prev.investorProfile?.isAccredited || false;
      const tier = INVESTMENT_TIERS.find(t => t.amount === amount) || INVESTMENT_TIERS[0];
      const calc = calculateInvestment(amount, isAccredited);
      
      setCalculation(calc);
      
      return {
        ...prev,
        investmentAmount: {
          amount,
          tier,
        },
      };
    });
    
    markStepComplete(2);
  }, [markStepComplete]);

  const updateInvestorInformation = useCallback((data: InvestmentFormData['investorInformation']) => {
    setFormData(prev => ({
      ...prev,
      investorInformation: data,
    }));
    markStepComplete(3);
  }, [markStepComplete]);

  const canGoToStep = useCallback((step: FormStep): boolean => {
    if (step === 1) return true;
    if (step === 2) return completedSteps.has(1);
    if (step === 3) return completedSteps.has(1) && completedSteps.has(2);
    return false;
  }, [completedSteps]);

  const isStepComplete = useCallback((step: FormStep): boolean => {
    return completedSteps.has(step);
  }, [completedSteps]);

  const resetForm = useCallback(() => {
    setCurrentStep(1);
    setCompletedSteps(new Set());
    setFormData(initialFormData);
    setCalculation(calculateInvestment(99500, false));
  }, []);

  return {
    currentStep,
    completedSteps,
    formData,
    calculation,
    goToStep,
    markStepComplete,
    updateInvestorProfile,
    updateInvestmentAmount,
    updateInvestorInformation,
    canGoToStep,
    isStepComplete,
    resetForm,
  };
}
