import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, HelpCircle, Users, ArrowRight, ExternalLink, CheckCircle, Clock, FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { ContactForm } from '../components/ContactForm';
import { QuoteButton, StickyQuoteButton } from '../components/QuoteButton';
import { TrustBadges } from '../components/TrustBadges';
import { ProcessTimelineCompact } from '../components/ProcessTimeline';
import { TestimonialsSection } from '../components/TestimonialCard';
import { WhyChooseUsCompact } from '../components/AboutSection';
import { useLanguage } from '../i18n';
import { Shield, ShieldAlert, ShieldCheck, Star } from 'lucide-react';
import {
  ShieldPlus,
  CircleCheckFilled,
  HeartIcon,
  FamilyIcon,
  DollarIcon,
  CalendarIcon,
  PhoneIcon
} from '../components/BrandIcons';

// Official Healthcare.gov portal URL
const HEALTHCARE_GOV_URL = "https://www.healthcare.gov/";
const OBAMACARE_QUOTE_URL = "https://www.healthcare.gov/see-plans/";
const HEALTHSHERPA_SELF_APPLY_URL = "https://www.healthsherpa.com/?_agent_id=javisinsuranceservices&ljs=es-MX";

// Healthcare.gov official blue color
const healthcareBlue = '#0071BC';

// Benefits: non-text fields only; translatable text lives in copy.benefits
const benefits = [
  { icon: HeartIcon },
  { icon: DollarIcon },
  { icon: FamilyIcon },
  { icon: ShieldPlus }
];

// Coverage tiers: non-text fields only; translatable text lives in copy.coverageTypes
const coverageTypes = [
  { name: "Bronze", coverage: "60%", icon: ShieldAlert },
  { name: "Silver", coverage: "70%", icon: Star, popular: true },
  { name: "Gold", coverage: "80%", icon: ShieldCheck },
  { name: "Platinum", coverage: "90%", icon: Shield }
];

