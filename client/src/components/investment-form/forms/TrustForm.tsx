import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { UseInvestmentFormReturn } from "@/hooks/use-investment-form";
import { trustInvestorSchema } from "@/lib/validation-schemas";
import { InvestorInformationData } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES, getRegionLabel, getRegionOptions, getPostalCodeLabel } from "@/lib/countries";

interface TrustFormProps {
  formManager: UseInvestmentFormReturn;
  onUpdate: (data: InvestorInformationData) => void;
}

export default function TrustForm({ formManager, onUpdate }: TrustFormProps) {
  const { formData } = formManager;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(trustInvestorSchema),
    defaultValues: {
      type: "trust" as const,
      streetAddress: formData.investorInformation?.streetAddress || "",
      apartmentUnit: formData.investorInformation?.apartmentUnit || "",
      city: formData.investorInformation?.city || "",
      zipCode: formData.investorInformation?.zipCode || "",
      state: formData.investorInformation?.state || "",
      country: formData.investorInformation?.country || "United States",
      entityName: formData.investorInformation?.entityName || "",
      taxId: formData.investorInformation?.taxId || "",
      authorizedSignatory: formData.investorInformation?.authorizedSignatory || "",
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
      investorType: "trust",
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

  const formatTaxId = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 9)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="entityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trust Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="premium-input"
                    placeholder="Trust Name"
                    data-testid="input-trust-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      className="premium-input"
                      placeholder="Street Address"
                      data-testid="input-trust-street-address"
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
                  <FormLabel>Suite/Floor (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="premium-input"
                      placeholder="Suite/Floor"
                      data-testid="input-trust-suite"
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
                      className="premium-input"
                      placeholder="City"
                      data-testid="input-trust-city"
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
                      data-testid="input-trust-zip-code"
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
                      <SelectTrigger className="premium-input" data-testid="select-trust-country">
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
                          <SelectTrigger className="premium-input" data-testid="select-trust-state">
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
                          data-testid="input-trust-state-region"
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
              name="taxId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Federal Tax ID (EIN)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="premium-input"
                      placeholder="XX-XXXXXXX"
                      onChange={(e) => {
                        const formatted = formatTaxId(e.target.value);
                        field.onChange(formatted);
                      }}
                      data-testid="input-trust-tax-id"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorizedSignatory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trustee/Authorized Signatory</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="premium-input"
                      placeholder="Trustee Name"
                      data-testid="input-trust-trustee"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="premium-button w-full relative overflow-hidden"
            disabled={isSubmitting}
            data-testid="button-submit-trust-investment"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-continuous"></span>
            <span className="relative z-10">{isSubmitting ? "Submitting..." : "Continue"}</span>
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            You will be forwarded to Deal Maker to complete your transaction
          </p>
        </form>
      </Form>
    </motion.div>
  );
}
