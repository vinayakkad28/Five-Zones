
import React from 'react';
import { ZONES } from '../constants';
import { ZoneType } from '../types';

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
      <aside className={`fixed top-0 left-0 h-full w-24 md:w-32 bg-white border-r border-gray-100 z-[70] flex flex-col items-center py-12 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="mb-12">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-serif text-xl italic">
            5
          </div>
        </div>
        
        <nav className="flex-1 flex flex-col gap-8">
          {ZONES.map((zone) => {
            const isActive = activeZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => onZoneSelect(zone.id)}
                className={`relative group flex flex-col items-center gap-2 transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
              >
                <div className={`p-3 rounded-full transition-colors ${isActive ? zone.color + ' text-white shadow-lg shadow-black/10' : 'text-gray-900'}`}>
                  {zone.icon}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-center max-w-[60px] leading-tight">
                  {zone.title}
                </span>
                {isActive && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black"></div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => window.open('https://ai.google.dev/gemini-api/docs/billing', '_blank')}
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-6 right-6 z-[80] w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
        </svg>
      </button>
    </>
  );
};

export default ZoneNavigation;
