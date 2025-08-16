import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  CreditCard, 
  Send, 
  Receipt, 
  Smartphone, 
  Bell, 
  Phone, 
  Calculator,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  Search,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  PieChart,
  Activity,
  Settings,
  HelpCircle,
  Upload
} from 'lucide-react';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [billPayee, setBillPayee] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [checkImage, setCheckImage] = useState<File | null>(null);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const accounts = [
    { 
      id: 1, 
      name: user?.accountType === 'savings' ? 'High Yield Savings' : 'Primary Checking', 
      number: '****' + user?.accountNumber?.slice(-4), 
      balance: user?.accountType === 'savings' ? 45230.12 : 12457.89, 
      type: user?.accountType || 'checking' 
    }
  ];

  const recentTransactions = [
    { id: 1, date: '2025-01-15', description: 'Direct Deposit - Salary', amount: 3200.00, type: 'credit' },
    { id: 2, date: '2025-01-14', description: 'Electric Bill Payment', amount: -156.78, type: 'debit' },
    { id: 3, date: '2025-01-13', description: 'Transfer to Savings', amount: -500.00, type: 'transfer' },
    { id: 4, date: '2025-01-12', description: 'Grocery Store Purchase', amount: -87.45, type: 'debit' },
    { id: 5, date: '2025-01-11', description: 'Cash Deposit', amount: 200.00, type: 'credit' }
  ];

  const upcomingBills = [
    { id: 1, payee: 'Credit Card Payment', amount: 450.00, dueDate: '2025-01-20' },
    { id: 2, payee: 'Mortgage Payment', amount: 1850.00, dueDate: '2025-01-25' },
    { id: 3, payee: 'Internet Service', amount: 89.99, dueDate: '2025-01-28' }
  ];

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Transfer of $${transferAmount} to ${transferTo} initiated successfully!`);
    setTransferAmount('');
    setTransferTo('');
  };

  const handleBillPay = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Bill payment of $${billAmount} to ${billPayee} scheduled successfully!`);
    setBillAmount('');
    setBillPayee('');
  };

  const handleCheckDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkImage) {
      alert('Check deposit submitted for processing. Funds will be available within 1-2 business days.');
      setCheckImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Account #{user.accountNumber}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: Activity },
                { id: 'accounts', name: 'Accounts', icon: CreditCard },
                { id: 'transfer', name: 'Transfer', icon: Send },
                { id: 'bills', name: 'Bill Pay', icon: Receipt },
                { id: 'deposit', name: 'Deposit', icon: Smartphone },
                { id: 'tools', name: 'Tools', icon: Calculator }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Account Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <div key={account.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{account.name}</h3>
                    <CreditCard className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{account.number}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-bold ${account.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {balanceVisible ? `$${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
                    </span>
                    <button
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {account.balance < 0 && <span className="text-sm text-red-600">Outstanding Balance</span>}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Send, label: 'Transfer Money', action: () => setActiveTab('transfer') },
                  { icon: Receipt, label: 'Pay Bills', action: () => setActiveTab('bills') },
                  { icon: Smartphone, label: 'Deposit Check', action: () => setActiveTab('deposit') },
                  { icon: Download, label: 'Download Statement', action: () => alert('Statement download initiated') }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <action.icon className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Search className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'credit' ? 'bg-green-100' : 
                        transaction.type === 'debit' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownRight className="h-4 w-4 text-green-600" />
                        ) : transaction.type === 'debit' ? (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        ) : (
                          <Send className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Bills */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Bills</h3>
              <div className="space-y-4">
                {upcomingBills.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-gray-900">{bill.payee}</p>
                        <p className="text-sm text-gray-600">Due: {bill.dueDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${bill.amount.toFixed(2)}</p>
                      <button className="text-sm text-blue-600 hover:text-blue-800">Pay Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Details</h3>
              {accounts.map((account) => (
                <div key={account.id} className="border-b border-gray-200 last:border-b-0 py-6 last:pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{account.name}</h4>
                      <p className="text-gray-600">Account {account.number}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${account.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                      {account.balance < 0 && <span className="text-sm text-red-600">Outstanding</span>}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Statements
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Export Data
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Account Settings
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transfer' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Transfer Funds</h3>
              <form onSubmit={handleTransfer} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Account</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Primary Checking (****4567) - $12,457.89</option>
                    <option>High Yield Savings (****8901) - $45,230.12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <input
                    type="text"
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                    placeholder="Account number or email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transfer Type</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="transferType" value="internal" className="mr-3" defaultChecked />
                      <span>Between my accounts (Instant)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="transferType" value="external" className="mr-3" />
                      <span>To external bank (1-3 business days)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="transferType" value="wire" className="mr-3" />
                      <span>Wire transfer (Same day, $25 fee)</span>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  Transfer Funds
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'bills' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Pay Bills</h3>
              <form onSubmit={handleBillPay} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pay From</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Primary Checking (****4567) - $12,457.89</option>
                    <option>High Yield Savings (****8901) - $45,230.12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payee</label>
                  <input
                    type="text"
                    value={billPayee}
                    onChange={(e) => setBillPayee(e.target.value)}
                    placeholder="Enter payee name or select from saved payees"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="recurring" className="mr-3" />
                  <label htmlFor="recurring" className="text-sm text-gray-700">
                    Set up as recurring payment
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  Schedule Payment
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'deposit' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Mobile Check Deposit</h3>
              <form onSubmit={handleCheckDeposit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deposit To</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Primary Checking (****4567)</option>
                    <option>High Yield Savings (****8901)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Check Images</label>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <div className="text-sm text-gray-600">
                        <label htmlFor="front-image" className="cursor-pointer text-blue-600 hover:text-blue-500">
                          Upload front of check
                        </label>
                        <input
                          id="front-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setCheckImage(e.target.files?.[0] || null)}
                        />
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <div className="text-sm text-gray-600">
                        <label htmlFor="back-image" className="cursor-pointer text-blue-600 hover:text-blue-500">
                          Upload back of check
                        </label>
                        <input
                          id="back-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Deposit Guidelines</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Endorse the back of your check with your signature</li>
                    <li>• Ensure the check is well-lit and all corners are visible</li>
                    <li>• Deposit limit: $5,000 per day</li>
                    <li>• Funds typically available within 1-2 business days</li>
                  </ul>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  Submit Deposit
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Calculator,
                  title: 'Loan Calculator',
                  description: 'Calculate monthly payments for auto, home, or personal loans',
                  action: () => alert('Loan calculator opened')
                },
                {
                  icon: TrendingUp,
                  title: 'Savings Goal Tracker',
                  description: 'Set and track progress toward your savings goals',
                  action: () => alert('Savings tracker opened')
                },
                {
                  icon: PieChart,
                  title: 'Spending Analysis',
                  description: 'Analyze your spending patterns and create budgets',
                  action: () => alert('Spending analysis opened')
                },
                {
                  icon: Bell,
                  title: 'Account Alerts',
                  description: 'Set up notifications for account activity',
                  action: () => alert('Alert preferences opened')
                },
                {
                  icon: Phone,
                  title: 'Contact Support',
                  description: '24/7 customer service and live chat support',
                  action: () => alert('Support contacted')
                },
                {
                  icon: HelpCircle,
                  title: 'Help Center',
                  description: 'Find answers to frequently asked questions',
                  action: () => alert('Help center opened')
                }
              ].map((tool, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <tool.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <button
                    onClick={tool.action}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Launch Tool →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;