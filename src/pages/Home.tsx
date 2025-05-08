
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mic, 
  BarChart2, 
  ArrowRight,
  Brain,
  Radiation,
  FileImage
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectSlide } from '@/components/ProjectSlide';
import { ResearchTable } from '@/components/ResearchTable';
import { Navbar } from '@/components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  // Model comparison table data
  const modelComparisonColumns = [
    { key: 'model', header: 'Model' },
    { key: 'accuracy', header: 'Accuracy' },
    { key: 'auc', header: 'AUC' },
    { key: 'parameters', header: 'Parameters' },
    { key: 'gflops', header: 'GFLOPs' },
  ];
  
  const modelComparisonData = [
    { model: 'VGG16', accuracy: '90.2%', auc: '0.93', parameters: '138M', gflops: '30' },
    { model: 'ResNet50', accuracy: '92.7%', auc: '0.96', parameters: '25M', gflops: '25' },
    { model: 'Single-Task', accuracy: '89.0%', auc: '0.94', parameters: '15M', gflops: '18' },
    { model: 'TriadNet', accuracy: '90.5%', auc: '0.95', parameters: '5.2M', gflops: '10' },
  ];

  // Sensitivity/Specificity table data
  const sensitivityColumns = [
    { key: 'modality', header: 'Modality' },
    { key: 'sensitivity', header: 'Sensitivity' },
    { key: 'specificity', header: 'Specificity' },
  ];
  
  const sensitivityData = [
    { modality: 'Tumor', sensitivity: '0.90', specificity: '0.93' },
    { modality: 'Skin', sensitivity: '0.92', specificity: '0.94' },
    { modality: 'Breast', sensitivity: '0.91', specificity: '0.95' },
  ];

  // Project slides data
  const projectSlides = [
    {
      title: "1. Introduction to TriadNet",
      content: (
        <>
          <h1 className="text-3xl font-bold mb-4">Multi-Type Cancer Detection with Deep Learning</h1>
          <p className="mb-4">
            Cancer is still a worldwide health issue, and early detection is key to survival. We introduce TriadNet, 
            a lightweight convolutional neural network (CNN) that integrates brain tumor classification (MRI), 
            skin cancer classification (dermoscopy images), and breast cancer classification (mammograms).
          </p>
          <p>
            Trained on TCIA, ISIC 2019, and DDSM datasets, TriadNet attains 90.5% accuracy, F1-scores of 0.85-0.94, 
            and an AUC-ROC of 0.95 using only 5.2M parameters—10 fewer than ResNet50's 25M.
          </p>
        </>
      )
    },
    {
      title: "2. Methodology & Datasets",
      content: (
        <>
          <h3 className="text-xl font-bold mb-2">3.1. Datasets</h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>TCIA: 3000 MRI scans (50% benign, 50% malignant brain tumors)</li>
            <li>ISIC 2019: 25,000 dermoscopic images (20% melanoma, 80% non-melanoma)</li>
            <li>DDSM: 10,000 mammograms (50% benign, 50% malignant breast cancer)</li>
          </ul>
          
          <h3 className="text-xl font-bold mb-2">3.2. TriadNet Architecture</h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>
              <span className="font-medium">Shared Base:</span> Four blocks consisting of Conv2D, BatchNorm, 
              ReLU, and MaxPooling. Captures general features such as edges and textures.
            </li>
            <li>
              <span className="font-medium">Branches:</span> Three modality-specific branches for tumor, skin, 
              and breast, each specialized in different imaging characteristics.
            </li>
            <li>
              <span className="font-medium">Fusion Layer:</span> Concatenates branch outputs, followed by Global 
              Average Pooling, Dense layers, and Softmax classification.
            </li>
          </ul>
          
          <p className="text-sm italic">Parameters: 5.2M. Complexity: ~10 GFLOPs (compared to ResNet50's 25 GFLOPs)</p>
        </>
      )
    },
    {
      title: "3. Training & Evaluation",
      content: (
        <>
          <h3 className="text-xl font-bold mb-2">3.3. Training</h3>
          <p className="mb-4">
            TriadNet was trained for 50 epochs with a batch size of 32, applying early stopping. 
            Loss: Weighted categorical cross-entropy (melanoma: 2.0, others: 1.0). 
            Optimizer: Adam (lr=0.001), with Dropout (0.5) and L2 (0.01) regularization.
          </p>
          
          <h3 className="text-xl font-bold mb-2">3.4. Evaluation Metrics</h3>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><span className="font-medium">Primary:</span> Accuracy, F1-score, AUC-ROC, sensitivity, specificity</li>
            <li><span className="font-medium">Secondary:</span> Per-class AUC, confusion matrix, training curves</li>
          </ul>
          
          <h3 className="text-xl font-bold mb-2">3.5. Ablation Study</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>No Branches: Shared base + Dense layer. Accuracy: 86%, AUC: 0.91</li>
            <li>No Shared Base: Separate CNNs. Accuracy: 88%, parameters: 15M</li>
            <li>No Class Weights: Melanoma recall: 0.78, accuracy: 88%</li>
            <li>Full TriadNet: Accuracy: 90.5%, AUC: 0.95, parameters: 5.2M</li>
          </ul>
        </>
      )
    },
    {
      title: "4. Results & Analysis",
      content: (
        <>
          <h3 className="text-xl font-bold mb-4">4.1. Performance Summary</h3>
          <p className="mb-4">TriadNet reached:</p>
          <ul className="list-disc list-inside mb-6 space-y-1">
            <li>Accuracy: 90.5%</li>
            <li>F1-Scores: 0.85–0.94 (melanoma: 0.85)</li>
            <li>AUC-ROC: 0.95 (per-class: 0.93–0.97)</li>
            <li>Sensitivity/Specificity: 0.84–0.95 / 0.89–0.97</li>
          </ul>
          
          <h3 className="text-xl font-bold mb-4">4.2. Model Comparison</h3>
          <ResearchTable
            caption="Table 3 – Model Comparison"
            columns={modelComparisonColumns}
            data={modelComparisonData}
          />
          
          <p className="mt-4">
            TriadNet's accuracy of 90.5% beats single-task CNNs (89%) and comes close to ResNet50 (92.7%) 
            with 80% fewer parameters and 60% less complexity.
          </p>
        </>
      )
    },
    {
      title: "5. Discussions & Conclusion",
      content: (
        <>
          <h3 className="text-xl font-bold mb-3">5. Discussions</h3>
          <p className="mb-4">
            TriadNet combines brain, skin, and breast cancer detection with 90.5% accuracy and 0.95 AUC 
            on 5.2M parameters and 10 GFLOPs, deployable to resource-limited clinics. It outperforms 
            single-task CNNs (89%) and compares favorably to ResNet50 (92.7%) at lower complexity.
          </p>
          
          <h3 className="text-xl font-bold mb-3">6. Conclusion</h3>
          <p className="mb-4">
            TriadNet presents a compact CNN for multi-type cancer detection with 90.5% accuracy using 
            5.2M parameters. The unified design makes it a suitable candidate for usage in clinical 
            practices, with open-source code for implementation.
          </p>
          
          <h3 className="text-xl font-bold mb-3">Sensitivity/Specificity by Modality</h3>
          <ResearchTable
            columns={sensitivityColumns}
            data={sensitivityData}
          />
        </>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
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

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProjectSlide slides={projectSlides} />
        </motion.div>

        <motion.div 
          className="mt-16 grid gap-8 md:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="border-t-4 border-t-emotion-confident h-full">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="bg-emotion-confident/10 p-3 rounded-full">
                  <Brain className="h-6 w-6 text-emotion-confident" />
                </div>
                <h2 className="text-xl font-bold ml-3">Tumor Detection</h2>
              </div>
              <p className="text-muted-foreground">
                Analyzes MRI scans to classify brain tumors as benign or malignant with 90% sensitivity 
                and 93% specificity. The tumor branch focuses on MRI intensities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-emotion-fearful h-full">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="bg-emotion-fearful/10 p-3 rounded-full">
                  <Radiation className="h-6 w-6 text-emotion-fearful" />
                </div>
                <h2 className="text-xl font-bold ml-3">Skin Cancer Analysis</h2>
              </div>
              <p className="text-muted-foreground">
                Processes dermoscopic images to identify melanoma vs. non-melanoma skin lesions with 92% sensitivity 
                and 94% specificity. The skin branch specializes in lesion asymmetry.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-neutral-500 h-full">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="bg-neutral-500/10 p-3 rounded-full">
                  <FileImage className="h-6 w-6 text-neutral-500" />
                </div>
                <h2 className="text-xl font-bold ml-3">Breast Cancer Screening</h2>
              </div>
              <p className="text-muted-foreground">
                Examines mammograms to detect benign vs. malignant breast cancer with 91% sensitivity 
                and 95% specificity. The breast branch is specialized in detecting calcifications.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Key Advantages</h2>
          
          <div className="bg-card rounded-xl p-8 shadow-lg">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-emotion-confident/10 p-2 rounded-full mr-3 mt-1">
                  <BarChart2 className="h-5 w-5 text-emotion-confident" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Lightweight Architecture</h3>
                  <p className="text-muted-foreground">
                    Only 5.2M parameters (80% fewer than ResNet50) and 10 GFLOPs, making it suitable for 
                    deployment in resource-limited clinical settings.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-emotion-fearful/10 p-2 rounded-full mr-3 mt-1">
                  <BarChart2 className="h-5 w-5 text-emotion-fearful" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Multi-Modal Capabilities</h3>
                  <p className="text-muted-foreground">
                    A single unified model that handles three different medical imaging modalities: MRI for brain tumors, 
                    dermoscopy for skin cancer, and mammography for breast cancer.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-neutral-500/10 p-2 rounded-full mr-3 mt-1">
                  <BarChart2 className="h-5 w-5 text-neutral-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Competitive Performance</h3>
                  <p className="text-muted-foreground">
                    90.5% accuracy and 0.95 AUC-ROC across all modalities, comparable to specialized models while 
                    requiring significantly less computational resources.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

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
      </div>
    </div>
  );
};

export default Home;
