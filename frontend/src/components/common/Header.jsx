import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { MdNotificationsNone } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const Header = () => {
    const { token, user, logout } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const location = useLocation(); 

    // Scroll shadow effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Color definitions
    const PRIMARY_COLOR_HEX = "#00C6AE";
    const DARK_BG_COLOR = "#0b1120"; 

    // Navigation links list
    const navLinks = [
        // Home links to Dashboard if logged in, otherwise "/"
        { to: token ? "/dashboard" : "/", label: "Home" }, 
        { to: "/features", label: "Features" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
        { to: "/chatbot", label: "Chatbot" },
    ];

    // Function to check if a link is active
    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === path || (token && location.pathname.startsWith("/dashboard"));
        }
        return location.pathname.startsWith(path);
    };

    // --- Components for cleaner rendering ---

    // Renders the Notifications and User Profile (for logged-in users)
    const UserProfileAndNotifs = () => (
        <div className="flex items-center space-x-6">
            {/* Notifications */}
            <button className="relative text-gray-600 dark:text-gray-300 hover:text-[#00C6AE] dark:hover:text-[#00C6AE] transition">
                <MdNotificationsNone className="text-3xl" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
                {/* User Avatar */}
                <div style={{ backgroundColor: PRIMARY_COLOR_HEX }} className="text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                
                {/* Username and Role Display */}
                <div className="flex flex-col text-sm hidden sm:flex">
                    <span className="font-semibold text-gray-800 dark:text-white">
                        {user?.name || "User"}
                    </span>
                    
                    {/* Role Display Section - This ensures the role is shown below the name */}
                    {user?.role && (
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                            {user.role}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    // Renders the Log In and Sign Up buttons (for logged-out users)
    const AuthButtons = () => (
        <div className="flex items-center space-x-4">
            <Link
                to="/login"
                className={`text-gray-600 dark:text-gray-300 hover:text-[#00C6AE] dark:hover:text-[#00C6AE] text-sm font-medium transition duration-200`}
            >
                Log In
            </Link>
            {/* SIGN UP BUTTON: Uses the primary color with shadow */}
            <Link
                to="/signup"
                style={{ backgroundColor: PRIMARY_COLOR_HEX }}
                className={`hover:opacity-90 text-white font-semibold px-5 py-2 rounded-lg text-sm transition duration-300 shadow-lg shadow-[#00C6AE]/50`} 
            >
                Sign Up
            </Link>
        </div>
    );

    // --- Render ---

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/95 dark:bg-[#0b1120]/95 shadow-lg border-b border-gray-200 dark:border-gray-800"
                    : "bg-white dark:bg-[#0b1120]"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-10">
                <div className="flex justify-between items-center h-20">
                    {/* ===== 1. LOGO IMAGE ===== */}
                    <Link to={token ? "/" : "/"} className="flex items-center gap-4 mb-2">
                        {/* Logo Image Restored */}
                        <img
                            src="/images/logoo.png"
                            alt="FinAI Logo"
                            className="w-28 h-28 object-contain drop-shadow-md"
                        />
                    </Link>

                    {/* ===== 2. Desktop Nav Links (ALWAYS Visible, as requested) ===== */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className={`
                                    relative transition-colors duration-200 text-base font-medium pb-1
                                    ${
                                        isActive(link.to)
                                            ? `text-[${PRIMARY_COLOR_HEX}] dark:text-[${PRIMARY_COLOR_HEX}] font-bold` // Active link is bold and primary color
                                            : "text-gray-600 dark:text-gray-300 hover:text-[#00C6AE]"
                                    }
                                    ${
                                        // Underline effect for active link
                                        isActive(link.to) && "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#00C6AE] after:w-full" 
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* ===== 3. Right Side - Buttons/Profile ===== */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className={`text-gray-600 dark:text-gray-300 hover:text-[#00C6AE] dark:hover:text-[#00C6AE] transition-colors duration-200`}
                        >
                            {theme === "light" ? (
                                <FiMoon className="w-6 h-6" />
                            ) : (
                                <FiSun className="w-6 h-6" />
                            )}
                        </button>

                        {/* Auth / User Section */}
                        {token ? (
                            <>
                                <UserProfileAndNotifs />
                                {/* Logout Button (Desktop only) */}
                                <button
                                    onClick={logout}
                                    className={`hidden lg:block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700 hover:border-[#00C6AE] dark:hover:border-[#00C6AE] px-4 py-2 rounded-md text-sm font-medium transition duration-300`}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            // Show Log In/Sign Up buttons only on desktop when logged out
                            <div className="hidden md:flex">
                                <AuthButtons />
                            </div>
                        )}

                        {/* Mobile Menu Button (Hamburger/X) */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={`text-gray-600 dark:text-gray-300 hover:text-[#00C6AE] dark:hover:text-[#00C6AE] focus:outline-none`}
                            >
                                {menuOpen ? (
                                    <FiX className="w-6 h-6" />
                                ) : (
                                    <FiMenu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Mobile Dropdown Menu ===== */}
            {menuOpen && (
                <div className={`md:hidden bg-white dark:bg-[${DARK_BG_COLOR}] border-t border-gray-200 dark:border-gray-800`}>
                    <div className="px-6 py-4 space-y-3">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                onClick={() => setMenuOpen(false)}
                                className={`
                                    block transition duration-200 py-2 rounded-md px-3
                                    ${
                                        isActive(link.to)
                                            ? `text-[${PRIMARY_COLOR_HEX}] dark:text-[${PRIMARY_COLOR_HEX}] bg-[#00C6AE]/10 dark:bg-[#00C6AE]/10 font-bold`
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#111827] font-medium"
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Mobile Auth Buttons/Logout */}
                        {!token ? (
                            <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className={`block w-full text-center text-gray-600 dark:text-gray-300 hover:text-[#00C6AE] dark:hover:text-[#00C6AE] transition duration-200 py-2`}
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setMenuOpen(false)}
                                    style={{ backgroundColor: PRIMARY_COLOR_HEX }}
                                    className={`block w-full text-white font-semibold py-2 rounded-lg hover:opacity-90 transition duration-300 shadow-lg shadow-[#00C6AE]/50`}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    logout();
                                    setMenuOpen(false);
                                }}
                                className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-t border-gray-200 dark:border-gray-800 mt-3 pt-3 text-sm font-medium"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;