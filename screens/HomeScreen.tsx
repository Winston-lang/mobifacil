
import React from 'react';
import { BusCard, Transaction, User, ServiceStatus } from '../types';
import { CardVisual, Header, Button } from '../components/Shared';
import { ArrowRight, History, AlertCircle, ChevronRight, Activity, ShieldCheck } from 'lucide-react';

interface HomeScreenProps {
  user: User;
  primaryCard: BusCard;
  recentTransactions: Transaction[];
  onNavigate: (tab: any) => void;
}

const MOCK_STATUS: ServiceStatus[] = [
  { line: 'Circular 201', status: 'normal', updatedAt: 'Agora' },
  { line: 'Express 05', status: 'lento', updatedAt: '5 min' },
  { line: 'Norte/Sul', status: 'normal', updatedAt: '10 min' },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ user, primaryCard, recentTransactions, onNavigate }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Greeting Header */}
      <div className="flex justify-between items-center pt-2">
        <div>
          <p className="text-gray-500 text-sm font-medium">{getGreeting()},</p>
          <h2 className="text-3xl font-bold text-brand-900 font-brand">{user.name.split(' ')[0]}!</h2>
        </div>
        <div 
          onClick={() => onNavigate('profile')}
          className="w-12 h-12 rounded-2xl bg-white p-1 shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden cursor-pointer active:scale-90 transition-transform"
        >
          <img src={user.photoUrl} alt="User" className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Card & Actions */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-brand-900">Cartão Principal</h3>
              <button 
                onClick={() => onNavigate('cards')} 
                className="text-brand-500 text-sm font-bold hover:underline"
              >
                Ver todos
              </button>
            </div>
            <CardVisual card={primaryCard} onClick={() => onNavigate('recharge')} />
          </div>

          <div className="w-full">
            <button 
              onClick={() => onNavigate('recharge')}
              className="w-full bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between gap-4 active:scale-95 transition-all hover:shadow-md hover:border-accent-500/30 group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-accent-500 text-brand-900 p-4 rounded-2xl group-hover:rotate-12 transition-transform">
                  <ArrowRight size={24} />
                </div>
                <div className="text-left">
                  <span className="font-bold text-brand-900 text-lg block leading-none">Recarregar</span>
                  <span className="text-gray-400 text-xs font-medium mt-1 block">Saldo imediato via Pix</span>
                </div>
              </div>
              <div className="pr-2 text-gray-300 group-hover:text-accent-500 transition-colors">
                <ChevronRight size={20} />
              </div>
            </button>
          </div>

          {/* Status das Linhas */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-brand-900 flex items-center gap-2">
                   <Activity size={18} className="text-accent-600" />
                   Status das Linhas
                </h3>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Ao vivo</span>
             </div>
             <div className="space-y-3">
                {MOCK_STATUS.map((s, i) => (
                   <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 font-medium">{s.line}</span>
                      <div className="flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full ${s.status === 'normal' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                         <span className={`font-bold capitalize ${s.status === 'normal' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {s.status}
                         </span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Activity & Traffic Warden Tip */}
        <div className="space-y-6">
          <div className="bg-brand-500 text-white p-6 rounded-[2.5rem] relative overflow-hidden shadow-lg shadow-brand-500/20">
            <div className="relative z-10 flex gap-4 items-start">
              <div className="bg-white/20 p-3 rounded-2xl">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 className="font-bold text-lg leading-tight mb-1">Dica do Guarda de Trânsito</h4>
                <p className="text-sm text-white/80 leading-relaxed">
                  "Use sempre a faixa de pedestres ao desembarcar. Segurança no trânsito é responsabilidade de todos!"
                </p>
              </div>
            </div>
            {/* Decorative Icon */}
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
               <AlertCircle size={120} />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-brand-900 mb-4 px-1">Atividade Recente</h3>
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              {recentTransactions.length > 0 ? (
                recentTransactions.slice(0, 3).map((t, idx) => (
                  <div key={t.id} className={`flex justify-between items-center p-5 ${idx !== 2 ? 'border-b border-gray-50' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="bg-brand-50 p-3 rounded-xl text-brand-500">
                        <History size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-brand-900 text-sm">{t.description}</p>
                        <p className="text-[11px] text-gray-400 font-medium">{new Date(t.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <span className={`font-bold text-sm ${t.amount > 0 ? 'text-green-600' : 'text-brand-900'}`}>
                      {t.amount > 0 ? '+' : ''} R$ {Math.abs(t.amount).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm font-medium">
                  Nenhuma atividade recente.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
