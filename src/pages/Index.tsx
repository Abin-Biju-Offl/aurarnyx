
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmotionDetection } from '@/hooks/useEmotionDetection';
import { useMicrophone } from '@/hooks/useMicrophone';
import { EmotionMeter } from '@/components/EmotionMeter';
import { EmotionVisualizer } from '@/components/EmotionVisualizer';
import { EmotionInsightCard } from '@/components/EmotionInsightCard';
import { RecordingIndicator } from '@/components/RecordingIndicator';
import { Smile, Frown, Mic, MicOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [usingRealMicrophone, setUsingRealMicrophone] = useState(false);
  const { 
    currentEmotion, 
    emotionHistory, 
    processAudioData,
    isSimulating,
    startSimulation,
    stopSimulation
  } = useEmotionDetection();
  
  const { 
    isListening, 
    hasPermission, 
    startListening, 
    stopListening 
  } = useMicrophone({
    onAudioData: processAudioData,
    enabled: usingRealMicrophone
  });

  const handleToggleMicrophone = async () => {
    if (usingRealMicrophone) {
      if (isListening) {
        stopListening();
        stopSimulation();
      } else {
        await startListening();
      }
    } else {
      if (isSimulating) {
        stopSimulation();
      } else {
        startSimulation();
        toast({
          title: "Demo Mode Active",
          description: "Using simulated emotions. For real analysis, switch to microphone mode."
        });
      }
    }
  };

  const toggleMode = () => {
    if (isListening) stopListening();
    if (isSimulating) stopSimulation();
    setUsingRealMicrophone(prev => !prev);
  };

  // Initialize simulation when in demo mode
  useEffect(() => {
    if (!usingRealMicrophone && !isSimulating) {
      startSimulation();
    }
    
    return () => {
      stopSimulation();
    };
  }, [usingRealMicrophone]);
  
  const isActive = usingRealMicrophone ? isListening : isSimulating;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container max-w-5xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Emotion Recognition</h1>
          <p className="text-lg text-muted-foreground">
            Real-time analysis of confidence and fear in your voice
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Voice Analysis</span>
                {usingRealMicrophone ? <Mic className="h-4 w-4" /> : <Smile className="h-4 w-4" />}
              </CardTitle>
              <CardDescription>
                {usingRealMicrophone 
                  ? "Using your microphone for live analysis"
                  : "Using simulated data for demonstration"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <RecordingIndicator 
                  isRecording={isActive}
                  className="mb-4" 
                />
                <EmotionMeter emotion={currentEmotion} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button 
                onClick={handleToggleMicrophone} 
                className="w-full"
                variant={isActive ? "destructive" : "default"}
              >
                {isActive ? "Stop Analysis" : "Start Analysis"}
              </Button>
              <Button 
                onClick={toggleMode} 
                variant="outline" 
                className="w-full"
                disabled={isActive}
              >
                Switch to {usingRealMicrophone ? "Demo Mode" : "Microphone"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>Emotion Trends</CardTitle>
              <CardDescription>Tracking confidence (blue) and fear (red) over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] relative">
              <EmotionVisualizer 
                history={emotionHistory}
                width={800}
                height={250}
                className="w-full h-full"
              />
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emotion-confident"></div>
                <span className="text-sm">Confidence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emotion-fearful"></div>
                <span className="text-sm">Fear</span>
              </div>
            </CardFooter>
          </Card>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Emotional Insights</CardTitle>
              <CardDescription>Analysis of your current emotional state</CardDescription>
            </CardHeader>
            <CardContent>
              <EmotionInsightCard emotion={currentEmotion} />
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            This is a demonstration of emotion recognition technology.
            In a production environment, this would use machine learning models
            to analyze vocal characteristics and detect emotions.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
