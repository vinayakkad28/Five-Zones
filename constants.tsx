
import React from 'react';
import { ZoneType, ZoneConfig } from './types';

export interface ExtendedZoneConfig extends ZoneConfig {
  imageUrl: string;
  tagline: string;
  accentColor: string;
}

const IconWrapper: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`w-6 h-6 ${className}`}
  >
    {children}
  </svg>
);

export const ZONES: ExtendedZoneConfig[] = [
  {
    id: ZoneType.OBSERVATION,
    title: "Observation",
    metaphor: "Burger Point",
    tagline: "The Kitchen Theater",
    description: "Witness the raw energy of the grill. An industrial architectural space where speed meets high-calorie precision.",
    color: "bg-amber-600",
    accentColor: "#d97706",
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1000",
    icon: (
      <IconWrapper>
        <path d="M3 11h18M3 15h18M5 11v-2a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2" />
        <path d="M5 15v2a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-2" />
      </IconWrapper>
    ),
    placeholder: "Tell the grill master how you like your sear...",
    prompt: "You are the Head Chef at the Burger Point. You are intense, focused on heat and speed. You speak about flame-grilled perfection, proprietary spice blends, and the theater of the open kitchen. Keep your responses juicy and bold.",
    featuredInsights: [
      { label: "Grill Temp", value: "450°F" },
      { label: "Volume", value: "High Energy" },
      { label: "Focus", value: "Texture" }
    ],
    suggestedActions: ["Customize your Patty", "Inquire about Sourcing", "View the Daily Special"]
  },
  {
    id: ZoneType.LEARNING,
    title: "Learning",
    metaphor: "Coffee Point",
    tagline: "The Bean Laboratory",
    description: "A sanctuary of scent and science. Explore the chemistry of the roast in a minimalist, light-filled studio.",
    color: "bg-stone-800",
    accentColor: "#292524",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000",
    icon: (
      <IconWrapper>
        <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
      </IconWrapper>
    ),
    placeholder: "Ask about our seasonal Ethiopian roast...",
    prompt: "You are the Lead Barista and Roaster. You are precise, academic, and passionate about terroir and extraction. You explain the 'why' behind every pour-over. Your tone is warm, sophisticated, and instructional.",
    featuredInsights: [
      { label: "Roast", value: "Light/Medium" },
      { label: "TDS Score", value: "1.35%" },
      { label: "Origin", value: "Single Farm" }
    ],
    suggestedActions: ["Brewing Masterclass", "Flavor Wheel Analysis", "Staff Training Log"]
  },
  {
    id: ZoneType.DISCUSSION,
    title: "Discussion",
    metaphor: "Pizza Point",
    tagline: "The Social Piazza",
    description: "The heart of the community. A warm, rustic space designed for sharing slices and debating the perfect dough.",
    color: "bg-rose-700",
    accentColor: "#be123c",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000",
    icon: (
      <IconWrapper>
        <circle cx="12" cy="12" r="10" />
        <path d="m16 12-4-4-4 4M12 8v8" />
      </IconWrapper>
    ),
    placeholder: "Debate the pineapple-on-pizza controversy...",
    prompt: "You are the Pizza Socialite. You love the chaos of a busy dinner service and the sound of people sharing ideas. You encourage collaboration on toppings and believe that a pizza is a canvas for discussion. Be lively and conversational.",
    featuredInsights: [
      { label: "Vibe", value: "Eclectic" },
      { label: "Community", value: "85% Regulars" },
      { label: "Dough", value: "72h Ferment" }
    ],
    suggestedActions: ["Vote on Specials", "Join the Crust Debate", "Host a Table Talk"]
  },
  {
    id: ZoneType.SUPPORT,
    title: "Support",
    metaphor: "Khichdi Point",
    tagline: "The Healing Hearth",
    description: "Restorative architecture. A soft, curved space serving soul-food that heals both body and mind.",
    color: "bg-emerald-600",
    accentColor: "#059669",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1000",
    icon: (
      <IconWrapper>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
        <path d="M12 17v-4M12 9h.01" />
      </IconWrapper>
    ),
    placeholder: "Tell us how we can comfort you today...",
    prompt: "You are the Soul-Food Curator. Your tone is incredibly gentle, empathetic, and nurturing. You provide comfort-based solutions. If a guest is stressed, you suggest the perfect blend of spices in the Khichdi to ground them. Focus on wellness and recovery.",
    featuredInsights: [
      { label: "Comfort", value: "Maximum" },
      { label: "Spices", value: "Ayurvedic" },
      { label: "Energy", value: "Grounded" }
    ],
    suggestedActions: ["Personalized Healing Bowl", "Stress-Relief Menu", "Care Feedback"]
  },
  {
    id: ZoneType.SILENCE,
    title: "Silence",
    metaphor: "Water Point",
    tagline: "The Zen Spring",
    description: "Pure, transparent, and essential. A glass sanctuary where the noise of the world is filtered out.",
    color: "bg-sky-500",
    accentColor: "#0ea5e9",
    imageUrl: "https://images.unsplash.com/photo-1559839914-17aae19cea71?auto=format&fit=crop&q=80&w=1000",
    icon: (
      <IconWrapper>
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
      </IconWrapper>
    ),
    placeholder: "Meditate on the essence of taste...",
    prompt: "You are the Culinary Philosopher of the Water Point. You speak in short, haiku-like sentences. You focus on the essential, the pure, and the silent. Avoid any fluff. You believe that the best meal is the one where the ingredient speaks for itself without noise.",
    featuredInsights: [
      { label: "Purity", value: "100%" },
      { label: "Decibel", value: "15dB" },
      { label: "Element", value: "H2O" }
    ],
    suggestedActions: ["Essence Tasting", "Silent Reflection", "Minimalist Choice"]
  }
];
