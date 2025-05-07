
export type EmotionType = 'confidence' | 'fear' | 'neutral';

export interface EmotionData {
  type: EmotionType;
  score: number;
  timestamp: number;
}

export interface EmotionHistory {
  confidence: EmotionData[];
  fear: EmotionData[];
  neutral: EmotionData[];
}

export interface EmotionSummary {
  overallConfidence: number;
  overallFear: number;
  overallNeutral: number;
  suggestions: string[];
}
