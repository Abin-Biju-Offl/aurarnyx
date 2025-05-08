
import { motion } from 'framer-motion';
import { CancerTypeCard } from './CancerTypeCard';

export function CancerTypesSection() {
  const cancerTypes = [
    {
      type: 'tumor' as const,
      title: 'Tumor Detection',
      description: 'Analyzes MRI scans to classify brain tumors as benign or malignant with 90% sensitivity and 93% specificity. The tumor branch focuses on MRI intensities.'
    },
    {
      type: 'skin' as const,
      title: 'Skin Cancer Analysis',
      description: 'Processes dermoscopic images to identify melanoma vs. non-melanoma skin lesions with 92% sensitivity and 94% specificity. The skin branch specializes in lesion asymmetry.'
    },
    {
      type: 'breast' as const,
      title: 'Breast Cancer Screening',
      description: 'Examines mammograms to detect benign vs. malignant breast cancer with 91% sensitivity and 95% specificity. The breast branch is specialized in detecting calcifications.'
    }
  ];

  return (
    <motion.div 
      className="mt-16 grid gap-8 md:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {cancerTypes.map((cancer, index) => (
        <CancerTypeCard 
          key={index}
          type={cancer.type}
          title={cancer.title}
          description={cancer.description}
        />
      ))}
    </motion.div>
  );
}
