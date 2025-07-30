import "../../styles/globals.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  const categories = [
    { name: "Denim jacket", description: "Inspired by Nepalses Culture", image: "/images/jacket.png", badge: "New" },
    { name: "Joggers", description: "Inspired by Nepalses Culture", image: "/images/joggers.png", badge: "Best Seller" },
    { name: "Cargo pants", description: "Inspired by Nepalses Culture", image: "/images/image copy.png", badge: "Limited" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            categories.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...new Set([...prev, index])]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="categories">
      <h2 className="categories-title">
        Our <span className="categories-title-bold">Top Varieties</span>
      </h2>
      <div ref={sectionRef} className="categories-grid">
        {categories.map((category, index) => (
          <Link key={index} to="#" className={`category-card ${visibleItems.includes(index) ? "animate-in" : ""}`}>
            <div className="category-image-container">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="category-image"
              />
              <div className="category-image-overlay" />
            </div>
            <div className="category-content">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              {category.badge && <div className="category-ribbon">{category.badge}</div>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
