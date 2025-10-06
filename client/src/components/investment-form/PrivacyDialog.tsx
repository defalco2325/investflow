import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyDialogProps {
  children: React.ReactNode;
}

export function PrivacyDialog({ children }: PrivacyDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Privacy Policy</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <p className="text-xs text-muted-foreground">Last updated: June 15, 2025</p>
            
            <p>
              At Mode Mobile, your privacy is important to us. This Privacy Policy is designed to explain how we collect, use, process, share, and safeguard Personal Information about you gathered through our websites and services.
            </p>

            <h3 className="font-semibold text-base mt-4">1. Information We Collect</h3>
            <p>
              For the purpose of this Privacy Policy, "Personal Information" means any information relating to an identified or identifiable individual. We obtain Personal Information relating to you from various sources.
            </p>

            <h3 className="font-semibold text-base mt-4">2. Personal Information You Provide Us</h3>
            <p>
              <strong>Registration:</strong> To access certain features, you may be required to submit your name, email address, and phone number.
            </p>

            <h3 className="font-semibold text-base mt-4">3. How We Use Your Personal Information</h3>
            <p>
              We use Personal Information for internal and service-related purposes, including to operate, provide and maintain the Services, analytics, communications, advertising, and to provide personalized content.
            </p>

            <h3 className="font-semibold text-base mt-4">4. How We Share Your Personal Information</h3>
            <p>
              We may share Personal Information with our affiliates, subsidiaries, and third-party service providers who perform services on our behalf. We do not sell your Personal Information.
            </p>

            <h3 className="font-semibold text-base mt-4">5. Security</h3>
            <p>
              We maintain administrative, technical and physical safeguards that are intended to appropriately protect Personal Information against accidental or unlawful destruction, loss, alteration, disclosure or access.
            </p>

            <h3 className="font-semibold text-base mt-4">6. Your Rights and Choices</h3>
            <p>
              <strong>Marketing Communications:</strong> You may opt out from receiving marketing communications from us by following the unsubscribe instructions in our emails.
            </p>

            <h3 className="font-semibold text-base mt-4">7. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@modemobile.com.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function TermsDialog({ children }: PrivacyDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Terms of Service</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <p className="text-xs text-muted-foreground">Last updated: June 15, 2025</p>
            
            <h3 className="font-semibold text-base mt-4">1. Acceptance of Terms</h3>
            <p>
              By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h3 className="font-semibold text-base mt-4">2. Use License</h3>
            <p>
              Permission is granted to temporarily use the service for personal, non-commercial transitory viewing only.
            </p>

            <h3 className="font-semibold text-base mt-4">3. Disclaimer</h3>
            <p>
              The materials on this service are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h3 className="font-semibold text-base mt-4">4. Limitations</h3>
            <p>
              In no event shall Mode Mobile or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the service.
            </p>

            <h3 className="font-semibold text-base mt-4">5. Revisions</h3>
            <p>
              We may revise these terms of service at any time without notice. By using this service you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h3 className="font-semibold text-base mt-4">6. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
