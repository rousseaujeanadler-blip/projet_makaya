import { useLanguage } from "./LanguageContext.jsx";

export default function Hero({ onOpenDonate }) {
  const { t } = useLanguage();
  const heroT = t.hero;
  const heroImage = heroT.image?.startsWith("/")
    ? `${import.meta.env.BASE_URL}${heroT.image.slice(1)}`
    : heroT.image;

  const renderTitle = () => {
    if (!heroT.title) return "MAKAYA";
    if (heroT.titleAccent && heroT.title.includes(heroT.titleAccent)) {
      const parts = heroT.title.split(heroT.titleAccent);
      return (
        <>
          {parts[0]}
          <span className="accent-word">{heroT.titleAccent}</span>
          {parts.slice(1).join(heroT.titleAccent)}
        </>
      );
    }
    return heroT.title;
  };

  return (
    <>
      <section
        className="hero"
        id="top"
        style={{ "--hero-image": `url("${heroImage}")` }}
      >
        <div className="wrap">
          <div className="hero-content">
            {heroT.eyebrow && <p className="hero-eyebrow reveal">{heroT.eyebrow}</p>}
            <h1 className="reveal">
              {renderTitle()}
            </h1>

            <p className="hero-lead reveal">{heroT.lead}</p>

            <div className="hero-actions reveal">
              <button className="btn btn-primary btn-lg" onClick={onOpenDonate}>
                <span className="material-symbols-rounded" aria-hidden="true">favorite</span>
                {heroT.primaryCta}
              </button>
              <a className="btn btn-ghost btn-lg" href="#programmes">
                {heroT.secondaryCta} <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
              </a>
            </div>

            {/* Impact Quick Glance Badges */}
            <div className="hero-stats-row reveal">
              {heroT.badges.map((b, i) => (
                <div key={i} className="hero-stat-card">
                  <span className="stat-value">{b.label}</span>
                  <span className="stat-desc">{b.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners banner directly below hero as shown in reference design */}
      {heroT.partners?.length > 0 && (
        <div className="hero-partners-strip">
          <div className="wrap hero-partners-wrap">
            {heroT.partners.map((partner, idx) => (
              <span key={idx} className="hero-partner-logo">
                {partner.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
