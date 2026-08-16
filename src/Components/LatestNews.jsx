import "./LatestNews.css";

import '../index2.css'
import Features from "./Features";

function LatestNews() {
  return (
    <>
    <div className="middle flex wrap hv-cnt">
        
      <div className="news-bar">
      <div className="news-title">
        LATEST NEWS
      </div>

      <div className="news-content">
        <div className="news-track">
          <span>★</span>
          <p>PM Internship Scheme — New internship opportunities are now available.</p>

          <span>★</span>
          <p>Find internships matched to your skills with InternSetu.</p>

          <span>★</span>
          <p>Explore opportunities across India.</p>
        </div>
      </div>
      </div>
      
      <Features/>
      


    </div>
    </>
  );
}

export default LatestNews;