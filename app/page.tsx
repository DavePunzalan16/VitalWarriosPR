"use client"

import { useState, useEffect } from "react"
import { AppProvider } from "../src/context/AppContext"
import Navbar from "../src/components/Navbar"
import HeroSection from "../src/components/HeroSection"
import AboutSection from "../src/components/AboutSection"
import FeaturesSection from "../src/components/FeaturesSection"
import ScannerSection from "../src/components/ScannerSection"
import VitalWarriorGuide from "../src/components/VitalWarriorGuide"
import AnalyticsSection from "../src/components/AnalyticsSection"
import ContactSection from "../src/components/ContactSection"
import Footer from "../src/components/Footer"
import CameraModal from "../src/components/CameraModal"
import AuthModal from "../src/components/AuthModal"
import LoadingScreen from "../src/components/LoadingScreen"
import Toast from "../src/components/Toast"
import "../src/App.css"
import "../src/index.css"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 9000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")

          // Add staggered animations for child elements
          const animatedElements = entry.target.querySelectorAll(
            ".scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-up",
          )
          animatedElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("visible")
            }, index * 100)
          })
        }
      })
    }, observerOptions)

    // Observe all sections after loading is complete
    if (!isLoading) {
      const sections = document.querySelectorAll(".section, .hero-section")
      sections.forEach((section) => observer.observe(section))
    }

    return () => observer.disconnect()
  }, [isLoading])

  return (
    <AppProvider>
      <div className="App">
        {isLoading && <LoadingScreen />}
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <ScannerSection />
          <VitalWarriorGuide />
          <AnalyticsSection />
          <ContactSection />
        </main>
        <Footer />
        <CameraModal />
        <AuthModal />
        <Toast />
      </div>
    </AppProvider>
  )
}
