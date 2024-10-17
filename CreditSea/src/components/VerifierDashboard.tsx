import React, { useEffect, useState } from "react";
import LoanList from './VerifierLoanList.tsx';

// Define the Loan interface
interface Loan {
  borrowers: number;
  activeusers: number;
  loanscount: number;
  casedisbursed: number;
}

const VerifierDashboard: React.FC = () => {
  // const { officerId } = useParams<{ officerId: string }>();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch loans data
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch loans data on component mount
  useEffect(() => {
    fetchLoans();
  }, []);

  // Display a loading spinner or error message if applicable
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Destructure loans data for cleaner JSX
  const loanData = loans[0];

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="p-6 bg-gray-200 flex-1 overflow-scroll">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <StatCard label="Cash Received" value="1,000,000" />
            <StatCard label="Loans" value={loanData?.loanscount?.toString() || "0"} />
            <StatCard label="Borrowers" value={loanData?.borrowers?.toString() || "0"} />
            <StatCard label="Cash Disbursed" value={loanData?.casedisbursed?.toString() || "0"} />
            <StatCard label="Savings" value="450,000" />
            <StatCard label="Repaid Loans" value="30" />
          </div>

          {/* Loan List */}
          <div className="flex justify-between items-center rounded-lg border-b p-4 hover:bg-gray-100 transition-all duration-200">
            <div className="text-gray-700">User Recent Activity</div>
            <div className="text-gray-700">Customer Name</div>
            <div className="text-gray-700">Date</div>
            <div className="text-gray-700">Status</div>
            <div className="text-gray-700">Action</div>
          </div>
          <LoanList />
        </div>
      </div>
    </div>
  );
};

// StatCard component for displaying statistics
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
