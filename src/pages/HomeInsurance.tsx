import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Footer } from '../components/Layout';
import { QuoteButton, StickyQuoteButton } from '../components/QuoteButton';
import { TrustBadges } from '../components/TrustBadges';
import { ProcessTimelineCompact } from '../components/ProcessTimeline';
import {
    ShieldIcon,
    PhoneIcon
} from '../components/BrandIcons';
import { Home, Send, Loader2, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n';

const HOME_QUOTE_URL = "#contact";

const coverageIcons = [Home, ShieldIcon, ShieldIcon];

const copy = {
    en: {
        heroBadge: "Comprehensive Home Protection",
        heroTitleStart: "Protect Your ",
        heroTitleHighlight: "Most Valuable",
        heroTitleEnd: " Asset",
        heroSubtitle: "Get personalized home insurance coverage that safeguards your property, belongings, and future against the unexpected.",
        getHomeQuote: "Get Home Quote",
        coverageTitles: ["Home Insurance", "Renters Insurance", "Flood Insurance"],
        coverageDescriptions: [
            "Protect your home and belongings from fire, theft, weather damage, and liability.",
            "Coverage for your personal property and liability protection for renters.",
            "Specialized coverage for flood damage not covered by standard policies."
        ],
        coverageHeading: "Coverage That Fits Your Life",
        coverageSubtitle: "Whether you own a house, rent an apartment, or need specialized flood protection, we have customized policies to keep you secure.",
        compareHeading: "Compare Home Quotes",
        compareSubtitle: "Fill out the quick form below to receive personalized rates from top carriers.",
        requestReceived: "Request Received!",
        requestReceivedBody: "Thank you for choosing Javi's Insurance Services. One of our home insurance specialists will contact you shortly with your personalized quotes.",
        submitAnother: "Submit another request",
        getYourFreeQuote: "Get Your Free Quote",
        stepLabel: "Step",
        ofLabel: "of",
        personalInformation: "Personal Information",
        firstName: "First Name",
        lastName: "Last Name",
        emailAddress: "Email Address",
        propertyInformation: "Property Information",
        propertyAddress: "Property Address",
        city: "City",
        state: "State",
        zipCode: "Zip Code",
        yearBuilt: "Year Built",
        squareFootage: "Square Footage",
        roofYear: "Roof Year",
        propertyTypeLabel: "Property Type",
        selectPropertyType: "Select property type",
        primaryResidence: "Primary Residence",
        rentalProperty: "Rental Property",
        vacationHome: "Vacation Home",
        claimsLabel: "Claims in Last 5 Years",
        selectPlaceholder: "Select",
        claimsNone: "None",
        claimsOne: "1 Claim",
        claimsTwo: "2 Claims",
        claimsThreePlus: "3 or more",
        additionalDetails: "Additional Details & Consent",
        currentInsuranceCompany: "Current Insurance Company",
        currentInsurerPlaceholder: "Current insurer (if any)",
        policyExpiration: "Current Policy Expiration Date",
        additionalNotes: "Additional Notes",
        notesPlaceholder: "Any additional information about your property or coverage needs...",
        consentText: "I consent to Javi's Insurance Services using this information to prepare a quote or estimate for my home insurance. I agree to be contacted via email regarding my insurance request.",
        sslEncrypted: "256 bit SSL Encrypted",
        dataSecure: "Your data is secure",
        back: "Back",
        nextStep: "Next Step",
        submitting: "Submitting...",
        getFreeQuote: "Get Free Quote",
        validationStep1: "Please fill in all required Personal Information fields.",
        validationStep2: "Please fill in all required Property Information fields."
    },
    es: {
        heroBadge: "Protección Integral del Hogar",
        heroTitleStart: "Proteja Su Bien ",
        heroTitleHighlight: "Más Valioso",
        heroTitleEnd: "",
        heroSubtitle: "Obtenga una cobertura de seguro de hogar personalizada que protege su propiedad, sus pertenencias y su futuro ante lo inesperado.",
        getHomeQuote: "Obtener Cotización de Hogar",
        coverageTitles: ["Seguro de Hogar", "Seguro para Inquilinos", "Seguro contra Inundaciones"],
        coverageDescriptions: [
            "Proteja su hogar y sus pertenencias contra incendios, robos, daños por clima y responsabilidad civil.",
            "Cobertura para sus bienes personales y protección de responsabilidad civil para inquilinos.",
            "Cobertura especializada para daños por inundación que no cubren las pólizas estándar."
        ],
        coverageHeading: "Cobertura que se Adapta a Su Vida",
        coverageSubtitle: "Ya sea que tenga una casa propia, alquile un apartamento o necesite protección especializada contra inundaciones, contamos con pólizas personalizadas para mantenerlo seguro.",
        compareHeading: "Compare Cotizaciones de Hogar",
        compareSubtitle: "Complete el breve formulario a continuación para recibir tarifas personalizadas de las mejores aseguradoras.",
        requestReceived: "¡Solicitud Recibida!",
        requestReceivedBody: "Gracias por elegir Javi's Insurance Services. Uno de nuestros especialistas en seguros de hogar se comunicará con usted en breve con sus cotizaciones personalizadas.",
        submitAnother: "Enviar otra solicitud",
        getYourFreeQuote: "Obtenga Su Cotización Gratis",
        stepLabel: "Paso",
        ofLabel: "de",
        personalInformation: "Información Personal",
        firstName: "Nombre",
        lastName: "Apellido",
        emailAddress: "Correo Electrónico",
        propertyInformation: "Información de la Propiedad",
        propertyAddress: "Dirección de la Propiedad",
        city: "Ciudad",
        state: "Estado",
        zipCode: "Código Postal",
        yearBuilt: "Año de Construcción",
        squareFootage: "Pies Cuadrados",
        roofYear: "Año del Techo",
        propertyTypeLabel: "Tipo de Propiedad",
        selectPropertyType: "Seleccione el tipo de propiedad",
        primaryResidence: "Residencia Principal",
        rentalProperty: "Propiedad de Alquiler",
        vacationHome: "Casa de Vacaciones",
        claimsLabel: "Reclamos en los Últimos 5 Años",
        selectPlaceholder: "Seleccione",
        claimsNone: "Ninguno",
        claimsOne: "1 Reclamo",
        claimsTwo: "2 Reclamos",
        claimsThreePlus: "3 o más",
        additionalDetails: "Detalles Adicionales y Consentimiento",
        currentInsuranceCompany: "Compañía de Seguros Actual",
        currentInsurerPlaceholder: "Aseguradora actual (si tiene)",
        policyExpiration: "Fecha de Vencimiento de la Póliza Actual",
        additionalNotes: "Notas Adicionales",
        notesPlaceholder: "Cualquier información adicional sobre su propiedad o necesidades de cobertura...",
        consentText: "Doy mi consentimiento para que Javi's Insurance Services use esta información para preparar una cotización o estimación para mi seguro de hogar. Acepto ser contactado por correo electrónico con respecto a mi solicitud de seguro.",
        sslEncrypted: "Cifrado SSL de 256 bits",
        dataSecure: "Sus datos están seguros",
        back: "Atrás",
        nextStep: "Siguiente Paso",
        submitting: "Enviando...",
        getFreeQuote: "Obtener Cotización Gratis",
        validationStep1: "Por favor complete todos los campos obligatorios de Información Personal.",
        validationStep2: "Por favor complete todos los campos obligatorios de Información de la Propiedad."
    }
};

export const HomeInsurancePage = () => {
    const { language } = useLanguage();
    const c = copy[language];
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        propertyAddress: '',
        city: '',
        state: '',
        zipCode: '',
        yearBuilt: '',
        squareFootage: '',
        roofYear: '',
        propertyType: '',
        claimsLast5Years: '',
        currentInsurance: '',
        expirationDate: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeStep, setActiveStep] = useState(1);
    const totalSteps = 3;

    const nextStep = () => {
        // Basic validation before advancing
        if (activeStep === 1 && (!formData.firstName || !formData.lastName || !formData.email)) {
            alert(c.validationStep1);
            return;
        }
        if (activeStep === 2 && (!formData.propertyAddress || !formData.zipCode)) {
            alert(c.validationStep2);
            return;
        }
        if (activeStep < totalSteps) setActiveStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (activeStep > 1) setActiveStep(prev => prev - 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
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
                <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/5 via-transparent to-bright-red/5 -z-10" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-dots-pattern -z-10 opacity-20" />

                {/* Decorative color orbs */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-bright-red/10 rounded-full blur-3xl -z-10" />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-light-blue/8 rounded-full blur-2xl -z-10" />

                <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8 lg:w-1/2"
                    >
                        <span className="badge-trust">
                            <Home size={16} className="text-deep-blue" />
                            {c.heroBadge}
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
                            {c.heroTitleStart}<span className="text-gradient-primary">{c.heroTitleHighlight}</span>{c.heroTitleEnd}
                        </h1>

                        <p className="text-xl text-text-muted max-w-lg leading-relaxed">
                            {c.heroSubtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <QuoteButton
                                href={HOME_QUOTE_URL}
                                label={c.getHomeQuote}
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
                        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/10 to-light-blue/10 rounded-[2rem] lg:rounded-[3rem] transform -rotate-2" />
                        <img
                            src="/images/home-hero.png"
                            alt="Beautiful home with insurance protection"
                            className="relative rounded-[2rem] lg:rounded-[3rem] shadow-premium w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Trust Bar */}
            <div className="bg-white py-8 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <TrustBadges />
                </div>
            </div>

            {/* Coverage Types Grid */}
            <section className="py-24 px-6 max-w-7xl mx-auto relative">
                <div className="absolute top-40 right-10 w-64 h-64 bg-bright-red/5 rounded-full blur-3xl -z-10" />

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-premium-heading">{c.coverageHeading}</h2>
                    <p className="text-lg text-text-muted leading-relaxed">
                        {c.coverageSubtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {coverageIcons.map((Icon, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-premium transition-all border border-gray-100 group"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-deep-blue/10 to-light-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Icon className="w-8 h-8 text-deep-blue" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-premium-heading">{c.coverageTitles[index]}</h3>
                            <p className="text-text-muted leading-relaxed">{c.coverageDescriptions[index]}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Timeline Section */}
            <ProcessTimelineCompact product="home" />

            {/* Interactive Quote Form Wizard */}
            <section id="contact" className="py-24 px-6 bg-white relative">
                <div className="absolute inset-0 bg-dotted-pattern opacity-5" />
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-premium-heading">{c.compareHeading}</h2>
                        <p className="text-text-muted">{c.compareSubtitle}</p>
                    </div>

                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/80 backdrop-blur-md p-12 rounded-[2rem] shadow-premium text-center border border-white/50 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-light-blue/20 to-transparent -z-10" />
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                                className="w-24 h-24 bg-gradient-to-br from-light-blue to-deep-blue rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                            >
                                <CheckCircle className="w-12 h-12 text-white" />
                            </motion.div>
                            <h3 className="text-3xl font-bold text-premium-heading mb-4">{c.requestReceived}</h3>
                            <p className="text-xl text-text-muted mb-8 max-w-md mx-auto leading-relaxed">
                                {c.requestReceivedBody}
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-deep-blue font-bold hover:text-deep-blue/80 transition-colors"
                            >
                                {c.submitAnother}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-premium border border-gray-100 relative overflow-hidden"
                        >
                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-silver/30">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-deep-blue to-light-blue"
                                    initial={{ width: '33%' }}
                                    animate={{ width: `${(activeStep / totalSteps) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <div className="mb-8 flex justify-between items-end">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-premium-heading mb-1">{c.getYourFreeQuote}</h2>
                                    <p className="text-text-muted font-medium">{c.stepLabel} {activeStep} {c.ofLabel} {totalSteps}</p>
                                </div>
                            </div>

                            <div className="relative min-h-[350px]">
                                <AnimatePresence mode="wait">
                                    {activeStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-xl font-bold mb-6 text-gradient-secondary">{c.personalInformation}</h3>
                                            <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
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
                                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
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
                                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-xl font-bold mb-6 text-gradient-secondary">{c.propertyInformation}</h3>
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-text-main mb-2">
                                                        {c.propertyAddress} <span className="text-gradient-primary">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="propertyAddress"
                                                        value={formData.propertyAddress}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                                        placeholder="123 Main Street"
                                                    />
                                                </div>
                                                <div className="grid md:grid-cols-3 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-main mb-2">{c.city}</label>
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                                            placeholder="Los Angeles"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-main mb-2">{c.state}</label>
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            value={formData.state}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                                            placeholder="CA"
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
                                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                                            placeholder="90001"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-3 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-main mb-2">{c.yearBuilt}</label>
                                                        <input
                                                            type="text"
                                                            name="yearBuilt"
                                                            value={formData.yearBuilt}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                                            placeholder="1995"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-main mb-2">{c.squareFootage}</label>
                                                        <input
                                                            type="text"
                                                            name="squareFootage"
                                                            value={formData.squareFootage}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                                            placeholder="2,000"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-main mb-2">{c.roofYear}</label>
                                                        <input
                                                            type="text"
                                                            name="roofYear"
                                                            value={formData.roofYear}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                                            placeholder="2010"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-main mb-2">{c.propertyTypeLabel}</label>
                                                        <select
                                                            name="propertyType"
                                                            value={formData.propertyType}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all bg-white"
                                                        >
                                                            <option value="">{c.selectPropertyType}</option>
                                                            <option value="primary">{c.primaryResidence}</option>
                                                            <option value="rental">{c.rentalProperty}</option>
                                                            <option value="vacation">{c.vacationHome}</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-main mb-2">{c.claimsLabel}</label>
                                                        <select
                                                            name="claimsLast5Years"
                                                            value={formData.claimsLast5Years}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all bg-white"
                                                        >
                                                            <option value="">{c.selectPlaceholder}</option>
                                                            <option value="0">{c.claimsNone}</option>
                                                            <option value="1">{c.claimsOne}</option>
                                                            <option value="2">{c.claimsTwo}</option>
                                                            <option value="3+">{c.claimsThreePlus}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeStep === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-xl font-bold mb-6 text-gradient-secondary">{c.additionalDetails}</h3>
                                            <div className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-main mb-2">{c.currentInsuranceCompany}</label>
                                                        <input
                                                            type="text"
                                                            name="currentInsurance"
                                                            value={formData.currentInsurance}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                                            placeholder={c.currentInsurerPlaceholder}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-main mb-2">{c.policyExpiration}</label>
                                                        <input
                                                            type="date"
                                                            name="expirationDate"
                                                            value={formData.expirationDate}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-text-main mb-2">{c.additionalNotes}</label>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        rows={4}
                                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all resize-none"
                                                        placeholder={c.notesPlaceholder}
                                                    />
                                                </div>

                                                <div className="p-4 bg-white rounded-xl border border-gray-200">
                                                    <label className="flex items-start gap-3 cursor-pointer">
                                                        <input type="checkbox" required className="mt-1 w-5 h-5 text-deep-blue border-gray-300 rounded focus:ring-deep-blue" />
                                                        <span className="text-sm text-text-muted">
                                                            {c.consentText}
                                                        </span>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-center gap-6 text-xs text-text-muted pt-2 border-t border-gray-100">
                                                    <div className="flex items-center gap-2">
                                                        <Shield className="w-4 h-4 text-deep-blue" />
                                                        <span>{c.sslEncrypted}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <ShieldIcon size={16} className="text-deep-blue" />
                                                        <span>{c.dataSecure}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="mt-8 flex gap-4 pr-1">
                                {activeStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="w-1/3 py-4 rounded-xl font-bold text-lg bg-gray-100 text-text-main hover:bg-gray-200 transition-colors"
                                    >
                                        {c.back}
                                    </button>
                                )}

                                {activeStep < totalSteps ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className={`py-4 rounded-xl font-bold text-lg text-white bg-deep-blue hover:bg-deep-blue/90 shadow-lg transition-all ${activeStep === 1 ? 'w-full' : 'w-2/3'}`}
                                    >
                                        {c.nextStep}
                                    </button>
                                ) : (
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                        className={`py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${activeStep === 1 ? 'w-full' : 'w-2/3'} ${isSubmitting
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
                                )}
                            </div>
                        </motion.form>
                    )}
                </div>
            </section>

            <Footer />

            {/* Sticky Mobile Quote Button */}
            <StickyQuoteButton href={HOME_QUOTE_URL} label={c.getHomeQuote} />
        </div>
    );
};
