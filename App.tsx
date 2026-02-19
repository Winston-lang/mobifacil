
import React, { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';
import { HomeScreen } from './screens/HomeScreen';
import { CardsScreen } from './screens/CardsScreen';
import { RechargeScreen } from './screens/RechargeScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { LoginScreen } from './screens/LoginScreen';
import { BusCard, Tab, Transaction, User } from './types';

// Mock Data
const MOCK_USER: User = {
  id: 'u1',
  name: 'Carlos Oliveira',
  email: 'carlos.oliveira@email.com',
  photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100',
};

const INITIAL_CARDS: BusCard[] = [
  { id: 'c1', name: 'Meu Cartão', number: '1234567890123456', balance: 14.50, color: 'blue', type: 'Comum' },
  { id: 'c2', name: 'Estudante', number: '9876543210987654', balance: 45.20, color: 'orange', type: 'Estudante' },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: new Date().toISOString(), amount: -4.50, cardId: 'c1', status: 'concluido', description: 'Passagem Linha 302' },
  { id: 't2', date: new Date(Date.now() - 86400000).toISOString(), amount: 50.00, cardId: 'c1', status: 'concluido', description: 'Recarga Pix' },
  { id: 't3', date: new Date(Date.now() - 172800000).toISOString(), amount: -4.50, cardId: 'c1', status: 'concluido', description: 'Passagem Linha 105' },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [cards, setCards] = useState<BusCard[]>(INITIAL_CARDS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentTab('home');
  };

  const handleRecharge = (amount: number, cardId: string) => {
    setCards(prevCards => prevCards.map(card => {
      if (card.id === cardId) {
        return { ...card, balance: card.balance + amount };
      }
      return card;
    }));

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      date: new Date().toISOString(),
      amount: amount,
      cardId: cardId,
      status: 'concluido',
      description: 'Recarga Via App'
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleAddCard = (cardData: Omit<BusCard, 'id'>) => {
    const newCard: BusCard = {
      ...cardData,
      id: `c${Date.now()}`,
    };
    setCards([...cards, newCard]);
  };

  const renderScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen user={MOCK_USER} primaryCard={cards[0]} recentTransactions={transactions} onNavigate={setCurrentTab} />;
      case 'cards':
        return <CardsScreen cards={cards} onAddCard={handleAddCard} onSelectCard={(id) => setCurrentTab('recharge')} />;
      case 'recharge':
        return <RechargeScreen cards={cards} onRecharge={handleRecharge} history={transactions} />;
      case 'profile':
        return <ProfileScreen user={MOCK_USER} onLogout={handleLogout} />;
      default:
        return <HomeScreen user={MOCK_USER} primaryCard={cards[0]} recentTransactions={transactions} onNavigate={setCurrentTab} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-accent-500 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20">
          <LoginScreen onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent-500 flex flex-col md:flex-row justify-center">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} onLogout={handleLogout} user={MOCK_USER} />
      </div>

      <div className="w-full max-w-6xl bg-brand-50 min-h-screen relative md:m-6 md:rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col">
        <main className="flex-1 p-5 md:p-10 overflow-y-auto no-scrollbar pb-32 md:pb-10">
          <div className="max-w-4xl mx-auto">
            {renderScreen()}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden">
          <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
        </div>
      </div>
    </div>
  );
}

export default App;
