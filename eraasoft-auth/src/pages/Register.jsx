import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import UserContext from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleRegister = () => {
    fetch("https://fmb.eraasoft.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          alert("Registration failed");
          throw new Error("Registration failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Registration successful:", data);

        // Store the access token and user info in a cookie and context
        const expiresAt = Date.now() + data.token.expires_in * 60 * 1000;
        Cookies.set("access_token", data.token.access_token, {
          expires: expiresAt,
          secure: true, // set to true if using HTTPS
          sameSite: "strict", // set to 'strict' to prevent cross-site request forgery
        });
        Cookies.set("user", JSON.stringify({ name: data.user.name, email: data.user.email }), {
          expires: expiresAt,
          secure: true, // set to true if using HTTPS
          sameSite: "strict", // set to 'strict' to prevent cross-site request forgery
        });
        userContext.setUser({ name: data.user.name, email: data.user.email });

        // Redirect to the profile page
        navigate("/profile");
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister();
  };

  if (Cookies.get('access_token') && Cookies.get('user')) {
    navigate("/profile");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
        <Link to="/login">Already have account? Login</Link>
      </form>
    </div>
  );
}

export default Register;