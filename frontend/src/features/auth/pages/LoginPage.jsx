import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../../services/auth/authService";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("demo@college.local");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await authService.login(email, password);
      if (!result?.user) {
        throw new Error("Login failed");
      }

      onLogin?.(result.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="brand header-block">
          <div className="brandmark">U</div>
          <div>
            <b>UnionHub</b>
            <small>College Union</small>
          </div>
        </div>

        <h1>Welcome back</h1>
        <p>Sign in to continue to your campus dashboard.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@college.edu"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </label>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="demo-hint">
          Demo access: <strong>demo@college.local</strong>
        </div>
      </div>
    </div>
  );
}
