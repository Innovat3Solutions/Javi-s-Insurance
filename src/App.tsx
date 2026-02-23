import { ArrowRight, Heart, GraduationCap, Briefcase, Car, ChevronDown, ChevronUp, Phone, Mail, Facebook, Twitter, Instagram, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// --- Components ---

const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 text-orange">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
        </svg>
      </div>
      <span className="text-2xl font-bold font-display tracking-tight">GenZ</span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-main/80">
      <a href="#" className="hover:text-orange transition-colors">Home</a>
      <a href="#" className="hover:text-orange transition-colors">About Us</a>
      <a href="#" className="hover:text-orange transition-colors">Partnership</a>
      <a href="#" className="hover:text-orange transition-colors">Contact</a>
    </div>
    <button className="bg-orange text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-orange/90 transition-colors shadow-orange/20 shadow-lg cursor-pointer">
      Policy Services
    </button>
  </nav>
);

const Hero = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const products = [
    { icon: Heart, label: "Life" },
    { icon: GraduationCap, label: "Education" },
    { icon: Briefcase, label: "Business" },
    { icon: Car, label: "Auto" },
  ];

  return (
    <section className="relative px-6 pt-8 pb-24 max-w-7xl mx-auto overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-grid-pattern -z-10 opacity-50" />
      
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-10 relative z-10"
        >
          <motion.div variants={fadeInUp} className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight text-text-main">
              THE SMARTER WAY TO <br />
              BUY <span className="relative inline-block px-2">
                <span className="relative z-10 text-teal">INSURANCE</span>
                <span className="absolute inset-0 bg-yellow transform -skew-x-6 rounded-sm -z-0"></span>
              </span>
            </h1>
            <p className="text-text-muted text-lg pt-4">
              Select a product to compare quotes:
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex gap-4">
            {products.map((p, i) => (
              <button 
                key={i}
                onClick={() => setSelectedProduct(i)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedProduct === i 
                    ? 'bg-teal text-white shadow-xl shadow-teal/20 scale-110' 
                    : 'bg-white text-teal/40 hover:bg-teal/10'
                }`}
              >
                <p.icon size={24} strokeWidth={2.5} />
              </button>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-10 lg:mt-0 h-[600px]">
          {/* Curly Arrow */}
          <motion.svg 
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-0 left-10 w-48 h-48 text-gray-300 z-0 hidden lg:block" 
            viewBox="0 0 200 200" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M40,150 C40,100 100,50 160,80" />
            <path d="M150,70 L160,80 L145,90" />
          </motion.svg>

          {/* Money Bills Decoration - Top Right */}
          <motion.div 
            initial={{ y: -50, opacity: 0, rotate: 10 }}
            animate={{ y: 0, opacity: 1, rotate: -15 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -top-10 -right-20 z-20 hidden md:block"
          >
             <img 
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=500&q=80" 
              alt="Fanned Money"
              className="w-64 h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>

          <div className="relative h-full flex items-end justify-center">
            {/* Family Image */}
            <motion.img 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1536009190979-3291d8a5d637?auto=format&fit=crop&w=800&q=80" 
              alt="Happy Family" 
              className="relative z-10 w-auto h-[90%] object-contain mask-image-gradient-bottom"
            />
            
            {/* Floating Text Element */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute top-1/3 right-0 md:right-10 z-30"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-4xl font-display text-text-main">Life</h3>
                <h3 className="font-bold text-4xl font-display text-text-main">Insurance</h3>
                <p className="text-xs text-text-muted max-w-[180px] leading-relaxed py-2">
                  Eget quam est fringilla lectus. Ornare id amet neque pharetra.
                </p>
                <button className="bg-text-main text-white text-xs font-bold px-6 py-3 rounded-lg hover:bg-black transition-colors">
                  Get Started
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsBar = () => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="max-w-7xl mx-auto px-6 mb-20 relative z-20"
  >
    <div className="bg-teal-dark rounded-3xl p-10 md:p-14 text-white flex flex-col md:flex-row justify-between items-center gap-10 shadow-2xl shadow-teal-dark/30 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]">
      <div className="md:w-1/3">
        <h3 className="text-3xl font-bold mb-3 font-display">Easy And <br/> Supporting</h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Policygenius provides free quotes tailored to your needs from licensed agents.
        </p>
      </div>
      
      <div className="h-20 w-px bg-white/10 hidden md:block"></div>

      <div className="flex-1 flex justify-between gap-8 w-full md:w-auto">
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-yellow mb-2 font-display">30M+</div>
          <div className="text-xs font-medium text-white/60 uppercase tracking-wider">Shoppers Served</div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-yellow mb-2 font-display">$90B</div>
          <div className="text-xs font-medium text-white/60 uppercase tracking-wider">Life Insurance Sold</div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-yellow mb-2 font-display">24/7</div>
          <div className="text-xs font-medium text-white/60 uppercase tracking-wider">Help From Experts</div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Logos = () => (
  <div className="max-w-7xl mx-auto px-6 mb-24">
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gray-200 pb-12">
      <span className="font-bold text-xl w-32 leading-tight font-display">Featured <br/> By Company</span>
      <div className="flex flex-wrap justify-center gap-16 grayscale opacity-40 mix-blend-multiply">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Fast_Company_logo.svg/2560px-Fast_Company_logo.svg.png" alt="Fast Company" className="h-5 object-contain" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/The_Wall_Street_Journal_Logo.svg/2560px-The_Wall_Street_Journal_Logo.svg.png" alt="WSJ" className="h-5 object-contain" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/USA_Today_logo.svg/2560px-USA_Today_logo.svg.png" alt="USA Today" className="h-5 object-contain" />
      </div>
    </div>
  </div>
);

const Features = () => {
  const features = [
    { id: "01", title: "Smart tools", desc: "Our proprietary technology makes it easy to compare personalized quotes from top-rated insurers side by side." },
    { id: "02", title: "Human Support", desc: "Our team of licensed experts is here to answer questions, handle paperwork, and help you make decisions with confidence." },
    { id: "03", title: "Fully independent", desc: "From exploring coverage options to making policy adjustments as your life changes, we're your advocate at every step." },
    { id: "04", title: "Security you can trust", desc: "Your security is our priority. We use industry-leading security practices to help keep your information safe." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-text-main">Why Trust <br /> Our Service ?</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-yellow rounded-[3rem] transform rotate-3 scale-95 z-0 translate-y-4"></div>
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" 
            alt="Team Meeting" 
            className="relative z-10 rounded-[3rem] w-full shadow-2xl object-cover h-[500px]"
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-16">
          {features.map((f, i) => (
            <motion.div 
              key={f.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4"
            >
              <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-bold rounded-lg text-sm">
                {f.id}
              </span>
              <h3 className="text-xl font-bold font-display">{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Guides = () => {
  const [activeGuide, setActiveGuide] = useState(0);
  const guides = ["Life Insurance", "Home Insurance", "Auto Insurance", "Education Insurance"];

  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 text-text-main">Explore Our Guides</h2>
        <p className="text-text-muted">Our experts have compiled resources that cover the basics and beyond.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 space-y-2 relative">
          {guides.map((g, i) => (
            <button
              key={i}
              onClick={() => setActiveGuide(i)}
              className={`w-full text-left px-8 py-6 rounded-2xl flex items-center justify-between transition-all ${
                activeGuide === i 
                  ? 'bg-white shadow-lg font-bold text-text-main scale-105 z-10 relative' 
                  : 'text-text-muted hover:bg-white/50'
              }`}
            >
              <span className="text-lg">{g}</span>
              {activeGuide === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          ))}
          {/* Decorative Arrow pointing to image */}
          <svg className="absolute top-1/2 -right-12 w-24 h-24 text-yellow hidden lg:block z-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
             <path d="M0,50 Q50,20 90,50" />
             <path d="M80,40 L90,50 L80,60" />
          </svg>
        </div>

        <motion.div 
          key={activeGuide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-8 relative rounded-[3rem] overflow-hidden h-[500px] shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80" 
            alt="House Guide" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div className="absolute top-10 right-10 bg-white/95 backdrop-blur-md p-8 rounded-2xl max-w-xs shadow-xl">
            <h4 className="font-bold text-xl mb-2 font-display">Get Guidelines</h4>
            <p className="text-sm text-text-muted mb-6">Comprehensive guides for your needs.</p>
            <button className="bg-text-main text-white text-sm font-bold px-6 py-3 rounded-lg w-full hover:bg-black transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="max-w-7xl mx-auto px-6 mb-32">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-full h-full bg-yellow/20 rounded-full blur-3xl -z-10"></div>
        {/* Woman in Yellow Sweater */}
        <img 
          src="https://images.unsplash.com/photo-1623039497026-06c532d6938d?auto=format&fit=crop&w=800&q=80" 
          alt="Happy Customer" 
          className="rounded-full w-[500px] h-[500px] object-cover mx-auto lg:mx-0 border-8 border-white shadow-2xl"
        />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-20 bg-orange text-white px-8 py-4 rounded-2xl shadow-xl text-center min-w-[240px] transform -rotate-2">
          <div className="font-bold text-xl font-display">Rhonda Rhodes</div>
          <div className="text-sm opacity-90">Batu Farmer</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-text-main">
          Join Our Millions <br /> Of Happy Shoppers
        </h2>
        <p className="text-text-muted mb-12 text-lg">
          GenZ has near-perfect ratings on Trustpilot, BBB, and Google. Here's what our customers are saying.
        </p>

        <div className="bg-teal-dark text-white p-12 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="text-8xl font-serif opacity-20 absolute top-6 left-8">"</div>
          <p className="text-xl leading-relaxed mb-10 relative z-10 font-medium">
            The GenZ team were awesome. That got me the best deal on term life, with a 20 year renewal instead of the usual 5 year renewal at most companies. It's in place and don't have to worry about paying more.
          </p>
          
          <div className="flex gap-4 justify-end">
            <button className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-teal-dark transition-colors">
              <ArrowLeft size={20} />
            </button>
            <button className="w-12 h-12 rounded-full bg-white text-teal-dark flex items-center justify-center hover:bg-white/90 transition-colors shadow-lg">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { q: "How is Insurance different from other insurance sites?", a: "An insurance marketplace, not an insurance company. (That means we sell policies, we don't underwrite them.) There's no shortage of companies out there offering fast or easy insurance coverage, but we think a marketplace is the best way to compare." },
    { q: "How does Insurance make money?", a: "We earn a commission from the insurance companies when you buy a policy. This doesn't affect the price you pay." },
    { q: "Is Insurance licensed?", a: "Yes, we are a licensed insurance broker in all 50 states and the District of Columbia." },
    { q: "Is Insurance a corporate affiliate of any insurance company?", a: "No, we are an independent marketplace." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="grid lg:grid-cols-2 gap-20">
        <div className="space-y-8">
          <h2 className="text-5xl font-bold text-text-main">Frequently <br /> Asked Questions</h2>
          <div className="relative h-[500px] w-full flex items-center justify-center">
             {/* Decorative Squiggle Arrow */}
             <svg className="absolute top-0 left-10 w-40 h-40 text-teal" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20,20 Q60,60 20,90" />
                <path d="M10,80 L20,90 L30,80" />
             </svg>
             
             <motion.div 
               initial={{ rotate: -10, y: 20 }}
               whileInView={{ rotate: -6, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, type: "spring" }}
               className="relative z-10"
             >
               {/* Hand holding Wallet Image */}
               <img 
                 src="https://images.unsplash.com/photo-1621504450168-38f647315648?auto=format&fit=crop&w=600&q=80" 
                 alt="Hand holding wallet"
                 className="rounded-[3rem] shadow-2xl w-80 border-8 border-white transform rotate-[-6deg]"
               />
             </motion.div>
          </div>
        </div>

        <div className="space-y-6 pt-10">
          {faqs.map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-lg text-text-main pr-8">{item.q}</span>
                <ChevronDown className={`transition-transform duration-300 text-teal flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`px-8 overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-48 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-text-muted leading-relaxed text-base">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-cream pt-20 pb-10 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      {/* CTA Card */}
      <div className="bg-orange rounded-[3rem] p-16 relative overflow-hidden mb-24 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-orange/30">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-xl">
          <h2 className="text-5xl font-bold mb-2 font-display">Finished Scrolling?</h2>
          <h2 className="text-5xl font-bold mb-6 font-display">Start Saving</h2>
          <p className="text-white/90 text-lg">The insurance you need and save by shopping from the most trusted insurers.</p>
        </div>
        <button className="relative z-10 bg-gray-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-colors shadow-xl text-lg min-w-[160px]">
          Subscribe
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 text-orange">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
              </svg>
            </div>
            <span className="text-2xl font-bold font-display">GenZ</span>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            We are a lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun.
          </p>
          <div className="flex gap-4 text-sm text-text-muted font-medium">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-orange" />
              <span>310-437-2766</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-orange" />
              <span>unreal@outlook.com</span>
            </div>
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-sm text-text-muted font-medium">
              <li><a href="#" className="hover:text-orange transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Jobs</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-4 text-sm text-text-muted font-medium">
              <li><a href="#" className="hover:text-orange transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Legal</h4>
            <ul className="space-y-4 text-sm text-text-muted font-medium">
              <li><a href="#" className="hover:text-orange transition-colors">Privacy policy</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Sitemap</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
          <p className="text-xs text-text-muted mb-4 leading-relaxed">
            Be the first one to know about discounts, offers and events weekly in your mailbox. Unsubscribe whenever you like with one click.
          </p>
          <div className="flex bg-gray-100 rounded-full p-1.5 pl-5 border border-gray-200 focus-within:border-orange transition-colors">
            <div className="flex items-center gap-2 flex-1">
              <Mail size={16} className="text-gray-400" />
              <input type="email" placeholder="Enter your email" className="bg-transparent w-full text-sm outline-none text-text-main placeholder:text-gray-400" />
            </div>
            <button className="bg-gray-900 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-black transition-colors">Submit</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 text-xs text-text-muted font-medium">
        <div className="flex gap-4 mb-4 md:mb-0">
          <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-text-main hover:bg-orange hover:text-white hover:border-orange transition-all cursor-pointer shadow-sm"><Facebook size={16} /></div>
          <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-text-main hover:bg-orange hover:text-white hover:border-orange transition-all cursor-pointer shadow-sm"><Twitter size={16} /></div>
          <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-text-main hover:bg-orange hover:text-white hover:border-orange transition-all cursor-pointer shadow-sm"><Instagram size={16} /></div>
        </div>
        <div>© 2000-2021, All Rights Reserved</div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-cream font-sans text-text-main selection:bg-orange/20">
      <Navbar />
      <Hero />
      <StatsBar />
      <Logos />
      <Features />
      <Guides />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
