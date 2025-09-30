import { motion } from "framer-motion";
import { useState } from "react";
import { UseInvestmentFormReturn } from "@/hooks/use-investment-form";
import { InvestorType } from "@shared/schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import IndividualForm from "./forms/IndividualForm";
import JointForm from "./forms/JointForm";
import CorporationForm from "./forms/CorporationForm";
import TrustForm from "./forms/TrustForm";
import IRAForm from "./forms/IRAForm";

interface InvestorInformationProps {
  formManager: UseInvestmentFormReturn;
}

const investorTypes: { value: InvestorType; label: string }[] = [
  { value: "individual", label: "Individual" },
  { value: "joint", label: "Joint (more than one individual)" },
  { value: "corporation", label: "Corporation" },
  { value: "trust", label: "Trust" },
  { value: "ira", label: "IRA" },
];

export default function InvestorInformation({ formManager }: InvestorInformationProps) {
  const { formData, updateInvestorInformation } = formManager;
  const [selectedType, setSelectedType] = useState<InvestorType>(
    formData.investorInformation?.type || "individual"
  );

  const renderForm = () => {
    const commonProps = { formManager, onUpdate: updateInvestorInformation };
    
    switch (selectedType) {
      case "individual":
        return <IndividualForm {...commonProps} />;
      case "joint":
        return <JointForm {...commonProps} />;
      case "corporation":
        return <CorporationForm {...commonProps} />;
      case "trust":
        return <TrustForm {...commonProps} />;
      case "ira":
        return <IRAForm {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Investor Type Selection */}
      <div>
        <p className="text-sm text-muted-foreground mb-4">Select an investor type.</p>
        
        <RadioGroup
          value={selectedType}
          onValueChange={(value) => setSelectedType(value as InvestorType)}
          className="space-y-3"
        >
          {investorTypes.map((type) => {
            const isSelected = selectedType === type.value;
            
            return (
              <div
                key={type.value}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedType(type.value as InvestorType)}
                data-testid={`investor-type-${type.value}`}
              >
                <RadioGroupItem 
                  value={type.value} 
                  id={type.value}
                  className="mr-4"
                />
                <Label 
                  htmlFor={type.value} 
                  className="cursor-pointer flex-1 font-normal"
                >
                  {type.label}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
        
        <p className="text-xs text-muted-foreground mt-2 text-right">
          No P.O. Boxes Allowed
        </p>
      </div>

      {/* Dynamic Form Content */}
      <motion.div
        key={selectedType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderForm()}
      </motion.div>
    </div>
  );
}
