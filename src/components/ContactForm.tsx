import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Phone, Mail, User, MessageSquare, CheckCircle, Shield, Lock, AlertCircle, Loader2, ChevronDown, Info } from 'lucide-react';
import { useLanguage } from '../i18n';
import { productForms, FormField, ProductType } from './formSchemas';

interface ContactFormProps {
  productType: ProductType;
  title?: string;
  subtitle?: string;
}

type FormValues = Record<string, string | boolean>;
type FormErrors = Record<string, string | undefined>;

// Email validation
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ZIP validation (5 digits)
const isValidZip = (zip: string): boolean => /^\d{5}$/.test(zip.trim());

export const ContactForm = ({
  productType,
  title,
  subtitle
}: ContactFormProps) => {
  const { t } = useLanguage();
  const config = productForms[productType] ?? productForms.general;
  // qual is a flat label map; cast for dynamic key access
  const q = t.contactForm.qual as unknown as Record<string, string>;
  const formTitle = title || t.contactForm.getMoreInfo;
  const formSubtitle = subtitle || t.contactForm.formSubtitle;
  const showMessage = config.showMessage !== false;
  const isMedicare = config.compliance === 'medicare';

  // Build the initial flat value object from the schema
  const buildInitial = (): FormValues => {
    const base: FormValues = config.splitName
      ? { firstName: '', lastName: '' }
      : { name: '' };
    base.email = '';
    base.message = '';
    config.fields.forEach(f => { base[f.id] = ''; });
    base.consent = false;
    return base;
  };

  const [formData, setFormData] = useState<FormValues>(buildInitial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const str = (key: string) => (formData[key] as string) ?? '';

  // Validate a single field
  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return t.contactForm.nameRequired;
        if (value.trim().length < 2) return t.contactForm.enterFullName;
        return;
      case 'firstName':
        if (!value.trim()) return q.fieldRequired;
        return;
      case 'lastName':
        if (!value.trim()) return q.fieldRequired;
        return;
      case 'email':
        if (!value.trim()) return t.contactForm.emailRequired;
        if (!isValidEmail(value)) return t.contactForm.validEmail;
        return;
    }
    // Schema-driven fields
    const field = config.fields.find(f => f.id === name);
    if (field) {
      if (field.required && !value.trim()) return q.fieldRequired;
      if (field.type === 'zip' && value.trim() && !isValidZip(value)) return q.fieldRequired;
    }
    return undefined;
  }, [t, q, config]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const nameFields = config.splitName ? ['firstName', 'lastName'] : ['name'];
    [...nameFields, 'email'].forEach(name => {
      newErrors[name] = validateField(name, str(name));
    });
    config.fields.forEach(f => {
      newErrors[f.id] = validateField(f.id, str(f.id));
    });
    newErrors.consent = !formData.consent ? t.contactForm.consentRequired : undefined;
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allKeys = [
      ...(config.splitName ? ['firstName', 'lastName'] : ['name']),
      'email', 'consent',
      ...config.fields.map(f => f.id),
    ];
    setTouched(allKeys.reduce((acc, k) => ({ ...acc, [k]: true }), {}));

    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Send the form data to your backend here.
    console.log('Form submitted:', { ...formData, productType });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const setValue = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setValue(name, (e.target as HTMLInputElement).checked);
      return;
    }
    setValue(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    if (error) setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Shared input class
  const inputClass = (name: string) =>
    `w-full px-4 py-4 border rounded-xl outline-none transition-all ${touched[name] && errors[name]
      ? 'border-bright-red focus:border-bright-red focus:ring-2 focus:ring-bright-red/20'
      : 'border-silver/50 focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20'
    }`;

  // Render function (not a nested component) so inputs keep focus / animations don't replay on each keystroke
  const renderFieldError = (name: string) => (
    <AnimatePresence>
      {touched[name] && errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-bright-red text-xs mt-2 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" />
          {errors[name]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  // Render a schema-driven qualification field
  const renderField = (field: FormField) => {
    const label = (
      <label className="block text-sm font-medium text-text-main mb-2">
        {q[field.labelKey]}{' '}
        {field.required && <span className="text-gradient-primary">*</span>}
        {field.hintKey && <span className="text-text-muted font-normal text-xs">({q[field.hintKey]})</span>}
      </label>
    );

    if (field.type === 'select') {
      return (
        <div className="relative">
          {label}
          <div className="relative">
            <select
              name={field.id}
              value={str(field.id)}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputClass(field.id)} appearance-none bg-white pr-10 cursor-pointer ${str(field.id) ? 'text-text-main' : 'text-silver'}`}
            >
              <option value="">{q.selectPlaceholder}</option>
              {field.options?.map(opt => (
                <option key={opt.value} value={opt.value} className="text-text-main">{q[opt.key]}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver pointer-events-none" />
          </div>
          {renderFieldError(field.id)}
        </div>
      );
    }

    return (
      <div className="relative">
        {label}
        <input
          type={field.type === 'date' ? 'date' : 'text'}
          inputMode={field.type === 'zip' ? 'numeric' : undefined}
          maxLength={field.type === 'zip' ? 5 : undefined}
          name={field.id}
          value={str(field.id)}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass(field.id)}
        />
        {renderFieldError(field.id)}
      </div>
    );
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
            <span>info@javisservices.com</span>
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

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name + Email (phone intentionally not collected — A2P compliance with on-page chat widget) */}
        {config.splitName ? (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-text-main mb-2">
                  {q.firstName} <span className="text-gradient-primary">*</span>
                </label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${touched.firstName && errors.firstName ? 'text-bright-red' : 'text-silver'}`} />
                  <input
                    type="text"
                    name="firstName"
                    value={str('firstName')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputClass('firstName')} pl-12`}
                  />
                </div>
                {renderFieldError('firstName')}
              </div>
              {/* Last Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-text-main mb-2">
                  {q.lastName} <span className="text-gradient-primary">*</span>
                </label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${touched.lastName && errors.lastName ? 'text-bright-red' : 'text-silver'}`} />
                  <input
                    type="text"
                    name="lastName"
                    value={str('lastName')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputClass('lastName')} pl-12`}
                  />
                </div>
                {renderFieldError('lastName')}
              </div>
            </div>
            {/* Email full width */}
            <div className="relative">
              <label className="block text-sm font-medium text-text-main mb-2">
                {t.contactForm.emailAddress} <span className="text-gradient-primary">*</span>
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${touched.email && errors.email ? 'text-bright-red' : 'text-silver'}`} />
                <input
                  type="email"
                  name="email"
                  value={str('email')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="john@example.com"
                  className={`${inputClass('email')} pl-12`}
                />
              </div>
              {renderFieldError('email')}
            </div>
          </>
        ) : (
          /* Single-name layout: name + email side by side */
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-text-main mb-2">
                {t.contactForm.fullName} <span className="text-gradient-primary">*</span>
              </label>
              <div className="relative">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${touched.name && errors.name ? 'text-bright-red' : 'text-silver'}`} />
                <input
                  type="text"
                  name="name"
                  value={str('name')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  className={`${inputClass('name')} pl-12`}
                />
              </div>
              {renderFieldError('name')}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-text-main mb-2">
                {t.contactForm.emailAddress} <span className="text-gradient-primary">*</span>
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${touched.email && errors.email ? 'text-bright-red' : 'text-silver'}`} />
                <input
                  type="email"
                  name="email"
                  value={str('email')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="john@example.com"
                  className={`${inputClass('email')} pl-12`}
                />
              </div>
              {renderFieldError('email')}
            </div>
          </div>
        )}

        {/* Product-specific qualification fields */}
        {config.fields.length > 0 && (
          <div className="pt-2">
            <div className="mb-5">
              <h4 className="text-lg font-bold text-text-main">{q.sectionTitle}</h4>
              <p className="text-sm text-text-muted">{q.sectionSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {config.fields.map(field => (
                <div key={field.id} className={field.half ? '' : 'md:col-span-2'}>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Field */}
        {showMessage && (
          <div className="relative">
            <label className="block text-sm font-medium text-text-main mb-2">{t.contactForm.message}</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-silver" />
              <textarea
                name="message"
                value={str('message')}
                onChange={handleChange}
                rows={4}
                placeholder={t.contactForm.messagePlaceholder}
                className="w-full pl-12 pr-4 py-4 border border-silver/50 rounded-xl focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 outline-none transition-all resize-none"
              />
            </div>
          </div>
        )}

        {/* Consent Checkbox */}
        <div className="relative bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              id={`consent-checkbox-${productType}`}
              checked={Boolean(formData.consent)}
              onChange={handleChange}
              className={`mt-1 w-5 h-5 rounded border-2 text-deep-blue focus:ring-deep-blue/20 cursor-pointer flex-shrink-0 ${touched.consent && errors.consent ? 'border-bright-red' : 'border-gray-300'}`}
            />
            <label htmlFor={`consent-checkbox-${productType}`} className="text-sm text-text-muted leading-relaxed cursor-pointer">
              <span className="font-semibold text-text-main">{t.contactForm.iAgreeToBeContacted}</span> {t.contactForm.consentText}
              <ul className="mt-2 space-y-1 list-disc list-inside text-xs">
                <li>{t.contactForm.consentItem1}</li>
                <li>{t.contactForm.consentItem2}</li>
                <li>{t.contactForm.consentItem3}</li>
                <li>{t.contactForm.consentItem4}</li>
              </ul>
            </label>
          </div>
          {renderFieldError('consent')}
        </div>

        {/* Medicare-specific compliance notice */}
        {isMedicare && (
          <div className="flex items-start gap-2 text-xs text-text-muted bg-deep-blue/5 rounded-xl p-3 border border-deep-blue/10">
            <Info className="w-4 h-4 text-deep-blue flex-shrink-0 mt-0.5" />
            <span className="font-medium">{t.contactForm.requestInfoOnly}</span>
          </div>
        )}

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
          </div>
          <p className="text-xs text-text-muted text-center mt-3">
            {t.contactForm.a2pVerifiedText}
          </p>
          {/* Medicare benefits disclaimer */}
          {isMedicare && (
            <p className="text-xs text-text-muted text-center mt-2 italic">
              {t.contactForm.benefitsDisclaimer}
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
};
