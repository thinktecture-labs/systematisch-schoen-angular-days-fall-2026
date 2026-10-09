#!/usr/bin/env node
/**
 * Erzeugt die Token-Sets unter tokens/ nach Material Design 3.
 *
 *   npm run generate:tokens                       # Seed #6750A4 (M3-Baseline)
 *   npm run generate:tokens -- --seed "#006A6A"   # eigene Markenfarbe
 *
 * Farben:    Seed-Farbe → fünf Tonal Palettes (ref.palette) → Farbrollen für
 *            Light und Dark (sys.color). Gleicher Algorithmus wie der Material
 *            Theme Builder in Figma (@material/material-color-utilities).
 * Typescale: aus dem Figma-Export figma/variablesToken.json (Collection "Size").
 * Shape:     aus dem Figma-Export (Collection "Corner").
 *
 * Alles andere unter tokens/ (typeface, state, spacing, comp) ist Handarbeit
 * und wird hier nicht angefasst.
 */
import { argbFromHex, hexFromArgb, themeFromSourceColor } from '@material/material-color-utilities';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const seedIndex = args.indexOf('--seed');
const seed = seedIndex >= 0 ? args[seedIndex + 1] : '#6750A4';
if (!/^#?[0-9a-f]{6}$/i.test(seed ?? '')) {
  console.error(`Ungültige Seed-Farbe "${seed}". Erwartet wird z. B. --seed "#006A6A".`);
  process.exit(1);
}

const theme = themeFromSourceColor(argbFromHex(seed));

// Tonstufen nach M3: 13 Standardstufen, Neutral-Paletten zusätzlich mit Surface-Stufen.
const TONES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
const NEUTRAL_TONES = [
  0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100,
];
const PALETTES = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  error: 'error',
  neutral: 'neutral',
  'neutral-variant': 'neutralVariant',
};

// Farbrolle → [Palette, Tonstufe Light, Tonstufe Dark] (Material Design 3 Color System)
const ROLES = {
  primary: ['primary', 40, 80],
  'on-primary': ['primary', 100, 20],
  'primary-container': ['primary', 90, 30],
  'on-primary-container': ['primary', 30, 90],
  'inverse-primary': ['primary', 80, 40],
  'primary-fixed': ['primary', 90, 90],
  'primary-fixed-dim': ['primary', 80, 80],
  'on-primary-fixed': ['primary', 10, 10],
  'on-primary-fixed-variant': ['primary', 30, 30],
  secondary: ['secondary', 40, 80],
  'on-secondary': ['secondary', 100, 20],
  'secondary-container': ['secondary', 90, 30],
  'on-secondary-container': ['secondary', 30, 90],
  'secondary-fixed': ['secondary', 90, 90],
  'secondary-fixed-dim': ['secondary', 80, 80],
  'on-secondary-fixed': ['secondary', 10, 10],
  'on-secondary-fixed-variant': ['secondary', 30, 30],
  tertiary: ['tertiary', 40, 80],
  'on-tertiary': ['tertiary', 100, 20],
  'tertiary-container': ['tertiary', 90, 30],
  'on-tertiary-container': ['tertiary', 30, 90],
  'tertiary-fixed': ['tertiary', 90, 90],
  'tertiary-fixed-dim': ['tertiary', 80, 80],
  'on-tertiary-fixed': ['tertiary', 10, 10],
  'on-tertiary-fixed-variant': ['tertiary', 30, 30],
  error: ['error', 40, 80],
  'on-error': ['error', 100, 20],
  'error-container': ['error', 90, 30],
  'on-error-container': ['error', 30, 90],
  surface: ['neutral', 98, 6],
  'on-surface': ['neutral', 10, 90],
  'surface-variant': ['neutral-variant', 90, 30],
  'on-surface-variant': ['neutral-variant', 30, 80],
  'surface-dim': ['neutral', 87, 6],
  'surface-bright': ['neutral', 98, 24],
  'surface-container-lowest': ['neutral', 100, 4],
  'surface-container-low': ['neutral', 96, 10],
  'surface-container': ['neutral', 94, 12],
  'surface-container-high': ['neutral', 92, 17],
  'surface-container-highest': ['neutral', 90, 22],
  'surface-tint': ['primary', 40, 80],
  'inverse-surface': ['neutral', 20, 90],
  'inverse-on-surface': ['neutral', 95, 20],
  background: ['neutral', 98, 6],
  'on-background': ['neutral', 10, 90],
  outline: ['neutral-variant', 50, 60],
  'outline-variant': ['neutral-variant', 80, 30],
  shadow: ['neutral', 0, 0],
  scrim: ['neutral', 0, 0],
};

