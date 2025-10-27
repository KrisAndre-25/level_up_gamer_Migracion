import React from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart'; // Importamos el componente Cart

export const Navbar: React.FC = () => {
  return (
    <>
      <style>
        {`
          .navbar-gamer {
            background: linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%) !important;
            border-bottom: 2px solid #39FF14;
            box-shadow: 0 4px 12px rgba(57, 255, 20, 0.2);
            padding: 12px 0;
          }

          .navbar-brand-gamer {
            color: #39FF14 !important;
            font-weight: 800;
            font-size: 1.5rem;
            text-shadow: 0 0 10px rgba(57, 255, 20, 0.5);
            transition: all 0.3s ease;
          }

          .navbar-brand-gamer:hover {
            color: #28cc0f !important;
            text-shadow: 0 0 15px rgba(57, 255, 20, 0.8);
            transform: scale(1.05);
          }

          .nav-link-gamer {
            color: #fff !important;
            font-weight: 600;
            margin: 0 8px;
            padding: 8px 16px !important;
            border-radius: 8px;
            transition: all 0.3s ease;
            position: relative;
          }

          .nav-link-gamer:hover {
            background: #39FF14;
            color: #000 !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(57, 255, 20, 0.3);
          }

          .nav-link-gamer::before {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            width: 0;
            height: 2px;
            background: #39FF14;
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }

          .nav-link-gamer:hover::before {
            width: 80%;
          }

          .navbar-toggler-gamer {
            border: 1px solid #39FF14 !important;
            background: transparent;
          }

          .navbar-toggler-gamer:focus {
            box-shadow: 0 0 0 2px rgba(57, 255, 20, 0.25) !important;
          }

          .navbar-toggler-icon-custom {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2857, 255, 20, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
          }

          /* Estilos específicos para el carrito en navbar */
          .cart-nav-item {
            display: flex;
            align-items: center;
          }

          .cart-button-nav {
            background: none;
            border: none;
            color: #fff;
            font-weight: 600;
            margin: 0 8px;
            padding: 8px 16px;
            border-radius: 8px;
            transition: all 0.3s ease;
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .cart-button-nav:hover {
            background: #39FF14;
            color: #000;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(57, 255, 20, 0.3);
          }

          .cart-count-badge {
            position: absolute;
            top: -5px;
            right: 5px;
            background: #ff4444;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }

          @media (max-width: 991.98px) {
            .navbar-collapse-gamer {
              background: #1a1a1a;
              border-radius: 8px;
              margin-top: 10px;
              padding: 15px;
              border: 1px solid #39FF14;
            }
            
            .nav-link-gamer {
              margin: 5px 0;
              text-align: center;
            }

            .cart-button-nav {
              margin: 5px 0;
              text-align: center;
              justify-content: center;
              width: 100%;
            }
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-gamer">
        <div className="container">
          <Link className="navbar-brand navbar-brand-gamer" to="/">
            <i className="bi bi-joystick me-2"></i>
            Level Up Gamer
          </Link>
          
          <button 
            className="navbar-toggler navbar-toggler-gamer" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon navbar-toggler-icon-custom"></span>
          </button>
          
          <div className="collapse navbar-collapse navbar-collapse-gamer" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link nav-link-gamer" to="/">
                  <i className="bi bi-house me-1"></i>
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-gamer" to="/products">
                  <i className="bi bi-controller me-1"></i>
                  Productos
                </Link>
              </li>
              <li className="nav-item cart-nav-item">
                {/* Reemplazamos el enlace simple por el componente Cart */}
                <Cart />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};