import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, HelpCircle, CheckCircle, Users, Heart, FileText, Phone, ExternalLink } from 'lucide-react';
import { Navbar, Footer } from '../components/Layout';
import { Link } from 'react-router-dom';
import { TestimonialsSection } from '../components/TestimonialCard';

// Official Medicaid portal URLs
const FLORIDA_MEDICAID_URL = "https://ahca.myflorida.com/medicaid";
const ACCESS_FLORIDA_URL = "https://www.myflorida.com/accessflorida/";
const MEDICAID_GOV_URL = "https://www.medicaid.gov/";

// Medicaid brand colors (removed as we unified to Javi's Insurance brand colors)

const eligibilityGroups = [
  {
    title: "Low Income Adults",
    description: "Adults ages 19-64 with limited income may qualify for Medicaid coverage.",
    icon: Users
  },
  {
    title: "Children & Families",
    description: "CHIP and Medicaid provide comprehensive coverage for children and pregnant women.",
    icon: Heart
  },
  {
    title: "Seniors & Disabled",
    description: "Medicare recipients with limited income may qualify for dual-eligible programs.",
    icon: Users
  },
  {
    title: "Special Categories",
    description: "Refugees, former foster care youth, and breast/cervical cancer patients may qualify.",
    icon: FileText
  }
];

const benefits = [
  "Doctor visits and preventive care",
  "Hospital services",
  "Prescription medications",
  "Mental health services",
  "Maternity and newborn care",
  "Lab tests and X-rays",
  "Pediatric services",
  "Vision and dental (varies by state)"
];

// Expanded FAQs with comprehensive Medicaid information
const faqs = [
  {
    q: "What is Medicaid?",
    a: "Medicaid is a joint federal and state program that provides free or low-cost health coverage to over 85 million Americans. It covers eligible low-income adults, children, pregnant women, elderly adults, and people with disabilities. Each state runs its own Medicaid program within federal guidelines, so benefits and eligibility can vary by state."
  },
  {
    q: "How do I know if I qualify for Medicaid?",
    a: "Eligibility depends on your household income, family size, age, disability status, citizenship/immigration status, and your state's specific rules. In Florida, you may qualify if you're a child, pregnant woman, parent/caretaker of a child, elderly (65+), or have a disability and meet income requirements. Income limits vary by category, for example, children may qualify with household income up to 200% of the federal poverty level."
  },
  {
    q: "What's the difference between Medicaid and Medicare?",
    a: "Medicare is a federal program primarily for people 65+ or those with certain disabilities, regardless of income. Medicaid is for people with limited income, regardless of age. You can qualify for both (called 'dual eligibility'), which provides comprehensive coverage and help with Medicare costs. Our agents can help determine if you qualify for dual benefits."
  },
  {
    q: "What's the difference between Medicaid and Obamacare (ACA)?",
    a: "The ACA Marketplace offers subsidized private insurance for those with income above Medicaid limits (generally 138% FPL in expansion states). Medicaid provides free or very low-cost coverage for those with the lowest incomes. When you apply on HealthCare.gov, you're automatically screened for Medicaid eligibility. We help you understand which program is right for you based on your income and circumstances."
  },
  {
    q: "What does Florida Medicaid cover?",
    a: "Florida Medicaid covers a comprehensive range of services including: doctor visits, hospital care, prescription drugs, lab tests, X-rays, mental health services, substance abuse treatment, maternity care, well-child visits and immunizations, home health care, nursing facility care, and transportation to medical appointments. Some services may require prior authorization."
  },
  {
    q: "How do I apply for Medicaid in Florida?",
    a: "You can apply through ACCESS Florida (myflorida.com/accessflorida), by phone at 1-866-762-2237, in person at a Department of Children and Families (DCF) office, or by mail. You'll need to provide documentation including proof of identity, income, residency, and citizenship/immigration status. Our agents can help guide you through the application process and ensure you have all required documents."
  },
  {
    q: "How long does the Medicaid application process take?",
    a: "Florida must process applications within 45 days (90 days for disability-based eligibility). Processing time depends on how complete your application is and whether additional documentation is needed. We help expedite your application by ensuring all required documentation is complete and accurate from the start."
  },
  {
    q: "What is CHIP (Children's Health Insurance Program)?",
    a: "CHIP provides low-cost health coverage for children in families with income too high for Medicaid but who can't afford private insurance. In Florida, this is called Florida KidCare and includes MediKids, Florida Healthy Kids, and Children's Medical Services. Premiums are based on family size and income, with many families paying $15-$20/month or less."
  },
  {
    q: "Can I get Medicaid if I'm working?",
    a: "Yes! Having a job doesn't disqualify you from Medicaid. Eligibility is based on your household income level, not employment status. Many working families qualify for Medicaid, especially those with children. Florida also has programs to help people transition from Medicaid to employer coverage without losing benefits."
  },
  {
    q: "How does Javi's Insurance help with Medicaid?",
    a: "We provide free, confidential assistance with both new Medicaid applications and renewals. Our licensed agents help you understand eligibility requirements, gather required documentation, complete applications or renewal paperwork accurately, follow up on pending cases, and connect you with other programs you may qualify for (like SNAP or TANF). Whether you're applying for the first time or renewing your existing coverage, our service costs you nothing—we're here to help you get and keep the coverage you need."
  }
];

