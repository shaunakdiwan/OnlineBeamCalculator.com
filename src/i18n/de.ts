/**
 * German copy module — vollständige Übersetzung mit natürlicher Baustatik-
 * Terminologie (Balken, Biegemoment, Querkraft, Durchbiegung, Stützweite…).
 * Must satisfy LocaleCopy; missing keys are a compile error.
 *
 * ⚠️ AI-authored translation — native-speaker review recommended before production.
 */

import type {
  MetaCopy,
  ChromeCopy,
  HomeCopy,
  HubCopy,
  FormulasCopy,
  GuideCopy,
  AboutCopy,
  ContactCopy,
  LegalCopy,
  CalculatorsCopy,
  LocaleCopy,
  PresetSlug,
  VariantSlug,
  CalculatorSlug,
} from './types';

const meta: MetaCopy = {
  defaultTitle: "Balkenrechner — Querkraft-, Biegemoment- und Durchbiegungsdiagramme kostenlos",
  defaultDescription:
    "Kostenloser Balkenrechner. Berechnen Sie Einfeldträger, Kragträger und Durchlaufträger mit sofortigen Diagrammen für Querkraft und Biegemoment. Ohne Anmeldung, ohne Limits.",
  defaultKeywords: [
    "balkenrechner",
    "balkenrechner kostenlos",
    "balkenrechner online",
    "balken berechnen",
    "balkenberechnung online",
    "stahlträger rechner",
    "holzträger rechner",
    "kragträger rechner",
    "einfeldträger rechner",
    "biegemoment",
  ],
  ogImageAlt:
    "Online-Balkenrechner: kostenlose Diagramme für Querkraft, Biegemoment und Durchbiegung",
};

const chrome: ChromeCopy = {
  nav: {
    calculator: "Rechner",
    formulas: "Formeln",
    guide: "Anleitung",
    faq: "FAQ",
    about: "Über uns",
    openCalculator: "Rechner öffnen",
    freeBadge: "100% KOSTENLOS",
    toggleTheme: "Dunkelmodus umschalten",
    languageLabel: "Sprache",
  },
  noscript:
    "Der Balkenrechner benötigt JavaScript, da die gesamte Berechnung in Ihrem Browser stattfindet. Bitte aktivieren Sie JavaScript und laden Sie die Seite neu.",
  footer: {
    calculatorsHead: "Rechner",
    materialsHead: "Materialien",
    learnHead: "Wissen",
    resourcesHead: "Ressourcen",
    brandHead: "OnlineBeamCalculator.com",
    tagline:
      "Kostenlose Berechnung von Balkentragwerken direkt im Browser. Ohne Konto, ohne Limits, ohne Installation.",
    runsClientSide: "Läuft 100% lokal im Browser",
    linkBeamCalculator: "Balkenrechner",
    linkSimplySupported: "Einfeldträger",
    linkCantilever: "Kragträger",
    linkContinuous: "Durchlaufträger",
    linkSteel: "Stahlträger",
    linkWood: "Holzträger",
    linkRidge: "Firstträger",
    linkOverhanging: "Träger mit Kragarm",
    linkFormulas: "Balkenformeln",
    linkSfdBmd: "Querkraft & Biegemoment lesen",
    linkSignConventions: "Vorzeichenkonventionen",
    linkFixedFixed: "Beidseitig eingespannter Balken",
    linkAbout: "Über uns",
    linkContactUs: "Kontakt",
    linkPrivacyPolicy: "Datenschutzerklärung",
    linkTerms: "Nutzungsbedingungen",
    bottomPrivacy: "Datenschutz",
    bottomTerms: "Nutzungsbedingungen",
    bottomContact: "Kontakt",
  },
};

