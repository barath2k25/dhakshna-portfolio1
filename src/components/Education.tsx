import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, staggerChild, viewportOnce } from '../lib/motion';

const educationData = [
  {
    school: 'Loyola College, Chennai',
    degree: 'Bachelor of Commerce — Accounting and Finance',
    detail: null,
    period: 'Expected May 2027',
  },
  {
    school: 'Sri Vishwa Vidhyalaya Hr. Sec. School, Vandalur',
    degree: 'Class XII',
    detail: '96.25% overall · 100/100 in Commerce',
    period: 'May 2022',
  },
];

export default function Education() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section" id="education" aria-label="Education">
      <div className="container">
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial={shouldReduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="section__header" variants={shouldReduce ? {} : staggerChild}>
            <span className="eyebrow">Education</span>
          </motion.div>

          <div className="edu__list">
            {educationData.map((edu) => (
              <motion.div
                key={edu.school}
                className="edu__item"
                variants={shouldReduce ? {} : staggerChild}
              >
                <div>
                  <div className="edu__school">{edu.school}</div>
                  <div className="edu__degree">{edu.degree}</div>
                  {edu.detail && <div className="edu__detail mono">{edu.detail}</div>}
                </div>
                <div className="edu__period">{edu.period}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
