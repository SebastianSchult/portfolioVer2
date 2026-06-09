# Portfolio – Sebastian Schult

Persönliche Portfolio-Website unter [sebastian-schult-dev.de](https://sebastian-schult-dev.de).
Stellt Person, Skills und ausgewählte Projekte vor und bietet ein Kontaktformular.

## Tech-Stack

- **Angular 17** (Standalone Components, Angular CLI 17.3.8)
- **TypeScript**
- **SCSS** für Styling, responsive von 360–2560px
- **ngx-translate** für Mehrsprachigkeit (Deutsch/Englisch)
- Kontaktformular versendet über `sendMail.php` (Hosting-seitig)

## Entwicklung

```bash
npm install
ng serve        # Dev-Server unter http://localhost:4200/
```

## Build

```bash
ng build        # Production-Build nach dist/
```

## Tests

```bash
ng test         # Unit-Tests via Karma
```

## Projektstruktur

- `src/app/main-content/` – Sections (Landing, About, Skills, Portfolio, Contact)
- `src/app/shared/` – Nav-Bar und Footer
- `src/app/services/` – `LanguageService` (Sprachumschaltung)
- `src/assets/i18n/` – Übersetzungen (`de.json`, `en.json`)

## Hinweise

- SEO-Grundlagen (Meta/OG/JSON-LD, `robots.txt`, `sitemap.xml`) sind im `src/`-Head bzw. als statische Assets hinterlegt.
- Interne AI-native Repo-Dokumentation (AGENT/ARCHITECTURE/DECISIONS/ROADMAP/…) liegt lokal und ist bewusst nicht Teil des öffentlichen Repos (siehe `.gitignore`).
