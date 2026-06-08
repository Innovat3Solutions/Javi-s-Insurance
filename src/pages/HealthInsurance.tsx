import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { ContactForm } from '../components/ContactForm';
import { QuoteButton, StickyQuoteButton } from '../components/QuoteButton';
import { TrustBadges } from '../components/TrustBadges';
import { ProcessTimelineCompact } from '../components/ProcessTimeline';
import { useLanguage } from '../i18n';
import {
    ShieldIcon,
    ShieldPlus,
    HeartIcon,
    PhoneIcon
} from '../components/BrandIcons';

const HEALTH_QUOTE_URL = "/quote";

const copy = {
    en: {
        heroBadge: 'Individual & Family Coverage',
        heroHeadingLead: 'Comprehensive',
        heroHeadingHighlight: 'Health Insurance',
        heroParagraph: 'Find the perfect health insurance plan for you and your family. We compare top providers to get you the best coverage at the most affordable price.',
        heroQuoteLabel: 'Get Health Quotes',
        processBadge: 'Simple Process',
        processHeadingLead: 'How We',
        processHeadingHighlight: 'Help You Select',
        whyBadge: 'Expert Guidance',
        whyHeadingLead: 'Your Health is',
        whyHeadingHighlight: 'Our Priority',
        whyParagraph: 'Navigating individual and family health insurance plans can be overwhelming. Our licensed experts simplify the process, helping you find comprehensive coverage that fits your lifestyle and budget.',
        whyFeature1Title: 'Tailored for You',
        whyFeature1Body: 'We assess your specific medical needs and match you with the right providers and plans.',
        whyFeature2Title: 'Trusted Partners',
        whyFeature2Body: 'We partner with top-rated insurance carriers to ensure you receive quality care at competitive rates.',
        coupleImageAlt: 'Couple consulting with an insurance agent',
        familyImageAlt: 'Family health coverage',
        contactBadge: 'Contact Us',
        contactHeadingLead: 'Need Help Finding',
        contactHeadingHighlight: 'Coverage',
        contactParagraph: 'Our licensed agents are standing by to help you compare plans and find the perfect match for your healthcare needs and budget.',
        contactFeature1Title: 'Plan Comparison',
        contactFeature1Body: 'Compare HMOs, PPOs, and high-deductible plans side by side.',
        contactFeature2Title: 'Free Consultation',
        contactFeature2Body: 'No pressure, no obligation. Just helpful guidance from experts.',
        formTitle: 'Request Health Guidance',
        formSubtitle: 'Fill out the form below and an agent will contact you shortly.',
        stickyLabel: 'Compare Health Plans',
    },
    es: {
        heroBadge: 'Cobertura Individual y Familiar',
        heroHeadingLead: 'Seguro de Salud',
        heroHeadingHighlight: 'Integral',
        heroParagraph: 'Encuentre el plan de seguro de salud perfecto para usted y su familia. Comparamos a los mejores proveedores para conseguirle la mejor cobertura al precio más accesible.',
        heroQuoteLabel: 'Obtener Cotizaciones de Salud',
        processBadge: 'Proceso Sencillo',
        processHeadingLead: 'Cómo le',
        processHeadingHighlight: 'Ayudamos a Elegir',
        whyBadge: 'Asesoría Experta',
        whyHeadingLead: 'Su Salud es',
        whyHeadingHighlight: 'Nuestra Prioridad',
        whyParagraph: 'Elegir entre planes de seguro de salud individuales y familiares puede ser abrumador. Nuestros expertos con licencia simplifican el proceso y le ayudan a encontrar una cobertura integral que se ajuste a su estilo de vida y presupuesto.',
        whyFeature1Title: 'Hecho a Su Medida',
        whyFeature1Body: 'Evaluamos sus necesidades médicas específicas y lo conectamos con los proveedores y planes adecuados.',
        whyFeature2Title: 'Socios de Confianza',
        whyFeature2Body: 'Trabajamos con aseguradoras de primer nivel para garantizar que reciba atención de calidad a tarifas competitivas.',
        coupleImageAlt: 'Pareja consultando con un agente de seguros',
        familyImageAlt: 'Cobertura de salud familiar',
        contactBadge: 'Contáctenos',
        contactHeadingLead: '¿Necesita Ayuda para Encontrar',
        contactHeadingHighlight: 'Cobertura',
        contactParagraph: 'Nuestros agentes con licencia están listos para ayudarle a comparar planes y encontrar la opción perfecta para sus necesidades de salud y su presupuesto.',
        contactFeature1Title: 'Comparación de Planes',
        contactFeature1Body: 'Compare planes HMO, PPO y de deducible alto lado a lado.',
        contactFeature2Title: 'Consulta Gratuita',
        contactFeature2Body: 'Sin presión y sin compromiso. Solo orientación útil de nuestros expertos.',
        formTitle: 'Solicitar Asesoría de Salud',
        formSubtitle: 'Complete el formulario a continuación y un agente lo contactará en breve.',
        stickyLabel: 'Comparar Planes de Salud',
    },
};