const home: HomeCopy = {
  title: "Balkenrechner — Querkraft, Biegemoment & Durchbiegung online kostenlos",
  description:
    "Kostenloser Balkenrechner: Berechnen Sie online Einfeldträger, Kragträger und Durchlaufträger. Sofortige Diagramme für Querkraft, Biegemoment, Neigung und Durchbiegung. Ohne Anmeldung.",
  eyebrow: "Kostenlos · Ohne Anmeldung · Läuft in Ihrem Browser",
  h1: "Balkenrechner",
  hero:
    "Berechnen Sie online Einfeldträger, Kragträger, eingespannte Träger, Träger mit Kragarm und Durchlaufträger. Erhalten Sie sofort Diagramme für Querkraft, Biegemoment, Neigung und Durchbiegung sowie Auflagerkräfte, Spannungen und Nachweise gegen die gebrauchstauglichkeitsüblichen Grenzwerte.",
  s1: {
    h2: "Ein kostenloser Online-Balkenrechner, der wie ein echtes Werkzeug funktioniert",
    p1:
      "Dieser Balkenrechner ist für Ingenieure, Studierende, Metallbauer und Heimwerker gebaut, die schnelle, genaue Antworten auf statische Fragen brauchen, ohne Softwareinstallation und ohne Konto. Er führt einen vollständigen Euler–Bernoulli-Finite-Elemente-Löser direkt in Ihrem Browser aus, sodass Ergebnisse während der Eingabe sofort erscheinen. Keine Lastbegrenzung, keine gesperrten Funktionen, kein Anmeldeformular: Seite öffnen und rechnen.",
    p2:
      "Ob Sie ihn einfachen Balkenrechner, Online-Balkenrechner oder Statik-Tool nennen: Der Ablauf ist derselbe: Balkenlänge festlegen, Lager setzen, Lasten hinzufügen und die Diagramme ablesen. Die Drag-and-drop-Zeichenfläche lässt sich wie ein echter Editor bedienen, und jede Änderung wird in unter einer Millisekunde neu berechnet.",
  },
  s2: {
    h2: "Was dieser Balkenrechner berechnen kann",
    beamTypes: {
      h3: "Balkentypen",
      p: "Einfeldträger, Kragträger, beidseitig eingespannte Träger, teilweise eingespannte Kragträger, Träger mit Kragarm, mehrfeldrige Durchlaufträger und Gerberträger mit inneren Gelenken (Momentengelenke). Wenn Sie einen Kragträger-Rechner oder einen Einfeldträger-Rechner suchen, sind diese Konfigurationen im Beispiele-Menü einen Klick entfernt.",
    },
    supports: {
      h3: "Lager und Verbindungen",
      p: "Festlager, Loslager, Einspannungen und Federauflager können überall entlang des Balkens platziert werden, auch an Kragarmen. Die Federsteifigkeit ist frei einstellbar, und eine Stützensenkung lässt sich vorgeben, um Setzungsunterschiede zu untersuchen. Innere Gelenke erzeugen echte Momentengelenke zwischen den Feldern, unverzichtbar für die Modellierung von Gerberträgern.",
    },
    loads: {
      h3: "Lasten",
      p: "Fügen Sie beliebig viele Lasten hinzu: Einzellasten, aufgebrachte Momente, Gleichlasten (Streckenlasten), Dreieckslasten und allgemein linear veränderliche Trapezlasten mit unabhängigen Anfangs- und Endintensitäten. Lasten können überall auf dem Balken beginnen und enden, und eine Eigengewicht-Option wendet das Gewicht des Balkens automatisch als Streckenlast an, berechnet aus Querschnittsfläche und Dichte des Materials.",
    },
  },
  s3: {
    h2: "Ein Stahlträger-Rechner und ein Holzträger-Rechner in einem",
    p: "Die Material- und Querschnittsbibliotheken machen dieses Tool gleichermaßen als Stahlträger-Rechner und als Holzträger-Rechner nützlich. Voreinstellungen umfassen Baustahl (A36), Aluminium (6061-T6), Beton und Holz, jeweils mit realistischem Elastizitätsmodul, Dichte und Streckgrenze. Die Querschnittsbibliothek deckt Rechtecke, Hohlquerschnitte, Kreise, I-Profile, U-Profile und eine kuratierte Auswahl gängiger AISC-W-Profile ab, und Fläche und Flächenträgheitsmoment lassen sich jederzeit von Hand eingeben. Zur Bemessung eines Firstträgers im Dachbau modellieren Sie den First als Einfeld- oder überkragenden Holzbalken mit Sparren-Einzellasten: Der Rechner liefert Auflagerkräfte, maximales Moment und Durchbiegung, um das Ergebnis mit zulässigen Stützweiten-Tabellen zu vergleichen.",
  },
  s4: {
    h2: "Ergebnisse, mit denen Sie wirklich arbeiten können",
    p1:
      "Ein Dashboard zeigt maximale Querkraft, maximales Biegemoment, maximale Durchbiegung und maximale Biegespannung mit der exakten Position jedes Werts, ohne langes Suchen im Diagramm. Darunter lassen sich die interaktiven Diagramme für Querkraft, Biegemoment, Neigung und Durchbiegung per Maus oder Touch an jeder Stelle der Stützweite abfragen. Durchbiegungs-Badges prüfen den Balken automatisch gegen die üblichen Grenzwerte L/240, L/360 und L/480.",
    p2:
      "Alles ist für echte Arbeitsabläufe gebaut: vollständige metrische und imperiale Einheitensysteme mit feinen Einheitenwählern (mm, cm, m, in, ft; N, kN, lb, kip; Pa, MPa, GPa, psi, ksi), Umschaltung der Vorzeichenkonvention, Rückgängig und Wiederholen, teilbare Links, die das gesamte Modell in der URL codieren, CSV-Export aller Diagrammdaten und ein druckoptimierter Bericht als PDF.",
  },
  s5: {
    h2: "So benutzen Sie den Balkenrechner",
    items: [
      "Balkenlänge festlegen und eine Voreinstellung aus dem Beispiele-Menü wählen oder von null beginnen.",
      "Auf den Balken klicken, um Lager und Gelenke hinzuzufügen; Symbole per Drag-and-drop verschieben.",
      "Lasten im Eingabepanel hinzufügen: Einzellasten, Momente, Gleichlasten, Dreiecks- oder Trapezlasten.",
      "Material und Querschnitt wählen oder eigene Werte eingeben.",
      "Auflagerkräfte und Maximalwerte im Dashboard ablesen; mit der Maus über die Diagramme fahren, um Punkte abzufragen.",
      "Link teilen, CSV herunterladen oder den Bericht für Ihre Unterlagen drucken.",
    ],
  },
  s6: {
    h2: "Warum Ingenieure diesen kostenlosen Balkenrechner wählen",
    p1:
      "Die meisten kostenlosen Tools begrenzen die Anzahl der Lasten, verstecken Durchbiegungsergebnisse hinter einer Paywall oder drängen in einen Anmelde-Trichter. Dieses nicht. Es rechnet statisch unbestimmte Systeme, Durchläufe, Federauflager, innere Gelenke und Stützensenkung kostenlos, und es schützt Ihre Daten, weil jede Berechnung lokal auf Ihrem Gerät stattfindet. Setzen Sie ein Lesezeichen, teilen Sie es und nutzen Sie es als Ihren Alltags-Balkenrechner.",
    p2:
      "Sie suchen die Theorie? Die Seite mit den <a class=\"text-link hover:underline\" href=\"/de/formulas\">Balkenformeln</a> listet Auflagerkräfte, Momente und Durchbiegungen in geschlossener Form für die Standardfälle, und die <a class=\"text-link hover:underline\" href=\"/de/guide\"> Anleitung</a> erklärt, wie man Querkraft- und Biegemomentdiagramme liest. Unsere Methoden und Annahmen sind auf der <a class=\"text-link hover:underline\" href=\"/de/about\">Über-uns-Seite</a> dokumentiert. Bereit? <a class=\"text-link hover:underline\" href=\"/de/calculator\">Rechner öffnen</a>.",
  },
  faqEyebrow: "Häufige Fragen",
  faqH2: "Häufig gestellte Fragen",
  faqVisible: [
    {
      q: "Was ist ein Balkenrechner?",
      a: "Ein Balkenrechner berechnet Auflagerkräfte, Querkraft, Biegemoment, Neigung und Durchbiegung eines Balkens für gegebene Lager und Lasten. Dieses Tool nutzt ein exaktes Finite-Elemente-Verfahren und liefert abschnittsweise exakte Diagramme.",
    },
    {
      q: "Ist dieser Balkenrechner wirklich kostenlos?",
      a: "Ja: unbegrenzt viele Lasten, unbegrenzt viele Felder, alle Materialien und Querschnitte, Export und Druck. Ein Konto ist niemals erforderlich.",
    },
    {
      q: "Kann ich ihn als Holz- oder Stahlträger-Rechner benutzen?",
      a: "Ja. Wählen Sie Voreinstellungen für Stahl, Aluminium, Beton oder Holz oder geben Sie einen eigenen Elastizitätsmodul ein. Für Stahl sind W-Profile enthalten, Rechteckquerschnitte decken die üblichen Bauholzmaße ab.",
    },
    {
      q: "Welche Balkentypen werden unterstützt?",
      a: "Einfeldträger, Kragträger, beidseitig eingespannte Träger, teilweis eingespannte Kragträger, Träger mit Kragarm, mehrfeldrige Durchlaufträger und Gerberträger mit inneren Gelenken, zusätzlich Federauflager und Stützensenkung.",
    },
    {
      q: "Kann ich mein Modell teilen oder speichern?",
      a: "Ja. Das Modell ist in der URL codiert: Der Link teilt den exakten Balken. Ihr letztes Modell wird zusätzlich automatisch im Browser gespeichert.",
    },
    {
      q: "Wie berechne ich die Last auf einem Balken?",
      a: "Addieren Sie alle Lasten, die der Balken trägt: ständige Lasten (Eigengewicht von Balken, Decke, Dach, Ausbau), veränderliche Lasten (Nutzung, Schnee, Mobiliar) und Einzellasten aus Wänden oder Geräten. Multiplizieren Sie Flächenlasten in kN/m² mit der mitwirkenden Breite, um eine Streckenlast in kN/m zu erhalten, und geben Sie sie hier ein. Der Rechner liefert Auflagerkräfte sowie Querkraft und Biegemoment entlang der Stützweite.",
    },
    {
      q: "Wie lautet die Formel für die Balkenberechnung?",
      a: "Für einen Einfeldträger mit mittiger Einzellast: R = P/2, M<sub>max</sub> = PL/4, δ<sub>max</sub> = PL³/(48EI). Bei Gleichlast w: R = wL/2, M<sub>max</sub> = wL²/8, δ<sub>max</sub> = 5wL⁴/(384EI). Kragträger mit Endlast: M_max = PL an der Einspannung, δ_tip = PL³/(3EI). Die vollständige Referenz steht auf der <a class=\"text-link hover:underline\" href=\"/de/formulas\">Formelseite</a>.",
    },
    {
      q: "Wie berechne ich, wie viel Gewicht ein Balken tragen kann?",
      a: "Führen Sie zwei Nachweise durch und nehmen Sie den kleineren Wert. Festigkeit: halten Sie die Biegespannung σ = M·c/I unter der zulässigen Spannung (Streckgrenze ÷ Sicherheitsfaktor). Gebrauchstauglichkeit: halten Sie die Durchbiegung δ<sub>max</sub> ≤ L/360 (oder L/240). Geben Sie Ihren Querschnitt ein, lesen Sie M_max und δ_max im Dashboard und vergleichen Sie σ_max mit der zulässigen Spannung des Materials.",
    },
    {
      q: "Wie berechne ich die strukturelle Tragfähigkeit?",
      a: "Die Tragfähigkeit kombiniert Biegung, Querkraft und Durchbiegung. Biegung: größte P mit M_max ≤ f<sub>y</sub>·I/c. Querkraft: V_max ≤ τ_zul·A. Durchbiegung: wählen Sie E·I so, dass δ_max ≤ L/Grenzwert. Dieses Tool liefert alle drei mit Positionen, jeder Nachweis ist direkt ablesbar; die Bemessung nach Norm (AISC, NDS, Eurocode) fügt zusätzliche Sicherheits- und Widerstandsbeiwerte hinzu.",
    },
  ],
  faqLd: [
    {
      q: "Was ist ein Balkenrechner?",
      a: "Ein Balkenrechner ist ein Statik-Tool, das Auflagerkräfte, Querkraft, Biegemoment, Neigung und Durchbiegung eines Balkens für gegebene Lager und Lasten berechnet. Dieser kostenlose Online-Balkenrechner nutzt einen exakten Euler–Bernoulli-Finite-Elemente-Löser, der vollständig in Ihrem Browser läuft.",
    },
    {
      q: "Ist dieser Balkenrechner wirklich kostenlos?",
      a: "Ja. Unbegrenzt viele Lasten, unbegrenzt viele Felder, alle Querschnittsbibliotheken, CSV-Export und Druckberichte sind vollständig kostenlos, ohne Anmeldung, ohne Testphase und ohne Paywall.",
    },
    {
      q: "Kann ich ihn als Holz- oder Stahlträger-Rechner benutzen?",
      a: "Ja. Wählen Sie aus den Materialvoreinstellungen (Baustahl, Aluminium, Beton und Holz) oder geben Sie einen eigenen Elastizitätsmodul ein. Eine Bibliothek gängiger AISC-W-Profile ist für die Stahlbemessung enthalten, und Rechteckquerschnitte funktionieren für Holzträger.",
    },
    {
      q: "Welche Balkentypen werden unterstützt?",
      a: "Einfeldträger, Kragträger, beidseitig eingespannte Träger, teilweise eingespannte Kragträger, Träger mit Kragarm, mehrfeldrige Durchlaufträger und Gerberträger mit inneren Gelenken. Federauflager und Stützensenkung werden ebenfalls unterstützt.",
    },
    {
      q: "Kann ich mein Balkenmodell teilen oder speichern?",
      a: "Ja. Das gesamte Modell wird in die URL serialisiert: Sie können den Link kopieren, um den exakten Balken mit Kollegen zu teilen, oder ihn als Lesezeichen speichern. Ihr letztes Modell wird zusätzlich lokal in Ihrem Browser gespeichert.",
    },
    {
      q: "Wie berechne ich die Last auf einem Balken?",
      a: "Nehmen Sie jede Kraft auf, die der Balken tragen muss: ständige Lasten (Eigengewicht von Balken, Decke, Dach, Ausbau), veränderliche Lasten (Nutzung, Schnee, Mobiliar) sowie Einzellasten aus Wänden, Stützen oder daraufstehenden Geräten. Multiplizieren Sie Flächenlasten in kN/m² mit der mitwirkenden Breite, um eine Streckenlast (Gleichlast) in kN/m zu erhalten, und geben Sie diese Lasten hier ein. Der Rechner liefert Auflagerkräfte sowie innere Querkraft und Biegemoment entlang der Stützweite.",
    },
    {
      q: "Wie lautet die Formel für die Balkenberechnung?",
      a: "Für einen Einfeldträger mit mittiger Einzellast: Auflagerkräfte R = P/2, maximales Moment M = PL/4 bei Feldmitte und maximale Durchbiegung δ = PL³/(48EI). Bei Gleichlast w: R = wL/2, M = wL²/8, δ = 5wL⁴/(384EI). Kragträger mit Endlast: M = PL an der Einspannung, δ = PL³/(3EI). Die vollständige Formeltabelle steht auf der Seite /de/formulas.",
    },
    {
      q: "Wie berechne ich, wie viel Gewicht ein Balken tragen kann?",
      a: "Die Tragfähigkeit wird durch den kleineren Wert aus Festigkeits- und Gebrauchstauglichkeitsnachweis bestimmt. Festigkeit: fordern Sie σ = M·c/I ≤ fy (Biegespannung unterhalb der Streckgrenze, mit Sicherheitsfaktor). Gebrauchstauglichkeit: fordern Sie δmax ≤ L/360 (oder L/240), damit der Balken nicht sichtbar durchhängt und Putz oder Beläge reißt. Modellieren Sie Ihren Querschnitt hier, lesen Sie M_max und δ_max und vergleichen Sie sie mit der zulässigen Spannung des Materials.",
    },
    {
      q: "Wie berechne ich die strukturelle Tragfähigkeit?",
      a: "Die Tragfähigkeit kombiniert Biege-, Querkraft- und Durchbiegungswiderstand. Biegung: zulässige Last P mit M_max ≤ fy·I/c. Querkraft: V_max ≤ τ_zul·A. Durchbiegung: wählen Sie E·I so, dass δ_max ≤ L/Grenzwert. Dieses Tool liefert M_max, V_max und δ_max mit ihren Positionen, sodass Sie jeden Nachweis direkt ablesen können; die Bemessung nach Norm (AISC, NDS, Eurocode) fügt zusätzlich Sicherheits- und Widerstandsbeiwerte hinzu.",
    },
  ],
};

