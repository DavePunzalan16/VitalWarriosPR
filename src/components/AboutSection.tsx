export default function AboutSection() {
  return (
    <section id="about" className="about-section section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About VitalWarrior</h2>
          <p className="section-subtitle">
            Empowering University of the East students with cutting-edge health monitoring technology
          </p>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="about-text">
              <h3>Revolutionizing Campus Health & Safety</h3>
              <p>
                VitalWarrior combines advanced facial recognition technology with AI-powered health analysis to provide
                instant, non-invasive health monitoring for University of the East students. Our system ensures campus
                safety while protecting student privacy through enterprise-grade security.
              </p>

              <div className="about-features">
                <div className="feature-item">
                  <i className="fas fa-eye"></i>
                  <div>
                    <h4>Advanced Vision AI</h4>
                    <p>State-of-the-art computer vision algorithms for precise facial analysis and recognition</p>
                  </div>
                </div>
                <div className="feature-item">
                  <i className="fas fa-shield-virus"></i>
                  <div>
                    <h4>Health Detection</h4>
                    <p>Identifies symptoms like fever, cough, respiratory issues, and other health indicators</p>
                  </div>
                </div>
                <div className="feature-item">
                  <i className="fas fa-database"></i>
                  <div>
                    <h4>Secure Database</h4>
                    <p>Protected student data with enterprise-grade security and GDPR compliance</p>
                  </div>
                </div>
                <div className="feature-item">
                  <i className="fas fa-mobile-alt"></i>
                  <div>
                    <h4>Cross-Platform</h4>
                    <p>Seamless experience across desktop, tablet, and mobile devices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="about-visual">
              <div className="tech-stack">
                <h4 style={{ color: "white", marginBottom: "20px" }}>Technology Stack</h4>
                <div className="row g-3">
                  <div className="col-4">
                    <div className="tech-item text-center p-3 bg-white bg-opacity-10 rounded">
                      <i className="fas fa-brain fs-2 text-white mb-2"></i>
                      <div className="text-white small">AI Vision</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="tech-item text-center p-3 bg-white bg-opacity-10 rounded">
                      <i className="fas fa-database fs-2 text-white mb-2"></i>
                      <div className="text-white small">Database</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="tech-item text-center p-3 bg-white bg-opacity-10 rounded">
                      <i className="fab fa-react fs-2 text-white mb-2"></i>
                      <div className="text-white small">React</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="tech-item text-center p-3 bg-white bg-opacity-10 rounded">
                      <i className="fab fa-js fs-2 text-white mb-2"></i>
                      <div className="text-white small">JavaScript</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="tech-item text-center p-3 bg-white bg-opacity-10 rounded">
                      <i className="fas fa-shield-alt fs-2 text-white mb-2"></i>
                      <div className="text-white small">Security</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="tech-item text-center p-3 bg-white bg-opacity-10 rounded">
                      <i className="fas fa-cloud fs-2 text-white mb-2"></i>
                      <div className="text-white small">Cloud</div>
                    </div>
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
