
import { Link } from "react-router-dom";
import { Mic } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export function Navbar() {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Mic className="h-6 w-6 text-emotion-confident" />
          <Link to="/" className="text-xl font-bold">
            Aurarnyx
          </Link>
          <span className="text-xs bg-emotion-confident/20 text-emotion-confident px-2 py-0.5 rounded-full">
            Speech Emotion Analysis
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
