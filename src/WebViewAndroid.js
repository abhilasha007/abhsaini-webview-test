import React, { useState, useEffect, useCallback } from "react";

function WebViewAndroid() {
  const [text, setText] = useState("");
  const [token, setToken] = useState("");

  const getToken = () => {
    if (!window.Android) {
      setText("Android interface is not available");
    } else {
      window.Android.getToken("getToken12345");
      setText("message posted to native from AuthToken");
    }
  };

  const pageLoadCompleted = () => {
    if (!window.Android) {
      setText("Android interface is not available");
    } else {
      window.Android.pageLoadCompleted("pageLoadCompleted12345");
      setText("message posted to native from pageLoadCompleted");
    }
  };

  const exitWebView = () => {
    if (!window.Android) {
      setText("Android interface is not available");
    } else {
      window.Android.exitWebView("exitWebView12345");
      setText("message posted to native from exitWebView");
    }
  };

  // Message from Android (mobile)
  const authToken = useCallback((token) => {
    setToken(token);
    pageLoadCompleted();
  }, []); // No dependencies, authToken is constant

  useEffect(() => {
    // Sending message to mobile
    getToken();
    console.log("useEffect called");

    // Listener For getting message from mobile
    window.authToken = authToken;
  }, [authToken]);

  return (
    <div>
      <h3>Test Web View Android</h3>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: "14px", whiteSpace: "normal", overflowWrap: "break-word", maxWidth: "350px" }}>
          {
            token.length > 0
              ? <>
                  <span style={{ fontWeight: "bold" }}>Auth Token Received from Native:</span> {token.substring(0, 100) + "..."}
                </>
              : <div>No Auth Token Received</div>
          }
        </div>
      </div>

      <div style={{ marginBottom: 50, fontSize: "14px" }}><span style={{ fontWeight: "bold" }}>Status:</span> {text}</div>

      <button
        onClick={exitWebView}
        style={{ marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}
      >
        <div style={{ fontSize: "15px", fontWeight: "bold" }}>Exit Web View</div>
      </button>
    </div>
  );
}

export default WebViewAndroid;
