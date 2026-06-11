import { Badge } from '@mantine/core';
import { CheckCircle, Package, HeadphonesIcon, Globe, TrendingUp, ShieldCheck } from 'lucide-react';

const reasons = [
  {
    icon: <Globe size={28} />,
    title: 'Global Brand, Local Presence',
    desc: 'As the official Syrian distributor of the internationally recognized WorkSite brand, we combine global quality with local accessibility and knowledge.',
  },
  {
    icon: <Package size={28} />,
    title: 'Unified High-Quality Packaging',
    desc: 'Every WorkSite product arrives in standardized, premium packaging that ensures protection during transport and professional presentation on shelves.',
  },
  {
    icon: <CheckCircle size={28} />,
    title: 'Certified & Genuine Products',
    desc: 'All products are 100% genuine, certified to international quality standards. No counterfeits, no compromise — you get what you pay for.',
  },
  {
    icon: <HeadphonesIcon size={28} />,
    title: 'Dedicated After-Sales Support',
    desc: 'Our expert team is available to help with product selection, installation guidance, and technical support long after your purchase.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Global Agent Opportunities',
    desc: 'We welcome partnerships and agency agreements. Join our growing network and be part of a proven, globally expanding brand.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Warranty & Service Coverage',
    desc: 'Our products come with manufacturer-backed warranties and access to genuine spare parts and service centers across Syria.',
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden" style={{ background: '#111111' }}>

      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, #FFB800 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

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
            Our Advantages
          </Badge>
          <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Why Choose <span style={{ color: '#FFB800' }}>WorkSite Syria?</span>
          </h2>
          <p className="text-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, lineHeight: 1.7 }}>
            We're not just a tool distributor — we're your professional partner committed to quality, reliability, and long-term support.
          </p>
        </div>

        {/* Two-column: Feature list + visual */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">

          {/* Features */}
          <div className="grid gap-5">
            {reasons.slice(0, 3).map((r) => (
              <div
                key={r.title}
                className="flex gap-4 p-5 rounded-2xl group transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,184,0,0.1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,184,0,0.35)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,184,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,184,0,0.1)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,184,0,0.15)', color: '#FFB800' }}
                >
                  {r.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{r.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual highlight */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1E1E1E, #252525)',
                border: '1px solid rgba(255,184,0,0.2)',
                padding: '2.5rem',
              }}
            >
              <div
                className="text-6xl font-black mb-2"
                style={{
                  background: 'linear-gradient(90deg, #FFB800, #E5A500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                #1
              </div>
              <div className="font-bold text-white text-2xl mb-4">
                Tool Distributor in Syria
              </div>
              <div className="w-16 h-1 mb-6 rounded-full" style={{ background: '#FFB800' }} />
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Trusted by thousands of professionals, contractors, and businesses across Syria. Our commitment to genuine products and outstanding support sets us apart.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Satisfied Customers', val: '10,000+' },
                  { label: 'Partner Workshops', val: '500+' },
                  { label: 'Cities Served', val: '10+' },
                  { label: 'Spare Parts Available', val: '2,000+' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-3 rounded-xl text-center"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="font-black text-xl" style={{ color: '#FFB800' }}>{s.val}</div>
                    <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row — remaining features */}
        <div className="grid sm:grid-cols-3 gap-5">
          {reasons.slice(3).map((r) => (
            <div
              key={r.title}
              className="flex gap-4 p-5 rounded-2xl transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,184,0,0.1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,184,0,0.35)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,184,0,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,184,0,0.1)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,184,0,0.15)', color: '#FFB800' }}
              >
                {r.icon}
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">{r.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