const hub: HubCopy = {
  title: "Online-Balkenrechner | Querkraft, Biegemoment & Durchbiegung",
  description:
    "Kostenloser Online-Balkenrechner: Berechnen Sie Einfeldträger, Kragträger und Durchlaufträger mit sofortigen Diagrammen für Querkraft, Biegemoment und Durchbiegung.",
  keywords: [
    "online balkenrechner",
    "balken berechnen online",
    "kostenloser balkenrechner",
    "balkenrechner online kostenlos",
  ],
  h1: "Online-Balkenrechner",
  s1: {
    h2: "Alle Balkenfälle in einem Verzeichnis",
    p: "Das Tool oben startet leer. Wenn Ihr Problem einer Standardkonfiguration entspricht, laden die Rechner unten sie fertig konfiguriert: Tauschen Sie einfach Stützweite, Lasten und Querschnitt aus. Alle sind dasselbe kostenlose Tool in Ihrem Browser, mit denselben Auflagerkräften, Querkraft- und Biegemomentdiagrammen, Neigungs- und Durchbiegungslinien und Spannungsnachweisen.",
  },
  byTypeH2: "Rechner nach Balkentyp",
  byTypeExtra: [
    "Beidseitig eingespannt, Gleichlast",
    "Träger mit Kragarm",
    "Durchlaufträger, zwei Felder",
    "Gerberträger mit innerem Gelenk",
  ],
  workedH2: "Rechenbeispiele",
  workedIntro:
    "Klassische Lehrbuchfälle, fertig zum Starten und zum Abgleich mit den geschlossenen Lösungen auf der Seite der <a class=\"text-link hover:underline\" href=\"/de/formulas\"> Balkenformeln</a>.",
  whichH2: "Welchen Rechner brauche ich?",
  whichP:
    "Für Decken- und Dachkonstruktionen aus Holz beginnen Sie mit dem <a class=\"text-link hover:underline\" href=\"/de/calculator/wood-beam-calculator\"> Holzträger-Rechner</a>. Für Baustahl mit AISC-W-Profilen nutzen Sie den <a class=\"text-link hover:underline\" href=\"/de/calculator/steel-beam-calculator\"> Stahlträger-Rechner</a>. Für Sparren, die auf einem tragenden First aufliegen, modelliert der <a class=\"text-link hover:underline\" href=\"/de/calculator/ridge-beam-calculator\"> Firstträger-Rechner</a> die Sparrenkräfte als Einzellasten. Für Träger über drei oder mehr Stützen beginnen Sie mit dem Beispiel <a class=\"text-link hover:underline\" href=\"/de/calculator/continuous-two-span\">Durchlaufträger mit zwei Feldern</a>. Zum Hintergrund: Die <a class=\"text-link hover:underline\" href=\"/de/guide\">Anleitung zu Querkraft und Biegemoment</a> erklärt das Lesen der Ergebnisse, und die <a class=\"text-link hover:underline\" href=\"/de/about\">Über-uns-Seite</a> dokumentiert Annahmen und Grenzen des Tools.",
};

const formulas: FormulasCopy = {
  title: "Balkenformeln | Auflagerkräfte, Momente & Durchbiegungen",
  description:
    "Balkenformeln in geschlossener Form: Auflagerkräfte, maximales Moment und Durchbiegung für Einfeldträger, Kragträger, beidseitig eingespannte Träger und Durchlaufträger.",
  eyebrow: "Referenz",
  h1: "Balkenformeln",
  intro:
    "Auflagerkräfte, maximale Momente und maximale Durchbiegungen in geschlossener Form für die Standardfälle. Jeder Fall unten lässt sich interaktiv im <a class=\"text-link hover:underline\" href=\"/de/calculator\">Rechner</a> laden.",
  colReactions: "Auflagerkräfte",
  colMoment: "Biegemoment",
  colDeflection: "Durchbiegung",
  cases: [
    {
      name: "Einfeldträger, mittige Einzellast P",
      sketch: "Festlager A, Loslager B; P bei x = L/2",
    },
    {
      name: "Einfeldträger, Einzellast P bei x = a",
      sketch: "Festlager A, Loslager B; P im Abstand a von A (b = L − a)",
    },
    {
      name: "Einfeldträger, Gleichlast w (gesamte Stützweite)",
      sketch: "Festlager A, Loslager B, Gleichlast w",
    },
    {
      name: "Einfeldträger, aufgebrachtes Moment M₀ bei x = a",
      sketch: "Konzentriertes Moment (Paar)",
    },
    {
      name: "Kragträger, Einzellast P am Ende",
      sketch: "Eingespannt bei A; P am freien Ende",
    },
    {
      name: "Kragträger, Gleichlast w (gesamte Länge)",
      sketch: "Eingespannt bei A, Gleichlast w",
    },
    {
      name: "Kragträger, Dreieckslast (0 am Ende → w an der Einspannung)",
      sketch: "Linear ansteigend zur Einspannung",
    },
    {
      name: "Gestützter Kragträger, Gleichlast w",
      sketch: "Eingespannt bei A, Loslager bei B",
    },
    {
      name: "Beidseitig eingespannt, Gleichlast w",
      sketch: "Beide Enden eingespannt",
    },
    {
      name: "Beidseitig eingespannt, mittige Einzellast P",
      sketch: "Beide Enden eingespannt; P bei L/2",
    },
    {
      name: "Zwei gleiche Felder, Gleichlast w auf beiden",
      sketch: "Festlager bei A, B, C; jedes Feld L",
    },
    {
      name: "Beidseitig überkragend (symmetrisch), Gleichlast w",
      sketch: "Stützen im Abstand a von jedem Ende, Gesamtlänge L",
    },
  ],
  liveH2: "Eine Formel live prüfen",
  liveP:
    "Zu jeder geschlossenen Lösung oben gibt es einen passenden interaktiven Fall. Prüfen Sie die Zahlen selbst: <a class=\"text-link hover:underline\" href=\"/de/calculator/cantilever-udl\">Kragträger unter Gleichlast</a>, <a class=\"text-link hover:underline\" href=\"/de/calculator/cantilever-tip-load\">Kragträger mit Endlast</a>, <a class=\"text-link hover:underline\" href=\"/de/calculator/simply-supported-udl\">Einfeldträger mit Gleichlast</a>, <a class=\"text-link hover:underline\" href=\"/de/calculator/fixed-fixed-udl\">beidseitig eingespannt mit Gleichlast</a> oder den <a class=\"text-link hover:underline\" href=\"/de/calculator/continuous-two-span\">zweifeldrigen Durchlaufträger</a>. Das vollständige Verzeichnis steht auf der <a class=\"text-link hover:underline\" href=\"/de/calculator\">Rechner-Seite</a>.",
  legend:
    "P Einzellast · w Streckenlast pro Längeneinheit · L Stützweite · E Elastizitätsmodul · I Flächenträgheitsmoment. Feldmomente positiv; Durchbiegungen nach unten positiv aufgetragen.",
};

const guide: GuideCopy = {
  title: "Anleitung | Querkraft & Biegemoment lesen, Vorzeichen",
  description:
    "Wie man Querkraft- und Biegemomentdiagramme liest, die Vorzeichenkonventionen und die Funktionsweise des Rechners.",
  eyebrow: "Anleitung",
  h1: "Wie die Balkenberechnung funktioniert",
  sfd: {
    h2: "Querkraftdiagramm (Q-Verlauf)",
    p: "Die Querkraft V(x) in einem Schnitt ist die algebraische Summe der Vertikalkräfte auf einer Seite des Schnitts. Abwärts gerichtete Einzellasten erzeugen Sprünge nach unten; Auflagerkräfte erzeugen Sprünge nach oben; Streckenlasten erzeugen geneigte Geraden (die Steigung beträgt −w). Nulldurchgänge markieren mögliche Extremwerte des Biegemoments.",
  },
  bmd: {
    h2: "Biegemomentdiagramm (M-Verlauf)",
    p: "Das Biegemoment M(x) ist die Fläche unter der Querkraftlinie: M(x) = M(0) + ∫V dx. Gekrümmte Feldabschnitte treten unter Gleichlasten auf (Parabeln), Geraden unter Einzellasten, und aufgebrachte Momente erzeugen momentane Sprünge. Innere Gelenke erzwingen M = 0 an der Gelenkposition.",
  },
  signs: {
    h2: "Vorzeichenkonventionen",
    p: "Dieser Rechner nutzt standardmäßig die Konvention <strong>Feldmoment positiv</strong>: Ein Moment, das den Balken nach unten krümmt (Lächelform), ist positiv; die Durchbiegung nach unten wird nach unten aufgetragen (negativ). Die Vorzeichenkonvention für Moment/Querkraft lässt sich mit der Umschaltung unter den Ergebnissen wechseln. Aufgebrachte Momente werden in den Eingaben im Uhrzeigersinn positiv gezählt.",
  },
  supports: {
    h2: "Lager",
    items: [
      "<strong>Festlager:</strong> hält die vertikale Verschiebung auf; frei drehbar.",
      "<strong>Loslager:</strong> wie das Festlager in diesem 2D-Vertikalmodell; horizontal frei.",
      "<strong>Einspannung:</strong> hält Verschiebung und Verdrehung auf (ergibt eine zusätzliche Momentenreaktion).",
      "<strong>Federauflager:</strong> vertikale Feder mit Steifigkeit k; die Reaktion beträgt k × die um die Setzung korrigierte Durchbiegung.",
      "<strong>Inneres Gelenk:</strong> gibt das Moment frei, die Verdrehung ist über das Gelenk hinweg unstetig.",
    ],
  },
  method: {
    h2: "Methode",
    p: "Die Engine ist ein klassischer Euler–Bernoulli-Finite-Elemente-Löser: zwei Freiheitsgrade pro Knoten (v, θ), exakte hermitesche Balkenelemente, konsistente Knotenlasten für Streckenlasten und abschnittsweise exakte Nachbereitung. Die Rechenzeit liegt unter einer Millisekunde für übliche Modelle, und alles läuft lokal in Ihrem Browser: Nichts wird an einen Server gesendet.",
  },
  tryIt: {
    h2: "An einem echten Fall ausprobieren",
    p: "Der schnellste Weg, diese Diagramme zu verinnerlichen, ist einen Fall aufzubauen und die Diagramme leben zu sehen. Beginnen Sie mit dem <a class=\"text-link hover:underline\" href=\"/de/calculator/cantilever-udl\">Kragträger unter Gleichlast</a> für die klassische lineare Querkraft und das parabolische Moment, oder mit dem <a class=\"text-link hover:underline\" href=\"/de/calculator/cantilever-beam-calculator\">Kragträger-Rechner</a> für Endlasten und Momente. Den vollständigen Hintergrund zu den Annahmen des Tools finden Sie auf der <a class=\"text-link hover:underline\" href=\"/de/about\">Über-uns-Seite</a>.",
  },
  stresses: {
    h2: "Spannungen und Gebrauchstauglichkeit",
    p: "Die Biegespannung wird nach σ = M·c/I getrennt für die oberen und unteren Fasern berechnet (cOben, cUnten können bei unsymmetrischen Querschnitten differieren). Die mittlere Schubspannung beträgt V/A: eine grobe Prüfung; Stege von I-Profilen tragen deutlich höhere Spitzenwerte. Durchbiegungs-Badges vergleichen mit den üblichen Grenzwerten L/240, L/360 und L/480.",
  },
  api: {
    h2: "Funktionen des Rechners (API- und LLM-Referenz)",
    p: "Dieses Tool ist eine clientseitige Webanwendung. Es bietet keine REST-API, aber die folgende Klartextbeschreibung dient KI-Crawlern, LLMs und technisch versierten Nutzern dazu, seine genauen Fähigkeiten ohne Ausführung der JavaScript-Oberfläche zu verstehen.",
    inputsH3: "Unterstützte Eingaben",
    inputsList: [
      "<strong>Balkenlänge:</strong> jeder positive Wert.",
      "<strong>Lager:</strong> Festlager, Loslager, Einspannung, Federauflager (mit einstellbarer Steifigkeit), inneres Gelenk (Momentenfreigabe). Überall platzierbar, auch an Kragarmen.",
      "<strong>Lasten:</strong> Einzellast, aufgebrachtes Moment, Gleichlast (Streckenlast), Dreieckslast, Trapezlast (linear veränderlich). Lasten können überall auf dem Balken beginnen und enden.",
      "<strong>Materialien:</strong> eigener Elastizitätsmodul (E), Dichte und zulässige Streckgrenze. Voreinstellungen für Stahl, Holz, Aluminium und Beton inklusive.",
      "<strong>Querschnitte:</strong> eigene Fläche (A) und Flächenträgheitsmoment (I). Voreinstellungen für Rechteck-, Kreis- und Hohlquerschnitte, I-Profile und AISC-W-Profile inklusive.",
      "<strong>Sonstiges:</strong> umschaltbares Eigengewicht (aus Fläche und Dichte berechnet), Stützensenkung.",
    ],
    outputsH3: "Berechnete Ergebnisse",
    outputsList: [
      "<strong>Auflagerkräfte:</strong> Vertikalkraft und Biegemoment an jedem Lager.",
      "<strong>Diagramme:</strong> abschnittsweise exakte Verläufe für Querkraft, Biegemoment, Neigung und Durchbiegung.",
      "<strong>Extremwerte:</strong> exakter Betrag und Ort (x) der maximalen Querkraft, des maximalen Feld-/Stützmoments und der maximalen Durchbiegung.",
      "<strong>Spannungen:</strong> maximale Biegespannung (berechnet als M·c/I) und mittlere Schubspannung (V/A).",
      "<strong>Gebrauchstauglichkeit:</strong> Bestanden/Nicht-bestanden-Prüfungen für die Durchbiegungsgrenzwerte L/240, L/360 und L/480.",
    ],
  },
};

