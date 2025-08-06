"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./page.module.css";

interface EchoResponse {
  message: string;
}

// API function to fetch data from Express server
const fetchHelloWorld = async () => {
  const response = await fetch("http://localhost:3001/api/hello");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// API function to echo text
const echoText = async (text: string) => {
  const response = await fetch("http://localhost:3001/api/echo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [echoResponse, setEchoResponse] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["hello"],
    queryFn: fetchHelloWorld,
  });

  const echoMutation = useMutation({
    mutationFn: echoText,
    onSuccess: (data: EchoResponse) => {
      setEchoResponse(data.message);
    },
    onError: (error: Error) => {
      setEchoResponse(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      echoMutation.mutate(inputText);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Display API response */}
        <div
          style={{
            margin: "20px 0",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h2>API Response from Express Server:</h2>
          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
          {data && (
            <div>
              <p>
                <strong>Message:</strong> {data.message}
              </p>
            </div>
          )}
        </div>

        {/* Echo input form */}
        <div
          style={{
            margin: "20px 0",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h2>Echo Text to Server:</h2>
          <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to echo..."
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "300px",
                marginRight: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <button
              type="submit"
              disabled={echoMutation.isPending}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {echoMutation.isPending ? "Sending..." : "Send"}
            </button>
          </form>

          {echoResponse && (
            <div style={{ marginTop: "10px" }}>
              <p>
                <strong>Server Response:</strong> {echoResponse}
              </p>
            </div>
          )}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
