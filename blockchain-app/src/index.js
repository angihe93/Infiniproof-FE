import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 确保 index.css 存在
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// 删除 reportWebVitals 的引用

