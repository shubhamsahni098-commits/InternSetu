import React from "react";
import "./Features.css";
import "../index2.css";
import { useLanguage } from "../context/LanguageContext";

export default function Features() {

  const { t } = useLanguage();

  return (
    <>
      <div className="features m-aut">

        <div>
          <h1 className="cnt f-h1">
            {t.keyFeatures}
          </h1>
        </div>


        <div className="feat-in flex wrap gap-f hv-cnt">

          {/* AI MATCHING */}

          <div className="feat-cards">

            <h3 className="cnt f-h">
              {t.aiMatching}
            </h3>

            <p className="cnt f-p">
              {t.aiMatchingDesc}
            </p>

          </div>


          {/* SKILL MATCHING */}

          <div className="feat-cards">

            <h3 className="cnt f-h">
              {t.skillBasedMatching}
            </h3>

            <p className="cnt f-p">
              {t.skillBasedMatchingDesc}
            </p>

          </div>


          {/* LOCATION MATCHING */}

          <div className="feat-cards">

            <h3 className="cnt f-h">
              {t.locationBasedMatching}
            </h3>

            <p className="cnt f-p">
              {t.locationBasedMatchingDesc}
            </p>

          </div>


          {/* PERSONALIZED */}

          <div className="feat-cards">

            <h3 className="cnt f-h">
              {t.personalizedRecommendations}
            </h3>

            <p className="cnt f-p">
              {t.personalizedRecommendationsDesc}
            </p>

          </div>


          {/* SEARCH */}

          <div className="feat-cards">

            <h3 className="cnt f-h">
              {t.smartSearchFilters}
            </h3>

            <p className="cnt f-p">
              {t.smartSearchFiltersDesc}
            </p>

          </div>


          {/* MATCH SCORE */}

          <div className="feat-cards">

            <h3 className="cnt f-h">
              {t.matchScore}
            </h3>

            <p className="cnt f-p">
              {t.matchScoreDesc}
            </p>

          </div>

        </div>

      </div>
    </>
  );
}