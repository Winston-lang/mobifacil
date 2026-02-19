
import React from 'react';
import { Home, CreditCard, PlusCircle, User } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'cards', icon: CreditCard, label: 'Cartões' },
    { id: 'recharge', icon: PlusCircle, label: 'Recarga' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ] as const;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe pt-2 px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50">
      <div className="flex justify-between items-center pb-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${isActive ? 'text-brand-500 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-brand-50' : 'bg-transparent'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
