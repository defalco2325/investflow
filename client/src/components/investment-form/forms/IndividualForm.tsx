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
import { COUNTRIES, getRegionLabel, getRegionOptions, getPostalCodeLabel } from "@/lib/countries";

interface IndividualFormProps {
  formManager: UseInvestmentFormReturn;
  onUpdate: (data: InvestorInformationData) => void;
}

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
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
                  <FormLabel>{getPostalCodeLabel(form.watch("country") || "United States")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-input border-border"
                      placeholder={getPostalCodeLabel(form.watch("country") || "United States")}
                      data-testid="input-zip-code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("state", "");
                    }} 
                    defaultValue={field.value}
                  >
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

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => {
                const selectedCountry = form.watch("country") || "United States";
                const regionOptions = getRegionOptions(selectedCountry);
                const regionLabel = getRegionLabel(selectedCountry);
                
                return (
                  <FormItem>
                    <FormLabel>{regionLabel}</FormLabel>
                    {regionOptions.length > 0 ? (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-input border-border" data-testid="select-state">
                            <SelectValue placeholder={`Select ${regionLabel}`} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regionOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-input border-border"
                          placeholder={regionLabel}
                          data-testid="input-state-region"
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="min-h-5">Date of Birth</FormLabel>
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

            <FormField
              control={form.control}
              name="tinOrSSN"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between min-h-5">
                    <FormLabel>TIN or SSN</FormLabel>
                    <Button
                      type="button"
                      variant="link"
                      className="text-xs text-primary hover:underline p-0 h-auto"
                      onClick={() => toast({
                        title: "Information Required",
                        description: "This information is required for regulatory compliance and investor verification purposes.",
                      })}
                      data-testid="button-why-info-needed"
                    >
                      <HelpCircle className="w-3 h-3 mr-1" />
                      Why do we need this info?
                    </Button>
                  </div>
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
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:opacity-90 text-black font-semibold py-4 sm:py-6 rounded-lg transition-all text-base sm:text-lg relative overflow-hidden"
            disabled={isSubmitting}
            data-testid="button-submit-investment"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-continuous"></span>
            <span className="relative z-10">{isSubmitting ? "Submitting..." : "Continue"}</span>
          </Button>
          
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
            You will be forwarded to Deal Maker to complete your transaction
          </p>
        </form>
      </Form>
    </motion.div>
  );
}
