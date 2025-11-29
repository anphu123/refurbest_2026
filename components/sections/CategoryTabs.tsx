"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Grid3x3, List, ChevronRight, Filter, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import * as LucideIcons from "lucide-react";

export default function CategoryTabs() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedBatteryRange, setSelectedBatteryRange] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [availableFilters, setAvailableFilters] = useState<Record<string, string[]>>({});
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(20);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const supabase = createClient();
        
        // Load categories from backend
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (!categoriesError && categoriesData && categoriesData.length > 0) {
          const mappedCategories = categoriesData.map(cat => {
            const IconName = cat.icon || 'Smartphone';
            const IconComponent = (LucideIcons as any)[IconName] || LucideIcons.Smartphone;
            return {
              ...cat,
              Icon: IconComponent,
              image: cat.image || null,
            };
          });
          setCategories(mappedCategories);
        } else {
          setCategories([]);
        }
        
        // Load products from backend with variants
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*, specifications, variants:product_variants(*)')
          .eq('status', 'active');
        
        if (!productsError && productsData && productsData.length > 0) {
          // Derive price/originalPrice/stock from variants for UI usage
          const mappedProducts = (productsData as any[]).map((p) => {
            const variants = Array.isArray(p.variants) ? p.variants : [];
            const prices = variants.map((v: any) => Number(v.price || 0)).filter((n: number) => Number.isFinite(n));
            const originalPrices = variants.map((v: any) => Number(v.original_price ?? v.price ?? 0)).filter((n: number) => Number.isFinite(n));
            const minPrice = prices.length > 0 ? Math.min(...prices) : Number(p.price || 0);
            const minOriginal = originalPrices.length > 0 ? Math.min(...originalPrices) : Number(p.originalPrice ?? p.original_price ?? p.price ?? 0);
            const totalStock = variants.reduce((sum: number, v: any) => sum + Number(v.stock || 0), Number(p.stock || 0));
            return { ...p, price: minPrice, originalPrice: minOriginal, stock: totalStock };
          });

          setProducts(mappedProducts as any);

          // Extract available filters from all variants
          const allOptions: Record<string, Set<string>> = {};
          (productsData as any[]).forEach(product => {
            if (product.variants) {
              (product.variants as any[]).forEach(variant => {
                Object.entries(variant.attributes).forEach(([key, value]) => {
                  if (!allOptions[key]) {
                    allOptions[key] = new Set();
                  }
                  allOptions[key].add(value as string);
                });
              });
            }
          });

          const finalFilters: Record<string, string[]> = {};
          for (const key in allOptions) {
            finalFilters[key] = Array.from(allOptions[key]).sort();
          }
          setAvailableFilters(finalFilters);

        } else {
          setProducts([]);
        }
      } catch (e) {
        console.error('Error loading data:', e);
        setCategories([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Listen for brand filter changes from BrandLogos
  useEffect(() => {
    const handleBrandFilter = (e: CustomEvent) => {
      setSelectedBrand(e.detail.brand);
      setSelectedCategory(""); // Clear category when brand is selected
      setDisplayLimit(20);
    };

    window.addEventListener('brandFilterChange', handleBrandFilter as EventListener);
    
    // Check sessionStorage on mount
    if (typeof window !== 'undefined') {
      try {
        const savedBrand = sessionStorage.getItem('selectedBrand');
        if (savedBrand) {
          setSelectedBrand(savedBrand);
          sessionStorage.removeItem('selectedBrand');
        }
      } catch (e) {
        // Ignore storage errors
      }
    }

    return () => {
      window.removeEventListener('brandFilterChange', handleBrandFilter as EventListener);
    };
  }, []);

  const handleFilterChange = (filterKey: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterKey]: value,
    }));
    setDisplayLimit(20); // Reset limit on filter change
  };

  // Filter products
  let filteredProducts = products;
  // 1. Filter by Brand and Category
  if (selectedBrand) {
    filteredProducts = products.filter(p => p.brand === selectedBrand);
  }
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  // 2. Filter by dynamic attributes (color, storage, etc.)
  const activeAttributeFilters = Object.entries(selectedFilters).filter(([, value]) => value);
  if (activeAttributeFilters.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      if (!p.variants || p.variants.length === 0) return false;
      // A product is a match if AT LEAST ONE of its variants matches ALL active filters
      return p.variants.some((variant: any) =>
        activeAttributeFilters.every(([key, value]) => variant.attributes[key] === value)
      );
    });
  }

  // 3. Filter by battery health
  if (selectedBatteryRange) {
    filteredProducts = filteredProducts.filter(p => {
      if (!p.variants || p.variants.length === 0) return false;
      return p.variants.some((variant: any) => {
        const battery = variant.battery_health;
        if (!battery) return false;
        
        switch (selectedBatteryRange) {
          case "90-100":
            return battery >= 90 && battery <= 100;
          case "80-89":
            return battery >= 80 && battery < 90;
          case "70-79":
            return battery >= 70 && battery < 80;
          default:
            return true;
        }
      });
    });
  }

  // Sort products
  switch (sortBy) {
    case "price-asc":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "hot":
      filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      break;
    default:
      filteredProducts.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  }

  const displayedProducts = filteredProducts.slice(0, displayLimit);

  return (
    <div className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Danh mục sản phẩm
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Khám phá các dòng điện thoại phù hợp với nhu cầu của bạn
          </p>
        </div>

        {/* Categories Grid - Modern Card Design */}
        <div className="mb-8 md:mb-12">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-32 animate-pulse" />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {/* All Products Button */}
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedBrand("");
                  setDisplayLimit(20);
                }}
                className={`group relative rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden aspect-[4/3] sm:aspect-[3/2] ${
                  selectedCategory === ""
                    ? "border-green-500 shadow-lg"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-700" />
                {/* Overlay */}
                <div className={`absolute inset-0 ${selectedCategory === "" ? 'bg-black/30' : 'bg-black/20 group-hover:bg-black/30'} transition-colors`} />
                {/* Icon and label */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-2">
                    <Grid3x3 className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm">Tất cả</span>
                </div>
              </button>

              {/* Category Buttons */}
              {categories.map((cat, index) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(isActive ? "" : cat.id);
                      setDisplayLimit(20);
                    }}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    className={`group relative rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden animate-fade-in-up aspect-[4/3] sm:aspect-[3/2] flex items-center justify-center text-center ${
                      isActive
                        ? "border-green-500 shadow-lg"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    {/* Fallback gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-700" />
                    {cat.image && (
                      <img src={cat.image} alt={cat.name} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-90" />
                    )}
                    <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? 'bg-black/35' : 'bg-black/15 group-hover:bg-black/30'}`}></div>
                    <span className="relative z-10 text-sm font-bold text-white line-clamp-2 leading-tight px-2">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Chưa có danh mục sản phẩm</p>
            </div>
          )}
        </div>

        {/* Filters and View Options */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm md:text-base font-medium text-gray-700">
              {selectedBrand 
                ? `${filteredProducts.length} sản phẩm ${selectedBrand}`
                : selectedCategory 
                ? `${filteredProducts.length} sản phẩm`
                : `Tất cả ${filteredProducts.length} sản phẩm`
              }
            </span>
            {/* Active Filters Pills */}
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedBrand && (
                <button onClick={() => setSelectedBrand("")} className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200">
                  <span>{selectedBrand}</span> <X size={12} />
                </button>
              )}
              {selectedBatteryRange && (
                <button onClick={() => setSelectedBatteryRange("")} className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                  <span>Pin: {selectedBatteryRange}%</span> <X size={12} />
                </button>
              )}
              {Object.entries(selectedFilters).map(([key, value]) => value && (
                <button key={key} onClick={() => handleFilterChange(key, "")} className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200">
                  <span>{key}: {value}</span> <X size={12} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Battery Health Filter */}
            <select
              value={selectedBatteryRange}
              onChange={(e) => {
                setSelectedBatteryRange(e.target.value);
                setDisplayLimit(20);
              }}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all cursor-pointer"
            >
              <option value="">Tất cả Pin</option>
              <option value="90-100">Pin 90-100%</option>
              <option value="80-89">Pin 80-89%</option>
              <option value="70-79">Pin 70-79%</option>
            </select>

            {/* Dynamic Attribute Filters */}
            {Object.entries(availableFilters).map(([key, values]) => (
              <select
                key={key}
                value={selectedFilters[key] || ""}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all cursor-pointer"
              >
                <option value="">Tất cả {key}</option>
                {values.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            ))}

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all cursor-pointer"
            >
              <option value="popular">Phổ biến</option>
              <option value="price-asc">Giá: Thấp → Cao</option>
              <option value="price-desc">Giá: Cao → Thấp</option>
              <option value="hot">Khuyến mãi HOT</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {loading ? (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
            : "space-y-4"
          }>
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium mb-2">Không tìm thấy sản phẩm</p>
            <p className="text-gray-400 text-sm">
              {selectedCategory 
                ? "Thử chọn danh mục khác hoặc xem tất cả sản phẩm"
                : "Chưa có sản phẩm nào trong hệ thống"
              }
            </p>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory("")}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Xem tất cả sản phẩm
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
              : "space-y-4"
            }>
              {displayedProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index} 
                  compact={viewMode === "grid"}
                />
              ))}
            </div>

            {/* Load More Button */}
            {filteredProducts.length > displayLimit && (
              <div className="text-center mt-8 md:mt-12">
                <button
                  onClick={() => {
                    setLoadingMore(true);
                    // Simulate loading delay for better UX
                    setTimeout(() => {
                      setDisplayLimit(filteredProducts.length);
                      setLoadingMore(false);
                    }, 500);
                  }}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang tải...</span>
                    </>
                  ) : (
                    <>
                      <span>Xem thêm {filteredProducts.length - displayLimit} sản phẩm</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
