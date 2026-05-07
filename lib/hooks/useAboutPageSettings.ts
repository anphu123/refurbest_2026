import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

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

export function useAboutPageSettings() {
  const [settings, setSettings] = useState<AboutPageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("about_page_settings")
        .select("*")
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error("Error fetching about page settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading };
}
