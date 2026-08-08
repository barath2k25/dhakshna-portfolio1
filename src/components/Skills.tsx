import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, staggerChild, viewportOnce } from '../lib/motion';

interface SkillGroup {
  label: string;
  tags: string[];
}

const skillGroups: SkillGroup[] = [
  {
    label: 'Technical & Financial',
    tags: [
      'Banking Operations Management',
      'Financial Statement Analysis',
      'Tally ERP',
      'MS Excel',
    ],
  },
  {
    label: 'Analytical & Strategic',
    tags: ['Problem Solving', 'Strategic Thinking', 'Fast Learner'],
  },
  {
    label: 'Teamwork & Leadership',
    tags: ['Collaboration', 'Peer Mentorship', 'Communication'],
  },
];

function SkillTag({ tag }: { tag: string }) {
  return (
    <span className="skills__tag" tabIndex={0}>
      {tag}
    </span>
  );
}

export default function Skills() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section" id="skills" aria-label="Skills">
      <div className="container">
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial={shouldReduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="section__header" variants={shouldReduce ? {} : staggerChild}>
            <span className="eyebrow">Skills</span>
          </motion.div>

          <div className="skills__groups">
            {skillGroups.map((group) => (
              <motion.div
                key={group.label}
                className="skills__group"
                variants={shouldReduce ? {} : staggerChild}
              >
                <span className="skills__group-label">{group.label}</span>
                <div className="skills__tags" role="list">
                  {group.tags.map((tag) => (
                    <SkillTag key={tag} tag={tag} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