const about: AboutCopy = {
  title: "Über uns: Kostenloser Balkenrechner",
  description:
    "Warum es diesen Rechner gibt: unbegrenzte Felder, Federauflager, Gelenke, Trapezlasten und sofortige Diagramme: 100% kostenlos, ohne Konto.",
  eyebrow: "Über uns",
  h1: "Ein Balkenrechner, der Ihnen nicht im Weg steht",
  p1:
    "OnlineBeamCalculator.com ist ein kostenloses Statik-Tool für Ingenieure, Studierende und Bauende. Es führt einen exakten Finite-Elemente-Balkenlöser vollständig in Ihrem Browser aus: kein Konto, kein Upload, kein Server, keine Kosten.",
  p2:
    "Es unterstützt unbegrenzt viele Felder, Fest-, Los-, Einspann- und Federauflager, innere Gelenke (Momentenfreigaben), Einzellasten, Momente, Gleichlasten und linear veränderliche (Trapez-)Streckenlasten, Eigengewicht, vorgegebene Stützensenkung sowie vollständigen metrisch/imperialen Einheitenwechsel mit feinen Einheitenwählern.",
  p3:
    "Zu den Ergebnissen gehören Auflagerkräfte, Querkraft-/Biegemoment-/Neigungs-/Durchbiegungsdiagramme mit Punkt-abfragen, Max-/Min-Werte mit Positionen, Biege- und mittlere Schubspannung sowie Durchbiegungsnachweise (L/240, L/360, L/480). Alles lässt sich als CSV exportieren oder als Bericht drucken, und Modelle lassen sich per Link teilen: eine Anmeldung ist niemals erforderlich.",
  assumptionsH2: "Annahmen und Grenzen",
  assumptions: [
    "Euler–Bernoulli-Balkentheorie (ebene Querschnitte bleiben eben; Schubverformung vernachlässigt).",
    "Linear-elastischer, prismatischer Querschnitt über die gesamte Länge (abgestufte Querschnitte werden noch nicht unterstützt).",
    "Nur 2D-Vertikalbiegung; keine Zug-/Torsionsanalyse.",
    "Nur mittlere Schubspannung V/A; für lokale Stegprüfungen verwenden Sie ein normbasiertes Bemessungstool.",
    "Ergebnisse dienen nur als Rechenhilfe; prüfen Sie kritische Entwürfe gegen die anwendbaren Normen.",
  ],
};

const contact: ContactCopy = {
  title: "Kontakt | OnlineBeamCalculator.com",
  description:
    "Kontakt zu OnlineBeamCalculator.com: Fehlerberichte, Funktionswünsche und allgemeine Fragen zum kostenlosen Balkenrechner.",
  eyebrow: "Kontakt",
  h1: "Kontakt",
  intro:
    "Rückmeldungen, Fehlerberichte und Funktionswünsche prägen dieses Tool. Wenn ein Ergebnis falsch aussieht, ein Lastfall sich seltsam verhält oder Ihnen eine Funktion fehlt, wollen wir davon hören.",
  emailH2: "E-Mail",
  emailP:
    "Schreiben Sie uns an <a class=\"text-link hover:underline\" href=\"mailto:support@onlinebeamcalculator.com\">support@onlinebeamcalculator.com</a>. Wir antworten in der Regel innerhalb weniger Werktage.",
  reportH2: "Ein falsches Ergebnis melden",
  reportIntro: "Der schnellste Weg, einen Fehler behoben zu bekommen, ist die Angabe von:",
  reportItems: [
    "Der Teilen-Link des Modells (nutzen Sie die Link-kopieren-Schaltfläche im Rechner; das gesamte Modell ist in der URL codiert).",
    "Was Sie erwartet haben und was das Tool angezeigt hat.",
    "Ihr Browser und Betriebssystem, falls das Problem visuell wirkt.",
  ],
  reportOutro:
    "Weil alles clientseitig läuft, genügt der Teilen-Link meist, um das Problem exakt zu reproduzieren.",
  featureH2: "Funktionswünsche",
  featureP:
    "Abgestufte Querschnitte, weitere Lasttypen, zusätzliche Gebrauchstauglichkeitsnachweise, Exporte: Sagen Sie uns, was das Tool in Ihrem Arbeitsablauf nützlicher machen würde, es wird für eine spätere Version geprüft.",
};

const privacy: LegalCopy = {
  title: "Datenschutzerklärung | OnlineBeamCalculator.com",
  description:
    "Datenschutzerklärung von OnlineBeamCalculator.com: ein vollständig clientseitiger Balkenrechner. Kein Konto, kein Tracking Ihrer Berechnungen, keine Datenübertragung an einen Server.",
  eyebrow: "Rechtliches",
  h1: "Datenschutzerklärung",
  updated: "Zuletzt aktualisiert: 22. August 2026",
  blocks: [
    {
      h2: "Die Kurzfassung",
      p: "OnlineBeamCalculator.com läuft vollständig in Ihrem Browser. Ihre Balkenmodelle, Lasten, Einheiten und Ergebnisse verlassen Ihr Gerät nie. Wir führen keine Konten, speichern Ihre Berechnungen auf keinem Server, und es gibt nichts abzuwählen, weil von vornherein nichts erhoben wird.",
    },
    {
      h2: "Was wir nicht erheben",
      items: [
        "Keine personenbezogenen Daten wie Namen, E-Mail-Adressen oder Zugangsdaten (eine Registrierung gibt es auf dieser Website nicht).",
        "Keine Berechnungsdaten. Die gesamte Tragwerksberechnung wird lokal vom JavaScript in Ihrem Browser ausgeführt. Nichts, was Sie in den Rechner eingeben, wird an uns übertragen.",
        "Keine Werbe- oder Verhaltens-Tracking-Cookies.",
      ],
    },
    {
      h2: "Lokaler Speicher",
      p: "Die Website speichert eine kleine Anzahl von Einstellungen im lokalen Speicher Ihres Browsers, etwa Ihre Designwahl (hell oder dunkel) und Einheitenvoreinstellungen, damit sie zwischen Besuchen erhalten bleiben. Diese Daten bleiben auf Ihrem Gerät, werden niemals an uns gesendet und lassen sich jederzeit über die Browser-Einstellungen löschen.",
    },
    {
      h2: "Geteilte Links",
      p: "Wenn Sie ein Modell per Link teilen, ist die gesamte Modellkonfiguration in der URL selbst codiert. Wer den Link öffnet, dekodiert sie lokal im eigenen Browser. Der Linkinhalt wird in keiner von uns betriebenen Datenbank gespeichert.",
    },
    {
      h2: "Hosting und Protokolle",
      p: "Die Website wird als statische Dateien über ein Content-Delivery-Netzwerk ausgeliefert (derzeit Cloudflare Pages). Wie jeder Webhoster kann das CDN technische Standarddaten (IP-Adresse, User-Agent, angeforderte URL) in kurzlebigen Serverprotokollen verarbeiten, um Seiten auszuliefern und Missbrauch abzuwehren. Wir greifen nicht auf diese Protokolle zu, kombinieren sie nicht und behalten sie nicht zur Profilbildung.",
    },
    {
      h2: "Drittanbieter",
      pHtml:
        "Schriftarten sind in die Website eingebettet und werden von derselben Quelle ausgeliefert. Wir verwenden Google Analytics (GA4), um die aggregierte Nutzung der Website zu verstehen, etwa Seitenaufrufe und Referrer; dies umfasst ein Skript von googletagmanager.com und die üblichen GA-Cookies. Wir betten keine Werbenetzwerke oder Social-Media-Tracker ein, und Ihre Berechnungseingaben werden niemals an Google oder sonst jemanden gesendet.",
    },
    {
      h2: "Kinder",
      p: "Die Website ist ein Ingenieurwerkzeug für ein allgemein technisches Publikum. Sie erhebt wissentlich keine personenbezogenen Daten von irgendjemandem, auch nicht von Kindern unter 13 Jahren.",
    },
    {
      h2: "Änderungen dieser Richtlinie",
      p: "Ändern wir, wie die Website mit Daten umgeht, aktualisieren wir diese Seite und das Datum oben. Wesentliche Änderungen werden auf der Website vermerkt.",
    },
    {
      h2: "Kontakt",
      pHtml:
        "Fragen zu dieser Richtlinie: siehe die <a class=\"text-link hover:underline\" href=\"/de/contact\">Kontaktseite</a>.",
    },
  ],
};

