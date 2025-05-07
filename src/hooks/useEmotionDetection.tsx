
import { useState, useEffect, useCallback } from 'react';
import { EmotionData, EmotionHistory, EmotionType, EmotionSummary } from '@/types/emotion';

// Maximum history length
const MAX_HISTORY_LENGTH = 100;

// Constants for mock emotion detection
const EMOTION_UPDATE_INTERVAL = 500; // ms
const EMOTION_OSCILLATION_PERIOD = 10000; // ms

export function useEmotionDetection() {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData>({
    type: 'neutral',
    score: 1.0,
    timestamp: Date.now()
  });
  
  const [emotionHistory, setEmotionHistory] = useState<EmotionHistory>({
    confidence: [],
    fear: [],
    neutral: []
  });

  const [emotionSummary, setEmotionSummary] = useState<EmotionSummary | null>(null);
  
  // This is a simulation function that will be replaced with actual ML model in production
  const analyzeAudio = useCallback((audioData: Float32Array) => {
    // For demo purposes, we'll simulate emotion detection with time-based oscillations
    const now = Date.now();
    
    // Create cyclic patterns for confidence and fear
    const timeFactor = now / EMOTION_OSCILLATION_PERIOD;
    
    // Generate values that oscillate between 0 and 1
    const confidenceScore = (Math.sin(timeFactor * Math.PI) + 1) / 2;
    const fearScore = (Math.cos(timeFactor * Math.PI * 1.3) + 1) / 2;
    
    // Add some randomness
    const randomFactor = 0.15;
    const adjustedConfidence = Math.min(1, Math.max(0, confidenceScore + (Math.random() * randomFactor - randomFactor/2)));
    const adjustedFear = Math.min(1, Math.max(0, fearScore + (Math.random() * randomFactor - randomFactor/2)));
    
    // Determine the dominant emotion
    let dominantType: EmotionType;
    let dominantScore: number;
    
    if (adjustedConfidence > 0.6) {
      dominantType = 'confidence';
      dominantScore = adjustedConfidence;
    } else if (adjustedFear > 0.6) {
      dominantType = 'fear';
      dominantScore = adjustedFear;
    } else {
      dominantType = 'neutral';
      dominantScore = 1 - Math.max(adjustedConfidence, adjustedFear);
    }
    
    // Return the emotion data
    return {
      type: dominantType,
      score: dominantScore,
      timestamp: now
    };
  }, []);
  
  const processAudioData = useCallback((audioData: Float32Array) => {
    const emotion = analyzeAudio(audioData);
    setCurrentEmotion(emotion);
    
    // Update history
    setEmotionHistory(prev => {
      const newHistory = { ...prev };
      
      // Add data to all emotions with appropriate scores
      const timestamp = Date.now();
      
      // For confidence
      const confidenceScore = emotion.type === 'confidence' ? emotion.score : 0;
      newHistory.confidence = [
        ...prev.confidence,
        { type: 'confidence' as EmotionType, score: confidenceScore, timestamp }
      ].slice(-MAX_HISTORY_LENGTH);
      
      // For fear
      const fearScore = emotion.type === 'fear' ? emotion.score : 0;
      newHistory.fear = [
        ...prev.fear,
        { type: 'fear' as EmotionType, score: fearScore, timestamp }
      ].slice(-MAX_HISTORY_LENGTH);
      
      // For neutral
      const neutralScore = emotion.type === 'neutral' ? emotion.score : 0;
      newHistory.neutral = [
        ...prev.neutral,
        { type: 'neutral' as EmotionType, score: neutralScore, timestamp }
      ].slice(-MAX_HISTORY_LENGTH);
      
      return newHistory;
    });
  }, [analyzeAudio]);
  
  const generateEmotionSummary = useCallback(() => {
    if (emotionHistory.confidence.length === 0) return null;
    
    // Calculate average scores
    const avgConfidence = emotionHistory.confidence.reduce((sum, item) => sum + item.score, 0) / emotionHistory.confidence.length;
    const avgFear = emotionHistory.fear.reduce((sum, item) => sum + item.score, 0) / emotionHistory.fear.length;
    const avgNeutral = emotionHistory.neutral.reduce((sum, item) => sum + item.score, 0) / emotionHistory.neutral.length;
    
    // Generate improvement suggestions based on analysis
    const suggestions: string[] = [];
    
    if (avgConfidence < 0.4) {
      suggestions.push("Practice speaking with a stronger, more assertive tone.");
      suggestions.push("Try maintaining a steady pace rather than rushing through your words.");
      suggestions.push("Use more definitive language and fewer hedge words like 'maybe' or 'perhaps'.");
    }
    
    if (avgFear > 0.4) {
      suggestions.push("Take deeper breaths before speaking to reduce vocal tension.");
      suggestions.push("Practice pausing more frequently to collect your thoughts.");
      suggestions.push("Try visualization techniques to reduce anxiety while speaking.");
    }
    
    if (avgNeutral > 0.6) {
      suggestions.push("Add more vocal variety and emphasis on key points.");
      suggestions.push("Incorporate more expressive language to engage your audience.");
      suggestions.push("Consider using more hand gestures to complement your speech.");
    }
    
    return {
      overallConfidence: avgConfidence,
      overallFear: avgFear,
      overallNeutral: avgNeutral,
      suggestions
    };
  }, [emotionHistory]);

  // This effect simulates periodic emotion updates for demonstration
  // In a real implementation, this would be triggered by actual audio analysis
  const [isSimulating, setIsSimulating] = useState(false);
  
  useEffect(() => {
    if (!isSimulating) return;
    
    const interval = setInterval(() => {
      // Create dummy audio data for simulation
      const dummyAudioData = new Float32Array(1024).map(() => Math.random() * 2 - 1);
      processAudioData(dummyAudioData);
    }, EMOTION_UPDATE_INTERVAL);
    
    return () => clearInterval(interval);
  }, [isSimulating, processAudioData]);
  
  const startSimulation = () => setIsSimulating(true);
  
  const stopSimulation = () => {
    setIsSimulating(false);
    const summary = generateEmotionSummary();
    setEmotionSummary(summary);
  };
  
  return {
    currentEmotion,
    emotionHistory,
    emotionSummary,
    processAudioData,
    isSimulating,
    startSimulation,
    stopSimulation,
    resetEmotionSummary: () => setEmotionSummary(null)
  };
}
