import { useState } from 'react';
import Manager from './Manager';
import {
  LayoutDashboard,
  Package,
  Users,
  Star,
  MessageSquare,
  Settings,
  TrendingUp,
  ShoppingBag,
  UserPlus,
  X,
  Edit2,
  Trash2,
  DollarSign,
  User,
  LineChart,
  Trophy,
  ClipboardList,
  Eye,
  Mail,
  Construction,
  Candy,
  MessageCircle,
  Camera,
  Check,
  ImageIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import type { Page } from '../types';
import { PRODUCTS, CUSTOMERS, SALES_DATA } from '../data';
import { formatPrice } from '../utils/currency';

interface AdminProps {
  navigate: (page: Page) => void;
}

type AdminSection = 'dashboard' | 'produits' | 'commandes' | 'clients' | 'fidelite' | 'chat' | 'parametres';

const MENU: { key: AdminSection; label: string; Icon: React.ElementType }[] = [
  { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { key: 'produits', label: 'Produits', Icon: Package },
  { key: 'commandes', label: 'Commandes', Icon: ShoppingBag },
  { key: 'clients', label: 'Clients', Icon: Users },
  { key: 'fidelite', label: 'Fidélité', Icon: Star },
  { key: 'chat', label: 'Chat', Icon: MessageSquare },
  { key: 'parametres', label: 'Paramètres', Icon: Settings },
];

const KPI_CARDS: { label: string; value: string; change: string; icon: LucideIcon; color: string }[] = [
  { label: "Revenus du jour", value: formatPrice(813000), change: "+18%", icon: DollarSign, color: "#FF6B9D" },
  { label: "Commandes en cours", value: "12", change: "+5", icon: Package, color: "#A855F7" },
  { label: "Nouveaux clients", value: "8", change: "+3", icon: User, color: "#4ADE80" },
  { label: "Points distribués", value: "3 240", change: "+12%", icon: Star, color: "#FFD93D" },
];

const RECENT_ORDERS = [
  { id: '#BOM-2471', customer: 'Marie D.', amount: 25200, status: 'En cours', date: '14 mai' },
  { id: '#BOM-2470', customer: 'Lucas M.', amount: 15000, status: 'Livré', date: '14 mai' },
  { id: '#BOM-2469', customer: 'Emma L.', amount: 58400, status: 'Préparation', date: '13 mai' },
  { id: '#BOM-2468', customer: 'Thomas P.', amount: 8450, status: 'Livré', date: '13 mai' },
  { id: '#BOM-2467', customer: 'Chloé R.', amount: 29500, status: 'Annulé', date: '12 mai' },
];

const STATUS_COLORS = {
  'En cours': { bg: 'rgba(255,107,157,0.1)', color: '#FF6B9D' },
  'Livré': { bg: 'rgba(74,222,128,0.1)', color: '#16a34a' },
  'Préparation': { bg: 'rgba(255,217,61,0.15)', color: '#ca8a04' },
  'Annulé': { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
};

const LEVEL_COLORS = {
  'Caramel': '#D4A017',
  'Sucre': '#FF6B9D',
  'Chocolat': '#6B3A2A',
  'VIP': '#A855F7',
};
const waitingCount = 3; // remplacez par un fetch vers votre API si disponible
export default function Admin({ navigate }: AdminProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof PRODUCTS[0] | null>(null);

  const Dashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Baloo 2, cursive' }}>
        Dashboard Admin
      </h2>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map(kpi => (
          <div
            key={kpi.label}
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <kpi.icon size={28} style={{ color: kpi.color }} />
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80', fontFamily: 'Poppins, sans-serif' }}
              >
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Baloo 2, cursive' }}>
              {kpi.value}
            </div>
            <div className="text-xs opacity-60 mt-1 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {kpi.label}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 className="font-bold text-white mb-5 text-lg" style={{ fontFamily: 'Baloo 2, cursive' }}>
          <span className="inline-flex items-center gap-2">
            <LineChart size={20} className="text-[#4ADE80]" />
            Ventes — 7 derniers jours
          </span>
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <RechartsLineChart data={SALES_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#1a0a2e', border: '1px solid rgba(255,107,157,0.3)', borderRadius: '12px', color: '#fff' }}
              labelStyle={{ color: '#FF6B9D', fontFamily: 'Baloo 2, cursive' }}
              formatter={(value: number, name: string) =>
                name === 'ventes' ? [formatPrice(value), 'Ventes'] : [value, 'Commandes']
              }
            />
            <Line type="monotone" dataKey="ventes" stroke="#FF6B9D" strokeWidth={3} dot={{ fill: '#FF6B9D', r: 4 }} />
            <Line type="monotone" dataKey="commandes" stroke="#FFD93D" strokeWidth={2} dot={{ fill: '#FFD93D', r: 3 }} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top customers */}
        <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 className="font-bold text-white mb-4" style={{ fontFamily: 'Baloo 2, cursive' }}>
            <span className="inline-flex items-center gap-2">
              <Trophy size={20} className="text-[#FFD93D]" />
              Clients fréquents
            </span>
          </h3>
          <div className="flex flex-col gap-3">
            {CUSTOMERS.slice(0, 5).map((c, i) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-white/30 w-5" style={{ fontFamily: 'Baloo 2, cursive' }}>
                  {i + 1}
                </span>
                <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {c.name}
                  </div>
                  <div className="text-xs opacity-50 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {c.orders} cmd · {c.points} pts
                  </div>
                </div>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.1)', color: LEVEL_COLORS[c.level] }}
                >
                  {c.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 className="font-bold text-white mb-4" style={{ fontFamily: 'Baloo 2, cursive' }}>
            <span className="inline-flex items-center gap-2">
              <ClipboardList size={20} className="text-[#FF6B9D]" />
              Commandes récentes
            </span>
          </h3>
          <div className="flex flex-col gap-3">
            {RECENT_ORDERS.map(order => (
              <div key={order.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white" style={{ fontFamily: 'Baloo 2, cursive' }}>
                    {order.id}
                  </div>
                  <div className="text-xs opacity-50 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {order.customer} · {order.date}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]?.bg, color: STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]?.color }}
                  >
                    {order.status}
                  </span>
                  <span className="text-sm font-bold text-white/80" style={{ fontFamily: 'Baloo 2, cursive' }}>
                    {formatPrice(order.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsSection = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Baloo 2, cursive' }}>
          Produits
        </h2>
        <button
          onClick={() => { setEditingProduct(null); setDrawerOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm text-white"
          style={{ background: '#FF6B9D', fontFamily: 'Poppins, sans-serif' }}
        >
          + Ajouter un produit
        </button>
      </div>

      <div className="rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {['Photo', 'Nom', 'Catégorie', 'Prix', 'Stock', 'Statut', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.slice(0, 8).map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td className="px-4 py-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-xl object-cover bg-white/10" />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-white/50 capitalize" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-[#FF6B9D]" style={{ fontFamily: 'Baloo 2, cursive' }}>
                      {formatPrice(product.price)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-white/70" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <span className="inline-flex items-center gap-1">
                        {product.inStock ? <Check size={12} /> : <X size={12} />}
                        {product.inStock ? 'En stock' : 'Épuisé'}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: product.inStock ? 'rgba(74,222,128,0.15)' : 'rgba(239,68,68,0.15)',
                        color: product.inStock ? '#4ADE80' : '#ef4444',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      {product.inStock ? 'Actif' : 'Archivé'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditingProduct(product); setDrawerOpen(true); }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-[#FFD93D] transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ClientsSection = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Baloo 2, cursive' }}>
        Clients
      </h2>
      <div className="rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {['Client', 'Email', 'Commandes', 'Points', 'Niveau', 'Dernière commande', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-white/50 uppercase"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map(c => (
                <tr
                  key={c.id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', opacity: c.inactive ? 0.6 : 1 }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {c.name}
                        </div>
                        {c.inactive && (
                          <div className="text-[10px] font-bold text-red-400">Inactif 60j+</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-white/50" style={{ fontFamily: 'Poppins, sans-serif' }}>{c.email}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{c.orders}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-[#FFD93D]" style={{ fontFamily: 'Baloo 2, cursive' }}>{c.points}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.08)', color: LEVEL_COLORS[c.level] }}
                    >
                      {c.level}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-white/50" style={{ fontFamily: 'Poppins, sans-serif' }}>{c.lastOrder}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 transition-colors" aria-label="Voir"><Eye size={14} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-[#FFD93D] transition-colors" aria-label="Contacter"><Mail size={14} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-[#4ADE80] transition-colors" aria-label="Points"><Star size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'produits': return <ProductsSection />;
      case 'clients': return <ClientsSection />;
      case 'chat': return <Manager navigate={navigate} />;
      default: return (
        <div className="text-center py-20">
          <Construction size={56} className="text-white/30 mb-4 mx-auto" />
          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Baloo 2, cursive' }}>
            Section en développement
          </h3>
          <p className="text-white/50" style={{ fontFamily: 'Poppins, sans-serif' }}>Bientôt disponible.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#1a0a2e' }}>
      {/* Sidebar */}
      <aside
        className="w-64 shrink-0 flex flex-col sticky top-0 h-screen"
        style={{ background: '#3D1C02', borderRight: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="p-5 border-b border-white/10">
          <div className="text-2xl font-bold text-[#FF6B9D]" style={{ fontFamily: 'Pacifico, cursive' }}>
            <span className="inline-flex items-center gap-2">
              Bombo
              <Candy size={22} className="text-[#FF6B9D]" />
            </span>
          </div>
          <div className="text-xs text-white/40 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Espace Administrateur
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {MENU.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all text-left"
              style={{
                background: activeSection === key ? 'rgba(255,107,157,0.15)' : 'transparent',
                color: activeSection === key ? '#FF6B9D' : 'rgba(255,248,240,0.6)',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              <Icon size={16} />
              {label}
              {key === 'chat' && (
                <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {waitingCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => navigate('profile')}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-2xl text-sm font-semibold text-white/60 hover:bg-white/5 transition-colors"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            ← Retour au site
          </button>
          <button
            onClick={() => navigate('manager')}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-2xl text-sm font-semibold text-[#FFD93D] hover:bg-white/5 transition-colors mt-1"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="inline-flex items-center gap-2">
              <MessageCircle size={16} />
              Espace Gérant
            </span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto min-w-0">
        {renderSection()}
      </main>

      {/* Product Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="w-96 h-full overflow-y-auto p-6 flex flex-col"
            style={{ background: '#2a1040', borderLeft: '1px solid rgba(255,107,157,0.2)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'Baloo 2, cursive' }}>
                {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
              </h3>
              <button onClick={() => setDrawerOpen(false)} className="text-white/60 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {['Nom', 'Description', 'Prix', 'Stock', 'Catégorie', 'Allergènes'].map(field => (
                <div key={field}>
                  <label className="text-sm font-semibold text-white/70 block mb-1.5"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>{field}</label>
                  {field === 'Description' ? (
                    <textarea
                      rows={3}
                      defaultValue={editingProduct?.description || ''}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,107,157,0.2)', color: '#fff', fontFamily: 'Poppins, sans-serif' }}
                    />
                  ) : field === 'Catégorie' ? (
                    <select
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,107,157,0.2)', color: '#fff', fontFamily: 'Poppins, sans-serif' }}
                    >
                      {['chocolats', 'bonbons', 'sucettes', 'gateaux', 'coffrets'].map(c => (
                        <option key={c} value={c} style={{ background: '#2a1040' }}>{c}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field === 'Prix' || field === 'Stock' ? 'number' : 'text'}
                      defaultValue={
                        field === 'Nom' ? editingProduct?.name :
                        field === 'Prix' ? editingProduct?.price :
                        ''
                      }
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,107,157,0.2)', color: '#fff', fontFamily: 'Poppins, sans-serif' }}
                    />
                  )}
                </div>
              ))}
              <div>
                <label className="text-sm font-semibold text-white/70 block mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Photo du produit
                </label>
                <div
                  className="w-full h-28 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '2px dashed rgba(255,107,157,0.3)' }}
                >
                  <Camera size={28} className="text-white/40 mb-1 mx-auto" />
                  <span className="text-xs text-white/40" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Cliquer pour uploader
                  </span>
                </div>
              </div>
              <button
                className="mt-2 w-full py-3 rounded-2xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)', fontFamily: 'Baloo 2, cursive', fontSize: '1rem' }}
              >
                {editingProduct ? 'Enregistrer les modifications' : 'Créer le produit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
