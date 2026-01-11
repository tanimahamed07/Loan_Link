import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/image-removebg-preview (2).png";
import { 
  FaMoon, FaSun, FaSignOutAlt, FaUserCircle, FaThLarge, 
  FaHome, FaHandHoldingUsd, FaInfoCircle, FaEnvelope 
} from "react-icons/fa"; // সব আইকন ইম্পোর্ট করা হয়েছে
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  // নেভিগেশন আইটেমগুলোর লিস্ট (আইকনসহ)
  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome size={16} /> },
    { name: "All Loans", path: "/all-loans", icon: <FaHandHoldingUsd size={16} /> },
    { name: "About Us", path: "/about-us", icon: <FaInfoCircle size={16} /> },
    { name: "Contact", path: "/contact", icon: <FaEnvelope size={16} /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaThLarge size={16} /> },
  ];

  const linkClass = ({ isActive }) =>
    `relative flex items-center gap-2 px-3 py-2 text-sm font-bold transition-all duration-300 group ${
      isActive
        ? "text-amber-600 dark:text-amber-400"
        : "text-gray-600 dark:text-gray-300 hover:text-amber-500"
    }`;

  return (
    <div className="sticky top-0 z-50 w-full bg-white/80 dark:bg-neutral-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-neutral-800 shadow-sm">
      <Container>
        <div className="navbar min-h-[72px] p-0">
          
          {/* Brand Logo */}
          <div className="navbar-start">
            <NavLink to="/" className="flex items-center gap-2 group">
              <img src={logo} alt="Logo" className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-105" />
              <span className="text-xl sm:text-2xl font-black tracking-tighter bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                LoanLink
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-1">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <NavLink to={item.path} className={linkClass}>
                    {({ isActive }) => (
                      <>
                        <span className={`${isActive ? 'text-amber-500' : 'text-gray-400 group-hover:text-amber-400'}`}>
                          {item.icon}
                        </span>
                        {item.name}
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className="navbar-end gap-2">
            <button onClick={handleThemeChange} className="p-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 text-amber-500 transition-all hover:bg-amber-200/20 active:scale-90">
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
            </button>

            {!user?.email ? (
              <div className="flex items-center gap-2">
                <NavLink to="/login" className="hidden sm:block px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200">Login</NavLink>
                <NavLink to="/signup" className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg">Join Now</NavLink>
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-amber-500/20">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL || avatarImg} alt="Profile" />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-white dark:bg-neutral-800 rounded-2xl w-64 border dark:border-neutral-700">
                  <div className="px-4 py-3 mb-2 bg-amber-50 dark:bg-amber-500/5 rounded-xl">
                    <p className="font-bold truncate text-gray-800 dark:text-white">{user?.displayName || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <li><NavLink to="/dashboard" className="py-3"><FaThLarge className="text-amber-500" /> Dashboard</NavLink></li>
                  <li><button onClick={handleLogout} className="py-3 text-red-500 font-bold"><FaSignOutAlt /> Logout</button></li>
                </ul>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="dropdown dropdown-end lg:hidden">
              <button tabIndex={0} className="btn btn-ghost btn-circle bg-gray-50 dark:bg-neutral-800">
                <AiOutlineMenu size={20} />
              </button>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-white dark:bg-neutral-800 rounded-2xl w-72 border dark:border-neutral-700">
                {navLinks.map((item) => (
                  <li key={item.name} className="mb-1">
                    <NavLink to={item.path} className="flex items-center gap-3 py-3 rounded-lg">
                      <span className="text-amber-500">{item.icon}</span>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;