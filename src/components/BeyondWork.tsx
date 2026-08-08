import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, staggerChild, viewportOnce } from '../lib/motion';

interface BeyondItem {
  title: string;
  description: string;
  meta: string;
}

const items: BeyondItem[] = [
  {
    title: 'Tang Soo Do',
    description: 'Discipline and focus that carries into how I work.',
    meta: '10+ years',
  },
  {
    title: 'Markets & Personal Finance',
    description: 'I actively follow and invest in the stock market.',
    meta: 'Ongoing',
  },
  {
    title: 'Fitness',
    description: 'Strength training and swimming.',
    meta: 'Daily',
  },
];

export default function BeyondWork() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section" id="beyond" aria-label="Beyond Work">
      <div className="container">
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial={shouldReduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="section__header" variants={shouldReduce ? {} : staggerChild}>
            <span className="eyebrow">Beyond Work</span>
          </motion.div>

          <div className="beyond__list">
            {items.map((item) => (
              <motion.div
                key={item.title}
                className="beyond__item"
                variants={shouldReduce ? {} : staggerChild}
              >
                <div>
                  <div className="beyond__title">{item.title}</div>
                  <div className="beyond__desc">{item.description}</div>
                </div>
                <div className="beyond__meta">{item.meta}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
