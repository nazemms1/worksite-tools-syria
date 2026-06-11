import { useEffect, useRef } from 'react';
import { Badge } from '@mantine/core';
import { Target, Eye, Award, Users } from 'lucide-react';

const pillars = [
  {
    icon: <Target size={24} />,
    title: 'Our Mission',
    desc: 'To provide Syrian professionals and craftsmen with the highest quality industrial tools at competitive prices, backed by reliable after-sales support.',
  },
  {
    icon: <Eye size={24} />,
    title: 'Our Vision',
    desc: 'To be the leading supplier of professional-grade power tools across Syria and the wider region, recognized for quality, variety, and trust.',
  },
  {
    icon: <Award size={24} />,
    title: 'Our Quality',
    desc: 'Every product meets international standards — unified packaging, rigorous testing, and genuine certifications ensure you get the best every time.',
  },
  {
    icon: <Users size={24} />,
    title: 'Our Commitment',
    desc: 'We stand behind every tool we sell. Our dedicated team is always available to assist with product selection, technical support, and service.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-card').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>

        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            size="lg"
            mb="md"
            styles={{
              root: {
                background: 'rgba(255,184,0,0.12)',
                border: '1px solid rgba(255,184,0,0.35)',
                color: '#FFB800',
                fontWeight: 600,
                letterSpacing: '0.12em',
                fontSize: '0.7rem',
              },
            }}
          >
            Who We Are
          </Badge>
          <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            About <span style={{ color: '#FFB800' }}>WorkSite Tools Syria</span>
          </h2>
          <p className="text-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 620, lineHeight: 1.7 }}>
            A subsidiary of Ever Energy Company, WorkSite Tools Syria is the official distributor of the globally recognized WorkSite brand — bringing premium industrial tools to the Syrian market since our founding.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Image side */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '4/3',
                border: '1px solid rgba(255,184,0,0.2)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="WorkSite tools workshop"
                className="w-full h-full object-cover"
                style={{ opacity: 0.85 }}
              />
            </div>

            {/* Floating stat */}
            <div
              className="absolute -right-6 -bottom-6 p-6 rounded-2xl"
              style={{
                background: '#FFB800',
                boxShadow: '0 16px 48px rgba(255,184,0,0.4)',
              }}
            >
              <div className="font-black text-4xl" style={{ color: '#111111', lineHeight: 1 }}>5000+</div>
              <div className="text-sm font-semibold" style={{ color: 'rgba(0,0,0,0.7)' }}>Product Varieties</div>
            </div>

            {/* Decorative corner */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl opacity-20"
              style={{ background: '#FFB800' }}
            />
          </div>

          {/* Text side */}
          <div>
            <h3 className="font-bold text-2xl text-white mb-4">
              Syria's Premier Tool Distributor
            </h3>
            <p className="mb-6" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
              WorkSite Tools Syria is your trusted source for professional-grade power tools, hand tools, measuring equipment, and industrial supplies. As the exclusive Syrian partner of the global WorkSite brand, we ensure that every product you receive is genuine, certified, and built to last.
            </p>
            <p className="mb-8" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
              Our extensive catalog spans over 5,000 product varieties covering everything from drills and grinders to generators and welding equipment — all under unified, high-quality packaging that reflects the WorkSite standard of excellence.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '5,000+', label: 'SKUs Available' },
                { value: '15+', label: 'Years in Market' },
                { value: '100%', label: 'Genuine Products' },
                { value: '24/7', label: 'Customer Support' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,184,0,0.15)',
                  }}
                >
                  <div className="font-black text-2xl" style={{ color: '#FFB800' }}>{item.value}</div>
                  <div className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="fade-card p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,184,0,0.12)',
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,184,0,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,184,0,0.12)';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(255,184,0,0.15)', color: '#FFB800' }}
              >
                {p.icon}
              </div>
              <h4 className="font-bold text-white mb-2">{p.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
