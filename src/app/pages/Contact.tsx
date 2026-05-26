import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Map } from 'lucide-react';
import type { Page } from '../types';
import BomboButton from '../components/design-system/BomboButton';
import BomboInput from '../components/design-system/BomboInput';

interface ContactProps {
  navigate: (page: Page) => void;
}

export default function Contact({ navigate }: ContactProps) {
  return (
    <main className="min-h-screen bg-[#FFF8F0]">
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.15), rgba(168,85,247,0.15))' }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-[#3D1C02] mb-3 flex items-center justify-center gap-3" style={{ fontFamily: 'Baloo 2, cursive' }}>
          <Mail size={36} className="text-[#FF6B9D]" />
          Contactez-nous
        </h1>
        <p className="text-[#8B6355] max-w-lg mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Une question sur une commande, un allergène ou un coffret sur mesure ? Notre équipe vous répond avec le sourire.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          {[
            {
              Icon: MapPin,
              title: 'Boutique Bômbô',
              text: 'Voir notre boutique sur Google Maps',
              href: 'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwiI5ZqAwsyUAxUAAAAAHQAAAAAQQg..i&sca_esv=525e608177515078&pvq=OhYweDA6MHhkNzczOTU5YjU5YTNlMDRk&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=bf&sa=X&ftid=0xe2ebf2e1ad1878d:0xd773959b59a3e04d',
            },
            { Icon: Phone, title: 'Téléphone', text: '01 23 45 67 89' },
            { Icon: Mail, title: 'Email', text: 'bonjour@bombo.fr' },
            { Icon: Clock, title: 'Horaires', text: 'Lun–Ven 9h–18h · Sam 10h–16h' },
          ].map(({ Icon, title, text, href }) => (
            <div
              key={title}
              className="flex items-start gap-4 bg-white p-5 rounded-3xl"
              style={{ border: '1.5px solid rgba(255,107,157,0.1)', boxShadow: '0 4px 20px rgba(255,107,157,0.06)' }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,107,157,0.1)' }}
              >
                <Icon size={22} className="text-[#FF6B9D]" />
              </div>
              <div>
                <h3 className="font-bold text-[#3D1C02] mb-1" style={{ fontFamily: 'Baloo 2, cursive' }}>
                  {title}
                </h3>
                <p className="text-[#8B6355] text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#FF6B9D] underline decoration-pink-200"
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </p>
              </div>
            </div>
          ))}

          <div
            className="rounded-3xl overflow-hidden h-48 bg-pink-50 flex flex-col items-center justify-center gap-2 text-[#8B6355]"
            style={{ border: '1.5px solid rgba(255,107,157,0.1)' }}
          >
            <Map size={40} className="text-[#FF6B9D] opacity-40" />
            <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Carte interactive (à venir)</span>
          </div>
        </div>

        <form
          className="bg-white p-6 sm:p-8 rounded-3xl space-y-4"
          style={{ border: '1.5px solid rgba(255,107,157,0.1)', boxShadow: '0 4px 24px rgba(255,107,157,0.08)' }}
          onSubmit={e => e.preventDefault()}
        >
          <h2 className="text-2xl font-bold text-[#3D1C02] mb-2" style={{ fontFamily: 'Baloo 2, cursive' }}>
            Envoyez-nous un message
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <BomboInput label="Prénom" placeholder="Sophie" required />
            <BomboInput label="Nom" placeholder="Martin" required />
          </div>
          <BomboInput label="Email" type="email" placeholder="vous@email.fr" required />
          <BomboInput label="Sujet" placeholder="Ma commande, une allergie..." />
          <div>
            <label className="text-sm font-semibold text-[#3D1C02] block mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Dites-nous tout..."
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none bg-[#FFF8F0] border-[1.5px] border-[rgba(255,107,157,0.2)] focus:border-[#FF6B9D] focus:ring-2 focus:ring-pink-100"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#3D1C02' }}
            />
          </div>
          <BomboButton type="submit" fullWidth>
            <Send size={18} /> Envoyer
          </BomboButton>
          <p className="text-xs text-center text-[#8B6355] flex items-center justify-center gap-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Réponse sous 24h ouvrées · Ou utilisez le chat
            <MessageCircle size={14} className="text-[#FF6B9D]" />
          </p>
        </form>
      </div>
    </main>
  );
}
