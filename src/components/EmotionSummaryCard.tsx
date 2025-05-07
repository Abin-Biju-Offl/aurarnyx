
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EmotionSummary } from "@/types/emotion";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, InfoIcon } from "lucide-react";

interface EmotionSummaryCardProps {
  summary: EmotionSummary;
  className?: string;
}

export function EmotionSummaryCard({ summary, className }: EmotionSummaryCardProps) {
  const { overallConfidence, overallFear, suggestions } = summary;
  
  // Format percentage for display
  const confidencePct = Math.round(overallConfidence * 100);
  const fearPct = Math.round(overallFear * 100);
  
  // Determine assessment level
  const getAssessmentLevel = () => {
    if (confidencePct >= 70) return "High";
    if (confidencePct >= 40) return "Moderate";
    return "Low";
  };

  const assessmentLevel = getAssessmentLevel();
  
  return (
    <div className={cn("space-y-6", className)}>
      <Card className="overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emotion-confident via-emotion-confident-light to-emotion-fearful"></div>
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <span>Speech Analysis Summary</span>
            {assessmentLevel === "High" ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : assessmentLevel === "Moderate" ? (
              <InfoIcon className="h-5 w-5 text-amber-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
          </CardTitle>
          <CardDescription>
            Overall confidence assessment: <span className="font-medium">{assessmentLevel}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Confidence</span>
              <span className="text-sm font-medium">{confidencePct}%</span>
            </div>
            <Progress 
              value={confidencePct} 
              className="h-2"
              indicatorClassName={cn(
                confidencePct >= 70 ? "bg-green-500" :
                confidencePct >= 40 ? "bg-amber-500" :
                "bg-red-500"
              )}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Fear/Anxiety</span>
              <span className="text-sm font-medium">{fearPct}%</span>
            </div>
            <Progress 
              value={fearPct} 
              className="h-2"
              indicatorClassName={cn(
                fearPct <= 30 ? "bg-green-500" :
                fearPct <= 60 ? "bg-amber-500" :
                "bg-red-500"
              )}
            />
          </div>
          
          <div className="space-y-2 rounded-lg bg-muted p-4">
            <h4 className="text-sm font-medium">Improvement Suggestions</h4>
            <ul className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