const copy = {
  en: {
    // Top banner
    bannerLabel: "Official ACA Enrollment Assistance",
    bannerLink: "Visit HealthCare.gov",
    // Hero
    heroBadge: "Affordable Care Act (ACA) Enrollment",
    heroTitlePart1: "Get Covered with",
    heroTitleHighlight: "Health Insurance",
    heroSubtitle: "Quality health insurance through the ACA Marketplace. Our licensed agents help you find the perfect plan, maximize your subsidies, and enroll correctly at no cost to you.",
    applyOnline: "Apply Online Now",
    stat1Label: "Premium Plans Available",
    stat2Label: "Americans Enrolled",
    stat3Value: "Free",
    stat3Label: "Agent Assistance",
    floatingBadgeTitle: "Open Enrollment",
    floatingBadgeDate: "Nov 1 to Jan 15",
    officialPartner: "Official Partner",
    // Medicaid banner
    medicaidTitle: "Income Below Medicaid Limits?",
    medicaidText: "You may qualify for free Medicaid coverage instead. We can help you apply.",
    medicaidButton: "Check Medicaid Eligibility",
    // Important dates
    date1Title: "Open Enrollment",
    date1Value: "Nov 1 to Jan 15",
    date1Text: "The annual period when anyone can enroll in or change their health insurance plan.",
    date2Title: "Coverage Start",
    date2Value: "January 1, 2026",
    date2Text: "Enroll by December 15 for coverage starting January 1.",
    date3Title: "Special Enrollment",
    date3Value: "60 Days",
    date3Text: "Lost coverage? You have 60 days from your qualifying event to enroll.",
    // Benefits section
    benefitsBadge: "ACA Benefits",
    benefitsHeadingPart1: "Why Choose",
    benefitsHeadingHighlight: "Marketplace Coverage",
    benefitsHeadingPart2: "?",
    benefitsSubtitle: "The Affordable Care Act provides essential protections and comprehensive benefits for all Americans.",
    benefits: [
      { title: "Comprehensive Coverage", description: "All ACA plans must cover 10 Essential Health Benefits including hospitalization, prescription drugs, mental health services, and preventive care at no extra cost." },
      { title: "Financial Assistance", description: "Premium Tax Credits and Cost Sharing Reductions based on household income. Many families qualify for $0 premium plans or significant savings." },
      { title: "Family Protection", description: "Coverage for individuals, couples, and families of any size. Children can stay on parents' plans until age 26, regardless of student status or living situation." },
      { title: "Guaranteed Coverage", description: "No denial of coverage or higher rates due to preexisting conditions. Insurance companies cannot cancel your coverage if you get sick." }
    ],
    // Essential benefits section
    essentialBadge: "Required by Law",
    essentialHeading: "10 Essential Health Benefits",
    essentialIntro: "All ACA Marketplace plans must cover these essential health benefits. This ensures you get comprehensive coverage no matter which plan you choose.",
    essentialBenefits: [
      "Ambulatory patient services including outpatient care",
      "Emergency services",
      "Hospitalization",
      "Pregnancy, maternity, and newborn care",
      "Mental health and substance use disorder services",
      "Prescription drugs",
      "Rehabilitative services and devices",
      "Laboratory services",
      "Preventive and wellness services",
      "Pediatric services, including dental and vision"
    ],
    preventiveTitle: "Preventive Care at No Cost",
    preventiveIntro: "All Marketplace plans cover preventive services at no out-of-pocket cost when provided by an in-network provider:",
    preventiveItems: [
      "Annual wellness visits and check-ups",
      "Immunizations and vaccines",
      "Cancer screenings (mammograms, colonoscopies)",
      "Blood pressure and cholesterol tests",
      "Diabetes screenings",
      "Depression screenings",
      "Contraception and family planning"
    ],
    // Coverage tiers section
    tiersBadge: "Plan Options",
    tiersHeadingPart1: "Choose Your",
    tiersHeadingHighlight: "Coverage Level",
    tiersSubtitle: "Metal tiers help you balance monthly premiums with out-of-pocket costs. All tiers cover the same essential benefits.",
    mostPopular: "Most Popular",
    coversLabel: "Covers",
    planSuffix: "Plan",
    premiumCostLabel: "Premium Cost",
    outOfPocketLabel: "Out of Pocket",
    coverageTypes: [
      { premium: "Lowest", outOfPocket: "Highest", bestFor: "Low healthcare usage, want catastrophic protection. Good for healthy individuals who want basic coverage." },
      { premium: "Moderate", outOfPocket: "Moderate", bestFor: "Best value if you qualify for Cost Sharing Reductions (CSR). Most popular choice for subsidy eligible enrollees." },
      { premium: "Higher", outOfPocket: "Lower", bestFor: "Regular healthcare needs, predictable costs. Lower deductibles and copays for frequent doctor visits." },
      { premium: "Highest", outOfPocket: "Lowest", bestFor: "Frequent healthcare usage, chronic conditions. Highest premiums but lowest out of pocket costs when you need care." }
    ],
    compareLabel: "Compare on HealthCare.gov",
    tiersFootnote: "Apply directly through our partner portal or compare plans on HealthCare.gov.",
    // Process section
    processBadge: "Simple Process",
    processHeadingPart1: "How We",
    processHeadingHighlight: "Help You Enroll",
    processSubtitle: "Our licensed agents guide you through every step—completely free of charge.",
    // Why choose us
    whyBadge: "Why Choose Us",
    whyHeadingPart1: "Expert Guidance,",
    whyHeadingHighlight: "Zero Cost",
    whyIntro: "Navigating health insurance can be confusing. Our licensed agents make it simple—and our service is completely free to you.",
    // FAQ
    faqBadge: "FAQ",
    faqHeadingPart1: "Obamacare",
    faqHeadingHighlight: "Questions Answered",
    faqSubtitle: "Get answers to the most common questions about ACA Marketplace coverage.",
    faqs: [
      { q: "What is Obamacare / the Affordable Care Act (ACA)?", a: "The Affordable Care Act (ACA), commonly called Obamacare, is a comprehensive healthcare reform law passed in 2010. It created the Health Insurance Marketplace where individuals and families can shop for and purchase health insurance. The law requires all plans to cover 10 Essential Health Benefits, prohibits insurance companies from denying coverage due to preexisting conditions, and provides financial assistance to help make coverage affordable." },
      { q: "When is Open Enrollment for 2026 coverage?", a: "Open Enrollment for 2026 health coverage runs from November 1, 2025 through January 15, 2026. If you enroll by December 15, your coverage starts January 1. If you enroll between December 16 and January 15, your coverage starts February 1. Outside of Open Enrollment, you may qualify for a Special Enrollment Period if you experience certain life events like losing other coverage, getting married, having a baby, or moving to a new area." },
      { q: "How do I know if I qualify for financial assistance?", a: "You may qualify for Premium Tax Credits if your household income is between 100% and 400% of the Federal Poverty Level (FPL). For 2026, the enhanced subsidies from the American Rescue Plan continue, meaning even those above 400% FPL may qualify for help. Cost Sharing Reductions (CSR) are available for those with income between 100 to 250% FPL who choose Silver plans. Our licensed agents can help you determine your eligibility and maximize your savings." },
      { q: "What's the difference between Bronze, Silver, Gold, and Platinum plans?", a: "These 'metal tiers' indicate how you and your plan share costs. Bronze plans have the lowest monthly premiums but highest out of pocket costs when you need care (60/40 split). Silver plans are moderate (70/30 split) and are the only plans eligible for Cost Sharing Reductions. Gold plans have higher premiums but lower costs at the doctor (80/20 split). Platinum plans have the highest premiums but lowest out of pocket costs (90/10 split). All tiers cover the same essential benefits." },
      { q: "What are the 10 Essential Health Benefits?", a: "By law, all ACA Marketplace plans must cover: 1) Outpatient care, 2) Emergency services, 3) Hospitalization, 4) Maternity and newborn care, 5) Mental health and substance abuse services, 6) Prescription drugs, 7) Rehabilitative services, 8) Lab tests, 9) Preventive care and chronic disease management, and 10) Pediatric services including dental and vision for children. Preventive services like vaccines, screenings, and check-ups are covered at no cost to you." },
      { q: "Can I keep my current doctor with an ACA plan?", a: "It depends on the plan's provider network. Before enrolling, you should check if your preferred doctors, specialists, and hospitals are in the plan's network. Our agents help you verify provider participation before you enroll. Many plans offer broad networks, and you can also choose PPO plans that allow out of network care at a higher cost." },
      { q: "What happens if I don't have health insurance?", a: "While the federal individual mandate penalty was reduced to $0 in 2019, some states (California, Massachusetts, New Jersey, Rhode Island, Vermont, and DC) have their own mandates with penalties for being uninsured. More importantly, being uninsured means you're responsible for 100% of medical costs, which can lead to significant debt from unexpected illness or injury. Having coverage protects both your health and finances." },
      { q: "How does Javi's Insurance help with enrollment?", a: "As licensed health insurance agents, we provide free, personalized assistance throughout the enrollment process. We help you understand your options, compare plans from multiple insurers, determine your subsidy eligibility, and complete your application correctly. Our service costs you nothing because we're compensated by insurance companies, and you pay the same rates as going direct. We also provide year round support for questions about your coverage." },
      { q: "What's the difference between Obamacare and Medicaid?", a: "Obamacare (ACA Marketplace) plans are private health insurance for individuals and families who don't have coverage through an employer. You pay monthly premiums, though subsidies may reduce or eliminate this cost. Medicaid is a government program providing free or very low cost coverage to people with limited income. If your income is below 138% FPL in expansion states, you may qualify for Medicaid instead of Marketplace coverage. We can help determine which program is right for you." },
      { q: "Can I get coverage if I'm self employed or unemployed?", a: "Yes! The ACA Marketplace is ideal for self employed individuals, freelancers, gig workers, and those between jobs. If you've lost employer coverage (COBRA is often expensive), you qualify for a Special Enrollment Period. Self employed individuals can deduct their health insurance premiums as a business expense. Many self employed people qualify for significant subsidies based on their projected annual income." }
    ],
    needInfoTitle: "Need More Information?",
    needInfoText: "Visit the official HealthCare.gov website for additional resources, plan details, and enrollment assistance.",
    visitHealthcare: "Visit HealthCare.gov",
    // CTA banner
    ctaTitle: "Ready to Get Covered?",
    ctaText: "Get a free quote in minutes. Our licensed agents are here to help.",
    callUs: "Call Us",
    // Contact section
    contactBadge: "Contact Us",
    contactHeadingPart1: "Need Help",
    contactHeadingHighlight: "Enrolling",
    contactHeadingPart2: "?",
    contactIntro: "Have questions about ACA enrollment or eligibility? Our licensed insurance agents are here to help you find the best coverage for your needs—at no cost to you.",
    contactItem1Title: "Open Enrollment Period",
    contactItem1Text: "November 1, 2025 to January 15, 2026. Don't miss your chance to enroll!",
    contactItem2Title: "Subsidies & Tax Credits",
    contactItem2Text: "Most families qualify for financial assistance to reduce monthly premiums.",
    contactItem3Title: "Free Consultation",
    contactItem3Text: "Speak with a licensed agent at no cost. We're paid by insurers, not you.",
    resourcesTitle: "Official Government Resources",
    resource1Title: "HealthCare.gov",
    resource1Sub: "Official ACA Marketplace",
    resource2Title: "Preview Plans & Prices",
    resource2Sub: "See available coverage options",
    resource3Title: "Check Subsidy Eligibility",
    resource3Sub: "See if you qualify for financial help",
    formTitle: "Request Free Enrollment Assistance",
    formSubtitle: "Fill out the form and a licensed agent will contact you within 24 hours.",
  },
  es: {
    // Top banner
    bannerLabel: "Asistencia Oficial de Inscripción al ACA",
    bannerLink: "Visite HealthCare.gov",
    // Hero
    heroBadge: "Inscripción a la Ley del Cuidado de Salud (ACA)",
    heroTitlePart1: "Obtenga Cobertura con",
    heroTitleHighlight: "Seguro de Salud",
    heroSubtitle: "Seguro de salud de calidad a través del Mercado del ACA. Nuestros agentes con licencia le ayudan a encontrar el plan perfecto, maximizar sus subsidios e inscribirse correctamente sin costo alguno para usted.",
    applyOnline: "Solicite en Línea Ahora",
    stat1Label: "Planes Disponibles",
    stat2Label: "Estadounidenses Inscritos",
    stat3Value: "Gratis",
    stat3Label: "Asistencia de Agente",
    floatingBadgeTitle: "Inscripción Abierta",
    floatingBadgeDate: "1 de Nov al 15 de Ene",
    officialPartner: "Socio Oficial",
    // Medicaid banner
    medicaidTitle: "¿Ingresos por Debajo de los Límites de Medicaid?",
    medicaidText: "Podría calificar para cobertura gratuita de Medicaid. Podemos ayudarle a solicitarla.",
    medicaidButton: "Verifique su Elegibilidad para Medicaid",
    // Important dates
    date1Title: "Inscripción Abierta",
    date1Value: "1 de Nov al 15 de Ene",
    date1Text: "El período anual en que cualquier persona puede inscribirse o cambiar su plan de seguro de salud.",
    date2Title: "Inicio de Cobertura",
    date2Value: "1 de Enero de 2026",
    date2Text: "Inscríbase antes del 15 de diciembre para que su cobertura comience el 1 de enero.",
    date3Title: "Inscripción Especial",
    date3Value: "60 Días",
    date3Text: "¿Perdió su cobertura? Tiene 60 días desde su evento calificador para inscribirse.",
    // Benefits section
    benefitsBadge: "Beneficios del ACA",
    benefitsHeadingPart1: "¿Por Qué Elegir la",
    benefitsHeadingHighlight: "Cobertura del Mercado",
    benefitsHeadingPart2: "?",
    benefitsSubtitle: "La Ley del Cuidado de Salud a Bajo Precio ofrece protecciones esenciales y beneficios integrales para todos los estadounidenses.",
    benefits: [
      { title: "Cobertura Integral", description: "Todos los planes del ACA deben cubrir los 10 Beneficios de Salud Esenciales, incluyendo hospitalización, medicamentos recetados, servicios de salud mental y atención preventiva sin costo adicional." },
      { title: "Asistencia Financiera", description: "Créditos Tributarios para Primas y Reducciones de Costos Compartidos según el ingreso del hogar. Muchas familias califican para planes con prima de $0 o ahorros significativos." },
      { title: "Protección Familiar", description: "Cobertura para individuos, parejas y familias de cualquier tamaño. Los hijos pueden permanecer en el plan de sus padres hasta los 26 años, sin importar si estudian o dónde vivan." },
      { title: "Cobertura Garantizada", description: "No se niega cobertura ni se cobran tarifas más altas por condiciones preexistentes. Las aseguradoras no pueden cancelar su cobertura si usted se enferma." }
    ],
    // Essential benefits section
    essentialBadge: "Exigido por Ley",
    essentialHeading: "10 Beneficios de Salud Esenciales",
    essentialIntro: "Todos los planes del Mercado del ACA deben cubrir estos beneficios de salud esenciales. Esto garantiza que usted obtenga cobertura integral sin importar el plan que elija.",
    essentialBenefits: [
      "Servicios ambulatorios, incluyendo atención externa",
      "Servicios de emergencia",
      "Hospitalización",
      "Atención de embarazo, maternidad y recién nacido",
      "Servicios de salud mental y trastornos por consumo de sustancias",
      "Medicamentos recetados",
      "Servicios y dispositivos de rehabilitación",
      "Servicios de laboratorio",
      "Servicios preventivos y de bienestar",
      "Servicios pediátricos, incluyendo dental y visión"
    ],
    preventiveTitle: "Atención Preventiva sin Costo",
    preventiveIntro: "Todos los planes del Mercado cubren servicios preventivos sin costo de bolsillo cuando los presta un proveedor dentro de la red:",
    preventiveItems: [
      "Visitas anuales de bienestar y chequeos",
      "Inmunizaciones y vacunas",
      "Exámenes de detección de cáncer (mamografías, colonoscopias)",
      "Pruebas de presión arterial y colesterol",
      "Exámenes de detección de diabetes",
      "Exámenes de detección de depresión",
      "Anticonceptivos y planificación familiar"
    ],
    // Coverage tiers section
    tiersBadge: "Opciones de Plan",
    tiersHeadingPart1: "Elija su",
    tiersHeadingHighlight: "Nivel de Cobertura",
    tiersSubtitle: "Los niveles metálicos le ayudan a equilibrar las primas mensuales con los costos de bolsillo. Todos los niveles cubren los mismos beneficios esenciales.",
    mostPopular: "Más Popular",
    coversLabel: "Cubre",
    planSuffix: "Plan",
    premiumCostLabel: "Costo de Prima",
    outOfPocketLabel: "Gastos de Bolsillo",
    coverageTypes: [
      { premium: "Más Bajo", outOfPocket: "Más Alto", bestFor: "Bajo uso de servicios médicos, desea protección ante catástrofes. Ideal para personas sanas que quieren cobertura básica." },
      { premium: "Moderado", outOfPocket: "Moderado", bestFor: "El mejor valor si califica para Reducciones de Costos Compartidos (CSR). La opción más popular entre quienes son elegibles para subsidios." },
      { premium: "Más Alto", outOfPocket: "Más Bajo", bestFor: "Necesidades médicas regulares, costos predecibles. Deducibles y copagos más bajos para visitas frecuentes al médico." },
      { premium: "El Más Alto", outOfPocket: "El Más Bajo", bestFor: "Uso frecuente de servicios médicos, condiciones crónicas. Las primas más altas pero los menores gastos de bolsillo cuando necesita atención." }
    ],
    compareLabel: "Compare en HealthCare.gov",
    tiersFootnote: "Solicite directamente a través de nuestro portal asociado o compare planes en HealthCare.gov.",
    // Process section
    processBadge: "Proceso Sencillo",
    processHeadingPart1: "Cómo lo",
    processHeadingHighlight: "Ayudamos a Inscribirse",
    processSubtitle: "Nuestros agentes con licencia lo guían en cada paso, totalmente sin costo.",
    // Why choose us
    whyBadge: "Por Qué Elegirnos",
    whyHeadingPart1: "Orientación Experta,",
    whyHeadingHighlight: "Sin Costo",
    whyIntro: "Entender el seguro de salud puede ser confuso. Nuestros agentes con licencia lo hacen sencillo, y nuestro servicio es completamente gratuito para usted.",
    // FAQ
    faqBadge: "Preguntas Frecuentes",
    faqHeadingPart1: "Preguntas sobre",
    faqHeadingHighlight: "Obamacare Respondidas",
    faqSubtitle: "Obtenga respuestas a las preguntas más comunes sobre la cobertura del Mercado del ACA.",
    faqs: [
      { q: "¿Qué es Obamacare / la Ley del Cuidado de Salud a Bajo Precio (ACA)?", a: "La Ley del Cuidado de Salud a Bajo Precio (ACA), comúnmente llamada Obamacare, es una ley integral de reforma de salud aprobada en 2010. Creó el Mercado de Seguros de Salud donde las personas y familias pueden comparar y comprar seguro de salud. La ley exige que todos los planes cubran los 10 Beneficios de Salud Esenciales, prohíbe a las aseguradoras negar cobertura por condiciones preexistentes y ofrece asistencia financiera para hacer la cobertura más accesible." },
      { q: "¿Cuándo es la Inscripción Abierta para la cobertura de 2026?", a: "La Inscripción Abierta para la cobertura de salud de 2026 va del 1 de noviembre de 2025 al 15 de enero de 2026. Si se inscribe antes del 15 de diciembre, su cobertura comienza el 1 de enero. Si se inscribe entre el 16 de diciembre y el 15 de enero, su cobertura comienza el 1 de febrero. Fuera de la Inscripción Abierta, podría calificar para un Período de Inscripción Especial si experimenta ciertos eventos de vida como perder otra cobertura, casarse, tener un bebé o mudarse a una nueva área." },
      { q: "¿Cómo sé si califico para asistencia financiera?", a: "Podría calificar para Créditos Tributarios para Primas si el ingreso de su hogar está entre el 100% y el 400% del Nivel Federal de Pobreza (FPL). Para 2026 continúan los subsidios ampliados del Plan de Rescate Estadounidense, lo que significa que incluso quienes superan el 400% del FPL podrían recibir ayuda. Las Reducciones de Costos Compartidos (CSR) están disponibles para quienes tienen ingresos entre el 100% y el 250% del FPL y eligen planes Silver. Nuestros agentes con licencia pueden ayudarle a determinar su elegibilidad y maximizar sus ahorros." },
      { q: "¿Cuál es la diferencia entre los planes Bronze, Silver, Gold y Platinum?", a: "Estos 'niveles metálicos' indican cómo usted y su plan comparten los costos. Los planes Bronze tienen las primas mensuales más bajas pero los mayores gastos de bolsillo cuando necesita atención (división 60/40). Los planes Silver son moderados (división 70/30) y son los únicos elegibles para Reducciones de Costos Compartidos. Los planes Gold tienen primas más altas pero costos más bajos en el consultorio (división 80/20). Los planes Platinum tienen las primas más altas pero los menores gastos de bolsillo (división 90/10). Todos los niveles cubren los mismos beneficios esenciales." },
      { q: "¿Cuáles son los 10 Beneficios de Salud Esenciales?", a: "Por ley, todos los planes del Mercado del ACA deben cubrir: 1) Atención externa, 2) Servicios de emergencia, 3) Hospitalización, 4) Atención de maternidad y recién nacido, 5) Servicios de salud mental y consumo de sustancias, 6) Medicamentos recetados, 7) Servicios de rehabilitación, 8) Pruebas de laboratorio, 9) Atención preventiva y manejo de enfermedades crónicas, y 10) Servicios pediátricos incluyendo dental y visión para niños. Los servicios preventivos como vacunas, exámenes de detección y chequeos están cubiertos sin costo para usted." },
      { q: "¿Puedo mantener a mi médico actual con un plan del ACA?", a: "Depende de la red de proveedores del plan. Antes de inscribirse, debe verificar si sus médicos, especialistas y hospitales preferidos están dentro de la red del plan. Nuestros agentes le ayudan a confirmar la participación de los proveedores antes de inscribirse. Muchos planes ofrecen redes amplias, y también puede elegir planes PPO que permiten atención fuera de la red a un costo mayor." },
      { q: "¿Qué pasa si no tengo seguro de salud?", a: "Aunque la multa del mandato individual federal se redujo a $0 en 2019, algunos estados (California, Massachusetts, Nueva Jersey, Rhode Island, Vermont y DC) tienen sus propios mandatos con multas por no estar asegurado. Más importante aún, no tener seguro significa que usted es responsable del 100% de los costos médicos, lo que puede generar deudas significativas por una enfermedad o lesión inesperada. Tener cobertura protege tanto su salud como sus finanzas." },
      { q: "¿Cómo ayuda Javi's Insurance con la inscripción?", a: "Como agentes de seguros de salud con licencia, brindamos asistencia gratuita y personalizada durante todo el proceso de inscripción. Le ayudamos a entender sus opciones, comparar planes de varias aseguradoras, determinar su elegibilidad para subsidios y completar su solicitud correctamente. Nuestro servicio no le cuesta nada porque las aseguradoras nos compensan, y usted paga las mismas tarifas que si fuera directamente. También ofrecemos apoyo durante todo el año para preguntas sobre su cobertura." },
      { q: "¿Cuál es la diferencia entre Obamacare y Medicaid?", a: "Los planes de Obamacare (Mercado del ACA) son seguros de salud privados para personas y familias que no tienen cobertura a través de un empleador. Usted paga primas mensuales, aunque los subsidios pueden reducir o eliminar este costo. Medicaid es un programa del gobierno que ofrece cobertura gratuita o de muy bajo costo a personas con ingresos limitados. Si su ingreso está por debajo del 138% del FPL en los estados de expansión, podría calificar para Medicaid en lugar de la cobertura del Mercado. Podemos ayudarle a determinar qué programa es el adecuado para usted." },
      { q: "¿Puedo obtener cobertura si trabajo por cuenta propia o estoy desempleado?", a: "¡Sí! El Mercado del ACA es ideal para trabajadores por cuenta propia, freelancers, trabajadores temporales y quienes están entre empleos. Si perdió la cobertura de su empleador (COBRA suele ser costoso), califica para un Período de Inscripción Especial. Los trabajadores por cuenta propia pueden deducir sus primas de seguro de salud como gasto de negocio. Muchos trabajadores por cuenta propia califican para subsidios significativos según su ingreso anual proyectado." }
    ],
    needInfoTitle: "¿Necesita Más Información?",
    needInfoText: "Visite el sitio web oficial de HealthCare.gov para obtener recursos adicionales, detalles de planes y asistencia para inscribirse.",
    visitHealthcare: "Visite HealthCare.gov",
    // CTA banner
    ctaTitle: "¿Listo para Obtener Cobertura?",
    ctaText: "Obtenga una cotización gratis en minutos. Nuestros agentes con licencia están aquí para ayudarle.",
    callUs: "Llámenos",
    // Contact section
    contactBadge: "Contáctenos",
    contactHeadingPart1: "¿Necesita Ayuda para",
    contactHeadingHighlight: "Inscribirse",
    contactHeadingPart2: "?",
    contactIntro: "¿Tiene preguntas sobre la inscripción o elegibilidad del ACA? Nuestros agentes de seguros con licencia están aquí para ayudarle a encontrar la mejor cobertura para sus necesidades, sin costo alguno para usted.",
    contactItem1Title: "Período de Inscripción Abierta",
    contactItem1Text: "Del 1 de noviembre de 2025 al 15 de enero de 2026. ¡No pierda su oportunidad de inscribirse!",
    contactItem2Title: "Subsidios y Créditos Tributarios",
    contactItem2Text: "La mayoría de las familias califican para asistencia financiera que reduce las primas mensuales.",
    contactItem3Title: "Consulta Gratuita",
    contactItem3Text: "Hable con un agente con licencia sin costo. Nos pagan las aseguradoras, no usted.",
    resourcesTitle: "Recursos Oficiales del Gobierno",
    resource1Title: "HealthCare.gov",
    resource1Sub: "Mercado Oficial del ACA",
    resource2Title: "Vea Planes y Precios",
    resource2Sub: "Conozca las opciones de cobertura disponibles",
    resource3Title: "Verifique su Elegibilidad para Subsidios",
    resource3Sub: "Vea si califica para ayuda financiera",
    formTitle: "Solicite Asistencia de Inscripción Gratuita",
    formSubtitle: "Complete el formulario y un agente con licencia se comunicará con usted dentro de 24 horas.",
  },
};

