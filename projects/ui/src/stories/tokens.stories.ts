import type { Meta, StoryObj } from '@storybook/angular';

/**
 * Token-Dokumentation: liest die generierten Custom Properties direkt aus tokens.css.
 * Ändert sich ein Token, ändert sich diese Seite, ohne dass jemand Werte abschreibt.
 */
const ROLES: [string, string][] = [
  ['primary', 'on-primary'],
  ['primary-container', 'on-primary-container'],
  ['secondary', 'on-secondary'],
  ['secondary-container', 'on-secondary-container'],
  ['tertiary', 'on-tertiary'],
  ['tertiary-container', 'on-tertiary-container'],
  ['error', 'on-error'],
  ['error-container', 'on-error-container'],
  ['surface', 'on-surface'],
  ['surface-container-low', 'on-surface'],
  ['surface-container', 'on-surface'],
  ['surface-container-high', 'on-surface'],
  ['surface-container-highest', 'on-surface-variant'],
  ['inverse-surface', 'inverse-on-surface'],
];

const TYPESCALE = [
  'display-large',
  'display-medium',
  'display-small',
  'headline-large',
  'headline-medium',
  'headline-small',
  'title-large',
  'title-medium',
  'title-small',
  'body-large',
  'body-medium',
  'body-small',
  'label-large',
  'label-medium',
  'label-small',
];

const meta: Meta = {
  title: 'Tokens/Übersicht',
  parameters: { layout: 'padded' },
};

export default meta;

export const Farbrollen: StoryObj = {
  render: () => ({
    props: { roles: ROLES },
    styles: [
      `.swatches { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); gap: var(--md-sys-spacing-2); }
       .swatches li { min-height: 5rem; padding: var(--md-sys-spacing-4); border-radius: var(--md-sys-shape-corner-medium); outline: 1px solid var(--md-sys-color-outline-variant); display: flex; flex-direction: column; justify-content: space-between; }
       .swatches span { font-size: var(--md-sys-typescale-label-medium-size); }`,
    ],
    template: `
      <ul class="swatches">
        @for (r of roles; track r[0]) {
          <li [style.background]="'var(--md-sys-color-' + r[0] + ')'" [style.color]="'var(--md-sys-color-' + r[1] + ')'">
            <strong>{{ r[0] }}</strong>
            <span>{{ r[1] }}</span>
          </li>
        }
      </ul>`,
  }),
};

export const Typescale: StoryObj = {
  render: () => ({
    props: { styles: TYPESCALE },
    styles: [
      `.row { display: flex; align-items: baseline; gap: var(--md-sys-spacing-4); margin-block-end: var(--md-sys-spacing-2); } code { min-width: 10rem; opacity: 0.7; }`,
    ],
    template: `
      @for (s of styles; track s) {
        <div class="row">
          <code>{{ s }}</code>
          <p [style.font]="'var(--md-sys-typescale-' + s + '-weight) var(--md-sys-typescale-' + s + '-size) / var(--md-sys-typescale-' + s + '-line-height) var(--md-sys-typescale-' + s + '-font)'"
             [style.letter-spacing]="'var(--md-sys-typescale-' + s + '-tracking)'">Systematisch schön</p>
        </div>
      }`,
  }),
};
