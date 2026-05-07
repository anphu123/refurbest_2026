import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

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

export function useRefurbishmentProcessSettings() {
  const [settings, setSettings] = useState<RefurbishmentProcessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("refurbishment_process_settings")
        .select("*")
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error("Error fetching refurbishment process settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading };
}
