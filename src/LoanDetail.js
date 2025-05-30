import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming react-router-dom is used for routing

function LoanDetail() {
  const { loan_id } = useParams(); // Get loan_id from URL parameters
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentAmount, setPaymentAmount] = useState('');

  useEffect(() => {
    fetch(`/loans/${loan_id}`) // Fetch loan details from the backend
      .then(response => response.json())
      .then(data => {
        setLoan(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching loan details:', error);
        setLoading(false);
      });
  }, [loan_id]); // Refetch when loan_id changes

  const handlePaymentSubmit = () => {
    fetch(`/loans/${loan_id}/repay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payment_amount: parseFloat(paymentAmount) }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Repayment processed:', data);
        // Optionally, update the loan details after successful repayment
        // e.g., refetch the loan details
      })
      .catch(error => {
        console.error('Error processing repayment:', error);
      });
  };

  if (loading) {
    return <div>Loading loan details...</div>;
  }

  return (
    <div>
      <h2>Loan Detail</h2>
      {loan ? (
        <div>
          <p>Loan ID: {loan.id}</p>
          <p>Amount: {loan.amount}</p>
          <p>Interest Rate: {loan.interest_rate}</p>
          <p>Term: {loan.term}</p>
          <p>Start Date: {loan.start_date}</p>
          <p>Status: {loan.status}</p>
          {/* Display other loan details as needed */}
        </div>
      ) : (
        <p>Loan not found.</p>
      )}
      {loan && loan.status === 'active' && ( // Only show repayment form for active loans
        <div>
          <h3>Process Repayment</h3>
          <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="Enter payment amount" />
          <button onClick={handlePaymentSubmit}>Submit Repayment</button>
        </div>
      )}
    </div>
  );
}

export default LoanDetail;