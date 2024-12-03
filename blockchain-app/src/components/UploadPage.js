import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import API_BASE_URL from "../config";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [transactionHash, setTransactionHash] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [etherscanLink, setEtherscanLink] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadLoader, setUploadLoader] = useState(false);


  const generateKey = async () => {
    return crypto.getRandomValues(new Uint8Array(32)); // 256-bit key
  };

  const generateNonce = async () => {
    return crypto.getRandomValues(new Uint8Array(12)); // 96-bit nonce
  };

  const createHash = async (data) => {
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const encryptFile = async (file, key) => {
    const nonce = await generateNonce();
    const fileContent = await file.arrayBuffer();
    const dataToEncrypt = new Uint8Array([
      ...new TextEncoder().encode(file.name + "\x00"),
      ...new Uint8Array(fileContent),
    ]);

    const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "AES-GCM" }, false, ["encrypt"]);
    const encryptedContent = await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce }, cryptoKey, dataToEncrypt);

    return { nonce, encryptedFile: new Uint8Array(encryptedContent) };
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file");
      return;
    }

    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");

    if (!email || !password) {
      setErrorMessage("You are not logged in. Please log in to upload files.");
      return;
    }

    setUploadLoader(true);
    setErrorMessage("");
    setStatusMessage("Encrypting and uploading hash to Etherium, file to IPFS...");

    try {
      const key = await generateKey();
      const { nonce, encryptedFile } = await encryptFile(file, key);

      const encryptedData = new Uint8Array([...nonce, ...encryptedFile]);
      const fileHash = await createHash(encryptedData);

      const decryptKeyFirstLast = `${Array.from(key)
        .slice(0, 5)
        .map((b) => b.toString(16))
        .join("")}...${Array.from(key)
        .slice(-5)
        .map((b) => b.toString(16))
        .join("")}`;

      const formData = new FormData();
      formData.append("encrypted_file", new Blob([encryptedData]));

      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        params: {
          email,
          password,
          decrypt_key_first_last_5: decryptKeyFirstLast,
        },
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = response.data;

      setTransactionHash(result.tx_hash);
      setTimestamp(result.timestamp);
      setEtherscanLink(result.etherscan_url);
      setIpfsHash(result.ipfs_hash);
      setStatusMessage("Upload successful!");
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Upload failed. Please try again.";
      setErrorMessage(errorMsg);
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
