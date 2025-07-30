import "../../styles/globals.css";
const Heritage = () => {
  return (
    <section className="heritage">
      <div className="container">
        <div className="heritage-content">
          <div className="heritage-image-container">
            <img src="/images/sandeep.png?height=400&width=500" alt="Artisan" className="heritage-image" />
          </div>
          <div className="heritage-text">
            <h2 className="heritage-title" style={{ color: 'pink' }}>We bring you the boldest fashion</h2>
            <p className="heritage-paragraph" style={{ color: 'pink' }}>
              well researched and tested fabrics and inovated designs to uplift your fashion game se.ce
            </p>
            <div className="heritage-stats">
              <div className="heritage-stat">
                <div className="heritage-stat-number" style={{ color: 'pink' }}>50+</div>
                <div className="heritage-stat-label">researcher and workers</div>
              </div>
              <div className="heritage-stat">
                <div className="heritage-stat-number" style={{ color: 'pink' }}>100%</div>
                <div className="heritage-stat-label" style={{ color: 'pink' }}>fabric,color garunted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Heritage
