import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, HelpCircle, Smile, Eye, Sparkles, ShieldCheck, DollarSign, Users, Clock, Phone, CheckCircle } from 'lucide-react';
import { Navbar, Footer } from '../components/Layout';
import { ContactForm } from '../components/ContactForm';
import { StickyQuoteButton } from '../components/QuoteButton';
import { TrustBadges } from '../components/TrustBadges';
import { useLanguage } from '../i18n';

// Dental / Vision brand accent
const accent = '#7C3AED';

const copy = {
  en: {
    badge: 'Dental & Vision Coverage',
    heroHeadline1: 'Healthy Smiles &',
    heroHeadline2: 'Clear Vision',
    heroSubtitle: 'Affordable standalone dental and vision plans for individuals and families. Enroll any time — our licensed agents help you find the right coverage at no cost to you.',
    getFreeQuote: 'Get a Free Quote',
    stat1Value: '2x',
    stat1Label: 'Free Cleanings Per Year',
    stat2Value: 'Year-Round',
    stat2Label: 'Open Enrollment',
    stat3Value: 'Free',
    stat3Label: 'Agent Help',
    visionIncluded: 'Vision Included',
    visionIncludedSub: 'Exams + eyewear',
    benefitsBadge: 'Why Add Coverage',
    benefitsHeading1: 'Care for Your',
    benefitsHeading2: 'Teeth & Eyes',
    benefitsSubtitle: 'Routine dental and vision care protects your overall health — and catching problems early saves you money.',
    coveredBadge: "What's Covered",
    coveredHeading: "Coverage You'll Actually Use",
    coveredSubtitle: 'From everyday cleanings to glasses and major dental work, our plans help you keep more money in your pocket.',
    enrollHeading: 'Enroll Any Time',
    enrollParagraph: "Unlike major medical coverage, dental and vision plans are available all year. There's no need to wait for Open Enrollment.",
    enrollList1: 'No limited enrollment window',
    enrollList2: 'Preventive care often covered day one',
    enrollList3: 'Individual and family options',
    enrollList4: 'Low monthly premiums',
    faqBadge: 'FAQ',
    faqHeading1: 'Dental & Vision',
    faqHeading2: 'Questions',
    ctaHeading: 'Ready to Protect Your Smile?',
    ctaSubtitle: 'Get a free quote in minutes. Our licensed agents are here to help.',
    contactBadge: 'Contact Us',
    contactHeading1: 'Get a',
    contactHeading2: 'Dental & Vision',
    contactHeading3: 'Quote',
    contactSubtitle: "Tell us a little about what you're looking for and a licensed agent will reach out with affordable plan options — at no cost to you.",
    contactFeature1Title: 'Enroll Year-Round',
    contactFeature1Desc: "No waiting for Open Enrollment — get covered whenever you're ready.",
    contactFeature2Title: 'Individual or Family',
    contactFeature2Desc: 'Plans sized for just you or your whole household.',
    contactFeature3Title: 'Free Consultation',
    contactFeature3Desc: "Speak with a licensed agent at no cost. We're paid by insurers, not you.",
    formTitle: 'Request a Dental & Vision Quote',
    formSubtitle: 'Fill out the form and a licensed agent will contact you within 24 hours.',
    benefitTitles: [
      'Comprehensive Dental',
      'Complete Vision Care',
      'Affordable Premiums',
      'Individual or Family',
    ],
    benefitDescriptions: [
      'Coverage for cleanings, exams, fillings, crowns, root canals, and major procedures. Many plans cover two preventive cleanings per year at no cost.',
      'Annual eye exams, allowances for glasses and contact lenses, and discounts on frames and lenses from a wide network of providers.',
      'Standalone dental and vision plans start at low monthly rates. We compare options across carriers to find the best value for your budget.',
      "Whether you need coverage just for yourself or for your whole family, we help you find a plan that fits everyone's needs.",
    ],
    whatsCovered: [
      'Routine cleanings and exams',
      'X-rays and preventive care',
      'Fillings and extractions',
      'Crowns, bridges, and dentures',
      'Root canals and oral surgery',
      'Annual eye exams',
      'Glasses and contact lens allowances',
      'Discounts on frames and designer brands',
    ],
    faqQuestions: [
      'Can I buy dental and vision coverage on its own?',
      'Is there a waiting period before I can use my coverage?',
      'Can I keep my current dentist or eye doctor?',
      'How much does dental and vision insurance cost?',
      'Does Medicare cover dental and vision?',
    ],
    faqAnswers: [
      'Yes. Standalone dental and vision plans are available year-round and do not require you to have other health insurance. You can enroll any time — there is no limited enrollment window like there is for major medical plans.',
      'Preventive services like cleanings and exams are usually available immediately. Some plans have short waiting periods for major services such as crowns or dentures. We will help you find a plan that matches how soon you need care.',
      'Many plans offer large provider networks, and some allow out-of-network care at a higher cost. Before you enroll, we verify whether your preferred dentist or optometrist participates so there are no surprises.',
      'Premiums vary by plan, location, and whether you choose individual or family coverage, but standalone plans are among the most affordable insurance products available. Our agents compare options so you only pay for the coverage you need.',
      'Original Medicare generally does not cover routine dental or vision care. Some Medicare Advantage plans include these benefits. If you are on Medicare, we can help you compare adding a standalone plan or a Medicare Advantage plan that includes dental and vision.',
    ],
  },
  es: {
    badge: 'Cobertura Dental y de Visión',
    heroHeadline1: 'Sonrisas Sanas y',
    heroHeadline2: 'Visión Clara',
    heroSubtitle: 'Planes dentales y de visión independientes y accesibles para individuos y familias. Inscríbase en cualquier momento — nuestros agentes con licencia le ayudan a encontrar la cobertura adecuada sin costo alguno para usted.',
    getFreeQuote: 'Obtenga una Cotización Gratis',
    stat1Value: '2x',
    stat1Label: 'Limpiezas Gratis al Año',
    stat2Value: 'Todo el Año',
    stat2Label: 'Inscripción',
    stat3Value: 'Gratis',
    stat3Label: 'Ayuda de un Agente',
    visionIncluded: 'Visión Incluida',
    visionIncludedSub: 'Exámenes + lentes',
    benefitsBadge: 'Por Qué Agregar Cobertura',
    benefitsHeading1: 'Cuide Sus',
    benefitsHeading2: 'Dientes y Ojos',
    benefitsSubtitle: 'El cuidado dental y de visión de rutina protege su salud general — y detectar problemas a tiempo le ahorra dinero.',
    coveredBadge: 'Qué se Cubre',
    coveredHeading: 'Cobertura Que Realmente Usará',
    coveredSubtitle: 'Desde limpiezas cotidianas hasta lentes y trabajos dentales mayores, nuestros planes le ayudan a conservar más dinero en su bolsillo.',
    enrollHeading: 'Inscríbase en Cualquier Momento',
    enrollParagraph: 'A diferencia de la cobertura médica mayor, los planes dentales y de visión están disponibles todo el año. No es necesario esperar al período de Inscripción Abierta.',
    enrollList1: 'Sin período de inscripción limitado',
    enrollList2: 'El cuidado preventivo a menudo se cubre desde el primer día',
    enrollList3: 'Opciones individuales y familiares',
    enrollList4: 'Primas mensuales bajas',
    faqBadge: 'Preguntas Frecuentes',
    faqHeading1: 'Preguntas sobre',
    faqHeading2: 'Dental y Visión',
    ctaHeading: '¿Listo para Proteger Su Sonrisa?',
    ctaSubtitle: 'Obtenga una cotización gratis en minutos. Nuestros agentes con licencia están aquí para ayudarle.',
    contactBadge: 'Contáctenos',
    contactHeading1: 'Obtenga una Cotización',
    contactHeading2: 'Dental y de Visión',
    contactHeading3: '',
    contactSubtitle: 'Cuéntenos un poco sobre lo que busca y un agente con licencia se comunicará con usted con opciones de planes accesibles — sin costo alguno para usted.',
    contactFeature1Title: 'Inscríbase Todo el Año',
    contactFeature1Desc: 'Sin esperar a la Inscripción Abierta — obtenga cobertura cuando esté listo.',
    contactFeature2Title: 'Individual o Familiar',
    contactFeature2Desc: 'Planes a la medida solo para usted o para todo su hogar.',
    contactFeature3Title: 'Consulta Gratuita',
    contactFeature3Desc: 'Hable con un agente con licencia sin costo. Las aseguradoras nos pagan, no usted.',
    formTitle: 'Solicite una Cotización Dental y de Visión',
    formSubtitle: 'Complete el formulario y un agente con licencia se comunicará con usted dentro de 24 horas.',
    benefitTitles: [
      'Dental Integral',
      'Cuidado Completo de la Visión',
      'Primas Accesibles',
      'Individual o Familiar',
    ],
    benefitDescriptions: [
      'Cobertura para limpiezas, exámenes, empastes, coronas, endodoncias y procedimientos mayores. Muchos planes cubren dos limpiezas preventivas al año sin costo.',
      'Exámenes de la vista anuales, asignaciones para anteojos y lentes de contacto, y descuentos en armazones y lentes de una amplia red de proveedores.',
      'Los planes dentales y de visión independientes comienzan con tarifas mensuales bajas. Comparamos opciones entre aseguradoras para encontrar el mejor valor para su presupuesto.',
      'Ya sea que necesite cobertura solo para usted o para toda su familia, le ayudamos a encontrar un plan que se ajuste a las necesidades de todos.',
    ],
    whatsCovered: [
      'Limpiezas y exámenes de rutina',
      'Radiografías y cuidado preventivo',
      'Empastes y extracciones',
      'Coronas, puentes y dentaduras',
      'Endodoncias y cirugía oral',
      'Exámenes de la vista anuales',
      'Asignaciones para anteojos y lentes de contacto',
      'Descuentos en armazones y marcas de diseñador',
    ],
    faqQuestions: [
      '¿Puedo comprar cobertura dental y de visión por separado?',
      '¿Hay un período de espera antes de poder usar mi cobertura?',
      '¿Puedo conservar a mi dentista u oftalmólogo actual?',
      '¿Cuánto cuesta el seguro dental y de visión?',
      '¿Medicare cubre dental y visión?',
    ],
    faqAnswers: [
      'Sí. Los planes dentales y de visión independientes están disponibles todo el año y no requieren que usted tenga otro seguro de salud. Puede inscribirse en cualquier momento — no hay un período de inscripción limitado como lo hay para los planes médicos mayores.',
      'Los servicios preventivos como limpiezas y exámenes generalmente están disponibles de inmediato. Algunos planes tienen períodos de espera cortos para servicios mayores como coronas o dentaduras. Le ayudaremos a encontrar un plan que se ajuste a la rapidez con que necesita atención.',
      'Muchos planes ofrecen amplias redes de proveedores, y algunos permiten atención fuera de la red a un mayor costo. Antes de inscribirse, verificamos si su dentista u optometrista preferido participa para que no haya sorpresas.',
      'Las primas varían según el plan, la ubicación y si elige cobertura individual o familiar, pero los planes independientes están entre los productos de seguro más accesibles disponibles. Nuestros agentes comparan opciones para que usted solo pague por la cobertura que necesita.',
      'Original Medicare generalmente no cubre el cuidado dental o de visión de rutina. Algunos planes Medicare Advantage incluyen estos beneficios. Si usted tiene Medicare, podemos ayudarle a comparar agregar un plan independiente o un plan Medicare Advantage que incluya dental y visión.',
    ],
  },
};

