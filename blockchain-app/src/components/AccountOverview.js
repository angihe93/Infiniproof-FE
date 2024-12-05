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

        const transactionData = response.data.map((tx) => ({
          ...tx,
          timestamp: tx.timestamp, // Set default value as "N/A" if timestamp is missing
        }));

        console.log("Fetched Transactions:", transactionData);
        setTransactions(transactionData);
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
            <th>Filename</th>
            <th>Encrypted File Hash</th>
            <th>Blockchain Link</th>
            <th>File Link</th>
            <th>Key (First 5...Last 5)</th>
            <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length ? (
            transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.file_name}</td> {/* Filename */}
                <td>{tx.file_hash}</td> {/* Encrypted file hash */}
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
                <td>{tx.decrypt_key_first_last_5}</td> {/* Key */}
                <td>{tx.timestamp}</td> {/* Display raw timestamp */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
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
