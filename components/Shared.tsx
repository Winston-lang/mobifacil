
import React from 'react';
import { BusCard } from '../types';
import { CreditCard, Wifi } from 'lucide-react';

// --- Header Component ---
interface HeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, rightAction }) => (
  <div className="flex justify-between items-center mb-6 pt-2">
    <div>
      <h1 className="text-2xl font-bold text-brand-900 tracking-tight font-brand">{title}</h1>
      {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
    </div>
    {rightAction && <div>{rightAction}</div>}
  </div>
);

// --- Bus Card Component (Visual) ---
interface CardVisualProps {
  card: BusCard;
  onClick?: () => void;
  compact?: boolean;
}

export const CardVisual: React.FC<CardVisualProps> = ({ card, onClick, compact = false }) => {
  const getGradient = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-gradient-to-br from-brand-500 to-brand-700';
      case 'purple': return 'bg-gradient-to-br from-indigo-600 to-indigo-900';
      case 'green': return 'bg-gradient-to-br from-emerald-600 to-emerald-900';
      case 'orange': return 'bg-gradient-to-br from-accent-500 to-accent-600';
      default: return 'bg-gradient-to-br from-brand-600 to-brand-900';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`relative rounded-3xl p-6 text-white shadow-xl transform transition-transform duration-200 ${onClick ? 'active:scale-95 cursor-pointer' : ''} ${getGradient(card.color)} ${compact ? 'h-40' : 'h-48'}`}
    >
      <div className="flex justify-between items-start">
        <Wifi className="opacity-70 rotate-90" size={24} />
        <span className="font-bold tracking-widest text-xs opacity-90 uppercase bg-white/20 px-2 py-1 rounded-lg">{card.type}</span>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase font-bold opacity-75 mb-1 tracking-wider">Saldo Atual</p>
            <p className="text-3xl font-bold">R$ {card.balance.toFixed(2).replace('.', ',')}</p>
          </div>
          <div className="text-right">
             <p className="text-sm font-mono opacity-80 tracking-wider">•••• {card.number.slice(-4)}</p>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
    </div>
  );
};

// --- Action Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'brand' | 'outline' | 'ghost';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  isLoading = false,
  icon,
  className = '',
  ...props 
}) => {
  const baseStyle = "flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent-500 text-brand-900 hover:bg-accent-600 shadow-lg shadow-accent-500/30",
    brand: "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20",
    outline: "border-2 border-accent-500 text-accent-600 hover:bg-accent-50",
    ghost: "text-accent-600 bg-accent-50 hover:bg-accent-100",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-brand-900 border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
};
