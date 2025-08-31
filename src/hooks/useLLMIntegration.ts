// Custom hook for LLM integration across attack pages
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { llmService } from '@/services/llmService';

export const useLLMIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const executeAttack = async (prompt: string, modelId: string) => {
    setIsLoading(true);
    
    try {
      const response = await llmService.generateResponse(prompt, modelId);
      setResponses(prev => ({ ...prev, [`${modelId}-${prompt}`]: response.text }));
      
      if (response.error) {
        toast({
          title: "Upozorenje",
          description: `Greška sa modelom ${response.model}: ${response.error}`,
          variant: "destructive",
        });
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Nepoznata greška';
      setResponses(prev => ({ ...prev, [`${modelId}-${prompt}`]: `Greška: ${errorMessage}` }));
      
      toast({
        title: "Greška",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    responses,
    executeAttack,
    setResponses
  };
};

export default useLLMIntegration;
