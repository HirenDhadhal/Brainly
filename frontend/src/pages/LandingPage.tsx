import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Link as LinkIcon, 
  Share2, 
  Search, 
  Menu, 
  Play, 
  Twitter, 
  Github, 
  Linkedin,
  Star,
  Plus,
  ArrowRight,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  quote: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

const fadeInUp: Variants = {
  hidden: { y: 30, opacity: 0, filter: 'blur(4px)' },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28.047-.606 0-.747-.514-.84-1.12-.887l-13.448.653c-1.353.187-1.82.513-1.122 1.167zm16.035 2.613c-1.166-.374-2.846-.14-3.592.14l-11.385 1.54c-.653.093-.793.513-.793 1.026v12.274c0 .84 1.12 1.26 1.493 1.26.233 0 2.893-.28 2.893-.28V14.33l6.393-1.306v8.26c2.846-.607 4.106-1.167 4.993-1.54.513-.233 1.166-.653 1.166-1.913V7.754c0-.793-.746-1.12-1.166-1.306l.001.373zM9.263 12.37l-1.307.234v-3.78l1.307-.28v3.826zm2.286-.467l-1.306.28V8.14l1.306-.233v4.046zm2.333-.513l-1.353.28V7.907l1.353-.28v3.953z"/>
  </svg>
);

const GoogleDriveIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M8.28 7.406L5.594 12.06 1.173 4.407A9.457 9.457 0 0 1 8.28 7.406zm-1.812 6.094l-2.72 4.686A9.493 9.493 0 0 1 2.38 12l4.088-1.5zm11.233-5.062L12 1.5h-.001a9.435 9.435 0 0 1 5.694 6.938zM12 16.5l-4.113 7.106A9.435 9.435 0 0 1 12 16.5zm5.72-2.906L14.78 18.5H6.554l2.84-4.906h8.326zm.573-1.5H22.5c0 1.625-.42 3.146-1.156 4.48L17.15 9.17l1.143 2.923z"/>
  </svg>
);


