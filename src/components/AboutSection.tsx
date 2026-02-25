import { motion } from 'motion/react';
import { ShieldIcon, CircleCheckFilled, HeartIcon, DollarIcon, PhoneIcon } from './BrandIcons';
import { Users, Award, Clock, Headphones } from 'lucide-react';

const whyChooseUs = [
  {
    icon: ShieldIcon,
    title: "100% Independent",
    description: "We work for you, not insurance companies. Our unbiased advice helps you find the best coverage at the best price."
  },
  {
    icon: Award,
    title: "Licensed Experts",
    description: "Our team holds professional certifications and is licensed in all 50 states to serve you wherever you are."
  },
  {
    icon: DollarIcon,
    title: "Always Free Service",
    description: "You never pay us a dime. Insurance companies pay us, so our expert help is completely free to you."
  },
  {
    icon: Headphones,
    title: "Year Round Support",
    description: "Questions about your coverage? Need to make changes? We're here for you long after you enroll."
  }
];

const teamMembers = [
  {
    name: "Javier Santos",
    role: "Founder & Lead Agent",
    credentials: "CPCU, CLU",
    experience: "15+ years",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    bio: "Dedicated to helping families find affordable coverage since 2009."
  },
  {
    name: "Sarah Mitchell",
    role: "Medicare Specialist",
    credentials: "AHIP Certified",
    experience: "10+ years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    bio: "Expert in Medicare Advantage and supplemental plans."
  },
  {
    name: "Michael Chen",
    role: "ACA Enrollment Specialist",
    credentials: "Licensed Agent",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    bio: "Specializes in helping individuals and families navigate Obamacare options."
  }
];

export const WhyChooseUsSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-cream">
      {/* Decorative Glow Orbs */}
      <div className="bg-glow-orb-blue top-0 right-0 translate-x-1/3 -translate-y-1/3 blur-2xl z-[-1]" />
      <div className="bg-glow-orb-red bottom-0 left-0 -translate-x-1/3 translate-y-1/3 blur-2xl z-[-1]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-trust mb-4">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
            Your Trusted <span className="text-gradient-secondary">Insurance Partner</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            We're more than just insurance agents. We're your advocates, working to protect your family and your wallet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-deep-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-deep-blue group-hover:scale-110 transition-all duration-300">
                <item.icon size={32} className="text-deep-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TeamSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-grid-pattern opacity-10 z-[0] pointer-events-none" />
      <div className="bg-glow-orb-blue top-[20%] left-[-10%] blur-3xl opacity-50 z-[0] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-trust mb-4">Our Team</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
            Meet Your <span className="text-gradient-primary">Insurance Experts</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Our licensed agents have decades of combined experience helping families find the right coverage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-cream rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="bg-deep-blue text-white text-xs px-3 py-1 rounded-full font-medium">
                    {member.experience}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gradient-secondary font-medium text-sm mb-1">{member.role}</p>
                <p className="text-text-muted text-xs mb-3">{member.credentials}</p>
                <p className="text-text-muted text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="tel:310-437-2766"
            className="btn-primary inline-flex items-center gap-2"
          >
            <PhoneIcon size={20} className="text-white" />
            Speak With Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export const CompanyStats = () => {
  const stats = [
    { value: "15+", label: "Years Experience", icon: Clock },
    { value: "10,000+", label: "Families Helped", icon: Users },
    { value: "50", label: "States Licensed", icon: ShieldIcon },
    { value: "4.9★", label: "Customer Rating", icon: Award }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-deep-blue rounded-3xl p-8 md:p-12 text-white overflow-hidden"
      style={{ boxShadow: '0 25px 60px -12px rgba(26, 69, 157, 0.4), 0 12px 30px -8px rgba(0, 0, 0, 0.2)' }}
    >
      {/* Subtle Background Graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large subtle circles */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/[0.04] rounded-full" />
        <div className="absolute -bottom-24 -left-12 w-64 h-64 bg-white/[0.03] rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-light-blue/10 rounded-full blur-2xl" />

        {/* Subtle grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="companyStatsGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L40 20 M20 0 L20 40" stroke="white" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#companyStatsGrid)" />
        </svg>

        {/* Small accent dots */}
        <div className="absolute top-6 left-1/4 w-2 h-2 bg-bright-red/30 rounded-full" />
        <div className="absolute bottom-8 right-1/4 w-3 h-3 bg-white/10 rounded-full" />
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <stat.icon size={32} className="mx-auto mb-3 text-white/80" />
            <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-white/70">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Compact version for product pages
export const WhyChooseUsCompact = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {whyChooseUs.slice(0, 4).map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-start gap-4"
        >
          <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <item.icon size={24} className="text-deep-blue" />
          </div>
          <div>
            <h4 className="font-bold mb-1">{item.title}</h4>
            <p className="text-text-muted text-sm">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
