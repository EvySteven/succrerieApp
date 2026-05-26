import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Bot, UserCircle } from 'lucide-react';
import type { ChatMessage } from '../types';

const QUICK_CHIPS = ['Suivre ma commande', 'Voir les promos', 'Parler à un humain'];

const BOT_RESPONSES: Record<string, string> = {
  'Suivre ma commande': "Pour suivre ta commande, connecte-toi à ton espace client et clique sur 'Mes commandes'. Tu recevras aussi des notifications par email à chaque étape.",
  'Voir les promos': "En ce moment : -20% sur les Rochers Caramel Maison, -27% sur les Guimauves Arc-en-ciel, et -20% sur le Coffret Découverte ! Rendez-vous sur la page Produits.",
  'Parler à un humain': '__HUMAN__',
  default: "Merci pour ta question ! Je transmets ça à notre équipe. En attendant, tu peux consulter notre FAQ ou nous écrire à bonjour@bombo.fr.",
};

let nextId = 10;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis l'assistant Bombo. Comment puis-je t'aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [humanMode, setHumanMode] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: nextId++,
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responseText = BOT_RESPONSES[text] || BOT_RESPONSES.default;

      if (responseText === '__HUMAN__') {
        setHumanMode(true);
        setMessages(prev => [...prev, {
          id: nextId++,
          text: "Un gérant va te rejoindre dans quelques instants. En attendant, décris-nous ton problème et nous reviendrons vers toi très vite.",
          sender: 'bot',
          timestamp: new Date(),
        }]);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: nextId++,
            text: "Bonjour ! Je suis Sophie du support Bombo. Comment puis-je vous aider ?",
            sender: 'manager',
            timestamp: new Date(),
          }]);
        }, 2000);
      } else {
        setMessages(prev => [...prev, {
          id: nextId++,
          text: responseText,
          sender: 'bot',
          timestamp: new Date(),
        }]);
      }
    }, 1200);
  };

  const SenderAvatar = ({ sender }: { sender: ChatMessage['sender'] }) => {
    if (sender === 'user') return null;
    const isManager = sender === 'manager';
    return (
      <div
        className="w-7 h-7 rounded-full mr-2 flex-shrink-0 flex items-center justify-center"
        style={{ background: isManager ? '#FFD93D' : 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}
      >
        {isManager ? (
          <UserCircle size={16} className="text-[#3D1C02]" />
        ) : (
          <Bot size={16} className="text-white" />
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-[90vw] max-w-[380px] sm:w-[380px] rounded-3xl overflow-hidden flex flex-col fixed sm:static bottom-20 sm:bottom-auto right-4 sm:right-auto"
          style={{
            height: 'min(500px, 90vh)',
            boxShadow: '0 20px 60px rgba(168,85,247,0.25)',
            border: '1.5px solid rgba(255,107,157,0.2)',
            background: '#FFF8F0',
          }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-white text-sm" style={{ fontFamily: 'Baloo 2, cursive' }}>
                Bombo Assistant
                {humanMode && <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Gérant en ligne</span>}
              </div>
              <div className="flex items-center gap-1.5 text-white/80 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] inline-block animate-pulse" />
                En ligne
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <SenderAvatar sender={msg.sender} />
                <div
                  className="max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: msg.sender === 'user' ? 'linear-gradient(135deg, #FF6B9D, #A855F7)' : '#fff',
                    color: msg.sender === 'user' ? '#fff' : '#3D1C02',
                    borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.sender === 'user' ? '16px' : '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-white px-4 py-2.5 rounded-2xl rounded-bl-[4px] flex gap-1.5 items-center shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {QUICK_CHIPS.map(chip => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105"
                    style={{
                      borderColor: '#FF6B9D',
                      color: '#FF6B9D',
                      background: 'rgba(255,107,157,0.08)',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-pink-100 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Écris un message..."
              className="flex-1 px-4 py-2.5 rounded-2xl text-sm outline-none"
              style={{
                background: '#FFF8F0',
                border: '1.5px solid rgba(255,107,157,0.2)',
                fontFamily: 'Poppins, sans-serif',
                color: '#3D1C02',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="relative">
        {showBadge && !open && (
          <div
            className="absolute -top-10 right-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg animate-bounce flex items-center gap-1.5"
            style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)', fontFamily: 'Poppins, sans-serif' }}
          >
            <MessageCircle size={12} />
            Besoin d'aide ?
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-110 hover:shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}
          aria-label="Ouvrir le chat"
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
      </div>
    </div>
  );
}
