import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text';
export type ButtonSize = 's' | 'm' | 'l';

/**
 * Button des Designsystems.
 *
 * Setzt auf das native `<button>` bzw. `<a>` auf: Tastatur, Fokus, `disabled` und Formulare
 * kommen vom Browser. Die Komponente liefert nur Aussehen und Varianten.
 *
 * ```html
 * <button ds-button variant="outlined" size="l">Speichern</button>
 * ```
 */
@Component({
  selector: 'button[ds-button], a[ds-button]',
  template: '<ng-content />',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Übung 3: Varianten als Attribute schreiben, damit das CSS mit :host([variant='…']) reagieren kann.
  },
})
export class Button {
  variant = input<ButtonVariant>('filled');
  size = input<ButtonSize>('m');
}
