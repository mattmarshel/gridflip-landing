import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — GridFlip",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-gf-text-secondary underline-offset-4 hover:text-gf-dark hover:underline"
      >
        &larr; Back to GridFlip
      </Link>

      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gf-dark">
        Privacy Policy
      </h1>

      <div className="space-y-4 text-gf-text-secondary leading-relaxed">
        <p>
          <strong className="text-gf-dark">Last updated:</strong> March 2026
        </p>

        <p>
          GridFlip (&ldquo;the App&rdquo;) is designed with your privacy in
          mind. This policy describes what data we collect and how we use it.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-gf-dark">
          Data Collection
        </h2>
        <p>
          GridFlip does not collect, store, or transmit any personal data. All
          game progress is stored locally on your device.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-gf-dark">
          Third-Party Services
        </h2>
        <p>
          The App may use Apple&apos;s Game Center for leaderboards and
          achievements. Please refer to Apple&apos;s privacy policy for details
          on how Game Center handles your data.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-gf-dark">
          Analytics
        </h2>
        <p>
          We do not use any third-party analytics or tracking services.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-gf-dark">Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us
          through the App Store listing.
        </p>
      </div>
    </div>
  );
}
