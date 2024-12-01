// src/components/HashStorage.js

import React, { useState } from 'react';
import { storeHash } from '../services/api'; // 引入 API 函数

const HashStorage = () => {
  const [hash, setHash] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleStoreHash = async () => {
    try {
      const res = await storeHash(hash); // 调用 API
      setResponse(res.data); // 保存返回结果
      setError(null); // 清除错误
    } catch (err) {
      setError(err.response?.data?.detail || 'Error storing hash');
      setResponse(null);
    }
  };

  return (
    <div>
      <h2>Store Hash in Blockchain</h2>
      <input
        type="text"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Enter hash value"
      />
      <button onClick={handleStoreHash}>Store Hash</button>

      {response && (
        <div>
          <h4>Response:</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default HashStorage;
