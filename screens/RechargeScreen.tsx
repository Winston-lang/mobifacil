
import React, { useState } from 'react';
import { BusCard, Transaction } from '../types';
import { Header, Button, CardVisual } from '../components/Shared';
import { CheckCircle2, ChevronDown, CreditCard, Banknote, Landmark } from 'lucide-react';

interface RechargeScreenProps {
  cards: BusCard[];
  onRecharge: (amount: number, cardId: string) => void;
  history: Transaction[];
}

export const RechargeScreen: React.FC<RechargeScreenProps> = ({ cards, onRecharge, history }) => {
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || '');
  const [amount, setAmount] = useState<number | null>(null);
  const [isCustom, setIsCustom] = useState(false);
  const [step, setStep] = useState<'selection' | 'success'>('selection');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  const amounts = [10, 20, 50, 100];

  const handleRecharge = () => {
    if (!amount || amount <= 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      onRecharge(amount, selectedCardId);
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in text-center px-6">
        <div className="relative mb-8">
           <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 animate-pulse"></div>
           <div className="w-24 h-24 bg-green-100 rounded-[2.5rem] flex items-center justify-center text-green-600 relative z-10">
             <CheckCircle2 size={48} />
           </div>
        </div>
        <h2 className="text-3xl font-extrabold text-brand-900 mb-2 font-brand">Pagamento Confirmado!</h2>
        <p className="text-gray-500 mb-10 max-w-xs mx-auto">
          O valor de <span className="font-bold text-brand-900">R$ {amount?.toFixed(2).replace('.', ',')}</span> foi enviado para o cartão <span className="font-medium text-brand-500">{selectedCard.name}</span>.
        </p>
        
        <div className="w-full max-w-xs space-y-3">
           <Button fullWidth onClick={() => {
               setStep('selection');
               setAmount(null);
               setIsCustom(false);
           }}>
             Nova Recarga
           </Button>
           <Button variant="ghost" fullWidth onClick={() => window.location.reload()}>
             Voltar ao Início
           </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 animate-fade-in">
      <Header title="Recarga" subtitle="Escolha o valor e o cartão" />

      {/* Card Selector */}
      <div className="mb-8">
        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Cartão de Destino</label>
        <div className="relative mb-4">
          <select 
            value={selectedCardId}
            onChange={(e) => setSelectedCardId(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-100 rounded-2xl py-4 px-5 pr-12 text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent-500 font-bold shadow-sm"
          >
            {cards.map(c => (
              <option key={c.id} value={c.id}>{c.name} •••• {c.number.slice(-4)}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-400">
            <ChevronDown size={20} />
          </div>
        </div>
        
        {selectedCard && (
          <div className="transform scale-[0.98] origin-top transition-transform">
             <CardVisual card={selectedCard} compact />
          </div>
        )}
      </div>

      {/* Amount Selection */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 ml-1">
          <label className="text-xs font-bold text-gray-400 uppercase">Selecione o Valor</label>
          <button 
            onClick={() => {
              setIsCustom(!isCustom);
              setAmount(null);
            }} 
            className="text-xs font-bold text-brand-500 hover:underline"
          >
            {isCustom ? 'Sugestões' : 'Valor manual'}
          </button>
        </div>

        {isCustom ? (
           <div className="relative animate-fade-in">
             <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">R$</span>
             <input 
              autoFocus
              type="number" 
              placeholder="0,00"
              className="w-full bg-white border-2 border-brand-50 focus:border-accent-500 rounded-3xl py-6 pl-14 pr-6 text-3xl font-bold text-brand-900 outline-none shadow-sm"
              onChange={(e) => setAmount(Number(e.target.value))}
             />
           </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {amounts.map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`py-5 rounded-2xl border-2 font-bold text-xl transition-all duration-200 relative overflow-hidden ${
                  amount === val 
                    ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md' 
                    : 'border-white bg-white text-gray-600 hover:border-gray-100 shadow-sm'
                }`}
              >
                R$ {val},00
                {val === 50 && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-green-500 text-white text-[8px] font-black px-3 py-1 uppercase tracking-tighter rotate-12 translate-x-2 -translate-y-1">
                      Ideal
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Payment Method Selector */}
      <div className="mb-8">
         <label className="block text-xs font-bold text-gray-400 uppercase mb-4 ml-1">Forma de Pagamento</label>
         <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-brand-900 text-white shadow-lg shadow-brand-900/10">
                <Banknote size={24} />
                <span className="text-[10px] font-bold uppercase">Pix</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-gray-100 text-gray-500">
                <CreditCard size={24} />
                <span className="text-[10px] font-bold uppercase">Cartão</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-gray-100 text-gray-500">
                <Landmark size={24} />
                <span className="text-[10px] font-bold uppercase">Banco</span>
            </button>
         </div>
      </div>

      <Button 
        fullWidth 
        disabled={!amount || amount <= 0} 
        onClick={handleRecharge}
        isLoading={isProcessing}
        className="h-16 text-lg"
      >
        {amount ? `Pagar R$ ${amount.toFixed(2).replace('.', ',')}` : 'Digite um valor'}
      </Button>

      {/* Trust Badge */}
      <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
         <Landmark size={14} />
         <span className="text-[10px] font-bold uppercase tracking-widest">Pagamento 100% Seguro</span>
      </div>
    </div>
  );
};
