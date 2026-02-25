import { motion } from 'motion/react';
import { Shield, Lock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n';

export const TrustBadges = ({ variant = 'default' }: { variant?: 'default' | 'compact' | 'footer' }) => {
  const { t } = useLanguage();

  const badges = [
    {
      icon: Shield,
      title: t.trust.licensedAllStates,
      subtitle: t.trust.npn
    },
    {
      icon: Lock,
      title: t.trust.encryption,
      subtitle: t.trust.dataSecure
    },
    {
      icon: Shield,
      title: t.trust.hipaaCompliant,
      subtitle: t.trust.healthcareProtected
    },
    {
      icon: CheckCircle,
      title: t.trust.trustedSince,
      subtitle: t.trust.familiesHelped
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2 text-sm text-text-muted"
          >
            <badge.icon className="w-4 h-4 text-deep-blue" />
            <span className="font-medium text-text-main">{badge.title}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-8 py-6 border-t border-b border-gray-200/50">
        {badges.map((badge, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-text-muted">
            <badge.icon className="w-4 h-4 text-deep-blue/60" />
            <span>{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-12"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="w-12 h-12 bg-deep-blue/10 rounded-full flex items-center justify-center mb-4">
              <badge.icon className="w-6 h-6 text-deep-blue" />
            </div>
            <h4 className="font-bold text-sm text-text-main mb-1">{badge.title}</h4>
            <p className="text-xs text-text-muted">{badge.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const TrustBar = () => (
  <div className="bg-cream border-y border-gray-100 py-5">
    <div className="max-w-7xl mx-auto px-6">
      <TrustBadges variant="compact" />
    </div>
  </div>
);
