
import { useState, useEffect, useCallback } from 'react';
import { EmotionData, EmotionHistory, EmotionType } from '@/types/emotion';

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
        { type: 'confidence', score: confidenceScore, timestamp }
      ].slice(-MAX_HISTORY_LENGTH);
      
      // For fear
      const fearScore = emotion.type === 'fear' ? emotion.score : 0;
      newHistory.fear = [
        ...prev.fear,
        { type: 'fear', score: fearScore, timestamp }
      ].slice(-MAX_HISTORY_LENGTH);
      
      // For neutral
      const neutralScore = emotion.type === 'neutral' ? emotion.score : 0;
      newHistory.neutral = [
        ...prev.neutral,
        { type: 'neutral', score: neutralScore, timestamp }
      ].slice(-MAX_HISTORY_LENGTH);
      
      return newHistory;
    });
  }, [analyzeAudio]);
  
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
  const stopSimulation = () => setIsSimulating(false);
  
  return {
    currentEmotion,
    emotionHistory,
    processAudioData,
    isSimulating,
    startSimulation,
    stopSimulation
  };
}
