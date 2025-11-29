"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash2, Eye, X, DollarSign, Package, Tag, UploadCloud, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Toast from "@/components/Toast";
import { uploadToImgbb } from "@/lib/imgbb";
import { Product, ProductVariant } from "@/types";

// Using the interface from types/index.ts

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" | "info" } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    image: "",
    images: [] as string[],
    description: "",
    specifications: [] as { id: string; key: string; value: string }[],
    variants: [] as Partial<ProductVariant>[],
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const filteredProducts = productList.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*, variants:product_variants(*)')
        .order('created_at', { ascending: false });

      if (error) {
        setToast({ message: 'Lỗi khi tải sản phẩm: ' + error.message, type: 'error' });
      } else {
        setProductList(data || []);
      }
    } catch (error) {
      setToast({ message: 'Lỗi khi tải sản phẩm', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddProduct = () => {
    setIsEditMode(false);
    setEditingProductId(null);
    setFormData({
      name: "",
      brand: "",
      category: "",
      image: "",
      images: [],
      description: "",
      specifications: [],
      variants: [],
    });
    setShowModal(true);
  };

  const handleImageUpload = async (file: File, isGallery: boolean = false, galleryIndex?: number) => {
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadToImgbb(file);
      if (isGallery) {
        setFormData(prev => {
          const newImages = [...(prev.images || [])];
          if (galleryIndex !== undefined) {
            newImages[galleryIndex] = url;
          } else {
            newImages.push(url);
          }
          return { ...prev, images: newImages };
        });
      } else {
        setFormData(prev => ({ ...prev, image: url }));
      }
      setToast({ message: "Tải ảnh lên thành công", type: "success" });
    } catch (e: any) {
      setToast({ message: `Lỗi tải ảnh: ${e.message}`, type: "error" });
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => uploadToImgbb(file));
      const urls = await Promise.all(uploadPromises);
      setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...urls] }));
      setToast({ message: `Đã tải lên ${urls.length} ảnh`, type: "success" });
    } catch (e: any) {
      setToast({ message: `Lỗi tải ảnh: ${e.message}`, type: "error" });
    } finally {
      setUploading(false);
    }
  };

  const handleVariantImageUpload = async (files: FileList, variantIndex: number) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => uploadToImgbb(file));
      const urls = await Promise.all(uploadPromises);

      const newVariants = [...formData.variants!];
      const currentImages = newVariants[variantIndex].images || [];
      newVariants[variantIndex].images = [...currentImages, ...urls];

      setFormData(p => ({ ...p, variants: newVariants }));
      setToast({ message: `Đã tải lên ${urls.length} ảnh cho phiên bản`, type: "success" });
    } catch (e: any) {
      setToast({ message: `Lỗi tải ảnh: ${e.message}`, type: "error" });
    } finally {
      setUploading(false);
    }
  };

  const saveProduct = async () => {
    if (!formData.name || !formData.category) {
      setToast({ message: "Tên sản phẩm và danh mục là bắt buộc!", type: "error" });
      return;
    }
    if (!formData.variants || formData.variants.length === 0) {
      setToast({ message: "Sản phẩm phải có ít nhất một phiên bản.", type: "error" });
      return;
    }

    try {
      setSaving(true);
      const supabase = createClient();
      const isNewProduct = !isEditMode || !editingProductId;
      const productId = isNewProduct
        ? formData.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
        : editingProductId!;

      // 1. Upsert product data
      const productData = {
        id: productId,
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        image: formData.image,
        images: formData.images || [],
        description: formData.description,
        specifications: formData.specifications?.map(({ key, value }) => ({ key, value })) || [],
        status: 'active',
      };

      console.log('💾 Saving product with images:', productData.images);

      const { error: productError } = await supabase.from('products').upsert(productData);
      if (productError) throw productError;

      // 2. Delete old variants if in edit mode
      if (isEditMode && editingProductId) {
        const { error: deleteError } = await supabase.from('product_variants').delete().eq('product_id', editingProductId);
        if (deleteError) {
          // Log the error but proceed, as we are inserting new ones anyway
          console.error('Error deleting old variants, but proceeding:', deleteError);
        }
      }

      // 3. Insert new variants
      const variantsData = formData.variants.map(v => ({
        product_id: productId,
        price: v.price,
        original_price: v.original_price,
        stock: v.stock,
        attributes: v.attributes,
        images: v.images || [],
        battery_health: v.battery_health || null,
      }));

      if (variantsData.length > 0) {
        const { error: variantsError } = await supabase.from('product_variants').insert(variantsData);
        if (variantsError) throw variantsError;
      }

      setToast({ message: isEditMode ? "Cập nhật thành công!" : "Thêm sản phẩm thành công!", type: "success" });

      // Reset form
      setFormData({
        name: "",
        brand: "",
        category: "",
        image: "",
        images: [],
        description: "",
        specifications: [],
        variants: [],
      });
      setIsEditMode(false);
      setEditingProductId(null);
      setShowModal(false);

      fetchProducts(); // Refresh list

    } catch (e: any) {
      setToast({ message: `Lỗi lưu sản phẩm: ${e.message}`, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = async (product: Product) => {
    setIsEditMode(true);
    setEditingProductId(product.id);

    const supabase = createClient();
    const { data: variants, error } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', product.id);

    if (error) {
      setToast({ message: "Lỗi tải phiên bản sản phẩm", type: "error" });
      return;
    }

    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      image: product.image,
      images: product.images || [],
      description: product.description || "",
      specifications: Array.isArray(product.specifications) ? product.specifications.map(spec => ({ ...spec, id: crypto.randomUUID() })) : [],
      variants: variants || [],
    });
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      return;
    }

    try {
      setDeletingIds(prev => new Set(prev).add(productId));
      const supabase = createClient();
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        setToast({ message: 'Lỗi khi xóa sản phẩm: ' + error.message, type: 'error' });
        return;
      }

      setProductList(productList.filter(p => p.id !== productId));
      setToast({ message: "Đã xóa sản phẩm thành công!", type: 'success' });
    } catch (error) {
      setToast({ message: 'Lỗi khi xóa sản phẩm', type: 'error' });
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <p className="text-gray-600 mt-1">Quản lý toàn bộ sản phẩm của hệ thống</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
              />
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={handleAddProduct}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Thêm sản phẩm
            </Button>
          </motion.div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải sản phẩm...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có sản phẩm</h3>
              <p className="text-gray-600 mb-6">Bắt đầu thêm sản phẩm đầu tiên của bạn</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={handleAddProduct}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Thêm sản phẩm đầu tiên
                </Button>
              </motion.div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Hình ảnh</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên sản phẩm</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Giá</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tồn kho</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={product.image || '/placeholder.png'}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-2">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800">{product.variants && product.variants.length > 0 ? `${formatPrice(Math.min(...product.variants.map(v => v.price || 0)))}` : 'N/A'}</p>
                        <p className="text-xs text-gray-500">{product.variants?.length || 0} phiên bản</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-800">{product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0}</span>
                        <span className="text-xs text-gray-500"> SP</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditProduct(product)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            disabled={deletingIds.has(product.id)}
                            className="text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingIds.has(product.id) ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/50 z-[9998]"
            />
            
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-6">



                  {/* THÔNG TIN CƠ BẢN */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Thông tin cơ bản</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tên sản phẩm *</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="VD: iPhone 17 Pro" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Thương hiệu *</label>
                          <input type="text" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="VD: Apple" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Danh mục *</label>
                          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="">Chọn danh mục</option>
                            {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả chi tiết</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows={4} placeholder="Mô tả các tính năng nổi bật của sản phẩm..."></textarea>
                      </div>
                    </div>
                  </div>

                  {/* HÌNH ẢNH */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Hình ảnh sản phẩm</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Ảnh đại diện</label>
                        <div className="aspect-square border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                          {formData.image ? <Image src={formData.image} alt="Main" width={150} height={150} className="object-contain" /> : <span className="text-xs text-gray-400">Chưa có ảnh</span>}
                        </div>
                        <Button asChild variant="outline" className="w-full text-xs" disabled={uploading}>
                          <label>{uploading ? "Đang tải..." : "Tải ảnh"}<input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])} /></label>
                        </Button>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Thư viện ảnh (gallery)</label>
                        <div className="grid grid-cols-4 gap-2 min-h-[100px] p-2 border rounded-lg bg-gray-50">
                          {formData.images?.map((img, i) => (
                            <div key={`${img}-${i}`} className="relative aspect-square border rounded overflow-hidden">
                              <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  console.log('🗑️ Deleting image at index:', i);
                                  setFormData(p => {
                                    const newImages = p.images?.filter((_, idx) => idx !== i) || [];
                                    console.log('📸 Images after delete:', newImages);
                                    return { ...p, images: newImages };
                                  });
                                }}
                                className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-0.5 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <Button asChild variant="outline" className="w-full text-xs" disabled={uploading}>
                          <label>{uploading ? "Đang tải..." : "Tải nhiều ảnh"}<input type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)} /></label>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* THÔNG SỐ KỸ THUẬT */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Thông số kỹ thuật</h3>
                    <div className="space-y-2">
                      {formData.specifications?.map((spec) => (
                        <div key={spec.id} className="flex items-center gap-2">
                          <input type="text" value={spec.key} onChange={(e) => {
                            const newSpecs = formData.specifications.map(s => s.id === spec.id ? { ...s, key: e.target.value } : s);
                            setFormData(p => ({ ...p, specifications: newSpecs }));
                          }} placeholder="Thuộc tính (VD: Màn hình)" className="w-1/3 px-3 py-2 border rounded-lg" />
                          <input type="text" value={spec.value} onChange={(e) => {
                            const newSpecs = formData.specifications.map(s => s.id === spec.id ? { ...s, value: e.target.value } : s);
                            setFormData(p => ({ ...p, specifications: newSpecs }));
                          }} placeholder="Giá trị (VD: 6.7 inch Super Retina XDR)" className="flex-1 px-3 py-2 border rounded-lg" />
                          <Button variant="ghost" size="icon" onClick={() => setFormData(p => ({ ...p, specifications: p.specifications?.filter(s => s.id !== spec.id) }))}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setFormData(p => ({ ...p, specifications: [...(p.specifications || []), { id: crypto.randomUUID(), key: "", value: "" }] }))} className="mt-3">+ Thêm thông số</Button>
                  </div>

                  {/* CÁC PHIÊN BẢN */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Các phiên bản (giá, tồn kho)</h3>
                    <div className="space-y-3">
                      {formData.variants?.map((variant, v_idx) => (
                        <div key={v_idx} className="p-3 bg-gray-50 rounded-lg border space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="font-medium text-gray-800">Phiên bản #{v_idx + 1}</div>
                            <Button variant="ghost" size="icon" onClick={() => setFormData(p => ({ ...p, variants: p.variants?.filter((_, i) => i !== v_idx) }))}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                          </div>
                          {/* Variant attributes as a full combo */}
                          <div className="space-y-2">
                            <label className="text-xs font-semibold">Phiên bản (RAM, Dung lượng, Màu, Tình trạng)</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              <input
                                type="text"
                                placeholder="RAM (vd: 12GB)"
                                value={(variant.attributes?.['RAM'] as any) || ''}
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                onChange={(e) => { const newVariants = [...formData.variants!]; newVariants[v_idx].attributes = { ...(variant.attributes || {}), ['RAM']: e.target.value }; setFormData(p => ({ ...p, variants: newVariants })); }}
                              />
                              <input
                                type="text"
                                placeholder="Dung lượng (vd: 256GB)"
                                value={(variant.attributes?.['Dung lượng'] as any) || (variant.attributes?.['Dung Lượng'] as any) || ''}
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                onChange={(e) => { const newVariants = [...formData.variants!]; newVariants[v_idx].attributes = { ...(variant.attributes || {}), ['Dung lượng']: e.target.value }; setFormData(p => ({ ...p, variants: newVariants })); }}
                              />
                              <input
                                type="text"
                                placeholder="Màu (vd: Xám Titan)"
                                value={(variant.attributes?.['Màu'] as any) || ''}
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                onChange={(e) => { const newVariants = [...formData.variants!]; newVariants[v_idx].attributes = { ...(variant.attributes || {}), ['Màu']: e.target.value }; setFormData(p => ({ ...p, variants: newVariants })); }}
                              />
                              <input
                                type="text"
                                placeholder="Tình trạng (vd: Mới, Như mới 99%)"
                                value={(variant.attributes?.['Tình trạng'] as any) || (variant.attributes?.['Tình Trạng'] as any) || ''}
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                onChange={(e) => { const newVariants = [...formData.variants!]; newVariants[v_idx].attributes = { ...(variant.attributes || {}), ['Tình trạng']: e.target.value }; setFormData(p => ({ ...p, variants: newVariants })); }}
                              />
                            </div>
                            <div className="text-xs text-gray-500">
                              Xem trước: {[
                                variant.attributes?.['RAM'],
                                (variant.attributes?.['Dung lượng'] || variant.attributes?.['Dung Lượng']),
                                variant.attributes?.['Màu'],
                                (variant.attributes?.['Tình trạng'] || variant.attributes?.['Tình Trạng'])
                              ].filter(Boolean).join(' | ') || '...'}
                            </div>

                            {/* Optional extra attributes */}
                            <details className="mt-1">
                              <summary className="text-xs text-gray-600 cursor-pointer select-none">Thuộc tính khác (tùy chọn)</summary>
                              <div className="mt-2 space-y-2">
                                {variant.attributes && Object.entries(variant.attributes).filter(([k]) => !['RAM','Dung lượng','Dung Lượng','Màu','Tình trạng','Tình Trạng'].includes(k)).map(([key, value], a_idx) => (
                                  <div key={a_idx} className="flex items-center gap-2">
                                    <input type="text" value={key} placeholder="Thuộc tính" className="w-1/3 px-3 py-2 border rounded-lg text-sm" onChange={(e) => { const newAttrs: any = { ...variant.attributes }; delete newAttrs[key]; newAttrs[e.target.value] = value; const newVariants = [...formData.variants!]; newVariants[v_idx].attributes = newAttrs; setFormData(p => ({ ...p, variants: newVariants })); }} />
                                    <input type="text" value={value as any} placeholder="Giá trị" className="flex-1 px-3 py-2 border rounded-lg text-sm" onChange={(e) => { const newAttrs: any = { ...variant.attributes, [key]: e.target.value }; const newVariants = [...formData.variants!]; newVariants[v_idx].attributes = newAttrs; setFormData(p => ({ ...p, variants: newVariants })); }} />
                                    <Button variant="ghost" size="icon" onClick={() => { const newAttrs: any = { ...variant.attributes }; delete newAttrs[key]; const newVariants = [...formData.variants!]; newVariants[v_idx].attributes = newAttrs; setFormData(p => ({ ...p, variants: newVariants })); }}><X size={14} /></Button>
                                  </div>
                                ))}
                                <Button size="sm" variant="outline" onClick={() => { const newKey = `Thuộc tính`; const newAttrs: any = { ...(variant.attributes || {}), [newKey]: "" }; const newVariants = [...formData.variants!]; newVariants[v_idx].attributes = newAttrs; setFormData(p => ({ ...p, variants: newVariants })); }}>+ Thêm thuộc tính khác</Button>
                              </div>
                            </details>
                          </div>
                          {/* Variant Images */}
                          <div className="pt-2 border-t">
                            <label className="text-xs font-semibold block mb-2">Ảnh của phiên bản này (tùy chọn)</label>
                            <div className="grid grid-cols-5 gap-2 min-h-[80px] p-2 border rounded-lg bg-white">
                              {variant.images?.map((img, img_idx) => (
                                <div key={img_idx} className="relative aspect-square border rounded overflow-hidden">
                                  <Image src={img} alt={`Variant ${v_idx} Image ${img_idx}`} fill className="object-cover" />
                                  <button
                                    onClick={() => {
                                      const newVariants = [...formData.variants!];
                                      newVariants[v_idx].images = newVariants[v_idx].images?.filter((_, i) => i !== img_idx);
                                      setFormData(p => ({ ...p, variants: newVariants }));
                                    }}
                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="w-full mt-2 text-xs"
                              disabled={uploading}
                            >
                              <label>
                                {uploading ? "Đang tải..." : "Tải ảnh cho phiên bản này"}
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  className="hidden"
                                  onChange={(e) => e.target.files && handleVariantImageUpload(e.target.files, v_idx)}
                                />
                              </label>
                            </Button>
                          </div>

                          {/* Price, Stock & Battery */}
                          <div className="grid grid-cols-4 gap-3 pt-2 border-t">
                            <div>
                              <label className="text-xs font-semibold">Giá bán *</label>
                              <input type="number" value={variant.price || ''} placeholder="0" className="w-full px-3 py-2 border rounded-lg text-sm" onChange={(e) => { const newVariants = [...formData.variants!]; newVariants[v_idx].price = Number(e.target.value); setFormData(p => ({ ...p, variants: newVariants })); }} />
                            </div>
                            <div>
                              <label className="text-xs font-semibold">Giá gốc</label>
                              <input type="number" value={variant.original_price || ''} placeholder="0" className="w-full px-3 py-2 border rounded-lg text-sm" onChange={(e) => { const newVariants = [...formData.variants!]; newVariants[v_idx].original_price = Number(e.target.value); setFormData(p => ({ ...p, variants: newVariants })); }} />
                            </div>
                            <div>
                              <label className="text-xs font-semibold">Tồn kho *</label>
                              <input type="number" value={variant.stock || ''} placeholder="0" className="w-full px-3 py-2 border rounded-lg text-sm" onChange={(e) => { const newVariants = [...formData.variants!]; newVariants[v_idx].stock = Number(e.target.value); setFormData(p => ({ ...p, variants: newVariants })); }} />
                            </div>
                            <div>
                              <label className="text-xs font-semibold">Pin (%)</label>
                              <input type="number" min="0" max="100" value={variant.battery_health || ''} placeholder="87" className="w-full px-3 py-2 border rounded-lg text-sm" onChange={(e) => { const newVariants = [...formData.variants!]; newVariants[v_idx].battery_health = Number(e.target.value); setFormData(p => ({ ...p, variants: newVariants })); }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" onClick={() => setFormData(p => ({ ...p, variants: [...(p.variants || []), { id: crypto.randomUUID(), attributes: { RAM: "", "Dung lượng": "", Màu: "", "Tình trạng": "" }, price: 0, original_price: 0, stock: 0, images: [] }] }))} className="mt-3 w-full border-dashed">+ Thêm phiên bản</Button>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => { setShowModal(false); setIsEditMode(false); setEditingProductId(null); }}
                      variant="outline"
                      className="flex-1"
                    >
                      Hủy
                    </Button>
                    <Button
                      onClick={saveProduct}
                      disabled={saving || uploading}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white disabled:opacity-50"
                    >
                      {saving ? 'Đang lưu...' : (isEditMode ? 'Lưu thay đổi' : 'Thêm sản phẩm')}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

