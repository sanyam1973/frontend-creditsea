import React, { useState, useCallback } from "react";
import "./App.css";
import LoanList from "./components/LoanList.tsx";
import Modal from "./components/Model.tsx";
import { FaSearch } from "react-icons/fa";

// Define the form data structure
interface LoanFormData {
  fullName: string;
  loanAmount: string;
  loanTenure: string;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
}

const App: React.FC = () => {
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [formData, setFormData] = useState<LoanFormData>({
    fullName: "",
    loanAmount: "",
    loanTenure: "",
    employmentStatus: "",
    reasonForLoan: "",
    employmentAddress: "",
  });

  const [activeTab, setActiveTab] = useState<string>("borrow");

  // Toggle loan form visibility
  const handleGetLoanClick = useCallback(() => {
    setShowLoanForm(true);
  }, []);

  // Handle form field changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idNumber = 12140970;
    const apiUrl = `https://credit-sea-assignment-bck.vercel.app/api/loans?idNumber=${idNumber}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error submitting loan application");
      }

      await response.json();
      alert("Loan application submitted successfully!");
      setShowLoanForm(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the loan application.");
    }
  };

  // Render the main component
  return (
    <div className="App bg-gray-100 min-h-screen">
      <div className="p-6 bg-gray-100 flex justify-center">
        <div className="p-6 max-w-4xl w-full">
          {/* Balance Display Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 w-5 text-white p-4 rounded-full"></div>
              <div>
                <h3 className="text-black-500 uppercase text-sm font-semibold">
                  Deficit
                </h3>
                <p className="text-green-500 text-2xl font-bold">₦ 0.0</p>
              </div>
            </div>

            {/* Get A Loan Button */}
            <button
              onClick={handleGetLoanClick}
              className="bg-gray-500 hover:bg-gray-800 text-gray-100 font-semibold py-2 px-6 rounded-lg"
            >
              Get A Loan
            </button>
          </div>

          {/* Action Buttons (Tabs) */}
          <div className="flex space-x-2 mb-4">
            {["borrow", "transact", "deposit"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-4 rounded-lg shadow ${
                  activeTab === tab
                    ? "bg-green-100 text-green-700"
                    : "bg-white text-gray-700 border"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Cash
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              className="w-full border-gray-300 rounded-lg shadow p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search for loans"
            />
            <FaSearch className="absolute top-4 left-4 text-gray-500" />
          </div>

          {/* Conditionally Render the Content Based on Active Tab */}
          <div className="container max-w-5xl mx-auto px-4 py-8">
            {activeTab === "borrow" ? (
              <div className="bg-gray-300 p-7 rounded-lg">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl text-gray-700 font-semibold">
                    Applied Loans
                  </h1>
                </div>
                <div className="flex justify-between rounded-lg items-center border-b p-4 mb-4 hover:bg-gray-100 transition-all duration-200">
                  <div className="text-gray-700 font-semibold">Loan Officer</div>
                  <div className="text-gray-700 font-semibold">Amount</div>
                  <div className="text-gray-700 font-semibold">Date Applied</div>
                  <div className="text-gray-700 font-semibold">Status</div>
                </div>
                <LoanList />
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <h1 className="text-3xl font-semibold text-gray-500">
                  Coming Soon
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loan Application Modal */}
      <Modal isVisible={showLoanForm} onClose={() => setShowLoanForm(false)}>
        <LoanForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};

// LoanForm Component (Moved to a separate component for clarity)
const LoanForm: React.FC<{
  formData: LoanFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}> = ({ formData, handleChange, handleSubmit }) => (
  <form
    onSubmit={handleSubmit}
    className="p-8 space-y-6 bg-gray-100 rounded-lg h-full"
  >
    <h2 className="text-2xl font-bold mb-6 text-gray-800">APPLY FOR A LOAN</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <input
        type="text"
        name="fullName"
        placeholder="Full name as it appears on bank account"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <input
        type="number"
        name="loanAmount"
        placeholder="How much do you need?"
        value={formData.loanAmount}
        onChange={handleChange}
        className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="number"
        name="loanTenure"
        placeholder="Loan tenure (in months)"
        value={formData.loanTenure}
        onChange={handleChange}
        className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <input
        type="text"
        name="employmentStatus"
        placeholder="Employment status"
        value={formData.employmentStatus}
        onChange={handleChange}
        className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <textarea
        name="reasonForLoan"
        placeholder="Reason for loan"
        value={formData.reasonForLoan}
        onChange={handleChange}
        className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
      ></textarea>
      <input
        type="text"
        name="employmentAddress"
        placeholder="Employment address"
        value={formData.employmentAddress}
        onChange={handleChange}
        className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>

    <div className="flex justify-end space-x-2">
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-green-700"
      >
        Submit Loan Application
      </button>
    </div>
  </form>
);

export default App;
