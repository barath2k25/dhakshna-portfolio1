import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Download, Mail, Phone, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';
import Nav from './components/Nav';
import Footer from './components/Footer';

/* ─────────────────── COUNT UP ─────────────────── */
function CountUp({
  target, suffix = '', decimals = 0, duration = 1200, delay = 0
}: { target: number; suffix?: string; decimals?: number; duration?: number; delay?: number }) {
  const shouldReduce = useReducedMotion();
  const [val, setVal] = useState(shouldReduce ? target : 0);
  const frame = useRef<number>(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (shouldReduce) { setVal(target); return; }
    timer.current = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(parseFloat((eased * target).toFixed(decimals)));
        if (p < 1) frame.current = requestAnimationFrame(step);
        else setVal(target);
      };
      frame.current = requestAnimationFrame(step);
    }, delay);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      cancelAnimationFrame(frame.current);
    };
  }, [target, duration, decimals, shouldReduce, delay]);

  const disp = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString();
  return <>{disp}{suffix}</>;
}

/* ─────────────────── REUSABLE ANIMATED FINANCE PHOTO CARD ─────────────────── */
function FinancePhotoCard({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`glass-card ${className}`}
      style={{
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(160deg, #0c0a08 0%, #171105 50%, #0c0a08 100%)',
        border: '1px solid rgba(212, 168, 83, 0.35)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 168, 83, 0.1)',
        ...style,
      }}
    >
      {/* ── Ambient Radial Glow Orbs ── */}
      <motion.div
        style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: '220px', height: '220px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,168,83,0.25) 0%, transparent 70%)',
          filter: 'blur(30px)', pointerEvents: 'none', zIndex: 1,
        }}
        animate={{ x: [0, 25, 0], y: [0, 18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', bottom: '5%', right: '-10%',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,168,83,0.2) 0%, transparent 70%)',
          filter: 'blur(30px)', pointerEvents: 'none', zIndex: 1,
        }}
        animate={{ x: [0, -20, 0], y: [0, -22, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* ── Financial Grid Pattern Overlay ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(212,168,83,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,168,83,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Floating Finance Background Items (strictly zIndex: 15, ABOVE PHOTO) ── */}

      {/* 💵 Dollar bundle — top-left */}
      <motion.div
        style={{
          position: 'absolute', top: '6%', left: '5%',
          fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px rgba(212,168,83,0.7))',
          zIndex: 15, userSelect: 'none',
        }}
        animate={{ y: [0, -12, 0], rotate: [-6, 6, -6], scale: [1, 1.06, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >💵</motion.div>

      {/* 💰 Money Stack — top-right */}
      <motion.div
        style={{
          position: 'absolute', top: '5%', right: '6%',
          fontSize: '2.4rem', filter: 'drop-shadow(0 0 10px rgba(212,168,83,0.7))',
          zIndex: 15, userSelect: 'none',
        }}
        animate={{ y: [0, -14, 0], rotate: [6, -6, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >💰</motion.div>

      {/* 🧮 Calculator — mid-left */}
      <motion.div
        style={{
          position: 'absolute', top: '34%', left: '4%',
          fontSize: '2rem', filter: 'drop-shadow(0 0 8px rgba(212,168,83,0.5))',
          zIndex: 15, userSelect: 'none',
        }}
        animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >🧮</motion.div>

      {/* 📈 Stock Chart — mid-right */}
      <motion.div
        style={{
          position: 'absolute', top: '32%', right: '4%',
          fontSize: '2.2rem', filter: 'drop-shadow(0 0 10px rgba(212,168,83,0.6))',
          zIndex: 15, userSelect: 'none',
        }}
        animate={{ y: [0, -12, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >📈</motion.div>

      {/* 💸 Money flying — bottom-left */}
      <motion.div
        style={{
          position: 'absolute', bottom: '22%', left: '5%',
          fontSize: '2.3rem', filter: 'drop-shadow(0 0 10px rgba(212,168,83,0.5))',
          zIndex: 15, userSelect: 'none',
        }}
        animate={{ y: [0, -10, 0], rotate: [-8, 8, -8] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >💸</motion.div>

      {/* 💼 Briefcase — bottom-right */}
      <motion.div
        style={{
          position: 'absolute', bottom: '22%', right: '5%',
          fontSize: '2rem', filter: 'drop-shadow(0 0 8px rgba(212,168,83,0.4))',
          zIndex: 15, userSelect: 'none',
        }}
        animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >💼</motion.div>

      {/* ₹ Rupee symbol — floating */}
      <motion.div
        style={{
          position: 'absolute', top: '18%', left: '20%',
          fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 900,
          color: 'var(--gold)', textShadow: '0 0 16px rgba(212,168,83,0.9)',
          zIndex: 15, userSelect: 'none',
        }}
        animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      >₹</motion.div>

      {/* $ Dollar symbol — floating */}
      <motion.div
        style={{
          position: 'absolute', top: '18%', right: '20%',
          fontFamily: 'var(--font-mono)', fontSize: '2.2rem', fontWeight: 900,
          color: 'var(--gold)', textShadow: '0 0 16px rgba(212,168,83,0.9)',
          zIndex: 15, userSelect: 'none',
        }}
        animate={{ y: [0, -12, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
      >$</motion.div>

      {/* 🪙 Gold coins floating around */}
      {[
        { top: '12%', left: '42%', size: '1.4rem', delay: 0.2 },
        { top: '48%', left: '8%', size: '1.3rem', delay: 1.4 },
        { top: '46%', right: '8%', size: '1.3rem', delay: 1.8 },
      ].map((c, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', top: c.top, left: (c as any).left, right: (c as any).right,
            fontSize: c.size, zIndex: 15, userSelect: 'none',
          }}
          animate={{ y: [0, -8, 0], rotate: [0, 360, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
        >🪙</motion.div>
      ))}

      {/* ── Photo ── */}
      <img
        src="/profile_intro.jpg"
        alt="Dhakshnamoorthy S — Finance Professional"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 10,
          display: 'block',
          pointerEvents: 'none',
        }}
      />

      {/* ── Role Badge at bottom ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
        background: 'linear-gradient(to top, rgba(10,8,5,0.97) 0%, rgba(10,8,5,0.5) 50%, transparent 100%)',
        padding: '2.5rem 1.5rem 1.2rem',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
          Finance &amp; Accounting
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--cream)' }}>
          Loyola College, Chennai
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── EXPERIENCE DATA ─────────────────── */
const experiences = [
  {
    company: 'LKR Advisors',
    role: 'Equity Research Intern',
    period: 'Apr – May 2026',
    accent: true,
    bullets: [
      'Equity research on annual reports, financial statements & sectoral data (CRISIL, ICRA)',
      'Mutual fund evaluation — category, AUM, performance (Value Research, Tijori)',
      'Stock / fund screening (Screener, Tijori); DCF & comparable-company valuation',
      'Investor-facing content on financial planning',
    ],
  },
  {
    company: 'Indian Overseas Bank',
    role: 'Banking Intern',
    period: 'May – Jun 2025',
    bullets: [
      'Account opening, KYC, customer service',
      'Daily transactions, BRS, Tally data entry',
      'Loan documentation, GST compliance',
    ],
  },
  {
    company: 'Paper4Good',
    role: 'Operations Intern',
    period: 'Aug – Sep 2024',
    bullets: [
      'Data handling & reporting for organizational records — accuracy and on-time submission',
    ],
  },
];

const educationData = [
  {
    school: 'Loyola College, Chennai',
    degree: 'Bachelor of Commerce — Accounting and Finance',
    detail: null,
    period: 'Expected May 2027',
  },
  {
    school: 'Sri Vishwa Vidhyalaya Hr. Sec. School',
    degree: 'Class XII',
    detail: '96.25% overall · 100/100 in Commerce',
    period: 'May 2022',
  },
];

const skillGroups = [
  { label: 'Technical & Financial', tags: ['Banking Operations', 'Financial Statement Analysis', 'Tally ERP', 'MS Excel', 'DCF Valuation', 'Equity Research'] },
  { label: 'Analytical & Strategic', tags: ['Problem Solving', 'Strategic Thinking', 'Fast Learner', 'Data Analysis'] },
  { label: 'Teamwork & Leadership', tags: ['Collaboration', 'Peer Mentorship', 'Communication', 'Client Relations'] },
];

const beyondItems = [
  { title: 'Tang Soo Do', desc: 'Discipline and focus that carries into how I work.', meta: '10+ years' },
  { title: 'Markets & Finance', desc: 'I actively follow and invest in the stock market.', meta: 'Ongoing' },
  { title: 'Fitness', desc: 'Strength training and swimming for peak performance.', meta: 'Daily' },
];

const contactDetails = [
  { label: 'Email', value: 'dhakshnamoorthy2112@gmail.com', href: 'mailto:dhakshnamoorthy2112@gmail.com', Icon: Mail },
  { label: 'Phone', value: '+91 93822 16161', href: 'tel:+919382216161', Icon: Phone },
  { label: 'Location', value: 'Chennai, India', href: null, Icon: MapPin },
  { label: 'LinkedIn', value: 'Add your LinkedIn URL', href: '#', Icon: ExternalLink, placeholder: true },
];

const tickerItems = ['$ Equity Research', '₹ Banking Operations', '% Financial Analysis', '$ DCF Valuation', '₹ Investment Research', '$ CRISIL · ICRA', '₹ Tally ERP', '% Stock Screening', '$ Mutual Funds', '₹ GST Compliance'];

/* ─────────────────── MAIN APP ─────────────────── */
export default function App() {
  const shouldReduce = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);

  // Intro: 2.5s hold then fade out
  useEffect(() => {
    if (shouldReduce) { setIntroComplete(true); return; }
    const t = setTimeout(() => setIntroComplete(true), 2800);
    return () => clearTimeout(t);
  }, [shouldReduce]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' as const },
    }),
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
  };

  return (
    <>
      {/* ── INTRO OVERLAY ── */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            className="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Sleek card-framed intro portrait */}
            <motion.div
              className="intro-photo-wrap"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <img src="/profile_intro.jpg" alt="Dhakshnamoorthy S" className="intro-photo" />
              <motion.div
                className="intro-name"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Dhakshnamoorthy S
              </motion.div>
            </motion.div>

            {/* Floating finance symbols in intro background */}
            {['💵', '💰', '₹', '$', '📈', '🧮', '🪙'].map((sym, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${[18, 72, 22, 68, 42, 80, 28][i]}%`,
                  left: `${[8, 12, 82, 80, 88, 75, 15][i]}%`,
                  fontSize: `${[2.2, 2.5, 2.0, 2.4, 2.0, 1.8, 1.6][i]}rem`,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  opacity: 0.75,
                  textShadow: '0 0 14px rgba(212,168,83,0.6)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: [0.3, 0.8, 0.5],
                  y: [20, 0, -10],
                }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  y: {
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 2.2 + i * 0.4,
                    ease: 'easeInOut',
                  }
                }}
              >
                {sym}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip link */}
      <a href="#about" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
        Skip to main content
      </a>

      {/* Ambient glow blobs */}
      <div style={{
        position: 'fixed', top: '10%', left: '0', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)',
        zIndex: -1, pointerEvents: 'none', filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'fixed', bottom: '5%', right: '0', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)',
        zIndex: -1, pointerEvents: 'none', filter: 'blur(60px)',
      }} />

      <Nav />

      <main>
        {/* ── TICKER ── */}
        <motion.div
          className="ticker-bar"
          style={{ marginTop: '3.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: introComplete ? 0.1 : 3.0, duration: 0.5 }}
        >
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span className="ticker-item" key={i}>◆ {item}</span>
            ))}
          </div>
        </motion.div>

        {/* ── BENTO HERO ── */}
        <section id="hero" aria-label="Introduction">
          <div className="bento-wrapper">
            <div className="bento-grid">

              {/* CARD 1: Name + Tagline */}
              <motion.div
                className="glass-card bento-name-card"
                custom={0} variants={cardVariants}
                initial="hidden" animate={introComplete ? 'visible' : 'hidden'}
              >
                <div>
                  <div className="bento-eyebrow">Finance &amp; Accounting</div>
                  <div className="bento-name">Dhakshnamoorthy S</div>
                  <p className="bento-tagline">
                    Turning financial statements into decisions — equity research and banking internships, applied.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <a href="/resume.pdf" download className="btn-primary" id="hero-download-resume">
                      <Download size={13} strokeWidth={1.75} />
                      Resume
                    </a>
                    <a href="#contact" className="btn-ghost" id="hero-get-in-touch">
                      Contact
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* CARD 2: Animated Finance Photo Card (Bento center) */}
              <motion.div
                custom={1} variants={cardVariants}
                initial="hidden" animate={introComplete ? 'visible' : 'hidden'}
                style={{ gridColumn: '2', gridRow: '1 / 3' }}
              >
                <FinancePhotoCard style={{ height: '100%', minHeight: '420px' }} />
              </motion.div>

              {/* CARD 3: Stats */}
              <motion.div
                className="glass-card bento-stats-card"
                custom={2} variants={cardVariants}
                initial="hidden" animate={introComplete ? 'visible' : 'hidden'}
              >
                <div className="bento-eyebrow" style={{ marginBottom: 0 }}>Key Numbers</div>

                <div className="stat-item">
                  <div className="stat-value">
                    <CountUp target={96.25} decimals={2} suffix="%" duration={1400} delay={introComplete ? 200 : 9999} />
                  </div>
                  <div className="stat-label">Class XII Score</div>
                </div>

                <div className="stat-item">
                  <div className="stat-value">
                    <CountUp target={3} suffix="" duration={900} delay={introComplete ? 400 : 9999} />
                  </div>
                  <div className="stat-label">Internships Completed</div>
                </div>

                <div className="stat-item">
                  <div className="stat-value">
                    <CountUp target={10} suffix="+" duration={900} delay={introComplete ? 600 : 9999} />
                  </div>
                  <div className="stat-label">Years Tang Soo Do</div>
                </div>

                <div className="stat-item">
                  <div className="stat-value" style={{ fontSize: '1.1rem', display: 'flex', gap: '0.5rem' }}>
                    <span>$</span><span>₹</span><span>€</span>
                  </div>
                  <div className="stat-label">Multilingual Markets</div>
                </div>
              </motion.div>

              {/* CARD 4: About snippet */}
              <motion.div
                className="glass-card bento-about-card"
                custom={3} variants={cardVariants}
                initial="hidden" animate={introComplete ? 'visible' : 'hidden'}
              >
                <div className="bento-eyebrow" style={{ marginBottom: '0.8rem' }}>About</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.75 }}>
                  I'm a finance student at Loyola College, Chennai, with a strong foundation in accounting, 
                  economics, and financial systems. I think analytically under pressure — sharpened across 
                  internships spanning retail banking, equity research, and business operations.
                </p>
                <a href="#about" className="arrow-link" style={{ marginTop: '1.2rem', display: 'inline-flex' }}>
                  Learn more <ArrowUpRight size={13} />
                </a>
              </motion.div>

              {/* CARD 5: Contact CTA */}
              <motion.div
                className="glass-card bento-contact-card"
                custom={4} variants={cardVariants}
                initial="hidden" animate={introComplete ? 'visible' : 'hidden'}
                onClick={() => window.location.href = '#contact'}
              >
                <div>
                  <div className="contact-card-label">Open to opportunities</div>
                </div>
                <div className="contact-card-cta">
                  Let's talk
                </div>
                <div className="arrow-link">
                  Contact me <ArrowUpRight size={13} />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── ABOUT SECTION ── */}
        <section id="about" className="portfolio-section" aria-label="About">
          <div className="container">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="section-header">
                <span className="eyebrow">About</span>
                <div className="section-line" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
                {/* About me photo with matching animated finance card background */}
                <div>
                  <FinancePhotoCard style={{ width: '100%', aspectRatio: '3/4', borderRadius: '18px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <h2 style={{ color: 'var(--cream)' }}>
                    Who I am{' '}
                    <motion.span
                      style={{ display: 'inline-block', color: 'var(--gold)' }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >₹</motion.span>
                    <motion.span
                      style={{ display: 'inline-block', color: 'var(--gold)', marginLeft: '0.3rem' }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >$</motion.span>
                  </h2>
                  <p>
                    I'm a finance student at Loyola College, Chennai, with a strong foundation in accounting,
                    economics, and financial systems. I pick up new concepts quickly and think analytically
                    under pressure — sharpened across internships spanning retail banking, equity research,
                    and business operations.
                  </p>
                  <p>I'm looking for a finance internship where I can put that to work on a performance-driven team.</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {[
                      ['Location', '📍 Chennai, India'],
                      ['Degree',   '🎓 B.Com Accounting & Finance'],
                      ['College',  '🏛 Loyola College, Chennai'],
                      ['Expected', '📅 May 2027'],
                    ].map(([label, val]) => (
                      <div key={label} style={{ display: 'flex', gap: '1.2rem', alignItems: 'baseline' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.08em',
                          textTransform: 'uppercase', color: 'var(--gold-dim)', minWidth: '80px',
                        }}>{label}</span>
                        <span style={{ fontSize: '0.92rem', color: 'var(--ink)' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="portfolio-section" aria-label="Experience">
          <div className="container">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              style={{ marginBottom: '3rem' }}
            >
              <div className="section-header">
                <span className="eyebrow">Experience</span>
                <div className="section-line" />
              </div>
            </motion.div>

            <div className="exp-grid">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  className="exp-card"
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  whileHover={{ y: -6 }}
                >
                  <div className="exp-company">
                    {exp.accent && (
                      <span style={{ color: 'var(--gold)', marginRight: '0.4rem' }}>$</span>
                    )}
                    {exp.company}
                  </div>
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-period">{exp.period}</div>
                  <ul className="exp-bullets">
                    {exp.bullets.map(b => (
                      <li key={b} className="exp-bullet">{b}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section id="education" className="portfolio-section" aria-label="Education">
          <div className="container">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="section-header">
                <span className="eyebrow">Education</span>
                <div className="section-line" />
              </div>

              <div className="edu-grid">
                {educationData.map((edu, i) => (
                  <motion.div
                    key={edu.school}
                    className="edu-card"
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="edu-school">🎓 {edu.school}</div>
                    <div className="edu-degree">{edu.degree}</div>
                    {edu.detail && <div className="edu-detail mono">{edu.detail}</div>}
                    <div className="edu-period">{edu.period}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="portfolio-section" aria-label="Skills">
          <div className="container">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="section-header">
                <span className="eyebrow">Skills</span>
                <div className="section-line" />
              </div>

              <div className="skills-grid">
                {skillGroups.map((group, gi) => (
                  <motion.div
                    key={group.label}
                    className="skill-row"
                    custom={gi}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                  >
                    <span className="skill-row-label">{group.label}</span>
                    <div className="skill-tags">
                      {group.tags.map((tag, ti) => (
                        <motion.span
                          key={tag}
                          className="skill-tag"
                          custom={ti}
                          variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: (i: number) => ({
                              opacity: 1, scale: 1,
                              transition: { delay: gi * 0.1 + i * 0.05, duration: 0.4, ease: 'easeOut' as const }
                            })
                          }}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          tabIndex={0}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BEYOND WORK ── */}
        <section id="beyond" className="portfolio-section" aria-label="Beyond Work">
          <div className="container">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="section-header">
                <span className="eyebrow">Beyond Work</span>
                <div className="section-line" />
              </div>

              <div className="beyond-grid">
                {beyondItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="beyond-card"
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div>
                      <div className="beyond-title">{item.title}</div>
                      <div className="beyond-desc">{item.desc}</div>
                    </div>
                    <div className="beyond-meta">{item.meta}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="portfolio-section" aria-label="Contact">
          <div className="container">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="section-header">
                <span className="eyebrow">Contact</span>
                <div className="section-line" />
              </div>

              <div className="contact-bento">
                {/* CTA Card */}
                <motion.div
                  className="contact-cta-card"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="eyebrow" style={{ marginBottom: '1rem', display: 'block' }}>Open to opportunities</span>
                  <h2 className="contact-headline">Let's work together</h2>
                  <p className="contact-sub">
                    If you're looking for someone who can hit the ground running in equity research, banking, or financial analysis — let's talk.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a href="mailto:dhakshnamoorthy2112@gmail.com" className="btn-primary" id="contact-email-btn">
                      <Mail size={13} strokeWidth={1.75} />
                      Send an email
                    </a>
                    <a href="/resume.pdf" download className="btn-ghost" id="contact-download-resume">
                      <Download size={12} strokeWidth={1.75} />
                      Download Resume
                    </a>
                  </div>
                </motion.div>

                {/* Details Card */}
                <motion.div
                  className="contact-details-card"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  {contactDetails.map(({ label, value, href, Icon, placeholder }) => (
                    <div key={label} className="contact-row">
                      <div className="contact-row-label">{label}</div>
                      <div className="contact-row-val" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Icon size={13} strokeWidth={1.5} color="var(--gold-dim)" style={{ flexShrink: 0 }} />
                        {href ? (
                          <a href={href} style={placeholder ? { opacity: 0.4, fontStyle: 'italic' } : {}}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >{value}</a>
                        ) : (
                          <span>{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
