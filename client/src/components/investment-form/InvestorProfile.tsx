import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { UseInvestmentFormReturn } from "@/hooks/use-investment-form";
import { investorProfileSchema } from "@/lib/validation-schemas";
import { InvestorProfileData } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User, Mail, Phone, X } from "lucide-react";
import { PrivacyDialog, TermsDialog } from "./PrivacyDialog";

interface InvestorProfileProps {
  formManager: UseInvestmentFormReturn;
}

export default function InvestorProfile({ formManager }: InvestorProfileProps) {
  const { updateInvestorProfile, formData } = formManager;
  const [showAccreditedModal, setShowAccreditedModal] = useState(false);

  const form = useForm<InvestorProfileData>({
    resolver: zodResolver(investorProfileSchema),
    mode: "onChange",
    defaultValues: formData.investorProfile || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      isAccredited: false,
      consentGiven: true,
    },
  });

  const onSubmit = (data: InvestorProfileData) => {
    if (!data.email) {
      form.setError("email", { 
        type: "manual", 
        message: "Email is required to continue" 
      });
      return;
    }
    updateInvestorProfile(data);
  };

  const isEmailValid = form.watch("email") && !form.formState.errors.email;

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Form {...form}>
      <motion.form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      {...field}
                      className="pl-10 bg-input border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      placeholder="First Name"
                      data-testid="input-first-name"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      {...field}
                      className="pl-10 bg-input border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      placeholder="Last Name"
                      data-testid="input-last-name"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      {...field}
                      type="email"
                      className="pl-10 bg-input border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      placeholder="Email Address"
                      data-testid="input-email"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>+1 Phone number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      {...field}
                      className="pl-10 bg-input border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      placeholder="+1 Phone number"
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                      data-testid="input-phone"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Are you an{" "}
              <Popover open={showAccreditedModal} onOpenChange={setShowAccreditedModal}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="font-medium text-foreground hover:opacity-80 transition-opacity"
                    onClick={() => setShowAccreditedModal(true)}
                    data-testid="button-accredited-info"
                  >
                    Accredited Investor
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-80 p-4" 
                  role="dialog" 
                  aria-label="Accredited Investor Information"
                  onEscapeKeyDown={() => setShowAccreditedModal(false)}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm">Accredited Investor</h3>
                      <button
                        type="button"
                        onClick={() => setShowAccreditedModal(false)}
                        className="p-1 hover:bg-secondary rounded"
                        aria-label="Close"
                        data-testid="button-close-modal"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      An accredited investor is an individual or entity that meets specific financial criteria set by the SEC, such as having a net worth exceeding $1 million (excluding primary residence) or annual income over $200,000 ($300,000 for joint income).
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
              ?
            </p>
          </div>
          
          <FormField
            control={form.control}
            name="isAccredited"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <Select
                    value={field.value === true ? "yes" : field.value === false ? "no" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className="flex-1 bg-input border-border"
                        data-testid="select-accredited"
                      >
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <span 
                    className="bg-[#FB8037] text-white text-xs font-semibold px-3 py-1 rounded whitespace-nowrap"
                  >
                    REQUIRED
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="consentGiven"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1 transition-all duration-200"
                      data-testid="checkbox-consent"
                    />
                  </FormControl>
                  <div className="space-y-1">
                    <p className="text-sm">
                      By submitting this form and signing up for communications, you consent to receive marketing email, text & voice messages (e.g. promos, calls, voicemails, cart reminders) from Mode Mobile at the number & email provided. Consent is not a condition of purchase. Msg, voice, & data rates may apply. Msg frequency varies. Unsubscribe at any time by replying STOP or clicking the unsubscribe link (where available).{" "}
                      <PrivacyDialog>
                        <button
                          type="button"
                          className="text-foreground hover:opacity-80 transition-opacity underline"
                          data-testid="link-privacy-policy"
                        >
                          Privacy Policy
                        </button>
                      </PrivacyDialog>{" "}
                      &{" "}
                      <TermsDialog>
                        <button
                          type="button"
                          className="text-foreground hover:opacity-80 transition-opacity underline"
                          data-testid="link-terms"
                        >
                          Terms
                        </button>
                      </TermsDialog>.
                    </p>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold py-3 sm:py-4 text-sm sm:text-base rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            disabled={!isEmailValid || !form.watch("consentGiven") || !form.formState.isValid}
            data-testid="button-next-step"
          >
            Next Step
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
}
