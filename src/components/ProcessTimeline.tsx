import { motion } from 'motion/react';
import { PhoneIcon, ShieldIcon } from './BrandIcons';
import { FileCheck, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../i18n';

export const ProcessTimeline = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t.process.step1Title,
      description: t.process.step1Desc,
      icon: PhoneIcon,
      color: "bg-deep-blue"
    },
    {
      number: "02",
      title: t.process.step2Title,
      description: t.process.step2Desc,
      icon: ShieldIcon,
      color: "bg-light-blue"
    },
    {
      number: "03",
      title: t.process.step3Title,
      description: t.process.step3Desc,
      icon: FileCheck,
      color: "bg-bright-red"
    },
    {
      number: "04",
      title: t.process.step4Title,
      description: t.process.step4Desc,
      icon: HeartHandshake,
      color: "bg-deep-blue"
    }
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Soft Decorative Glow */}
      <div className="bg-glow-orb-blue top-[10%] left-[-5%] w-[600px] h-[600px] blur-3xl opacity-30 z-[0]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-trust mb-4">{t.process.simpleProcess}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
            {t.process.howWeHelpYou} <span className="text-gradient-secondary">{t.process.helpYou}</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {t.process.processDesc}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-deep-blue/20 to-transparent rounded-[2rem] transform -rotate-1" />
            <img
              src="/images/agent-meeting-seniors.png"
              alt="Insurance agent helping clients"
              className="relative rounded-[2rem] shadow-premium w-full h-[500px] object-cover"
            />
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-bright-red/10 rounded-full flex items-center justify-center">
                  <HeartHandshake className="text-bright-red" size={24} />
                </div>
                <div>
                  <div className="font-bold text-gradient-secondary">{t.process.dedicatedAgent}</div>
                  <div className="text-sm text-text-muted">{t.process.fromStartToFinish}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Timeline Steps */}
          <div className="order-1 lg:order-2 space-y-8 relative">
            {/* Connecting Line */}
            <div className="absolute left-[2.25rem] top-8 bottom-8 w-0.5 bg-gray-100 hidden sm:block" />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-0 sm:pl-20 group"
              >
                {/* Timeline Badge (Desktop) */}
                <div className={`hidden sm:flex absolute left-0 top-1 w-11 h-11 ${step.color} rounded-full items-center justify-center text-white font-bold text-sm shadow-md ring-4 ring-white z-10 transition-transform group-hover:scale-110`}>
                  {step.number}
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-deep-blue/20 hover:shadow-card transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    {/* Mobile Badge */}
                    <div className={`sm:hidden w-10 h-10 flex-shrink-0 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                      {step.number}
                    </div>
                    <div className="w-12 h-12 bg-deep-blue/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-deep-blue/10 transition-colors hidden sm:flex">
                      <step.icon size={24} className="text-deep-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-text-main">{step.title}</h3>
                      <p className="text-text-muted leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="tel:310-437-2766"
            className="btn-primary inline-flex items-center gap-2"
          >
            <PhoneIcon size={20} className="text-white" />
            {t.process.startFreeConsultation}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Compact version for product pages
export const ProcessTimelineCompact = ({ product }: { product: 'obamacare' | 'medicare' | 'health' | 'auto' | 'commercial' | 'home' }) => {
  const stepsMap: Record<string, { title: string; desc: string }[]> = {
    obamacare: [
      { title: "Check Eligibility", desc: "Quick income verification" },
      { title: "Compare Plans", desc: "Bronze, Silver, Gold, Platinum" },
      { title: "Apply Together", desc: "We guide you step-by-step" },
      { title: "Get Covered", desc: "Protection starts on approval" }
    ],
    medicare: [
      { title: "Review Options", desc: "Original vs Advantage" },
      { title: "Compare Benefits", desc: "Vision, dental, prescriptions" },
      { title: "Enroll Easily", desc: "We handle the paperwork" },
      { title: "Ongoing Support", desc: "Help with claims anytime" }
    ],
    health: [
      { title: "Review Needs", desc: "Assess family coverage needs" },
      { title: "Compare Networks", desc: "HMO, PPO, EPO options" },
      { title: "Enroll Easily", desc: "We handle the paperwork" },
      { title: "Get Covered", desc: "Protection starts immediately" }
    ],
    auto: [
      { title: "Provide Details", desc: "Vehicle & driver info" },
      { title: "Compare Quotes", desc: "Rates from top carriers" },
      { title: "Select Policy", desc: "Choose optimal deductibles" },
      { title: "Drive Safely", desc: "Instant proof of insurance" }
    ],
    commercial: [
      { title: "Business Review", desc: "Assess risk & liability" },
      { title: "Custom Policy", desc: "Tailored commercial coverage" },
      { title: "Compare Rates", desc: "Multiple carrier quotes" },
      { title: "Secure Business", desc: "Instant certification" }
    ],
    home: [
      { title: "Property Details", desc: "Provide basic home info" },
      { title: "Compare Options", desc: "Review top carrier rates" },
      { title: "Select Coverage", desc: "Customize your protection" },
      { title: "Secure Home", desc: "Instant policy issuance" }
    ]
  };

  const productSteps = stepsMap[product] || stepsMap.obamacare;

  return (
    <div className="bg-deep-blue/5 rounded-2xl p-8">
      <h3 className="text-xl font-bold mb-6 text-center">Your Path to Coverage</h3>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {productSteps.map((step, i) => (
          <div key={i} className="flex items-center gap-4 flex-1">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-deep-blue text-white rounded-full flex items-center justify-center font-bold">
                {i + 1}
              </div>
              {i < productSteps.length - 1 && (
                <div className="w-0.5 h-8 bg-deep-blue/20 md:hidden" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">{step.title}</h4>
              <p className="text-xs text-text-muted">{step.desc}</p>
            </div>
            {i < productSteps.length - 1 && (
              <div className="hidden md:block w-8 h-0.5 bg-deep-blue/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
