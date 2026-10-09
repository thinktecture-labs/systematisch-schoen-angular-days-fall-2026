import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Button } from '@ui';

interface Swatch {
  role: string;
  on: string;
}

type Theme = 'system' | 'light' | 'dark';

@Component({
  selector: 'app-root',
  imports: [Button, MatButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly theme = signal<Theme>('system');

  protected readonly swatches: Swatch[] = [
    { role: 'primary', on: 'on-primary' },
    { role: 'primary-container', on: 'on-primary-container' },
    { role: 'secondary', on: 'on-secondary' },
    { role: 'secondary-container', on: 'on-secondary-container' },
    { role: 'tertiary', on: 'on-tertiary' },
    { role: 'tertiary-container', on: 'on-tertiary-container' },
    { role: 'error', on: 'on-error' },
    { role: 'error-container', on: 'on-error-container' },
    { role: 'surface', on: 'on-surface' },
    { role: 'surface-container', on: 'on-surface' },
    { role: 'surface-container-highest', on: 'on-surface-variant' },
    { role: 'inverse-surface', on: 'inverse-on-surface' },
  ];

  protected readonly typescale = [
    'display-large',
    'headline-medium',
    'title-large',
    'body-large',
    'body-medium',
    'label-large',
  ];

  /**
   * Theme-Switch ohne Service: `color-scheme` am Root reicht, `light-dark()` in den Tokens
   * erledigt den Rest. Ein leerer Wert gibt die Entscheidung an das Betriebssystem zurück.
   */
  protected toggleTheme(): void {
    const next: Record<Theme, Theme> = { system: 'light', light: 'dark', dark: 'system' };
    const theme = next[this.theme()];
    this.theme.set(theme);
    document.documentElement.style.colorScheme = theme === 'system' ? '' : theme;
  }
}