const benefitIcons = [Smile, Eye, DollarSign, Users];

const faqIcons = [HelpCircle, HelpCircle, HelpCircle, HelpCircle, HelpCircle];

export const DentalVisionPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const { language } = useLanguage();
  const c = copy[language];

  const benefits = benefitIcons.map((icon, i) => ({
    icon,
    title: c.benefitTitles[i],
    description: c.benefitDescriptions[i],
  }));

  const whatsCovered = c.whatsCovered;

  const faqs = faqIcons.map((_, i) => ({
    q: c.faqQuestions[i],
    a: c.faqAnswers[i],
  }));

  return (
    <div className="min-h-screen bg-cream font-sans text-text-main overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 via-transparent to-[#7C3AED]/10 -z-10" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-deep-blue/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 lg:w-1/2"
          >
            <span className="badge-trust" style={{ borderColor: accent }}>
              <Sparkles size={16} style={{ color: accent }} />
              {c.badge}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
              {c.heroHeadline1}{' '}
              <span style={{ color: accent }}>{c.heroHeadline2}</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-muted max-w-lg leading-relaxed">
              {c.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full font-bold transition-opacity hover:opacity-90 shadow-lg"
                style={{ backgroundColor: accent }}
              >
                <Smile size={20} />
                {c.getFreeQuote}
              </a>
              <a
                href="tel:310-437-2766"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                (310) 437-2766
              </a>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-8 pt-6 w-full">
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: accent }}>{c.stat1Value}</div>
                <div className="text-[10px] sm:text-sm text-text-muted leading-tight mt-1">{c.stat1Label}</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-silver/50" />
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: accent }}>{c.stat2Value}</div>
                <div className="text-[10px] sm:text-sm text-text-muted leading-tight mt-1">{c.stat2Label}</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-silver/50" />
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: accent }}>{c.stat3Value}</div>
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
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 to-[#7C3AED]/20 rounded-[2rem] lg:rounded-[3rem] transform rotate-2" />
            <img
              src="/images/family-living-room.webp"
              fetchPriority="high"
              decoding="async"
              alt="Family smiling together"
              className="relative rounded-[2rem] lg:rounded-[3rem] shadow-premium w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
            />
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-4 md:-bottom-6 left-2 md:-left-6 glass p-3 md:p-5 rounded-2xl shadow-premium border border-white/50 max-w-[85%] sm:max-w-none"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex-shrink-0 w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}1A` }}>
                  <Eye size={20} style={{ color: accent }} className="md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm md:text-base truncate" style={{ color: accent }}>{c.visionIncluded}</div>
                  <div className="text-xs md:text-sm text-text-muted truncate">{c.visionIncludedSub}</div>
                </div>
              </div>
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

      {/* Benefits */}
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
              {c.benefitsHeading1} <span style={{ color: accent }}>{c.benefitsHeading2}</span>
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
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: `${accent}15` }}>
                  <benefit.icon size={32} style={{ color: accent }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Covered */}
      <section className="section-padding" style={{ backgroundColor: `${accent}08` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-trust mb-4">{c.coveredBadge}</span>
              <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                {c.coveredHeading}
              </h2>
              <p className="text-text-muted text-lg mb-8 leading-relaxed">
                {c.coveredSubtitle}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {whatsCovered.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} style={{ color: accent }} className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
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
              <h3 className="text-2xl font-bold mb-6" style={{ color: accent }}>{c.enrollHeading}</h3>
              <p className="text-text-muted mb-6">
                {c.enrollParagraph}
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Clock size={16} style={{ color: accent }} />{c.enrollList1}</li>
                <li className="flex items-center gap-2"><ShieldCheck size={16} style={{ color: accent }} />{c.enrollList2}</li>
                <li className="flex items-center gap-2"><Users size={16} style={{ color: accent }} />{c.enrollList3}</li>
                <li className="flex items-center gap-2"><DollarSign size={16} style={{ color: accent }} />{c.enrollList4}</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-trust mb-4">{c.faqBadge}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              {c.faqHeading1} <span className="text-gradient-secondary">{c.faqHeading2}</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 flex-shrink-0" style={{ color: accent }} />
                    <span className="font-bold text-text-main pr-4">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}
                    style={{ color: accent }}
                  />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-text-muted leading-relaxed pl-8">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, ${accent} 0%, #5B21B6 100%)` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">{c.ctaHeading}</h3>
              <p className="text-white/80">{c.ctaSubtitle}</p>
            </div>
            <a
              href="#contact"
              className="bg-white px-8 py-4 rounded-full font-bold hover:bg-cream transition-colors flex items-center justify-center gap-2 shadow-lg"
              style={{ color: accent }}
            >
              <Smile size={20} />
              {c.getFreeQuote}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
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
                {c.contactHeading1} <span style={{ color: accent }}>{c.contactHeading2}</span> {c.contactHeading3}
              </h2>
              <p className="text-text-muted text-lg mb-8">
                {c.contactSubtitle}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accent}15` }}>
                    <Clock size={24} style={{ color: accent }} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{c.contactFeature1Title}</h4>
                    <p className="text-text-muted text-sm">{c.contactFeature1Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accent}15` }}>
                    <Users size={24} style={{ color: accent }} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{c.contactFeature2Title}</h4>
                    <p className="text-text-muted text-sm">{c.contactFeature2Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accent}15` }}>
                    <DollarSign size={24} style={{ color: accent }} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{c.contactFeature3Title}</h4>
                    <p className="text-text-muted text-sm">{c.contactFeature3Desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <ContactForm
              productType="dental"
              title={c.formTitle}
              subtitle={c.formSubtitle}
            />
          </div>
        </div>
      </section>

      <Footer />

      <StickyQuoteButton href="#contact" label={c.getFreeQuote} />
    </div>
  );
};
