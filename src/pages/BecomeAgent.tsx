import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { TrustBadges } from '../components/TrustBadges';
import { Briefcase, Users, TrendingUp, Award, CheckCircle, Phone, Mail, User, FileText, Loader2 } from 'lucide-react';
import { ShieldPlus, PhoneIcon } from '../components/BrandIcons';
import { useLanguage } from '../i18n';

const benefits = [
  {
    icon: TrendingUp,
    title: "Competitive Commissions",
    description: "Earn competitive commissions on every policy you sell. Our compensation structure rewards your hard work and success."
  },
  {
    icon: Users,
    title: "Lead Generation Support",
    description: "Access qualified leads and marketing support to help grow your book of business faster."
  },
  {
    icon: Award,
    title: "Training & Development",
    description: "Comprehensive training programs to help you master our products and grow your expertise."
  },
  {
    icon: Briefcase,
    title: "Flexible Schedule",
    description: "Work on your own terms with the flexibility to build your business the way you want."
  }
];

export const BecomeAgentPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    licenses: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-cream font-sans text-text-main overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/5 via-transparent to-bright-red/5 -z-10" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-deep-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-bright-red/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 lg:w-1/2"
          >
            <span className="badge-trust border-deep-blue">
              <Briefcase size={16} className="text-deep-blue" />
              Career Opportunity
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-premium-heading">
              Become an{' '}
              <span className="text-gradient-primary">Insurance Broker</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-muted max-w-lg leading-relaxed">
              Join our team of licensed insurance professionals. We're looking for motivated individuals to help families find the right coverage in Florida and Texas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href="#apply"
                className="btn-primary flex items-center justify-center gap-2"
              >
                Apply Now
              </a>
              <a
                href="tel:305-390-8679"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <PhoneIcon size={20} className="text-current" />
                {t.common.phone}
              </a>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-8 pt-6 w-full">
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold text-deep-blue">FL & TX</div>
                <div className="text-[10px] sm:text-sm text-text-muted leading-tight mt-1">Licensed<br className="sm:hidden" /> States</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-silver/50" />
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold text-deep-blue">100%</div>
                <div className="text-[10px] sm:text-sm text-text-muted leading-tight mt-1">Commission<br className="sm:hidden" /> Based</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-silver/50" />
              <div className="text-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold text-deep-blue">Flexible</div>
                <div className="text-[10px] sm:text-sm text-text-muted leading-tight mt-1">Work<br className="sm:hidden" /> Schedule</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative lg:w-1/2 w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/10 to-bright-red/10 rounded-[2rem] lg:rounded-[3rem] transform rotate-2" />
            <img
              src="/images/agent-team.png"
              alt="Insurance agent team"
              className="relative rounded-[2rem] lg:rounded-[3rem] shadow-premium w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.currentTarget.src = '/images/couple-with-agent.png';
              }}
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
                  <CheckCircle size={20} className="text-green-600 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm md:text-base text-deep-blue">Now Hiring</div>
                  <div className="text-xs md:text-sm text-text-muted truncate">Licensed Agents Welcome</div>
                </div>
              </div>
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

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-trust mb-4">Why Join Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
              Build Your <span className="text-gradient-primary">Insurance Career</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Join a team that supports your growth and rewards your success.
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
                <div className="w-16 h-16 bg-deep-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-deep-blue group-hover:scale-110 transition-all duration-300">
                  <benefit.icon size={32} className="text-deep-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-trust mb-4">Requirements</span>
              <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                What We're <span className="text-gradient-secondary">Looking For</span>
              </h2>
              <p className="text-text-muted text-lg mb-8 leading-relaxed">
                We welcome both experienced agents and motivated individuals looking to start their insurance career.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Active insurance license in Florida and/or Texas (or willingness to obtain)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Strong communication and interpersonal skills</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Self-motivated with a desire to help families</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Bilingual (English/Spanish) preferred but not required</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Ability to work independently and as part of a team</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-6 text-deep-blue">Products You'll Sell</h3>
              <p className="text-text-muted mb-6">
                As a licensed agent with Javi's Insurance, you'll help clients with:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <ShieldPlus size={16} className="text-deep-blue" />
                  ACA/Obamacare Health Insurance Plans
                </li>
                <li className="flex items-center gap-2">
                  <ShieldPlus size={16} className="text-deep-blue" />
                  Medicare Advantage & Supplements
                </li>
                <li className="flex items-center gap-2">
                  <ShieldPlus size={16} className="text-deep-blue" />
                  Medicaid Enrollment Assistance
                </li>
                <li className="flex items-center gap-2">
                  <ShieldPlus size={16} className="text-deep-blue" />
                  Home & Auto Insurance
                </li>
                <li className="flex items-center gap-2">
                  <ShieldPlus size={16} className="text-deep-blue" />
                  Commercial Insurance
                </li>
                <li className="flex items-center gap-2">
                  <ShieldPlus size={16} className="text-deep-blue" />
                  Life Insurance
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-trust mb-4">Apply Now</span>
              <h2 className="text-4xl font-bold mb-6 text-premium-heading">
                Start Your <span className="text-gradient-primary">Application</span>
              </h2>
              <p className="text-text-muted text-lg mb-8">
                Interested in joining our team? Fill out the form and we'll schedule an interview to discuss how you can build a rewarding career with Javi's Insurance.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Submit Your Information</h4>
                    <p className="text-text-muted text-sm">Tell us about yourself and any licenses you hold.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Schedule an Interview</h4>
                    <p className="text-text-muted text-sm">We'll contact you to schedule a conversation about opportunities.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-deep-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase size={24} className="text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Start Your Career</h4>
                    <p className="text-text-muted text-sm">Join our team and begin helping families find the right coverage.</p>
                  </div>
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
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-deep-blue">Thank You!</h3>
                  <p className="text-text-muted mb-6">
                    We've received your application. One of our team members will contact you soon to schedule an interview.
                  </p>
                  <p className="text-sm text-gray-500">
                    Expected response time: 1-2 business days
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2">Broker Application</h3>
                  <p className="text-text-muted mb-6 text-sm">
                    Fill out the form below and we'll get in touch to schedule an interview.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue outline-none transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'
                            }`}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 555-5555"
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200'
                            }`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'
                            }`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Licenses Field */}
                    <div>
                      <label htmlFor="licenses" className="block text-sm font-medium text-gray-700 mb-2">
                        Current Licenses (Optional)
                      </label>
                      <div className="relative">
                        <FileText size={18} className="absolute left-4 top-4 text-gray-400" />
                        <textarea
                          id="licenses"
                          name="licenses"
                          value={formData.licenses}
                          onChange={handleInputChange}
                          placeholder="List any insurance licenses you currently hold (e.g., Florida Health & Life, Texas Property & Casualty, etc.)"
                          rows={4}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue outline-none transition-all resize-none"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        If you don't have any licenses yet, that's okay! We can discuss licensing requirements during your interview.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-deep-blue text-white py-4 rounded-xl font-bold hover:bg-deep-blue/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>

                    <p className="text-xs text-center text-gray-500">
                      By submitting this form, you agree to be contacted by our team regarding career opportunities.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
