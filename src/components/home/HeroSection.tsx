
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="text-center max-w-3xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-center items-center mb-6">
        <Brain className="h-12 w-12 text-emotion-confident mr-3" />
        <h1 className="text-6xl font-bold bg-gradient-to-r from-emotion-confident to-emotion-fearful bg-clip-text text-transparent">
          TriadNet
        </h1>
      </div>
      
      <p className="text-xl text-muted-foreground mb-8">
        Advanced multi-type cancer detection through deep learning
      </p>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Button 
          onClick={() => navigate('/analysis')} 
          className="text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:shadow-xl"
          size="lg"
        >
          Explore Research <ArrowRight className="ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
