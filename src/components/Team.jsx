import { useLanguage } from "./LanguageContext.jsx";

export default function Team() {
  const { t } = useLanguage();
  const team = t.team;
  const partners = t.hero?.partners || [
    { label: "WPF HAITI" },
    { label: "AVSI GROUP" },
    { label: "MSF SOLIDARITÉ" },
    { label: "COMMUNAUTÉS ACTIVES" },
  ];

  return (
    <section className="team-section" id="partenaires">
      <span id="equipe" className="visually-hidden-anchor" />
      <div className="wrap">
        <div className="section-head text-center reveal">
          <p className="eyebrow">{team.eyebrow}</p>
          <h2>{team.title}</h2>
          <p className="section-lead">{team.lead}</p>
        </div>

        <div className="team-members-grid">
          {team.members.map((member) => (
            <div className="team-member-card reveal" key={member.name}>
              <div className="team-member-avatar-wrap">
                {member.photo ? (
                  <img
                    className="team-member-avatar"
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="team-member-avatar-placeholder" aria-hidden="true">
                    {member.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div className="team-member-avatar-ring" aria-hidden="true" />
              </div>
              <div className="team-member-info">
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Partners Showcase Section */}
        <div className="team-partners-showcase reveal">
          <div className="team-partners-header text-center">
            <h3 className="team-partners-title">
              {team.partnersTitle || "Partenaires engagés aux côtés de MAKAYA"}
            </h3>
            <p className="team-partners-lead">
              {team.partnersLead ||
                "Nous collaborons avec des organisations locales et internationales pour démultiplier l'impact sur le terrain."}
            </p>
          </div>
          <div className="team-partners-logos-grid">
            {partners.map((partner, idx) => (
              <div className="team-partner-chip" key={idx}>
                <span className="material-symbols-rounded partner-chip-icon" aria-hidden="true">
                  verified
                </span>
                <span className="partner-chip-name">{partner.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
