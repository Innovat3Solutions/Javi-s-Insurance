import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
  savings?: string;
  product: 'obamacare' | 'medicare' | 'general';
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Rodriguez",
    role: "Small Business Owner",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    quote: "Javi's team saved me over $3,400 a year on my family's health insurance. They found us a Silver plan with better coverage than what we had before. The whole process took just one phone call!",
    rating: 5,
    savings: "$3,400/year",
    product: 'obamacare'
  },
  {
    id: 2,
    name: "Robert Thompson",
    role: "Retired Teacher",
    location: "Phoenix, AZ",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    quote: "I was so confused about Medicare options until I spoke with Javi's Insurance. They explained everything clearly and helped me find a Medicare Advantage plan that covers all my prescriptions.",
    rating: 5,
    product: 'medicare'
  },
  {
    id: 3,
    name: "Jennifer Chen",
    role: "Freelance Designer",
    location: "San Diego, CA",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    quote: "As a freelancer, I dreaded shopping for health insurance. Javi's team made it painless. They found me an affordable plan with the coverage I needed in under 30 minutes.",
    rating: 5,
    savings: "$2,100/year",
    product: 'obamacare'
  },
  {
    id: 4,
    name: "William & Dorothy Harris",
    role: "Retired Couple",
    location: "Houston, TX",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=200&q=80",
    quote: "Both my wife and I needed different Medicare plans. Javi's agents took the time to understand each of our needs and found us separate plans that work perfectly together.",
    rating: 5,
    product: 'medicare'
  }
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ))}
  </div>
);

export const TestimonialCard = ({ testimonial, featured = false }: { testimonial: Testimonial; featured?: boolean; key?: React.Key }) => {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl shadow-premium p-8 md:p-12 relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-deep-blue/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <Quote className="absolute top-8 left-8 w-16 h-16 text-deep-blue/10" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Image */}
            <div className="flex-shrink-0">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <StarRating rating={testimonial.rating} />
              <p className="text-xl md:text-2xl text-text-main leading-relaxed mt-4 mb-6 font-medium">
                "{testimonial.quote}"
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <h4 className="font-bold text-text-main">{testimonial.name}</h4>
                  <p className="text-sm text-text-muted">{testimonial.role} • {testimonial.location}</p>
                </div>

                {testimonial.savings && (
                  <div className="bg-success-light text-success px-4 py-2 rounded-full text-sm font-bold">
                    Saved {testimonial.savings}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all p-6"
    >
      <StarRating rating={testimonial.rating} />
      <p className="text-text-main leading-relaxed mt-4 mb-6">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-sm text-text-main">{testimonial.name}</h4>
          <p className="text-xs text-text-muted">{testimonial.location}</p>
        </div>
        {testimonial.savings && (
          <div className="ml-auto bg-success-light text-success px-3 py-1 rounded-full text-xs font-bold">
            {testimonial.savings}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = ({ filter }: { filter?: 'obamacare' | 'medicare' | 'all' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredTestimonials = filter && filter !== 'all'
    ? testimonials.filter(t => t.product === filter)
    : testimonials;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      {/* Soft Glow Orbs */}
      <div className="bg-glow-orb-blue -top-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] blur-3xl opacity-60 z-[0]" />
      <div className="bg-glow-orb-red bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] blur-3xl opacity-40 z-[0]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-trust mb-4">Customer Stories</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-premium-heading">
            Trusted by <span className="text-gradient-primary">Thousands</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Real stories from real people who found better coverage and savings with Javi's Insurance.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <div className="mb-8">
          <TestimonialCard testimonial={filteredTestimonials[currentIndex]} featured />
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full border-2 border-deep-blue/20 flex items-center justify-center hover:bg-deep-blue hover:text-white hover:border-deep-blue transition-all"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {filteredTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? 'bg-deep-blue w-8' : 'bg-deep-blue/20'
                  }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full bg-deep-blue text-white flex items-center justify-center hover:bg-deep-blue/90 transition-all shadow-lg"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-secondary">4.9/5</div>
              <div className="text-sm text-text-muted">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-secondary">10,000+</div>
              <div className="text-sm text-text-muted">Families Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-secondary">$2.5M+</div>
              <div className="text-sm text-text-muted">Customer Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-secondary">98%</div>
              <div className="text-sm text-text-muted">Would Recommend</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Compact grid for pages
export const TestimonialsGrid = ({ filter, limit = 3 }: { filter?: 'obamacare' | 'medicare'; limit?: number }) => {
  const filteredTestimonials = filter
    ? testimonials.filter(t => t.product === filter).slice(0, limit)
    : testimonials.slice(0, limit);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTestimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
};
