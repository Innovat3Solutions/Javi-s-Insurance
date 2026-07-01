import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ArrowRight, Shield, ChevronDown, Phone, Plus, HelpCircle, Home, Car, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Navbar, Footer } from './components/Layout';
import { ContactForm } from './components/ContactForm';
import { QuoteButton } from './components/QuoteButton';
import { TrustBadges, TrustBar } from './components/TrustBadges';
import { ProcessTimeline } from './components/ProcessTimeline';
import { TestimonialsSection } from './components/TestimonialCard';
import { ScrollToTop } from './components/ScrollToTop';
import { WhyChooseUsSection, CompanyStats } from './components/AboutSection';
import { ShieldPlus, HeartIcon, FamilyIcon, PhoneIcon, CheckIcon } from './components/BrandIcons';
import { ObamacarePage } from './pages/Obamacare';
import { MedicarePage } from './pages/Medicare';
import { HomeInsurancePage } from './pages/HomeInsurance';
import { AutoInsurancePage } from './pages/AutoInsurance';
import { CommercialInsurancePage } from './pages/CommercialInsurance';
import { MedicaidPage } from './pages/Medicaid';
import { BecomeAgentPage } from './pages/BecomeAgent';
import { DentalVisionPage } from './pages/DentalVision';
import { GetCoveredPage } from './pages/GetCovered';
import { PrivacyPolicyPage } from './pages/PrivacyPolicy';
import { TermsOfServicePage } from './pages/TermsOfService';
import { WhatsAppFloat } from './components/WhatsAppButton';
import { LanguageProvider, useLanguage } from './i18n';

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Home Page Components