const color = (hex) => ({ $type: 'color', $value: hex.toLowerCase() });
const dimension = (px) => ({ $type: 'dimension', $value: `${Math.round(px * 100) / 100}px` });
const kebab = (s) => s.trim().toLowerCase().replace(/\s+/g, '-');

// ---------- ref.palette ----------
const palette = {};
for (const [name, key] of Object.entries(PALETTES)) {
  const tones = name.startsWith('neutral') ? NEUTRAL_TONES : TONES;
  palette[name] = Object.fromEntries(
    tones.map((tone) => [String(tone), color(hexFromArgb(theme.palettes[key].tone(tone)))]),
  );
}

// ---------- sys.color (eine Datei pro Theme, gleiche Rollen, andere Tonstufen) ----------
const sysColor = (mode) => ({
  sys: {
    color: Object.fromEntries(
      Object.entries(ROLES).map(([role, [pal, light, dark]]) => [
        role,
        { $type: 'color', $value: `{ref.palette.${pal}.${mode === 'light' ? light : dark}}` },
      ]),
    ),
  },
});

// ---------- sys.typescale + sys.shape aus dem Figma-Export ----------
const figma = JSON.parse(readFileSync('figma/variablesToken.json', 'utf8'));
const BRAND_ROLES = ['display', 'headline', 'title'];
const MEDIUM_WEIGHT = ['title-medium', 'title-small', 'label-large', 'label-medium', 'label-small'];

const typescale = {};
for (const [name, style] of Object.entries(figma.size.Static)) {
  const key = kebab(name); // "Display Large" → display-large
  typescale[key] = {
    font: {
      $type: 'fontFamily',
      $value: BRAND_ROLES.includes(key.split('-')[0])
        ? '{ref.typeface.brand}'
        : '{ref.typeface.plain}',
    },
    weight: {
      $type: 'fontWeight',
      $value: MEDIUM_WEIGHT.includes(key)
        ? '{ref.typeface.weight-medium}'
        : '{ref.typeface.weight-regular}',
    },
    size: dimension(style.Size.value),
    'line-height': dimension(style['Line Height'].value),
    tracking: dimension(style.Tracking.value),
  };
}

const shape = {
  corner: Object.fromEntries(
    Object.entries(figma.size.Corner).map(([name, radius]) => [
      kebab(name),
      dimension(radius.value),
    ]),
  ),
};

// ---------- schreiben ----------
const write = (file, data) => {
  writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  console.log('✔︎', file);
};
mkdirSync('tokens/ref', { recursive: true });
mkdirSync('tokens/sys/color', { recursive: true });
write('tokens/ref/palette.json', { ref: { palette } });
write('tokens/sys/color/light.json', sysColor('light'));
write('tokens/sys/color/dark.json', sysColor('dark'));
write('tokens/sys/typescale.json', { sys: { typescale } });
write('tokens/sys/shape.json', { sys: { shape } });
console.log(
  `Seed ${seed}: ${Object.keys(ROLES).length} Farbrollen, ${Object.keys(typescale).length} Typescale-Stile, ${Object.keys(shape.corner).length} Radien`,
);
