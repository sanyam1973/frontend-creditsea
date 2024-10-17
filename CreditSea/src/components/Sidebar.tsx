import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaUsers, FaMoneyBill, FaUndo, FaSlidersH, FaFileInvoiceDollar,
  FaFileAlt, FaShieldAlt, FaCogs, FaCalendarAlt, FaFolder,
  FaSitemap, FaKey
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const menuItems = [
    { to: "/Dashboard", label: "Dashboard", Icon: FaTachometerAlt },
    { to: "/Dashboard/Loans", label: "Loans", Icon: FaMoneyBill },
    { to: "/Dashboard/Borrowers", label: "Borrowers", Icon: FaUsers },
    { to: "/Dashboard/Repayments", label: "Repayments", Icon: FaUndo },
    { to: "/Dashboard/LoanParameters", label: "Loan Parameters", Icon: FaSlidersH },
    { to: "/Dashboard/Accounting", label: "Accounting", Icon: FaFileInvoiceDollar },
    { to: "/Dashboard/Reports", label: "Reports", Icon: FaFileAlt },
    { to: "/Dashboard/Collateral", label: "Collateral", Icon: FaFolder },
    { to: "/Dashboard/AccessConfiguration", label: "Access Configuration", Icon: FaShieldAlt },
    { to: "/Dashboard/Savings", label: "Savings", Icon: FaSitemap },
    { to: "/Dashboard/Exposures", label: "Exposures", Icon: FaKey },
    { to: "/Dashboard/Enclosures", label: "Enclosures", Icon: FaFolder },
    { to: "/Dashboard/InvestorAccounts", label: "Investor Accounts", Icon: FaUsers },
    { to: "/Dashboard/Calendar", label: "Calendar", Icon: FaCalendarAlt },
    { to: "/Dashboard/Settings", label: "Settings", Icon: FaCogs }
  ];

  return (
    <div className="w-64 h-screen bg-green-900 rounded-r-xl text-white flex flex-col">
      <div className="flex items-center p-4 space-x-3">
        <div className="bg-green-600 rounded-full h-10 w-10 flex items-center justify-center">
          <span className="text-xl">👤</span>
        </div>
        <span className="text-lg font-semibold">John Doe</span>
      </div>

      <nav className="flex-1 px-2">
        {menuItems.map(({ to, label, Icon }, index) => (
          <SidebarItem key={index} to={to} label={label} Icon={Icon} />
        ))}
      </nav>
    </div>
  );
};

interface SidebarItemProps {
  Icon: React.ComponentType;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ Icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center p-2 rounded-lg cursor-pointer hover:bg-green-500 transition-colors duration-300 ${
        isActive ? 'bg-green-500' : ''
      }`
    }
  >
    <Icon />
    <span className="ml-3">{label}</span>
  </NavLink>
);

export default Sidebar;
