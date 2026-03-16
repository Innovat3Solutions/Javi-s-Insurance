import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, HelpCircle, Users, ArrowRight, ExternalLink, CheckCircle, Clock, FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { ContactForm } from '../components/ContactForm';
import { QuoteButton, StickyQuoteButton } from '../components/QuoteButton';
import { TrustBadges } from '../components/TrustBadges';
import { ProcessTimelineCompact } from '../components/ProcessTimeline';
import { TestimonialsSection } from '../components/TestimonialCard';
import { WhyChooseUsCompact } from '../components/AboutSection';
import { Shield, ShieldAlert, ShieldCheck, Star } from 'lucide-react';
import {
  ShieldPlus,
  CircleCheckFilled,
  HeartIcon,
  FamilyIcon,
  DollarIcon,
  CalendarIcon,
  PhoneIcon
} from '../components/BrandIcons';

// Official Healthcare.gov portal URL
const HEALTHCARE_GOV_URL = "https://www.healthcare.gov/";
const OBAMACARE_QUOTE_URL = "https://www.healthcare.gov/see-plans/";
const HEALTHSHERPA_SELF_APPLY_URL = "https://www.healthsherpa.com/?_agent_id=javisinsuranceservices&ljs=es-MX";

// Healthcare.gov official blue color
const healthcareBlue = '#0071BC';

const benefits = [
  {
    icon: HeartIcon,
    title: "Comprehensive Coverage",
    description: "All ACA plans must cover 10 Essential Health Benefits including hospitalization, prescription drugs, mental health services, and preventive care at no extra cost."
  },
  {
    icon: DollarIcon,
    title: "Financial Assistance",
    description: "Premium Tax Credits and Cost Sharing Reductions based on household income. Many families qualify for $0 premium plans or significant savings."
  },
  {
    icon: FamilyIcon,
    title: "Family Protection",
    description: "Coverage for individuals, couples, and families of any size. Children can stay on parents' plans until age 26, regardless of student status or living situation."
  },
  {
    icon: ShieldPlus,
    title: "Guaranteed Coverage",
    description: "No denial of coverage or higher rates due to preexisting conditions. Insurance companies cannot cancel your coverage if you get sick."
  }
];

// 10 Essential Health Benefits required by ACA
const essentialBenefits = [
  "Ambulatory patient services including outpatient care",
  "Emergency services",
  "Hospitalization",
  "Pregnancy, maternity, and newborn care",
  "Mental health and substance use disorder services",
  "Prescription drugs",
  "Rehabilitative services and devices",
  "Laboratory services",
  "Preventive and wellness services",
  "Pediatric services, including dental and vision"
];

const coverageTypes = [
  { name: "Bronze", coverage: "60%", premium: "Lowest", bestFor: "Low healthcare usage, want catastrophic protection. Good for healthy individuals who want basic coverage.", icon: ShieldAlert },
  { name: "Silver", coverage: "70%", premium: "Moderate", bestFor: "Best value if you qualify for Cost Sharing Reductions (CSR). Most popular choice for subsidy eligible enrollees.", icon: Star, popular: true },
  { name: "Gold", coverage: "80%", premium: "Higher", bestFor: "Regular healthcare needs, predictable costs. Lower deductibles and copays for frequent doctor visits.", icon: ShieldCheck },
  { name: "Platinum", coverage: "90%", premium: "Highest", bestFor: "Frequent healthcare usage, chronic conditions. Highest premiums but lowest out of pocket costs when you need care.", icon: Shield }
];

