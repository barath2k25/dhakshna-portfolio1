import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import {
  drawRuleHorizontal,
  heroStatsContainer,
  heroStatItem,
  staggerContainer,
  staggerChild,
} from '../lib/motion';

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  startDelay?: number;
}

function CountUp({ target, suffix = '', prefix = '', decimals = 0, duration = 1000, startDelay = 0 }: CountUpProps) {
  const shouldReduce = useReducedMotion();
  const [value, setValue] = useState(shouldReduce ? target : 0);
  const frameRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (shouldReduce) {
      setValue(target);
      return;
    }
    timerRef.current = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(parseFloat((eased * target).toFixed(decimals)));
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          setValue(target);
        }
      };
      frameRef.current = requestAnimationFrame(step);
    }, startDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, decimals, shouldReduce, startDelay]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString();
  return <>{prefix}{display}{suffix}</>;
}

const stats = [
  { value: 96.25, decimals: 2, suffix: '%', label: 'Class XII Score', delay: 700  },
  { value: 3,     decimals: 0, suffix: '',  label: 'Internships',      delay: 850  },
  { value: 10,    decimals: 0, suffix: '+', label: 'Yrs Tang Soo Do',  delay: 1000 },
];

export default function Hero({ photoSrc }: { photoSrc?: string }) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="hero container" id="hero" aria-label="Introduction">
      <div className="hero__main-grid">
        {/* Left Side: Info & CTAs */}
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
        >
          {/* Top eyebrow */}
          <motion.div
            className="hero__eyebrow eyebrow"
            variants={shouldReduce ? {} : staggerChild}
            transition={{ delay: 0.1 }}
          >
            Finance &amp; Accounting
          </motion.div>

          <motion.h1 className="hero__name" variants={shouldReduce ? {} : staggerChild}>
            Dhakshnamoorthy S
          </motion.h1>

          <motion.p className="hero__tagline" variants={shouldReduce ? {} : staggerChild}>
            Turning financial statements into decisions — equity research and banking internships, applied.
          </motion.p>

          <motion.p className="hero__description" variants={shouldReduce ? {} : staggerChild}>
            Finance student at Loyola College, Chennai. Seeking internships in banking, equity research, and financial analysis.
          </motion.p>

          <motion.div className="hero__ctas" variants={shouldReduce ? {} : staggerChild}>
            <a
              href="/resume.pdf"
              className="btn-primary"
              download
              aria-label="Download resume PDF"
              id="hero-download-resume"
            >
              <Download size={13} strokeWidth={1.75} />
              Download Resume
            </a>
            <a href="#contact" className="btn-ghost" id="hero-get-in-touch">
              Get in touch <ArrowRight size={12} strokeWidth={1.75} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '0.2em' }} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Photo with floating finance accents */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ position: 'relative' }}
        >
          {photoSrc && (
            <div className="hero__image-container pulse-g">
              <img
                src={photoSrc}
                alt="Dhakshnamoorthy S"
                className="hero__image"
              />

              {/* Orbiting finance symbols with keyframe float classes */}
              <div className="hero__symbol float-s" style={{ top: '-10%', left: '10%' }}>$</div>
              <div className="hero__symbol float-m" style={{ bottom: '-5%', right: '5%' }}>₹</div>
              <div className="hero__symbol float-f" style={{ top: '15%', right: '-15%' }}>📈</div>
              <div className="hero__symbol float-s" style={{ bottom: '15%', left: '-15%' }}>📊</div>
              <div className="hero__symbol float-m" style={{ top: '-15%', right: '20%' }}>%</div>
              <div className="hero__symbol float-f" style={{ bottom: '-10%', left: '25%' }}>💰</div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Stats block */}
      <div className="hero__stats">
        {/* Animated rule */}
        <motion.div
          className="hero__stats-rule"
          variants={shouldReduce ? {} : drawRuleHorizontal}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
          transition={{ delay: 0.55 }}
        />

        {/* Stats grid */}
        <motion.div
          className="hero__stats-grid"
          variants={shouldReduce ? {} : heroStatsContainer}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="hero__stat"
              variants={shouldReduce ? {} : heroStatItem}
            >
              <span className="hero__stat-value mono">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={1050}
                  startDelay={stat.delay}
                />
              </span>
              <span className="hero__stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
