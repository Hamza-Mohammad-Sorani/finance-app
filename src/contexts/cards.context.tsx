import { v4 as uuidv4 } from 'uuid';
import useCrud from '@hooks/use-crud.hook';
import { ICard, CardStatus } from '@apis/card/card.type';
import {
  useMemo,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from 'react';

export const itemsPerPage = 10;

export interface CardsContextType {
  isAdding: boolean;
  currentPage: number;
  deactivateDialog: string | null;
  deleteDialog: string | null;
  activateDialog: string | null;
  filteredCards: ICard[];
  paginatedCards: ICard[];
  statusFilter: CardStatus | null;
  editItem: ICard | null;
  dispatchAdding: VoidFunction;
  handleDeleteCard: VoidFunction;
  handleDeactivateCard: VoidFunction;
  handleActivateCard: VoidFunction;
  dispatchResetCrudState: VoidFunction;
  setCurrentPage: (page: number) => void;
  dispatchDeleting: (id: string) => void;
  dispatchEditing: (card: ICard) => void;
  setDeactivateDialog: (id: string | null) => void;
  setActivateDialog: (id: string | null) => void;
  handleEditCard: (card: ICard) => void;
  addCard: (card: Omit<ICard, 'id'>) => void;
  handleStatusFilterChange: (newStatus: CardStatus | null) => void;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export function CardsProvider({
  initialCards,
  children,
}: PropsWithChildren<{
  initialCards: ICard[];
}>) {
  const [currentPage, setCurrentPage] = useState(1);

  const [cards, setCards] = useState<ICard[]>(initialCards);

  const [deactivateDialog, setDeactivateDialog] = useState<string | null>(null);
  const [activateDialog, setActivateDialog] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<CardStatus | null>(null);

  const {
    isAdding,
    isEditing,
    isDeleting,
    getActionId,
    dispatchAdding,
    dispatchEditing,
    getSelectedData,
    dispatchDeleting,
    dispatchResetCrudState,
  } = useCrud<ICard>();

  const addCard = (card: Omit<ICard, 'id'>) => {
    const newCard = {
      ...card,
      id: uuidv4(),
    };

    setCards(prevCards => [newCard, ...prevCards]);
    dispatchResetCrudState();
  };

  const handleDeleteCard = () => {
    setCards(prevCards => prevCards.filter(card => card.id !== getActionId()));
    dispatchDeleting('');
  };

  const handleEditCard = (editedCard: ICard) => {
    setCards(prevCards =>
      prevCards.map(card => (card.id === editedCard.id ? editedCard : card)),
    );
    dispatchResetCrudState();
  };

  const handleActivateCard = () => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === activateDialog ? { ...card, status: 'Active' } : card,
      ),
    );
    setActivateDialog(null);
  };

  const handleDeactivateCard = () => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === deactivateDialog ? { ...card, status: 'Inactive' } : card,
      ),
    );
    setDeactivateDialog(null);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const filteredCards = useMemo(
    () =>
      !statusFilter
        ? cards
        : cards.filter(card => card.status === statusFilter),
    [cards, statusFilter],
  );

  const paginatedCards = useMemo(
    () => filteredCards.slice(startIndex, startIndex + itemsPerPage),
    [filteredCards, startIndex],
  );

  const handleStatusFilterChange = (newStatus: CardStatus | null) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  };

  return (
    <CardsContext.Provider
      value={{
        isAdding,
        currentPage,
        statusFilter,
        deactivateDialog,
        activateDialog,
        filteredCards,
        paginatedCards,
        editItem: isEditing ? getSelectedData() : null,
        deleteDialog: isDeleting ? getActionId() : null,
        addCard,
        dispatchAdding,
        setCurrentPage,
        dispatchEditing,
        setDeactivateDialog,
        dispatchDeleting,
        setActivateDialog,
        handleEditCard,
        handleDeactivateCard,
        handleDeleteCard,
        handleActivateCard,
        dispatchResetCrudState,
        handleStatusFilterChange,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export function useCards() {
  const context = useContext(CardsContext);
  if (context === undefined) {
    throw new Error('useCards must be used within an CardsProvider');
  }
  return context;
}
