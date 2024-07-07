import React from 'react';
import './App.css';
import WebViewIOS from './WebViewIOS.js';
import WebViewAndroid from './WebViewAndroid.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <Routes>
        <Route path="/android" element={<WebViewAndroid />} />
        <Route path="/ios" element={<WebViewIOS />} />
        <Route path="*" element={<Navigate to="/ios" />} />
      </Routes>
    </Router>
      </header>
    </div>
  );
}

export default App;