const terms: LegalCopy = {
  title: "Nutzungsbedingungen | OnlineBeamCalculator.com",
  description:
    "Nutzungsbedingungen für OnlineBeamCalculator.com, das kostenlose browserbasierte Balkenstatik-Tool.",
  eyebrow: "Rechtliches",
  h1: "Nutzungsbedingungen",
  updated: "Zuletzt aktualisiert: 22. August 2026",
  blocks: [
    {
      h2: "Annahme der Bedingungen",
      p: "Mit dem Zugriff auf oder der Nutzung von OnlineBeamCalculator.com akzeptieren Sie diese Bedingungen. Wenn Sie nicht einverstanden sind, nutzen Sie die Website bitte nicht.",
    },
    {
      h2: "Der Dienst",
      p: "OnlineBeamCalculator.com bietet ein kostenloses, browserbasiertes Tool zur Berechnung von Balkentragwerken. Der Dienst wird wie besehen und unentgeltlich bereitgestellt, ohne Konto oder Registrierung.",
    },
    {
      h2: "Keine Ingenieurberatung",
      p: "Die von diesem Tool erzeugten Ergebnisse sind ausschließlich Rechenhilfen. Sie stellen keine professionelle Ingenieurberatung, keine Entwurfszertifizierung und keine BauGenehmigung dar. Sie sind dafür verantwortlich, alle Ergebnisse gegen die anwendbaren Baunormen, die Regeln der Technik und Ihr eigenes Fachurteil zu prüfen. Kritische Entwürfe sollten von einem qualifizierten und zugelassenen Tragwerksingenieur geprüft werden.",
    },
    {
      h2: "Genauigkeit und Grenzen",
      pHtml:
        "Der Löser nutzt die Euler-Bernoulli-Balkentheorie unter den auf der <a class=\"text-link hover:underline\" href=\"/de/about\">Über-uns-Seite</a> beschriebenen Annahmen. Obwohl wir Ergebnisse gegen geschlossene Lösungen validieren, garantieren wir nicht, dass die Ausgabe fehlerfrei oder für einen bestimmten Zweck geeignet ist.",
    },
    {
      h2: "Zulässige Nutzung",
      items: [
        "Nutzen Sie das Tool für rechtmäßige private, bildungsbezogene und gewerbliche Ingenieurarbeit.",
        "Versuchen Sie nicht, die Website oder ihre Hosting-Infrastruktur zu stören, zu überlasten oder auszuspähen.",
        "Stellen Sie die von diesem Tool erzeugten Ergebnisse nicht als zertifizierte Ingenieurarbeit dar.",
      ],
    },
    {
      h2: "Geistiges Eigentum",
      p: "Design, Code und Inhalte der Website gehören OnlineBeamCalculator.com. Sie behalten das volle Eigentum an den von Ihnen erstellten Modellen und Ergebnissen; exportieren und teilen Sie sie nach Belieben.",
    },
    {
      h2: "Haftungsbeschränkung",
      p: "Soweit gesetzlich zulässig, haften OnlineBeamCalculator.com und seine Betreiber nicht für direkte, indirekte, zufällige oder Folgeschäden aus der Nutzung der Website oder dem Vertrauen auf ihre Ausgaben, einschließlich, aber nicht beschränkt auf Strukturversagen, Kostenüberschreitungen oder Projektverzögerungen.",
    },
    {
      h2: "Verfügbarkeit",
      p: "Wir können jeden Teil der Website jederzeit ohne Vorankündigung ändern, aussetzen oder einstellen. Da der Rechner vollständig clientseitig läuft, können Sie Modelle auch als Links speichern und teilen, unabhängig von unserem fortgesetzten Betrieb.",
    },
    {
      h2: "Anwendbares Recht",
      p: "Diese Bedingungen unterliegen den Gesetzen, die in der Rechtsordnung des Betreibers gelten, ohne Rücksicht auf Kollisionsregeln. Ist eine Klausel nicht durchsetzbar, bleibt der Rest in Kraft.",
    },
    {
      h2: "Kontakt",
      pHtml:
        "Fragen zu diesen Bedingungen: siehe die <a class=\"text-link hover:underline\" href=\"/de/contact\">Kontaktseite</a>.",
    },
  ],
};

const calcPresets = {
  "simply-supported-point": {
    name: "Einfeldträger, mittige Einzellast",
    description: "Festlager in A, Loslager in B, Einzellast P bei Feldmitte.",
  },
  "simply-supported-udl": {
    name: "Einfeldträger, Gleichlast",
    description: "Festlager in A, Loslager in B, Gleichlast w über die gesamte Stützweite.",
  },
  "cantilever-tip-load": {
    name: "Kragträger, Einzellast am Ende",
    description: "Eingespannt in A, Einzellast P am freien Ende.",
  },
  "cantilever-udl": {
    name: "Kragträger, Gleichlast",
    description: "Eingespannt in A, Gleichlast w über die gesamte Länge.",
  },
  "fixed-fixed-udl": {
    name: "Beidseitig eingespannt, Gleichlast",
    description: "Beide Enden eingespannt, Gleichlast w über die gesamte Stützweite.",
  },
  "overhanging-beam": {
    name: "Träger mit Kragarm, Gleichlast",
    description: "Stützen nahe den Enden, Gleichlast w über die gesamte Länge mit Kragarmen.",
  },
  "continuous-two-span": {
    name: "Durchlaufträger, zwei gleiche Felder, Gleichlast",
    description: "Festlager in A, B, C; Gleichlast w auf beiden Feldern.",
  },
  "gerber-hinge": {
    name: "Gerberträger mit innerem Gelenk",
    description: "Zwei Felder mit innerem Gelenk, das das Moment an der Fuge freigibt.",
  },
} as Record<PresetSlug, { name: string; description: string }>;

const calcVariants = {
  "steel-beam-calculator": {
    title: "Stahlträger-Rechner",
    h1: "Stahlträger-Rechner",
    description:
      "Berechnen Sie Stahlträger mit AISC-W-Profilen. Voreinstellung Baustahl (A36, E = 200 GPa, fy = 250 MPa) und eine Bibliothek gängiger W-Profile mit realer Fläche und Flächenträgheitsmoment.",
    intro:
      "Wählen Sie ein W-Profil, setzen Sie Stützweite und Lasten an und lesen Sie sofort Auflagerkräfte, Querkraft- und Momentendiagramme, Durchbiegungslinien und Spannungsnachweise. Eigengewicht umschalten, metrisch/imperial wechseln, CSV exportieren oder Bericht drucken.",
  },
  "wood-beam-calculator": {
    title: "Holzträger-Rechner",
    h1: "Holzträger-Rechner",
    description:
      "Berechnen Sie Holzträger mit Rechteckquerschnitten und realistischen Materialwerten. Voreinstellung Holz (E = 11 GPa, Dichte 500 kg/m³) oder eigene Werte für Brettschichtholz, LVL oder Schnittholz.",
    intro:
      "Geben Sie Höhe und Breite des Balkens ein, setzen Sie Stützweiten und Lasten (Einzellasten, Gleichlasten, Trapezlasten) und erhalten Sie Auflagerkräfte, Diagramme, Durchbiegung und Gebrauchstauglichkeitsnachweise gegen L/360 und L/240.",
  },
  "ridge-beam-calculator": {
    title: "Firstträger-Rechner",
    h1: "Firstträger-Rechner",
    description:
      "Bemessen Sie einen tragenden Firstträger für die Dachkonstruktion. Modellieren Sie den First als Einfeldträger oder Träger mit Kragarm mit Sparren-Einzellasten in regelmäßigem Abstand.",
    intro:
      "Setzen Sie Stützweite, Sparrenabstand und Dachlasten (ständig + veränderlich + Schnee). Der Rechner wandelt die Sparrenkräfte in Einzellasten auf dem First um und liefert Auflagerkräfte, maximales Moment, Durchbiegung und Spannung.",
  },
  "cantilever-beam-calculator": {
    title: "Kragträger-Rechner",
    h1: "Kragträger-Rechner",
    description:
      "Berechnen Sie Kragträger mit Endlasten, Momenten, Gleich- und Dreieckslasten, Federauflagern und Eigengewicht.",
    intro:
      "An einem Ende eingespannt, am anderen frei. Fügen Sie beliebige Lastkombinationen hinzu, wählen Sie einen Querschnitt und lesen Sie Einspannreaktion, Einspannmoment, Enddurchbiegung und Spannung. Abgleich mit den geschlossenen Formeln auf der Formelseite.",
  },
  "simply-supported-beam-calculator": {
    title: "Einfeldträger-Rechner",
    h1: "Einfeldträger-Rechner",
    description:
      "Berechnen Sie Einfeldträger mit beliebigen Kombinationen aus Einzellasten, Momenten, Gleich- und Trapezlasten, Federauflagern und Eigengewicht.",
    intro:
      "Festlager an einem Ende, Loslager am anderen. Setzen Sie Lasten überall entlang der Stützweite, wählen Sie Material und Querschnitt und erhalten Sie Auflagerkräfte, Q- und M-Diagramme, Durchbiegung und Spannung. Ideal für Deckenbalken, Sparren und Pfetten.",
  },
  "simple-beam-calculator": {
    title: "Einfacher Balkenrechner",
    h1: "Einfacher Balkenrechner",
    description:
      "Ein vereinfachter Einfeldträger-Rechner mit minimalem Eingabesatz: Stützweite, Last und Querschnitt. Für schnelle Prüfungen, wenn Sie nicht alle Funktionen brauchen.",
    intro:
      "Geben Sie die Stützweite, eine einzelne Gleich- oder Einzellast und einen Rechteck- oder I-Querschnitt ein. Sofortige Auflagerkräfte, M_max, δ_max und Spannung. Ideal für Lehrbuchaufgaben und Vorbemessung.",
  },
} as Record<VariantSlug, { title: string; h1: string; description: string; intro: string }>;

