import { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
    alert(`Admin login successful for: ${email}`);
    setLoading(false);
  }, 1500);
};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "75vh",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          width: "400px",
          textAlign: "left",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#282c3f",
          }}
        >
          Admin Login
        </h2>
        <p style={{ fontSize: "14px", color: "#535766", marginBottom: "25px" }}>
          Login to manage Myntra-Clone products
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{ fontSize: "13px", fontWeight: "600", color: "#282c3f" }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="admin@myntra.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "10px 12px",
                borderRadius: "4px",
                border: "1px solid #d4d5d9",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{ fontSize: "13px", fontWeight: "600", color: "#282c3f" }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "10px 12px",
                borderRadius: "4px",
                border: "1px solid #d4d5d9",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              backgroundColor: "#2874f0",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "15px",
              marginTop: "5px",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
