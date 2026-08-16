import { useEffect, useState } from "react";
import "./Hero.css";

import b1 from "../assets/banners/b1.jpg";
import b2 from "../assets/banners/b2.jpg";
import b3 from "../assets/banners/b3.jpeg";
import b4 from "../assets/banners/b4.jpg";
import b5 from "../assets/banners/b5.jpg";
import b6 from "../assets/banners/b6.jpg";

function Hero() {
  const banners = [b1, b2, b3, b4, b5];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section className="hero">
      <div className="hero-slider">
        <img
          src={banners[currentSlide]}
          alt="Government initiative"
          className="hero-banner"
        />

        <button
          className="hero-arrow hero-prev"
          onClick={() =>
            setCurrentSlide(
              (currentSlide - 1 + banners.length) % banners.length
            )
          }
        >
          ❮
        </button>

        <button
          className="hero-arrow hero-next"
          onClick={() =>
            setCurrentSlide((currentSlide + 1) % banners.length)
          }
        >
          ❯
        </button>

        <div className="hero-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={index === currentSlide ? "dot active" : "dot"}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;