
import { BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdvantageItemProps {
  title: string;
  description: string;
  colorClass: string;
}

function AdvantageItem({ title, description, colorClass }: AdvantageItemProps) {
  return (
    <li className="flex items-start">
      <div className={`bg-${colorClass}/10 p-2 rounded-full mr-3 mt-1`}>
        <BarChart2 className={`h-5 w-5 text-${colorClass}`} />
      </div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </li>
  );
}

export function AdvantagesSection() {
  const advantages = [
    {
      title: "Lightweight Architecture",
      description: "Only 5.2M parameters (80% fewer than ResNet50) and 10 GFLOPs, making it suitable for deployment in resource-limited clinical settings.",
      colorClass: "emotion-confident"
    },
    {
      title: "Multi-Modal Capabilities",
      description: "A single unified model that handles three different medical imaging modalities: MRI for brain tumors, dermoscopy for skin cancer, and mammography for breast cancer.",
      colorClass: "emotion-fearful"
    },
    {
      title: "Competitive Performance",
      description: "90.5% accuracy and 0.95 AUC-ROC across all modalities, comparable to specialized models while requiring significantly less computational resources.",
      colorClass: "neutral-500"
    }
  ];

  return (
    <motion.div 
      className="mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Key Advantages</h2>
      
      <div className="bg-card rounded-xl p-8 shadow-lg">
        <ul className="space-y-4">
          {advantages.map((advantage, index) => (
            <AdvantageItem 
              key={index}
              title={advantage.title}
              description={advantage.description}
              colorClass={advantage.colorClass}
            />
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
