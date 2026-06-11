import { useEffect, useRef, useState } from 'react';
import { Badge } from '@mantine/core';
import { ChevronDown, ChevronLeft, ChevronRight, Star, Shield, Zap } from 'lucide-react';

export default function HeroSection() {
  const countersRef = useRef<HTMLDivElement>(null);
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    'https://api.worksitetool.sy/storage/banners/FPiR8z4saLmyh7dEByO5zsykKlZtj0DqHL8IgeqX.png',
    'https://api.worksitetool.sy/storage/banners/MMPginofsHGoP4JJSchnKS5x6N3L7Kd1FWwBXuOw.png',
    'https://api.worksitetool.sy/storage/banners/S6ubEIbEMdSrm8QT73SY3A2TfSbZSbf4xll2ilry.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (countersRef.current) observer.observe(countersRef.current);
    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-count') || '0');
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString() + (el.getAttribute('data-suffix') || '');
      }, 16);
    });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,184,0,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,184,0,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: '#FFB800' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: '#FFB800' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Badge
                size="lg"
                styles={{
                  root: {
                    background: 'rgba(255,184,0,0.15)',
                    border: '1px solid rgba(255,184,0,0.4)',
                    color: '#FFB800',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                  },
                }}
              >
                By Ever Energy Company
              </Badge>
            </div>

            <h1 className="font-black text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
              Professional{' '}
              <span style={{ color: '#FFB800' }}>Power Tools</span>
              {' '}for Every Job
            </h1>

            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 500 }}>
              WorkSite Tools Syria brings world-class professional tools to Syria — over 5,000 varieties with unified, high-quality packaging and unmatched reliability.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: <Star size={14} />, label: 'Premium Quality' },
                { icon: <Shield size={14} />, label: 'Warranty Covered' },
                { icon: <Zap size={14} />, label: '5000+ Varieties' },
              ].map((pill) => (
                <span
                  key={pill.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  <span style={{ color: '#FFB800' }}>{pill.icon}</span>
                  {pill.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: '#FFB800', color: '#111111', boxShadow: '0 8px 32px rgba(255,184,0,0.35)' }}
              >
                Explore Products
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: 'transparent',
                  color: '#FFB800',
                  border: '2px solid rgba(255,184,0,0.5)',
                }}
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center w-full">
            <div
              className="relative w-full rounded-2xl overflow-hidden group"
              style={{
                aspectRatio: '16/9',
                background: 'linear-gradient(135deg, #1E1E1E 0%, #2A2A2A 100%)',
                border: '1px solid rgba(255,184,0,0.25)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
              }}
            >
              <div className="relative w-full h-full">
                {banners.map((url, index) => (
                  <img
                    key={url}
                    src={url}
                    alt={`WorkSite Banner ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                    style={{
                      opacity: currentBanner === index ? 1 : 0,
                      zIndex: currentBanner === index ? 1 : 0,
                    }}
                  />
                ))}

                <div
                  className="absolute inset-0 z-[2] pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(13,13,13,0.4) 0%, transparent 100%)',
                  }}
                />

                <button
                  onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#FFB800'; e.currentTarget.style.color = '#111111'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; e.currentTarget.style.color = '#FFFFFF'; }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#FFB800'; e.currentTarget.style.color = '#111111'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; e.currentTarget.style.color = '#FFFFFF'; }}
                >
                  <ChevronRight size={18} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBanner(index)}
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: currentBanner === index ? '16px' : '8px',
                        background: currentBanner === index ? '#FFB800' : 'rgba(255,255,255,0.4)',
                      }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div
                className="absolute top-4 right-4 px-4 py-2 rounded-xl font-black text-center z-[3]"
                style={{
                  background: '#FFB800',
                  color: '#111111',
                  fontSize: '0.75rem',
                  lineHeight: 1.3,
                  boxShadow: '0 4px 12px rgba(255,184,0,0.2)',
                }}
              >
                <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>5000+</div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>VARIETIES</div>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -left-4 px-5 py-4 rounded-2xl z-10"
              style={{
                background: 'rgba(26,26,26,0.95)',
                border: '1px solid rgba(255,184,0,0.3)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}
            >
              <div className="font-black text-xl" style={{ color: '#FFB800' }}>Global</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>Quality Standards</div>
            </div>
          </div>
        </div>

        <div
          ref={countersRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { count: 5000, suffix: '+', label: 'Tool Varieties' },
            { count: 15, suffix: '+', label: 'Years Experience' },
            { count: 20, suffix: '+', label: 'Exhibitions' },
            { count: 10, suffix: '+', label: 'Cities Covered' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,184,0,0.12)',
              }}
            >
              <div
                className="font-black text-3xl md:text-4xl mb-1"
                style={{ color: '#FFB800' }}
                data-count={stat.count}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: '#FFB800' }}>Scroll</span>
        <ChevronDown size={18} color="#FFB800" className="animate-bounce" />
      </button>
    </section>
  );
}
