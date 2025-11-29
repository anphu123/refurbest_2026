"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import Toast from "@/components/Toast";
import { uploadToImgbb } from "@/lib/imgbb";

interface Banner {
  id: string;
  title?: string | null;
  image: string;
  link_url?: string | null;
  order_index: number;
  status: "active" | "inactive";
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" | "info" } | null>(null);
  const [tableName, setTableName] = useState<'banners' | 'slideshow'>('banners');
  const [form, setForm] = useState<Partial<Banner>>({
    title: "",
    image: "",
    link_url: "",
    order_index: 0,
    status: "active",
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("banners")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      setBanners((data as any) || []);
    } catch (e: any) {
      setToast({ message: "Lỗi khi tải slideshow: " + (e.message || ""), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setIsEdit(false);
    setEditingId(null);
    setForm({ title: "", image: "", link_url: "", status: "active", order_index: (banners?.length || 0) + 1 });
    setShowModal(true);
  };

  const openEdit = (b: Banner) => {
    setIsEdit(true);
    setEditingId(b.id);
    setForm({ ...b });
    setShowModal(true);
  };

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const url = await uploadToImgbb(file);
      setForm((f) => ({ ...f, image: url }));
    } catch (e: any) {
      setToast({ message: "Upload ảnh thất bại: " + (e.message || ""), type: "error" });
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.image) {
      setToast({ message: "Vui lòng chọn ảnh", type: "error" });
      return;
    }
    try {
      setSaving(true);
      const supabase = createClient();
      if (isEdit && editingId) {
        const { error } = await supabase
          .from("banners")
          .update({
            title: form.title || null,
            image: form.image,
            link_url: form.link_url || null,
            order_index: form.order_index || 0,
            status: (form.status as any) || "active",
          })
          .eq("id", editingId);
        if (error) throw error;
        setToast({ message: "Cập nhật slide thành công", type: "success" });
      } else {
        const id = "bn_" + Date.now();
        const { error } = await supabase.from("banners").insert({
          id,
          title: form.title || null,
          image: form.image,
          link_url: form.link_url || null,
          order_index: form.order_index || (banners.length + 1),
          status: (form.status as any) || "active",
        });
        if (error) throw error;
        setToast({ message: "Thêm slide thành công", type: "success" });
      }
      setShowModal(false);
      await fetchBanners();
    } catch (e: any) {
      setToast({ message: "Lỗi lưu slide: " + (e.message || ""), type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Xóa slide này?")) return;
    try {
      const supabase = createClient();
      const { error } = await supabase.from("banners").delete().eq("id", id);
      if (error) throw error;
      setToast({ message: "Đã xóa", type: "success" });
      setBanners((prev) => prev.filter((b) => b.id !== id));
    } catch (e: any) {
      setToast({ message: "Lỗi xóa: " + (e.message || ""), type: "error" });
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= banners.length) return;
    const a = banners[index];
    const b = banners[target];
    try {
      const supabase = createClient();
      await supabase.from("banners").update({ order_index: b.order_index }).eq("id", a.id);
      await supabase.from("banners").update({ order_index: a.order_index }).eq("id", b.id);
      await fetchBanners();
    } catch (e: any) {
      setToast({ message: "Không đổi được thứ tự", type: "error" });
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Slideshow trang chủ</h1>
          <p className="text-gray-600 mt-1">Quản lý ảnh banner hiển thị trên đầu trang</p>
        </div>
        <Button onClick={openCreate} className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <Plus className="w-5 h-5 mr-2" /> Thêm slide
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-48 animate-pulse" />
          ))}
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          Chưa có slide nào
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((b, idx) => (
            <div key={b.id} className="bg-white rounded-xl border overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.image} alt={b.title || "banner"} className="w-full h-40 object-cover" />
              <div className="p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-gray-900 line-clamp-1">{b.title || "(Không tiêu đề)"}</div>
                  <div className="text-xs text-gray-500">Thứ tự: {b.order_index} • {b.status === "active" ? "Hiển thị" : "Ẩn"}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(idx, -1)} className="p-2 hover:bg-gray-100 rounded-lg" title="Lên">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => move(idx, 1)} className="p-2 hover:bg-gray-100 rounded-lg" title="Xuống">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button onClick={() => openEdit(b)} className="p-2 hover:bg-gray-100 rounded-lg" title="Sửa">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => remove(b.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg" title="Xóa">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="fixed inset-0 z-40 bg-black/50" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div className="p-5 border-b flex items-center justify-between">
                  <div className="font-bold text-lg">{isEdit ? "Sửa slide" : "Thêm slide"}</div>
                  <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-28 h-28 border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                      {form.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form.image} alt="preview" className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-xs text-gray-400">Chưa có ảnh</span>
                      )}
                    </div>
                    <div className="flex-1 grid grid-cols-1 gap-2">
                      <input
                        type="text"
                        value={form.image || ""}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Hoặc dán URL ảnh"
                      />
                      <label className="inline-block">
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && handleUpload(e.target.files[0])} />
                        <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${uploading ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"}`}>
                          {uploading ? "Đang tải lên..." : "Tải ảnh từ máy"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Tiêu đề</label>
                    <input type="text" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Link khi bấm (tùy chọn)</label>
                    <input type="text" value={form.link_url || ""} onChange={(e) => setForm({ ...form, link_url: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="https://..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold">Thứ tự</label>
                      <input type="number" value={form.order_index || 0} onChange={(e) => setForm({ ...form, order_index: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Trạng thái</label>
                      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })} className="w-full px-3 py-2 border rounded-lg">
                        <option value="active">Hiển thị</option>
                        <option value="inactive">Ẩn</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Hủy</Button>
                    <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white" disabled={saving} onClick={save}>
                      {saving ? "Đang lưu..." : isEdit ? "Cập nhật" : "Thêm"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {toast && <Toast message={toast.message} type={toast.type || "info"} onClose={() => setToast(null)} />}
    </div>
  );
}

