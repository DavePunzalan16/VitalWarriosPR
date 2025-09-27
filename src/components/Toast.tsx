"use client"

import { useEffect } from "react"
import { useAppContext } from "../context/AppContext"

export default function Toast() {
  const { state, dispatch } = useAppContext()

  useEffect(() => {
    if (state.toast.show) {
      const timer = setTimeout(() => {
        dispatch({ type: "HIDE_TOAST" })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [state.toast.show, dispatch])

  const hideToast = () => {
    dispatch({ type: "HIDE_TOAST" })
  }

  if (!state.toast.show) return null

  const getToastClass = () => {
    switch (state.toast.type) {
      case "success":
        return "bg-success text-white"
      case "error":
        return "bg-danger text-white"
      case "warning":
        return "bg-warning text-dark"
      case "info":
      default:
        return "bg-info text-white"
    }
  }

  const getToastIcon = () => {
    switch (state.toast.type) {
      case "success":
        return "fas fa-check-circle"
      case "error":
        return "fas fa-exclamation-circle"
      case "warning":
        return "fas fa-exclamation-triangle"
      case "info":
      default:
        return "fas fa-info-circle"
    }
  }

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <div className={`toast show ${getToastClass()}`} role="alert">
        <div className="toast-header">
          <i className={`${getToastIcon()} me-2`}></i>
          <strong className="me-auto">VitalWarrior</strong>
          <button type="button" className="btn-close" onClick={hideToast}></button>
        </div>
        <div className="toast-body">{state.toast.message}</div>
      </div>
    </div>
  )
}
