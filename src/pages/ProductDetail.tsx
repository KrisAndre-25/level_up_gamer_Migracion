import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import type { Product } from '../data/products';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === parseInt(productId || '0'));

  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('es-CL')}`;
  };

  const addToCart = (product: Product, qty: number = 1): void => {
    const KEY = 'carritoLevelUp_v1';
    let carrito = JSON.parse(localStorage.getItem(KEY) || '[]');
    const idx = carrito.findIndex((p: any) => p.name === product.title);
    
    if (idx >= 0) {
      carrito[idx].qty += qty;
    } else {
      carrito.push({ 
        name: product.title, 
        unitPrice: product.price, 
        qty: qty 
      });
    }
    
    localStorage.setItem(KEY, JSON.stringify(carrito));

    window.dispatchEvent(new Event('cartUpdated'));
    
    // Efecto de confeti visual
    const button = document.querySelector('.add-to-cart-btn');
    if (button) {
      button.classList.add('pulse');
      setTimeout(() => button.classList.remove('pulse'), 600);
    }
    
    alert(`🎉 ¡Agregaste ${qty} ${product.title} al carrito!`);
  };

  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 3);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="error-container">
          <h2 className="text-white mb-4">🎮 Producto no encontrado</h2>
          <p className="text-light mb-4">Este producto parece haber despawnedo... 😅</p>
          <Link to="/products" className="btn btn-gamer btn-lg">
            <i className="bi bi-arrow-left me-2"></i> 
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  // Imágenes adicionales (simuladas para el ejemplo)
  const productImages = [
    product.imageSrc,
    product.imageSrc, // En un caso real serían imágenes diferentes
    product.imageSrc,
  ];

  return (
    <>
      <style>
        {`
          body { 
            background: #0b0b0b !important; 
            color: #fff; 
            font-family: Arial, sans-serif; 
          }
          .product-hero {
            background: linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%);
            border-bottom: 3px solid #39FF14;
          }
          .btn-gamer { 
            background: linear-gradient(135deg, #39FF14 0%, #28cc0f 100%);
            color: #000; 
            font-weight: 700; 
            border: none; 
            border-radius: 12px; 
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(57, 255, 20, 0.3);
          }
          .btn-gamer:hover { 
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(57, 255, 20, 0.5);
            color: #000;
          }
          .btn-outline-gamer { 
            background: transparent; 
            color: #39FF14; 
            font-weight: 600; 
            border: 2px solid #39FF14; 
            border-radius: 12px; 
            transition: all 0.3s ease;
          }
          .btn-outline-gamer:hover { 
            background: #39FF14; 
            color: #000; 
            transform: translateY(-2px);
          }
          .price-tag {
            background: linear-gradient(135deg, #39FF14, #28cc0f);
            color: #000;
            padding: 8px 20px;
            border-radius: 25px;
            font-weight: 800;
            font-size: 1.8rem;
            display: inline-block;
            box-shadow: 0 4px 15px rgba(57, 255, 20, 0.4);
          }
          .product-image {
            border-radius: 15px;
            border: 3px solid #39FF14;
            box-shadow: 0 8px 30px rgba(57, 255, 20, 0.3);
            transition: all 0.3s ease;
          }
          .product-image:hover {
            transform: scale(1.02);
            box-shadow: 0 12px 40px rgba(57, 255, 20, 0.5);
          }
          .thumbnail {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 10px;
            border: 2px solid #333;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .thumbnail:hover, .thumbnail.active {
            border-color: #39FF14;
            transform: scale(1.1);
          }
          .feature-item {
            background: rgba(57, 255, 20, 0.1);
            border: 1px solid #39FF14;
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
            transition: all 0.3s ease;
          }
          .feature-item:hover {
            background: rgba(57, 255, 20, 0.2);
            transform: translateX(10px);
          }
          .pulse {
            animation: pulse 0.6s ease-in-out;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .quantity-selector {
            background: #1a1a1a;
            border: 2px solid #39FF14;
            border-radius: 10px;
            padding: 10px;
            display: inline-flex;
            align-items: center;
            gap: 15px;
          }
          .quantity-btn {
            background: #39FF14;
            color: #000;
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            font-weight: bold;
            cursor: pointer;
          }
          .related-product-card {
            transition: all 0.3s ease;
            border: 1px solid #333;
          }
          .related-product-card:hover {
            transform: translateY(-5px);
            border-color: #39FF14;
            box-shadow: 0 8px 25px rgba(57, 255, 20, 0.2);
          }
          .category-badge {
            background: rgba(57, 255, 20, 0.2);
            color: #39FF14;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
          }
        `}
      </style>

      <div className="product-hero">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-success">
                  <i className="bi bi-house"></i> Inicio
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/products" className="text-success">Productos</Link>
              </li>
              <li className="breadcrumb-item active text-white">{product.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Galería de Imágenes */}
          <div className="col-12 col-lg-6">
            <div className="text-center mb-4">
              <img 
                src={productImages[selectedImage]} 
                className="img-fluid product-image" 
                alt={product.title}
                style={{ maxHeight: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%2339FF14'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            
            <div className="d-flex justify-content-center gap-3">
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  alt={`Vista ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>

            {/* Stats del Producto */}
            <div className="row text-center mt-4">
              <div className="col-4">
                <div className="text-success fw-bold fs-4">⭐ 4.9</div>
                <div className="text-secondary small">Rating</div>
              </div>
              <div className="col-4">
                <div className="text-success fw-bold fs-4">🚚 24h</div>
                <div className="text-secondary small">Envío</div>
              </div>
              <div className="col-4">
                <div className="text-success fw-bold fs-4">🛡️ 1 año</div>
                <div className="text-secondary small">Garantía</div>
              </div>
            </div>
          </div>

          {/* Información del Producto */}
          <div className="col-12 col-lg-6">
            <span className="category-badge mb-3">{product.category}</span>
            <h1 className="text-white fw-bold display-5 mb-3">{product.title}</h1>
            <p className="text-light lead mb-4">{product.description}</p>
            
            <div className="mb-4">
              <span className="price-tag">{formatPrice(product.price)}</span>
              <span className="text-success ms-3">
                <i className="bi bi-arrow-down"></i> 15% OFF
              </span>
            </div>

            {/* Selector de Cantidad */}
            <div className="mb-4">
              <label className="text-light mb-2 d-block">Cantidad:</label>
              <div className="quantity-selector">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="text-white fw-bold fs-5">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="d-flex flex-wrap gap-3 mb-4">
              <button 
                className="btn btn-gamer btn-lg add-to-cart-btn"
                onClick={() => addToCart(product, quantity)}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Agregar al Carrito ({quantity})
              </button>
              <button className="btn btn-outline-gamer btn-lg">
                <i className="bi bi-heart me-2"></i>
                Favorito
              </button>
            </div>

            {/* Info de Envío */}
            <div className="alert alert-dark border-success">
              <i className="bi bi-truck text-success me-2"></i>
              <strong>¡Envío GRATIS!</strong> en compras sobre $50.000 - 
              <span className="text-warning"> Llega en 24-48 horas 🚀</span>
            </div>

            {/* Características */}
            <div className="mt-5">
              <h4 className="text-warning mb-4">🎯 Características Destacadas</h4>
              <div className="feature-item">
                <i className="bi bi-lightning-charge text-success me-2"></i>
                <strong>Alta Performance:</strong> Diseñado para gaming competitivo
              </div>
              <div className="feature-item">
                <i className="bi bi-palette text-success me-2"></i>
                <strong>RGB Personalizable:</strong> Iluminación con 16.8 millones de colores
              </div>
              <div className="feature-item">
                <i className="bi bi-shield-check text-success me-2"></i>
                <strong>Garantía Extendida:</strong> 1 año + soporte premium 24/7
              </div>
            </div>
          </div>
        </div>

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <h3 className="text-white mb-4">🎮 Productos Relacionados</h3>
              <div className="row">
                {relatedProducts.map(relatedProduct => (
                  <div key={relatedProduct.id} className="col-12 col-md-4 mb-4">
                    <div className="card h-100 bg-dark related-product-card border-0">
                      <img 
                        src={relatedProduct.imageSrc} 
                        className="card-img-top" 
                        alt={relatedProduct.title}
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                      <div className="card-body text-center">
                        <h6 className="card-title text-white">{relatedProduct.title}</h6>
                        <p className="price text-success">{formatPrice(relatedProduct.price)}</p>
                        <button 
                          className="btn btn-gamer btn-sm"
                          onClick={() => navigate(`/product/${relatedProduct.id}`)}
                        >
                          Ver Detalle
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;