"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2, Plus, Trash2, FileText, Target, Heart } from "lucide-react";
import Toast from "@/components/Toast";

interface AboutPageSettings {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  story_intro: string;
  story_content: string;
  story_highlight: string;
  story_conclusion: string;
  vision_title: string;
  vision_content: string;
  mission_title: string;
  mission_items: string[];
  core_values: Array<{ title: string; description: string }>;
  commitments: Array<{ title: string; description: string }>;
}

export default function AboutPageAdmin() {
  const [settings, setSettings] = useState<AboutPageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from("about_page_settings").select("*").single();
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
      const { error } = await supabase.from("about_page_settings").update(settings).eq("id", settings.id);
      if (error) throw error;
      setToast({ message: "Lưu cài đặt thành công!", type: "success" });
    } catch (error) {
      console.error("Error:", error);
      setToast({ message: "Lỗi khi lưu cài đặt", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const addMissionItem = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      mission_items: [...settings.mission_items, ""],
    });
  };

  const removeMissionItem = (index: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      mission_items: settings.mission_items.filter((_, i) => i !== index),
    });
  };

  const addCoreValue = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      core_values: [...settings.core_values, { title: "", description: "" }],
    });
  };

  const removeCoreValue = (index: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      core_values: settings.core_values.filter((_, i) => i !== index),
    });
  };

  const addCommitment = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      commitments: [...settings.commitments, { title: "", description: "" }],
    });
  };

  const removeCommitment = (index: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      commitments: settings.commitments.filter((_, i) => i !== index),
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
          <h1 className="text-3xl font-bold">Trang Giới thiệu</h1>
          <p className="text-gray-600 mt-2">Quản lý nội dung trang Giới thiệu</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50">
          {saving ? <><Loader2 className="w-5 h-5 animate-spin" />Đang lưu...</> : <><Save className="w-5 h-5" />Lưu thay đổi</>}
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold">Hero Section</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tiêu đề chính</label>
              <input type="text" value={settings.hero_title} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phụ đề</label>
              <input type="text" value={settings.hero_subtitle} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mô tả</label>
              <input type="text" value={settings.hero_description} onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold">Câu chuyện Refurbest</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Đoạn mở đầu</label>
              <textarea value={settings.story_intro} onChange={(e) => setSettings({ ...settings, story_intro: e.target.value })} rows={3} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nội dung chính</label>
              <textarea value={settings.story_content} onChange={(e) => setSettings({ ...settings, story_content: e.target.value })} rows={5} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Câu nổi bật (highlight)</label>
              <textarea value={settings.story_highlight} onChange={(e) => setSettings({ ...settings, story_highlight: e.target.value })} rows={3} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kết luận</label>
              <textarea value={settings.story_conclusion} onChange={(e) => setSettings({ ...settings, story_conclusion: e.target.value })} rows={2} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold">Tầm nhìn & Sứ mệnh</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Tầm nhìn</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Tiêu đề</label>
                <input type="text" value={settings.vision_title} onChange={(e) => setSettings({ ...settings, vision_title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nội dung</label>
                <textarea value={settings.vision_content} onChange={(e) => setSettings({ ...settings, vision_content: e.target.value })} rows={4} className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Sứ mệnh</h3>
                <button onClick={addMissionItem} className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium">
                  <Plus className="w-4 h-4" />Thêm
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tiêu đề</label>
                <input type="text" value={settings.mission_title} onChange={(e) => setSettings({ ...settings, mission_title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div className="space-y-3">
                {settings.mission_items.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <textarea value={item} onChange={(e) => { const newItems = [...settings.mission_items]; newItems[index] = e.target.value; setSettings({ ...settings, mission_items: newItems }); }} rows={2} className="flex-1 px-4 py-2 border rounded-lg text-sm" placeholder={`Mục ${index + 1}`} />
                    {settings.mission_items.length > 1 && (
                      <button onClick={() => removeMissionItem(index)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Giá trị cốt lõi</h2>
            <button onClick={addCoreValue} className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
              <Plus className="w-4 h-4" />Thêm giá trị
            </button>
          </div>
          <div className="space-y-4">
            {settings.core_values.map((value, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">Giá trị {index + 1}</span>
                  {settings.core_values.length > 1 && (
                    <button onClick={() => removeCoreValue(index)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tiêu đề</label>
                    <input type="text" value={value.title} onChange={(e) => { const newValues = [...settings.core_values]; newValues[index].title = e.target.value; setSettings({ ...settings, core_values: newValues }); }} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mô tả</label>
                    <textarea value={value.description} onChange={(e) => { const newValues = [...settings.core_values]; newValues[index].description = e.target.value; setSettings({ ...settings, core_values: newValues }); }} rows={3} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Commitments */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Cam kết chất lượng</h2>
            <button onClick={addCommitment} className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
              <Plus className="w-4 h-4" />Thêm cam kết
            </button>
          </div>
          <div className="space-y-4">
            {settings.commitments.map((commitment, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">Cam kết {index + 1}</span>
                  {settings.commitments.length > 1 && (
                    <button onClick={() => removeCommitment(index)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tiêu đề</label>
                    <input type="text" value={commitment.title} onChange={(e) => { const newCommitments = [...settings.commitments]; newCommitments[index].title = e.target.value; setSettings({ ...settings, commitments: newCommitments }); }} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mô tả</label>
                    <textarea value={commitment.description} onChange={(e) => { const newCommitments = [...settings.commitments]; newCommitments[index].description = e.target.value; setSettings({ ...settings, commitments: newCommitments }); }} rows={3} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
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
