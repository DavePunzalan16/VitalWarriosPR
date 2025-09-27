"use client"

import { useState, useEffect } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing VitalWarrior System...")

  const loadingStages = [
    { text: "Initializing VitalWarrior System...", duration: 1500 },
    { text: "Loading AI Health Recognition Engine...", duration: 2000 },
    { text: "Calibrating Facial Recognition Sensors...", duration: 1800 },
    { text: "Connecting to Health Database...", duration: 1500 },
    { text: "Preparing Advanced Analytics...", duration: 1200 },
    { text: "Finalizing System Setup...", duration: 1000 },
    { text: "System Ready! Welcome to VitalWarrior", duration: 1000 },
  ]

  useEffect(() => {
    let progressInterval: number
    let stageTimeout: number
    let currentProgress = 0

    const startLoading = () => {
      // Progress animation
      progressInterval = window.setInterval(() => {
        currentProgress += Math.random() * 2 + 0.5
        if (currentProgress > 100) currentProgress = 100
        setProgress(currentProgress)
      }, 80)

      // Stage progression with extended duration
      let totalTime = 0
      loadingStages.forEach((stage, index) => {
        stageTimeout = window.setTimeout(() => {
          setCurrentStage(index)
          setLoadingText(stage.text)
        }, totalTime)
        totalTime += stage.duration
      })
    }

    startLoading()

    return () => {
      clearInterval(progressInterval)
      clearTimeout(stageTimeout)
    }
  }, [])

  return (
    <div className="loading-screen-container">
      <div className="loading-background">
        <div className="floating-particles">
          {[...Array(30)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>

        <div className="background-elements">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          <div className="bg-circle bg-circle-3"></div>
        </div>

        <div className="loading-content">
          <div className="warrior-logo-container">
            <div className="logo-glow"></div>
            <div className="logo-ring"></div>
            <div className="logo-ring-2"></div>
            <i className="fas fa-shield-virus warrior-icon"></i>
            <div className="logo-pulse"></div>
            <div className="logo-pulse-2"></div>
          </div>

          <h1 className="loading-title">
            <span className="title-letter">V</span>
            <span className="title-letter">i</span>
            <span className="title-letter">t</span>
            <span className="title-letter">a</span>
            <span className="title-letter">l</span>
            <span className="title-letter">W</span>
            <span className="title-letter">a</span>
            <span className="title-letter">r</span>
            <span className="title-letter">r</span>
            <span className="title-letter">i</span>
            <span className="title-letter">o</span>
            <span className="title-letter">r</span>
          </h1>

          <p className="loading-subtitle">Advanced AI Health Recognition System</p>

          <div className="progress-container">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }}>
                <div className="progress-shine"></div>
              </div>
              <div className="progress-glow" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-percentage">{Math.round(progress)}%</div>
          </div>

          <div className="loading-text-container">
            <p className="loading-text">{loadingText}</p>
            <div className="loading-cursor"></div>
          </div>

          <div className="loading-dots">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`dot dot-${i + 1}`}></div>
            ))}
          </div>

          <div className="stage-indicators">
            {loadingStages.map((_, index) => (
              <div key={index} className={`stage-dot ${index <= currentStage ? "active" : ""}`}></div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .loading-screen-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          overflow: hidden;
        }

        .loading-background {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #8b1538 0%, #6b1128 25%, #4a0d1c 50%, #2d1b69 75%, #1a0f3d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow-y: auto;
          padding: 2rem 0;
        }

        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        ${[...Array(30)]
          .map(
            (_, i) => `
          .particle-${i + 1} {
            width: ${Math.random() * 12 + 4}px;
            height: ${Math.random() * 12 + 4}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 8}s;
            animation-duration: ${Math.random() * 6 + 4}s;
            background: ${i % 3 === 0 ? "rgba(255, 215, 0, 0.2)" : i % 3 === 1 ? "rgba(255, 255, 255, 0.15)" : "rgba(139, 21, 56, 0.3)"};
          }
        `,
          )
          .join("")}

        .background-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .bg-circle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          animation: bg-float 20s ease-in-out infinite;
        }

        .bg-circle-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: -10%;
          animation-delay: 0s;
        }

        .bg-circle-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          right: -5%;
          animation-delay: 7s;
        }

        .bg-circle-3 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 20%;
          animation-delay: 14s;
        }

        .loading-content {
          text-align: center;
          color: white;
          z-index: 2;
          position: relative;
          max-width: 800px;
          width: 100%;
          padding: 0 2rem;
        }

        .warrior-logo-container {
          position: relative;
          margin-bottom: 2rem;
          width: 140px;
          height: 140px;
          margin-left: auto;
          margin-right: auto;
        }

        .logo-glow {
          position: absolute;
          top: -30px;
          left: -30px;
          right: -30px;
          bottom: -30px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .logo-ring {
          position: absolute;
          top: -15px;
          left: -15px;
          right: -15px;
          bottom: -15px;
          border: 3px solid rgba(255, 215, 0, 0.4);
          border-radius: 50%;
          animation: ring-rotate 4s linear infinite;
        }

        .logo-ring-2 {
          position: absolute;
          top: -25px;
          left: -25px;
          right: -25px;
          bottom: -25px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation: ring-rotate-reverse 6s linear infinite;
        }

        .warrior-icon {
          font-size: 4.5rem;
          position: relative;
          z-index: 3;
          animation: icon-bounce 2s ease-in-out infinite;
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
          color: #ffd700;
        }

        .logo-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          border: 2px solid rgba(255, 215, 0, 0.6);
          border-radius: 50%;
          animation: pulse-ring 2s ease-out infinite;
        }

        .logo-pulse-2 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          animation: pulse-ring 2s ease-out infinite 1s;
        }

        .loading-title {
          font-family: 'Orbitron', monospace;
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          display: flex;
          justify-content: center;
          gap: 0.1em;
        }

        .title-letter {
          display: inline-block;
          background: linear-gradient(45deg, #fff, #ffd700, #fff, #ff6b6b);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s ease-in-out infinite;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }

        ${[...Array(12)]
          .map(
            (_, i) => `
          .title-letter:nth-child(${i + 1}) {
            animation-delay: ${i * 0.15}s;
            transform: translateY(${Math.sin(i * 0.5) * 5}px);
          }
        `,
          )
          .join("")}

        .loading-subtitle {
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 3rem;
          font-weight: 300;
          animation: subtitle-glow 3s ease-in-out infinite;
        }

        .progress-container {
          width: 450px;
          margin: 0 auto 2rem;
          position: relative;
        }

        .progress-track {
          width: 100%;
          height: 10px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffd700, #fff, #ffd700, #ff6b6b);
          background-size: 300% 100%;
          border-radius: 50px;
          transition: width 0.3s ease;
          position: relative;
          animation: progress-shimmer 2s ease-in-out infinite;
        }

        .progress-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          animation: shine 2.5s ease-in-out infinite;
        }

        .progress-glow {
          position: absolute;
          top: -3px;
          left: 0;
          height: 16px;
          background: linear-gradient(90deg, #ffd700, #fff);
          border-radius: 50px;
          filter: blur(6px);
          opacity: 0.7;
          transition: width 0.3s ease;
        }

        .progress-percentage {
          position: absolute;
          top: -35px;
          right: 0;
          font-size: 1rem;
          font-weight: 700;
          color: #ffd700;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }

        .loading-text-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          min-height: 1.8rem;
        }

        .loading-text {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
          font-weight: 400;
        }

        .loading-cursor {
          width: 3px;
          height: 1.4rem;
          background: #ffd700;
          animation: cursor-blink 1s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }

        .dot {
          width: 14px;
          height: 14px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: wave 1.8s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        ${[...Array(8)]
          .map(
            (_, i) => `
          .dot-${i + 1} {
            animation-delay: ${i * 0.15}s;
            background: ${i % 2 === 0 ? "rgba(255, 215, 0, 0.8)" : "rgba(255, 255, 255, 0.6)"};
          }
        `,
          )
          .join("")}

        .stage-indicators {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 3rem;
        }

        .stage-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.4s ease;
        }

        .stage-dot.active {
          background: #ffd700;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
          transform: scale(1.3);
        }

        .instructions-section, .benefits-section {
          margin-top: 3rem;
          animation: section-fade-in 1s ease-out;
        }

        .section-title {
          font-size: 1.8rem;
          color: #ffd700;
          margin-bottom: 2rem;
          font-weight: 600;
          text-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
        }

        .instructions-grid, .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .instruction-item, .benefit-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: item-float 3s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .instruction-item:hover, .benefit-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2);
        }

        ${[...Array(5)]
          .map(
            (_, i) => `
          .instruction-${i + 1} {
            animation-delay: ${i * 0.2}s;
          }
        `,
          )
          .join("")}

        ${[...Array(4)]
          .map(
            (_, i) => `
          .benefit-${i + 1} {
            animation-delay: ${i * 0.3}s;
          }
        `,
          )
          .join("")}

        .instruction-icon, .benefit-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          display: block;
        }

        .instruction-step {
          color: #ffd700;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .instruction-text, .benefit-desc {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .benefit-title {
          color: #ffd700;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        /* Enhanced Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-25px) rotate(180deg); opacity: 1; }
        }

        @keyframes bg-float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(20px); }
          66% { transform: translateY(20px) translateX(-15px); }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }

        @keyframes ring-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes ring-rotate-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }

        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes subtitle-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
          50% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.6); }
        }

        @keyframes progress-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 300% 50%; }
        }

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes wave {
          0%, 100% { transform: scale(1) translateY(0px); opacity: 0.6; }
          50% { transform: scale(1.4) translateY(-8px); opacity: 1; }
        }

        @keyframes section-fade-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes item-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        /* Enhanced Responsive Design */
        @media (max-width: 768px) {
          .loading-title {
            font-size: 2.5rem;
          }
          
          .progress-container {
            width: 320px;
          }
          
          .warrior-logo-container {
            width: 100px;
            height: 100px;
          }
          
          .warrior-icon {
            font-size: 3rem;
          }

          .instructions-grid, .benefits-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .section-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .loading-title {
            font-size: 2rem;
          }
          
          .progress-container {
            width: 280px;
          }
          
          .loading-text {
            font-size: 1rem;
          }

          .loading-content {
            padding: 0 1rem;
          }

          .instruction-item, .benefit-item {
            padding: 1rem;
          }
        }

        @media (max-height: 600px) {
          .loading-background {
            align-items: flex-start;
            padding-top: 1rem;
          }
        }
      `}</style>
    </div>
  )
}
