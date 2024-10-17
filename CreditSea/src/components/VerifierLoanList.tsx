import React, { useEffect, useState, useCallback } from "react";
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
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use useCallback to memoize the fetchLoans function
  const fetchLoans = useCallback(async () => {
    try {
      const response = await fetch(`https://credit-sea-assignment-bck.vercel.app/api/loans/?role=${"verifier"}`);
      if (!response.ok) {
        throw new Error("Failed to fetch loans");
      }

      const data = await response.json();
      const updatedData = data.map((loan: any) => ({
        id: loan._id.toString(), // Backend _id mapped to id and converted to string
        officer: loan.reasonForLoan, // Mapping reasonForLoan to officer
        amount: loan.fullName, // Mapping fullName
        date: new Date(loan.createdAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" }), // Format date
        status: loan.status, // Map status
      }));

      setLoans(updatedData);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies, only runs on mount

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  if (loading) return <div>Loading loans, please wait...</div>;
  if (error) return <div>Error: {error}</div>;

  if (loans.length === 0) return <div>No loans available</div>;

  console.log("Verifier Loan List", loans);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {loans.map((loan) => (
        <LoanCard key={loan.id} loan={loan} actions={true} role="verifier" />
      ))}
    </div>
  );
};

export default LoanList;
