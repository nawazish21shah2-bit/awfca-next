"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { DesignControlDrawer } from "./DesignControlDrawer";

export interface ThemeConfig {
  id: string;
  name: string;
  primary: string;
  primarySoft: string;
  accent: string;
  accentDeep: string;
  isCustom?: boolean;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  primary: string;
  primarySoft: string;
  accent: string;
  accentDeep: string;
}

export const themePresets: ThemePreset[] = [
  {
    id: "crimson-compassion",
    name: "Crimson Compassion (Default)",
    description: "Passionate red highlighting emergency relief, aid, and active care.",
    primary: "#1b2436",
    primarySoft: "#2a354c",
    accent: "#B10D13",
    accentDeep: "#940a0e",
  },
  {
    id: "emerald-hope",
    name: "Emerald Hope",
    description: "Original brand colors representing growth, welfare, and nature.",
    primary: "#1b2436",
    primarySoft: "#2a354c",
    accent: "#469D4C",
    accentDeep: "#2b8b31",
  },
  {
    id: "sunset-warmth",
    name: "Sunset Warmth",
    description: "Warm and inviting branding inspired by the helping hands logo element.",
    primary: "#1b2436",
    primarySoft: "#2a354c",
    accent: "#CF602A",
    accentDeep: "#b65020",
  },
  {
    id: "ocean-integrity",
    name: "Ocean Integrity",
    description: "Deep ocean blue accent conveying trust, stability, and transparency.",
    primary: "#1b2436",
    primarySoft: "#2a354c",
    accent: "#0C54A0",
    accentDeep: "#093f78",
  },
  {
    id: "royal-trust",
    name: "Royal Trust",
    description: "Elegant royal blue symbolizing reliability and leadership.",
    primary: "#1b2436",
    primarySoft: "#2a354c",
    accent: "#0854A7",
    accentDeep: "#063e7b",
  },
  {
    id: "purple-harmony",
    name: "Purple Harmony",
    description: "Graceful amethyst purple representing empathy and unity.",
    primary: "#1b2436",
    primarySoft: "#2a354c",
    accent: "#8F83BC",
    accentDeep: "#766a9e",
  },
  {
    id: "sunset-ocean",
    name: "Sunset Ocean (Contrast)",
    description: "A striking, high-contrast mix of Ocean Blue and Sunset Orange.",
    primary: "#0C54A0",
    primarySoft: "#1463b8",
    accent: "#CF602A",
    accentDeep: "#b65020",
  },
  {
    id: "royal-passion",
    name: "Royal Passion (Contrast)",
    description: "A dynamic and bright pairing of Royal Blue and Crimson Red.",
    primary: "#0854A7",
    primarySoft: "#1063c0",
    accent: "#B10D13",
    accentDeep: "#940a0e",
  },
  {
    id: "canadian-shelter",
    name: "Canadian Shelter",
    description: "Ocean Blue base with Crimson Red accent, representing trust and emergency crisis relief.",
    primary: "#0C54A0",
    primarySoft: "#1a75d2",
    accent: "#B10D13",
    accentDeep: "#940a0e",
  },
  {
    id: "active-vitality",
    name: "Active Vitality",
    description: "Royal Blue base with Sunset Orange accent, perfect for youth programs and outreach.",
    primary: "#0854A7",
    primarySoft: "#1877dc",
    accent: "#CF602A",
    accentDeep: "#b65020",
  },
  {
    id: "eco-sustain",
    name: "Eco Sustain",
    description: "Royal Blue base with Emerald Green accent, reflecting community sustainability and food programs.",
    primary: "#0854A7",
    primarySoft: "#1877dc",
    accent: "#469D4C",
    accentDeep: "#2b8b31",
  },
  {
    id: "dignity-care",
    name: "Dignity & Care",
    description: "Ocean Blue base with Amethyst Purple accent, symbolizing rehabilitation, respect, and support.",
    primary: "#0C54A0",
    primarySoft: "#1a75d2",
    accent: "#8F83BC",
    accentDeep: "#766a9e",
  },
];

// Color mapping for custom mixer to automatically assign soft/deep variants
export const colorRelations: Record<string, { soft: string; deep: string }> = {
  "#CF602A": { soft: "#df8357", deep: "#b65020" }, // Sunset Orange
  "#B10D13": { soft: "#c63d42", deep: "#940a0e" }, // Crimson Red
  "#8F83BC": { soft: "#a99fd1", deep: "#766a9e" }, // Amethyst Purple
  "#469D4C": { soft: "#65b96b", deep: "#2b8b31" }, // Emerald Green
  "#0C54A0": { soft: "#1a75d2", deep: "#093f78" }, // Ocean Blue
  "#0854A7": { soft: "#1877dc", deep: "#063e7b" }, // Royal Blue
  "#1b2436": { soft: "#2a354c", deep: "#121927" }, // Navy Charcoal
};

interface ThemeContextType {
  currentTheme: ThemeConfig;
  setPreset: (id: string) => void;
  setCustomTheme: (primary: string, accent: string) => void;
  resetTheme: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "awfca-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(() => {
    // Default fallback
    return {
      id: "crimson-compassion",
      name: "Crimson Compassion (Default)",
      primary: "#1b2436",
      primarySoft: "#2a354c",
      accent: "#B10D13",
      accentDeep: "#940a0e",
    };
  });

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.id === "emerald-hope") {
          // Force migration to new Crimson default
          setPreset("crimson-compassion");
        } else {
          setCurrentTheme(parsed);
          applyThemeVariables(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load theme from localStorage", e);
    }
  }, []);

  const applyThemeVariables = (theme: ThemeConfig) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--giveon-primary", theme.primary);
    root.style.setProperty("--giveon-primary-soft", theme.primarySoft);
    root.style.setProperty("--giveon-accent", theme.accent);
    root.style.setProperty("--giveon-accent-deep", theme.accentDeep);
  };

  const setPreset = (id: string) => {
    const preset = themePresets.find((p) => p.id === id);
    if (!preset) return;

    const newTheme: ThemeConfig = {
      id: preset.id,
      name: preset.name,
      primary: preset.primary,
      primarySoft: preset.primarySoft,
      accent: preset.accent,
      accentDeep: preset.accentDeep,
    };

    setCurrentTheme(newTheme);
    applyThemeVariables(newTheme);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTheme));
  };

  const setCustomTheme = (primary: string, accent: string) => {
    const primaryRel = colorRelations[primary] || { soft: primary, deep: primary };
    const accentRel = colorRelations[accent] || { soft: accent, deep: accent };

    const newTheme: ThemeConfig = {
      id: "custom",
      name: "Custom Branding",
      primary,
      primarySoft: primaryRel.soft,
      accent,
      accentDeep: accentRel.deep,
      isCustom: true,
    };

    setCurrentTheme(newTheme);
    applyThemeVariables(newTheme);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTheme));
  };

  const resetTheme = () => {
    setPreset("crimson-compassion");
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setPreset,
        setCustomTheme,
        resetTheme,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
      {mounted && <DesignControlDrawer />}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
