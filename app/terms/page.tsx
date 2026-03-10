import Link from "next/link";

export const metadata = {
  title: "Terms of Use — GridFlip",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-gf-text-secondary underline-offset-4 hover:text-gf-dark hover:underline"
      >
        &larr; Back to GridFlip
      </Link>

      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gf-dark">
        Terms of Use
      </h1>

      <div className="space-y-4 text-gf-text-secondary leading-relaxed">
        <p>
          <strong className="text-gf-dark">Last updated:</strong> March 2026
        </p>

        <p>
          By downloading or using GridFlip (&ldquo;the App&rdquo;), you agree to
          these terms.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-gf-dark">License</h2>
        <p>
          We grant you a limited, non-exclusive, non-transferable license to use
          the App for personal, non-commercial purposes on any Apple device that
          you own or control.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-gf-dark">
          In-App Purchases
        </h2>
        <p>
          The App may offer in-app purchases. All purchases are processed by
          Apple and are subject to Apple&apos;s terms and conditions. Refund
          requests should be directed to Apple.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-gf-dark">
          Limitation of Liability
        </h2>
        <p>
          The App is provided &ldquo;as is&rdquo; without warranty of any kind.
          We are not liable for any damages arising from your use of the App.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-gf-dark">Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the App
          constitutes acceptance of any changes.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-gf-dark">Contact</h2>
        <p>
          If you have questions about these terms, please contact us through the
          App Store listing.
        </p>
      </div>
    </div>
  );
}
