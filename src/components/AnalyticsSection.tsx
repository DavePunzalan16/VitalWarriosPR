export default function AnalyticsSection() {
  const analyticsData = [
    {
      title: "Daily Scans",
      value: "1,247",
      change: "+12.5%",
      changeType: "positive",
      icon: "fas fa-chart-bar",
    },
    {
      title: "Health Alerts",
      value: "23",
      change: "-8.2%",
      changeType: "negative",
      icon: "fas fa-exclamation-triangle",
    },
    {
      title: "System Uptime",
      value: "99.8%",
      change: "Excellent",
      changeType: "positive",
      icon: "fas fa-server",
    },
  ]

  return (
    <section id="analytics" className="analytics-section section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Health Analytics Dashboard</h2>
          <p className="section-subtitle">Comprehensive health monitoring and reporting system</p>
        </div>

        <div className="analytics-grid">
          {analyticsData.map((item, index) => (
            <div key={index} className="analytics-card">
              <div className="card-header">
                <h3>{item.title}</h3>
                <i className={item.icon}></i>
              </div>
              <div className="card-content">
                <div className="metric-value">{item.value}</div>
                <div className={`metric-change ${item.changeType}`}>
                  <i
                    className={`fas ${item.changeType === "positive" ? "fa-arrow-up" : item.changeType === "negative" ? "fa-arrow-down" : "fa-check"}`}
                  ></i>
                  <span>{item.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
