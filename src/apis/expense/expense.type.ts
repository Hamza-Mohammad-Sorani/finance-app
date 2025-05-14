export type ExpenseStatus = 'Pending' | 'Approved' | 'Rejected';

export type IExpense = {
  id: string;
  description: string;
  amount: number;
  status: ExpenseStatus;
  createdAt: string;
};

export type IExpenseGetAllResponse = {
  expenses: IExpense[];
};
