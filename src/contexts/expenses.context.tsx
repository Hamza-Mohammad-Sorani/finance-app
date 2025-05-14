import { v4 as uuidv4 } from 'uuid';
import useCrud from '@hooks/use-crud.hook';
import { IExpense, ExpenseStatus } from '@apis/expense/expense.type';
import {
  useMemo,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from 'react';

export const itemsPerPage = 10;

export interface ExpensesContextType {
  isAdding: boolean;
  currentPage: number;
  rejectDialog: string | null;
  deleteDialog: string | null;
  approveDialog: string | null;
  filteredExpenses: IExpense[];
  paginatedExpenses: IExpense[];
  statusFilter: ExpenseStatus | null;
  editItem: IExpense | null;
  dispatchAdding: VoidFunction;
  handleDeleteExpense: VoidFunction;
  handleRejectExpense: VoidFunction;
  handleApproveExpense: VoidFunction;
  dispatchResetCrudState: VoidFunction;
  setCurrentPage: (page: number) => void;
  dispatchDeleting: (id: string) => void;
  dispatchEditing: (expense: IExpense) => void;
  setRejectDialog: (id: string | null) => void;
  setApproveDialog: (id: string | null) => void;
  handleEditExpense: (expense: IExpense) => void;
  addExpense: (expense: Omit<IExpense, 'id'>) => void;
  handleStatusFilterChange: (newStatus: ExpenseStatus | null) => void;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined,
);

export function ExpensesProvider({
  initialExpenses,
  children,
}: PropsWithChildren<{
  initialExpenses: IExpense[];
}>) {
  const [currentPage, setCurrentPage] = useState(1);

  const [expenses, setExpenses] = useState<IExpense[]>(initialExpenses);

  const [rejectDialog, setRejectDialog] = useState<string | null>(null);
  const [approveDialog, setApproveDialog] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<ExpenseStatus | null>(null);

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
  } = useCrud<IExpense>();

  const addExpense = (expense: Omit<IExpense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: uuidv4(),
    };

    setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
    dispatchResetCrudState();
  };

  const handleDeleteExpense = () => {
    setExpenses(prevExpenses =>
      prevExpenses.filter(expense => expense.id !== getActionId()),
    );
    dispatchDeleting('');
  };

  const handleEditExpense = (editedExpense: IExpense) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === editedExpense.id ? editedExpense : expense,
      ),
    );
    dispatchResetCrudState();
  };

  const handleApproveExpense = () => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === approveDialog
          ? { ...expense, status: 'Approved' }
          : expense,
      ),
    );
    setApproveDialog(null);
  };

  const handleRejectExpense = () => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === rejectDialog
          ? { ...expense, status: 'Rejected' }
          : expense,
      ),
    );
    setRejectDialog(null);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const filteredExpenses = useMemo(
    () =>
      !statusFilter
        ? expenses
        : expenses.filter(expense => expense.status === statusFilter),
    [expenses, statusFilter],
  );

  const paginatedExpenses = useMemo(
    () => filteredExpenses.slice(startIndex, startIndex + itemsPerPage),
    [filteredExpenses, startIndex],
  );

  const handleStatusFilterChange = (newStatus: ExpenseStatus | null) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  };

  return (
    <ExpensesContext.Provider
      value={{
        isAdding,
        currentPage,
        statusFilter,
        rejectDialog,
        approveDialog,
        filteredExpenses,
        paginatedExpenses,
        editItem: isEditing ? getSelectedData() : null,
        deleteDialog: isDeleting ? getActionId() : null,
        addExpense,
        dispatchAdding,
        setCurrentPage,
        dispatchEditing,
        setRejectDialog,
        dispatchDeleting,
        setApproveDialog,
        handleEditExpense,
        handleRejectExpense,
        handleDeleteExpense,
        handleApproveExpense,
        dispatchResetCrudState,
        handleStatusFilterChange,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpensesProvider');
  }
  return context;
}
