import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const AccountOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const email = sessionStorage.getItem("email");
      const password = sessionStorage.getItem("password");

      if (!email || !password) {
        setMessage("You are not logged in. Please log in to view your transactions.");
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/transactions/${email}`, {
          params: { password },
        });
        setTransactions(response.data);
      } catch (error) {
        setMessage(
          error.response?.data?.detail || "Failed to fetch transaction records. Please try again."
        );
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
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
                <td>{new Date(tx.timestamp).toLocaleString()}</td>
                <td>{tx.file_hash}</td>
                <td>
                  <a
                    href={tx.bc_hash_link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View
                  </a>
                </td>
                <td>
                  <a
                    href={tx.bc_file_link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-success"
                  >
                    Download
                  </a>
                </td>
                <td>
                  {tx.decrypt_key_first_last_5}
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
