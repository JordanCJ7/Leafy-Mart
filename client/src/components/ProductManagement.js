import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Search, Filter, Upload } from 'lucide-react';
import { uploadProductImage } from '../services/api';
import { toast, alert, confirm } from '../utils/swal';
import './ProductManagement.css';

const ProductManagement = () => {
  const [productList, setProductList] = useState([]);
  const [options, setOptions] = useState({ categories: [], tags: [] });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState('url'); // 'url' or 'file'

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    desc: '',
    priceLKR: '',
    category: '',
    tags: [],
    stock: '',
    img: '',
    rating: 4.0
  });

  // Fetch products and options when component mounts
  useEffect(() => {
    fetchProducts();
    fetchOptions();
  }, []);

  // API call to fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      if (response.ok) {
        const data = await response.json();
        setProductList(data);
      } else {
        console.error('Failed to fetch products');
        alert('Failed to fetch products', 'Failed to fetch products from server');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error', 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  // API call to fetch dropdown options
  const fetchOptions = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        // Fallback to static options if no admin token
        setOptions({
          categories: ['Herbs', 'Indoor Vines', 'Air Purifiers', 'Palms', 'Flowering Shrubs', 'Shade Plants', 'Foliage', 'Low-Maintenance', 'Hanging & Trailing', 'Statement Trees', 'Succulents & Cacti', 'Fragrant Climbers'],
          tags: ['medicinal', 'herb', 'balcony', 'easy-care', 'trailing', 'low-light', 'statement', 'indoors', 'office', 'air-purifying', 'tropical', 'large-space', 'fragrant', 'colorful', 'flowering', 'shade-tolerant', 'clean-air', 'drought-tolerant', 'kids-friendly', 'outdoor', 'decorative', 'climbing', 'spines', 'blue-flowers', 'winter-hardy']
        });
        return;
      }

      const response = await fetch('http://localhost:5000/api/products/options', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setOptions(data);
      } else {
        console.error('Failed to fetch options, using fallback');
        // Fallback to static options
        setOptions({
          categories: ['Herbs', 'Indoor Vines', 'Air Purifiers', 'Palms', 'Flowering Shrubs', 'Shade Plants', 'Foliage', 'Low-Maintenance', 'Hanging & Trailing', 'Statement Trees', 'Succulents & Cacti', 'Fragrant Climbers'],
          tags: ['medicinal', 'herb', 'balcony', 'easy-care', 'trailing', 'low-light', 'statement', 'indoors', 'office', 'air-purifying', 'tropical', 'large-space', 'fragrant', 'colorful', 'flowering', 'shade-tolerant', 'clean-air', 'drought-tolerant', 'kids-friendly', 'outdoor', 'decorative', 'climbing', 'spines', 'blue-flowers', 'winter-hardy']
        });
      }
    } catch (error) {
      console.error('Error fetching options:', error);
      // Fallback to static options
      setOptions({
        categories: ['Herbs', 'Indoor Vines', 'Air Purifiers', 'Palms', 'Flowering Shrubs', 'Shade Plants', 'Foliage', 'Low-Maintenance', 'Hanging & Trailing', 'Statement Trees', 'Succulents & Cacti', 'Fragrant Climbers'],
        tags: ['medicinal', 'herb', 'balcony', 'easy-care', 'trailing', 'low-light', 'statement', 'indoors', 'office', 'air-purifying', 'tropical', 'large-space', 'fragrant', 'colorful', 'flowering', 'shade-tolerant', 'clean-air', 'drought-tolerant', 'kids-friendly', 'outdoor', 'decorative', 'climbing', 'spines', 'blue-flowers', 'winter-hardy']
      });
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      desc: '',
      priceLKR: '',
      category: '',
      tags: [],
      stock: '',
      img: '',
      rating: 4.0
    });
    setEditingProduct(null);
    setSelectedFile(null);
    setUploadMode('url');
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      desc: product.desc,
      priceLKR: product.priceLKR,
      category: product.category,
      tags: product.tags || [],
      stock: product.stock,
      img: product.img,
      // keep rating fixed to 4 for all products (not shown in the form)
      rating: 4.0
    });
    setEditingProduct(product.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file', 'Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File too large', 'File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          img: e.target.result // This will be replaced with server URL after upload
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to server
  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert('No image', 'Please select an image first');
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Authentication', 'Admin authentication required');
      return;
    }

    try {
      setUploading(true);
      const response = await uploadProductImage(selectedFile, token);
      
      if (response.error) {
        alert('Upload failed', `${response.error}`);
        return;
      }

      // Update form data with server image URL
      setFormData(prev => ({
        ...prev,
        img: `http://localhost:5000${response.imageUrl}`
      }));
      
  toast({ title: 'Image uploaded successfully!', icon: 'success' });
    } catch (error) {
      console.error('Upload error:', error);
  alert('Upload failed', 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('Authentication', 'Admin authentication required');
        setSubmitting(false);
        return;
      }

      // Prepare image: if it's a data URL, upload it first
      let finalImg = formData.img;
      if (typeof finalImg === 'string' && finalImg.startsWith('data:')) {
        try {
          const blob = await (await fetch(finalImg)).blob();
          const uploadRes = await uploadProductImage(blob, token);
          if (uploadRes.error) {
            alert('Upload failed', `${uploadRes.error}`);
            setSubmitting(false);
            return;
          }
          finalImg = `http://localhost:5000${uploadRes.imageUrl}`;
        } catch (uploadErr) {
          console.error('Automatic upload failed:', uploadErr);
          alert('Upload failed', 'Failed to upload the selected image. Please try uploading manually first.');
          setSubmitting(false);
          return;
        }
      }

      const productData = {
        ...formData,
        img: finalImg,
        priceLKR: parseInt(formData.priceLKR) || 0,
        stock: parseInt(formData.stock) || 0,
        // enforce a fixed rating of 4 for all products (not editable in UI)
        rating: 4.0
      };

      if (!productData.id) delete productData.id;

      const url = editingProduct ? `http://localhost:5000/api/products/${formData.id}` : 'http://localhost:5000/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product saved:', result);
        await fetchProducts();
        closeModal();
        toast({ title: editingProduct ? 'Product updated successfully!' : 'Product added successfully!', icon: 'success' });
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        alert('Error', `${errorData.error || 'Failed to save product'}`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error', 'Error connecting to server');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    const ok = await confirm('Delete product', 'Are you sure you want to delete this product?');
    if (!ok) return;
    try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          alert('Authentication', 'Admin authentication required');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          // Refresh the product list
          await fetchProducts();
          toast({ title: 'Product deleted successfully!', icon: 'success' });
        } else {
          const errorData = await response.json();
          console.error('Delete Error:', errorData);
          alert('Error', `${errorData.error || 'Failed to delete product'}`);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error', 'Error connecting to server');
      }
  };

  // Filter products based on search and category
  const filteredProducts = productList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="product-management">
        <div className="loading">
          <h2>Loading products...</h2>
          <p>Fetching data from server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-management">
      <div className="product-management-header">
        <h2>Product Management</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          Add New Plant
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="product-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-control">
          <Filter size={18} />
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {options.categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price (LKR)</th>
              <th>Stock</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id || product.id}>
                <td>
                  <img 
                    src={product.img || '/images/defaultplant.png'} 
                    alt={product.name}
                    className="product-image-small"
                    onError={(e) => {
                      e.target.src = '/images/defaultplant.png';
                    }}
                  />
                </td>
                <td>
                  <div className="product-name-cell">
                    <strong>{product.name}</strong>
                    <small>{product.desc.substring(0, 60)}...</small>
                  </div>
                </td>
                <td>
                  <span className="category-badge">{product.category}</span>
                </td>
                <td>{product.priceDisplay}</td>
                <td>
                  <span className={`stock-badge ${product.stock < 5 ? 'low-stock' : ''}`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <div className="tags-cell">
                    {product.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="tag-badge">{tag}</span>
                    ))}
                    {product.tags?.length > 2 && (
                      <span className="tag-badge">+{product.tags.length - 2}</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="actions-cell">
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => openEditModal(product)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product._id || product.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Plant' : 'Add New Plant'}</h3>
              <button className="close-btn" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Plant Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="id">Product ID</label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    placeholder="Auto-generated from name"
                    disabled={editingProduct}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="desc">Description *</label>
                <textarea
                  id="desc"
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="priceLKR">Price (LKR) *</label>
                  <input
                    type="number"
                    id="priceLKR"
                    name="priceLKR"
                    value={formData.priceLKR}
                    onChange={handleInputChange}
                    min="0"
                    step="100"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock Quantity *</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>

                {/* Rating is hidden from the form UI; all products will have rating = 4 */}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {options.categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="img">Plant Image *</label>
                  
                  {/* Upload mode toggle */}
                  <div className="upload-mode-toggle" style={{ marginBottom: '10px' }}>
                    <button
                      type="button"
                      className={`btn ${uploadMode === 'url' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setUploadMode('url')}
                      style={{ marginRight: '10px' }}
                    >
                      Use URL
                    </button>
                    <button
                      type="button"
                      className={`btn ${uploadMode === 'file' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setUploadMode('file')}
                    >
                      Upload File
                    </button>
                  </div>

                  {uploadMode === 'url' ? (
                    /* URL Mode - Original dropdown */
                    <select
                      id="img"
                      name="img"
                      value={formData.img}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select an image</option>
                      <option value="/images/areca.png">Areca Palm</option>
                      <option value="/images/hibiscus.png">Hibiscus</option>
                      <option value="/images/moneyplant.png">Money Plant</option>
                      <option value="/images/peacelily.png">Peace Lily</option>
                      <option value="/images/snakeplant.png">Snake Plant</option>
                      <option value="/images/tulsi.png">Tulsi</option>
                    </select>
                  ) : (
                    /* File Upload Mode */
                    <div className="file-upload-section">
                      <div className="file-input-container" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                          type="file"
                          id="imageFile"
                          accept="image/*"
                          onChange={handleFileSelect}
                          style={{ flex: 1 }}
                        />
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleImageUpload}
                          disabled={!selectedFile || uploading}
                        >
                          <Upload size={16} />
                          {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                      </div>
                      {selectedFile && (
                        <p style={{ marginTop: '5px', color: '#666', fontSize: '0.9rem' }}>
                          Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)}KB)
                        </p>
                      )}
                    </div>
                  )}

                  {formData.img && (
                    <div className="image-preview">
                      <img 
                        src={formData.img} 
                        alt="Preview" 
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px', borderRadius: '8px' }}
                        onError={(e) => {
                          e.target.src = '/images/defaultplant.png';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <div className="tags-selection">
                  {options.tags.map(tag => (
                    <label key={tag} className="tag-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.tags.includes(tag)}
                        onChange={() => handleTagChange(tag)}
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  <Save size={18} />
                  {submitting ? 'Saving...' : (editingProduct ? 'Update Plant' : 'Add Plant')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;