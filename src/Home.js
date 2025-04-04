// Home.js
import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contract";

function Home() {
  const [productId, setProductId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const checkProduct = async () => {
    setResult(null);
    setError("");

    try {
      if (!window.ethereum) throw new Error("Please install MetaMask!");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const res = await contract.verifyProduct(productId);

      if (!res[3]) {
        setError("Product not found or not authentic.");
      } else {
        setResult({
          brandName: res[0],
          manufactureDate: res[1],
          origin: res[2],
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="App">
      <h1>🔎 Product Authenticity Checker</h1>
      <input
        type="text"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={checkProduct}>Check</button>

      {result && (
        <div className="result">
          <h3>✅ Product is Authentic</h3>
          <p><strong>Brand:</strong> {result.brandName}</p>
          <p><strong>Manufactured:</strong> {result.manufactureDate}</p>
          <p><strong>Origin:</strong> {result.origin}</p>
        </div>
      )}

      {error && <p className="error">⚠️ {error}</p>}
    </div>
  );
}

export default Home;