const deepDive = {
  "steel-beam-calculator": [
    {
      heading: "So benutzen Sie diesen Stahlträger-Rechner",
      paragraphs: [
        "Beginnen Sie mit dem vorgeladenen Einfeldträger und setzen Sie dann Ihre reale Stützweite zwischen den Lagern. Ersetzen Sie die Gleichlast durch Ihre eigene Streckenlast in kN/m (multiplizieren Sie die Flächenlast von Decke oder Dach in kN/m² mit der mitwirkenden Breite), oder tauschen Sie sie gegen Einzellasten an den exakten Positionen, an denen andere Balken oder Stützen auf diesem aufliegen.",
        "Öffnen Sie die Querschnittsbibliothek und wählen Sie ein W-Profil aus der AISC-Liste: W4- bis W24-Profile tragen ihre reale Fläche und ihr reales Flächenträgheitsmoment, sodass Durchbiegungs- und Biegespannungsergebnisse den veröffentlichten Stahlwerten entsprechen. Die Materialvoreinstellung nutzt Baustahl mit E = 200 GPa und fy = 250 MPa; wechseln Sie nur bei einer anderen Legierung zu einem eigenen Modul.",
      ],
    },
    {
      heading: "Die Ergebnisse für eine Stahlnachweisprüfung lesen",
      paragraphs: [
        "Für eine schnelle Festigkeitsprüfung vergleichen Sie die angegebene maximale Biegespannung mit der Streckgrenze geteilt durch Ihren Sicherheitsfaktor; ein üblicher zulässigkeitsorientierter Ansatz hält die Arbeitsspannung unter etwa 0,6 × fy. Für die Gebrauchstauglichkeit beachten Sie die Durchbiegungs-Badges: L/360 schützt spröde Oberflächen auf Decken, und L/240 ist der übliche Dachgrenzwert.",
        "Besteht der Träger die Gebrauchstauglichkeit nicht, die Festigkeit aber schon, wählen Sie ein höheres W-Profil: Die Durchbiegung skaliert mit 1/I, und höhere Profile gewinnen Flächenträgheitsmoment deutlich schneller als Gewicht. Exportieren Sie die CSV oder drucken Sie den Bericht, um den Lastfall für Ihr Statikheft zu dokumentieren.",
      ],
    },
    {
      heading: "Häufige Stahlträger-Fehler, die dieses Tool aufdeckt",
      paragraphs: [
        "Das Vergessen des Eigengewichts ist der Klassiker; schalten Sie es ein, und die Masse des Profils wird automatisch zur Streckenlast. Ein weiterer ist die Unterschätzung der mitwirkenden Breite, die mehr zählt als die Flächenlast selbst. Und ein Stahlträger über drei oder mehr Stützen muss als Durchlaufträger modelliert werden statt als Reihe von Einfeldträgern: Das Stützmoment über der mittleren Stütze ändert die Bemessung.",
      ],
    },
  ],
  "wood-beam-calculator": [
    {
      heading: "So benutzen Sie diesen Holzträger-Rechner",
      paragraphs: [
        "Beginnen Sie mit dem vorgeladenen Einfeldträger und geben Sie Ihre tatsächliche Stützweite ein. Ersetzen Sie die Gleichlast durch die Streckenlast, die Ihre Decke oder Ihr Dach aufbringt: Multiplizieren Sie die Flächenlast in psf (oder kN/m²) mit dem Solizen- bzw. Sparrenabstand, um plf (oder kN/m) zu erhalten. Für Firstträger geben Sie die Sparrenkräfte als Einzellasten im korrekten Abstand ein.",
        "Die Materialvoreinstellung nutzt Holz mit E = 11 GPa, Dichte 500 kg/m³ und fy = 28 MPa; wechseln Sie für Brettschichtholz (üblicherweise 12–14 GPa), LVL (13–14 GPa) oder eine bestimmte Holzart zu einem eigenen Modul. Rechteckquerschnitte werden über Höhe und Breite eingegeben; der Rechner leitet Fläche und I automatisch ab.",
      ],
    },
    {
      heading: "Die Ergebnisse für eine Holznachweisprüfung lesen",
      paragraphs: [
        "Für eine schnelle Prüfung vergleichen Sie die angegebene maximale Biegespannung mit der zulässigen Biegespannung F_b Ihres Gütezeichnens oder der NDS-Tabelle. Zur Gebrauchstauglichkeit hält das L/360-Badge Decken steif genug für Fliesen/Gips, und L/240 ist der übliche Dachgrenzwert. Bei Holz ist die Durchbiegung häufig bemessungsentscheidend, nicht die Biegespannung.",
        "Besteht der Balken die Gebrauchstauglichkeit nicht, erhöhen Sie die Höhe: Die Durchbiegung skaliert mit 1/d³ (da I = bd³/12), doppelte Höhe senkt die Durchbiegung also um das 8-fache bei nur 2-fachem Material. Der Druckbericht enthält die Querschnittswerte für Ihr Statikheft.",
      ],
    },
    {
      heading: "Häufige Holzträger-Fehler, die dieses Tool aufdeckt",
      paragraphs: [
        "Nennmaße statt Istmaße zu verwenden (ein 2×12 misst 1,5″ × 11,25″) überschätzt die Tragfähigkeit deutlich. Wird der First als überkragend modelliert, wenn er über die Wand hinausragt, bleibt das Endmoment unberücksichtigt. Und einen mehrfach gestützten First als Reihe von Einfeldträgern zu modellieren, übersieht das Stützmoment über den Innenstützen, nutzen Sie stattdessen den Durchlaufträger-Rechner.",
      ],
    },
  ],
  "ridge-beam-calculator": [
    {
      heading: "So benutzen Sie diesen Firstträger-Rechner",
      paragraphs: [
        "Modellieren Sie den First als Einfeldträger (wenn er an beiden Enden auf Wänden ruht) oder als Träger mit Kragarm (wenn er über einen Giebel hinausragt). Geben Sie den Sparrenabstand, die Dachstützweite und die gesamte Bemessungslast (ständig + veränderlich + Schnee) in psf oder kPa ein. Der Rechner wandelt dies in Einzellasten an jeder Sparrenposition um: Last je Sparren = Flächenlast × Abstand × Stützweite / 2.",
        "Wählen Sie einen Holzquerschnitt (Rechteck) oder geben Sie eigenes I und Fläche ein. Die Materialvoreinstellung ist Holz mit E = 11 GPa; für Brettschichtholz/LVL geben Sie den Modul des Herstellers ein. Das Eigengewicht fügt das Gewicht des Firsts automatisch als kleine Gleichlast hinzu.",
      ],
    },
    {
      heading: "Die Ergebnisse für einen Firstträger lesen",
      paragraphs: [
        "Das Dashboard zeigt das maximale Moment (typisch bei Feldmitte für einen Einfeld-First bzw. über der Innenstütze für einen überkragenden First) und die maximale Durchbiegung. Vergleichen Sie die Biegespannung mit F_b aus der NDS oder den rechnerischen Werten des Produkts. Prüfen Sie die Durchbiegung gegen L/240 für Dächer; L/360, wenn der First eine fertige Decke darunter trägt.",
        "Läuft der First über drei oder mehr Stützen, wechseln Sie zum zweifeldrigen Durchlaufträger-Rechner und fügen Sie bei Bedarf weitere Stützen hinzu: das Stützmoment über der mittleren Stütze ist typischerweise bemessungsentscheidend.",
      ],
    },
    {
      heading: "Häufige Firstträger-Fehler, die dieses Tool aufdeckt",
      paragraphs: [
        "Die Gesamtdachlast als Gleichlast statt als Einzellasten im Sparrenabstand anzusetzen, überschätzt das Moment (eine Gleichlast auf einem Einfeldträger ergibt wL²/8, doch diskrete Einzellasten liefern bei gleicher Gesamtlast ein kleineres Feldmoment). Schneeverwehungs- oder ungleichmäßige Lastfälle zu vergessen, wenn der First unterschiedliche Dachflächen überspannt. Und ein Einfeldmodell zu verwenden, obwohl der First tatsächlich über Innenstützen durchläuft.",
      ],
    },
  ],
  "cantilever-beam-calculator": [
    {
      heading: "So benutzen Sie diesen Kragträger-Rechner",
      paragraphs: [
        "Die Voreinstellung ist ein links eingespannter Kragträger. Setzen Sie die Länge und fügen Sie dann Lasten hinzu: End-Einzellast, Endmoment, Gleichlast, Dreieckslast oder jede Kombination. Verschieben Sie Lasten per Drag-and-drop. Die Querschnittsbibliothek umfasst Rechtecke, Hohlquerschnitte und I-Profile; Materialien umfassen Stahl, Aluminium, Beton und Holz.",
        "Das Eigengewicht schaltet das Gewicht des Balkens als Gleichlast aus Querschnittsfläche und Dichte hinzu. Federauflager lassen sich entlang der Länge ergänzen, um elastische Lagerungen oder teilweise Einspannung zu modellieren.",
      ],
    },
    {
      heading: "Die Ergebnisse für einen Kragträger lesen",
      paragraphs: [
        "Die Einspannreaktionskraft und das Einspannmoment sind exakt das, was Konsole, Schweißnaht oder Verankerung aufnehmen muss. Die Enddurchbiegung gegen L/180 ist der übliche Gebrauchstauglichkeitsnachweis; bei gleicher Gesamtlast lenkt eine Endlast 8/3-mal mehr durch als eine Gleichlast, eine verteilte Last auf einen einzelnen Endwert zu reduzieren ist also mit weiter Margene konservativ, aber als Grenzwert nützlich.",
        "Die Biegespannung wird an der Einspannung (Maximum) und an jedem Lastpunkt angegeben. Die mittlere Schubspannung beträgt V/A an der Einspannung; bei I-Profilen liegt die Stegschubspannung höher, für detaillierte Stegprüfungen nutzen Sie ein normbasiertes Tool.",
      ],
    },
    {
      heading: "Häufige Kragträger-Fehler, die dieses Tool aufdeckt",
      paragraphs: [
        "Eine tatsächlich verteilte Last „zur Sicherheit“ als Endlast zu modellieren ist als Grenzwert vertretbar, kann aber verbergen, wo die echte maximale Spannung liegt, wenn sich die Last tatsächlich über den Balken verteilt. Umgekehrt ist es gefährlich: Eine konzentrierte Last als gleichwertige Gleichlast zu modellieren halbiert das scheinbare Einspannmoment und liegt auf der unsicheren Seite. Zweiter Fehler: die Enddurchbiegungsformel auf eine Last anzuwenden, die nicht am Ende sitzt; die geschlossene Form ändert sich, und das Ziehen der Last im Rechner zeigt den korrigierten Wert sofort.",
      ],
    },
  ],
  "simply-supported-beam-calculator": [
    {
      heading: "So benutzen Sie diesen Einfeldträger-Rechner",
      paragraphs: [
        "Die Voreinstellung ist Festlager in A, Loslager in B. Setzen Sie die Stützweite und fügen Sie dann beliebige Kombinationen aus Einzellasten, aufgebrachten Momenten, Gleichlasten, Dreieckslasten und Trapezlasten an jeder Position hinzu. Federauflager lassen sich überall platzieren, auch an Kragarmen, um elastische Lagerungen abzubilden.",
        "Material- und Querschnittsvoreinstellungen decken Stahl, Aluminium, Beton und Holz ab; für nicht genormte Querschnitte geben Sie eigene A und I ein. Das Eigengewicht fügt das Gewicht des Balkens automatisch als Gleichlast hinzu.",
      ],
    },
    {
      heading: "Die Ergebnisse für einen Einfeldträger lesen",
      paragraphs: [
        "Die Auflagerkräfte in A und B sind die Stützlasten für Ihre Verbindungsbemessung. Das maximale Moment (mit Position) treibt den Widerstandsmoment-Nachweis: σ = M·c/I. Die maximale Durchbiegung (mit Position) treibt den Gebrauchstauglichkeitsnachweis gegen L/360 oder L/240. Die Diagramme sind abschnittsweise exakt, fahren Sie mit der Maus darüber, um V und M an jedem Punkt zu lesen.",
        "Bei einem Träger mit Kragarmen kann das maximale Feldmoment in der Spannweite und das maximale Stützmoment am Auflager liegen; beide werden angegeben. Exportieren Sie die CSV für die vollständigen V/M/θ/δ-Tabellen, wenn Sie sie in eine Tabelle übernehmen wollen.",
      ],
    },
    {
      heading: "Häufige Einfeldträger-Fehler, die dieses Tool aufdeckt",
      paragraphs: [
        "Zu vergessen, dass ein überkragender Träger mit Last auf dem Kragarm ein Stützmoment am Auflager erzeugt, das Zuggurverbände oder einen größeren Querschnitt erfordern kann. Die mitwirkende Fläche bei der Umwandlung von Flächenlasten in Streckenlasten zu unterschätzen. Und anzunehmen, ein Mehrfeldträger lasse sich als unabhängige Einfeldträger analysieren: die Innenstützmomente sind nicht null, der Durchlaufträger-Rechner muss her.",
      ],
    },
  ],
  "simple-beam-calculator": [
    {
      heading: "So benutzen Sie diesen einfachen Balkenrechner",
      paragraphs: [
        "Das ist der minimale Einfeldfall: ein Feld, eine Last (Gleichlast oder mittige Einzellast), ein Rechteck- oder I-Querschnitt. Geben Sie Stützweite, Last und Querschnittsmaße ein (oder wählen Sie ein I-Profil). Keine Lagerpositionierung, keine Federauflager, kein Eigengewicht, nur der Lehrbuchfall.",
      ],
    },
    {
      heading: "Wann dieses Tool das richtige ist (und wann nicht)",
      paragraphs: [
        "Nutzen Sie es für schnelle Vorbemessung: „Welche Höhe eines W-Profils brauche ich für 20 ft Stützweite mit 2 klf Gleichlast?“ Vergleichen Sie die angegebenen M_max und δ_max mit der zulässigen Spannung und L/360. Für alles Komplexere (mehrere Lasten, Kragarme, Federauflager, Durchläufe, Kragträger, innere Gelenke) nutzen Sie den vollständigen Rechner unter /de/calculator.",
      ],
    },
    {
      heading: "Grenzen",
      paragraphs: [
        "Kein Eigengewicht, keine Kragarme, keine Federauflager, keine inneren Gelenke, keine Durchläufe. Die Ergebnisse sind die exakten geschlossenen Lehrbuchlösungen des Einlastfalls, identisch mit dem vollständigen Löser, wenn nur eine Last vorhanden ist. Für alles andere ist der vollständige Rechner das richtige Werkzeug.",
      ],
    },
  ],
  "simply-supported-point": [
    {
      heading: "Einfeldträger mit mittiger Einzellast berechnen",
      paragraphs: [
        "Diese Seite lädt ein konfiguriertes Modell im Balkenrechner vor. Bearbeiten Sie Positionen und Beträge direkt oder ziehen Sie Elemente im Diagramm. Die Ergebnisse aktualisieren sich sofort in Ihrem Browser.",
        "Der klassische Lehrbuchfall: Auflagerkräfte R = P/2 an jeder Stütze, maximales Moment M = PL/4 bei Feldmitte, maximale Durchbiegung δ = PL³/(48EI) bei Feldmitte. Die Querkraft ist konstant P/2 zwischen Stütze und Last und springt dann auf −P/2.",
      ],
    },
    {
      heading: "Worauf bei mittigen Einzellasten zu achten ist",
      paragraphs: [
        "Reale Lasten sitzen selten exakt bei Feldmitte. Ziehen Sie die Last von der Mitte weg und sehen Sie zu, wie die Auflagerkräfte wandern (R_A = P·b/L, R_B = P·a/L) und das maximale Moment zum Lastpunkt folgt (M_max = P·a·b/L). Die Biegelinie wird unsymmetrisch: das Maximum liegt nicht mehr bei Feldmitte.",
        "Bei mehreren Einzellasten gilt Superposition: Addieren Sie Momente und Durchbiegungen jeder Last. Der Rechner macht das automatisch, sobald Sie mehrere Lasten hinzufügen, von Hand rechnen ist nicht nötig.",
      ],
    },
    {
      heading: "Rechner zum Vergleich",
      paragraphs: [
        "Vergleichen Sie mit dem Fall <a class=\"text-link hover:underline\" href=\"/de/calculator/simply-supported-udl\">Einfeldträger mit Gleichlast</a> (wL²/8 gegenüber PL/4 bei gleicher Gesamtlast: eine mittige Einzellast ergibt das 2-fache Moment einer Gleichlast mit gleichem Gesamt). Für Stahlträger beginnen Sie mit dem <a class=\"text-link hover:underline\" href=\"/de/calculator/steel-beam-calculator\">Stahlträger-Rechner</a> und wählen ein W-Profil aus der Bibliothek.",
      ],
    },
  ],
  "simply-supported-udl": [
    {
      heading: "Einfeldträger mit Gleichlast berechnen",
      paragraphs: [
        "Diese Seite lädt einen Einfeldträger mit Gleichlast über die gesamte Stützweite vor. Ändern Sie Stützweite, Lastintensität oder Querschnitt direkt im Rechner. Die Ergebnisse aktualisieren sich sofort.",
        "Lehrbuchwerte: Auflagerkräfte R = wL/2, M_max = wL²/8 bei Feldmitte, δ_max = 5wL⁴/(384EI) bei Feldmitte. Das Querkraftdiagramm ist linear von +wL/2 bis −wL/2; das Momentendiagramm ist parabolisch.",
      ],
    },
    {
      heading: "Worauf bei Gleichlasten zu achten ist",
      paragraphs: [
        "Eine Teil-Gleichlast (nicht über die gesamte Stützweite) erzeugt andere Auflagerkräfte und ein abschnittsweises Momentendiagramm mit flacherem Scheitel. Ziehen Sie die Lastenden, um Teilflächen zu modellieren, der Rechner behandelt dies exakt. Für einen Dachbalken ist die Gleichlast typischerweise die mitwirkende Flächenlast × Abstand; achten Sie darauf, das Eigengewicht nicht doppelt zu zählen (separat umschalten).",
        "Vergleichen Sie mit dem Fall der <a class=\"text-link hover:underline\" href=\"/de/calculator/simply-supported-point\">mittigen Einzellast</a>: Bei gleicher Gesamtlast (wL = P) ergibt die Gleichlast das halbe Feldmoment und 5/8 der Felddurchbiegung. Eine Gleichlast ist bei gleicher Gesamtlast immer weniger anspruchsvoll als eine mittige Einzellast.",
      ],
    },
    {
      heading: "Rechner zum Vergleich",
      paragraphs: [
        "Für einen Träger mit Einzellasten und Streckenlasten zugleich nutzen Sie den vollständigen <a class=\"text-link hover:underline\" href=\"/de/calculator/simply-supported-beam-calculator\">Einfeldträger-Rechner</a>. Für Durchläufe zeigt der Fall <a class=\"text-link hover:underline\" href=\"/de/calculator/continuous-two-span\">Durchlaufträger mit zwei Feldern</a>, wie das Innenstützmoment die Bemessung verändert.",
      ],
    },
  ],
  "cantilever-udl": [
    {
      heading: "Kragträger mit Gleichlast berechnen",
      paragraphs: [
        "Diese Seite lädt einen links eingespannten Kragträger mit Gleichlast über die gesamte Länge vor. Ändern Sie Länge, Last, Querschnitt oder Material direkt. Die Ergebnisse aktualisieren sich sofort.",
        "Lehrbuchwerte: Einspannreaktion R = wL, Einspannmoment M = wL²/2, Enddurchbiegung δ = wL⁴/(8EI). Die Querkraft ist konstant wL; das Momentendiagramm verläuft parabolisch von 0 am Ende bis wL²/2 an der Einspannung.",
      ],
    },
    {
      heading: "Worauf bei Krag-Gleichlasten zu achten ist",
      paragraphs: [
        "Ein Kragträger mit derselben Gesamtlast wie eine Endlast (wL = P) erzeugt das halbe Einspannmoment (wL²/2 statt PL) und 3/8 der Enddurchbiegung (wL⁴/8EI statt PL³/3EI = wL⁴/3EI). Eine Endlast ist also bei gleicher Gesamtlast eine deutlich konservativere Grenzbetrachtung als eine Gleichlast.",
        "Ist die Last dreieckförmig (0 am Ende, w an der Einspannung), sinkt das Einspannmoment auf wL²/6 und die Enddurchbiegung auf wL⁴/30EI: der Dreiecksfall ist weniger anspruchsvoll als beide anderen. Im Rechner können Sie die Lastform ziehen, um den Übergang zu sehen.",
      ],
    },
    {
      heading: "Rechner zum Vergleich",
      paragraphs: [
        "Vergleichen Sie mit dem Fall <a class=\"text-link hover:underline\" href=\"/de/calculator/cantilever-tip-load\">Kragträger mit Endlast</a>. Für einen Kragträger mit mehreren Lasten oder einem Federauflager nutzen Sie den vollständigen <a class=\"text-link hover:underline\" href=\"/de/calculator/cantilever-beam-calculator\">Kragträger-Rechner</a>.",
      ],
    },
  ],
  "cantilever-tip-load": [
    {
      heading: "Kragträger mit End-Einzellast berechnen",
      paragraphs: [
        "Diese Seite lädt einen links eingespannten Kragträger mit einer Einzellast am freien Ende vor. Ändern Sie Länge, Lastbetrag, Querschnitt oder Material direkt im Rechner. Die Ergebnisse aktualisieren sich sofort.",
        "Lehrbuchwerte: Einspannreaktion R = P, Einspannmoment M = PL, Enddurchbiegung δ = PL³/(3EI). Die Querkraft ist über die gesamte Länge konstant P; das Momentendiagramm verläuft linear von 0 am Ende bis PL an der Einspannung.",
      ],
    },
    {
      heading: "Worauf bei Endlasten zu achten ist",
      paragraphs: [
        "Die abzulesenden Werte sind die Einspannreaktionskraft und das Einspannmoment, zusammen sind sie exakt das, was Konsole, Schweißnaht oder Verankerung aufnehmen muss. Die Enddurchbiegung gegen L/180 ist der Gebrauchstauglichkeitsnachweis; bei gleicher Gesamtlast lenkt eine Endlast 8/3-mal mehr durch als eine Gleichlast, eine verteilte Last auf einen einzelnen Endwert zu reduzieren ist also mit weiter Margene konservativ, aber als Grenzwert nützlich.",
        "Ziehen Sie die Last entlang des Balkens nach innen: Einspannmoment und Enddurchbiegung fallen linear bzw. mit der dritten Potenz; eine Last bei drei Viertel der Länge halbiert bereits die Einspannmoment-Beanspruchung. Diese Empfindlichkeit lohnt sich auszunutzen, wenn Sie eine Konsollast nahe ihrer Stütze platzieren können.",
      ],
    },
    {
      heading: "Häufige Fehler bei diesem Fall",
      paragraphs: [
        "Eine tatsächlich verteilte Last „zur Sicherheit“ als Endlast zu modellieren ist als Grenzwert vertretbar, kann aber verbergen, wo die echte maximale Spannung liegt, wenn sich die Last über den Balken verteilt. Umgekehrt ist es gefährlich: Eine konzentrierte Last als gleichwertige Gleichlast zu modellieren halbiert das scheinbare Einspannmoment und liegt auf der unsicheren Seite. Zweiter Fehler: die Enddurchbiegungsformel auf eine Last anzuwenden, die nicht am Ende sitzt; die geschlossene Form ändert sich, und das Ziehen der Last im Rechner zeigt den korrigierten Wert sofort.",
      ],
    },
  ],
  "fixed-fixed-udl": [
    {
      heading: "Beidseitig eingespannten Träger mit Gleichlast berechnen",
      paragraphs: [
        "Diese Seite lädt einen beidseitig eingespannten Träger mit Gleichlast über die gesamte Stützweite vor. Ändern Sie Stützweite, Last, Querschnitt oder Material direkt. Die Ergebnisse aktualisieren sich sofort.",
        "Lehrbuchwerte: Auflagerkräfte R = wL/2 an jedem Ende, Einspannmomente M = wL²/12 (Stützmoment, negativ), Feldmoment M = wL²/24 (positiv), Felddurchbiegung δ = wL⁴/(384EI). Das Momentendiagramm ist parabolisch mit Stützmoment an den Auflagern und Feldmoment in der Mitte.",
      ],
    },
    {
      heading: "Worauf bei beidseitig eingespannten Trägern zu achten ist",
      paragraphs: [
        "Die Stützmomente (wL²/12) sind betragsmäßig größer als das Feldmoment (wL²/24). Bemessungsentscheidend ist typischerweise das Stützmoment an den Auflagern, dort liegt der Obergurt auf Druck, die seitliche Halterung des Obergurts ist kritisch.",
        "Ist die Einspannung nicht perfekt (reale Verbindungen haben Nachgiebigkeit), liegen die tatsächlichen Momente zwischen den Fällen beidseitig eingespannt und Einfeldträger. Der vollständige Rechner erlaubt die Modellierung elastischer Drehfedern, um dies zu untersuchen.",
      ],
    },
    {
      heading: "Rechner zum Vergleich",
      paragraphs: [
        "Vergleichen Sie mit der <a class=\"text-link hover:underline\" href=\"/de/calculator/simply-supported-udl\">Gleichlast auf dem Einfeldträger</a> (keine Stützmomente, 5-fache Felddurchbiegung). Einen beidseitig eingespannten Träger mit mittiger Einzellast kann der vollständige Rechner darstellen: fügen Sie eine Einzellast bei Feldmitte und Einspannungen an beiden Enden hinzu.",
      ],
    },
  ],
  "overhanging-beam": [
    {
      heading: "Überkragenden Träger mit Gleichlast berechnen",
      paragraphs: [
        "Diese Seite lädt einen symmetrisch überkragenden Träger vor: Stützen im Abstand a von jedem Ende, Gleichlast w über die gesamte Länge L. Ändern Sie a, L, w, Querschnitt oder Material direkt. Die Ergebnisse aktualisieren sich sofort.",
        "Die Auflagerkräfte sind symmetrisch: R = wL/2 an jeder Stütze. Das Moment an den Stützen beträgt M = −w·a²/2 (Stützmoment). Das maximale Feldmoment hängt von a/L ab; bei kleinen Kragarmen liegt es nahe der Feldmitte, bei großen wandert es zu den Stützen.",
      ],
    },
    {
      heading: "Worauf bei überkragenden Trägern zu achten ist",
      paragraphs: [
        "Das Stützmoment ist bei kleinen Kragarmen bemessungsentscheidend (es ist das Anschluss-/Verankerungsmoment). Bei großen Kragarmen kann das Feldmoment das Stützmoment übertreffen. Der Rechner gibt beide aus, damit Sie beide Stellen prüfen können.",
        "Unsymmetrische Kragarme (unterschiedliches a auf jeder Seite) erzeugen unsymmetrische Auflagerkräfte und Momente, der vollständige Rechner handhabt das: fügen Sie Stützen an beliebigen Positionen und eine Gleichlast über die volle Länge hinzu.",
      ],
    },
    {
      heading: "Rechner zum Vergleich",
      paragraphs: [
        "Für einen unsymmetrischen Kragarm oder mehrere Lasten nutzen Sie den vollständigen <a class=\"text-link hover:underline\" href=\"/de/calculator/overhanging-beam\">Rechner für Träger mit Kragarm</a> (die Landing-Page des Falls). Der Fall <a class=\"text-link hover:underline\" href=\"/de/calculator/continuous-two-span\">Durchlaufträger mit zwei Feldern</a> ist die natürliche Fortsetzung, wenn der Kragarm an seiner Spitze gestützt wird und ein dreifeldriger Durchlaufträger entsteht.",
      ],
    },
  ],
  "continuous-two-span": [
    {
      heading: "Durchlaufträger mit zwei gleichen Feldern berechnen",
      paragraphs: [
        "Diese Seite lädt einen zweifeldrigen Durchlaufträger vor: Festlager in A, B, C; jedes Feld der Länge L; Gleichlast w auf beiden Feldern. Ändern Sie L, w, Querschnitt oder Material direkt. Die Ergebnisse aktualisieren sich sofort.",
        "Lehrbuchwerte: Auflagerkräfte R_A = R_C = 3wL/8, R_B = 10wL/8; Stützmoment über B: M = wL²/8; maximales Feldmoment je Feld: M = 9wL²/128 bei x = 5L/8 von der Außenseite; Durchbiegung ≈ 0,0054 wL⁴/EI je Feld.",
      ],
    },
    {
      heading: "Worauf bei Durchlaufträgern zu achten ist",
      paragraphs: [
        "Die Innenstütze B trägt das 1,25-fache der Gesamtlast eines Feldes (10/8 gegenüber 8/8 bei einer einfachen Stütze), und das Stützmoment über B (wL²/8) ist betragsmäßig größer als das Feldmoment eines Einfeldträgers (wL²/8, hier gleich groß, aber bei ungleichen Feldern dominiert das Innenmoment).",
        "Das positive Feldmoment (9wL²/128 ≈ 0,07 wL²) ist kleiner als das Einfeld-Feldmoment (wL²/8 = 0,125 wL²), weil der Durchlauf die Durchbiegung behindert. Daher sind Durchlaufträger effizienter: kleineres Feldmoment bei gleicher Stützweite.",
      ],
    },
    {
      heading: "Häufige Fehler bei Durchlaufträgern",
      paragraphs: [
        "Einen Durchlaufträger als Reihe von Einfeldträgern zu analysieren übersieht das Stützmoment über der Innenstütze: Anschluss und Obergurtverbände sind dort kritisch. Anzunehmen, die Innenstützenreaktion sei nur wL (hier ist sie 1,25 wL, bei ungleichen Feldern auch höher). Zu vergessen, dass eine Stützensenkung an einer Innenstütze die Momente erheblich umverteilt, der Rechner unterstützt vorgegebene Stützensenkung, um dies zu untersuchen.",
      ],
    },
  ],
  "gerber-hinge": [
    {
      heading: "Gerberträger mit innerem Gelenk berechnen",
      paragraphs: [
        "Diese Seite lädt einen zweifeldrigen Träger mit innerem Gelenk an der Fuge (Momentenfreigabe) vor. Das linke Feld ist in A eingespannt und in B gegliedert; das rechte Feld ist in B gegliedert und liegt in C auf einem Loslager. Gleichlast w auf beiden Feldern. Ändern Sie Felder, Last, Querschnitt oder Material direkt.",
        "Das Gelenk erzwingt M = 0 in B. Das linke Feld ist ein gestützter Kragträger: die Reaktion in B beträgt 3wL/8, das Moment in A wL²/8. Das rechte Feld ist ein Einfeldträger: die Reaktion in C beträgt 5wL/8. Das Gelenk überträgt Querkraft, aber kein Moment.",
      ],
    },
    {
      heading: "Warum ein Gerberträger?",
      paragraphs: [
        "Ein Gerberträger wandelt einen statisch unbestimmten Durchlaufträger in ein statisch bestimmtes System um, indem ein Gelenk eingefügt wird. Das vereinfacht die Ausführung (keine Momentenverbindung am Gelenk) und eliminiert Momentenumverteilung aus Stützensenkung. Der Nachteil: Das eingespannte Ende des linken Feldes zieht weiterhin ein großes Moment an, und der Gelenkdetail muss die Querkraft zuverlässig übertragen.",
        "Die Gelenkposition wird typischerweise so gewählt, dass die maximalen Feldmomente ausgeglichen sind (hier bei Feldmitte des rechten Feldes und bei x ≈ 0,578L des linken Feldes). Der Rechner erlaubt das Verschieben des Gelenks, um die optimale Position zu finden.",
      ],
    },
    {
      heading: "Häufige Fehler bei Gerberträgern",
      paragraphs: [
        "Zu vergessen, dass das Gelenk eine echte Momentenfreigabe sein muss: eine teilweise Verbindung, die noch Moment überträgt, zunichtemacht den Zweck und erzeugt ein unbestimmtes System, das sich anders verhält. Die Querkrafttragfähigkeit am Gelenk nicht zu prüfen: Es trägt die gesamte Feldquerkraft. Und anzunehmen, die Felder ließen sich unabhängig bemessen: die Gelenkquerkraft ist auf beiden Seiten gleich, die Verbindung muss also für die größere der beiden Feldquerkräfte bemessen werden.",
      ],
    },
  ],
} as Record<CalculatorSlug, { heading: string; paragraphs: string[] }[]>;

