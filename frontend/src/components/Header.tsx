import { Search, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onFilterChange?: (filters: any) => void;
}

export default function Header({ onFilterChange }: HeaderProps) {
  const [localFilters, setLocalFilters] = useState({
    search: '',
    region: '',
    gender: '',
    ageRange: '',
    productCategory: '',
    tags: '',
    dateRange: '',
    sortBy: ''
  });

  const handleChange = (key: string, value: string) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Sales Management System</h1>
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-[200px] relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Name, Phone no."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={localFilters.search}
                onChange={(e) => handleChange('search', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => onFilterChange?.({})} // reset filters
          >
            <RefreshCw size={18} className="text-gray-600" />
          </button>

          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={localFilters.region}
            onChange={(e) => handleChange('region', e.target.value)}
          >
            <option value="">Customer Region</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={localFilters.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={localFilters.ageRange}
            onChange={(e) => handleChange('ageRange', e.target.value)}
          >
            <option value="">Age Range</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46+">46+</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={localFilters.productCategory}
            onChange={(e) => handleChange('productCategory', e.target.value)}
          >
            <option value="">Product Category</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Sports">Sports</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={localFilters.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
          >
            <option value="">Tags</option>
            <option value="VIP">VIP</option>
            <option value="Regular">Regular</option>
            <option value="New">New</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={localFilters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
          >
            <option value="">Sort by: Customer Name (A-Z)</option>
            <option value="name-desc">Customer Name (Z-A)</option>
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="amount-desc">Amount (High to Low)</option>
            <option value="amount-asc">Amount (Low to High)</option>
          </select>
        </div>
      </div>
    </div>
  );
} 

