import { Wrench, Phone, Mail, MapPin, Facebook } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Exhibitions', href: '#exhibitions' },
  { label: 'Locations', href: '#locations' },
  { label: 'Contact', href: '#contact' },
];

const categories = [
  'Power Tools',
  'Hand Tools',
  'Measuring Tools',
  'Welding Equipment',
  'Generators',
  'Air Tools & Compressors',
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#0D0D0D', borderTop: '1px solid rgba(255,184,0,0.15)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>
            <a
              href="#home"
              className="flex items-center gap-3 mb-5"
              onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: '#FFB800' }}
              >
                <Wrench size={22} color="#111111" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <div className="font-black text-white text-sm uppercase tracking-wider">WorkSite</div>
                <div className="font-bold text-xs uppercase tracking-widest" style={{ color: '#FFB800' }}>
                  Tools Syria
                </div>
              </div>
            </a>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Syria's premier distributor of professional power tools and industrial equipment. A subsidiary of Ever Energy Company.
            </p>

            <div className="flex gap-3">
              {[
                { icon: <Facebook size={16} />, href: 'https://www.facebook.com/profile.php?id=61585504869647' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#FFB800';
                    (e.currentTarget as HTMLElement).style.color = '#111111';
                    (e.currentTarget as HTMLElement).style.borderColor = '#FFB800';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm transition-colors duration-200 flex items-center gap-2"
                    style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFB800'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: '#FFB800' }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Product Categories</h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#products"
                    onClick={(e) => { e.preventDefault(); scrollTo('#products'); }}
                    className="text-sm transition-colors duration-200 flex items-center gap-2"
                    style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFB800'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: '#FFB800' }}
                    />
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,184,0,0.12)', color: '#FFB800' }}
                >
                  <MapPin size={14} />
                </div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  Damascus, Syria<br />
                  Zuqaq Al-Jin
                </p>
              </div>
              <a
                href="tel:+963112227973"
                className="flex items-center gap-3 group"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,184,0,0.12)', color: '#FFB800' }}
                >
                  <Phone size={14} />
                </div>
                <span
                  className="text-sm transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFB800'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  011 222 7973
                </span>
              </a>
              <a
                href="mailto:g.kabbani@everenergy-sy.com"
                className="flex items-center gap-3"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,184,0,0.12)', color: '#FFB800' }}
                >
                  <Mail size={14} />
                </div>
                <span
                  className="text-sm transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFB800'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  g.kabbani@everenergy-sy.com
                </span>
              </a>
            </div>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="mt-6 w-full flex items-center justify-center py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105"
              style={{ background: '#FFB800', color: '#111111', textDecoration: 'none', display: 'flex' }}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} WorkSite Tools Syria — By Ever Energy Company. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span>Professional Tools for Syria</span>
            <span style={{ color: '#FFB800', marginLeft: 4 }}>●</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
