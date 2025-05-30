import React, { useState } from 'react';

function AddLoanForm() {
  const [loanData, setLoanData] = useState({
    borrowerName: '',
    loanAmount: '',
    interestRate: '',
    term: '',
    startDate: '', // Added start date
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loanData),
      });
      if (response.ok) {
        // Handle successful loan creation (e.g., clear form, show success message)
        console.log('Loan created successfully!');
        setLoanData({
          borrowerName: '',
          loanAmount: '',
          interestRate: '',
          term: '',
          startDate: '',
        });
      } else {
        // Handle errors (e.g., show error message)
        console.error('Failed to create loan');
      }
    } catch (error) {
      console.error('Error creating loan:', error);
    }
  };

  return (
    <div>
      <h2>Add New Loan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="borrowerName">Borrower Name:</label>
          <input type="text" id="borrowerName" name="borrowerName" value={loanData.borrowerName} onChange={handleChange} required />
        </div>
        {/* Add more input fields for loanAmount, interestRate, term, and startDate */}
        <div>
          <button type="submit">Add Loan</button>
        </div>
      </form>
    </div>
  );
}

export default AddLoanForm;