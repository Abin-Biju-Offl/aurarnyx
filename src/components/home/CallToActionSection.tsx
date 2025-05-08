
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CallToActionSection() {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="mt-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
    >
      <h2 className="text-3xl font-bold mb-8">Ready to explore the research?</h2>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Button 
          onClick={() => navigate('/analysis')} 
          className="text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:shadow-xl"
          size="lg"
        >
          View Analysis Details <ArrowRight className="ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
