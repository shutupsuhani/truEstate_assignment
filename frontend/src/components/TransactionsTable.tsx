import { Copy } from 'lucide-react';

export interface Transaction {
  _id: string;
  transaction_id: string;
  date: string;
  customer_name: string;
  phone_number: string;
  gender: string;
  age: number;
  product_category: string;
  quantity: number;
  price_per_unit: number;
  discount_percentage: number;
  total_amount: number;
  final_amount: number;
  payment_method: string;
  order_status: string;
  delivery_type: string;
  store_location: string;
  employee_name: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
          <tr>
            {[
              "Transaction ID", "Date", "Customer Name", "Phone Number", "Gender", "Age",
              "Product Category", "Quantity", "Price per Unit", "Discount Percentage",
              "Total Amount", "Final Amount", "Payment Method", "Order Status",
              "Delivery Type", "Store Location", "Employee Name"
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-700">{tx.transaction_id}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.date}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.customer_name}</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span>{tx.phone_number}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(String(tx.phone_number))}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.gender}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.age}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.product_category}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.quantity}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.price_per_unit}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.discount_percentage}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.total_amount}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.final_amount}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.payment_method}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.order_status}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.delivery_type}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.store_location}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{tx.employee_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
