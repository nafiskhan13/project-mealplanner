import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../assets/Logo.png';

// Your navigation items excluding "Login"
const baseNavItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Read login status from localStorage initially
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const toggle = () => {
    setMenuOpen((prev) => !prev);
  };

  // ✅ Keep Navbar updated if login status changes in other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  // ✅ Generate nav items conditionally
  const navItems = [
    ...baseNavItems,
    !isLoggedIn
      ? { path: "/login", label: "Login" }
      : { path: "/dashboard", label: "Dashboard" },
  ];

  const NavItems = ({ toggle }) => (
    <ul className="flex flex-col md:flex-row items-center md:space-x-8 gap-6">
      {navItems.map((item, idx) => (
        <li key={idx} onClick={toggle}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "text-black border-b-2 border-amber-500 font-bold"
                : "text-black hover:text-amber-500 transition-colors duration-300"
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
      {isLoggedIn && (
        <li>
          <button
            onClick={handleLogout}
            className="text-black hover:text-red-500 transition-colors duration-300"
          >
            Logout
          </button>
        </li>
      )}
    </ul>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <nav className="max-w-screen-2xl container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="MealPlanner Logo"
            className="h-12 w-12 rounded-full hover:scale-105 transition-transform"
          />
        </Link>

        {/* Hamburger icon */}
        <div onClick={toggle} className="md:hidden text-xl cursor-pointer">
          {menuOpen ? null : <FaBars />}
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex">
          <NavItems />
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-6 transition-transform transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="absolute top-6 right-6 text-xl cursor-pointer" onClick={toggle}>
            <FaTimes />
          </div>
          <NavItems toggle={toggle} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
