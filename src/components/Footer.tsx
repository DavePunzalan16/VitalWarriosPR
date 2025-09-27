export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <i className="fas fa-shield-virus fs-2"></i>
              <h3 className="mb-0" style={{ fontFamily: "Orbitron, monospace" }}>
                VitalWarrior
              </h3>
            </div>
            <p className="text-white-50 mb-4">
              Advanced AI health monitoring system for University of the East students. Ensuring campus safety through
              innovative technology.
            </p>
            <div className="row">
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-4 fw-bold text-white">10K+</div>
                  <div className="small text-white-50">Students Protected</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-4 fw-bold text-white">99.9%</div>
                  <div className="small text-white-50">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h4 className="text-white mb-3">Quick Links</h4>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-white-50 text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white-50 text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="#features" className="text-white-50 text-decoration-none">
                  Features
                </a>
              </li>
              <li>
                <a href="#scanner" className="text-white-50 text-decoration-none">
                  Scanner
                </a>
              </li>
              <li>
                <a href="#analytics" className="text-white-50 text-decoration-none">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white-50 text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h4 className="text-white mb-3">Support</h4>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white-50 text-decoration-none">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-white-50 text-decoration-none">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white-50 text-decoration-none">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-white-50 text-decoration-none">
                  System Status
                </a>
              </li>
              <li>
                <a href="#" className="text-white-50 text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white-50 text-decoration-none">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 mb-4">
            <h4 className="text-white mb-3">Connect With Us</h4>
            <div className="d-flex gap-3 mb-4">
              <a href="#" className="text-white-50 fs-4">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white-50 fs-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white-50 fs-4">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white-50 fs-4">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-white-50 fs-4">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <div>
              <h5 className="text-white mb-3">Stay Updated</h5>
              <form className="d-flex">
                <input type="email" className="form-control me-2" placeholder="Enter your email" />
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="row align-items-center">
          <div className="col-md-8">
            <p className="mb-0 text-white-50">
              &copy; 2025 VitalWarrior. All rights reserved. | Developed for University of the East
            </p>
          </div>
          <div className="col-md-4 text-md-end">
            <div className="d-flex gap-2 justify-content-md-end">
              <span className="badge bg-success">GDPR Compliant</span>
              <span className="badge bg-primary">ISO 27001</span>
              <span className="badge bg-info">HIPAA Ready</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
