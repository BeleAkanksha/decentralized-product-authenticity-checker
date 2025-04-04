// Admin.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './contract';

function Admin() {
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ id: "", brand: "", date: "", origin: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      if (!window.ethereum) return;
  
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const user = await signer.getAddress();
  
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const owner = await contract.owner();

        console.log("User:", user);
        console.log("Owner:", owner);
  
        if (user.toLowerCase() !== owner.toLowerCase()) {
          alert("🚫 Access denied. Admins only.");
          navigate("/"); // Redirect immediately
        } else {
          setIsOwner(true);
        }
      } catch (err) {
        console.error("Error checking admin:", err);
        navigate("/");
      }
    };
  
    checkAdmin();
  }, [navigate]);
  

  const registerProduct = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.addProduct(
        form.id,
        form.brand,
        form.date,
        form.origin
      );
      await tx.wait();

      alert("✅ Product registered!");
      setForm({ id: "", brand: "", date: "", origin: "" });
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h2>🛠 Admin: Register Product</h2>

      {isOwner && (
        <>
          <input
            placeholder="Product ID"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
          <input
            placeholder="Brand"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
          <input
            placeholder="Manufacture Date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            placeholder="Origin"
            value={form.origin}
            onChange={(e) => setForm({ ...form, origin: e.target.value })}
          />
          <button onClick={registerProduct}>Register</button>
          <br />
          <button onClick={() => navigate("/")}>🔍 Go to Product Checker</button>
        </>
      )}

      {error && <p className="error">⚠️ {error}</p>}
    </div>
  );
}

export default Admin;
