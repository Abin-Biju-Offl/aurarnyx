
import { useEffect, useRef } from 'react';
import { EmotionHistory } from '@/types/emotion';

interface EmotionVisualizerProps {
  history: EmotionHistory;
  width?: number;
  height?: number;
  className?: string;
}

export function EmotionVisualizer({ 
  history, 
  width = 400, 
  height = 200,
  className 
}: EmotionVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up gradient backgrounds
    const confidenceGradient = ctx.createLinearGradient(0, 0, 0, height);
    confidenceGradient.addColorStop(0, 'rgba(74, 111, 255, 0.6)');
    confidenceGradient.addColorStop(1, 'rgba(74, 111, 255, 0)');
    
    const fearGradient = ctx.createLinearGradient(0, 0, 0, height);
    fearGradient.addColorStop(0, 'rgba(255, 74, 74, 0.6)');
    fearGradient.addColorStop(1, 'rgba(255, 74, 74, 0)');

    // Add grid lines
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    
    // Horizontal grid lines
    for (let i = 0; i <= height; i += height/5) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= width; i += width/10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    
    // Draw confidence line
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#4A6FFF';
    ctx.fillStyle = confidenceGradient;
    
    const confidenceData = history.confidence.slice(-width);
    
    if (confidenceData.length > 1) {
      const stepX = width / (confidenceData.length - 1);
      
      ctx.beginPath();
      ctx.moveTo(0, height - confidenceData[0].score * height);
      
      confidenceData.forEach((point, i) => {
        if (i === 0) return;
        ctx.lineTo(stepX * i, height - point.score * height);
      });
      
      // Complete the path for filling
      ctx.lineTo(stepX * (confidenceData.length - 1), height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      ctx.fill();
      
      // Redraw the line
      ctx.beginPath();
      ctx.moveTo(0, height - confidenceData[0].score * height);
      
      confidenceData.forEach((point, i) => {
        if (i === 0) return;
        ctx.lineTo(stepX * i, height - point.score * height);
      });
      
      ctx.stroke();

      // Draw circle points on the line
      confidenceData.forEach((point, i) => {
        if (i % 5 === 0) {  // Only draw every 5th point to avoid clutter
          ctx.beginPath();
          ctx.arc(stepX * i, height - point.score * height, 2, 0, 2 * Math.PI);
          ctx.fillStyle = '#4A6FFF';
          ctx.fill();
        }
      });
    }
    
    // Draw fear line
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FF4A4A';
    ctx.fillStyle = fearGradient;
    
    const fearData = history.fear.slice(-width);
    
    if (fearData.length > 1) {
      const stepX = width / (fearData.length - 1);
      
      ctx.beginPath();
      ctx.moveTo(0, height - fearData[0].score * height);
      
      fearData.forEach((point, i) => {
        if (i === 0) return;
        ctx.lineTo(stepX * i, height - point.score * height);
      });
      
      // Complete the path for filling
      ctx.lineTo(stepX * (fearData.length - 1), height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      ctx.fill();
      
      // Redraw the line
      ctx.beginPath();
      ctx.moveTo(0, height - fearData[0].score * height);
      
      fearData.forEach((point, i) => {
        if (i === 0) return;
        ctx.lineTo(stepX * i, height - point.score * height);
      });
      
      ctx.stroke();

      // Draw circle points on the line
      fearData.forEach((point, i) => {
        if (i % 5 === 0) {  // Only draw every 5th point to avoid clutter
          ctx.beginPath();
          ctx.arc(stepX * i, height - point.score * height, 2, 0, 2 * Math.PI);
          ctx.fillStyle = '#FF4A4A';
          ctx.fill();
        }
      });
    }
    
  }, [history, width, height]);
  
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
    />
  );
}
