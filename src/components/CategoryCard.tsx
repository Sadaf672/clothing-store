import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  name: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export default function CategoryCard({ name, imageSrc, imageAlt, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group block relative rounded-2xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-2xl transition-all duration-500 bg-brand-light">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Dim clothing overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/40 to-brand-dark/10 opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
      {/* Clothing pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/hero.jpg')] opacity-[0.03] bg-cover bg-center mix-blend-multiply" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 pb-8">
        <h3 className="text-white text-2xl font-bold tracking-wide mb-3 group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
          {name}
        </h3>
        <span className="text-brand-primary text-sm font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          View Collection →
        </span>
      </div>
    </Link>
  );
}
