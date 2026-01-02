import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { gsap } from "gsap";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = useRef([]);

  // Reset refs on each render
  menuItems.current = [];

  const addToRefs = (el) => {
    if (el && !menuItems.current.includes(el)) {
      menuItems.current.push(el);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);

    if (!menuOpen) {
      // OPEN animation
      gsap.fromTo(
        menuItems.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    } else {
      // CLOSE animation
      gsap.to(menuItems.current, {
        x: -50,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      });
    }
  };

  const handleMouseEnter = (hoveredItem) => {
    menuItems.current.forEach((item) => {
      gsap.to(item, {
        opacity: item === hoveredItem ? 1 : 0.5,
        duration: 0.3,
      });
    });
  };

  const handleMouseLeave = () => {
    menuItems.current.forEach((item) => {
      gsap.to(item, { opacity: 1, duration: 0.3 });
    });
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="container">
          <span className={`brand ${menuOpen ? "open" : ""}`}>
            CREATIVITY
          </span>

          <div
            id="burg"
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <div
        className={`fullscreen-menu ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="position-fixed bottom-0 end-0 p-3">
          <ul onClick={(e) => e.stopPropagation()}>
            {links.map((item, i) => (
              <li
                key={i}
                ref={addToRefs}
                onMouseEnter={() =>
                  handleMouseEnter(menuItems.current[i])
                }
                onMouseLeave={handleMouseLeave}
              >
                <NavLink
                  to={item.path}
                  onClick={toggleMenu}
                  className="menu-link"
                >
                  <i className="arrow bi bi-arrow-up-left"></i>{" "}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
