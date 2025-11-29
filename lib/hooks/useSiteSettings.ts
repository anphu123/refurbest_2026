import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  email: string;
  phone: string;
  address?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  zaloUrl?: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'Refurbest',
  siteDescription: 'Thiết bị tân trang chính hãng - Tiết kiệm thông minh, bảo hành 12 tháng',
  email: 'baohanh@refurbest.vn',
  phone: '0288 993 889',
  address: '',
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

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
            siteName: data.site_name || defaultSettings.siteName,
            siteDescription: data.site_description || defaultSettings.siteDescription,
            email: data.email || defaultSettings.email,
            phone: data.phone || defaultSettings.phone,
            address: data.address || defaultSettings.address,
            facebookUrl: data.facebook_url,
            instagramUrl: data.instagram_url,
            youtubeUrl: data.youtube_url,
            zaloUrl: data.zalo_url,
          });
        }
      } catch (error) {
        console.error('Error loading site settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  return { settings, loading };
}
