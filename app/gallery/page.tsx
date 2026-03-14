import Link from "next/link";

const versions = [
  {
    id: "v1",
    name: "Midnight Editorial",
    description: "Sophisticated dark-mode magazine layout with luxury restraint",
    fonts: "Playfair Display + Source Serif 4",
    colors: ["#0A0A0F", "#F0EDE8", "#C9A84C", "#161620"],
  },
  {
    id: "v2",
    name: "Warm Analog",
    description: "Handmade, earthy feel like a physical game manual on cream paper",
    fonts: "Fraunces + Outfit",
    colors: ["#FAF5EE", "#3D2B1F", "#C65D3E", "#7B9E6B"],
  },
  {
    id: "v3",
    name: "Geometric Precision",
    description: "Ultra-clean, Stripe/Linear-inspired minimal with surgical accent use",
    fonts: "Plus Jakarta Sans + Manrope",
    colors: ["#FAFBFC", "#171923", "#0EA5E9", "#E2E8F0"],
  },
  {
    id: "v4",
    name: "Soft Pastel Gradient",
    description: "Airy, ethereal, floating in clouds with premium wellness aesthetic",
    fonts: "DM Sans + Sora",
    colors: ["#F0EAFF", "#2D2B55", "#7C3AED", "#FFF0F3"],
  },
  {
    id: "v5",
    name: "Dynamic Canvas",
    description: "Bold, contemporary, energetic with rotating accent colors per section",
    fonts: "Syne + Nunito Sans",
    colors: ["#FAFAF9", "#1A1A2E", "#4A6CF7", "#AB47BC"],
  },
];

export default function GalleryPage() {
  return (
    <div
      style={{ backgroundColor: "#F2F2F7", minHeight: "100dvh" }}
      className="px-4 py-16"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1
            className="text-4xl font-black sm:text-5xl"
            style={{ color: "#1C1C1E", letterSpacing: "0.05em" }}
          >
            Design Gallery
          </h1>
          <p
            className="mt-3 text-lg"
            style={{ color: "#8E8E93" }}
          >
            5 visual directions for the GridFlip landing page
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {versions.map((v) => (
            <Link
              key={v.id}
              href={`/${v.id}`}
              className="group block overflow-hidden rounded-2xl transition-transform duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              {/* Color swatch bar */}
              <div className="flex h-3">
                {v.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-baseline gap-3">
                  <span
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: "#8E8E93" }}
                  >
                    {v.id}
                  </span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: "#1C1C1E" }}
                  >
                    {v.name}
                  </span>
                </div>

                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: "#8E8E93" }}
                >
                  {v.description}
                </p>

                <p
                  className="text-xs font-medium"
                  style={{ color: "#AEAEB2" }}
                >
                  {v.fonts}
                </p>

                <div
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors group-hover:underline"
                  style={{ color: "#4A6CF7" }}
                >
                  View design →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm font-medium underline-offset-4 transition-colors hover:underline"
            style={{ color: "#8E8E93" }}
          >
            ← Back to original
          </Link>
        </div>
      </div>
    </div>
  );
}
