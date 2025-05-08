
import { Link, useLocation } from "react-router-dom";
import { Mic } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export function Navbar() {
  const location = useLocation();
  
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
          <nav className="flex items-center gap-1 mr-4">
            <Link to="/">
              <Button variant={location.pathname === '/' ? 'secondary' : 'ghost'}>
                Home
              </Button>
            </Link>
            <Link to="/analysis">
              <Button variant={location.pathname === '/analysis' ? 'secondary' : 'ghost'}>
                Analysis
              </Button>
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
