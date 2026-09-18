/**
 * Spanish copy module — full translation using natural structural-engineering
 * terminology (viga, momento flector, esfuerzo cortante, etc.).
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
  defaultTitle: 'Calculadora de vigas — Diagramas de esfuerzo cortante, momento flector y deflexión gratis',
  defaultDescription:
    'Calculadora de vigas online y gratuita para vigas simplemente apoyadas, en voladizo, empotradas, con voladizo y continuas. Diagramas instantáneos de esfuerzo cortante, momento flector y deflexión. Sin registro.',
  defaultKeywords: [
    'calculadora de vigas',
    'calculadora de vigas online',
    'calculadora de vigas gratis',
    'cálculo de vigas',
    'calculadora de vigas de acero',
    'calculadora de vigas de madera',
    'calculadora de viga en voladizo',
    'calculadora de viga simplemente apoyada',
    'calculadora de viga cumbrera',
    'momento flector',
    'esfuerzo cortante',
  ],
  ogImageAlt: 'Calculadora de vigas online: diagramas de esfuerzo cortante, momento flector y deflexión gratuitos',
};

const chrome: ChromeCopy = {
  nav: {
    calculator: 'Calculadora',
    formulas: 'Fórmulas',
    guide: 'Guía',
    faq: 'FAQ',
    about: 'Acerca de',
    openCalculator: 'Abrir calculadora',
    freeBadge: '100% GRATIS',
    toggleTheme: 'Cambiar modo oscuro',
    languageLabel: 'Idioma',
  },
  noscript:
    'La calculadora de vigas necesita JavaScript porque todo el análisis se ejecuta en tu navegador. Por favor, activa JavaScript y recarga la página.',
  footer: {
    calculatorsHead: 'Calculadoras',
    materialsHead: 'Materiales',
    learnHead: 'Aprender',
    resourcesHead: 'Recursos',
    brandHead: 'OnlineBeamCalculator.com',
    tagline: 'Análisis estructural de vigas gratuito en tu navegador. Sin cuenta, sin límites, sin instalación.',
    runsClientSide: 'Se ejecuta 100% en el navegador',
    linkBeamCalculator: 'Calculadora de vigas',
    linkSimplySupported: 'Vigas simplemente apoyadas',
    linkCantilever: 'Vigas en voladizo',
    linkContinuous: 'Vigas continuas',
    linkSteel: 'Vigas de acero',
    linkWood: 'Vigas de madera',
    linkRidge: 'Vigas cumbrera',
    linkOverhanging: 'Vigas con voladizo',
    linkFormulas: 'Fórmulas de vigas',
    linkSfdBmd: 'Lectura de DEC y DMF',
    linkSignConventions: 'Convenciones de signos',
    linkFixedFixed: 'Viga biempotrada',
    linkAbout: 'Acerca de',
    linkContactUs: 'Contacto',
    linkPrivacyPolicy: 'Política de privacidad',
    linkTerms: 'Términos y condiciones',
    bottomPrivacy: 'Privacidad',
    bottomTerms: 'Términos',
    bottomContact: 'Contacto',
  },
};

const home: HomeCopy = {
  title: 'Calculadora de vigas — Esfuerzo cortante, momento flector y deflexión gratis',
  description:
    'Calculadora de vigas gratuita: analiza vigas simplemente apoyadas, en voladizo y continuas online. Diagramas instantáneos de esfuerzo cortante, momento flector, pendiente y deflexión. Sin registro.',
  eyebrow: 'Gratis · Sin registro · Se ejecuta en tu navegador',
  h1: 'Calculadora de vigas',
  hero:
    'Analiza vigas simplemente apoyadas, en voladizo, empotradas, con voladizo y continuas online. Obtén diagramas instantáneos de esfuerzo cortante, momento flector, pendiente y deflexión con reacciones, tensiones y comprobaciones de flecha.',
  s1: {
    h2: 'Una calculadora de vigas online gratuita que funciona como una herramienta profesional',
    p1:
      'Esta calculadora de vigas está diseñada para ingenieros, estudiantes, fabricantes y constructores que necesitan respuestas estructurales rápidas y precisas sin instalar software ni crear una cuenta. Ejecuta un solver completo de elementos finitos Euler–Bernoulli directamente en tu navegador, por lo que los resultados aparecen al instante mientras escribes. No hay límites de carga, no hay funciones bloqueadas y no hay formulario de registro: abre la página y analiza.',
    p2:
      'Ya sea que busques una calculadora de vigas simple, una calculadora de vigas online o una herramienta de análisis estructural, el flujo de trabajo es el mismo: establece la longitud de la viga, coloca los apoyos, añade las cargas y lee los diagramas. El lienzo con arrastrar y soltar permite mover apoyos y cargas como un editor real, y cada cambio se resuelve en menos de un milisegundo.',
  },
  s2: {
    h2: 'Qué puede analizar esta calculadora de vigas',
    beamTypes: {
      h3: 'Tipos de vigas',
      p: 'Vigas simplemente apoyadas, vigas en voladizo, vigas biempotradas, vigas empotradas-apoyadas, vigas con voladizo, vigas continuas de múltiples luces y vigas de Gerber con rótulas internas (liberaciones de momento). Si buscas una calculadora de viga en voladizo o una calculadora de viga simplemente apoyada, esas configuraciones están a un clic en el menú de ejemplos.',
    },
    supports: {
      h3: 'Apoyos y conexiones',
      p: 'Apoyos articulados, de rodillo, empotramientos y apoyos elásticos (resortes) se pueden colocar en cualquier punto de la viga, incluidos los voladizos. La rigidez del resorte es totalmente ajustable, y se puede prescribir un asentamiento de apoyo para estudiar efectos de asentamiento diferencial. Las rótulas internas crean verdaderas liberaciones de momento entre luces, esencial para modelar vigas de Gerber.',
    },
    loads: {
      h3: 'Cargas',
      p: 'Añade cargas ilimitadas: cargas puntuales concentradas, momentos aplicados, cargas distribuidas uniformes (CDU), cargas triangulares y cargas linealmente variables (trapezoidales) con intensidades iniciales y finales independientes. Las cargas pueden comenzar y terminar en cualquier punto de la viga, y un interruptor de peso propio aplica automáticamente el peso de la viga como carga distribuida a partir del área de la sección y la densidad del material.',
    },
  },
  s3: {
    h2: 'Calculadora de vigas de acero y de madera en una sola herramienta',
    p: 'Las bibliotecas de materiales y secciones hacen que esta herramienta sea igualmente útil como calculadora de vigas de acero y como calculadora de vigas de madera. Los preajustes incluyen acero estructural (A36), aluminio (6061-T6), hormigón y madera, cada uno con módulo de elasticidad, densidad y límite elástico realistas. La biblioteca de secciones cubre rectángulos, secciones huecas, círculos, perfiles I, canales y un conjunto seleccionado de perfiles AISC W comunes, y siempre puedes introducir un área y momento de inercia personalizados. Para el dimensionamiento de vigas cumbrera en estructuras de cubierta, modela la cumbrera como una viga simplemente apoyada o con voladizo de madera con cargas puntuales de los pares: la calculadora reporta reacciones, momento máximo y deflexión para comparar con las tablas de luces admisibles.',
  },
  s4: {
    h2: 'Resultados que realmente puedes usar',
    p1: 'Un panel de resultados muestra el esfuerzo cortante máximo, el momento máximo, la deflexión máxima y la tensión de flexión máxima con la ubicación exacta de cada uno, sin necesidad de buscar en un gráfico. Debajo, diagramas interactivos de esfuerzo cortante, momento flector, pendiente y deflexión permiten pasar el cursor o tocar para leer valores en cualquier punto de la luz. Las etiquetas de límite de flecha comprueban automáticamente tu viga contra los límites de servicio L/240, L/360 y L/480.',
    p2: 'Todo está diseñado para flujos de trabajo reales: sistemas completos de unidades métricas e imperiales con selectores granulares de unidades (mm, cm, m, in, ft; N, kN, lb, kip; Pa, MPa, GPa, psi, ksi), un interruptor de convención de signos, deshacer y rehacer, enlaces compartibles que codifican el modelo completo en la URL, exportación CSV de todos los datos de los diagramas y un informe optimizado para impresión que puedes guardar como PDF.',
  },
  s5: {
    h2: 'Cómo usar la calculadora de vigas',
    items: [
      'Establece la longitud de la viga y elige un preajuste del menú de ejemplos, o empieza desde cero.',
      'Haz clic en la viga para añadir apoyos y rótulas; arrastra los glifos para reposicionarlos.',
      'Añade cargas desde el panel de entrada: cargas puntuales, momentos, CDU, cargas triangulares o trapezoidales.',
      'Elige un material y una sección transversal, o introduce propiedades personalizadas.',
      'Lee las reacciones y los valores máximos en el panel de resultados; pasa el cursor sobre los diagramas para consultar cualquier punto.',
      'Comparte el enlace, descarga el CSV o imprime el informe para tus registros.',
    ],
  },
  s6: {
    h2: 'Por qué los ingenieros eligen esta calculadora de vigas gratuita',
    p1:
      'La mayoría de las herramientas gratuitas limitan el número de cargas, ocultan los resultados de deflexión detrás de un muro de pago o te empujan a un proceso de registro. Esta no. Maneja estructuras estáticamente indeterminadas, luces continuas, apoyos elásticos, rótulas internas y asentamiento de apoyos de forma gratuita, y mantiene tus datos privados porque cada cálculo se realiza localmente en tu dispositivo. Márcala como favorita, compártela y úsala como tu calculadora de vigas online de uso diario.',
    p2:
      '¿Buscas teoría? La página de <a class="text-link hover:underline" href="/es/formulas">fórmulas de vigas</a> lista reacciones, momentos y deflexiones de forma cerrada para los casos estándar, y la <a class="text-link hover:underline" href="/es/guide">guía</a> explica cómo leer los diagramas de esfuerzo cortante y momento flector. Nuestros métodos y suposiciones están documentados en la <a class="text-link hover:underline" href="/es/about">página de información</a>. ¿Listo para empezar? <a class="text-link hover:underline" href="/es/calculator">Abre la calculadora</a>.',
  },
  faqEyebrow: 'Preguntas frecuentes',
  faqH2: 'Preguntas frecuentes',
  faqVisible: [
    {
      q: '¿Qué es una calculadora de vigas?',
      a: 'Una calculadora de vigas calcula reacciones, esfuerzo cortante, momento flector, pendiente y deflexión para una viga con apoyos y cargas dados. Esta herramienta utiliza un método exacto de elementos finitos y devuelve diagramas exactos por tramos.',
    },
    {
      q: '¿Esta calculadora de vigas es realmente gratuita?',
      a: 'Sí: cargas ilimitadas, luces ilimitadas, todos los materiales y secciones, exportación e impresión. Nunca se requiere una cuenta.',
    },
    {
      q: '¿Puedo usarla como calculadora de vigas de madera o de acero?',
      a: 'Sí. Elige preajustes de acero, aluminio, hormigón o madera, o introduce un módulo personalizado. Los perfiles W de AISC están incluidos para acero, y las secciones rectangulares cubren los tamaños típicos de madera aserrada.',
    },
    {
      q: '¿Qué tipos de vigas soporta?',
      a: 'Vigas simplemente apoyadas, en voladizo, biempotradas, empotradas-apoyadas, con voladizo, continuas de múltiples luces y vigas de Gerber con rótulas internas, además de apoyos elásticos y asentamiento.',
    },
    {
      q: '¿Puedo compartir o guardar mi modelo?',
      a: 'Sí. El modelo se codifica en la URL, así que copiar el enlace comparte la viga exacta. Tu último modelo también se guarda automáticamente en el navegador.',
    },
    {
      q: '¿Cómo calculo la carga sobre una viga?',
      a: 'Suma todas las cargas que soporta la viga: cargas permanentes (peso propio de la viga, forjado, cubierta, acabados), cargas variables (uso, nieve, mobiliario) y cargas concentradas de muros o equipos. Multiplica las cargas de superficie en kN/m² por el ancho tributario para obtener una carga lineal en kN/m, e introdúcela aquí. La calculadora devuelve reacciones y esfuerzo cortante y momento flector internos a lo largo de la luz.',
    },
    {
      q: '¿Cuál es la fórmula para el cálculo de vigas?',
      a: 'Para una viga simplemente apoyada con carga puntual central: R = P/2, M<sub>máx</sub> = PL/4, δ<sub>máx</sub> = PL³/(48EI). Con carga uniforme w: R = wL/2, M<sub>máx</sub> = wL²/8, δ<sub>máx</sub> = 5wL⁴/(384EI). Voladizo con carga en el extremo: M_máx = PL en el empotramiento, δ_extremo = PL³/(3EI). Referencia completa en la <a class="text-link hover:underline" href="/es/formulas">página de fórmulas</a>.',
    },
    {
      q: '¿Cómo calculo cuánto peso puede soportar una viga?',
      a: 'Realiza dos comprobaciones y toma el resultado más desfavorable. Resistencia: mantén la tensión de flexión σ = M·c/I por debajo de la tensión admisible (límite elástico ÷ factor de seguridad). Servicio: mantén la deflexión δ<sub>máx</sub> ≤ L/360 (o L/240). Introduce tu sección, lee M_máx y δ_máx del panel de resultados y compara σ_máx con la tensión admisible del material.',
    },
    {
      q: '¿Cómo calculo la capacidad de carga estructural?',
      a: 'La capacidad combina flexión, cortante y deflexión. Flexión: la mayor P tal que M_máx ≤ f<sub>y</sub>·I/c. Cortante: V_máx ≤ τ_adm·A. Deflexión: elegir E·I de modo que δ_máx ≤ L/límite. Esta herramienta reporta los tres con ubicaciones, así que cada comprobación es una lectura directa; el diseño por normativa (AISC, NDS, Eurocódigo) aplica adicionalmente factores de resistencia.',
    },
  ],
  faqLd: [
    {
      q: '¿Qué es una calculadora de vigas?',
      a: 'Una calculadora de vigas es una herramienta de análisis estructural que calcula reacciones, esfuerzo cortante, momento flector, pendiente y deflexión para una viga con apoyos y cargas dados. Esta calculadora de vigas online y gratuita utiliza un solver exacto de elementos finitos Euler–Bernoulli que se ejecuta completamente en tu navegador.',
    },
    {
      q: '¿Esta calculadora de vigas es realmente gratuita?',
      a: 'Sí. Cargas ilimitadas, luces ilimitadas, todas las bibliotecas de secciones, exportación CSV e informes para imprimir son completamente gratuitos sin registro, sin periodo de prueba y sin muro de pago.',
    },
    {
      q: '¿Puedo usarla como calculadora de vigas de madera o de acero?',
      a: 'Sí. Elige entre materiales preconfigurados que incluyen acero estructural, aluminio, hormigón y madera, o introduce un módulo de elasticidad personalizado. Se incluye una biblioteca de perfiles AISC W comunes para diseño en acero, y las secciones rectangulares funcionan para vigas de madera.',
    },
    {
      q: '¿Qué tipos de vigas soporta?',
      a: 'Vigas simplemente apoyadas, en voladizo, biempotradas, empotradas-apoyadas, con voladizo, vigas continuas de múltiples luces y vigas de Gerber con rótulas internas. También se admiten apoyos elásticos y asentamiento de apoyos.',
    },
    {
      q: '¿Puedo compartir o guardar mi modelo de viga?',
      a: 'Sí. El modelo completo se serializa en la URL, por lo que puedes copiar el enlace para compartir la viga exacta con un colega, o guardarlo como marcador. Tu último modelo también se guarda automáticamente de forma local en tu navegador.',
    },
    {
      q: '¿Cómo calculo la carga sobre una viga?',
      a: 'Totaliza todas las fuerzas que debe soportar la viga: cargas permanentes (peso propio de la viga, forjado, cubierta, acabados), cargas variables (uso, nieve, mobiliario) y cualquier carga concentrada de muros, pilares o equipos que descansen sobre ella. Multiplica las cargas de superficie en kN/m² por el ancho tributario para obtener una carga lineal (CDU) en kN/m, e introduce esas cargas aquí. La calculadora devuelve reacciones y esfuerzo cortante y momento flector internos a lo largo de la luz.',
    },
    {
      q: '¿Cuál es la fórmula para el cálculo de vigas?',
      a: 'Para una viga simplemente apoyada con carga puntual central: reacciones R = P/2, momento máximo M = PL/4 en el centro de la luz, y deflexión máxima δ = PL³/(48EI). Con carga uniforme w: R = wL/2, M = wL²/8, δ = 5wL⁴/(384EI). Voladizo con carga en el extremo: M = PL en el empotramiento, δ = PL³/(3EI). La tabla completa de fórmulas está en la página /es/formulas.',
    },
    {
      q: '¿Cómo calculo cuánto peso puede soportar una viga?',
      a: 'La capacidad se rige por el menor de dos resultados: la comprobación de resistencia y la de servicio. Resistencia: exigir σ = M·c/I ≤ fy (tensión de flexión por debajo del límite elástico, con factor de seguridad). Servicio: exigir δmáx ≤ L/360 (o L/240) para que la viga no presente flecha visible ni dañe acabados. Modela tu sección aquí, lee M_máx y δ_máx, y compara con la tensión admisible del material.',
    },
    {
      q: '¿Cómo calculo la capacidad de carga estructural?',
      a: 'La capacidad estructural combina resistencia a flexión, resistencia a cortante y deflexión. Flexión: carga admisible P tal que M_máx ≤ fy·I/c. Cortante: V_máx ≤ τ_adm·A. Deflexión: elegir E·I de modo que δ_máx ≤ L/límite. Esta herramienta reporta M_máx, V_máx y δ_máx con sus ubicaciones para que puedas realizar cada comprobación directamente; el diseño según normativa (AISC, NDS, Eurocódigo) aplica adicionalmente factores de seguridad y resistencia.',
    },
  ],
};

const hub: HubCopy = {
  title: 'Calculadora de vigas online | DEC, DMF y deflexión',
  description:
    'Calculadora de vigas online y gratuita: analiza vigas simplemente apoyadas, en voladizo y continuas con diagramas instantáneos de esfuerzo cortante, momento flector y deflexión.',
  keywords: ['calculadora de vigas online', 'calculadora de vigas', 'calculadora de vigas gratis', 'cálculo de vigas online'],
  h1: 'Calculadora de vigas online',
  s1: {
    h2: 'Todos los casos de viga en un directorio',
    p: 'La herramienta de arriba comienza en blanco. Si tu problema coincide con una configuración estándar, las calculadoras de abajo lo cargan preconfigurado: solo cambia la luz, las cargas y la sección. Todas son la misma herramienta gratuita que se ejecuta en tu navegador, con los mismos diagramas de reacciones, esfuerzo cortante, momento flector, pendiente, curvas de deflexión y comprobaciones de tensión.',
  },
  byTypeH2: 'Calculadoras por tipo de viga',
  byTypeExtra: [
    'Viga biempotrada, CDU',
    'Viga con voladizo',
    'Viga continua, dos luces',
    'Viga de Gerber con rótula interna',
  ],
  workedH2: 'Ejemplos resueltos',
  workedIntro:
    'Casos clásicos de libro de texto, listos para ejecutar y comparar con las respuestas de forma cerrada en la página de <a class="text-link hover:underline" href="/es/formulas"> fórmulas de vigas</a>.',
  whichH2: '¿Qué calculadora necesito?',
  whichP:
    'Para entramados de piso y cubierta en madera, empieza con la <a class="text-link hover:underline" href="/es/calculator/wood-beam-calculator"> calculadora de vigas de madera</a>. Para acero estructural con perfiles AISC W, usa la <a class="text-link hover:underline" href="/es/calculator/steel-beam-calculator"> calculadora de vigas de acero</a>. Para pares que apoyan sobre una cumbrera estructural, la <a class="text-link hover:underline" href="/es/calculator/ridge-beam-calculator"> calculadora de viga cumbrera</a> modela las reacciones de los pares como cargas puntuales. Para vigas que pasan sobre tres o más apoyos, empieza con el ejemplo <a class="text-link hover:underline" href="/es/calculator/continuous-two-span">continua de dos luces</a>. Lectura de fondo: la <a class="text-link hover:underline" href="/es/guide">guía de DEC y DMF</a> explica cómo leer los resultados, y la <a class="text-link hover:underline" href="/es/about">página de información</a> cubre las suposiciones y limitaciones de la herramienta.',
};

const formulas: FormulasCopy = {
  title: 'Fórmulas de vigas | Reacciones, momentos y deflexiones',
  description:
    'Fórmulas de vigas de forma cerrada: reacciones, momento máximo y deflexión para vigas simplemente apoyadas, en voladizo, biempotradas y continuas.',
  eyebrow: 'Referencia',
  h1: 'Fórmulas de vigas',
  intro:
    'Reacciones, momentos máximos y deflexiones máximas de forma cerrada para los casos estándar de vigas. Cada caso se puede cargar interactivamente en la <a class="text-link hover:underline" href="/es/calculator">calculadora</a>.',
  colReactions: 'Reacciones',
  colMoment: 'Momento flector',
  colDeflection: 'Deflexión',
  cases: [
    {
      name: 'Simplemente apoyada, carga puntual central P',
      sketch: 'Articulación A, rodillo B; P en x = L/2',
    },
    {
      name: 'Simplemente apoyada, carga puntual P en x = a',
      sketch: 'Articulación A, rodillo B; P a distancia a de A (b = L − a)',
    },
    {
      name: 'Simplemente apoyada, CDU w (toda la luz)',
      sketch: 'Articulación A, rodillo B, carga uniforme w',
    },
    {
      name: 'Simplemente apoyada, momento aplicado M₀ en x = a',
      sketch: 'Par concentrado',
    },
    {
      name: 'Voladizo, carga puntual P en el extremo',
      sketch: 'Empotramiento en A; P en el extremo libre',
    },
    {
      name: 'Voladizo, CDU w (toda la longitud)',
      sketch: 'Empotramiento en A, carga uniforme w',
    },
    {
      name: 'Voladizo, carga triangular (0 en extremo → w en empotramiento)',
      sketch: 'Creciente linealmente hacia el empotramiento',
    },
    {
      name: 'Empotrada-apoyada, CDU w',
      sketch: 'Empotramiento en A, rodillo en B',
    },
    {
      name: 'Biempotrada, CDU w',
      sketch: 'Ambos extremos empotrados',
    },
    {
      name: 'Biempotrada, carga puntual central P',
      sketch: 'Ambos extremos empotrados; P en L/2',
    },
    {
      name: 'Dos luces iguales, CDU w en ambas',
      sketch: 'Articulaciones en A, B, C; cada luz L',
    },
    {
      name: 'Con voladizo (simétrica), CDU w',
      sketch: 'Apoyos a distancia a de cada extremo, longitud total L',
    },
  ],
  liveH2: 'Comprueba una fórmula en vivo',
  liveP:
    'Cada respuesta de forma cerrada anterior tiene un caso interactivo correspondiente. Verifica los números tú mismo: <a class="text-link hover:underline" href="/es/calculator/cantilever-udl">voladizo con carga uniforme</a>, <a class="text-link hover:underline" href="/es/calculator/cantilever-tip-load">voladizo con carga en el extremo</a>, <a class="text-link hover:underline" href="/es/calculator/simply-supported-udl">simplemente apoyada con CDU</a>, <a class="text-link hover:underline" href="/es/calculator/fixed-fixed-udl">biempotrada con CDU</a> o la <a class="text-link hover:underline" href="/es/calculator/continuous-two-span">viga continua de dos luces</a>. El directorio completo está en la <a class="text-link hover:underline" href="/es/calculator">página de calculadoras</a>.',
  legend:
    'P carga puntual · w carga distribuida por unidad de longitud · L luz · E módulo de elasticidad · I momento de inercia. Momentos positivos en pandeo (sagging); deflexiones descendentes representadas como positivas.',
};

const guide: GuideCopy = {
  title: 'Guía | Lectura de DEC y DMF, convenciones de signos',
  description:
    'Cómo leer diagramas de esfuerzo cortante y momento flector, convenciones de signos y cómo funciona la calculadora.',
  eyebrow: 'Guía',
  h1: 'Cómo funciona el análisis de vigas',
  sfd: {
    h2: 'Diagrama de esfuerzo cortante (DEC)',
    p: 'El esfuerzo cortante V(x) en una sección es la suma algebraica de las fuerzas verticales a un lado del corte. Las cargas puntuales descendentes provocan saltos hacia abajo; las reacciones de apoyo provocan saltos hacia arriba; las cargas distribuidas crean líneas inclinadas (la pendiente es igual a −w). Los cruces por cero marcan posibles extremos del momento flector.',
  },
  bmd: {
    h2: 'Diagrama de momento flector (DMF)',
    p: 'El momento flector M(x) es el área bajo la curva de cortante: M(x) = M(0) + ∫V dx. Los segmentos curvos de pandeo aparecen bajo CDU (parábolas), las líneas rectas bajo cargas puntuales, y los pares aplicados causan saltos instantáneos. Las rótulas internas fuerzan M = 0 en la posición de la rótula.',
  },
  signs: {
    h2: 'Convenciones de signos',
    p: 'Esta calculadora utiliza por defecto la convención de <strong>pandeo positivo</strong> (sagging-positive): un momento que produce pandeo en la viga (forma de sonrisa) es positivo; la deflexión descendente se representa hacia abajo (negativa). Puedes invertir la convención de signos de momento y cortante con el interruptor bajo los resultados. Los pares aplicados son positivos en sentido horario en las entradas.',
  },
  supports: {
    h2: 'Apoyos',
    items: [
      '<strong>Articulación:</strong> restringe el desplazamiento vertical; libre para rotar.',
      '<strong>Rodillo:</strong> igual que la articulación en este modelo 2D vertical; libre en horizontal.',
      '<strong>Empotramiento:</strong> restringe desplazamiento y rotación (añade un momento de reacción).',
      '<strong>Resorte:</strong> resorte vertical con rigidez k; la reacción es igual a k × deflexión ajustada por asentamiento.',
      '<strong>Rótula interna:</strong> libera el momento, de modo que la rotación es discontinua a través de la rótula.',
    ],
  },
  method: {
    h2: 'Método',
    p: 'El motor es un solver clásico de elementos finitos Euler–Bernoulli: dos grados de libertad por nodo (v, θ), elementos de viga hermitianos exactos, cargas nodales consistentes para cargas distribuidas y post-procesamiento exacto por tramos. El tiempo de resolución es inferior a un milisegundo para modelos típicos y todo se ejecuta localmente en tu navegador: nada se envía a un servidor.',
  },
  tryIt: {
    h2: 'Pruébalo con un caso real',
    p: 'La forma más rápida de interiorizar estos diagramas es construir un caso y observar cómo cambian. Empieza con el <a class="text-link hover:underline" href="/es/calculator/cantilever-udl">voladizo con carga uniforme</a> para ver el clásico cortante lineal y momento parabólico, o la <a class="text-link hover:underline" href="/es/calculator/cantilever-beam-calculator">calculadora de viga en voladizo</a> para cargas en el extremo y momentos. Para información completa sobre las suposiciones de la herramienta, consulta la <a class="text-link hover:underline" href="/es/about">página de información</a>.',
  },
  stresses: {
    h2: 'Tensiones y servicio',
    p: 'La tensión de flexión se calcula como σ = M·c/I por separado para las fibras superior e inferior (cSup, cInf pueden diferir en secciones asimétricas). La tensión cortante media es V/A: una comprobación aproximada; las almas de perfiles I soportan un cortante pico significativamente mayor. Las etiquetas de deflexión comparan contra los límites de servicio habituales L/240, L/360 y L/480.',
  },
};

const about: AboutCopy = {
  title: 'Acerca de: Calculadora de vigas gratuita',
  description:
    'Por qué existe esta calculadora: luces ilimitadas, resortes, rótulas, cargas trapezoidales y diagramas instantáneos: 100% gratuita sin cuenta.',
  eyebrow: 'Acerca de',
  h1: 'Una calculadora de vigas que no se interpone en tu camino',
  p1:
    'OnlineBeamCalculator.com es una herramienta gratuita de análisis estructural para ingenieros, estudiantes y constructores. Ejecuta un solver exacto de elementos finitos de viga completamente en tu navegador: sin cuenta, sin subida de datos, sin servidor, sin costo.',
  p2:
    'Soporta luces ilimitadas, apoyos articulados/de rodillo/empotrados/elásticos, rótulas internas (liberaciones de momento), cargas puntuales, momentos, cargas distribuidas uniformes y linealmente variables (trapezoidales), peso propio, asentamiento prescrito de apoyos y cambio completo de unidades métricas/imperiales con selectores granulares.',
  p3:
    'Los resultados incluyen reacciones, diagramas de esfuerzo cortante/momento flector/pendiente/deflexión con consultas puntuales, valores máximos y mínimos con ubicaciones, tensión de flexión y tensión cortante media, y comprobaciones de servicio de deflexión (L/240, L/360, L/480). Todo se puede exportar como CSV o imprimir como informe, y los modelos se pueden compartir mediante un enlace: nunca se requiere inicio de sesión.',
  assumptionsH2: 'Suposiciones y limitaciones',
  assumptions: [
    'Teoría de vigas de Euler–Bernoulli (las secciones planas permanecen planas; se desprecia la deformación por cortante).',
    'Sección lineal-elástica y prismática en toda la viga (secciones escalonadas aún no están soportadas).',
    'Solo flexión vertical 2D; sin análisis axial/torsional.',
    'Tensión cortante media V/A únicamente; para comprobaciones locales de cortante en el alma, usa una herramienta de diseño según normativa.',
    'Los resultados son solo ayuda para el análisis; verifica los diseños críticos contra las normativas aplicables.',
  ],
};

const contact: ContactCopy = {
  title: 'Contacto | OnlineBeamCalculator.com',
  description:
    'Ponte en contacto con OnlineBeamCalculator.com: informes de errores, solicitudes de funcionalidades y preguntas generales sobre la calculadora de vigas gratuita.',
  eyebrow: 'Contacto',
  h1: 'Contáctanos',
  intro:
    'Los comentarios, informes de errores y solicitudes de funcionalidades dan forma a esta herramienta. Si un resultado parece incorrecto, un caso de carga se comporta mal o falta una función que necesitas, queremos saberlo.',
  emailH2: 'Correo electrónico',
  emailP:
    'Escríbenos a <a class="text-link hover:underline" href="mailto:support@onlinebeamcalculator.com">support@onlinebeamcalculator.com</a>. Procuramos responder en unos pocos días hábiles.',
  reportH2: 'Reportar un resultado incorrecto',
  reportIntro: 'La forma más rápida de obtener una corrección es incluir:',
  reportItems: [
    'El enlace compartido del modelo (usa el botón de copiar enlace en la calculadora; el modelo completo está codificado en la URL).',
    'Lo que esperabas ver y lo que la herramienta reportó.',
    'Tu navegador y sistema operativo, si el problema parece visual.',
  ],
  reportOutro:
    'Como todo se ejecuta en el lado del cliente, el enlace compartido suele ser todo lo que necesitamos para reproducir el problema exactamente.',
  featureH2: 'Solicitudes de funcionalidades',
  featureP:
    'Secciones escalonadas, más tipos de carga, comprobaciones adicionales de servicio, exportaciones: dinos qué haría la herramienta más útil en tu flujo de trabajo y se considerará para una versión futura.',
};

const privacy: LegalCopy = {
  title: 'Política de privacidad | OnlineBeamCalculator.com',
  description:
    'Política de privacidad de OnlineBeamCalculator.com: una calculadora de vigas que se ejecuta completamente en el cliente. Sin cuenta, sin seguimiento de tus cálculos, sin datos subidos a un servidor.',
  eyebrow: 'Legal',
  h1: 'Política de privacidad',
  updated: 'Última actualización: 22 de agosto de 2026',
  blocks: [
    {
      h2: 'La versión corta',
      p: 'OnlineBeamCalculator.com se ejecuta completamente en tu navegador. Tus modelos de vigas, cargas, unidades y resultados nunca abandonan tu dispositivo. No tenemos cuentas, no almacenamos tus cálculos en un servidor y no hay nada de lo que darse de baja porque nada se recopila.',
    },
    {
      h2: 'Lo que no recopilamos',
      items: [
        'Ninguna información personal como nombres, direcciones de correo electrónico o credenciales de cuenta (el registro no existe en este sitio).',
        'Ningún dato de cálculo. Todo el análisis estructural se computa localmente mediante JavaScript en tu navegador. Nada de lo que introduces en la calculadora se transmite a nosotros.',
        'Ninguna cookie de publicidad o seguimiento de comportamiento.',
      ],
    },
    {
      h2: 'Almacenamiento local',
      p: 'El sitio almacena un pequeño número de preferencias en el almacenamiento local de tu navegador, como tu elección de tema (claro u oscuro) y preferencias de unidades, para que persistan entre visitas. Estos datos permanecen en tu dispositivo, nunca se envían a nosotros y se pueden borrar en cualquier momento a través de la configuración del navegador.',
    },
    {
      h2: 'Enlaces compartidos',
      p: 'Cuando compartes un modelo mediante un enlace, la configuración completa del modelo se codifica en la propia URL. Quien abra el enlace lo decodifica localmente en su propio navegador. El contenido del enlace no se almacena en ninguna base de datos operada por nosotros.',
    },
    {
      h2: 'Alojamiento y registros',
      p: 'El sitio se sirve como archivos estáticos a través de una red de distribución de contenidos (actualmente Cloudflare Pages). Como cualquier alojamiento web, la CDN puede procesar datos técnicos estándar (dirección IP, agente de usuario, URL solicitada) en registros de servidor de corta duración para entregar páginas y proteger contra el abuso. No accedemos, combinamos ni retenemos estos registros para crear perfiles.',
    },
    {
      h2: 'Servicios de terceros',
      pHtml:
        'Las fuentes tipográficas se empaquetan con el sitio y se sirven desde el mismo origen. Usamos Google Analytics (GA4) para entender el uso agregado del sitio, como vistas de página y referencias; esto implica un script de googletagmanager.com y cookies estándar de GA. No incorporamos redes publicitarias ni rastreadores de redes sociales, y tus datos de cálculo nunca se envían a Google ni a nadie más.',
    },
    {
      h2: 'Menores',
      p: 'El sitio es una herramienta de ingeniería dirigida a un público técnico general. No recopila deliberadamente información personal de nadie, incluidos los menores de 13 años.',
    },
    {
      h2: 'Cambios en esta política',
      p: 'Si cambiamos la forma en que el sitio gestiona los datos, actualizaremos esta página y revisaremos la fecha anterior. Los cambios importantes se indicarán en el sitio.',
    },
    {
      h2: 'Contacto',
      pHtml: 'Preguntas sobre esta política: consulta la <a class="text-link hover:underline" href="/es/contact">página de contacto</a>.',
    },
  ],
};

const terms: LegalCopy = {
  title: 'Términos y condiciones | OnlineBeamCalculator.com',
  description: 'Términos y condiciones de uso de OnlineBeamCalculator.com, la herramienta gratuita de análisis de vigas basada en navegador.',
  eyebrow: 'Legal',
  h1: 'Términos y condiciones',
  updated: 'Última actualización: 22 de agosto de 2026',
  blocks: [
    {
      h2: 'Aceptación de los términos',
      p: 'Al acceder o usar OnlineBeamCalculator.com, aceptas estos términos. Si no estás de acuerdo, por favor no uses el sitio.',
    },
    {
      h2: 'El servicio',
      p: 'OnlineBeamCalculator.com proporciona una herramienta gratuita de análisis estructural de vigas basada en navegador. El servicio se proporciona tal cual y de forma gratuita, sin necesidad de cuenta ni registro.',
    },
    {
      h2: 'No es asesoramiento de ingeniería',
      p: 'Los resultados producidos por esta herramienta son solo ayudas para el análisis. No constituyen asesoramiento profesional de ingeniería, certificación de diseño ni aprobación para construcción. Eres responsable de verificar todos los resultados contra los códigos de construcción aplicables, las normas de práctica y tu propio juicio profesional. Los diseños críticos deben ser revisados por un ingeniero estructural cualificado y habilitado.',
    },
    {
      h2: 'Precisión y limitaciones',
      p: 'El solver utiliza la teoría de vigas de Euler–Bernoulli bajo las suposiciones indicadas en la <a class="text-link hover:underline" href="/es/about">página de información</a>. Aunque validamos los resultados contra soluciones de forma cerrada, no garantizamos que los resultados estén libres de errores o sean adecuados para ningún propósito particular.',
    },
    {
      h2: 'Uso aceptable',
      items: [
        'Usa la herramienta para trabajo de ingeniería personal, educativo y comercial legítimo.',
        'No intentes interrumpir, sobrecargar ni sondear el sitio o su infraestructura de alojamiento.',
        'No presentes resultados generados por esta herramienta como trabajo de ingeniería certificado.',
      ],
    },
    {
      h2: 'Propiedad intelectual',
      p: 'El diseño, código y contenido del sitio son propiedad de OnlineBeamCalculator.com. Conservas la plena propiedad de los modelos que creas y los resultados que generas; expórtalos y compártelos como desees.',
    },
    {
      h2: 'Limitación de responsabilidad',
      p: 'En la máxima medida permitida por la ley, OnlineBeamCalculator.com y sus operadores no aceptan responsabilidad por ninguna pérdida directa, indirecta, incidental o consecuente derivada del uso del sitio o de la confianza en sus resultados, incluyendo pero no limitado a fallos estructurales, sobrecostos o retrasos en el proyecto.',
    },
    {
      h2: 'Disponibilidad',
      p: 'Podemos modificar, suspender o descontinuar cualquier parte del sitio en cualquier momento sin previo aviso. Dado que la calculadora se ejecuta completamente en el lado del cliente, también puedes guardar y compartir modelos como enlaces independientemente de nuestra operación continuada.',
    },
    {
      h2: 'Términos aplicables',
      p: 'Estos términos se rigen por las leyes aplicables en la jurisdicción del operador, sin tener en cuenta las normas de conflicto de leyes. Si alguna cláusula resulta inaplicable, el resto permanece en vigor.',
    },
    {
      h2: 'Contacto',
      pHtml: 'Preguntas sobre estos términos: consulta la <a class="text-link hover:underline" href="/es/contact">página de contacto</a>.',
    },
  ],
};

const calculators: CalculatorsCopy = {
  presets: {
    'simply-supported-point': {
      name: 'Simplemente apoyada, carga puntual central',
      description: 'Articulación en A, rodillo en B, carga puntual P en el centro de la luz.',
    },
    'simply-supported-udl': {
      name: 'Simplemente apoyada, carga uniforme',
      description: 'Articulación en A, rodillo en B, carga distribuida uniforme w en toda la luz.',
    },
    'cantilever-tip-load': {
      name: 'Voladizo, carga puntual en el extremo',
      description: 'Empotramiento en A, carga puntual P en el extremo libre.',
    },
    'cantilever-udl': {
      name: 'Voladizo, carga uniforme',
      description: 'Empotramiento en A, carga distribuida uniforme w en toda la longitud.',
    },
    'fixed-fixed-udl': {
      name: 'Biempotrada, carga uniforme',
      description: 'Ambos extremos empotrados, carga distribuida uniforme w en toda la luz.',
    },
    'overhanging-beam': {
      name: 'Viga con voladizo, carga uniforme',
      description: 'Apoyos cerca de los extremos, carga uniforme w en toda la longitud con voladizos.',
    },
    'continuous-two-span': {
      name: 'Continua, dos luces iguales con CDU',
      description: 'Articulaciones en A, B, C; carga uniforme w en ambas luces.',
    },
    'gerber-hinge': {
      name: 'Viga de Gerber con rótula interna',
      description: 'Dos luces con una rótula interna que libera el momento en la unión.',
    },
  } as Record<PresetSlug, { name: string; description: string }>,
  variants: {
    'steel-beam-calculator': {
      title: 'Calculadora de vigas de acero',
      h1: 'Calculadora de vigas de acero',
      description:
        'Analiza vigas de acero con perfiles AISC W. Preajuste de acero estructural (A36, E = 200 GPa, fy = 250 MPa) y una biblioteca de perfiles W comunes con área y momento de inercia reales.',
      intro:
        'Elige un perfil W, establece tu luz y cargas, y lee reacciones instantáneas, diagramas de esfuerzo cortante y momento flector, curvas de deflexión y comprobaciones de tensión. Activa el peso propio, cambia entre unidades métricas e imperiales, exporta CSV o imprime un informe.',
    },
    'wood-beam-calculator': {
      title: 'Calculadora de vigas de madera',
      h1: 'Calculadora de vigas de madera',
      description:
        'Analiza vigas de madera con secciones rectangulares y propiedades de material realistas. Preajuste de madera (E = 11 GPa, densidad 500 kg/m³) o introduce valores personalizados para madera laminada, LVL o madera aserrada.',
      intro:
        'Introduce el canto y ancho de la viga, establece luces y cargas (puntual, CDU, trapezoidal) y obtén reacciones, diagramas, deflexión y comprobaciones de servicio contra L/360 y L/240.',
    },
    'ridge-beam-calculator': {
      title: 'Calculadora de viga cumbrera',
      h1: 'Calculadora de viga cumbrera',
      description:
        'Dimensiona una viga cumbrera estructural para entramado de cubierta. Modela la cumbrera como una viga simplemente apoyada o con voladizo con cargas puntuales de los pares a espaciamiento regular.',
      intro:
        'Establece la luz, el espaciamiento de pares y las cargas de cubierta (permanente + variable + nieve). La calculadora convierte las reacciones de los pares en cargas puntuales sobre la cumbrera y reporta reacciones, momento máximo, deflexión y tensión.',
    },
    'cantilever-beam-calculator': {
      title: 'Calculadora de viga en voladizo',
      h1: 'Calculadora de viga en voladizo',
      description:
        'Analiza vigas en voladizo con cargas en el extremo, momentos, cargas distribuidas uniformes y triangulares, apoyos elásticos y peso propio.',
      intro:
        'Empotrada en un extremo, libre en el otro. Añade cualquier combinación de cargas, elige una sección y lee la reacción en el empotramiento, el momento de empotramiento, la deflexión en el extremo y la tensión. Compara con las fórmulas de forma cerrada en la página de fórmulas.',
    },
    'simply-supported-beam-calculator': {
      title: 'Calculadora de viga simplemente apoyada',
      h1: 'Calculadora de viga simplemente apoyada',
      description:
        'Analiza vigas simplemente apoyadas con cualquier combinación de cargas puntuales, momentos, cargas uniformes y trapezoidales, apoyos elásticos y peso propio.',
      intro:
        'Articulación en un extremo, rodillo en el otro. Coloca cargas en cualquier punto de la luz, elige un material y sección, y obtén reacciones, diagramas de esfuerzo cortante y momento flector, deflexión y tensión. Ideal para vigas de piso, viguetas y correas.',
    },
    'simple-beam-calculator': {
      title: 'Calculadora de viga simple',
      h1: 'Calculadora de viga simple',
      description:
        'Una calculadora simplificada de viga simplemente apoyada con un conjunto mínimo de entradas: luz, carga y sección. Para comprobaciones rápidas cuando no necesitas todas las funcionalidades.',
      intro:
        'Introduce la luz, una carga uniforme o puntual, y una sección rectangular o tipo I. Reacciones instantáneas, M_máx, δ_máx y tensión. Ideal para problemas de libro de texto y dimensionamiento rápido.',
    },
  } as Record<VariantSlug, { title: string; h1: string; description: string; intro: string }>,
  deepDive: {
    'steel-beam-calculator': [
      {
        heading: 'Cómo usar esta calculadora de vigas de acero',
        paragraphs: [
          'Comienza con la viga simplemente apoyada precargada, luego establece tu luz real entre apoyos. Reemplaza la carga uniforme con tu propia carga lineal en kN/m (multiplica la carga de piso o cubierta en kN/m² por el ancho tributario), o cámbiala por cargas puntuales en las posiciones exactas donde otras vigas o pilares descansan sobre esta.',
          'Abre la biblioteca de secciones y elige un perfil W de la lista AISC: los perfiles W4 a W24 llevan su área y momento de inercia reales, por lo que los resultados de deflexión y tensión de flexión coinciden con las propiedades publicadas del acero. El preajuste de material usa acero estructural con E = 200 GPa y fy = 250 MPa; cambia a un módulo personalizado solo si trabajas con una aleación diferente.',
        ],
      },
      {
        heading: 'Lectura de resultados para una comprobación de diseño en acero',
        paragraphs: [
          'Para una comprobación rápida de resistencia, compara la tensión de flexión máxima reportada con el límite elástico dividido por tu factor de seguridad; un enfoque habitual de tensión admisible mantiene la tensión de trabajo por debajo de aproximadamente 0,6 × fy. Para servicio, observa las etiquetas de deflexión: L/360 protege los acabados frágiles en pisos, y L/240 es el límite habitual para cubiertas.',
          'Si la viga falla en servicio pero pasa la comprobación de resistencia, elige un perfil W más alto: la deflexión escala con 1/I, y las secciones más altas ganan momento de inercia mucho más rápido que peso. Exporta el CSV o imprime el informe para adjuntar un registro del caso de carga a tu memoria de cálculo.',
        ],
      },
      {
        heading: 'Errores comunes en vigas de acero que esta herramienta ayuda a detectar',
        paragraphs: [
          'Olvidar el peso propio es el error clásico; activa el peso propio y la masa de la sección se convierte automáticamente en una carga uniforme. Otro es subestimar el ancho tributario, que importa más que la carga por unidad de área en sí. Y cuando una viga de acero se apoya sobre tres o más postes, debe modelarse como continua en lugar de como una serie de tramos simplemente apoyados: el momento negativo sobre el apoyo intermedio cambia el diseño.',
        ],
      },
    ],
    'wood-beam-calculator': [
      {
        heading: 'Cómo usar esta calculadora de vigas de madera',
        paragraphs: [
          'Comienza con la viga simplemente apoyada precargada e introduce tu luz real. Reemplaza la carga uniforme con la carga lineal que tu piso o cubierta aplica: multiplica la carga por unidad de área en psf (o kN/m²) por el espaciamiento de viguetas/pares para obtener plf (o kN/m). Para vigas cumbrera, introduce las reacciones de los pares como cargas puntuales al espaciamiento correcto.',
          'El preajuste de material usa madera con E = 11 GPa, densidad 500 kg/m³ y fy = 28 MPa; cambia a un módulo personalizado para madera laminada (típicamente 12–14 GPa), LVL (13–14 GPa) o una especie específica. Las secciones rectangulares se introducen por canto y ancho; la calculadora calcula el área e I automáticamente.',
        ],
      },
      {
        heading: 'Lectura de resultados para una comprobación de diseño en madera',
        paragraphs: [
          'Para una comprobación rápida, compara la tensión de flexión máxima reportada con la tensión de flexión admisible F_b del sello de grado o del suplemento NDS. Para servicio, la etiqueta L/360 mantiene los pisos lo suficientemente rígidos para cerámica/yeso, y L/240 es el límite habitual para cubiertas. La deflexión es a menudo el criterio determinante en madera, no la tensión de flexión.',
          'Si la viga falla en servicio, aumenta el canto: la deflexión escala con 1/d³ (ya que I = bd³/12), por lo que duplicar el canto reduce la deflexión 8 veces con solo 2 veces el material. El informe impreso incluye las propiedades de la sección para tu memoria de cálculo.',
        ],
      },
      {
        heading: 'Errores comunes en vigas de madera que esta herramienta ayuda a detectar',
        paragraphs: [
          'Usar dimensiones nominales de la madera en lugar de las reales (un 2×12 es 1,5″ × 11,25″) sobreestima la capacidad significativamente. Olvidar modelar la cumbrera como viga con voladizo cuando se proyecta más allá del muro subestima el momento en el extremo. Y modelar una cumbrera con múltiples apoyos como una serie de tramos simplemente apoyados pasa por alto el momento negativo sobre los postes interiores: usa la calculadora de viga continua en su lugar.',
        ],
      },
    ],
    'ridge-beam-calculator': [
      {
        heading: 'Cómo usar esta calculadora de viga cumbrera',
        paragraphs: [
          'Modela la cumbrera como simplemente apoyada (si descansa sobre muros en ambos extremos) o con voladizo (si se proyecta más allá de un hastial). Introduce el espaciamiento de pares, la luz de la cubierta y la carga total de diseño (permanente + variable + nieve) en psf o kPa. La calculadora convierte esto en cargas puntuales en cada posición de par: carga por par = carga_superficie × espaciamiento × luz / 2.',
          'Elige una sección de madera (rectangular) o introduce un I y un área personalizados. El preajuste de material es madera con E = 11 GPa; actualiza a madera laminada/LVL introduciendo el módulo del fabricante. El peso propio añade el peso de la propia cumbrera como una pequeña CDU automáticamente.',
        ],
      },
      {
        heading: 'Lectura de resultados para el diseño de una viga cumbrera',
        paragraphs: [
          'El panel muestra el momento máximo (típicamente en el centro de la luz para una cumbrera simplemente apoyada, o sobre el apoyo interior para una con voladizo) y la deflexión máxima. Compara la tensión de flexión con F_b del NDS o los valores de diseño del producto. Comprueba la deflexión contra L/240 para cubiertas; L/360 si la cumbrera soporta un cielo raso acabado debajo.',
          'Si la cumbrera es continua sobre tres o más apoyos, cambia a la calculadora de viga continua de dos luces y añade más apoyos según sea necesario: el momento negativo sobre el apoyo central es típicamente el criterio de diseño.',
        ],
      },
      {
        heading: 'Errores comunes en vigas cumbrera que esta herramienta ayuda a detectar',
        paragraphs: [
          'Aplicar la carga total de cubierta como CDU en lugar de cargas puntuales al espaciamiento de los pares sobreestima el momento (una CDU en una viga simplemente apoyada da wL²/8, pero las cargas puntuales discretas producen un momento en el centro menor para la misma carga total). Olvidar la acumulación de nieve o los casos de carga no equilibrada cuando la cumbrera cubre áreas de cubierta diferentes. Y usar un modelo simplemente apoyado cuando la cumbrera es realmente continua sobre postes interiores.',
        ],
      },
    ],
    'cantilever-beam-calculator': [
      {
        heading: 'Cómo usar esta calculadora de viga en voladizo',
        paragraphs: [
          'El preajuste es un voladizo empotrado a la izquierda. Establece la longitud, luego añade cargas: carga puntual en el extremo, momento en el extremo, carga uniforme, carga triangular o cualquier combinación. Arrastra las cargas para reposicionarlas. La biblioteca de secciones incluye rectángulos, secciones huecas y perfiles I; los materiales incluyen acero, aluminio, hormigón y madera.',
          'El interruptor de peso propio activa el peso de la viga como CDU a partir del área de la sección y la densidad del material. Se pueden añadir apoyos elásticos a lo largo de la longitud para modelar cimentaciones elásticas o restricción parcial.',
        ],
      },
      {
        heading: 'Lectura de resultados para el diseño de un voladizo',
        paragraphs: [
          'La fuerza de reacción en el empotramiento y el momento de empotramiento son exactamente lo que la ménsula, soldadura o empotramiento debe resistir. La deflexión en el extremo contra L/180 es la comprobación de servicio habitual; ten en cuenta que para la misma carga total, una carga en el extremo deflecta 8/3 veces más que una carga uniforme, por lo que convertir una carga distribuida en un único valor en el extremo es conservador por un amplio margen pero útil como cota.',
          'La tensión de flexión se reporta en el empotramiento (máxima) y en cualquier punto de carga. La tensión cortante media es V/A en el empotramiento; para perfiles I el cortante en el alma es mayor: usa una herramienta basada en normativa para comprobaciones detalladas del alma.',
        ],
      },
      {
        heading: 'Errores comunes en voladizos que esta herramienta ayuda a detectar',
        paragraphs: [
          'Modelar una carga genuinamente distribuida como una carga en el extremo «por seguridad» es defendible como cota pero puede ocultar dónde se encuentra la tensión máxima real cuando la carga se reparte a lo largo del elemento. Lo contrario es lo peligroso: modelar una carga concentrada como una CDU equivalente reduce a la mitad el momento aparente en el empotramiento y es no conservador. Segundo error: aplicar la fórmula de deflexión del extremo a una carga que no está en el extremo; la fórmula cerrada cambia, y arrastrar la carga en la calculadora muestra el valor corregido al instante.',
        ],
      },
    ],
    'simply-supported-beam-calculator': [
      {
        heading: 'Cómo usar esta calculadora de viga simplemente apoyada',
        paragraphs: [
          'El preajuste es articulación en A, rodillo en B. Establece la luz, luego añade cualquier combinación de cargas puntuales, momentos aplicados, cargas uniformes, cargas triangulares y cargas trapezoidales en cualquier posición. Se pueden colocar apoyos elásticos en cualquier lugar, incluidos los voladizos, para modelar apoyos elásticos.',
          'Los preajustes de materiales y secciones cubren acero, aluminio, hormigón y madera; introduce A e I personalizados para secciones no estándar. El peso propio añade el peso de la viga como CDU automáticamente.',
        ],
      },
      {
        heading: 'Lectura de resultados para un diseño simplemente apoyado',
        paragraphs: [
          'Las reacciones en A y B son las cargas de apoyo para tu diseño de conexión. El momento máximo (con ubicación) rige la comprobación del módulo resistente: σ = M·c/I. La deflexión máxima (con ubicación) rige la comprobación de servicio contra L/360 o L/240. Los diagramas son exactos por tramos: pasa el cursor para leer V y M en cualquier punto.',
          'Para una viga con voladizos, el momento positivo máximo puede estar en la luz y el momento negativo máximo en el apoyo; ambos se reportan. Exporta el CSV para las tablas completas de V/M/θ/δ si necesitas alimentarlas en una hoja de cálculo.',
        ],
      },
      {
        heading: 'Errores comunes en vigas simplemente apoyadas que esta herramienta ayuda a detectar',
        paragraphs: [
          'Olvidar que una viga con voladizo cargado produce momento negativo en el apoyo (contraflexión/hogging), que puede requerir arriostramiento del ala superior o una sección mayor. Subestimar el área tributaria al convertir cargas de superficie en cargas lineales. Y asumir que una viga de múltiples luces puede analizarse como tramos simplemente apoyados independientes: los momentos en el apoyo interior no son cero, y debe usarse la calculadora de viga continua.',
        ],
      },
    ],
    'simple-beam-calculator': [
      {
        heading: 'Cómo usar esta calculadora de viga simple',
        paragraphs: [
          'Este es el caso simplemente apoyado mínimo: una luz, una carga (CDU o carga puntual central), una sección rectangular o tipo I. Introduce la luz, la carga y las dimensiones de la sección (o elige un perfil I). Sin posicionamiento de apoyos, sin apoyos elásticos, sin interruptor de peso propio: solo el caso de libro de texto.',
        ],
      },
      {
        heading: 'Cuándo es la herramienta adecuada (y cuándo no)',
        paragraphs: [
          'Úsala para dimensionamiento rápido: «¿qué canto de perfil W necesito para una luz de 6 m con CDU de 30 kN/m?» Compara el M_máx y δ_máx reportados con la tensión admisible y L/360. Para cualquier caso más complejo (múltiples cargas, voladizos, apoyos elásticos, luces continuas, voladizos, rótulas internas), usa la calculadora completa en /es/calculator.',
        ],
      },
      {
        heading: 'Limitaciones',
        paragraphs: [
          'Sin peso propio, sin voladizos, sin apoyos elásticos, sin rótulas internas, sin luces continuas. Los resultados son las respuestas exactas de forma cerrada de los libros de texto para el caso de una sola carga, que coinciden con el solver completo cuando solo hay una carga presente. Para cualquier otro caso, la calculadora completa es la herramienta correcta.',
        ],
      },
    ],
    'simply-supported-point': [
      {
        heading: 'Cómo analizar una viga simplemente apoyada con carga puntual central',
        paragraphs: [
          'Esta página precarga un modelo configurado en la calculadora de vigas. Edita posiciones y magnitudes directamente, o arrastra elementos en el diagrama. Los resultados se actualizan al instante en tu navegador.',
          'El caso clásico de libro de texto: reacciones R = P/2 en cada apoyo, momento máximo M = PL/4 en el centro de la luz, deflexión máxima δ = PL³/(48EI) en el centro de la luz. El cortante es constante en P/2 entre el apoyo y la carga, luego salta a −P/2.',
        ],
      },
      {
        heading: 'Qué observar con cargas puntuales centrales',
        paragraphs: [
          'Las cargas reales rara vez están exactamente en el centro de la luz. Arrastra la carga fuera del centro y observa cómo las reacciones cambian (R_A = P·b/L, R_B = P·a/L) y el momento máximo se desplaza al punto de carga (M_máx = P·a·b/L). La curva de deflexión se vuelve asimétrica: el máximo ya no está en el centro de la luz.',
          'Si tienes múltiples cargas puntuales, se aplica la superposición: suma los momentos y deflexiones de cada carga. La calculadora hace esto automáticamente cuando añades múltiples cargas, así que no necesitas hacer las cuentas a mano.',
        ],
      },
      {
        heading: 'Calculadoras relacionadas',
        paragraphs: [
          'Compara con el caso de <a class="text-link hover:underline" href="/es/calculator/simply-supported-udl">simplemente apoyada con CDU</a> (wL²/8 vs PL/4 para la misma carga total: una carga puntual central da 2× el momento de una CDU con la misma carga total). Para vigas de acero, empieza con la <a class="text-link hover:underline" href="/es/calculator/steel-beam-calculator">calculadora de vigas de acero</a> y elige un perfil W de la biblioteca.',
        ],
      },
    ],
    'simply-supported-udl': [
      {
        heading: 'Cómo analizar una viga simplemente apoyada con carga uniforme',
        paragraphs: [
          'Esta página precarga una viga simplemente apoyada con una carga distribuida uniforme en toda la luz. Edita la luz, la intensidad de la carga o la sección directamente en la calculadora. Los resultados se actualizan al instante.',
          'Valores de libro de texto: reacciones R = wL/2, M_máx = wL²/8 en el centro de la luz, δ_máx = 5wL⁴/(384EI) en el centro de la luz. El diagrama de cortante es lineal de +wL/2 a −wL/2; el diagrama de momento es parabólico.',
        ],
      },
      {
        heading: 'Qué observar con cargas uniformes',
        paragraphs: [
          'Una CDU parcial (que no cubre toda la luz) produce reacciones diferentes y un diagrama de momento por tramos con una parte superior más plana. Arrastra los extremos de la carga para modelar cobertura parcial: la calculadora lo maneja exactamente. Para una viga de cubierta, la CDU es típicamente la carga de área tributaria × espaciamiento; asegúrate de no contar el peso propio dos veces (actívalo por separado).',
          'Compara con el caso de <a class="text-link hover:underline" href="/es/calculator/simply-supported-point">carga puntual central</a>: para la misma carga total (wL = P), la CDU da la mitad del momento en el centro y 5/8 de la deflexión en el centro. Una CDU es siempre menos exigente que una carga puntual central para la misma carga total.',
        ],
      },
      {
        heading: 'Calculadoras relacionadas',
        paragraphs: [
          'Para una viga con cargas tanto puntuales como distribuidas, usa la <a class="text-link hover:underline" href="/es/calculator/simply-supported-beam-calculator">calculadora completa de viga simplemente apoyada</a>. Para luces continuas, el caso <a class="text-link hover:underline" href="/es/calculator/continuous-two-span">continua de dos luces</a> muestra cómo el momento en el apoyo interior cambia el diseño.',
        ],
      },
    ],
    'cantilever-udl': [
      {
        heading: 'Cómo analizar un voladizo con carga uniforme',
        paragraphs: [
          'Esta página precarga un voladizo empotrado a la izquierda con una carga distribuida uniforme en toda la longitud. Edita longitud, carga, sección o material directamente. Los resultados se actualizan al instante.',
          'Valores de libro de texto: reacción en el empotramiento R = wL, momento en el empotramiento M = wL²/2, deflexión en el extremo δ = wL⁴/(8EI). El cortante es constante en wL; el diagrama de momento es parabólico desde 0 en el extremo hasta wL²/2 en el empotramiento.',
        ],
      },
      {
        heading: 'Qué observar con cargas uniformes en voladizos',
        paragraphs: [
          'Un voladizo con la misma carga total como carga en el extremo (wL = P) produce la mitad del momento en el empotramiento (wL²/2 vs PL) y 3/8 de la deflexión en el extremo (wL⁴/8EI vs PL³/3EI = wL⁴/3EI). Así que una carga en el extremo es una cota mucho más conservadora que una CDU para la misma carga total.',
          'Si la carga es triangular (0 en el extremo, w en el empotramiento), el momento en el empotramiento baja a wL²/6 y la deflexión del extremo a wL⁴/30EI: el caso triangular es menos exigente que ambos. La calculadora te permite arrastrar la forma de la carga para ver la transición.',
        ],
      },
      {
        heading: 'Calculadoras relacionadas',
        paragraphs: [
          'Compara con el caso de <a class="text-link hover:underline" href="/es/calculator/cantilever-tip-load">voladizo con carga en el extremo</a>. Para un voladizo con múltiples cargas o un apoyo elástico, usa la <a class="text-link hover:underline" href="/es/calculator/cantilever-beam-calculator">calculadora completa de viga en voladizo</a>.',
        ],
      },
    ],
    'cantilever-tip-load': [
      {
        heading: 'Cómo analizar un voladizo con carga puntual en el extremo',
        paragraphs: [
          'Esta página precarga un voladizo empotrado a la izquierda con una carga puntual en el extremo libre. Edita la longitud, la magnitud de la carga, la sección o el material directamente en la calculadora. Los resultados se actualizan al instante.',
          'Valores de libro de texto: reacción en el empotramiento R = P, momento en el empotramiento M = PL, deflexión en el extremo δ = PL³/(3EI). El cortante es constante en P en toda la longitud; el diagrama de momento es lineal desde 0 en el extremo hasta PL en el empotramiento.',
        ],
      },
      {
        heading: 'Qué observar con cargas en el extremo',
        paragraphs: [
          'Los valores a leer son la fuerza de reacción y el momento de empotramiento: juntos son exactamente lo que la ménsula, soldadura o empotramiento debe resistir. La deflexión en el extremo contra L/180 es la comprobación de servicio; ten en cuenta que para la misma carga total, una carga en el extremo deflecta 8/3 veces más que una carga uniforme, por lo que convertir una carga distribuida en un único valor en el extremo es conservador por un amplio margen pero útil como cota.',
          'Arrastra la carga hacia el interior de la viga y tanto el momento en el empotramiento como la deflexión en el extremo disminuyen lineal y cúbicamente respectivamente; una carga a tres cuartos de la longitud ya reduce a la mitad la demanda de momento en el empotramiento. Esa sensibilidad vale la pena aprovecharla cuando puedes posicionar una carga de ménsula cerca de su apoyo.',
        ],
      },
      {
        heading: 'Errores comunes con este caso',
        paragraphs: [
          'Modelar una carga genuinamente distribuida como una carga en el extremo «por seguridad» es defendible como cota pero puede ocultar dónde se encuentra la tensión máxima real cuando la carga se reparte a lo largo del elemento. Lo contrario es lo peligroso: modelar una carga concentrada como una CDU equivalente reduce a la mitad el momento aparente en el empotramiento y es no conservador. Segundo error: aplicar la fórmula de deflexión del extremo a una carga que no está en el extremo; la fórmula cerrada cambia, y arrastrar la carga en la calculadora muestra el valor corregido al instante.',
        ],
      },
    ],
    'fixed-fixed-udl': [
      {
        heading: 'Cómo analizar una viga biempotrada con carga uniforme',
        paragraphs: [
          'Esta página precarga una viga empotrada en ambos extremos con una carga distribuida uniforme en toda la luz. Edita la luz, la carga, la sección o el material directamente. Los resultados se actualizan al instante.',
          'Valores de libro de texto: reacciones R = wL/2 en cada extremo, momentos de empotramiento M = wL²/12 (negativos, contraflexión), momento en el centro M = wL²/24 (positivo, pandeo), deflexión en el centro δ = wL⁴/(384EI). El diagrama de momento es parabólico con contraflexión en los apoyos y pandeo en el centro.',
        ],
      },
      {
        heading: 'Qué observar con vigas biempotradas',
        paragraphs: [
          'Los momentos en los apoyos (wL²/12) son mayores en valor absoluto que el momento en el centro (wL²/24). El diseño se rige típicamente por el momento negativo en los apoyos: el ala superior está comprimida allí, por lo que el arriostramiento lateral-torsional del ala superior es crítico.',
          'Si el empotramiento no es perfecto (las conexiones reales tienen cierta flexibilidad), los momentos reales caen entre los casos biempotrado y simplemente apoyado. La calculadora completa permite modelar apoyos con rigidez rotacional para estudiar esto.',
        ],
      },
      {
        heading: 'Calculadoras relacionadas',
        paragraphs: [
          'Compara con la <a class="text-link hover:underline" href="/es/calculator/simply-supported-udl">simplemente apoyada con CDU</a> (sin momentos de empotramiento, 5× la deflexión en el centro). Para una viga biempotrada con carga puntual central, la calculadora completa puede modelarla: añade una carga puntual en el centro y empotramientos en ambos extremos.',
        ],
      },
    ],
    'overhanging-beam': [
      {
        heading: 'Cómo analizar una viga con voladizo y carga uniforme',
        paragraphs: [
          'Esta página precarga una viga con voladizo simétrica: apoyos a distancia a de cada extremo, carga uniforme w en toda la longitud L. Edita a, L, w, sección o material directamente. Los resultados se actualizan al instante.',
          'Las reacciones son simétricas: R = wL/2 en cada apoyo. El momento en los apoyos es M = −w·a²/2 (contraflexión). El momento positivo máximo en la luz depende de a/L; para voladizos pequeños está cerca del centro, para voladizos grandes se desplaza hacia los apoyos.',
        ],
      },
      {
        heading: 'Qué observar con vigas con voladizo',
        paragraphs: [
          'El momento en el apoyo es el criterio de diseño para voladizos pequeños (es el momento de conexión/empotramiento). Para voladizos grandes, el momento en la luz puede superar al momento en el apoyo. La calculadora reporta ambos para que puedas comprobar ambas ubicaciones.',
          'Los voladizos asimétricos (diferente a en cada lado) producen reacciones y momentos asimétricos: la calculadora completa los maneja: añade apoyos en posiciones arbitrarias y una CDU en toda la luz.',
        ],
      },
      {
        heading: 'Calculadoras relacionadas',
        paragraphs: [
          'Para un voladizo no simétrico o cargas múltiples, usa la <a class="text-link hover:underline" href="/es/calculator/overhanging-beam">calculadora completa de viga con voladizo</a> (la página variante). El caso <a class="text-link hover:underline" href="/es/calculator/continuous-two-span">continua de dos luces</a> es la extensión natural cuando el voladizo se apoya en su extremo, convirtiéndose en una viga continua de tres luces.',
        ],
      },
    ],
    'continuous-two-span': [
      {
        heading: 'Cómo analizar una viga continua con dos luces iguales',
        paragraphs: [
          'Esta página precarga una viga continua de dos luces: articulaciones en A, B, C; cada luz de longitud L; carga uniforme w en ambas luces. Edita L, w, sección o material directamente. Los resultados se actualizan al instante.',
          'Valores de libro de texto: reacciones R_A = R_C = 3wL/8, R_B = 10wL/8; momento negativo sobre B: M = wL²/8; momento positivo máximo en cada luz: M = 9wL²/128 en x = 5L/8 desde el apoyo exterior; deflexión ≈ 0,0054 wL⁴/EI por luz.',
        ],
      },
      {
        heading: 'Qué observar con vigas continuas',
        paragraphs: [
          'El apoyo interior B soporta 1,25× la carga total de una luz (10/8 vs 8/8 para un apoyo simple), y el momento negativo sobre B (wL²/8) es mayor en valor absoluto que el momento en el centro de una viga simplemente apoyada (wL²/8 vs wL²/8 — iguales aquí, pero para luces desiguales el momento interior domina).',
          'El momento positivo en el centro (9wL²/128 ≈ 0,07 wL²) es menor que el momento en el centro de una viga simplemente apoyada (wL²/8 = 0,125 wL²) porque la continuidad restringe la deflexión. Por eso las vigas continuas son más eficientes: menor momento en el centro para la misma luz.',
        ],
      },
      {
        heading: 'Errores comunes con vigas continuas',
        paragraphs: [
          'Analizar una viga continua como una serie de tramos simplemente apoyados pasa por alto el momento negativo sobre el apoyo interior: la conexión y el arriostramiento del ala superior allí son críticos. Asumir que la reacción del apoyo interior es simplemente wL (es 1,25 wL aquí, y puede ser mayor con luces desiguales). Olvidar que el asentamiento del apoyo interior redistribuye significativamente los momentos: la calculadora soporta asentamiento prescrito para estudiar esto.',
        ],
      },
    ],
    'gerber-hinge': [
      {
        heading: 'Cómo analizar una viga de Gerber con rótula interna',
        paragraphs: [
          'Esta página precarga una viga de dos luces con una rótula interna en la unión (liberación de momento). La luz izquierda está empotrada en A, articulada en B; la luz derecha está articulada en B, con rodillo en C. Carga uniforme w en ambas luces. Edita las luces, la carga, la sección o el material directamente.',
          'La rótula fuerza M = 0 en B. La luz izquierda es una viga empotrada-apoyada: la reacción en B es 3wL/8, el momento en A es wL²/8. La luz derecha es una viga simplemente apoyada: la reacción en C es 5wL/8. La rótula transmite cortante pero no momento.',
        ],
      },
      {
        heading: 'Para qué se usa una viga de Gerber',
        paragraphs: [
          'Una viga de Gerber convierte una viga continua estáticamente indeterminada en un sistema estáticamente determinado insertando una rótula. Esto simplifica la construcción (no se necesita conexión a momento en la rótula) y elimina la redistribución de momentos por asentamiento de apoyos. La contrapartida: el extremo empotrado de la luz izquierda sigue atrayendo un momento grande, y el detalle de la rótula debe transmitir cortante de forma fiable.',
          'La posición de la rótula se elige típicamente para que el momento positivo máximo en cada luz esté equilibrado (aquí en el centro de la luz derecha y en x ≈ 0,578L de la luz izquierda). La calculadora permite mover la rótula para encontrar la posición óptima.',
        ],
      },
      {
        heading: 'Errores comunes con vigas de Gerber',
        paragraphs: [
          'Olvidar que la rótula debe ser una verdadera liberación de momento: una conexión parcial que transmite algo de momento anula el propósito y crea un sistema indeterminado que se comporta de forma diferente. No comprobar la capacidad a cortante en la rótula: transmite el cortante completo de la luz. Y asumir que las luces pueden diseñarse independientemente: el cortante en la rótula es el mismo en ambos lados, por lo que la conexión debe diseñarse para el mayor de los dos cortantes de las luces.',
        ],
      },
    ],
  } as Record<CalculatorSlug, { heading: string; paragraphs: string[] }[]>,
  related: {} as Record<string, Record<string, string>>,
  ui: {
    eyebrowVariant: 'Calculadoras por tipo de viga',
    eyebrowPreset: 'Ejemplos resueltos',
    preloadedNote:
      'La calculadora de abajo está precargada; cambia cualquier valor y los resultados se actualizan al instante.',
    breadcrumbHome: 'Inicio',
    breadcrumbCalculators: 'Calculadoras',
    aboutThisCaseH2: 'Sobre este caso',
    eulerNote:
      'Todos los diagramas usan la teoría de vigas de Euler–Bernoulli con un solver exacto de elementos finitos que se ejecuta completamente en tu navegador. Puedes mover apoyos arrastrándolos, cambiar el sistema de unidades en la parte superior del panel de entrada y exportar resultados como CSV o informe imprimible.',
    formulasLinkText: 'Ver fórmulas de forma cerrada para este y otros casos similares →',
    relatedH2: 'Calculadoras relacionadas',
    relatedOutro:
      '¿Nuevo en los diagramas de esfuerzo cortante y momento flector? Empieza con la <a class="text-link hover:underline" href="/es/guide"> guía de DEC y DMF</a>, o lee <a class="text-link hover:underline" href="/es/about">cómo funciona esta calculadora</a>.',
    presetTitleSuffix: ' | Calculadora de vigas gratuita',
    presetDescSuffix: ' Calculadora de vigas online y gratuita con diagramas instantáneos de esfuerzo cortante, momento flector, pendiente y deflexión.',
    faqQuestionVariant: (h1: string) => `¿Cómo analizo una ${h1.toLowerCase()}?`,
    faqQuestionPreset: (name: string) => `¿Cómo analizo ${name.toLowerCase()}?`,
    faqAnswer:
      'Esta página precarga un modelo configurado en la calculadora de vigas. Edita posiciones y magnitudes directamente, o arrastra elementos en el diagrama. Los resultados se actualizan al instante en tu navegador.',
  },
};

export const es: LocaleCopy = {
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
