import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3008/register", {
        user_email: email,
        user_name: name,
        user_password: password,
      });
      console.log(response.data);
      // Reset input fields after successful registration

      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
      setEmail("");
      setName("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleSumbit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        required
      />
      
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        required
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
        required
      />
      <br />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleInputChange}
        required
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;