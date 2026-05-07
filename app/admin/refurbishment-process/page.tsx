"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2, Plus, Trash2, Wrench } from "lucide-react";
import Toast from "@/components/Toast";

interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

interface RefurbishmentProcessSettings {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  process_steps: ProcessStep[];
  quality_checks_title: string;
  quality_checks_subtitle: string;
  quality_checks: string[];
  commitment_title: string;
  commitment_description: string;
  commitment_items: string[];
}

export default function RefurbishmentProcessAdmin() {
  const [settings, setSettings] = useState<RefurbishmentProcessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from("refurbishment_process_settings").select("*").single();
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
      const { error } = await supabase.from("refurbishment_process_settings").update(settings).eq("id", settings.id);
      if (error) throw error;
      setToast({ message: "Lưu cài đặt thành công!", type: "success" });
    } catch (error) {
      console.error("Error:", error);
      setToast({ message: "Lỗi khi lưu cài đặt", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const addProcessStep = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      process_steps: [...settings.process_steps, { icon: "CheckCircle", title: "", description: "" }],
    });
  };

  const removeProcessStep = (index: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      process_steps: settings.process_steps.filter((_, i) => i !== index),
    });
  };

  const addQualityCheck = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      quality_checks: [...settings.quality_checks, ""],
    });
  };

  const removeQualityCheck = (index: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      quality_checks: settings.quality_checks.filter((_, i) => i !== index),
    });
  };

  const addCommitmentItem = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      commitment_items: [...settings.commitment_items, ""],
    });
  };

  const removeCommitmentItem = (index: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      commitment_items: settings.commitment_items.filter((_, i) => i !== index),
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
          <h1 className="text-3xl font-bold">Quy trình tân trang</h1>
          <p className="text-gray-600 mt-2">Quản lý nội dung trang Quy trình tân trang</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50">
          {saving ? <><Loader2 className="w-5 h-5 animate-spin" />Đang lưu...</> : <><Save className="w-5 h-5" />Lưu thay đổi</>}
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-green-600" />
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
          </div>
        </section>

        {/* Process Steps */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Các bước quy trình</h2>
            <button onClick={addProcessStep} className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
              <Plus className="w-4 h-4" />Thêm bước
            </button>
          </div>
          <div className="space-y-4">
            {settings.process_steps.map((step, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">Bước {index + 1}</span>
                  {settings.process_steps.length > 1 && (
                    <button onClick={() => removeProcessStep(index)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Icon (Search, Wrench, Shield, CheckCircle, Package, Truck)</label>
                    <input type="text" value={step.icon} onChange={(e) => { const newSteps = [...settings.process_steps]; newSteps[index].icon = e.target.value; setSettings({ ...settings, process_steps: newSteps }); }} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tiêu đề</label>
                    <input type="text" value={step.title} onChange={(e) => { const newSteps = [...settings.process_steps]; newSteps[index].title = e.target.value; setSettings({ ...settings, process_steps: newSteps }); }} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mô tả</label>
                    <textarea value={step.description} onChange={(e) => { const newSteps = [...settings.process_steps]; newSteps[index].description = e.target.value; setSettings({ ...settings, process_steps: newSteps }); }} rows={3} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Checks */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Điểm kiểm tra chất lượng</h2>
            </div>
            <button onClick={addQualityCheck} className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
              <Plus className="w-4 h-4" />Thêm điểm
            </button>
          </div>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tiêu đề</label>
              <input type="text" value={settings.quality_checks_title} onChange={(e) => setSettings({ ...settings, quality_checks_title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phụ đề</label>
              <input type="text" value={settings.quality_checks_subtitle} onChange={(e) => setSettings({ ...settings, quality_checks_subtitle: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
          <div className="space-y-3">
            {settings.quality_checks.map((check, index) => (
              <div key={index} className="flex gap-2">
                <input type="text" value={check} onChange={(e) => { const newChecks = [...settings.quality_checks]; newChecks[index] = e.target.value; setSettings({ ...settings, quality_checks: newChecks }); }} className="flex-1 px-4 py-2 border rounded-lg" placeholder={`Điểm kiểm tra ${index + 1}`} />
                {settings.quality_checks.length > 1 && (
                  <button onClick={() => removeQualityCheck(index)} className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Commitment */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Cam kết</h2>
            <button onClick={addCommitmentItem} className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
              <Plus className="w-4 h-4" />Thêm cam kết
            </button>
          </div>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tiêu đề</label>
              <input type="text" value={settings.commitment_title} onChange={(e) => setSettings({ ...settings, commitment_title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mô tả</label>
              <textarea value={settings.commitment_description} onChange={(e) => setSettings({ ...settings, commitment_description: e.target.value })} rows={3} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
          <div className="space-y-3">
            {settings.commitment_items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input type="text" value={item} onChange={(e) => { const newItems = [...settings.commitment_items]; newItems[index] = e.target.value; setSettings({ ...settings, commitment_items: newItems }); }} className="flex-1 px-4 py-2 border rounded-lg" placeholder={`Cam kết ${index + 1}`} />
                {settings.commitment_items.length > 1 && (
                  <button onClick={() => removeCommitmentItem(index)} className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
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
