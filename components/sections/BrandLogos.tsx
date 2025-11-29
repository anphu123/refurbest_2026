"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function BrandLogos() {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('brand')
          .eq('status', 'active');
        
        if (!error && data && data.length > 0) {
          // Lấy unique brands từ products
          const uniqueBrands = Array.from(new Set(data.map(p => p.brand).filter(Boolean))) as string[];
          setBrands(uniqueBrands.sort());
        } else {
          setBrands([]);
        }
      } catch (e) {
        console.error('Error loading brands:', e);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  const handleBrandClick = (brand: string) => {
    // Scroll to products section và filter theo brand
    setTimeout(() => {
      const productsSection = document.getElementById('san-pham');
      if (productsSection) {
        const headerOffset = 150;
        const rect = productsSection.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const y = rect.top + scrollTop - headerOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }, 100);

    // Save brand filter to sessionStorage
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('selectedBrand', brand);
        // Trigger a custom event để CategoryTabs có thể lắng nghe
        window.dispatchEvent(new CustomEvent('brandFilterChange', { detail: { brand } }));
      } catch (e) {
        // Ignore storage errors
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Thương hiệu điện thoại</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 mb-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-14 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (brands.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Thương hiệu điện thoại
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Chọn thương hiệu yêu thích của bạn
          </p>
        </div>

        {/* Brand Grid - Modern Card Design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <button
              key={brand}
              onClick={() => handleBrandClick(brand)}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-2 active:translate-y-0 overflow-hidden animate-fade-in-up"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Brand Name */}
              <div className="relative z-10">
                <span className="font-bold text-base md:text-lg text-gray-900 group-hover:text-red-600 transition-colors duration-300 block">
                  {brand}
                </span>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-red-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

