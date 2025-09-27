"use client"

import { useAppContext } from "../context/AppContext"

export default function ScannerSection() {
  const { dispatch } = useAppContext()

  const handleStartScan = () => {
    dispatch({ type: "SHOW_CAMERA_MODAL" })
  }

  return (
    <section id="scanner" className="scanner-section section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Live Health Scanner</h2>
          <p className="section-subtitle">Experience our advanced facial recognition and health monitoring system</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="demo-interface bg-white bg-opacity-95 rounded-4 p-4 backdrop-blur">
              <div className="demo-header d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <h3 className="mb-0 text-dark">VitalWarrior Scanner Interface</h3>
                <div className="demo-status d-flex align-items-center gap-2 text-success">
                  <span className="status-dot bg-success rounded-circle" style={{ width: "8px", height: "8px" }}></span>
                  <span className="fw-medium">System Online</span>
                </div>
              </div>

              <div className="demo-screen text-center">
                <div className="scan-preview">
                  <div
                    className="preview-frame bg-light border border-2 border-dashed rounded-3 mx-auto mb-4 d-flex flex-column align-items-center justify-content-center position-relative"
                    style={{ width: "300px", height: "200px" }}
                  >
                    <div className="scanning-overlay">
                      <div className="scan-corners position-absolute top-0 start-0 w-100 h-100">
                        <div
                          className="corner position-absolute"
                          style={{
                            top: "-2px",
                            left: "-2px",
                            width: "20px",
                            height: "20px",
                            border: "2px solid var(--primary-red)",
                            borderRight: "none",
                            borderBottom: "none",
                          }}
                        ></div>
                        <div
                          className="corner position-absolute"
                          style={{
                            top: "-2px",
                            right: "-2px",
                            width: "20px",
                            height: "20px",
                            border: "2px solid var(--primary-red)",
                            borderLeft: "none",
                            borderBottom: "none",
                          }}
                        ></div>
                        <div
                          className="corner position-absolute"
                          style={{
                            bottom: "-2px",
                            left: "-2px",
                            width: "20px",
                            height: "20px",
                            border: "2px solid var(--primary-red)",
                            borderRight: "none",
                            borderTop: "none",
                          }}
                        ></div>
                        <div
                          className="corner position-absolute"
                          style={{
                            bottom: "-2px",
                            right: "-2px",
                            width: "20px",
                            height: "20px",
                            border: "2px solid var(--primary-red)",
                            borderLeft: "none",
                            borderTop: "none",
                          }}
                        ></div>
                      </div>
                      <i className="fas fa-user-circle fs-1 text-muted"></i>
                      <p className="text-muted mt-2 mb-0">Position face within frame</p>
                    </div>
                  </div>

                  <div className="scan-controls d-flex gap-3 justify-content-center flex-wrap">
                    <button className="btn btn-primary" onClick={handleStartScan}>
                      <i className="fas fa-camera"></i>
                      Start Health Scan
                    </button>
                    <button className="btn btn-secondary">
                      <i className="fas fa-eye"></i>
                      Preview Mode
                    </button>
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
