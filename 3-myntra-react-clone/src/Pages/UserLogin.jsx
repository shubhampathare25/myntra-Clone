import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      navigate("/");
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Normal login:", { email, password });
    navigate("/");
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Sign in to continue shopping.</p>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label login-label">Email</label>
            <input
              type="email"
              className="form-control login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label login-label">Password</label>
            <input
              type="password"
              className="form-control login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn login-submit-btn w-100">
            Login
          </button>
        </form>

        <div className="login-divider">
          <hr />
          <span>OR CONTINUE WITH</span>
          <hr />
        </div>

        <button
          type="button"
          className="btn google-login-btn w-100"
          onClick={() => handleGoogleLogin()}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.5-1.14 2.77-2.4 3.62v3.01h3.88c2.27-2.09 3.54-5.17 3.54-9.37z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.01c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.26v3.11C3.23 21.31 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.61H1.26C.46 8.21 0 10.04 0 12s.46 3.79 1.26 5.39l4.02-3.11z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.23 2.69 1.26 6.61l4.02 3.11c.95-2.85 3.6-4.97 6.72-4.97z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="login-footer-text">
          New to Myntra?{" "}
          <Link to="/register" className="login-signup-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;