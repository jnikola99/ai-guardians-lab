import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings, Eye, EyeOff, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { llmService } from '@/services/llmService';

interface ApiKeyConfigProps {
  onConfigChange?: () => void;
}

const ApiKeyConfig = ({ onConfigChange }: ApiKeyConfigProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const existingKey = llmService.getHuggingFaceApiKey();
    if (existingKey) {
      setApiKey(existingKey);
      setIsConfigured(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      llmService.setHuggingFaceApiKey(apiKey.trim());
      setIsConfigured(true);
      onConfigChange?.();
    }
  };

  const handleClearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('hf_api_key');
    setIsConfigured(false);
    onConfigChange?.();
  };

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          LLM Konfiguracija
        </CardTitle>
        <CardDescription>
          Konfigurišite API ključeve za pristup stvarnim LLM modelima
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status */}
        <Alert className={isConfigured ? 'border-success/50 bg-success/10' : 'border-warning/50 bg-warning/10'}>
          {isConfigured ? (
            <CheckCircle className="h-4 w-4 text-success" />
          ) : (
            <AlertCircle className="h-4 w-4 text-warning" />
          )}
          <AlertDescription>
            {isConfigured ? (
              <span className="text-success">
                <strong>Konfigurisano:</strong> GPT-J-6B model je dostupan za testiranje
              </span>
            ) : (
              <span className="text-warning">
                <strong>Potrebna konfiguracija:</strong> Dodajte Hugging Face API ključ za pristup GPT-J-6B modelu
              </span>
            )}
          </AlertDescription>
        </Alert>

        {/* Hugging Face API Key */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Hugging Face API Key:</label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://huggingface.co/settings/tokens', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Nabavi ključ
            </Button>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={showApiKey ? 'text' : 'password'}
                placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
              Sačuvaj
            </Button>
            {isConfigured && (
              <Button variant="outline" onClick={handleClearApiKey}>
                Ukloni
              </Button>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground">
            Vaš API ključ se čuva lokalno u browser-u i koristi se samo za direktne pozive ka Hugging Face API-ju.
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Kako da dobijete Hugging Face API ključ:</h4>
          <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Idite na <a href="https://huggingface.co" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">huggingface.co</a> i registrujte se</li>
            <li>Idite na Settings → Access Tokens</li>
            <li>Kliknite "New token" i izaberite "Read" permissions</li>
            <li>Kopirajte token i zalepite ga ovde</li>
          </ol>
        </div>

        {/* Model Info */}
        <div className="pt-4 border-t border-border/50">
          <h4 className="text-sm font-medium mb-2">Dostupni modeli:</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-2 rounded bg-secondary/20">
              <span><strong>Qwen2.5-7B-Instruct</strong> - Alibaba (2024)</span>
              <span className={`px-2 py-1 rounded text-xs ${isConfigured ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}`}>
                {isConfigured ? 'Dostupan' : 'Potreban API ključ'}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-secondary/20">
              <span><strong>GPT-2</strong> - OpenAI (2019)</span>
              <span className={`px-2 py-1 rounded text-xs ${isConfigured ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}`}>
                {isConfigured ? 'Dostupan' : 'Potreban API ključ'}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-secondary/20">
              <span><strong>Modern AI</strong> - Simulacija bezbednog modela</span>
              <span className="px-2 py-1 rounded text-xs bg-success/20 text-success">
                Uvek dostupan
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyConfig;
