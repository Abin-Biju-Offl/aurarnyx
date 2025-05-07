
import { EmotionData } from '@/types/emotion';
import { cn } from '@/lib/utils';

interface EmotionMeterProps {
  emotion: EmotionData;
  className?: string;
}

export function EmotionMeter({ emotion, className }: EmotionMeterProps) {
  const getEmotionColor = () => {
    switch (emotion.type) {
      case 'confidence':
        return 'bg-emotion-confident';
      case 'fear':
        return 'bg-emotion-fearful';
      default:
        return 'bg-emotion-neutral';
    }
  };
  
  const getEmotionLabel = () => {
    switch (emotion.type) {
      case 'confidence':
        return 'Confidence';
      case 'fear':
        return 'Fear';
      default:
        return 'Neutral';
    }
  };
  
  const getIntensityText = () => {
    const score = emotion.score;
    if (score > 0.8) return 'Very High';
    if (score > 0.6) return 'High';
    if (score > 0.4) return 'Moderate';
    if (score > 0.2) return 'Low';
    return 'Very Low';
  };

  return (
    <div className={cn("p-6 rounded-lg shadow-md bg-white dark:bg-gray-800", className)}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Current Emotion</h3>
        <div className="text-right">
          <span className="text-sm text-muted-foreground">{new Date(emotion.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div className="mt-4 mb-2">
        <div className="flex justify-between mb-1">
          <span className="font-medium">{getEmotionLabel()}</span>
          <span className="text-sm">{getIntensityText()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-hidden">
          <div 
            className={`h-full rounded-full ${getEmotionColor()} transition-all duration-500`} 
            style={{ width: `${Math.round(emotion.score * 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <div 
          className={cn(
            "inline-flex items-center justify-center w-16 h-16 rounded-full text-white text-2xl",
            emotion.type === 'confidence' ? "bg-emotion-confident animate-pulse" : 
            emotion.type === 'fear' ? "bg-emotion-fearful animate-pulse" : 
            "bg-emotion-neutral"
          )}
        >
          {emotion.type === 'confidence' ? '😀' : emotion.type === 'fear' ? '😨' : '😐'}
        </div>
      </div>
    </div>
  );
}
