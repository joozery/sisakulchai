
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: 'สีทาบ้านภายนอก สีขาว',
    price: 450,
    category: 'house-paint',
    description: 'สีทาบ้านภายนอกคุณภาพสูง ทนทานต่อแสงแดดและฝน กันซึมได้ดี',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500',
    stock: 50,
    rating: 4.5,
    reviews: 23,
    colors: ['#FFFFFF', '#F5F5F5', '#FFFAFA'],
    features: ['กันซึม', 'ทนแสงแดด', 'ไม่มีสารตะกั่ว', 'แห้งเร็ว'],
    specifications: {
      coverage: '12-15 ตร.ม./ลิตร',
      dryTime: '2-4 ชั่วโมง',
      finish: 'เนียนด้าน',
      volume: '1 ลิตร'
    }
  },
  {
    id: 2,
    name: 'สีทาบ้านภายใน สีครีม',
    price: 380,
    category: 'house-paint',
    description: 'สีทาบ้านภายในสีครีม ให้ความรู้สึกอบอุ่น เนื้อสีเนียนสวย',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500',
    stock: 35,
    rating: 4.3,
    reviews: 18,
    colors: ['#F5F5DC', '#FFF8DC', '#FFFDD0'],
    features: ['ไม่มีกลิ่น', 'ล้างทำความสะอาดง่าย', 'ปลอดสารพิษ', 'สีสม่ำเสมอ'],
    specifications: {
      coverage: '14-16 ตร.ม./ลิตร',
      dryTime: '1-2 ชั่วโมง',
      finish: 'เนียนเงา',
      volume: '1 ลิตร'
    }
  },
  {
    id: 3,
    name: 'สีรถยนต์ สีแดงเมทัลลิค',
    price: 850,
    category: 'car-paint',
    description: 'สีรถยนต์สีแดงเมทัลลิค เงาสวย ทนทาน ป้องกันสนิม',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500',
    stock: 20,
    rating: 4.7,
    reviews: 31,
    colors: ['#DC143C', '#B22222', '#8B0000'],
    features: ['เมทัลลิค', 'กันสนิม', 'ทนความร้อน', 'เงาสวย'],
    specifications: {
      coverage: '8-10 ตร.ม./ลิตร',
      dryTime: '4-6 ชั่วโมง',
      finish: 'เมทัลลิค',
      volume: '1 ลิตร'
    }
  },
  {
    id: 4,
    name: 'สีทอง 24K',
    price: 1200,
    category: 'gold-paint',
    description: 'สีทองแท้ 24K สำหรับงานศิลปะและตัวอักษร เงาสวยเหมือนทองแท้',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500',
    stock: 15,
    rating: 4.8,
    reviews: 12,
    colors: ['#FFD700', '#FFA500', '#DAA520'],
    features: ['ทองแท้ 24K', 'เงาสวย', 'ไม่ซีดจาง', 'คุณภาพพรีเมียม'],
    specifications: {
      coverage: '15-18 ตร.ม./ลิตร',
      dryTime: '3-5 ชั่วโมง',
      finish: 'เงาสูง',
      volume: '500 มล.'
    }
  },
  {
    id: 5,
    name: 'สีไม้ สีน้ำตาลธรรมชาติ',
    price: 320,
    category: 'wood-paint',
    description: 'สีทาไม้สีน้ำตาลธรรมชาติ เน้นเนื้อไม้ ป้องกันปลวกและแมลง',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
    stock: 40,
    rating: 4.4,
    reviews: 27,
    colors: ['#8B4513', '#A0522D', '#CD853F'],
    features: ['กันปลวก', 'กันแมลง', 'เน้นเนื้อไม้', 'ทนความชื้น'],
    specifications: {
      coverage: '10-12 ตร.ม./ลิตร',
      dryTime: '2-3 ชั่วโมง',
      finish: 'เซมิกลอส',
      volume: '1 ลิตร'
    }
  },
  {
    id: 6,
    name: 'สีกันสนิม สีเทา',
    price: 480,
    category: 'rust-paint',
    description: 'สีกันสนิมสีเทา สำหรับโลหะ ป้องกันสนิมได้ยาวนาน',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500',
    stock: 25,
    rating: 4.6,
    reviews: 19,
    colors: ['#808080', '#696969', '#A9A9A9'],
    features: ['กันสนิม', 'ทนทาน', 'ใช้กับโลหะ', 'แห้งเร็ว'],
    specifications: {
      coverage: '8-10 ตร.ม./ลิตร',
      dryTime: '1-2 ชั่วโมง',
      finish: 'เซมิกลอส',
      volume: '1 ลิตร'
    }
  },
  {
    id: 7,
    name: 'สีทาบ้าน สีฟ้าอ่อน',
    price: 420,
    category: 'house-paint',
    description: 'สีทาบ้านสีฟ้าอ่อน ให้ความรู้สึกสดชื่น เหมาะสำหรับห้องนอน',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    stock: 30,
    rating: 4.2,
    reviews: 15,
    colors: ['#ADD8E6', '#87CEEB', '#B0E0E6'],
    features: ['สีสดใส', 'ไม่มีกลิ่น', 'ปลอดสารพิษ', 'ทาง่าย'],
    specifications: {
      coverage: '13-15 ตร.ม./ลิตร',
      dryTime: '2-3 ชั่วโมง',
      finish: 'เนียนด้าน',
      volume: '1 ลิตร'
    }
  },
  {
    id: 8,
    name: 'สีรถยนต์ สีดำเงา',
    price: 780,
    category: 'car-paint',
    description: 'สีรถยนต์สีดำเงา คลาสสิค เงาสวย ทนทานต่อสภาพอากาศ',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500',
    stock: 18,
    rating: 4.5,
    reviews: 22,
    colors: ['#000000', '#2F2F2F', '#1C1C1C'],
    features: ['เงาสูง', 'ทนทาน', 'กันรอยขีดข่วน', 'สีคลาสสิค'],
    specifications: {
      coverage: '9-11 ตร.ม./ลิตร',
      dryTime: '4-6 ชั่วโมง',
      finish: 'เงาสูง',
      volume: '1 ลิตร'
    }
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    // Load products from localStorage or use initial data
    const savedProducts = localStorage.getItem('paintstore_products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }

    // Load reviews from localStorage
    const savedReviews = localStorage.getItem('paintstore_reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('paintstore_products', JSON.stringify(products));
    }
  }, [products]);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('paintstore_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      rating: 0,
      reviews: 0
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const addReview = (productId, review) => {
    const newReview = {
      ...review,
      id: Date.now(),
      date: new Date().toISOString()
    };

    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newReview]
    }));

    // Update product rating
    const productReviews = [...(reviews[productId] || []), newReview];
    const averageRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
    
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, rating: averageRating, reviews: productReviews.length }
        : product
    ));
  };

  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    searchProducts,
    addReview,
    getProductReviews
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
