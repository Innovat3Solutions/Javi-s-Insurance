import { motion } from 'motion/react';
import { useState } from 'react';
import { Eye, HelpCircle, ChevronDown, ArrowRight, Users, ExternalLink, CheckCircle, Clock, FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { ContactForm } from '../components/ContactForm';
import { QuoteButton, StickyQuoteButton } from '../components/QuoteButton';
import { TrustBadges } from '../components/TrustBadges';
import { ProcessTimelineCompact } from '../components/ProcessTimeline';
import { TestimonialsSection } from '../components/TestimonialCard';
import { WhyChooseUsCompact } from '../components/AboutSection';
import { InsuranceCarousel } from '../components/InsuranceCarousel';
import { useLanguage } from '../i18n';
import {
  ShieldIcon,
  ShieldPlus,
  HeartIcon,
  PillIcon,
  StethoscopeIcon,
  CalendarIcon,
  PhoneIcon
} from '../components/BrandIcons';

// Official Medicare.gov portal URLs
const MEDICARE_GOV_URL = "https://www.medicare.gov/";

const copy = {
  en: {
    bannerText: "Official Medicare Enrollment Assistance",
    visitMedicareGov: "Visit Medicare.gov",

    heroBadge: "Medicare Coverage for 65+",
    heroHeadlinePre: "Navigate",
    heroHeadlineHighlight: "Medicare",
    heroHeadlinePost: "with Confidence",
    heroSubtitle: "Find the right Medicare plan for your healthcare needs. Our licensed specialists help you understand your options, compare plans, and maximize your benefits—at no cost to you.",
    heroCtaPrimary: "Get Free Medicare Help",

    statAmericansLabel: "Americans on Medicare",
    statPremiumLabel: "Premium Plans",
    statFree: "Free",
    statExpertLabel: "Expert Help",

    floatingEnrollmentTitle: "Annual Enrollment",
    floatingEnrollmentDates: "Oct 15 to Dec 7",
    officialPartner: "Official Partner",

    heroImgAlt: "Senior couple reviewing Medicare options",

    carouselTitle: "We Work With Top Medicare Providers",
    carouselSubtitle: "Compare plans from leading Medicare Advantage carriers",

    medicaidBannerTitle: "Limited Income? You May Qualify for Extra Help",
    medicaidBannerText: "Medicare-Medicaid dual eligibility can cover costs Medicare doesn't. We can help you apply.",
    medicaidBannerCta: "Check Medicaid Eligibility",

    datesAnnualTitle: "Annual Enrollment",
    datesAnnualValue: "Oct 15 to Dec 7",
    datesAnnualDesc: "Change your Medicare Advantage or Part D plan. Coverage starts January 1.",
    datesInitialTitle: "Initial Enrollment",
    datesInitialValue: "7-Month Window",
    datesInitialDesc: "3 months before to 3 months after your 65th birthday month.",
    datesMaTitle: "MA Open Enrollment",
    datesMaValue: "Jan 1 - Mar 31",
    datesMaDesc: "Switch MA plans or return to Original Medicare + Part D.",

    partsBadge: "Understanding Medicare",
    partsHeadingPre: "The",
    partsHeadingHighlight: "Four Parts",
    partsHeadingPost: "of Medicare",
    partsSubtitle: "Medicare has different parts that cover different services. Understanding each part helps you choose the right coverage.",

    comparisonBadge: "Compare Options",
    comparisonHeadingPre: "Original Medicare vs",
    comparisonHeadingHighlight: "Medicare Advantage",
    comparisonSubtitle: "Both options provide comprehensive healthcare coverage. The right choice depends on your individual needs and preferences.",
    comparisonColFeature: "Feature",
    comparisonColOriginal: "Original Medicare",
    comparisonColAdvantage: "Medicare Advantage",
    comparisonCta: "Talk to a Medicare Specialist",
    comparisonCtaNote: "Share your details and a licensed Medicare specialist will reach out to help you compare plans—at no cost to you.",

    benefitsBadge: "Extra Benefits",
    benefitsHeadingPre: "Medicare Advantage",
    benefitsHeadingHighlight: "Bonus Benefits",
    benefitsSubtitle: "Many Medicare Advantage plans include benefits not covered by Original Medicare, often at no additional premium.",

    processBadge: "Simple Process",
    processHeadingPre: "How We",
    processHeadingHighlight: "Help You Enroll",
    processSubtitle: "Our licensed Medicare specialists guide you through every step—completely free of charge.",

    whyBadge: "Why Choose Us",
    whyHeadingPre: "Medicare Experts,",
    whyHeadingHighlight: "Zero Cost",
    whySubtitle: "Medicare can be confusing with all its parts and options. Our licensed agents specialize in Medicare and make it simple to understand your choices.",
    whyImgAlt: "Insurance agent helping senior with Medicare options",

    benefitsImgAlt: "Active seniors enjoying retirement with Medicare coverage",

    faqBadge: "FAQ",
    faqHeadingPre: "Medicare",
    faqHeadingHighlight: "Questions Answered",
    faqSubtitle: "Get answers to the most common questions about Medicare coverage and enrollment.",
    faqResourceTitle: "Need More Information?",
    faqResourceText: "Visit the official Medicare.gov website for additional resources, plan comparisons, and enrollment assistance.",

    ctaTitle: "Ready to Explore Your Options?",
    ctaText: "Compare Medicare plans and find coverage that fits your needs and budget.",
    ctaPrimary: "Get Free Medicare Help",
    ctaCall: "Call Us",

    contactBadge: "Contact Us",
    contactHeadingPre: "Need Help with",
    contactHeadingHighlight: "Medicare",
    contactHeadingPost: "?",
    contactSubtitle: "Confused about Medicare options? Our licensed agents specialize in helping seniors find the right coverage. Get personalized guidance at no cost to you.",
    contactItem1Title: "Enrollment Periods",
    contactItem1Desc: "We'll help you understand when you can enroll and make changes to your coverage.",
    contactItem2Title: "Plan Comparison",
    contactItem2Desc: "Compare Medicare Advantage, Medigap, and Part D plans side by side.",
    contactItem3Title: "Free Consultation",
    contactItem3Desc: "No pressure, no obligation. Just helpful guidance from Medicare experts.",

    resourcesTitle: "Official Government Resources",
    resource1Title: "Medicare.gov",
    resource1Sub: "Official Medicare Website",
    resource2Title: "Medicare Plan Finder",
    resource2Sub: "Compare plans in your area",
    resource3Title: "Getting Started with Medicare",
    resource3Sub: "Beginner's guide to Medicare",
    resource4Title: "Social Security Medicare Info",
    resource4Sub: "SSA enrollment information",

    formTitle: "Request Medicare Guidance",
    formSubtitle: "Fill out the form and a Medicare specialist will contact you within 24 hours.",

    stickyLabel: "Get Free Medicare Help",

    partNames: [
      "Hospital Insurance",
      "Medical Insurance",
      "Medicare Advantage",
      "Prescription Drug"
    ],
    partDescriptions: [
      "Covers inpatient hospital stays, skilled nursing facility care, hospice care, and some home health care. Most people don't pay a premium for Part A if they or their spouse paid Medicare taxes while working.",
      "Covers doctor visits, outpatient care, preventive services, durable medical equipment, ambulance services, and mental health care. You pay a monthly premium based on your income.",
      "An all-in-one alternative to Original Medicare offered by private insurers approved by Medicare. Most plans include Part D drug coverage and extra benefits like vision, dental, and hearing.",
      "Helps cover the cost of prescription drugs, including many recommended vaccines. Available as a standalone plan with Original Medicare or included in most Medicare Advantage plans."
    ],
    partPremiums: [
      "Usually $0 if you paid Medicare taxes for 10+ years",
      "Standard 2026 premium: $185/month (income-based)",
      "$0 premium plans available in most areas",
      "Varies by plan, national average ~$55/month"
    ],

    benefitTitles: [
      "Vision Coverage",
      "Dental Coverage",
      "Hearing Benefits",
      "Fitness Programs",
      "Prescription Savings",
      "Telehealth"
    ],
    benefitDescriptions: [
      "Routine eye exams, glasses, and contacts",
      "Cleanings, fillings, extractions, and dentures",
      "Hearing exams and hearing aid coverage",
      "SilverSneakers® and gym memberships",
      "Lower costs on medications through Part D",
      "Virtual doctor visits from home"
    ],

    faqQuestions: [
      "What is Medicare and who is eligible?",
      "When can I enroll in Medicare?",
      "What's the difference between Original Medicare and Medicare Advantage?",
      "Do I need a Medicare Supplement (Medigap) plan?",
      "What if I'm still working at 65 with employer coverage?",
      "Is there a penalty for late enrollment?",
      "What does Medicare Part D cover?",
      "What extra benefits do Medicare Advantage plans offer?",
      "How does Javi's Insurance help with Medicare enrollment?",
      "What if I have limited income? Are there programs to help?"
    ],
    faqAnswers: [
      "Medicare is the federal health insurance program for people 65 or older, certain younger people with disabilities, and people with End-Stage Renal Disease (ESRD). If you're a U.S. citizen or permanent legal resident who has lived in the U.S. for at least 5 years and are 65+, you're eligible. You may also qualify if you've received Social Security disability benefits for 24 months, or have ALS (Lou Gehrig's disease) or ESRD.",
      "Your Initial Enrollment Period (IEP) is a 7 month window that starts 3 months before your 65th birthday month and ends 3 months after. The Annual Enrollment Period (AEP) runs October 15 to December 7 each year, when you can switch plans. The Medicare Advantage Open Enrollment Period (January 1 to March 31) allows MA members to switch plans or return to Original Medicare. Special Enrollment Periods are available for qualifying events.",
      "Original Medicare (Parts A & B) is provided directly by the federal government. You can see any Medicare-accepting provider nationwide and add a standalone Part D drug plan and/or Medigap supplement. Medicare Advantage (Part C) is offered by private insurers approved by Medicare. Plans are typically HMO or PPO networks, often include drug coverage and extra benefits (vision, dental, hearing, fitness), and may have $0 premiums but require using network providers.",
      "Medigap plans help pay costs that Original Medicare doesn't cover, like copayments, coinsurance, and deductibles. They're sold by private insurers and provide more predictable healthcare costs. Important: Medigap plans only work with Original Medicare, not Medicare Advantage. The best time to buy Medigap is during your 6-month Medigap Open Enrollment Period, starting when you're 65+ AND enrolled in Part B.",
      "If you have coverage through your or your spouse's current employer with 20+ employees, you can typically delay Medicare Part B without penalty. You'll get a Special Enrollment Period when that coverage ends. However, you should still enroll in Part A (it's usually free) unless you have a Health Savings Account (HSA). If your employer has fewer than 20 employees, Medicare becomes your primary coverage at 65.",
      "Yes. If you don't sign up for Part B when first eligible and don't have qualifying coverage, you'll pay a 10% premium penalty for each 12-month period you could have had Part B but didn't. This penalty lasts for life. Part D also has a late enrollment penalty: 1% of the national base premium for each month you went without creditable drug coverage. Our agents help ensure you enroll on time to avoid penalties.",
      "Part D covers prescription drugs, including many recommended vaccines (like shingles and Tdap). Starting in 2025, all Part D plans cap out-of-pocket drug costs at $2,000 per year thanks to the Inflation Reduction Act. Plans have formularies (drug lists) that categorize medications into tiers with different costs. We can help you find a plan that covers your specific medications at the lowest cost.",
      "Many Medicare Advantage plans include benefits not covered by Original Medicare: routine vision, dental, and hearing care; fitness programs like SilverSneakers; over-the-counter allowances; transportation to medical appointments; meal delivery after hospital stays; and telehealth services. Some plans offer special supplemental benefits for chronically ill members. Benefits vary by plan and location.",
      "As licensed Medicare agents, we provide free, unbiased guidance to help you understand your options. We compare plans from multiple insurers, help you find doctors in-network, verify your medications are covered, and assist with the entire enrollment process. Our service is free—we're compensated by insurance companies, not you. We provide year-round support for questions about your coverage, not just during enrollment periods.",
      "Yes! Several programs help with Medicare costs: Medicare Savings Programs (MSPs) help pay Part B premiums and may cover deductibles/copays. Extra Help (Low-Income Subsidy) significantly reduces Part D prescription costs. Medicaid dual-eligibility provides comprehensive coverage for those who qualify. We can help determine your eligibility for these programs and assist with applications."
    ],

    comparisonFeatures: [
      "Hospital Coverage (Part A)",
      "Medical Coverage (Part B)",
      "Prescription Drugs (Part D)",
      "Routine Vision Coverage",
      "Routine Dental Coverage",
      "Hearing Coverage",
      "Fitness Benefits",
      "Out-of-Pocket Maximum",
      "Use Any Medicare Provider",
      "No Network Restrictions",
      "Medigap Supplement Available"
    ]
  },
  es: {
    bannerText: "Asistencia Oficial para la Inscripción a Medicare",
    visitMedicareGov: "Visite Medicare.gov",

    heroBadge: "Cobertura de Medicare para mayores de 65",
    heroHeadlinePre: "Navegue",
    heroHeadlineHighlight: "Medicare",
    heroHeadlinePost: "con Confianza",
    heroSubtitle: "Encuentre el plan de Medicare adecuado para sus necesidades de salud. Nuestros especialistas con licencia le ayudan a entender sus opciones, comparar planes y aprovechar al máximo sus beneficios—sin costo para usted.",
    heroCtaPrimary: "Obtenga Ayuda Gratis con Medicare",

    statAmericansLabel: "Estadounidenses con Medicare",
    statPremiumLabel: "Planes de Prima",
    statFree: "Gratis",
    statExpertLabel: "Ayuda Experta",

    floatingEnrollmentTitle: "Inscripción Anual",
    floatingEnrollmentDates: "15 oct al 7 dic",
    officialPartner: "Socio Oficial",

    heroImgAlt: "Pareja de adultos mayores revisando opciones de Medicare",

    carouselTitle: "Trabajamos con las Mejores Aseguradoras de Medicare",
    carouselSubtitle: "Compare planes de las principales aseguradoras de Medicare Advantage",

    medicaidBannerTitle: "¿Ingresos Limitados? Podría Calificar para Ayuda Adicional",
    medicaidBannerText: "La doble elegibilidad de Medicare y Medicaid puede cubrir costos que Medicare no cubre. Le ayudamos a solicitarla.",
    medicaidBannerCta: "Verifique su Elegibilidad para Medicaid",

    datesAnnualTitle: "Inscripción Anual",
    datesAnnualValue: "15 oct al 7 dic",
    datesAnnualDesc: "Cambie su plan de Medicare Advantage o Part D. La cobertura comienza el 1 de enero.",
    datesInitialTitle: "Inscripción Inicial",
    datesInitialValue: "Ventana de 7 Meses",
    datesInitialDesc: "3 meses antes hasta 3 meses después del mes de su cumpleaños 65.",
    datesMaTitle: "Inscripción Abierta de MA",
    datesMaValue: "1 ene - 31 mar",
    datesMaDesc: "Cambie planes de MA o regrese a Medicare Original + Part D.",

    partsBadge: "Entendiendo Medicare",
    partsHeadingPre: "Las",
    partsHeadingHighlight: "Cuatro Partes",
    partsHeadingPost: "de Medicare",
    partsSubtitle: "Medicare tiene diferentes partes que cubren distintos servicios. Entender cada parte le ayuda a elegir la cobertura adecuada.",

    comparisonBadge: "Compare Opciones",
    comparisonHeadingPre: "Medicare Original vs",
    comparisonHeadingHighlight: "Medicare Advantage",
    comparisonSubtitle: "Ambas opciones brindan cobertura de salud integral. La elección correcta depende de sus necesidades y preferencias individuales.",
    comparisonColFeature: "Característica",
    comparisonColOriginal: "Medicare Original",
    comparisonColAdvantage: "Medicare Advantage",
    comparisonCta: "Hable con un Especialista en Medicare",
    comparisonCtaNote: "Comparta sus datos y un especialista en Medicare con licencia se comunicará con usted para ayudarle a comparar planes—sin costo para usted.",

    benefitsBadge: "Beneficios Adicionales",
    benefitsHeadingPre: "Beneficios Extra de",
    benefitsHeadingHighlight: "Medicare Advantage",
    benefitsSubtitle: "Muchos planes de Medicare Advantage incluyen beneficios que Medicare Original no cubre, a menudo sin prima adicional.",

    processBadge: "Proceso Sencillo",
    processHeadingPre: "Cómo lo",
    processHeadingHighlight: "Ayudamos a Inscribirse",
    processSubtitle: "Nuestros especialistas en Medicare con licencia lo guían en cada paso—completamente gratis.",

    whyBadge: "Por Qué Elegirnos",
    whyHeadingPre: "Expertos en Medicare,",
    whyHeadingHighlight: "Costo Cero",
    whySubtitle: "Medicare puede ser confuso con todas sus partes y opciones. Nuestros agentes con licencia se especializan en Medicare y hacen que sea fácil entender sus opciones.",
    whyImgAlt: "Agente de seguros ayudando a un adulto mayor con opciones de Medicare",

    benefitsImgAlt: "Adultos mayores activos disfrutando su jubilación con cobertura de Medicare",

    faqBadge: "Preguntas Frecuentes",
    faqHeadingPre: "Preguntas sobre Medicare",
    faqHeadingHighlight: "Respondidas",
    faqSubtitle: "Obtenga respuestas a las preguntas más comunes sobre la cobertura y la inscripción a Medicare.",
    faqResourceTitle: "¿Necesita Más Información?",
    faqResourceText: "Visite el sitio web oficial Medicare.gov para obtener recursos adicionales, comparaciones de planes y asistencia con la inscripción.",

    ctaTitle: "¿Listo para Explorar sus Opciones?",
    ctaText: "Compare planes de Medicare y encuentre una cobertura que se ajuste a sus necesidades y presupuesto.",
    ctaPrimary: "Obtenga Ayuda Gratis con Medicare",
    ctaCall: "Llámenos",

    contactBadge: "Contáctenos",
    contactHeadingPre: "¿Necesita Ayuda con",
    contactHeadingHighlight: "Medicare",
    contactHeadingPost: "?",
    contactSubtitle: "¿Tiene dudas sobre las opciones de Medicare? Nuestros agentes con licencia se especializan en ayudar a los adultos mayores a encontrar la cobertura adecuada. Obtenga orientación personalizada sin costo para usted.",
    contactItem1Title: "Períodos de Inscripción",
    contactItem1Desc: "Le ayudamos a entender cuándo puede inscribirse y hacer cambios en su cobertura.",
    contactItem2Title: "Comparación de Planes",
    contactItem2Desc: "Compare planes de Medicare Advantage, Medigap y Part D lado a lado.",
    contactItem3Title: "Consulta Gratuita",
    contactItem3Desc: "Sin presión, sin compromiso. Solo orientación útil de expertos en Medicare.",

    resourcesTitle: "Recursos Oficiales del Gobierno",
    resource1Title: "Medicare.gov",
    resource1Sub: "Sitio Web Oficial de Medicare",
    resource2Title: "Buscador de Planes de Medicare",
    resource2Sub: "Compare planes en su área",
    resource3Title: "Comenzando con Medicare",
    resource3Sub: "Guía para principiantes de Medicare",
    resource4Title: "Información de Medicare del Seguro Social",
    resource4Sub: "Información de inscripción de SSA",

    formTitle: "Solicite Orientación sobre Medicare",
    formSubtitle: "Complete el formulario y un especialista en Medicare se comunicará con usted dentro de 24 horas.",

    stickyLabel: "Obtenga Ayuda Gratis con Medicare",

    partNames: [
      "Seguro Hospitalario",
      "Seguro Médico",
      "Medicare Advantage",
      "Medicamentos Recetados"
    ],
    partDescriptions: [
      "Cubre estancias hospitalarias, atención en centros de enfermería especializada, cuidados paliativos y algunos cuidados de salud en el hogar. La mayoría no paga prima por Part A si usted o su cónyuge pagaron impuestos de Medicare mientras trabajaban.",
      "Cubre visitas al médico, atención ambulatoria, servicios preventivos, equipo médico duradero, servicios de ambulancia y atención de salud mental. Usted paga una prima mensual según sus ingresos.",
      "Una alternativa todo en uno a Medicare Original ofrecida por aseguradoras privadas aprobadas por Medicare. La mayoría de los planes incluyen cobertura de medicamentos Part D y beneficios extra como visión, dental y audición.",
      "Ayuda a cubrir el costo de los medicamentos recetados, incluyendo muchas vacunas recomendadas. Disponible como plan independiente con Medicare Original o incluido en la mayoría de los planes de Medicare Advantage."
    ],
    partPremiums: [
      "Generalmente $0 si pagó impuestos de Medicare por 10+ años",
      "Prima estándar 2026: $185/mes (según ingresos)",
      "Planes con prima de $0 disponibles en la mayoría de las áreas",
      "Varía por plan, promedio nacional ~$55/mes"
    ],

    benefitTitles: [
      "Cobertura de Visión",
      "Cobertura Dental",
      "Beneficios de Audición",
      "Programas de Acondicionamiento Físico",
      "Ahorros en Recetas",
      "Telesalud"
    ],
    benefitDescriptions: [
      "Exámenes de la vista de rutina, lentes y lentes de contacto",
      "Limpiezas, empastes, extracciones y dentaduras",
      "Exámenes de audición y cobertura de audífonos",
      "SilverSneakers® y membresías de gimnasio",
      "Costos más bajos en medicamentos a través de Part D",
      "Visitas médicas virtuales desde casa"
    ],

    faqQuestions: [
      "¿Qué es Medicare y quién es elegible?",
      "¿Cuándo puedo inscribirme en Medicare?",
      "¿Cuál es la diferencia entre Medicare Original y Medicare Advantage?",
      "¿Necesito un plan suplementario de Medicare (Medigap)?",
      "¿Qué pasa si sigo trabajando a los 65 con cobertura del empleador?",
      "¿Hay una multa por inscripción tardía?",
      "¿Qué cubre Medicare Part D?",
      "¿Qué beneficios extra ofrecen los planes de Medicare Advantage?",
      "¿Cómo ayuda Javi's Insurance con la inscripción a Medicare?",
      "¿Qué pasa si tengo ingresos limitados? ¿Hay programas de ayuda?"
    ],
    faqAnswers: [
      "Medicare es el programa federal de seguro de salud para personas de 65 años o más, ciertas personas más jóvenes con discapacidades y personas con Enfermedad Renal en Etapa Terminal (ESRD). Si es ciudadano estadounidense o residente legal permanente que ha vivido en EE. UU. por al menos 5 años y tiene 65+, es elegible. También puede calificar si ha recibido beneficios por discapacidad del Seguro Social durante 24 meses, o tiene ALS (enfermedad de Lou Gehrig) o ESRD.",
      "Su Período de Inscripción Inicial (IEP) es una ventana de 7 meses que comienza 3 meses antes del mes de su cumpleaños 65 y termina 3 meses después. El Período de Inscripción Anual (AEP) va del 15 de octubre al 7 de diciembre cada año, cuando puede cambiar de plan. El Período de Inscripción Abierta de Medicare Advantage (1 de enero al 31 de marzo) permite a los miembros de MA cambiar de plan o regresar a Medicare Original. Hay Períodos de Inscripción Especial disponibles para eventos que califiquen.",
      "Medicare Original (Partes A y B) lo proporciona directamente el gobierno federal. Puede consultar a cualquier proveedor que acepte Medicare a nivel nacional y agregar un plan independiente de medicamentos Part D y/o un suplemento Medigap. Medicare Advantage (Part C) lo ofrecen aseguradoras privadas aprobadas por Medicare. Los planes suelen ser redes HMO o PPO, a menudo incluyen cobertura de medicamentos y beneficios extra (visión, dental, audición, acondicionamiento físico), y pueden tener primas de $0 pero requieren usar proveedores de la red.",
      "Los planes Medigap ayudan a pagar costos que Medicare Original no cubre, como copagos, coseguros y deducibles. Los venden aseguradoras privadas y brindan costos de salud más predecibles. Importante: los planes Medigap solo funcionan con Medicare Original, no con Medicare Advantage. El mejor momento para comprar Medigap es durante su Período de Inscripción Abierta de Medigap de 6 meses, que comienza cuando tiene 65+ Y está inscrito en Part B.",
      "Si tiene cobertura a través del empleador actual suyo o de su cónyuge con 20+ empleados, normalmente puede retrasar Medicare Part B sin multa. Tendrá un Período de Inscripción Especial cuando esa cobertura termine. Sin embargo, aún debe inscribirse en Part A (generalmente es gratis) a menos que tenga una Cuenta de Ahorros para la Salud (HSA). Si su empleador tiene menos de 20 empleados, Medicare se convierte en su cobertura principal a los 65.",
      "Sí. Si no se inscribe en Part B cuando es elegible por primera vez y no tiene cobertura que califique, pagará una multa del 10% en la prima por cada período de 12 meses en que pudo haber tenido Part B pero no lo hizo. Esta multa dura de por vida. Part D también tiene una multa por inscripción tardía: 1% de la prima base nacional por cada mes que estuvo sin cobertura de medicamentos acreditable. Nuestros agentes ayudan a garantizar que se inscriba a tiempo para evitar multas.",
      "Part D cubre medicamentos recetados, incluyendo muchas vacunas recomendadas (como herpes zóster y Tdap). A partir de 2025, todos los planes de Part D limitan los costos de bolsillo de medicamentos a $2,000 por año gracias a la Ley de Reducción de la Inflación. Los planes tienen formularios (listas de medicamentos) que clasifican los medicamentos en niveles con diferentes costos. Podemos ayudarle a encontrar un plan que cubra sus medicamentos específicos al menor costo.",
      "Muchos planes de Medicare Advantage incluyen beneficios que Medicare Original no cubre: atención de visión, dental y audición de rutina; programas de acondicionamiento físico como SilverSneakers; asignaciones para productos de venta libre; transporte a citas médicas; entrega de comidas después de estancias hospitalarias; y servicios de telesalud. Algunos planes ofrecen beneficios suplementarios especiales para miembros con enfermedades crónicas. Los beneficios varían según el plan y la ubicación.",
      "Como agentes de Medicare con licencia, brindamos orientación gratuita e imparcial para ayudarle a entender sus opciones. Comparamos planes de múltiples aseguradoras, le ayudamos a encontrar médicos dentro de la red, verificamos que sus medicamentos estén cubiertos y le asistimos en todo el proceso de inscripción. Nuestro servicio es gratis—las compañías de seguros nos compensan, no usted. Brindamos apoyo durante todo el año para preguntas sobre su cobertura, no solo durante los períodos de inscripción.",
      "¡Sí! Varios programas ayudan con los costos de Medicare: los Programas de Ahorros de Medicare (MSP) ayudan a pagar las primas de Part B y pueden cubrir deducibles/copagos. La Ayuda Adicional (Subsidio por Bajos Ingresos) reduce significativamente los costos de medicamentos de Part D. La doble elegibilidad de Medicaid brinda cobertura integral a quienes califican. Podemos ayudarle a determinar su elegibilidad para estos programas y asistirle con las solicitudes."
    ],

    comparisonFeatures: [
      "Cobertura Hospitalaria (Part A)",
      "Cobertura Médica (Part B)",
      "Medicamentos Recetados (Part D)",
      "Cobertura de Visión de Rutina",
      "Cobertura Dental de Rutina",
      "Cobertura de Audición",
      "Beneficios de Acondicionamiento Físico",
      "Máximo de Gastos de Bolsillo",
      "Use Cualquier Proveedor de Medicare",
      "Sin Restricciones de Red",
      "Suplemento Medigap Disponible"
    ]
  }
};

const medicareParts = [
  {
    part: "Part A",
    icon: HeartIcon,
    color: "from-deep-blue to-light-blue"
  },
  {
    part: "Part B",
    icon: StethoscopeIcon,
    color: "from-[#0071BC] to-[#005a96]"
  },
  {
    part: "Part C",
    icon: ShieldPlus,
    color: "from-bright-red to-bright-red-dark"
  },
  {
    part: "Part D",
    icon: PillIcon,
    color: "from-[#6B21A8] to-[#4C1D95]"
  }
];

const additionalBenefits = [
  { icon: Eye },
  { icon: StethoscopeIcon },
  { icon: HeartIcon },
  { icon: ShieldPlus },
  { icon: PillIcon },
  { icon: HeartIcon }
];

const comparisonData = [
  { original: true, advantage: true },
  { original: true, advantage: true },
  { original: false, advantage: true },
  { original: false, advantage: true },
  { original: false, advantage: true },
  { original: false, advantage: true },
  { original: false, advantage: true },
  { original: false, advantage: true },
  { original: true, advantage: false },
  { original: true, advantage: false },
  { original: true, advantage: false }
];

export const MedicarePage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const { language } = useLanguage();
  const c = copy[language];

  const faqs = c.faqQuestions.map((q, i) => ({ q, a: c.faqAnswers[i] }));

  return (
    <div className="min-h-screen bg-cream font-sans text-text-main">
      <Navbar />

      {/* Official Portal Banner */}
      <div className="bg-bright-red text-white py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-sm font-medium">{c.bannerText}</span>
          <a
            href={MEDICARE_GOV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-bold underline hover:text-white/90"
          >
            {c.visitMedicareGov} <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
        {/* Background with decorative color hues */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/5 via-transparent to-deep-blue/10 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-dots-pattern -z-10 opacity-20" />

        {/* Decorative color orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-bright-red/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-light-blue/10 rounded-full blur-2xl -z-10" />

        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 lg:w-1/2"
          >
            <span className="badge-trust border-deep-blue/20">
              <ShieldPlus size={16} className="text-bright-red" />
              {c.heroBadge}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
              {c.heroHeadlinePre} <span className="text-gradient-secondary">{c.heroHeadlineHighlight}</span> {c.heroHeadlinePost}
            </h1>

            <p className="text-xl text-text-muted max-w-lg leading-relaxed">
              {c.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <QuoteButton
                href="#contact"
                label={c.heroCtaPrimary}
                variant="primary"
                size="large"
              />
              <a
                href="tel:305-390-8679"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <PhoneIcon size={20} className="text-current" />
                (305) 390-8679
              </a>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-secondary">65M+</div>
                <div className="text-sm text-text-muted">{c.statAmericansLabel}</div>
              </div>
              <div className="w-px h-12 bg-silver/50" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-primary">$0</div>
                <div className="text-sm text-text-muted">{c.statPremiumLabel}</div>
              </div>
              <div className="w-px h-12 bg-silver/50" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-secondary">{c.statFree}</div>
                <div className="text-sm text-text-muted">{c.statExpertLabel}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative lg:w-1/2 w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/10 to-transparent rounded-[2rem] lg:rounded-[3rem] transform -rotate-2" />
            <img
              src="/images/medicare-hero.webp"
              fetchPriority="high"
              decoding="async"
              alt={c.heroImgAlt}
              className="relative rounded-[2rem] lg:rounded-[3rem] shadow-premium w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
            />

            {/* Floating Badge */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -right-6 glass p-5 rounded-2xl shadow-premium border border-white/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-bright-red/10 rounded-full flex items-center justify-center">
                  <CalendarIcon size={24} className="text-bright-red" />
                </div>
                <div>
                  <div className="font-bold text-gradient-secondary">{c.floatingEnrollmentTitle}</div>
                  <div className="text-sm text-text-muted">{c.floatingEnrollmentDates}</div>
                </div>
              </div>
            </motion.div>

            {/* Medicare.gov Badge */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="text-xs font-bold text-gray-500 mb-1">{c.officialPartner}</div>
              <div className="font-bold text-gradient-secondary">Medicare.gov</div>
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

      {/* Insurance Providers Carousel */}
      <InsuranceCarousel
        variant="medicare"
        title={c.carouselTitle}
        subtitle={c.carouselSubtitle}
        bgColor="bg-cream"
      />

      {/* Medicaid Dual-Eligibility Banner */}
      <section className="bg-gradient-to-r from-[#00796B]/10 to-[#4DB6AC]/10 py-6 border-b border-[#00796B]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00796B] rounded-full flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#004D40]">{c.medicaidBannerTitle}</h3>
                <p className="text-sm text-gray-600">{c.medicaidBannerText}</p>
              </div>
            </div>
            <Link
              to="/medicaid"
              className="inline-flex items-center gap-2 bg-[#00796B] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#004D40] transition-colors"
            >
              {c.medicaidBannerCta}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Important Dates Section */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={24} className="text-[#12890e]" />
                <h3 className="font-bold text-lg">{c.datesAnnualTitle}</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-[#12890e]">{c.datesAnnualValue}</p>
              <p className="text-sm text-text-muted">{c.datesAnnualDesc}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <CalendarIcon size={24} className="text-deep-blue" />
                <h3 className="font-bold text-lg">{c.datesInitialTitle}</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-gradient-secondary">{c.datesInitialValue}</p>
              <p className="text-sm text-text-muted">{c.datesInitialDesc}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={24} className="text-deep-blue" />
                <h3 className="font-bold text-lg">{c.datesMaTitle}</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-gradient-secondary">{c.datesMaValue}</p>
              <p className="text-sm text-text-muted">{c.datesMaDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Medicare Parts Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-trust mb-4">{c.partsBadge}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              {c.partsHeadingPre} <span className="text-gradient-secondary">{c.partsHeadingHighlight}</span> {c.partsHeadingPost}
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {c.partsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicareParts.map((part, i) => (
              <motion.div
                key={part.part}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-8 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${part.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <part.icon size={28} className="text-white" />
                </div>
                <div className="text-sm font-bold text-[#12890e] mb-1">{part.part}</div>
                <h3 className="text-xl font-bold mb-3">{c.partNames[i]}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">{c.partDescriptions[i]}</p>
                <div className="text-xs text-[#12890e] font-medium bg-[#12890e]/10 px-3 py-2 rounded-lg">
                  {c.partPremiums[i]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Glow Effects */}
        <div className="bg-glow-orb-blue -top-[10%] -left-[10%] w-[500px] h-[500px]" />
        <div className="bg-glow-orb-red bottom-0 -right-[10%] w-[600px] h-[600px] opacity-30" />
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-trust mb-4">{c.comparisonBadge}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              {c.comparisonHeadingPre} <span className="text-gradient-primary">{c.comparisonHeadingHighlight}</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {c.comparisonSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-premium overflow-hidden"
          >
            <div className="grid grid-cols-3 bg-deep-blue text-white font-bold">
              <div className="p-4 text-left">{c.comparisonColFeature}</div>
              <div className="p-4 text-center border-l border-white/20">{c.comparisonColOriginal}</div>
              <div className="p-4 text-center border-l border-white/20">{c.comparisonColAdvantage}</div>
            </div>
            {comparisonData.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="p-4 font-medium text-sm">{c.comparisonFeatures[i]}</div>
                <div className="p-4 text-center border-l border-gray-100">
                  {row.original ? (
                    <CheckCircle size={20} className="text-green-500 mx-auto" />
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </div>
                <div className="p-4 text-center border-l border-gray-100">
                  {row.advantage ? (
                    <CheckCircle size={20} className="text-green-500 mx-auto" />
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="text-center mt-8 space-y-4">
            <QuoteButton
              href="#contact"
              label={c.comparisonCta}
              variant="secondary"
              size="large"
            />
            <p className="text-sm text-text-muted">
              {c.comparisonCtaNote}
            </p>
          </div>
        </div>
      </section>

      {/* Medicare Advantage Benefits */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-trust mb-4">{c.benefitsBadge}</span>
              <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                {c.benefitsHeadingPre} <span className="text-gradient-primary">{c.benefitsHeadingHighlight}</span>
              </h2>
              <p className="text-text-muted text-lg mb-8">
                {c.benefitsSubtitle}
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {additionalBenefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-light-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon size={24} className="text-deep-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{c.benefitTitles[i]}</h4>
                      <p className="text-text-muted text-sm">{c.benefitDescriptions[i]}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/senior-couple-walking.webp"
                loading="lazy"
                decoding="async"
                alt={c.benefitsImgAlt}
                className="rounded-3xl shadow-premium w-full h-[450px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-cream relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 mix-blend-multiply" />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-trust mb-4">{c.processBadge}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              {c.processHeadingPre} <span className="text-gradient-secondary">{c.processHeadingHighlight}</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {c.processSubtitle}
            </p>
          </motion.div>
          <ProcessTimelineCompact product="medicare" />
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
                {c.whyHeadingPre} <span className="text-gradient-secondary">{c.whyHeadingHighlight}</span>
              </h2>
              <p className="text-text-muted text-lg mb-8">
                {c.whySubtitle}
              </p>
              <WhyChooseUsCompact />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/agent-meeting-seniors.webp"
                loading="lazy"
                decoding="async"
                alt={c.whyImgAlt}
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
              {c.faqHeadingPre} <span className="text-gradient-secondary">{c.faqHeadingHighlight}</span>
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
                        <ChevronDown className={`transition-transform duration-300 text-deep-blue flex-shrink-0 ${openFaq === actualIndex ? 'rotate-180' : ''}`} />
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

          {/* Official Medicare.gov Button */}
          <div className="mt-12 bg-[#12890e]/5 rounded-2xl p-8 border border-[#12890e]/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{c.faqResourceTitle}</h4>
                <p className="text-gray-500">{c.faqResourceText}</p>
              </div>
              <a
                href="https://www.medicare.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#12890e] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0d6b0a] transition-colors shadow-lg whitespace-nowrap"
              >
                <ExternalLink size={18} />
                {c.visitMedicareGov}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection filter="medicare" />

      {/* CTA Banner */}
      <section className="py-16 bg-deep-blue relative overflow-hidden">
        {/* Gradient overlays to match other CTA ribbons */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-transparent to-light-blue opacity-80" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bright-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">{c.ctaTitle}</h3>
              <p className="text-white/80">{c.ctaText}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <QuoteButton
                href="#contact"
                label={c.ctaPrimary}
                variant="primary"
                size="large"
              />
              <a
                href="tel:305-390-8679"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <PhoneIcon size={20} />
                {c.ctaCall}
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
                {c.contactHeadingPre} <span className="text-gradient-primary">{c.contactHeadingHighlight}</span>{c.contactHeadingPost}
              </h2>
              <p className="text-text-muted text-lg mb-8">
                {c.contactSubtitle}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CalendarIcon size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{c.contactItem1Title}</h4>
                    <p className="text-text-muted text-sm">{c.contactItem1Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-bright-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldIcon size={24} className="text-bright-red" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{c.contactItem2Title}</h4>
                    <p className="text-text-muted text-sm">{c.contactItem2Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PhoneIcon size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{c.contactItem3Title}</h4>
                    <p className="text-text-muted text-sm">{c.contactItem3Desc}</p>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="mt-8 p-6 bg-[#12890e]/5 rounded-xl border border-[#12890e]/20">
                <h4 className="font-bold mb-4 text-gray-800">{c.resourcesTitle}</h4>
                <div className="space-y-3">
                  <a
                    href="https://www.medicare.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#12890e] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#12890e] rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#12890e]">{c.resource1Title}</div>
                      <div className="text-xs text-gray-500">{c.resource1Sub}</div>
                    </div>
                  </a>
                  <a
                    href="https://www.medicare.gov/plan-compare/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#12890e] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#12890e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#12890e]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#12890e]">{c.resource2Title}</div>
                      <div className="text-xs text-gray-500">{c.resource2Sub}</div>
                    </div>
                  </a>
                  <a
                    href="https://www.medicare.gov/basics/get-started-with-medicare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#12890e] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#12890e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#12890e]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#12890e]">{c.resource3Title}</div>
                      <div className="text-xs text-gray-500">{c.resource3Sub}</div>
                    </div>
                  </a>
                  <a
                    href="https://www.ssa.gov/benefits/medicare/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#12890e] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#12890e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#12890e]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#12890e]">{c.resource4Title}</div>
                      <div className="text-xs text-gray-500">{c.resource4Sub}</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            <ContactForm
              productType="medicare"
              title={c.formTitle}
              subtitle={c.formSubtitle}
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Sticky Mobile Quote Button */}
      <StickyQuoteButton href="#contact" label={c.stickyLabel} />
    </div>
  );
};
