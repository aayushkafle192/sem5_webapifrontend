// import { Link } from "react-router-dom"
// import "../../styles/globals.css";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="container">
//         <div className="footer-content">
//           <div className="footer-grid">
//             <div className="footer-brand">
//               <img src="/images/devils.png" alt="Rolo Nepal" className="footer-logo" />
//               <p className="footer-description" style={{ color: 'pink',fontSize:'larger' }}>
//                 Creating unlimited and unique fashion collectios accross the world
//               </p>
//             </div>
//             <div>
//               <h3 className="footer-section-title" style={{ color: 'pink' ,fontSize:'larger'}}>Collections</h3>
//               <ul className="footer-links">
//                 <li>
//                   <Link to="#" className="footer-link" style={{ color: 'pink' ,fontSize:'large'}} >
//                     Ranjana mall
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="#" className="footer-link">
//                     New Road
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="footer-section-title" style={{ color: 'pink' }}>Connect</h3>
//               <div className="footer-contact">
//                 <p className="footer-contact-text" style={{ color: 'pink' }}>Kathmandu, Nepal</p>
//                 <p className="footer-contact-text" style={{ color: 'pink' }}>9843076145</p>
//               </div>
//             </div>
//           </div>
//           <div className="footer-bottom">
//             <p className="footer-copyright" style={{ color: 'pink' }}>© 2024 Denim & Devils. All rights reserved.</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer























import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(to right, #38383eff, #9797b8ff)",
        color: "#f9a8d4",
        padding: "3rem 1rem 2rem",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Footer Grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Brand */}
          <div style={{ flex: "1 1 250px" }}>
            <img
              src="/images/devils.png"
              alt="Denim & Devils"
              style={{
                width: "120px",
                marginBottom: "1rem",
              }}
            />
            <p
              style={{
                color: "#f9a8d4",
                fontSize: "1.1rem",
                lineHeight: "1.6",
              }}
            >
              Creating unlimited and unique fashion collections across the world.
            </p>
          </div>

          {/* Collections */}
          <div style={{ flex: "1 1 180px" }}>
            <h3
              style={{
                color: "#f9a8d4",
                fontSize: "1.25rem",
                marginBottom: "1rem",
              }}
            >
              Collections
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link
                  to="#"
                  style={{
                    color: "#e879f9",
                    textDecoration: "none",
                    fontSize: "1rem",
                    display: "inline-block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Ranjana Mall
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  style={{
                    color: "#e879f9",
                    textDecoration: "none",
                    fontSize: "1rem",
                    display: "inline-block",
                  }}
                >
                  New Road
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div style={{ flex: "1 1 180px" }}>
            <h3
              style={{
                color: "#f9a8d4",
                fontSize: "1.25rem",
                marginBottom: "1rem",
              }}
            >
              Connect
            </h3>
            <p style={{ marginBottom: "0.5rem" }}>Kathmandu, Nepal</p>
            <p>9843076145</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            marginTop: "3rem",
            borderTop: "1px solid #444",
            paddingTop: "1.5rem",
            textAlign: "center",
            fontSize: "0.95rem",
            color: "#fbcfe8",
          }}
        >
          © 2024 Denim & Devils. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
