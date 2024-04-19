import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log("handleSumbit");
    console.log(email);
    console.log(password);

    try {
      
      
      const response = await axios.post("http://localhost:3008/login", {
        user_email: email,
        user_password: password,
      });
      console.log(response);
       
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (e) {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSumbit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleInputChange}
        required
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleInputChange}
        required
      />
      <br />      
      <br />
      <button type="submit">Log in</button>
    </form>
  );
};

export default Login;

//enviar los parametros del body del request