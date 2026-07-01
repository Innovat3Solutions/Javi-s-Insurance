import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { QuoteButton, StickyQuoteButton } from '../components/QuoteButton';
import { TrustBadges } from '../components/TrustBadges';
import { ProcessTimelineCompact } from '../components/ProcessTimeline';
import {
    ShieldIcon,
    PhoneIcon
} from '../components/BrandIcons';
import { Car, Send, Loader2, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n';

const AUTO_QUOTE_URL = "#contact";

const coverageTypeIcons = [ShieldIcon, Car, ShieldIcon];

const copy = {
    en: {
        heroBadge: "Javi's Insurance Services",
        heroTitlePrefix: "Affordable ",
        heroTitleHighlight: "Auto Insurance",
        heroDescription: "Protect yourself on the road with comprehensive auto insurance. Get competitive rates from top carriers with flexible coverage options.",
        getAutoQuote: "Get Auto Quote",
        coverageBadge: "Coverage Options",
        coverageTitlePrefix: "Auto ",
        coverageTitleHighlight: "Protection",
        coverageSubtitle: "Choose the coverage level that fits your needs and budget.",
        coverageTitles: ["Full Coverage", "Liability Only", "Motorcycle Insurance"],
        coverageDescriptions: [
            "Comprehensive protection including collision, liability, and uninsured motorist coverage.",
            "Basic coverage that meets state minimum requirements for bodily injury and property damage.",
            "Specialized coverage for motorcycles with flexible deductible options."
        ],
        processBadge: "Simple Process",
        processTitlePrefix: "Get ",
        processTitleHighlight: "Covered Fast",
        whyBadge: "Expert Protection",
        whyTitlePrefix: "Drive with ",
        whyTitleHighlight: "Confidence",
        whyDescription: "Finding the right auto insurance shouldn't be a hassle. Our team of experts works with leading carriers to secure you the best rates and comprehensive protection tailored exactly to your needs.",
        customCoverageTitle: "Custom Coverage",
        customCoverageDesc: "We compare multiple options so you never pay for more than you need, and never settle for less.",
        topCarriersTitle: "Top Rated Carriers",
        topCarriersDesc: "We only partner with trusted names in auto insurance ensuring prompt claim resolving and peace of mind.",
        formBadge: "Get a Quote",
        formTitlePrefix: "Auto Insurance ",
        formTitleHighlight: "Quote Request",
        formSubtitle: "Fill out the form below and one of our licensed agents will contact you with personalized quotes.",
        successTitle: "Quote Request Received!",
        successMessage: "Thank you for your interest. A licensed agent will contact you shortly to discuss your auto insurance options.",
        personalInfo: "Personal Information",
        firstName: "First Name",
        lastName: "Last Name",
        emailAddress: "Email Address",
        zipCode: "Zip Code",
        vehicleInfo: "Vehicle Information",
        year: "Year",
        yearPlaceholder: "Year",
        make: "Make",
        model: "Model",
        ownership: "Ownership",
        select: "Select",
        owned: "Owned",
        financed: "Financed",
        leased: "Leased",
        driverInfo: "Driver Information",
        dateOfBirth: "Date of Birth",
        licenseState: "License State",
        accidentsTickets: "Accidents or Tickets (Last 3 to 5 Years)",
        none: "None",
        oneIncident: "1 incident",
        twoIncidents: "2 incidents",
        threeOrMore: "3 or more",
        coverageTypeDesired: "Coverage Type Desired",
        selectCoverage: "Select coverage",
        fullCoverage: "Full Coverage",
        liabilityOnly: "Liability Only",
        currentInsurance: "Current Insurance",
        currentInsuranceCompany: "Current Insurance Company",
        currentInsurerPlaceholder: "Current insurer (if any)",
        policyExpirationDate: "Policy Expiration Date",
        desiredStartDate: "Desired Start Date",
        additionalNotes: "Additional Notes",
        additionalNotesPlaceholder: "Any additional information about your vehicle or coverage needs...",
        consent: "I consent to Javi's Insurance Services using this information to prepare a quote or estimate for my auto insurance. I agree to be contacted via email regarding my insurance request.",
        sslEncrypted: "256 bit SSL Encrypted",
        dataSecure: "Your data is secure",
        submitting: "Submitting...",
        getFreeQuote: "Get My Free Quote"
    },
    es: {
        heroBadge: "Javi's Insurance Services",
        heroTitlePrefix: "Seguro de Auto ",
        heroTitleHighlight: "Económico",
        heroDescription: "Protéjase en la carretera con un seguro de auto integral. Obtenga tarifas competitivas de las mejores aseguradoras con opciones de cobertura flexibles.",
        getAutoQuote: "Obtener Cotización",
        coverageBadge: "Opciones de Cobertura",
        coverageTitlePrefix: "Protección ",
        coverageTitleHighlight: "para su Auto",
        coverageSubtitle: "Elija el nivel de cobertura que se ajuste a sus necesidades y presupuesto.",
        coverageTitles: ["Cobertura Completa", "Solo Responsabilidad Civil", "Seguro de Motocicleta"],
        coverageDescriptions: [
            "Protección integral que incluye colisión, responsabilidad civil y cobertura de conductor sin seguro.",
            "Cobertura básica que cumple con los requisitos mínimos del estado para lesiones corporales y daños a la propiedad.",
            "Cobertura especializada para motocicletas con opciones de deducible flexibles."
        ],
        processBadge: "Proceso Sencillo",
        processTitlePrefix: "Asegúrese ",
        processTitleHighlight: "Rápidamente",
        whyBadge: "Protección Experta",
        whyTitlePrefix: "Conduzca con ",
        whyTitleHighlight: "Confianza",
        whyDescription: "Encontrar el seguro de auto adecuado no debería ser complicado. Nuestro equipo de expertos trabaja con las principales aseguradoras para conseguirle las mejores tarifas y una protección integral adaptada exactamente a sus necesidades.",
        customCoverageTitle: "Cobertura Personalizada",
        customCoverageDesc: "Comparamos múltiples opciones para que nunca pague más de lo que necesita, ni se conforme con menos.",
        topCarriersTitle: "Aseguradoras de Primer Nivel",
        topCarriersDesc: "Solo trabajamos con nombres de confianza en seguros de auto, garantizando una pronta resolución de reclamos y tranquilidad.",
        formBadge: "Obtenga una Cotización",
        formTitlePrefix: "Solicitud de Cotización ",
        formTitleHighlight: "de Seguro de Auto",
        formSubtitle: "Complete el siguiente formulario y uno de nuestros agentes licenciados se comunicará con usted con cotizaciones personalizadas.",
        successTitle: "¡Solicitud de Cotización Recibida!",
        successMessage: "Gracias por su interés. Un agente licenciado se comunicará con usted en breve para hablar sobre sus opciones de seguro de auto.",
        personalInfo: "Información Personal",
        firstName: "Nombre",
        lastName: "Apellido",
        emailAddress: "Correo Electrónico",
        zipCode: "Código Postal",
        vehicleInfo: "Información del Vehículo",
        year: "Año",
        yearPlaceholder: "Año",
        make: "Marca",
        model: "Modelo",
        ownership: "Propiedad",
        select: "Seleccione",
        owned: "Propio",
        financed: "Financiado",
        leased: "Arrendado",
        driverInfo: "Información del Conductor",
        dateOfBirth: "Fecha de Nacimiento",
        licenseState: "Estado de la Licencia",
        accidentsTickets: "Accidentes o Multas (Últimos 3 a 5 Años)",
        none: "Ninguno",
        oneIncident: "1 incidente",
        twoIncidents: "2 incidentes",
        threeOrMore: "3 o más",
        coverageTypeDesired: "Tipo de Cobertura Deseada",
        selectCoverage: "Seleccione cobertura",
        fullCoverage: "Cobertura Completa",
        liabilityOnly: "Solo Responsabilidad Civil",
        currentInsurance: "Seguro Actual",
        currentInsuranceCompany: "Compañía de Seguro Actual",
        currentInsurerPlaceholder: "Aseguradora actual (si tiene)",
        policyExpirationDate: "Fecha de Vencimiento de la Póliza",
        desiredStartDate: "Fecha de Inicio Deseada",
        additionalNotes: "Notas Adicionales",
        additionalNotesPlaceholder: "Cualquier información adicional sobre su vehículo o necesidades de cobertura...",
        consent: "Doy mi consentimiento para que Javi's Insurance Services use esta información para preparar una cotización o estimación de mi seguro de auto. Acepto ser contactado por correo electrónico con respecto a mi solicitud de seguro.",
        sslEncrypted: "Encriptación SSL de 256 bits",
        dataSecure: "Sus datos están seguros",
        submitting: "Enviando...",
        getFreeQuote: "Obtener Mi Cotización Gratis"
    }
};

export const AutoInsurancePage = () => {
    const { language } = useLanguage();
    const c = copy[language];
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        zipCode: '',
        vehicleYear: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleOwnership: '',
        currentInsurance: '',
        expirationDate: '',
        driverDOB: '',
        licenseState: '',
        accidentsTickets: '',
        coverageType: '',
        desiredStartDate: '',
        message: ''
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

    // Generate year options (current year back to 1990)
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

    return (
        <div className="min-h-screen bg-cream font-sans text-text-main">
            <Navbar />

            {/* Hero Section */}
            <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
                {/* Background with decorative color hues */}
                <div className="absolute inset-0 bg-gradient-to-br from-bright-red/5 via-transparent to-deep-blue/5 -z-10" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-dots-pattern -z-10 opacity-20" />

                {/* Decorative color orbs */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-bright-red/10 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-bright-red/5 rounded-full blur-2xl -z-10" />

                <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8 lg:w-1/2"
                    >
                        <span className="badge-trust">
                            <Car size={16} className="text-bright-red" />
                            {c.heroBadge}
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
                            {c.heroTitlePrefix}<span className="text-gradient-primary">{c.heroTitleHighlight}</span>
                        </h1>

                        <p className="text-xl text-text-muted max-w-lg leading-relaxed">
                            {c.heroDescription}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <QuoteButton
                                href={AUTO_QUOTE_URL}
                                label={c.getAutoQuote}
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
                        className="relative lg:w-1/2 w-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-bright-red/10 to-deep-blue/10 rounded-[3rem] transform -rotate-2" />
                        <img
                            src="/images/auto-hero.png"
                            alt="Car with insurance protection"
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
                            {c.coverageTitlePrefix}<span className="text-gradient-primary">{c.coverageTitleHighlight}</span>
                        </h2>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            {c.coverageSubtitle}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {coverageTypeIcons.map((Icon, i) => (
                            <motion.div
                                key={c.coverageTitles[i]}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-cream p-8 rounded-2xl border border-gray-100 hover:shadow-card transition-all"
                            >
                                <div className="w-14 h-14 bg-bright-red/10 rounded-xl flex items-center justify-center mb-6">
                                    <Icon size={28} className="text-bright-red" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{c.coverageTitles[i]}</h3>
                                <p className="text-text-muted">{c.coverageDescriptions[i]}</p>
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
                            {c.processTitlePrefix}<span className="text-gradient-primary">{c.processTitleHighlight}</span>
                        </h2>
                    </motion.div>
                    <ProcessTimelineCompact product="auto" />
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
                                {c.whyTitlePrefix}<span className="text-gradient-primary">{c.whyTitleHighlight}</span>
                            </h2>
                            <p className="text-text-muted text-lg mb-8">
                                {c.whyDescription}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Car size={24} className="text-deep-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">{c.customCoverageTitle}</h4>
                                        <p className="text-text-muted text-sm">{c.customCoverageDesc}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-bright-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <ShieldIcon size={24} className="text-bright-red" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">{c.topCarriersTitle}</h4>
                                        <p className="text-text-muted text-sm">{c.topCarriersDesc}</p>
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
                                src="/images/woman-driving.png"
                                alt="Happy driver on the road"
                                className="relative rounded-[2rem] shadow-premium w-full h-[400px] object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Auto Insurance Form Section */}
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
                            {c.formTitlePrefix}<span className="text-gradient-primary">{c.formTitleHighlight}</span>
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
                            {/* Personal Information */}
                            <h3 className="text-xl font-bold mb-6 text-gradient-primary">{c.personalInfo}</h3>
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.firstName} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.lastName} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                        placeholder="Doe"
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
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.zipCode} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                        placeholder="90001"
                                    />
                                </div>
                            </div>

                            {/* Vehicle Information */}
                            <h3 className="text-xl font-bold mb-6 text-gradient-primary">{c.vehicleInfo}</h3>
                            <div className="grid md:grid-cols-4 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.year} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <select
                                        name="vehicleYear"
                                        value={formData.vehicleYear}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all bg-white"
                                    >
                                        <option value="">{c.yearPlaceholder}</option>
                                        {yearOptions.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.make} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="vehicleMake"
                                        value={formData.vehicleMake}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                        placeholder="Toyota"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.model} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="vehicleModel"
                                        value={formData.vehicleModel}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                        placeholder="Camry"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">{c.ownership}</label>
                                    <select
                                        name="vehicleOwnership"
                                        value={formData.vehicleOwnership}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all bg-white"
                                    >
                                        <option value="">{c.select}</option>
                                        <option value="owned">{c.owned}</option>
                                        <option value="financed">{c.financed}</option>
                                        <option value="leased">{c.leased}</option>
                                    </select>
                                </div>
                            </div>

                            {/* Driver Information */}
                            <h3 className="text-xl font-bold mb-6 text-gradient-primary">{c.driverInfo}</h3>
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.dateOfBirth} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="driverDOB"
                                        value={formData.driverDOB}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.licenseState} <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="licenseState"
                                        value={formData.licenseState}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                        placeholder="CA"
                                        maxLength={2}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.accidentsTickets}
                                    </label>
                                    <select
                                        name="accidentsTickets"
                                        value={formData.accidentsTickets}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all bg-white"
                                    >
                                        <option value="">{c.select}</option>
                                        <option value="0">{c.none}</option>
                                        <option value="1">{c.oneIncident}</option>
                                        <option value="2">{c.twoIncidents}</option>
                                        <option value="3+">{c.threeOrMore}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        {c.coverageTypeDesired}
                                    </label>
                                    <select
                                        name="coverageType"
                                        value={formData.coverageType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all bg-white"
                                    >
                                        <option value="">{c.selectCoverage}</option>
                                        <option value="full">{c.fullCoverage}</option>
                                        <option value="liability">{c.liabilityOnly}</option>
                                    </select>
                                </div>
                            </div>

                            {/* Current Insurance */}
                            <h3 className="text-xl font-bold mb-6 text-gradient-primary">{c.currentInsurance}</h3>
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">{c.currentInsuranceCompany}</label>
                                    <input
                                        type="text"
                                        name="currentInsurance"
                                        value={formData.currentInsurance}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                        placeholder={c.currentInsurerPlaceholder}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">{c.policyExpirationDate}</label>
                                    <input
                                        type="date"
                                        name="expirationDate"
                                        value={formData.expirationDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">{c.desiredStartDate}</label>
                                    <input
                                        type="date"
                                        name="desiredStartDate"
                                        value={formData.desiredStartDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-text-main mb-2">{c.additionalNotes}</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all resize-none"
                                    placeholder={c.additionalNotesPlaceholder}
                                />
                            </div>

                            {/* Consent */}
                            <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" required className="mt-1 w-5 h-5 text-bright-red border-gray-300 rounded focus:ring-bright-red" />
                                    <span className="text-sm text-text-muted">
                                        {c.consent}
                                    </span>
                                </label>
                            </div>

                            {/* Security Badges */}
                            <div className="flex items-center justify-center gap-6 mb-8 text-xs text-text-muted">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-bright-red" />
                                    <span>{c.sslEncrypted}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldIcon size={16} className="text-bright-red" />
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
                                    ? 'bg-bright-red/70 cursor-not-allowed'
                                    : 'bg-bright-red hover:bg-bright-red/90 cursor-pointer'
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
            <StickyQuoteButton href={AUTO_QUOTE_URL} label={c.getAutoQuote} />
        </div>
    );
};
