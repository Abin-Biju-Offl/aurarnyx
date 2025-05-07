
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmotionDetection } from '@/hooks/useEmotionDetection';
import { useMicrophone } from '@/hooks/useMicrophone';
import { EmotionMeter } from '@/components/EmotionMeter';
import { EmotionVisualizer } from '@/components/EmotionVisualizer';
import { EmotionInsightCard } from '@/components/EmotionInsightCard';
import { EmotionSummaryCard } from '@/components/EmotionSummaryCard';
import { RecordingIndicator } from '@/components/RecordingIndicator';
import { Navbar } from '@/components/Navbar';
import { Smile, Frown, Mic, MicOff, BarChart2, Play, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const { toast } = useToast();
  const [usingRealMicrophone, setUsingRealMicrophone] = useState(false);
  const { 
    currentEmotion, 
    emotionHistory, 
    emotionSummary,
    processAudioData,
    isSimulating,
    startSimulation,
    stopSimulation,
    resetEmotionSummary
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
        resetEmotionSummary();
        await startListening();
      }
    } else {
      if (isSimulating) {
        stopSimulation();
      } else {
        resetEmotionSummary();
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
    if (!usingRealMicrophone && !isSimulating && !emotionSummary) {
      startSimulation();
    }
    
    return () => {
      stopSimulation();
    };
  }, [usingRealMicrophone]);
  
  const isActive = usingRealMicrophone ? isListening : isSimulating;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emotion-confident to-emotion-fearful bg-clip-text text-transparent">Aurarnyx</h1>
          <p className="text-lg text-muted-foreground">
            Real-time analysis of confidence and fear in your voice
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-1 border-t-4 border-t-emotion-confident overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-background to-muted/30">
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
            <CardContent className="pt-6">
              <div className="mb-6">
                <RecordingIndicator 
                  isRecording={isActive}
                  className="mb-4" 
                />
                {!isActive && 
                  <div className="flex justify-center my-2">
                    <Play className="w-10 h-10 text-muted-foreground/30 animate-pulse" />
                  </div>
                }
                <EmotionMeter emotion={currentEmotion} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 bg-muted/30 border-t">
              <Button 
                onClick={handleToggleMicrophone} 
                className="w-full"
                variant={isActive ? "destructive" : "default"}
                size="lg"
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

          <Card className="col-span-full lg:col-span-2 overflow-hidden">
            <Tabs defaultValue="trends">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle>Analysis Dashboard</CardTitle>
                  <TabsList>
                    <TabsTrigger value="trends" className="flex items-center gap-1">
                      <BarChart2 className="h-4 w-4" /> 
                      <span>Trends</span>
                    </TabsTrigger>
                    {emotionSummary && (
                      <TabsTrigger value="summary" className="flex items-center gap-1">
                        <ArrowRight className="h-4 w-4" /> 
                        <span>Summary</span>
                      </TabsTrigger>
                    )}
                  </TabsList>
                </div>
                <CardDescription className="mt-2">Track your emotional patterns over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <TabsContent value="trends" className="mt-0">
                  <div className="h-[300px] relative bg-black/5 dark:bg-white/5 rounded-md p-4">
                    <EmotionVisualizer 
                      history={emotionHistory}
                      width={800}
                      height={250}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex justify-between gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emotion-confident"></div>
                      <span className="text-sm">Confidence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emotion-fearful"></div>
                      <span className="text-sm">Fear</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="summary" className="mt-0">
                  {emotionSummary && <EmotionSummaryCard summary={emotionSummary} />}
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>

          <Card className="col-span-full border-t-4 border-t-emotion-fearful">
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
      </main>
    </div>
  );
};

export default Index;
