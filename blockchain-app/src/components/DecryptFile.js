// DecryptFile.js
import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const DecryptFile = ({ encryptedFileLink, fileName }) => {
  const [encryptionKey, setEncryptionKey] = useState("");
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleDecrypt = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/decrypt`, null, {
        params: {
            encryptedFileLink: encryptedFileLink,
            encryptionKey: encryptionKey,
        },
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response.data);
      setDecryptedFile(url);
      setMessage("File decrypted successfully!");
    } catch (error) {
      setMessage("Failed to decrypt the file. Please try again.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter encryption key"
        value={encryptionKey}
        onChange={(e) => setEncryptionKey(e.target.value)}
      />
      <button onClick={handleDecrypt}>Decrypt File</button>
      {message && <p>{message}</p>}
      {decryptedFile && (
        <div>
          <a href={decryptedFile} download={fileName}>
            Download Decrypted File
          </a>
        </div>
      )}
    </div>
  );
};

export default DecryptFile;