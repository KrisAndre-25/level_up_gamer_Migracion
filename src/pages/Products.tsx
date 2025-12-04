import { useEffect, useState } from "react";
import type { Producto } from "../interfaces/Producto";
import { getProducts } from "../api/products";

// Interface para compatibilidad con Cart.tsx
interface CartItem {
  name: string;
  unitPrice: number;
  qty: number;
  imageSrc?: string;
  id?: number;
}

function Products() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar filtros

  // Formatear precio
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CL')}`;
  };

  // Cargar productos
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
        setError(null);
      } catch (error: any) {
        console.error("❌ Error cargando productos:", error);
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Aplicar filtros cuando cambien los criterios
  useEffect(() => {
    let filtered = [...products];

    // Filtro por nombre/descripción
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoría
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filtro por precio mínimo
    if (priceRange.min) {
      filtered = filtered.filter(product => 
        product.price >= parseFloat(priceRange.min)
      );
    }

    // Filtro por precio máximo
    if (priceRange.max) {
      filtered = filtered.filter(product => 
        product.price <= parseFloat(priceRange.max)
      );
    }

    // Ordenar productos
    if (sortBy) {
      switch (sortBy) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "name-desc":
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, sortBy, products]);

  // Obtener categorías únicas
  const categorias = [...new Set(products.map(product => product.category).filter(Boolean))];

  // Agregar al carrito - CONECTADO CON TU CART.TSX
  const agregarAlCarrito = (producto: Producto) => {
    try {
      const KEY = 'carritoLevelUp_v1'; // MISMA KEY que tu Cart.tsx
      
      // Obtener carrito actual de localStorage
      const carritoStr = localStorage.getItem(KEY);
      const carritoActual: CartItem[] = carritoStr ? JSON.parse(carritoStr) : [];
      
      // Verificar si el producto ya está en el carrito
      const productoExistenteIndex = carritoActual.findIndex((item: CartItem) => 
        item.name === producto.title
      );
      
      if (productoExistenteIndex !== -1) {
        // Si ya existe, aumentar cantidad
        carritoActual[productoExistenteIndex].qty += 1;
      } else {
        // Si no existe, agregar nuevo producto
        const nuevoItem: CartItem = {
          name: producto.title,
          unitPrice: producto.price,
          qty: 1,
          imageSrc: producto.imageSrc,
          id: producto.id
        };
        carritoActual.push(nuevoItem);
      }
      
      // Guardar en localStorage
      localStorage.setItem(KEY, JSON.stringify(carritoActual));
      
      // Disparar evento personalizado para que Cart.tsx se actualice
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
      // Mostrar notificación
      alert(`¡${producto.title} agregado al carrito! 🛒`);
      
      console.log("🛒 Carrito actualizado:", carritoActual);
    } catch (error) {
      console.error("❌ Error al agregar al carrito:", error);
      alert("Error al agregar el producto al carrito");
    }
  };

  // Ver detalles del producto
  const verDetalles = (producto: Producto) => {
    setSelectedProduct(producto);
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
    setSortBy("");
  };

  // Agrega esta sección para mostrar errores
  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">
          <h4>Error al cargar productos</h4>
          <p>{error}</p>
          <button 
            className="btn btn-gamer mt-2"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-gamer" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-light">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-gamer text-center mb-4">Nuestros Productos</h1>
      
      {/* PANEL DE FILTROS COMPACTO */}
      <div className="card card-gamer mb-4">
        <div className="card-body py-2">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            {/* Búsqueda y botón de filtros */}
            <div className="d-flex align-items-center gap-2 flex-grow-1" style={{minWidth: '250px'}}>
              <div className="input-group input-group-sm" style={{width: '200px'}}>
                <span className="input-group-text bg-dark text-gamer border-gamer">🔍</span>
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="form-control bg-dark text-light border-gamer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{fontSize: '0.875rem'}}
                />
              </div>
              
              <button 
                className="btn btn-outline-gamer btn-sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? '▲' : '▼'} Filtros
              </button>
            </div>

            {/* Contador de productos y botón limpiar */}
            <div className="d-flex align-items-center gap-2">
              <small className="text-gamer">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
              </small>
              
              {(searchTerm || selectedCategory || priceRange.min || priceRange.max || sortBy) && (
                <button 
                  className="btn btn-outline-gamer btn-sm"
                  onClick={limpiarFiltros}
                >
                  🗑️ Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Filtros expandibles */}
          {showFilters && (
            <div className="row g-2 mt-3">
              {/* Filtro por categoría */}
              <div className="col-md-3">
                <select
                  className="form-select form-select-sm bg-dark text-light border-gamer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((categoria, index) => (
                    <option key={index} value={categoria || ""}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por precio mínimo */}
              <div className="col-md-2">
                <input
                  type="number"
                  placeholder="Precio Mín"
                  className="form-control form-control-sm bg-dark text-light border-gamer"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                />
              </div>

              {/* Filtro por precio máximo */}
              <div className="col-md-2">
                <input
                  type="number"
                  placeholder="Precio Máx"
                  className="form-control form-control-sm bg-dark text-light border-gamer"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                />
              </div>

              {/* Ordenar por */}
              <div className="col-md-2">
                <select
                  className="form-select form-select-sm bg-dark text-light border-gamer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Ordenar por</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name-asc">Nombre: A-Z</option>
                  <option value="name-desc">Nombre: Z-A</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LISTA DE PRODUCTOS */}
      {filteredProducts.length === 0 ? (
        <div className="alert alert-warning text-center">
          <h4>No se encontraron productos</h4>
          <p>No hay productos que coincidan con los filtros seleccionados.</p>
          <button 
            className="btn btn-gamer mt-2"
            onClick={limpiarFiltros}
          >
            Mostrar todos los productos
          </button>
        </div>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card card-gamer h-100">
                <img 
                  src={product.imageSrc} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x200/333/fff?text=Imagen+No+Disponible";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-gamer">{product.title}</h5>
                  {product.category && (
                    <span className="badge bg-secondary mb-2">{product.category}</span>
                  )}
                  <p className="card-text text-light flex-grow-1">{product.description}</p>
                  <div className="mt-auto">
                    <p className="card-text text-gamer fw-bold h5">{formatPrice(product.price)}</p>
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-gamer w-100"
                        onClick={() => verDetalles(product)}
                      >
                        👁️ Ver Detalles
                      </button>
                      <button 
                        className="btn btn-outline-gamer w-100"
                        onClick={() => agregarAlCarrito(product)}
                      >
                        🛒 Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DE DETALLES DEL PRODUCTO */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4 className="text-gamer">{selectedProduct.title}</h4>
              <button 
                className="close-btn"
                onClick={() => setSelectedProduct(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <img 
                    src={selectedProduct.imageSrc} 
                    alt={selectedProduct.title}
                    className="img-fluid rounded"
                    style={{maxHeight: '400px', objectFit: 'cover', width: '100%'}}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400/333/fff?text=Imagen+No+Disponible";
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="product-detail-info">
                    {selectedProduct.category && (
                      <span className="badge bg-secondary mb-3">{selectedProduct.category}</span>
                    )}
                    <p className="text-light fs-5">{selectedProduct.description}</p>
                    
                    <div className="product-features mb-4">
                      <h6 className="text-gamer">Características:</h6>
                      <ul className="text-light">
                        <li>Producto de alta calidad gaming</li>
                        <li>Garantía 12 meses</li>
                        <li>Envío gratis en compras sobre $50.000</li>
                        <li>Soporte técnico 24/7</li>
                      </ul>
                    </div>
                    
                    <div className="product-details-price mb-4">
                      <h3 className="text-gamer">{formatPrice(selectedProduct.price)}</h3>
                      <small className="text-muted">IVA incluido</small>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-gamer btn-lg"
                        onClick={() => {
                          agregarAlCarrito(selectedProduct);
                          setSelectedProduct(null);
                        }}
                      >
                        🛒 Agregar al Carrito
                      </button>
                      <button 
                        className="btn btn-outline-gamer"
                        onClick={() => setSelectedProduct(null)}
                      >
                        Seguir Viendo Productos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para el modal */}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .product-detail-modal {
          background: #1a1a1a;
          border-radius: 15px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border: 2px solid #6f42c1;
          box-shadow: 0 0 30px rgba(111, 66, 193, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #333;
          background: rgba(111, 66, 193, 0.1);
        }

        .modal-header h4 {
          margin: 0;
          color: #6f42c1;
        }

        .close-btn {
          background: none;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .close-btn:hover {
          background: #6f42c1;
          color: white;
        }

        .modal-body {
          padding: 30px;
        }

        .product-detail-info {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .product-features {
          border-left: 3px solid #6f42c1;
          padding-left: 15px;
        }

        .product-features ul {
          padding-left: 20px;
          margin-bottom: 0;
        }

        .product-features li {
          margin-bottom: 5px;
        }

        @media (max-width: 768px) {
          .modal-body {
            padding: 20px;
          }
          
          .product-detail-modal {
            margin: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default Products;