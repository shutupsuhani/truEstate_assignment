import { Info } from 'lucide-react';

interface StatsCardsProps {
  totalUnits: number;
  totalAmount: number;
  totalDiscount: number;
  srCount?: { amount: number; discount: number };
}

export default function StatsCards({
  totalUnits,
  totalAmount,
  totalDiscount,
  srCount = { amount: 19, discount: 45 },
}: StatsCardsProps) {
  return (
    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Total units sold</span>
            <Info size={14} className="text-gray-400" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">{totalUnits}</div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Total Amount</span>
            <Info size={14} className="text-gray-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-gray-900">
              ₹{totalAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-gray-500">
              ({srCount.amount} SRs)
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Total Discount</span>
            <Info size={14} className="text-gray-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-gray-900">
              ₹{totalDiscount.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-gray-500">
              ({srCount.discount} SRs)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
