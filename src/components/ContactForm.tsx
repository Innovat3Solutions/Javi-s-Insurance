import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Phone, Mail, User, MessageSquare, CheckCircle, Shield, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../i18n';

interface ContactFormProps {
  productType: 'obamacare' | 'medicare' | 'health' | 'auto' | 'commercial' | 'general';
  title?: string;
  subtitle?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  consent?: string;
}

// Phone number formatting helper
const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
};

// Email validation
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Phone validation (US format)
const isValidPhone = (phone: string): boolean => {
  const numbers = phone.replace(/\D/g, '');
  return numbers.length === 10;
};

export const ContactForm = ({
  productType,
  title,
  subtitle
}: ContactFormProps) => {
  const { t } = useLanguage();
  const formTitle = title || t.contactForm.getMoreInfo;
  const formSubtitle = subtitle || t.contactForm.formSubtitle;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate a single field
  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return t.contactForm.nameRequired;
        if (value.trim().length < 2) return t.contactForm.enterFullName;
        break;
      case 'email':
        if (!value.trim()) return t.contactForm.emailRequired;
        if (!isValidEmail(value)) return t.contactForm.validEmail;
        break;
      case 'phone':
        if (!value.trim()) return t.contactForm.phoneRequired;
        if (!isValidPhone(value)) return t.contactForm.validPhone;
        break;
    }
    return undefined;
  }, [t]);

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      consent: !formData.consent ? t.contactForm.consentRequired : undefined
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true, consent: true });

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { ...formData, productType });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
      return;
    }

    // Special handling for phone number formatting
    const newValue = name === 'phone' ? formatPhoneNumber(value) : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-12 shadow-xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
          className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.4 }}
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-deep-blue mb-4"
        >
          {t.contactForm.thankYou}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-text-muted text-lg mb-6"
        >
          {t.contactForm.thankYouMessage}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-6 text-sm text-text-muted"
        >
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-deep-blue" />
            <span>(310) 437 2766</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-deep-blue" />
            <span>info@javisinsurance.com</span>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
    >
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-gradient-secondary mb-3">{formTitle}</h3>
        <p className="text-text-muted">{formSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-text-main mb-2">
              {t.contactForm.fullName} <span className="text-gradient-primary">*</span>
            </label>
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.name && errors.name ? 'text-bright-red' : 'text-silver'
                }`} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                className={`w-full pl-12 pr-4 py-4 border rounded-xl outline-none transition-all ${touched.name && errors.name
                  ? 'border-bright-red focus:border-bright-red focus:ring-2 focus:ring-bright-red/20'
                  : 'border-silver/50 focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20'
                  }`}
              />
            </div>
            <AnimatePresence>
              {touched.name && errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-bright-red text-xs mt-2 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Phone Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-text-main mb-2">
              {t.contactForm.phoneNumber} <span className="text-gradient-primary">*</span>
            </label>
            <div className="relative">
              <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.phone && errors.phone ? 'text-bright-red' : 'text-silver'
                }`} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="(555) 123-4567"
                maxLength={14}
                className={`w-full pl-12 pr-4 py-4 border rounded-xl outline-none transition-all ${touched.phone && errors.phone
                  ? 'border-bright-red focus:border-bright-red focus:ring-2 focus:ring-bright-red/20'
                  : 'border-silver/50 focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20'
                  }`}
              />
            </div>
            <AnimatePresence>
              {touched.phone && errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-bright-red text-xs mt-2 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Email Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-text-main mb-2">
            {t.contactForm.emailAddress} <span className="text-gradient-primary">*</span>
          </label>
          <div className="relative">
            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.email && errors.email ? 'text-bright-red' : 'text-silver'
              }`} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="john@example.com"
              className={`w-full pl-12 pr-4 py-4 border rounded-xl outline-none transition-all ${touched.email && errors.email
                ? 'border-bright-red focus:border-bright-red focus:ring-2 focus:ring-bright-red/20'
                : 'border-silver/50 focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20'
                }`}
            />
          </div>
          <AnimatePresence>
            {touched.email && errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-bright-red text-xs mt-2 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Message Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-text-main mb-2">{t.contactForm.message}</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-silver" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder={t.contactForm.messagePlaceholder}
              className="w-full pl-12 pr-4 py-4 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="relative bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              id="consent-checkbox"
              checked={formData.consent}
              onChange={handleChange}
              className={`mt-1 w-5 h-5 rounded border-2 text-deep-blue focus:ring-deep-blue/20 cursor-pointer flex-shrink-0 ${
                touched.consent && errors.consent ? 'border-bright-red' : 'border-gray-300'
              }`}
            />
            <label htmlFor="consent-checkbox" className="text-sm text-text-muted leading-relaxed cursor-pointer">
              <span className="font-semibold text-text-main">{t.contactForm.iAgreeToBeContacted}</span> {t.contactForm.consentText}
              <ul className="mt-2 space-y-1 list-disc list-inside text-xs">
                <li>{t.contactForm.consentItem1}</li>
                <li>{t.contactForm.consentItem2}</li>
                <li>{t.contactForm.consentItem3}</li>
                <li>{t.contactForm.consentItem4}</li>
              </ul>
            </label>
          </div>
          <AnimatePresence>
            {touched.consent && errors.consent && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-bright-red text-xs mt-2 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.consent}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${isSubmitting
            ? 'bg-bright-red/70 cursor-not-allowed'
            : 'bg-bright-red hover:bg-bright-red/90 cursor-pointer'
            } text-white`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t.contactForm.sending}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              {t.contactForm.sendMessage}
            </>
          )}
        </motion.button>

        {/* Security & Privacy Notice */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-deep-blue" />
              <span>{t.contactForm.sslEncrypted}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-silver rounded-full" />
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-deep-blue" />
              <span>{t.trust.hipaaCompliant}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-silver rounded-full" />
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-deep-blue" />
              <span>{t.trust.a2pVerified}</span>
            </div>
          </div>
          <p className="text-xs text-text-muted text-center mt-3">
            {t.contactForm.a2pVerifiedText}
          </p>
        </div>
      </form>
    </motion.div>
  );
};
