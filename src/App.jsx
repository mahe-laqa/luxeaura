import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import FavoritesPage from './pages/FavoritesPage';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="category/:categoryId" element={<ShopPage />} />
                <Route path="sale" element={<ShopPage />} />
                <Route path="product/:id" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="contact" element={<ContactPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;
