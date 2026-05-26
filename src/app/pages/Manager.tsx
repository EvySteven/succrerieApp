import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, RotateCcw, MessageCircle, Bot, Circle } from 'lucide-react';
import type { Page } from '../types';

interface ManagerProps {
  navigate: (page: Page) => void;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  status: 'waiting' | 'active' | 'resolved';
  orders: number;
  points: number;
  level: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'client' | 'manager' | 'bot';
  time: string;
}

const CONVERSATIONS: Conversation[] = [
  { id: 1, name: 'Marie D.', avatar: 'https://i.pravatar.cc/40?img=47', lastMessage: "Bonjour, j'ai un souci avec ma commande...", time: '14:32', unread: true, status: 'waiting', orders: 12, points: 840, level: 'Chocolat' },
  { id: 2, name: 'Lucas M.', avatar: 'https://i.pravatar.cc/40?img=12', lastMessage: "Est-ce que les truffes sont disponibles ?", time: '13:15', unread: true, status: 'waiting', orders: 8, points: 520, level: 'Sucre' },
  { id: 3, name: 'Emma L.', avatar: 'https://i.pravatar.cc/40?img=32', lastMessage: "Merci beaucoup, c'était parfait !", time: 'Hier', unread: false, status: 'resolved', orders: 24, points: 1850, level: 'VIP' },
  { id: 4, name: 'Thomas P.', avatar: 'https://i.pravatar.cc/40?img=68', lastMessage: "Je voudrais personnaliser un coffret...", time: 'Hier', unread: false, status: 'active', orders: 3, points: 180, level: 'Caramel' },
];

const INITIAL_MESSAGES: Record<number, Message[]> = {
  1: [
    { id: 1, text: "Bonjour ! Je suis l'assistant Bombo. Comment puis-je vous aider ?", sender: 'bot', time: '14:28' },
    { id: 2, text: "Bonjour, j'ai passé une commande il y a 3 jours et je n'ai pas encore reçu de suivi. C'est la commande #BOM-2451.", sender: 'client', time: '14:30' },
    { id: 3, text: "Je comprends votre inquiétude ! Laissez-moi vérifier l'état de votre commande...", sender: 'bot', time: '14:30' },
    { id: 4, text: "Un gérant va vous rejoindre dans quelques instants.", sender: 'bot', time: '14:31' },
  ],
  2: [
    { id: 1, text: "Bonjour ! Je suis l'assistant Bombo. Comment puis-je vous aider ?", sender: 'bot', time: '13:10' },
    { id: 2, text: "Bonjour ! Est-ce que vos Truffes Chocolat Noir sont disponibles en grande quantité ? Je veux en commander pour un mariage.", sender: 'client', time: '13:12' },
    { id: 3, text: "Quelle belle occasion ! Oui, nous proposons des commandes en grande quantité. Un gérant peut vous conseiller au mieux.", sender: 'bot', time: '13:13' },
  ],
};

let nextMsgId = 100;

const STATUS_LABEL = {
  waiting: { label: 'En attente', color: '#ef4444' },
  active: { label: 'Actif', color: '#4ADE80' },
  resolved: { label: 'Résolu', color: '#8B6355' },
};

const LEVEL_COLORS: Record<string, string> = {
  'Caramel': '#D4A017',
  'Sucre': '#FF6B9D',
  'Chocolat': '#6B3A2A',
  'VIP': '#A855F7',
};

