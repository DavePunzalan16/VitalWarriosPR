"use client"

import { useState, useEffect } from "react"

export default function VitalWarriorGuide() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [scanActive, setScanActive] = useState(false)

  const instructions = [
    {
      step: 1,
      title: "Position Yourself",
      description: "Center yourself in front of the camera with proper distance",
      icon: "fas fa-user-circle",
      color: "#ff6b6b",
      details: "Maintain 2-3 feet distance for optimal facial recognition accuracy"
    },
    {
      step: 2,
      title: "Good Lighting",
      description: "Ensure your face is well-lit and clearly visible",
      icon: "fas fa-lightbulb",
      color: "#ffd700",
      details: "Natural lighting works best, avoid backlighting or harsh shadows"
    },
    {
      step: 3,
      title: "Start Scan",
      description: "Click the scan button to begin health analysis",
      icon: "fas fa-play-circle",
      color: "#00ff88",
      details: "AI system will automatically detect and analyze your health metrics"
    },
    {
      step: 4,
      title: "Stay Still",
      description: "Remain motionless during the scanning process",
      icon: "fas fa-camera",
      color: "#00d4ff",
      details: "Keep steady for 2-3 seconds while system captures biometric data"
    },
    {
      step: 5,
      title: "Get Results",
      description: "Review your comprehensive health analysis",
      icon: "fas fa-chart-line",
      color: "#8b5cf6",
      details: "Instant health feedback with 99.9% accuracy and recommendations"
    }
  ]

  const benefits = [
    { title: "Instant Detection", icon: "fas fa-bolt", color: "#ffd700" },
    { title: "AI-Powered", icon: "fas fa-brain", color: "#00d4ff" },
    { title: "Non-Contact", icon: "fas fa-shield-alt", color: "#00ff88" },
    { title: "Real-Time", icon: "fas fa-clock", color: "#ff6b6b" },
    { title: "99.9% Accurate", icon: "fas fa-bullseye", color: "#8b5cf6" },
    { title: "24/7 Ready", icon: "fas fa-eye", color: "#f59e0b" }
  ]

  const handleDemoScan = () => {
    setScanActive(true)
    setTimeout(() => setScanActive(false), 3000)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById("guide")
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="guide" className={`guide-section ${isVisible ? "animate-in" : ""}`}>
      <div className="guide-container">
        {/* Header */}
        <div className="guide-header">
          <h2 className="guide-title">How to Use VitalWarrior</h2>
          <p className="guide-subtitle">Revolutionary AI health monitoring in 5 simple steps</p>
        </div>

        {/* Main Grid Layout */}
        <div className="guide-grid">
          {/* Steps Section */}
          <div className="steps-section">
            <div className="steps-header">
              <h3>Step-by-Step Guide</h3>
              <div className="progress-indicator">
                <span>Step {activeStep + 1} of {instructions.length}</span>
              </div>
            </div>
            
            <div className="steps-grid">
              {instructions.map((instruction, index) => (
                <div
                  key={index}
                  className={`step-card ${activeStep === index ? "active" : ""}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="step-number" style={{ background: instruction.color }}>
                    {instruction.step}
                  </div>
                  <div className="step-icon" style={{ color: instruction.color }}>
                    <i className={instruction.icon}></i>
                  </div>
                  <div className="step-info">
                    <h4>{instruction.title}</h4>
                    <p>{instruction.description}</p>
                    {activeStep === index && (
                      <div className="step-details">{instruction.details}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Section */}
          <div className="demo-section">
            <div className="demo-header">
              <h3>Live Demo</h3>
              <div className="system-status">
                <div className="status-dot"></div>
                <span>System Active</span>
              </div>
            </div>
            
            <div className="demo-interface">
              <div className={`scan-viewport ${scanActive ? "scanning" : ""}`}>
                <div className="scan-overlay">
                  <div className="corner-markers">
                    <div className="corner tl"></div>
                    <div className="corner tr"></div>
                    <div className="corner bl"></div>
                    <div className="corner br"></div>
                  </div>
                  <div className="face-indicator">
                    <i className="fas fa-user"></i>
                  </div>
                  {scanActive && <div className="scan-beam"></div>}
                </div>
              </div>
              
              <div className="health-metrics">
                <div className="metric">
                  <i className="fas fa-thermometer-half"></i>
                  <span>36.5°C</span>
                </div>
                <div className="metric">
                  <i className="fas fa-heartbeat"></i>
                  <span>72 BPM</span>
                </div>
                <div className="metric">
                  <i className="fas fa-lungs"></i>
                  <span>Normal</span>
                </div>
              </div>
              
              <button className="demo-btn" onClick={handleDemoScan}>
                <i className="fas fa-camera"></i>
                {scanActive ? "Scanning..." : "Start Demo"}
              </button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="benefits-section">
            <h3>System Benefits</h3>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="benefit-icon" style={{ color: benefit.color }}>
                    <i className={benefit.icon}></i>
                  </div>
                  <span>{benefit.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .guide-section {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          padding: 80px 20px;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .guide-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
          z-index: 0;
        }

        .guide-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .guide-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .guide-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff, #cbd5e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .guide-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 400;
        }

        .guide-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          grid-template-rows: auto auto;
          gap: 40px;
          grid-template-areas: 
            "steps demo"
            "benefits benefits";
        }

        .steps-section {
          grid-area: steps;
        }

        .steps-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .steps-header h3 {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .progress-indicator {
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .steps-grid {
          display: grid;
          gap: 16px;
        }

        .step-card {
          display: grid;
          grid-template-columns: 50px 60px 1fr;
          gap: 20px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }

        .step-card:hover,
        .step-card.active {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .step-number {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .step-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .step-info h4 {
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .step-info p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 12px 0;
          line-height: 1.5;
        }

        .step-details {
          background: rgba(0, 0, 0, 0.2);
          padding: 12px;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          line-height: 1.4;
          animation: slideDown 0.3s ease;
        }

        .demo-section {
          grid-area: demo;
        }

        .demo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .demo-header h3 {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .system-status {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #10b981;
          font-weight: 500;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .demo-interface {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          backdrop-filter: blur(10px);
        }

        .scan-viewport {
          width: 100%;
          height: 240px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          position: relative;
          margin-bottom: 24px;
          overflow: hidden;
        }

        .scan-overlay {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .corner-markers .corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #3b82f6;
        }

        .corner.tl {
          top: 20px;
          left: 20px;
          border-right: none;
          border-bottom: none;
        }

        .corner.tr {
          top: 20px;
          right: 20px;
          border-left: none;
          border-bottom: none;
        }

        .corner.bl {
          bottom: 20px;
          left: 20px;
          border-right: none;
          border-top: none;
        }

        .corner.br {
          bottom: 20px;
          right: 20px;
          border-left: none;
          border-top: none;
        }

        .face-indicator {
          font-size: 4rem;
          color: rgba(255, 255, 255, 0.3);
        }

        .scan-beam {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          animation: scanBeam 2s ease-in-out infinite;
        }

        .scanning .corner {
          border-color: #10b981;
          animation: cornerGlow 2s ease-in-out infinite;
        }

        .health-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .metric {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.8);
        }

        .metric i {
          color: #3b82f6;
          font-size: 1.25rem;
        }

        .metric span {
          font-weight: 600;
        }

        .demo-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .demo-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }

        .benefits-section {
          grid-area: benefits;
        }

        .benefits-section h3 {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 24px;
          text-align: center;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .benefit-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .benefit-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px);
        }

        .benefit-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .benefit-item span {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scanBeam {
          0% { top: 0; opacity: 1; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes cornerGlow {
          0%, 100% { box-shadow: 0 0 5px currentColor; }
          50% { box-shadow: 0 0 20px currentColor; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @media (max-width: 1024px) {
          .guide-grid {
            grid-template-columns: 1fr;
            grid-template-areas: 
              "demo"
              "steps"
              "benefits";
          }
        }

        @media (max-width: 768px) {
          .guide-title {
            font-size: 2.5rem;
          }

          .step-card {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 16px;
          }

          .steps-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .health-metrics {
            grid-template-columns: 1fr;
          }

          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  )
}