const calculators: CalculatorsCopy = {
  presets: calcPresets,
  variants: calcVariants,
  deepDive,
  related: {} as Record<string, Record<string, string>>,
  ui: {
    eyebrowVariant: "Rechner nach Balkentyp",
    eyebrowPreset: "Rechenbeispiele",
    preloadedNote:
      "Der Rechner unten ist vorgeladen; ändern Sie irgendetwas, und die Ergebnisse aktualisieren sich sofort.",
    breadcrumbHome: "Startseite",
    breadcrumbCalculators: "Rechner",
    aboutThisCaseH2: "Über diesen Fall",
    eulerNote:
      "Alle Diagramme nutzen die Euler–Bernoulli-Balkentheorie mit einem exakten Finite-Elemente-Löser, der vollständig in Ihrem Browser läuft. Sie können Lager per Drag-and-drop verschieben, oben im Eingabepanel das Einheitensystem wechseln und die Ergebnisse als CSV oder druckbaren Bericht exportieren.",
    formulasLinkText: "Geschlossene Formeln für diesen und ähnliche Fälle ansehen →",
    relatedH2: "Rechner zum Vergleich",
    relatedOutro:
      "Neu bei Querkraft- und Biegemomentdiagrammen? Beginnen Sie mit der <a class=\"text-link hover:underline\" href=\"/de/guide\"> Anleitung zu Q und M</a>, oder lesen Sie, <a class=\"text-link hover:underline\" href=\"/de/about\">wie dieser Rechner funktioniert</a>.",
    presetTitleSuffix: " | Kostenloser Balkenrechner",
    presetDescSuffix:
      " Kostenloser Online-Balkenrechner mit sofortigen Diagrammen für Querkraft, Biegemoment, Neigung und Durchbiegung.",
    faqQuestionVariant: (h1: string) => `Wie benutzt man „${h1}“?`,
    faqQuestionPreset: (name: string) => `Wie berechnet man ${name}?`,
    faqAnswer:
      "Diese Seite lädt ein konfiguriertes Modell im Balkenrechner vor. Bearbeiten Sie Positionen und Beträge direkt oder ziehen Sie Elemente im Diagramm. Die Ergebnisse aktualisieren sich sofort in Ihrem Browser.",
  },
};

export const de: LocaleCopy = {
  meta,
  chrome,
  home,
  hub,
  formulas,
  guide,
  about,
  contact,
  privacy,
  terms,
  calculators,
};
