import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ContextIgnoring from "./pages/ContextIgnoring";
import PromptLeaking from "./pages/PromptLeaking";
import RolePlayAttack from "./pages/RolePlayAttack";
import PrefixInjection from "./pages/PrefixInjection";
import DataReconstruction from "./pages/DataReconstruction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/context-ignoring" element={<ContextIgnoring />} />
            <Route path="/prompt-leaking" element={<PromptLeaking />} />
            <Route path="/role-play" element={<RolePlayAttack />} />
            <Route path="/prefix-injection" element={<PrefixInjection />} />
            <Route path="/data-reconstruction" element={<DataReconstruction />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
