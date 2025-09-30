import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseInvestmentFormReturn } from "@/hooks/use-investment-form";
import { investorProfileSchema } from "@/lib/validation-schemas";
import { InvestorProfileData } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone } from "lucide-react";

interface InvestorProfileProps {
  formManager: UseInvestmentFormReturn;
}

export default function InvestorProfile({ formManager }: InvestorProfileProps) {
  const { updateInvestorProfile, formData } = formManager;

  const form = useForm<InvestorProfileData>({
    resolver: zodResolver(investorProfileSchema),
    mode: "onChange",
    defaultValues: formData.investorProfile || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      isAccredited: false,
      consentGiven: false,
    },
  });

  const onSubmit = (data: InvestorProfileData) => {
    updateInvestorProfile(data);
  };

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
            <p className="text-sm font-medium mb-1">
              <span className="underline">Accredited Investors</span> get exclusive access to additional bonus shares.
            </p>
            <p className="text-sm text-muted-foreground">Are you an Accredited Investor?</p>
          </div>
          
          <FormField
            control={form.control}
            name="isAccredited"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <button
                      type="button"
                      onClick={() => field.onChange(true)}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                        field.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border bg-input hover:border-primary/50'
                      }`}
                      data-testid="button-accredited-yes"
                    >
                      <div className="flex items-center justify-between">
                        <span>Yes</span>
                        {field.value && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            className="bg-[#D4A574] text-black text-xs font-semibold px-3 py-1 rounded"
                          >
                            REQUIRED
                          </motion.span>
                        )}
                      </div>
                    </button>
                  </motion.div>
                </FormControl>
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
                      Consent for SMS from Satoshi Reserve. Msg/ data rates may apply. Consent is not a condition of purchase.
                      Reply STOP to opt-out. See our Privacy Policy & Terms
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
            className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            disabled={!form.watch("consentGiven") || !form.formState.isValid}
            data-testid="button-next-step"
          >
            Next Step
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
}
