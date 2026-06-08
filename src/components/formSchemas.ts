// Field schemas that drive the product-specific qualification questions rendered
// by <ContactForm>. Each `labelKey` / option `key` resolves against
// `t.contactForm.qual` (see src/i18n/translations.ts). Keeping the copy in i18n
// keeps every form bilingual (EN/ES) with a single source of truth.
//
// COMPLIANCE NOTE: per CMS / Marketplace guidance these lead forms must NOT
// collect Social Security numbers, immigration documents, full DOB for every
// household member, or tax documents. Sensitive information is only gathered
// securely during enrollment. The schemas below intentionally avoid those.

export type ProductType =
  | 'obamacare'
  | 'medicare'
  | 'medicaid'
  | 'dental'
  | 'health'
  | 'auto'
  | 'commercial'
  | 'general';

export type FieldType = 'select' | 'text' | 'zip' | 'date';

export interface FormField {
  id: string;
  type: FieldType;
  /** key into t.contactForm.qual */
  labelKey: string;
  required?: boolean;
  /** render at half width inside a 2-column grid */
  half?: boolean;
  /** optional helper/hint key into t.contactForm.qual */
  hintKey?: string;
  /** for select fields: option value + label key into t.contactForm.qual */
  options?: { value: string; key: string }[];
}

export interface ProductFormConfig {
  /** First Name + Last Name instead of a single Full Name field */
  splitName?: boolean;
  /** product-specific fields rendered between contact info and consent */
  fields: FormField[];
  /** show the optional free-text message box (default true) */
  showMessage?: boolean;
  /** 'medicare' adds the no-obligation notice + benefits disclaimer */
  compliance?: 'standard' | 'medicare';
}

const preferredContact: FormField = {
  id: 'preferredContact',
  type: 'select',
  labelKey: 'preferredContact',
  half: true,
  options: [
    { value: 'phone', key: 'pc_phone' },
    { value: 'email', key: 'pc_email' },
    { value: 'text', key: 'pc_text' },
    { value: 'any', key: 'pc_any' },
  ],
};

export const productForms: Record<ProductType, ProductFormConfig> = {
  // ----- Obamacare / ACA (Under 65) -----
  obamacare: {
    splitName: true,
    compliance: 'standard',
    fields: [
      { id: 'zipCode', type: 'zip', labelKey: 'zip', required: true, half: true },
      preferredContact,
      {
        id: 'peopleCount',
        type: 'select',
        labelKey: 'aca_people',
        required: true,
        half: true,
        options: [
          { value: '1', key: 'aca_p1' },
          { value: '2', key: 'aca_p2' },
          { value: '3', key: 'aca_p3' },
          { value: '4', key: 'aca_p4' },
          { value: '5+', key: 'aca_p5' },
        ],
      },
      {
        id: 'householdIncome',
        type: 'select',
        labelKey: 'aca_income',
        required: true,
        half: true,
        options: [
          { value: 'under-20k', key: 'aca_inc1' },
          { value: '20-30k', key: 'aca_inc2' },
          { value: '30-40k', key: 'aca_inc3' },
          { value: '40-60k', key: 'aca_inc4' },
          { value: '60-80k', key: 'aca_inc5' },
          { value: 'over-80k', key: 'aca_inc6' },
        ],
      },
      {
        id: 'currentCoverage',
        type: 'select',
        labelKey: 'aca_current',
        half: true,
        options: [
          { value: 'yes', key: 'yes' },
          { value: 'no', key: 'no' },
        ],
      },
      {
        id: 'coverageTiming',
        type: 'select',
        labelKey: 'aca_timing',
        half: true,
        options: [
          { value: 'immediately', key: 'aca_t1' },
          { value: 'next-month', key: 'aca_t2' },
          { value: 'exploring', key: 'aca_t3' },
        ],
      },
    ],
  },

  // ----- Medicare (Advantage / Supplement / Part D) -----
  medicare: {
    splitName: true,
    compliance: 'medicare',
    fields: [
      { id: 'zipCode', type: 'zip', labelKey: 'zip', required: true, half: true },
      { id: 'dateOfBirth', type: 'date', labelKey: 'dob', hintKey: 'dobHint', half: true },
      preferredContact,
      {
        id: 'newToMedicare',
        type: 'select',
        labelKey: 'mc_new',
        required: true,
        half: true,
        options: [
          { value: 'turning-65', key: 'mc_n1' },
          { value: 'enrolled', key: 'mc_n2' },
          { value: 'disability', key: 'mc_n3' },
          { value: 'not-sure', key: 'mc_n4' },
        ],
      },
      {
        id: 'partsAB',
        type: 'select',
        labelKey: 'mc_parts',
        half: true,
        options: [
          { value: 'yes', key: 'yes' },
          { value: 'no', key: 'no' },
          { value: 'not-sure', key: 'notSure' },
        ],
      },
      {
        id: 'currentCoverage',
        type: 'select',
        labelKey: 'mc_current',
        half: true,
        options: [
          { value: 'advantage', key: 'mc_c1' },
          { value: 'supplement', key: 'mc_c2' },
          { value: 'original', key: 'mc_c3' },
          { value: 'not-sure', key: 'mc_c4' },
        ],
      },
      {
        id: 'goal',
        type: 'select',
        labelKey: 'mc_goal',
        required: true,
        options: [
          { value: 'lower-costs', key: 'mc_g1' },
          { value: 'more-benefits', key: 'mc_g2' },
          { value: 'review-plan', key: 'mc_g3' },
          { value: 'switch-plans', key: 'mc_g4' },
        ],
      },
    ],
  },

  // ----- Medicaid Assistance -----
  medicaid: {
    compliance: 'standard',
    fields: [
      { id: 'county', type: 'text', labelKey: 'county', required: true, half: true },
      preferredContact,
      {
        id: 'applyingFor',
        type: 'select',
        labelKey: 'md_for',
        required: true,
        half: true,
        options: [
          { value: 'child', key: 'md_child' },
          { value: 'adult', key: 'md_adult' },
          { value: 'pregnant', key: 'md_pregnant' },
          { value: 'senior', key: 'md_senior' },
          { value: 'disabled', key: 'md_disabled' },
        ],
      },
      {
        id: 'currentBenefits',
        type: 'select',
        labelKey: 'md_benefits',
        half: true,
        options: [
          { value: 'yes', key: 'yes' },
          { value: 'no', key: 'no' },
        ],
      },
    ],
  },

  // ----- Dental / Vision -----
  dental: {
    compliance: 'standard',
    fields: [
      { id: 'zipCode', type: 'zip', labelKey: 'zip', required: true, half: true },
      preferredContact,
      {
        id: 'planType',
        type: 'select',
        labelKey: 'dv_plan',
        required: true,
        half: true,
        options: [
          { value: 'individual', key: 'dv_individual' },
          { value: 'family', key: 'dv_family' },
        ],
      },
      {
        id: 'coverageTiming',
        type: 'select',
        labelKey: 'dv_timing',
        half: true,
        options: [
          { value: 'asap', key: 'dv_t1' },
          { value: '30-days', key: 'dv_t2' },
          { value: 'exploring', key: 'dv_t3' },
        ],
      },
    ],
  },

  // ----- Generic product pages keep the simple contact form -----
  health: { fields: [], compliance: 'standard' },
  auto: { fields: [] },
  commercial: { fields: [] },
  general: { fields: [] },
};
