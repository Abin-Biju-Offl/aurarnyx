
import { useState } from 'react';
import { 
  Mail, 
  Send, 
  User, 
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully!");
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about Aurarnyx? Feel free to reach out to our team, and we'll get back to you as soon as possible.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <User className="mr-2 h-5 w-5 text-emotion-confident" />
                Our Team
              </h2>
              
              <div className="space-y-5">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-medium">Abin Biju</p>
                  <p className="text-sm text-muted-foreground">Project Lead</p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-medium">Aaththi Pandi.A</p>
                  <p className="text-sm text-muted-foreground">Developer</p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-medium">Aadhi Dharmar.T</p>
                  <p className="text-sm text-muted-foreground">Developer</p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-medium">Hariprasath.C</p>
                  <p className="text-sm text-muted-foreground">Developer</p>
                </div>
              </div>

              <div className="mt-8 p-5 bg-emotion-confident/10 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-emotion-confident" />
                  Email Us
                </h3>
                <a 
                  href="mailto:abinbiju23ads@srishakthi.ac.in" 
                  className="text-emotion-confident hover:underline"
                >
                  abinbiju23ads@srishakthi.ac.in
                </a>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-8 h-full">
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-emotion-confident" />
                  Send us a message
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">⟳</span> Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
        
        <motion.footer 
          className="mt-20 text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>© 2025 Aurarnyx. All Rights Reserved. Created by Abin Biju.</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Contact;
