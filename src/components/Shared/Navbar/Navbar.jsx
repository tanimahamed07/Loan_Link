import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, [theme]);

  // Toggle theme function
  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login"); // redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Links before login
  const guestLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-loans">All-Loans</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Register</NavLink>
      </li>
    </>
  );

  // Links after login
  const userLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-loans">All-Loans</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/profile">
          <img
            src={user?.photoURL || avatarImg}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        </NavLink>
      </li>
      <li>
        <button onClick={handleLogout} className="btn btn-ghost">
          Logout
        </button>
      </li>
    </>
  );

  return (
    <div className="navbar container  mx-auto sticky top-0 z-50 backdrop-blur">
      {/* Left side: Logo */}
      <div className="navbar-start">
        <NavLink to="/" className="btn btn-ghost">
          <img src={logo} alt="LoanLink" className="h-8" />
        </NavLink>
      </div>

      {/* Center: Empty */}
      <div className="navbar-center"></div>

      {/* Right side: Routes / Theme toggle */}
      <div className="navbar-end flex items-center space-x-4">
        {/* Desktop links */}
        <div className="hidden lg:flex items-center space-x-2">
          <ul className="menu menu-horizontal px-1">
            {!user?.email ? guestLinks : userLinks}
          </ul>
          {/* Theme toggle */}
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller mr-6"
            checked={theme === "dark"}
            onChange={handleThemeChange}
          />
        </div>

        {/* Mobile dropdown */}
        <div className="dropdown lg:hidden ml-2">
          <div tabIndex={0} className="btn btn-ghost">
            <AiOutlineMenu className="h-5 w-5" />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {!user?.email ? guestLinks : userLinks}
            <li className="mt-2">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={(e) => handleTheme(e.target.checked)}
                className="toggle toggle-sm"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
