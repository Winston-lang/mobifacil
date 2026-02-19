
import React, { useState } from 'react';
import { BusCard } from '../types';
import { CardVisual, Header, Button } from '../components/Shared';
import { Plus, X, CreditCard } from 'lucide-react';

interface CardsScreenProps {
  cards: BusCard[];
  onAddCard: (card: Omit<BusCard, 'id'>) => void;
  onSelectCard: (cardId: string) => void;
}

export const CardsScreen: React.FC<CardsScreenProps> = ({ cards, onAddCard, onSelectCard }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCard, setNewCard] = useState({
    name: '',
    number: '',
    type: 'Comum' as const,
    color: 'blue' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCard({
      ...newCard,
      balance: 0,
    });
    setIsAdding(false);
    setNewCard({ name: '', number: '', type: 'Comum', color: 'blue' });
  };

  return (
    <div className="space-y-6 pb-24 md:pb-10 animate-fade-in relative">
      <Header 
        title="Meus Cartões" 
        subtitle={`${cards.length} cartões vinculados`}
        rightAction={
          <button 
            onClick={() => setIsAdding(true)} 
            className="p-3 bg-white shadow-sm border border-gray-100 rounded-2xl text-accent-500 hover:bg-brand-50 transition-colors"
          >
            <Plus size={24} />
          </button>
        }
      />

      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 bg-brand-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative animate-fade-in transform translate-y-0">
            <button 
              onClick={() => setIsAdding(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-brand-900"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-brand-900 mb-6 font-brand">Novo Cartão</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Apelido do Cartão</label>
                <input 
                  type="text" 
                  placeholder="Ex: Pessoal, Trabalho..."
                  value={newCard.name}
                  onChange={e => setNewCard({...newCard, name: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-accent-500 focus:bg-white rounded-2xl py-3 px-4 outline-none transition-all mt-1"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Número do Cartão</label>
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000"
                  value={newCard.number}
                  onChange={e => setNewCard({...newCard, number: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-accent-500 focus:bg-white rounded-2xl py-3 px-4 outline-none transition-all mt-1 font-mono"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Tipo</label>
                  <select 
                    value={newCard.type}
                    onChange={e => setNewCard({...newCard, type: e.target.value as any})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-accent-500 focus:bg-white rounded-2xl py-3 px-4 outline-none transition-all mt-1"
                  >
                    <option value="Comum">Comum</option>
                    <option value="Estudante">Estudante</option>
                    <option value="Vale-Transporte">VT</option>
                  </select>
                </div>
                <div>
                   <label className="text-xs font-bold text-gray-400 uppercase ml-1">Cor</label>
                   <div className="flex gap-2 mt-2">
                      {(['blue', 'purple', 'green', 'orange'] as const).map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setNewCard({...newCard, color})}
                          className={`w-8 h-8 rounded-full border-2 transition-transform ${newCard.color === color ? 'scale-125 border-brand-900' : 'border-transparent'} ${
                            color === 'blue' ? 'bg-brand-500' : 
                            color === 'purple' ? 'bg-indigo-600' :
                            color === 'green' ? 'bg-emerald-600' : 'bg-orange-500'
                          }`}
                        />
                      ))}
                   </div>
                </div>
              </div>
              <Button type="submit" fullWidth className="mt-4">Salvar Cartão</Button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card) => (
          <div key={card.id} className="relative group flex flex-col">
            <CardVisual card={card} onClick={() => onSelectCard(card.id)} />
            
            <div className="mt-4 flex justify-between items-center px-2">
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${card.type === 'Estudante' ? 'bg-orange-100 text-orange-700' : card.type === 'Vale-Transporte' ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-100 text-brand-700'}`}>
                {card.type}
              </span>
              <div className="flex gap-4 text-xs font-bold text-accent-500">
                <button onClick={() => onSelectCard(card.id)} className="hover:underline">Recarregar</button>
                <button onClick={() => onSelectCard(card.id)} className="hover:underline text-gray-400">Excluir</button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Placeholder for Add card in grid on desktop */}
        <button 
          onClick={() => setIsAdding(true)}
          className="hidden md:flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[2rem] p-8 hover:border-accent-500/50 hover:bg-brand-50 transition-all group min-h-[12rem]"
        >
          <div className="p-4 bg-gray-100 rounded-full text-gray-400 group-hover:bg-accent-500 group-hover:text-white transition-all">
            <Plus size={32} />
          </div>
          <span className="mt-4 font-bold text-gray-400 group-hover:text-accent-500">Adicionar Novo</span>
        </button>
      </div>

      <div className="pt-8 md:hidden">
        <Button variant="outline" fullWidth icon={<Plus size={18} />} onClick={() => setIsAdding(true)}>
          Adicionar Novo Cartão
        </Button>
      </div>
      
      <p className="text-center md:text-left text-xs text-gray-400 mt-4 px-4 pb-10">
        Seus cartões são armazenados localmente e criptografados para sua segurança. 
        <br className="hidden md:block"/> Em caso de perda, solicite o bloqueio no terminal físico.
      </p>
    </div>
  );
};
