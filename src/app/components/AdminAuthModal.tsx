import { useState } from 'react';
import { Lock, X, AlertCircle, Loader } from 'lucide-react';

interface AdminAuthModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  onSubmit: (password: string) => Promise<{ success: boolean; error?: string } | void>;
  isLoading: boolean;
  error?: string | null;
}

export default function AdminAuthModal({ onClose, onSuccess, onSubmit, isLoading, error }: AdminAuthModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await onSubmit(password);
    if (result && result.success) {
      setPassword('');
      onSuccess?.();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative w-full max-w-sm rounded-3xl p-6 shadow-2xl"
        style={{ background: '#FFF8F0' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-pink-50 text-[#8B6355]"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(255,107,157,0.15)' }}
          >
            <Lock size={24} className="text-[#FF6B9D]" />
          </div>
          <h2
            className="text-2xl font-bold text-[#3D1C02]"
            style={{ fontFamily: 'Baloo 2, cursive' }}
          >
            Espace Administrateur
          </h2>
        </div>

        <p
          className="text-[#8B6355] mb-4 text-sm"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Entrez le mot de passe pour accéder à l'espace administrateur.
        </p>

        {error && (
          <div
            className="mb-4 p-3 rounded-2xl flex items-start gap-3"
            style={{ background: '#FEE2E2' }}
          >
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="text-sm font-semibold text-[#3D1C02] block mb-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Mot de passe
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none border-[1.5px] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: '#FFF',
                borderColor: 'rgba(255,107,157,0.2)',
                color: '#3D1C02',
                fontFamily: 'Poppins, sans-serif',
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="text-xs text-[#FF6B9D] hover:underline mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {showPassword ? 'Masquer' : 'Afficher'}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="w-full py-3 rounded-2xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #FF6B9D, #A855F7)',
              fontFamily: 'Baloo 2, cursive',
            }}
          >
            {isLoading && (
              <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin inline-block" />
            )}
            {isLoading ? 'Vérification...' : 'Accéder'}
          </button>
        </form>
      </div>
    </div>
  );
}
