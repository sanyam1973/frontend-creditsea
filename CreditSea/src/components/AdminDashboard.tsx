import React, { useEffect, useState } from "react";
import LoanList from './AdminLoanList.tsx';

interface Loan {
  borrowers: number;
  activeusers: number;
  loanscount: number;
  casedisbursed: number;
}

const VerifierDashboard: React.FC = () => {
  // const { officerId } = useParams<{ officerId: string }>(); // Extract officerId from the URL
  const [loans, setLoans] = useState<Loan[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`https://credit-sea-assignment-bck.vercel.app/api/loans/summary`);
        if (!response.ok) {
          throw new Error('Failed to fetch loans');
        }

        const data = await response.json();
        const updatedData = data.map((loan: any) => ({
          borrowers: loan.borrowUserCount,
          activeusers: loan.activeUserCount,
          loanscount: loan.approvedLoanCount,
          casedisbursed: loan.totalDisbursedloanAmount,
        }));

        setLoans(updatedData);
      } catch (err: any) {
        // setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchLoans();
  }, []); // Fetch loans on mount

  const stats = [
    { label: "Active Users", value: loans[0]?.activeusers || 0 },
    { label: "Loans", value: loans[0]?.loanscount || 0 },
    { label: "Borrowers", value: loans[0]?.borrowers || 0 },
    { label: "Cash Disbursed", value: loans[0]?.casedisbursed || 0 },
    { label: "Savings", value: 450000 },
    { label: "Cash Received", value: 1000000 },
    { label: "Repaid Loans", value: 1000000 },
    { label: "Other Accounts", value: 10 },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar - Add Sidebar component if needed */}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 bg-gray-200 flex-1 overflow-scroll">
          {/* Stats Section */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <StatCard key={index} label={stat.label} value={`${stat.value}`} />
            ))}
          </div>

          {/* Loan List */}
          <div className="flex justify-between rounded-xl mb-5 items-center border-b p-4 hover:bg-gray-100 transition-all duration-200">
            <div className="text-gray-500">User Details</div>
            <div className="text-gray-500">Customer Name</div>
            <div className="text-gray-500">Date</div>
            <div className="text-gray-500">Status</div>
            <div className="text-gray-500">Action</div>
          </div>
          <LoanList />
        </div>
      </div>
    </div>
  );
};

// Helper Component for Stats
interface StatCardProps {
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
      <h4 className="text-lg font-semibold mb-2">{label}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default VerifierDashboard;
