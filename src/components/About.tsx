import { motion, useReducedMotion } from 'framer-motion';
import { User } from 'lucide-react';
import { fadeUp, viewportOnce } from '../lib/motion';

interface AboutProps {
  photoSrc?: string;
}

export default function About({ photoSrc }: AboutProps) {
  const shouldReduce = useReducedMotion();

  const motionProps = shouldReduce
    ? {}
    : {
        variants: fadeUp,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: viewportOnce,
      };

  return (
    <section className="section" id="about" aria-label="About">
      <div className="container">
        <motion.div {...motionProps}>
          <div className="section__header">
            <span className="eyebrow">About</span>
          </div>

          <div className="about__layout">
            {/* Photo or placeholder */}
            <div>
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt="Dhakshnamoorthy S — portrait"
                  className="about__photo"
                  loading="lazy"
                />
              ) : (
                <div className="about__photo-placeholder" role="img" aria-label="Headshot placeholder">
                  <User size={64} strokeWidth={0.8} color="var(--rule)" />
                </div>
              )}
            </div>

            {/* Copy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <h2>Who I am <span className="float-s" style={{ display: 'inline-block', color: 'var(--ink-soft)', opacity: 0.7 }}>₹</span><span className="float-m" style={{ display: 'inline-block', color: 'var(--ink-soft)', opacity: 0.7, marginLeft: '0.2rem' }}>$</span></h2>
              <p>
                I'm a finance student at Loyola College, Chennai, with a strong foundation in accounting,
                economics, and financial systems. I pick up new concepts quickly and think analytically
                under pressure — sharpened across internships spanning retail banking, equity research,
                and business operations.
              </p>
              <p>
                I'm looking for a finance internship where I can put that to work on a performance-driven team.
              </p>

              {/* Quick facts in mono */}
              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  ['Location', 'Chennai, India'],
                  ['Degree',   'B.Com Accounting & Finance'],
                  ['College',  'Loyola College, Chennai'],
                  ['Expected', 'May 2027'],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-soft)',
                        opacity: 0.5,
                        minWidth: '80px',
                      }}
                    >
                      {label}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
