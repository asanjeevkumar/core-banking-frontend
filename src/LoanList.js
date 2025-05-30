import React, { useState, useEffect } from 'react';

function LoanList() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch('/loans') // Assuming your Flask app is running on the same domain/port
      .then(response => response.json())
      .then(data => {
        setLoans(data);
        console.log(data); // Log the data for now
      })
      .catch(error => console.error('Error fetching loans:', error));
  }, []);

  return (
    <div>
      <h2>Loan List</h2>
      <ul>
        {loans.map(loan => (
          <li key={loan.id}>{loan.id} - Amount: {loan.amount}</li> // Assuming loans have 'id' and 'amount' attributes
        ))}
      </ul>
    </div>
  );
}

export default LoanList;