# Systematisch schön – Mit Design Tokens & Angular auf dem Weg zum skalierbaren Designsystem

[Angular Days Herbst 2026](https://javascript-days.de/angular/angular-auf-dem-weg-zum-skalierbaren-designsystem/), Berlin & online, 12. Oktober 2026

Trainer: Sascha Lehmann ([@derLehmann_S](https://twitter.com/derLehmann_S)) ([@Thinktecture](https://www.thinktecture.com/thinktects/sascha-lehmann/))

Designsysteme entfalten ihre volle Wirkung erst dann, wenn Design und Code nahtlos zusammenspielen. In diesem Workshop zeigt Sascha Lehmann, Consultant bei der Thinktecture AG, wie sich Design Tokens aus Figma effizient in Angular-Projekte integrieren lassen.

In diesem Hands-On Workshop bauen Sie gemeinsam eine themenfähige Komponentenbibliothek, die auf modernen Angular-Prinzipien wie Standalone Components und Signals basiert. Tools wie Style Dictionary und Storybook helfen dabei, Tokens nicht nur technisch nutzbar zu machen, sondern auch dokumentier- und testbar.

## Installationsanweisungen

Sie können mitentwickeln: Bitte bringen Sie dazu Ihr Notebook mit installiertem [Google Chrome](https://www.google.com/chrome/), [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) (Version 22 oder 24) und [WebStorm](https://www.jetbrains.com/webstorm/) oder [Visual Studio Code](https://code.visualstudio.com/) mit. **Figma wird nicht benötigt**: Der Figma-Export liegt im Repository.

Es ist ein uneingeschränkter Internetzugriff erforderlich (ohne Gruppenrichtlinien, Unternehmensproxys und -firewalls), bitte im Zweifel das Privatnotebook einpacken.

Nach dem Klonen des Repositorys führen Sie bitte folgende Kommandos auf der Kommandozeile aus:

```sh
npm i
npm start           # Demo-App:  http://localhost:4200
npm run storybook   # Storybook: http://localhost:6006
```

Beide Kommandos bauen vorher die Tokens (`npm run build:tokens`). Wenn die Demo-App mit lila Buttons und einer Farbtabelle erscheint, ist alles bereit.

---

Das Projekt beruht auf der [Angular CLI](https://github.com/angular/angular-cli) Version 22.2, Style Dictionary 5.6 und Storybook 10.6.

## Was ist wo

| Pfad                                           | Inhalt                                                                                                                                                                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokens/`                                      | Die Design Tokens im [DTCG-Format](https://www.designtokens.org/tr/drafts/format/), ein Set pro Datei: `ref/` (Primitives), `sys/` (Semantic), `comp/` (Component). **Das ist im Workshop eure Figma.** |
| `figma/`                                       | Der rohe Variables-Export aus Figma, so wie ein Plugin ihn liefert. Nur zum Anschauen.                                                                                                                  |
| `config.json`                                  | Style-Dictionary-Konfiguration: welche Dateien, welche Transformationen, welche Ausgabe.                                                                                                                |
| `scripts/`                                     | `generate-tokens.mjs` (Seed-Farbe → Paletten → Rollen), `build-tokens.mjs` (Light + Dark → `light-dark()`).                                                                                             |
| `projects/ui/`                                 | Die Komponentenbibliothek: globale Styles, Button, Storybook.                                                                                                                                           |
| `projects/ui/src/lib/styles/tokens/tokens.css` | **Generiert.** Nie editieren, immer `npm run build:tokens`.                                                                                                                                             |
| `projects/demo/`                               | Demo-App, die die Bibliothek nutzt.                                                                                                                                                                     |

Die Pipeline:

```
figma/*.json ──(generate-tokens)──▶ tokens/**/*.json ──(Style Dictionary)──▶ tokens.css ──(ui.scss)──▶ Angular + Storybook
   Export                             DTCG-Sets                               Custom Properties
```

Namen entstehen aus dem Pfad plus Prefix: `sys.color.primary` wird zu `--md-sys-color-primary`, `comp.button.filled.container-color` zu `--md-comp-button-filled-container-color`.

## Checkpoints

Jede Übung hat einen Branch mit der Lösung. Alle Branches haben dieselben Abhängigkeiten, ein `npm i` reicht.

| Branch             | Stand                                                          |
| ------------------ | -------------------------------------------------------------- |
| `main`             | Startpunkt                                                     |
| `step-1-tokens`    | Übung 1 gelöst: Referenzen und Component-Tokens                |
| `step-2-theming`   | Übung 2 gelöst: Light/Dark mit `light-dark()`                  |
| `step-3-button`    | Übung 3 gelöst: Button auf Tokens, Angular Material angebunden |
| `step-4-storybook` | Übung 4 gelöst, identisch mit `solution`                       |

Du hängst oder warst in der Pause? Eigenen Stand sichern und zum Checkpoint springen:

```sh
git stash                              # eigene Änderungen parken
git checkout step-2-theming            # Stand nach Übung 2
git checkout -b mein-stand             # und darauf weiterarbeiten
```

## Übungen

### Übung 1 · Tokens → CSS (20 Minuten)

Ziel: Eine Token-Datei lesen, den Build verstehen, eigene Component-Tokens mit Referenzen anlegen.

1. `npm run build:tokens` ausführen und `projects/ui/src/lib/styles/tokens/tokens.css` öffnen. Woher kommt der Name `--md-sys-color-primary`? Vergleiche mit `tokens/sys/color/light.json` und `config.json`.
2. Alle Werte sind aufgelöst, die Kette Primitive → Semantic ist weg. In `config.json` beim Eintrag unter `files` ergänzen: `"options": { "outputReferences": true }`. Neu bauen und vergleichen: `--md-sys-color-primary: var(--md-ref-palette-primary-40)`.
3. Component-Tokens anlegen: `tokens/comp/button.json`

   ```json
   {
     "comp": {
       "button": {
         "container-shape": { "$type": "dimension", "$value": "{sys.shape.corner.full}" },
         "filled": {
           "container-color": { "$type": "color", "$value": "{sys.color.primary}" }
         }
       }
     }
   }
   ```

   Ergänze mindestens: `filled.label-color`, `tonal.container-color`, `tonal.label-color`, `outlined.outline-color`, `outlined.label-color`, `text.label-color`, `padding-inline` (aus `sys.spacing`). Bauen und im Output nachsehen, worauf die neuen Variablen zeigen.

Kür: In `tokens/ref/palette.json` den Wert von `primary.40` ändern, bauen, `npm start`. Was ändert sich, was nicht? Warum stehen in `tokens.css` keine Dark-Werte?

Checkpoint: `git checkout step-1-tokens`

### Übung 2 · Light & Dark ohne Service (15 Minuten)

Ziel: Zwei Themes aus einer Quelle, Umschalten mit einer Zeile CSS.

1. `tokens/sys/color/dark.json` ansehen: gleiche Rollen, andere Tonstufen. Dann die Datei in `config.json` zur `source` hinzufügen und bauen. Was meldet Style Dictionary, welcher Wert gewinnt? Danach wieder entfernen.
2. In `package.json` umstellen: `"build:tokens": "node scripts/build-tokens.mjs"`. Das Skript lesen (ein Build pro Theme, dann `light-dark()`), `npm run build:tokens` ausführen und in `tokens.css` nach `light-dark(` suchen. Welche Tokens haben zwei Werte, welche nicht, und warum?
3. In `projects/demo/src/app/app.ts` die Methode `toggleTheme()` implementieren: `document.documentElement.style.colorScheme = 'dark'` bzw. `'light'`, `''` schaltet zurück auf die Systemeinstellung. Das Signal `theme` mitführen, Reihenfolge system → light → dark → system.
4. Teilbaum-Theming: In `app.html` eine `<section class="card" style="color-scheme: dark">` mit etwas Text einfügen. Eine dunkle Karte auf heller Seite, ohne JavaScript.

Kür: Eigene Markenfarbe: `npm run generate:tokens -- --seed "#006a6a"`, bauen, Demo ansehen. Zurück mit `npm run generate:tokens`.

Checkpoint: `git checkout step-2-theming`

### Übung 3 · Themenfähige Komponente (20 Minuten)

Ziel: Der Button kennt nur Token-Rollen, keine Farben. Varianten sind Attribute, nicht Klassen.

Dateien: `projects/ui/src/lib/button/button.ts`, `button.scss`, Demo `projects/demo/src/app/app.html`.

1. Host-Bindings in `button.ts` ergänzen: `'[attr.variant]': 'variant()'` und `'[attr.size]': 'size()'`.
2. In `button.scss` jeden Hex-Wert und jedes feste Maß durch ein Token ersetzen: `var(--md-comp-button-filled-container-color)`, `var(--md-comp-button-container-shape)`, `var(--md-comp-button-padding-inline)`. Typografie über `@use '../styles/mixins/typography'` und `@include typography.style('label-large')`, Zustände über `@use '../styles/mixins/state'` und `@include state.layer`.
3. Varianten per Attribut-Selektor: `:host([variant='tonal'])`, `:host([variant='outlined'])`, `:host([variant='text'])`. Größen `:host([size='s'])` und `:host([size='l'])` über `--md-sys-spacing-*` und die Typescale-Stile `label-medium` bzw. `title-medium`.
4. In der Demo alle Varianten einbauen, Theme umschalten, den Teilbaum aus Übung 2 prüfen. Steht noch ein Hex-Wert im Button, ist er nicht fertig.

Kür: Angular Material an dieselben Tokens hängen. `projects/ui/src/lib/styles/mat/theme.scss` anlegen:

```scss
@use '@angular/material' as mat;

html {
  @include mat.theme(
    (
      color: mat.$violet-palette,
      typography: 'Quattrocento Sans',
      density: 0,
    )
  );
  --mat-sys-primary: var(--md-sys-color-primary);
  --mat-sys-on-primary: var(--md-sys-color-on-primary);
  // … weitere Rollen
}
```

In `ui.scss` mit `@use 'mat/theme';` laden und in der Demo `<button matButton="filled">` neben den eigenen Button stellen (`MatButton` aus `@angular/material/button` importieren).

Checkpoint: `git checkout step-3-button`

### Übung 4 · Storybook (20 Minuten)

Ziel: Jede Variante sichtbar und dokumentiert, in beiden Themes, mit Barrierefreiheits-Check.

1. `npm run storybook` starten. `projects/ui/src/lib/button/button.stories.ts` anlegen: `meta` mit `component: Button`, `tags: ['autodocs']`, `argTypes` für `variant` und `size` (`control: 'select'`), und `render` mit eigenem Template, weil der Button Content Projection nutzt:

   ```ts
   render: (args) => ({
     props: args,
     template: `<button ds-button [variant]="variant" [size]="size">{{ label }}</button>`,
   }),
   ```

   Stories: `Filled`, `Tonal`, `Outlined`, `Text`, `Sizes`.

2. Theme-Toolbar in `projects/ui/.storybook/preview.ts`: `globalTypes.theme` mit den Werten `system`, `light`, `dark` und ein Decorator, der wie in Übung 2 `document.documentElement.style.colorScheme` setzt.
3. Panel „Accessibility“ öffnen und `Outlined` sowie `Text` im Dark-Theme prüfen. Was meldet axe, und welches Token müsstest du ändern, nicht welche Komponente?

Kür: Die Token-Story (`projects/ui/src/stories/tokens.stories.ts`) um Spacing und Shape erweitern.

Checkpoint: `git checkout step-4-storybook`

## Hinweise und Links

- Die Dateien unter `tokens/` entsprechen dem, was [Tokens Studio](https://tokens.studio/) als Sets exportiert (eine Datei pro Set). Echte Tokens-Studio-Exporte brauchen zusätzlich [`@tokens-studio/sd-transforms`](https://github.com/tokens-studio/sd-transforms).
- Style Dictionary kann seit Version 4 sowohl das DTCG-Format (`$value`, `$type`) als auch sein eigenes Format (`value`, `type`) lesen, nur nicht gemischt in einem Build.
- [Design Tokens Format Module (DTCG)](https://www.designtokens.org/tr/drafts/format/) · [Style Dictionary](https://styledictionary.com/) · [Material Design 3 Color System](https://m3.material.io/styles/color/system/overview) · [Angular Material Theming](https://material.angular.dev/guide/theming) · [Storybook für Angular](https://storybook.js.org/docs/get-started/frameworks/angular)
