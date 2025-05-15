import { Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASEURL } from "../config/utild";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");  // To store error messages
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelchange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handelsignup = async (e) => {
    e.preventDefault();  // Prevent page reload when form is submitted
    setLoading(true);
    setError("");  // Clear previous errors

    try {
      const { data } = await axios.post(
        `${BASEURL}/user/signup`,
        {
          firstname: formData.firstName,
          lastname: formData.lastName, 
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      alert(data.message || "Signup successful");
      navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('../ANIMATION.gif')" }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Sign Up
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}  {/* Show error message */}
        <form className="space-y-4" onSubmit={handelsignup}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.firstName}
            onChange={handelchange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.lastName}
            onChange={handelchange}
          />
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
            className="w-full px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-500 relative"
            value={formData.password}
            onChange={handelchange}
          />
          <span className="absolute right-10 top-64 text-gray-400">
            <Eye/>
          </span>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition duration-300"
          >
            {loading ? "Signing..." : "Create Account"}
          </button>
        </form>
        <p className="text-center text-white mt-4 text-sm">
          Already have an account?
          <a href="/login" className="text-purple-300 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

