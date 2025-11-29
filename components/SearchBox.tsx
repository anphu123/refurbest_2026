"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface SearchResult {
  id: string;
  name: string;
  brand: string;
  price: number | null;
  image: string;
  category: string;
  variants?: Array<{ price: number }>;
}

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      await searchProducts(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const searchProducts = async (searchQuery: string) => {
    try {
      const supabase = createClient();
      
      // First get products
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("id, name, brand, image, category")
        .ilike("name", `%${searchQuery}%`)
        .eq("status", "active")
        .limit(6);

      if (productsError) {
        console.error("Supabase search error:", productsError);
        setResults([]);
        return;
      }

      if (!products || products.length === 0) {
        console.log("No products found");
        setResults([]);
        return;
      }

      // Get variants for these products to get prices
      const productIds = products.map(p => p.id);
      const { data: variants, error: variantsError } = await supabase
        .from("product_variants")
        .select("product_id, price")
        .in("product_id", productIds)
        .order("price", { ascending: true });

      if (variantsError) {
        console.error("Variants error:", variantsError);
      }

      // Map products with their lowest price
      const resultsWithPrices = products.map(product => {
        const productVariants = variants?.filter(v => v.product_id === product.id) || [];
        const lowestPrice = productVariants.length > 0 
          ? Math.min(...productVariants.map(v => v.price))
          : null;
        
        return {
          ...product,
          price: lowestPrice,
        };
      });

      console.log("Search results with prices:", resultsWithPrices);
      setResults(resultsWithPrices);
    } catch (error: any) {
      console.error("Search error:", error?.message || error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRecentSearch = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSelectProduct = (product: SearchResult) => {
    saveRecentSearch(query);
    setIsOpen(false);
    setQuery("");
    router.push(`/product/${product.id}`);
  };

  const handleRecentSearch = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-2xl" style={{ zIndex: 200 }}>
      {/* Search Input */}
      <div className="relative" style={{ zIndex: 200 }}>
        <Search className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm điện thoại..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-8 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-3.5 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 sm:focus:ring-4 focus:ring-green-100 transition-all font-medium text-xs sm:text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {isOpen && (query || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-h-[500px] overflow-y-auto"
            style={{ 
              zIndex: 99999,
            }}
          >
            {/* Loading State */}
            {isLoading && (
              <div className="p-4 text-center text-gray-500">
                <div className="inline-block w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2 text-sm">Đang tìm kiếm...</span>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && query && results.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-600">
                    Tìm thấy {results.length} kết quả
                  </p>
                </div>
                {results.map((product) => (
                  <motion.button
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-green-50 transition-colors border-b border-gray-100 last:border-0"
                    whileHover={{ x: 4 }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {highlightMatch(product.name, query)}
                      </p>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">
                        {product.price ? formatPrice(product.price) : "Liên hệ"}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && query && results.length === 0 && (
              <div className="p-6 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-600 font-medium">
                  Không tìm thấy sản phẩm "{query}"
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Thử tìm kiếm với từ khóa khác
                </p>
              </div>
            )}

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Tìm kiếm gần đây
                  </p>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-red-500 hover:text-red-600 font-medium"
                  >
                    Xóa tất cả
                  </button>
                </div>
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearch(term)}
                    className="w-full px-4 py-2.5 flex items-center gap-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 text-left"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{term}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches (when no query and no recent) */}
            {!query && recentSearches.length === 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Tìm kiếm phổ biến
                  </p>
                </div>
                {["iPhone 14", "Samsung S23", "Xiaomi 13", "Oppo Reno"].map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearch(term)}
                    className="w-full px-4 py-2.5 flex items-center gap-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 text-left"
                  >
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{term}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
