
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const VerificationPage = () => {
  const [transactionHash, setTransactionHash] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [index, setIndex] = useState("");
  const [ipfsGatewayLink, setIpfsGatewayLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_BASE_URL = "http://127.0.0.1:8000";

  const handleRetrieve = async () => {
    if (!transactionHash) {
      setErrorMessage("Please enter a transaction hash");
      return;
    }

    setErrorMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/verify-hash/?tx_hash=${transactionHash}`);

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || "Failed to retrieve data");
      }

      setFileHash(result.file_hash);
      setTimestamp(new Date(result.timestamp * 1000).toLocaleString());
      setIndex(result.index);
      setIpfsGatewayLink(result.ipfs_url);
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
  };

  return (
    <div className="container py-4">
      <div className="card p-4">
        <h2 className="text-center">Retrieve Data by Transaction Hash</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Enter transaction hash"
          value={transactionHash}
          onChange={(e) => setTransactionHash(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={handleRetrieve}>
          Retrieve
        </button>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        <div className="mt-4">
          {fileHash && (
            <p>
              <strong>File Hash:</strong> {fileHash}{" "}
              <i
                className="fas fa-copy text-primary"
                onClick={() => copyToClipboard(fileHash)}
              ></i>
            </p>
          )}
          {timestamp && <p><strong>Timestamp:</strong> {timestamp}</p>}
          {index && <p><strong>Index:</strong> {index}</p>}
          {ipfsGatewayLink && (
            <p>
              <strong>IPFS Gateway Link:</strong>{" "}
              <a href={ipfsGatewayLink} target="_blank" rel="noopener noreferrer">
                View File on IPFS
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
