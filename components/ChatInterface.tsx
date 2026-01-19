
import React, { useState, useRef, useEffect } from 'react';
// Added ZONES import to resolve ReferenceError on line 57
import { ExtendedZoneConfig, ZONES } from '../constants.tsx';
import { Message } from '../types.ts';
import { generateZoneResponse } from '../services/geminiService.ts';

interface ExperienceInterfaceProps {
  zone: ExtendedZoneConfig;
}

const ChatInterface: React.FC<ExperienceInterfaceProps> = ({ zone }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
  }, [zone.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (val: string, e?: React.FormEvent) => {
    e?.preventDefault();
    const text = val.trim();
    if (!text || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    try {
      const response = await generateZoneResponse(zone.prompt, text, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Our kitchen is refining the experience. Please wait a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-40">
      {/* Hero Header */}
      <section className="relative h-[65vh] w-full overflow-hidden flex items-end">
        <img 
          src={zone.imageUrl} 
          alt={zone.metaphor} 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6] scale-100 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 pb-12">
          <div className="flex flex-col gap-1 mb-4">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/40">Zone {ZONES.indexOf(zone) + 1}</span>
            <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-none italic">
              {zone.metaphor}
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light mt-6 max-w-xl leading-relaxed">
              {zone.description}
            </p>
          </div>

          <div className="flex gap-12 pt-8 border-t border-white/10 mt-8">
            {zone.featuredInsights.map((insight, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">{insight.label}</span>
                <span className="text-lg font-serif text-white/90 italic">{insight.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Experience Grid */}
      <section className="max-w-6xl mx-auto w-full px-8 md:px-16 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Chef's Selection */}
          <div className="lg:col-span-4 space-y-10">
            <div className="sticky top-12">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6">Concierge Suggestions</h3>
              <div className="flex flex-col gap-3">
                {zone.suggestedActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(action)}
                    className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-black transition-all duration-500 text-left shadow-sm hover:shadow-xl"
                  >
                    <span className="text-xs font-bold text-gray-600 tracking-tight group-hover:text-black transition-colors">{action}</span>
                    <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-12 p-8 rounded-3xl bg-gray-50/50 border border-gray-100 italic font-serif text-gray-500 leading-relaxed">
                "Experience the essence of {zone.title} architecture through our curated culinary flow."
              </div>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="lg:col-span-8">
            <div className="space-y-12">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-center opacity-20">
                  <div className="mb-4">{zone.icon}</div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Begin the Service</p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-experience-fade`}
                  >
                    <div className={`max-w-[90%] ${
                      msg.role === 'user' 
                      ? 'bg-black text-white rounded-3xl rounded-tr-none px-8 py-6 shadow-2xl' 
                      : 'bg-white border-l-2 border-black/10 px-8 py-2'
                    }`}>
                      {msg.role === 'assistant' && (
                        <div className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-300 mb-4">
                          Staff Note
                        </div>
                      )}
                      <p className={`text-lg leading-relaxed ${msg.role === 'assistant' ? 'font-serif italic text-gray-700' : 'font-medium'}`}>
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start animate-pulse italic font-serif text-gray-400 text-sm">
                  Service in progress...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Input Controller */}
      <div className="fixed bottom-12 left-0 right-0 md:left-24 px-6 md:px-12 z-[100] flex justify-center pointer-events-none">
        <div className="w-full max-w-3xl bg-white/70 backdrop-blur-3xl border border-black/5 shadow-[0_40px_100px_rgba(0,0,0,0.15)] rounded-full p-2 pointer-events-auto">
          <form onSubmit={(e) => handleSend(input, e)} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={zone.placeholder}
              className="flex-1 bg-transparent border-none px-8 py-4 text-black focus:outline-none text-base font-medium placeholder:text-black/30"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`h-12 px-8 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                isLoading || !input.trim() 
                ? 'bg-gray-100 text-gray-300' 
                : 'bg-black text-white hover:scale-105 shadow-lg active:scale-95'
              }`}
            >
              Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
