"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Toast from "@/components/Toast";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Refurbest",
    siteDescription: "Thiết bị tân trang chính hãng - Tiết kiệm thông minh, bảo hành 12 tháng",
    email: "baohanh@refurbest.vn",
    phone: "0288 993 889",
    address: "",
    facebookUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    zaloUrl: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load settings from database
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();

        if (!error && data) {
          setSettings({
            siteName: data.site_name || "Refurbest",
            siteDescription: data.site_description || "Thiết bị tân trang chính hãng - Tiết kiệm thông minh, bảo hành 12 tháng",
            email: data.email || "baohanh@refurbest.vn",
            phone: data.phone || "0288 993 889",
            address: data.address || "",
            facebookUrl: data.facebook_url || "",
            instagramUrl: data.instagram_url || "",
            youtubeUrl: data.youtube_url || "",
            zaloUrl: data.zalo_url || "",
          });
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      
      console.log('Saving settings:', settings);
      
      // First check if settings exist
      const { data: existing, error: checkError } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .single();

      console.log('Existing settings:', existing, 'Error:', checkError);

      let result;
      if (existing) {
        // Update existing settings
        console.log('Updating settings with ID:', existing.id);
        result = await supabase
          .from('site_settings')
          .update({
            site_name: settings.siteName,
            site_description: settings.siteDescription,
            email: settings.email,
            phone: settings.phone,
            address: settings.address || null,
            facebook_url: settings.facebookUrl || null,
            instagram_url: settings.instagramUrl || null,
            youtube_url: settings.youtubeUrl || null,
            zalo_url: settings.zaloUrl || null,
          })
          .eq('id', existing.id)
          .select();
      } else {
        // Insert new settings
        console.log('Inserting new settings');
        result = await supabase
          .from('site_settings')
          .insert({
            site_name: settings.siteName,
            site_description: settings.siteDescription,
            email: settings.email,
            phone: settings.phone,
            address: settings.address || null,
            facebook_url: settings.facebookUrl || null,
            instagram_url: settings.instagramUrl || null,
            youtube_url: settings.youtubeUrl || null,
            zalo_url: settings.zaloUrl || null,
          })
          .select();
      }

      console.log('Save result:', result);

      if (result.error) {
        console.error('Save error:', result.error);
        throw new Error(result.error.message || 'Failed to save');
      }
      
      setToastMessage("Đã lưu cài đặt thành công!");
      setShowToast(true);
    } catch (error) {
      console.error('Error saving settings:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setToastMessage(`Có lỗi xảy ra: ${errorMessage}`);
      setShowToast(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
        <p className="text-gray-600 mt-1">Quản lý cài đặt hệ thống</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tên website
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mô tả website
              </label>
              <input
                type="text"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email liên hệ
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Địa chỉ
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="Địa chỉ showroom/văn phòng"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Mạng xã hội</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={settings.facebookUrl}
                    onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                    placeholder="https://facebook.com/refurbest"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={settings.instagramUrl}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/refurbest"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={settings.youtubeUrl}
                    onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                    placeholder="https://youtube.com/@refurbest"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Zalo URL
                  </label>
                  <input
                    type="url"
                    value={settings.zaloUrl}
                    onChange={(e) => setSettings({ ...settings, zaloUrl: e.target.value })}
                    placeholder="https://zalo.me/refurbest"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "Đang lưu..." : "Lưu cài đặt"}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

