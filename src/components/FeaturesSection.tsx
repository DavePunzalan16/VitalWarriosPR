export default function FeaturesSection() {
  const features = [
    {
      icon: "fas fa-user-check",
      title: "Student Identification",
      description:
        "Instantly recognize and verify UE students through advanced facial recognition algorithms with biometric authentication",
      stat: "99.9% Accuracy",
    },
    {
      icon: "fas fa-thermometer-half",
      title: "Temperature Detection",
      description:
        "Non-contact thermal imaging to detect elevated body temperature and fever symptoms with precision monitoring",
      stat: "±0.1°C Precision",
    },
    {
      icon: "fas fa-head-side-cough",
      title: "Symptom Analysis",
      description:
        "AI-powered detection of visible symptoms including cough, runny nose, fatigue, and other health indicators",
      stat: "15+ Symptoms",
    },
    {
      icon: "fas fa-chart-line",
      title: "Health Analytics",
      description:
        "Comprehensive health reports and trend analysis for better health management and early intervention",
      stat: "Real-time Reports",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Privacy Protection",
      description: "End-to-end encryption and secure data handling to protect student information with GDPR compliance",
      stat: "256-bit Encryption",
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Cross-Platform",
      description: "Seamless experience across desktop, tablet, and mobile devices with responsive design",
      stat: "All Devices",
    },
  ]

  return (
    <section id="features" className="features-section section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Core Features</h2>
          <p className="section-subtitle">
            Advanced capabilities designed for comprehensive health monitoring and student safety
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-stats">
                <span>{feature.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
