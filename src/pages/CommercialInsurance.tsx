import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { QuoteButton, StickyQuoteButton } from '../components/QuoteButton';
import { TrustBadges } from '../components/TrustBadges';
import { ProcessTimelineCompact } from '../components/ProcessTimeline';
import {
    ShieldIcon,
    PhoneIcon,
    DocumentIcon
} from '../components/BrandIcons';
import { Building2, Send, Loader2, Shield, CheckCircle, Users, Briefcase } from 'lucide-react';
import { useLanguage } from '../i18n';

const COMMERCIAL_QUOTE_URL = "#contact";

const coverageTypeIcons = [ShieldIcon, Users, Building2, Briefcase];

const copy = {
    en: {
        heroBadge: "Javi's Insurance Services",
        heroHeadingPre: "Protect Your ",
        heroHeadingHighlight: "Business",
        heroSubtitle: "Safeguard your business operations, employees, and assets with customized commercial insurance policies built for your industry.",
        getBusinessQuote: "Get Business Quote",
        coverageBadge: "Coverage Options",
        coverageHeadingPre: "Business ",
        coverageHeadingHighlight: "Protection",
        coverageSubtitle: "Comprehensive coverage options to protect every aspect of your business.",
        coverageTypes: [
            {
                title: "General Liability",
                description: "Protection against third-party bodily injury and property damage claims."
            },
            {
                title: "Workers' Compensation",
                description: "Coverage for employee injuries and illnesses that occur on the job."
            },
            {
                title: "Commercial Auto",
                description: "Insurance for vehicles used for business purposes."
            },
            {
                title: "Business Owner's Policy",
                description: "Bundled coverage combining property and liability protection."
            }
        ],
        processBadge: "Simple Process",
        processHeadingPre: "How We ",
        processHeadingHighlight: "Protect Your Business",
        whyBadge: "Expert Protection",
        whyHeadingPre: "Secure Your ",
        whyHeadingHighlight: "Future",
        whyParagraph: "Every business is unique, and so are its risks. Our experienced commercial agents take the time to understand your operations, identifying vulnerabilities and structuring a policy that provides rock-solid defense against the unexpected.",
        whyPoint1Title: "Industry Specific Solutions",
        whyPoint1Desc: "Whether you run a tech startup or a construction firm, we have specialized policies built for your exact industry.",
        whyPoint2Title: "Comprehensive Risk Management",
        whyPoint2Desc: "We don't just sell insurance; we partner with you to minimize liability and lower your long-term premiums.",
        formBadge: "Get a Quote",
        formHeadingPre: "Commercial Insurance ",
        formHeadingHighlight: "Quote Request",
        formSubtitle: "Tell us about your business and we'll provide a customized insurance solution.",
        successTitle: "Quote Request Received!",
        successMessage: "Thank you for your interest. A commercial insurance specialist will contact you shortly to discuss your business needs.",
        contactInformation: "Contact Information",
        contactName: "Contact Name",
        emailAddress: "Email Address",
        businessInformation: "Business Information",
        businessName: "Business Name",
        businessAddress: "Business Address",
        typeOfBusiness: "Type of Business",
        businessTypePlaceholder: "e.g., Restaurant, Contractor, Retail",
        consent: "I consent to Javi's Insurance Services using this information to prepare a quote or estimate for my business. I agree to be contacted via email regarding my insurance request.",
        sslEncrypted: "256 bit SSL Encrypted",
        dataSecure: "Your data is secure",
        submitting: "Submitting...",
        getFreeQuote: "Get My Free Quote"
    },
    es: {
        heroBadge: "Javi's Insurance Services",
        heroHeadingPre: "Proteja Su ",
        heroHeadingHighlight: "Negocio",
        heroSubtitle: "Proteja las operaciones, los empleados y los activos de su negocio con pólizas de seguro comercial personalizadas y diseñadas para su industria.",
        getBusinessQuote: "Obtenga una Cotización Comercial",
        coverageBadge: "Opciones de Cobertura",
        coverageHeadingPre: "Protección para su ",
        coverageHeadingHighlight: "Negocio",
        coverageSubtitle: "Opciones de cobertura integrales para proteger cada aspecto de su negocio.",
        coverageTypes: [
            {
                title: "Responsabilidad Civil General",
                description: "Protección contra reclamaciones de terceros por lesiones corporales y daños a la propiedad."
            },
            {
                title: "Compensación Laboral",
                description: "Cobertura para lesiones y enfermedades de los empleados que ocurren en el trabajo."
            },
            {
                title: "Auto Comercial",
                description: "Seguro para vehículos utilizados con fines comerciales."
            },
            {
                title: "Póliza para Dueños de Negocio",
                description: "Cobertura combinada que une la protección de propiedad y responsabilidad civil."
            }
        ],
        processBadge: "Proceso Sencillo",
        processHeadingPre: "Cómo ",
        processHeadingHighlight: "Protegemos Su Negocio",
        whyBadge: "Protección Experta",
        whyHeadingPre: "Asegure Su ",
        whyHeadingHighlight: "Futuro",
        whyParagraph: "Cada negocio es único, al igual que sus riesgos. Nuestros agentes comerciales con experiencia se toman el tiempo para comprender sus operaciones, identificar vulnerabilidades y estructurar una póliza que ofrece una defensa sólida ante lo inesperado.",
        whyPoint1Title: "Soluciones Específicas por Industria",
        whyPoint1Desc: "Ya sea que dirija una empresa tecnológica emergente o una constructora, contamos con pólizas especializadas diseñadas para su industria específica.",
        whyPoint2Title: "Gestión Integral de Riesgos",
        whyPoint2Desc: "No solo vendemos seguros; nos asociamos con usted para minimizar la responsabilidad y reducir sus primas a largo plazo.",
        formBadge: "Obtenga una Cotización",
        formHeadingPre: "Solicitud de Cotización de ",
        formHeadingHighlight: "Seguro Comercial",
        formSubtitle: "Cuéntenos sobre su negocio y le brindaremos una solución de seguro personalizada.",
        successTitle: "¡Solicitud de Cotización Recibida!",
        successMessage: "Gracias por su interés. Un especialista en seguros comerciales se comunicará con usted en breve para hablar sobre las necesidades de su negocio.",
        contactInformation: "Información de Contacto",
        contactName: "Nombre de Contacto",
        emailAddress: "Correo Electrónico",
        businessInformation: "Información del Negocio",
        businessName: "Nombre del Negocio",
        businessAddress: "Dirección del Negocio",
        typeOfBusiness: "Tipo de Negocio",
        businessTypePlaceholder: "ej., Restaurante, Contratista, Comercio Minorista",
        consent: "Doy mi consentimiento para que Javi's Insurance Services utilice esta información para preparar una cotización o estimación para mi negocio. Acepto ser contactado por correo electrónico con respecto a mi solicitud de seguro.",
        sslEncrypted: "Encriptación SSL de 256 bits",
        dataSecure: "Sus datos están seguros",
        submitting: "Enviando...",
        getFreeQuote: "Obtenga Mi Cotización Gratis"
    }
};

