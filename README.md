# Site Officiel MAKAYA

Site vitrine moderne en **React (Vite)** pour **MAKAYA** — Organisation sociale sans but lucratif engagée auprès des communautés haïtiennes par l'éducation, la protection, l'action humanitaire, l'environnement et la résilience.

---

## 🌟 Fonctionnalités principales

- **Design épuré et accessible** : Palette institutionnelle vivante (Vert primaire, Pin profond, Bleu cyan, Porcelaine), typographie fluide avec *Plus Jakarta Sans* et *Inter*, animations d'apparition au défilement (*reveal*).
- **Internationalisation complète (i18n)** : Support dynamique de 3 langues avec bascule instantanée sans rechargement :
  - Français (`fr`)
  - Kreyòl Ayisyen (`ht`)
  - English (`en`)
- **Intégration Google Sheets sans serveur** :
  - Formulaire de contact général
  - Formulaire d'engagement bénévole / terrain (Carte d'Haïti)
  - Modal de promesse de don (MonCash, Zelle, Virement bancaire, etc.)
  - Inscription à l'infolettre (newsletter)
  - Sauvegarde locale automatique (`localStorage`) en cas d'interruption réseau
- **Galerie interactive & Lightbox** : Mosaïque de photos communautaires avec visionneuse plein écran et navigation clavier.
- **Section Carte d'intervention** : Découpage interactif par département (Ouest, Nord, Artibonite) avec coordonnées terrain.
- **Déploiement continu** : Workflow GitHub Actions automatisé pour GitHub Pages.

---

## 🚀 Démarrer en local

```bash
npm install
npm run dev
```

Le site sera accessible sur `http://localhost:5173/projet_makaya/`.

---

## 📦 Construire pour la mise en ligne

```bash
npm run build
```

Le résultat est généré dans le dossier `dist/`, optimisé et prêt pour la production.

Pour prévisualiser le build localement :
```bash
npm run preview
```

---

## ⚙️ Configuration du webhook Google Sheets

Les formulaires envoient leurs requêtes vers un script Google Apps Script configuré dans :
`src/services/googleSheets.js`

Pour déployer votre propre Google Sheet, reportez-vous au script disponible dans :
`docs/google-apps-script.js`

---

## 📂 Structure du projet

```
projet_makaya/
├── .github/workflows/   → Déploiement GitHub Actions vers GitHub Pages
├── docs/                → Code Apps Script pour la feuille Google Sheets
├── public/              → Images statiques, logos et favicons
├── src/
│   ├── components/      → Composants modulaires (Header, Hero, Mission, Map, Team, Contact, etc.)
│   ├── data/
│   │   └── content.js   → Tous les textes et traductions (FR, HT, EN)
│   ├── services/
│   │   └── googleSheets.js → Connecteur de formulaires vers Google Sheets
│   ├── App.jsx          → Assemblage des sections et providers (Langue, Toast)
│   ├── index.css        → Système de design complet et responsive
│   ├── main.jsx         → Point d'entrée de l'application
│   └── useReveal.js     → Hook d'animations au défilement
├── index.html           → Balises meta, titre, favicon et polices
├── package.json         → Scripts et dépendances
└── vite.config.js       → Configuration Vite et base URL (/projet_makaya/)
```

---

## 📄 Licence

Projet distribué sous licence MIT. Tous droits réservés © 2026 MAKAYA.

