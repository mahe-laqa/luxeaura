import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Package, ShoppingCart, LogOut, Edit, Trash2, Plus, X } from 'lucide-react';
import './AdminPage.css';

const AdminPage = () => {
    // Authentication State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');

    // Dashboard State
    const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
    const { products, addProduct, editProduct, deleteProduct } = useContext(ProductContext);
    const [orders, setOrders] = useState([]);

    // Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEditProduct, setCurrentEditProduct] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: 'women',
        image: '',
        description: ''
    });

    // Initial load for orders
    useEffect(() => {
        const savedOrders = localStorage.getItem('luxeaura_orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    // Login Handler
    const handleLogin = (e) => {
        e.preventDefault();
        if (passwordInput === 'admin123') { // Simple hardcoded password as requested
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPasswordInput('');
    };

    // Image Upload Handler
    const handleImageUpload = (e, target) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (target === 'add') {
                    setNewProduct({ ...newProduct, image: reader.result });
                } else if (target === 'edit') {
                    setCurrentEditProduct({ ...currentEditProduct, image: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Add Product Handlers
    const handleAddChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const submitAdd = (e) => {
        e.preventDefault();
        if (!newProduct.image) {
            alert('Please upload a product image.');
            return;
        }
        addProduct(newProduct);
        setIsAddModalOpen(false);
        setNewProduct({
            name: '',
            price: '',
            category: 'women',
            image: '',
            description: ''
        });
        alert('Product added successfully!');
    };

    // Product Handlers
    const handleEditChange = (e) => {
        setCurrentEditProduct({ ...currentEditProduct, [e.target.name]: e.target.value });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        editProduct(currentEditProduct.id, currentEditProduct);
        setIsEditModalOpen(false);
        setCurrentEditProduct(null);
        alert('Product updated successfully!');
    };

    const openEditModal = (product) => {
        setCurrentEditProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    // Order Handlers
    const toggleOrderStatus = (orderId) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: order.status === 'Pending' ? 'Completed' : 'Pending' };
            }
            return order;
        });
        setOrders(updatedOrders);
        localStorage.setItem('luxeaura_orders', JSON.stringify(updatedOrders));
    };


    // --- RENDERS ---

    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <div className="admin-login-box">
                    <h2>Admin Portal</h2>
                    <p>Enter password to access business management.</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Password..."
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <span className="hint">Hint: admin123</span>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>LUXE<span>AURA</span></h2>
                    <span>Admin Panel</span>
                </div>
                <nav className="admin-nav">
                    <button
                        className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        <Package size={20} /> Products
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        <ShoppingCart size={20} /> Orders
                    </button>
                </nav>

                <div className="admin-logout">
                    <button className="admin-nav-item logout-btn" onClick={handleLogout}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>{activeTab === 'products' ? 'Product Management' : 'Order Management'}</h1>
                </header>

                <div className="admin-content">
                    {/* PRODUCTS TAB */}
                    {activeTab === 'products' && (
                        <div className="admin-table-container">
                            <div className="admin-table-header">
                                <p className="admin-helper-text">You have {products.length} active products.</p>
                                <button className="btn btn-primary add-product-btn" onClick={() => setIsAddModalOpen(true)}>
                                    <Plus size={18} /> Add Product
                                </button>
                            </div>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>
                                                <img src={product.image} alt={product.name} className="admin-table-img" />
                                            </td>
                                            <td className="fw-600">{product.name}</td>
                                            <td className="capitalize">{product.category}</td>
                                            <td>${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="btn-icon edit" onClick={() => openEditModal(product)} title="Edit">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button className="btn-icon delete" onClick={() => handleDeleteProduct(product.id)} title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <div className="admin-table-container">
                            {orders.length === 0 ? (
                                <div className="empty-state">
                                    <ShoppingCart size={48} color="var(--color-border)" />
                                    <p>No orders received yet.</p>
                                </div>
                            ) : (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Customer Name</th>
                                            <th>City</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.slice().reverse().map(order => (
                                            <tr key={order.id}>
                                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                                <td className="fw-600">{order.customer.firstName} {order.customer.lastName}</td>
                                                <td>{order.customer.city}</td>
                                                <td>${order.total.toFixed(2)}</td>
                                                <td>
                                                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline"
                                                        onClick={() => toggleOrderStatus(order.id)}
                                                    >
                                                        Mark {order.status === 'Pending' ? 'Completed' : 'Pending'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* EDIT MODAL */}
            {isEditModalOpen && currentEditProduct && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h2>Edit Product</h2>
                            <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={submitEdit} className="admin-form">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" name="name" value={currentEditProduct.name} onChange={handleEditChange} required />
                            </div>
                            <div className="form-group">
                                <label>Price ($)</label>
                                <input type="number" name="price" value={currentEditProduct.price} onChange={handleEditChange} required min="0" step="0.01" />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select name="category" value={currentEditProduct.category} onChange={handleEditChange} required>
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="beauty">Beauty</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Product Image</label>
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'edit')} />
                                {currentEditProduct.image && (
                                    <div className="image-preview">
                                        <img src={currentEditProduct.image} alt="Preview" style={{ width: '80px', marginTop: '10px', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={currentEditProduct.description || ''} onChange={handleEditChange} rows="3" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary submit-btn w-100">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}

            {/* ADD MODAL */}
            {isAddModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h2>Add New Product</h2>
                            <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={submitAdd} className="admin-form">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" name="name" value={newProduct.name} onChange={handleAddChange} required />
                            </div>
                            <div className="form-group">
                                <label>Price ($)</label>
                                <input type="number" name="price" value={newProduct.price} onChange={handleAddChange} required min="0" step="0.01" />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select name="category" value={newProduct.category} onChange={handleAddChange} required>
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="beauty">Beauty</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Product Image</label>
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'add')} required />
                                {newProduct.image && (
                                    <div className="image-preview">
                                        <img src={newProduct.image} alt="Preview" style={{ width: '80px', marginTop: '10px', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={newProduct.description} onChange={handleAddChange} rows="3" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary submit-btn w-100">Add Product</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
