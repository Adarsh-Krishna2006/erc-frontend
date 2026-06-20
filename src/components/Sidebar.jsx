import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  ShoppingCart,
  ClipboardList,
  Warehouse,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = ({ collapsed, setCollapsed }) => {
  const { isAdmin, isSales, isPurchase, isManufacturing, isInventory, isOwner } = useAuth();

  const categories = [
    {
      title: 'MAIN',
      items: [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard, show: true },
        { path: '/reports', label: 'Reports', icon: BarChart3, show: isAdmin || isOwner },
        { path: '/audit-logs', label: 'Audit Logs', icon: ShieldCheck, show: isAdmin },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { path: '/products', label: 'Products', icon: Package, show: true },
        { path: '/sales-orders', label: 'Sales Orders', icon: ShoppingCart, show: isSales || isAdmin || isOwner || isInventory },
        { path: '/purchase-orders', label: 'Purchase Orders', icon: ClipboardList, show: isPurchase || isAdmin || isOwner || isInventory },
        { path: '/manufacturing', label: 'Manufacturing', icon: ClipboardList, show: isManufacturing || isAdmin || isOwner || isInventory },
        { path: '/customers', label: 'Customers', icon: Users, show: isSales || isAdmin || isOwner },
        { path: '/vendors', label: 'Vendors', icon: Truck, show: isPurchase || isAdmin || isOwner },
      ],
    },
    {
      title: 'WAREHOUSE',
      items: [
        { path: '/inventory', label: 'Inventory', icon: Warehouse, show: isInventory || isAdmin || isOwner },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Brand logo header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-500/20">
              <Zap className="h-5 w-5 fill-white text-white" />
            </div>
            <span className="text-lg font-bold text-sky-600 dark:text-sky-400">Mini ERP</span>
          </div>
        ) : (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-500/20">
            <Zap className="h-5 w-5 fill-white text-white" />
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
        {categories.map((category) => {
          const visibleItems = category.items.filter((item) => item.show);
          if (visibleItems.length === 0) return null;

          return (
            <div key={category.title} className="space-y-1">
              {!collapsed && (
                <div className="px-3.5 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  {category.title}
                </div>
              )}
              {visibleItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-violet-50 text-violet-600 dark:bg-violet-950/20'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          );
        })}
      </div>

      {/* Footer Copyright */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-center">
        {!collapsed ? (
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            © 2026 Mini ERP
          </span>
        ) : (
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            '26
          </span>
        )}
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-20 -right-3.5 z-50 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 shadow-sm cursor-pointer"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
};

export default Sidebar;
