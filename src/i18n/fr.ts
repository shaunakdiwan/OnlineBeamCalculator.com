/**
 * French copy module — traduction complète utilisant la terminologie naturelle
 * du génie des structures (poutre, moment fléchissant, effort tranchant, flèche…).
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
  defaultTitle: "Calculateur de poutres — Effort tranchant, moment fléchissant et flèche gratuits",
  defaultDescription:
    "Calculateur de poutres gratuit. Analysez des poutres sur appuis simples, en console et continues avec des diagrammes instantanés d'effort tranchant et de moment fléchissant. Sans inscription, sans limites.",
  defaultKeywords: [
    "calculateur de poutres",
    "calculateur de poutres gratuit",
    "calculateur de poutres en ligne",
    "calcul de poutre en ligne",
    "calculateur de poutre acier",
    "calculateur de poutre bois",
    "calculateur de poutre en console",
    "calculateur de poutre sur appuis simples",
    "calculateur de panne faîtière",
    "moment fléchissant",
  ],
  ogImageAlt: "Calculateur de poutres en ligne : diagrammes d'effort tranchant, de moment fléchissant et de flèche gratuits",
};

const chrome: ChromeCopy = {
  nav: {
    calculator: "Calculateur",
    formulas: "Formules",
    guide: "Guide",
    faq: "FAQ",
    about: "À propos",
    openCalculator: "Ouvrir le calculateur",
    freeBadge: "100% GRATUIT",
    toggleTheme: "Basculer le mode sombre",
    languageLabel: "Langue",
  },
  noscript:
    "Le calculateur de poutres nécessite JavaScript pour fonctionner, car toute l'analyse s'exécute dans votre navigateur. Veuillez activer JavaScript et recharger la page.",
  footer: {
    calculatorsHead: "Calculateurs",
    materialsHead: "Matériaux",
    learnHead: "Apprendre",
    resourcesHead: "Ressources",
    brandHead: "OnlineBeamCalculator.com",
    tagline: "Analyse de structures gratuite dans votre navigateur. Sans compte, sans limites, sans installation.",
    runsClientSide: "Fonctionne 100% côté client",
    linkBeamCalculator: "Calculateur de poutres",
    linkSimplySupported: "Poutres sur appuis simples",
    linkCantilever: "Poutres en console",
    linkContinuous: "Poutres continues",
    linkSteel: "Poutres acier",
    linkWood: "Poutres bois",
    linkRidge: "Pannes faîtrières",
    linkOverhanging: "Poutres en porte-à-faux",
    linkFormulas: "Formules de poutres",
    linkSfdBmd: "Lecture des diagrammes V et M",
    linkSignConventions: "Conventions de signe",
    linkFixedFixed: "Poutre bi-encastrée",
    linkAbout: "À propos",
    linkContactUs: "Nous contacter",
    linkPrivacyPolicy: "Politique de confidentialité",
    linkTerms: "Conditions d'utilisation",
    bottomPrivacy: "Confidentialité",
    bottomTerms: "Conditions",
    bottomContact: "Contact",
  },
};

const home: HomeCopy = {
  title: "Calculateur de poutres — Effort tranchant, moment fléchissant et flèche en ligne gratuits",
  description:
    "Calculateur de poutres gratuit : analysez en ligne des poutres sur appuis simples, en console et continues. Diagrammes instantanés d'effort tranchant, de moment fléchissant, de pente et de flèche. Sans inscription.",
  eyebrow: "Gratuit · Sans inscription · Fonctionne dans votre navigateur",
  h1: "Calculateur de poutres",
  hero:
    "Analysez en ligne des poutres sur appuis simples, en console, encastrées, en porte-à-faux et continues. Obtenez instantanément les diagrammes d'effort tranchant, de moment fléchissant, de pente et de flèche, avec les réactions, les contraintes et les vérifications de flèche aux limites de service.",
  s1: {
    h2: "Un calculateur de poutres en ligne gratuit qui fonctionne comme un vrai outil",
    p1:
      "Ce calculateur de poutres est conçu pour les ingénieurs, les étudiants, les fabricants et les bricoleurs qui ont besoin de réponses structurelles rapides et précises sans installer de logiciel ni créer de compte. Il exécute un solveur complet en éléments finis Euler–Bernoulli directement dans votre navigateur, de sorte que les résultats s'affichent instantanément pendant la saisie. Aucune limite de charges, aucune fonctionnalité verrouillée, aucun formulaire d'inscription : ouvrez la page et analysez.",
    p2:
      "Que vous l'appeliez calculateur de poutres simple, calculateur de poutres en ligne ou outil d'analyse de structures, le principe est le même : définir la longueur de la poutre, placer les appuis, ajouter les charges et lire les diagrammes. Le canevas glisser-déposer permet de déplacer appuis et charges comme dans un vrai éditeur, et chaque modification est recalculée en moins d'une milliseconde.",
  },
  s2: {
    h2: "Ce que ce calculateur de poutres peut analyser",
    beamTypes: {
      h3: "Types de poutres",
      p: "Poutres sur appuis simples, poutres en console, poutres bi-encastrées, poutres encastrées-appuyées, poutres en porte-à-faux, poutres continues à plusieurs travées et poutres de Gerber avec rotules internes (libérations de moment). Si vous cherchez un calculateur de poutre en console ou un calculateur de poutre sur appuis simples, ces configurations sont accessibles en un clic dans le menu d'exemples.",
    },
    supports: {
      h3: "Appuis et liaisons",
      p: "Les appuis simples, mobiles (rouleaux), encastrés et élastiques peuvent être placés n'importe où le long de la poutre, y compris sur les porte-à-faux. La rigidité des appuis élastiques est entièrement réglable, et vous pouvez imposer un tassement d'appui pour étudier les effets de tassements différentiels. Les rotules internes créent de véritables libérations de moment entre les travées, ce qui est indispensable pour modéliser les poutres de Gerber.",
    },
    loads: {
      h3: "Charges",
      p: "Ajoutez un nombre illimité de charges : charges ponctuelles, moments appliqués, charges uniformément réparties, charges triangulaires et charges trapézoïdales à variation linéaire générale, avec intensités de début et de fin indépendantes. Les charges peuvent commencer et s'arrêter n'importe où sur la poutre, et une option de poids propre applique automatiquement le poids de la poutre comme charge répartie, calculée à partir de l'aire de la section et de la masse volumique du matériau.",
    },
  },
  s3: {
    h2: "Un calculateur de poutres acier et un calculateur de poutres bois en un seul outil",
    p: "Les bibliothèques de matériaux et de sections rendent cet outil aussi utile comme calculateur de poutres acier que comme calculateur de poutres bois. Les préréglages incluent l'acier structurel (A36), l'aluminium (6061-T6), le béton et le bois, chacun avec un module de Young, une masse volumique et une limite d'élasticité réalistes. La bibliothèque de sections couvre les rectangles, les sections creuses, les cercles, les profilés en I, les fers en U et une sélection de profilés W AISC courants, et vous pouvez toujours saisir une aire et un moment d'inertie personnalisés à la main. Pour le dimensionnement d'une panne faîtière en charpente, modélisez le faîtier comme une poutre bois sur appuis simples ou en porte-à-faux avec des charges ponctuelles de chevrons : le calculateur fournit les réactions, le moment maximal et la flèche, pour comparer le résultat aux tables de portées admissibles.",
  },
  s4: {
    h2: "Des résultats réellement exploitables",
    p1:
      "Un tableau de bord présente l'effort tranchant maximal, le moment fléchissant maximal, la flèche maximale et la contrainte de flexion maximale avec la position exacte de chacun, sans avoir à fouiller dans un graphique. En dessous, les diagrammes interactifs d'effort tranchant, de moment fléchissant, de pente et de flèche se lisent au survol ou au toucher en tout point de la portée. Des badges de vérification comparent automatiquement la poutre aux limites de service courantes L/240, L/360 et L/480.",
    p2:
      "Tout est conçu pour les vrais flux de travail : systèmes d'unités métrique et impérial complets avec sélecteurs d'unités fins (mm, cm, m, in, ft ; N, kN, lb, kip ; Pa, MPa, GPa, psi, ksi), bascule de convention de signe, annuler et rétablir, liens partageables qui codent tout le modèle dans l'URL, export CSV de toutes les données des diagrammes et rapport optimisé pour l'impression que vous pouvez enregistrer en PDF.",
  },
  s5: {
    h2: "Comment utiliser le calculateur de poutres",
    items: [
      "Définissez la longueur de la poutre et choisissez un préréglage dans le menu d'exemples, ou partez de zéro.",
      "Cliquez sur la poutre pour ajouter des appuis et des rotules ; faites glisser les pictogrammes pour les repositionner.",
      "Ajoutez des charges depuis le panneau de saisie : charges ponctuelles, moments, charges uniformes, triangulaires ou trapézoïdales.",
      "Choisissez un matériau et une section, ou saisissez des propriétés personnalisées.",
      "Lisez les réactions et les valeurs maximales sur le tableau de bord ; survolez les diagrammes pour interroger n'importe quel point.",
      "Partagez le lien, téléchargez le CSV ou imprimez le rapport pour vos archives.",
    ],
  },
  s6: {
    h2: "Pourquoi les ingénieurs choisissent ce calculateur de poutres gratuit",
    p1:
      "La plupart des outils gratuits limitent le nombre de charges, cachent les résultats de flèche derrière un paywall ou vous poussent vers un tunnel d'inscription. Celui-ci non. Il gère gratuitement les structures hyperstatiques, les travées continues, les appuis élastiques, les rotules internes et le tassement des appuis, et il protège vos données puisque chaque calcul s'effectue localement sur votre appareil. Ajoutez-le à vos favoris, partagez-le et utilisez-le comme votre calculateur de poutres en ligne au quotidien.",
    p2:
      "Vous cherchez la théorie ? La page des <a class=\"text-link hover:underline\" href=\"/fr/formulas\">formules de poutres</a> liste les réactions, moments et flèches en forme close pour les cas standards, et le <a class=\"text-link hover:underline\" href=\"/fr/guide\"> guide</a> explique comment lire les diagrammes d'effort tranchant et de moment fléchissant. Nos méthodes et hypothèses sont documentées sur la <a class=\"text-link hover:underline\" href=\"/fr/about\">page à propos</a>. Prêt à commencer ? <a class=\"text-link hover:underline\" href=\"/fr/calculator\">Ouvrez le calculateur</a>.",
  },
  faqEyebrow: "Questions fréquentes",
  faqH2: "Foire aux questions",
  faqVisible: [
    {
      q: "Qu'est-ce qu'un calculateur de poutres ?",
      a: "Un calculateur de poutres calcule les réactions, l'effort tranchant, le moment fléchissant, la pente et la flèche d'une poutre pour des appuis et des charges donnés. Cet outil utilise une méthode d'éléments finis exacte et renvoie des diagrammes exacts par morceaux.",
    },
    {
      q: "Ce calculateur de poutres est-il vraiment gratuit ?",
      a: "Oui : charges illimitées, portées illimitées, tous les matériaux et sections, export et impression. Aucun compte n'est jamais nécessaire.",
    },
    {
      q: "Puis-je l'utiliser comme calculateur de poutres bois ou acier ?",
      a: "Oui. Choisissez les préréglages acier, aluminium, béton ou bois, ou saisissez un module personnalisé. Les profilés W sont inclus pour l'acier, et les sections rectangulaires couvrent les dimensions courantes du bois de construction.",
    },
    {
      q: "Quels types de poutres sont pris en charge ?",
      a: "Poutres sur appuis simples, en console, bi-encastrées, encastrées-appuyées, en porte-à-faux, continues multi-travées et poutres de Gerber avec rotules internes, plus les appuis élastiques et le tassement.",
    },
    {
      q: "Puis-je partager ou enregistrer mon modèle ?",
      a: "Oui. Le modèle est codé dans l'URL : copier le lien partage la poutre exacte. Votre dernier modèle est également sauvegardé automatiquement dans le navigateur.",
    },
    {
      q: "Comment calculer la charge sur une poutre ?",
      a: "Additionnez toutes les charges que la poutre reprend : charges permanentes (poids propre de la poutre, du plancher, du toit, des finitions), charges d'exploitation (occupation, neige, mobilier) et charges concentrées dues aux murs ou aux équipements. Multipliez les charges de plancher en kN/m² par la largeur tributaire pour obtenir une charge linéique en kN/m, puis saisissez-la ici. Le calculateur renvoie les réactions et les efforts tranchants et moments internes le long de la portée.",
    },
    {
      q: "Quelle est la formule de calcul d'une poutre ?",
      a: "Pour une poutre sur appuis simples avec charge ponctuelle centrale : R = P/2, M<sub>max</sub> = PL/4, δ<sub>max</sub> = PL³/(48EI). Avec une charge uniforme w : R = wL/2, M<sub>max</sub> = wL²/8, δ<sub>max</sub> = 5wL⁴/(384EI). Console avec charge en extrémité : M_max = PL à l'encastrement, δ_tip = PL³/(3EI). Référence complète sur la <a class=\"text-link hover:underline\" href=\"/fr/formulas\">page des formules</a>.",
    },
    {
      q: "Comment calculer le poids qu'une poutre peut supporter ?",
      a: "Effectuez deux vérifications et retenez la plus contraignante. Résistance : gardez la contrainte de flexion σ = M·c/I sous la contrainte admissible (limite élastique ÷ coefficient de sécurité). Service : gardez la flèche δ<sub>max</sub> ≤ L/360 (ou L/240). Saisissez votre section, lisez M_max et δ_max sur le tableau de bord et comparez σ_max à la contrainte admissible du matériau.",
    },
    {
      q: "Comment calculer la capacité de charge structurelle ?",
      a: "La capacité combine flexion, cisaillement et flèche. Flexion : la plus grande P telle que M_max ≤ f<sub>y</sub>·I/c. Cisaillement : V_max ≤ τ_adm·A. Flèche : choisissez E·I pour que δ_max ≤ L/limite. Cet outil fournit les trois avec leurs positions, chaque vérification se lit directement ; le calcul réglementaire (AISC, NDS, Eurocode) ajoute des coefficients de sécurité et de résistance.",
    },
  ],
  faqLd: [
    {
      q: "Qu'est-ce qu'un calculateur de poutres ?",
      a: "Un calculateur de poutres est un outil d'analyse de structures qui calcule les réactions, l'effort tranchant, le moment fléchissant, la pente et la flèche d'une poutre pour des appuis et des charges donnés. Ce calculateur de poutres en ligne gratuit utilise un solveur exact en éléments finis Euler–Bernoulli qui s'exécute entièrement dans votre navigateur.",
    },
    {
      q: "Ce calculateur de poutres est-il vraiment gratuit ?",
      a: "Oui. Charges illimitées, portées illimitées, toutes les bibliothèques de sections, l'export CSV et les rapports imprimables sont entièrement gratuits, sans inscription, sans période d'essai et sans paywall.",
    },
    {
      q: "Puis-je l'utiliser comme calculateur de poutres bois ou acier ?",
      a: "Oui. Choisissez parmi les matériaux prédéfinis (acier structurel, aluminium, béton et bois) ou saisissez un module de Young personnalisé. Une bibliothèque de profilés W AISC courants est incluse pour le calcul acier, et les sections rectangulaires conviennent aux poutres bois.",
    },
    {
      q: "Quels types de poutres l'outil prend-il en charge ?",
      a: "Poutres sur appuis simples, en console, bi-encastrées, encastrées-appuyées, en porte-à-faux, continues multi-travées et poutres de Gerber avec rotules internes. Les appuis élastiques et le tassement des appuis sont également pris en charge.",
    },
    {
      q: "Puis-je partager ou enregistrer mon modèle de poutre ?",
      a: "Oui. Tout le modèle est sérialisé dans l'URL : vous pouvez copier le lien pour partager la poutre exacte avec un collègue ou l'ajouter à vos favoris. Votre dernier modèle est également sauvegardé localement dans votre navigateur.",
    },
    {
      q: "Comment calculer la charge sur une poutre ?",
      a: "Recensez toutes les forces que la poutre doit reprendre : charges permanentes (poids propre de la poutre, du plancher, du toit, des finitions), charges d'exploitation (occupation, neige, mobilier) et charges concentrées dues aux murs, poteaux ou équipements posés dessus. Multipliez les charges de plancher en kN/m² par la largeur tributaire pour obtenir une charge linéique (répartie) en kN/m, puis saisissez ces charges ici. Le calculateur renvoie les réactions et les efforts tranchants et moments internes le long de la portée.",
    },
    {
      q: "Quelle est la formule de calcul d'une poutre ?",
      a: "Pour une poutre sur appuis simples avec charge ponctuelle centrale : réactions R = P/2, moment maximal M = PL/4 à mi-portée et flèche maximale δ = PL³/(48EI). Avec une charge uniforme w : R = wL/2, M = wL²/8, δ = 5wL⁴/(384EI). Console avec charge en extrémité : M = PL à l'encastrement, δ = PL³/(3EI). Le tableau complet des formules se trouve sur la page /fr/formulas.",
    },
    {
      q: "Comment calculer le poids qu'une poutre peut supporter ?",
      a: "La capacité est gouvernée par la plus contraignante d'une vérification de résistance et d'une vérification de service. Résistance : exiger σ = M·c/I ≤ fy (contrainte de flexion sous la limite élastique, avec coefficient de sécurité). Service : exiger δmax ≤ L/360 (ou L/240) pour que la poutre ne s'affaisse pas visiblement et ne fissure pas les finitions. Modélisez votre section ici, lisez M_max et δ_max et comparez-les à la contrainte admissible du matériau.",
    },
    {
      q: "Comment calculer la capacité de charge structurelle ?",
      a: "La capacité structurelle combine résistance en flexion, résistance au cisaillement et flèche. Flexion : charge admissible P telle que M_max ≤ fy·I/c. Cisaillement : V_max ≤ τ_adm·A. Flèche : choisir E·I pour que δ_max ≤ L/limite. Cet outil fournit M_max, V_max et δ_max avec leurs positions pour effectuer chaque vérification directement ; le calcul aux normes (AISC, NDS, Eurocode) ajoute en outre des coefficients de sécurité et de résistance.",
    },
  ],
};

const hub: HubCopy = {
  title: "Calculateur de poutres en ligne | Diagrammes V, M et flèche",
  description:
    "Calculateur de poutres en ligne gratuit : analysez des poutres sur appuis simples, en console et continues avec des diagrammes V, M et de flèche instantanés.",
  keywords: [
    "calculateur de poutres en ligne",
    "calcul de poutre en ligne",
    "calculateur de poutres gratuit",
    "calculateur de poutres gratuit en ligne",
  ],
  h1: "Calculateur de poutres en ligne",
  s1: {
    h2: "Tous les cas de poutres, un seul répertoire",
    p: "L'outil ci-dessus démarre vide. Si votre problème correspond à une configuration standard, les calculateurs ci-dessous la chargent préconfigurée : remplacez simplement la portée, les charges et la section. Ce sont tous le même outil gratuit exécuté dans votre navigateur, avec les mêmes réactions, diagrammes d'effort tranchant et de moment fléchissant, courbes de pente et de flèche, et vérifications de contraintes.",
  },
  byTypeH2: "Calculateurs par type de poutre",
  byTypeExtra: [
    "Poutre bi-encastrée, charge uniforme",
    "Poutre en porte-à-faux",
    "Poutre continue, deux travées",
    "Poutre de Gerber avec rotule interne",
  ],
  workedH2: "Exemples travaillés",
  workedIntro:
    "Cas classiques de manuel, prêts à être exécutés et comparés aux réponses en forme close sur la page des <a class=\"text-link hover:underline\" href=\"/fr/formulas\"> formules de poutres</a>.",
  whichH2: "De quel calculateur ai-je besoin ?",
  whichP:
    "Pour les planchers et charpentes bois, commencez par le <a class=\"text-link hover:underline\" href=\"/fr/calculator/wood-beam-calculator\"> calculateur de poutres bois</a>. Pour l'acier structurel avec profilés W AISC, utilisez le <a class=\"text-link hover:underline\" href=\"/fr/calculator/steel-beam-calculator\"> calculateur de poutres acier</a>. Pour des chevrons s'appuyant sur un faîtier porteur, le <a class=\"text-link hover:underline\" href=\"/fr/calculator/ridge-beam-calculator\"> calculateur de panne faîtière</a> modélise les réactions des chevrons comme charges ponctuelles. Pour des poutres reposant sur trois appuis ou plus, partez de l'exemple <a class=\"text-link hover:underline\" href=\"/fr/calculator/continuous-two-span\">poutre continue à deux travées</a>. Pour aller plus loin : le <a class=\"text-link hover:underline\" href=\"/fr/guide\">guide des diagrammes V et M</a> explique comment lire les résultats, et la <a class=\"text-link hover:underline\" href=\"/fr/about\">page à propos</a> documente les hypothèses et limites de l'outil.",
};

const formulas: FormulasCopy = {
  title: "Formules de poutres | Réactions, moments et flèches",
  description:
    "Formules de poutres en forme close : réactions, moment maximal et flèche pour poutres sur appuis simples, en console, bi-encastrées et continues.",
  eyebrow: "Référence",
  h1: "Formules de poutres",
  intro:
    "Réactions, moments maximaux et flèches maximales en forme close pour les cas standards de poutres. Chaque cas ci-dessous peut être chargé de manière interactive dans le <a class=\"text-link hover:underline\" href=\"/fr/calculator\">calculateur</a>.",
  colReactions: "Réactions",
  colMoment: "Moment fléchissant",
  colDeflection: "Flèche",
  cases: [
    {
      name: "Poutre sur appuis simples, charge ponctuelle centrale P",
      sketch: "Appui simple en A, appui mobile en B ; P à x = L/2",
    },
    {
      name: "Poutre sur appuis simples, charge ponctuelle P à x = a",
      sketch: "Appui simple en A, appui mobile en B ; P à la distance a de A (b = L − a)",
    },
    {
      name: "Poutre sur appuis simples, charge uniforme w (toute la portée)",
      sketch: "Appui simple en A, appui mobile en B, charge uniforme w",
    },
    {
      name: "Poutre sur appuis simples, moment appliqué M₀ à x = a",
      sketch: "Couple concentré",
    },
    {
      name: "Console, charge ponctuelle P en extrémité",
      sketch: "Encastrée en A ; P à l'extrémité libre",
    },
    {
      name: "Console, charge uniforme w (toute la longueur)",
      sketch: "Encastrée en A, charge uniforme w",
    },
    {
      name: "Console, charge triangulaire (0 à l'extrémité → w à l'encastrement)",
      sketch: "Croissance linéaire vers l'encastrement",
    },
    {
      name: "Console encastrée-appuyée, charge uniforme w",
      sketch: "Encastrée en A, appui mobile en B",
    },
    {
      name: "Poutre bi-encastrée, charge uniforme w",
      sketch: "Les deux extrémités encastrées",
    },
    {
      name: "Poutre bi-encastrée, charge ponctuelle centrale P",
      sketch: "Les deux extrémités encastrées ; P à L/2",
    },
    {
      name: "Deux travées égales, charge uniforme w sur les deux",
      sketch: "Appuis simples en A, B, C ; chaque travée L",
    },
    {
      name: "Porte-à-faux (symétrique), charge uniforme w",
      sketch: "Appuis à la distance a de chaque extrémité, longueur totale L",
    },
  ],
  liveH2: "Vérifier une formule en direct",
  liveP:
    "Chaque réponse en forme close ci-dessus correspond à un cas interactif. Vérifiez les chiffres vous-même : <a class=\"text-link hover:underline\" href=\"/fr/calculator/cantilever-udl\">console sous charge uniforme</a>, <a class=\"text-link hover:underline\" href=\"/fr/calculator/cantilever-tip-load\">console avec charge en extrémité</a>, <a class=\"text-link hover:underline\" href=\"/fr/calculator/simply-supported-udl\">poutre sur appuis simples avec charge uniforme</a>, <a class=\"text-link hover:underline\" href=\"/fr/calculator/fixed-fixed-udl\">poutre bi-encastrée avec charge uniforme</a>, ou la <a class=\"text-link hover:underline\" href=\"/fr/calculator/continuous-two-span\">poutre continue à deux travées</a>. Le répertoire complet est sur la <a class=\"text-link hover:underline\" href=\"/fr/calculator\">page des calculateurs</a>.",
  legend:
    "P charge ponctuelle · w charge répartie par unité de longueur · L portée · E module de Young · I moment quadratique. Moments fléchissants positifs en travée ; flèches descendantes tracées positives.",
};

const guide: GuideCopy = {
  title: "Guide | Lecture des diagrammes V et M, conventions de signe",
  description:
    "Comment lire les diagrammes d'effort tranchant et de moment fléchissant, les conventions de signe, et le fonctionnement du calculateur.",
  eyebrow: "Guide",
  h1: "Comment fonctionne l'analyse des poutres",
  sfd: {
    h2: "Diagramme de l'effort tranchant (V)",
    p: "L'effort tranchant V(x) dans une section est la somme algébrique des forces verticales d'un côté de la coupe. Les charges ponctuelles descendantes provoquent des sauts vers le bas ; les réactions d'appui provoquent des sauts vers le haut ; les charges réparties créent des droites inclinées (la pente vaut −w). Les passages par zéro marquent les extremums potentiels du moment fléchissant.",
  },
  bmd: {
    h2: "Diagramme du moment fléchissant (M)",
    p: "Le moment fléchissant M(x) est l'aire sous la courbe d'effort tranchant : M(x) = M(0) + ∫V dx. Les segments incurvés en travée apparaissent sous les charges uniformes (paraboles), les droites sous les charges ponctuelles, et les couples appliqués provoquent des sauts instantanés. Les rotules internes imposent M = 0 à la position de la rotule.",
  },
  signs: {
    h2: "Conventions de signe",
    p: "Ce calculateur utilise par défaut la convention <strong>moment positif en travée</strong> : un moment qui creuse la poutre (forme de sourire) est positif ; la flèche descendante est tracée vers le bas (négative). Vous pouvez inverser la convention de signe du moment/tranchant avec la bascule sous les résultats. Les couples appliqués sont positifs en sens horaire dans les saisies.",
  },
  supports: {
    h2: "Appuis",
    items: [
      "<strong>Appui simple :</strong> bloque la translation verticale ; libre en rotation.",
      "<strong>Appui mobile (rouleau) :</strong> identique à l'appui simple dans ce modèle vertical 2D ; libre horizontalement.",
      "<strong>Encastrement :</strong> bloque la translation et la rotation (ajoute une réaction de moment d'encastrement).",
      "<strong>Appui élastique :</strong> ressort vertical de rigidité k ; la réaction vaut k × la flèche corrigée du tassement.",
      "<strong>Rotule interne :</strong> libère le moment, la rotation est donc discontinue à travers la rotule.",
    ],
  },
  method: {
    h2: "Méthode",
    p: "Le moteur est un solveur classique en éléments finis Euler–Bernoulli : deux degrés de liberté par nœud (v, θ), éléments de poutre hermitiens exacts, charges nodales cohérentes pour les charges réparties, et post-traitement exact par morceaux. Le temps de résolution est inférieur à la milliseconde pour les modèles courants et tout s'exécute localement dans votre navigateur : rien n'est envoyé à un serveur.",
  },
  tryIt: {
    h2: "Essayez sur un cas réel",
    p: "Le moyen le plus rapide d'intégrer ces diagrammes est de construire un cas et de les voir évoluer. Commencez par la <a class=\"text-link hover:underline\" href=\"/fr/calculator/cantilever-udl\">console sous charge uniforme</a> pour voir l'effort tranchant linéaire et le moment parabolique classiques, ou le <a class=\"text-link hover:underline\" href=\"/fr/calculator/cantilever-beam-calculator\">calculateur de poutre en console</a> pour les charges et moments en extrémité. Pour tous les détails sur les hypothèses de l'outil, voir la <a class=\"text-link hover:underline\" href=\"/fr/about\">page à propos</a>.",
  },
  stresses: {
    h2: "Contraintes et service",
    p: "La contrainte de flexion est calculée par σ = M·c/I séparément pour les fibres supérieure et inférieure (cSup, cInf peuvent différer pour les sections asymétriques). La contrainte de cisaillement moyenne vaut V/A : une vérification grossière ; les âmes des profilés en I reprennent un cisaillement de pointe nettement supérieur. Les badges de flèche comparent la poutre aux limites de service courantes L/240, L/360 et L/480.",
  },
  api: {
    h2: "Capacités du calculateur (référence API et LLM)",
    p: "Cet outil est une application web côté client. Il ne fournit pas d'API REST, mais la description en texte brut ci-dessous est destinée aux crawlers d'IA, aux LLM et aux utilisateurs techniques pour comprendre ses capacités exactes sans exécuter l'interface JavaScript.",
    inputsH3: "Entrées prises en charge",
    inputsList: [
      "<strong>Longueur de poutre :</strong> toute valeur positive.",
      "<strong>Appuis :</strong> Appui simple, Appui mobile, Encastrement, Appui élastique (rigidité réglable), Rotule interne (libération de moment). Placables n'importe où, y compris sur les porte-à-faux.",
      "<strong>Charges :</strong> Charge ponctuelle, Moment appliqué, Charge uniformément répartie, Charge triangulaire, Charge trapézoïdale (variation linéaire). Les charges peuvent commencer et s'arrêter n'importe où sur la poutre.",
      "<strong>Matériaux :</strong> Module de Young (E), masse volumique et limite élastique personnalisés. Préréglages inclus pour l'acier, le bois, l'aluminium et le béton.",
      "<strong>Sections :</strong> Aire (A) et moment d'inertie (I) personnalisés. Préréglages inclus pour sections rectangulaires, circulaires, creuses, profilés en I et profilés W AISC.",
      "<strong>Autres :</strong> Poids propre activable (calculé à partir de l'aire et de la masse volumique), tassement d'appui.",
    ],
    outputsH3: "Résultats calculés",
    outputsList: [
      "<strong>Réactions :</strong> Force verticale et moment fléchissant à chaque appui.",
      "<strong>Diagrammes :</strong> Diagrammes exacts par morceaux d'effort tranchant (V), de moment fléchissant (M), de pente et de flèche.",
      "<strong>Extremums :</strong> Amplitude et position exactes (x) de l'effort tranchant maximal, du moment maximal (positif/négatif) et de la flèche maximale.",
      "<strong>Contraintes :</strong> Contrainte de flexion maximale (calculée par M·c/I) et contrainte de cisaillement moyenne (V/A).",
      "<strong>Service :</strong> Vérifications conforme/non conforme pour les limites de flèche L/240, L/360 et L/480.",
    ],
  },
};

const about: AboutCopy = {
  title: "À propos : calculateur de poutres gratuit",
  description:
    "Pourquoi ce calculateur existe : portées illimitées, appuis élastiques, rotules, charges trapézoïdales et diagrammes instantanés : 100% gratuit, sans compte.",
  eyebrow: "À propos",
  h1: "Un calculateur de poutres qui ne vous gêne jamais",
  p1:
    "OnlineBeamCalculator.com est un outil d'analyse de structures gratuit destiné aux ingénieurs, étudiants et constructeurs. Il exécute un solveur exact de poutres en éléments finis entièrement dans votre navigateur : sans compte, sans téléversement, sans serveur, sans coût.",
  p2:
    "Il prend en charge un nombre illimité de travées, les appuis simples/mobiles/encastrés/élastiques, les rotules internes (libérations de moment), les charges ponctuelles, les moments, les charges réparties uniformes et à variation linéaire (trapézoïdales), le poids propre, le tassement d'appui imposé, et le passage complet métrique/impérial avec sélecteurs d'unités fins.",
  p3:
    "Les résultats comprennent les réactions, les diagrammes d'effort tranchant/moment/pente/flèche avec interrogation ponctuelle, les valeurs max/min avec leurs positions, les contraintes de flexion et de cisaillement moyen, et les vérifications de flèche aux limites de service (L/240, L/360, L/480). Tout peut être exporté en CSV ou imprimé sous forme de rapport, et les modèles peuvent être partagés par lien : aucune connexion n'est jamais requise.",
  assumptionsH2: "Hypothèses et limites",
  assumptions: [
    "Théorie des poutres d'Euler–Bernoulli (les sections planes restent planes ; déformation de cisaillement négligée).",
    "Section linéaire-élastique et prismatique sur toute la poutre (les sections variables ne sont pas encore prises en charge).",
    "Flexion verticale 2D uniquement ; pas d'analyse axiale ou de torsion.",
    "Contrainte de cisaillement moyenne V/A uniquement ; pour les vérifications locales d'âme, utilisez un outil de calcul réglementaire.",
    "Les résultats servent uniquement d'aide à l'analyse ; vérifiez les conceptions critiques vis-à-vis des normes applicables.",
  ],
};

const contact: ContactCopy = {
  title: "Nous contacter | OnlineBeamCalculator.com",
  description:
    "Contactez OnlineBeamCalculator.com : rapports de bugs, demandes de fonctionnalités et questions générales sur le calculateur de poutres gratuit.",
  eyebrow: "Contact",
  h1: "Nous contacter",
  intro:
    "Les retours, rapports de bugs et demandes de fonctionnalités façonnent cet outil. Si un résultat semble incorrect, qu'un cas de charge se comporte mal ou qu'il vous manque une fonctionnalité, nous voulons le savoir.",
  emailH2: "E-mail",
  emailP:
    "Écrivez-nous à <a class=\"text-link hover:underline\" href=\"mailto:support@onlinebeamcalculator.com\">support@onlinebeamcalculator.com</a>. Nous répondons généralement sous quelques jours ouvrés.",
  reportH2: "Signaler un résultat erroné",
  reportIntro: "Le moyen le plus rapide de faire corriger un bug est d'inclure :",
  reportItems: [
    "Le lien de partage du modèle (utilisez le bouton copier-lien dans le calculateur ; tout le modèle est codé dans l'URL).",
    "Ce que vous attendiez et ce que l'outil a affiché.",
    "Votre navigateur et votre système d'exploitation, si le problème semble visuel.",
  ],
  reportOutro:
    "Comme tout s'exécute côté client, le lien de partage suffit généralement à reproduire exactement le problème.",
  featureH2: "Demandes de fonctionnalités",
  featureP:
    "Sections variables, types de charges supplémentaires, vérifications de service additionnelles, exports : dites-nous ce qui rendrait l'outil plus utile dans votre flux de travail et cela sera envisagé pour une future version.",
};

const privacy: LegalCopy = {
  title: "Politique de confidentialité | OnlineBeamCalculator.com",
  description:
    "Politique de confidentialité d'OnlineBeamCalculator.com : un calculateur de poutres entièrement côté client. Sans compte, sans suivi de vos calculs, aucune donnée envoyée à un serveur.",
  eyebrow: "Mentions légales",
  h1: "Politique de confidentialité",
  updated: "Dernière mise à jour : 22 août 2026",
  blocks: [
    {
      h2: "En résumé",
      p: "OnlineBeamCalculator.com fonctionne entièrement dans votre navigateur. Vos modèles de poutres, charges, unités et résultats ne quittent jamais votre appareil. Nous n'avons pas de comptes, nous ne stockons pas vos calculs sur un serveur, et il n'y a rien à désactiver puisque rien n'est collecté.",
    },
    {
      h2: "Ce que nous ne collectons pas",
      items: [
        "Aucune donnée personnelle telle que noms, adresses e-mail ou identifiants de compte (l'inscription n'existe pas sur ce site).",
        "Aucune donnée de calcul. Toute l'analyse structurelle est calculée localement par le JavaScript de votre navigateur. Rien de ce que vous saisissez dans le calculateur ne nous est transmis.",
        "Aucun cookie publicitaire ni de suivi comportemental.",
      ],
    },
    {
      h2: "Stockage local",
      p: "Le site enregistre un petit nombre de préférences dans le stockage local de votre navigateur, comme votre choix de thème (clair ou sombre) et vos préférences d'unités, pour qu'elles persistent entre les visites. Ces données restent sur votre appareil, ne nous sont jamais envoyées et peuvent être effacées à tout moment via les réglages de votre navigateur.",
    },
    {
      h2: "Liens partagés",
      p: "Lorsque vous partagez un modèle par lien, toute la configuration du modèle est codée dans l'URL elle-même. Quiconque ouvre le lien la décode localement dans son propre navigateur. Le contenu du lien n'est stocké dans aucune base de données exploitée par nous.",
    },
    {
      h2: "Hébergement et journaux",
      p: "Le site est distribué sous forme de fichiers statiques via un réseau de diffusion de contenu (actuellement Cloudflare Pages). Comme tout hébergeur, le CDN peut traiter des données techniques standard (adresse IP, agent utilisateur, URL demandée) dans des journaux serveur de courte durée pour servir les pages et se protéger contre les abus. Nous n'accédons pas à ces journaux, ne les combinons pas et ne les conservons pas à des fins de profilage.",
    },
    {
      h2: "Services tiers",
      pHtml:
        "Les polices sont intégrées au site et servies depuis la même origine. Nous utilisons Google Analytics (GA4) pour comprendre l'usage global du site, comme les pages vues et les référents ; cela implique un script de googletagmanager.com et les cookies GA standard. Nous n'intégrons pas de réseaux publicitaires ni de traqueurs de réseaux sociaux, et vos saisies de calcul ne sont jamais envoyées à Google ni à quiconque.",
    },
    {
      h2: "Enfants",
      p: "Le site est un outil d'ingénierie destiné à un public technique général. Il ne collecte sciemment aucune donnée personnelle de quiconque, y compris des enfants de moins de 13 ans.",
    },
    {
      h2: "Modifications de cette politique",
      p: "Si nous modifions la façon dont le site traite les données, nous mettrons à jour cette page et réviserons la date ci-dessus. Les modifications importantes seront signalées sur le site.",
    },
    {
      h2: "Contact",
      pHtml:
        "Questions sur cette politique : voir la <a class=\"text-link hover:underline\" href=\"/fr/contact\">page contact</a>.",
    },
  ],
};

const terms: LegalCopy = {
  title: "Conditions d'utilisation | OnlineBeamCalculator.com",
  description:
    "Conditions d'utilisation d'OnlineBeamCalculator.com, l'outil gratuit d'analyse de poutres fonctionnant dans le navigateur.",
  eyebrow: "Mentions légales",
  h1: "Conditions d'utilisation",
  updated: "Dernière mise à jour : 22 août 2026",
  blocks: [
    {
      h2: "Acceptation des conditions",
      p: "En accédant à OnlineBeamCalculator.com ou en l'utilisant, vous acceptez ces conditions. Si vous ne les acceptez pas, merci de ne pas utiliser le site.",
    },
    {
      h2: "Le service",
      p: "OnlineBeamCalculator.com fournit un outil gratuit d'analyse de structures en poutres fonctionnant dans le navigateur. Le service est fourni tel quel et gratuitement, sans compte ni inscription.",
    },
    {
      h2: "Ceci n'est pas un conseil d'ingénierie",
      p: "Les résultats produits par cet outil sont uniquement des aides à l'analyse. Ils ne constituent ni conseil professionnel d'ingénierie, ni certification de conception, ni approbation de construction. Vous êtes responsable de la vérification de tous les résultats vis-à-vis des codes de construction applicables, des règles de l'art et de votre propre jugement professionnel. Les conceptions critiques doivent être revues par un ingénieur structure qualifié et agréé.",
    },
    {
      h2: "Exactitude et limites",
      pHtml:
        "Le solveur utilise la théorie des poutres d'Euler-Bernoulli selon les hypothèses énoncées sur la <a class=\"text-link hover:underline\" href=\"/fr/about\">page à propos</a>. Bien que nous validations les résultats par rapport à des solutions en forme close, nous ne garantissons pas que les résultats soient exempts d'erreurs ou adaptés à un usage particulier.",
    },
    {
      h2: "Usage acceptable",
      items: [
        "Utilisez l'outil pour un travail d'ingénierie personnel, éducatif et commercial licite.",
        "N'essayez pas de perturber, surcharger ou sonder le site ou son infrastructure d'hébergement.",
        "Ne présentez pas les résultats générés par cet outil comme un travail d'ingénierie certifié.",
      ],
    },
    {
      h2: "Propriété intellectuelle",
      p: "Le design, le code et le contenu du site appartiennent à OnlineBeamCalculator.com. Vous conservez l'entière propriété des modèles que vous créez et des résultats que vous générez ; exportez-les et partagez-les comme bon vous semble.",
    },
    {
      h2: "Limitation de responsabilité",
      p: "Dans la mesure maximale permise par la loi, OnlineBeamCalculator.com et ses exploitants n'assument aucune responsabilité pour toute perte directe, indirecte, accessoire ou consécutive résultant de l'utilisation du site ou de la confiance accordée à ses résultats, y compris sans s'y limiter une défaillance structurelle, des dépassements de coûts ou des retards de projet.",
    },
    {
      h2: "Disponibilité",
      p: "Nous pouvons modifier, suspendre ou interrompre tout ou partie du site à tout moment sans préavis. Comme le calculateur fonctionne entièrement côté client, vous pouvez également enregistrer et partager des modèles sous forme de liens, indépendamment de notre exploitation continue.",
    },
    {
      h2: "Droit applicable",
      p: "Ces conditions sont régies par les lois applicables dans la juridiction de l'exploitant, sans égard aux règles de conflit de lois. Si une clause est jugée inapplicable, le reste demeure en vigueur.",
    },
    {
      h2: "Contact",
      pHtml:
        "Questions sur ces conditions : voir la <a class=\"text-link hover:underline\" href=\"/fr/contact\">page contact</a>.",
    },
  ],
};

const calcPresets = {
  "simply-supported-point": {
    name: "Sur appuis simples, charge ponctuelle centrale",
    description: "Appui simple en A, appui mobile en B, charge ponctuelle P à mi-portée.",
  },
  "simply-supported-udl": {
    name: "Sur appuis simples, charge uniforme",
    description: "Appui simple en A, appui mobile en B, charge uniformément répartie w sur toute la portée.",
  },
  "cantilever-tip-load": {
    name: "Console, charge ponctuelle en extrémité",
    description: "Encastrée en A, charge ponctuelle P à l'extrémité libre.",
  },
  "cantilever-udl": {
    name: "Console, charge uniforme",
    description: "Encastrée en A, charge uniformément répartie w sur toute la longueur.",
  },
  "fixed-fixed-udl": {
    name: "Bi-encastrée, charge uniforme",
    description: "Les deux extrémités encastrées, charge uniformément répartie w sur toute la portée.",
  },
  "overhanging-beam": {
    name: "Poutre en porte-à-faux, charge uniforme",
    description: "Appuis près des extrémités, charge uniforme w sur toute la longueur avec porte-à-faux.",
  },
  "continuous-two-span": {
    name: "Continue, deux travées égales, charge uniforme",
    description: "Appuis simples en A, B, C ; charge uniformément répartie w sur les deux travées.",
  },
  "gerber-hinge": {
    name: "Poutre de Gerber avec rotule interne",
    description: "Deux travées avec rotule interne libérant le moment à la jonction.",
  },
} as Record<PresetSlug, { name: string; description: string }>;

const calcVariants = {
  "steel-beam-calculator": {
    title: "Calculateur de poutres acier",
    h1: "Calculateur de poutres acier",
    description:
      "Analysez des poutres acier avec profilés W AISC. Acier structurel prédéfini (A36, E = 200 GPa, fy = 250 MPa) et bibliothèque de profilés W courants avec aire et moment d'inertie réels.",
    intro:
      "Choisissez un profilé W, définissez portée et charges, et lisez instantanément les réactions, les diagrammes d'effort tranchant et de moment, les courbes de flèche et les vérifications de contraintes. Activez le poids propre, basculez entre unités métriques et impériales, exportez en CSV ou imprimez un rapport.",
  },
  "wood-beam-calculator": {
    title: "Calculateur de poutres bois",
    h1: "Calculateur de poutres bois",
    description:
      "Analysez des poutres bois avec sections rectangulaires et propriétés de matériau réalistes. Bois prédéfini (E = 11 GPa, masse volumique 500 kg/m³) ou valeurs personnalisées pour le lamellé-collé, le LVL ou le bois de sciage.",
    intro:
      "Saisissez hauteur et largeur de poutre, définissez portées et charges (ponctuelles, uniformes, trapézoïdales) et obtenez réactions, diagrammes, flèche et vérifications de service vis-à-vis de L/360 et L/240.",
  },
  "ridge-beam-calculator": {
    title: "Calculateur de panne faîtière",
    h1: "Calculateur de panne faîtière",
    description:
      "Dimensionnez une panne faîtière portrice pour une charpente de toit. Modélisez le faîtier comme une poutre sur appuis simples ou en porte-à-faux avec charges ponctuelles de chevrons à intervalles réguliers.",
    intro:
      "Définissez la portée, l'entraxe des chevrons et les charges de toit (permanente + exploitation + neige). Le calculateur convertit les réactions des chevrons en charges ponctuelles sur le faîtier et fournit réactions, moment maximal, flèche et contrainte.",
  },
  "cantilever-beam-calculator": {
    title: "Calculateur de poutre en console",
    h1: "Calculateur de poutre en console",
    description:
      "Analysez des poutres en console avec charges en extrémité, moments appliqués, charges uniformes et triangulaires, appuis élastiques et poids propre.",
    intro:
      "Encastrée à une extrémité, libre à l'autre. Ajoutez toute combinaison de charges, choisissez une section et lisez la réaction d'encastrement, le moment d'encastrement, la flèche d'extrémité et la contrainte. Comparez aux formules en forme close sur la page des formules.",
  },
  "simply-supported-beam-calculator": {
    title: "Calculateur de poutre sur appuis simples",
    h1: "Calculateur de poutre sur appuis simples",
    description:
      "Analysez des poutres sur appuis simples avec toute combinaison de charges ponctuelles, moments, charges uniformes et trapézoïdales, appuis élastiques et poids propre.",
    intro:
      "Appui simple à une extrémité, appui mobile à l'autre. Placez des charges n'importe où sur la portée, choisissez matériau et section, et obtenez réactions, diagrammes V et M, flèche et contrainte. Idéal pour solives, poutres de plancher et pannes.",
  },
  "simple-beam-calculator": {
    title: "Calculateur de poutre simple",
    h1: "Calculateur de poutre simple",
    description:
      "Un calculateur de poutre sur appuis simples simplifié avec des entrées minimales : portée, charge et section. Pour des vérifications rapides quand vous n'avez pas besoin de toutes les options.",
    intro:
      "Saisissez la portée, une charge unique uniforme ou ponctuelle, et une section rectangulaire ou en I. Réactions, M_max, δ_max et contrainte instantanés. Parfait pour les exercices de cours et le prédimensionnement.",
  },
} as Record<VariantSlug, { title: string; h1: string; description: string; intro: string }>;

const deepDive = {
  "steel-beam-calculator": [
    {
      heading: "Comment utiliser ce calculateur de poutres acier",
      paragraphs: [
        "Commencez avec la poutre sur appuis simples préchargée, puis définissez votre portée réelle entre appuis. Remplacez la charge uniforme par votre charge linéique en kN/m (multipliez la charge surfacique de plancher ou de toit en kN/m² par la largeur tributaire), ou remplacez-la par des charges ponctuelles aux positions exactes où d'autres poutres ou poteaux s'appuient sur celle-ci.",
        "Ouvrez la bibliothèque de sections et choisissez un profilé W dans la liste AISC : les profilés W4 à W24 portent leur aire et leur moment d'inertie réels, de sorte que les résultats de flèche et de contrainte de flexion correspondent aux propriétés publiées de l'acier. Le préréglage de matériau utilise un acier structurel avec E = 200 GPa et fy = 250 MPa ; passez à un module personnalisé uniquement si vous travaillez avec un alliage différent.",
      ],
    },
    {
      heading: "Lecture des résultats pour une vérification acier",
      paragraphs: [
        "Pour une vérification rapide de résistance, comparez la contrainte de flexion maximale rapportée à la limite d'élasticité divisée par votre coefficient de sécurité ; une approche classique en contrainte admissible maintient la contrainte de travail sous environ 0,6 × fy. Pour le service, surveillez les badges de flèche : L/360 protège les finitions fragiles sur les planchers, et L/240 est la limite courante pour les toits.",
        "Si la poutre ne satisfait pas le service mais passe la résistance, choisissez un profilé W plus profond : la flèche évolue en 1/I, et les sections profondes gagnent du moment d'inertie bien plus vite que du poids. Exportez le CSV ou imprimez le rapport pour joindre une trace du cas de charge à votre dossier de calcul.",
      ],
    },
    {
      heading: "Erreurs courantes en acier que cet outil aide à détecter",
      paragraphs: [
        "Oublier le poids propre est l'erreur classique ; activez le poids propre et la masse de la section devient automatiquement une charge répartie. Une autre consiste à sous-estimer la largeur tributaire, qui compte plus que la charge surfacique elle-même. Et lorsqu'une poutre acier repose sur trois poteaux ou plus, elle doit être modélisée comme continue plutôt que comme une série de travées sur appuis simples : le moment négatif sur l'appui intermédiaire change le dimensionnement.",
      ],
    },
  ],
  "wood-beam-calculator": [
    {
      heading: "Comment utiliser ce calculateur de poutres bois",
      paragraphs: [
        "Commencez avec la poutre sur appuis simples préchargée et saisissez votre portée réelle. Remplacez la charge uniforme par la charge linéique appliquée par votre plancher ou votre toit : multipliez la charge surfacique en psf (ou kN/m²) par l'entraxe des solives ou chevrons pour obtenir des plf (ou kN/m). Pour les pannes faîtrières, saisissez les réactions des chevrons comme charges ponctuelles au bon entraxe.",
        "Le préréglage de matériau utilise un bois avec E = 11 GPa, masse volumique 500 kg/m³ et fy = 28 MPa ; passez à un module personnalisé pour le lamellé-collé (généralement 12–14 GPa), le LVL (13–14 GPa) ou une essence particulière. Les sections rectangulaires se saisissent par hauteur et largeur ; le calculateur en déduit automatiquement l'aire et I.",
      ],
    },
    {
      heading: "Lecture des résultats pour une vérification bois",
      paragraphs: [
        "Pour une vérification rapide, comparez la contrainte de flexion maximale rapportée à la contrainte de flexion admissible F_b de votre classement de bois ou de la norme NDS. Pour le service, le badge L/360 garantit des planchers suffisamment rigides pour le carrelage ou le plâtre, et L/240 est la limite courante pour les toits. La flèche est souvent le critère dimensionnant pour le bois, pas la contrainte de flexion.",
        "Si la poutre ne satisfait pas le service, augmentez la hauteur : la flèche évolue en 1/d³ (puisque I = bd³/12), donc doubler la hauteur divise la flèche par 8 pour seulement 2× de matière. Le rapport imprimé inclut les propriétés de section pour votre dossier de calcul.",
      ],
    },
    {
      heading: "Erreurs courantes en bois que cet outil aide à détecter",
      paragraphs: [
        "Utiliser les dimensions nominales plutôt que réelles du bois de sciage (un 2×12 fait 1,5″ × 11,25″) surestime nettement la capacité. Oublier de modéliser le faîtier en porte-à-faux lorsqu'il dépasse le mur sous-estime le moment d'extrémité. Et modéliser un faîtier multi-appuis comme une suite de travées sur appuis simples oublie le moment négatif sur les poteaux intermédiaires : utilisez plutôt le calculateur de poutre continue.",
      ],
    },
  ],
  "ridge-beam-calculator": [
    {
      heading: "Comment utiliser ce calculateur de panne faîtière",
      paragraphs: [
        "Modélisez le faîtier sur appuis simples (s'il repose sur des murs aux deux extrémités) ou en porte-à-faux (s'il dépasse un pignon). Saisissez l'entraxe des chevrons, la portée du toit et la charge de calcul totale (permanente + exploitation + neige) en psf ou kPa. Le calculateur la convertit en charges ponctuelles à chaque position de chevron : charge par chevron = charge surfacique × entraxe × portée / 2.",
        "Choisissez une section bois (rectangulaire) ou saisissez un I et une aire personnalisés. Le matériau prédéfini est un bois à E = 11 GPa ; passez au lamellé-collé ou au LVL en saisissant le module du fabricant. Le poids propre ajoute automatiquement le poids du faîtier comme petite charge uniforme.",
      ],
    },
    {
      heading: "Lecture des résultats pour une panne faîtière",
      paragraphs: [
        "Le tableau de bord affiche le moment maximal (généralement à mi-portée pour un faîtier sur appuis simples, ou sur l'appui intermédiaire pour un faîtier en porte-à-faux) et la flèche maximale. Comparez la contrainte de flexion à F_b de la norme NDS ou aux valeurs de calcul du produit. Vérifiez la flèche vis-à-vis de L/240 pour les toits ; L/360 si le faîtier porte un plafond fini en dessous.",
        "Si le faîtier est continu sur trois appuis ou plus, passez au calculateur de poutre continue à deux travées et ajoutez des appuis si besoin : le moment négatif sur l'appui intermédiaire est généralement le critère dimensionnant.",
      ],
    },
    {
      heading: "Erreurs courantes sur les pannes faîtrières que cet outil aide à détecter",
      paragraphs: [
        "Appliquer la charge totale de toit comme charge uniforme au lieu de charges ponctuelles à l'entraxe des chevrons surestime le moment (une charge uniforme sur une poutre sur appuis simples donne wL²/8, mais des charges ponctuelles discrètes produisent un moment à mi-portée plus faible à charge totale égale). Oublier les cas de congères ou de charge déséquilibrée lorsque le faîtier couvre des surfaces de toit différentes. Et utiliser un modèle sur appuis simples alors que le faîtier est en réalité continu sur des poteaux intermédiaires.",
      ],
    },
  ],
  "cantilever-beam-calculator": [
    {
      heading: "Comment utiliser ce calculateur de poutre en console",
      paragraphs: [
        "Le préréglage est une console encastrée à gauche. Définissez la longueur, puis ajoutez des charges : charge ponctuelle en extrémité, moment en extrémité, charge uniforme, charge triangulaire ou toute combinaison. Faites glisser les charges pour les repositionner. La bibliothèque de sections inclut rectangles, sections creuses et profilés en I ; les matériaux incluent acier, aluminium, béton et bois.",
        "Le poids propre ajoute le poids de la poutre comme charge uniforme calculée à partir de l'aire de section et de la masse volumique. Des appuis élastiques peuvent être ajoutés le long de la longueur pour modéliser des fondations élastiques ou un encastrement partiel.",
      ],
    },
    {
      heading: "Lecture des résultats pour une console",
      paragraphs: [
        "La force de réaction d'encastrement et le moment d'encastrement sont exactement ce que le corbeau, la soudure ou le scellement doit reprendre. La flèche d'extrémité vis-à-vis de L/180 est la vérification de service courante ; notez qu'à charge totale égale, une charge en extrémité provoque 8/3 fois plus de flèche qu'une charge uniforme, donc convertir une charge étalée en une valeur unique en extrémité est conservateur avec une large marge, mais utile comme borne.",
        "La contrainte de flexion est rapportée à l'encastrement (maximale) et à chaque point de charge. La contrainte de cisaillement moyenne vaut V/A à l'encastrement ; pour les profilés en I, le cisaillement d'âme est supérieur : utilisez un outil réglementaire pour les vérifications d'âme détaillées.",
      ],
    },
    {
      heading: "Erreurs courantes sur les consoles que cet outil aide à détecter",
      paragraphs: [
        "Modéliser une charge réellement répartie comme charge en extrémité « pour être prudent » est défendable comme borne, mais peut masquer où se situe réellement la contrainte maximale lorsque la charge s'étale en réalité sur la poutre. L'inverse est le cas dangereux : modéliser une charge concentrée comme une charge uniforme équivalente divise par deux le moment d'encastrement apparent et n'est pas conservateur. Deuxième erreur : appliquer la formule de flèche d'extrémité à une charge qui n'est pas à l'extrémité ; la forme close change, et faire glisser la charge dans le calculateur affiche instantanément la valeur corrigée.",
      ],
    },
  ],
  "simply-supported-beam-calculator": [
    {
      heading: "Comment utiliser ce calculateur de poutre sur appuis simples",
      paragraphs: [
        "Le préréglage est un appui simple en A, un appui mobile en B. Définissez la portée, puis ajoutez toute combinaison de charges ponctuelles, moments appliqués, charges uniformes, triangulaires et trapézoïdales à n'importe quelle position. Des appuis élastiques peuvent être placés n'importe où, y compris sur les porte-à-faux, pour modéliser des appuis souples.",
        "Les préréglages de matériaux et de sections couvrent acier, aluminium, béton et bois ; saisissez des A et I personnalisés pour les sections non standards. Le poids propre ajoute le poids de la poutre comme charge uniforme automatiquement.",
      ],
    },
    {
      heading: "Lecture des résultats pour une poutre sur appuis simples",
      paragraphs: [
        "Les réactions en A et B sont les charges d'appui pour le dimensionnement de vos liaisons. Le moment maximal (avec sa position) pilote la vérification du module de flexion : σ = M·c/I. La flèche maximale (avec sa position) pilote la vérification de service vis-à-vis de L/360 ou L/240. Les diagrammes sont exacts par morceaux : survolez-les pour lire V et M en tout point.",
        "Pour une poutre avec porte-à-faux, le moment positif maximal peut être en travée et le moment négatif maximal à l'appui ; les deux sont rapportés. Exportez le CSV pour les tables complètes V/M/θ/δ si vous devez les injecter dans un tableur.",
      ],
    },
    {
      heading: "Erreurs courantes sur appuis simples que cet outil aide à détecter",
      paragraphs: [
        "Oublier qu'une poutre en porte-à-faux chargée sur son porte-à-faux développe un moment négatif à l'appui, qui peut exiger un maintien latéral de l'aile supérieure ou une section plus grande. Sous-estimer l'aire tributaire lors de la conversion de charges surfaciques en charges linéiques. Et supposer qu'une poutre multi-travées peut être analysée comme des travées indépendantes sur appuis simples : les moments sur appuis intermédiaires ne sont pas nuls, et le calculateur de poutre continue doit être utilisé.",
      ],
    },
  ],
  "simple-beam-calculator": [
    {
      heading: "Comment utiliser ce calculateur de poutre simple",
      paragraphs: [
        "C'est le cas minimal sur appuis simples : une travée, une charge (uniforme ou ponctuelle centrale), une section rectangulaire ou en I. Saisissez la portée, la charge et les dimensions de section (ou choisissez un profilé I). Pas de positionnement d'appuis, pas d'appuis élastiques, pas d'option de poids propre : juste le cas du manuel.",
      ],
    },
    {
      heading: "Quand cet outil est le bon (et quand il ne l'est pas)",
      paragraphs: [
        "Utilisez-le pour un prédimensionnement rapide : « quelle hauteur de profilé W me faut-il pour une portée de 20 pi avec 2 klf de charge uniforme ? » Comparez les M_max et δ_max rapportés à la contrainte admissible et à L/360. Pour tout cas plus complexe (charges multiples, porte-à-faux, appuis élastiques, travées continues, consoles, rotules internes), utilisez le calculateur complet sur /fr/calculator.",
      ],
    },
    {
      heading: "Limites",
      paragraphs: [
        "Pas de poids propre, pas de porte-à-faux, pas d'appuis élastiques, pas de rotules internes, pas de travées continues. Les résultats sont les réponses exactes en forme close du cas à charge unique, identiques à celles du solveur complet lorsqu'une seule charge est présente. Pour tout le reste, le calculateur complet est l'outil approprié.",
      ],
    },
  ],
  "simply-supported-point": [
    {
      heading: "Comment analyser une poutre sur appuis simples avec charge ponctuelle centrale",
      paragraphs: [
        "Cette page précharge un modèle configuré dans le calculateur de poutres. Modifiez positions et intensités directement, ou faites glisser les éléments sur le diagramme. Les résultats se mettent à jour instantanément dans votre navigateur.",
        "Le cas classique des manuels : réactions R = P/2 à chaque appui, moment maximal M = PL/4 à mi-portée, flèche maximale δ = PL³/(48EI) à mi-portée. L'effort tranchant est constant à P/2 entre l'appui et la charge, puis saute à −P/2.",
      ],
    },
    {
      heading: "Points de vigilance avec les charges ponctuelles centrales",
      paragraphs: [
        "Les charges réelles sont rarement exactement à mi-portée. Déplacez la charge hors du centre et observez les réactions se décaler (R_A = P·b/L, R_B = P·a/L) et le moment maximal suivre la charge (M_max = P·a·b/L). La courbe de flèche devient asymétrique : le maximum n'est plus à mi-portée.",
        "Si vous avez plusieurs charges ponctuelles, la superposition s'applique : additionnez les moments et les flèches de chaque charge. Le calculateur le fait automatiquement lorsque vous ajoutez plusieurs charges, pas besoin de faire le calcul à la main.",
      ],
    },
    {
      heading: "Calculateurs associés",
      paragraphs: [
        "Comparez avec le cas de la <a class=\"text-link hover:underline\" href=\"/fr/calculator/simply-supported-udl\">charge uniforme sur appuis simples</a> (wL²/8 contre PL/4 à charge totale égale : une charge ponctuelle centrale donne 2× le moment d'une charge uniforme de même total). Pour les poutres acier, commencez par le <a class=\"text-link hover:underline\" href=\"/fr/calculator/steel-beam-calculator\">calculateur de poutres acier</a> et choisissez un profilé W dans la bibliothèque.",
      ],
    },
  ],
  "simply-supported-udl": [
    {
      heading: "Comment analyser une poutre sur appuis simples avec charge uniforme",
      paragraphs: [
        "Cette page précharge une poutre sur appuis simples avec une charge uniformément répartie sur toute la portée. Modifiez la portée, l'intensité de charge ou la section directement dans le calculateur. Les résultats se mettent à jour instantanément.",
        "Valeurs du manuel : réactions R = wL/2, M_max = wL²/8 à mi-portée, δ_max = 5wL⁴/(384EI) à mi-portée. Le diagramme d'effort tranchant est linéaire de +wL/2 à −wL/2 ; le diagramme de moment est parabolique.",
      ],
    },
    {
      heading: "Points de vigilance avec les charges uniformes",
      paragraphs: [
        "Une charge uniforme partielle (ne couvrant pas toute la portée) produit des réactions différentes et un diagramme de moment par morceaux au sommet plus plat. Faites glisser les extrémités de charge pour modéliser une couverture partielle : le calculateur la traite exactement. Pour une poutre de toit, la charge uniforme est généralement la charge surfacique tributaire × l'entraxe ; veillez à ne pas compter deux fois le poids propre (activez-le séparément).",
        "Comparez avec le cas de la <a class=\"text-link hover:underline\" href=\"/fr/calculator/simply-supported-point\">charge ponctuelle centrale</a> : à charge totale égale (wL = P), la charge uniforme donne la moitié du moment à mi-portée et 5/8 de la flèche à mi-portée. Une charge uniforme est toujours moins exigeante qu'une charge ponctuelle centrale à charge totale égale.",
      ],
    },
    {
      heading: "Calculateurs associés",
      paragraphs: [
        "Pour une poutre avec charges à la fois ponctuelles et réparties, utilisez le <a class=\"text-link hover:underline\" href=\"/fr/calculator/simply-supported-beam-calculator\">calculateur de poutre sur appuis simples</a> complet. Pour les travées continues, le cas de la <a class=\"text-link hover:underline\" href=\"/fr/calculator/continuous-two-span\">poutre continue à deux travées</a> montre comment le moment sur l'appui intermédiaire change le dimensionnement.",
      ],
    },
  ],
  "cantilever-udl": [
    {
      heading: "Comment analyser une console avec charge uniforme",
      paragraphs: [
        "Cette page précharge une console encastrée à gauche avec une charge uniformément répartie sur toute la longueur. Modifiez longueur, charge, section ou matériau directement. Les résultats se mettent à jour instantanément.",
        "Valeurs du manuel : réaction d'encastrement R = wL, moment d'encastrement M = wL²/2, flèche d'extrémité δ = wL⁴/(8EI). L'effort tranchant est constant à wL ; le diagramme de moment est parabolique, de 0 à l'extrémité à wL²/2 à l'encastrement.",
      ],
    },
    {
      heading: "Points de vigilance avec les charges uniformes en console",
      paragraphs: [
        "Une console avec la même charge totale qu'une charge en extrémité (wL = P) produit la moitié du moment d'encastrement (wL²/2 contre PL) et 3/8 de la flèche d'extrémité (wL⁴/8EI contre PL³/3EI = wL⁴/3EI). Une charge en extrémité est donc une borne bien plus conservatrice qu'une charge uniforme à charge totale égale.",
        "Si la charge est triangulaire (0 à l'extrémité, w à l'encastrement), le moment d'encastrement descend à wL²/6 et la flèche d'extrémité à wL⁴/30EI : le cas triangulaire est moins exigeant que les deux. Le calculateur permet de faire glisser la forme de charge pour voir la transition.",
      ],
    },
    {
      heading: "Calculateurs associés",
      paragraphs: [
        "Comparez avec le cas de la <a class=\"text-link hover:underline\" href=\"/fr/calculator/cantilever-tip-load\">console avec charge en extrémité</a>. Pour une console avec charges multiples ou un appui élastique, utilisez le <a class=\"text-link hover:underline\" href=\"/fr/calculator/cantilever-beam-calculator\">calculateur de poutre en console</a> complet.",
      ],
    },
  ],
  "cantilever-tip-load": [
    {
      heading: "Comment analyser une console avec charge ponctuelle en extrémité",
      paragraphs: [
        "Cette page précharge une console encastrée à gauche avec une charge ponctuelle à l'extrémité libre. Modifiez la longueur, l'intensité de charge, la section ou le matériau directement dans le calculateur. Les résultats se mettent à jour instantanément.",
        "Valeurs du manuel : réaction d'encastrement R = P, moment d'encastrement M = PL, flèche d'extrémité δ = PL³/(3EI). L'effort tranchant est constant à P sur toute la longueur ; le diagramme de moment est linéaire, de 0 à l'extrémité à PL à l'encastrement.",
      ],
    },
    {
      heading: "Points de vigilance avec les charges en extrémité",
      paragraphs: [
        "Les chiffres à lire sont la force de réaction d'encastrement et le moment d'encastrement : ensemble, ils sont exactement ce que le corbeau, la soudure ou le scellement doit reprendre. La flèche d'extrémité vis-à-vis de L/180 est la vérification de service ; notez qu'à charge totale égale, une charge en extrémité provoque 8/3 fois plus de flèche qu'une charge uniforme, donc convertir une charge étalée en une valeur unique en extrémité est conservateur avec une large marge, mais utile comme borne.",
        "Faites glisser la charge vers l'intérieur de la poutre : le moment d'encastrement et la flèche d'extrémité chutent respectivement linéairement et au cube ; une charge aux trois quarts de la longueur divise déjà par deux la demande de moment d'encastrement. Cette sensibilité vaut la peine d'être exploitée lorsque vous pouvez positionner une charge de corbeau près de son appui.",
      ],
    },
    {
      heading: "Erreurs courantes avec ce cas",
      paragraphs: [
        "Modéliser une charge réellement répartie comme charge en extrémité « pour être prudent » est défendable comme borne, mais peut masquer où se situe réellement la contrainte maximale lorsque la charge s'étale sur la poutre. L'inverse est le cas dangereux : modéliser une charge concentrée comme une charge uniforme équivalente divise par deux le moment d'encastrement apparent et n'est pas conservateur. Deuxième erreur : appliquer la formule de flèche d'extrémité à une charge qui n'est pas à l'extrémité ; la forme close change, et faire glisser la charge dans le calculateur affiche instantanément la valeur corrigée.",
      ],
    },
  ],
  "fixed-fixed-udl": [
    {
      heading: "Comment analyser une poutre bi-encastrée avec charge uniforme",
      paragraphs: [
        "Cette page précharge une poutre encastrée aux deux extrémités avec une charge uniformément répartie sur toute la portée. Modifiez la portée, la charge, la section ou le matériau directement. Les résultats se mettent à jour instantanément.",
        "Valeurs du manuel : réactions R = wL/2 à chaque extrémité, moments d'encastrement M = wL²/12 (négatifs), moment à mi-portée M = wL²/24 (positif), flèche à mi-portée δ = wL⁴/(384EI). Le diagramme de moment est parabolique, négatif sur les appuis et positif à mi-portée.",
      ],
    },
    {
      heading: "Points de vigilance avec les poutres bi-encastrées",
      paragraphs: [
        "Les moments sur appuis (wL²/12) sont plus grands en valeur absolue que le moment à mi-portée (wL²/24). Le dimensionnement est généralement gouverné par le moment négatif aux appuis : l'aile supérieure y est comprimée, le maintien au déversement de l'aile supérieure est donc critique.",
        "Si l'encastrement n'est pas parfait (les liaisons réelles ont une certaine souplesse), les moments réels se situent entre les cas bi-encastré et sur appuis simples. Le calculateur complet permet de modéliser des appuis rotatifs élastiques pour l'étudier.",
      ],
    },
    {
      heading: "Calculateurs associés",
      paragraphs: [
        "Comparez avec la <a class=\"text-link hover:underline\" href=\"/fr/calculator/simply-supported-udl\">charge uniforme sur appuis simples</a> (pas de moments d'encastrement, 5× la flèche à mi-portée). Pour une poutre bi-encastrée avec charge ponctuelle centrale, le calculateur complet sait la modéliser : ajoutez une charge ponctuelle à mi-portée et des encastrements aux deux extrémités.",
      ],
    },
  ],
  "overhanging-beam": [
    {
      heading: "Comment analyser une poutre en porte-à-faux avec charge uniforme",
      paragraphs: [
        "Cette page précharge une poutre en porte-à-faux symétrique : appuis à distance a de chaque extrémité, charge uniforme w sur toute la longueur L. Modifiez a, L, w, la section ou le matériau directement. Les résultats se mettent à jour instantanément.",
        "Les réactions sont symétriques : R = wL/2 à chaque appui. Le moment aux appuis vaut M = −w·a²/2 (négatif). Le moment positif maximal en travée dépend de a/L ; pour de petits porte-à-faux il est près de mi-portée, pour de grands porte-à-faux il se rapproche des appuis.",
      ],
    },
    {
      heading: "Points de vigilance avec les poutres en porte-à-faux",
      paragraphs: [
        "Le moment d'appui dimensionne les petits porte-à-faux (c'est le moment de liaison ou d'ancrage). Pour de grands porte-à-faux, le moment en travée peut dépasser le moment d'appui. Le calculateur fournit les deux pour vérifier les deux emplacements.",
        "Les porte-à-faux asymétriques (a différent de chaque côté) produisent réactions et moments asymétriques : le calculateur complet le gère : ajoutez des appuis à des positions arbitraires et une charge uniforme sur toute la longueur.",
      ],
    },
    {
      heading: "Calculateurs associés",
      paragraphs: [
        "Pour un porte-à-faux non symétrique ou des charges multiples, utilisez le <a class=\"text-link hover:underline\" href=\"/fr/calculator/overhanging-beam\">calculateur de poutre en porte-à-faux</a> complet (la page du cas). Le cas de la <a class=\"text-link hover:underline\" href=\"/fr/calculator/continuous-two-span\">poutre continue à deux travées</a> est l'extension naturelle lorsque le porte-à-faux est appuyé à son extrémité, formant une poutre continue à trois travées.",
      ],
    },
  ],
  "continuous-two-span": [
    {
      heading: "Comment analyser une poutre continue à deux travées égales",
      paragraphs: [
        "Cette page précharge une poutre continue à deux travées : appuis simples en A, B, C ; chaque travée de longueur L ; charge uniforme w sur les deux travées. Modifiez L, w, la section ou le matériau directement. Les résultats se mettent à jour instantanément.",
        "Valeurs du manuel : réactions R_A = R_C = 3wL/8, R_B = 10wL/8 ; moment négatif sur B : M = wL²/8 ; moment positif maximal par travée : M = 9wL²/128 à x = 5L/8 de l'appui de rive ; flèche ≈ 0,0054 wL⁴/EI par travée.",
      ],
    },
    {
      heading: "Points de vigilance avec les poutres continues",
      paragraphs: [
        "L'appui intermédiaire B reprend 1,25× la charge totale d'une travée (10/8 contre 8/8 pour un appui simple), et le moment négatif sur B (wL²/8) est plus grand en valeur absolue que le moment à mi-portée d'une poutre sur appuis simples (wL²/8 contre wL²/8, égaux ici, mais pour des travées inégales le moment intermédiaire domine).",
        "Le moment positif à mi-travée (9wL²/128 ≈ 0,07 wL²) est plus faible que le moment à mi-portée sur appuis simples (wL²/8 = 0,125 wL²) car la continuité freine la flèche. C'est pourquoi les poutres continues sont plus économes : moment en travée réduit à portée égale.",
      ],
    },
    {
      heading: "Erreurs courantes avec les poutres continues",
      paragraphs: [
        "Analyser une poutre continue comme une suite de travées sur appuis simples oublie le moment négatif sur l'appui intermédiaire : la liaison et le maintien de l'aile supérieure y sont critiques. Supposer que la réaction d'appui intermédiaire vaut seulement wL (c'est 1,25 wL ici, et davantage avec des travées inégales). Oublier que le tassement d'un appui intermédiaire redistribue fortement les moments : le calculateur prend en charge le tassement imposé pour l'étudier.",
      ],
    },
  ],
  "gerber-hinge": [
    {
      heading: "Comment analyser une poutre de Gerber avec rotule interne",
      paragraphs: [
        "Cette page précharge une poutre à deux travées avec rotule interne à la jonction (libération de moment). La travée gauche est encastrée en A et articulée en B ; la travée droite est articulée en B et sur appui mobile en C. Charge uniforme w sur les deux travées. Modifiez travées, charge, section ou matériau directement.",
        "La rotule impose M = 0 en B. La travée gauche est une console encastrée-appuyée : la réaction en B vaut 3wL/8, le moment en A vaut wL²/8. La travée droite est une poutre sur appuis simples : la réaction en C vaut 5wL/8. La rotule transmet l'effort tranchant mais pas le moment.",
      ],
    },
    {
      heading: "Pourquoi utiliser une poutre de Gerber",
      paragraphs: [
        "Une poutre de Gerber transforme une poutre continue hyperstatique en un système isostatique en insérant une rotule. Cela simplifie la construction (pas de liaison de moment à la rotule) et élimine la redistribution de moments due au tassement des appuis. La contrepartie : l'extrémité encastrée de la travée gauche attire toujours un moment important, et le détail de la rotule doit transmettre l'effort tranchant de façon fiable.",
        "La position de la rotule est généralement choisie pour équilibrer le moment positif maximal de chaque travée (ici à mi-portée de la travée droite et à x ≈ 0,578L de la travée gauche). Le calculateur permet de déplacer la rotule pour trouver la position optimale.",
      ],
    },
    {
      heading: "Erreurs courantes avec les poutres de Gerber",
      paragraphs: [
        "Oublier que la rotule doit être une vraie libération de moment : une liaison partielle qui transmet un peu de moment annule l'intérêt du système et crée une structure hyperstatique qui se comporte autrement. Ne pas vérifier la capacité au cisaillement à la rotule : elle reprend tout l'effort tranchant de la travée. Et supposer que les travées peuvent être dimensionnées indépendamment : l'effort tranchant à la rotule est le même des deux côtés, la liaison doit donc être dimensionnée pour le plus grand des deux cisaillements de travée.",
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
    eyebrowVariant: "Calculateurs par type de poutre",
    eyebrowPreset: "Exemples travaillés",
    preloadedNote:
      "Le calculateur ci-dessous est préchargé ; modifiez n'importe quoi et les résultats se mettent à jour instantanément.",
    breadcrumbHome: "Accueil",
    breadcrumbCalculators: "Calculateurs",
    aboutThisCaseH2: "À propos de ce cas",
    eulerNote:
      "Tous les diagrammes utilisent la théorie des poutres d'Euler–Bernoulli avec un solveur exact en éléments finis qui s'exécute entièrement dans votre navigateur. Vous pouvez déplacer les appuis en les faisant glisser, changer de système d'unités en haut du panneau de saisie et exporter les résultats en CSV ou sous forme de rapport imprimable.",
    formulasLinkText: "Voir les formules en forme close pour ce cas et des cas similaires →",
    relatedH2: "Calculateurs associés",
    relatedOutro:
      "Nouveau sur les diagrammes d'effort tranchant et de moment ? Commencez par le <a class=\"text-link hover:underline\" href=\"/fr/guide\"> guide V et M</a>, ou lisez <a class=\"text-link hover:underline\" href=\"/fr/about\">comment fonctionne ce calculateur</a>.",
    presetTitleSuffix: " | Calculateur de poutres gratuit",
    presetDescSuffix:
      " Calculateur de poutres en ligne gratuit avec diagrammes instantanés V, M, pente et flèche.",
    faqQuestionVariant: (h1: string) => `Comment utiliser le ${h1.toLowerCase()} ?`,
    faqQuestionPreset: (name: string) => `Comment analyser une poutre ${name.toLowerCase()} ?`,
    faqAnswer:
      "Cette page précharge un modèle configuré dans le calculateur de poutres. Modifiez positions et intensités directement, ou faites glisser les éléments sur le diagramme. Les résultats se mettent à jour instantanément dans votre navigateur.",
  },
};

export const fr: LocaleCopy = {
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
