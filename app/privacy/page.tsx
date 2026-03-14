import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — GridFlip",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <div className="space-y-6 leading-relaxed" style={{ color: "#6B6B70" }}>
          <p>
            <strong style={{ color: "#1C1C1E" }}>Last updated:</strong> March 2026
          </p>

          <p>
            GridFlip (&ldquo;the App&rdquo;) is a mobile puzzle game designed
            with your privacy in mind. This Privacy Policy explains what
            information we collect, how we use it, and your rights regarding
            your data.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Information We Collect
          </h2>
          <p>
            GridFlip does not collect, store, or transmit any personal data. All
            game progress, settings, and preferences are stored locally on your
            device using on-device storage. We do not maintain any servers that
            receive your data, and we do not create user accounts or profiles.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Third-Party Services
          </h2>
          <p>
            The App integrates with the following Apple services, each governed
            by Apple&apos;s own privacy policies:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong style={{ color: "#1C1C1E" }}>Apple Game Center</strong> &mdash;
              Used for leaderboards and achievements. Game Center may collect
              your Game Center profile name and scores. This data is managed
              entirely by Apple.
            </li>
            <li>
              <strong style={{ color: "#1C1C1E" }}>StoreKit / In-App Purchases</strong>{" "}
              &mdash; The App offers optional in-app purchases processed
              entirely through Apple&apos;s App Store. We do not receive or store
              any payment information, billing details, or transaction records.
            </li>
          </ul>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Children&apos;s Privacy
          </h2>
          <p>
            GridFlip does not knowingly collect personal information from
            children under the age of 13 (or the applicable age in your
            jurisdiction). Since the App does not collect any personal data from
            any user, no special provisions are necessary. If you believe a
            child has somehow provided personal information through the App,
            please contact us so we can investigate.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Analytics &amp; Advertising
          </h2>
          <p>
            We do not use any third-party analytics, tracking, or advertising
            services. The App contains no ads and does not share data with any
            advertising networks.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Data Security
          </h2>
          <p>
            Since all data is stored locally on your device, it is protected by
            your device&apos;s built-in security features, including device
            passcode, Face ID, or Touch ID. We recommend keeping your device
            software up to date to benefit from the latest security patches.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page with an updated &ldquo;Last
            updated&rdquo; date. We encourage you to review this policy
            periodically. Continued use of the App after changes constitutes
            acceptance of the updated policy.
          </p>

          <h2 className="pt-2 text-xl font-bold" style={{ color: "#1C1C1E" }}>
            Contact Us
          </h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us through the App Store listing or by email at the
            address provided on our App Store page.
          </p>
        </div>
      </div>
    </div>
  );
}
