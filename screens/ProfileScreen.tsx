
import React from 'react';
import { User } from '../types';
import { Header } from '../components/Shared';
import { Settings, Bell, HelpCircle, LogOut, ChevronRight, Shield } from 'lucide-react';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout }) => {
  const menuItems = [
    { icon: Bell, label: 'Notificações', badge: '2' },
    { icon: Shield, label: 'Segurança e Privacidade' },
    { icon: Settings, label: 'Configurações do App' },
    { icon: HelpCircle, label: 'Ajuda e Suporte' },
  ];

  return (
    <div className="pb-24 animate-fade-in">
      <Header title="Perfil" />

      {/* User Info Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-50">
          <img src={user.photoUrl} alt="User" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Menu Options */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button 
              key={index}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="text-gray-400">
                  <Icon size={20} />
                </div>
                <span className="text-gray-700 font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Version & Logout */}
      <div className="mt-8 text-center space-y-4">
        <button 
          onClick={onLogout}
          className="text-red-500 font-medium flex items-center justify-center gap-2 w-full py-2 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          Sair da conta
        </button>
        <p className="text-xs text-gray-400">Versão 2.4.0 (Build 1024)</p>
      </div>
    </div>
  );
};
