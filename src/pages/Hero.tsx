import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <>
      <style>
        {`
          .hero-section {
            background: linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 50%, #0b0b0b 100%);
            position: relative;
            overflow: hidden;
          }
          .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 80%, rgba(57, 255, 20, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(57, 255, 20, 0.05) 0%, transparent 50%);
            animation: pulse 4s ease-in-out infinite alternate;
          }
          @keyframes pulse {
            0% { opacity: 0.3; }
            100% { opacity: 0.7; }
          }
          .hero-title {
            background: linear-gradient(135deg, #fff 0%, #39FF14 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px rgba(57, 255, 20, 0.3);
          }
          .btn-gamer-hero {
            background: linear-gradient(135deg, #39FF14 0%, #28cc0f 100%);
            color: #000;
            font-weight: 700;
            border: none;
            border-radius: 12px;
            padding: 12px 30px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(57, 255, 20, 0.3);
          }
          .btn-gamer-hero:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(57, 255, 20, 0.5);
            color: #000;
          }
          .hero-image {
            filter: drop-shadow(0 0 20px rgba(57, 255, 20, 0.2));
            transition: all 0.5s ease;
            animation: float 3s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .hero-image:hover {
            filter: drop-shadow(0 0 30px rgba(57, 255, 20, 0.4));
            transform: scale(1.05);
          }
          .feature-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
          }
          .feature-list li {
            margin: 10px 0;
            color: #ccc;
          }
          .feature-list li::before {
            content: '🎮';
            margin-right: 10px;
          }
        `}
      </style>

      <section id="inicio" className="py-5 text-center text-white hero-section">
        <div className="container position-relative">
          <div className="row align-items-center g-4">
            
            {/* Texto */}
            <div className="col-12 col-lg-6 text-lg-start">
              <h1 className="display-4 fw-bold mb-3 hero-title">
                Bienvenido a <span className="text-primary">Level Up Gamer</span>
              </h1>
              <p className="lead mb-4 text-light fs-5">
                La tienda online gamer que es para ti! Encuentra consolas, accesorios, PCs gaming, sillas y mucho más al mejor precio. 
                <span className="d-block mt-2 text-success">🚀 ¡Envío gratis en compras sobre $50.000!</span>
              </p>

              {/* Lista de características */}
              <ul className="feature-list">
                <li>🎯 Los mejores precios del mercado</li>
                <li>⚡ Envíos express en 24-48 horas</li>
                <li>🛡️ Garantía de 1 año en todos los productos</li>
                <li>🎁 Puntos canjeables por recompensas</li>
              </ul>

              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mt-4">
                <Link to="/products" className="btn btn-gamer-hero btn-lg">
                  <i className="bi bi-controller me-2"></i> 
                  Ver Catálogo
                </Link>
                <button className="btn btn-outline-light btn-lg">
                  <i className="bi bi-people-fill me-2"></i> 
                  Únete a la Comunidad
                </button>
              </div>

              {/* Stats */}
              <div className="row mt-5 text-center">
                <div className="col-4">
                  <div className="text-success fw-bold fs-3">500+</div>
                  <div className="text-secondary">Productos</div>
                </div>
                <div className="col-4">
                  <div className="text-success fw-bold fs-3">10K+</div>
                  <div className="text-secondary">Clientes</div>
                </div>
                <div className="col-4">
                  <div className="text-success fw-bold fs-3">4.9★</div>
                  <div className="text-secondary">Rating</div>
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="col-12 col-lg-6 text-center">
              <img 
                src="assets/logo_gamer.png" 
                alt="Level Up Gamer Logo" 
                className="img-fluid rounded shadow-lg hero-image" 
                style={{ maxWidth: '400px' }}
                onError={(e) => {
                  // Fallback si la imagen no carga
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%2339FF14'%3ELevel Up Gamer%3C/text%3E%3C/svg%3E"
                }}
              />
              
              {/* Badge de oferta */}
              <div className="mt-3">
                <span className="badge bg-success fs-6 p-2">
                  🎉 Oferta de la semana: 15% OFF en todos los headsets
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;