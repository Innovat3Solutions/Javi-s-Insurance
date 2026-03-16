import { motion } from 'motion/react';
import { useState } from 'react';

interface InsuranceProvider {
  name: string;
  logo: string;
}

// Medicare insurance providers - only actual insurance companies
const medicareProviders: InsuranceProvider[] = [
  { name: 'Humana', logo: '/images/insurance-logos/humana.png' },
  { name: 'Aetna', logo: '/images/insurance-logos/aetna.png' },
  { name: 'UnitedHealthcare', logo: '/images/insurance-logos/united-healthcare.png' },
  { name: 'Cigna', logo: '/images/insurance-logos/cigna.png' },
  { name: 'Florida Blue', logo: '/images/insurance-logos/florida-blue.png' },
  { name: 'Simply Healthcare', logo: '/images/insurance-logos/simply-healthcare.png' },
  { name: 'Solis Health Plans', logo: '/images/insurance-logos/solis.png' },
  { name: 'Keralty', logo: '/images/insurance-logos/keralty.png' },
  { name: 'Medicare', logo: '/images/insurance-logos/medicare.png' },
  { name: 'Florida Medicaid', logo: '/images/insurance-logos/florida-medicaid.png' },
];

// ACA / Obamacare providers
const acaProviders: InsuranceProvider[] = [
  { name: 'Florida Blue', logo: '/images/insurance-logos/florida-blue.png' },
  { name: 'Aetna', logo: '/images/insurance-logos/aetna.png' },
  { name: 'Cigna', logo: '/images/insurance-logos/cigna.png' },
  { name: 'UnitedHealthcare', logo: '/images/insurance-logos/united-healthcare.png' },
  { name: 'Humana', logo: '/images/insurance-logos/humana.png' },
  { name: 'Simply Healthcare', logo: '/images/insurance-logos/simply-healthcare.png' },
  { name: 'Solis Health Plans', logo: '/images/insurance-logos/solis.png' },
  { name: 'Keralty', logo: '/images/insurance-logos/keralty.png' },
];

// Generic health insurance providers
const healthProviders: InsuranceProvider[] = [
  { name: 'Florida Blue', logo: '/images/insurance-logos/florida-blue.png' },
  { name: 'Aetna', logo: '/images/insurance-logos/aetna.png' },
  { name: 'Cigna', logo: '/images/insurance-logos/cigna.png' },
  { name: 'UnitedHealthcare', logo: '/images/insurance-logos/united-healthcare.png' },
  { name: 'Humana', logo: '/images/insurance-logos/humana.png' },
  { name: 'Simply Healthcare', logo: '/images/insurance-logos/simply-healthcare.png' },
];

interface LogoCardProps {
  provider: InsuranceProvider;
  compact?: boolean;
}

const LogoCard = ({ provider, compact = false }: LogoCardProps) => {
  const [imageError, setImageError] = useState(false);

  if (compact) {
    return (
      <div className="h-20 flex items-center justify-center px-2">
        {!imageError ? (
          <img
            src={provider.logo}
            alt={`${provider.name} logo`}
            className="h-12 md:h-14 w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-sm md:text-base font-bold whitespace-nowrap text-gray-600">
            {provider.name}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-3 md:p-4 shadow-card hover:shadow-card-hover transition-all duration-300 h-24 md:h-28 flex items-center justify-center group">
      {!imageError ? (
        <img
          src={provider.logo}
          alt={`${provider.name} logo`}
          className="h-14 md:h-18 w-auto max-w-[95%] object-contain transition-transform duration-300 group-hover:scale-105"
          style={{ maxHeight: '72px' }}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-lg md:text-xl font-bold whitespace-nowrap text-gray-600">
          {provider.name}
        </span>
      )}
    </div>
  );
};

interface InsuranceCarouselProps {
  variant?: 'medicare' | 'aca' | 'health';
  title?: string;
  subtitle?: string;
  bgColor?: string;
}

export const InsuranceCarousel = ({
  variant = 'medicare',
  title = 'We Work With Top Insurance Providers',
  subtitle = 'Compare plans from leading Medicare Advantage carriers',
  bgColor = 'bg-white'
}: InsuranceCarouselProps) => {
  const providers = variant === 'medicare'
    ? medicareProviders
    : variant === 'aca'
    ? acaProviders
    : healthProviders;

  // Duplicate for seamless loop
  const duplicatedProviders = [...providers, ...providers];

  const gradientFromColor = bgColor === 'bg-white'
    ? 'white'
    : bgColor === 'bg-cream'
    ? '#F8FAFC'
    : '#F9FAFB';

  return (
    <section className={`py-12 ${bgColor} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-premium-heading mb-2">
            {title}
          </h3>
          <p className="text-text-muted">{subtitle}</p>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${gradientFromColor}, transparent)` }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${gradientFromColor}, transparent)` }}
        />

        {/* Scrolling Track */}
        <div className="flex animate-carousel">
          {duplicatedProviders.map((provider, index) => (
            <div
              key={`${provider.name}-${index}`}
              className="flex-shrink-0 w-40 md:w-48 mx-3 md:mx-4"
            >
              <LogoCard provider={provider} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Compact version for inline use
export const InsuranceCarouselCompact = ({
  variant = 'medicare',
  bgColor = 'bg-gray-50'
}: { variant?: 'medicare' | 'aca' | 'health'; bgColor?: string }) => {
  const providers = variant === 'medicare'
    ? medicareProviders
    : variant === 'aca'
    ? acaProviders
    : healthProviders;

  const duplicatedProviders = [...providers, ...providers];

  const gradientFromColor = bgColor === 'bg-white'
    ? 'white'
    : bgColor === 'bg-gray-50'
    ? '#F9FAFB'
    : '#F8FAFC';

  return (
    <div className={`py-8 ${bgColor} overflow-hidden`}>
      {/* Gradient Masks */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-12 md:w-20 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${gradientFromColor}, transparent)` }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-12 md:w-20 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${gradientFromColor}, transparent)` }}
        />

        <div className="flex animate-carousel-fast">
          {duplicatedProviders.map((provider, index) => (
            <div
              key={`${provider.name}-${index}`}
              className="flex-shrink-0 w-40 md:w-48 mx-3 md:mx-4"
            >
              <LogoCard provider={provider} compact />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
