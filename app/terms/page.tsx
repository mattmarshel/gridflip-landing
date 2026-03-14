import Link from "next/link";

export const metadata = {
  title: "Terms of Use — GridFlip",
};

export default function TermsPage() {
  return (
    <div
      className="min-h-dvh px-4 py-16"
      style={{ fontFamily: "var(--font-outfit), sans-serif", backgroundColor: "#FAFAFA" }}
    >
      <div
        className="soft-card mx-auto max-w-2xl rounded-3xl px-8 py-12 sm:px-12"
      >
        <Link
          href="/"
          className="mb-8 inline-block text-sm underline-offset-4 hover:underline"
          style={{ color: "#8E8E93" }}
        >
          &larr; Back to GridFlip
        </Link>

        <h1
          className="mb-8 text-3xl font-black tracking-tight"
          style={{ color: "#1C1C1E" }}
        >
          Terms of Use
        </h1>

        <div className="space-y-6 leading-relaxed" style={{ color: "#6B6B70" }}>
          <p>
            <strong style={{ color: "#1C1C1E" }}>Last updated:</strong> March 2026
          </p>

          <p>
            Please read these Terms of Use (&ldquo;Terms&rdquo;) carefully
            before using GridFlip (&ldquo;the App&rdquo;). By downloading,
            installing, or using the App, you agree to be bound by these Terms.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            License
          </h2>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable
            license to use the App for your personal, non-commercial use on any
            Apple device that you own or control, subject to the Usage Rules set
            forth in the App Store Terms of Service.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            In-App Purchases
          </h2>
          <p>
            The App may offer optional in-app purchases for cosmetic items such
            as themes, tile styles, and other visual customizations. All
            purchases are processed through Apple&apos;s App Store and are
            subject to Apple&apos;s terms and refund policies. In-app purchases
            are non-transferable and may only be used within the App.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            User Conduct
          </h2>
          <p>
            You agree not to reverse-engineer, decompile, disassemble, or
            otherwise attempt to derive the source code of the App. You may not
            modify, distribute, or create derivative works based on the App.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Intellectual Property
          </h2>
          <p>
            All content within the App, including but not limited to graphics,
            designs, puzzles, sounds, and text, is the property of GridFlip and
            is protected by applicable intellectual property laws. You may not
            reproduce, distribute, or use any content from the App without prior
            written permission.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Game Center
          </h2>
          <p>
            The App integrates with Apple Game Center for leaderboards and
            achievements. Your use of Game Center is subject to Apple&apos;s
            terms and conditions. We are not responsible for the availability or
            functionality of Game Center services.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Disclaimer of Warranties
          </h2>
          <p>
            The App is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, either express or
            implied. We do not warrant that the App will be uninterrupted,
            error-free, or free of harmful components.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, GridFlip shall
            not be liable for any indirect, incidental, special, consequential,
            or punitive damages arising out of or relating to your use of the
            App.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Changes to These Terms
          </h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will
            be reflected on this page with an updated &ldquo;Last
            updated&rdquo; date. Continued use of the App after changes
            constitutes acceptance of the revised Terms.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Contact Us
          </h2>
          <p>
            If you have any questions about these Terms, please contact us
            through the App Store listing or by email at the address provided on
            our App Store page.
          </p>
        </div>
      </div>
    </div>
  );
}
