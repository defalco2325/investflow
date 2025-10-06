import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { UseInvestmentFormReturn } from "@/hooks/use-investment-form";
import { jointInvestorSchema } from "@/lib/validation-schemas";
import { InvestorInformationData } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HelpCircle, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES, getRegionLabel, getRegionOptions, getPostalCodeLabel } from "@/lib/countries";

interface JointFormProps {
  formManager: UseInvestmentFormReturn;
  onUpdate: (data: InvestorInformationData) => void;
}

const JOINT_HOLDING_TYPES = [
  "Joint Tenants with Rights of Survivorship",
  "Tenants in Common",
  "Community Property",
  "Tenants by the Entirety"
];

export default function JointForm({ formManager, onUpdate }: JointFormProps) {
  const { formData } = formManager;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(jointInvestorSchema),
    defaultValues: {
      type: "joint" as const,
      streetAddress: formData.investorInformation?.streetAddress || "",
      apartmentUnit: formData.investorInformation?.apartmentUnit || "",
      city: formData.investorInformation?.city || "",
      zipCode: formData.investorInformation?.zipCode || "",
      state: formData.investorInformation?.state || "",
      country: formData.investorInformation?.country || "United States",
      dateOfBirth: formData.investorInformation?.dateOfBirth || "",
      tinOrSSN: formData.investorInformation?.tinOrSSN || "",
      jointHoldingType: formData.investorInformation?.jointHoldingType || "",
      secondInvestor: formData.investorInformation?.secondInvestor || {
        firstName: "",
        lastName: "",
        streetAddress: "",
        apartmentUnit: "",
        city: "",
        zipCode: "",
        state: "",
        country: "United States",
        dateOfBirth: "",
        tinOrSSN: "",
      },
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
      investorType: "joint",
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="jointHoldingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Joint Holding Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="premium-input" data-testid="select-joint-holding-type">
                      <SelectValue placeholder="Select Joint Holding Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {JOINT_HOLDING_TYPES.map((type) => (
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

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <h4 className="text-md font-semibold text-foreground">Investor 1</h4>
              <span className="text-xs text-muted-foreground">No P.O. Boxes Allowed</span>
            </div>

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
                        data-testid="input-investor1-street-address"
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
                        data-testid="input-investor1-apartment-unit"
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
                        data-testid="input-investor1-city"
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
                        data-testid="input-investor1-zip-code"
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
                        <SelectTrigger className="premium-input" data-testid="select-investor1-country">
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
                            <SelectTrigger className="premium-input" data-testid="select-investor1-state">
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
                            data-testid="input-investor1-state-region"
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
                        className="premium-input"
                        data-testid="input-investor1-date-of-birth"
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
                        className="premium-input"
                        placeholder="TIN or SSN"
                        onChange={(e) => {
                          const formatted = formatSSN(e.target.value);
                          field.onChange(formatted);
                        }}
                        data-testid="input-investor1-tin-ssn"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Joint Holder Information</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <FormField
                control={form.control}
                name="secondInvestor.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="premium-input"
                        placeholder="First Name"
                        data-testid="input-investor2-first-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondInvestor.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="premium-input"
                        placeholder="Last Name"
                        data-testid="input-investor2-last-name"
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
                name="secondInvestor.streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="premium-input"
                        placeholder="Street Address"
                        data-testid="input-investor2-street-address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondInvestor.apartmentUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apt. or Unit (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="premium-input"
                        placeholder="Apt. or Unit"
                        data-testid="input-investor2-apartment-unit"
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
                name="secondInvestor.city"
                render={({ field}) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="premium-input"
                        placeholder="City"
                        data-testid="input-investor2-city"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondInvestor.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getPostalCodeLabel(form.watch("secondInvestor.country") || "United States")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="premium-input"
                        placeholder={getPostalCodeLabel(form.watch("secondInvestor.country") || "United States")}
                        data-testid="input-investor2-zip-code"
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
                name="secondInvestor.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("secondInvestor.state", "");
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="premium-input" data-testid="select-investor2-country">
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
                name="secondInvestor.state"
                render={({ field }) => {
                  const selectedCountry = form.watch("secondInvestor.country") || "United States";
                  const regionOptions = getRegionOptions(selectedCountry);
                  const regionLabel = getRegionLabel(selectedCountry);
                  
                  return (
                    <FormItem>
                      <FormLabel>{regionLabel}</FormLabel>
                      {regionOptions.length > 0 ? (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="premium-input" data-testid="select-investor2-state">
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
                            data-testid="input-investor2-state-region"
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
                name="secondInvestor.dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="min-h-5">Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="premium-input"
                        data-testid="input-investor2-date-of-birth"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end items-center">
                <span className="text-xs text-muted-foreground">
                  Same date restrictions apply
                </span>
              </div>
            </div>

            <FormField
              control={form.control}
              name="secondInvestor.tinOrSSN"
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
                      data-testid="input-investor2-tin-ssn"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="premium-button w-full relative overflow-hidden group"
            disabled={isSubmitting}
            data-testid="button-submit-joint-investment"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
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
