import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authprovider";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");  // To store error messages
  const [loading, setLoading] = useState(false);

  const [,setAuthuser]=useAuth();

  const handelchange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handellogin = async (e) => {
    e.preventDefault();  // Prevent page reload when form is submitted
    setLoading(true);
    setError("");  // Clear previous errors

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      alert(data.message || "Login successful");
      localStorage.setItem("user",JSON.stringify(data.user))
      localStorage.setItem("token",data.token)
      setAuthuser(data.token);
    } catch (error) {
      setError(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/loginimg.gif')" }}
    >
       <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Login
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}  {/* Show error message */}
        <form className="space-y-4" onSubmit={handellogin}>
         
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.email}
            onChange={handelchange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-500 "
            value={formData.password}
            onChange={handelchange}
          />
          

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition duration-300"
          >
            {loading ? "loging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-white mt-4 text-sm">
           have no account?
          <a href="/signup" className="text-purple-300 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
