import { Badge } from '@mantine/core';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';

const exhibitions = [
  {
    year: '2026',
    name: '24th Syria Buildex International Construction Exhibition',
    location: 'Damascus Fairground – Syria',
    desc: 'WorkSite Tools Syria is currently exhibiting at Buildex 2026, the premier international construction and building materials exhibition. Visit our booth to witness live product demonstrations, inspect our cordless collections, and meet our team.',
    highlight: 'HAPPENING NOW: Visit our booth!',
    status: 'live',
    date: 'June 10–14, 2026'
  },
];

export default function ExhibitionsSection() {
  return (
    <section id="exhibitions" className="py-24" style={{ background: '#151515' }}>
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
            Trade Shows & Events
          </Badge>
          <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Exhibition <span style={{ color: '#FFB800' }}>Participation</span>
          </h2>
          <p className="text-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, lineHeight: 1.7 }}>
            We actively participate in regional trade shows and exhibitions to connect with professionals, showcase new products, and grow the WorkSite community.
          </p>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 rounded-2xl"
          style={{
            background: 'rgba(255,184,0,0.06)',
            border: '1px solid rgba(255,184,0,0.2)',
          }}
        >
          {[
            { icon: <Trophy size={20} />, value: '20+', label: 'Exhibitions Attended' },
            { icon: <Calendar size={20} />, value: '10+', label: 'Years Participating' },
            { icon: <Users size={20} />, value: '50K+', label: 'Visitors Reached' },
            { icon: <MapPin size={20} />, value: '5+', label: 'Countries' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,184,0,0.2)', color: '#FFB800' }}
              >
                {s.icon}
              </div>
              <div>
                <div className="font-black text-xl" style={{ color: '#FFB800' }}>{s.value}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #FFB800, rgba(255,184,0,0.1))' }}
          />

          <div className="space-y-6">
            {exhibitions.map((ex) => (
              <div
                key={`${ex.year}-${ex.name}`}
                className="relative md:pl-20 animate-fade-in"
              >
                <div
                  className="absolute left-5 top-6 w-6 h-6 rounded-full border-2 hidden md:flex items-center justify-center"
                  style={{
                    borderColor: ex.status === 'live'
                      ? '#25D366'
                      : ex.status === 'upcoming' 
                        ? '#FFB800' 
                        : 'rgba(255,184,0,0.4)',
                    background: ex.status === 'live'
                      ? '#25D366'
                      : ex.status === 'upcoming'
                        ? '#FFB800'
                        : '#1A1A1A',
                  }}
                >
                  {(ex.status === 'upcoming' || ex.status === 'live') && (
                    <div className="w-2 h-2 rounded-full" style={{ background: '#111111' }} />
                  )}
                </div>

                <div
                  className="p-6 rounded-2xl transition-all duration-200"
                  style={{
                    background: ex.status === 'live'
                      ? 'rgba(37,211,102,0.06)'
                      : ex.status === 'upcoming'
                        ? 'rgba(255,184,0,0.06)'
                        : 'rgba(255,255,255,0.03)',
                    border: ex.status === 'live'
                      ? '1px solid rgba(37,211,102,0.45)'
                      : ex.status === 'upcoming'
                        ? '1px solid rgba(255,184,0,0.35)'
                        : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: ex.status === 'live'
                      ? '0 0 20px rgba(37,211,102,0.15)'
                      : 'none',
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span
                          className="text-sm font-black px-3 py-1 rounded-full"
                          style={{
                            background: ex.status === 'live'
                              ? '#25D366'
                              : ex.status === 'upcoming'
                                ? '#FFB800'
                                : 'rgba(255,184,0,0.15)',
                            color: ex.status === 'live' || ex.status === 'upcoming' ? '#111111' : '#FFB800',
                          }}
                        >
                          {ex.year}
                        </span>
                        
                        {ex.status === 'live' && (
                          <span
                            className="text-xs font-bold px-2.5 py-0.5 rounded-full animate-pulse flex items-center gap-1.5"
                            style={{
                              background: 'rgba(37,211,102,0.15)',
                              color: '#25D366',
                              border: '1px solid rgba(37,211,102,0.3)',
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Happening Now
                          </span>
                        )}

                        {ex.status === 'upcoming' && (
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full animate-pulse"
                            style={{
                              background: 'rgba(255,184,0,0.15)',
                              color: '#FFB800',
                              border: '1px solid rgba(255,184,0,0.3)',
                            }}
                          >
                            Upcoming
                          </span>
                        )}

                        <span className="flex items-center gap-1 text-sm text-gray-400">
                          <Calendar size={12} />
                          {ex.date}
                        </span>
                        
                        <span className="flex items-center gap-1 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          <MapPin size={12} />
                          {ex.location}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-lg mb-2">{ex.name}</h3>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        {ex.desc}
                      </p>
                      <span
                        className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full"
                        style={{
                          background: ex.status === 'live' ? 'rgba(37,211,102,0.1)' : 'rgba(255,184,0,0.1)',
                          color: ex.status === 'live' ? '#25D366' : '#FFB800',
                          border: ex.status === 'live' ? '1px solid rgba(37,211,102,0.2)' : '1px solid rgba(255,184,0,0.2)',
                        }}
                      >
                        <Trophy size={10} /> {ex.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-12 p-8 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,184,0,0.08) 0%, rgba(255,184,0,0.04) 100%)',
            border: '1px solid rgba(255,184,0,0.25)',
          }}
        >
          <h3 className="font-bold text-white text-xl mb-2">Interested in Meeting Us?</h3>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Join us at our next exhibition or schedule a private meeting to explore the full WorkSite catalog.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            style={{ background: '#FFB800', color: '#111111' }}
          >
            Schedule a Meeting
          </button>
        </div>
      </div>
    </section>
  );
}
