
import { Navbar } from '@/components/Navbar';
import { ProjectSlide } from '@/components/ProjectSlide';
import { ResearchTable } from '@/components/ResearchTable';
import { motion } from 'framer-motion';
import { 
  modelComparisonColumns, 
  modelComparisonData, 
  sensitivityColumns, 
  sensitivityData,
  projectSlides
} from '@/components/home/ModelTablesData';
import { HeroSection } from '@/components/home/HeroSection';
import { CancerTypesSection } from '@/components/home/CancerTypesSection';
import { AdvantagesSection } from '@/components/home/AdvantagesSection';
import { CallToActionSection } from '@/components/home/CallToActionSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <HeroSection />

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProjectSlide slides={projectSlides} />
        </motion.div>

        <CancerTypesSection />
        <AdvantagesSection />

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Research Results</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Model Comparison</h3>
              <ResearchTable
                caption="Table 1 – Model Comparison"
                columns={modelComparisonColumns}
                data={modelComparisonData}
              />
              <p className="mt-4 text-sm text-muted-foreground">
                TriadNet's accuracy of 90.5% beats single-task CNNs (89%) and comes close to ResNet50 (92.7%) 
                with 80% fewer parameters and 60% less complexity.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Sensitivity/Specificity by Modality</h3>
              <ResearchTable
                caption="Table 2 – Sensitivity/Specificity"
                columns={sensitivityColumns}
                data={sensitivityData}
              />
            </div>
          </div>
        </motion.div>

        <CallToActionSection />
      </div>
    </div>
  );
};

export default Home;
