
import { useState } from "react";
import logo from "../assets/2.png";
import { LogOut, X, Menu } from "lucide-react";
import { useAuth } from "../context/Authprovider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../config/utild";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [, setAuthuser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${BASEURL}/user/logout`,
        { withCredentials: true }
      );
     
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuthuser(null);
      alert(data.message || "Logout successful");
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      {/* Hamburger Button Always on Top */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-slate-800 text-white rounded-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full bg-slate-800 text-white z-40 transition-transform duration-300 ease-in-out
        w-3/4 sm:w-2/5 md:w-[25%] pt-10
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between mx-4 text-center mb-4">
          <h1 className="text-3xl">SKYMOMENT AI</h1>
          {/* Hide close icon on md+ */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden mt-[-20px]"
          >
            <X />
          </button>
        </div>

        <hr className="mx-3" />

        <div className="text-center overflow-y-auto">
          <button className="bg-blue-500 hover:bg-blue-400 text-xl w-52 h-12 mt-12 rounded-full">
            + new chat
          </button>
          <p className="my-1 text-gray-500">No history message yet</p>
        </div>

        <div className="absolute bottom-5 w-full">
          <hr className="mx-5" />
          <div className="space-x-3 ml-5 my-3 flex items-center">
            <img
              src={logo}
              alt="profile"
              className="rounded-full w-8 h-8"
            />
            <span>{user ? user.firstname : "Akash Pal"}</span>
          </div>
          <div className="text-center mt-2">
            {/* <button
              onClick={handleLogout}
              className="text-white text-lg flex mx-auto items-center gap-2"
            >
              <LogOut />
              Logout
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;




