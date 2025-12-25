import {
  Zap,
  BarChart3,
  Calendar,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Users,
  ChevronDown, ChevronUp
} from 'lucide-react';

import dragNdrop100 from '..//..//assets//images//drag_and_drop//icons8-drag-and-drop-100.png';
import { useState, useRef, useEffect } from 'react';
import adminImg from '..//..//assets//images//admin6-avatar.png';

const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
    badge: "New",
    expanded: false
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    submenu: [
      { id: "overview", label: "Overview" },
      { id: "reports", label: "Reports" },
      { id: "insights", label: "Insights" },
      { id: "summary", label: "Summary" },
      { id: "average", label: "Average" },
      { id: "standardDeviation", label: "Standard Deviation" }
    ],
    expanded: false
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    count: "2.4k",
    submenu: [
      { id: "all-users", label: "All Users" },
      { id: "roles", label: "Roles & Permissions" },
      { id: "activity", label: "User Activity" }
    ],
    expanded: false
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    label: "E-commerce",
    submenu: [
      { id: "products", label: "Products" },
      { id: "orders", label: "Orders" },
      { id: "customers", label: "Customers" }
    ],
    expanded: false
  },
  {
    id: "inventory",
    icon: Package,
    label: "Inventory",
    count: "847",
    expanded: false
  },
  {
    id: "transactions",
    icon: CreditCard,
    label: "Transactions",
    expanded: false
  },
  {
    id: "messages",
    icon: MessageSquare,
    label: "Messages",
    badge: "12",
    expanded: false
  },
  {
    id: "calendar",
    icon: Calendar,
    label: "Calendar",
    expanded: false
  },
  {
    id: "reports",
    icon: FileText,
    label: "Reports",
    expanded: false
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    expanded: false
  },
  // {
  //   id: "dnd1",
  //   icon: dragNdrop100,
  //   label: "Drag & Drop",
  //   submenu: [
  //     { id: "products", label: "Products" },
  //     { id: "orders", label: "Orders" },
  //     { id: "customers", label: "Customers" },
  //     { id: "summary", label: "Summary" },
  //     { id: "average", label: "Average" },
  //     { id: "standardDeviation", label: "Standard Deviation" }
  //   ],
  //   expanded: false
  // },
  {
    id: "dnd",
    icon: dragNdrop100,
    label: "Drag & Drop",
    expanded: false
  }
];

function Sidebar({ collapsed, onToggle, currentPage, onPageChange }) {

  const [expandedItems, setExpandedItems] = useState(new Set([]));

  
  // Ref for the element you want to scroll to (e.g., the dropdown container or a specific item)
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Check if the dropdown is open and the ref is attached to a DOM element
    if (dropdownRef.current) {
      // Use scrollIntoView() to scroll the element into the viewport
      dropdownRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });

  const toggleExpanded = (item) => {
    const newExpanded = new Set(expandedItems);

    if (newExpanded.has(item.id)) {
      newExpanded.delete(item.id);
    } else {
      newExpanded.add(item.id);
    }
    setExpandedItems(newExpanded);
    
    item.expanded = !item.expanded;

    
    console.log('expanded items ', newExpanded);

  };

  return (
    <div
      className={`
      ${collapsed ? "w-20" : "w-72"}
      transition-all duration-300 ease-in-out
      bg-white/80 dark:bg-slate-900/80
      backdrop-blur-xl border-r border-slate-200/50
      dark:border-slate-700/50 flex flex-col relative z-10`
      }
    >
      {/* Logo */}

      <div
        className='p-5 border-b border-slate-200/50
          dark:border-slate-700/50'
      >
        <div className='flex items-center space-x-3'>
          <div
            className='w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600
                  rounded-xl flex items-center justify-center shadow-lg'
          >
            <Zap className='w-6 h-6 text-white' />
          </div>

          {/* Conditional Rendering */}
          {!collapsed && (
            <div>
              <h1 className='text-2xl font-bold text-[#1a3ac8] dark:text-white text-shadow-lg text-shadow-[#a9afbc]'>
                Nexus
              </h1>
              <p className='text-sm text-slate-600 dark:text-slate-400'>
                Admin Panel
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation will display dynamic menus */}

      <nav id="navBar" className="flex-1 p-2 space-y-1.5 overflow-y-scroll">
        {menuItems.map((item) => {
          return (
            <div key={item.id}>
              <button key={item.id} id={item.id} className={`w-full flex items-center justify-between
              p-3 rounded-xl transition-all duration-200 ${currentPage === item.id || item.active
                  ? 'bg-linear-to-r from-[#0a0a0a] to-[#eb06f3] text-white shadow-lg'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}

                onClick={() => {
                  if (item.submenu) {
                    toggleExpanded(item);
                  } else {
                    onPageChange(item.id);
                  }
                }
                }
              >
                <div className='flex items-center space-x-3'>
                  {item.id === 'dnd' ? (
                    <img src={item.icon} alt="dnd-icon" className='w-6 h-6' />
                  ) : (
                    <item.icon className={`w-6 h-6`} />
                  )}

                  {/* Conditional Rendering */}

                  {!collapsed && (
                    <>
                      <span className='font-medium ml-2'>{item.label}</span>
                      {item.badge && (
                        <span
                          className='px-2 py-1 text-xs bg-red-500 text-white rounded-full'>
                          {item.badge}
                        </span>
                      )}
                      {item.count && (
                        <span
                          className='px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700
                        text-slate-600 dark:text-slate-300 rounded-full'>
                          {item.count}
                        </span>
                      )}
                    </>
                  )}
                </div>
                {(!collapsed && item.submenu && !item.expanded) ? (
                  <ChevronDown id={item.id} className={`w-4 h-4 transition-transform`} />
                ) : (item.submenu && item.expanded && (<ChevronUp id={item.id} className={`w-4 h-4  transition-transform`} />))
                }
              </button>

              {/* Submenu */}
              {!collapsed && item.submenu && expandedItems.has(item.id) && (
                <>
                  <div className={`h-${(item.submenu.length * 5)} ml-8 mt-2 space-y-1 overflow-y-scroll`} ref={dropdownRef}>
                    {item.submenu.map((subItem) => {
                      return (
                        <button key={subItem.id} id={subItem.id}
                          className={`w-full text-left px-3 py-1 rounded-lg
                      text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100
                      dark:hover:bg-slate-800/50 transition-all duration-200`}>
                          {subItem.label}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </nav>


      {/* User Profile */}

      {
        !collapsed && (
          <div className='p-4 border-t border-slate-200/50 dark:border-clate-700/50'>
            <div
              className='flex items-center space-x-3 p-3 rounded-xl
         bg-slate-50 dark:bg-slate-800/50'
            >
              <img
                src={adminImg}
                alt='user'
                className='w-13 h-13 rounded-full  bg-linear-to-r from-[#55c6ff] via-[#ffffff] to-[#ff0000]'
              />

              <div className='flex-1 min-w-0'>
                <div className='flex-1 min-w-0'>
                  <p className='text-shadow-lg text-lg font-semibold text-[#1a3ac8] dark:text-white truncate'>
                    Julian Neacsu
                  </p>
                  <p className='text-sm text-slate-500 dark:text-slate-400 truncate'>
                    Administrator
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Sidebar;
