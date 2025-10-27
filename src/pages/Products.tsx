import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import type { Product } from '../data/products';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Precios calculados una sola vez
  const { minPriceProducts, maxPriceProducts } = useMemo(() => {
    const prices = products.map(p => p.price);
    return {
      minPriceProducts: Math.min(...prices),
      maxPriceProducts: Math.max(...prices)
    };
  }, []);

  const [minPrice, setMinPrice] = useState(minPriceProducts);
  const [maxPrice, setMaxPrice] = useState(maxPriceProducts);

  // Categorías únicas
  const categories = useMemo(() => 
    ["all", ...new Set(products.map((p) => p.category))], 
  []);

  // Filtrado optimizado
  const filteredProducts = useMemo(() => 
    products.filter((p) => {
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
      const matchesSearch = searchTerm === "" || 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesPrice && matchesSearch;
    }),
    [selectedCategory, minPrice, maxPrice, searchTerm]
  );

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
    window.dispatchEvent(new Event('cartUpdated'));
    alert("✅ Producto agregado al carrito");
  };

  // Función para resetear filtros
  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setMinPrice(minPriceProducts);
    setMaxPrice(maxPriceProducts);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="text-white display-4 fw-bold mb-3">🎮 Nuestros Productos</h1>
        <p className="text-light lead">Descubre lo mejor en tecnología gaming al mejor precio</p>
      </div>

      {/* SECCIÓN DE FILTROS */}
      <div className="filter-section">
        <h4 className="text-gamer mb-4">🔍 Filtros de Búsqueda</h4>
        
        <div className="filter-row">
          
          {/* FILTRO DE BÚSQUEDA POR TEXTO */}
          <div className="filter-group">
            <label className="filter-label">Buscar por nombre</label>
            <input
              type="text"
              className="form-control filter-input"
              placeholder="Ej: Headset, Mouse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* FILTRO DE CATEGORÍA */}
          <div className="filter-group">
            <label className="filter-label">Categoría</label>
            <select 
              className="form-select filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "Todas las categorías" : category}
                </option>
              ))}
            </select>
          </div>

          {/* FILTRO DE PRECIO MÍNIMO Y MÁXIMO */}
          <div className="filter-group">
            <label className="filter-label">Rango de Precio</label>
            <div className="price-inputs">
              <div className="price-input-group">
                <input
                  type="number"
                  className="form-control filter-input"
                  placeholder="Mínimo"
                  value={minPrice}
                  onChange={(e) => {
                    const value = e.target.value === "" ? minPriceProducts : Number(e.target.value);
                    setMinPrice(value);
                  }}
                  min={0}
                  max={maxPriceProducts}
                />
              </div>
              <span className="text-light mx-2">-</span>
              <div className="price-input-group">
                <input
                  type="number"
                  className="form-control filter-input"
                  placeholder="Máximo"
                  value={maxPrice}
                  onChange={(e) => {
                    const value = e.target.value === "" ? maxPriceProducts : Number(e.target.value);
                    setMaxPrice(value);
                  }}
                  min={0}
                  max={maxPriceProducts}
                />
              </div>
            </div>
          </div>

          {/* BOTÓN RESET Y CONTADOR */}
          <div className="filter-group">
            <div className="d-flex flex-column gap-2">
              <button 
                className="btn btn-outline-gamer btn-sm"
                onClick={resetFilters}
              >
                🔄 Reiniciar Filtros
              </button>
              <div className="text-gamer fw-bold text-center">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTOS - VERSIÓN CORREGIDA */}
      <div className="row">
        {filteredProducts.length === 0 ? (
          <div className="col-12 text-center py-5">
            <div className="text-light fs-4">😔 No se encontraron productos</div>
            <p className="text-muted mb-4">Intenta con otros filtros de búsqueda</p>
            <button 
              className="btn btn-gamer"
              onClick={resetFilters}
            >
              🔄 Mostrar Todos los Productos
            </button>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-4 mb-4">
              <div className="card h-100 product-card">
                <div className="product-img-container">
                  <img 
                    src={product.imageSrc} 
                    className="product-img" 
                    alt={product.title}
                    onError={(e) => {
                      // Si la imagen falla, mostramos un placeholder más elegante
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%2339FF14'%3EImagen%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title text-white fw-bold mb-2">{product.title}</h5>
                  
                  {/* Categoría - Corregido */}
                  <div className="mb-2">
                    <span className="category-badge">{product.category}</span>
                  </div>
                  
                  {/* Precio */}
                  <p className="price-tag mb-3">{formatPrice(product.price)}</p>
                  
                  {/* Descripción - Mejorada */}
                  <p className="card-text text-light flex-grow-1 product-description">
                    {product.description.length > 100 
                      ? `${product.description.substring(0, 100)}...` 
                      : product.description
                    }
                  </p>
                  
                  {/* Botones - Corregidos */}
                  <div className="mt-auto pt-3">
                    <div className="d-grid gap-2">
                      <Link 
                        to={`/product/${product.id}`}
                        className="btn btn-outline-gamer btn-sm"
                      >
                        <i className="bi bi-eye me-2"></i> 
                        Ver Detalle
                      </Link>
                      <button 
                        className="btn btn-gamer btn-sm"
                        onClick={() => addToCart(product)}
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        Agregar al Carrito {/* ✅ Corregido */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* BANNER PROMOCIONAL */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="feature-card p-4 text-center">
            <h4 className="text-gamer mb-3">
              <i className="bi bi-truck me-2"></i>
              ¡Envío Gratis!
            </h4>
            <p className="text-light mb-0">
              En compras superiores a <strong className="text-gamer">$50.000</strong> - 
              <span className="text-warning"> ¡Solo por tiempo limitado!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;