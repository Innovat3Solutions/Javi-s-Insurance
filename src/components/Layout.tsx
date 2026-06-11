import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Twitter, Instagram, Mail, Menu, X, Shield, Lock, Award, Phone, ChevronDown, Heart, Home, Car, Building2, Globe, Smile } from 'lucide-react';
import { ShieldLogo, PhoneIcon, EmailIcon, FamilyIcon, ShieldPlus } from './BrandIcons';
import { useLanguage } from '../i18n';
import { WhatsAppGlyph, whatsAppLink, WHATSAPP_DISPLAY } from './WhatsAppButton';

export { ShieldLogo };

// Logo component using the actual brand logo image
export const Logo = ({ className = "h-12" }: { className?: string }) => (
  <img
    src="/images/logo.png"
    alt="Javi's Insurance Services"
    className={`${className} w-auto object-contain mix-blend-multiply`}
  />
);

export const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;
  const isInCategory = (paths: string[]) => paths.some(p => location.pathname === p);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const healthPlanLinks = [
    { path: '/obamacare', label: t.healthPlanLinks.obamacare, icon: Heart, desc: t.healthPlanLinks.obamacareDesc },
    { path: '/medicare', label: t.healthPlanLinks.medicare, icon: FamilyIcon, desc: t.healthPlanLinks.medicareDesc },
    { path: '/medicaid', label: t.healthPlanLinks.medicaid, icon: ShieldPlus, desc: t.healthPlanLinks.medicaidDesc },
    { path: '/dental-vision', label: t.healthPlanLinks.dentalVision, icon: Smile, desc: t.healthPlanLinks.dentalVisionDesc }
  ];

  const personalInsuranceLinks = [
    { path: '/auto', label: t.personalLinks.auto, icon: Car, desc: t.personalLinks.autoDesc },
    { path: '/home-insurance', label: t.personalLinks.home, icon: Home, desc: t.personalLinks.homeDesc }
  ];

  return (
    <>
      {/* Global SVG Gradients for Icons */}
      <svg width="0" height="0" className="absolute hidden">
        <defs>
          <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-bright-red)" />
            <stop offset="100%" stopColor="#FF6B6B" />
          </linearGradient>
          <linearGradient id="gradient-secondary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-deep-blue)" />
            <stop offset="100%" stopColor="#3672C8" />
          </linearGradient>
        </defs>
      </svg>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
          }`}
      >
        <div className="relative flex items-center justify-center lg:justify-between px-6 max-w-7xl mx-auto w-full">
          {/* Logo - Centered on mobile, Left on desktop */}
          <div className="flex flex-1 justify-center lg:justify-start z-50">
            <Link to="/" className="flex items-center py-1">
              <Logo className={`transition-all duration-300 object-contain w-auto ${isScrolled ? 'h-14 md:h-16 lg:h-20' : 'h-20 md:h-24 lg:h-28'}`} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-5 text-sm font-medium text-text-main/80 whitespace-nowrap">
            {/* Home */}
            <Link
              to="/"
              className={`relative hover:text-deep-blue transition-colors ${isActive('/') ? 'text-deep-blue font-bold' : ''}`}
            >
              {t.nav.home}
              {isActive('/') && (
                <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-deep-blue rounded-full" />
              )}
            </Link>

            {/* Health Plans Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('health')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 hover:text-deep-blue transition-colors ${isInCategory(healthPlanLinks.map(l => l.path)) ? 'text-deep-blue font-bold' : ''}`}
              >
                {t.nav.healthPlans}
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'health' ? 'rotate-180' : ''}`} />
              </button>
              {isInCategory(healthPlanLinks.map(l => l.path)) && (
                <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-deep-blue rounded-full" />
              )}
              <AnimatePresence>
                {activeDropdown === 'health' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 min-w-[240px]">
                      {healthPlanLinks.map(link => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`flex items-center gap-3 p-3 rounded-xl hover:bg-deep-blue/5 transition-colors ${isActive(link.path) ? 'bg-deep-blue/10' : ''}`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive(link.path) ? 'bg-deep-blue text-white' : 'bg-gray-100 text-deep-blue'}`}>
                            <link.icon size={20} />
                          </div>
                          <div>
                            <div className="font-semibold text-text-main">{link.label}</div>
                            <div className="text-xs text-text-muted">{link.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Personal Insurance Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('personal')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 hover:text-deep-blue transition-colors ${isInCategory(personalInsuranceLinks.map(l => l.path)) ? 'text-deep-blue font-bold' : ''}`}
              >
                {t.nav.personalInsurance}
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'personal' ? 'rotate-180' : ''}`} />
              </button>
              {isInCategory(personalInsuranceLinks.map(l => l.path)) && (
                <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-deep-blue rounded-full" />
              )}
              <AnimatePresence>
                {activeDropdown === 'personal' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 min-w-[240px]">
                      {personalInsuranceLinks.map(link => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`flex items-center gap-3 p-3 rounded-xl hover:bg-bright-red/5 transition-colors ${isActive(link.path) ? 'bg-bright-red/10' : ''}`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive(link.path) ? 'bg-bright-red text-white' : 'bg-gray-100 text-bright-red'}`}>
                            <link.icon size={20} />
                          </div>
                          <div>
                            <div className="font-semibold text-text-main">{link.label}</div>
                            <div className="text-xs text-text-muted">{link.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Commercial - Standalone */}
            <Link
              to="/commercial"
              className={`relative hover:text-deep-blue transition-colors ${isActive('/commercial') ? 'text-deep-blue font-bold' : ''}`}
            >
              {t.nav.commercial}
              {isActive('/commercial') && (
                <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-deep-blue rounded-full" />
              )}
            </Link>

            {/* Contact */}
            <Link
              to="/#contact"
              className="relative hover:text-deep-blue transition-colors"
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* Desktop CTA & Phone */}
          <div className="hidden lg:flex flex-1 justify-end items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-text-main/70 hover:text-deep-blue hover:bg-deep-blue/5 transition-all"
              title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase font-bold">{language === 'en' ? 'ES' : 'EN'}</span>
            </button>
            <a
              href="tel:305-390-8679"
              className="flex items-center gap-2 text-sm font-medium text-deep-blue hover:text-bright-red transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">(305) 390-8679</span>
            </a>
            <Link
              to="/get-covered"
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg cursor-pointer whitespace-nowrap ${isScrolled
                ? 'bg-bright-red text-white hover:bg-bright-red/90'
                : 'bg-bright-red text-white hover:bg-bright-red/90'
                }`}
            >
              {t.nav.getQuote}
            </Link>
          </div>

          {/* Mobile Menu Button - Positioned absolutely to the right on mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden absolute right-6 top-1/2 -translate-y-1/2 z-50 p-2 text-text-main bg-white/50 backdrop-blur-sm rounded-full"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-deep-blue text-white z-45 lg:hidden shadow-2xl overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-bright-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex flex-col h-full pt-28 pb-8 px-8 relative z-10">
              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1">
                  {/* Language Toggle - Mobile */}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    className="mb-4"
                  >
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center gap-2 py-2 px-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="font-semibold">{language === 'en' ? 'Español' : 'English'}</span>
                    </button>
                  </motion.li>

                  {/* Home */}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      to="/"
                      className={`block py-3 text-xl font-bold border-b border-light-blue/20 transition-colors ${isActive('/') ? 'text-bright-red' : 'text-white hover:text-bright-red'}`}
                    >
                      {t.nav.home}
                    </Link>
                  </motion.li>

                  {/* Health Plans Section */}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="pt-4"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">{t.nav.healthPlans}</div>
                    <div className="space-y-1">
                      {healthPlanLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`flex items-center gap-3 py-2.5 pl-2 border-b border-light-blue/10 transition-colors ${isActive(link.path) ? 'text-bright-red' : 'text-white hover:text-bright-red'}`}
                        >
                          <link.icon size={18} className="opacity-70" />
                          <span className="text-lg font-semibold">{link.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.li>

                  {/* Personal Insurance Section */}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="pt-4"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">{t.nav.personalInsurance}</div>
                    <div className="space-y-1">
                      {personalInsuranceLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`flex items-center gap-3 py-2.5 pl-2 border-b border-light-blue/10 transition-colors ${isActive(link.path) ? 'text-bright-red' : 'text-white hover:text-bright-red'}`}
                        >
                          <link.icon size={18} className="opacity-70" />
                          <span className="text-lg font-semibold">{link.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.li>

                  {/* Commercial - Standalone */}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                  >
                    <Link
                      to="/commercial"
                      className={`flex items-center gap-3 py-3 text-xl font-bold border-b border-light-blue/20 transition-colors ${isActive('/commercial') ? 'text-bright-red' : 'text-white hover:text-bright-red'}`}
                    >
                      <Building2 size={20} className="opacity-70" />
                      {t.nav.commercial}
                    </Link>
                  </motion.li>

                  {/* Contact */}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4"
                  >
                    <Link
                      to="/#contact"
                      className="block py-3 text-xl font-bold border-b border-light-blue/20 transition-colors text-white hover:text-bright-red"
                    >
                      {t.nav.contact}
                    </Link>
                  </motion.li>
                </ul>
              </nav>

              {/* Mobile CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 pt-6 mt-6 border-t border-light-blue/20"
              >
                <a
                  href="tel:305-390-8679"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  (305) 390-8679
                </a>
                <Link
                  to="/get-covered"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-bright-red text-white rounded-xl font-bold hover:bg-[#ff5252] transition-colors shadow-lg shadow-bright-red/20"
                >
                  {t.nav.getQuote}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20 md:h-24" />
    </>
  );
};

// Trust Badges for Footer
const FooterTrustBadges = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b border-gray-200 mb-12">
    <div className="flex items-center justify-center gap-3 py-3">
      <div className="w-10 h-10 bg-deep-blue/10 rounded-full flex items-center justify-center">
        <Shield className="w-5 h-5 text-deep-blue" />
      </div>
      <div className="text-left">
        <div className="text-xs font-bold text-text-main">Licensed</div>
        <div className="text-xs text-text-muted">FL & TX</div>
      </div>
    </div>
    <div className="flex items-center justify-center gap-3 py-3">
      <div className="w-10 h-10 bg-deep-blue/10 rounded-full flex items-center justify-center">
        <Lock className="w-5 h-5 text-deep-blue" />
      </div>
      <div className="text-left">
        <div className="text-xs font-bold text-text-main">Secure</div>
        <div className="text-xs text-text-muted">256 bit SSL</div>
      </div>
    </div>
    <div className="flex items-center justify-center gap-3 py-3">
      <div className="w-10 h-10 bg-deep-blue/10 rounded-full flex items-center justify-center">
        <Award className="w-5 h-5 text-deep-blue" />
      </div>
      <div className="text-left">
        <div className="text-xs font-bold text-text-main">Trusted</div>
        <div className="text-xs text-text-muted">Since 2015</div>
      </div>
    </div>
    <div className="flex items-center justify-center gap-3 py-3">
      <div className="w-10 h-10 bg-deep-blue/10 rounded-full flex items-center justify-center">
        <PhoneIcon size={20} className="text-deep-blue" />
      </div>
      <div className="text-left">
        <div className="text-xs font-bold text-text-main">Support</div>
        <div className="text-xs text-text-muted">Mon to Sat 9 to 6</div>
      </div>
    </div>
  </div>
);

export const Footer = () => {
  const { t, language } = useLanguage();
  return (
    <footer className="bg-cream pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stay Connected CTA Card - Hero Mockup Design */}
        <div
          className="hero-gradient-card p-10 md:p-14 relative overflow-hidden mb-16 text-white rounded-[2rem]"
          style={{
            background: 'linear-gradient(120deg, #1A459D 0%, #1A459D 35%, #3672C8 50%, #C81D21 100%)',
            boxShadow: '0 30px 70px -15px rgba(26, 69, 157, 0.45), 0 15px 35px -10px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Subtle Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="footerGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M0 25 L50 25 M25 0 L25 50" stroke="white" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footerGrid)" />
          </svg>

          {/* Floating Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Plus signs */}
            <svg className="absolute top-8 left-8 w-6 h-6 text-white/60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
            <svg className="absolute top-1/3 left-16 w-4 h-4 text-white/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
            <svg className="absolute bottom-12 left-1/4 w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>

            {/* Circles - Red tones */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-bright-red/30 rounded-full blur-sm" />
            <div className="absolute top-1/2 left-8 w-16 h-16 bg-bright-red/25 rounded-full" />
            <div className="absolute -bottom-8 left-20 w-24 h-24 bg-bright-red/20 rounded-full" />

            {/* Circles - Blue tones */}
            <div className="absolute top-8 right-1/3 w-10 h-10 bg-deep-blue-dark/40 rounded-full" />
            <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-light-blue/30 rounded-full" />

            {/* Triangles */}
            <svg className="absolute top-12 right-1/3 w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 22,20 2,20" />
            </svg>
            <svg className="absolute bottom-20 left-1/3 w-3 h-3 text-white/25 rotate-180" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 22,20 2,20" />
            </svg>

            {/* Small dots */}
            <div className="absolute top-1/4 right-1/2 w-2 h-2 bg-white/40 rounded-full" />
            <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-white/30 rounded-full" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-lg">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 font-display">
                {t.footer.yourTrusted}<br />
                <span className="italic">{t.footer.insurancePartner}</span>
              </h2>
              <p className="text-white/90 text-base md:text-lg">
                {t.footer.getBestRates}
              </p>
            </div>

            {/* CTA Button */}
            <a
              href="tel:305-390-8679"
              className="relative z-10 bg-white/95 text-deep-blue px-10 py-4 rounded-full font-bold hover:bg-white transition-colors shadow-xl text-lg min-w-[160px] text-center backdrop-blur-sm"
            >
              {t.common.getStarted}
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <FooterTrustBadges />

        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="block mb-4">
              <Logo className="h-14" />
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              Obamacare Enrollment Specialists. We protect your future with comprehensive insurance solutions tailored to your needs.
            </p>
            <div className="flex flex-col gap-3 text-sm text-text-muted font-medium">
              <a href="tel:305-390-8679" className="flex items-center gap-2 hover:text-gradient-secondary transition-colors">
                <PhoneIcon size={18} className="text-bright-red" />
                <span>{t.common.phone}</span>
              </a>
              <a href="mailto:info@javisservices.com" className="flex items-center gap-2 hover:text-gradient-secondary transition-colors">
                <EmailIcon size={18} className="text-bright-red" />
                <span>{t.common.email}</span>
              </a>
              <a href={whatsAppLink(language)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gradient-secondary transition-colors">
                <WhatsAppGlyph className="w-[18px] h-[18px] text-[#25D366]" />
                <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-6 text-lg text-gradient-secondary">{t.footer.services}</h4>
              <ul className="space-y-4 text-sm text-text-muted font-medium">
                <li><Link to="/obamacare" className="hover:text-deep-blue transition-colors">{t.healthPlanLinks.obamacare}</Link></li>
                <li><Link to="/medicare" className="hover:text-deep-blue transition-colors">{t.healthPlanLinks.medicare}</Link></li>
                <li><Link to="/medicaid" className="hover:text-deep-blue transition-colors">{t.healthPlanLinks.medicaid}</Link></li>
                <li><Link to="/dental-vision" className="hover:text-deep-blue transition-colors">{t.healthPlanLinks.dentalVision}</Link></li>
                <li><Link to="/home-insurance" className="hover:text-deep-blue transition-colors">{t.productCards.homeInsurance}</Link></li>
                <li><Link to="/" className="hover:text-deep-blue transition-colors">{t.products.lifeTitle}</Link></li>
                <li><Link to="/auto" className="hover:text-deep-blue transition-colors">{t.productCards.autoInsurance}</Link></li>
                <li><Link to="/commercial" className="hover:text-deep-blue transition-colors">{t.productCards.commercialInsurance}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg text-gradient-secondary">{t.footer.support}</h4>
              <ul className="space-y-4 text-sm text-text-muted font-medium">
                <li><Link to="/" className="hover:text-deep-blue transition-colors">{t.footer.faqLink}</Link></li>
                <li><Link to="/" className="hover:text-deep-blue transition-colors">{t.footer.helpCenter}</Link></li>
                <li><Link to="/#contact" className="hover:text-deep-blue transition-colors">{t.nav.contact}</Link></li>
                <li><Link to="/become-agent" className="hover:text-deep-blue transition-colors">Become an Agent</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg text-gradient-secondary">{t.footer.legal}</h4>
              <ul className="space-y-4 text-sm text-text-muted font-medium">
                <li><Link to="/" className="hover:text-deep-blue transition-colors">{t.footer.privacyPolicy}</Link></li>
                <li><Link to="/" className="hover:text-deep-blue transition-colors">{t.footer.termsOfUse}</Link></li>
                <li><Link to="/" className="hover:text-deep-blue transition-colors">{t.footer.licenses}</Link></li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg text-gradient-secondary">{t.footer.newsletter}</h4>
            <p className="text-xs text-text-muted mb-4 leading-relaxed">
              {t.footer.newsletterDesc}
            </p>
            <div className="flex bg-gray-100 rounded-full p-1.5 pl-5 border border-gray-200 focus-within:border-deep-blue transition-colors">
              <div className="flex items-center gap-2 flex-1">
                <Mail size={16} className="text-gray-400" />
                <input type="email" placeholder={t.footer.enterEmail} className="bg-transparent w-full text-sm outline-none text-text-main placeholder:text-gray-400" />
              </div>
              <button className="bg-bright-red text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-bright-red/90 transition-colors">{t.footer.submit}</button>
            </div>
          </div>
        </div>

        {/* Licensing Disclaimer */}
        <div className="text-center py-6 border-t border-gray-200 mb-6">
          <p className="text-xs text-text-muted max-w-3xl mx-auto leading-relaxed">
            {t.footer.disclaimer}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-200 text-xs text-text-muted font-medium">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-text-main hover:bg-deep-blue hover:text-white hover:border-deep-blue transition-all cursor-pointer shadow-sm">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-text-main hover:bg-deep-blue hover:text-white hover:border-deep-blue transition-all cursor-pointer shadow-sm">
              <Twitter size={16} />
            </a>
            <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-text-main hover:bg-deep-blue hover:text-white hover:border-deep-blue transition-all cursor-pointer shadow-sm">
              <Instagram size={16} />
            </a>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <span>&copy; {new Date().getFullYear()} Javi's Insurance Services. {t.footer.allRightsReserved}</span>
            <span className="text-xs">
              {t.footer.designedBy}{' '}
              <a
                href="https://innovat3solutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gradient-secondary hover:underline font-medium"
              >
                INNOVAT3 Solutions
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
