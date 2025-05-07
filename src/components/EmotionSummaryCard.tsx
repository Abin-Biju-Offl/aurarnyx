
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { EmotionSummary } from '@/types/emotion';
import { Lightbulb, TrendingUp } from 'lucide-react';

interface EmotionSummaryCardProps {
  summary: EmotionSummary;
}

export const EmotionSummaryCard: React.FC<EmotionSummaryCardProps> = ({ summary }) => {
  const { overallConfidence, overallFear, overallNeutral, suggestions } = summary;
  
  const confidencePercentage = Math.round(overallConfidence * 100);
  const fearPercentage = Math.round(overallFear * 100);
  const neutralPercentage = Math.round(overallNeutral * 100);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emotion-confident" />
          <span>Overall Analysis</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your speech patterns, here's how your emotional expression breaks down
        </p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Confidence</span>
              <span className="font-medium">{confidencePercentage}%</span>
            </div>
            <Progress 
              value={confidencePercentage} 
              className="h-2 bg-muted"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fear</span>
              <span className="font-medium">{fearPercentage}%</span>
            </div>
            <Progress 
              value={fearPercentage} 
              className="h-2 bg-muted"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Neutral</span>
              <span className="font-medium">{neutralPercentage}%</span>
            </div>
            <Progress 
              value={neutralPercentage} 
              className="h-2 bg-muted"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <span>Suggestions for Improvement</span>
        </h3>
        
        <ul className="space-y-2 text-sm">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-muted-foreground">•</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmotionSummaryCard;
