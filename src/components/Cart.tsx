import React, { useState, useEffect } from 'react';

interface CartItem {
  name: string;
  unitPrice: number;
  qty: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const loadCart = () => {
      console.log('Evento cartUpdated recibido');
      const KEY = 'carritoLevelUp_v1';
      const storedCart = localStorage.getItem(KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };

    loadCart();

    // Escuchar eventos de actualización del carrito
    window.addEventListener('cartUpdated', loadCart);
    
    return () => {
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  // Calcular total de items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  // Calcular precio total
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.unitPrice * item.qty), 0);
  };

  // Actualizar cantidad
  const updateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(index);
      return;
    }
    
    const updatedCart = [...cartItems];
    updatedCart[index].qty = newQty;
    setCartItems(updatedCart);
    localStorage.setItem('carritoLevelUp_v1', JSON.stringify(updatedCart));
    
    // Disparar evento para actualizar otros componentes
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Eliminar item
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

  return (
    <>
      {/* Botón del carrito en navbar */}
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

      {/* Modal del carrito */}
      {isOpen && (
        <div className="cart-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cart-modal-header">
              <h3>🛒 Tu Carrito</h3>
              <button 
                className="cart-close-btn"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="cart-modal-body">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <i className="bi bi-cart-x" style={{fontSize: '3rem', color: '#666'}}></i>
                  <p>Tu carrito está vacío</p>
                  <button 
                    className="btn btn-gamer"
                    onClick={() => setIsOpen(false)}
                  >
                    Seguir Comprando
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items-list">
                    {cartItems.map((item, index) => (
                      <div key={index} className="cart-item">
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
                            >
                              -
                            </button>
                            <span className="quantity">{item.qty}</span>
                            <button 
                              className="quantity-btn"
                              onClick={() => updateQuantity(index, item.qty + 1)}
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
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                    <div className="cart-summary">
                    <div className="cart-total">
                        <strong>Total: {formatPrice(getTotalPrice())}</strong>
                    </div>
                    <div className="cart-actions">
                        <button 
                        className="btn btn-outline-gamer"
                        onClick={clearCart}
                        >
                        <i className="bi bi-trash me-2"></i>
                        Vaciar Carrito
                        </button>
                        <button className="btn btn-gamer">
                        <i className="bi bi-credit-card me-2"></i>
                        Proceder al Pago
                        </button>
                    </div>
                    </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;