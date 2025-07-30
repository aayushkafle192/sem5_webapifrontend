import "../../styles/globals.css";
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title" style={{ color: 'pink' }}>
              A honkong registered<span className="hero-title-bold"  >clothing brand</span>
            </h1>
            <p className="hero-description" style={{ color: 'white' }}>When the  pride meets bold and creativity meets art</p>
            <div className="hero-buttons">
              <a href="/products" className="btn-primary" style={{ color: 'white' }}>
                More About Us
              </a>
              <a href="/aboutus" className="btn-secondary" style={{ color: 'green' }}>
                About Denim & Devils
              </a>
            </div>
          </div>
          <div className="hero-image-container">
            <img src="/images/image.png?height=500&width=400" alt="Heritage Bag" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero