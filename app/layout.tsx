import './globals.css';

export const metadata = {
  title: 'Anya Chika Amaechi — Full-Stack Engineer & IT Consultant',
  description: 'Senior Full-Stack Software Engineer with 9+ years of experience. Next.js, NestJS, Flutter, Spring Boot, IT Consulting.',
  keywords: ['Full-Stack Engineer', 'Next.js', 'NestJS', 'Flutter', 'IT Consultant', 'Nigeria'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CursorProvider />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// ── CURSOR ────────────────────────────────────────────────────────
function CursorProvider() {
  return (
    <>
      <div id="cursor-dot" className="cursor-dot" />
      <div id="cursor-ring" className="cursor-ring" />
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const dot = document.getElementById('cursor-dot');
            const ring = document.getElementById('cursor-ring');
            let mx = 0, my = 0, rx = 0, ry = 0;
            document.addEventListener('mousemove', function(e) {
              mx = e.clientX; my = e.clientY;
              dot.style.left = mx + 'px'; dot.style.top = my + 'px';
            });
            function lerpCursor() {
              rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
              ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
              requestAnimationFrame(lerpCursor);
            }
            lerpCursor();
            document.querySelectorAll('a,button,[class*="card"],[class*="btn"]').forEach(function(el) {
              el.addEventListener('mouseenter', function() { ring.classList.add('hovering'); });
              el.addEventListener('mouseleave', function() { ring.classList.remove('hovering'); });
            });
          })();
        `
      }} />
    </>
  );
}

// ── NAVIGATION ───────────────────────────────────────────────────
function Navigation() {
  return (
    <>
      <style>{`
        #main-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 1.25rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(5, 5, 8, 0.7);
          border-bottom: 1px solid var(--border);
          transition: all 0.4s;
        }
        #main-nav.scrolled {
          padding: 0.85rem 3rem;
          background: rgba(5, 5, 8, 0.92);
        }

        /* Desktop links */
        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }
        .nav-links a {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          position: relative;
          transition: color 0.3s;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: var(--accent);
          transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-links a:hover { color: var(--text); }
        .nav-links a:hover::after { width: 100%; }

        /* Hamburger button — hidden on desktop */
        #hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px; height: 40px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 4px;
          cursor: pointer;
          padding: 8px;
          transition: border-color 0.3s, background 0.3s;
          z-index: 1100;
          position: relative;
        }
        #hamburger:hover {
          border-color: var(--accent);
          background: rgba(6,182,212,0.06);
        }
        #hamburger .bar {
          display: block;
          width: 22px; height: 1.5px;
          background: var(--text-muted);
          border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.25s, background 0.3s;
          transform-origin: center;
        }
        #hamburger.open .bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: var(--accent); }
        #hamburger.open .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        #hamburger.open .bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: var(--accent); }

        /* Mobile drawer */
        #mobile-drawer {
          display: none;
          position: fixed;
          top: 0; right: 0;
          width: min(320px, 85vw);
          height: 100vh;
          background: rgba(5, 5, 8, 0.97);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border-left: 1px solid var(--border);
          z-index: 999;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 2.5rem;
          gap: 0;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        #mobile-drawer.open {
          transform: translateX(0);
        }

        /* Drawer overlay */
        #drawer-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 998;
          opacity: 0;
          transition: opacity 0.35s;
          backdrop-filter: blur(4px);
        }
        #drawer-overlay.open { opacity: 1; }

        /* Mobile nav links */
        .mobile-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 2.5rem;
        }
        .mobile-nav-links li {
          border-bottom: 1px solid var(--border);
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.4s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        #mobile-drawer.open .mobile-nav-links li:nth-child(1) { opacity: 1; transform: translateX(0); transition-delay: 0.08s; }
        #mobile-drawer.open .mobile-nav-links li:nth-child(2) { opacity: 1; transform: translateX(0); transition-delay: 0.14s; }
        #mobile-drawer.open .mobile-nav-links li:nth-child(3) { opacity: 1; transform: translateX(0); transition-delay: 0.20s; }
        .mobile-nav-links a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.25s, padding-left 0.25s;
        }
        .mobile-nav-links a:hover { color: var(--text); padding-left: 0.5rem; }
        .mobile-nav-links a .link-num {
          font-size: 0.6rem;
          color: var(--accent);
        }

        .mobile-cta {
          margin-top: 0.5rem;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.4s 0.3s, transform 0.4s 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        #mobile-drawer.open .mobile-cta {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-socials {
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 1.25rem;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s 0.38s, transform 0.4s 0.38s;
        }
        #mobile-drawer.open .mobile-socials { opacity: 1; transform: translateY(0); }
        .mobile-socials a {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--text-dim);
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.25s;
        }
        .mobile-socials a:hover { color: var(--accent); }

        /* Responsive breakpoint */
        @media (max-width: 768px) {
          #main-nav { padding: 1rem 1.25rem; }
          #main-nav.scrolled { padding: 0.75rem 1.25rem; }
          .nav-links { display: none; }
          .nav-hire-btn { display: none; }
          #hamburger { display: flex; }
          #mobile-drawer { display: flex; }
          #drawer-overlay { display: block; }
        }
      `}</style>

      <nav id="main-nav">
        <a href="/" className="nav-logo">
          &lt;<span>ACA</span> /&gt;
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>

        <a
          href="mailto:amaechichika9@gmail.com"
          className="btn-primary nav-hire-btn"
          style={{ fontSize: '0.72rem', padding: '0.6rem 1.25rem' }}
        >
          Hire Me
        </a>

        {/* Hamburger — mobile only */}
        <button id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </nav>

      {/* Overlay */}
      <div id="drawer-overlay" />

      {/* Mobile Drawer */}
      <div id="mobile-drawer" role="dialog" aria-label="Mobile navigation">
        <ul className="mobile-nav-links">
          {[
            { href: '/', label: 'Home', num: '01' },
            { href: '/about', label: 'About', num: '02' },
            { href: '/contact', label: 'Contact', num: '03' },
          ].map(({ href, label, num }) => (
            <li key={href}>
              <a href={href} className="mobile-nav-item">
                {label}
                <span className="link-num">{num}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-cta">
          <a
            href="mailto:amaechichika9@gmail.com"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}
          >
            Hire Me →
          </a>
        </div>

        <div className="mobile-socials">
          <a href="https://github.com/Chika2021" target="_blank" rel="noopener">GitHub</a>
          <a href="https://linkedin.com/in/chika-anya-92655323a" target="_blank" rel="noopener">LinkedIn</a>
          <a href="mailto:amaechichika9@gmail.com">Email</a>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var nav      = document.getElementById('main-nav');
            var burger   = document.getElementById('hamburger');
            var drawer   = document.getElementById('mobile-drawer');
            var overlay  = document.getElementById('drawer-overlay');
            var mobileLinks = document.querySelectorAll('.mobile-nav-item');
            var isOpen = false;

            function openDrawer() {
              isOpen = true;
              burger.classList.add('open');
              drawer.classList.add('open');
              overlay.classList.add('open');
              burger.setAttribute('aria-expanded', 'true');
              document.body.style.overflow = 'hidden';
            }

            function closeDrawer() {
              isOpen = false;
              burger.classList.remove('open');
              drawer.classList.remove('open');
              overlay.classList.remove('open');
              burger.setAttribute('aria-expanded', 'false');
              document.body.style.overflow = '';
            }

            burger.addEventListener('click', function() {
              isOpen ? closeDrawer() : openDrawer();
            });

            overlay.addEventListener('click', closeDrawer);

            mobileLinks.forEach(function(link) {
              link.addEventListener('click', closeDrawer);
            });

            // Close on Escape key
            document.addEventListener('keydown', function(e) {
              if (e.key === 'Escape' && isOpen) closeDrawer();
            });

            // Sticky nav
            window.addEventListener('scroll', function() {
              nav.classList.toggle('scrolled', window.scrollY > 40);
            });
          })();
        `
      }} />
    </>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────
function Footer() {
  return (
    <>
      <footer style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: '2rem max(3rem, 8vw)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
          © 2026 Anya Chika Amaechi. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/Chika2021' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/chika-anya-92655323a' },
            { label: 'Email', href: 'mailto:amaechichika9@gmail.com' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="footer-link"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
          Built with Next.js + ❤️
        </span>
      </footer>
      <style>{`
        .footer-link:hover { color: var(--accent) !important; }
        @media (max-width: 600px) {
          footer { flex-direction: column; text-align: center; padding: 1.5rem; }
        }
      `}</style>
    </>
  );
}