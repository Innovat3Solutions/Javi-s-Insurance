import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Loader2, ExternalLink } from 'lucide-react';

interface QuoteButtonProps {
  href: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'default' | 'large' | 'small';
  className?: string;
  showLoadingState?: boolean;
}

export const QuoteButton = ({
  href,
  label = "Get Instant Quote",
  variant = 'primary',
  size = 'default',
  className = '',
  showLoadingState = true
}: QuoteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Internal anchors (e.g. "#contact") scroll within the page in the same tab
  const isAnchor = href.startsWith('#');

  const handleClick = (e: React.MouseEvent) => {
    if (isAnchor) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (showLoadingState) {
      setIsLoading(true);
      // Reset loading state after navigation starts
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 cursor-pointer relative overflow-hidden whitespace-nowrap";

  const variants = {
    primary: "bg-bright-red text-white hover:bg-bright-red/90 shadow-lg shadow-bright-red/20",
    secondary: "bg-deep-blue text-white hover:bg-deep-blue/90 shadow-lg shadow-deep-blue/20",
    outline: "border-2 border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white",
    white: "bg-white text-deep-blue hover:bg-white/90 shadow-lg"
  };

  const sizes = {
    small: "px-6 py-3 text-sm",
    default: "px-8 py-4 text-base",
    large: "px-10 py-5 text-lg"
  };

  return (
    <motion.a
      href={href}
      target={isAnchor ? undefined : "_blank"}
      rel={isAnchor ? undefined : "noopener noreferrer"}
      onClick={handleClick}
      whileHover={{ scale: isLoading ? 1 : 1.05 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${isLoading ? 'pointer-events-none opacity-90' : ''
        }`}
    >
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        animate={isLoading ? { translateX: ['100%', '-100%'] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <Zap className="w-5 h-5" />
          {label}
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </motion.a>
  );
};

// Minimal quote button for inline use
export const QuoteButtonMinimal = ({
  href,
  label = "Get Quote"
}: {
  href: string;
  label?: string;
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 3 }}
      className="inline-flex items-center gap-1.5 text-bright-red font-semibold text-sm hover:underline cursor-pointer"
    >
      {label}
      <ExternalLink className="w-3.5 h-3.5" />
    </motion.a>
  );
};

// Sticky Quote Button for pages
export const StickyQuoteButton = ({
  href,
  label = "Get Your Free Quote Now"
}: {
  href: string;
  label?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show sticky button after scrolling down
  useState(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const isAnchor = href.startsWith('#');

  const handleClick = (e: React.MouseEvent) => {
    if (isAnchor) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
    >
      <motion.a
        href={href}
        target={isAnchor ? undefined : "_blank"}
        rel={isAnchor ? undefined : "noopener noreferrer"}
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-bright-red text-white px-6 py-4 rounded-full font-bold shadow-2xl shadow-bright-red/30"
      >
        <Zap className="w-5 h-5" />
        {label}
      </motion.a>
    </motion.div>
  );
};

// Floating Action Button style
export const QuoteButtonFAB = ({
  href,
  className = ''
}: {
  href: string;
  className?: string;
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-6 right-6 w-14 h-14 bg-bright-red text-white rounded-full flex items-center justify-center shadow-2xl shadow-bright-red/30 z-50 ${className}`}
    >
      <Zap className="w-6 h-6" />
    </motion.a>
  );
};
