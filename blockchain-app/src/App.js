import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./components/MainPage";
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import AccountOverview from './components/AccountOverview';
import UploadPage from './components/UploadPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LandingPage />} />
        <Route path="/account-overview" element={<AccountOverview />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </Router>
  );
};

export default App;