const Hero = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();

  const products = [
    { icon: HeartIcon, label: 'Health', color: 'bg-deep-blue', image: '/images/hero-health.png' },
    { icon: FamilyIcon, label: 'Medicare', color: 'bg-light-blue', image: '/images/hero-medicare.png' },
    { icon: Shield, label: 'Life', color: 'bg-silver', image: '/images/hero-life.png' },
    { icon: ShieldPlus, label: 'More', color: 'bg-silver', image: '/images/hero-more.png' }
  ];

  const productInfo = [
    {
      title: t.products.healthTitle,
      titleLines: t.products.healthTitleLines,
      description: t.products.healthDesc,
      link: '/obamacare'
    },
    {
      title: t.products.medicareTitle,
      titleLines: t.products.medicareTitleLines,
      description: t.products.medicareDesc,
      link: '/medicare'
    },
    {
      title: t.products.lifeTitle,
      titleLines: t.products.lifeTitleLines,
      description: t.products.lifeDesc,
      link: '/'
    },
    {
      title: t.products.autoCommercialTitle,
      titleLines: t.products.autoCommercialTitleLines,
      description: t.products.autoCommercialDesc,
      link: '/'
    }
  ];

  // Auto-rotate products every 4 seconds
  useEffect(() => {
    if (!isPaused) {
      autoRotateTimer.current = setInterval(() => {
        setSelectedProduct((prev: number) => (prev + 1) % products.length);
      }, 4000);
    }

    return () => {
      if (autoRotateTimer.current) {
        clearInterval(autoRotateTimer.current);
      }
    };
  }, [isPaused, products.length]);

  // Handle manual product selection - pause for 10 seconds then resume
  const handleProductClick = (index: number) => {
    setSelectedProduct(index);
    setIsPaused(true);

    // Clear any existing pause timeout
    if (pauseTimeout.current) {
      clearTimeout(pauseTimeout.current);
    }

    // Resume auto-rotation after 10 seconds of inactivity
    pauseTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  // Cleanup pause timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeout.current) {
        clearTimeout(pauseTimeout.current);
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Main Hero Content - 3 Column Layout */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12 lg:pt-16">

        {/* Top Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 md:mb-6 relative z-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-main leading-tight">
            {t.hero.compareAffordable}
            <br />
            {t.hero.insurance}{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-white px-6 py-1">{t.hero.quotes}</span>
              <span className="absolute inset-0 bg-bright-red rounded-lg transform -rotate-1" />
            </span>
          </h1>
        </motion.div>

        {/* Three Column Layout: Selector | Image | Info */}
        <div className="relative flex flex-col lg:flex-row items-stretch justify-between gap-2 lg:gap-0 pb-0 lg:pb-0 lg:-mt-2">

          {/* Decorative Arrow - Above Image, Between Selector and Info */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 hidden lg:block z-30 pointer-events-none" style={{ width: '300px' }}>
            <svg width="300" height="80" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
              <path d="M30 60 C 50 15, 140 5, 250 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8" fill="none" />
              <path d="M242 18 L 258 32 L 238 36 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Left Side - Product Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-[180px] flex flex-col items-center lg:items-start order-1 lg:order-1 mb-2 lg:mb-0 lg:pt-8"
          >
            <p className="text-text-muted text-sm md:text-base mb-3 lg:mb-4 font-medium text-center lg:text-left">
              {t.hero.selectProduct}
            </p>
            <div className="flex flex-row justify-center lg:flex-wrap lg:justify-start gap-2 lg:gap-3">
              {products.map((product, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleProductClick(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all shadow-sm
                    ${selectedProduct === i ? 'bg-deep-blue text-white shadow-md' : 'bg-[#e5e7eb] text-text-muted hover:bg-gray-300'}
                  `}
                >
                  <product.icon size={18} className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Center - Dynamic Images (Overlapping blue stats box) */}
          <div className="relative flex-1 flex items-end justify-center order-3 lg:order-2 z-20 lg:-mx-8 lg:-mt-20 -mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProduct}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-[320px] sm:h-[350px] md:h-[500px] lg:h-[540px] max-w-[350px] sm:max-w-[400px] md:max-w-[580px] mx-auto flex items-end justify-center"
              >
                <img
                  src={products[selectedProduct].image}
                  alt={`${productInfo[selectedProduct].title} representative`}
                  className="absolute inset-x-0 bottom-0 w-full h-full object-contain object-bottom drop-shadow-xl lg:drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-[280px] xl:w-[320px] flex flex-col items-center lg:items-start justify-start order-2 lg:order-3 text-center lg:text-left lg:pt-4 lg:pr-0 lg:pl-4 mb-0 lg:mb-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProduct}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full flex flex-col items-center lg:items-start"
              >
                <h2 className="text-xl sm:text-2xl lg:text-[2rem] xl:text-[2.25rem] font-extrabold text-[#374151] mb-2 sm:mb-3 lg:mb-4 leading-[1.1]">
                  {productInfo[selectedProduct].titleLines.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h2>
                <p className="text-gray-500 mb-4 sm:mb-5 lg:mb-6 text-sm leading-relaxed max-w-xs px-4 lg:px-0">
                  {productInfo[selectedProduct].description}
                </p>
                <Link
                  to={productInfo[selectedProduct].link}
                  className="inline-flex items-center justify-center bg-bright-red hover:bg-bright-red/90 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold transition-colors shadow-md text-sm whitespace-nowrap"
                >
                  {t.hero.getStarted}
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Stats Card - Image overlaps just the top edge */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 -mt-6 sm:-mt-8 md:-mt-12 lg:-mt-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative bg-deep-blue rounded-[2rem] py-10 px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden"
          style={{ boxShadow: '0 25px 60px -12px rgba(26, 69, 157, 0.4), 0 12px 30px -8px rgba(0, 0, 0, 0.2)' }}
        >
          {/* Subtle Background Graphics */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large subtle circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/[0.04] rounded-full" />
            <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-white/[0.03] rounded-full" />
            <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-light-blue/10 rounded-full blur-2xl" />

            {/* Subtle grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="statsGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 20 L40 20 M20 0 L20 40" stroke="white" strokeWidth="0.5" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#statsGrid)" />
            </svg>

            {/* Small accent dots */}
            <div className="absolute top-6 left-1/4 w-2 h-2 bg-[#FBBF24]/25 rounded-full" />
            <div className="absolute bottom-8 right-1/3 w-3 h-3 bg-white/10 rounded-full" />
            <div className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-[#FBBF24]/20 rounded-full" />
          </div>

          <div className="relative z-10 w-full lg:w-1/3 text-white text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {t.hero.easyAndSupporting}
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              {t.hero.heroDescription}
            </p>
          </div>

          <div className="relative z-10 w-full lg:w-2/3 grid grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
                <span className="text-white">30M</span>
                <span className="bg-gradient-to-r from-bright-red to-[#FF6B6B] bg-clip-text text-transparent">+</span>
              </div>
              <p className="text-white/80 text-xs sm:text-sm font-medium">{t.hero.shoppersServed}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
                <span className="text-white">$90</span>
                <span className="bg-gradient-to-r from-bright-red to-[#FF6B6B] bg-clip-text text-transparent">B</span>
              </div>
              <p className="text-white/80 text-xs sm:text-sm font-medium">{t.hero.lifeInsuranceSold}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
                <span className="text-white">24/</span>
                <span className="bg-gradient-to-r from-bright-red to-[#FF6B6B] bg-clip-text text-transparent">7</span>
              </div>
              <p className="text-white/80 text-xs sm:text-sm font-medium">{t.hero.helpFromExperts}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProductsSection = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const { t } = useLanguage();

  const products = [
    {
      title: t.productCards.obamacare,
      subtitle: t.productCards.obamacareSubtitle,
      description: t.productCards.obamacareDesc,
      icon: HeartIcon,
      image: "/images/obamacare-hero.png",
      link: "/obamacare",
      quoteUrl: "https://www.healthsherpa.com/?_agent_id=javisinsuranceservices&ljs=es-MX",
      color: "bg-bright-red",
      gradient: "from-bright-red to-bright-red-light",
      features: t.productCards.obamacareFeatures
    },
    {
      title: t.productCards.medicare,
      subtitle: t.productCards.medicareSubtitle,
      description: t.productCards.medicareDesc,
      icon: FamilyIcon,
      image: "/images/medicare-hero.png",
      link: "/medicare",
      quoteUrl: "#contact",
      color: "bg-deep-blue",
      gradient: "from-deep-blue to-light-blue",
      features: t.productCards.medicareFeatures
    },
    {
      title: t.productCards.medicaid,
      subtitle: t.productCards.medicaidSubtitle,
      description: t.productCards.medicaidDesc,
      icon: ShieldPlus,
      image: "/images/medicaid-hero.png",
      link: "/medicaid",
      quoteUrl: "#contact",
      color: "bg-deep-blue",
      gradient: "from-deep-blue to-light-blue",
      features: t.productCards.medicaidFeatures
    },
    {
      title: t.productCards.homeInsurance,
      subtitle: t.productCards.homeSubtitle,
      description: t.productCards.homeDesc,
      icon: Home,
      image: "/images/home-hero.png",
      link: "/home-insurance",
      quoteUrl: "#contact",
      color: "bg-bright-red",
      gradient: "from-bright-red to-bright-red-light",
      features: t.productCards.homeFeatures
    },
    {
      title: t.productCards.autoInsurance,
      subtitle: t.productCards.autoSubtitle,
      description: t.productCards.autoDesc,
      icon: Car,
      image: "/images/auto-hero.png",
      link: "/auto",
      quoteUrl: "#contact",
      color: "bg-deep-blue",
      gradient: "from-deep-blue to-light-blue",
      features: t.productCards.autoFeatures
    },
    {
      title: t.productCards.commercialInsurance,
      subtitle: t.productCards.commercialSubtitle,
      description: t.productCards.commercialDesc,
      icon: Building2,
      image: "/images/commercial-hero.png",
      link: "/commercial",
      quoteUrl: "#contact",
      color: "bg-bright-red",
      gradient: "from-bright-red to-bright-red-light",
      features: t.productCards.commercialFeatures
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-[#FAFAFA]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bright-red/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-deep-blue/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-bright-red animate-pulse"></span>
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t.productsSection.premiumCoverage}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[#2B353F] tracking-tight">
            {t.productsSection.insuranceMadeSimple} <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-blue to-[#3672C8]">
              {t.productsSection.madeSimple}
            </span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.productsSection.sectionDesc}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 lg:items-center">
          {/* Left Menu */}
          <div className="w-full lg:w-5/12 xl:w-1/3 flex flex-col gap-3">
            {products.map((product, i) => (
              <button
                key={i}
                onClick={() => setActiveProduct(i)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left relative overflow-hidden ${activeProduct === i
                  ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 scale-100'
                  : 'hover:bg-white/60 border border-transparent scale-[0.98]'
                  }`}
              >
                {/* Active Indicator Line */}
                {activeProduct === i && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-deep-blue"
                  />
                )}

                <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${activeProduct === i ? `${product.color} text-white shadow-md` : 'bg-gray-100 text-gray-500'
                  }`}>
                  <product.icon size={24} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold transition-colors duration-300 ${activeProduct === i ? 'text-[#2B353F]' : 'text-gray-500 group-hover:text-gray-700'
                    }`}>{product.title}</h4>
                  <p className="text-sm text-gray-400 font-medium">{product.subtitle}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-7/12 xl:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Hero Image Area */}
                <div className="h-64 sm:h-80 relative bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={products[activeProduct].image}
                    alt={products[activeProduct].title}
                    className="relative z-10 w-full h-full object-cover object-center"
                  />
                </div>

                {/* Content Area */}
                <div className="p-8 md:p-12 flex-1 flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-3xl font-extrabold text-[#2B353F] mb-4">{products[activeProduct].title}</h3>
                    <p className="text-gray-500 text-lg leading-relaxed font-medium">
                      {products[activeProduct].description}
                    </p>
                  </div>

                  <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-8 mb-10 mt-auto">
                    {products[activeProduct].features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-[#2B353F] font-semibold">
                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                          <CheckIcon size={14} className="text-green-600" />
                        </div>
                        <span className="text-[15px]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                    <div className="w-full sm:w-1/2">
                      <QuoteButton
                        href={products[activeProduct].quoteUrl}
                        label={t.productsSection.getAQuote}
                        variant={products[activeProduct].title === t.productCards.obamacare ? "primary" : "secondary"}
                        className="w-full justify-center py-4 rounded-xl shadow-md text-base"
                      />
                    </div>
                    <Link
                      to={products[activeProduct].link}
                      className="w-full sm:w-1/2 bg-[#F8F9FA] text-[#2B353F] border border-gray-200 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white hover:border-deep-blue hover:text-deep-blue hover:shadow-md transition-all text-base"
                    >
                      {t.productsSection.learnMore} <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsBar = () => (
  <section className="py-16 max-w-7xl mx-auto px-6">
    <CompanyStats />
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useLanguage();
  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
  ];

  return (
    <>
      {/* FAQ Section */}
      <section className="section-padding bg-white relative pb-16 overflow-hidden">
        {/* Soft Decorative Glows */}
        <div className="bg-glow-orb-blue bottom-0 left-0 -translate-x-1/3 translate-y-1/3 blur-3xl opacity-40 z-[0]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#374151] mb-6">
              {t.faq.title}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t.faq.subtitle}
            </p>
          </motion.div>

          {/* 2-Column FAQ Layout */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              faqs.slice(0, Math.ceil(faqs.length / 2)),
              faqs.slice(Math.ceil(faqs.length / 2))
            ].map((col, colIdx) => (
              <div key={colIdx} className="space-y-4">
                {col.map((item, i) => {
                  const actualIndex = colIdx === 0 ? i : i + Math.ceil(faqs.length / 2);
                  return (
                    <motion.div
                      key={actualIndex}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: actualIndex * 0.1 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100"
                    >
                      <button
                        onClick={() => setOpenIndex(openIndex === actualIndex ? -1 : actualIndex)}
                        className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 text-deep-blue flex-shrink-0" />
                          <span className="font-semibold text-lg text-text-main pr-4">{item.q}</span>
                        </div>
                        <ChevronDown className={`transition-transform duration-300 text-deep-blue flex-shrink-0 ${openIndex === actualIndex ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === actualIndex ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-text-muted text-sm leading-relaxed pl-8">{item.a}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand CTA Banner */}
      <section className="relative bg-cream pb-16 pt-16 md:pt-32 px-6">
        <div className="max-w-5xl mx-auto relative">

          {/* CTA Card Background - Brand Colors */}
          <div
            className="rounded-[2.5rem] p-8 md:p-14 lg:p-16 relative flex flex-col items-center md:items-end mt-0 md:mt-24"
            style={{
              background: 'linear-gradient(135deg, #1A459D 0%, #1A459D 60%, #C81D21 100%)',
              boxShadow: '0 30px 70px -15px rgba(26, 69, 157, 0.45), 0 15px 35px -10px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Phone with Money Image - Hidden on mobile, visible on md+ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hidden md:block absolute bottom-0 left-0 md:left-4 lg:left-6 z-30 w-[20rem] md:w-[28rem] lg:w-[34rem] pointer-events-none"
            >
              <img
                src="/images/phone-money.png"
                alt="Save money on insurance"
                className="w-full h-auto drop-shadow-xl object-contain object-bottom"
              />
            </motion.div>

            {/* Subtle background graphics */}
            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/[0.04] rounded-full" />
              <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-white/[0.03] rounded-full" />
              <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="ctaGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20 L40 20 M20 0 L20 40" stroke="white" strokeWidth="0.5" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ctaGrid)" />
              </svg>
            </div>

            <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-center md:items-start text-center md:text-left lg:pl-12 relative z-10">
              <h3 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {t.cta.finishedScrolling}<br />
                {t.cta.startSaving}
              </h3>

              <div className="flex w-full flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mt-2">
                <Link
                  to="/obamacare"
                  className="bg-white text-deep-blue px-8 py-3 rounded-xl font-bold hover:bg-cream transition-colors shadow-lg whitespace-nowrap"
                >
                  {t.common.getStarted}
                </Link>
                <p className="text-white/90 text-sm leading-relaxed text-center md:text-left">
                  {t.cta.ctaDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ContactSection = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge-trust mb-4">{t.contact.contactUs}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-premium-heading">
              {t.contact.readyToGetStarted} <span className="text-gradient-secondary">{t.contact.started}</span>?
            </h2>
            <p className="text-text-muted text-lg mb-8">
              {t.contact.contactDesc}
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-deep-blue" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t.contact.callUsDirectly}</h4>
                  <a href="tel:305-390-8679" className="text-gradient-secondary font-medium hover:underline">{t.common.phone}</a>
                  <p className="text-text-muted text-sm">{t.contact.businessHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldPlus size={24} className="text-deep-blue" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t.contact.licensedAndTrusted}</h4>
                  <p className="text-text-muted text-sm">{t.contact.licensedSince}</p>
                </div>
              </div>
            </div>

            <TrustBadges variant="compact" />
          </motion.div>

          <ContactForm
            productType="general"
            title={t.contact.getInTouch}
            subtitle={t.contact.contactFormSubtitle}
          />
        </div>
      </div>
    </section>
  );
};

// --- Home Page ---
const HomePage = () => (
  <div className="min-h-screen bg-cream font-sans text-text-main selection:bg-deep-blue/20">
    <Navbar />
    <Hero />
    <TrustBar />
    <ProductsSection />
    <StatsBar />
    <WhyChooseUsSection />
    <ProcessTimeline />
    <TestimonialsSection />
    <FAQ />
    <ContactSection />
    <Footer />
  </div>
);

// --- App with Router ---
export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/obamacare" element={<ObamacarePage />} />
          <Route path="/medicare" element={<MedicarePage />} />
          <Route path="/home-insurance" element={<HomeInsurancePage />} />
          <Route path="/auto" element={<AutoInsurancePage />} />
          <Route path="/commercial" element={<CommercialInsurancePage />} />
          <Route path="/medicaid" element={<MedicaidPage />} />
          <Route path="/dental-vision" element={<DentalVisionPage />} />
          <Route path="/get-covered" element={<GetCoveredPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/become-agent" element={<BecomeAgentPage />} />
        </Routes>
        <WhatsAppFloat />
      </BrowserRouter>
    </LanguageProvider>
  );
}
