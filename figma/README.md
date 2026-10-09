# Figma-Export

`variablesToken.json` ist der unveränderte Variables-Export aus dem Material-3-Design-Kit in Figma
(Collections `Schemes`, `State Layers`, `Add-ons`, `Size`). So sieht das aus, was ein Plugin
wie *Tokens Studio* oder *Variables to JSON* liefert, bevor es jemand aufräumt:

- Legacy-Format von Style Dictionary (`value`/`comment`), kein `$type`, keine Referenzen
- alle 32 Figma-Modes (Light, Dark, Kontraststufen, 13 Markenfarben) als unterste Ebene jedes Tokens
- Zahlen ohne Einheit (`"Size": 57`)

Daraus baut `npm run generate:tokens` die aufgeräumten DTCG-Sets unter `tokens/`.
Niemand muss Figma installiert haben: Die Dateien unter `tokens/` sind im Workshop eure Figma.
