import {
  ArrowRight,
  Cake,
  Home,
  ShoppingBag,
  Star,
  Rocket,
  Leaf,
  Handshake,
  Mail,
  Candy,
  Cookie,
  Lollipop,
  Users,
  Calendar,
  Heart,
  Lollipop as Lolli,
  BarChart3,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Page } from '../types';
import { TEAM_MEMBERS } from '../data';
import { IconBox, STAT_ICONS } from '../icons';

interface AboutProps {
  navigate: (page: Page) => void;
}

const TIMELINE: { year: string; icon: LucideIcon; title: string; text: string }[] = [
  { year: '2019', icon: Cake, title: 'Les débuts', text: "Sophie commence à fabriquer ses premières truffes dans sa cuisine parisienne et les partage avec ses amis et voisins. Le bouche-à-oreille fait le reste." },
  { year: '2020', icon: Home, title: "L'atelier", text: "Face à la demande croissante, Sophie loue son premier petit atelier dans le 3e arrondissement et recrute Lucas, son maître chocolatier." },
  { year: '2021', icon: ShoppingBag, title: 'La boutique en ligne', text: "Bombo.fr voit le jour. En un mois, les premières commandes arrivent de toute la France. Les coffrets cadeaux deviennent un succès immédiat." },
  { year: '2022', icon: Star, title: 'Le programme fidélité', text: "Lancement du programme de points Bombo pour remercier nos clients fidèles. Plus de 500 membres rejoignent le programme le premier mois." },
  { year: '2025', icon: Rocket, title: "Aujourd'hui", text: "Bombo, c'est 4 artisans passionnés, plus de 800 clients fidèles et de nouvelles créations chaque semaine. L'aventure ne fait que commencer !" },
];

const VALUES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Leaf, title: 'Fait maison', text: "Chaque produit est fabriqué à la main dans notre atelier parisien, sans colorants ni arômes artificiels. La qualité artisanale n'est pas un argument marketing, c'est notre engagement." },
  { icon: Handshake, title: 'Transparence totale', text: "Nous indiquons tous nos ingrédients, leurs origines et les allergènes potentiels. Parce que vous méritez de savoir exactement ce que vous mangez." },
  { icon: Mail, title: 'Livré avec soin', text: "Chaque commande est emballée avec attention : papier de soie, étiquette personnalisée et petit mot de l'équipe. Parce que le plaisir commence à l'ouverture du colis." },
];

const STATS = [
  { value: '5 000+', label: 'Produits vendus', icon: STAT_ICONS.products },
  { value: '4,9/5', label: 'Satisfaction', icon: STAT_ICONS.rating },
  { value: '1 200', label: 'Commandes', icon: STAT_ICONS.orders },
  { value: '800', label: 'Clients fidèles', icon: STAT_ICONS.clients },
];

const HERO_DECOR = [
  { icon: Candy, className: 'absolute top-10 left-10', size: 48 },
  { icon: Cookie, className: 'absolute top-20 right-20', size: 40 },
  { icon: Lollipop, className: 'absolute bottom-10 left-1/4', size: 36 },
  { icon: Cake, className: 'absolute bottom-8 right-10', size: 48 },
];

