// Account Service - Backend functionality for account management

export interface AccountData {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: 'checking' | 'savings';
  balance: number;
  status: 'active' | 'pending_verification' | 'suspended' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  documents: {
    driverLicenseFront: string;
    driverLicenseBack: string;
    profilePicture: string;
  };
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'credit' | 'debit' | 'transfer';
  amount: number;
  description: string;
  category: string;
  date: string;
  balance: number;
  status: 'pending' | 'completed' | 'failed';
}

class AccountService {
  private accounts: Map<string, AccountData> = new Map();
  private profiles: Map<string, CustomerProfile> = new Map();
  private transactions: Map<string, Transaction[]> = new Map();

  // Account Management
  async createAccount(profileData: Partial<CustomerProfile>): Promise<{ success: boolean; accountNumber?: string; error?: string }> {
    try {
      const accountId = this.generateAccountId();
      const profileId = this.generateProfileId();
      
      // Create customer profile
      const profile: CustomerProfile = {
        id: profileId,
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        dateOfBirth: profileData.dateOfBirth || '',
        ssn: profileData.ssn || '',
        address: {
          street: profileData.address?.street || '',
          city: profileData.address?.city || '',
          state: profileData.address?.state || '',
          zipCode: profileData.address?.zipCode || ''
        },
        documents: {
          driverLicenseFront: profileData.documents?.driverLicenseFront || '',
          driverLicenseBack: profileData.documents?.driverLicenseBack || '',
          profilePicture: profileData.documents?.profilePicture || ''
        },
        verificationStatus: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Create account
      const account: AccountData = {
        id: accountId,
        userId: profileId,
        accountNumber: this.generateAccountNumber(),
        accountType: (profileData as any).accountType || 'checking',
        balance: 0,
        status: 'pending_verification',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Store in memory (in production, this would be a database)
      this.profiles.set(profileId, profile);
      this.accounts.set(accountId, account);
      this.transactions.set(accountId, []);

      // Simulate verification process
      setTimeout(() => {
        this.verifyAccount(accountId);
      }, 5000);

      return { success: true, accountNumber: account.accountNumber };
    } catch (error) {
      return { success: false, error: 'Failed to create account' };
    }
  }

  async verifyAccount(accountId: string): Promise<void> {
    const account = this.accounts.get(accountId);
    if (account) {
      account.status = 'active';
      account.updatedAt = new Date().toISOString();
      
      // Add welcome bonus for new accounts
      if (account.accountType === 'savings') {
        account.balance = 25.00; // Welcome bonus
        this.addTransaction(accountId, {
          type: 'credit',
          amount: 25.00,
          description: 'Welcome Bonus',
          category: 'bonus'
        });
      }
    }
  }

  async getAccount(accountNumber: string): Promise<AccountData | null> {
    for (const account of this.accounts.values()) {
      if (account.accountNumber === accountNumber) {
        return account;
      }
    }
    return null;
  }

  async getAccountsByUserId(userId: string): Promise<AccountData[]> {
    const userAccounts: AccountData[] = [];
    for (const account of this.accounts.values()) {
      if (account.userId === userId) {
        userAccounts.push(account);
      }
    }
    return userAccounts;
  }

  // Transaction Management
  async addTransaction(accountId: string, transactionData: {
    type: 'credit' | 'debit' | 'transfer';
    amount: number;
    description: string;
    category: string;
  }): Promise<{ success: boolean; transaction?: Transaction; error?: string }> {
    try {
      const account = this.accounts.get(accountId);
      if (!account) {
        return { success: false, error: 'Account not found' };
      }

      // Check for sufficient funds on debit transactions
      if (transactionData.type === 'debit' && account.balance < transactionData.amount) {
        return { success: false, error: 'Insufficient funds' };
      }

      // Update account balance
      if (transactionData.type === 'credit') {
        account.balance += transactionData.amount;
      } else if (transactionData.type === 'debit') {
        account.balance -= transactionData.amount;
      }

      // Create transaction record
      const transaction: Transaction = {
        id: this.generateTransactionId(),
        accountId,
        type: transactionData.type,
        amount: transactionData.amount,
        description: transactionData.description,
        category: transactionData.category,
        date: new Date().toISOString(),
        balance: account.balance,
        status: 'completed'
      };

      // Store transaction
      const accountTransactions = this.transactions.get(accountId) || [];
      accountTransactions.unshift(transaction); // Add to beginning for recent first
      this.transactions.set(accountId, accountTransactions);

      account.updatedAt = new Date().toISOString();

      return { success: true, transaction };
    } catch (error) {
      return { success: false, error: 'Failed to process transaction' };
    }
  }

  async getTransactions(accountId: string, limit: number = 50): Promise<Transaction[]> {
    const transactions = this.transactions.get(accountId) || [];
    return transactions.slice(0, limit);
  }

  // Transfer between accounts
  async transferFunds(fromAccountId: string, toAccountNumber: string, amount: number, description: string): Promise<{ success: boolean; error?: string }> {
    try {
      const fromAccount = this.accounts.get(fromAccountId);
      const toAccount = await this.getAccount(toAccountNumber);

      if (!fromAccount || !toAccount) {
        return { success: false, error: 'Account not found' };
      }

      if (fromAccount.balance < amount) {
        return { success: false, error: 'Insufficient funds' };
      }

      // Debit from source account
      await this.addTransaction(fromAccountId, {
        type: 'debit',
        amount,
        description: `Transfer to ${toAccountNumber}`,
        category: 'transfer'
      });

      // Credit to destination account
      await this.addTransaction(toAccount.id, {
        type: 'credit',
        amount,
        description: `Transfer from ${fromAccount.accountNumber}`,
        category: 'transfer'
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Transfer failed' };
    }
  }

  // Bill Payment
  async payBill(accountId: string, payee: string, amount: number): Promise<{ success: boolean; error?: string }> {
    return await this.addTransaction(accountId, {
      type: 'debit',
      amount,
      description: `Bill Payment - ${payee}`,
      category: 'bill_payment'
    }).then(result => ({
      success: result.success,
      error: result.error
    }));
  }

  // Check Deposit
  async depositCheck(accountId: string, amount: number, checkImages: { front: File; back: File }): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate check processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add pending transaction
      const result = await this.addTransaction(accountId, {
        type: 'credit',
        amount,
        description: 'Mobile Check Deposit',
        category: 'deposit'
      });

      if (result.success && result.transaction) {
        // Mark as pending initially
        result.transaction.status = 'pending';
        
        // Simulate check clearing after 24 hours
        setTimeout(() => {
          if (result.transaction) {
            result.transaction.status = 'completed';
          }
        }, 24 * 60 * 60 * 1000);
      }

      return { success: result.success, error: result.error };
    } catch (error) {
      return { success: false, error: 'Check deposit failed' };
    }
  }

  // Utility methods
  private generateAccountId(): string {
    return 'acc_' + Math.random().toString(36).substr(2, 9);
  }

  private generateProfileId(): string {
    return 'prof_' + Math.random().toString(36).substr(2, 9);
  }

  private generateTransactionId(): string {
    return 'txn_' + Math.random().toString(36).substr(2, 9);
  }

  private generateAccountNumber(): string {
    return 'WIB' + Math.random().toString().substr(2, 8);
  }

  // Admin functions
  async getAllAccounts(): Promise<AccountData[]> {
    return Array.from(this.accounts.values());
  }

  async getAllProfiles(): Promise<CustomerProfile[]> {
    return Array.from(this.profiles.values());
  }

  async updateAccountStatus(accountId: string, status: AccountData['status']): Promise<{ success: boolean; error?: string }> {
    const account = this.accounts.get(accountId);
    if (!account) {
      return { success: false, error: 'Account not found' };
    }

    account.status = status;
    account.updatedAt = new Date().toISOString();
    return { success: true };
  }

  async getAccountAnalytics(): Promise<{
    totalAccounts: number;
    totalDeposits: number;
    activeAccounts: number;
    pendingVerifications: number;
  }> {
    const accounts = Array.from(this.accounts.values());
    const totalAccounts = accounts.length;
    const activeAccounts = accounts.filter(acc => acc.status === 'active').length;
    const pendingVerifications = accounts.filter(acc => acc.status === 'pending_verification').length;
    const totalDeposits = accounts.reduce((sum, acc) => sum + Math.max(0, acc.balance), 0);

    return {
      totalAccounts,
      totalDeposits,
      activeAccounts,
      pendingVerifications
    };
  }
}

// Export singleton instance
export const accountService = new AccountService();

// Initialize with some demo data
accountService.createAccount({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '(555) 123-4567',
  dateOfBirth: '1990-01-15',
  ssn: '123-45-6789',
  address: {
    street: '123 Main St',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90210'
  },
  documents: {
    driverLicenseFront: 'license_front.jpg',
    driverLicenseBack: 'license_back.jpg',
    profilePicture: 'profile.jpg'
  }
});