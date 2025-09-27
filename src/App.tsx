"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import AboutSection from "./components/AboutSection"
import FeaturesSection from "./components/FeaturesSection"
import ScannerSection from "./components/ScannerSection"
import Chatbot from "./components/Chatbot"
import VitalWarriorGuide from "./components/VitalWarriorGuide"
import AnalyticsSection from "./components/AnalyticsSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import CameraModal from "./components/CameraModal"
import AuthModal from "./components/AuthModal"
import LoadingScreen from "./components/LoadingScreen"
import Toast from "./components/Toast"
import { AppProvider } from "./context/AppContext"
import "./App.css"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 9000)

    return () => clearTimeout(timer)
  }, [])

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
          <Chatbot />
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

export default App