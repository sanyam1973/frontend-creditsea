import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoanCard from "./LoanCard.tsx";

// Define the loan type
interface Loan {
  id: string;
  officer: string;
  amount: string;
  date: string;
  status: string;
}

const LoanList: React.FC = () => {
  const { officerId } = useParams<{ officerId: string }>(); // Extract officerId from the URL
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`https://credit-sea-assignment-bck.vercel.app/api/loans/id?idNumber=${12140970}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch loans');
        }
        
        const data = await response.json();
        
        // Mapping backend data to frontend format
        const formattedLoans = data.map((loan: any) => ({
          id: loan._id.toString(),
          officer: loan.loanOfficer,
          amount: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(loan.loanAmount),
          date: new Date(loan.createdAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }),
          status: loan.status,
        }));

        setLoans(formattedLoans);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [officerId]); // Added officerId to dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {loans.length > 0 ? (
        loans.map((loan) => <LoanCard key={loan.id} loan={loan} actions={true} />)
      ) : (
        <div>No loans found</div>
      )}
    </div>
  );
};

export default LoanList;
