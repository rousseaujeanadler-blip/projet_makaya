import { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext.jsx";

export default function Header({ onOpenDonate }) {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const headerT = t.header || {
    location: "Haïti",
    utilityMessage: "Ensemble, renforçons les communautés.",
    contactQuick: "Contact",
    moreMenu: "Plus",
    menuAria: "Ouvrir le menu",
    closeMenuAria: "Fermer le menu",
    langAria: "Langue",
  };

  const allNav = t.nav || [];
  // Primary links to show directly in desktop navigation
  const primaryNav = allNav.filter((_, index) => [0, 1, 2, 3, 4, allNav.length - 1].includes(index));
  const moreNav = allNav.filter((_, index) => ![0, 1, 2, 3, 4, allNav.length - 1].includes(index));

  const [activeSection, setActiveSection] = useState("top");

  // Detect scroll for sticky header elevation and scroll spy
  useEffect(() => {
    const sectionIds = allNav.map((item) => item.href.replace(/^#/, "")).filter(Boolean);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Top of page
      if (window.scrollY < 100) {
        setActiveSection("top");
        return;
      }

      // Reached bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection("contact");
        return;
      }

      // Scroll spy: check which section is in view
      const offset = 140;
      let current = sectionIds[0] || "top";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allNav]);

  const isMoreNavActive = moreNav.some(
    (item) => item.href.replace(/^#/, "") === activeSection
  );

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile drawer on Escape key and manage scroll locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`site-header ${scrolled || mobileMenuOpen ? "is-scrolled" : ""} ${mobileMenuOpen ? "is-menu-open" : ""}`}>
      {/* Main Header Bar */}
      <div className="header-main">
        <div className="wrap header-wrap">
          {/* Brand / Logo */}
          <a href="#top" className="brand" aria-label={headerT.brandAria || "MAKAYA - Accueil"}>
            <img
              src={`${import.meta.env.BASE_URL}makaya-logo.png`}
              alt={headerT.brandLogoAlt || "Logo MAKAYA"}
              className="brand-mark-img"
              width="135"
              height="44"
            />
          </a>

          {/* Desktop Navigation matching the mockup */}
          <nav className="main-nav" aria-label="Navigation principale">
            {primaryNav.map((item) => {
              const sectionId = item.href.replace(/^#/, "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Dropdown for extra links */}
            {moreNav.length > 0 && (
              <div className="nav-dropdown" ref={dropdownRef}>
                <button
                  type="button"
                  className={`nav-link nav-dropdown-btn ${dropdownOpen ? "open" : ""} ${isMoreNavActive ? "active" : ""}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span>{headerT.moreMenu}</span>
                  <span className="material-symbols-rounded dropdown-icon" aria-hidden="true">
                    expand_more
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="dropdown-menu" role="menu">
                    {moreNav.map((item) => {
                      const sectionId = item.href.replace(/^#/, "");
                      const isActive = activeSection === sectionId;
                      return (
                        <a
                          key={`${item.label}-${item.href}`}
                          href={item.href}
                          role="menuitem"
                          className={`dropdown-item ${isActive ? "active" : ""}`}
                          onClick={() => setDropdownOpen(false)}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Header Right Actions */}
          <div className="header-actions">
            {/* Search Icon Trigger */}
            <a href="#programmes" className="header-search-btn" aria-label={headerT.searchAria || "Rechercher"}>
              <span className="material-symbols-rounded">search</span>
            </a>

            {/* Language Switcher */}
            <div className="lang-switcher" role="group" aria-label={headerT.langAria}>
              <button
                type="button"
                className={`lang-btn ${lang === "fr" ? "active" : ""}`}
                onClick={() => setLang("fr")}
                title="Français"
                aria-pressed={lang === "fr"}
              >
                FR
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === "ht" ? "active" : ""}`}
                onClick={() => setLang("ht")}
                title="Kreyòl Ayisyen"
                aria-pressed={lang === "ht"}
              >
                HT
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
                title="English"
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>

            {/* Donate CTA Button (Solar Yellow matching mockup) */}
            <button
              type="button"
              className="donate-header-btn"
              onClick={onOpenDonate}
              aria-label={t.hero.primaryCta}
            >
              <span>{t.hero.primaryCta}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={`mobile-menu-btn ${mobileMenuOpen ? "is-open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? headerT.closeMenuAria : headerT.menuAria}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
            >
              <span className="material-symbols-rounded" aria-hidden="true">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown ("déroule normalement sur toute la page") */}
      <div
        id="mobile-nav-panel"
        className={`mobile-menu-dropdown ${mobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-menu-inner">
          <nav className="mobile-nav" aria-label={headerT.menuAria || "Navigation mobile"}>
            {allNav.map((item) => {
              const sectionId = item.href.replace(/^#/, "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={`mobile-${item.label}-${item.href}`}
                  href={item.href}
                  className={`mobile-nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <span className="mobile-nav-text">{item.label}</span>
                  <span className="material-symbols-rounded arrow-icon" aria-hidden="true">
                    arrow_forward
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="mobile-menu-footer">
            {/* Mobile Language Switcher */}
            <div className="mobile-lang-row">
              <span className="mobile-lang-label">{headerT.langAria} :</span>
              <div className="lang-switcher">
                <button
                  type="button"
                  className={`lang-btn ${lang === "fr" ? "active" : ""}`}
                  onClick={() => setLang("fr")}
                  title="Français"
                >
                  FR
                </button>
                <button
                  type="button"
                  className={`lang-btn ${lang === "ht" ? "active" : ""}`}
                  onClick={() => setLang("ht")}
                  title="Kreyòl"
                >
                  HT
                </button>
                <button
                  type="button"
                  className={`lang-btn ${lang === "en" ? "active" : ""}`}
                  onClick={() => setLang("en")}
                  title="English"
                >
                  EN
                </button>
              </div>
            </div>

            {/* Mobile Contact Quick Action */}
            <div className="mobile-footer-actions">
              <a
                href="#contact"
                className="mobile-footer-contact-btn"
                onClick={closeMobileMenu}
              >
                <span className="material-symbols-rounded" aria-hidden="true">mail</span>
                <span>{headerT.contactQuick || "Nous contacter"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
