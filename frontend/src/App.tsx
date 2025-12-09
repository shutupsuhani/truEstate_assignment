
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import TransactionsTable, { Transaction } from './components/TransactionsTable';
import Pagination from './components/Pagination';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState({
  search: '',
  region: '',
  gender: '',
  ageMin: '',
  ageMax: '',
  productCategory: '',
  tags: '',
  paymentMethod: '',
  dateStart: '',
  dateEnd: '',
  sortBy: ''
});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({
    totalUnits: 0,
    totalAmount: 0,
    totalDiscount: 0,
  });



  /*const fetchTransactions = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:5000/sales?page=${page}&limit=${ITEMS_PER_PAGE}`);
      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        setTransactions([]);
        setError('No transactions found');
        setTotalPages(1);
        setTotal(0);
        setStats({ totalUnits: 0, totalAmount: 0, totalDiscount: 0 });
        return;
      }

      // Map backend fields to frontend-friendly keys
      const mappedTransactions: Transaction[] = data.data.map((tx: any) => ({
        _id: tx._id,
        transaction_id: tx["Transaction ID"],
        date: tx["Date"],
        customer_name: tx["Customer Name"],
        phone_number: tx["Phone Number"],
        gender: tx["Gender"],
        age: Number(tx["Age"]),
        product_category: tx["Product Category"],
        quantity: Number(tx["Quantity"]),
        price_per_unit: Number(tx["Price per Unit"]),
        discount_percentage: Number(tx["Discount Percentage"]),
        total_amount: Number(tx["Total Amount"]),
        final_amount: Number(tx["Final Amount"]),
        payment_method: tx["Payment Method"],
        order_status: tx["Order Status"],
        delivery_type: tx["Delivery Type"],
        store_location: tx["Store Location"],
        employee_name: tx["Employee Name"],
      }));

      setTransactions(mappedTransactions);
      setCurrentPage(page);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || mappedTransactions.length);
      calculateStats(mappedTransactions);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch transactions. Check your API.');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }; */

  const fetchTransactions = async (page: number = 1, appliedFilters = filters) => {
  try {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(ITEMS_PER_PAGE),
      ...appliedFilters
    });

    const response = await fetch(`http://localhost:5000/sales?${params}`);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      setTransactions([]);
      setError('No transactions found');
      setTotalPages(1);
      setTotal(0);
      setStats({ totalUnits: 0, totalAmount: 0, totalDiscount: 0 });
      return;
    }

    const mappedTransactions: Transaction[] = data.data.map((tx: any) => ({
      _id: tx._id,
      transaction_id: tx["Transaction ID"],
      date: tx["Date"],
      customer_name: tx["Customer Name"],
      phone_number: tx["Phone Number"],
      gender: tx["Gender"],
      age: Number(tx["Age"]),
      product_category: tx["Product Category"],
      quantity: Number(tx["Quantity"]),
      price_per_unit: Number(tx["Price per Unit"]),
      discount_percentage: Number(tx["Discount Percentage"]),
      total_amount: Number(tx["Total Amount"]),
      final_amount: Number(tx["Final Amount"]),
      payment_method: tx["Payment Method"],
      order_status: tx["Order Status"],
      delivery_type: tx["Delivery Type"],
      store_location: tx["Store Location"],
      employee_name: tx["Employee Name"],
    }));

    setTransactions(mappedTransactions);
    setCurrentPage(page);
    setTotalPages(data.totalPages || 1);
    setTotal(data.total || mappedTransactions.length);
    calculateStats(mappedTransactions);
  } catch (err) {
    console.error(err);
    setError('Failed to fetch transactions. Check your API.');
    setTransactions([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchTransactions(1);
  }, []);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchTransactions(page);
  };

  const handleRetry = () => {
    fetchTransactions(currentPage);
  };


  const calculateStats = (data: Transaction[]) => {
    const totalUnits = data.reduce((sum, t) => sum + t.quantity, 0);
    const totalAmount = data.reduce((sum, t) => sum + t.total_amount, 0);
    const totalDiscount = data.reduce((sum, t) => sum + t.discount_percentage, 0);

    setStats({ totalUnits, totalAmount, totalDiscount });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onFilterChange={(updatedFilters) => {
  setFilters(updatedFilters);
  fetchTransactions(1, updatedFilters); // fetch filtered data from backend
}}/>
        <StatsCards
          totalUnits={stats.totalUnits}
          totalAmount={stats.totalAmount}
          totalDiscount={stats.totalDiscount}
        />

        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900">{error}</p>
            </div>
            <button
              onClick={handleRetry}
              className="flex-shrink-0 text-red-600 hover:text-red-700 transition-colors"
              title="Retry"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        )}

        {loading && transactions.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600 mt-3">Loading transactions...</p>
            </div>
          </div>
        ) : transactions.length > 0 ? (
          <>
            <TransactionsTable transactions={transactions} />
            <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total} transactions
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;

