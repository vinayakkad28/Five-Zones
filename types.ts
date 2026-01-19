
import { ReactNode } from 'react';

export enum ZoneType {
  OBSERVATION = 'observation',
  LEARNING = 'learning',
  DISCUSSION = 'discussion',
  SUPPORT = 'support',
  SILENCE = 'silence'
}

export interface ZoneInsight {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface ZoneConfig {
  id: ZoneType;
  title: string;
  metaphor: string;
  description: string;
  color: string;
  icon: ReactNode;
  placeholder: string;
  prompt: string;
  featuredInsights: ZoneInsight[];
  suggestedActions: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
