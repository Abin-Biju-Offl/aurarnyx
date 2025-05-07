
import { cn } from "@/lib/utils";

interface RecordingIndicatorProps {
  isRecording: boolean;
  className?: string;
}

export function RecordingIndicator({ isRecording, className }: RecordingIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className={cn(
          "w-3 h-3 rounded-full",
          isRecording 
            ? "bg-red-500 animate-pulse-slow" 
            : "bg-gray-300"
        )}
      />
      <span className="text-sm font-medium">
        {isRecording ? "Recording" : "Not Recording"}
      </span>
    </div>
  );
}
