import { useState, useEffect } from 'react';
import { Badge, Modal, Table } from '@mantine/core';
import { 
  Zap, Hammer, Ruler, Wrench, Settings, Cpu,
  Search, MessageCircle, ChevronLeft, ArrowRight,
  Info, AlertTriangle, RefreshCw, Send
} from 'lucide-react';
import { products as localProducts, Product } from '../data/products';
import { categories as localCategories, Category } from '../data/categories';

const getCategoryIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('drill') || n.includes('hammer')) return <Zap size={28} />;
  if (n.includes('grinder') || n.includes('saw') || n.includes('clipper')) return <Settings size={28} />;
  if (n.includes('set')) return <Hammer size={28} />;
  if (n.includes('pump') || n.includes('wash') || n.includes('compressor')) return <Cpu size={28} />;
  if (n.includes('welding') || n.includes('generator')) return <Wrench size={28} />;
  if (n.includes('hand') || n.includes('tool')) return <Hammer size={28} />;
  return <Ruler size={28} />;
};

export default function ProductsSection() {
  const [viewMode, setViewMode] = useState<'categories' | 'products'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeHover, setActiveHover] = useState<number | null>(null);
  
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fetchedCategories, setFetchedCategories] = useState<Category[]>(localCategories);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: 'Please send me a quotation for this product.',
    quantity: 1,
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

  const fetchCategoriesFromApi = async () => {
    setCategoriesLoading(true);
    try {
      const response = await fetch('https://api.worksitetool.sy/api/v1/categories');
      if (response.ok) {
        const json = await response.json();
        const items = Array.isArray(json.data)
          ? json.data
          : (json.data?.data && Array.isArray(json.data.data))
            ? json.data.data
            : [];
        if (items.length > 0) {
          const mapped = items.map((cat: any) => ({
            id: cat.id,
            name_en: cat.name_en || cat.name || 'Category',
            name_ar: cat.name_ar || cat.name_en || cat.name || '',
            image: cat.image || 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=400',
            products_count: cat.products_count || 0
          }));
          setFetchedCategories(mapped);
        }
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchProductsFromApi = async (categoryId: number | null) => {
    setLoading(true);
    setError(null);
    try {
      let url = 'https://api.worksitetool.sy/api/v1/products?per_page=50&page=1';
      if (categoryId) {
        url += `&category_id=${categoryId}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const json = await response.json();
      
      const items = Array.isArray(json.data)
        ? json.data
        : (json.data?.data && Array.isArray(json.data.data))
          ? json.data.data
          : [];
          
      setFetchedProducts(items);
    } catch (err) {
      console.error('API Fetch error:', err);
      setError('Could not connect to the live server. Displaying local catalog.');
      
      if (categoryId === 2 || categoryId === null) {
        setFetchedProducts(localProducts);
      } else {
        setFetchedProducts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesFromApi();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const categoryId = selectedCategory === 'All' ? null : selectedCategory.id;
      fetchProductsFromApi(categoryId);
    }
  }, [selectedCategory]);

  const filteredProducts = fetchedProducts.filter((product) => {
    const matchesSearch =
      product.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.name_ar && product.name_ar.includes(searchQuery)) ||
      product.uuid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.localized_description_data && product.localized_description_data.some(
        (desc) =>
          desc.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
          desc.value.toLowerCase().includes(searchQuery.toLowerCase())
      ));

    return matchesSearch;
  });

  const handleCategorySelect = (category: Category | 'All') => {
    setSelectedCategory(category);
    setViewMode('products');
    setSearchQuery('');
    
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleWhatsAppInquiry = (product: Product) => {
    const message = `Hello WorkSite Syria, I am interested in inquiring about the following product:\n\n- Model/UUID: ${product.uuid}\n- Name: ${product.name_en}\n- Price: ${product.currency.symbol}${product.price}\n\nPlease let me know if it is available at the Damascus main warehouse.`;
    const whatsappUrl = `https://wa.me/963933533102?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryProduct) return;
    setInquiryLoading(true);
    setInquiryError(null);
    try {
      let formattedPhone = inquiryForm.phone.trim().replace(/[\s()-]/g, '');
      if (formattedPhone.startsWith('00')) {
        formattedPhone = '+' + formattedPhone.substring(2);
      } else if (formattedPhone.startsWith('0')) {
        formattedPhone = '+963' + formattedPhone.substring(1);
      } else if (formattedPhone.startsWith('963') && !formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      } else if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      }

      const response = await fetch('https://api.worksitetool.sy/api/v1/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inquiryForm.name,
          email: inquiryForm.email,
          phone: formattedPhone,
          company: inquiryForm.company,
          message: inquiryForm.message,
          items: [
            {
              product_id: inquiryProduct.id,
              quantity: Number(inquiryForm.quantity) || 1,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const errMsg = errJson.message || 'Failed to submit product inquiry.';
        throw new Error(errMsg);
      }

      setInquirySubmitted(true);
    } catch (err: any) {
      console.error(err);
      setInquiryError(err.message || 'Failed to submit quote inquiry. Please try again.');
    } finally {
      setInquiryLoading(false);
    }
  };

  return (
    <section id="products" className="py-24" style={{ background: '#151515' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {viewMode === 'categories' && (
          <>
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
                Our Catalog
              </Badge>
              <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Product <span style={{ color: '#FFB800' }}>Categories</span>
              </h2>
              <p className="text-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, lineHeight: 1.7 }}>
                Explore our extensive range of professional tools spanning {fetchedCategories.length} major categories. Click a category to view products.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fetchedCategories.map((cat, i) => (
                <div
                  key={cat.id}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    border: activeHover === i ? '1px solid rgba(255,184,0,0.5)' : '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease',
                    boxShadow: activeHover === i ? '0 8px 32px rgba(255,184,0,0.15)' : 'none',
                  }}
                  onMouseEnter={() => setActiveHover(i)}
                  onMouseLeave={() => setActiveHover(null)}
                  onClick={() => handleCategorySelect(cat)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name_en}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ opacity: 0.45 }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(17,17,17,0.1), rgba(17,17,17,0.9))',
                      }}
                    />
                    <div
                      className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: activeHover === i ? '#FFB800' : 'rgba(255,184,0,0.2)',
                        color: activeHover === i ? '#111111' : '#FFB800',
                        transition: 'all 0.3s',
                      }}
                    >
                      {getCategoryIcon(cat.name_en)}
                    </div>
                  </div>

                  <div className="p-5 animate-fade-in" style={{ background: '#1A1A1A' }}>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-white text-base md:text-lg">{cat.name_en}</h3>
                      <ArrowRight size={16} className="text-gray-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                    </div>


                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <span className="text-xs text-gray-500">Available Range</span>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-bold"
                        style={{
                          background: 'rgba(255,184,0,0.06)',
                          border: '1px solid rgba(255,184,0,0.15)',
                          color: '#FFB800',
                        }}
                      >
                        {cat.products_count} Items
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => handleCategorySelect('All')}
                className="px-8 py-3.5 rounded-full font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: '#FFB800', color: '#111111' }}
              >
                Browse All Products
              </button>
            </div>
          </>
        )}

        {viewMode === 'products' && (
          <div className="animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <button
                onClick={() => {
                  setViewMode('categories');
                  setSelectedCategory(null);
                  setFetchedProducts([]);
                  setTimeout(() => {
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                className="flex items-center gap-2 text-sm font-bold transition-all hover:text-yellow-400"
                style={{ color: '#FFB800' }}
              >
                <ChevronLeft size={18} /> Back to Categories
              </button>
              <h2 className="text-2xl font-black text-white">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory?.name_en}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              <div className="md:col-span-2 relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                />
                <input
                  type="text"
                  placeholder="Search by product name, model (e.g. CD434), specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-white outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#FFB800';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
                  style={{
                    background: selectedCategory === 'All' ? '#FFB800' : 'rgba(255,255,255,0.03)',
                    color: selectedCategory === 'All' ? '#111111' : 'rgba(255,255,255,0.7)',
                    border: selectedCategory === 'All' ? '1px solid #FFB800' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  All
                </button>
                {fetchedCategories.slice(0, 4).map((cat) => {
                  const isActive = selectedCategory !== 'All' && selectedCategory?.id === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
                      style={{
                        background: isActive ? '#FFB800' : 'rgba(255,255,255,0.03)',
                        color: isActive ? '#111111' : 'rgba(255,255,255,0.7)',
                        border: isActive ? '1px solid #FFB800' : '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {cat.name_en}
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
                <AlertTriangle size={18} />
                <span>{error}</span>
                <button 
                  onClick={() => fetchProductsFromApi(selectedCategory === 'All' ? null : selectedCategory.id)} 
                  className="ml-auto flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <RefreshCw size={12} /> Retry
                </button>
              </div>
            )}

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="rounded-2xl overflow-hidden border border-white/5"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="aspect-square bg-white/5 animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-white/5 rounded w-1/3 animate-pulse" />
                      <div className="h-5 bg-white/5 rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />
                      <div className="h-8 bg-white/5 rounded w-full animate-pulse mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div
                className="p-10 rounded-2xl text-center max-w-2xl mx-auto"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <AlertTriangle size={48} className="mx-auto mb-4" style={{ color: '#FFB800' }} />
                <h3 className="text-xl font-bold text-white mb-3">Online Catalog Updating</h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  We are currently updating our online database for this category. 
                  However, our warehouse in Damascus carries the complete catalog of WorkSite products. 
                  Contact us on WhatsApp to inquire about specific tools in this category.
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://wa.me/963933533102"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                    style={{ background: '#25D366', color: '#FFFFFF' }}
                  >
                    <MessageCircle size={18} /> Inquire on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setViewMode('categories');
                      setSelectedCategory(null);
                      setTimeout(() => {
                        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                    className="px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:bg-white/10"
                    style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    Browse Categories
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="relative pt-[100%] bg-zinc-900/60 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <img
                        src={product.thumbnail?.url || 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=400'}
                        alt={product.name_en}
                        className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      />
                      <Badge
                        className="absolute top-4 left-4"
                        styles={{
                          root: {
                            background: 'rgba(0,0,0,0.7)',
                            border: '1px solid rgba(255,184,0,0.5)',
                            color: '#FFB800',
                            textTransform: 'none',
                          },
                        }}
                      >
                        {product.uuid}
                      </Badge>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between" style={{ background: '#1A1A1A' }}>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-yellow-500 font-bold mb-1">
                          {product.category?.name_en || 'Tools'}
                        </div>
                        <h3 className="font-bold text-white text-sm leading-snug mb-1 line-clamp-2 cursor-pointer hover:text-yellow-400 transition-colors" onClick={() => setSelectedProduct(product)}>
                          {product.name_en}
                        </h3>

                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div>
                          <div className="text-xs text-gray-400">Price</div>
                          <div className="text-lg font-black text-white">
                            {product.currency?.symbol || '$'}{product.price.toFixed(2)}
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
                          style={{
                            background: 'rgba(255,184,0,0.1)',
                            border: '1px solid rgba(255,184,0,0.2)',
                            color: '#FFB800',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#FFB800';
                            e.currentTarget.style.color = '#111111';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,184,0,0.1)';
                            e.currentTarget.style.color = '#FFB800';
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <Modal
          opened={selectedProduct !== null}
          onClose={() => setSelectedProduct(null)}
          title={
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-base">Product details</span>
              <Badge size="xs" styles={{ root: { background: 'rgba(255,184,0,0.2)', color: '#FFB800', border: '1px solid rgba(255,184,0,0.3)' } }}>
                {selectedProduct?.uuid}
              </Badge>
            </div>
          }
          size="lg"
          centered
          styles={{
            root: {
              zIndex: 9999,
            },
            content: {
              background: '#1A1A1A',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              padding: '12px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            },
            header: {
              background: '#1A1A1A',
              color: '#FFFFFF',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              paddingBottom: '16px',
            },
            close: {
              color: '#FFFFFF',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '50%',
              transition: 'background 0.2s',
              '&:hover': {
                background: 'rgba(255,255,255,0.15)',
              },
            },
          }}
        >
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div
                className="relative rounded-2xl flex items-center justify-center p-6"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <img
                  src={selectedProduct.thumbnail?.url || 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={selectedProduct.name_en}
                  className="w-full h-auto max-h-[300px] object-contain"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <Badge
                    size="sm"
                    mb="xs"
                    styles={{
                      root: {
                        background: 'rgba(255,184,0,0.1)',
                        border: '1px solid rgba(255,184,0,0.2)',
                        color: '#FFB800',
                      },
                    }}
                  >
                    {selectedProduct.category?.name_en || 'Tools'}
                  </Badge>

                  <h3 className="font-extrabold text-white text-xl leading-tight mb-2">
                    {selectedProduct.name_en}
                  </h3>



                  <div className="grid grid-cols-2 gap-4 p-4 rounded-xl mb-6 bg-white/5 border border-white/5">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-semibold">Dealer Price</div>
                      <div className="text-xl font-black text-yellow-500">
                        {selectedProduct.currency?.symbol || '$'}{selectedProduct.price.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-semibold">Availability</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-400">
                          {selectedProduct.total_available_quantity} available
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedProduct.localized_description_data && selectedProduct.localized_description_data.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Technical Specifications</h4>
                      <div className="rounded-xl overflow-hidden border border-white/5">
                        <Table highlightOnHover verticalSpacing="xs">
                          <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                              <th style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Feature</th>
                              <th style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedProduct.localized_description_data.map((spec) => (
                              <tr key={spec.key}>
                                <td style={{ color: '#FFFFFF', fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{spec.key}</td>
                                <td style={{ color: '#FFB800', fontSize: '12px', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{spec.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setInquiryProduct(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-extrabold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: '#FFB800', color: '#111111' }}
                  >
                    <Send size={16} /> Request Price Quote
                  </button>
                  <button
                    onClick={() => handleWhatsAppInquiry(selectedProduct)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-extrabold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: '#25D366', color: '#FFFFFF' }}
                  >
                    <MessageCircle size={18} /> Inquire via WhatsApp
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full py-2.5 rounded-xl font-bold text-xs transition-all hover:bg-white/5"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          opened={inquiryProduct !== null}
          onClose={() => {
            setInquiryProduct(null);
            setInquirySubmitted(false);
            setInquiryForm({ name: '', phone: '', email: '', company: '', message: 'Please send me a quotation for this product.', quantity: 1 });
          }}
          title={
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-base">Request Price Quote</span>
            </div>
          }
          size="md"
          centered
          styles={{
            root: {
              zIndex: 10000,
            },
            content: {
              background: '#1A1A1A',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              padding: '12px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            },
            header: {
              background: '#1A1A1A',
              color: '#FFFFFF',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              paddingBottom: '16px',
            },
            close: {
              color: '#FFFFFF',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '50%',
            },
          }}
        >
          {inquiryProduct && (
            <div>
              {inquirySubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <span className="text-2xl text-emerald-500">✓</span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Quote Requested!</h3>
                  <p className="text-sm text-gray-400 mb-6">
                    We have received your quotation request for <strong>{inquiryProduct.name_en}</strong>. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setInquiryProduct(null);
                      setInquirySubmitted(false);
                    }}
                    className="w-full py-2.5 rounded-xl font-bold text-xs"
                    style={{ background: '#FFB800', color: '#111111' }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4 pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-2">
                    <img src={inquiryProduct.thumbnail?.url || 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=400'} alt={inquiryProduct.name_en} className="w-12 h-12 object-contain" />
                    <div>
                      <div className="text-xs text-yellow-500 font-bold">{inquiryProduct.uuid}</div>
                      <div className="text-xs text-white font-semibold line-clamp-1">{inquiryProduct.name_en}</div>
                    </div>
                  </div>

                  {inquiryError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                      <AlertTriangle size={14} />
                      <span>{inquiryError}</span>
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/10 bg-white/5 focus:border-yellow-500 transition-all"
                  />

                  <input
                    type="text"
                    placeholder="Phone Number (+963 XX XXX XXXX)"
                    required
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/10 bg-white/5 focus:border-yellow-500 transition-all"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/10 bg-white/5 focus:border-yellow-500 transition-all"
                  />

                  <input
                    type="text"
                    placeholder="Company Name"
                    value={inquiryForm.company}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/10 bg-white/5 focus:border-yellow-500 transition-all"
                  />

                  <div className="flex items-center justify-between border border-white/10 rounded-xl px-4 py-2 bg-white/5">
                    <span className="text-xs text-gray-400 font-semibold">Quantity</span>
                    <input
                      type="number"
                      min="1"
                      required
                      value={inquiryForm.quantity}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, quantity: Number(e.target.value) || 1 })}
                      className="w-16 bg-transparent text-right outline-none text-sm text-yellow-500 font-bold border-none"
                    />
                  </div>

                  <textarea
                    placeholder="Inquiry message..."
                    required
                    rows={3}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/10 bg-white/5 focus:border-yellow-500 transition-all resize-none"
                  />

                  <button
                    type="submit"
                    disabled={inquiryLoading}
                    className="w-full py-3 rounded-xl font-extrabold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75"
                    style={{ background: '#FFB800', color: '#111111' }}
                  >
                    {inquiryLoading ? 'Submitting...' : 'Submit quotation request'}
                  </button>
                </form>
              )}
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
