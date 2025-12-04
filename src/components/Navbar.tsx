import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart'; 
import { getUserRole } from '../util/auth'; // Importa getUserRole

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <style>
        {`
          .navbar-gamer {
            background: linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%) !important;
            border-bottom: 2px solid #39FF14;
            box-shadow: 0 4px 20px rgba(57, 255, 20, 0.15);
            padding: 0.8rem 0;
          }

          .navbar-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }

          .navbar-brand-gamer {
            color: #39FF14 !important;
            font-weight: 800;
            font-size: 1.6rem;
            text-shadow: 0 0 15px rgba(57, 255, 20, 0.6);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            text-decoration: none;
          }

          .navbar-brand-gamer:hover {
            color: #28cc0f !important;
            transform: scale(1.05);
          }

          .nav-main {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex: 1;
            justify-content: center;
          }

          .nav-auth {
            display: flex;
            align-items: center;
            gap: 0.8rem;
          }

          .nav-link-gamer {
            color: #fff !important;
            font-weight: 600;
            padding: 0.5rem 1.2rem !important;
            border-radius: 8px;
            transition: all 0.3s ease;
            border: 1px solid transparent;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.95rem;
          }

          .nav-link-gamer:hover {
            background: rgba(57, 255, 20, 0.1);
            color: #39FF14 !important;
            border: 1px solid #39FF14;
            transform: translateY(-1px);
          }

          .nav-link-gamer.active {
            background: #39FF14;
            color: #000 !important;
          }

          /* Botones de auth */
          .auth-btn {
            background: transparent;
            border: 1px solid #39FF14;
            color: #39FF14;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }

          .auth-btn.login {
            background: rgba(57, 255, 20, 0.1);
          }

          .auth-btn:hover {
            background: #39FF14;
            color: #000;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(57, 255, 20, 0.3);
          }

          /* Usuario logeado */
          .user-section {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .user-info {
            color: #39FF14;
            font-weight: 600;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }

          .logout-btn {
            background: transparent;
            border: 1px solid #ff4444;
            color: #ff4444;
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            font-size: 0.85rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }

          .logout-btn:hover {
            background: #ff4444;
            color: #fff;
            transform: translateY(-1px);
          }

          /* Cart mejorado */
          .cart-nav-wrapper {
            display: flex;
            align-items: center;
          }

          /* Admin link */
          .admin-link {
            background: rgba(255, 153, 0, 0.1);
            border: 1px solid #FF9900;
          }

          /* Mobile */
          @media (max-width: 768px) {
            .navbar-container {
              flex-direction: column;
              gap: 1rem;
            }

            .nav-main {
              order: 2;
              width: 100%;
              justify-content: center;
            }

            .nav-auth {
              order: 3;
              width: 100%;
              justify-content: center;
            }

            .navbar-brand-gamer {
              order: 1;
            }
          }
        `}
      </style>

      <nav className="navbar-gamer">
        <div className="container">
          <div className="navbar-container">
            {/* Logo */}
            <Link className="navbar-brand-gamer" to="/">
              <i className="bi bi-joystick me-2"></i>
              LevelUp Gamer
            </Link>

            {/* Navegación Principal */}
            <div className="nav-main">
              <Link className="nav-link-gamer" to="/">
                <i className="bi bi-house"></i>
                Inicio
              </Link>
              <Link className="nav-link-gamer" to="/products">
                <i className="bi bi-controller"></i>
                Productos
              </Link>
              
              {/* Solo mostrar Admin Panel si el usuario es admin */}
              {usuario && getUserRole() === 'admin' && (
                <Link to="/admin" className="nav-link-gamer admin-link" style={{ color: '#FF9900' }}>
                  <i className="bi bi-shield-lock"></i>
                  Admin Panel
                </Link>
              )}
              
              <div className="cart-nav-wrapper">
                <Cart />
              </div>
            </div>

            {/* Autenticación */}
            <div className="nav-auth">
              {usuario ? (
                <div className="user-section">
                  <span className="user-info">
                    <i className="bi bi-person-circle"></i>
                    Bienvenido/a, {usuario.nombre} {usuario.apellido}
                  </span>
                  <button onClick={handleLogout} className="logout-btn">
                    <i className="bi bi-box-arrow-right"></i>
                    Salir
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="auth-btn login">
                    <i className="bi bi-box-arrow-in-right"></i>
                    Login
                  </Link>
                  <Link to="/register" className="auth-btn">
                    <i className="bi bi-person-plus"></i>
                    Registro
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;