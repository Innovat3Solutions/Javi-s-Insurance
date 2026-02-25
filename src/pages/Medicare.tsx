import { motion } from 'motion/react';
import { useState } from 'react';
import { Eye, HelpCircle, ChevronDown, ArrowRight, Users, ExternalLink, CheckCircle, Clock, FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout';
import { ContactForm } from '../components/ContactForm';
import { QuoteButton, StickyQuoteButton } from '../components/QuoteButton';
import { TrustBadges } from '../components/TrustBadges';
import { ProcessTimelineCompact } from '../components/ProcessTimeline';
import { TestimonialsSection } from '../components/TestimonialCard';
import { WhyChooseUsCompact } from '../components/AboutSection';
import {
  ShieldIcon,
  ShieldPlus,
  HeartIcon,
  PillIcon,
  StethoscopeIcon,
  CalendarIcon,
  PhoneIcon
} from '../components/BrandIcons';

// Official Medicare.gov portal URLs
const MEDICARE_GOV_URL = "https://www.medicare.gov/";
const MEDICARE_QUOTE_URL = "https://www.medicare.gov/plan-compare/";

const medicareParts = [
  {
    part: "Part A",
    name: "Hospital Insurance",
    icon: HeartIcon,
    description: "Covers inpatient hospital stays, skilled nursing facility care, hospice care, and some home health care. Most people don't pay a premium for Part A if they or their spouse paid Medicare taxes while working.",
    color: "from-deep-blue to-light-blue",
    premium: "Usually $0 if you paid Medicare taxes for 10+ years"
  },
  {
    part: "Part B",
    name: "Medical Insurance",
    icon: StethoscopeIcon,
    description: "Covers doctor visits, outpatient care, preventive services, durable medical equipment, ambulance services, and mental health care. You pay a monthly premium based on your income.",
    color: "from-[#0071BC] to-[#005a96]",
    premium: "Standard 2026 premium: $185/month (income-based)"
  },
  {
    part: "Part C",
    name: "Medicare Advantage",
    icon: ShieldPlus,
    description: "An all-in-one alternative to Original Medicare offered by private insurers approved by Medicare. Most plans include Part D drug coverage and extra benefits like vision, dental, and hearing.",
    color: "from-bright-red to-bright-red-dark",
    premium: "$0 premium plans available in most areas"
  },
  {
    part: "Part D",
    name: "Prescription Drug",
    icon: PillIcon,
    description: "Helps cover the cost of prescription drugs, including many recommended vaccines. Available as a standalone plan with Original Medicare or included in most Medicare Advantage plans.",
    color: "from-[#6B21A8] to-[#4C1D95]",
    premium: "Varies by plan, national average ~$55/month"
  }
];

const additionalBenefits = [
  { icon: Eye, title: "Vision Coverage", description: "Routine eye exams, glasses, and contacts" },
  { icon: StethoscopeIcon, title: "Dental Coverage", description: "Cleanings, fillings, extractions, and dentures" },
  { icon: HeartIcon, title: "Hearing Benefits", description: "Hearing exams and hearing aid coverage" },
  { icon: ShieldPlus, title: "Fitness Programs", description: "SilverSneakers® and gym memberships" },
  { icon: PillIcon, title: "Prescription Savings", description: "Lower costs on medications through Part D" },
  { icon: HeartIcon, title: "Telehealth", description: "Virtual doctor visits from home" }
];

// Expanded FAQs with detailed Medicare information
const faqs = [
  {
    q: "What is Medicare and who is eligible?",
    a: "Medicare is the federal health insurance program for people 65 or older, certain younger people with disabilities, and people with End-Stage Renal Disease (ESRD). If you're a U.S. citizen or permanent legal resident who has lived in the U.S. for at least 5 years and are 65+, you're eligible. You may also qualify if you've received Social Security disability benefits for 24 months, or have ALS (Lou Gehrig's disease) or ESRD."
  },
  {
    q: "When can I enroll in Medicare?",
    a: "Your Initial Enrollment Period (IEP) is a 7 month window that starts 3 months before your 65th birthday month and ends 3 months after. The Annual Enrollment Period (AEP) runs October 15 to December 7 each year, when you can switch plans. The Medicare Advantage Open Enrollment Period (January 1 to March 31) allows MA members to switch plans or return to Original Medicare. Special Enrollment Periods are available for qualifying events."
  },
  {
    q: "What's the difference between Original Medicare and Medicare Advantage?",
    a: "Original Medicare (Parts A & B) is provided directly by the federal government. You can see any Medicare-accepting provider nationwide and add a standalone Part D drug plan and/or Medigap supplement. Medicare Advantage (Part C) is offered by private insurers approved by Medicare. Plans are typically HMO or PPO networks, often include drug coverage and extra benefits (vision, dental, hearing, fitness), and may have $0 premiums but require using network providers."
  },
  {
    q: "Do I need a Medicare Supplement (Medigap) plan?",
    a: "Medigap plans help pay costs that Original Medicare doesn't cover, like copayments, coinsurance, and deductibles. They're sold by private insurers and provide more predictable healthcare costs. Important: Medigap plans only work with Original Medicare, not Medicare Advantage. The best time to buy Medigap is during your 6-month Medigap Open Enrollment Period, starting when you're 65+ AND enrolled in Part B."
  },
  {
    q: "What if I'm still working at 65 with employer coverage?",
    a: "If you have coverage through your or your spouse's current employer with 20+ employees, you can typically delay Medicare Part B without penalty. You'll get a Special Enrollment Period when that coverage ends. However, you should still enroll in Part A (it's usually free) unless you have a Health Savings Account (HSA). If your employer has fewer than 20 employees, Medicare becomes your primary coverage at 65."
  },
  {
    q: "Is there a penalty for late enrollment?",
    a: "Yes. If you don't sign up for Part B when first eligible and don't have qualifying coverage, you'll pay a 10% premium penalty for each 12-month period you could have had Part B but didn't. This penalty lasts for life. Part D also has a late enrollment penalty: 1% of the national base premium for each month you went without creditable drug coverage. Our agents help ensure you enroll on time to avoid penalties."
  },
  {
    q: "What does Medicare Part D cover?",
    a: "Part D covers prescription drugs, including many recommended vaccines (like shingles and Tdap). Starting in 2025, all Part D plans cap out-of-pocket drug costs at $2,000 per year thanks to the Inflation Reduction Act. Plans have formularies (drug lists) that categorize medications into tiers with different costs. We can help you find a plan that covers your specific medications at the lowest cost."
  },
  {
    q: "What extra benefits do Medicare Advantage plans offer?",
    a: "Many Medicare Advantage plans include benefits not covered by Original Medicare: routine vision, dental, and hearing care; fitness programs like SilverSneakers; over-the-counter allowances; transportation to medical appointments; meal delivery after hospital stays; and telehealth services. Some plans offer special supplemental benefits for chronically ill members. Benefits vary by plan and location."
  },
  {
    q: "How does Javi's Insurance help with Medicare enrollment?",
    a: "As licensed Medicare agents, we provide free, unbiased guidance to help you understand your options. We compare plans from multiple insurers, help you find doctors in-network, verify your medications are covered, and assist with the entire enrollment process. Our service is free—we're compensated by insurance companies, not you. We provide year-round support for questions about your coverage, not just during enrollment periods."
  },
  {
    q: "What if I have limited income? Are there programs to help?",
    a: "Yes! Several programs help with Medicare costs: Medicare Savings Programs (MSPs) help pay Part B premiums and may cover deductibles/copays. Extra Help (Low-Income Subsidy) significantly reduces Part D prescription costs. Medicaid dual-eligibility provides comprehensive coverage for those who qualify. We can help determine your eligibility for these programs and assist with applications."
  }
];

const comparisonData = [
  { feature: "Hospital Coverage (Part A)", original: true, advantage: true },
  { feature: "Medical Coverage (Part B)", original: true, advantage: true },
  { feature: "Prescription Drugs (Part D)", original: false, advantage: true },
  { feature: "Routine Vision Coverage", original: false, advantage: true },
  { feature: "Routine Dental Coverage", original: false, advantage: true },
  { feature: "Hearing Coverage", original: false, advantage: true },
  { feature: "Fitness Benefits", original: false, advantage: true },
  { feature: "Out-of-Pocket Maximum", original: false, advantage: true },
  { feature: "Use Any Medicare Provider", original: true, advantage: false },
  { feature: "No Network Restrictions", original: true, advantage: false },
  { feature: "Medigap Supplement Available", original: true, advantage: false }
];

export const MedicarePage = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-cream font-sans text-text-main">
      <Navbar />

      {/* Official Portal Banner */}
      <div className="bg-bright-red text-white py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-sm font-medium">Official Medicare Enrollment Assistance</span>
          <a
            href={MEDICARE_GOV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-bold underline hover:text-white/90"
          >
            Visit Medicare.gov <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
        {/* Background with decorative color hues */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/5 via-transparent to-deep-blue/10 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-dots-pattern -z-10 opacity-20" />

        {/* Decorative color orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-bright-red/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-light-blue/10 rounded-full blur-2xl -z-10" />

        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 lg:w-1/2"
          >
            <span className="badge-trust border-deep-blue/20">
              <ShieldPlus size={16} className="text-bright-red" />
              Medicare Coverage for 65+
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
              Navigate <span className="text-gradient-secondary">Medicare</span> with Confidence
            </h1>

            <p className="text-xl text-text-muted max-w-lg leading-relaxed">
              Find the right Medicare plan for your healthcare needs. Our licensed specialists help you understand your options, compare plans, and maximize your benefits—at no cost to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <QuoteButton
                href={MEDICARE_QUOTE_URL}
                label="Compare Plans on Medicare.gov"
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

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-secondary">65M+</div>
                <div className="text-sm text-text-muted">Americans on Medicare</div>
              </div>
              <div className="w-px h-12 bg-silver/50" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-primary">$0</div>
                <div className="text-sm text-text-muted">Premium Plans</div>
              </div>
              <div className="w-px h-12 bg-silver/50" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-secondary">Free</div>
                <div className="text-sm text-text-muted">Expert Help</div>
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
              src="/images/medicare-hero.png"
              alt="Senior couple reviewing Medicare options"
              className="relative rounded-[2rem] lg:rounded-[3rem] shadow-premium w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
            />

            {/* Floating Badge */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -right-6 glass p-5 rounded-2xl shadow-premium border border-white/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-bright-red/10 rounded-full flex items-center justify-center">
                  <CalendarIcon size={24} className="text-bright-red" />
                </div>
                <div>
                  <div className="font-bold text-gradient-secondary">Annual Enrollment</div>
                  <div className="text-sm text-text-muted">Oct 15 to Dec 7</div>
                </div>
              </div>
            </motion.div>

            {/* Medicare.gov Badge */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="text-xs font-bold text-gray-500 mb-1">Official Partner</div>
              <div className="font-bold text-gradient-secondary">Medicare.gov</div>
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

      {/* Medicaid Dual-Eligibility Banner */}
      <section className="bg-gradient-to-r from-[#00796B]/10 to-[#4DB6AC]/10 py-6 border-b border-[#00796B]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00796B] rounded-full flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#004D40]">Limited Income? You May Qualify for Extra Help</h3>
                <p className="text-sm text-gray-600">Medicare-Medicaid dual eligibility can cover costs Medicare doesn't. We can help you apply.</p>
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
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={24} className="text-[#12890e]" />
                <h3 className="font-bold text-lg">Annual Enrollment</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-[#12890e]">Oct 15 to Dec 7</p>
              <p className="text-sm text-text-muted">Change your Medicare Advantage or Part D plan. Coverage starts January 1.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <CalendarIcon size={24} className="text-deep-blue" />
                <h3 className="font-bold text-lg">Initial Enrollment</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-gradient-secondary">7-Month Window</p>
              <p className="text-sm text-text-muted">3 months before to 3 months after your 65th birthday month.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={24} className="text-deep-blue" />
                <h3 className="font-bold text-lg">MA Open Enrollment</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-gradient-secondary">Jan 1 - Mar 31</p>
              <p className="text-sm text-text-muted">Switch MA plans or return to Original Medicare + Part D.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Medicare Parts Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-trust mb-4">Understanding Medicare</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              The <span className="text-gradient-secondary">Four Parts</span> of Medicare
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Medicare has different parts that cover different services. Understanding each part helps you choose the right coverage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicareParts.map((part, i) => (
              <motion.div
                key={part.part}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-8 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${part.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <part.icon size={28} className="text-white" />
                </div>
                <div className="text-sm font-bold text-[#12890e] mb-1">{part.part}</div>
                <h3 className="text-xl font-bold mb-3">{part.name}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">{part.description}</p>
                <div className="text-xs text-[#12890e] font-medium bg-[#12890e]/10 px-3 py-2 rounded-lg">
                  {part.premium}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Glow Effects */}
        <div className="bg-glow-orb-blue -top-[10%] -left-[10%] w-[500px] h-[500px]" />
        <div className="bg-glow-orb-red bottom-0 -right-[10%] w-[600px] h-[600px] opacity-30" />
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-trust mb-4">Compare Options</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              Original Medicare vs <span className="text-gradient-primary">Medicare Advantage</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Both options provide comprehensive healthcare coverage. The right choice depends on your individual needs and preferences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-premium overflow-hidden"
          >
            <div className="grid grid-cols-3 bg-deep-blue text-white font-bold">
              <div className="p-4 text-left">Feature</div>
              <div className="p-4 text-center border-l border-white/20">Original Medicare</div>
              <div className="p-4 text-center border-l border-white/20">Medicare Advantage</div>
            </div>
            {comparisonData.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="p-4 font-medium text-sm">{row.feature}</div>
                <div className="p-4 text-center border-l border-gray-100">
                  {row.original ? (
                    <CheckCircle size={20} className="text-green-500 mx-auto" />
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </div>
                <div className="p-4 text-center border-l border-gray-100">
                  {row.advantage ? (
                    <CheckCircle size={20} className="text-green-500 mx-auto" />
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="text-center mt-8 space-y-4">
            <QuoteButton
              href={MEDICARE_QUOTE_URL}
              label="Compare Plans on Medicare.gov"
              variant="secondary"
              size="large"
            />
            <p className="text-sm text-text-muted">
              You'll be directed to the official Medicare.gov Plan Finder to view plans in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Medicare Advantage Benefits */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-trust mb-4">Extra Benefits</span>
              <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                Medicare Advantage <span className="text-gradient-primary">Bonus Benefits</span>
              </h2>
              <p className="text-text-muted text-lg mb-8">
                Many Medicare Advantage plans include benefits not covered by Original Medicare, often at no additional premium.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {additionalBenefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-light-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon size={24} className="text-deep-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{benefit.title}</h4>
                      <p className="text-text-muted text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/senior-couple-walking.png"
                alt="Active seniors enjoying retirement with Medicare coverage"
                className="rounded-3xl shadow-premium w-full h-[450px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-cream relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 mix-blend-multiply" />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-trust mb-4">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              How We <span className="text-gradient-secondary">Help You Enroll</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Our licensed Medicare specialists guide you through every step—completely free of charge.
            </p>
          </motion.div>
          <ProcessTimelineCompact product="medicare" />
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
                Medicare Experts, <span className="text-gradient-secondary">Zero Cost</span>
              </h2>
              <p className="text-text-muted text-lg mb-8">
                Medicare can be confusing with all its parts and options. Our licensed agents specialize in Medicare and make it simple to understand your choices.
              </p>
              <WhyChooseUsCompact />

              {/* Transparency Notice */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-sm mb-2">How We're Compensated</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Our services are free to you. We receive a commission from insurance companies when you enroll through us.
                  This doesn't affect your premium—you pay the same rate as going direct to Medicare.gov.
                  We work with multiple carriers to find you the best coverage, not just the highest commission.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/agent-meeting-seniors.png"
                alt="Insurance agent helping senior with Medicare options"
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
              Medicare <span className="text-gradient-secondary">Questions Answered</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Get answers to the most common questions about Medicare coverage and enrollment.
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
                        <ChevronDown className={`transition-transform duration-300 text-deep-blue flex-shrink-0 ${openFaq === actualIndex ? 'rotate-180' : ''}`} />
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

          {/* Official Medicare.gov Button */}
          <div className="mt-12 bg-[#12890e]/5 rounded-2xl p-8 border border-[#12890e]/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Need More Information?</h4>
                <p className="text-gray-500">Visit the official Medicare.gov website for additional resources, plan comparisons, and enrollment assistance.</p>
              </div>
              <a
                href="https://www.medicare.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#12890e] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0d6b0a] transition-colors shadow-lg whitespace-nowrap"
              >
                <ExternalLink size={18} />
                Visit Medicare.gov
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection filter="medicare" />

      {/* CTA Banner */}
      <section className="py-16 bg-deep-blue relative overflow-hidden">
        {/* Gradient overlays to match other CTA ribbons */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-transparent to-light-blue opacity-80" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bright-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">Ready to Explore Your Options?</h3>
              <p className="text-white/80">Compare Medicare plans and find coverage that fits your needs and budget.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <QuoteButton
                href={MEDICARE_QUOTE_URL}
                label="Compare Plans Now"
                variant="primary"
                size="large"
              />
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
                Need Help with <span className="text-gradient-primary">Medicare</span>?
              </h2>
              <p className="text-text-muted text-lg mb-8">
                Confused about Medicare options? Our licensed agents specialize in helping seniors find the right coverage. Get personalized guidance at no cost to you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CalendarIcon size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Enrollment Periods</h4>
                    <p className="text-text-muted text-sm">We'll help you understand when you can enroll and make changes to your coverage.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-bright-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldIcon size={24} className="text-bright-red" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Plan Comparison</h4>
                    <p className="text-text-muted text-sm">Compare Medicare Advantage, Medigap, and Part D plans side by side.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PhoneIcon size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Free Consultation</h4>
                    <p className="text-text-muted text-sm">No pressure, no obligation. Just helpful guidance from Medicare experts.</p>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="mt-8 p-6 bg-[#12890e]/5 rounded-xl border border-[#12890e]/20">
                <h4 className="font-bold mb-4 text-gray-800">Official Government Resources</h4>
                <div className="space-y-3">
                  <a
                    href="https://www.medicare.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#12890e] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#12890e] rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#12890e]">Medicare.gov</div>
                      <div className="text-xs text-gray-500">Official Medicare Website</div>
                    </div>
                  </a>
                  <a
                    href="https://www.medicare.gov/plan-compare/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#12890e] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#12890e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#12890e]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#12890e]">Medicare Plan Finder</div>
                      <div className="text-xs text-gray-500">Compare plans in your area</div>
                    </div>
                  </a>
                  <a
                    href="https://www.medicare.gov/basics/get-started-with-medicare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#12890e] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#12890e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#12890e]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#12890e]">Getting Started with Medicare</div>
                      <div className="text-xs text-gray-500">Beginner's guide to Medicare</div>
                    </div>
                  </a>
                  <a
                    href="https://www.ssa.gov/benefits/medicare/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#12890e] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#12890e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#12890e]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#12890e]">Social Security Medicare Info</div>
                      <div className="text-xs text-gray-500">SSA enrollment information</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            <ContactForm
              productType="medicare"
              title="Request Medicare Guidance"
              subtitle="Fill out the form and a Medicare specialist will contact you within 24 hours."
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Sticky Mobile Quote Button */}
      <StickyQuoteButton href={MEDICARE_QUOTE_URL} label="Compare Medicare Plans" />
    </div>
  );
};
