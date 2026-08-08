import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, MapPin, Download, ExternalLink } from 'lucide-react';
import { staggerContainer, staggerChild, viewportOnce } from '../lib/motion';

const LINKEDIN_URL = '#'; // Replace with actual LinkedIn URL

const contactDetails = [
  {
    label: 'Email',
    value: 'dhakshnamoorthy2112@gmail.com',
    href: 'mailto:dhakshnamoorthy2112@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    value: '+91 93822 16161',
    href: 'tel:+919382216161',
    icon: Phone,
  },
  {
    label: 'Location',
    value: 'Chennai, India',
    href: null,
    icon: MapPin,
  },
  {
    label: 'LinkedIn',
    value: 'Add your LinkedIn URL',
    href: LINKEDIN_URL,
    icon: ExternalLink,
    placeholder: true,
  },
];

export default function Contact() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section" id="contact" aria-label="Contact">
      <div className="container">
        <motion.div
          className="contact__layout"
          variants={shouldReduce ? {} : staggerContainer}
          initial={shouldReduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Left: headline + CTA */}
          <motion.div variants={shouldReduce ? {} : staggerChild}>
            <span className="eyebrow" style={{ marginBottom: '1.2rem', display: 'block' }}>Contact</span>
            <h2 className="contact__headline">
              Open to internship opportunities
            </h2>
            <p className="contact__subtitle">
              If you're looking for someone who can hit the ground running in equity research, banking, or financial analysis — let's talk.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="mailto:dhakshnamoorthy2112@gmail.com"
                className="btn-primary"
                style={{ width: 'fit-content' }}
                id="contact-email-btn"
              >
                <Mail size={13} strokeWidth={1.75} />
                Send an email
              </a>
              <a
                href="/resume.pdf"
                download
                className="btn-ghost"
                style={{ width: 'fit-content', display: 'inline-flex', alignItems: 'center', gap: '0.4em' }}
                id="contact-download-resume"
              >
                <Download size={12} strokeWidth={1.75} />
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right: contact details */}
          <motion.div variants={shouldReduce ? {} : staggerChild}>
            <div className="contact__items">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="contact__item">
                    <span className="contact__item-label">{item.label}</span>
                    <div className="contact__item-value" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Icon size={13} strokeWidth={1.5} color="var(--ink-soft)" style={{ opacity: 0.5, flexShrink: 0 }} />
                      {item.href ? (
                        <a
                          href={item.href}
                          aria-label={`${item.label}: ${item.value}`}
                          style={item.placeholder ? { opacity: 0.4, fontStyle: 'italic' } : {}}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span>{item.value}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
