import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, HelpCircle, CheckCircle, Users, Heart, FileText, Phone, ExternalLink } from 'lucide-react';
import { Navbar, Footer } from '../components/Layout';
import { Link } from 'react-router-dom';
import { TestimonialsSection } from '../components/TestimonialCard';
import { ContactForm } from '../components/ContactForm';
import { useLanguage } from '../i18n';

// Official Medicaid portal URLs
const FLORIDA_MEDICAID_URL = "https://ahca.myflorida.com/medicaid";
const ACCESS_FLORIDA_URL = "https://www.myflorida.com/accessflorida/";
const MEDICAID_GOV_URL = "https://www.medicaid.gov/";

// Medicaid brand colors (removed as we unified to Javi's Insurance brand colors)

const copy = {
  en: {
    bannerText: "Official Medicaid Enrollment Assistance",
    bannerLink: "Visit Florida Medicaid",

    heroBadge: "Free Enrollment Assistance",
    heroHeadingPrefix: "Medicaid",
    heroHeadingSuffix: " Assistance",
    heroSubtitle: "We help you apply for and renew your Medicaid coverage. Free, confidential assistance from licensed agents who understand the system.",
    heroCtaPrimary: "Check Your Eligibility",
    statAmericansLabel: "Americans Covered",
    statFeeLabel: "Our Service Fee",
    statFreeValue: "Free",
    statFreeLabel: "Expert Help",
    floatingBadgeTitle: "Free Assistance",
    floatingBadgeSubtitle: "No Cost to You",
    heroImageAlt: "Family receiving healthcare assistance",

    relatedLabel: "Also looking for:",
    relatedObamacare: "Obamacare / ACA Plans",
    relatedMedicare: "Medicare (65+)",

    eligibilityBadge: "Eligibility",
    eligibilityHeadingPrefix: "Who Qualifies for ",
    eligibilityHeadingHighlight: "Medicaid",
    eligibilityHeadingSuffix: "?",
    eligibilitySubtitle: "Medicaid eligibility varies by state, but generally covers these groups based on income and other factors.",
    eligibilityGroupTitles: [
      "Low Income Adults",
      "Children & Families",
      "Seniors & Disabled",
      "Special Categories"
    ],
    eligibilityGroupDescriptions: [
      "Adults ages 19-64 with limited income may qualify for Medicaid coverage.",
      "CHIP and Medicaid provide comprehensive coverage for children and pregnant women.",
      "Medicare recipients with limited income may qualify for dual-eligible programs.",
      "Refugees, former foster care youth, and breast/cervical cancer patients may qualify."
    ],

    benefitsHeadingPrefix: "What Does ",
    benefitsHeadingHighlight: "Medicaid Cover",
    benefitsHeadingSuffix: "?",
    benefitsSubtitle: "Medicaid provides comprehensive health coverage, including many services that other insurance may not cover. Benefits vary by state but typically include:",
    benefits: [
      "Doctor visits and preventive care",
      "Hospital services",
      "Prescription medications",
      "Mental health services",
      "Maternity and newborn care",
      "Lab tests and X-rays",
      "Pediatric services",
      "Vision and dental (varies by state)"
    ],
    benefitsImageAlt: "Family discussing healthcare options",

    howHeadingPrefix: "How We ",
    howHeadingHighlight: "Help You",
    howSubtitle: "Our licensed agents guide you through every step of the Medicaid application or renewal process.",
    howStepTitles: [
      "Check Eligibility",
      "Gather Documents",
      "Submit Application",
      "Get Covered"
    ],
    howStepDescriptions: [
      "Quick assessment of your situation",
      "We tell you exactly what's needed",
      "We guide you through the process",
      "Ongoing support after approval"
    ],

    faqHeadingPrefix: "Medicaid ",
    faqHeadingHighlight: "FAQ",
    faqSubtitle: "Find answers to your questions about Medicaid eligibility and benefits.",
    faqQuestions: [
      "What is Medicaid?",
      "How do I know if I qualify for Medicaid?",
      "What's the difference between Medicaid and Medicare?",
      "What's the difference between Medicaid and Obamacare (ACA)?",
      "What does Florida Medicaid cover?",
      "How do I apply for Medicaid in Florida?",
      "How long does the Medicaid application process take?",
      "What is CHIP (Children's Health Insurance Program)?",
      "Can I get Medicaid if I'm working?",
      "How does Javi's Insurance help with Medicaid?"
    ],
    faqAnswers: [
      "Medicaid is a joint federal and state program that provides free or low-cost health coverage to over 85 million Americans. It covers eligible low-income adults, children, pregnant women, elderly adults, and people with disabilities. Each state runs its own Medicaid program within federal guidelines, so benefits and eligibility can vary by state.",
      "Eligibility depends on your household income, family size, age, disability status, citizenship/immigration status, and your state's specific rules. In Florida, you may qualify if you're a child, pregnant woman, parent/caretaker of a child, elderly (65+), or have a disability and meet income requirements. Income limits vary by category, for example, children may qualify with household income up to 200% of the federal poverty level.",
      "Medicare is a federal program primarily for people 65+ or those with certain disabilities, regardless of income. Medicaid is for people with limited income, regardless of age. You can qualify for both (called 'dual eligibility'), which provides comprehensive coverage and help with Medicare costs. Our agents can help determine if you qualify for dual benefits.",
      "The ACA Marketplace offers subsidized private insurance for those with income above Medicaid limits (generally 138% FPL in expansion states). Medicaid provides free or very low-cost coverage for those with the lowest incomes. When you apply on HealthCare.gov, you're automatically screened for Medicaid eligibility. We help you understand which program is right for you based on your income and circumstances.",
      "Florida Medicaid covers a comprehensive range of services including: doctor visits, hospital care, prescription drugs, lab tests, X-rays, mental health services, substance abuse treatment, maternity care, well-child visits and immunizations, home health care, nursing facility care, and transportation to medical appointments. Some services may require prior authorization.",
      "You can apply through ACCESS Florida (myflorida.com/accessflorida), by phone at 1-866-762-2237, in person at a Department of Children and Families (DCF) office, or by mail. You'll need to provide documentation including proof of identity, income, residency, and citizenship/immigration status. Our agents can help guide you through the application process and ensure you have all required documents.",
      "Florida must process applications within 45 days (90 days for disability-based eligibility). Processing time depends on how complete your application is and whether additional documentation is needed. We help expedite your application by ensuring all required documentation is complete and accurate from the start.",
      "CHIP provides low-cost health coverage for children in families with income too high for Medicaid but who can't afford private insurance. In Florida, this is called Florida KidCare and includes MediKids, Florida Healthy Kids, and Children's Medical Services. Premiums are based on family size and income, with many families paying $15-$20/month or less.",
      "Yes! Having a job doesn't disqualify you from Medicaid. Eligibility is based on your household income level, not employment status. Many working families qualify for Medicaid, especially those with children. Florida also has programs to help people transition from Medicaid to employer coverage without losing benefits.",
      "We provide free, confidential assistance with both new Medicaid applications and renewals. Our licensed agents help you understand eligibility requirements, gather required documentation, complete applications or renewal paperwork accurately, follow up on pending cases, and connect you with other programs you may qualify for (like SNAP or TANF). Whether you're applying for the first time or renewing your existing coverage, our service costs you nothing—we're here to help you get and keep the coverage you need."
    ],

    moreInfoTitle: "Need More Information?",
    moreInfoText: "Visit official government websites for additional Medicaid resources and to apply directly online.",
    moreInfoFlorida: "Florida Medicaid",
    moreInfoMedicaidGov: "Medicaid.gov",

    applyBadge: "Free Assistance",
    applyHeadingPrefix: "Get Help with Your ",
    applyHeadingHighlight: "Medicaid Application or Renewal",
    applySubtitle: "Our licensed agents provide free, confidential assistance with new Medicaid applications and renewals. We'll help you understand your eligibility and guide you through every step.",
    feature1Title: "100% Free Service",
    feature1Desc: "We never charge for our assistance. Our goal is to help you get covered.",
    feature2Title: "Licensed Agents",
    feature2Desc: "Our team is trained and certified to assist with Medicaid enrollment.",
    feature3Title: "Confidential",
    feature3Desc: "Your information is secure and only used to help with your application.",

    resourcesTitle: "Official Government Resources",
    resourceFloridaName: "Florida Medicaid",
    resourceFloridaDesc: "Official State Program",
    resourceAccessName: "ACCESS Florida",
    resourceAccessDesc: "Apply for benefits online",
    resourceMedicaidGovName: "Medicaid.gov",
    resourceMedicaidGovDesc: "Federal Medicaid information",
    resourceKidCareName: "Florida KidCare",
    resourceKidCareDesc: "Children's health coverage",
    phoneHelpPrefix: "Need immediate help? Call Florida Medicaid at ",
    phoneHelpMiddle: " or ACCESS Florida at ",

    formTitle: "Request Free Assistance",
    formSubtitle: "Fill out the form and a licensed agent will contact you within 24 hours.",

    ctaTitle: "Need Help Today?",
    ctaText: "Speak with a licensed agent now. We're here to help you get covered.",
    ctaButton: "Call (305) 390-8679"
  },
  es: {
    bannerText: "Asistencia Oficial de Inscripción en Medicaid",
    bannerLink: "Visite Florida Medicaid",

    heroBadge: "Asistencia Gratuita de Inscripción",
    heroHeadingPrefix: "Medicaid",
    heroHeadingSuffix: ": Asistencia",
    heroSubtitle: "Le ayudamos a solicitar y renovar su cobertura de Medicaid. Asistencia gratuita y confidencial de agentes licenciados que conocen el sistema.",
    heroCtaPrimary: "Verifique Su Elegibilidad",
    statAmericansLabel: "Estadounidenses Cubiertos",
    statFeeLabel: "Nuestra Tarifa de Servicio",
    statFreeValue: "Gratis",
    statFreeLabel: "Ayuda Experta",
    floatingBadgeTitle: "Asistencia Gratuita",
    floatingBadgeSubtitle: "Sin Costo para Usted",
    heroImageAlt: "Familia recibiendo asistencia médica",

    relatedLabel: "También busca:",
    relatedObamacare: "Obamacare / Planes ACA",
    relatedMedicare: "Medicare (65+)",

    eligibilityBadge: "Elegibilidad",
    eligibilityHeadingPrefix: "¿Quién Califica para ",
    eligibilityHeadingHighlight: "Medicaid",
    eligibilityHeadingSuffix: "?",
    eligibilitySubtitle: "La elegibilidad para Medicaid varía según el estado, pero generalmente cubre estos grupos según los ingresos y otros factores.",
    eligibilityGroupTitles: [
      "Adultos de Bajos Ingresos",
      "Niños y Familias",
      "Adultos Mayores y Personas con Discapacidad",
      "Categorías Especiales"
    ],
    eligibilityGroupDescriptions: [
      "Los adultos de 19 a 64 años con ingresos limitados pueden calificar para la cobertura de Medicaid.",
      "CHIP y Medicaid ofrecen cobertura integral para niños y mujeres embarazadas.",
      "Los beneficiarios de Medicare con ingresos limitados pueden calificar para programas de doble elegibilidad.",
      "Los refugiados, los jóvenes que estuvieron en hogares de crianza y los pacientes con cáncer de mama o cervical pueden calificar."
    ],

    benefitsHeadingPrefix: "¿Qué Cubre ",
    benefitsHeadingHighlight: "Medicaid",
    benefitsHeadingSuffix: "?",
    benefitsSubtitle: "Medicaid ofrece una cobertura de salud integral, incluyendo muchos servicios que otros seguros pueden no cubrir. Los beneficios varían según el estado, pero por lo general incluyen:",
    benefits: [
      "Visitas al médico y cuidado preventivo",
      "Servicios hospitalarios",
      "Medicamentos recetados",
      "Servicios de salud mental",
      "Cuidado de maternidad y del recién nacido",
      "Análisis de laboratorio y radiografías",
      "Servicios pediátricos",
      "Visión y dental (varía según el estado)"
    ],
    benefitsImageAlt: "Familia conversando sobre opciones de salud",

    howHeadingPrefix: "Cómo Le ",
    howHeadingHighlight: "Ayudamos",
    howSubtitle: "Nuestros agentes licenciados lo guían en cada paso del proceso de solicitud o renovación de Medicaid.",
    howStepTitles: [
      "Verificar Elegibilidad",
      "Reunir Documentos",
      "Enviar Solicitud",
      "Obtener Cobertura"
    ],
    howStepDescriptions: [
      "Evaluación rápida de su situación",
      "Le decimos exactamente lo que necesita",
      "Lo guiamos a través del proceso",
      "Apoyo continuo después de la aprobación"
    ],

    faqHeadingPrefix: "Medicaid: ",
    faqHeadingHighlight: "Preguntas Frecuentes",
    faqSubtitle: "Encuentre respuestas a sus preguntas sobre la elegibilidad y los beneficios de Medicaid.",
    faqQuestions: [
      "¿Qué es Medicaid?",
      "¿Cómo sé si califico para Medicaid?",
      "¿Cuál es la diferencia entre Medicaid y Medicare?",
      "¿Cuál es la diferencia entre Medicaid y Obamacare (ACA)?",
      "¿Qué cubre Florida Medicaid?",
      "¿Cómo solicito Medicaid en Florida?",
      "¿Cuánto tiempo tarda el proceso de solicitud de Medicaid?",
      "¿Qué es CHIP (Programa de Seguro Médico para Niños)?",
      "¿Puedo obtener Medicaid si estoy trabajando?",
      "¿Cómo ayuda Javi's Insurance con Medicaid?"
    ],
    faqAnswers: [
      "Medicaid es un programa conjunto federal y estatal que ofrece cobertura de salud gratuita o de bajo costo a más de 85 millones de estadounidenses. Cubre a adultos de bajos ingresos, niños, mujeres embarazadas, adultos mayores y personas con discapacidad que sean elegibles. Cada estado administra su propio programa de Medicaid dentro de las directrices federales, por lo que los beneficios y la elegibilidad pueden variar según el estado.",
      "La elegibilidad depende de los ingresos de su hogar, el tamaño de su familia, la edad, el estado de discapacidad, el estatus de ciudadanía/inmigración y las reglas específicas de su estado. En Florida, usted puede calificar si es un niño, una mujer embarazada, padre/cuidador de un niño, adulto mayor (65+), o tiene una discapacidad y cumple con los requisitos de ingresos. Los límites de ingresos varían según la categoría; por ejemplo, los niños pueden calificar con ingresos del hogar de hasta el 200% del nivel federal de pobreza.",
      "Medicare es un programa federal principalmente para personas de 65 años o más o con ciertas discapacidades, sin importar sus ingresos. Medicaid es para personas con ingresos limitados, sin importar la edad. Usted puede calificar para ambos (lo que se llama 'doble elegibilidad'), lo cual ofrece una cobertura integral y ayuda con los costos de Medicare. Nuestros agentes pueden ayudarle a determinar si califica para beneficios dobles.",
      "El Mercado de ACA ofrece seguros privados con subsidios para quienes tienen ingresos por encima de los límites de Medicaid (generalmente 138% del FPL en los estados con expansión). Medicaid ofrece cobertura gratuita o de muy bajo costo para quienes tienen los ingresos más bajos. Cuando solicita en HealthCare.gov, se evalúa automáticamente su elegibilidad para Medicaid. Le ayudamos a entender qué programa es el adecuado para usted según sus ingresos y circunstancias.",
      "Florida Medicaid cubre una amplia gama de servicios, incluyendo: visitas al médico, atención hospitalaria, medicamentos recetados, análisis de laboratorio, radiografías, servicios de salud mental, tratamiento por abuso de sustancias, cuidado de maternidad, visitas de niño sano e inmunizaciones, atención médica en el hogar, cuidado en centros de enfermería y transporte a citas médicas. Algunos servicios pueden requerir autorización previa.",
      "Puede solicitar a través de ACCESS Florida (myflorida.com/accessflorida), por teléfono al 1-866-762-2237, en persona en una oficina del Departamento de Niños y Familias (DCF), o por correo. Deberá proporcionar documentación que incluya prueba de identidad, ingresos, residencia y estatus de ciudadanía/inmigración. Nuestros agentes pueden ayudarle a guiarlo a través del proceso de solicitud y asegurarse de que tenga todos los documentos requeridos.",
      "Florida debe procesar las solicitudes dentro de 45 días (90 días para la elegibilidad por discapacidad). El tiempo de procesamiento depende de qué tan completa esté su solicitud y de si se necesita documentación adicional. Le ayudamos a agilizar su solicitud asegurándonos de que toda la documentación requerida esté completa y correcta desde el principio.",
      "CHIP ofrece cobertura de salud de bajo costo para niños en familias cuyos ingresos son demasiado altos para Medicaid pero que no pueden pagar un seguro privado. En Florida, esto se llama Florida KidCare e incluye MediKids, Florida Healthy Kids y Children's Medical Services. Las primas se basan en el tamaño de la familia y los ingresos, y muchas familias pagan entre $15 y $20 al mes o menos.",
      "¡Sí! Tener un trabajo no lo descalifica de Medicaid. La elegibilidad se basa en el nivel de ingresos de su hogar, no en su situación laboral. Muchas familias trabajadoras califican para Medicaid, especialmente aquellas con niños. Florida también tiene programas para ayudar a las personas a pasar de Medicaid a la cobertura del empleador sin perder beneficios.",
      "Ofrecemos asistencia gratuita y confidencial tanto para nuevas solicitudes de Medicaid como para renovaciones. Nuestros agentes licenciados le ayudan a entender los requisitos de elegibilidad, reunir la documentación requerida, completar las solicitudes o el papeleo de renovación con precisión, dar seguimiento a casos pendientes y conectarlo con otros programas para los que pueda calificar (como SNAP o TANF). Ya sea que esté solicitando por primera vez o renovando su cobertura actual, nuestro servicio no le cuesta nada: estamos aquí para ayudarle a obtener y mantener la cobertura que necesita."
    ],

    moreInfoTitle: "¿Necesita Más Información?",
    moreInfoText: "Visite los sitios web oficiales del gobierno para obtener recursos adicionales de Medicaid y solicitar directamente en línea.",
    moreInfoFlorida: "Florida Medicaid",
    moreInfoMedicaidGov: "Medicaid.gov",

    applyBadge: "Asistencia Gratuita",
    applyHeadingPrefix: "Obtenga Ayuda con Su ",
    applyHeadingHighlight: "Solicitud o Renovación de Medicaid",
    applySubtitle: "Nuestros agentes licenciados ofrecen asistencia gratuita y confidencial con nuevas solicitudes y renovaciones de Medicaid. Le ayudaremos a entender su elegibilidad y lo guiaremos en cada paso.",
    feature1Title: "Servicio 100% Gratuito",
    feature1Desc: "Nunca cobramos por nuestra asistencia. Nuestra meta es ayudarle a obtener cobertura.",
    feature2Title: "Agentes Licenciados",
    feature2Desc: "Nuestro equipo está capacitado y certificado para ayudar con la inscripción en Medicaid.",
    feature3Title: "Confidencial",
    feature3Desc: "Su información está segura y solo se utiliza para ayudar con su solicitud.",

    resourcesTitle: "Recursos Oficiales del Gobierno",
    resourceFloridaName: "Florida Medicaid",
    resourceFloridaDesc: "Programa Estatal Oficial",
    resourceAccessName: "ACCESS Florida",
    resourceAccessDesc: "Solicite beneficios en línea",
    resourceMedicaidGovName: "Medicaid.gov",
    resourceMedicaidGovDesc: "Información federal de Medicaid",
    resourceKidCareName: "Florida KidCare",
    resourceKidCareDesc: "Cobertura de salud para niños",
    phoneHelpPrefix: "¿Necesita ayuda inmediata? Llame a Florida Medicaid al ",
    phoneHelpMiddle: " o a ACCESS Florida al ",

    formTitle: "Solicite Asistencia Gratuita",
    formSubtitle: "Complete el formulario y un agente licenciado se comunicará con usted dentro de 24 horas.",

    ctaTitle: "¿Necesita Ayuda Hoy?",
    ctaText: "Hable con un agente licenciado ahora. Estamos aquí para ayudarle a obtener cobertura.",
    ctaButton: "Llame al (305) 390-8679"
  }
};

