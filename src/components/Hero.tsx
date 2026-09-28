import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-dark min-h-[500px] lg:min-h-[700px]">
      {/* Background Clothing Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Pakistani woman wearing a black stitched suit with pink floral embroidery and traditional jewelry"
          fill
          sizes="100vw"
          className="object-cover object-[62%_center] md:object-center"
          priority
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/55" />
        {/* Additional subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/hero.jpg')] bg-cover bg-center mix-blend-overlay" />
      </div>

      {/* Decorative clothing silhouette accent */}
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-[0.06] bg-gradient-to-l from-brand-dark/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 h-full flex items-center">
        <div className="max-w-xl">
          {/* Fashion badge */}
          <div className="inline-flex items-center gap-2 bg-brand-primary/20 border border-brand-primary/30 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
            <span className="text-brand-primary text-xs font-semibold tracking-wider uppercase">
              New Season 2025
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight text-balance">
            Elegance Stitched{" "}
            <span className="text-brand-primary">for Every Moment</span>
          </h1>
          <p className="mt-5 text-brand-accent/90 text-base lg:text-lg leading-relaxed max-w-md">
            Discover timeless Pakistani stitched fashion made for every
            occasion.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#collection"
              className="bg-brand-primary text-white px-8 py-4 rounded-full font-semibold text-base tracking-wide hover:bg-brand-accent transition-colors duration-300 shadow-lg hover:shadow-xl inline-block text-center"
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

          {/* Fashion stats */}
          <div className="mt-10 flex gap-8">
            <div>
              <p className="text-white text-2xl font-bold">500+</p>
              <p className="text-brand-accent/70 text-xs mt-0.5">Stitched Designs</p>
            </div>
            <div>
              <p className="text-white text-2xl font-bold">50+</p>
              <p className="text-brand-accent/70 text-xs mt-0.5">Collections</p>
            </div>
            <div>
              <p className="text-white text-2xl font-bold">Free</p>
              <p className="text-brand-accent/70 text-xs mt-0.5">Delivery</p>
            </div>
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
