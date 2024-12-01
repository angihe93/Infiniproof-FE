// src/services/api.js

import axios from 'axios';
import API_BASE_URL from '../config'; // 确保路径正确

// Function to store hash in the blockchain
export const storeHash = async (hash) => {
  return await axios.post(`${API_BASE_URL}/store-hash/`, { hash_value: hash });
};

// Function to verify hash
export const verifyHash = async (txHash) => {
  return await axios.get(`${API_BASE_URL}/verify-hash/`, {
    params: { tx_hash: txHash },
  });
};

// Function to upload files to IPFS
export const uploadToIPFS = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return await axios.post(`${API_BASE_URL}/upload-to-ipfs/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
