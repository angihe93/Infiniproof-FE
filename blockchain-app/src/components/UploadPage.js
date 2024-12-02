
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [transactionHash, setTransactionHash] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [etherscanLink, setEtherscanLink] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadLoader, setUploadLoader] = useState(false);

  const API_BASE_URL = "http://127.0.0.1:8000";

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file");
      return;
    }

    setUploadLoader(true);
    setErrorMessage("");
    setStatusMessage("Uploading and processing...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/upload-to-ipfs/`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || "Upload failed");
      }

      setTransactionHash(result.tx_hash);
      setTimestamp(new Date(result.timestamp * 1000).toLocaleString());
      setEtherscanLink(result.etherscan_url);
      setIpfsHash(result.ipfs_hash);
      setStatusMessage("Upload successful!");
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setUploadLoader(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
  };

  return (
    <div className="container py-4">
      <div className="card p-4 mb-4">
        <h2 className="text-center">File Upload and Blockchain Submission</h2>
        <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="dropzone border p-3 text-center"
              style={{ cursor: "pointer" }}
            >
              <input {...getInputProps()} />
              <p>Drag & drop your file here, or click to select one</p>
            </div>
          )}
        </Dropzone>
        {file && <p className="mt-3"><strong>Selected File:</strong> {file.name}</p>}
        <button className="btn btn-primary mt-3" onClick={handleUpload}>
          Upload and Submit to Blockchain
        </button>
        {uploadLoader && <div className="loader mt-3"></div>}
        {statusMessage && <p className="text-info mt-3">{statusMessage}</p>}
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        <div className="mt-4">
          {transactionHash && (
            <p>
              <strong>Transaction Hash:</strong> {transactionHash}{" "}
              <i
                className="fas fa-copy text-primary"
                onClick={() => copyToClipboard(transactionHash)}
              ></i>
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
              <i
                className="fas fa-copy text-primary"
                onClick={() => copyToClipboard(ipfsHash)}
              ></i>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
