
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface UseMicrophoneOptions {
  onAudioData?: (audioData: Float32Array) => void;
  enabled?: boolean;
}

export function useMicrophone({ onAudioData, enabled = false }: UseMicrophoneOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const { toast } = useToast();

  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setHasPermission(true);
      setError(null);
      
      // Initialize audio context and analyser
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      source.connect(analyserRef.current);
      
      return true;
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setHasPermission(false);
      setError(err instanceof Error ? err.message : 'Unknown error accessing microphone');
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use emotion recognition",
        variant: "destructive",
      });
      return false;
    }
  };

  const startListening = async () => {
    if (!hasPermission) {
      const granted = await requestMicrophoneAccess();
      if (!granted) return;
    }
    
    setIsListening(true);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  useEffect(() => {
    if (enabled) {
      requestMicrophoneAccess();
    }
    
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [enabled]);

  // Process audio when listening
  useEffect(() => {
    if (!isListening || !analyserRef.current || !onAudioData) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    
    const processAudio = () => {
      if (!isListening || !analyserRef.current) return;
      
      analyserRef.current.getFloatTimeDomainData(dataArray);
      onAudioData(dataArray);
      
      requestAnimationFrame(processAudio);
    };
    
    processAudio();
  }, [isListening, onAudioData]);

  return {
    isListening,
    hasPermission,
    error,
    startListening,
    stopListening,
  };
}
