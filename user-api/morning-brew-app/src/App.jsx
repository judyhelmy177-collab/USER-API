import { useEffect, useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [cartItems, setCartItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // دالة لتتبع الـ scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // دالة لل scroll لأسفل
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  // دالة لفتح وإغلاق الـ login modal
  const toggleLogin = () => {
    console.log('Opening login modal')
    setIsLoginOpen(true)
  }

  // دالة لفتح وإغلاق الـ cart modal
  const toggleCart = () => {
    console.log('Opening cart modal')
    setIsCartOpen(true)
  }

  // دالة لفتح وإغلاق الـ search modal
  const toggleSearch = () => {
    console.log('Opening search modal')
    setIsSearchOpen(true)
    setSearchQuery('')
    setSearchResults([])
  }

  // دالة لإغلاق جميع الـ modals
  const closeAllModals = () => {
    setIsLoginOpen(false)
    setIsCartOpen(false)
    setIsSearchOpen(false)
  }

  // دالة للتعامل مع تغيير input
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // دالة للتعامل مع البحث
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim() === '') {
      setSearchResults([])
      return
    }

    // محاكاة نتائج البحث
    const results = sampleProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(results)
  }

  // دالة لتسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Login submitted:', loginData)
    
    // هنا بتكون منطق تسجيل الدخول
    alert('تم تسجيل الدخول بنجاح!')
    setIsLoginOpen(false)
    setLoginData({ email: '', password: '' })
  }

  // دالة لإضافة منتج للعربة
  const addToCart = (product) => {
    console.log('Adding to cart:', product)
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  // دالة لإزالة منتج من العربة
  const removeFromCart = (productId) => {
    console.log('Removing from cart:', productId)
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  // دالة لتحديث كمية المنتج
  const updateQuantity = (productId, newQuantity) => {
    console.log('Updating quantity:', productId, newQuantity)
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  // حساب الإجمالي
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

  // منتجات تجريبية
  const sampleProducts = [
    { 
      id: 1, 
      name: "Ethiopian Coffee", 
      price: 25.99, 
      image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=150&h=150&fit=crop",
      description: "Rich and fruity Ethiopian single origin coffee"
    },
    { 
      id: 2, 
      name: "Colombian Blend", 
      price: 29.99, 
      image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=150&h=150&fit=crop", 
      description: "Smooth Colombian blend with chocolate notes"
    },
    { 
      id: 3, 
      name: "Brazilian Roast", 
      price: 22.99, 
      image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=150&h=150&fit=crop",
      description: "Dark Brazilian roast with caramel flavors"
    }
  ]

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo">
            <span>CAFFEINO</span>
          </div>

          {/* Desktop Menu */}
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#shop" className="nav-link">SHOP</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">ABOUT</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">CONTACT</a>
            </li>
          </ul>

          {/* Right Side Icons */}
          <div className="nav-icons">
            {/* Search Button */}
            <button className="icon-btn search-btn" onClick={toggleSearch}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
            
            {/* Login Button */}
            <button className="icon-btn user-btn" onClick={toggleLogin}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
            
            {/* Cart Button */}
            <button className="icon-btn cart-btn" onClick={toggleCart}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-menu">
            <li><a href="#shop" onClick={() => setIsMenuOpen(false)}>SHOP</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>ABOUT</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>CONTACT</a></li>
            <li>
              <button className="mobile-login-btn" onClick={() => {
                setIsMenuOpen(false)
                toggleLogin()
              }}>
                LOGIN
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="modal-overlay active" onClick={closeAllModals}>
          <div className="modal-content search-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsSearchOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="search-content">
              <h2>Search Products</h2>
              
              <div className="search-input-container">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="search-icon">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search for coffee, blends, origins..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                />
              </div>

              {searchQuery && (
                <div className="search-results">
                  <div className="results-header">
                    <span className="results-count">
                      {searchResults.length} results found for "{searchQuery}"
                    </span>
                  </div>
                  
                  {searchResults.length > 0 ? (
                    <div className="results-grid">
                      {searchResults.map(product => (
                        <div key={product.id} className="search-result-item">
                          <div className="result-image">
                            <img src={product.image} alt={product.name} />
                          </div>
                          <div className="result-details">
                            <h4>{product.name}</h4>
                            <p className="result-description">{product.description}</p>
                            <div className="result-price">${product.price}</div>
                          </div>
                          <button 
                            className="add-to-cart-small"
                            onClick={() => {
                              addToCart(product)
                              setIsSearchOpen(false)
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-results">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.3-4.3"/>
                      </svg>
                      <p>No products found for "{searchQuery}"</p>
                      <span>Try different keywords or browse our collection</span>
                    </div>
                  )}
                </div>
              )}

              {!searchQuery && (
                <div className="search-suggestions">
                  <h4>Popular Searches</h4>
                  <div className="suggestions-list">
                    <button className="suggestion-tag" onClick={() => setSearchQuery('Ethiopian')}>
                      Ethiopian
                    </button>
                    <button className="suggestion-tag" onClick={() => setSearchQuery('Colombian')}>
                      Colombian
                    </button>
                    <button className="suggestion-tag" onClick={() => setSearchQuery('Dark Roast')}>
                      Dark Roast
                    </button>
                    <button className="suggestion-tag" onClick={() => setSearchQuery('Organic')}>
                      Organic
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal-overlay active" onClick={closeAllModals}>
          <div className="modal-content login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsLoginOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="login-content">
              <h2>Welcome Back</h2>
              <p>Sign in to your account</p>
              
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <a href="#forgot" className="forgot-password">
                    Forgot password?
                  </a>
                </div>
                
                <button type="submit" className="login-submit-btn">
                  Sign In
                </button>
              </form>
              
              <div className="login-divider">
                <span>Or</span>
              </div>
              
              <button className="social-login-btn">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              
              <p className="signup-link">
                Don't have an account? <a href="#signup">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {isCartOpen && (
        <div className="modal-overlay active" onClick={closeAllModals}>
          <div className="modal-content cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsCartOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="cart-content">
              <h2>Shopping Cart</h2>
              
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <p>Your cart is empty</p>
                  <button className="continue-shopping-btn" onClick={() => setIsCartOpen(false)}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p className="item-price">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="item-controls">
                          <div className="quantity-controls">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                updateQuantity(item.id, item.quantity - 1)
                              }}
                              className="quantity-btn"
                            >
                              -
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                updateQuantity(item.id, item.quantity + 1)
                              }}
                              className="quantity-btn"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFromCart(item.id)
                            }}
                            className="remove-btn"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="cart-summary">
                    <div className="total">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn" onClick={(e) => e.stopPropagation()}>
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* قسم الهيرو مع الفيديو */}
      <section className="hero-section">
        {/* الفيديو في الخلفية */}
        <div className="video-background">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="hero-video"
          >
            {/* الفيديو اللي انت حاطه - ما تغيرش حاجه */}
            <source src="background.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        
        {/* المحتوى في المنتصف */}
        <div className="hero-content">
          <h1 className="hero-title">Caffeino</h1>
          <p className="hero-subtitle">Premium Coffee Experience</p>
          {/* تم إزالة زر ADD TO CART من هنا */}
        </div>

        {/* Scroll Down Button */}
        <button className="scroll-down-btn" onClick={scrollToNext}>
          <span className="scroll-text">Scroll</span>
          <div className="scroll-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </button>
      </section>

      {/* قسم المنتجات */}
      <section className="products-section">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {sampleProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* باقي المحتوى الأصلي */}
      <div className="original-content">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default App