import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Test Web View</h3>
        <WebView />
      </header>
    </div>
  );
}

function WebView() {
  const [text, setText] = useState("");
  const [token, setToken] = useState("");

  const postMessageToNativePageLoadComplete = () => {
    const webkit = window.webkit;

    if (!webkit) {
      setText("webkit is not available");
    } else if (!webkit.messageHandlers) {
      setText("webkit.messageHandlers is not available");
    } else if (!webkit.messageHandlers.PageLoadCompleted) {
      setText("webkit.messageHandlers.PageLoadCompleted is not available");
    } else {
      webkit.messageHandlers.PageLoadCompleted.postMessage({ UUID: "12345"});
      setText("message posted from PageLoadCompleted");
    }
  };

  const postMessageToNativeGetAuthToken = () => {
    const webkit = window.webkit;

    if (!webkit) {
      setText("webkit is not available");
    } else if (!webkit.messageHandlers) {
      setText("webkit.messageHandlers is not available");
    } else if (!webkit.messageHandlers.AuthToken) {
      setText("webkit.messageHandlers.AuthToken is not available");
    } else {
      webkit.messageHandlers.AuthToken.postMessage({
        UUID: "12345",
        callbackId: "1720344291577-1000"
      });
      setText("message posted from AuthToken");
    }
  };

  const exitWebView = () => {
    const webkit = window.webkit;

    if (!webkit) {
      setText("webkit is not available");
    } else if (!webkit.messageHandlers) {
      setText("webkit.messageHandlers is not available");
    } else if (!webkit.messageHandlers.ExitWebView) {
      setText("webkit.messageHandlers.ExitWebView is not available");
    } else {
      webkit.messageHandlers.ExitWebView.postMessage({ UUID: "12345" });
      setText("message posted from ExitWebView");
    }
  };

  // Message from iOS (mobile)
  function authToken(token) {
    setToken(token);
  }

  useEffect(() => {
    // Sending message to mobile
    postMessageToNativeGetAuthToken()
    postMessageToNativePageLoadComplete()

    // Listener For getting message from mobile
    window.authToken = authToken;
  }, []);

  return (
    <div>
      {/* 
      <button onClick={postMessageToNativeGetAuthToken} style={{ marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
        <h2>Get Auth Token</h2>
      </button> 
      */}

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: '14px' }}>     
          {token.length > 0 ? "Auth Token : " : "No Auth Token"}  {token.substring(0, 50) + "..."}</div>
      </div>

      <div style={{ marginBottom: 50, fontSize: '14px' }}>
        Status: {text}
      </div>

      <button onClick={exitWebView} style={{ marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{fontSize: '20px' }}>Exit Web View</div>
      </button>
    </div>
  );
}

export default App;