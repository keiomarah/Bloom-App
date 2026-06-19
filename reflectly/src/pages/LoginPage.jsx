import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/reflectly-logo.png";
import axios from "axios";
import { FlashMessage } from "../components/FlashMessage";
import { AuthLayout } from "../components/AuthLayout";
import toast from "react-hot-toast";

function LoginForm({ setFlashMessage, setCategory }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true },
      );

      toast.success(response.data.message);

      navigate("/homedashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <img src={logo} className="login-logo" />
      <h1 className="login-header-text">Welcome back.</h1>
      <p className="secondary-text">
        Enter your credentials to access your account.
      </p>
      <form noValidate onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className={errors.username ? "invalid-input" : ""}
          required
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => {
            if (username.length < 1) {
              setErrors((prev) => ({
                ...prev,
                username: "Please enter a valid username.",
              }));
            }
          }}
          onFocus={() => {
            setErrors((prev) => ({ ...prev, username: "" }));
          }}
        />
        {errors.username && (
          <p className="invalid-input-text">{errors.username}</p>
        )}
        <label>Password </label>
        <input
          className={errors.password ? "invalid-input" : ""}
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          onBlur={() => {
            if (password.length < 1) {
              setErrors((prev) => ({
                ...prev,
                password: "Please enter a password.",
              }));
            }
          }}
          onFocus={() => {
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
        />
        {errors.password && (
          <p className="invalid-input-text">{errors.password}</p>
        )}
        <button className="btn-primary login-btn">Log in</button>
        <p className="secondary-text">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="register-link">
            Register Now
          </Link>
        </p>
      </form>
    </>
  );
}

export function LoginPage() {
  const [flashMessage, setFlashMessage] = useState("");
  const [category, setCategory] = useState("");
  return (
    <AuthLayout
      flashMessage={flashMessage}
      category={category}
      setFlashMessage={setFlashMessage}
    >
      <LoginForm setFlashMessage={setFlashMessage} setCategory={setCategory} />
    </AuthLayout>
  );
}
