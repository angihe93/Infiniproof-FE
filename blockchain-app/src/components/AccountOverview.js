import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        setMessage('Failed to fetch transaction records. Please try again.');
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
        Account Overview
      </h2>
      <table className="table table-striped table-hover shadow-lg mt-4">
        <thead className="table-dark">
          <tr>
            <th>Transaction Time</th>
            <th>Hash Value</th>
            <th>Blockchain Link</th>
            <th>File Link</th>
            <th>Key (First 5...Last 5)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length ? (
            transactions.map((tx, index) => (
              <tr key={index}>
                <td>{new Date(tx.date).toLocaleString()}</td>
                <td>{tx.hash}</td>
                <td>
                  <a
                    href={tx.blockchainLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View
                  </a>
                </td>
                <td>
                  <a
                    href={tx.fileLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-success"
                  >
                    Download
                  </a>
                </td>
                <td>
                  {tx.keyFirst5}...{tx.keyLast5}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No transaction records available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {message && <p className="text-danger text-center mt-3">{message}</p>}
    </div>
  );
};

export default AccountOverview;

