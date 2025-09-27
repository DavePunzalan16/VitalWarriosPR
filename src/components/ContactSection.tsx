"use client"

import type React from "react"

import { useState } from "react"
import { useAppContext } from "../context/AppContext"

export default function ContactSection() {
  const { dispatch } = useAppContext()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "Please fill in all required fields.", type: "error" },
      })
      return
    }

    // Simulate form submission
    console.log("Contact form submitted:", formData)

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })

    dispatch({
      type: "SHOW_TOAST",
      payload: { message: "Message sent successfully! We'll get back to you soon.", type: "success" },
    })
  }

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Have questions about VitalWarrior? Our team is here to help you!</p>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="contact-info">
              <div className="contact-item d-flex align-items-start gap-3 mb-4 p-3 bg-white bg-opacity-10 rounded">
                <i className="fas fa-envelope fs-4 text-white mt-1"></i>
                <div>
                  <h4 className="text-white mb-2">Email</h4>
                  <p className="text-white-50 mb-1">support@vitalwarrior.com</p>
                  <p className="text-white-50 mb-0">info@vitalwarrior.com</p>
                </div>
              </div>

              <div className="contact-item d-flex align-items-start gap-3 mb-4 p-3 bg-white bg-opacity-10 rounded">
                <i className="fas fa-phone fs-4 text-white mt-1"></i>
                <div>
                  <h4 className="text-white mb-2">Phone</h4>
                  <p className="text-white-50 mb-1">+63 (02) 8123-4567</p>
                  <p className="text-white-50 mb-0">+63 917 123 4567</p>
                </div>
              </div>

              <div className="contact-item d-flex align-items-start gap-3 mb-4 p-3 bg-white bg-opacity-10 rounded">
                <i className="fas fa-map-marker-alt fs-4 text-white mt-1"></i>
                <div>
                  <h4 className="text-white mb-2">Address</h4>
                  <p className="text-white-50 mb-0">
                    University of the East
                    <br />
                    105 Samson Rd, Caloocan, Metro Manila
                    <br />
                    Caloocan, Philippines 1400
                  </p>
                </div>
              </div>

              <div className="contact-item d-flex align-items-start gap-3 p-3 bg-white bg-opacity-10 rounded">
                <i className="fas fa-clock fs-4 text-white mt-1"></i>
                <div>
                  <h4 className="text-white mb-2">Support Hours</h4>
                  <p className="text-white-50 mb-1">Monday - Friday: 7:00 AM - 8:00 PM</p>
                  <p className="text-white-50 mb-0">Saturday: 7:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <form className="contact-form bg-white bg-opacity-10 p-4 rounded-4 backdrop-blur" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
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
                <div className="col-md-6 mb-3">
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
                  type="tel"
                  className="form-control"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <select
                  className="form-select"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="message"
                  rows={6}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                <i className="fas fa-paper-plane"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
