"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Palette, X, Check, RotateCcw, Sliders, Sparkles } from "lucide-react";
import { useTheme, themePresets, colorRelations } from "./ThemeProvider";

export function DesignControlDrawer() {
  const { currentTheme, setPreset, setCustomTheme, resetTheme, isOpen, setIsOpen } = useTheme();
  const [animateIn, setAnimateIn] = useState(false);
  const [customPrimary, setCustomPrimary] = useState(currentTheme.primary);
  const [customAccent, setCustomAccent] = useState(currentTheme.accent);

  // Sync custom options when currentTheme changes (e.g. from preset)
  useEffect(() => {
    setCustomPrimary(currentTheme.primary);
    setCustomAccent(currentTheme.accent);
  }, [currentTheme]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Handle body overflow lock when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Slide-in animation trigger
      const timer = setTimeout(() => setAnimateIn(true), 50);
      return () => {
        clearTimeout(timer);
      };
    } else {
      setAnimateIn(false);
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleCustomPrimarySelect = (color: string) => {
    setCustomPrimary(color);
    setCustomTheme(color, customAccent);
  };

  const handleCustomAccentSelect = (color: string) => {
    setCustomAccent(color);
    setCustomTheme(customPrimary, color);
  };

  // Helper to check if a preset matches the current theme
  const isPresetActive = (presetId: string) => {
    if (currentTheme.id === "custom") return false;
    return currentTheme.id === presetId;
  };

  const colorsList = [
    { name: "Sunset Orange", hex: "#CF602A" },
    { name: "Crimson Red", hex: "#B10D13" },
    { name: "Amethyst Purple", hex: "#8F83BC" },
    { name: "Emerald Green", hex: "#469D4C" },
    { name: "Ocean Blue", hex: "#0C54A0" },
    { name: "Royal Blue", hex: "#0854A7" },
    { name: "Navy Charcoal", hex: "#1b2436" },
  ];

  const primaryOptions = [
    { name: "Navy Charcoal", hex: "#1b2436" },
    { name: "Ocean Blue", hex: "#0C54A0" },
    { name: "Royal Blue", hex: "#0854A7" },
    { name: "Amethyst Purple", hex: "#8F83BC" },
    { name: "Emerald Green", hex: "#469D4C" },
    { name: "Crimson Red", hex: "#B10D13" },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open branding design controls"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] flex items-center gap-2 pl-4 pr-3 py-3.5 bg-primary text-white rounded-l-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-white/10 hover:pr-4 hover:pl-5 transition-all duration-300 group cursor-pointer"
        style={{
          boxShadow: "0 4px 20px var(--giveon-glow)",
          backgroundColor: "var(--giveon-primary)",
        }}
      >
        <Palette className="h-5 w-5 text-accent animate-pulse group-hover:rotate-12 transition-transform duration-300" style={{ color: "var(--giveon-accent)" }} />
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider select-none">
          Theme Customizer
        </span>
      </button>

      {/* Slide-over Drawer Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[10005] flex justify-end">
          {/* Backdrop Blur */}
          <div
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 bg-primary/20 backdrop-blur-sm transition-opacity duration-300 ease-out cursor-pointer ${
              animateIn ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Drawer container */}
          <div
            className={`relative w-full max-w-md md:max-w-lg h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
              animateIn ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Palette className="h-5.5 w-5.5" style={{ color: "var(--giveon-accent)" }} />
                <div>
                  <h2 className="text-lg font-bold text-primary font-display" style={{ color: "var(--giveon-primary)" }}>
                    Brand Design Studio
                  </h2>
                  <p className="text-xs text-slate-400">Arrahman Welfare Foundation Canada</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close customizer"
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin">
              {/* Logo Identity Card */}
              <div className="flex flex-col items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6 shadow-sm">
                <Image
                  src="/images/logo-awfca.png"
                  alt="AWFCA Logo"
                  width={64}
                  height={64}
                  priority
                  className="h-14 w-14 object-contain"
                />
                <div className="text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Branding Color Profile
                  </div>
                  <h3 className="text-xs font-semibold text-slate-700 mt-0.5">
                    Official Logo Colors
                  </h3>
                </div>
                
                {/* Official Logo Colors Display */}
                <div className="grid grid-cols-4 gap-1.5 w-full mt-1.5">
                  {colorsList.map((c) => (
                    <div
                      key={c.hex}
                      className="flex flex-col items-center gap-1 p-1 bg-white border border-slate-100 rounded-lg shadow-sm"
                      title={`${c.name}: ${c.hex}`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-slate-200"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[9px] font-medium text-slate-500 truncate w-full text-center">
                        {c.name.split(" ")[1] || c.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Theme Presets Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4.5 w-4.5 text-amber-500" />
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Curated Brand Presets
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {themePresets.map((preset) => {
                    const active = isPresetActive(preset.id);
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setPreset(preset.id)}
                        className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer group hover:shadow-md ${
                          active
                            ? "border-2 bg-slate-50/50 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                        style={{
                          borderColor: active ? "var(--giveon-accent)" : undefined,
                        }}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-xs font-bold text-slate-800 truncate pr-2">
                            {preset.name.replace(" (Default)", "")}
                          </span>
                          {active && (
                            <span className="flex items-center justify-center w-4 h-4 rounded-full text-white" style={{ backgroundColor: "var(--giveon-accent)" }}>
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        
                        <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                          {preset.description}
                        </p>

                        <div className="flex items-center gap-1.5 mt-auto">
                          {/* Circular color swatch representation */}
                          <div className="relative flex items-center w-8 h-5">
                            <span
                              className="absolute left-0 w-4 h-4 rounded-full border border-white shadow-sm z-10"
                              style={{ backgroundColor: preset.accent }}
                              title={`Accent: ${preset.accent}`}
                            />
                            <span
                              className="absolute left-3 w-4 h-4 rounded-full border border-white shadow-sm"
                              style={{ backgroundColor: preset.primary }}
                              title={`Primary: ${preset.primary}`}
                            />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">
                            Swatch
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Mixer Section */}
              <div className="mb-6 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                <div className="flex items-center gap-2 mb-4">
                  <Sliders className="h-4.5 w-4.5 text-blue-500" />
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Custom Brand Mixer
                  </h4>
                </div>

                {/* Primary Colors Picker */}
                <div className="mb-4">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                    Primary Layout Base
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {primaryOptions.map((opt) => {
                      const active = customPrimary.toLowerCase() === opt.hex.toLowerCase();
                      return (
                        <button
                          key={opt.hex}
                          onClick={() => handleCustomPrimarySelect(opt.hex)}
                          className={`w-8 h-8 rounded-full border-2 relative transition cursor-pointer hover:scale-105 ${
                            active ? "border-slate-800 scale-105" : "border-transparent"
                          }`}
                          style={{ backgroundColor: opt.hex }}
                          title={opt.name}
                        >
                          {active && (
                            <span className="absolute inset-0 m-auto flex items-center justify-center w-4 h-4 rounded-full bg-white text-slate-900 shadow-sm">
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Accent Colors Picker */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                    Accent / Highlight Color
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {colorsList.map((opt) => {
                      const active = customAccent.toLowerCase() === opt.hex.toLowerCase();
                      return (
                        <button
                          key={opt.hex}
                          onClick={() => handleCustomAccentSelect(opt.hex)}
                          className={`w-8 h-8 rounded-full border-2 relative transition cursor-pointer hover:scale-105 ${
                            active ? "border-slate-800 scale-105" : "border-transparent"
                          }`}
                          style={{ backgroundColor: opt.hex }}
                          title={opt.name}
                        >
                          {active && (
                            <span className="absolute inset-0 m-auto flex items-center justify-center w-4 h-4 rounded-full bg-white text-slate-900 shadow-sm">
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={resetTheme}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 rounded-xl transition cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Defaults
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition cursor-pointer"
                style={{ backgroundColor: "var(--giveon-primary)" }}
              >
                Close Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
