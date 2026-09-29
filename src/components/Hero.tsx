import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#30151C] via-[#211316] to-brand-dark min-h-[500px] lg:min-h-[700px]">
      {/* Image on the right side — opposite the text */}
      <div className="absolute inset-0 md:left-1/2">
        <Image
          src="/images/hero.jpg"
          alt="Pakistani woman wearing a black stitched suit with pink floral embroidery and traditional jewelry"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-[center_30%] brightness-125"
          priority
        />
        {/* Mobile: soften image so text on top stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/55 to-brand-dark/30 md:hidden" />
        {/* Desktop: gently fade image's left edge into the background */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-brand-dark from-[6%] via-brand-dark/15 via-[35%] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 h-full flex items-center">
        <div className="w-full md:w-1/2 max-w-xl">
          {/* Fashion badge */}
          <div className="inline-flex items-center gap-2 bg-brand-secondary/15 border border-brand-secondary/30 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse" />
            <span className="text-brand-secondary text-xs font-semibold tracking-wider uppercase">
              New Season 2025
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight text-balance">
            Elegance{" "}
            <span className="text-brand-secondary">for Every Moment</span>
          </h1>
          <p className="mt-5 text-brand-accent text-base lg:text-lg leading-relaxed max-w-md">
            Pakistani stitched fashion for every occasion.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#collection"
              className="bg-brand-secondary text-brand-dark px-8 py-4 rounded-full font-semibold text-base tracking-wide hover:bg-brand-accent transition-colors duration-300 shadow-lg hover:shadow-xl inline-block text-center"
            >
              Explore Collection
            </a>
            <Link
              href="/contact"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-medium text-base tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300 inline-block text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          fill="none"
          className="w-full"
        >
          <path
            d="M0,40 C360,100 720,0 1440,60 L1440,100 L0,100 Z"
            fill="#FDF6EE"
          />
        </svg>
      </div>
    </section>
  );
}
