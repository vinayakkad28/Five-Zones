
import React from 'react';
import { ZONES } from '../constants.tsx';
import { ZoneType } from '../types.ts';

interface ZoneNavigationProps {
  activeZone: ZoneType;
  onZoneSelect: (zone: ZoneType) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ZoneNavigation: React.FC<ZoneNavigationProps> = ({ activeZone, onZoneSelect, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Immersive Sidebar Navigation */}
      <aside className={`fixed top-0 left-0 h-full w-24 bg-white border-r border-gray-100 z-[150] flex flex-col items-center py-12 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="mb-12">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-serif text-lg italic">
            5
          </div>
        </div>
        
        <nav className="flex-1 flex flex-col gap-10">
          {ZONES.map((zone) => {
            const isActive = activeZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => onZoneSelect(zone.id)}
                className={`relative group transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-20 hover:opacity-100'}`}
                title={zone.title}
              >
                <div className={`p-4 rounded-full transition-all ${isActive ? 'bg-black text-white shadow-xl' : 'text-black'}`}>
                  {zone.icon}
                </div>
                {isActive && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-black"></div>
                )}
                {/* Floating Tooltip */}
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl">
                  {zone.metaphor}
                </div>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="w-1 h-12 bg-gray-100 rounded-full"></div>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-6 right-6 z-[200] w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isOpen ? "M6 18L18 6" : "M4 6h16M4 12h16"} />
        </svg>
      </button>
    </>
  );
};

export default ZoneNavigation;
