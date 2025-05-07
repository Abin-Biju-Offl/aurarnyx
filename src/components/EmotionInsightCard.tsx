
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmotionData } from "@/types/emotion";

interface EmotionInsightCardProps {
  emotion: EmotionData;
  className?: string;
}

export function EmotionInsightCard({ emotion, className }: EmotionInsightCardProps) {
  const getInsightMessage = () => {
    const { type, score } = emotion;
    
    if (type === 'confidence' && score > 0.7) {
      return {
        title: "High Confidence Detected",
        description: "Your voice indicates strong confidence and assertiveness. This is effective for leadership and persuasive communication."
      };
    } else if (type === 'confidence' && score > 0.4) {
      return {
        title: "Moderate Confidence Detected",
        description: "Your voice shows a good level of confidence. You're communicating with clarity and conviction."
      };
    } else if (type === 'fear' && score > 0.7) {
      return {
        title: "High Fear/Anxiety Detected",
        description: "Your voice indicates significant anxiety or fear. Consider taking a moment to breathe and center yourself."
      };
    } else if (type === 'fear' && score > 0.4) {
      return {
        title: "Moderate Fear/Anxiety Detected",
        description: "Your voice shows some signs of nervousness or concern. This is natural in many situations."
      };
    } else {
      return {
        title: "Neutral Emotional State",
        description: "Your voice is relatively neutral in emotional tone, which is appropriate for many contexts."
      };
    }
  };

  const insight = getInsightMessage();

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{insight.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{insight.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
