
import React, { useState } from 'react';
import { Button } from '../components/Shared';
import { User, Lock, Bus } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Simular delay de autenticação
    setTimeout(() => {
      setIsLoggingIn(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="flex flex-col px-8 pt-12 pb-10 bg-white animate-fade-in">
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 bg-accent-500 rounded-2xl flex items-center justify-center shadow-lg shadow-accent-500/20 mb-4">
          <Bus size={32} className="text-brand-900" />
        </div>
        <h1 className="text-3xl font-extrabold text-brand-900 tracking-tight font-brand">Mobi Facil</h1>
        <p className="text-gray-500 mt-1 font-medium text-sm">Sua mobilidade sem complicação</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-900 ml-1">CPF</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-600" size={18} />
            <input 
              type="text" 
              placeholder="000.000.000-00"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-accent-500 focus:bg-white rounded-2xl py-3 pl-12 pr-4 outline-none transition-all text-gray-800 text-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-900 ml-1">Senha</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-600" size={18} />
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-accent-500 focus:bg-white rounded-2xl py-3 pl-12 pr-4 outline-none transition-all text-gray-800 text-sm"
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          fullWidth 
          isLoading={isLoggingIn}
          className="mt-4"
        >
          Entrar
        </Button>
      </form>

      <div className="mt-8 space-y-3 text-center">
        <button className="text-[10px] font-semibold text-accent-600 hover:text-brand-900 transition-colors">
          Esqueceu sua senha?
        </button>
        <p className="text-[10px] text-gray-400">
          Não tem uma conta? <button className="text-brand-500 font-bold hover:underline">Cadastre-se agora</button>
        </p>
      </div>
    </div>
  );
};