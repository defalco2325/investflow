import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { UseInvestmentFormReturn } from "@/hooks/use-investment-form";
import { individualInvestorSchema } from "@/lib/validation-schemas";
import { InvestorInformationData } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface IndividualFormProps {
  formManager: UseInvestmentFormReturn;
  onUpdate: (data: InvestorInformationData) => void;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const COUNTRIES = ["United States", "Canada"];

export default function IndividualForm({ formManager, onUpdate }: IndividualFormProps) {
  const { formData } = formManager;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(individualInvestorSchema),
    defaultValues: {
      type: "individual" as const,
      streetAddress: formData.investorInformation?.streetAddress || "",
      apartmentUnit: formData.investorInformation?.apartmentUnit || "",
      city: formData.investorInformation?.city || "",
      zipCode: formData.investorInformation?.zipCode || "",
      state: formData.investorInformation?.state || "",
      country: formData.investorInformation?.country || "United States",
      dateOfBirth: formData.investorInformation?.dateOfBirth || "",
      tinOrSSN: formData.investorInformation?.tinOrSSN || "",
    },
  });

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Combine all form data
    const submissionData = {
      ...formData.investorProfile,
      investmentAmount: formData.investmentAmount?.amount,
      sharePrice: 0.30,
      baseShares: formManager.calculation?.baseShares || 0,
      bonusShares: formManager.calculation?.bonusShares || 0,
      totalShares: formManager.calculation?.totalShares || 0,
      effectiveSharePrice: formManager.calculation?.effectivePrice || 0,
      bonusPercentage: formManager.calculation?.bonusPercentage || 0,
      investorType: "individual",
      investorInformation: data,
    };

    // Log submission data (frontend-only)
    console.log("Investment Form Submitted:", submissionData);
    
    toast({
      title: "Investment Form Complete",
      description: "Your investment information has been collected successfully. In production, you would be forwarded to Deal Maker to complete your transaction.",
    });
    
    setIsSubmitting(false);
    onUpdate(data);
  };

  const formatSSN = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 9)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Address Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-input border-border"
                      placeholder="Street Address"
                      data-testid="input-street-address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apartmentUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apt. or Unit (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-input border-border"
                      placeholder="Apt. or Unit"
                      data-testid="input-apartment-unit"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-input border-border"
                      placeholder="City"
                      data-testid="input-city"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-input border-border"
                      placeholder="Zip Code"
                      data-testid="input-zip-code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input border-border" data-testid="select-state">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input border-border" data-testid="select-country">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      className="bg-input border-border"
                      data-testid="input-date-of-birth"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end items-center">
              <Button
                type="button"
                variant="link"
                className="text-xs text-primary hover:underline p-0"
                onClick={() => toast({
                  title: "Information Required",
                  description: "This information is required for regulatory compliance and investor verification purposes.",
                })}
                data-testid="button-why-info-needed"
              >
                <HelpCircle className="w-3 h-3 mr-1" />
                Why do we need this information?
              </Button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="tinOrSSN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TIN or SSN</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-input border-border"
                    placeholder="TIN or SSN"
                    onChange={(e) => {
                      const formatted = formatSSN(e.target.value);
                      field.onChange(formatted);
                    }}
                    data-testid="input-tin-ssn"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold py-4 sm:py-6 rounded-lg transition-all text-base sm:text-lg"
            disabled={isSubmitting}
            data-testid="button-submit-investment"
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </Button>
          
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
            You will be forwarded to Deal Maker to complete your transaction
          </p>
        </form>
      </Form>
    </motion.div>
  );
}
