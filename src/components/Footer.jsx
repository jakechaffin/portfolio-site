// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Jake Chaffin</span>
        <a href="mailto:hello@jakechaffin.com">hello@jakechaffin.com</a>
      </div>
    </footer>
  );
}
