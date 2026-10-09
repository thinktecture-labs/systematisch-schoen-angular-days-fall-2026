# @systematisch-schoen/ui

Komponentenbibliothek des Workshops. Styling ausschließlich über Design Tokens
(`--md-ref-*`, `--md-sys-*`, `--md-comp-*`), die Style Dictionary aus `tokens/` erzeugt.

- `src/lib/styles/ui.scss` – globaler Einstieg (Tokens, Fonts, Reset, Basis-Styles), einmal pro App laden
- `src/lib/styles/tokens/tokens.css` – generiert, nicht editieren (`npm run build:tokens`)
- `src/lib/button/` – Button auf Basis des nativen `<button>`
- `.storybook/` – Storybook-Konfiguration (`npm run storybook`)

Build: `npm run build` (ng-packagr, Ausgabe in `dist/ui`).
