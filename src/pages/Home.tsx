
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mic, 
  BarChart2, 
  ArrowRight, 
  Layers, 
  Database
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.5 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center items-center mb-6">
            <Mic className="h-12 w-12 text-emotion-confident mr-3" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-emotion-confident to-emotion-fearful bg-clip-text text-transparent">
              Aurarnyx
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8">
            Advanced speech emotion analysis to help you become a more confident speaker
          </p>
          
          <Button 
            onClick={() => navigate('/analysis')} 
            className="text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
            size="lg"
          >
            Let's Get Tested <ArrowRight className="ml-2" />
          </Button>
        </motion.div>

        <motion.div 
          className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Card className="border-t-4 border-t-emotion-confident h-full">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-emotion-confident/10 p-3 rounded-full">
                    <Mic className="h-6 w-6 text-emotion-confident" />
                  </div>
                  <h2 className="text-xl font-bold ml-3">Real-time Analysis</h2>
                </div>
                <p className="text-muted-foreground">
                  Aurarnyx processes your speech in real-time, providing instant feedback 
                  on confidence levels and emotional patterns as you speak.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-t-4 border-t-emotion-fearful h-full">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-emotion-fearful/10 p-3 rounded-full">
                    <BarChart2 className="h-6 w-6 text-emotion-fearful" />
                  </div>
                  <h2 className="text-xl font-bold ml-3">Detailed Metrics</h2>
                </div>
                <p className="text-muted-foreground">
                  Get comprehensive analysis of your vocal confidence, fear indicators, 
                  and neutral tones with precise visualization of your emotional patterns.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-t-4 border-t-neutral-500 h-full">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-neutral-500/10 p-3 rounded-full">
                    <ArrowRight className="h-6 w-6 text-neutral-500" />
                  </div>
                  <h2 className="text-xl font-bold ml-3">Actionable Insights</h2>
                </div>
                <p className="text-muted-foreground">
                  Receive personalized suggestions to improve your speaking style, 
                  build confidence, and reduce fear indicators in your voice.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="bg-card rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Layers className="mr-2 h-6 w-6 text-emotion-confident" />
              Our Technology
            </h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-medium mb-2">Speech Processing Models</h4>
                <p className="text-muted-foreground">
                  Aurarnyx uses advanced speech processing models to analyze vocal characteristics 
                  such as pitch, tone, pace, and micro-fluctuations in your voice. Our primary model is 
                  based on a fine-tuned version of wav2vec 2.0, specially calibrated to detect 
                  subtle emotional indicators in speech patterns.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-medium mb-2">Emotion Classification</h4>
                <p className="text-muted-foreground">
                  Our emotion classification system focuses specifically on confidence and fear 
                  markers in speech, using a specialized neural network trained to identify subtle 
                  vocal cues that humans might miss. This binary focus allows for much higher 
                  accuracy in these specific emotional domains compared to general-purpose emotion 
                  detection systems.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-medium mb-2">Training Dataset</h4>
                <p className="text-muted-foreground">
                  The system was trained on a diverse dataset containing:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Over 10,000 hours of speech samples from professional speakers</li>
                  <li>Speech samples from public speaking events rated for confidence</li>
                  <li>Controlled speaking exercises from participants with varying confidence levels</li>
                  <li>Multi-cultural speech patterns to ensure broad applicability</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
          
          <Carousel className="mx-auto max-w-4xl">
            <CarouselContent>
              <CarouselItem>
                <div className="p-6">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-6 pb-6">
                      <p className="text-lg italic mb-4">
                        "Aurarnyx helped me identify patterns of uncertainty in my voice that I wasn't 
                        even aware of. After following the suggestions for just two weeks, my team 
                        noticed a significant improvement in my presentation confidence."
                      </p>
                      <div className="font-medium">Sarah K., Marketing Director</div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              
              <CarouselItem>
                <div className="p-6">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-6 pb-6">
                      <p className="text-lg italic mb-4">
                        "As someone who struggles with public speaking anxiety, this tool gave me 
                        concrete data on when my voice shows fear. The real-time feedback has been 
                        invaluable for my professional development."
                      </p>
                      <div className="font-medium">Michael T., Software Engineer</div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              
              <CarouselItem>
                <div className="p-6">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-6 pb-6">
                      <p className="text-lg italic mb-4">
                        "I've tried several speech coaching apps, but Aurarnyx's focus on confidence 
                        metrics specifically has made a measurable difference in how I'm perceived 
                        during client meetings."
                      </p>
                      <div className="font-medium">Elena R., Financial Advisor</div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </motion.div>

        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h2 className="text-3xl font-bold mb-8">Ready to analyze your speech?</h2>
          <Button 
            onClick={() => navigate('/analysis')} 
            className="text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
            size="lg"
          >
            Start Your Analysis Now <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
