import EnterpriseHero from '@/components/EnterpriseHero';
import CyberArsenal from '@/components/CyberArsenal';
import CyberSquad from '@/components/CyberSquad';
import Testimonials from '@/components/Testimonials';
import CyberFooter from '@/components/CyberFooter';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white selection:bg-blue-600 selection:text-white">
      
      {/* Universal Components */}
      <CustomCursor />
      <Navbar />
      <WhatsAppButton />

      {/* Enterprise Hero Section */}
      <EnterpriseHero />

      {/* Tech Arsenal (Keeping for now while transitioning) */}
      <CyberArsenal />

      {/* The Squad */}
      <CyberSquad />

      {/* Testimonials */}
      <Testimonials />

      {/* Footer: Waitlist Execution */}
      <CyberFooter />

    </main>
  );
}
