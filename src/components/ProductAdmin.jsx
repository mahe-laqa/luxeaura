import React, { useState, useContext } from 'react';
import { Plus, X } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import './ProductAdmin.css';

const ProductAdmin = () => {
    const { addProduct } = useContext(ProductContext);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'women',
        description: '',
        longDescription: '',
        image: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.image) {
            alert('Please upload a product image.');
            return;
        }

        addProduct(formData);

        // Reset and close
        setFormData({ name: '', price: '', category: 'women', description: '', longDescription: '', image: '' });
        setIsOpen(false);
        alert('Product added successfully!');
    };

    return (
        <>
            <button className="admin-fab" onClick={() => setIsOpen(true)} title="Add Product">
                <Plus size={24} />
            </button>

            {isOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h2>Add New Product</h2>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Price ($)</label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'inherit', fontSize: '1rem', backgroundColor: 'var(--color-bg)' }}>
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="beauty">Beauty</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Product Image</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
                                {formData.image && (
                                    <div className="image-preview" style={{ marginTop: '10px', textAlign: 'center' }}>
                                        <img src={formData.image} alt="Preview" style={{ width: '80px', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Short Description (Main Section)</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows="2" required></textarea>
                            </div>
                            <div className="form-group">
                                <label>Long Description (Behind the Design Section)</label>
                                <textarea name="longDescription" value={formData.longDescription} onChange={handleChange} rows="4"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary submit-btn">Add Product</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductAdmin;
