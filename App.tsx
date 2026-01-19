
import React, { useState, useEffect } from 'react';
import { ZoneType } from './types';
import { ZONES } from './constants';
import ZoneNavigation from './components/ZoneNavigation';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<ZoneType>(ZoneType.OBSERVATION);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeZone = ZONES.find(z => z.id === activeZoneId) || ZONES[0];

  const handleZoneChange = (id: ZoneType) => {
    if (id === activeZoneId) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveZoneId(id);
      setIsTransitioning(false);
      setIsSidebarOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Immersive Navigation Sidebar */}
      <ZoneNavigation 
        activeZone={activeZoneId} 
        onZoneSelect={handleZoneChange}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Experience Canvas */}
      <main className={`ml-0 md:ml-32 transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-8 blur-lg' : 'opacity-100 translate-y-0 blur-0'}`}>
        <ChatInterface zone={activeZone} />
      </main>

      {/* Aesthetic Overlays */}
      <div className="fixed inset-0 pointer-events-none border-[24px] border-white/5 z-[60]"></div>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100] mix-blend-soft-light opacity-30 grain-overlay"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-out infinite alternate;
        }

        @keyframes experience-fade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-experience-fade {
          animation: experience-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        ::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default App;
