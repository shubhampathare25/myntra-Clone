import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const UserLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const loginType = searchParams.get("type") || "user";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert(
        `${loginType === "admin" ? "Admin" : "User"} login successful for: ${email}`
      );
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  const handleGoogleLogin = () => {
    alert("Google login successful!");
    navigate("/");
  };

  return (
    <div className="user-login-wrapper">
      <div className="user-login-card">
        <h2 className="user-login-title">Welcome back</h2>
        <p className="user-login-subtitle">Sign in to continue shopping.</p>

        <form onSubmit={handleSubmit} className="user-login-form">
          <div className="user-login-field">
            <label htmlFor="user-email">Email</label>
            <input
              id="user-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="user-login-field">
            <label htmlFor="user-password">Password</label>
            <input
              id="user-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="user-login-submit-btn"
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <div className="user-login-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="user-google-login-btn"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="user-google-icon"
          />
          <span>Continue with Google</span>
        </button>

        <div className="user-login-footer">
          New to Myntra?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="user-create-account-link"
          >
            Create an account
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;