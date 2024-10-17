import React, { useEffect, useState, useMemo } from "react";
import LoanCard from "./LoanCard.tsx";

// Define the loan type
interface Loan {
  id: string; // If your backend uses string
  officer: string;
  amount: string;
  date: string;
  status: string;
}


const LoanList: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const role = "admin"; // Can be dynamically changed

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`https://credit-sea-assignment-bck.vercel.app/api/loans/?role=${role}`);
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }

        const data = await response.json();
        const updatedLoans = data.map((loan: any) => ({
          id: loan._id,
          officer: loan.reasonForLoan,
          amount: loan.fullName,
          date: new Date(loan.createdAt).toLocaleDateString("en-IN", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          status: loan.status,
        }));

        setLoans(updatedLoans);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [role]); // Adding role as a dependency

  const loanContent = useMemo(() => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return loans.map((loan) => (
      <LoanCard key={loan.id} loan={loan} actions={true} role="admin" />
    ));
  }, [loading, error, loans]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {loanContent}
    </div>
  );
};

export default LoanList;
