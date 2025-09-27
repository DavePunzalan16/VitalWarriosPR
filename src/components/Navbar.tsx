"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "../context/AppContext"

export default function Navbar() {
  const { state, dispatch } = useAppContext()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = ["home", "about", "features", "scanner", "chatbot", "guide", "analytics", "contact"]
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = () => {
    dispatch({ type: "SHOW_AUTH_MODAL", payload: "login" })
    setIsMobileMenuOpen(false)
  }

  const handleRegister = () => {
    dispatch({ type: "SHOW_AUTH_MODAL", payload: "register" })
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    dispatch({ type: "SET_UNAUTHENTICATED" })
    dispatch({ type: "SHOW_TOAST", payload: { message: "Logged out successfully!", type: "info" } })
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false)
    
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { id: "home", label: "Home", icon: "fas fa-home" },
    { id: "about", label: "About", icon: "fas fa-info-circle" },
    { id: "features", label: "Features", icon: "fas fa-cogs" },
    { id: "scanner", label: "Scanner", icon: "fas fa-camera-retro" },
    { id: "chatbot", label: "AI Assistant", icon: "fas fa-robot" },
    { id: "guide", label: "Guide", icon: "fas fa-book" },
    { id: "analytics", label: "Analytics", icon: "fas fa-chart-line" },
    { id: "contact", label: "Contact", icon: "fas fa-envelope" }
  ]

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : "transparent"}`}>
        <div className="navbar-container">
          <div className="navbar-brand" onClick={() => handleNavClick("home")}>
            <div className="brand-logo">
              <img
                src="./public/VitalwarriosLogo.png"
                alt="VitalWarrior"
                className="brand-image"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.display = "none"
                  const fallback = img.nextElementSibling
                  if (fallback) (fallback as HTMLElement).style.display = "flex"
                }}
              />
              <div className="brand-fallback">
                <i className="fas fa-heartbeat"></i>
              </div>
            </div>
            <div className="brand-text">
              <div className="brand-name">VitalWarrior</div>
              <div className="brand-subtitle">AI Health Scanner</div>
            </div>
          </div>

          {/* Desktop Navigation - Horizontal Layout */}
          <div className="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => handleNavClick(item.id)}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            {state.isAuthenticated ? (
              <>
                <button className="btn btn-user">
                  <i className="fas fa-user-circle"></i>
                  <span>{state.currentUser?.firstName || "User"}</span>
                </button>
                <button className="btn btn-logout" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-login" onClick={handleLogin}>
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Login</span>
                </button>
                <button className="btn btn-register" onClick={handleRegister}>
                  <i className="fas fa-user-plus"></i>
                  <span>Register</span>
                </button>
              </>
            )}
          </div>

          <button 
            className={`mobile-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="mobile-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => handleNavClick(item.id)}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mobile-auth">
            {state.isAuthenticated ? (
              <>
                <button className="btn btn-user mobile" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout ({state.currentUser?.firstName || "User"})</span>
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-login mobile" onClick={handleLogin}>
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Login</span>
                </button>
                <button className="btn btn-register mobile" onClick={handleRegister}>
                  <i className="fas fa-user-plus"></i>
                  <span>Register</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .navbar.transparent {
          background: rgba(15, 23, 42, 0.1);
        }

        .navbar.scrolled {
          background: rgba(15, 23, 42, 0.95);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .brand-logo {
          position: relative;
          width: 40px;
          height: 40px;
        }

        .brand-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid rgba(220, 38, 38, 0.3);
        }

        .brand-fallback {
          display: none;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: "Orbitron", monospace;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          line-height: 1.2;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        /* HORIZONTAL DESKTOP NAVIGATION */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
          justify-content: center;
          max-width: 800px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .nav-link:hover,
        .nav-link.active {
          color: white;
          background: rgba(220, 38, 38, 0.15);
          border: 1px solid rgba(220, 38, 38, 0.3);
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .btn-user {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-login {
          background: transparent;
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-login:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .btn-register,
        .btn-logout {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
        }

        .btn-register:hover,
        .btn-logout:hover {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 30px;
          height: 30px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .mobile-toggle span {
          width: 100%;
          height: 3px;
          background: #dc2626;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .mobile-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .mobile-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(15, 23, 42, 0.98);
          backdrop-filter: blur(20px);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .mobile-menu.active {
          max-height: 100vh;
        }

        .mobile-nav {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          width: 100%;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: white;
          background: rgba(220, 38, 38, 0.15);
        }

        .mobile-auth {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn.mobile {
          width: 100%;
          justify-content: center;
          padding: 14px;
        }

        /* RESPONSIVE BREAKPOINTS */
        @media (max-width: 1200px) {
          .nav-link span {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .desktop-nav,
          .auth-buttons {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 12px 16px;
          }

          .brand-logo {
            width: 32px;
            height: 32px;
          }

          .brand-name {
            font-size: 1rem;
          }

          .brand-subtitle {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </>
  )
}