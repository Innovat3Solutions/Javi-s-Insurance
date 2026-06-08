import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, ShieldPlus, Pill, Smile, Users, HelpCircle, ArrowRight, Check, ArrowLeft } from 'lucide-react';
import { Navbar, Footer } from '../components/Layout';
import { ContactForm } from '../components/ContactForm';
import { TrustBadges } from '../components/TrustBadges';
import { useLanguage } from '../i18n';
import { ProductType } from '../components/formSchemas';

interface CoverageOption {
  id: string;
  labelKey: keyof ReturnType<typeof getCoverageStrings>;
  icon: typeof Heart;
  productType: ProductType;
  /** dedicated page to optionally jump to */
  route?: string;
  color: string;
}

// helper purely for typing labelKey against the getCovered block
const getCoverageStrings = (t: ReturnType<typeof useLanguage>['t']) => t.getCovered;

const options: CoverageOption[] = [
  { id: 'obamacare', labelKey: 'opt_obamacare', icon: Heart, productType: 'obamacare', route: '/obamacare', color: '#0071BC' },
  { id: 'advantage', labelKey: 'opt_advantage', icon: ShieldCheck, productType: 'medicare', route: '/medicare', color: '#12890e' },
  { id: 'supplement', labelKey: 'opt_supplement', icon: ShieldPlus, productType: 'medicare', route: '/medicare', color: '#12890e' },
  { id: 'partd', labelKey: 'opt_partd', icon: Pill, productType: 'medicare', route: '/medicare', color: '#12890e' },
  { id: 'dental', labelKey: 'opt_dental', icon: Smile, productType: 'dental', route: '/dental-vision', color: '#7C3AED' },
  { id: 'medicaid', labelKey: 'opt_medicaid', icon: Users, productType: 'medicaid', route: '/medicaid', color: '#00796B' },
  { id: 'help', labelKey: 'opt_help', icon: HelpCircle, productType: 'general', color: '#C81D21' },
];

export const GetCoveredPage = () => {
  const { t } = useLanguage();
  const g = t.getCovered;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = options.find(o => o.id === selectedId) ?? null;

  return (
    <div className="min-h-screen bg-cream font-sans text-text-main overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <section className="relative px-6 pt-12 pb-10 max-w-5xl mx-auto text-center overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-bright-red/5 rounded-full blur-3xl -z-10" />

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="badge-trust mb-5"
        >
          <ShieldCheck size={16} className="text-deep-blue" />
          {g.badge}
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-sm font-bold uppercase tracking-wider text-bright-red mb-3"
        >
          {g.step1}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading"
        >
          {g.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-text-muted text-lg max-w-2xl mx-auto"
        >
          {g.subtitle}
        </motion.p>
      </section>

      {/* Coverage option grid */}
      <section className="px-6 pb-12 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {options.map((opt, i) => {
            const isSelected = selectedId === opt.id;
            return (
              <motion.button
                key={opt.id}
                type="button"
                onClick={() => setSelectedId(opt.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${isSelected
                  ? 'border-transparent shadow-lg text-white'
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-card'
                  }`}
                style={isSelected ? { backgroundColor: opt.color } : {}}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={isSelected ? { backgroundColor: 'rgba(255,255,255,0.15)' } : { backgroundColor: `${opt.color}15` }}
                >
                  <opt.icon size={24} style={{ color: isSelected ? '#fff' : opt.color }} />
                </div>
                <span className="font-bold leading-tight">{g[opt.labelKey]}</span>
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white/25 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Revealed qualification form */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.section
            key={selected.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-20 max-w-3xl mx-auto scroll-mt-28"
            id="coverage-form"
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-deep-blue transition-colors"
              >
                <ArrowLeft size={16} />
                {g.changeSelection}
              </button>
              {selected.route && (
                <Link
                  to={selected.route}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: selected.color }}
                >
                  {g.viewFullPage}
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>

            <ContactForm
              productType={selected.productType}
              title={g[selected.labelKey]}
              subtitle={g.formIntro}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Trust bar */}
      <div className="bg-white py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <TrustBadges variant="compact" />
        </div>
      </div>

      <Footer />
    </div>
  );
};
