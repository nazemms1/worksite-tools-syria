import { useState, useEffect } from 'react';
import { Badge, TextInput, Textarea, Select } from '@mantine/core';
import { Phone, Mail, MessageCircle, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { products } from '../data/products';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    productId: '',
    subject: 'Product Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [lastSelectedLabel, setLastSelectedLabel] = useState('');

  useEffect(() => {
    if (searchQuery && searchQuery === lastSelectedLabel) {
      return;
    }

    let active = true;
    const fetchSearchedProducts = async () => {
      setSearching(true);
      try {
        const url = `https://api.worksitetool.sy/api/v1/products?search=${encodeURIComponent(searchQuery)}&per_page=30&page=1`;
        const response = await fetch(url);
        if (response.ok && active) {
          const json = await response.json();
          const items = Array.isArray(json.data)
            ? json.data
            : (json.data?.data && Array.isArray(json.data.data))
              ? json.data.data
              : [];
          setApiProducts(items);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setSearching(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSearchedProducts();
    }, 400);

    return () => {
      active = false;
      clearTimeout(delayDebounceFn);
    };
  }, [searchQuery, lastSelectedLabel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.productId) {
      setSubmitError('Please select a product of interest.');
      return;
    }
    setLoading(true);
    setSubmitError(null);
    try {
      let formattedPhone = form.phone.trim().replace(/[\s()-]/g, '');
      if (formattedPhone.startsWith('00')) {
        formattedPhone = '+' + formattedPhone.substring(2);
      } else if (formattedPhone.startsWith('0')) {
        formattedPhone = '+963' + formattedPhone.substring(1);
      } else if (formattedPhone.startsWith('963') && !formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      } else if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      }

      const formattedMessage = `[Subject: ${form.subject}]\n${form.message}`;

      const response = await fetch('https://api.worksitetool.sy/api/v1/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: formattedPhone,
          company: form.company,
          message: formattedMessage,
          items: [
            {
              product_id: Number(form.productId),
              quantity: 1,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const errMsg = errJson.message || 'Failed to submit message to the server.';
        throw new Error(errMsg);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'Failed to send message. Please check your connection or contact us directly via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const selectData = (() => {
    const list = apiProducts.length > 0 ? [...apiProducts] : [...products];
    if (form.productId) {
      const exists = list.some(p => String(p.id) === form.productId);
      if (!exists) {
        const localProduct = products.find(p => String(p.id) === form.productId);
        if (localProduct) {
          list.push(localProduct);
        } else {
          list.push({ id: Number(form.productId), uuid: 'Selected', name_en: 'Selected Product' });
        }
      }
    }
    return list.map((p) => ({
      value: String(p.id),
      label: p.uuid ? `${p.uuid} - ${p.name_en || p.name || ''}` : (p.name_en || p.name || ''),
    }));
  })();

  const inputStyles = {
    input: {
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.12)',
      color: '#ffffff',
      borderRadius: 10,
      '&:focus': {
        borderColor: '#FFB800',
        boxShadow: '0 0 0 2px rgba(255,184,0,0.15)',
      },
    },
    label: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: '0.875rem',
      marginBottom: 6,
    },
  };

  return (
    <section id="contact" className="py-24" style={{ background: '#151515' }}>
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
            Get in Touch
          </Badge>
          <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Contact <span style={{ color: '#FFB800' }}>WorkSite Syria</span>
          </h2>
          <p className="text-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 540, lineHeight: 1.7 }}>
            Have a question, need a quote, or want to become a distributor? Our team is ready to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-5">
            {[
              {
                icon: <Phone size={22} />,
                label: 'Phone',
                value: '011 222 7973',
                href: 'tel:+963112227973',
                sub: 'Sat–Thu, 9AM–7PM',
              },
              {
                icon: <Mail size={22} />,
                label: 'Email',
                value: 'g.kabbani@everenergy-sy.com',
                href: 'mailto:g.kabbani@everenergy-sy.com',
                sub: 'We reply within 24 hours',
              },
              {
                icon: <MessageCircle size={22} />,
                label: 'WhatsApp',
                value: '+963 933 533 102',
                href: 'https://wa.me/963933533102',
                sub: 'Quick responses',
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 p-5 rounded-2xl group transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,184,0,0.4)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,184,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ background: 'rgba(255,184,0,0.15)', color: '#FFB800' }}
                >
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {c.label}
                  </div>
                  <div className="font-semibold text-white">{c.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{c.sub}</div>
                </div>
              </a>
            ))}

            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p className="text-sm font-semibold text-white mb-3">Follow us on Facebook</p>
              <div className="flex gap-3">
                {[
                  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61585504869647' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex-1 text-center py-2 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      background: 'rgba(255,184,0,0.1)',
                      border: '1px solid rgba(255,184,0,0.2)',
                      color: '#FFB800',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = '#FFB800';
                      (e.currentTarget as HTMLElement).style.color = '#111111';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,184,0,0.1)';
                      (e.currentTarget as HTMLElement).style.color = '#FFB800';
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-3 p-8 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'rgba(255,184,0,0.15)' }}
                >
                  <CheckCircle size={40} style={{ color: '#FFB800' }} />
                </div>
                <h3 className="font-bold text-white text-2xl mb-3">Message Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Thank you for reaching out. Your inquiry has been submitted directly to our database and our team will get back to you soon.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', company: '', productId: '', subject: 'Product Inquiry', message: '' }); }}
                  className="mt-6 px-6 py-2.5 rounded-full font-semibold text-sm transition-all"
                  style={{ background: 'rgba(255,184,0,0.15)', color: '#FFB800', border: '1px solid rgba(255,184,0,0.3)' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-bold text-white text-xl mb-6">Send Us a Message</h3>
                
                {submitError && (
                  <div className="mb-4 p-4 rounded-xl flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertTriangle size={18} />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <TextInput
                    label="Full Name"
                    placeholder="Your full name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    styles={inputStyles}
                  />
                  <TextInput
                    label="Phone Number"
                    placeholder="+963 9X XXX XXXX"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    styles={inputStyles}
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <TextInput
                    label="Email Address"
                    placeholder="your@email.com"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    styles={inputStyles}
                  />
                  <TextInput
                    label="Company Name"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    styles={inputStyles}
                  />
                </div>

                <Select
                  label="Product of Interest"
                  placeholder="Type to search and select product..."
                  mb="md"
                  required
                  searchable
                  searchValue={searchQuery}
                  onSearchChange={(val) => {
                    setSearchQuery(val);
                    if (val !== lastSelectedLabel) {
                      setForm({ ...form, productId: '' });
                    }
                  }}
                  nothingFoundMessage={searching ? "Searching..." : "No products found"}
                  filter={({ options }) => options}
                  data={selectData}
                  value={form.productId}
                  onChange={(val) => {
                    const prodId = val || '';
                    setForm({ ...form, productId: prodId });
                    if (prodId) {
                      const allProds = apiProducts.length > 0 ? apiProducts : products;
                      const selected = allProds.find(p => String(p.id) === prodId);
                      if (selected) {
                        const label = selected.uuid 
                          ? `${selected.uuid} - ${selected.name_en || selected.name || ''}` 
                          : (selected.name_en || selected.name || '');
                        setLastSelectedLabel(label);
                        setSearchQuery(label);
                      }
                    } else {
                      setLastSelectedLabel('');
                      setSearchQuery('');
                    }
                  }}
                  styles={inputStyles}
                />

                <Select
                  label="Subject"
                  placeholder="Select a topic"
                  mb="md"
                  data={[
                    'Product Inquiry',
                    'Price Quote',
                    'Distributor / Agent Inquiry',
                    'After-Sales Support',
                    'Exhibition Information',
                    'Other',
                  ]}
                  value={form.subject}
                  onChange={(val) => setForm({ ...form, subject: val || 'Product Inquiry' })}
                  styles={inputStyles}
                />
                
                <Textarea
                  label="Message"
                  placeholder="Tell us how we can help you..."
                  required
                  minRows={4}
                  mb="xl"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  styles={inputStyles}
                />
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: '#FFB800', color: '#111111' }}
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
