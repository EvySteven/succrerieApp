import { Instagram, Facebook, Twitter, Youtube, /*tiktok,*/ Mail, Phone, MapPin } from 'lucide-react';
import { Candy } from '../icons';
import logo from '../../imports/Bombô.jpeg';
import type { Page } from '../types';

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="text-[#FFF8F0]" style={{ background: '#3D1C02' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="mb-3">
              <img src={logo} alt="Bômbô" className="w-40 h-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Friandises artisanales faites avec passion, livrées avec amour depuis Ouaga
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Facebook, Twitter, Youtube, /*tiktok*/].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'rgba(255,107,157,0.15)' }}
                >
                  <Icon size={16} className="text-[#FF6B9D]" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-bold mb-4 text-[#FFD93D]"
              style={{ fontFamily: 'Baloo 2, cursive' }}
            >
              Liens rapides
            </h4>
            <ul className="space-y-2 text-sm opacity-75" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {[
                { label: 'Accueil', page: 'home' as Page },
                { label: 'Nos produits', page: 'products' as Page },
                { label: 'À propos', page: 'about' as Page },
                { label: 'Contact', page: 'contact' as Page },
                { label: 'Mon panier', page: 'cart' as Page },
                { label: 'Mon compte', page: 'profile' as Page },
              ].map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="hover:text-[#FF6B9D] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold mb-4 text-[#FFD93D]"
              style={{ fontFamily: 'Baloo 2, cursive' }}
            >
              Contact
            </h4>
            <ul className="space-y-3 text-sm opacity-75" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#FF6B9D]" />
                <a
                  href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwiI5ZqAwsyUAxUAAAAAHQAAAAAQQg..i&sca_esv=525e608177515078&pvq=OhYweDA6MHhkNzczOTU5YjU5YTNlMDRk&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=bf&sa=X&ftid=0xe2ebf2e1ad1878d:0xd773959b59a3e04d"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF6B9D] underline decoration-pink-200"
                >
                  Voir notre boutique Bômbô sur Google Maps
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-[#FF6B9D]" />
                <span>01 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0 text-[#FF6B9D]" />
                <span>bonjour@bombo.fr</span>
              </li>
              <li className="mt-2 text-xs opacity-60">
                Lun–Ven : 9h–18h | Sam : 10h–16h
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="font-bold mb-4 text-[#FFD93D]"
              style={{ fontFamily: 'Baloo 2, cursive' }}
            >
              Newsletter Bômbô
            </h4>
            <p className="text-sm opacity-70 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Recevez nos offres exclusives et nouvelles créations en avant-première.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 px-3 py-2 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-[#FF6B9D]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
              <button
                className="px-3 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: '#FF6B9D' }}
              >
                OK
              </button>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-50"
          style={{ borderColor: 'rgba(255,255,255,0.1)', fontFamily: 'Poppins, sans-serif' }}
        >
          <span>© 2026 Bômbô — Tous droits réservés</span>
          <div className="flex gap-4">
            <button className="hover:opacity-100">Mentions légales</button>
            <button className="hover:opacity-100">CGV</button>
            <button className="hover:opacity-100">Confidentialité</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
