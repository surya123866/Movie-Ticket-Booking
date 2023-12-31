import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onLoginSuccess = () => {
    navigate("/home");
    localStorage.setItem("USERNAME", username);
    localStorage.setItem("PASSWORD", password);
  };

  const onLoginFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();

    const predefinedUsername = "surya";
    const predefinedPassword = "surya@2023";

    if (username === predefinedUsername && password === predefinedPassword) {
      onLoginSuccess();
    } else {
      onLoginFailure("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h1>ReelBook</h1>
      <form className="login-form-container" onSubmit={onSubmitForm}>
        <h1 className="heading-login">Login</h1>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="input-field"
            type="text"
            id="username"
            placeholder="surya"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="input-field"
            type="password"
            id="password"
            placeholder="surya@2023"
          />
        </div>
        {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
