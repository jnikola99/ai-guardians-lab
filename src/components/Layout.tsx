import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: ReactNode;
}

const attacks = [
  { name: 'Context Ignoring', path: '/context-ignoring' },
  { name: 'Prompt Leaking', path: '/prompt-leaking' },
  { name: 'Role Play Attack', path: '/role-play' },
  { name: 'Prefix Injection', path: '/prefix-injection' },
  { name: 'Data Reconstruction', path: '/data-reconstruction' },
];

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-gradient-cyber border border-primary/20 group-hover:shadow-glow transition-all duration-300">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Laboratorija LLM bezbednosti</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Interaktivne demonstracije napada</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Pregled
              </Link>
              {attacks.map((attack) => (
                <Link
                  key={attack.path}
                  to={attack.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === attack.path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {attack.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-sm">
              <nav className="py-4 space-y-2">
                <Link 
                  to="/" 
                  className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/' ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pregled
                </Link>
                {attacks.map((attack) => (
                  <Link
                    key={attack.path}
                    to={attack.path}
                    className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === attack.path ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {attack.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Obrazovna platforma za razumevanje bezbednosnih ranjivosti LLM modela
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}