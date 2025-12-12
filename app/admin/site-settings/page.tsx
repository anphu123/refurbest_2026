"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2, Plus, Trash2, FileText, Target, BarChart3, Tag, Sparkles, MessageSquare } from "lucide-react";
import Toast from "@/components/Toast";

interface WhyChooseItem {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

interface SiteSettings {
  id: string;
  site_name: string;
  site_description: string;
  email: string;
  phone: string;
  hero_badge: string;
  hero_headlines: string[];
  hero_descriptions: string[];
  stats_products: number;
  stats_customers: number;
  stats_rating: number;
  stats_satisfaction: number;
  brand_section_title: string;
  brand_section_subtitle: string;
  why_choose_title: string;
  why_choose_subtitle: string;
  why_choose_items: WhyChooseItem[];
  testimonials_title: string;
  testimonials_subtitle: string;
}

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from("site_settings").select("*").single();
      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error("Error:", error);
      setToast({ message: "Lỗi khi tải cài đặt", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("site_settings").update(settings).eq("id", settings.id);
      if (error) throw error;
      setToast({ message: "Lưu cài đặt thành công!", type: "success" });
    } catch (error) {
      console.error("Error:", error);
      setToast({ message: "Lỗi khi lưu cài đặt", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const addHeadline = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      hero_headlines: [...settings.hero_headlines, ""],
      hero_descriptions: [...settings.hero_descriptions, ""],
    });
  };

  const removeHeadline = (index: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      hero_headlines: settings.hero_headlines.filter((_, i) => i !== index),
      hero_descriptions: settings.hero_descriptions.filter((_, i) => i !== index),
    });
  };

  const addWhyChooseItem = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      why_choose_items: [...settings.why_choose_items, { icon: "CheckCircle", title: "", subtitle: "", description: "" }],
    });
  };

  const removeWhyChooseItem = (index: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      why_choose_items: settings.why_choose_items.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          Không tìm thấy cài đặt. Vui lòng chạy migration database.
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Cài đặt Website</h1>
          <p className="text-gray-600 mt-2">Quản lý nội dung hiển thị trên trang chủ</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50">
          {saving ? <><Loader2 className="w-5 h-5 animate-spin" />Đang lưu...</> : <><Save className="w-5 h-5" />Lưu thay đổi</>}
        </button>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold">Thông tin cơ bản</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tên website</label>
              <input type="text" value={settings.site_name} onChange={(e) => setSettings({ ...settings, site_name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Số điện thoại</label>
              <input type="text" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="1800 2097" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Mô tả website</label>
              <textarea value={settings.site_description} onChange={(e) => setSettings({ ...settings, site_description: e.target.value })} rows={3} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold">Banner chính (Hero)</h2>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Badge text</label>
            <input type="text" value={settings.hero_badge} onChange={(e) => setSettings({ ...settings, hero_badge: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="THIẾT BỊ TÂN TRANG CHẤT LƯỢNG" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tiêu đề & Mô tả (xoay vòng)</h3>
              <button onClick={addHeadline} className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                <Plus className="w-4 h-4" />Thêm slide
              </button>
            </div>
            {settings.hero_headlines.map((headline, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Slide {index + 1}</span>
                  {settings.hero_headlines.length > 1 && (
                    <button onClick={() => removeHeadline(index)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tiêu đề (dùng \n để xuống dòng)</label>
                  <textarea value={headline} onChange={(e) => { const newHeadlines = [...settings.hero_headlines]; newHeadlines[index] = e.target.value; setSettings({ ...settings, hero_headlines: newHeadlines }); }} rows={2} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mô tả</label>
                  <textarea value={settings.hero_descriptions[index] || ""} onChange={(e) => { const newDescriptions = [...settings.hero_descriptions]; newDescriptions[index] = e.target.value; setSettings({ ...settings, hero_descriptions: newDescriptions }); }} rows={3} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold">Thống kê</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Số sản phẩm</label>
              <input type="number" value={settings.stats_products} onChange={(e) => setSettings({ ...settings, stats_products: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Số khách hàng</label>
              <input type="number" value={settings.stats_customers} onChange={(e) => setSettings({ ...settings, stats_customers: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Đánh giá (1-5)</label>
              <input type="number" step="0.1" value={settings.stats_rating} onChange={(e) => setSettings({ ...settings, stats_rating: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">% Hài lòng</label>
              <input type="number" step="0.01" value={settings.stats_satisfaction} onChange={(e) => setSettings({ ...settings, stats_satisfaction: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold">Phần thương hiệu</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tiêu đề</label>
              <input type="text" value={settings.brand_section_title} onChange={(e) => setSettings({ ...settings, brand_section_title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phụ đề</label>
              <input type="text" value={settings.brand_section_subtitle} onChange={(e) => setSettings({ ...settings, brand_section_subtitle: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold">Lý do nên chọn</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tiêu đề</label>
              <input type="text" value={settings.why_choose_title} onChange={(e) => setSettings({ ...settings, why_choose_title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phụ đề</label>
              <input type="text" value={settings.why_choose_subtitle} onChange={(e) => setSettings({ ...settings, why_choose_subtitle: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Các mục</h3>
              <button onClick={addWhyChooseItem} className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                <Plus className="w-4 h-4" />Thêm mục
              </button>
            </div>
            {settings.why_choose_items.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Mục {index + 1}</span>
                  {settings.why_choose_items.length > 1 && (
                    <button onClick={() => removeWhyChooseItem(index)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Icon</label>
                    <input type="text" value={item.icon} onChange={(e) => { const newItems = [...settings.why_choose_items]; newItems[index].icon = e.target.value; setSettings({ ...settings, why_choose_items: newItems }); }} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tiêu đề chính</label>
                    <input type="text" value={item.title} onChange={(e) => { const newItems = [...settings.why_choose_items]; newItems[index].title = e.target.value; setSettings({ ...settings, why_choose_items: newItems }); }} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phụ đề</label>
                    <input type="text" value={item.subtitle} onChange={(e) => { const newItems = [...settings.why_choose_items]; newItems[index].subtitle = e.target.value; setSettings({ ...settings, why_choose_items: newItems }); }} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mô tả</label>
                  <textarea value={item.description} onChange={(e) => { const newItems = [...settings.why_choose_items]; newItems[index].description = e.target.value; setSettings({ ...settings, why_choose_items: newItems }); }} rows={2} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold">Phần đánh giá khách hàng</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tiêu đề</label>
              <input type="text" value={settings.testimonials_title} onChange={(e) => setSettings({ ...settings, testimonials_title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phụ đề</label>
              <input type="text" value={settings.testimonials_subtitle} onChange={(e) => setSettings({ ...settings, testimonials_subtitle: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 disabled:opacity-50 hover:scale-105 transition-all">
          {saving ? <><Loader2 className="w-5 h-5 animate-spin" />Đang lưu...</> : <><Save className="w-5 h-5" />Lưu thay đổi</>}
        </button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
