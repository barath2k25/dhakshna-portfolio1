export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__copy">
          © {new Date().getFullYear()} Dhakshnamoorthy S — Finance &amp; Accounting
        </span>
        <span className="footer__copy" style={{ display: 'flex', gap: '1rem' }}>
          <span>$ ₹ €</span>
          <span>Chennai, India</span>
        </span>
      </div>
    </footer>
  );
}