export const CommercialInsurancePage = () => {
    const { language } = useLanguage();
    const c = copy[language];
    const coverageTypes = c.coverageTypes.map((type, i) => ({ ...type, icon: coverageTypeIcons[i] }));
    const [formData, setFormData] = useState({
        contactName: '',
        email: '',
        businessName: '',
        businessAddress: '',
        businessType: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };


    return (
        <div className="min-h-screen bg-cream font-sans text-text-main">
            <Navbar />

            {/* Hero Section */}
            <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
                {/* Background with decorative color hues */}
                <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/5 via-transparent to-deep-blue/10 -z-10" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-dots-pattern -z-10 opacity-20" />

                {/* Decorative color orbs */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-bright-red/10 rounded-full blur-3xl -z-10" />
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-light-blue/8 rounded-full blur-2xl -z-10" />

                <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8 lg:w-1/2"
                    >
                        <span className="badge-trust">
                            <Building2 size={16} className="text-deep-blue" />
                            {c.heroBadge}
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
                            {c.heroHeadingPre}<span className="text-gradient-secondary">{c.heroHeadingHighlight}</span>
                        </h1>

                        <p className="text-xl text-text-muted max-w-lg leading-relaxed">
                            {c.heroSubtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <QuoteButton
                                href={COMMERCIAL_QUOTE_URL}
                                label={c.getBusinessQuote}
                                variant="secondary"
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
                        className="relative lg:w-1/2 w-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/10 to-light-blue/10 rounded-[2rem] lg:rounded-[3rem] transform -rotate-2" />
                        <img
                            src="/images/commercial-hero.webp"
                            fetchPriority="high"
                            decoding="async"
                            alt="Business professionals in modern office"
                            className="relative rounded-[2rem] lg:rounded-[3rem] shadow-premium w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
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

            {/* Coverage Types */}
            <section className="section-padding bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="badge-trust mb-4">{c.coverageBadge}</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
                            {c.coverageHeadingPre}<span className="text-gradient-secondary">{c.coverageHeadingHighlight}</span>
                        </h2>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            {c.coverageSubtitle}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coverageTypes.map((type, i) => (
                            <motion.div
                                key={type.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-cream p-6 rounded-2xl border border-gray-100 hover:shadow-card transition-all"
                            >
                                <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center mb-4">
                                    <type.icon size={24} className="text-deep-blue" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{type.title}</h3>
                                <p className="text-text-muted text-sm">{type.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

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
                            {c.processHeadingPre}<span className="text-gradient-secondary">{c.processHeadingHighlight}</span>
                        </h2>
                    </motion.div>
                    <ProcessTimelineCompact product="commercial" />
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
                                {c.whyHeadingPre}<span className="text-gradient-secondary">{c.whyHeadingHighlight}</span>
                            </h2>
                            <p className="text-text-muted text-lg mb-8">
                                {c.whyParagraph}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Briefcase size={24} className="text-deep-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">{c.whyPoint1Title}</h4>
                                        <p className="text-text-muted text-sm">{c.whyPoint1Desc}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-bright-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <ShieldIcon size={24} className="text-bright-red" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">{c.whyPoint2Title}</h4>
                                        <p className="text-text-muted text-sm">{c.whyPoint2Desc}</p>
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
                            <div className="absolute inset-0 bg-gradient-to-tr from-deep-blue/20 to-transparent rounded-[2rem] transform rotate-2" />
                            <img
                                src="/images/business-owner.webp"
                                loading="lazy"
                                decoding="async"
                                alt="Business owner in front of their company"
                                className="relative rounded-[2rem] shadow-premium w-full h-[400px] object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Commercial Insurance Form Section */}
            <section id="contact" className="section-padding bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="badge-trust mb-4">{c.formBadge}</span>
                        <h2 className="text-4xl font-bold mb-4 text-premium-heading">
                            {c.formHeadingPre}<span className="text-gradient-secondary">{c.formHeadingHighlight}</span>
                        </h2>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            {c.formSubtitle}
                        </p>
                    </motion.div>

                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center"
                        >
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-green-800 mb-3">{c.successTitle}</h3>
                            <p className="text-green-700">
                                {c.successMessage}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            onSubmit={handleSubmit}
                            className="bg-cream rounded-3xl p-8 md:p-12 shadow-card"
                        >
                            {/* Contact Information */}
                            <h3 className="text-xl font-bold mb-6 text-gradient-secondary">{c.contactInformation}</h3>
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.contactName} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.emailAddress} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            {/* Business Information */}
                            <h3 className="text-xl font-bold mb-6 text-gradient-secondary">{c.businessInformation}</h3>
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.businessName} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="businessName"
                                        value={formData.businessName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                        placeholder="ABC Company LLC"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.businessAddress} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="businessAddress"
                                        value={formData.businessAddress}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                        placeholder="123 Business Ave, Suite 100, Los Angeles, CA 90001"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.typeOfBusiness} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="businessType"
                                        value={formData.businessType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                        placeholder={c.businessTypePlaceholder}
                                    />
                                </div>
                            </div>

                            {/* Consent */}
                            <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" required className="mt-1 w-5 h-5 text-deep-blue border-gray-300 rounded focus:ring-deep-blue" />
                                    <span className="text-sm text-text-muted">
                                        {c.consent}
                                    </span>
                                </label>
                            </div>

                            {/* Security Badges */}
                            <div className="flex items-center justify-center gap-6 mb-8 text-xs text-text-muted">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-deep-blue" />
                                    <span>{c.sslEncrypted}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldIcon size={16} className="text-deep-blue" />
                                    <span>{c.dataSecure}</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${isSubmitting
                                    ? 'bg-deep-blue/70 cursor-not-allowed'
                                    : 'bg-deep-blue hover:bg-deep-blue/90 cursor-pointer'
                                    } text-white`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {c.submitting}
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        {c.getFreeQuote}
                                    </>
                                )}
                            </motion.button>
                        </motion.form>
                    )}
                </div>
            </section>

            <Footer />

            {/* Sticky Mobile Quote Button */}
            <StickyQuoteButton href={COMMERCIAL_QUOTE_URL} label={c.getBusinessQuote} />
        </div>
    );
};
