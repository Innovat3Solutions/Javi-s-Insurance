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

const COMMERCIAL_QUOTE_URL = "#contact";

const coverageTypes = [
    {
        title: "General Liability",
        description: "Protection against third-party bodily injury and property damage claims.",
        icon: ShieldIcon
    },
    {
        title: "Workers' Compensation",
        description: "Coverage for employee injuries and illnesses that occur on the job.",
        icon: Users
    },
    {
        title: "Commercial Auto",
        description: "Insurance for vehicles used for business purposes.",
        icon: Building2
    },
    {
        title: "Business Owner's Policy",
        description: "Bundled coverage combining property and liability protection.",
        icon: Briefcase
    }
];

export const CommercialInsurancePage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        businessName: '',
        businessAddress: '',
        city: '',
        state: '',
        zipCode: '',
        businessType: '',
        yearsInBusiness: '',
        numberOfEmployees: '',
        annualRevenue: '',
        currentCoverage: '',
        coverageNeeded: [] as string[],
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            coverageNeeded: checked
                ? [...prev.coverageNeeded, value]
                : prev.coverageNeeded.filter(item => item !== value)
        }));
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

    const coverageOptions = [
        { value: 'gl', label: 'General Liability (GL)' },
        { value: 'wc', label: "Workers' Compensation (WC)" },
        { value: 'commercial-auto', label: 'Commercial Auto' },
        { value: 'bop', label: "Business Owner's Policy (BOP)" },
        { value: 'professional-liability', label: 'Professional Liability / E&O' },
        { value: 'property', label: 'Commercial Property' },
        { value: 'cyber', label: 'Cyber Liability' }
    ];

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
                            Sebanda Insurance Agency 61
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
                            Protect Your <span className="text-gradient-secondary">Business</span>
                        </h1>

                        <p className="text-xl text-text-muted max-w-lg leading-relaxed">
                            Safeguard your business operations, employees, and assets with customized commercial insurance policies built for your industry.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <QuoteButton
                                href={COMMERCIAL_QUOTE_URL}
                                label="Get Business Quote"
                                variant="secondary"
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
                        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/10 to-light-blue/10 rounded-[2rem] lg:rounded-[3rem] transform -rotate-2" />
                        <img
                            src="/images/commercial-hero.png"
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
                        <span className="badge-trust mb-4">Coverage Options</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
                            Business <span className="text-gradient-secondary">Protection</span>
                        </h2>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            Comprehensive coverage options to protect every aspect of your business.
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
                        <span className="badge-trust mb-4">Simple Process</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
                            How We <span className="text-gradient-secondary">Protect Your Business</span>
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
                            <span className="badge-trust mb-4">Expert Protection</span>
                            <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                                Secure Your <span className="text-gradient-secondary">Future</span>
                            </h2>
                            <p className="text-text-muted text-lg mb-8">
                                Every business is unique, and so are its risks. Our experienced commercial agents take the time to understand your operations, identifying vulnerabilities and structuring a policy that provides rock-solid defense against the unexpected.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Briefcase size={24} className="text-deep-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Industry Specific Solutions</h4>
                                        <p className="text-text-muted text-sm">Whether you run a tech startup or a construction firm, we have specialized policies built for your exact industry.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-bright-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <ShieldIcon size={24} className="text-bright-red" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Comprehensive Risk Management</h4>
                                        <p className="text-text-muted text-sm">We don't just sell insurance; we partner with you to minimize liability and lower your long-term premiums.</p>
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
                                src="/images/business-owner.png"
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
                        <span className="badge-trust mb-4">Get a Quote</span>
                        <h2 className="text-4xl font-bold mb-4 text-premium-heading">
                            Commercial Insurance <span className="text-gradient-secondary">Quote Request</span>
                        </h2>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            Tell us about your business and we'll provide a customized insurance solution.
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
                                Thank you for your interest. A commercial insurance specialist will contact you shortly to discuss your business needs.
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
                            <h3 className="text-xl font-bold mb-6 text-gradient-secondary">Contact Information</h3>
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
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
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
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
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
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
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
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            {/* Business Information */}
                            <h3 className="text-xl font-bold mb-6 text-gradient-secondary">Business Information</h3>
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        Business Name <span className="text-gradient-primary">*</span>
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
                                        Business Address <span className="text-gradient-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="businessAddress"
                                        value={formData.businessAddress}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                        placeholder="123 Business Ave, Suite 100"
                                    />
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-text-main mb-2">City</label>
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
                                        <label className="block text-sm font-medium text-text-main mb-2">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                            placeholder="CA"
                                            maxLength={2}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-main mb-2">Zip Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                            placeholder="90001"
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-text-main mb-2">
                                            Type of Business <span className="text-gradient-primary">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="businessType"
                                            value={formData.businessType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                            placeholder="e.g., Restaurant, Contractor, Retail"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-main mb-2">Years in Business</label>
                                        <select
                                            name="yearsInBusiness"
                                            value={formData.yearsInBusiness}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all bg-white"
                                        >
                                            <option value="">Select</option>
                                            <option value="new">New Business (Less than 1 year)</option>
                                            <option value="1-3">1 to 3 years</option>
                                            <option value="3-5">3 to 5 years</option>
                                            <option value="5-10">5 to 10 years</option>
                                            <option value="10+">10+ years</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-text-main mb-2">Number of Employees</label>
                                        <select
                                            name="numberOfEmployees"
                                            value={formData.numberOfEmployees}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all bg-white"
                                        >
                                            <option value="">Select</option>
                                            <option value="1">Just me (1)</option>
                                            <option value="2-5">2 to 5 employees</option>
                                            <option value="6-10">6 to 10 employees</option>
                                            <option value="11-25">11 to 25 employees</option>
                                            <option value="26-50">26 to 50 employees</option>
                                            <option value="50+">50+ employees</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-main mb-2">Estimated Annual Revenue</label>
                                        <select
                                            name="annualRevenue"
                                            value={formData.annualRevenue}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all bg-white"
                                        >
                                            <option value="">Select</option>
                                            <option value="under-100k">Under $100,000</option>
                                            <option value="100k-250k">$100,000 - $250,000</option>
                                            <option value="250k-500k">$250,000 - $500,000</option>
                                            <option value="500k-1m">$500,000 - $1 million</option>
                                            <option value="1m-5m">$1 million - $5 million</option>
                                            <option value="5m+">$5 million+</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">Current Coverage</label>
                                    <input
                                        type="text"
                                        name="currentCoverage"
                                        value={formData.currentCoverage}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all"
                                        placeholder="Current insurance provider (if any)"
                                    />
                                </div>
                            </div>

                            {/* Coverage Needed */}
                            <h3 className="text-xl font-bold mb-6 text-gradient-secondary">Coverage Needed</h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                {coverageOptions.map(option => (
                                    <label key={option.value} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-deep-blue transition-colors">
                                        <input
                                            type="checkbox"
                                            value={option.value}
                                            checked={formData.coverageNeeded.includes(option.value)}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 text-deep-blue border-gray-300 rounded focus:ring-deep-blue"
                                        />
                                        <span className="text-sm font-medium">{option.label}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Additional Notes */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-text-main mb-2">Additional Information</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all resize-none"
                                    placeholder="Any additional details about your business or specific coverage requirements..."
                                />
                            </div>

                            {/* Consent */}
                            <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" required className="mt-1 w-5 h-5 text-deep-blue border-gray-300 rounded focus:ring-deep-blue" />
                                    <span className="text-sm text-text-muted">
                                        I agree to be contacted by Sebanda Insurance Agency 61 via call, text, or email regarding my insurance request. Message and data rates may apply.
                                    </span>
                                </label>
                            </div>

                            {/* Security Badges */}
                            <div className="flex items-center justify-center gap-6 mb-8 text-xs text-text-muted">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-deep-blue" />
                                    <span>256 bit SSL Encrypted</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldIcon size={16} className="text-deep-blue" />
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
                                    ? 'bg-deep-blue/70 cursor-not-allowed'
                                    : 'bg-deep-blue hover:bg-deep-blue/90 cursor-pointer'
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
            <StickyQuoteButton href={COMMERCIAL_QUOTE_URL} label="Get Business Quote" />
        </div>
    );
};
