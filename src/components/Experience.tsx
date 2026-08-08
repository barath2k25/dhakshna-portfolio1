import { motion, useReducedMotion } from 'framer-motion';
import {
  ledgerContainer,
  ledgerRow,
  drawRule,
  fadeUp,
  viewportOnce,
} from '../lib/motion';

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  accent?: boolean;
}

const experiences: ExperienceEntry[] = [
  {
    company: 'LKR Advisors',
    role: 'Intern',
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
    role: 'Intern',
    period: 'May – Jun 2025',
    bullets: [
      'Account opening, KYC, customer service',
      'Daily transactions, BRS, Tally data entry',
      'Loan documentation, GST compliance',
    ],
  },
  {
    company: 'Paper4Good',
    role: 'Intern',
    period: 'Aug – Sep 2024',
    bullets: [
      'Data handling & reporting for organizational records — accuracy and on-time submission',
    ],
  },
];

function LedgerRow({ entry }: { entry: ExperienceEntry }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={`ledger__row${entry.accent ? ' ledger__row--accent' : ''}`}
      variants={shouldReduce ? {} : ledgerRow}
      role="row"
    >
      {/* Red left-edge rule for LKR Advisors */}
      {entry.accent && (
        <motion.div
          className="ledger__row-rule"
          variants={shouldReduce ? {} : drawRule}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div>
        <div className="ledger__company">
          {entry.company}
          <span className="ledger__role-badge">· {entry.role}</span>
        </div>
        <ul className="ledger__bullets" role="list">
          {entry.bullets.map((b) => (
            <li key={b} className="ledger__bullet">
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Period */}
      <div className="ledger__period" role="cell">{entry.period}</div>
    </motion.div>
  );
}

export default function Experience() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section" id="experience" aria-label="Experience">
      <div className="container">
        <motion.div
          variants={shouldReduce ? {} : fadeUp}
          initial={shouldReduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
          style={{ marginBottom: '2rem' }}
        >
          <span className="eyebrow">Experience</span>
        </motion.div>

        {/* Ledger table */}
        <motion.div
          className="ledger"
          role="table"
          aria-label="Work experience ledger"
          variants={shouldReduce ? {} : ledgerContainer}
          initial={shouldReduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Table header */}
          <div className="ledger__header" role="row">
            <span className="ledger__col-head" role="columnheader">Entry</span>
            <span className="ledger__col-head" role="columnheader">Period</span>
          </div>

          {/* Rows */}
          <div className="ledger__body" role="rowgroup">
            {experiences.map((entry) => (
              <LedgerRow key={entry.company} entry={entry} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
