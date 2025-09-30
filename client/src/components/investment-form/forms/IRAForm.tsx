import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { UseInvestmentFormReturn } from "@/hooks/use-investment-form";
import { iraInvestorSchema } from "@/lib/validation-schemas";
import { InvestorInformationData } from "@/types/investor";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES, getRegionLabel, getRegionOptions, getPostalCodeLabel } from "@/lib/countries";

interface IRAFormProps {
  formManager: UseInvestmentFormReturn;
  onUpdate: (data: InvestorInformationData) => void;
}

const IRA_TYPES = [
  "Traditional IRA",
  "Roth IRA",
  "SEP IRA",
  "SIMPLE IRA",
  "Self-Directed IRA"
];

export default function IRAForm({ formManager, onUpdate }: IRAFormProps) {
  const { formData } = formManager;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(iraInvestorSchema),
    defaultValues: {
      type: "ira" as const,
      streetAddress: formData.investorInformation?.streetAddress || "",
      apartmentUnit: formData.investorInformation?.apartmentUnit || "",
      city: formData.investorInformation?.city || "",
      zipCode: formData.investorInformation?.zipCode || "",
      state: formData.investorInformation?.state || "",
      country: formData.investorInformation?.country || "United States",
      dateOfBirth: formData.investorInformation?.dateOfBirth || "",
      tinOrSSN: formData.investorInformation?.tinOrSSN || "",
      custodianName: formData.investorInformation?.custodianName || "",
      accountNumber: formData.investorInformation?.accountNumber || "",
      iraType: formData.investorInformation?.iraType || "",
    },
  });

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    
    const submissionData = {
      ...formData.investorProfile,
      investmentAmount: formData.investmentAmount?.amount,
      sharePrice: 0.30,
      baseShares: formManager.calculation?.baseShares || 0,
      bonusShares: formManager.calculation?.bonusShares || 0,
      totalShares: formManager.calculation?.totalShares || 0,
      effectiveSharePrice: formManager.calculation?.effectivePrice || 0,
      bonusPercentage: formManager.calculation?.bonusPercentage || 0,
      investorType: "ira",
      investorInformation: data,
    };

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
          {/* IRA Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="iraType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IRA Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="premium-input" data-testid="select-ira-type">
                        <SelectValue placeholder="Select IRA Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {IRA_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
              name="custodianName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custodian Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="premium-input"
                      placeholder="Custodian Name"
                      data-testid="input-custodian-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IRA Account Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="premium-input"
                    placeholder="Account Number"
                    data-testid="input-account-number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      className="premium-input"
                      placeholder="Street Address"
                      data-testid="input-ira-street-address"
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
                      className="premium-input"
                      placeholder="Apt. or Unit"
                      data-testid="input-ira-apartment-unit"
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
                      className="premium-input"
                      placeholder="City"
                      data-testid="input-ira-city"
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
                      className="premium-input"
                      placeholder={getPostalCodeLabel(form.watch("country") || "United States")}
                      data-testid="input-ira-zip-code"
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
                      <SelectTrigger className="premium-input" data-testid="select-ira-country">
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
                          <SelectTrigger className="premium-input" data-testid="select-ira-state">
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
                          className="premium-input"
                          placeholder={regionLabel}
                          data-testid="input-ira-state-region"
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Personal Information */}
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
                      className="premium-input"
                      data-testid="input-ira-date-of-birth"
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
                  <FormLabel>TIN or SSN</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="premium-input"
                      placeholder="TIN or SSN"
                      onChange={(e) => {
                        const formatted = formatSSN(e.target.value);
                        field.onChange(formatted);
                      }}
                      data-testid="input-ira-tin-ssn"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="premium-button w-full"
            disabled={isSubmitting}
            data-testid="button-submit-ira-investment"
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            You will be forwarded to Deal Maker to complete your transaction
          </p>
        </form>
      </Form>
    </motion.div>
  );
}
