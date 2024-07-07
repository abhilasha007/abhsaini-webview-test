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
  const postMessageToNative = () => {
    const webkit = window.webkit;

    if (!webkit) {
      setText("webkit is not available");
    } else if (!webkit.messageHandlers) {
      setText("webkit.messageHandlers is not available");
    } else if (!webkit.messageHandlers.PageLoadCompleted) {
      setText("webkit.messageHandlers.PageLoadCompleted is not available");
    } else {
      webkit.messageHandlers.PageLoadCompleted.postMessage({ UUID: "12345"});
      setText("message posted PageLoadCompleted");
    }
  };

  const postMessageToNativeAuthToken = () => {
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
      setText("message posted AuthToken");
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
      setText("message posted ExitWebView");
    }
  };

  useEffect(() => {
    postMessageToNative()
  }, []);

  return (
    <div>
      <button onClick={postMessageToNativeAuthToken} style={{ marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
        <h2>Get Auth Token</h2>
      </button>
      <div style={{ marginBottom: 50 }}>{text}</div>

      <button onClick={exitWebView} style={{ marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
        <h2>Exit Web View</h2>
      </button>
    </div>
  );
}

export default App;