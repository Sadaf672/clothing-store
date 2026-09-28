import Image from "next/image";
import Link from "next/link";
import { useCart, type Product } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-light/50">
      <Link href={`/products/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-brand-light">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dim clothing overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        {/* Hover overlay with View Details */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white/90 backdrop-blur-sm text-brand-dark px-6 py-3 rounded-full text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Details
          </span>
        </div>
      </Link>
      <div className="p-5 space-y-2">
        <p className="text-brand-primary text-xs font-medium tracking-wider uppercase">
          {product.category}
        </p>
        <h3 className="font-semibold text-brand-dark text-base leading-snug line-clamp-2 group-hover:text-brand-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-brand-primary font-bold text-xl mt-2">{product.price}</p>
        <div className="flex gap-3 mt-4">
          <Link href={`/products/${product.id}`} className="flex-1 text-center btn-outline !py-2.5 !text-sm">
            View Details
          </Link>
          <button
            onClick={() => addToCart(product, product.sizes[0])}
            className="flex-1 text-center btn-primary !py-2.5 !text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
