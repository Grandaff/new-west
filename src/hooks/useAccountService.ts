import { useState, useEffect } from 'react';
import { accountService, AccountData, Transaction } from '../utils/accountService';

export const useAccountService = (userId?: string) => {
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshAccounts = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const userAccounts = await accountService.getAccountsByUserId(userId);
      setAccounts(userAccounts);
    } catch (err) {
      setError('Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  const refreshTransactions = async (accountId: string) => {
    setLoading(true);
    try {
      const accountTransactions = await accountService.getTransactions(accountId);
      setTransactions(accountTransactions);
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const transfer = async (fromAccountId: string, toAccountNumber: string, amount: number, description: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await accountService.transferFunds(fromAccountId, toAccountNumber, amount, description);
      if (result.success) {
        await refreshAccounts();
        return { success: true };
      } else {
        setError(result.error || 'Transfer failed');
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Transfer failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const payBill = async (accountId: string, payee: string, amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await accountService.payBill(accountId, payee, amount);
      if (result.success) {
        await refreshAccounts();
        return { success: true };
      } else {
        setError(result.error || 'Bill payment failed');
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Bill payment failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const depositCheck = async (accountId: string, amount: number, checkImages: { front: File; back: File }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await accountService.depositCheck(accountId, amount, checkImages);
      if (result.success) {
        await refreshAccounts();
        return { success: true };
      } else {
        setError(result.error || 'Check deposit failed');
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Check deposit failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      refreshAccounts();
    }
  }, [userId]);

  return {
    accounts,
    transactions,
    loading,
    error,
    refreshAccounts,
    refreshTransactions,
    transfer,
    payBill,
    depositCheck
  };
};