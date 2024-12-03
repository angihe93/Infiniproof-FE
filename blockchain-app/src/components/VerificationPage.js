import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import API_BASE_URL from "../config";

const VerificationPage = () => {
  const [transactionHash, setTransactionHash] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [ipfsGatewayLink, setIpfsGatewayLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRetrieve = async () => {
    if (!transactionHash) {
      setErrorMessage("Please enter a transaction hash");
      return;
    }

    setErrorMessage("");
    try {
      // Fetch data from the API endpoint
      const response = await fetch(`${API_BASE_URL}/verify/${transactionHash}`);

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.detail || "Failed to retrieve data");
      }

      const result = await response.json();

      // Update the state with retrieved data
      setFileHash(result.file_hash);
      // setTimestamp(new Date(result.timestamp * 1000).toLocaleString());
      setTimestamp(result.timestamp) //timestamp is already string
      setIpfsGatewayLink(result.bc_file_link);
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
        <p className="text-center"><em>Please wait 15 minutes after upload for IPFS processing before verifying.</em></p>
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
        {fileHash && <p><em>Successfully retrieved encrypted file from IPFS</em></p>}
        {fileHash && <p><em>Hash of file from IPFS matches hash stored at {transactionHash}</em></p>}
        {fileHash && <p><strong color="green"><font color="green">Verification successful!</font></strong></p>}
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
