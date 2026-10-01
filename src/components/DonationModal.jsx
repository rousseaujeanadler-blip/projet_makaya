import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext.jsx";
import { useToast } from "./ToastContext.jsx";
import { sendToGoogleSheets } from "../services/googleSheets.js";

export default function DonationModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const modalT = t.donationModal;

  const [frequency, setFrequency] = useState("once");
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  
  // Donor contact info state
  const [donorData, setDonorData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "MonCash",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const getImpactDescription = (amount) => {
    if (amount >= 100) return modalT.presetImpacts?.[100];
    if (amount >= 50) return modalT.presetImpacts?.[50];
    if (amount >= 25) return modalT.presetImpacts?.[25];
    if (amount >= 10) return modalT.presetImpacts?.[10];
    return modalT.defaultImpact || modalT.presetImpacts?.[10] || "Chaque dollar soutient directement les actions prioritaires de MAKAYA auprès des familles et des communautés.";
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    if (currentAmount <= 0) {
      showToast(modalT.errors?.amount || "Veuillez choisir un montant valide.", "error");
      return;
    }
    if (!donorData.name.trim() || (!donorData.email.trim() && !donorData.phone.trim())) {
      showToast(modalT.errors?.contact || "Veuillez indiquer au moins votre nom et un moyen de contact (e-mail ou téléphone/WhatsApp).", "error");
      return;
    }

    setIsSubmitting(true);

    const donationPayload = {
      name: donorData.name,
      email: donorData.email,
      phone: donorData.phone,
      amount: currentAmount,
      frequency: frequency === "monthly" ? (modalT.summaryLabels?.monthly || "Mensuel") : (modalT.summaryLabels?.once || "Don Unique"),
      paymentMethod: donorData.paymentMethod,
      notes: donorData.notes,
      impact: getImpactDescription(currentAmount),
    };

    await sendToGoogleSheets("donation", donationPayload);

    setIsSubmitting(false);
    setIsSubmitted(true);
    showToast(modalT.thankYouTitle, "success");
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setDonorData({ name: "", email: "", phone: "", paymentMethod: "MonCash", notes: "" });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={resetAndClose} aria-modal="true" role="dialog">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={resetAndClose} aria-label={modalT.closeBtn || "Fermer"}>
          <span className="material-symbols-rounded" aria-hidden="true">close</span>
        </button>

        {!isSubmitted ? (
          <>
            <div className="modal-header">
              <span className="badge-pulse"><span className="material-symbols-rounded" aria-hidden="true">favorite</span> {modalT.badge || "Promesse de Don MAKAYA"}</span>
              <h2>{modalT.title}</h2>
              <p>{modalT.subtitle}</p>
            </div>

            <form onSubmit={handleDonateSubmit} className="donation-form">
              {/* Frequency Selector */}
              <div className="form-group">
                <label className="form-label">{modalT.frequencyLabel}</label>
                <div className="toggle-buttons">
                  <button
                    type="button"
                    className={`toggle-btn ${frequency === "once" ? "active" : ""}`}
                    onClick={() => setFrequency("once")}
                  >
                    {modalT.once}
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${frequency === "monthly" ? "active" : ""}`}
                    onClick={() => setFrequency("monthly")}
                  >
                    {modalT.monthly}
                  </button>
                </div>
              </div>

              {/* Amount Selector */}
              <div className="form-group">
                <label className="form-label">{modalT.amountLabel}</label>
                <div className="amount-grid">
                  {[10, 25, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className={`amount-card ${selectedAmount === amt && !customAmount ? "active" : ""}`}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                    >
                      <span className="amt-val">${amt}</span>
                    </button>
                  ))}
                </div>
                <div className="custom-amount-wrap">
                  <input
                    type="number"
                    min="1"
                    placeholder={modalT.customAmountPlaceholder}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="custom-amount-input"
                  />
                </div>
              </div>

              {/* Impact Display */}
              <div className="impact-box">
                <div className="impact-icon"><span className="material-symbols-rounded" aria-hidden="true">auto_awesome</span></div>
                <div className="impact-details">
                  <strong>{modalT.impactPrefix || "Impact"} ({currentAmount} $ {frequency === "monthly" ? (modalT.monthSuffix || "/ mois") : ""}) :</strong>
                  <p>{getImpactDescription(currentAmount)}</p>
                </div>
              </div>

              {/* Donor Contact Form Fields */}
              <div className="donor-fields-section">
                <h4>{modalT.donorInfoTitle}</h4>

                <div className="form-group">
                  <label htmlFor="donor-name">{modalT.nameLabel} *</label>
                  <input
                    id="donor-name"
                    type="text"
                    required
                    placeholder={modalT.placeholders?.name || "Ex: Marie Joseph"}
                    value={donorData.name}
                    onChange={(e) => setDonorData({ ...donorData, name: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="donor-email">{modalT.emailLabel}</label>
                    <input
                      id="donor-email"
                      type="email"
                      placeholder={modalT.placeholders?.email || "marie@gmail.com"}
                      value={donorData.email}
                      onChange={(e) => setDonorData({ ...donorData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="donor-phone">{modalT.phoneLabel} *</label>
                    <input
                      id="donor-phone"
                      type="tel"
                      placeholder={modalT.placeholders?.phone || "+509 37XX XXXX / WhatsApp"}
                      value={donorData.phone}
                      onChange={(e) => setDonorData({ ...donorData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="donor-payment-method">{modalT.preferredPaymentLabel}</label>
                  <select
                    id="donor-payment-method"
                    value={donorData.paymentMethod}
                    onChange={(e) => setDonorData({ ...donorData, paymentMethod: e.target.value })}
                  >
                    {modalT.paymentOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="donor-notes">{modalT.notesLabel}</label>
                  <textarea
                    id="donor-notes"
                    rows="2"
                    placeholder={modalT.placeholders?.notes || "Heure d'appel préférée, questions, etc."}
                    value={donorData.notes}
                    onChange={(e) => setDonorData({ ...donorData, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={isSubmitting}>
                {isSubmitting ? (modalT.submitting || "Transmission à l'équipe MAKAYA...") : `${modalT.paymentBtn} • $${currentAmount}`}
              </button>
            </form>
          </>
        ) : (
          <div className="thank-you-view">
            <div className="thank-you-icon"><span className="material-symbols-rounded" aria-hidden="true">volunteer_activism</span></div>
            <h2>{modalT.thankYouTitle}</h2>
            <p>{modalT.thankYouText}</p>
            <div className="donation-summary">
              <span>{modalT.summaryLabels?.pledge || "Promesse enregistrée :"} <strong>${currentAmount} ({frequency === "monthly" ? (modalT.summaryLabels?.monthly || "Mensuel") : (modalT.summaryLabels?.once || "Unique")})</strong></span>
              <br />
              <span>{modalT.summaryLabels?.contact || "Contact :"} <strong>{donorData.phone || donorData.email}</strong></span>
              <br />
              <span>{modalT.summaryLabels?.mode || "Mode souhaité :"} <strong>{donorData.paymentMethod}</strong></span>
            </div>
            <button className="btn btn-primary" onClick={resetAndClose}>
              {modalT.closeBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
