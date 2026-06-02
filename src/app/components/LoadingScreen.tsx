import { useEffect, useState } from 'react';
import { Candy, Lollipop, Cookie } from '../icons';
import logo from '../../imports/Bombô.jpeg';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) {
    return (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none transition-opacity duration-400 opacity-0"
        style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-300"
      style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #A855F7 100%)' }}
    >
      <div className="relative mb-8">
        <div
          className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center animate-spin"
          style={{ animationDuration: '2.5s' }}
        >
          <Candy size={40} className="text-white" strokeWidth={1.5} />
        </div>
        <span
          className="absolute -top-2 -right-3 w-8 h-8 rounded-full bg-white/25 flex items-center justify-center animate-bounce"
          style={{ animationDelay: '0.2s' }}
        >
          <Lollipop size={18} className="text-white" />
        </span>
        <span
          className="absolute -bottom-1 -left-4 w-7 h-7 rounded-full bg-white/25 flex items-center justify-center animate-bounce"
          style={{ animationDelay: '0.5s' }}
        >
          <Cookie size={16} className="text-white" />
        </span>
      </div>
      <img src={logo} alt="Bômbô" className="h-20 max-h-20 object-contain mt-1 rounded-lg" />
      <p className="text-white/80 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Chargement des friandises...
      </p>
    </div>
  );
}
