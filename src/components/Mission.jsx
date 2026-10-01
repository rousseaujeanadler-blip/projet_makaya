import { useLanguage } from "./LanguageContext.jsx";

export default function Mission() {
  const { t } = useLanguage();
  const missionT = t.mission;

  return (
    <section className="mission-event-section" id="mission">
      <div className="wrap">
        <div className="mission-event-grid">
          {/* Left: Emotional Photo with background watermark */}
          <div className="mission-event-visual reveal">
            <div className="mission-photo-frame">
              <img
                src={missionT.image || "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"}
                alt={missionT.imageAlt || "Enfants et éducation communautaire en Haïti"}
                className="mission-main-img"
              />
              <div className="mission-watermark-txt" aria-hidden="true">
                {missionT.watermark || "HOPE"}
              </div>
            </div>
          </div>

          {/* Right: Content + Core Values & Actions */}
          <div className="mission-event-content reveal">
            <p className="eyebrow">{missionT.eyebrow || "À PROPOS DE MAKAYA"}</p>
            <h2 className="mission-event-title">
              {missionT.h2Line1 || "Une action essentielle"} <br />
              <span className="accent-word">{missionT.h2Accent || "pour les communautés"}</span>
            </h2>
            <div className="title-accent-bar" aria-hidden="true" />
            <p className="mission-event-desc">{missionT.text}</p>
            <p className="mission-event-sub">
              {missionT.quote ||
                "Le changement durable naît lorsque les communautés sont écoutées et actrices de leur avenir."}
            </p>

            {/* Core Values & Program Actions */}
            <div className="mission-highlights-card">
              <div className="mission-values-grid">
                {(missionT.values || [
                  { icon: "verified", text: "Dignité & Droits fondamentaux" },
                  { icon: "diversity_3", text: "Action ancrée au cœur des communautés" },
                  { icon: "eco", text: "Résilience & Développement durable" },
                ]).map((val, idx) => (
                  <div className="mission-value-item" key={idx}>
                    <span className="material-symbols-rounded" aria-hidden="true">{val.icon}</span>
                    <span className="mission-value-text">{val.text}</span>
                  </div>
                ))}
              </div>

              <div className="mission-actions-row">
                <a href="#programmes" className="btn btn-secondary btn-lg">
                  <span>{missionT.ctaText || "Découvrir nos programmes"}</span>
                  <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
                </a>
                <a href="#contact" className="btn btn-outline-dark btn-lg">
                  <span>{missionT.contactCta || "Nous contacter"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
