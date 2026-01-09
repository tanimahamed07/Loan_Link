import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/image-removebg-preview (2).png";
import { FaMoon, FaSun } from "react-icons/fa";
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

  // Modern Link Styling with animated underline
  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-semibold transition-all duration-300 group ${
      isActive
        ? "text-amber-600 dark:text-amber-400"
        : "text-gray-600 dark:text-gray-300 hover:text-amber-500"
    }`;

  const navItemUnderline = (isActive) => (
    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
  );

  return (
    <div className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-100 dark:border-neutral-800 shadow-sm">
      <Container>
        <div className="navbar min-h-[72px] p-0">
          
          {/* Brand Logo Section */}
          <div className="navbar-start">
            <NavLink to="/" className="flex items-center gap-2 group transition-all">
              <div className="relative">
                <img src={logo} alt="Logo" className="h-12 w-auto object-contain transition-transform group-hover:scale-110" />
                <div className="absolute -inset-2 bg-amber-400/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent hidden sm:block">
                LoanLink
              </span>
            </NavLink>
          </div>

          {/* Desktop Links - Polished Center Navigation */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-2 px-1">
              {["Home", "All Loans", "About Us", "Contact"].map((item) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
                return (
                  <li key={item}>
                    <NavLink to={path} className={linkClass}>
                      {({ isActive }) => (
                        <>
                          {item}
                          {navItemUnderline(isActive)}
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Section: Theme, Profile, Mobile Menu */}
          <div className="navbar-end gap-3">
            
            {/* Elegant Theme Toggle */}
            <button 
              onClick={handleThemeChange}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 text-amber-500 transition-all hover:ring-2 hover:ring-amber-400/30"
            >
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
            </button>

            {!user?.email ? (
              /* Modern Guest Buttons */
              <div className="hidden md:flex items-center gap-2">
                <NavLink to="/login" className="px-5 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-amber-600 transition-colors">
                  Login
                </NavLink>
                <NavLink to="/signup" className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all active:scale-95">
                  Join Now
                </NavLink>
              </div>
            ) : (
              /* Modern User Dropdown */
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-amber-500/30 hover:border-amber-500 transition-all p-0">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL || avatarImg} alt="User Profile" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-white dark:bg-neutral-800 rounded-2xl w-60 border border-gray-100 dark:border-neutral-700 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 mb-2 bg-gray-50 dark:bg-neutral-700/30 rounded-xl">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Account</p>
                    <p className="font-bold truncate dark:text-white">{user?.displayName || "User"}</p>
                  </div>
                  <li><NavLink to="/dashboard" className="py-2.5 rounded-lg">Dashboard</NavLink></li>
                  <li><NavLink to="/dashboard/profile" className="py-2.5 rounded-lg">My Profile</NavLink></li>
                  <div className="divider my-1 opacity-50"></div>
                  <li>
                    <button onClick={handleLogout} className="py-2.5 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Hamburger for Mobile */}
            <div className="dropdown dropdown-end lg:hidden">
              <button tabIndex={0} className="btn btn-ghost btn-circle text-gray-600 dark:text-gray-300">
                <AiOutlineMenu size={22} />
              </button>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-white dark:bg-neutral-800 rounded-2xl w-64 border border-gray-100 dark:border-neutral-700">
                <li><NavLink to="/" className="py-3">Home</NavLink></li>
                <li><NavLink to="/all-loans" className="py-3">All Loans</NavLink></li>
                {!user?.email && (
                  <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-neutral-700">
                    <NavLink to="/login" className="btn btn-sm bg-amber-500 border-none text-white">Login</NavLink>
                    <NavLink to="/signup" className="btn btn-sm bg-orange-600 border-none text-white">Sign Up</NavLink>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;