import React, { useState, useEffect } from "react";

function WebViewAndroid() {
  const [text, setText] = useState("");
  const [token, setToken] = useState("");

  const getToken = () => {
    if (!window.Android) {
      setText("Android interface is not available");
    } else {
      window.Android.getToken("12345");
      setText("message posted to native from AuthToken");
    }
  };

  const pageLoadComplete = () => {
    if (!window.Android) {
      setText("Android interface is not available");
    } else {
      window.Android.pageLoadCompleted("12345");
      setText("message posted to native from pageLoadCompleted");
    }
  };

  const exitWebView = () => {
    if (!window.Android) {
      setText("Android interface is not available");
    } else {
      window.Android.exitWebView("12345");
      setText("message posted to native from exitWebView");
    }
  };

  // Message from Android (mobile)
  function authToken(token) {
    setToken(token);
    pageLoadComplete();
  }

  useEffect(() => {
    // Sending message to mobile
    getToken();

    // Listener For getting message from mobile
    window.authToken = authToken;
  });

  return (
    <div>
      <h3>Test Web View Android</h3>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: "14px" }}>
          {token.length > 0
            ? `Auth Token : ${token.substring(0, 50) + "..."}`
            : "No Auth Token"}
        </div>
      </div>

      <div style={{ marginBottom: 50, fontSize: "14px" }}>Status: {text}</div>

      <button
        onClick={exitWebView}
        style={{ marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}
      >
        <div style={{ fontSize: "20px" }}>Exit Web View</div>
      </button>
    </div>
  );
}

export default WebViewAndroid;
