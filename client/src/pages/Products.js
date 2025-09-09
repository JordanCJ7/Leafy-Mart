import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import products from '../data/products';
import { Heart, ShoppingCart, Star, Filter, Search, Grid, List } from 'lucide-react';
import './Products.css';

const Products = () => {
  const { isLoggedIn } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Herbs', 'Indoor Vines', 'Air Purifiers', 'Palms', 'Flowering Shrubs', 'Shade Plants', 'Foliage', 'Low-Maintenance', 'Hanging & Trailing', 'Statement Trees', 'Succulents & Cacti', 'Fragrant Climbers'];
  const priceRanges = ['All', 'Under LKR 1,500', 'LKR 1,500-3,000', 'LKR 3,000-5,000', 'Above LKR 5,000'];

  useEffect(() => {
    let filtered = products;

    // Filter by search term
      if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'All') {
      filtered = filtered.filter(product => {
        const price = product.priceLKR;
        switch (priceRange) {
          case 'Under LKR 1,500':
            return price < 1500;
          case 'LKR 1,500-3,000':
            return price >= 1500 && price <= 3000;
          case 'LKR 3,000-5,000':
            return price >= 3000 && price <= 5000;
          case 'Above LKR 5,000':
            return price > 5000;
          default:
            return true;
        }
      });
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.priceLKR - b.priceLKR;
        case 'price-high':
          return b.priceLKR - a.priceLKR;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  const addToCart = (product) => {
    if (!isLoggedIn) {
      alert('Please login to add items to cart');
      return;
    }
    console.log('Adding to cart:', product);
    // Implement cart functionality
  };

  const addToWishlist = (product) => {
    if (!isLoggedIn) {
      alert('Please login to add items to wishlist');
      return;
    }
    console.log('Adding to wishlist:', product);
    // Implement wishlist functionality
  };

  return (
    <div className="products-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="products-hero">
        <div className="products-hero-content">
          <h1>Our Plant Collection</h1>
          <p>Discover the perfect plants for your home and garden</p>
        </div>
      </div>

      <div className="products-container">
        {/* Filters and Search */}
        <div className="products-controls">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
            </button>

            <div className="sort-control">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="view-toggle">
              <button 
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button 
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="products-main">
          {/* Sidebar Filters */}
          <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filter-section">
              <h3>Categories</h3>
              {categories.map(category => (
                <label key={category} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              {priceRanges.map(range => (
                <label key={range} className="filter-option">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range}
                    checked={priceRange === range}
                    onChange={(e) => setPriceRange(e.target.value)}
                  />
                  {range}
                </label>
              ))}
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="products-content">
            <div className="products-header">
              <h2>All Plants ({filteredProducts.length})</h2>
            </div>

            <div className={`products-grid ${viewMode}`}>
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.img} alt={product.name} />
                    <div className="product-overlay">
                      <button 
                        className="overlay-btn"
                        onClick={() => addToWishlist(product)}
                      >
                        <Heart size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.desc}</p>
                    
                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < (product.rating || 4) ? '#ffb400' : 'none'}
                          color="#ffb400"
                        />
                      ))}
                      <span>({product.rating || 4.0})</span>
                    </div>
                    
                    <div className="product-footer">
                      <div className="product-price">{product.priceDisplay}</div>
                      <div className="product-actions">
                        <Link 
                          to={`/product/${product.id}`} 
                          className="btn btn-outline"
                        >
                          View Details
                        </Link>
                        <button 
                          className="btn btn-primary"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart size={16} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