export const HealthInsurancePage = () => {
    const { language } = useLanguage();
    const c = copy[language];

    return (
        <div className="min-h-screen bg-cream font-sans text-text-main">
            <Navbar />

            {/* Hero Section */}
            <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/5 via-transparent to-bright-red/5 -z-10" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-dots-pattern -z-10 opacity-20" />

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <span className="badge-trust">
                            <HeartIcon size={16} className="text-bright-red" />
                            {c.heroBadge}
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
                            {c.heroHeadingLead} <span className="text-gradient-secondary">{c.heroHeadingHighlight}</span>
                        </h1>

                        <p className="text-xl text-text-muted max-w-lg leading-relaxed">
                            {c.heroParagraph}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <QuoteButton
                                href={HEALTH_QUOTE_URL}
                                label={c.heroQuoteLabel}
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
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/10 to-bright-red/10 rounded-[3rem] transform -rotate-2" />

                        {/* TEMPORARY IMAGE HOLDER FOR HEALTH INSURANCE */}
                        <img
                            src="/images/health-hero.png"
                            alt={c.familyImageAlt}
                            className="relative rounded-[3rem] shadow-premium w-full h-[480px] object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Trust Bar */}
            <div className="bg-white py-8 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <TrustBadges variant="compact" />
                </div>
            </div>

            {/* Process Timeline */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="badge-trust mb-4">{c.processBadge}</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
                            {c.processHeadingLead} <span className="text-gradient-secondary">{c.processHeadingHighlight}</span>
                        </h2>
                    </motion.div>
                    <ProcessTimelineCompact product="health" />
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="badge-trust mb-4">{c.whyBadge}</span>
                            <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                                {c.whyHeadingLead} <span className="text-gradient-secondary">{c.whyHeadingHighlight}</span>
                            </h2>
                            <p className="text-text-muted text-lg mb-8">
                                {c.whyParagraph}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-bright-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <HeartIcon size={24} className="text-bright-red" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">{c.whyFeature1Title}</h4>
                                        <p className="text-text-muted text-sm">{c.whyFeature1Body}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <ShieldPlus size={24} className="text-deep-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">{c.whyFeature2Title}</h4>
                                        <p className="text-text-muted text-sm">{c.whyFeature2Body}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-bright-red/20 to-transparent rounded-[2rem] transform rotate-2" />
                            <img
                                src="/images/couple-with-agent.png"
                                alt={c.coupleImageAlt}
                                className="relative rounded-[2rem] shadow-premium w-full h-[400px] object-cover"
                            />
                        </motion.div>
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
                                {c.contactHeadingLead} <span className="text-gradient-secondary">{c.contactHeadingHighlight}</span>?
                            </h2>
                            <p className="text-text-muted text-lg mb-8">
                                {c.contactParagraph}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <ShieldIcon size={24} className="text-deep-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">{c.contactFeature1Title}</h4>
                                        <p className="text-text-muted text-sm">{c.contactFeature1Body}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <PhoneIcon size={24} className="text-deep-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">{c.contactFeature2Title}</h4>
                                        <p className="text-text-muted text-sm">{c.contactFeature2Body}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <ContactForm
                            productType="health"
                            title={c.formTitle}
                            subtitle={c.formSubtitle}
                        />
                    </div>
                </div>
            </section>

            <Footer />

            {/* Sticky Mobile Quote Button */}
            <StickyQuoteButton href={HEALTH_QUOTE_URL} label={c.stickyLabel} />
        </div>
    );
};
