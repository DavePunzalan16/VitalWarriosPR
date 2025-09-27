"use client"

import { useAppContext } from "../context/AppContext"

export default function HeroSection() {
  const { dispatch } = useAppContext()

  const handleStartScan = () => {
    dispatch({ type: "SHOW_CAMERA_MODAL" })
  }

  const stats = [
    { icon: "fas fa-bullseye", value: "99.9%", label: "Accuracy Rate" },
    { icon: "fas fa-stopwatch", value: "< 2s", label: "Scan Time" },
    { icon: "fas fa-clock", value: "24/7", label: "Monitoring" },
    { icon: "fas fa-users", value: "10K+", label: "Students" }
  ]



  return (
    <section id="home" className="hero-section pt-5 mt-5">
      <div className="container py-5">
        <div className="row align-items-center min-vh-100 g-4">
          <div className="col-lg-6 col-md-12">
            <div className="hero-content p-3 p-md-4">
              <div className="hero-badge mb-4">
                <i className="fas fa-star"></i>
                <span>Next-Generation Health Technology</span>
              </div>

              <h1 className="hero-title mb-4">
                Advanced <span className="gradient-text">Facial Recognition</span>
                <br />
                Health Monitoring System
              </h1>

              <p className="hero-description mb-5">
                Revolutionary AI-powered technology that instantly identifies University of the East students and monitors
                comprehensive health conditions through advanced facial recognition, thermal analysis, and biometric
                scanning with 99.9% accuracy in under 2 seconds.
              </p>

              <div className="hero-stats mb-5">
                <div className="row g-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="col-6 col-lg-3">
                      <div className="stat-item text-center p-3 h-100">
                        <div className="stat-icon mx-auto mb-3">
                          <i className={stat.icon}></i>
                        </div>
                        <h3 className="mb-2">{stat.value}</h3>
                        <p className="mb-0 small">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-actions d-flex flex-column flex-sm-row gap-3">
                <button className="btn btn-primary btn-lg px-4 py-3 flex-fill flex-sm-fill-0" onClick={handleStartScan}>
                  <i className="fas fa-camera me-2"></i>
                  Start Health Scan
                </button>
                <button className="btn btn-secondary btn-lg px-4 py-3 flex-fill flex-sm-fill-0">
                  <i className="fas fa-play me-2"></i>
                  Watch Demo
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="scan-interface p-4 mx-2 mx-lg-0">
              <div className="scan-header d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
                <h3 className="mb-0 fs-5 fw-semibold">Facial Recognition Scanner</h3>
                <div className="scan-status d-flex align-items-center gap-2">
                  <span className="status-indicator rounded-circle"></span>
                  <span className="small fw-medium text-success">Ready to Scan</span>
                </div>
              </div>

              <div className="scan-area text-center mb-4 py-4">
                <div className="face-outline mx-auto position-relative">
                  <div className="scan-corners">
                    <div className="corner top-left position-absolute"></div>
                    <div className="corner top-right position-absolute"></div>
                    <div className="corner bottom-left position-absolute"></div>
                    <div className="corner bottom-right position-absolute"></div>
                  </div>
                  <div className="face-avatar d-flex align-items-center justify-content-center">
                    <i className="fas fa-user fa-3x text-muted"></i>
                  </div>
                </div>
              </div>

              <div className="health-indicators">
                <div className="indicator">
                  <i className="fas fa-thermometer-half"></i>
                  <span>Temperature</span>
                  <div className="indicator-value">36.5°C</div>
                </div>
                <div className="indicator">
                  <i className="fas fa-heartbeat"></i>
                  <span>Heart Rate</span>
                  <div className="indicator-value">72 BPM</div>
                </div>
                <div className="indicator">
                  <i className="fas fa-lungs"></i>
                  <span>Respiratory</span>
                  <div className="indicator-value">Normal</div>
                </div>
              </div>

              <div className="scan-footer mt-4 pt-3 border-top">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <div className="spinner-border spinner-border-sm text-primary" role="status" style={{width: '12px', height: '12px'}}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="small text-muted">System Active</span>
                  </div>
                  <div className="small text-muted">
                    <i className="fas fa-shield-alt me-1"></i>
                    Secure Connection
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}