import Link from "next/link";
import { BRIDGE_IMAGE_URL } from "@/constants/assets";

export default function Home() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url('${BRIDGE_IMAGE_URL}')` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl px-6 text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
          Civic<span className="text-blue-500">Fix</span>
        </h1>
        <p className="mb-8 text-lg text-gray-300 sm:text-xl">
          Empowering citizens to report local infrastructure & civic issues directly to municipal authorities.
        </p>

        <Link
          href="/auth/signup"
          className="inline-block rounded-full bg-white/20 px-8 py-3.5 text-lg font-semibold tracking-wide backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 border border-white/20"
        >
          Get Started &rarr;
        </Link>
      </div>
    </main>
  );
}