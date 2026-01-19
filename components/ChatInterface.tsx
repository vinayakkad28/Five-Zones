
import React, { useState, useRef, useEffect } from 'react';
import { ExtendedZoneConfig } from '../constants';
import { Message } from '../types';
import { generateZoneResponse } from '../services/geminiService';

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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
      setMessages(prev => [...prev, { role: 'assistant', content: "Our kitchen is experiencing high traffic. Please try again shortly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-end">
        <img 
          src={zone.imageUrl} 
          alt={zone.metaphor} 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 pb-16">
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-[11px] font-black tracking-[0.4em] uppercase text-white/60">The {zone.title} Experience</span>
            <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight leading-none italic">
              {zone.metaphor}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light mt-4 max-w-2xl leading-relaxed">
              {zone.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            {zone.featuredInsights.map((insight, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">{insight.label}</span>
                <span className="text-lg font-serif text-white italic">{insight.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interaction Canvas */}
      <section className="bg-white flex-1 relative px-8 md:px-16 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Actions & Vibe */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Chef's Curated Actions</h3>
              <div className="grid gap-4">
                {zone.suggestedActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(action)}
                    className="group flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-black transition-all duration-500 text-left"
                  >
                    <span className="text-sm font-bold text-gray-800 tracking-tight">{action}</span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-stone-50 border border-stone-100 italic font-serif text-stone-600 leading-relaxed text-lg">
              "{zone.prompt.split('.')[1]}..."
            </div>
          </div>

          {/* Right Column: Experience Log (Chat) */}
          <div className="lg:col-span-7 flex flex-col min-h-[500px]">
            <div className="flex-1 space-y-10 mb-32">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-40">
                  <div className="w-16 h-16 border border-black/10 rounded-full flex items-center justify-center">
                    {zone.icon}
                  </div>
                  <p className="text-sm font-bold tracking-widest uppercase">Start the Conversation</p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-experience-fade`}
                  >
                    <div className={`max-w-[90%] md:max-w-[85%] ${
                      msg.role === 'user' 
                      ? 'bg-black text-white rounded-3xl rounded-tr-none px-8 py-6 shadow-2xl shadow-black/10' 
                      : 'bg-white border-l-4 border-black px-8 py-2 text-gray-800'
                    }`}>
                      {msg.role === 'assistant' && (
                        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">
                          {zone.metaphor} Staff
                        </div>
                      )}
                      <p className={`text-lg md:text-xl leading-relaxed ${msg.role === 'assistant' ? 'font-serif italic' : 'font-medium'}`}>
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="flex items-center gap-4 text-gray-400 italic font-serif">
                    <div className="w-2 h-2 rounded-full bg-black/20"></div>
                    <span>Kitchen preparing response...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Concierge Input */}
      <div className="fixed bottom-12 left-24 md:left-48 right-12 z-50 flex justify-center">
        <div className="w-full max-w-4xl bg-black shadow-[0_50px_100px_rgba(0,0,0,0.3)] rounded-full p-2 md:p-3">
          <form onSubmit={(e) => handleSend(input, e)} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={zone.placeholder}
              className="flex-1 bg-transparent border-none px-8 py-4 text-white focus:outline-none text-lg font-medium placeholder:text-white/20"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`h-14 px-10 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                isLoading || !input.trim() 
                ? 'bg-white/5 text-white/10' 
                : 'bg-white text-black hover:scale-105 active:scale-95'
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
