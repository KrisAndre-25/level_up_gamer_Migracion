import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import type { Product } from '../data/products';

const Products: React.FC = () => {
  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('es-CL')}`;
  };

  const addToCart = (product: Product): void => {
    const KEY = 'carritoLevelUp_v1';
    let carrito = JSON.parse(localStorage.getItem(KEY) || '[]');
    const idx = carrito.findIndex((p: any) => p.name === product.title);
    
    if (idx >= 0) {
      carrito[idx].qty++;
    } else {
      carrito.push({ 
        name: product.title, 
        unitPrice: product.price, 
        qty: 1 
      });
    }
    
    localStorage.setItem(KEY, JSON.stringify(carrito));
    alert("✅ Producto agregado al carrito");
  };

  return (
    <>
      <style>
        {`
          body { 
            background: #0b0b0b !important; 
            color: #fff; 
            font-family: Arial, sans-serif; 
          }
          .btn-gamer { 
            background: #39FF14; 
            color: #000; 
            font-weight: 700; 
            border: none; 
            border-radius: 10px; 
            transition: all 0.3s ease;
          }
          .btn-gamer:hover { 
            background: #28cc0f; 
            color: #fff; 
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(57, 255, 20, 0.3);
          }
          .btn-gamer-outline { 
            background: transparent; 
            color: #39FF14; 
            font-weight: 600; 
            border: 2px solid #39FF14; 
            border-radius: 10px; 
            transition: all 0.3s ease;
          }
          .btn-gamer-outline:hover { 
            background: #39FF14; 
            color: #000; 
            transform: translateY(-2px);
          }
          .price { 
            color: #39FF14; 
            font-weight: 700; 
            font-size: 1.5rem; 
          }
          .product-img-container {
            height: 200px;
            overflow: hidden;
            background: #1a1a1a;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .product-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: transform 0.3s ease;
            padding: 10px;
          }
          .product-card {
            transition: all 0.3s ease;
            border: 1px solid #333;
            overflow: hidden;
          }
          .product-card:hover {
            transform: translateY(-5px);
            border-color: #39FF14;
            box-shadow: 0 8px 25px rgba(57, 255, 20, 0.2);
          }
          .product-card:hover .product-img {
            transform: scale(1.05);
          }
          .card-body {
            padding: 1.5rem;
          }
          .fallback-image {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #1a1a1a;
            color: #39FF14;
            font-weight: bold;
          }
        `}
      </style>

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="text-white display-4 fw-bold mb-3">🎮 Nuestros Productos</h1>
          <p className="text-light lead">Descubre lo mejor en tecnología gaming al mejor precio</p>
        </div>
        
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-4 mb-4">
              <div className="card h-100 bg-dark product-card border-0">
                <div className="product-img-container">
                  <img 
                    src={product.imageSrc} 
                    className="product-img" 
                    alt={product.title}
                    onError={(e) => {
                      // Ocultamos la imagen que falló y mostramos un div de fallback
                      e.currentTarget.style.display = 'none';
                      const container = e.currentTarget.parentElement;
                      if (container) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-image';
                        fallback.innerHTML = `
                          <div class="text-center">
                            <i class="bi bi-image fs-1 text-success"></i>
                            <div class="mt-2">${product.title}</div>
                          </div>
                        `;
                        container.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title text-white fw-bold">{product.title}</h5>
                  <p className="text-light small mb-2">{product.category}</p>
                  <p className="price mb-3">{formatPrice(product.price)}</p>
                  <p className="card-text text-light small flex-grow-1">
                    {product.description.substring(0, 80)}...
                  </p>
                  
                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <Link 
                        to={`/product/${product.id}`}
                        className="btn btn-gamer-outline btn-sm"
                      >
                        <i className="bi bi-eye me-2"></i> 
                        Ver Detalle
                      </Link>
                      <button 
                        className="btn btn-gamer btn-sm"
                        onClick={() => addToCart(product)}
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner promocional */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="bg-dark border border-success rounded p-4 text-center">
              <h4 className="text-success mb-3">
                <i className="bi bi-truck me-2"></i>
                ¡Envío Gratis!
              </h4>
              <p className="text-light mb-0">
                En compras superiores a <strong className="text-success">$50.000</strong> - 
                <span className="text-warning"> ¡Solo por tiempo limitado!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;