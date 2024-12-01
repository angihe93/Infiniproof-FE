import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [transactionHash, setTransactionHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [etherscanLink, setEtherscanLink] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [retrieveTimestamp, setRetrieveTimestamp] = useState("");
  const [retrieveIndex, setRetrieveIndex] = useState("");
  const [ipfsGatewayLink, setIpfsGatewayLink] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [retrieveErrorMessage, setRetrieveErrorMessage] = useState("");
  const [uploadLoader, setUploadLoader] = useState(false);

  const API_BASE_URL = "http://127.0.0.1:8000";

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  // Handle file upload and blockchain submission
  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file");
      return;
    }

    setUploadLoader(true);
    setErrorMessage("");
    setStatusMessage("Uploading and processing...");

    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);

      // Upload file to IPFS
      const ipfsResponse = await fetch(`${API_BASE_URL}/upload-to-ipfs/`, {
        method: "POST",
        body: formData,
      });

      const ipfsResult = await ipfsResponse.json();
      if (!ipfsResponse.ok) {
        throw new Error(ipfsResult.detail || "IPFS upload failed");
      }

      // Store hash on blockchain
      const fileHash = "mocked-file-hash"; // Replace this with the actual hash logic
      const blockchainResponse = await fetch(`${API_BASE_URL}/store-hash/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash_value: fileHash }),
      });

      const blockchainResult = await blockchainResponse.json();
      if (!blockchainResponse.ok) {
        throw new Error(blockchainResult.detail || "Blockchain submission failed");
      }

      setTxHash(blockchainResult.tx_hash);
      setTimestamp(new Date(blockchainResult.timestamp * 1000).toLocaleString());
      setEtherscanLink(blockchainResult.etherscan_url);
      setIpfsHash(ipfsResult.ipfs_hash);
      setStatusMessage("Upload and blockchain submission successful!");
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
      setStatusMessage("");
    } finally {
      setUploadLoader(false);
    }
  };

  // Retrieve data by transaction hash
  const retrieveData = async () => {
    if (!transactionHash) {
      setRetrieveErrorMessage("Please enter a transaction hash");
      return;
    }

    setRetrieveErrorMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/verify-hash/?tx_hash=${transactionHash}`, {
        method: "GET",
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || "Failed to retrieve data");
      }

      setFileHash(result.hash);
      setRetrieveTimestamp(new Date(result.timestamp * 1000).toLocaleString());
      setRetrieveIndex(result.index);


      const ipfsMockHash = "mocked-ipfs-hash"; // Replace with actual logic
      setIpfsGatewayLink(`https://gateway.pinata.cloud/ipfs/${ipfsMockHash}`);
    } catch (error) {
      setRetrieveErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container py-4">
      {/* Upload Section */}
      <div className="card p-4 mb-4">
        <h2>File Upload and Blockchain Submission</h2>
        <input type="file" onChange={handleFileChange} />
        <button className="btn btn-primary mt-3" onClick={handleUpload}>
          Upload and Submit to Blockchain
        </button>
        {uploadLoader && <div className="loader mt-3"></div>}
        {statusMessage && <p className="text-info mt-3">{statusMessage}</p>}
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

        <div className="mt-4">
          {txHash && (
            <p>
              <strong>Transaction Hash:</strong> {txHash}{" "}
              <i className="fas fa-copy text-primary" onClick={() => copyToClipboard(txHash)}></i>
            </p>
          )}
          {timestamp && <p><strong>Timestamp:</strong> {timestamp}</p>}
          {etherscanLink && (
            <p>
              <strong>Transaction Link:</strong>{" "}
              <a href={etherscanLink} target="_blank" rel="noopener noreferrer">
                View on Etherscan
              </a>
            </p>
          )}
          {ipfsHash && (
            <p>
              <strong>IPFS Hash:</strong> {ipfsHash}{" "}
              <i className="fas fa-copy text-primary" onClick={() => copyToClipboard(ipfsHash)}></i>
            </p>
          )}
        </div>
      </div>

      {/* Retrieve Section */}
      <div className="card p-4">
        <h2>Retrieve Data by Transaction Hash</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Enter transaction hash"
          value={transactionHash}
          onChange={(e) => setTransactionHash(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={retrieveData}>
          Retrieve
        </button>
        {retrieveErrorMessage && <p className="text-danger mt-3">{retrieveErrorMessage}</p>}

        <div className="mt-4">
          {fileHash && <p><strong>File Hash:</strong> {fileHash}</p>}
          {retrieveTimestamp && <p><strong>Timestamp:</strong> {retrieveTimestamp}</p>}
          {retrieveIndex && <p><strong>Index:</strong> {retrieveIndex}</p>}
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

export default UploadPage;