const eligibilityGroups = [
  { icon: Users },
  { icon: Heart },
  { icon: Users },
  { icon: FileText }
];

const howSteps = [
  { step: "01" },
  { step: "02" },
  { step: "03" },
  { step: "04" }
];

export const MedicaidPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const { language } = useLanguage();
  const c = copy[language];

  const faqs = c.faqQuestions.map((q, i) => ({ q, a: c.faqAnswers[i] }));

  return (
    <div className="min-h-screen bg-white font-sans text-text-main">
      <Navbar />

      {/* Official Portal Banner */}
      <div className="bg-bright-red text-white py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-sm font-medium">{c.bannerText}</span>
          <a
            href={FLORIDA_MEDICAID_URL}
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
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/5 via-transparent to-deep-blue/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-dots-pattern -z-10 opacity-20" />

        {/* Decorative color orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-bright-red/5 rounded-full blur-2xl -z-10" />

        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 lg:w-1/2"
          >
            <span className="badge-trust border-deep-blue">
              <Heart size={16} className="text-deep-blue" />
              {c.heroBadge}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
              <span className="text-gradient-secondary">{c.heroHeadingPrefix}</span>{c.heroHeadingSuffix}
            </h1>

            <p className="text-xl text-text-muted max-w-lg leading-relaxed">
              {c.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#apply"
                className="bg-deep-blue text-white px-8 py-4 rounded-full font-bold hover:bg-deep-blue/90 transition-colors shadow-lg text-center"
              >
                {c.heroCtaPrimary}
              </a>
              <a
                href="tel:305-390-8679"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                (305) 390-8679
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-secondary">85M+</div>
                <div className="text-sm text-text-muted">{c.statAmericansLabel}</div>
              </div>
              <div className="w-px h-12 bg-silver/50" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-primary">$0</div>
                <div className="text-sm text-text-muted">{c.statFeeLabel}</div>
              </div>
              <div className="w-px h-12 bg-silver/50" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-secondary">{c.statFreeValue}</div>
                <div className="text-sm text-text-muted">{c.statFreeLabel}</div>
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
              src="/images/medicaid-hero.webp"
              fetchPriority="high"
              decoding="async"
              alt={c.heroImageAlt}
              className="relative rounded-[2rem] lg:rounded-[3rem] shadow-premium w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
            />

            {/* Floating badge */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-deep-blue/10">
                  <CheckCircle size={24} className="text-deep-blue" />
                </div>
                <div>
                  <div className="font-bold text-gradient-secondary">{c.floatingBadgeTitle}</div>
                  <div className="text-sm text-gray-500">{c.floatingBadgeSubtitle}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Programs Banner */}
      <section className="bg-gray-50 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
            <span className="text-gray-500 font-medium">{c.relatedLabel}</span>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/obamacare"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold hover:border-bright-red hover:text-bright-red transition-colors"
              >
                <Heart size={16} />
                {c.relatedObamacare}
              </Link>
              <Link
                to="/medicare"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold hover:border-deep-blue hover:text-deep-blue transition-colors"
              >
                <Users size={16} />
                {c.relatedMedicare}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who Qualifies Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 mb-6 bg-deep-blue/5">
              <span className="w-2 h-2 rounded-full bg-deep-blue" />
              <span className="text-sm font-bold uppercase tracking-wider text-gradient-secondary">{c.eligibilityBadge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              {c.eligibilityHeadingPrefix}<span className="text-gradient-primary">{c.eligibilityHeadingHighlight}</span>{c.eligibilityHeadingSuffix}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {c.eligibilitySubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eligibilityGroups.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 bg-light-blue/20">
                  <group.icon size={28} className="text-deep-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{c.eligibilityGroupTitles[i]}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.eligibilityGroupDescriptions[i]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                {c.benefitsHeadingPrefix}<span className="text-gradient-secondary">{c.benefitsHeadingHighlight}</span>{c.benefitsHeadingSuffix}
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                {c.benefitsSubtitle}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {c.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={20} className="flex-shrink-0 text-bright-red" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/family-living-room.webp"
                loading="lazy"
                decoding="async"
                alt={c.benefitsImageAlt}
                className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              {c.howHeadingPrefix}<span className="text-gradient-secondary">{c.howHeadingHighlight}</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {c.howSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {howSteps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl bg-bright-red">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{c.howStepTitles[i]}</h3>
                <p className="text-gray-500 text-sm">{c.howStepDescriptions[i]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-cream relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              {c.faqHeadingPrefix}<span className="text-gradient-secondary">{c.faqHeadingHighlight}</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
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
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === actualIndex ? -1 : actualIndex)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 flex-shrink-0 text-bright-red" />
                          <span className="font-bold text-gray-800 pr-4">{faq.q}</span>
                        </div>
                        <ChevronDown
                          className={`transition-transform duration-300 flex-shrink-0 text-deep-blue ${openFaq === actualIndex ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === actualIndex ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-gray-500 leading-relaxed pl-8">{faq.a}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Official Medicaid.gov Button */}
          <div className="mt-12 bg-[#00796B]/5 rounded-2xl p-8 border border-[#00796B]/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{c.moreInfoTitle}</h4>
                <p className="text-gray-500">{c.moreInfoText}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={FLORIDA_MEDICAID_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#00796B] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#004D40] transition-colors shadow-lg whitespace-nowrap"
                >
                  <ExternalLink size={18} />
                  {c.moreInfoFlorida}
                </a>
                <a
                  href={MEDICAID_GOV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#00796B] border-2 border-[#00796B] px-6 py-4 rounded-xl font-bold hover:bg-[#00796B]/10 transition-colors whitespace-nowrap"
                >
                  <ExternalLink size={18} />
                  {c.moreInfoMedicaidGov}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection filter="all" />

      {/* Application Form Section */}
      <section id="apply" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 mb-6 bg-light-blue/10">
                <span className="w-2 h-2 rounded-full bg-deep-blue" />
                <span className="text-sm font-bold uppercase tracking-wider text-gradient-secondary">{c.applyBadge}</span>
              </div>

              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                {c.applyHeadingPrefix}<span className="text-gradient-primary">{c.applyHeadingHighlight}</span>
              </h2>

              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                {c.applySubtitle}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-light-blue/20">
                    <CheckCircle size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800">{c.feature1Title}</h4>
                    <p className="text-gray-500 text-sm">{c.feature1Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-light-blue/20">
                    <Users size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800">{c.feature2Title}</h4>
                    <p className="text-gray-500 text-sm">{c.feature2Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-light-blue/20">
                    <FileText size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800">{c.feature3Title}</h4>
                    <p className="text-gray-500 text-sm">{c.feature3Desc}</p>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="mt-8 p-6 bg-[#00796B]/5 rounded-xl border border-[#00796B]/20">
                <h4 className="font-bold mb-4 text-gray-800">{c.resourcesTitle}</h4>
                <div className="space-y-3">
                  <a
                    href={FLORIDA_MEDICAID_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#00796B] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#00796B] rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#00796B]">{c.resourceFloridaName}</div>
                      <div className="text-xs text-gray-500">{c.resourceFloridaDesc}</div>
                    </div>
                  </a>
                  <a
                    href={ACCESS_FLORIDA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#00796B] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#00796B]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#00796B]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#00796B]">{c.resourceAccessName}</div>
                      <div className="text-xs text-gray-500">{c.resourceAccessDesc}</div>
                    </div>
                  </a>
                  <a
                    href={MEDICAID_GOV_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#00796B] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#00796B]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#00796B]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#00796B]">{c.resourceMedicaidGovName}</div>
                      <div className="text-xs text-gray-500">{c.resourceMedicaidGovDesc}</div>
                    </div>
                  </a>
                  <a
                    href="https://www.floridakidcare.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#00796B] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#00796B]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#00796B]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#00796B]">{c.resourceKidCareName}</div>
                      <div className="text-xs text-gray-500">{c.resourceKidCareDesc}</div>
                    </div>
                  </a>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">
                    {c.phoneHelpPrefix}<a href="tel:1-877-711-3662" className="text-[#00796B] font-bold hover:underline">1-877-711-3662</a>{c.phoneHelpMiddle}<a href="tel:1-866-762-2237" className="text-[#00796B] font-bold hover:underline">1-866-762-2237</a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Application Form */}
            <ContactForm
              productType="medicaid"
              title={c.formTitle}
              subtitle={c.formSubtitle}
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-deep-blue relative overflow-hidden">
        {/* Gradient overlays to match other CTA ribbons */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-transparent to-light-blue opacity-80" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bright-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">{c.ctaTitle}</h3>
              <p className="text-white/90">{c.ctaText}</p>
            </div>
            <a
              href="tel:305-390-8679"
              className="bg-white text-deep-blue px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Phone size={20} />
              {c.ctaButton}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
