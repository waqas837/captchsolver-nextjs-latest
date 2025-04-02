"use client";
import { CONFIG } from "@/lib/Config";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [apiKey, setApiKey] = useState("");
  const [balance, setBalance] = useState("$0.00");
  const [requestsRemaining, setRequestsRemaining] = useState(
    "1000 requests remaining"
  );
  const [showApiKey, setShowApiKey] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      // Only run on client side

      const apiEndpoint = `${CONFIG.backendUrl}/user/getuserinfo`;
      const userToken =
        typeof window !== "undefined" && localStorage.getItem("userToken");

      if (!userToken) return; // Exit if no token

      try {
        const response = await fetch(apiEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        const data = await response.json();
        if (data.result && data.result[0]) {
          const user = data.result[0];
          setApiKey(user.BalanceApiKey || "");
          setUsername(user.username || "User");
          setBalance(user.balance ? `$${user.balance}` : "$0.00");
          setRequestsRemaining(
            user.totalAmountRequestsRemains || "0 requests remaining"
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <div className="main-center-content-m-left">
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            marginTop: "50px",
            background: "#0d1824",
            padding: "30px",
            borderRadius: "10px",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ marginBottom: "10px", color: "white" }}>Your API Key</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              readOnly
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #586361",
                borderRadius: "5px",
                textAlign: "center",
                fontSize: "16px",
              }}
            />
            <span
              onClick={() => setShowApiKey(!showApiKey)}
              style={{
                position: "absolute",
                right: "15px",
                cursor: "pointer",
                fontSize: "18px",
                color: "#33b89f",
              }}
            >
              {showApiKey ? "👁️‍🗨️" : "👁️"}
            </span>
          </div>

          <h2 style={{ color: "white", marginTop: "20px" }}>Your Balance</h2>
          <p
            id="balance"
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#28a745",
              background: "#e6f8e6",
              padding: "8px 15px",
              display: "inline-block",
              borderRadius: "5px",
            }}
          >
            {balance}
          </p>

          <button
            id="add-balance"
            style={{
              backgroundColor: "#33b89f",
              color: "white",
              padding: "12px 25px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "15px",
              transition: "background 0.3s ease",
            }}
          >
            Add Balance
          </button>

          <h2 style={{ color: "#33B89F", marginTop: "20px" }}>
            API Requests Remaining
          </h2>
          <p
            id="totalAmountRequestsRemains"
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#dc3545",
              background: "#fdecea",
              padding: "8px 15px",
              display: "inline-block",
              borderRadius: "5px",
            }}
          >
            {requestsRemaining}
          </p>
        </div>
      </div>
      <div className="copyright-area-bottom">
        <p>
          <Link href="/">OPENUP©</Link> 2024. All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default UserDashboard;
