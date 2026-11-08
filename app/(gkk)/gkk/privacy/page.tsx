/* eslint-disable @next/next/no-html-link-for-pages */
import LightRays from "@/components/LightRays"
import { contact } from "@/lib/contact"

const Privacy = () => {
  return (
    <main className="relative min-h-screen">
      {/* height should be complete height of whole scrollable page */}
      <div className='absolute inset-0 top-0'>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ff11"
          raysSpeed={1}
          lightSpread={0.3}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={0.1}
          saturation={1}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-18">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy for Ghar Ka Khana</h1>
        <p className="text-sm text-gray-600 mb-8"><strong>Last Updated:</strong> January 24, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Ghar Ka Khana (&quot;GKK&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). This Privacy Policy explains how Fazal-e-Insaaniyat Charity Works collects, uses, discloses, and protects your personal information when you use our mobile application and website.
          </p>
          <p className="mb-4">
            Ghar Ka Khana is a food marketplace that connects home cooks with people seeking home-cooked meals in Pakistan.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold mb-2">Contact Information:</p>
            <ul className="list-none space-y-1">
              <li><strong>Business Name:</strong> Fazal-e-Insaaniyat Charity Works</li>
              <li><strong>Address:</strong> {contact.address}</li>
              <li><strong>Email:</strong> gkk@fazaleinsaaniyat.org</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>

          <h3 className="text-xl font-semibold mb-2">2.1 Personal Information</h3>
          <p className="mb-2">When you use Ghar Ka Khana, we collect:</p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li><strong>Account Information:</strong> Name, email address, password, and phone number</li>
            <li><strong>Location Data:</strong> Precise and approximate location to help you find nearby cooks and customers</li>
            <li><strong>Profile Information:</strong> Profile pictures and food images you choose to upload</li>
            <li><strong>Food Preferences:</strong> Dietary restrictions, food preferences, and order history</li>
            <li><strong>Communication Data:</strong> Messages exchanged through our in-app chat feature</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">2.2 Automatically Collected Information</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Device information (device type, operating system)</li>
            <li>App usage data and interactions</li>
            <li>Location data (when you grant permission)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
          <p className="mb-2">We use your personal information to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Create and manage your account</li>
            <li>Connect home cooks with customers based on proximity</li>
            <li>Enable communication between cooks and customers through our chat feature</li>
            <li>Display food listings and availability</li>
            <li>Maintain order history and food preferences</li>
            <li>Improve our app functionality and user experience</li>
            <li>Send important updates about your orders and account</li>
            <li>Ensure platform safety and prevent fraud</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">4. Location Data</h2>
          <p className="mb-2">We collect precise and approximate location data to:</p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li>Show you nearby home cooks and available meals</li>
            <li>Help customers find food providers in their area</li>
            <li>Enable location-based matching between cooks and customers</li>
          </ul>
          <p>
            You can choose whether to share your precise location with us. You can still use the app if you opt out of location sharing, though some features may be limited.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">5. How We Share Your Information</h2>
          <p className="mb-4">
            Currently, we do not share your personal information with third parties. Your data is stored securely on our servers (Supabase).
          </p>
          <p className="font-semibold">Payment Information:</p>
          <p>
            Payments are arranged directly between customers and cooks through our chat feature. We do not process, store, or have access to payment card details or financial information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
          <p className="mb-4">
            We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Your data is stored securely using Supabase infrastructure with industry-standard security practices.
          </p>
          <p>
            However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">7. Data Retention and Deletion</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>We retain your personal information for as long as your account is active</li>
            <li>When you delete your account, we immediately delete all your personal information from our systems</li>
            <li>You can request account deletion at any time by contacting us at gkk@fazaleinsaaniyat.org</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">8. Your Rights</h2>
          <p className="mb-2">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Delete your account and personal data</li>
            <li>Opt out of precise location sharing</li>
            <li>Withdraw consent for data processing at any time</li>
          </ul>
          <p className="mt-4">To exercise these rights, contact us at gkk@fazaleinsaaniyat.org.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">9. Children&apos;s Privacy</h2>
          <p>
            Our service is available to users of all ages. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can take appropriate action.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">10. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
          <p className="mb-4">If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
          <p><strong>Email:</strong> gkk@fazaleinsaaniyat.org</p>
          <p><strong>Address:</strong> {contact.address}</p>
        </section>

        <hr className="my-8" />

        <p className="text-sm text-gray-600">
          By using Ghar Ka Khana, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
        </p>
      </div>

      {/* button to go to /gkk */}
      <div className='fixed bottom-5 right-5'>
        <a href='/gkk' className='bg-[#76ab85] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#57ba73] transition font-light'>
          Go to GKK
        </a>
      </div>
    </main>
  )
}

export default Privacy