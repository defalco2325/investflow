import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-8 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" data-testid="link-back-home">
            <a className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </a>
          </Link>

          <div className="bg-card rounded-lg shadow-sm border border-border p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">Privacy Policy</h1>
            
            <div className="space-y-6 text-sm sm:text-base text-foreground/90 prose prose-sm sm:prose max-w-none">
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">Table of Contents</h2>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Information We Collect</li>
                  <li>Personal Information You Provide Us</li>
                  <li>Personal Information Obtained From Third Parties</li>
                  <li>Personal Information We Collect Automatically From Your Use of the Services</li>
                  <li>How We Use Your Personal Information</li>
                  <li>How We Share Your Personal Information</li>
                  <li>Third Party Services and Links</li>
                  <li>Security</li>
                  <li>Data Retention</li>
                  <li>Your Rights and Choices</li>
                  <li>Use of Services By Children</li>
                  <li>International Cross-Border Data Transfer</li>
                  <li>Your California Privacy Rights (California Residents Only)</li>
                  <li>Residents in the United Kingdom, New Zealand, Canada, or Australia</li>
                  <li>Updates To This Privacy Policy</li>
                  <li>Contact Us</li>
                </ol>
              </div>

              <p className="text-sm text-muted-foreground">Last updated: June 15, 2025</p>
              
              <p>
                At Mode Mobile, your privacy is important to us. This Privacy Policy is designed to explain how we collect, use, process, share, and safeguard Personal Information about you gathered through our websites, including modemobilemobile.com (the "Sites"), and the Mode Mobile applications, including Mode's Earn App (collectively, the "Services"). It also tells you about your rights and choices with respect to your Personal Information, and how you can contact us if you have any questions or concerns. The terms "Mode Mobile," "Earn App," "we," and "us" include Mode Mobile LLC, our affiliates and subsidiaries. By using the Services, you agree to the processing of your Personal Information as described in this Privacy Policy. Beyond the Privacy Policy, your use of the Service is also subject to our Terms of Service.
              </p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
              <p>
                For the purpose of this Privacy Policy, "Personal Information" means any information relating to an identified or identifiable individual. We obtain Personal Information relating to you from various sources described below.
              </p>
              <p>
                Where applicable, we indicate whether and why you must provide us with your Personal Information, as well as the consequences of failing to do so. If you do not provide Personal Information when requested, you may not be able to benefit from our Service if that information is necessary to provide you with them or if we are legally required to collect it.
              </p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">2. Personal Information You Provide Us</h2>
              <p><strong>Registration:</strong> If you wish to have access to certain features on Earn App, including earning points ("Earn Points"), you may be required to become a registered user, and to submit the following types of Personal Information to Mode Mobile:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
              </ul>

              <p>
                <strong>Facial Recognition:</strong> To the extent that you provide us your express consent to do so by opting into the feature, we may collect a facial scan in order to verify your identity for the primary purpose of expediting Earn App Points redemptions. Under applicable laws, the facial scan may be considered "biometric data."
              </p>

              <p>
                As used in this Privacy Policy, biometric data means any biological characteristics of a person, or information based upon such a characteristic, including characteristics such as those defined as "biometric identifiers" and "biometric information" under the Illinois Biometric Information Privacy Act, 740 ILCS 14/1, et seq. "Biometric identifier" means a retina or iris scan, fingerprint, voiceprint, or scan of hand or face geometry. "Biometric information" means any information, regardless of how it is captured, converted, stored, or shared, based on an individual's biometric identifier used to identify an individual.
              </p>

              <p>We retain and use this biometric data as follows:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Purpose of Collection.</strong> We use the biometric data solely for the purposes of detecting and protecting against deceptive, fraudulent, or illegal activity. Specifically, we use the biometric data in connection with identity verification in order to verify and expedite legitimate Earn App Points redemptions and in order to assess possible User account duplications.</li>
                <li><strong>Express Consent.</strong> In all circumstances, users from whom we collect this information are first asked to consent and opt-in to this feature. Without express consent, no biometric data is collected from App users.</li>
                <li><strong>Storage and Third-Party Disclosure.</strong> Biometric data is stored encrypted only on segregated, company-owned servers and equipment with a reasonable standard of care within the data protection industry. We do not sell, lease, trade or otherwise profit from biometric data.</li>
                <li><strong>Disclosure for Legal Purposes.</strong> We will not otherwise disclose any biometric data to anyone other than as required by law.</li>
                <li><strong>Retention.</strong> We retain biometric data only until, and permanently destroy such data upon, the earlier of: (1) within thirty (30) days of receiving a notice from a User regarding account deletion; or (2) within one (1) year of when the initial purpose for collection or retention of such biometric information has been satisfied.</li>
              </ul>

              <p><strong>Other Optional Information:</strong> We may ask you for additional information about yourself, such as age, country or city, tastes and preferences, and other survey questions. This information is optional to provide, and you may be rewarded for providing it with Earn App Points.</p>

              <p><strong>Communications.</strong> If you contact us directly, we may receive additional information about you. For example, when you contact our Customer Support Team, we may receive your name, email address, phone number, the contents, date and time of a message or attachments that you may send to us, and other information you choose to provide.</p>

              <p><strong>Business Partners.</strong> If you work for one of our business partners or vendors, we will collect your contact details to manage the business relationship.</p>

              <p><strong>Job Application.</strong> If you apply for a job with us, we will collect your application information, including your resume and the contact details of your referees, as well as any other information you chose to provide to us in the context of your application.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">3. Personal Information Obtained From Third Parties</h2>
              
              <p><strong>Social Networks and Media Streaming.</strong> We collect information from social media services when you use your credentials for these services to log into the Service, or when you connect your social media accounts to the Service. For example, when you log in with your Facebook or Google+ credentials, we collect the information you have authorized the platform to share with us, such as your name, email address, gender, date of birth, friend list, profile picture and playlists, along with other elements of your social network profile that you have made available may be shared with other Earn App users. We may also obtain other non-public information, such as pages you follow or create, and content you've liked. Please refer to the privacy policy of your social network or music streaming account for information about what information is shared with us.</p>

              <p><strong>Friend Referrals.</strong> We may provide you with an opportunity to invite your friends, family and acquaintances ("Friends") to use the Apps. If you elect to use our referral service for informing a Friend about Earn App, you will be asked to allow Mode Mobile to access your contacts; you will be prompted to select contacts to whom you wish Mode Mobile to contact with information about Earn App; and then you will be prompted to consent to Mode Mobile contacting your Friends. Using our referral service permits us to automatically send the Friend one or more emails or other communications, on your behalf, inviting them to visit or register for Earn App (which invite may include additional subsequent reminders and communications). You warrant and represent that you have your Friend's consent to provide us with his or her information for this purpose, and that you will not give us referral information for any person not permitted to use Mode Mobile, including, without limitation a child under the age of 13, a person whose account has previously been suspended or deactivated, or a person residing or located in a territory where use of Mode Mobile is not authorized.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">4. Personal Information We Collect Automatically From Your Use of the Services</h2>
              
              <p>When you use our Services, we and our third party service providers may collect information from you through automated means, such as cookies, web beacons, and web server logs. By using the Services, you consent to the placement of cookies, beacons, and similar technologies in your browser and on emails in accordance with this Privacy Policy. The information collected in this manner includes IP address, browser characteristics, gyroscopic position, service strength, data provider, device IDs and characteristics, country code or approximate location, operating system version, language preferences, referring URLs, and information about the usage of our Services, such as length of time (in seconds) a user plays music, metadata (genre, artist, album, title, description, tags) and type of media. We may use this information, for example, to ensure that the Services function properly, to create an account on your behalf when you have not formally registered for an account, to analyze your listening behavior and preferences in order to provide you with tailored content, to determine how many users have visited certain pages or opened messages or newsletters, or to prevent fraud. We work with analytics' providers such as Google Analytics, which uses cookies and similar technologies to collect and analyze information about use of the Services and report on activities and trends. This service may also collect information regarding the use of other websites, apps and online resources. You can learn about Google's practices by going to <a href="https://www.google.com/policies/privacy/partners/" className="text-primary hover:underline">https://www.google.com/policies/privacy/partners/</a>, and opt out of them by downloading the Google Analytics opt-out browser add-on, available at <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline">https://tools.google.com/dlpage/gaoptout</a>.</p>

              <p>Third parties that advertise goods or services on the Service (collectively, "Advertisers") may also use cookies or other technologies to track your use of the Service. Advertisers also may use cookies to track your online activities across websites over time to provide interest-based advertising. Those third parties may also provide us with data collection, reporting, ad-response measurement, analytical information, and assist with delivery of relevant marketing messages and advertisements. Some of our Advertisers are members of the Network Advertising Initiative or the Digital Advertising Alliance, or for users in the EU, the European Interactive Digital Advertising Alliance's Consumer Choice Page (<a href="http://www.youronlinechoices.eu" className="text-primary hover:underline">http://www.youronlinechoices.eu</a>). Please visit these organizations' opt-out pages to learn about how you may opt out of receiving web-based personalized ads from member companies. Please visit your device's settings or install the AppChoices app to learn more about how you may opt out of receiving personalized ads in mobile apps.</p>

              <p>Further, if you are a resident of the EU, advertisements shown to you may be supplied via the Ogury Choice Management Platform ("Ogury CMP"), which is compatible with version 2.0 of the IAB Europe Transparency and Consent Framework ("TCFV2"). Accordingly, your prior consent will be collected via Ogury CMP, which supports TCFV2.</p>

              <p>If you do not want information collected through the use of cookies, most browsers allow you to automatically decline cookies or be given the choice of declining or accepting the transfer to your device of a particular cookie (or cookies) from a particular site. You may also wish to refer to <a href="http://www.allaboutcookies.org/manage-cookies/index.html" className="text-primary hover:underline">http://www.allaboutcookies.org/manage-cookies/index.html</a>. Your mobile operating system should also give you the option to manage your cookies and advertising preferences (this may be found in the "settings" function on your device).</p>

              <p>If, however, you do not accept cookies, you may experience some inconvenience in your use of the Services.</p>

              <p><strong>Third Party Pixels and Cookies.</strong></p>
              <p>When you visit our website, log in, register or open an email, cookies, ad beacons, and similar technologies may be used by our online data partners or vendors to associate these activities with information they or others have about you, including your email address. We (or service providers on our behalf) may then send communications and marketing to these email addresses. You may opt out of receiving this advertising by visiting <a href="https://www.smartrecognition.com/database-opt-out/" className="text-primary hover:underline">https://www.smartrecognition.com/database-opt-out/</a>.</p>

              <p>If you wish to opt-out of email marketing from a specific brand that we work with, such as a customer of ours, you can click on the "opt-out" or "unsubscribe" link in the footer (located at the bottom) of any marketing email you receive.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">5. How We Use Your Personal Information</h2>

              <p><strong>Internal and Service-Related Usage.</strong> We use Personal Information for internal and Service-related purposes, including to operate, provide and maintain the Services. For example, we use information we obtain from third parties and collect automatically to do the Earn App Point reward calculation.</p>

              <p><strong>Analytics and Improving the Service.</strong> We and our service providers use Personal Information that we collect on the Services, such as your location and your activities on the Services, to monitor and analyze usage of the Services and to improve and enhance the Services.</p>

              <p><strong>Communications.</strong> We may contact you (i) for customer-service or technical-support purposes, or (ii) to send you (a) information about topics or content that we think may interest you, or (b) updates about the latest developments or features on the Services. We also may send push notifications to your device and periodic communications to the email address you provide to us in the event that you subscribe to receive such notifications and communications.</p>

              <p><strong>Advertising.</strong> We and our advertising partners may use your Personal Information, including your location and your activities on the Service to facilitate the delivery of advertisements.</p>

              <p><strong>Tailored Content.</strong> We may use your Personal Information to provide you with personalized services, content, offers and recommendations. For example, we may analyze your listening history to recommend similar content that we think would be of particular interest to you, send you tailored recommendations based on your location or send you personalized marketing communications based on Personal Information we have collected about you.</p>

              <p><strong>Aggregate Data.</strong> We may de-identify and aggregate information collected through the Services for statistical analysis and other lawful purposes.</p>

              <p><strong>Business Partners.</strong> We may use your personal information to manage our business relationships, including:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>with whom we jointly offer products and services;</li>
                <li>with whom we have entered into an agreement that provides for the disclosure, sale, lease, or license of your Information; or</li>
                <li>to facilitate a direct relationship with you, including in connection with any program we administer on behalf of the Business Partner.</li>
              </ul>

              <p><strong>Job Applications.</strong> We process your Personal Information to evaluate your job application.</p>

              <p><strong>Legal.</strong> We may use your Personal Information to enforce our Terms of Service modemobile.com/terms, to defend our legal rights, to comply with our legal obligations and internal policies.</p>

              <p>If you are located in the European Economic Area, we only process your Personal Information based on a valid legal ground, including when:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>You have consented to the use of your Personal Information, for example to receive electronic marketing communications;</li>
                <li>We need your Personal Information to provide you with the Services, including for account registration, to respond to your inquiries, or for customer support;</li>
                <li>We have a legal obligation to use your Personal Information; or</li>
                <li>We or a third party, have a legitimate interest in using your Personal Information. In particular, we have a legitimate interest in using your Personal Information to personalize our services and provide you with tailored content, conduct business analytics, and otherwise improve the safety, security, and performance of our Services. We only rely on our or a third party's legitimate interests to process your Personal Information when these interests are not overridden by your rights and interests.</li>
              </ul>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">6. How We Share Your Personal Information</h2>
              
              <p>We disclose Personal Information that we collect about you in the context of the Services to third parties in the following circumstances:</p>

              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We may share Personal Information about you with our affiliates and subsidiaries.</li>
                <li>We may share Personal Information about you with our third party service providers who perform services on our behalf, such as website hosting, payment processing, data analysis, information technology and related infrastructure provision, customer service, email delivery, online advertising, auditing, and other services. We do not sell your Personal Information and only share it with third party service providers to operate our Services.</li>
                <li>We may share your Personal Information with our service providers that provide user support and perform other business operations on our behalf, under our instructions and in compliance with appropriate technical and organizational security measures to protect your data.</li>
              </ul>

              <p className="mt-4">For additional details on data sharing practices, please see the full policy sections above.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">7. Third Party Services and Links</h2>
              
              <p>This Privacy Policy applies only to the processing of your Personal Information by Mode Mobile. It does not address, and we are not responsible for, the privacy, information or other practices of any third parties, including any third party operating any site or service to which the Services link, such as social networks or music streaming sites. The inclusion of a link on the Services does not imply endorsement of the linked site or service by us or by our affiliates.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">8. Security</h2>
              
              <p>We maintain administrative, technical and physical safeguards that are intended to appropriately protect Personal Information against accidental or unlawful destruction, accidental loss, unauthorized alteration, unauthorized disclosure or access, misuse, and any other unlawful form of processing of the Personal Information in our possession.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">9. Data Retention</h2>
              
              <p>We take measures to delete your Personal Information or keep it in a form that does not allow you to be identified when this information is no longer necessary for the purposes for which we process it, unless we are required by law to keep this information for a longer period. When determining the retention period, we take into account various criteria, such as the type of products and services requested by or provided to you, your ability to claim Earn App Points you have earned via our services, the nature and length of our relationship with you, possible re-enrollment with our products or services, the impact on the services we provide to you if we delete some information from or about you, mandatory retention periods provided by law and the statute of limitations.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">10. Your Rights and Choices</h2>
              
              <p><strong>Marketing Communications.</strong> If you decide at any time that you no longer wish to receive marketing communications from us, please follow the unsubscribe instructions provided in any of the communications. You may also opt out from receiving commercial email from us by sending your request to us by email at privacy@modemobile.com.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">11. Use of Services By Children</h2>
              
              <p>Our Services are not directed to individuals under the age of 13, and we request that such individuals do not provide Personal Information through the Services.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">12. International Cross-Border Data Transfer</h2>
              
              <p>We may transfer your Personal Information to countries other than the country in which the data was originally collected. These countries may not have the same data protection laws as the country in which you initially provided the information. When we transfer your Personal Information to other countries, we will protect that information as described in this Privacy Policy.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">13. Your California Privacy Rights (California Residents Only)</h2>
              
              <p>If you are a California resident, you have certain rights under the California Consumer Privacy Act ("CCPA"). For more information about your rights and how to exercise them, please contact us using the information provided in the Contact Us section.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">14. Residents in the United Kingdom, New Zealand, Canada, or Australia</h2>
              
              <p>If you are a resident of the United Kingdom, New Zealand, Canada, or Australia, you may have additional rights under applicable data protection laws in your jurisdiction.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">15. Updates To This Privacy Policy</h2>
              
              <p>We may update this Privacy Policy from time to time. When we make changes to this Privacy Policy, we will change the "Last Updated" date at the beginning of this Privacy Policy. If we make material changes to this Privacy Policy, we will notify you by email to your registered email address, by prominent posting on this website or our Services, or through other appropriate communication channels. All changes shall be effective from the date of publication unless otherwise provided.</p>

              <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4">16. Contact Us</h2>
              
              <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:</p>
              <p className="ml-4">
                Email: privacy@modemobile.com<br />
                Address: Mode Mobile LLC<br />
                [Company Address]
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
