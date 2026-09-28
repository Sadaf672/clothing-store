import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/data";
import ProductView from "@/components/ProductView";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) return notFound();

  return (
    <div className="min-h-[60vh] bg-brand-bg py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-brand-muted text-sm hover:text-brand-primary transition-colors">
            Home
          </Link>
          <span className="text-brand-muted/50 mx-2">/</span>
          <Link href="/#collection" className="text-brand-muted text-sm hover:text-brand-primary transition-colors">
            Collection
          </Link>
          <span className="text-brand-muted/50 mx-2">/</span>
          <span className="text-brand-dark font-medium text-sm">{product.name}</span>
        </nav>

        <ProductView product={product} />
      </div>
    </div>
  );
}
