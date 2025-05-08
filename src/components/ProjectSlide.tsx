
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface ProjectSlideProps {
  slides: {
    title: string;
    content: React.ReactNode;
  }[];
}

export function ProjectSlide({ slides }: ProjectSlideProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative bg-black text-white p-6 md:p-10 rounded-lg overflow-hidden min-h-[600px] flex flex-col">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{slides[currentSlide].title}</h2>
        <div className="prose prose-invert max-w-none">
          {slides[currentSlide].content}
        </div>
      </motion.div>
      
      <div className="flex justify-between items-center pt-4 mt-auto">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={goToPrevSlide}
          className="rounded-full bg-gray-800/50 hover:bg-gray-700"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <div className="text-sm">
          Slide {currentSlide + 1} of {slides.length}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={goToNextSlide}
          className="rounded-full bg-gray-800/50 hover:bg-gray-700"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
