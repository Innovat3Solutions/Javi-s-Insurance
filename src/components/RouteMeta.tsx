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

export const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = META[pathname] ?? META['/'];
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
    canonical.setAttribute('href', pathname === '/' ? `${SITE}/` : `${SITE}${pathname}`);
  }, [pathname]);

  return null;
};