// Expanded FAQs with detailed information
const faqs = [
  {
    q: "What is Obamacare / the Affordable Care Act (ACA)?",
    a: "The Affordable Care Act (ACA), commonly called Obamacare, is a comprehensive healthcare reform law passed in 2010. It created the Health Insurance Marketplace where individuals and families can shop for and purchase health insurance. The law requires all plans to cover 10 Essential Health Benefits, prohibits insurance companies from denying coverage due to preexisting conditions, and provides financial assistance to help make coverage affordable."
  },
  {
    q: "When is Open Enrollment for 2026 coverage?",
    a: "Open Enrollment for 2026 health coverage runs from November 1, 2025 through January 15, 2026. If you enroll by December 15, your coverage starts January 1. If you enroll between December 16 and January 15, your coverage starts February 1. Outside of Open Enrollment, you may qualify for a Special Enrollment Period if you experience certain life events like losing other coverage, getting married, having a baby, or moving to a new area."
  },
  {
    q: "How do I know if I qualify for financial assistance?",
    a: "You may qualify for Premium Tax Credits if your household income is between 100% and 400% of the Federal Poverty Level (FPL). For 2026, the enhanced subsidies from the American Rescue Plan continue, meaning even those above 400% FPL may qualify for help. Cost Sharing Reductions (CSR) are available for those with income between 100 to 250% FPL who choose Silver plans. Our licensed agents can help you determine your eligibility and maximize your savings."
  },
  {
    q: "What's the difference between Bronze, Silver, Gold, and Platinum plans?",
    a: "These 'metal tiers' indicate how you and your plan share costs. Bronze plans have the lowest monthly premiums but highest out of pocket costs when you need care (60/40 split). Silver plans are moderate (70/30 split) and are the only plans eligible for Cost Sharing Reductions. Gold plans have higher premiums but lower costs at the doctor (80/20 split). Platinum plans have the highest premiums but lowest out of pocket costs (90/10 split). All tiers cover the same essential benefits."
  },
  {
    q: "What are the 10 Essential Health Benefits?",
    a: "By law, all ACA Marketplace plans must cover: 1) Outpatient care, 2) Emergency services, 3) Hospitalization, 4) Maternity and newborn care, 5) Mental health and substance abuse services, 6) Prescription drugs, 7) Rehabilitative services, 8) Lab tests, 9) Preventive care and chronic disease management, and 10) Pediatric services including dental and vision for children. Preventive services like vaccines, screenings, and check-ups are covered at no cost to you."
  },
  {
    q: "Can I keep my current doctor with an ACA plan?",
    a: "It depends on the plan's provider network. Before enrolling, you should check if your preferred doctors, specialists, and hospitals are in the plan's network. Our agents help you verify provider participation before you enroll. Many plans offer broad networks, and you can also choose PPO plans that allow out of network care at a higher cost."
  },
  {
    q: "What happens if I don't have health insurance?",
    a: "While the federal individual mandate penalty was reduced to $0 in 2019, some states (California, Massachusetts, New Jersey, Rhode Island, Vermont, and DC) have their own mandates with penalties for being uninsured. More importantly, being uninsured means you're responsible for 100% of medical costs, which can lead to significant debt from unexpected illness or injury. Having coverage protects both your health and finances."
  },
  {
    q: "How does Javi's Insurance help with enrollment?",
    a: "As licensed health insurance agents, we provide free, personalized assistance throughout the enrollment process. We help you understand your options, compare plans from multiple insurers, determine your subsidy eligibility, and complete your application correctly. Our service costs you nothing because we're compensated by insurance companies, and you pay the same rates as going direct. We also provide year round support for questions about your coverage."
  },
  {
    q: "What's the difference between Obamacare and Medicaid?",
    a: "Obamacare (ACA Marketplace) plans are private health insurance for individuals and families who don't have coverage through an employer. You pay monthly premiums, though subsidies may reduce or eliminate this cost. Medicaid is a government program providing free or very low cost coverage to people with limited income. If your income is below 138% FPL in expansion states, you may qualify for Medicaid instead of Marketplace coverage. We can help determine which program is right for you."
  },
  {
    q: "Can I get coverage if I'm self employed or unemployed?",
    a: "Yes! The ACA Marketplace is ideal for self employed individuals, freelancers, gig workers, and those between jobs. If you've lost employer coverage (COBRA is often expensive), you qualify for a Special Enrollment Period. Self employed individuals can deduct their health insurance premiums as a business expense. Many self employed people qualify for significant subsidies based on their projected annual income."
  }
];