export const ObamacarePage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const { language } = useLanguage();
  const c = copy[language];
  const faqs = c.faqs;

  return (
    <div className="min-h-screen bg-cream font-sans text-text-main overflow-x-hidden">
      <Navbar />

      {/* Official Portal Banner */}
      <div className="bg-[#0071BC] text-white py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-sm font-medium">{c.bannerLabel}</span>
          <a
            href={HEALTHCARE_GOV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-bold underline hover:text-white/90"
          >
            {c.bannerLink} <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
        {/* Background with decorative color hues */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0071BC]/5 via-transparent to-[#0071BC]/10 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-dots-pattern -z-10 opacity-20" />

        {/* Decorative color orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#0071BC]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-bright-red/5 rounded-full blur-2xl -z-10" />

        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 lg:w-1/2"
          >
            <span className="badge-trust border-[#0071BC]">
              <ShieldPlus size={16} className="text-[#0071BC]" />
              {c.heroBadge}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
              {c.heroTitlePart1}{' '}
              <span style={{ color: healthcareBlue }}>{c.heroTitleHighlight}</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-muted max-w-lg leading-relaxed">
              {c.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href={HEALTHSHERPA_SELF_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <FileText size={20} />
                {c.applyOnline}
              </a>
              <a
                href="tel:305-390-8679"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <PhoneIcon size={20} className="text-current" />
                (305) 390-8679
              </a>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-8 pt-6 w-full">
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: healthcareBlue }}>$0</div>
                <div className="text-[10px] sm:text-sm text-text-muted leading-tight mt-1">{c.stat1Label}</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-silver/50" />
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: healthcareBlue }}>21M+</div>
                <div className="text-[10px] sm:text-sm text-text-muted leading-tight mt-1">{c.stat2Label}</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-silver/50" />
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: healthcareBlue }}>{c.stat3Value}</div>
                <div className="text-[10px] sm:text-sm text-text-muted leading-tight mt-1">{c.stat3Label}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative lg:w-1/2 w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0071BC]/10 to-[#0071BC]/20 rounded-[2rem] lg:rounded-[3rem] transform rotate-2" />
            <img
              src="/images/obamacare-hero.png"
              alt="Family reviewing health insurance options together"
              className="relative rounded-[2rem] lg:rounded-[3rem] shadow-premium w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
            />

            {/* Floating Badge */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-4 md:-bottom-6 left-2 md:-left-6 glass p-3 md:p-5 rounded-2xl shadow-premium border border-white/50 max-w-[85%] sm:max-w-none"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex-shrink-0 w-10 md:w-12 h-10 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CircleCheckFilled size={20} className="text-green-600 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm md:text-base truncate" style={{ color: healthcareBlue }}>{c.floatingBadgeTitle}</div>
                  <div className="text-xs md:text-sm text-text-muted truncate">{c.floatingBadgeDate}</div>
                </div>
              </div>
            </motion.div>

            {/* Healthcare.gov Badge */}
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-2 md:-top-4 right-2 md:-right-4 bg-white p-3 md:p-4 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="text-[10px] md:text-xs font-bold text-gray-500 mb-1">{c.officialPartner}</div>
              <div className="font-bold text-sm md:text-base" style={{ color: healthcareBlue }}>HealthCare.gov</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white py-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <TrustBadges variant="compact" />
        </div>
      </div>

      {/* Medicaid Redirect Banner */}
      <section className="bg-gradient-to-r from-[#00796B]/10 to-[#4DB6AC]/10 py-6 border-b border-[#00796B]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00796B] rounded-full flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#004D40]">{c.medicaidTitle}</h3>
                <p className="text-sm text-gray-600">{c.medicaidText}</p>
              </div>
            </div>
            <Link
              to="/medicaid"
              className="inline-flex items-center gap-2 bg-[#00796B] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#004D40] transition-colors"
            >
              {c.medicaidButton}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Important Dates Section */}
      <section className="py-12 bg-[#0071BC]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={24} className="text-[#0071BC]" />
                <h3 className="font-bold text-lg">{c.date1Title}</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-[#0071BC]">{c.date1Value}</p>
              <p className="text-sm text-text-muted">{c.date1Text}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <CalendarIcon size={24} className="text-[#0071BC]" />
                <h3 className="font-bold text-lg">{c.date2Title}</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-[#0071BC]">{c.date2Value}</p>
              <p className="text-sm text-text-muted">{c.date2Text}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={24} className="text-[#0071BC]" />
                <h3 className="font-bold text-lg">{c.date3Title}</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-[#0071BC]">{c.date3Value}</p>
              <p className="text-sm text-text-muted">{c.date3Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-trust mb-4">{c.benefitsBadge}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              {c.benefitsHeadingPart1} <span style={{ color: healthcareBlue }}>{c.benefitsHeadingHighlight}</span>{c.benefitsHeadingPart2}
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {c.benefitsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-8 text-center group"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 bg-[#0071BC]/10">
                  <benefit.icon size={32} className="text-[#0071BC]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{c.benefits[i].title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{c.benefits[i].description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Essential Health Benefits */}
      <section className="section-padding" style={{ backgroundColor: `${healthcareBlue}08` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-trust mb-4">{c.essentialBadge}</span>
              <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                {c.essentialHeading}
              </h2>
              <p className="text-text-muted text-lg mb-8 leading-relaxed">
                {c.essentialIntro}
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {c.essentialBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} style={{ color: healthcareBlue }} className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: healthcareBlue }}>{c.preventiveTitle}</h3>
              <p className="text-text-muted mb-6">
                {c.preventiveIntro}
              </p>
              <ul className="space-y-3 text-sm">
                {c.preventiveItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Tiers */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-trust mb-4">{c.tiersBadge}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              {c.tiersHeadingPart1} <span style={{ color: healthcareBlue }}>{c.tiersHeadingHighlight}</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {c.tiersSubtitle}
            </p>
          </motion.div>

          <div className="flex overflow-x-auto pb-12 pt-4 -mx-6 px-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:py-0 md:mx-0 md:px-0 gap-6 custom-scrollbar">
            {coverageTypes.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative w-[85vw] sm:w-[320px] shrink-0 snap-center md:w-auto p-8 rounded-[2rem] border transition-all duration-300 ${tier.popular
                  ? 'text-white border-transparent shadow-[0_20px_40px_-15px_rgba(0,113,188,0.4)] md:-translate-y-4'
                  : 'bg-white text-text-main border-gray-100 hover:border-[#0071BC]/30 hover:shadow-card-hover'
                  }`}
                style={tier.popular ? { backgroundColor: healthcareBlue } : {}}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    {c.mostPopular}
                  </div>
                )}

                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tier.popular ? 'bg-white/10 text-white' : ''}`}
                    style={!tier.popular ? { backgroundColor: `${healthcareBlue}10`, color: healthcareBlue } : {}}
                  >
                    <tier.icon strokeWidth={2} size={28} />
                  </div>
                  <div className={`text-right ${tier.popular ? 'text-white/80' : 'text-text-muted'} text-sm font-medium`}>
                    {c.coversLabel}<br />
                    <span className={`text-xl font-bold ${tier.popular ? 'text-white' : ''}`} style={!tier.popular ? { color: healthcareBlue } : {}}>{tier.coverage}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-6">{tier.name} {c.planSuffix}</h3>

                <div className="space-y-4 mb-8">
                  <div className={`flex justify-between items-center py-3 border-b ${tier.popular ? 'border-white/10' : 'border-gray-50'}`}>
                    <span className={`text-sm ${tier.popular ? 'text-white/80' : 'text-text-muted'}`}>{c.premiumCostLabel}</span>
                    <span className="font-bold">{c.coverageTypes[i].premium}</span>
                  </div>
                  <div className={`flex justify-between items-center py-3 border-b ${tier.popular ? 'border-white/10' : 'border-gray-50'}`}>
                    <span className={`text-sm ${tier.popular ? 'text-white/80' : 'text-text-muted'}`}>{c.outOfPocketLabel}</span>
                    <span className="font-bold">{c.coverageTypes[i].outOfPocket}</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl text-sm leading-relaxed ${tier.popular ? 'bg-white/5 text-white/90' : 'bg-gray-50 text-text-muted'}`}>
                  {c.coverageTypes[i].bestFor}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={HEALTHSHERPA_SELF_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-bright-red text-white px-8 py-4 rounded-full font-bold hover:bg-bright-red/90 transition-colors shadow-lg"
              >
                <FileText size={20} />
                {c.applyOnline}
              </a>
              <QuoteButton
                href={OBAMACARE_QUOTE_URL}
                label={c.compareLabel}
                variant="secondary"
                size="large"
              />
            </div>
            <p className="text-sm text-text-muted">
              {c.tiersFootnote}
            </p>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding" style={{ backgroundColor: `${healthcareBlue}05` }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-trust mb-4">{c.processBadge}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              {c.processHeadingPart1} <span style={{ color: healthcareBlue }}>{c.processHeadingHighlight}</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {c.processSubtitle}
            </p>
          </motion.div>
          <ProcessTimelineCompact product="obamacare" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-trust mb-4">{c.whyBadge}</span>
              <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                {c.whyHeadingPart1} <span style={{ color: healthcareBlue }}>{c.whyHeadingHighlight}</span>
              </h2>
              <p className="text-text-muted text-lg mb-8">
                {c.whyIntro}
              </p>
              <WhyChooseUsCompact />

            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/couple-with-agent.png"
                alt="Insurance agent helping customers understand their options"
                className="rounded-3xl shadow-premium w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-trust mb-4">{c.faqBadge}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              {c.faqHeadingPart1} <span className="text-gradient-secondary">{c.faqHeadingHighlight}</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {c.faqSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              faqs.slice(0, Math.ceil(faqs.length / 2)),
              faqs.slice(Math.ceil(faqs.length / 2))
            ].map((col, colIdx) => (
              <div key={colIdx} className="space-y-4">
                {col.map((faq, i) => {
                  const actualIndex = colIdx === 0 ? i : i + Math.ceil(faqs.length / 2);
                  return (
                    <motion.div
                      key={actualIndex}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: actualIndex * 0.05 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === actualIndex ? -1 : actualIndex)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 text-deep-blue flex-shrink-0" />
                          <span className="font-bold text-text-main pr-4">{faq.q}</span>
                        </div>
                        <ChevronDown
                          className={`transition-transform duration-300 flex-shrink-0 text-deep-blue ${openFaq === actualIndex ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === actualIndex ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-text-muted leading-relaxed pl-8">{faq.a}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Official HealthCare.gov Button */}
          <div className="mt-12 bg-[#0071BC]/5 rounded-2xl p-8 border border-[#0071BC]/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{c.needInfoTitle}</h4>
                <p className="text-gray-500">{c.needInfoText}</p>
              </div>
              <a
                href="https://www.healthcare.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0071BC] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#005a96] transition-colors shadow-lg whitespace-nowrap"
              >
                <ExternalLink size={18} />
                {c.visitHealthcare}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection filter="obamacare" />

      {/* CTA Banner */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, ${healthcareBlue} 0%, #005a96 100%)` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">{c.ctaTitle}</h3>
              <p className="text-white/80">{c.ctaText}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={HEALTHSHERPA_SELF_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-deep-blue px-6 py-3 rounded-full font-bold hover:bg-cream transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText size={20} />
                {c.applyOnline}
              </a>
              <a
                href="tel:305-390-8679"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <PhoneIcon size={20} />
                {c.callUs}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-trust mb-4">{c.contactBadge}</span>
              <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                {c.contactHeadingPart1} <span style={{ color: healthcareBlue }}>{c.contactHeadingHighlight}</span>{c.contactHeadingPart2}
              </h2>
              <p className="text-text-muted text-lg mb-8">
                {c.contactIntro}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#0071BC]/10">
                    <CalendarIcon size={24} className="text-[#0071BC]" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{c.contactItem1Title}</h4>
                    <p className="text-text-muted text-sm">{c.contactItem1Text}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#0071BC]/10">
                    <DollarIcon size={24} className="text-[#0071BC]" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{c.contactItem2Title}</h4>
                    <p className="text-text-muted text-sm">{c.contactItem2Text}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#0071BC]/10">
                    <PhoneIcon size={24} className="text-[#0071BC]" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{c.contactItem3Title}</h4>
                    <p className="text-text-muted text-sm">{c.contactItem3Text}</p>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="mt-8 p-6 bg-[#0071BC]/5 rounded-xl border border-[#0071BC]/20">
                <h4 className="font-bold mb-4 text-gray-800">{c.resourcesTitle}</h4>
                <div className="space-y-3">
                  <a
                    href="https://www.healthcare.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#0071BC] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#0071BC] rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#0071BC]">{c.resource1Title}</div>
                      <div className="text-xs text-gray-500">{c.resource1Sub}</div>
                    </div>
                  </a>
                  <a
                    href="https://www.healthcare.gov/see-plans/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#0071BC] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#0071BC]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#0071BC]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#0071BC]">{c.resource2Title}</div>
                      <div className="text-xs text-gray-500">{c.resource2Sub}</div>
                    </div>
                  </a>
                  <a
                    href="https://www.healthcare.gov/income-and-household-information/how-to-report/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#0071BC] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#0071BC]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#0071BC]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#0071BC]">{c.resource3Title}</div>
                      <div className="text-xs text-gray-500">{c.resource3Sub}</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            <ContactForm
              productType="obamacare"
              title={c.formTitle}
              subtitle={c.formSubtitle}
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Sticky Mobile Quote Button */}
      <StickyQuoteButton href={HEALTHSHERPA_SELF_APPLY_URL} />
    </div>
  );
};
