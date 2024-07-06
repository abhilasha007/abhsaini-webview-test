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
    } else if (!webkit.messageHandlers.testHandler) {
      setText("webkit.messageHandlers.testHandler is not available");
    } else {
      webkit.messageHandlers.testHandler.postMessage("Hello, world from JS!");
      setText("message posted");
    }
  };

  useEffect(() => {
    postMessageToNative()
  }, []);

  return (
    <div>
      <button onClick={postMessageToNative} style={{ marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
        <h2>Post Message to Native code</h2>
      </button>
      <div style={{ marginBottom: 20 }}>{text}</div>
    </div>
  );
}

export default App;