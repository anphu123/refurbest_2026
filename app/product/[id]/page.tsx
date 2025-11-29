"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { Product, ProductVariant } from "@/types";
import { formatPrice } from "@/lib/utils";
import {
  Star,
  Battery,
  Shield,
  Truck,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Info,
  ArrowLeft
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart";
import Toast from "@/components/Toast";
import ProductCard from "@/components/ProductCard";
import InfoSection from "@/components/sections/InfoSection";
import FAQ from "@/components/sections/FAQ";
import UserQA from "@/components/sections/UserQA";
import Botchat from "@/components/Botchat";
import { MessageCircle, Mail, Phone } from "lucide-react";
import dynamic from 'next/dynamic';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number } | null>(null);
  const [showZoom, setShowZoom] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [activeVariant, setActiveVariant] = useState<ProductVariant | null>(null);

  const { addItem, setBuyNowItems } = useCartStore();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*, variants:product_variants(*)')
          .eq('id', productId)
          .eq('status', 'active')
          .single();

        if (!error && data) {
          const productData = data as Product;
          console.log('[object Object]d:', productData);
          console.log('[object Object] images:', productData.images);
          console.log('🎨 Variants:', productData.variants);
          setProduct(productData);

          // Set initial selected variant to first variant
          if (productData.variants && productData.variants.length > 0) {
            setActiveVariant(productData.variants[0]);
          }

          // Load related products
          const { data: relatedData, error: relatedError } = await supabase
            .from('products')
            .select('*, variants:product_variants(*)')
            .eq('status', 'active')
            .neq('id', productId)
            .or(`category.eq.${data.category},brand.eq.${data.brand}`)
            .limit(8);

          if (!relatedError) {
            setRelatedProducts(relatedData as Product[]);
          }
        } else {
          setProduct(null);
        }
      } catch (e) {
        console.error('Error loading product:', e);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);


  useEffect(() => {
    console.log('✨ Active Variant Updated:', activeVariant);
  }, [activeVariant]);

  // Helper function to format variant display name
  const formatVariantName = (variant: ProductVariant): string => {
    const attrs = variant.attributes;
    const parts: string[] = [];

    // Order: RAM → Dung lượng → Màu → Tình trạng
    if (attrs['RAM']) parts.push(attrs['RAM']);
    if (attrs['Dung lượng'] || attrs['Dung Lượng']) parts.push(attrs['Dung lượng'] || attrs['Dung Lượng']);
    if (attrs['Màu']) parts.push(attrs['Màu']);
    if (attrs['Tình trạng'] || attrs['Tình Trạng']) parts.push(attrs['Tình trạng'] || attrs['Tình Trạng']);
    if (attrs['Cấu hình']) parts.push(attrs['Cấu hình']);

    return parts.join(' | ') || 'Phiên bản mặc định';
  };

  const handleVariantSelect = (variant: ProductVariant) => {
    setActiveVariant(variant);
    setSelectedImageIndex(0); // Reset to first image when variant changes
  };

  // Get images based on active variant or product default
  const DEFAULT_IMAGE_URL = 'https://i.ibb.co/MD44GmQ3/dien-thoai-sap-ra-mat-dau-nam-2025-6-2c2c5bfde4.webp';



  // Combine product images and variant images
  // Priority: 1. Main image, 2. Product gallery, 3. Variant images
  const mainImage = product?.image ? [product.image] : [];
  const productImages = product?.images && product.images.length > 0 ? product.images : [];
  const variantImages = activeVariant?.images && activeVariant.images.length > 0 ? activeVariant.images : [];

  let images: string[] = [];

  // Combine all images: main image first, then gallery, then variant images
  if (mainImage.length > 0 || productImages.length > 0 || variantImages.length > 0) {
    const allImages = [...mainImage, ...productImages, ...variantImages];
    images = Array.from(new Set(allImages)); // Remove duplicates while preserving order
  } else {
    images = [DEFAULT_IMAGE_URL];
  }





  // Use active variant price, or fall back to first variant price
  const displayVariant = activeVariant || (product?.variants && product.variants.length > 0 ? product.variants[0] : null);
  const originalPriceValue = displayVariant?.original_price || 0;
  const currentPrice = displayVariant?.price || 0;
  const hasDiscount = originalPriceValue > 0 && originalPriceValue > currentPrice;

  const handleAddToCart = async () => {
    if (product && activeVariant && !isAddingToCart) {
      try {
        setIsAddingToCart(true);
        const itemToAdd = {
          ...product,
          id: activeVariant.id, // Use variant ID for cart uniqueness
          name: `${product.name} (${Object.values(activeVariant.attributes).join(' - ')})`,
          price: activeVariant.price,
          image: product.image, // Main product image
          stock: activeVariant.stock, // Variant stock
        };
        // Add item multiple times based on quantity
        for (let i = 0; i < quantity; i++) {
          addItem(itemToAdd as Product);
        }
        await new Promise(resolve => setTimeout(resolve, 300));
        setToastMessage(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
        setShowToast(true);
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  const handleBuyNow = async () => {
    if (product && activeVariant && activeVariant.stock > 0 && !isBuying) {
      try {
        setIsBuying(true);
        const itemToBuy = {
          product: {
            ...product,
            id: activeVariant.id,
            name: `${product.name} (${Object.values(activeVariant.attributes).join(' - ')})`,
            price: activeVariant.price,
            image: product.image,
            stock: activeVariant.stock,
          },
          quantity,
        };
        setBuyNowItems([itemToBuy]);
        await new Promise(resolve => setTimeout(resolve, 100));
        router.push('/checkout');
      } catch (e) {
        console.error('Error during buy now:', e);
        setIsBuying(false);
      }
    } else {
      setToastMessage('Vui lòng chọn phiên bản hoặc sản phẩm đã hết hàng');
      setShowToast(true);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg aspect-square" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <X className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h1>
            <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button onClick={() => router.push('/home')} className="gradient-primary text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Về trang chủ
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-4 md:py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm mb-6 bg-white px-4 py-3 rounded-lg shadow-sm">
          <Link href="/" className="text-gray-500 hover:text-green-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/home" className="text-gray-500 hover:text-green-600 transition-colors">
            Sản phẩm
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {product.category && (
            <>
              <span className="text-gray-500 hover:text-green-600 transition-colors cursor-pointer">
                {product.category}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </>
          )}
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>



        {/* Product Details Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className={`grid gap-6 p-6 ${images.length > 1 ? 'lg:grid-cols-[auto_1fr_400px]' : 'lg:grid-cols-[1fr_400px]'}`}>
            {/* Left: Thumbnail Images (Vertical) - Only show if multiple images */}
            {images.length > 1 && (
              <div className="hidden lg:flex flex-col gap-3 w-20">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImageIndex === index
                        ? 'border-green-500 ring-2 ring-green-200 shadow-md'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Center: Main Image */}
            <div className="flex flex-col gap-4">
              <div
                className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-200 group cursor-zoom-in"
                onMouseMove={(e) => {
                  if (!showZoom) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomPosition({ x, y });
                }}
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => {
                  setShowZoom(false);
                  setZoomPosition(null);
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={images[selectedImageIndex] || product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-4"
                      priority
                      style={{
                        transform: showZoom && zoomPosition ? `scale(2) translate(${(zoomPosition.x - 50) * -0.5}%, ${(zoomPosition.y - 50) * -0.5}%)` : 'scale(1)',
                        transformOrigin: zoomPosition ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center center',
                        transition: 'transform 0.1s ease-out',
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-30"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) => (prev + 1) % images.length);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-30"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}


              </div>

              {/* Mobile Thumbnail Grid */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3 lg:hidden">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-green-500 ring-2 ring-green-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 25vw, 12.5vw"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="space-y-5">
              {/* Product Title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.brand && (
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {product.brand}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-600">
                  {Object.values(activeVariant?.attributes || {}).join(' | ')}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews || 169402})</span>
              </div>

              {/* Variant Selection */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Chọn phiên bản
                  </label>
                  <div className="space-y-2">
                    {product.variants.map((variant) => {
                      const isSelected = activeVariant?.id === variant.id;
                      const variantDiscount = variant.original_price && variant.original_price > variant.price;

                      return (
                        <button
                          key={variant.id}
                          onClick={() => handleVariantSelect(variant)}
                          className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                            isSelected
                              ? 'border-green-500 bg-green-50 shadow-md'
                              : 'border-gray-200 bg-white hover:border-green-300'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 mb-1">
                                {formatVariantName(variant)}
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                {variant.stock > 0 ? (
                                  <span className="text-green-600">✓ Còn hàng ({variant.stock})</span>
                                ) : (
                                  <span className="text-red-600">✗ Hết hàng</span>
                                )}
                                {variant.battery_health && (
                                  <span className="text-blue-600 flex items-center gap-1">
                                    <Battery className="w-4 h-4" />
                                    Pin: {variant.battery_health}%
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">
                                {formatPrice(variant.price)}
                              </div>
                              {variantDiscount && (
                                <div className="text-sm text-gray-400 line-through">
                                  {formatPrice(variant.original_price!)}
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Warranty Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                <Check className="w-5 h-5 text-green-600" />
                <span>Bảo hành từ người bán: <strong className="text-green-700">12 tháng</strong></span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-br from-green-50 to-green-50 p-5 rounded-xl border-2 border-green-200 relative overflow-hidden">
                {/* Discount Badge - Móc góc */}
                {hasDiscount && (
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-3 py-1.5 rounded-bl-xl rounded-tr-xl shadow-lg">
                        <span className="text-sm font-bold">
                          -{Math.round(((originalPriceValue - currentPrice) / originalPriceValue) * 100)}%
                        </span>
                      </div>
                      {/* Triangle decoration */}
                      <div className="absolute -bottom-1 right-0 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-red-800"></div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <span className="text-4xl font-bold text-green-600">
                    {formatPrice(currentPrice)}
                  </span>
                  {hasDiscount && (
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(originalPriceValue)}
                    </span>
                  )}
                </div>
                {displayVariant && displayVariant.stock > 0 && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Còn hàng</span>
                  </div>
                )}
              </div>

              {/* Compare Link */}
              <button className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-semibold">
                <Info className="w-4 h-4" />
                So sánh với sản phẩm tương tự
              </button>

              {/* Delivery Info */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">Giao hàng: 26 Tháng 11 - 1 Tháng 12</p>
                    <p className="text-gray-600">Đổi trả miễn phí trong 30 ngày</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Phạm vi giao hàng: + Cáp USB-C tương thích
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  onClick={handleBuyNow}
                  disabled={!activeVariant || activeVariant.stock === 0 || isBuying}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-14 text-lg font-semibold disabled:opacity-50 shadow-lg transition-all"
                >
                  {isBuying ? 'Đang xử lý...' : 'Mua ngay'}
                </Button>

                <Button
                  onClick={handleAddToCart}
                  disabled={!activeVariant || activeVariant.stock === 0 || isAddingToCart}
                  className="w-full bg-green-500 hover:bg-green-600 text-white h-14 text-lg font-semibold disabled:opacity-50 shadow-lg transition-all"
                >
                  {isAddingToCart ? 'Đang thêm...' : 'Thêm vào giỏ'}
                </Button>
              </div>

              {/* Features Icons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Hoạt động như mới</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Đổi trả 30 ngày</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Bảo hành 12 tháng</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <Battery className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Thân thiện môi trường</span>
                </div>
              </div>

              {/* Sale & Shipping Info */}
              <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
                <p className="mb-1">
                  <strong>Bán & vận chuyển:</strong> {product.brand || 'Becare Tech'} | Tất cả ưu đãi
                </p>
                <p>
                  <strong>Giao hàng từ:</strong> Việt Nam
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description and Specifications */}
        <div className="mt-16 md:mt-20 pt-12 border-t border-gray-200">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mô tả sản phẩm</h2>
              <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {product.description}
                  </ReactMarkdown>
                ) : <p>Chưa có mô tả cho sản phẩm này.</p>}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Thông số kỹ thuật</h2>
              {Array.isArray(product.specifications) && product.specifications.length > 0 ? (
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between text-sm p-3 rounded-lg even:bg-gray-50">
                      <dt className="font-semibold text-gray-800 capitalize">{spec.key}</dt>
                      <dd className="text-gray-600 text-right">{String(spec.value)}</dd>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-gray-500">Chưa có thông số kỹ thuật.</p>}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 md:mt-20 pt-12 border-t border-gray-200">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Sản phẩm liên quan
              </h2>
              <p className="text-gray-600">
                Các sản phẩm tương tự bạn có thể quan tâm
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                  compact
                />
              ))}
            </div>
          </section>
        )}

        {/* Info Section */}
        <section id="thong-tin" className="mt-16 md:mt-20 pt-12 border-t border-gray-200">
          <InfoSection />
        </section>

        {/* FAQ Section */}
        <section id="hoi-dap" className="mt-16 md:mt-20 pt-12 border-t border-gray-200">
          <FAQ />
        </section>

        {/* User Q&A Section */}
        <section id="khach-hang" className="mt-16 md:mt-20 pt-12 border-t border-gray-200">
          <UserQA />
        </section>

        {/* Consultation Section */}
        <section id="tu-van" className="mt-16 md:mt-20 pt-12 border-t border-gray-200 py-16 md:py-20 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden rounded-2xl">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cần tư vấn?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hotline</h3>
                <a href="tel:18002097" className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors block mb-3">
                  1800 2097
                </a>
                <p className="text-sm text-gray-600">24/7 miễn phí</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Chat trực tuyến</h3>
                <button className="text-green-600 hover:text-green-700 font-semibold mb-3">
                  Nhấn để chat
                </button>
                <p className="text-sm text-gray-600">Phản hồi ngay lập tức</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                <a href="mailto:info@refurbest.vn" className="text-green-600 hover:text-green-700 font-semibold mb-3 block break-all">
                  info@refurbest.vn
                </a>
                <p className="text-sm text-gray-600">Phản hồi trong 24h</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Để lại thông tin, chúng tôi sẽ liên hệ
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <Botchat />

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

