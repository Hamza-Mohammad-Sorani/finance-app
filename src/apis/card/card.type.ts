export type CardStatus = 'Active' | 'Inactive';

export type ICard = {
  id: string;
  cardholderName: string;
  last4Digits: string;
  status: CardStatus;
  issuedAt: string;
};

export type ICardGetAllResponse = {
  cards: ICard[];
};
