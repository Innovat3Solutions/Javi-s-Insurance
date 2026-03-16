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

const AUTO_QUOTE_URL = "#contact";

const coverageTypes = [
    {
        title: "Full Coverage",
        description: "Comprehensive protection including collision, liability, and uninsured motorist coverage.",
        icon: ShieldIcon
    },
    {
        title: "Liability Only",
        description: "Basic coverage that meets state minimum requirements for bodily injury and property damage.",
        icon: Car
    },
    {
        title: "Motorcycle Insurance",
        description: "Specialized coverage for motorcycles with flexible deductible options.",
        icon: ShieldIcon
    }
];

export const AutoInsurancePage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        zipCode: '',
        preferredContact: '',
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

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
        return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        setFormData(prev => ({ ...prev, phone: formatted }));
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
                            Javi's Insurance Services
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
                            Affordable <span className="text-gradient-primary">Auto Insurance</span>
                        </h1>

                        <p className="text-xl text-text-muted max-w-lg leading-relaxed">
                            Protect yourself on the road with comprehensive auto insurance. Get competitive rates from top carriers with flexible coverage options.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <QuoteButton
                                href={AUTO_QUOTE_URL}
                                label="Get Auto Quote"
                                variant="primary"
                                size="large"
                            />
                            <a
                                href="tel:310-437-2766"
                                className="btn-outline flex items-center justify-center gap-2"
                            >
                                <PhoneIcon size={20} className="text-current" />
                                (310) 437-2766
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
                        <span className="badge-trust mb-4">Coverage Options</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
                            Auto <span className="text-gradient-primary">Protection</span>
                        </h2>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            Choose the coverage level that fits your needs and budget.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {coverageTypes.map((type, i) => (
                            <motion.div
                                key={type.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-cream p-8 rounded-2xl border border-gray-100 hover:shadow-card transition-all"
                            >
                                <div className="w-14 h-14 bg-bright-red/10 rounded-xl flex items-center justify-center mb-6">
                                    <type.icon size={28} className="text-bright-red" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{type.title}</h3>
                                <p className="text-text-muted">{type.description}</p>
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
                        <span className="badge-trust mb-4">Simple Process</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
                            Get <span className="text-gradient-primary">Covered Fast</span>
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
                            <span className="badge-trust mb-4">Expert Protection</span>
                            <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                                Drive with <span className="text-gradient-primary">Confidence</span>
                            </h2>
                            <p className="text-text-muted text-lg mb-8">
                                Finding the right auto insurance shouldn't be a hassle. Our team of experts works with leading carriers to secure you the best rates and comprehensive protection tailored exactly to your needs.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Car size={24} className="text-deep-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Custom Coverage</h4>
                                        <p className="text-text-muted text-sm">We compare multiple options so you never pay for more than you need, and never settle for less.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-bright-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <ShieldIcon size={24} className="text-bright-red" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Top Rated Carriers</h4>
                                        <p className="text-text-muted text-sm">We only partner with trusted names in auto insurance ensuring prompt claim resolving and peace of mind.</p>
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
                        <span className="badge-trust mb-4">Get a Quote</span>
                        <h2 className="text-4xl font-bold mb-4 text-premium-heading">
                            Auto Insurance <span className="text-gradient-primary">Quote Request</span>
                        </h2>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            Fill out the form below and one of our licensed agents will contact you with personalized quotes.
                        </p>
                    </motion.div>

                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center"
                        >
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-green-800 mb-3">Quote Request Received!</h3>
                            <p className="text-green-700">
                                Thank you for your interest. A licensed agent will contact you shortly to discuss your auto insurance options.
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
                            <h3 className="text-xl font-bold mb-6 text-gradient-primary">Personal Information</h3>
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        First Name <span className="text-gradient-primary">*</span>
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
                                        Last Name <span className="text-gradient-primary">*</span>
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
                                        Phone Number <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        required
                                        maxLength={14}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        Email Address <span className="text-gradient-primary">*</span>
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
                                        Zip Code <span className="text-gradient-primary">*</span>
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
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        Preferred Contact Method
                                    </label>
                                    <select
                                        name="preferredContact"
                                        value={formData.preferredContact}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all bg-white"
                                    >
                                        <option value="">Select preference</option>
                                        <option value="call">Phone Call</option>
                                        <option value="text">Text Message</option>
                                        <option value="email">Email</option>
                                    </select>
                                </div>
                            </div>

                            {/* Vehicle Information */}
                            <h3 className="text-xl font-bold mb-6 text-gradient-primary">Vehicle Information</h3>
                            <div className="grid md:grid-cols-4 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        Year <span className="text-gradient-primary">*</span>
                                    </label>
                                    <select
                                        name="vehicleYear"
                                        value={formData.vehicleYear}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all bg-white"
                                    >
                                        <option value="">Year</option>
                                        {yearOptions.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        Make <span className="text-gradient-primary">*</span>
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
                                        Model <span className="text-gradient-primary">*</span>
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
                                    <label className="block text-sm font-medium text-text-main mb-2">Ownership</label>
                                    <select
                                        name="vehicleOwnership"
                                        value={formData.vehicleOwnership}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all bg-white"
                                    >
                                        <option value="">Select</option>
                                        <option value="owned">Owned</option>
                                        <option value="financed">Financed</option>
                                        <option value="leased">Leased</option>
                                    </select>
                                </div>
                            </div>

                            {/* Driver Information */}
                            <h3 className="text-xl font-bold mb-6 text-gradient-primary">Driver Information</h3>
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        Date of Birth <span className="text-gradient-primary">*</span>
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
                                        License State <span className="text-gradient-primary">*</span>
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
                                        Accidents or Tickets (Last 3 to 5 Years)
                                    </label>
                                    <select
                                        name="accidentsTickets"
                                        value={formData.accidentsTickets}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all bg-white"
                                    >
                                        <option value="">Select</option>
                                        <option value="0">None</option>
                                        <option value="1">1 incident</option>
                                        <option value="2">2 incidents</option>
                                        <option value="3+">3 or more</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        Coverage Type Desired
                                    </label>
                                    <select
                                        name="coverageType"
                                        value={formData.coverageType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all bg-white"
                                    >
                                        <option value="">Select coverage</option>
                                        <option value="full">Full Coverage</option>
                                        <option value="liability">Liability Only</option>
                                    </select>
                                </div>
                            </div>

                            {/* Current Insurance */}
                            <h3 className="text-xl font-bold mb-6 text-gradient-primary">Current Insurance</h3>
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">Current Insurance Company</label>
                                    <input
                                        type="text"
                                        name="currentInsurance"
                                        value={formData.currentInsurance}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                        placeholder="Current insurer (if any)"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">Policy Expiration Date</label>
                                    <input
                                        type="date"
                                        name="expirationDate"
                                        value={formData.expirationDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">Desired Start Date</label>
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
                                <label className="block text-sm font-medium text-text-main mb-2">Additional Notes</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-bright-red focus:ring-2 focus:ring-bright-red/20 outline-none transition-all resize-none"
                                    placeholder="Any additional information about your vehicle or coverage needs..."
                                />
                            </div>

                            {/* Consent */}
                            <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" required className="mt-1 w-5 h-5 text-bright-red border-gray-300 rounded focus:ring-bright-red" />
                                    <span className="text-sm text-text-muted">
                                        I consent to Javi's Insurance Services using this information to prepare a quote or estimate for my auto insurance. I agree to be contacted via call, text, or email regarding my insurance request. Message and data rates may apply.
                                    </span>
                                </label>
                            </div>

                            {/* Security Badges */}
                            <div className="flex items-center justify-center gap-6 mb-8 text-xs text-text-muted">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-bright-red" />
                                    <span>256 bit SSL Encrypted</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldIcon size={16} className="text-bright-red" />
                                    <span>Your data is secure</span>
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
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Get My Free Quote
                                    </>
                                )}
                            </motion.button>
                        </motion.form>
                    )}
                </div>
            </section>

            <Footer />

            {/* Sticky Mobile Quote Button */}
            <StickyQuoteButton href={AUTO_QUOTE_URL} label="Get Auto Quote" />
        </div>
    );
};