export const ObamacarePage = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-cream font-sans text-text-main overflow-x-hidden">
      <Navbar />

      {/* Official Portal Banner */}
      <div className="bg-[#0071BC] text-white py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-sm font-medium">Official ACA Enrollment Assistance</span>
          <a
            href={HEALTHCARE_GOV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-bold underline hover:text-white/90"
          >
            Visit HealthCare.gov <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
        {/* Background with decorative color hues */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0071BC]/5 via-transparent to-[#0071BC]/10 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-dots-pattern -z-10 opacity-20" />

        {/* Decorative color orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#0071BC]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-bright-red/5 rounded-full blur-2xl -z-10" />

        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 lg:w-1/2"
          >
            <span className="badge-trust border-[#0071BC]">
              <ShieldPlus size={16} className="text-[#0071BC]" />
              Affordable Care Act (ACA) Enrollment
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
              Get Covered with{' '}
              <span style={{ color: healthcareBlue }}>Health Insurance</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-muted max-w-lg leading-relaxed">
              Quality health insurance through the ACA Marketplace. Our licensed agents help you find the perfect plan, maximize your subsidies, and enroll correctly at no cost to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href={HEALTHSHERPA_SELF_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <FileText size={20} />
                Apply Online Now
              </a>
              <a
                href="tel:310-437-2766"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <PhoneIcon size={20} className="text-current" />
                (310) 437-2766
              </a>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-8 pt-6 w-full">
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: healthcareBlue }}>$0</div>
                <div className="text-[10px] sm:text-sm text-text-muted leading-tight mt-1">Premium Plans<br className="sm:hidden" /> Available</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-silver/50" />
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: healthcareBlue }}>21M+</div>
                <div className="text-[10px] sm:text-sm text-text-muted leading-tight mt-1">Americans<br className="sm:hidden" /> Enrolled</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-silver/50" />
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: healthcareBlue }}>Free</div>
                <div className="text-[10px] sm:text-sm text-text-muted leading-tight mt-1">Agent<br className="sm:hidden" /> Assistance</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative lg:w-1/2 w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0071BC]/10 to-[#0071BC]/20 rounded-[2rem] lg:rounded-[3rem] transform rotate-2" />
            <img
              src="/images/obamacare-hero.png"
              alt="Family reviewing health insurance options together"
              className="relative rounded-[2rem] lg:rounded-[3rem] shadow-premium w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
            />

            {/* Floating Badge */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-4 md:-bottom-6 left-2 md:-left-6 glass p-3 md:p-5 rounded-2xl shadow-premium border border-white/50 max-w-[85%] sm:max-w-none"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex-shrink-0 w-10 md:w-12 h-10 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CircleCheckFilled size={20} className="text-green-600 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm md:text-base truncate" style={{ color: healthcareBlue }}>Open Enrollment</div>
                  <div className="text-xs md:text-sm text-text-muted truncate">Nov 1 to Jan 15</div>
                </div>
              </div>
            </motion.div>

            {/* Healthcare.gov Badge */}
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-2 md:-top-4 right-2 md:-right-4 bg-white p-3 md:p-4 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="text-[10px] md:text-xs font-bold text-gray-500 mb-1">Official Partner</div>
              <div className="font-bold text-sm md:text-base" style={{ color: healthcareBlue }}>HealthCare.gov</div>
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

      {/* Medicaid Redirect Banner */}
      <section className="bg-gradient-to-r from-[#00796B]/10 to-[#4DB6AC]/10 py-6 border-b border-[#00796B]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00796B] rounded-full flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#004D40]">Income Below Medicaid Limits?</h3>
                <p className="text-sm text-gray-600">You may qualify for free Medicaid coverage instead. We can help you apply.</p>
              </div>
            </div>
            <Link
              to="/medicaid"
              className="inline-flex items-center gap-2 bg-[#00796B] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#004D40] transition-colors"
            >
              Check Medicaid Eligibility
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Important Dates Section */}
      <section className="py-12 bg-[#0071BC]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={24} className="text-[#0071BC]" />
                <h3 className="font-bold text-lg">Open Enrollment</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-[#0071BC]">Nov 1 to Jan 15</p>
              <p className="text-sm text-text-muted">The annual period when anyone can enroll in or change their health insurance plan.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <CalendarIcon size={24} className="text-[#0071BC]" />
                <h3 className="font-bold text-lg">Coverage Start</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-[#0071BC]">January 1, 2026</p>
              <p className="text-sm text-text-muted">Enroll by December 15 for coverage starting January 1.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={24} className="text-[#0071BC]" />
                <h3 className="font-bold text-lg">Special Enrollment</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-[#0071BC]">60 Days</p>
              <p className="text-sm text-text-muted">Lost coverage? You have 60 days from your qualifying event to enroll.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-trust mb-4">ACA Benefits</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              Why Choose <span style={{ color: healthcareBlue }}>Marketplace Coverage</span>?
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              The Affordable Care Act provides essential protections and comprehensive benefits for all Americans.
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
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 bg-[#0071BC]/10">
                  <benefit.icon size={32} className="text-[#0071BC]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Essential Health Benefits */}
      <section className="section-padding" style={{ backgroundColor: `${healthcareBlue}08` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-trust mb-4">Required by Law</span>
              <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                10 Essential Health Benefits
              </h2>
              <p className="text-text-muted text-lg mb-8 leading-relaxed">
                All ACA Marketplace plans must cover these essential health benefits. This ensures you get comprehensive coverage no matter which plan you choose.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {essentialBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} style={{ color: healthcareBlue }} className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{benefit}</span>
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
              <h3 className="text-2xl font-bold mb-6" style={{ color: healthcareBlue }}>Preventive Care at No Cost</h3>
              <p className="text-text-muted mb-6">
                All Marketplace plans cover preventive services at no out-of-pocket cost when provided by an in-network provider:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Annual wellness visits and check-ups
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Immunizations and vaccines
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Cancer screenings (mammograms, colonoscopies)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Blood pressure and cholesterol tests
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Diabetes screenings
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Depression screenings
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Contraception and family planning
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Tiers */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-trust mb-4">Plan Options</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              Choose Your <span style={{ color: healthcareBlue }}>Coverage Level</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Metal tiers help you balance monthly premiums with out-of-pocket costs. All tiers cover the same essential benefits.
            </p>
          </motion.div>

          <div className="flex overflow-x-auto pb-12 pt-4 -mx-6 px-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:py-0 md:mx-0 md:px-0 gap-6 custom-scrollbar">
            {coverageTypes.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative w-[85vw] sm:w-[320px] shrink-0 snap-center md:w-auto p-8 rounded-[2rem] border transition-all duration-300 ${tier.popular
                  ? 'text-white border-transparent shadow-[0_20px_40px_-15px_rgba(0,113,188,0.4)] md:-translate-y-4'
                  : 'bg-white text-text-main border-gray-100 hover:border-[#0071BC]/30 hover:shadow-card-hover'
                  }`}
                style={tier.popular ? { backgroundColor: healthcareBlue } : {}}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tier.popular ? 'bg-white/10 text-white' : ''}`}
                    style={!tier.popular ? { backgroundColor: `${healthcareBlue}10`, color: healthcareBlue } : {}}
                  >
                    <tier.icon strokeWidth={2} size={28} />
                  </div>
                  <div className={`text-right ${tier.popular ? 'text-white/80' : 'text-text-muted'} text-sm font-medium`}>
                    Covers<br />
                    <span className={`text-xl font-bold ${tier.popular ? 'text-white' : ''}`} style={!tier.popular ? { color: healthcareBlue } : {}}>{tier.coverage}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-6">{tier.name} Plan</h3>

                <div className="space-y-4 mb-8">
                  <div className={`flex justify-between items-center py-3 border-b ${tier.popular ? 'border-white/10' : 'border-gray-50'}`}>
                    <span className={`text-sm ${tier.popular ? 'text-white/80' : 'text-text-muted'}`}>Premium Cost</span>
                    <span className="font-bold">{tier.premium}</span>
                  </div>
                  <div className={`flex justify-between items-center py-3 border-b ${tier.popular ? 'border-white/10' : 'border-gray-50'}`}>
                    <span className={`text-sm ${tier.popular ? 'text-white/80' : 'text-text-muted'}`}>Out of Pocket</span>
                    <span className="font-bold">{tier.name === 'Bronze' ? 'Highest' : tier.name === 'Silver' ? 'Moderate' : tier.name === 'Gold' ? 'Lower' : 'Lowest'}</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl text-sm leading-relaxed ${tier.popular ? 'bg-white/5 text-white/90' : 'bg-gray-50 text-text-muted'}`}>
                  {tier.bestFor}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={HEALTHSHERPA_SELF_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-bright-red text-white px-8 py-4 rounded-full font-bold hover:bg-bright-red/90 transition-colors shadow-lg"
              >
                <FileText size={20} />
                Apply Online Now
              </a>
              <QuoteButton
                href={OBAMACARE_QUOTE_URL}
                label="Compare on HealthCare.gov"
                variant="secondary"
                size="large"
              />
            </div>
            <p className="text-sm text-text-muted">
              Apply directly through our partner portal or compare plans on HealthCare.gov.
            </p>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding" style={{ backgroundColor: `${healthcareBlue}05` }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-trust mb-4">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              How We <span style={{ color: healthcareBlue }}>Help You Enroll</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Our licensed agents guide you through every step—completely free of charge.
            </p>
          </motion.div>
          <ProcessTimelineCompact product="obamacare" />
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
              <span className="badge-trust mb-4">Why Choose Us</span>
              <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                Expert Guidance, <span style={{ color: healthcareBlue }}>Zero Cost</span>
              </h2>
              <p className="text-text-muted text-lg mb-8">
                Navigating health insurance can be confusing. Our licensed agents make it simple—and our service is completely free to you.
              </p>
              <WhyChooseUsCompact />

            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/couple-with-agent.png"
                alt="Insurance agent helping customers understand their options"
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
            <span className="badge-trust mb-4">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              Obamacare <span className="text-gradient-secondary">Questions Answered</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Get answers to the most common questions about ACA Marketplace coverage.
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
                        <ChevronDown
                          className={`transition-transform duration-300 flex-shrink-0 text-deep-blue ${openFaq === actualIndex ? 'rotate-180' : ''}`}
                        />
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

          {/* Official HealthCare.gov Button */}
          <div className="mt-12 bg-[#0071BC]/5 rounded-2xl p-8 border border-[#0071BC]/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Need More Information?</h4>
                <p className="text-gray-500">Visit the official HealthCare.gov website for additional resources, plan details, and enrollment assistance.</p>
              </div>
              <a
                href="https://www.healthcare.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0071BC] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#005a96] transition-colors shadow-lg whitespace-nowrap"
              >
                <ExternalLink size={18} />
                Visit HealthCare.gov
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection filter="obamacare" />

      {/* CTA Banner */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, ${healthcareBlue} 0%, #005a96 100%)` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">Ready to Get Covered?</h3>
              <p className="text-white/80">Get a free quote in minutes. Our licensed agents are here to help.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={HEALTHSHERPA_SELF_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-deep-blue px-6 py-3 rounded-full font-bold hover:bg-cream transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText size={20} />
                Apply Online Now
              </a>
              <a
                href="tel:310-437-2766"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <PhoneIcon size={20} />
                Call Us
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
              <span className="badge-trust mb-4">Contact Us</span>
              <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                Need Help <span style={{ color: healthcareBlue }}>Enrolling</span>?
              </h2>
              <p className="text-text-muted text-lg mb-8">
                Have questions about ACA enrollment or eligibility? Our licensed insurance agents are here to help you find the best coverage for your needs—at no cost to you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#0071BC]/10">
                    <CalendarIcon size={24} className="text-[#0071BC]" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Open Enrollment Period</h4>
                    <p className="text-text-muted text-sm">November 1, 2025 to January 15, 2026. Don't miss your chance to enroll!</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#0071BC]/10">
                    <DollarIcon size={24} className="text-[#0071BC]" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Subsidies & Tax Credits</h4>
                    <p className="text-text-muted text-sm">Most families qualify for financial assistance to reduce monthly premiums.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#0071BC]/10">
                    <PhoneIcon size={24} className="text-[#0071BC]" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Free Consultation</h4>
                    <p className="text-text-muted text-sm">Speak with a licensed agent at no cost. We're paid by insurers, not you.</p>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="mt-8 p-6 bg-[#0071BC]/5 rounded-xl border border-[#0071BC]/20">
                <h4 className="font-bold mb-4 text-gray-800">Official Government Resources</h4>
                <div className="space-y-3">
                  <a
                    href="https://www.healthcare.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#0071BC] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#0071BC] rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#0071BC]">HealthCare.gov</div>
                      <div className="text-xs text-gray-500">Official ACA Marketplace</div>
                    </div>
                  </a>
                  <a
                    href="https://www.healthcare.gov/see-plans/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#0071BC] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#0071BC]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#0071BC]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#0071BC]">Preview Plans & Prices</div>
                      <div className="text-xs text-gray-500">See available coverage options</div>
                    </div>
                  </a>
                  <a
                    href="https://www.healthcare.gov/income-and-household-information/how-to-report/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#0071BC] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#0071BC]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#0071BC]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#0071BC]">Check Subsidy Eligibility</div>
                      <div className="text-xs text-gray-500">See if you qualify for financial help</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            <ContactForm
              productType="obamacare"
              title="Request Free Enrollment Assistance"
              subtitle="Fill out the form and a licensed agent will contact you within 24 hours."
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Sticky Mobile Quote Button */}
      <StickyQuoteButton href={HEALTHSHERPA_SELF_APPLY_URL} />
    </div>
  );
};
