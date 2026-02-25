import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { ContactForm } from '../components/ContactForm';
import { QuoteButton, StickyQuoteButton } from '../components/QuoteButton';
import { TrustBadges } from '../components/TrustBadges';
import { ProcessTimelineCompact } from '../components/ProcessTimeline';
import {
    ShieldIcon,
    ShieldPlus,
    HeartIcon,
    PhoneIcon
} from '../components/BrandIcons';

const HEALTH_QUOTE_URL = "/quote";

export const HealthInsurancePage = () => {
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
                            Individual & Family Coverage
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
                            Comprehensive <span className="text-gradient-secondary">Health Insurance</span>
                        </h1>

                        <p className="text-xl text-text-muted max-w-lg leading-relaxed">
                            Find the perfect health insurance plan for you and your family. We compare top providers to get you the best coverage at the most affordable price.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <QuoteButton
                                href={HEALTH_QUOTE_URL}
                                label="Get Health Quotes"
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
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/10 to-bright-red/10 rounded-[3rem] transform -rotate-2" />

                        {/* TEMPORARY IMAGE HOLDER FOR HEALTH INSURANCE */}
                        <img
                            src="/images/health-hero.png"
                            alt="Family health coverage"
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
                        <span className="badge-trust mb-4">Simple Process</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
                            How We <span className="text-gradient-secondary">Help You Select</span>
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
                            <span className="badge-trust mb-4">Expert Guidance</span>
                            <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                                Your Health is <span className="text-gradient-secondary">Our Priority</span>
                            </h2>
                            <p className="text-text-muted text-lg mb-8">
                                Navigating individual and family health insurance plans can be overwhelming. Our licensed experts simplify the process, helping you find comprehensive coverage that fits your lifestyle and budget.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-bright-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <HeartIcon size={24} className="text-bright-red" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Tailored for You</h4>
                                        <p className="text-text-muted text-sm">We assess your specific medical needs and match you with the right providers and plans.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <ShieldPlus size={24} className="text-deep-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Trusted Partners</h4>
                                        <p className="text-text-muted text-sm">We partner with top-rated insurance carriers to ensure you receive quality care at competitive rates.</p>
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
                                alt="Couple consulting with an insurance agent"
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
                            <span className="badge-trust mb-4">Contact Us</span>
                            <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                                Need Help Finding <span className="text-gradient-secondary">Coverage</span>?
                            </h2>
                            <p className="text-text-muted text-lg mb-8">
                                Our licensed agents are standing by to help you compare plans and find the perfect match for your healthcare needs and budget.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <ShieldIcon size={24} className="text-deep-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Plan Comparison</h4>
                                        <p className="text-text-muted text-sm">Compare HMOs, PPOs, and high-deductible plans side by side.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <PhoneIcon size={24} className="text-deep-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Free Consultation</h4>
                                        <p className="text-text-muted text-sm">No pressure, no obligation. Just helpful guidance from experts.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <ContactForm
                            productType="health"
                            title="Request Health Guidance"
                            subtitle="Fill out the form below and an agent will contact you shortly."
                        />
                    </div>
                </div>
            </section>

            <Footer />

            {/* Sticky Mobile Quote Button */}
            <StickyQuoteButton href={HEALTH_QUOTE_URL} label="Compare Health Plans" />
        </div>
    );
};
