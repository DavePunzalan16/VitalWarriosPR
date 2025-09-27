"use client"

import type React from "react"

import { useState } from "react"
import { useAppContext } from "../context/AppContext"

export default function AuthModal() {
  const { state, dispatch } = useAppContext()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "Please fill in all fields.", type: "error" },
      })
      return
    }

    // Simulate login
    const user = {
      id: "1",
      email: formData.email,
      firstName: "Demo",
      lastName: "User",
      studentId: "UE-12345678",
    }

    dispatch({ type: "SET_AUTHENTICATED", payload: { user } })
    dispatch({ type: "HIDE_AUTH_MODAL" })
    dispatch({
      type: "SHOW_TOAST",
      payload: { message: "Login successful!", type: "success" },
    })

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      studentId: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.studentId || !formData.email || !formData.password) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "Please fill in all fields.", type: "error" },
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "Passwords do not match.", type: "error" },
      })
      return
    }

    if (!formData.studentId.match(/^UE-\d{8}$/)) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "Please enter a valid UE student ID (UE-XXXXXXXX).", type: "error" },
      })
      return
    }

    // Simulate registration
    const user = {
      id: "1",
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      studentId: formData.studentId,
    }

    dispatch({ type: "SET_AUTHENTICATED", payload: { user } })
    dispatch({ type: "HIDE_AUTH_MODAL" })
    dispatch({
      type: "SHOW_TOAST",
      payload: { message: "Registration successful!", type: "success" },
    })

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      studentId: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

  const closeModal = () => {
    dispatch({ type: "HIDE_AUTH_MODAL" })
    setFormData({
      firstName: "",
      lastName: "",
      studentId: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

  const switchModal = () => {
    const newType = state.authModalType === "login" ? "register" : "login"
    dispatch({ type: "SHOW_AUTH_MODAL", payload: newType })
    setFormData({
      firstName: "",
      lastName: "",
      studentId: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

  if (!state.showAuthModal) return null

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className={`fas ${state.authModalType === "login" ? "fa-sign-in-alt" : "fa-user-plus"} me-2`}></i>
              {state.authModalType === "login" ? "Login to VitalWarrior" : "Register for VitalWarrior"}
            </h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={state.authModalType === "login" ? handleLogin : handleRegister}>
              {state.authModalType === "register" && (
                <>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="studentId"
                      placeholder="Student ID (UE-XXXXXXXX)"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {state.authModalType === "register" && (
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              {state.authModalType === "login" && (
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-decoration-none">
                    Forgot password?
                  </a>
                </div>
              )}

              {state.authModalType === "register" && (
                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="agreeTerms" required />
                    <label className="form-check-label" htmlFor="agreeTerms">
                      I agree to the Terms & Conditions
                    </label>
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 mb-3">
                <i className={`fas ${state.authModalType === "login" ? "fa-sign-in-alt" : "fa-user-plus"} me-2`}></i>
                {state.authModalType === "login" ? "Login" : "Create Account"}
              </button>
            </form>
          </div>

          <div className="modal-footer justify-content-center border-0 bg-light">
            <p className="mb-0">
              {state.authModalType === "login" ? "Don't have an account?" : "Already have an account?"}
              <button className="btn btn-link p-0 ms-1" onClick={switchModal}>
                {state.authModalType === "login" ? "Register here" : "Login here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
