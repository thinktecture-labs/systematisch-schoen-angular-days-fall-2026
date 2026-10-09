# Token-Sets

Drei Ebenen, eine Datei pro Set, alles im DTCG-Format (`$type`, `$value`, optional `$description`):

| Set    | Datei                                                                        | Ebene                                                  | Beispiel                                                     |
| ------ | ---------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| `ref`  | `ref/palette.json`, `ref/typeface.json`                                      | Primitive: Tonal Palettes, Schriften                   | `ref.palette.primary.40` = `#6750a4`                         |
| `sys`  | `sys/color/light.json`, `sys/color/dark.json`                                | Semantic: Farbrollen, je Theme eine Datei              | `sys.color.primary` = `{ref.palette.primary.40}`             |
| `sys`  | `sys/typescale.json`, `sys/shape.json`, `sys/spacing.json`, `sys/state.json` | Semantic: Typografie, Radien, Abstände, Zustände       | `sys.typescale.body-large.size` = `16px`                     |
| `comp` | `comp/button.json`                                                           | Component: was eine Komponente braucht, nur Referenzen | `comp.button.filled.container-color` = `{sys.color.primary}` |

Regeln:

- `ref` wird nie direkt in Komponenten verwendet, nur von `sys` referenziert.
- `sys` kennt Rollen, keine Komponenten. Light und Dark unterscheiden sich nur in `sys/color/`.
- `comp` enthält ausschließlich Referenzen auf `sys`. Dadurch bleibt die Komponentenebene beim Theme-Wechsel unverändert.
- Ausgabe: `npm run build:tokens` → `projects/ui/src/lib/styles/tokens/tokens.css`, Namen aus Pfad + Prefix `md`.

`ref/palette.json`, `sys/color/*.json`, `sys/typescale.json` und `sys/shape.json` erzeugt `npm run generate:tokens`
(Seed-Farbe → Paletten, Typescale und Shape aus dem Figma-Export). Der Rest ist Handarbeit.
