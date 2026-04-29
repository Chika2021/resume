'use client';
import { useEffect, useState, useRef } from 'react';

const ROLES = [
  'Full-Stack Engineer',
  'Mobile Developer',
  'IT Consultant',
  'Graphic Designer',
  'NestJS Architect',
];

const SKILLS = [
  { name: 'Next.js / React', pct: 95, cat: 'Frontend' },
  { name: 'NestJS / Node.js', pct: 93, cat: 'Backend' },
  { name: 'Flutter / Dart', pct: 88, cat: 'Mobile' },
  { name: 'Java / Spring Boot', pct: 85, cat: 'Backend' },
  { name: 'PostgreSQL / MySQL', pct: 90, cat: 'Database' },
  { name: 'MongoDB', pct: 87, cat: 'Database' },
  { name: 'TypeScript', pct: 92, cat: 'Language' },
  { name: 'Figma / Graphic Design', pct: 85, cat: 'Design' },
  { name: 'IT Infrastructure', pct: 91, cat: 'Systems' },
  { name: 'Docker / DevOps', pct: 78, cat: 'DevOps' },
];

const EXPERIENCE = [
  {
    role: 'Information Technology Consultant',
    company: 'Robernix Industries',
    period: '2024 – 2026',
    color: 'var(--primary)',
    bullets: [
      'Advised leadership on technology roadmaps and infrastructure upgrades',
      'Led end-to-end enterprise software implementation',
      'Improved system uptime to 99.5% through proactive diagnostics',
      'Designed secure, scalable network architectures',
    ],
  },
  {
    role: 'IT Officer',
    company: 'Enis Group',
    period: '2023 – 2024',
    color: 'var(--accent)',
    bullets: [
      'Managed multi-site network infrastructure with 99.9% uptime',
      'Configured security surveillance and video monitoring systems',
      'Provided Level 1 & 2 technical support, reducing resolution times',
      'Developed standardized IT protocols and backup procedures',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Start Innovation Hub',
    period: '2021 – 2023',
    color: 'var(--gold)',
    bullets: [
      'Built full-stack apps with Next.js + NestJS serving thousands of users',
      'Optimized relational and NoSQL databases for high-volume transactions',
      'Developed cross-platform mobile apps with Flutter',
      'Mentored junior developers and led code reviews',
    ],
  },
  {
    role: 'IT Officer',
    company: 'Megalectrics',
    period: '2020 – 2021',
    color: 'var(--primary)',
    bullets: [
      'Managed IT infrastructure for 100+ staff',
      'Oversaw hardware/software procurement and configuration',
      'Implemented cybersecurity protocols with zero data loss',
    ],
  },
  {
    role: 'Software / IT Specialist',
    company: 'LockTech',
    period: '2017 – 2018',
    color: 'var(--accent)',
    bullets: [
      'Developed internal software tools streamlining business operations',
      'Designed company branding materials and digital assets',
      'Managed hardware installations and network configurations',
    ],
  },
];

const ACHIEVEMENTS = [
  { icon: '🚀', title: 'SaaS Platform Launch', desc: 'Architected a large-scale platform handling 10,000+ concurrent users with 99.9% uptime' },
  { icon: '💰', title: 'Cost Reduction', desc: 'Reduced client infrastructure costs through strategic IT planning and cloud migration' },
  { icon: '🎨', title: '50+ Design Projects', desc: 'Delivered visual identity packages for clients across Africa' },
  { icon: '👨‍💻', title: 'Developer Mentorship', desc: 'Mentored 10+ junior developers who secured roles at leading tech companies' },
  { icon: '⚡', title: 'Cross-functional Leadership', desc: 'Led teams to deliver complex software projects on schedule and under budget' },
];

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

// ── Reveal Card Component ──────────────────────────────────────
function RevealCard({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
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

// ── Skill Bar Component ────────────────────────────────────────
function SkillBar({ name, pct, cat }: { name: string; pct: number; cat: string }) {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimate(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{name}</span>
          <span className="tag" style={{ fontSize: '0.58rem', padding: '0.15rem 0.5rem' }}>{cat}</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className={`skill-bar-fill${animate ? ' animate' : ''}`}
          style={{ transform: animate ? `scaleX(${pct / 100})` : 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSkillCat, setActiveSkillCat] = useState('All');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState('idle');
  const [focused, setFocused] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cats = ['All', 'Frontend', 'Backend', 'Mobile', 'Database', 'Design', 'Systems', 'DevOps', 'Language'];
  const filteredSkills = activeSkillCat === 'All' ? SKILLS : SKILLS.filter(s => s.cat === activeSkillCat);

  // Set isClient and check mobile
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Typewriter effect
  useEffect(() => {
    const target = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  // Parallax on mouse move - only on client side and desktop
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;
    
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMobile]);

  // Custom cursor effect - only on client side and desktop
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;
    
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
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
  }, [isMobile]);

  const parallax = (strength = 20) => {
    if (!isClient || isMobile) return {};
    return {
      transform: `translate(${(mousePos.x / window.innerWidth - 0.5) * strength}px, ${(mousePos.y / window.innerHeight - 0.5) * strength}px)`,
      transition: 'transform 0.5s ease',
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');

    try {
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
        setContactStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setContactStatus('idle'), 6000);
      } else {
        const errorData = await res.text();
        console.error('EmailJS Error:', errorData);
        setContactStatus('error');
        setTimeout(() => setContactStatus('idle'), 4000);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setContactStatus('error');
      setTimeout(() => setContactStatus('idle'), 4000);
    }
  };

  return (
    <main>
      {/* Custom Cursor Elements - Desktop only */}
      {!isMobile && (
        <>
          <div id="cursor-dot" className="cursor-dot" />
          <div id="cursor-ring" className="cursor-ring" />
        </>
      )}
      
      <style jsx global>{`
        .cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--primary, #6366f1);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s;
        }
        
        .cursor-ring {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid var(--primary, #6366f1);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, border-color 0.3s;
        }
        
        .cursor-ring.hovering {
          width: 60px;
          height: 60px;
          border-color: var(--accent, #8b5cf6);
          background: rgba(99, 102, 241, 0.1);
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════
          ── HERO SECTION ──
          ═══════════════════════════════════════════════════════════ */}
      <section
        id="home"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 max(1.5rem, 4vw)',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="grid-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle hide-mobile"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 10}s`,
              background: i % 3 === 0 ? 'var(--accent)' : i % 3 === 1 ? 'var(--primary)' : 'var(--gold)',
            }}
          />
        ))}

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: isMobile ? '2rem' : '5rem', 
            alignItems: 'center',
            paddingTop: isMobile ? '5rem' : '0'
          }}>
            
            <div>
              <div
                className="section-label reveal visible"
                style={{ marginBottom: '1.5rem', animationDelay: '0.1s', justifyContent: isMobile ? 'center' : 'flex-start' }}
              >
                Available for work · Lagos, Nigeria
              </div>

              <h1
                className="glitch"
                data-text="ANYA, CHIKA"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  background: 'linear-gradient(135deg, var(--text) 60%, var(--text-muted))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '0.3rem',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                ANYA, CHIKA
              </h1>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '1.5rem',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                AMAECHI
              </h1>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.9rem, 2vw, 1.35rem)',
                  color: 'var(--text-muted)',
                  marginBottom: '1.25rem',
                  minHeight: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                }}
              >
                <span style={{ color: 'var(--accent)' }}>&gt;_</span>
                <span style={{ color: 'var(--text)' }}>{displayed}</span>
                <span className="typewriter-cursor" />
              </div>

              <p
                style={{
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                  maxWidth: '520px',
                  marginBottom: '2.5rem',
                  fontSize: '0.97rem',
                  textAlign: isMobile ? 'center' : 'left',
                  marginLeft: isMobile ? 'auto' : '0',
                  marginRight: isMobile ? 'auto' : '0',
                }}
              >
                Senior Full-Stack Engineer with <strong style={{ color: 'var(--text)' }}>9+ years</strong> crafting
                mission-critical applications. I architect resilient digital products—from pixel-perfect UIs
                to scalable cloud infrastructure.
              </p>

              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                flexWrap: 'wrap', 
                marginBottom: '3rem',
                justifyContent: isMobile ? 'center' : 'flex-start',
              }}>
                <a href="#contact" className="btn-primary magnetic">
                  <span>Let&apos;s Work Together</span>
                  <span style={{ fontSize: '1rem' }}>→</span>
                </a>
                <a href="#about" className="btn-outline magnetic">
                  <span>View My Work</span>
                </a>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '2.5rem',
                justifyContent: isMobile ? 'center' : 'flex-start',
                flexWrap: 'wrap',
              }}>
                {[
                  { n: '9+', label: 'Years Exp.' },
                  { n: '50+', label: 'Projects' },
                  { n: '5', label: 'Companies' },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div className="stat-number" style={{ fontSize: '1.8rem' }}>{s.n}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code block - Hide on mobile */}
            {!isMobile && (
              <div style={parallax(12)}>
                <div className="hero-code-block" style={{ marginBottom: '1.5rem' }}>
                  {[
                    { num: '01', content: <><span className="code-kw">const</span> <span className="code-fn">developer</span> = {'{'}</> },
                    { num: '02', content: <>&nbsp;&nbsp;<span className="code-sym">name</span>: <span className="code-str">&quot;Anya Chika Amaechi&quot;</span>,</> },
                    { num: '03', content: <>&nbsp;&nbsp;<span className="code-sym">stack</span>: [<span className="code-str">&quot;Next.js&quot;</span>, <span className="code-str">&quot;NestJS&quot;</span>, <span className="code-str">&quot;Flutter&quot;</span>],</> },
                    { num: '04', content: <>&nbsp;&nbsp;<span className="code-sym">databases</span>: [<span className="code-str">&quot;PostgreSQL&quot;</span>, <span className="code-str">&quot;MongoDB&quot;</span>],</> },
                    { num: '05', content: <>&nbsp;&nbsp;<span className="code-sym">experience</span>: <span className="code-str">&quot;9 years&quot;</span>,</> },
                    { num: '06', content: <>&nbsp;&nbsp;<span className="code-sym">available</span>: <span className="code-kw">true</span>,</> },
                    { num: '07', content: <>{'}'}</> },
                    { num: '08', content: <></> },
                    { num: '09', content: <><span className="code-fn">developer</span>.<span className="code-fn">buildSomething</span>(<span className="code-str">&quot;amazing&quot;</span>)<span className="typewriter-cursor" /></> },
                  ].map((line) => (
                    <div key={line.num} className="code-line">
                      <span className="code-num">{line.num}</span>
                      <span>{line.content}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Next.js', 'NestJS', 'Flutter', 'Java', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'MySQL', 'TypeScript', 'Docker', 'Figma'].map((tech, i) => (
                    <span
                      key={tech}
                      className="tag"
                      style={{
                        animationDelay: `${i * 0.05}s`,
                        animation: `fadeSlideUp 0.6s ${i * 0.05}s both`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <style>{`
                  @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
              </div>
            )}
          </div>

          {/* Mobile tech tags */}
          {isMobile && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
              {['Next.js', 'NestJS', 'Flutter', 'Java', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'MySQL', 'TypeScript', 'Docker', 'Figma'].map((tech, i) => (
                <span
                  key={tech}
                  className="tag"
                  style={{
                    animationDelay: `${i * 0.05}s`,
                    animation: `fadeSlideUp 0.6s ${i * 0.05}s both`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Scroll indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: isMobile ? '1rem' : '-5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Scroll
            </div>
            <div style={{
              width: '1px',
              height: '60px',
              background: 'linear-gradient(180deg, var(--primary), transparent)',
              animation: 'scrollLine 1.8s ease infinite',
            }} />
            <style>{`
              @keyframes scrollLine {
                0% { transform: scaleY(0); transform-origin: top; }
                50% { transform: scaleY(1); transform-origin: top; }
                51% { transform: scaleY(1); transform-origin: bottom; }
                100% { transform: scaleY(0); transform-origin: bottom; }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ── ABOUT SECTION ──
          ═══════════════════════════════════════════════════════════ */}
      <section id="about" style={{ padding: isMobile ? '4rem max(1.5rem, 4vw)' : '6rem max(3rem, 8vw)', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="orb orb-1" style={{ opacity: 0.6 }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <RevealCard>
            <div className="section-label" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>Who I Am</div>
          </RevealCard>
          <RevealCard delay={0.1}>
            <h1 className="section-title" style={{ marginBottom: '2rem', textAlign: isMobile ? 'center' : 'left' }}>
              Crafting Digital<br /><span>Excellence</span>
            </h1>
          </RevealCard>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: isMobile ? '2rem' : '5rem', 
            alignItems: 'start' 
          }}>
            <RevealCard delay={0.2}>
              <div style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: '0.97rem' }}>
                <p style={{ marginBottom: '1.2rem' }}>
                  I&apos;m a <strong style={{ color: 'var(--text)' }}>Senior Full-Stack Software Engineer</strong> and
                  IT Consultant with over 9 years of professional experience designing and delivering robust
                  digital solutions for diverse industries across Nigeria and beyond.
                </p>
                <p style={{ marginBottom: '1.2rem' }}>
                  My expertise spans the full technology stack — from architecting high-performance
                  APIs with <strong style={{ color: 'var(--accent)' }}>NestJS and Spring Boot</strong>, to crafting
                  fluid user experiences in <strong style={{ color: 'var(--primary)' }}>Next.js</strong>, to shipping
                  cross-platform mobile apps with <strong style={{ color: 'var(--gold)' }}>Flutter</strong>.
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  I hold a <strong style={{ color: 'var(--text)' }}>B.Sc. in Information Technology & Network Systems</strong> from
                  Accra Institute of Technology, Ghana — and I blend deep technical knowledge with a consultant&apos;s
                  mindset to turn complex challenges into elegant, scalable systems.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                  <a
                    href="mailto:amaechichika9@gmail.com"
                    className="btn-primary"
                    style={{ display: 'inline-flex' }}
                  >
                    Hire Me
                  </a>
                  <a
                    href="#"
                    className="btn-outline"
                    download
                    style={{ display: 'inline-flex' }}
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </RevealCard>

            <RevealCard delay={0.35}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { label: 'Email', value: 'amaechichika9@gmail.com', icon: '📧' },
                  { label: 'Phone', value: '+2349011140929', icon: '📞' },
                  { label: 'Location', value: 'Nigeria', icon: '📍' },
                  { label: 'Education', value: 'B.Sc. IT & Network Systems, AIT Ghana', icon: '🎓' },
                  { label: 'GitHub', value: 'github.com/Chika2021', icon: '🐙' },
                  { label: 'LinkedIn', value: 'linkedin.com/in/chika-anya-92655323a', icon: '🔗' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="glass-card"
                    style={{
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: isMobile ? '0.75rem' : '0.85rem', color: 'var(--text)', wordBreak: 'break-all' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealCard>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ── SKILLS SECTION ──
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '3rem max(1.5rem, 4vw)' : '5rem max(3rem, 8vw)', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <RevealCard>
            <div className="section-label" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>Expertise</div>
            <h2 className="section-title" style={{ marginBottom: '2.5rem', textAlign: isMobile ? 'center' : 'left' }}>
              Technical <span>Skills</span>
            </h2>
          </RevealCard>

          <RevealCard delay={0.1} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              {cats.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCat(cat)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '100px',
                    border: `1px solid ${activeSkillCat === cat ? 'var(--primary)' : 'var(--border)'}`,
                    background: activeSkillCat === cat ? 'rgba(99,102,241,0.15)' : 'transparent',
                    color: activeSkillCat === cat ? 'var(--primary)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </RevealCard>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '0' : '0 4rem' }}>
            {filteredSkills.map((s) => (
              <div key={s.name + activeSkillCat}>
                <SkillBar {...s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ── EXPERIENCE TIMELINE ──
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '3rem max(1.5rem, 4vw)' : '6rem max(3rem, 8vw)', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <RevealCard>
            <div className="section-label" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>Career Path</div>
            <h2 className="section-title" style={{ marginBottom: '4rem', textAlign: isMobile ? 'center' : 'left' }}>
              Work <span>Experience</span>
            </h2>
          </RevealCard>

          <div style={{ position: 'relative', paddingLeft: isMobile ? '1.5rem' : '2.5rem' }}>
            <div className="timeline-line" />

            {EXPERIENCE.map((exp, i) => (
              <RevealCard key={exp.company} delay={i * 0.12} style={{ marginBottom: '3rem' }}>
                <div style={{ position: 'relative' }}>
                  <div className="timeline-dot" style={{ borderColor: exp.color, boxShadow: `0 0 12px ${exp.color}55` }} />
                  <div className="glass-card" style={{ padding: isMobile ? '1.25rem 1.25rem' : '1.75rem 2rem', borderLeft: `3px solid ${exp.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1rem' : '1.15rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem' }}>
                          {exp.role}
                        </h3>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: exp.color }}>
                          {exp.company}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: 'var(--text-dim)',
                          background: 'var(--surface)',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '100px',
                          border: '1px solid var(--border)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                      {exp.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.88rem',
                            lineHeight: 1.7,
                            paddingLeft: '1.2rem',
                            position: 'relative',
                            marginBottom: '0.4rem',
                          }}
                        >
                          <span style={{ position: 'absolute', left: 0, color: exp.color }}>▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ── ACHIEVEMENTS ──
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '3rem max(1.5rem, 4vw)' : '5rem max(3rem, 8vw)', background: 'var(--surface)', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <RevealCard>
            <div className="section-label" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>Impact</div>
            <h2 className="section-title" style={{ marginBottom: '3rem', textAlign: isMobile ? 'center' : 'left' }}>
              Key <span>Achievements</span>
            </h2>
          </RevealCard>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {ACHIEVEMENTS.map((a, i) => (
              <RevealCard key={a.title} delay={i * 0.08}>
                <div
                  className="glass-card"
                  style={{ padding: '1.75rem', height: '100%' }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{a.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.6rem' }}>
                    {a.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.7 }}>{a.desc}</p>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ── CONTACT SECTION ──
          ═══════════════════════════════════════════════════════════ */}
      <section id="contact" style={{ padding: isMobile ? '3rem max(1.5rem, 4vw) 2rem' : '6rem max(3rem, 8vw) 3rem', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="orb orb-2" style={{ opacity: 0.5 }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <RevealCard>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              Let&apos;s Connect
            </div>
          </RevealCard>
          <RevealCard delay={0.1}>
            <h1 className="section-title" style={{ marginBottom: '1.25rem' }}>
              Start a <span>Conversation</span>
            </h1>
          </RevealCard>
          <RevealCard delay={0.2}>
            <p style={{ color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto 3rem', lineHeight: 1.8, padding: isMobile ? '0 1rem' : '0' }}>
              Whether you have a project in mind, a job opportunity, or just want to say hello —
              I&apos;d love to hear from you. My inbox is always open.
            </p>
          </RevealCard>
        </div>
      </section>

      <section style={{ padding: isMobile ? '1rem max(1.5rem, 4vw) 4rem' : '2rem max(3rem, 8vw) 6rem', position: 'relative' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', 
          gap: isMobile ? '2rem' : '4rem', 
          alignItems: 'start' 
        }}>

          <div>
            <RevealCard>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1.3rem' : '1.5rem', fontWeight: 600, color: 'var(--text)', marginBottom: '1rem' }}>
                Get in Touch
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '2rem' }}>
                I&apos;m currently open to new opportunities — full-time positions, consulting engagements,
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
                    padding: '1.1rem 1.25rem',
                    marginBottom: '0.85rem',
                    textDecoration: 'none',
                    borderLeft: `3px solid ${item.color}`,
                  }}
                >
                  <span style={{ fontSize: '1.3rem', minWidth: '1.5rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: isMobile ? '0.75rem' : '0.82rem', color: 'var(--text)', wordBreak: 'break-all' }}>{item.value}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: item.color, fontSize: '0.8rem' }}>→</span>
                </a>
              </RevealCard>
            ))}

            <RevealCard delay={0.5}>
              <div
                className="glass-card"
                style={{ padding: '1.25rem', marginTop: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}
              >
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', flexShrink: 0, boxShadow: '0 0 12px #22c55e', animation: 'pulse-green 2s ease infinite' }} />
                <style>{`@keyframes pulse-green { 0%,100% { box-shadow: 0 0 6px #22c55e; } 50% { box-shadow: 0 0 20px #22c55e, 0 0 40px #22c55e44; } }`}</style>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Available for Work
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Open to full-time, consulting & freelance
                  </div>
                </div>
              </div>
            </RevealCard>
          </div>

          <RevealCard delay={0.15}>
            <div
              className="glass-card"
              style={{
                padding: isMobile ? '1.5rem' : '2.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, var(--primary), var(--accent), var(--gold))',
              }} />

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1.2rem' : '1.35rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem' }}>
                Send a Message
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '2rem' }}>
                All messages go directly to amaechichika9@gmail.com
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
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
                    rows={6}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={contactStatus === 'loading'}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '0.82rem',
                    padding: '1rem',
                    opacity: contactStatus === 'loading' ? 0.7 : 1,
                    transition: 'all 0.3s',
                  }}
                >
                  {contactStatus === 'loading' ? (
                    <>
                      <span style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite', marginRight: '0.5rem' }}>⟳</span>
                      Sending...
                    </>
                  ) : contactStatus === 'success' ? (
                    <>✓ Message Sent!</>
                  ) : contactStatus === 'error' ? (
                    <>✗ Failed — Try Again</>
                  ) : (
                    <>Send Message →</>
                  )}
                </button>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

                {contactStatus === 'success' && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(34,197,94,0.08)',
                    border: '1px solid rgba(34,197,94,0.25)',
                    borderRadius: '6px',
                    color: '#22c55e',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    textAlign: 'center',
                    animation: 'fadeIn 0.4s ease',
                  }}>
                    ✓ Thank you! I&apos;ll get back to you within 24 hours.
                  </div>
                )}
                {contactStatus === 'error' && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: '6px',
                    color: '#ef4444',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
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

      {/* ═══════════════════════════════════════════════════════════
          ── FOOTER CTA ──
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '3rem max(1.5rem, 4vw)' : '4rem max(3rem, 8vw)', background: 'var(--surface)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div className="orb orb-3" style={{ opacity: 0.4 }} />
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <RevealCard>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Open to opportunities
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '1.5rem' }}>
              Ready to build something <span style={{ background: 'linear-gradient(135deg,var(--primary),var(--accent))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>extraordinary?</span>
            </h2>
            <a href="mailto:amaechichika9@gmail.com" className="btn-primary magnetic" style={{ display: 'inline-flex', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
              amaechichika9@gmail.com ✉️
            </a>
          </RevealCard>
        </div>
      </section>
    </main>
  );
}