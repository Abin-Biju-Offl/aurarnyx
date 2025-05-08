
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Radiation, FileImage } from 'lucide-react';
import { ReactNode } from 'react';

interface CancerTypeCardProps {
  type: 'tumor' | 'skin' | 'breast';
  title: string;
  description: string;
}

export function CancerTypeCard({ type, title, description }: CancerTypeCardProps) {
  const getIconAndColor = (type: string): { icon: ReactNode; color: string } => {
    switch (type) {
      case 'tumor':
        return { 
          icon: <Brain className="h-6 w-6 text-emotion-confident" />,
          color: 'emotion-confident'
        };
      case 'skin':
        return { 
          icon: <Radiation className="h-6 w-6 text-emotion-fearful" />,
          color: 'emotion-fearful'
        };
      case 'breast':
        return { 
          icon: <FileImage className="h-6 w-6 text-neutral-500" />,
          color: 'neutral-500'
        };
      default:
        return { 
          icon: <Brain className="h-6 w-6 text-emotion-confident" />,
          color: 'emotion-confident'
        };
    }
  };

  const { icon, color } = getIconAndColor(type);

  return (
    <Card className={`border-t-4 border-t-${color} h-full`}>
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          <div className={`bg-${color}/10 p-3 rounded-full`}>
            {icon}
          </div>
          <h2 className="text-xl font-bold ml-3">{title}</h2>
        </div>
        <p className="text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
