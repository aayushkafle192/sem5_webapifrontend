// import React from "react";
// import { Heart, Users, Globe, Award } from "lucide-react";
// import { Link } from "react-router-dom";
// import "./Aboutus.css";

// export default function AboutPage() {
//   return (
//     <div className="about-page">
//       <section className="hero">
//         <div className="container">
//           <div className="hero-content">
//             <h1 className="hero-title" style={{ color: 'pink' }}>Who are we</h1>
//             <div className="hero-divider">
              
              
//             </div>
//             <p className="hero-description">
//               A journey through  the china fashion maintaing its pride into Nepals clothing market with boldness.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Mission Section */}
//       <section className="mission">
//         <div className="container">
//           <div className="mission-grid">
//             <div className="mission-text">
//               <h2 className="mission-title">Our Mission</h2>
//               <p className="mission-paragraph">
//                 At Denim & Devils, we celebrate bold style and authentic craftsmanship rooted in Nepal’s creative spirit. Every piece in our collection reflects a fusion of modern edge and timeless tradition, handcrafted by skilled artisans who bring generations of dedication into every stitch.
//               </p>
//               <p className="mission-paragraph">
//                 We believe that every handcrafted item carries the soul of its creator and the essence of Nepalese
//                 culture. Our mission is to bring these authentic treasures to the world while supporting the communities
//                 that create them.
//               </p>
//             </div>
//             <div className="mission-visual">
//               <div className="values-grid">
//                 <div className="value-item">
//                   <Heart className="value-icon" />
//                   <h3 className="value-title">Passion</h3>
//                   <p className="value-text">For authentic craftsmanship</p>
//                 </div>
//                 <div className="value-item">
//                   <Users className="value-icon" />
//                   <h3 className="value-title">Community</h3>
//                   <p className="value-text">Supporting local artisans</p>
//                 </div>
//                 <div className="value-item">
//                   <Globe className="value-icon" />
//                   <h3 className="value-title">Heritage</h3>
//                   <p className="value-text">Preserving traditions</p>
//                 </div>
//                 <div className="value-item">
//                   <Award className="value-icon" />
//                   <h3 className="value-title">Quality</h3>
//                   <p className="value-text">Exceptional standards</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="values">
//         <div className="container">
//           <h2 className="values-title">Our Values</h2>
//           <div className="values-cards">
//             <div className="value-card">
//               <div className="card-content">
//                 <h3 className="card-title">Authenticity</h3>
//                 <p className="card-description">
//                   Every piece is genuinely crafted in Nepal using traditional methods passed down through generations.
//                 </p>
//               </div>
//             </div>
//             <div className="value-card">
//               <div className="card-content">
//                 <h3 className="card-title">Sustainability</h3>
//                 <p className="card-description">
//                   We work directly with artisan communities, ensuring fair trade practices and sustainable livelihoods.
//                 </p>
//               </div>
//             </div>
//             <div className="value-card">
//               <div className="card-content">
//                 <h3 className="card-title">Excellence</h3>
//                 <p className="card-description">
//                   We maintain the highest standards of quality while honoring the traditional craftsmanship techniques.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta">
//         <div className="container">
//           <div className="cta-content">
//             <h2 className="cta-title">Experience the Devil in you</h2>
//             <p className="cta-description">
//              Explore our handpicked collection of genuine Nepalese craftsmanship — join the Denim & Devils journey where tradition meets bold style.
//             </p>
//             <div className="cta-button-container">
//               <button className="cta-button">Shop Collection</button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }




















import React from "react";
import { Heart, Users, Globe, Award } from "lucide-react";
import { Link } from "react-router-dom";
import "./Aboutus.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">We Are Denim & Devils</h1>
          <div className="hero-divider" />
          <p className="hero-description">
            Where bold fashion meets heritage. Discover how we’re reshaping Nepal’s style narrative with global ambition.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mission">
        <div className="container mission-grid">
          <div className="mission-text">
            <h2 className="section-title">Our Mission</h2>
            <p>
              Denim & Devils reimagines Nepalese fashion with fearless energy. We merge raw edge with time-honored techniques,
              championing local artistry and sustainable innovation.
            </p>
            <p>
              Through every stitch, we honor Nepal’s heritage and empower our makers — one story, one garment at a time.
            </p>
          </div>
          <div className="mission-visual">
            <div className="values-grid">
              <div className="value-item"><Heart /><h3>Passion</h3><p>Driven by bold creativity</p></div>
              <div className="value-item"><Users /><h3>Community</h3><p>Empowering artisans</p></div>
              <div className="value-item"><Globe /><h3>Global Vision</h3><p>From Nepal to the world</p></div>
              <div className="value-item"><Award /><h3>Craft</h3><p>Rooted in excellence</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <div className="container">
          <h2 className="section-title text-center">What We Stand For</h2>
          <div className="values-cards">
            <div className="value-card">
              <h3>Authenticity</h3>
              <p>Handmade with cultural roots and real craftsmanship.</p>
            </div>
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>We prioritize ethical sourcing and long-term impact.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>Modern designs fused with time-tested tradition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container text-center">
          <h2>Unleash the Devil in You</h2>
          <p>
            Join the movement of daring fashion and cultural expression. Wear what speaks your spirit.
          </p>
          <Link to="/shop">
            <button className="cta-button">Explore Collection</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
