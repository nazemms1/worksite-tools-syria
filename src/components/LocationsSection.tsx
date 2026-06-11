import { Badge } from '@mantine/core';
import { MapPin, Phone, HelpCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const locations = [
  {
    name: 'Ghiath & Khaled Al-Kabbani',
    city: 'Damascus - Zuqaq Al-Jin',
    phones: [{ display: '011 221 0330', dial: '+963112210330' }],
    highlight: true,
  },
  {
    name: 'Al-Saqqal Shop',
    city: 'Damascus - Al-Marjeh',
    phones: [{ display: '011 223 3958', dial: '+963112233958' }],
    highlight: false,
  },
  {
    name: 'Haboub Company',
    city: 'Reef Damascus - Jdeidet Artouz',
    phones: [{ display: '0981 001 530', dial: '+963981001530' }],
    highlight: false,
  },
  {
    name: 'Hassan Kharsan Shop',
    city: 'Homs',
    phones: [{ display: '0944 945 166', dial: '+963944945166' }],
    highlight: false,
  },
  {
    name: 'Hassan Raheem',
    city: 'Idlib - Sarmada',
    phones: [{ display: '0992 798 896', dial: '+963992798896' }],
    highlight: false,
  },
  {
    name: 'Bashir Al-Khasharfeh Center',
    city: 'Daraa - Nawa',
    phones: [{ display: '0996 812 808', dial: '+963996812808' }],
    highlight: false,
  },
  {
    name: 'Bahaa Al-Salammat',
    city: 'Daraa - Al-Harak',
    phones: [{ display: '0949 972 323', dial: '+963949972323' }],
    highlight: false,
  },
  {
    name: 'Mohammad Al-Shoaib',
    city: 'Raqqa',
    phones: [{ display: '0988 600 702', dial: '+963988600702' }],
    highlight: false,
  },
  {
    name: 'Radwan Trading',
    city: 'Al-Hasakah',
    phones: [{ display: '0934 501 282', dial: '+963934501282' }],
    highlight: false,
  },
  {
    name: 'Awad Caravan Company',
    city: 'Hama - Mhardeh',
    phones: [
      { display: '013 473 0740', dial: '+963134730740' },
      { display: '013 473 6555', dial: '+963134736555' }
    ],
    highlight: false,
  },
];

export default function LocationsSection() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="locations" className="py-24" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
            Authorized Distributors
          </Badge>
          <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Our <span style={{ color: '#FFB800' }}>Representatives & Agents</span>
          </h2>
          <p className="text-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 640, lineHeight: 1.7 }}>
            Find our authorized representatives and agents across Syria's governorates
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between"
              style={{
                background: loc.highlight ? 'rgba(255,184,0,0.06)' : 'rgba(255,255,255,0.02)',
                border: loc.highlight 
                  ? '1px solid rgba(255,184,0,0.35)' 
                  : (hoverIndex === idx ? '1px solid rgba(255,184,0,0.3)' : '1px solid rgba(255,255,255,0.06)'),
                transform: hoverIndex === idx ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoverIndex === idx ? '0 12px 30px rgba(255,184,0,0.08)' : 'none',
              }}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span
                    className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{
                      background: loc.highlight ? '#FFB800' : 'rgba(255,255,255,0.08)',
                      color: loc.highlight ? '#111111' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {loc.highlight ? 'Main Agent' : 'Authorized Agent'}
                  </span>
                </div>

                <h3 className="font-extrabold text-white text-lg mb-4 leading-snug">
                  {loc.name}
                </h3>

                <div className="space-y-2 mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <MapPin size={15} style={{ color: '#FFB800' }} />
                    <span className="text-sm">{loc.city}</span>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-2">
                    {loc.phones.map((phoneObj, pIdx) => (
                      <a
                        key={pIdx}
                        href={`tel:${phoneObj.dial}`}
                        className="flex items-center gap-2.5 text-sm font-medium transition-colors"
                        style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#FFB800'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                      >
                        <Phone size={14} style={{ color: '#FFB800' }} />
                        <span>{phoneObj.display}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div
            className="p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between"
            style={{
              background: 'rgba(255,184,0,0.02)',
              border: hoverIndex === 99 ? '1px solid #FFB800' : '1px dashed rgba(255,184,0,0.25)',
              transform: hoverIndex === 99 ? 'translateY(-4px)' : 'translateY(0)',
              boxShadow: hoverIndex === 99 ? '0 12px 30px rgba(255,184,0,0.08)' : 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHoverIndex(99)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={scrollToContact}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(255,184,0,0.1)', color: '#FFB800' }}>
                  <HelpCircle size={24} />
                </div>
                <h3 className="font-extrabold text-white text-lg mb-4 leading-snug">
                  More Locations Soon
                </h3>
                <p className="text-xs leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  We are expanding our network. Contact us if you are interested in becoming an authorized dealer or distributor for WorkSite tools in Syria.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold pt-6" style={{ color: '#FFB800' }}>
                Become a Partner <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
