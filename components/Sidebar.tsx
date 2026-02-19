
import React from 'react';
import { Home, CreditCard, PlusCircle, User, LogOut, Bus } from 'lucide-react';
import { Tab, User as UserType } from '../types';

interface SidebarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  onLogout: () => void;
  user: UserType;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange, onLogout, user }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'cards', icon: CreditCard, label: 'Meus Cartões' },
    { id: 'recharge', icon: PlusCircle, label: 'Recarga' },
    { id: 'profile', icon: User, label: 'Meu Perfil' },
  ] as const;

  return (
    <div className="w-72 h-full min-h-screen flex flex-col p-8 text-white">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="bg-white/20 p-2 rounded-xl">
          <Bus size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold font-brand tracking-tight">Mobi Facil</h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white text-accent-500 shadow-xl scale-105' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="mt-auto pt-8 border-t border-white/10 space-y-6">
        <div className="flex items-center gap-3 px-2">
          <img src={user.photoUrl} alt="User" className="w-10 h-10 rounded-full border-2 border-white/20" />
          <div className="overflow-hidden">
            <p className="font-bold text-sm truncate">{user.name}</p>
            <p className="text-[10px] text-white/50 truncate">{user.email}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-white/70 hover:text-white hover:bg-red-500/20 transition-all"
        >
          <LogOut size={22} />
          <span className="font-bold text-sm">Sair da conta</span>
        </button>
      </div>
    </div>
  );
};
