import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://www.javisservices.com';

const META: Record<string, { title: string; description: string }> = {
  '/': {
    title: "Javi's Insurance Services - We Protect Your Future",
    description:
      "Javi's Insurance Services helps families in Florida and Texas compare and enroll in health, Medicare, Medicaid, ACA/Obamacare, dental, vision, auto, home, and commercial insurance at no cost to you. Licensed agents, English y Español.",
  },
  '/obamacare': {
    title: "ACA / Obamacare Health Plans | Javi's Insurance Services",
    description:
      'Enroll in an ACA Marketplace (Obamacare) health plan with free help from licensed agents. Check subsidies, compare plans, and get covered — many families qualify for $0 premiums.',
  },
  '/medicare': {
    title: "Medicare Plans Made Simple | Javi's Insurance Services",
    description:
      'Compare Medicare Advantage, Supplement, and Part D plans with a licensed agent at no cost. We help you find the right Medicare coverage in Florida and Texas.',
  },
  '/medicaid': {
    title: "Medicaid Enrollment Help | Javi's Insurance Services",
    description:
      'Free help checking Medicaid eligibility and enrolling in Florida and Texas. Our licensed agents guide you through the process in English or Spanish.',
  },
  '/home-insurance': {
    title: "Home Insurance Quotes | Javi's Insurance Services",
    description:
      'Protect your home with the right homeowners insurance. Compare quotes from top carriers with a licensed independent agent in Florida and Texas.',
  },
  '/auto': {
    title: "Auto Insurance Quotes | Javi's Insurance Services",
    description:
      'Compare car insurance quotes from multiple carriers and find the coverage that fits your budget. Free help from licensed agents in Florida and Texas.',
  },
  '/commercial': {
    title: "Commercial & Business Insurance | Javi's Insurance Services",
    description:
      'Coverage for your business: general liability, commercial auto, workers comp, and more. Licensed independent agents serving Florida and Texas.',
  },
  '/dental-vision': {
    title: "Dental & Vision Plans | Javi's Insurance Services",
    description:
      'Affordable dental and vision insurance plans for individuals and families. Compare options with a licensed agent at no cost to you.',
  },
  '/get-covered': {
    title: "Get Covered - Free Quote | Javi's Insurance Services",
    description:
      'Tell us a little about yourself and a licensed agent will help you find the right insurance coverage. Free assistance in English and Spanish.',
  },
  '/become-agent': {
    title: "Become an Insurance Agent | Javi's Insurance Services",
    description:
      "Join Javi's Insurance Services as a licensed agent. Training, support, and growth opportunities in Florida and Texas.",
  },
  '/privacy-policy': {
    title: "Privacy Policy | Javi's Insurance Services",
    description:
      "How Javi's Insurance Services collects, uses, and protects your personal information, including SMS/text messaging consent and opt-in data.",
  },
  '/terms': {
    title: "Terms of Service | Javi's Insurance Services",
    description:
      "The terms and conditions governing your use of the Javi's Insurance Services website and services.",
  },
};

// Per-route structured data for search engines and AI assistants
const SERVICE_ROUTES: Record<string, string> = {
  '/obamacare': 'ACA / Obamacare health insurance enrollment',
  '/medicare': 'Medicare plan guidance (Advantage, Supplement, Part D)',
  '/medicaid': 'Medicaid enrollment assistance',
  '/dental-vision': 'Dental and vision insurance plans',
  '/home-insurance': 'Home insurance',
  '/auto': 'Auto insurance',
  '/commercial': 'Commercial insurance',
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "How is Javi's Insurance different from other insurance sites?",
      acceptedAnswer: { '@type': 'Answer', text: "We're an independent insurance marketplace, not an insurance company. This means we work for YOU, not insurers. We compare plans from multiple carriers to find you the best coverage at the best price, completely free." },
    },
    {
      '@type': 'Question',
      name: 'Is your service really free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes! You never pay us a dime. Insurance companies pay us a commission when you enroll through us. You get the same rates as going direct, plus our expert guidance and year round support at no extra cost.' },
    },
    {
      '@type': 'Question',
      name: 'Are your agents licensed?',
      acceptedAnswer: { '@type': 'Answer', text: "Absolutely. All our agents are fully licensed, certified, and undergo continuous training. We're licensed in Florida and Texas." },
    },
    {
      '@type': 'Question',
      name: 'Can you help with both Obamacare and Medicare?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes! We specialize in both. For individuals and families, we help navigate ACA (Obamacare) plans. For seniors, we guide you through Medicare options including Advantage plans, supplements, and Part D coverage.' },
    },
    {
      '@type': 'Question',
      name: 'When can I enroll in a health insurance plan?',
      acceptedAnswer: { '@type': 'Answer', text: 'Usually, you can enroll during the Open Enrollment Period (November 1 to January 15 for ACA, October 15 to December 7 for Medicare). However, certain life events like moving, getting married, or losing other coverage may qualify you for a Special Enrollment Period.' },
    },
    {
      '@type': 'Question',
      name: 'Do I need to undergo a medical exam to get coverage?',
      acceptedAnswer: { '@type': 'Answer', text: 'No! Under the Affordable Care Act (Obamacare) and standard Medicare enrollments, you cannot be denied coverage or charged more based on preexisting conditions, and no medical exam is required to enroll.' },
    },
  ],
};

function routeSchema(pathname: string, meta: { title: string; description: string }) {
  if (pathname === '/') return FAQ_SCHEMA;
  const serviceName = SERVICE_ROUTES[pathname];
  if (!serviceName) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: meta.description,
    url: `${SITE}${pathname}`,
    provider: { '@id': `${SITE}/#agency` },
    areaServed: [
      { '@type': 'State', name: 'Florida' },
      { '@type': 'State', name: 'Texas' },
    ],
    availableLanguage: ['en', 'es'],
  };
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = META[pathname] ?? META['/'];
    const url = pathname === '/' ? `${SITE}/` : `${SITE}${pathname}`;

    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    setMetaProperty('og:title', meta.title);
    setMetaProperty('og:description', meta.description);
    setMetaProperty('og:url', url);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.description);

    const schema = routeSchema(pathname, meta);
    let script = document.getElementById('route-jsonld');
    if (schema) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'route-jsonld';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    } else if (script) {
      script.remove();
    }
  }, [pathname]);

  return null;
};
