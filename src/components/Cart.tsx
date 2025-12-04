import React, { useState, useEffect, useRef } from 'react';

interface CartItem {
  name: string;
  unitPrice: number;
  qty: number;
  imageSrc?: string;
  id?: number;
  description?: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    tarjeta: '',
    vencimiento: '',
    cvv: '',
    nombreTarjeta: ''
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const loadCart = () => {
      const KEY = 'carritoLevelUp_v1';
      const storedCart = localStorage.getItem(KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };

    loadCart();
    
    // Event listener mejorado
    const handleCartUpdate = () => {
      loadCart();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // SOLUCIÓN: Desactivar cierre por clic fuera cuando hay checkout
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // NO cerrar si estamos en checkout
      if (showCheckout) return;
      
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, showCheckout]); // Dependencia importante

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatear tarjeta de crédito
    if (name === 'tarjeta') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 19) }));
      return;
    }
    
    // Formatear fecha de vencimiento
    if (name === 'vencimiento') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 5) }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Calcular totales
  const getTotalItems = () => cartItems.reduce((total, item) => total + item.qty, 0);
  const getTotalPrice = () => cartItems.reduce((total, item) => total + (item.unitPrice * item.qty), 0);
  const getDiscount = () => {
    const total = getTotalPrice();
    return total > 50000 ? total * 0.1 : 0;
  };
  const getFinalTotal = () => getTotalPrice() - getDiscount();

  // Actualizar cantidad - SIN recargar todo
  const updateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(index);
      return;
    }
    
    const updatedCart = [...cartItems];
    updatedCart[index].qty = newQty;
    setCartItems(updatedCart);
    localStorage.setItem('carritoLevelUp_v1', JSON.stringify(updatedCart));
    
    // Solo actualizar el carrito, NO recargar todo
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Eliminar item - SIN animaciones que causen recarga
  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('carritoLevelUp_v1', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Formatear precio
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CL')}`;
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('carritoLevelUp_v1', JSON.stringify([]));
    window.dispatchEvent(new Event('cartUpdated'));
    setIsOpen(false);
  };

  // Proceder al pago - Mantener modal abierto
  const handleCheckout = () => {
    setShowCheckout(true);
    setCheckoutStep(1);
  };

  // Validar formularios
  const validateShippingForm = () => {
    const { nombre, apellido, email, direccion, ciudad, codigoPostal } = formData;
    return nombre && apellido && email && direccion && ciudad && codigoPostal;
  };

  const validatePaymentForm = () => {
    const { tarjeta, vencimiento, cvv, nombreTarjeta } = formData;
    return tarjeta.replace(/\s/g, '').length === 16 && 
           vencimiento.length === 5 && 
           cvv.length === 3 && 
           nombreTarjeta;
  };

  // Simular pago
  const simulatePayment = () => {
    if (!validatePaymentForm()) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    setCheckoutStep(3);
    
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setIsOpen(false);
      setFormData({
        nombre: '', apellido: '', email: '', direccion: '', ciudad: '', codigoPostal: '',
        tarjeta: '', vencimiento: '', cvv: '', nombreTarjeta: ''
      });
      setCheckoutStep(1);
    }, 3000);
  };

  // Componente de checkout SIMPLIFICADO y ESTABLE
  const CheckoutProcess = () => (
    <div className="checkout-process">
      <div className="checkout-header">
        <h4 className="text-gamer mb-4">🎮 Finalizar Compra</h4>
        
        <div className="checkout-steps">
          <div className={`step ${checkoutStep >= 1 ? 'active' : ''}`}>
            <div className="step-icon">🚚</div>
            <div className="step-info">
              <div className="step-title">Envío</div>
            </div>
          </div>
          
          <div className="step-connector"></div>
          
          <div className={`step ${checkoutStep >= 2 ? 'active' : ''}`}>
            <div className="step-icon">💳</div>
            <div className="step-info">
              <div className="step-title">Pago</div>
            </div>
          </div>
          
          <div className="step-connector"></div>
          
          <div className={`step ${checkoutStep >= 3 ? 'active' : ''}`}>
            <div className="step-icon">✅</div>
            <div className="step-info">
              <div className="step-title">Confirmar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Paso 1 - Información de Envío */}
      {checkoutStep === 1 && (
        <div className="checkout-step">
          <div className="step-content">
            <h5 className="step-title">📦 Información de Envío</h5>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Apellido *</label>
                <input
                  type="text"
                  name="apellido"
                  className="form-control"
                  placeholder="Tu apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="tu.email@ejemplo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">Dirección *</label>
                <input
                  type="text"
                  name="direccion"
                  className="form-control"
                  placeholder="Calle, número, departamento"
                  value={formData.direccion}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Ciudad *</label>
                <input
                  type="text"
                  name="ciudad"
                  className="form-control"
                  placeholder="Tu ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Código Postal *</label>
                <input
                  type="text"
                  name="codigoPostal"
                  className="form-control"
                  placeholder="000000"
                  value={formData.codigoPostal}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="checkout-actions">
              <button 
                className="btn btn-outline-gamer"
                type="button"
                onClick={() => setShowCheckout(false)}
              >
                ← Volver
              </button>
              <button 
                className="btn btn-gamer"
                type="button"
                onClick={() => validateShippingForm() ? setCheckoutStep(2) : alert('Por favor completa todos los campos')}
              >
                Continuar →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paso 2 - Información de Pago */}
      {checkoutStep === 2 && (
        <div className="checkout-step">
          <div className="step-content">
            <h5 className="step-title">💳 Información de Pago</h5>
            
            <div className="payment-form">
              <div className="form-group full-width">
                <label className="form-label">Número de Tarjeta *</label>
                <input
                  type="text"
                  name="tarjeta"
                  className="form-control"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={formData.tarjeta}
                  onChange={handleInputChange}
                  autoFocus
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Vencimiento *</label>
                  <input
                    type="text"
                    name="vencimiento"
                    className="form-control"
                    placeholder="MM/AA"
                    maxLength={5}
                    value={formData.vencimiento}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">CVV *</label>
                  <input
                    type="password"
                    name="cvv"
                    className="form-control"
                    placeholder="123"
                    maxLength={3}
                    value={formData.cvv}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">Nombre en Tarjeta *</label>
                <input
                  type="text"
                  name="nombreTarjeta"
                  className="form-control"
                  placeholder="Como aparece en la tarjeta"
                  value={formData.nombreTarjeta}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="order-summary">
              <h6>Resumen del Pedido</h6>
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              {getDiscount() > 0 && (
                <div className="summary-line discount">
                  <span>Descuento:</span>
                  <span>-{formatPrice(getDiscount())}</span>
                </div>
              )}
              <div className="summary-line total">
                <strong>Total:</strong>
                <strong>{formatPrice(getFinalTotal())}</strong>
              </div>
            </div>

            <div className="checkout-actions">
              <button 
                className="btn btn-outline-gamer"
                type="button"
                onClick={() => setCheckoutStep(1)}
              >
                ← Atrás
              </button>
              <button 
                className="btn btn-gamer"
                type="button"
                onClick={simulatePayment}
              >
                🎮 Pagar {formatPrice(getFinalTotal())}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paso 3 - Confirmación */}
      {checkoutStep === 3 && (
        <div className="checkout-step">
          <div className="step-content text-center">
            <div className="payment-success">
              <div className="success-icon">🎉</div>
              <h4 className="text-success">¡Pago Exitoso!</h4>
              <p>Tu pedido ha sido procesado</p>
              <div className="order-details">
                <p>N° de orden: <strong>#GAMER-{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong></p>
                <p>Total: <strong>{formatPrice(getFinalTotal())}</strong></p>
              </div>
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Botón del carrito */}
      <button 
        className="cart-button-nav"
        onClick={() => setIsOpen(true)}
      >
        <i className="bi bi-cart3"></i>
        Carrito
        {getTotalItems() > 0 && (
          <span className="cart-count-badge">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Modal del carrito - VERSIÓN ESTABLE */}
      {isOpen && (
        <div className="cart-modal-overlay" onClick={() => !showCheckout && setIsOpen(false)}>
          <div 
            className="cart-modal-content" 
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-modal-header">
              <h3>🛒 Tu Carrito</h3>
              <button 
                className="cart-close-btn"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="cart-modal-body" ref={bodyRef}>
              {showCheckout ? (
                <CheckoutProcess />
              ) : (
                <>
                  {cartItems.length === 0 ? (
                    <div className="empty-cart text-center">
                      <i className="bi bi-cart-x"></i>
                      <p>Tu carrito está vacío</p>
                      <button 
                        className="btn btn-gamer"
                        onClick={() => setIsOpen(false)}
                        type="button"
                      >
                        Seguir Comprando
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="cart-items-list">
                        {cartItems.map((item, index) => (
                          <div key={index} className="cart-item">
                            <div className="cart-item-image">
                              <img 
                                src={item.imageSrc || "https://via.placeholder.com/50"} 
                                alt={item.name}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/50";
                                }}
                              />
                            </div>
                            
                            <div className="cart-item-details">
                              <div className="cart-item-info">
                                <h6>{item.name}</h6>
                                <span className="cart-item-price">
                                  {formatPrice(item.unitPrice)} c/u
                                </span>
                              </div>
                              
                              <div className="cart-item-controls">
                                <div className="quantity-controls">
                                  <button 
                                    className="quantity-btn"
                                    onClick={() => updateQuantity(index, item.qty - 1)}
                                    type="button"
                                  >
                                    -
                                  </button>
                                  <span className="quantity">{item.qty}</span>
                                  <button 
                                    className="quantity-btn"
                                    onClick={() => updateQuantity(index, item.qty + 1)}
                                    type="button"
                                  >
                                    +
                                  </button>
                                </div>
                                
                                <div className="cart-item-total">
                                  {formatPrice(item.unitPrice * item.qty)}
                                </div>
                                
                                <button 
                                  className="remove-btn"
                                  onClick={() => removeItem(index)}
                                  type="button"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="cart-summary">
                        <div className="cart-totals">
                          <div className="cart-total-line">
                            <span>Subtotal:</span>
                            <span>{formatPrice(getTotalPrice())}</span>
                          </div>
                          {getDiscount() > 0 && (
                            <div className="cart-total-line discount">
                              <span>Descuento (10%):</span>
                              <span>-{formatPrice(getDiscount())}</span>
                            </div>
                          )}
                          <div className="cart-total-line final-total">
                            <strong>Total:</strong>
                            <strong>{formatPrice(getFinalTotal())}</strong>
                          </div>
                        </div>
                        
                        <div className="cart-actions">
                          <button 
                            className="btn btn-outline-gamer"
                            onClick={clearCart}
                            type="button"
                          >
                            <i className="bi bi-trash"></i>
                            Vaciar
                          </button>
                          <button 
                            className="btn btn-gamer"
                            onClick={handleCheckout}
                            type="button"
                          >
                            <i className="bi bi-credit-card"></i>
                            Pagar
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ESTILOS SIMPLIFICADOS Y ESTABLES */}
      <style>{`
        .cart-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: flex-end;
          z-index: 1000;
        }

        .cart-modal-content {
          background: #1a1a1a;
          width: 100%;
          max-width: 400px;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-left: 2px solid #39FF14;
        }

        .cart-modal-header {
          padding: 20px;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #0b0b0b;
        }

        .cart-modal-header h3 {
          margin: 0;
          color: #39FF14;
        }

        .cart-close-btn {
          background: none;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          padding: 5px;
        }

        .cart-modal-body {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        /* Items del carrito - ESTILOS SIMPLES */
        .cart-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          margin-bottom: 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          border: 1px solid #333;
        }

        .cart-item-image img {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          object-fit: cover;
        }

        .cart-item-details {
          flex: 1;
        }

        .cart-item-info h6 {
          margin: 0 0 5px 0;
          color: #fff;
          font-size: 0.9rem;
        }

        .cart-item-price {
          color: #39FF14;
          font-size: 0.8rem;
        }

        .cart-item-controls {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 10px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          padding: 5px 10px;
          border-radius: 20px;
        }

        .quantity-btn {
          background: #39FF14;
          border: none;
          color: #000;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          cursor: pointer;
          font-weight: bold;
        }

        .quantity {
          color: #fff;
          min-width: 20px;
          text-align: center;
        }

        .cart-item-total {
          color: #fff;
          font-weight: bold;
          margin-left: auto;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #ff4444;
          cursor: pointer;
          padding: 5px;
        }

        /* Resumen */
        .cart-summary {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #333;
        }

        .cart-totals {
          background: rgba(255, 255, 255, 0.05);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 15px;
        }

        .cart-total-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .cart-total-line.final-total {
          border-top: 1px solid #333;
          padding-top: 10px;
          margin-top: 10px;
          font-size: 1.1rem;
        }

        .cart-actions {
          display: flex;
          gap: 10px;
        }

        .cart-actions .btn {
          flex: 1;
          padding: 10px;
        }

        /* Botones */
        .btn-gamer {
          background: #39FF14;
          color: #000;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        .btn-outline-gamer {
          background: transparent;
          color: #39FF14;
          border: 1px solid #39FF14;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
        }

        /* Checkout */
        .checkout-process {
          padding: 10px;
        }

        .checkout-steps {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
        }

        .step {
          text-align: center;
          flex: 1;
        }

        .step.active .step-icon {
          background: #39FF14;
          color: #000;
        }

        .step-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 5px;
        }

        .step-title {
          font-size: 0.8rem;
          color: #888;
        }

        .step.active .step-title {
          color: #39FF14;
        }

       /* ===== FORMULARIOS MEJORADOS - TEXTO BLANCO BRILLANTE ===== */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  color: #fff;
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-weight: 600;
}

.form-control {
  background: #2a2a2a;
  border: 1px solid #444;
  color: #ffffff !important; /* ⭐ BLANCO BRILLANTE */
  padding: 12px 15px;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  font-weight: 500; /* ⭐ MÁS LEGIBLE */
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #39FF14;
  background: #333;
  color: #ffffff !important; /* ⭐ BLANCO TAMBIÉN EN FOCUS */
  box-shadow: 0 0 0 3px rgba(57, 255, 20, 0.15);
}

.form-control::placeholder {
  color: #999 !important; /* ⭐ Placeholder gris claro */
  opacity: 1;
  font-weight: 400;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  grid-column: 1 / -1;
}

/* Para inputs de tipo password también */
input[type="password"].form-control {
  color: #ffffff !important;
  font-family: Arial, sans-serif; /* ⭐ Evita que muestre puntos muy pequeños */
  letter-spacing: 1px; /* ⭐ Espaciado para ver mejor los caracteres */
}

/* Para inputs de tipo email y text */
input[type="email"].form-control,
input[type="text"].form-control {
  color: #ffffff !important;
}

/* También mejora los labels para más contraste */
.form-label {
  color: #f0f0f0; /* ⭐ Blanco más suave pero visible */
  margin-bottom: 8px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Para el checkout específicamente */
.checkout-step .form-control {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff !important;
}

.checkout-step .form-control:focus {
  background: rgba(255, 255, 255, 0.12);
  border-color: #39FF14;
  color: #ffffff !important;
}

/* ===== BOTONES DE CHECKOUT MEJORADOS ===== */
.checkout-actions {
  display: flex;
  gap: 25px !important; /* ⭐ ESPACIO GENEROSO */
  margin-top: 30px;
  padding: 0 15px;
  justify-content: center;
}

.checkout-actions .btn {
  flex: 1;
  padding: 16px 25px;
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Botón VOLVER */
.checkout-actions .btn-outline-gamer {
  background: transparent;
  border: 3px solid #39FF14 !important;
  color: #39FF14;
  box-shadow: 0 4px 15px rgba(57, 255, 20, 0.1);
}

.checkout-actions .btn-outline-gamer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.1), transparent);
  transition: left 0.5s;
}

.checkout-actions .btn-outline-gamer:hover::before {
  left: 100%;
}

.checkout-actions .btn-outline-gamer:hover {
  background: rgba(57, 255, 20, 0.05);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(57, 255, 20, 0.2);
  border-color: #00FFFF !important;
  color: #00FFFF;
}

/* Botón CONTINUAR */
.checkout-actions .btn-gamer {
  background: linear-gradient(135deg, #39FF14 0%, #00FFFF 100%);
  color: #000;
  box-shadow: 0 4px 20px rgba(57, 255, 20, 0.3);
}

.checkout-actions .btn-gamer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.checkout-actions .btn-gamer:hover::before {
  left: 100%;
}

.checkout-actions .btn-gamer:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 30px rgba(57, 255, 20, 0.5);
  background: linear-gradient(135deg, #00FFFF 0%, #39FF14 100%);
}

/* Iconos dentro de los botones */
.checkout-actions .btn i {
  font-size: 1.2rem;
}

/* Para la versión responsive */
@media (max-width: 768px) {
  .checkout-actions {
    flex-direction: column;
    gap: 20px !important; /* ⭐ BUEN ESPACIO VERTICAL */
    padding: 0;
  }
  
  .checkout-actions .btn {
    width: 100%;
    padding: 18px 25px; /* ⭐ AÚN MÁS GRANDES EN MÓVIL */
    font-size: 1.1rem;
  }
}

/* Para pantallas muy pequeñas */
@media (max-width: 480px) {
  .checkout-actions {
    gap: 15px !important;
  }
  
  .checkout-actions .btn {
    padding: 16px 20px;
    font-size: 1rem;
    min-height: 50px;
  }
}

        /* Order summary */
        .order-summary {
          background: rgba(255, 255, 255, 0.05);
          padding: 15px;
          border-radius: 10px;
          margin: 20px 0;
        }

        .order-summary h6 {
          color: #fff;
          margin-bottom: 15px;
        }

        .summary-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .summary-line.total {
          border-top: 1px solid #333;
          padding-top: 10px;
          margin-top: 10px;
          font-size: 1.1rem;
        }

        /* Success */
        .payment-success {
          padding: 30px 20px;
        }

        .success-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        .loading-bar {
          width: 100%;
          height: 3px;
          background: #333;
          border-radius: 2px;
          margin: 20px 0;
          overflow: hidden;
        }

        .loading-progress {
          height: 100%;
          background: #39FF14;
          width: 100%;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .cart-modal-content {
            max-width: 100%;
          }
          
          .cart-item {
            flex-direction: column;
            text-align: center;
          }
          
          .cart-item-controls {
            justify-content: center;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .checkout-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default Cart;