# Systematisch schön - Mit Design Tokens & Angular auf dem Weg zum skalierbaren Designsystem

[Angular Days 2025](https://javascript-days.de/angular/angular-auf-dem-weg-zum-skalierbaren-designsystem/), 23. Oktober 2025, 13:30–17:,0

Trainer: Sascha Lehmann ([@derLehmann_S](https://twitter.com/derLehmann_S)) ([@Thinktecture](https://www.thinktecture.com/thinktects/sascha-lehmann/))

Designsysteme entfalten ihre volle Wirkung erst dann, wenn Design und Code nahtlos zusammenspielen. In diesem Workshop zeigt Sascha Lehmann, Consultant bei der Thinktecture AG, wie sich Design Tokens aus Figma effizient in Angular-Projekte integrieren lassen.

In diesem Hands-On Workshop bauen Sie gemeinsam eine themenfähige Komponentenbibliothek, die auf modernen Angular-Prinzipien wie Standalone Components und Signals basiert. Tools wie Style Dictionary und Storybook helfen dabei, Tokens nicht nur technisch nutzbar zu machen, sondern auch dokumentier- und testbar.

## Installationsanweisungen

Sie können mitentwickeln: Bitte bringen Sie dazu Ihr Notebook mit installiertem [Google Chrome](https://www.google.com/chrome/) ([Canary](https://www.google.com/chrome/canary/)), [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) und [WebStorm](https://www.jetbrains.com/webstorm/) oder [Visual Studio Code](https://code.visualstudio.com/) mit.

Es ist ein uneingeschränkter Internetzugriff erforderlich (ohne Gruppenrichtlinien, Unternehmensproxys und -firewalls), bitte im Zweifel das Privatnotebook einpacken.

Nach dem Klonen des Repositorys führen Sie bitte folgende Kommandos auf der Kommandozeile aus:

```sh
npm i
npm start
```

---

Das Projekt beruht auf er [Angular CLI](https://github.com/angular/angular-cli) Version 20.3.0.

## Hands-on Lab

### 1. Tokens konvertieren

Führe zunächst den folgenden Befehl aus:

```sh
npx style-dictionary basic
```

Style-Dictionary erstellt ein grundlegendes Stetup und erzeugt eine "config.json" sowie einen "tokens" und "build" Ordner. Mit dem Befehl:

```sh
npm run build:tokens
```

kannst du die exportierten Tokens im JSON Format in alle beliebigen Formate überfüren. Das Format entspricht dem [W3C Tokens Fomrmat](https://www.designtokens.org/tr/drafts/format/)