export const MedicaidPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    zipCode: '',
    householdSize: '',
    monthlyIncome: '',
    currentlyInsured: '',
    interestedIn: '',
    consent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (name === 'phone') {
      // Format phone number
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      if (cleaned.length >= 6) {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      } else if (cleaned.length >= 3) {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      }
      setFormData(prev => ({ ...prev, phone: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Medicaid form submitted:', formData);
    alert('Thank you! A licensed agent will contact you within 24 hours to assist with your Medicaid application or renewal.');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-text-main">
      <Navbar />

      {/* Official Portal Banner */}
      <div className="bg-bright-red text-white py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-sm font-medium">Official Medicaid Enrollment Assistance</span>
          <a
            href={FLORIDA_MEDICAID_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-bold underline hover:text-white/90"
          >
            Visit Florida Medicaid <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
        {/* Background with decorative color hues */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/5 via-transparent to-deep-blue/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-dots-pattern -z-10 opacity-20" />

        {/* Decorative color orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-bright-red/5 rounded-full blur-2xl -z-10" />

        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 lg:w-1/2"
          >
            <span className="badge-trust border-deep-blue">
              <Heart size={16} className="text-deep-blue" />
              Free Enrollment Assistance
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
              <span className="text-gradient-secondary">Medicaid</span> Assistance
            </h1>

            <p className="text-xl text-text-muted max-w-lg leading-relaxed">
              We help you apply for and renew your Medicaid coverage. Free, confidential assistance from licensed agents who understand the system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#apply"
                className="bg-deep-blue text-white px-8 py-4 rounded-full font-bold hover:bg-deep-blue/90 transition-colors shadow-lg text-center"
              >
                Check Your Eligibility
              </a>
              <a
                href="tel:310-437-2766"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                (310) 437-2766
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-secondary">85M+</div>
                <div className="text-sm text-text-muted">Americans Covered</div>
              </div>
              <div className="w-px h-12 bg-silver/50" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-primary">$0</div>
                <div className="text-sm text-text-muted">Our Service Fee</div>
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
              src="/images/medicaid-hero.png"
              alt="Family receiving healthcare assistance"
              className="relative rounded-[2rem] lg:rounded-[3rem] shadow-premium w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
            />

            {/* Floating badge */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-deep-blue/10">
                  <CheckCircle size={24} className="text-deep-blue" />
                </div>
                <div>
                  <div className="font-bold text-gradient-secondary">Free Assistance</div>
                  <div className="text-sm text-gray-500">No Cost to You</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Programs Banner */}
      <section className="bg-gray-50 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
            <span className="text-gray-500 font-medium">Also looking for:</span>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/obamacare"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold hover:border-bright-red hover:text-bright-red transition-colors"
              >
                <Heart size={16} />
                Obamacare / ACA Plans
              </Link>
              <Link
                to="/medicare"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold hover:border-deep-blue hover:text-deep-blue transition-colors"
              >
                <Users size={16} />
                Medicare (65+)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who Qualifies Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 mb-6 bg-deep-blue/5">
              <span className="w-2 h-2 rounded-full bg-deep-blue" />
              <span className="text-sm font-bold uppercase tracking-wider text-gradient-secondary">Eligibility</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Who Qualifies for <span className="text-gradient-primary">Medicaid</span>?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Medicaid eligibility varies by state, but generally covers these groups based on income and other factors.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eligibilityGroups.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 bg-light-blue/20">
                  <group.icon size={28} className="text-deep-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{group.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{group.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                What Does <span className="text-gradient-secondary">Medicaid Cover</span>?
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Medicaid provides comprehensive health coverage, including many services that other insurance may not cover. Benefits vary by state but typically include:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={20} className="flex-shrink-0 text-bright-red" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/family-living-room.png"
                alt="Family discussing healthcare options"
                className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              How We <span className="text-gradient-secondary">Help You</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Our licensed agents guide you through every step of the Medicaid application or renewal process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Check Eligibility", desc: "Quick assessment of your situation" },
              { step: "02", title: "Gather Documents", desc: "We tell you exactly what's needed" },
              { step: "03", title: "Submit Application", desc: "We guide you through the process" },
              { step: "04", title: "Get Covered", desc: "Ongoing support after approval" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl bg-bright-red">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-cream relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Medicaid <span className="text-gradient-secondary">FAQ</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Find answers to your questions about Medicaid eligibility and benefits.
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
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === actualIndex ? -1 : actualIndex)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 flex-shrink-0 text-bright-red" />
                          <span className="font-bold text-gray-800 pr-4">{faq.q}</span>
                        </div>
                        <ChevronDown
                          className={`transition-transform duration-300 flex-shrink-0 text-deep-blue ${openFaq === actualIndex ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === actualIndex ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-gray-500 leading-relaxed pl-8">{faq.a}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Official Medicaid.gov Button */}
          <div className="mt-12 bg-[#00796B]/5 rounded-2xl p-8 border border-[#00796B]/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Need More Information?</h4>
                <p className="text-gray-500">Visit official government websites for additional Medicaid resources and to apply directly online.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={FLORIDA_MEDICAID_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#00796B] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#004D40] transition-colors shadow-lg whitespace-nowrap"
                >
                  <ExternalLink size={18} />
                  Florida Medicaid
                </a>
                <a
                  href={MEDICAID_GOV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#00796B] border-2 border-[#00796B] px-6 py-4 rounded-xl font-bold hover:bg-[#00796B]/10 transition-colors whitespace-nowrap"
                >
                  <ExternalLink size={18} />
                  Medicaid.gov
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection filter="all" />

      {/* Application Form Section */}
      <section id="apply" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 mb-6 bg-light-blue/10">
                <span className="w-2 h-2 rounded-full bg-deep-blue" />
                <span className="text-sm font-bold uppercase tracking-wider text-gradient-secondary">Free Assistance</span>
              </div>

              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Get Help with Your <span className="text-gradient-primary">Medicaid Application or Renewal</span>
              </h2>

              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Our licensed agents provide free, confidential assistance with new Medicaid applications and renewals. We'll help you understand your eligibility and guide you through every step.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-light-blue/20">
                    <CheckCircle size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800">100% Free Service</h4>
                    <p className="text-gray-500 text-sm">We never charge for our assistance. Our goal is to help you get covered.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-light-blue/20">
                    <Users size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800">Licensed Agents</h4>
                    <p className="text-gray-500 text-sm">Our team is trained and certified to assist with Medicaid enrollment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-light-blue/20">
                    <FileText size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800">Confidential</h4>
                    <p className="text-gray-500 text-sm">Your information is secure and only used to help with your application.</p>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="mt-8 p-6 bg-[#00796B]/5 rounded-xl border border-[#00796B]/20">
                <h4 className="font-bold mb-4 text-gray-800">Official Government Resources</h4>
                <div className="space-y-3">
                  <a
                    href={FLORIDA_MEDICAID_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#00796B] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#00796B] rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#00796B]">Florida Medicaid</div>
                      <div className="text-xs text-gray-500">Official State Program</div>
                    </div>
                  </a>
                  <a
                    href={ACCESS_FLORIDA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#00796B] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#00796B]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#00796B]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#00796B]">ACCESS Florida</div>
                      <div className="text-xs text-gray-500">Apply for benefits online</div>
                    </div>
                  </a>
                  <a
                    href={MEDICAID_GOV_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#00796B] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#00796B]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#00796B]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#00796B]">Medicaid.gov</div>
                      <div className="text-xs text-gray-500">Federal Medicaid information</div>
                    </div>
                  </a>
                  <a
                    href="https://www.floridakidcare.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-[#00796B] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#00796B]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={18} className="text-[#00796B]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-[#00796B]">Florida KidCare</div>
                      <div className="text-xs text-gray-500">Children's health coverage</div>
                    </div>
                  </a>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">
                    Need immediate help? Call Florida Medicaid at <a href="tel:1-877-711-3662" className="text-[#00796B] font-bold hover:underline">1-877-711-3662</a> or ACCESS Florida at <a href="tel:1-866-762-2237" className="text-[#00796B] font-bold hover:underline">1-866-762-2237</a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Request Assistance</h3>
              <p className="text-gray-500 text-sm mb-6">Fill out the form and we'll contact you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-deep-blue/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(555) 555-5555"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      maxLength={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Household Size *</label>
                    <select
                      name="householdSize"
                      value={formData.householdSize}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                    >
                      <option value="">Select...</option>
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5">5 people</option>
                      <option value="6+">6+ people</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Estimated Monthly Household Income</label>
                  <select
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  >
                    <option value="">Select range...</option>
                    <option value="under-1500">Under $1,500</option>
                    <option value="1500-2500">$1,500 - $2,500</option>
                    <option value="2500-3500">$2,500 - $3,500</option>
                    <option value="3500-4500">$3,500 - $4,500</option>
                    <option value="over-4500">Over $4,500</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Currently Insured?</label>
                  <select
                    name="currentlyInsured"
                    value={formData.currentlyInsured}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="no">No, I'm uninsured</option>
                    <option value="yes-employer">Yes, through employer</option>
                    <option value="yes-marketplace">Yes, through Marketplace/ACA</option>
                    <option value="yes-medicare">Yes, Medicare</option>
                    <option value="yes-other">Yes, other coverage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">What are you interested in?</label>
                  <select
                    name="interestedIn"
                    value={formData.interestedIn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="medicaid">New Medicaid application</option>
                    <option value="renewal">Medicaid renewal assistance</option>
                    <option value="chip">CHIP (Children's Health Insurance)</option>
                    <option value="eligibility">Check my eligibility</option>
                    <option value="dual">Medicare-Medicaid dual coverage</option>
                    <option value="other">Other assistance</option>
                  </select>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="consent"
                      id="medicaid-consent-checkbox"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-deep-blue focus:ring-deep-blue/20 cursor-pointer flex-shrink-0"
                    />
                    <label htmlFor="medicaid-consent-checkbox" className="text-sm text-gray-500 leading-relaxed cursor-pointer">
                      <span className="font-semibold text-gray-700">I agree to be contacted</span> by a licensed insurance agent from Javi's Insurance Services via phone, email, or text message regarding my Medicaid inquiry. I understand that:
                      <ul className="mt-2 space-y-1 list-disc list-inside text-xs">
                        <li>Communications are personalized and never sent as bulk/blast messages</li>
                        <li>I can opt-out of communications at any time by replying STOP or contacting us</li>
                        <li>My information is protected and will never be sold to third parties</li>
                        <li>Message and data rates may apply for text messages</li>
                      </ul>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 shadow-lg bg-bright-red"
                >
                  Request Free Assistance
                </button>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">🔒 256 bit SSL</span>
                    <span>•</span>
                    <span>🛡️ HIPAA Compliant</span>
                    <span>•</span>
                    <span>✓ A2P Verified</span>
                  </div>
                  <p className="text-xs text-gray-400 text-center">
                    We are A2P-verified for text messaging and email. Your information is secure and encrypted. Reply STOP at any time to opt-out.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-deep-blue relative overflow-hidden">
        {/* Gradient overlays to match other CTA ribbons */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-transparent to-light-blue opacity-80" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bright-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">Need Help Today?</h3>
              <p className="text-white/90">Speak with a licensed agent now. We're here to help you get covered.</p>
            </div>
            <a
              href="tel:310-437-2766"
              className="bg-white text-deep-blue px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Phone size={20} />
              Call (310) 437-2766
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
