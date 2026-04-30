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

// ── CURSOR (server-safe wrapper) ──────────────────────────────────
function CursorProvider() {
  return (
    <>
      <div id="cursor-dot" className="cursor-dot" />
      <div id="cursor-ring" className="cursor-ring" />
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const isMobile = window.innerWidth < 768;
            if (isMobile) return; // Don't show cursor on mobile
            
            const dot = document.getElementById('cursor-dot');
            const ring = document.getElementById('cursor-ring');
            if (!dot || !ring) return;
            
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

// ── NAV ──────────────────────────────────────────────────────────
function Navigation() {
  return (
    <>
      <nav id="main-nav">
        <a href="#home" className="nav-logo">
          &lt;<span>ACA</span> /&gt;
        </a>
        <ul className="nav-links" id="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="mailto:amaechichika9@gmail.com" className="btn-primary nav-hire-btn" style={{ fontSize: '0.72rem', padding: '0.6rem 1.25rem' }}>
          Hire Me
        </a>
        {/* Hamburger Menu Button */}
        <button className="hamburger" id="hamburger" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div className="mobile-menu-overlay" id="mobile-menu-overlay">
        <ul className="mobile-menu-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="mailto:amaechichika9@gmail.com" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem', marginTop: '2rem', display: 'inline-block' }}>
          Hire Me ✉️
        </a>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var nav = document.getElementById('main-nav');
            var hamburger = document.getElementById('hamburger');
            var overlay = document.getElementById('mobile-menu-overlay');
            var navLinks = document.getElementById('nav-links');
            var mobileLinks = overlay.querySelectorAll('a');
            var isMenuOpen = false;

            // Scroll effect for nav background
            window.addEventListener('scroll', function() {
              if (window.scrollY > 40) {
                nav.classList.add('scrolled');
              } else {
                nav.classList.remove('scrolled');
              }
            });

            // Toggle mobile menu
            hamburger.addEventListener('click', function() {
              isMenuOpen = !isMenuOpen;
              if (isMenuOpen) {
                hamburger.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
              } else {
                hamburger.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
              }
            });

            // Close menu when clicking a link
            mobileLinks.forEach(function(link) {
              link.addEventListener('click', function(e) {
                e.preventDefault();
                var targetId = this.getAttribute('href').substring(1);
                var targetElement = document.getElementById(targetId);
                
                // Close menu
                hamburger.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                isMenuOpen = false;
                
                // Smooth scroll to section
                if (targetElement) {
                  setTimeout(function() {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              });
            });

            // Close menu when clicking overlay background
            overlay.addEventListener('click', function(e) {
              if (e.target === overlay) {
                hamburger.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                isMenuOpen = false;
              }
            });

            // Handle desktop nav links
            var desktopLinks = navLinks.querySelectorAll('a');
            desktopLinks.forEach(function(link) {
              link.addEventListener('click', function(e) {
                e.preventDefault();
                var targetId = this.getAttribute('href').substring(1);
                var targetElement = document.getElementById(targetId);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
                }
              });
            });

            // Handle window resize
            window.addEventListener('resize', function() {
              if (window.innerWidth >= 768 && isMenuOpen) {
                hamburger.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                isMenuOpen = false;
              }
            });
          })();
        `
      }} />
    </>
  );
}

// ── FOOTER ──────────────────────────────────────────────────────
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
        .footer-link:hover {
          color: var(--accent) !important;
        }
      `}</style>
    </>
  );
}