export default function About({ navigate }: AboutProps) {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <section
        className="relative py-24 px-4 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #A855F7 100%)' }}
      >
        <div className="absolute inset-0 opacity-20">
          {HERO_DECOR.map(({ icon: Icon, className, size }) => (
            <div key={className} className={className}>
              <Icon size={size} className="text-white" strokeWidth={1.5} />
            </div>
          ))}
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3 flex-wrap"
            style={{ fontFamily: 'Baloo 2, cursive' }}
          >
            L'histoire derrière chaque bonbon
            <Heart size={32} className="text-[#FFD93D] fill-[#FFD93D]" />
          </h1>
          <p className="text-white/85 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Bombo, c'est une histoire de passion, d'artisanat et de partage. Découvrez comment une cuisine burkinabe est devenue votre boutique préférée.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FFF8F0" /></svg>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden" style={{ height: '320px', background: '#f5e6d3' }}>
          <img
            src="https://images.unsplash.com/photo-1596350351182-c2ce5b74a758?w=1200&h=400&fit=crop&auto=format"
            alt="L'atelier Bombo"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl font-bold text-[#3D1C02] mb-12 text-center flex items-center justify-center gap-2"
            style={{ fontFamily: 'Baloo 2, cursive' }}
          >
            <Calendar size={28} className="text-[#FF6B9D]" />
            Notre aventure en dates
          </h2>

          <div className="relative">
            <div className="absolute left-[28px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF6B9D] to-[#A855F7] opacity-30" />
            <div className="flex flex-col gap-10">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div
                      className="bg-white rounded-3xl p-5 inline-block w-full"
                      style={{ boxShadow: '0 4px 20px rgba(255,107,157,0.08)', border: '1.5px solid rgba(255,107,157,0.1)' }}
                    >
                      <div className="text-xs font-bold text-[#FF6B9D] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {item.year}
                      </div>
                      <h3 className="font-bold text-[#3D1C02] mb-1 flex items-center gap-2 sm:justify-end" style={{ fontFamily: 'Baloo 2, cursive' }}>
                        <IconBox icon={item.icon} size={20} color="#FF6B9D" />
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#8B6355] leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-[28px] sm:left-1/2 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 border-[#FF6B9D] z-10" />
                  <div className="hidden sm:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl font-bold text-[#3D1C02] mb-10 text-center flex items-center justify-center gap-2"
            style={{ fontFamily: 'Baloo 2, cursive' }}
          >
            <Heart size={28} className="text-[#FF6B9D] fill-[#FF6B9D]" />
            Ce qui nous anime
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(v => (
              <div
                key={v.title}
                className="p-7 rounded-3xl text-center"
                style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.05), rgba(168,85,247,0.05))', border: '1.5px solid rgba(255,107,157,0.1)' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.15), rgba(168,85,247,0.15))' }}
                >
                  <IconBox icon={v.icon} size={32} color="#FF6B9D" />
                </div>
                <h3 className="font-bold text-[#3D1C02] mb-3 text-lg" style={{ fontFamily: 'Baloo 2, cursive' }}>
                  {v.title}
                </h3>
                <p className="text-sm text-[#8B6355] leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl font-bold text-[#3D1C02] mb-3 text-center flex items-center justify-center gap-2"
            style={{ fontFamily: 'Baloo 2, cursive' }}
          >
            <Users size={28} className="text-[#FF6B9D]" />
            Les visages derrière Bombo
          </h2>
          <p className="text-center text-[#8B6355] mb-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Une équipe de 4 passionnés qui mettent leur cœur dans chaque friandise
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map(member => (
              <div
                key={member.id}
                className="bg-white rounded-3xl p-6 text-center"
                style={{ boxShadow: '0 4px 20px rgba(255,107,157,0.08)', border: '1.5px solid rgba(255,107,157,0.1)' }}
              >
                <div className="relative inline-block mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-[#FF6B9D]/20"
                  />
                  <div
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #FFD93D, #FF6B9D)' }}
                  >
                    <Candy size={14} className="text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-[#3D1C02] mb-0.5" style={{ fontFamily: 'Baloo 2, cursive' }}>
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-[#FF6B9D] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {member.role}
                </p>
                <p className="text-xs text-[#8B6355] leading-relaxed italic" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {member.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #A855F7 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-2"
            style={{ fontFamily: 'Baloo 2, cursive' }}
          >
            <BarChart3 size={28} />
            Bombo en chiffres
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {STATS.map(stat => (
              <div key={stat.label} className="text-white">
                <div className="flex justify-center mb-2">
                  <IconBox icon={stat.icon} size={36} color="#fff" />
                </div>
                <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'Baloo 2, cursive' }}>
                  {stat.value}
                </div>
                <div className="text-sm opacity-80" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center bg-white">
        <h2
          className="text-3xl font-bold text-[#3D1C02] mb-4 flex items-center justify-center gap-2"
          style={{ fontFamily: 'Baloo 2, cursive' }}
        >
          Prêt à vous faire plaisir ?
          <Lolli size={32} className="text-[#FF6B9D]" />
        </h2>
        <p className="text-[#8B6355] mb-8 max-w-md mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Découvrez nos créations artisanales et trouvez votre nouvelle friandise préférée.
        </p>
        <button
          onClick={() => navigate('products')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)', fontFamily: 'Baloo 2, cursive', fontSize: '1.05rem' }}
        >
          Découvrir nos produits <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
