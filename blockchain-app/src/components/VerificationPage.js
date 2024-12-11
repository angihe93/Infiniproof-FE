import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import API_BASE_URL from "../config";

const VerificationPage = () => {
  const [transactionHash, setTransactionHash] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [ipfsGatewayLink, setIpfsGatewayLink] = useState("");
  const [transactionLink, setTransactionLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const [uploadLoader, setUploadLoader] = useState(false);

  const handleRetrieve = async () => {
    if (!transactionHash) {
      setErrorMessage("Please enter a transaction hash");
      return;
    }
    if (!file) {
      setErrorMessage("Please select a file");
      return;
    }
    setUploadLoader(true);

    setErrorMessage("");
    try {
      const formData = new FormData();
      formData.append("tx_hash", transactionHash);
      formData.append("encrypted_file", file);
      const response = await axios.post(`${API_BASE_URL}/verify/${transactionHash}`, formData);

      if (response.status !== 200) {
        setErrorMessage("Failed to retrieve data!");
        throw new Error(response.data.detail || "Failed to retrieve data!");
      } else if (response.status === 404) {
        setErrorMessage("File hashes do not match!");
        throw new Error(response.data.detail || "File hashes do not match!");
      }

      const result = await response.data;

      // Update the state with retrieved data
      setFileHash(result.file_hash);
      // setTimestamp(new Date(result.timestamp * 1000).toLocaleString());
      setTimestamp(result.timestamp) //timestamp is already string
      setIpfsGatewayLink(result.bc_file_link);
      setFileName(result.file_name);
      setTransactionLink("https://sepolia.etherscan.io/tx/0x"+transactionHash)
    } catch (error) {
      // setErrorMessage(`Error: ${error.message}`);
      setErrorMessage(`Error: Hashes do not match!`)
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
  };
  
  return (
    <div className="container py-4">
      <div className="card p-4">
        <h2 className="text-center">Retrieve Data by Transaction Hash</h2>
        <p className="text-center"><em>Please wait 1 minute after upload for IPFS processing before verifying.</em></p>
        <input
          type="text"
          className="form-control"
          placeholder="Enter transaction hash"
          value={transactionHash}
          onChange={(e) => setTransactionHash(e.target.value)}
        />
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
        <button className="btn btn-primary mt-3" onClick={handleRetrieve}>
          Retrieve
        </button>
        {uploadLoader && <div className="loader mt-3"></div>}
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        <div className="mt-4">
        {fileHash && <p><em>Successfully retrieved encrypted file from IPFS</em></p>}
        {fileHash && <p><em>Hash of uploaded file matches hash stored at </em><a href={transactionLink} target="_blank" rel="noopener noreferrer">{transactionHash}</a></p>}
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
          {timestamp && <p><strong>File Name:</strong> {fileName}</p>}
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
