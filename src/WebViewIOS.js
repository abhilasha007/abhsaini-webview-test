import React, { useEffect, useState, useCallback } from "react";

function WebViewIOS() {
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
      webkit.messageHandlers.PageLoadCompleted.postMessage({ UUID: "12345" });
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
        callbackId: "1720344291577-1000",
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

  // Memoize authToken using useCallback
  const authToken = useCallback((token) => {
    setToken(token);
    postMessageToNativePageLoadComplete();
  }, []); // No dependencies, authToken is constant

  useEffect(() => {
    // Sending message to mobile
    postMessageToNativeGetAuthToken();
    console.log("useEffect called");

    // Listener For getting message from mobile
    window.authToken = authToken;
  }, [authToken]);

  return (
    <div>
      <h3>Test Web View iOS</h3>
      {/* 
        <button onClick={postMessageToNativeGetAuthToken} style={{ marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
          <h2>Get Auth Token</h2>
        </button> 
      */}

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

export default WebViewIOS;
