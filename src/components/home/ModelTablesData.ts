
export const modelComparisonColumns = [
  { key: 'model', header: 'Model' },
  { key: 'accuracy', header: 'Accuracy' },
  { key: 'auc', header: 'AUC' },
  { key: 'parameters', header: 'Parameters' },
  { key: 'gflops', header: 'GFLOPs' },
];

export const modelComparisonData = [
  { model: 'VGG16', accuracy: '90.2%', auc: '0.93', parameters: '138M', gflops: '30' },
  { model: 'ResNet50', accuracy: '92.7%', auc: '0.96', parameters: '25M', gflops: '25' },
  { model: 'Single-Task', accuracy: '89.0%', auc: '0.94', parameters: '15M', gflops: '18' },
  { model: 'TriadNet', accuracy: '90.5%', auc: '0.95', parameters: '5.2M', gflops: '10' },
];

export const sensitivityColumns = [
  { key: 'modality', header: 'Modality' },
  { key: 'sensitivity', header: 'Sensitivity' },
  { key: 'specificity', header: 'Specificity' },
];

export const sensitivityData = [
  { modality: 'Tumor', sensitivity: '0.90', specificity: '0.93' },
  { modality: 'Skin', sensitivity: '0.92', specificity: '0.94' },
  { modality: 'Breast', sensitivity: '0.91', specificity: '0.95' },
];

export const projectSlides = [
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
      </>
    )
  },
];
