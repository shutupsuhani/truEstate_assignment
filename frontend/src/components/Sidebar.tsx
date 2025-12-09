import { useState } from 'react';
import {
  LayoutDashboard,
  Network,
  Inbox,
  Settings,
  ChevronDown,
  ChevronRight,
  Circle,
  FileText
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  children?: { label: string; icon: React.ReactNode; active?: boolean }[];
}

export default function Sidebar() {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(false);

  const navItems: NavItem[] = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true },
    { icon: <Network size={18} />, label: 'Nexus' },
    { icon: <Inbox size={18} />, label: 'Intake' },
    {
      icon: <Settings size={18} />,
      label: 'Services',
      children: [
        { label: 'Pre-active', icon: <Circle size={14} /> },
        { label: 'Active', icon: <Circle size={14} /> },
        { label: 'Blocked', icon: <Circle size={14} /> },
        { label: 'Closed', icon: <Circle size={14} /> },
      ],
    },
    {
      icon: <FileText size={18} />,
      label: 'Invoices',
      children: [
        { label: 'Proforma Invoices', icon: <Circle size={14} /> },
        { label: 'Final Invoices', icon: <Circle size={14} /> },
      ],
    },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
            <img src='./image.png' />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Vault</h1>
            <p className="text-xs text-gray-500">Anurag Yadav</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => {
                if (item.label === 'Services') setServicesOpen(!servicesOpen);
                if (item.label === 'Invoices') setInvoicesOpen(!invoicesOpen);
              }}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                item.active
                  ? 'bg-gray-200 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.children && (
                <span>
                  {(item.label === 'Services' && servicesOpen) ||
                  (item.label === 'Invoices' && invoicesOpen) ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </span>
              )}
            </button>

            {item.children &&
              ((item.label === 'Services' && servicesOpen) ||
                (item.label === 'Invoices' && invoicesOpen)) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child, childIndex) => (
                    <button
                      key={childIndex}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      {child.icon}
                      <span>{child.label}</span>
                    </button>
                  ))}
                </div>
              )}
          </div>
        ))}
      </nav>
    </div>
  );
}
