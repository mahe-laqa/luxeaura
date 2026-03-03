import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './NewArrivals.css';

import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import { FavoritesContext } from '../context/FavoritesContext';

const NewArrivals = () => {
    const { addToCart } = useContext(CartContext);
    const { products } = useContext(ProductContext);
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
    const newArrivals = products.filter(p => p.isNewArrival);
    return (
        <section className="section new-arrivals">
            <div className="container">
                <div className="section-header-flex">
                    <h2 className="section-title">Just Landed</h2>
                    <Link to="/shop" className="view-all-link">Shop Collection</Link>
                </div>

                <div className="new-arrivals-carousel-wrapper">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={32}
                        slidesPerView="auto"
                        loop={true}
                        speed={3000} // Continuous transition speed
                        allowTouchMove={true} // Allow users to drag if they want
                        autoplay={{
                            delay: 0, // No delay between slides for continuous movement
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        breakpoints={{
                            320: { slidesPerView: 1.2 },
                            576: { slidesPerView: 2.2 },
                            768: { slidesPerView: 3.2 },
                            1024: { slidesPerView: 4 }
                        }}
                        className="new-arrivals-swiper"
                    >
                        {newArrivals.map((product) => (
                            <SwiperSlide key={product.id} className="scroll-product-card">
                                <div className="product-image-container">
                                    <img src={product.image} alt={product.name} className="product-image" />

                                    <div className="product-actions">
                                        <button
                                            className="icon-btn action-btn bg-white"
                                            title="Add to Wishlist"
                                            onClick={(e) => toggleFavorite(product, e)}
                                        >
                                            <Heart size={18} fill={isFavorite(product.id) ? "black" : "none"} />
                                        </button>
                                    </div>

                                    <button className="btn btn-primary add-to-cart-btn btn-full" onClick={() => addToCart(product)}>
                                        <ShoppingBag size={16} /> Quick Add
                                    </button>
                                </div>

                                <div className="product-details">
                                    <span className="product-category">{product.category}</span>
                                    <h3 className="product-name">
                                        <a href={`/product/${product.id}`}>{product.name}</a>
                                    </h3>
                                    <span className="product-price">${product.price}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
