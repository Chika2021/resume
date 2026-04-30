'use client';
import { useState, useRef, useEffect } from 'react';

function RevealCard({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const CONTACT_INFO = [
  {
    icon: '📧',
    label: 'Email',
    value: 'amaechichika9@gmail.com',
    href: 'mailto:amaechichika9@gmail.com',
    color: 'var(--primary)',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+2349011140929',
    href: 'tel:+2349011140929',
    color: 'var(--accent)',
  },
  {
    icon: '🔗',
    label: 'LinkedIn',
    value: 'linkedin.com/in/chika-anya-92655323a',
    href: 'https://linkedin.com/in/chika-anya-92655323a',
    color: 'var(--gold)',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/Chika2021',
    href: 'https://github.com/Chika2021',
    color: 'var(--primary)',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [focused, setFocused] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Using EmailJS to send the form data
      const templateParams = {
        name: form.name,
        email: form.email,
        title: form.subject,
        message: form.message,
      };

      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_qroz9lr',
          template_id: 'template_6dkv2h9',
          user_id: '7WX9vnNBwElbxwz1D',
          template_params: templateParams,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        const errorData = await res.text();
        console.error('EmailJS Error:', errorData);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  // Custom cursor effect - only on desktop
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };

    const handleMouseEnter = () => ring.classList.add('hovering');
    const handleMouseLeave = () => ring.classList.remove('hovering');

    document.addEventListener('mousemove', handleMouseMove);
    animateRing();

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [class*="card"], [class*="btn"], .tag');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <main style={{ paddingTop: isMobile ? '4rem' : '5rem' }}>

      {/* Custom Cursor Elements - Desktop only */}
      {!isMobile && (
        <>
          <div id="cursor-dot" style={{
            position: 'fixed',
            width: '8px',
            height: '8px',
            background: 'var(--primary, #6366f1)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9999,
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.2s, height 0.2s',
          }} />
          <div id="cursor-ring" style={{
            position: 'fixed',
            width: '40px',
            height: '40px',
            border: '2px solid var(--primary, #6366f1)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.3s, height 0.3s, border-color 0.3s',
          }} />
        </>
      )}
      
      <style jsx global>{`
        #cursor-ring.hovering {
          width: 60px !important;
          height: 60px !important;
          border-color: var(--accent, #8b5cf6) !important;
          background: rgba(99, 102, 241, 0.1) !important;
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ 
        padding: isMobile ? '3rem max(1.5rem, 4vw) 2rem' : '6rem max(3rem, 8vw) 3rem', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div className="grid-bg" />
        <div className="orb orb-2" style={{ opacity: 0.5 }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <RevealCard>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              Let's Connect
            </div>
          </RevealCard>
          <RevealCard delay={0.1}>
            <h1 className="section-title" style={{ marginBottom: '1.25rem', fontSize: isMobile ? 'clamp(2rem, 8vw, 2.5rem)' : undefined }}>
              Start a <span>Conversation</span>
            </h1>
          </RevealCard>
          <RevealCard delay={0.2}>
            <p style={{ 
              color: 'var(--text-muted)', 
              maxWidth: '540px', 
              margin: '0 auto 3rem', 
              lineHeight: 1.8,
              padding: isMobile ? '0 0.5rem' : '0',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>
              Whether you have a project in mind, a job opportunity, or just want to say hello —
              I'd love to hear from you. My inbox is always open.
            </p>
          </RevealCard>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section style={{ 
        padding: isMobile ? '1rem max(1.5rem, 4vw) 4rem' : '2rem max(3rem, 8vw) 6rem', 
        position: 'relative' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', 
          gap: isMobile ? '2rem' : '4rem', 
          alignItems: 'start' 
        }}>

          {/* Left: info */}
          <div>
            <RevealCard>
              <h2 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: isMobile ? '1.3rem' : '1.5rem', 
                fontWeight: 600, 
                color: 'var(--text)', 
                marginBottom: '1rem',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                Get in Touch
              </h2>
              <p style={{ 
                color: 'var(--text-muted)', 
                lineHeight: 1.8, 
                fontSize: '0.9rem', 
                marginBottom: '2rem',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                I'm currently open to new opportunities — full-time positions, consulting engagements,
                and freelance collaborations. Response time is typically within 24 hours.
              </p>
            </RevealCard>

            {CONTACT_INFO.map((item, i) => (
              <RevealCard key={item.label} delay={0.1 + i * 0.08}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="glass-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: isMobile ? '0.9rem 1rem' : '1.1rem 1.25rem',
                    marginBottom: '0.85rem',
                    textDecoration: 'none',
                    borderLeft: `3px solid ${item.color}`,
                  }}
                >
                  <span style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', minWidth: '1.5rem' }}>{item.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.58rem', 
                      color: 'var(--text-dim)', 
                      letterSpacing: '0.15em', 
                      textTransform: 'uppercase', 
                      marginBottom: '0.15rem' 
                    }}>
                      {item.label}
                    </div>
                    <div style={{ 
                      fontSize: isMobile ? '0.72rem' : '0.82rem', 
                      color: 'var(--text)', 
                      wordBreak: 'break-all',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.value}
                    </div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: item.color, fontSize: '0.8rem', flexShrink: 0 }}>→</span>
                </a>
              </RevealCard>
            ))}

            {/* Availability badge */}
            <RevealCard delay={0.5}>
              <div
                className="glass-card"
                style={{ 
                  padding: isMobile ? '1rem' : '1.25rem', 
                  marginTop: '1.5rem', 
                  display: 'flex', 
                  gap: '0.75rem', 
                  alignItems: 'center' 
                }}
              >
                <span style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  background: '#22c55e', 
                  flexShrink: 0, 
                  boxShadow: '0 0 12px #22c55e', 
                  animation: 'pulse-green 2s ease infinite' 
                }} />
                <style>{`@keyframes pulse-green { 0%,100% { box-shadow: 0 0 6px #22c55e; } 50% { box-shadow: 0 0 20px #22c55e, 0 0 40px #22c55e44; } }`}</style>
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: isMobile ? '0.62rem' : '0.68rem', 
                    color: '#22c55e', 
                    letterSpacing: '0.1em', 
                    textTransform: 'uppercase' 
                  }}>
                    Available for Work
                  </div>
                  <div style={{ 
                    fontSize: isMobile ? '0.72rem' : '0.8rem', 
                    color: 'var(--text-muted)', 
                    marginTop: '0.15rem' 
                  }}>
                    Open to full-time, consulting & freelance
                  </div>
                </div>
              </div>
            </RevealCard>
          </div>

          {/* Right: form */}
          <RevealCard delay={0.15}>
            <div
              className="glass-card"
              style={{
                padding: isMobile ? '1.25rem' : '2.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top gradient bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, var(--primary), var(--accent), var(--gold))',
              }} />

              <h3 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: isMobile ? '1.15rem' : '1.35rem', 
                fontWeight: 600, 
                color: 'var(--text)', 
                marginBottom: '0.5rem' 
              }}>
                Send a Message
              </h3>
              <p style={{ 
                color: 'var(--text-muted)', 
                fontSize: isMobile ? '0.75rem' : '0.82rem', 
                marginBottom: isMobile ? '1.5rem' : '2rem' 
              }}>
                All messages go directly to amaechichika9@gmail.com
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                  gap: '1rem' 
                }}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      required
                      style={isMobile ? { fontSize: '0.9rem', padding: '0.8rem 1rem' } : {}}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      required
                      style={isMobile ? { fontSize: '0.9rem', padding: '0.8rem 1rem' } : {}}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Project inquiry / Job opportunity / etc."
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    required
                    style={isMobile ? { fontSize: '0.9rem', padding: '0.8rem 1rem' } : {}}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project, timeline, budget expectations..."
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    required
                    rows={isMobile ? 5 : 6}
                    style={isMobile ? { fontSize: '0.9rem', padding: '0.8rem 1rem' } : {}}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: isMobile ? '0.78rem' : '0.82rem',
                    padding: isMobile ? '0.85rem' : '1rem',
                    opacity: status === 'loading' ? 0.7 : 1,
                    transition: 'all 0.3s',
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <span style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite', marginRight: '0.5rem' }}>⟳</span>
                      Sending...
                    </>
                  ) : status === 'success' ? (
                    <>✓ Message Sent!</>
                  ) : status === 'error' ? (
                    <>✗ Failed — Try Again</>
                  ) : (
                    <>Send Message →</>
                  )}
                </button>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

                {status === 'success' && (
                  <div style={{
                    marginTop: '1rem',
                    padding: isMobile ? '0.75rem' : '1rem',
                    background: 'rgba(34,197,94,0.08)',
                    border: '1px solid rgba(34,197,94,0.25)',
                    borderRadius: '6px',
                    color: '#22c55e',
                    fontFamily: 'var(--font-mono)',
                    fontSize: isMobile ? '0.7rem' : '0.78rem',
                    textAlign: 'center',
                    animation: 'fadeIn 0.4s ease',
                  }}>
                    ✓ Thank you! I'll get back to you within 24 hours.
                  </div>
                )}
                {status === 'error' && (
                  <div style={{
                    marginTop: '1rem',
                    padding: isMobile ? '0.75rem' : '1rem',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: '6px',
                    color: '#ef4444',
                    fontFamily: 'var(--font-mono)',
                    fontSize: isMobile ? '0.7rem' : '0.78rem',
                    textAlign: 'center',
                  }}>
                    Something went wrong. Please email me directly at amaechichika9@gmail.com
                  </div>
                )}
              </form>

              <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
            </div>
          </RevealCard>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ 
        padding: isMobile ? '2.5rem max(1.5rem, 4vw)' : '4rem max(3rem, 8vw)', 
        background: 'var(--surface)', 
        position: 'relative', 
        overflow: 'hidden', 
        textAlign: 'center' 
      }}>
        <div className="orb orb-3" style={{ opacity: 0.4 }} />
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <RevealCard>
            <p style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: isMobile ? '0.65rem' : '0.72rem', 
              color: 'var(--accent)', 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase', 
              marginBottom: '1rem' 
            }}>
              Open to opportunities
            </p>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 700, 
              letterSpacing: '-0.02em', 
              color: 'var(--text)', 
              marginBottom: '1.5rem' 
            }}>
              Ready to build something <span style={{ 
                background: 'linear-gradient(135deg,var(--primary),var(--accent))', 
                WebkitBackgroundClip:'text', 
                WebkitTextFillColor:'transparent', 
                backgroundClip:'text' 
              }}>extraordinary?</span>
            </h2>
            <a 
              href="mailto:amaechichika9@gmail.com" 
              className="btn-primary magnetic" 
              style={{ 
                display: 'inline-flex',
                fontSize: isMobile ? '0.75rem' : '0.9rem',
                padding: isMobile ? '0.75rem 1.5rem' : '0.9rem 2rem',
                wordBreak: 'break-all'
              }}
            >
              amaechichika9@gmail.com ✉️
            </a>
          </RevealCard>
        </div>
      </section>

    </main>
  );
}