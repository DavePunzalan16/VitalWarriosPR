"use client"

import { useEffect, useRef, useState } from "react"
import { useAppContext } from "../context/AppContext"

export default function CameraModal() {
  const { state, dispatch } = useAppContext()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (state.showCameraModal) {
      initializeCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
      // Additional cleanup for any remaining streams
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop()
          console.log("[v0] Camera track stopped:", track.kind)
        })
        streamRef.current = null
      }
    }
  }, [state.showCameraModal, facingMode])

  const initializeCamera = async () => {
    try {
      // Stop any existing stream before starting new one
      stopCamera()

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        dispatch({ type: "SET_CAMERA_STREAM", payload: stream })
        console.log("[v0] Camera initialized successfully")
      }
    } catch (error) {
      console.error("Camera initialization failed:", error)
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "Failed to access camera. Please check permissions.", type: "error" },
      })
    }
  }

  const stopCamera = () => {
    console.log("[v0] Stopping camera...")

    // Stop tracks from state stream
    if (state.cameraStream) {
      state.cameraStream.getTracks().forEach((track) => {
        track.stop()
        console.log("[v0] State stream track stopped:", track.kind)
      })
      dispatch({ type: "SET_CAMERA_STREAM", payload: null })
    }

    // Stop tracks from ref stream (backup cleanup)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
        console.log("[v0] Ref stream track stopped:", track.kind)
      })
      streamRef.current = null
    }

    // Clear video element
    if (videoRef.current) {
      videoRef.current.srcObject = null
      videoRef.current.pause()
      console.log("[v0] Video element cleared")
    }
  }

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return

    setIsAnalyzing(true)
    dispatch({ type: "SET_SCANNING", payload: true })

    // Capture frame
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    const video = videoRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context?.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Simulate AI analysis
    await simulateHealthAnalysis()

    setIsAnalyzing(false)
    dispatch({ type: "SET_SCANNING", payload: false })
  }

  const simulateHealthAnalysis = async () => {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock analysis results
    const temperature = (Math.random() * (38.5 - 36.0) + 36.0).toFixed(1)
    const symptoms: string[] = []

    // Determine symptoms based on temperature and random factors
    if (Number.parseFloat(temperature) > 37.5) {
      symptoms.push("Fever")
      if (Math.random() > 0.5) symptoms.push("Headache")
      if (Math.random() > 0.7) symptoms.push("Fatigue")
    } else {
      if (Math.random() > 0.8) symptoms.push("Runny Nose")
      if (Math.random() > 0.9) symptoms.push("Cough")
    }

    if (symptoms.length === 0) {
      symptoms.push("Normal")
    }

    const results = {
      id: Date.now().toString(),
      studentId: state.currentUser?.studentId || "UE-12345678",
      temperature: `${temperature}°C`,
      symptoms,
      status: (symptoms.includes("Fever") ? "warning" : "healthy") as "healthy" | "warning" | "danger",
      timestamp: new Date().toISOString(),
    }

    dispatch({ type: "SET_SCAN_RESULTS", payload: results })
    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: `Health scan completed. Status: ${results.status === "healthy" ? "Healthy" : "Needs Attention"}`,
        type: results.status === "healthy" ? "success" : "warning",
      },
    })
  }

  const closeModal = () => {
    console.log("[v0] Closing camera modal...")
    stopCamera()
    dispatch({ type: "HIDE_CAMERA_MODAL" })
    dispatch({ type: "SET_SCAN_RESULTS", payload: null })
    setIsAnalyzing(false)
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      stopCamera()
    }

    const handleVisibilityChange = () => {
      if (document.hidden && state.showCameraModal) {
        stopCamera()
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [state.showCameraModal])

  if (!state.showCameraModal) return null

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-camera me-2"></i>
              Facial Recognition Health Scanner
            </h5>
            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
          </div>

          <div className="modal-body p-0">
            <div className="camera-container position-relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-100"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />

              {/* Camera overlay */}
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                <div className="scan-frame position-relative" style={{ width: "300px", height: "200px" }}>
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
                  {isAnalyzing && (
                    <div
                      className="scanning-line position-absolute start-0 end-0"
                      style={{
                        height: "2px",
                        background: "linear-gradient(90deg, transparent, var(--primary-red), transparent)",
                        animation: "scan-line 2s ease-in-out infinite",
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="d-flex gap-3 justify-content-center mb-4 flex-wrap">
                <button
                  className="btn btn-primary"
                  onClick={captureAndAnalyze}
                  disabled={isAnalyzing || !state.cameraStream}
                >
                  {isAnalyzing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-camera-retro me-2"></i>
                      Capture & Analyze
                    </>
                  )}
                </button>
                <button className="btn btn-secondary" onClick={switchCamera} disabled={isAnalyzing}>
                  <i className="fas fa-sync-alt me-2"></i>
                  Switch Camera
                </button>
              </div>

              {/* Scan Results */}
              {state.scanResults && (
                <div className="scan-results">
                  <h5 className="mb-3">Health Analysis Results</h5>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="result-item d-flex align-items-center gap-2 p-3 bg-light rounded">
                        <i className="fas fa-user-check text-primary"></i>
                        <div>
                          <small className="text-muted">Student ID:</small>
                          <div className="fw-semibold">{state.scanResults.studentId}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="result-item d-flex align-items-center gap-2 p-3 bg-light rounded">
                        <i className="fas fa-thermometer-half text-danger"></i>
                        <div>
                          <small className="text-muted">Temperature:</small>
                          <div className="fw-semibold">{state.scanResults.temperature}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="result-item d-flex align-items-center gap-2 p-3 bg-light rounded">
                        <i className="fas fa-head-side-cough text-warning"></i>
                        <div>
                          <small className="text-muted">Symptoms:</small>
                          <div className="fw-semibold">{state.scanResults.symptoms.join(", ")}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <div
                      className={`health-status d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-semibold ${
                        state.scanResults.status === "healthy"
                          ? "bg-success text-white"
                          : state.scanResults.status === "warning"
                            ? "bg-warning text-dark"
                            : "bg-danger text-white"
                      }`}
                    >
                      <i
                        className={`fas ${
                          state.scanResults.status === "healthy"
                            ? "fa-check-circle"
                            : state.scanResults.status === "warning"
                              ? "fa-exclamation-triangle"
                              : "fa-times-circle"
                        }`}
                      ></i>
                      <span>{state.scanResults.status === "healthy" ? "Healthy" : "Needs Attention"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
