
import React from "react";

const Navbar = () => {
  const navLinks = [
    { name: "Signup", href: "#signup" },
    { name: "About", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Pricing", href: "#pricing" },
    { name: "Support", href: "#support" },
  ];

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <span className="logo-mark">Z</span>
        <span>ZERODHA</span>
      </a>

      <div className="navbar-links">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href}>
            {link.name}
          </a>
        ))}
      </div>

      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 8%;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #eee;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #387ed1;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .logo-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: #387ed1;
          color: white;
          border-radius: 6px;
          font-size: 21px;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 35px;
        }

        .navbar-links a {
          text-decoration: none;
          color: #424242;
          font-size: 15px;
          transition: color 0.2s ease;
        }

        .navbar-links a:hover {
          color: #387ed1;
        }

        @media (max-width: 600px) {
          .navbar {
            padding: 15px 4%;
            flex-wrap: wrap;
            gap: 15px;
          }

          .navbar-links {
            gap: 16px;
            flex-wrap: wrap;
          }

          .navbar-links a {
            font-size: 13px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
