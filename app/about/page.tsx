'use client';
import type { Metadata } from 'next';
import { useEffect, useRef, useState } from 'react';

export const metadata: Metadata = {
  title: 'About',  // renders as "About | Anya Chika Amaechi"
  description: 'Learn about my 9 years of experience in full-stack development, IT consulting, and mobile development.',
};

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

export default function About() {
  const [activeSkillCat, setActiveSkillCat] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const cats = ['All', 'Frontend', 'Backend', 'Mobile', 'Database', 'Design', 'Systems', 'DevOps', 'Language'];
  const filteredSkills = activeSkillCat === 'All' ? SKILLS : SKILLS.filter(s => s.cat === activeSkillCat);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  return (
    <main style={{ paddingTop: isMobile ? '4rem' : '5rem' }}>

      <section style={{ 
        padding: isMobile ? '3rem max(1.5rem, 4vw)' : '6rem max(3rem, 8vw)', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div className="grid-bg" />
        <div className="orb orb-1" style={{ opacity: 0.6 }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <RevealCard>
            <div className="section-label" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
              Who I Am
            </div>
          </RevealCard>
          <RevealCard delay={0.1}>
            <h1 className="section-title" style={{ 
              marginBottom: '2rem', 
              textAlign: isMobile ? 'center' : 'left',
              fontSize: isMobile ? 'clamp(2rem, 8vw, 2.5rem)' : undefined 
            }}>
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
              <div style={{ 
                color: 'var(--text-muted)', 
                lineHeight: 1.9, 
                fontSize: isMobile ? '0.9rem' : '0.97rem',
                textAlign: isMobile ? 'center' : 'left'
              }}>
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
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  flexWrap: 'wrap',
                  justifyContent: isMobile ? 'center' : 'flex-start' 
                }}>
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
                      padding: isMobile ? '0.85rem 1rem' : '1rem 1.25rem',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: isMobile ? '1.1rem' : '1.2rem' }}>{item.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.6rem', 
                        color: 'var(--text-dim)', 
                        letterSpacing: '0.15em', 
                        textTransform: 'uppercase', 
                        marginBottom: '0.2rem' 
                      }}>
                        {item.label}
                      </div>
                      <div style={{ 
                        fontSize: isMobile ? '0.72rem' : '0.85rem', 
                        color: 'var(--text)',
                        wordBreak: 'break-all' 
                      }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealCard>
          </div>
        </div>
      </section>

      <section style={{ 
        padding: isMobile ? '3rem max(1.5rem, 4vw)' : '5rem max(3rem, 8vw)', 
        background: 'var(--surface)', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <RevealCard>
            <div className="section-label" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
              Expertise
            </div>
            <h2 className="section-title" style={{ 
              marginBottom: '2.5rem', 
              textAlign: isMobile ? 'center' : 'left',
              fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : undefined 
            }}>
              Technical <span>Skills</span>
            </h2>
          </RevealCard>

          <RevealCard delay={0.1} style={{ marginBottom: '2.5rem' }}>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-start' 
            }}>
              {cats.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCat(cat)}
                  style={{
                    padding: isMobile ? '0.35rem 0.8rem' : '0.4rem 1rem',
                    borderRadius: '100px',
                    border: `1px solid ${activeSkillCat === cat ? 'var(--primary)' : 'var(--border)'}`,
                    background: activeSkillCat === cat ? 'rgba(99,102,241,0.15)' : 'transparent',
                    color: activeSkillCat === cat ? 'var(--primary)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: isMobile ? '0.6rem' : '0.68rem',
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

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: isMobile ? '0' : '0 4rem' 
          }}>
            {filteredSkills.map((s) => (
              <div key={s.name + activeSkillCat}>
                <SkillBar {...s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ 
        padding: isMobile ? '3rem max(1.5rem, 4vw)' : '6rem max(3rem, 8vw)', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div className="grid-bg" />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <RevealCard>
            <div className="section-label" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
              Career Path
            </div>
            <h2 className="section-title" style={{ 
              marginBottom: '4rem', 
              textAlign: isMobile ? 'center' : 'left',
              fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : undefined 
            }}>
              Work <span>Experience</span>
            </h2>
          </RevealCard>

          <div style={{ position: 'relative', paddingLeft: isMobile ? '1.5rem' : '2.5rem' }}>
            <div className="timeline-line" />

            {EXPERIENCE.map((exp, i) => (
              <RevealCard key={exp.company} delay={i * 0.12} style={{ marginBottom: isMobile ? '2rem' : '3rem' }}>
                <div style={{ position: 'relative' }}>
                  <div className="timeline-dot" style={{ 
                    borderColor: exp.color, 
                    boxShadow: `0 0 12px ${exp.color}55`,
                    left: isMobile ? '-4px' : '-5px',
                    width: isMobile ? '9px' : '11px',
                    height: isMobile ? '9px' : '11px',
                  }} />
                  <div className="glass-card" style={{ 
                    padding: isMobile ? '1.25rem 1.25rem' : '1.75rem 2rem', 
                    borderLeft: `3px solid ${exp.color}` 
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem', 
                      marginBottom: '0.5rem' 
                    }}>
                      <div>
                        <h3 style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontSize: isMobile ? '0.95rem' : '1.15rem', 
                          fontWeight: 600, 
                          color: 'var(--text)', 
                          marginBottom: '0.2rem' 
                        }}>
                          {exp.role}
                        </h3>
                        <span style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontSize: isMobile ? '0.7rem' : '0.8rem', 
                          color: exp.color 
                        }}>
                          {exp.company}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: isMobile ? '0.6rem' : '0.68rem',
                          color: 'var(--text-dim)',
                          background: 'var(--surface)',
                          padding: isMobile ? '0.25rem 0.6rem' : '0.3rem 0.75rem',
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
                            fontSize: isMobile ? '0.8rem' : '0.88rem',
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

      <section style={{ 
        padding: isMobile ? '3rem max(1.5rem, 4vw)' : '5rem max(3rem, 8vw)', 
        background: 'var(--surface)', 
        position: 'relative' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <RevealCard>
            <div className="section-label" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
              Impact
            </div>
            <h2 className="section-title" style={{ 
              marginBottom: '3rem', 
              textAlign: isMobile ? 'center' : 'left',
              fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : undefined 
            }}>
              Key <span>Achievements</span>
            </h2>
          </RevealCard>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {ACHIEVEMENTS.map((a, i) => (
              <RevealCard key={a.title} delay={i * 0.08}>
                <div
                  className="glass-card"
                  style={{ padding: isMobile ? '1.25rem' : '1.75rem', height: '100%' }}
                >
                  <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '1rem' }}>{a.icon}</div>
                  <h3 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: isMobile ? '0.9rem' : '1rem', 
                    fontWeight: 600, 
                    color: 'var(--text)', 
                    marginBottom: '0.6rem' 
                  }}>
                    {a.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: isMobile ? '0.8rem' : '0.87rem', 
                    lineHeight: 1.7 
                  }}>
                    {a.desc}
                  </p>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}