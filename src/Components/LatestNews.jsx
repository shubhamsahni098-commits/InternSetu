import "./LatestNews.css";
import "../index2.css";
import Features from "./Features";
import { useLanguage } from "../context/LanguageContext";

function LatestNews() {

  const { t } = useLanguage();

  return (
    <>
      <div className="middle flex wrap hv-cnt">

        <div className="news-bar">

          <div className="news-title">
            {t.latestNews}
          </div>

          <div className="news-content">

            <div className="news-track">

              <span>★</span>
              <p>{t.news1}</p>

              <span>★</span>
              <p>{t.news2}</p>

              <span>★</span>
              <p>{t.news3}</p>

            </div>

          </div>

        </div>

        <Features />

      </div>
    </>
  );
}

export default LatestNews;