export default function Manager({ navigate }: ManagerProps) {
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedConv]);

  const sendMessage = () => {
    if (!input.trim() || !selectedConv) return;
    const newMsg: Message = {
      id: nextMsgId++,
      text: input.trim(),
      sender: 'manager',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => ({
      ...prev,
      [selectedConv.id]: [...(prev[selectedConv.id] || []), newMsg],
    }));
    setInput('');
  };

  const handBackToBot = () => {
    if (!selectedConv) return;
    const newMsg: Message = {
      id: nextMsgId++,
      text: "Le gérant a transmis votre conversation au bot. L'assistant Bombo est de retour !",
      sender: 'bot',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => ({
      ...prev,
      [selectedConv.id]: [...(prev[selectedConv.id] || []), newMsg],
    }));
  };

  const currentMessages = selectedConv ? (messages[selectedConv.id] || []) : [];

  return (
    <div className="h-screen flex" style={{ background: '#1a0a2e' }}>
      {/* Conversations list */}
      <div
        className={`${selectedConv ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 shrink-0`}
        style={{ borderRight: '1px solid rgba(255,255,255,0.08)', background: '#2a1040' }}
      >
        {/* Header */}
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => navigate('admin')}
            className="text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="font-bold text-white" style={{ fontFamily: 'Baloo 2, cursive' }}>
              <span className="inline-flex items-center gap-2">
                <MessageCircle size={18} />
                Espace Gérant
              </span>
            </div>
            <div className="text-xs text-white/40" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {CONVERSATIONS.filter(c => c.status === 'waiting').length} conversation(s) en attente
            </div>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map(conv => (
            <button
              key={conv.id}
              onClick={() => setSelectedConv(conv)}
              className="w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-white/5"
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: selectedConv?.id === conv.id ? 'rgba(255,107,157,0.1)' : 'transparent',
              }}
            >
              <div className="relative shrink-0">
                <img src={conv.avatar} alt={conv.name} className="w-11 h-11 rounded-full" />
                {conv.status === 'waiting' && (
                  <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-[#2a1040]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-white text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {conv.name}
                  </span>
                  <span className="text-xs text-white/30" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {conv.time}
                  </span>
                </div>
                <p className="text-xs text-white/40 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {conv.lastMessage}
                </p>
                {conv.unread && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                    style={{ background: '#ef4444', color: '#fff' }}
                  >
                    En attente
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {selectedConv ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div
            className="flex items-center gap-3 p-4"
            style={{ background: '#2a1040', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            <button
              className="md:hidden text-white/60 hover:text-white"
              onClick={() => setSelectedConv(null)}
            >
              <ArrowLeft size={20} />
            </button>
            <img src={selectedConv.avatar} alt={selectedConv.name} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="font-bold text-white" style={{ fontFamily: 'Baloo 2, cursive' }}>
                {selectedConv.name}
              </div>
              <div
                className="text-xs font-semibold flex items-center gap-1.5"
                style={{ color: STATUS_LABEL[selectedConv.status].color, fontFamily: 'Poppins, sans-serif' }}
              >
                <Circle size={8} fill={STATUS_LABEL[selectedConv.status].color} className="shrink-0" />
                {STATUS_LABEL[selectedConv.status].label}
              </div>
            </div>
            <button
              onClick={handBackToBot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white/60 border border-white/10 hover:bg-white/5 transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <RotateCcw size={13} /> Rendre la main au bot IA
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {currentMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'client' ? 'justify-start' : msg.sender === 'manager' ? 'justify-end' : 'justify-center'}`}
                >
                  {msg.sender === 'bot' ? (
                    <div
                      className="max-w-md px-4 py-2 rounded-2xl text-xs flex items-start gap-2"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Bot size={14} className="shrink-0 mt-0.5 opacity-70" />
                      {msg.text}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 max-w-[70%]">
                      <div
                        className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                        style={{
                          background: msg.sender === 'manager'
                            ? 'linear-gradient(135deg, #FF6B9D, #A855F7)'
                            : 'rgba(255,255,255,0.1)',
                          color: '#fff',
                          borderBottomRightRadius: msg.sender === 'manager' ? '4px' : '16px',
                          borderBottomLeftRadius: msg.sender === 'client' ? '4px' : '16px',
                          fontFamily: 'Poppins, sans-serif',
                        }}
                      >
                        {msg.text}
                      </div>
                      <span
                        className="text-[10px] px-1"
                        style={{ color: 'rgba(255,255,255,0.3)', textAlign: msg.sender === 'manager' ? 'right' : 'left', fontFamily: 'Poppins, sans-serif' }}
                      >
                        {msg.sender === 'manager' ? 'Vous' : selectedConv.name} · {msg.time}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Client context panel */}
            <div
              className="hidden lg:flex flex-col w-64 shrink-0 p-4 gap-4"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', background: '#2a1040' }}
            >
              <div className="text-sm font-bold text-white" style={{ fontFamily: 'Baloo 2, cursive' }}>
                Contexte client
              </div>
              <div className="flex items-center gap-2">
                <img src={selectedConv.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-semibold text-white text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedConv.name}</div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.08)', color: LEVEL_COLORS[selectedConv.level] }}
                  >
                    {selectedConv.level}
                  </span>
                </div>
              </div>
              {[
                { label: 'Commandes', value: selectedConv.orders },
                { label: 'Points fidélité', value: `${selectedConv.points} pts` },
                { label: 'Niveau', value: selectedConv.level },
              ].map(info => (
                <div key={info.label} className="flex justify-between text-sm">
                  <span className="text-white/40" style={{ fontFamily: 'Poppins, sans-serif' }}>{info.label}</span>
                  <span className="text-white font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>{info.value}</span>
                </div>
              ))}

              <div className="mt-2">
                <div className="text-xs font-semibold text-white/40 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Actions rapides
                </div>
                {['Ajouter 50 pts', 'Envoyer bon promo', 'Marquer résolu'].map(action => (
                  <button
                    key={action}
                    className="w-full text-left text-xs px-3 py-2 rounded-xl mb-1.5 text-white/60 hover:bg-white/8 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', fontFamily: 'Poppins, sans-serif' }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4" style={{ background: '#2a1040', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Répondre en tant que gérant..."
                className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none text-white"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,107,157,0.2)',
                  fontFamily: 'Poppins, sans-serif',
                }}
              />
              <button
                onClick={sendMessage}
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center flex-col gap-4">
          <MessageCircle size={64} className="text-white/20" strokeWidth={1.5} />
          <div className="text-white/50 text-lg font-semibold" style={{ fontFamily: 'Baloo 2, cursive' }}>
            Sélectionnez une conversation
          </div>
          <div className="text-white/30 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {CONVERSATIONS.filter(c => c.status === 'waiting').length} conversations en attente de réponse
          </div>
        </div>
      )}
    </div>
  );
}