const MarqueeLogo = ({ children, name }: { children: React.ReactNode, name: string }) => (
  <div className="flex items-center gap-2 mx-8 group cursor-pointer">
    <div className="text-gray-500 group-hover:text-purple-400 transition-colors duration-300 filter grayscale group-hover:grayscale-0">
      {children}
    </div>
    <span className="text-xl font-semibold text-gray-500 group-hover:text-purple-400 transition-colors duration-300">{name}</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div 
    variants={fadeInUp}
    className="relative p-8 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-white/5 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02] group"
  >
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-shadow duration-300">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const TestimonialCard = ({ data }: { data: Testimonial }) => (
  <div className="min-w-[300px] md:min-w-[350px] p-8 rounded-2xl bg-gray-900/60 backdrop-blur-xl border-l-4 border-purple-500 shadow-xl mx-4">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />
      ))}
    </div>
    <p className="text-lg text-gray-200 italic mb-6">"{data.quote}"</p>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
        {data.initials}
      </div>
      <div>
        <h4 className="text-white font-semibold">{data.name}</h4>
        <p className="text-sm text-gray-400">{data.role}</p>
      </div>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-gray-200 group-hover:text-purple-400 transition-colors">
          {question}
        </span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <Plus className="w-6 h-6 text-purple-500" />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    size: Math.random() > 0.8 ? 3 : 1.5
  }));

  const testimonials: Testimonial[] = [
    { name: "Sarah Chen", role: "Product Designer", initials: "SC", quote: "Brainly AI transformed how I organize research. I can finally find that YouTube tutorial I watched months ago!", rating: 5 },
    { name: "Marcus Rodriguez", role: "Content Creator", initials: "MR", quote: "The sharing feature is incredible. I send my curated learning resources to my team weekly.", rating: 5 },
    { name: "Aisha Patel", role: "Engineering Student", initials: "AP", quote: "This is exactly what I needed for organizing all my coding tutorials and documentation links.", rating: 5 }
  ];

  const faqs: FAQ[] = [
    { question: "Is Brainly AI free to use?", answer: "Yes! Brainly AI is completely free. Save unlimited content and create shareable brain links at no cost." },
    { question: "What types of content can I save?", answer: "You can save YouTube videos, Twitter posts, articles, documents, and any web link. We automatically extract titles and descriptions." },
    { question: "How does brain sharing work?", answer: "Toggle sharing on in your dashboard to generate a unique link. Anyone with the link can view your curated collection." },
    { question: "Is my data secure?", answer: "Yes, we use industry-standard encryption. Your content is private by default, and you control what gets shared." },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-purple-500/30 font-sans overflow-x-hidden">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .star-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .float-delay-1 { animation: float 6s ease-in-out infinite; }
        .float-delay-2 { animation: float 7s ease-in-out infinite 1s; }
        .float-delay-3 { animation: float 5s ease-in-out infinite 0.5s; }
      `}</style>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-950/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Brainly AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Stories</a>
            <button onClick={() => window.location.href = '/signin'} className="bg-indigo-600 hover:bg-purple-600 text-white px-5 py-2 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-purple-500/40">
              Sign In
            </button>
          </div>
          <div className="md:hidden">
            <Menu className="w-6 h-6" />
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white star-twinkle"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: star.delay
              }}
            />
          ))}
        </div>

        <div className="absolute top-[-20%] left-0 w-full h-[600px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute top-[-20%] right-0 w-full h-[600px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-75" />

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium backdrop-blur-sm">
                ✨ The Ultimate Second Brain
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
            >
              Your Second Brain for <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                Digital Content
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Store, organize, and share your important YouTube videos, tweets, articles, and links in one intelligent space.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-gray-800/50 hover:bg-gray-800 text-white border border-purple-500/30 hover:border-purple-500/50 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-current" /> Watch Demo
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="relative mt-20 h-32 hidden md:block"
            >
              <div className="absolute left-1/4 top-0 p-4 bg-gray-900/80 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl float-delay-1">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/20 p-2 rounded-lg"><YoutubeIcon /></div>
                  <div className="space-y-2">
                    <div className="h-2 w-24 bg-gray-700 rounded"/>
                    <div className="h-2 w-16 bg-gray-700 rounded"/>
                  </div>
                </div>
              </div>

              <div className="absolute right-1/4 top-10 p-4 bg-gray-900/80 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl float-delay-2">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg"><Twitter className="w-5 h-5 text-blue-400" /></div>
                  <div className="space-y-2">
                    <div className="h-2 w-32 bg-gray-700 rounded"/>
                    <div className="h-2 w-20 bg-gray-700 rounded"/>
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 -top-10 p-4 bg-gray-900/80 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl float-delay-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg"><FileText className="w-5 h-5 text-gray-200" /></div>
                  <div className="space-y-2">
                    <div className="h-2 w-28 bg-gray-700 rounded"/>
                    <div className="h-2 w-24 bg-gray-700 rounded"/>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Logo Marquee */}
      <section className="py-10 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
        
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex">
                <MarqueeLogo name="YouTube"><YoutubeIcon /></MarqueeLogo>
                <MarqueeLogo name="Twitter"><Twitter className="w-6 h-6" /></MarqueeLogo>
                <MarqueeLogo name="Drive"><GoogleDriveIcon /></MarqueeLogo>
                <MarqueeLogo name="Notion"><NotionIcon /></MarqueeLogo>
                <MarqueeLogo name="GitHub"><Github className="w-6 h-6" /></MarqueeLogo>
                <MarqueeLogo name="LinkedIn"><Linkedin className="w-6 h-6" /></MarqueeLogo>
                <MarqueeLogo name="Medium"><FileText className="w-6 h-6" /></MarqueeLogo>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Supercharge Your <span className="text-purple-400">Memory</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to capture, organize, and retrieve your digital life.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FeatureCard 
              icon={Brain}
              title="Intelligent Storage"
              description="Automatically organize your content with AI-powered tagging and categorization. No more manual sorting."
              delay={0}
            />
            <FeatureCard 
              icon={LinkIcon}
              title="Universal Capture"
              description="One-click saving from any platform. Works seamlessly with YouTube, Twitter, Medium, and any web URL."
              delay={0.15}
            />
            <FeatureCard 
              icon={Share2}
              title="Shareable Brain Links"
              description="Create public links to share your curated collections with teams, friends, or the world in seconds."
              delay={0.3}
            />
            <FeatureCard 
              icon={Search}
              title="Instant Recall"
              description="Search across all your saved content with lightning-fast results and smart filters."
              delay={0.45}
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gray-900/30 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">How It Works</h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dotted border-purple-500/30 z-0" />

            {[
              { num: 1, title: "Sign In", desc: "Connect with your Google account in seconds." },
              { num: 2, title: "Save Content", desc: "Paste links or use our extension to save instantly." },
              { num: 3, title: "Access & Share", desc: "Search your brain or share collections with a link." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gray-900 border border-purple-500/50 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(147,51,234,0.2)]">
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-center">Loved by <span className="text-indigo-400">Creators</span></h2>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto pb-12 hide-scrollbar snap-x px-6 md:justify-center">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <TestimonialCard data={t} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Start Building Your Second Brain</h2>
            <p className="text-xl text-gray-300 mb-10">Join thousands organizing their digital knowledge. Free forever.</p>
            <button className="px-10 py-5 bg-white text-indigo-900 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl">
              Get Started Free
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-purple-500/20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-purple-500" />
                <span className="font-bold text-xl">Brainly AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your intelligent space for digital content.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-purple-400 cursor-pointer">Features</li>
                <li className="hover:text-purple-400 cursor-pointer">Integrations</li>
                <li className="hover:text-purple-400 cursor-pointer">Pricing</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-purple-400 cursor-pointer">About</li>
                <li className="hover:text-purple-400 cursor-pointer">Blog</li>
                <li className="hover:text-purple-400 cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-900 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 Brainly AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;