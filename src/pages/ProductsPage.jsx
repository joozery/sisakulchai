
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const ProductsPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const { products, getProductsByCategory, searchProducts } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categoryNames = {
    'house-paint': 'สีทาบ้าน',
    'car-paint': 'สีรถยนต์',
    'gold-paint': 'สีทอง',
    'wood-paint': 'สีไม้',
    'rust-paint': 'สีกันสนิม'
  };

  const availableColors = [
    { name: 'ขาว', value: '#FFFFFF' },
    { name: 'ดำ', value: '#000000' },
    { name: 'แดง', value: '#DC143C' },
    { name: 'ฟ้า', value: '#ADD8E6' },
    { name: 'เหลือง', value: '#FFD700' },
    { name: 'เขียว', value: '#228B22' },
    { name: 'น้ำตาล', value: '#8B4513' },
    { name: 'เทา', value: '#808080' }
  ];

  useEffect(() => {
    let result = [];
    
    if (searchQuery) {
      result = searchProducts(searchQuery);
    } else if (category) {
      result = getProductsByCategory(category);
    } else {
      result = products;
    }

    // Apply filters
    result = result.filter(product => {
      const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const colorMatch = selectedColors.length === 0 || 
        selectedColors.some(color => product.colors?.includes(color));
      
      return priceInRange && colorMatch;
    });

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(result);
  }, [products, category, searchQuery, sortBy, priceRange, selectedColors]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast({
      title: "เพิ่มสินค้าในตะกร้าแล้ว!",
      description: `${product.name} ถูกเพิ่มในตะกร้าสินค้าแล้ว`
    });
  };

  const handleWishlist = () => {
    toast({
      title: "🚧 ฟีเจอร์นี้ยังไม่พร้อมใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไปได้! 🚀"
    });
  };

  const toggleColorFilter = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const pageTitle = category 
    ? `${categoryNames[category]} - สีทาบ้านคุณภาพ`
    : searchQuery 
    ? `ค้นหา "${searchQuery}" - สีทาบ้านคุณภาพ`
    : 'สินค้าทั้งหมด - สีทาบ้านคุณภาพ';

  const pageDescription = category
    ? `เลือกซื้อ${categoryNames[category]}คุณภาพสูง ราคาดี มีให้เลือกหลากหลาย พร้อมจัดส่งทั่วประเทศ`
    : 'เลือกซื้อสีทาบ้านคุณภาพสูงทุกประเภท ราคาดี มีให้เลือกหลากหลาย พร้อมจัดส่งทั่วประเทศ';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-blue-600 hover:text-blue-800">หน้าแรก</Link>
              <span className="breadcrumb-separator">/</span>
              {category ? (
                <>
                  <Link to="/products" className="text-blue-600 hover:text-blue-800">สินค้าทั้งหมด</Link>
                  <span className="breadcrumb-separator">/</span>
                  <span className="text-gray-500">{categoryNames[category]}</span>
                </>
              ) : (
                <span className="text-gray-500">สินค้าทั้งหมด</span>
              )}
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {category ? categoryNames[category] : searchQuery ? `ผลการค้นหา "${searchQuery}"` : 'สินค้าทั้งหมด'}
            </h1>
            <p className="text-gray-600">
              พบสินค้า {filteredProducts.length} รายการ
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <div className="flex items-center justify-between mb-4 lg:hidden">
                  <h3 className="text-lg font-semibold">ตัวกรอง</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เรียงตาม
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="name">ชื่อสินค้า</option>
                      <option value="price-low">ราคาต่ำ - สูง</option>
                      <option value="price-high">ราคาสูง - ต่ำ</option>
                      <option value="rating">คะแนนรีวิว</option>
                      <option value="newest">สินค้าใหม่</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ช่วงราคา
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>฿0</span>
                        <span>฿{priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      สี
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {availableColors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => toggleColorFilter(color.value)}
                          className={`color-swatch ${
                            selectedColors.includes(color.value) ? 'selected' : ''
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPriceRange([0, 2000]);
                      setSelectedColors([]);
                      setSortBy('name');
                    }}
                    className="w-full"
                  >
                    ล้างตัวกรอง
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* View Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Products */}
              <AnimatePresence>
                {filteredProducts.length > 0 ? (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`bg-white rounded-lg shadow-sm overflow-hidden hover-lift ${
                          viewMode === 'list' ? 'flex' : ''
                        }`}
                      >
                        <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'h-48'}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover product-image-hover"
                          />
                          {product.stock < 10 && (
                            <span className="product-badge">
                              เหลือน้อย
                            </span>
                          )}
                          <button
                            onClick={handleWishlist}
                            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full wishlist-heart hover:bg-white"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>

                        <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                          <Link to={`/product/${product.id}`}>
                            <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">
                              ({product.reviews})
                            </span>
                          </div>

                          {viewMode === 'list' && (
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {product.description}
                            </p>
                          )}

                          <div className="flex items-center justify-between mb-3">
                            <span className="price-highlight text-lg">
                              ฿{product.price.toLocaleString()}
                            </span>
                            <div className="flex items-center text-sm">
                              <span className={`stock-indicator ${
                                product.stock > 20 ? 'in-stock' : 
                                product.stock > 5 ? 'low-stock' : 'out-of-stock'
                              }`} />
                              <span className="text-gray-500">
                                คงเหลือ {product.stock}
                              </span>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleAddToCart(product)}
                              disabled={product.stock === 0}
                              className="flex-1"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {product.stock === 0 ? 'สินค้าหมด' : 'เพิ่มในตะกร้า'}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="text-gray-400 mb-4">
                      <Search className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      ไม่พบสินค้าที่ค้นหา
                    </h3>
                    <p className="text-gray-600 mb-4">
                      ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองใหม่
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/products">
                        ดูสินค้าทั้งหมด
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
