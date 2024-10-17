import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Define props structure
interface LoanCardProps {
  loan: {
    id: string;
    officer: string;
    amount: string;
    date: string;
    status: string;
  };
  actions: boolean;
  role?: "verifier" | "admin";
}

// Status color based on loan status
const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    APPROVED: "bg-blue-500 text-white",
    PENDING: "bg-yellow-500 text-white",
    REJECTED: "bg-red-500 text-white",
  };
  return statusColors[status] || "bg-gray-500 text-white";
};

const LoanCard: React.FC<LoanCardProps> = ({ loan, actions, role }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [status, setStatus] = useState(loan.status);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const actionOptions = role === "verifier"
    ? ["Verify", "Reject"]
    : role === "admin"
    ? ["Accept", "Reject"]
    : [];

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle action and status update
  const handleAction = async (action: string) => {
    const statusMap: Record<string, string> = {
      Verify: "VERIFIED",
      Reject: "REJECTED",
      Accept: "APPROVED",
    };
    const updatedStatus = statusMap[action];
    
    try {
      const endpoint = role === "verifier"
        ? "status-verifier"
        : "status-admin";
      await axios.patch(`https://credit-sea-assignment-bck.vercel.app/api/loans/${endpoint}?_id=${loan.id}`, {
        status: updatedStatus,
        loanOfficer: role === "verifier" ? "Jon Okoh" : undefined,
      });
      setStatus(updatedStatus);
    } catch (error) {
      console.error("Error updating loan status", error);
    }
  };

  return (
    <div className="flex justify-between items-center border-b p-4 transition-all duration-200 relative">
      <div className="flex items-center">
        <img
          src={`https://i.pravatar.cc/40?u=${loan.officer}`}
          alt={loan.officer}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="text-sm font-medium">{loan.officer}</h3>
          <p className="text-xs text-gray-500">Updated 1 day ago</p>
        </div>
      </div>
      <div className="text-sm text-gray-700">{loan.amount}</div>
      <div className="text-sm text-gray-500">{loan.date}</div>
      <span className={`px-4 py-2 rounded-full text-sm ${getStatusColor(status)}`}>
        {status}
      </span>

      {actions && role && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="ml-4 w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-300 focus:outline-none"
          >
            &#x22EE;
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 z-10 bg-white shadow-md rounded-md w-40">
              {actionOptions.map((action) => (
                <li
                  key={action}
                  onClick={() => handleAction(action)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  {action}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanCard;
