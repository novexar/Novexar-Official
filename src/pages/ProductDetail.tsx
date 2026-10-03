import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { findProduct } from '@/data/products';
import { ProductHero } from '@/components/product/ProductHero';
import { ScreenshotGallery } from '@/components/product/ScreenshotGallery';
import { FeatureGrid } from '@/components/product/FeatureGrid';
import { HowItWorks } from '@/components/product/HowItWorks';
import { PricingTable } from '@/components/product/PricingTable';
import { Requirements } from '@/components/product/Requirements';
import { Faq } from '@/components/product/Faq';
import { FinalCta } from '@/components/product/FinalCta';

export function ProductDetail() {
  const { slug } = useParams();
  const product = findProduct(slug);

  useEffect(() => {
    if (!product) return;
    const previousTitle = document.title;
    document.title = `${product.name} | Novexar`;
    return () => {
      document.title = previousTitle;
    };
  }, [product]);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <ProductHero product={product} />
      <ScreenshotGallery product={product} />
      <FeatureGrid product={product} />
      <HowItWorks product={product} />
      <PricingTable product={product} />
      <Requirements product={product} />
      <Faq product={product} />
      <FinalCta product={product} />
    </>
  );
}
