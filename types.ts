
export interface BusCard {
  id: string;
  name: string;
  number: string;
  balance: number;
  color: 'blue' | 'purple' | 'green' | 'orange';
  type: 'Comum' | 'Estudante' | 'Vale-Transporte';
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  cardId: string;
  status: 'concluido' | 'pendente' | 'cancelado';
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}

export interface ServiceStatus {
  line: string;
  status: 'normal' | 'lento' | 'paralisado';
  updatedAt: string;
}

export type Tab = 'home' | 'cards' | 'recharge' | 'profile';
