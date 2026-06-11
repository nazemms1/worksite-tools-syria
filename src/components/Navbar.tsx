import { useState, useEffect } from 'react';
import { Burger, Drawer, Stack, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Wrench } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Exhibitions', href: '#exhibitions' },
  { label: 'Locations', href: '#locations' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    close();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(17, 17, 17, 0.97)'
            : 'rgba(17, 17, 17, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(255,184,0,0.25)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a
              href="#home"
              className="flex items-center gap-3 group"
              onClick={(e) => { e.preventDefault(); handleLinkClick('#home'); }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: '#FFB800' }}
              >
                <Wrench size={22} color="#111111" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <div className="font-black text-white tracking-wide text-sm uppercase" style={{ letterSpacing: '0.08em' }}>
                  WorkSite
                </div>
                <div className="font-bold text-xs tracking-widest uppercase" style={{ color: '#FFB800', letterSpacing: '0.2em' }}>
                  Tools Syria
                </div>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                    className="relative px-4 py-2 text-sm font-medium transition-all duration-200 group"
                    style={{
                      color: isActive ? '#FFB800' : 'rgba(255,255,255,0.75)',
                    }}
                  >
                    {link.label}
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300"
                      style={{
                        background: '#FFB800',
                        width: isActive ? '70%' : '0%',
                      }}
                    />
                    <span
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: 'rgba(255,184,0,0.07)' }}
                    />
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleLinkClick('#contact'); }}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: '#FFB800', color: '#111111' }}
              >
                Get in Touch
              </a>
              <Burger
                opened={opened}
                onClick={open}
                color="#FFB800"
                size="sm"
                className="lg:hidden"
              />
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 h-px transition-all duration-500"
          style={{
            width: `${(() => {
              const idx = navLinks.findIndex(l => l.href === `#${activeSection}`);
              return idx >= 0 ? ((idx + 1) / navLinks.length) * 100 : 0;
            })()}%`,
            background: 'linear-gradient(90deg, transparent, #FFB800)',
          }}
        />
      </nav>

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="xs"
        withCloseButton={true}
        styles={{
          content: { background: '#1A1A1A', borderLeft: '1px solid rgba(255,184,0,0.2)' },
          header: { background: '#1A1A1A', borderBottom: '1px solid rgba(255,184,0,0.15)' },
          title: { color: '#FFB800', fontWeight: 700 },
          close: { color: '#ffffff' },
        }}
        title=""
      >
        <Stack gap="xs" mt="md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <Anchor
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                style={{
                  color: isActive ? '#FFB800' : 'rgba(255,255,255,0.85)',
                  background: isActive ? 'rgba(255,184,0,0.08)' : 'transparent',
                  padding: '12px 16px',
                  borderRadius: 8,
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  display: 'block',
                  borderLeft: isActive ? '3px solid #FFB800' : '3px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Anchor>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#contact'); close(); }}
            className="mt-4 text-center py-3 rounded-full font-bold transition-all"
            style={{ background: '#FFB800', color: '#111111' }}
          >
            Get in Touch
          </a>
        </Stack>
      </Drawer>
    </>
  );
}
