import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text';
export type ButtonSize = 's' | 'm' | 'l';

/**
 * Button des Designsystems.
 *
 * Setzt auf das native `<button>` bzw. `<a>` auf: Tastatur, Fokus, `disabled` und Formulare
 * kommen vom Browser. Die Komponente liefert nur Aussehen und Varianten, und die kennt sie
 * ausschließlich als Token-Rollen (`--md-comp-button-*`), nie als Farben.
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
    // Varianten als Attribute: das CSS reagiert mit :host([variant='…']).
    '[attr.variant]': 'variant()',
    '[attr.size]': 'size()',
  },
})
export class Button {
  variant = input<ButtonVariant>('filled');
  size = input<ButtonSize>('m');
}
