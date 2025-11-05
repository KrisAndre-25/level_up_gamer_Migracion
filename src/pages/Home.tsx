import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoGamer from '../assets/img/logo_gamer.png';

// Componente de Partículas para el fondo interactivo
const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        color: `rgba(57, 255, 20, ${Math.random() * 0.3 + 0.1})`
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(11, 11, 11, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(57, 255, 20, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particles-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export const Home = () => {
  return (
    <>
      <ParticlesBackground />
      
      <style>
        {`
          .hero-section {
            background: linear-gradient(135deg, rgba(11, 11, 11, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
          }
          .particles-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
          }
          .hero-title {
            background: linear-gradient(135deg, #fff 0%, #39FF14 50%, #28cc0f 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px rgba(57, 255, 20, 0.5);
            animation: glow 2s ease-in-out infinite alternate;
          }
          @keyframes glow {
            from { text-shadow: 0 0 20px rgba(57, 255, 20, 0.5); }
            to { text-shadow: 0 0 30px rgba(57, 255, 20, 0.8), 0 0 40px rgba(57, 255, 20, 0.6); }
          }
          .btn-gamer {
            background: linear-gradient(135deg, #39FF14 0%, #28cc0f 100%);
            color: #000;
            font-weight: 800;
            border: none;
            border-radius: 15px;
            padding: 15px 30px;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(57, 255, 20, 0.4);
            position: relative;
            overflow: hidden;
          }
          .btn-gamer::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
          }
          .btn-gamer:hover::before {
            left: 100%;
          }
          .btn-gamer:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 30px rgba(57, 255, 20, 0.6);
          }
          .hero-image {
            filter: drop-shadow(0 0 25px rgba(57, 255, 20, 0.3));
            transition: all 0.5s ease;
            animation: float 4s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
          }
          .feature-card {
            background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(42, 42, 42, 0.9) 100%);
            border: 2px solid transparent;
            border-radius: 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
          }
          .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #39FF14, #28cc0f, #39FF14);
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }
          .feature-card:hover::before {
            transform: scaleX(1);
          }
          .feature-card:hover {
            transform: translateY(-10px) scale(1.02);
            border-color: #39FF14;
            box-shadow: 0 15px 40px rgba(57, 255, 20, 0.2);
          }
          .stats-counter {
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #39FF14, #28cc0f);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .mario-character {
            font-size: 4rem;
            animation: jump 2s ease-in-out infinite;
            filter: drop-shadow(0 0 10px rgba(57, 255, 20, 0.5));
          }
          @keyframes jump {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .social-btn {
            transition: all 0.3s ease;
            border: 2px solid;
            border-radius: 12px;
            padding: 12px 25px;
          }
          .social-btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 25px rgba(57, 255, 20, 0.3);
          }
          .level-card {
            background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(42, 42, 42, 0.9) 100%);
            border-radius: 20px;
            padding: 30px 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
          }
          .level-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent, rgba(57, 255, 20, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .level-card:hover::before {
            opacity: 1;
          }
          .level-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(57, 255, 20, 0.2);
          }
          .progress-bar-gamer {
            height: 20px;
            border-radius: 10px;
            background: #333;
            overflow: hidden;
            margin: 10px 0;
          }
          .progress-fill {
            height: 100%;
            border-radius: 10px;
            transition: width 0.5s ease-in-out;
          }
          .review-card {
            background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(37, 37, 37, 0.9) 100%);
            border-radius: 15px;
            padding: 25px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
          }
          .review-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(57, 255, 20, 0.15);
          }
          .map-container {
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(57, 255, 20, 0.2);
            border: 3px solid #39FF14;
          }
          .typewriter {
            overflow: hidden;
            border-right: 3px solid #39FF14;
            white-space: nowrap;
            animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
          }
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
          @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: #39FF14 }
          }
          .floating-element {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Hero Section Épica */}
      <section id="inicio" className="py-5 text-center text-white hero-section">
        <div className="container position-relative">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6 text-lg-start">
              <h1 className="display-2 fw-bold mb-4 hero-title">
                LEVEL UP <span className="text-primary">GAMER</span>
              </h1>
              <p className="lead mb-4 text-light fs-3 typewriter">
                ¡Tu aventura gaming comienza aquí! 🚀
              </p>
              <p className="text-light mb-5 fs-5">
                Descubre productos épicos, únete a la comunidad más activa 
                y vive la experiencia gaming definitiva. 
                <span className="d-block mt-2 text-success fw-bold">
                  🎯 ¡Envío gratis en compras sobre $50.000!
                </span>
              </p>

              {/* Stats Interactivos */}
              <div className="row mb-5">
                <div className="col-4">
                  <div className="stats-counter">500+</div>
                  <div className="text-secondary">Productos</div>
                </div>
                <div className="col-4">
                  <div className="stats-counter">10K+</div>
                  <div className="text-secondary">Gamers</div>
                </div>
                <div className="col-4">
                  <div className="stats-counter">4.9★</div>
                  <div className="text-secondary">Rating</div>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Link to="/products" className="btn btn-gamer btn-lg">
                  <i className="bi bi-controller me-2"></i> 
                  EXPLORAR CATÁLOGO
                </Link>
                <button className="btn btn-outline-light btn-lg border-2">
                  <i className="bi bi-people-fill me-2"></i> 
                  UNIRME A LA COMUNIDAD
                </button>
              </div>
            </div>

<div className="col-12 col-lg-6 text-center">
  <img 
    src={logoGamer} 
    alt="Level Up Gamer Logo" 
    className="img-fluid rounded shadow-lg hero-image floating-element" 
    style={{maxWidth: "450px"}} 
    onError={(e) => {
      e.currentTarget.style.display = 'none';
      const container = e.currentTarget.parentElement;
      if (container) {
        const fallback = document.createElement('div');
        fallback.className = 'text-center';
        fallback.innerHTML = `
          <div class="mario-character">🎮</div>
          <h3 class="text-success mt-3">LEVEL UP GAMER</h3>
          <p class="text-light">Tu tienda gaming definitiva</p>
        `;
        container.appendChild(fallback);
      }
    }}
  />
  {/* Badge de oferta */}
  <div className="mt-4">
    <span className="badge bg-success fs-6 p-3 rounded-pill">
      🎉 OFERTA ESPECIAL: 15% OFF EN HEADSETS GAMER
    </span>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Visión*/}
      <section id="vision" className="py-5 bg-black text-white">
        <div className="container">
          <header className="text-center mb-5">
            <h2 className="display-4 fw-bold text-success mb-3">NUESTRA VISIÓN</h2>
            <p className="text-light fs-5">Creando el futuro del gaming en Chile 🌟</p>
          </header>

          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <div className="feature-card h-100 text-center p-4">
                <div className="mario-character">🚀</div>
                <h3 className="h4 text-white mb-3">INNOVACIÓN CONSTANTE</h3>
                <p className="text-light">
                  Siempre a la vanguardia con los últimos lanzamientos y tecnología 
                  gaming de punta para ofrecerte lo mejor del mercado.
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="feature-card h-100 text-center p-4">
                <div className="mario-character">⚡</div>
                <h3 className="h4 text-white mb-3">EXPERIENCIA ÚNICA</h3>
                <p className="text-light">
                  Más que una tienda, un espacio donde los gamers encuentran su tribu, 
                  comparten experiencias y crean comunidades.
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="feature-card h-100 text-center p-4">
                <div className="mario-character">🎯</div>
                <h3 className="h4 text-white mb-3">CRECIMIENTO CONTINUO</h3>
                <p className="text-light">
                  Evolucionamos contigo, llevando el gaming chileno al siguiente nivel 
                  con eventos, torneos y contenido exclusivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compartir Experiencia */}
      <section id="social" className="py-5 bg-dark text-white">
        <div className="container text-center">
          <header className="mb-5">
            <h2 className="display-4 fw-bold text-primary mb-3">COMPARTE LA EXPERIENCIA</h2>
            <p className="text-light fs-5">Ayuda a que más gamers se unan a la comunidad ⚡</p>
          </header>

          <div className="row justify-content-center g-4">
            <div className="col-12 col-sm-6 col-md-3">
              <a href="#" className="btn btn-outline-primary social-btn w-100">
                <i className="bi bi-facebook me-2"></i> Facebook
              </a>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <a href="#" className="btn btn-outline-info social-btn w-100">
                <i className="bi bi-twitter-x me-2"></i> Twitter
              </a>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <a href="#" className="btn btn-outline-success social-btn w-100">
                <i className="bi bi-whatsapp me-2"></i> WhatsApp
              </a>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <a href="#" className="btn btn-outline-danger social-btn w-100">
                <i className="bi bi-instagram me-2"></i> Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comunidad Gamer Épica */}
<section id="comunidad" className="py-5 bg-black text-white">
  <div className="container">
    <header className="text-center mb-5">
      <h2 className="display-4 fw-bold text-gamer mb-3">COMUNIDAD GAMER</h2>
      <p className="text-light fs-5">Conecta, compite y crece con otros gamers 😊</p>
    </header>

    <div className="row g-4">
      <div className="col-12 col-md-6 col-lg-3 text-center">
        <div className="feature-card p-4 h-100">
          <div className="mario-character" style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.5))'
          }}>🏆</div> 
          <h4 className="text-white mb-3">TORNEOS ÉPICOS</h4>
          <p className="text-light">Competencias mensuales con premios legendarios y reconocimiento</p>
        </div>
      </div>
      
      <div className="col-12 col-md-6 col-lg-3 text-center">
        <div className="feature-card p-4 h-100">
          <div className="mario-character" style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.5))'
          }}>🎁</div>
          <h4 className="text-white mb-3">SORTEOS LEGENDARIOS</h4>
          <p className="text-light">Productos exclusivos semanales para la comunidad</p>
        </div>
      </div>
      
      <div className="col-12 col-md-6 col-lg-3 text-center">
        <div className="feature-card p-4 h-100">
          <div className="mario-character" style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.5))'
          }}>💬</div>
          <h4 className="text-white mb-3">FOROS ESTRATÉGICOS</h4>
          <p className="text-light">Discute tácticas, comparte tips y resuelve dudas</p>
        </div>
      </div>
      
      <div className="col-12 col-md-6 col-lg-3 text-center">
        <div className="feature-card p-4 h-100">
          <div className="mario-character" style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.5))'
          }}>📚</div>
          <h4 className="text-white mb-3">GUÍAS PRO</h4>
          <p className="text-light">Aprende de los mejores y domina cada juego</p>
        </div>
      </div>
    </div>

    {/* Botón de acción opcional */}
    <div className="text-center mt-5">
      <button className="btn-gamer btn-lg">Únete a la Comunidad</button>
    </div>
  </div>
</section>

      {/* Programa LevelUp Interactivo */}
      <section id="fidelizacion" className="py-5 bg-dark text-white">
        <div className="container">
          <header className="text-center mb-5">
            <h2 className="display-4 fw-bold text-success mb-3">PROGRAMA LEVELUP ⚡</h2>
            <p className="text-light fs-5">Sube de nivel y desbloquea recompensas épicas 🎁</p>
          </header>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="level-card text-center">
                <div className="mario-character">👶</div>
                <h3 className="h4 text-white mb-3">NIVEL ROOKIE</h3>
                <div className="progress-bar-gamer">
                  <div className="progress-fill bg-success" style={{width: '30%'}}></div>
                </div>
                <p className="text-light">5% DESCUENTO + Bienvenida Épica</p>
                <p className="text-secondary small">0 - 500 puntos</p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="level-card text-center">
                <div className="mario-character">💪</div>
                <h3 className="h4 text-white mb-3">NIVEL PRO GAMER</h3>
                <div className="progress-bar-gamer">
                  <div className="progress-fill bg-primary" style={{width: '60%'}}></div>
                </div>
                <p className="text-light">10% DESCUENTO + Productos Exclusivos</p>
                <p className="text-secondary small">501 - 1500 puntos</p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="level-card text-center">
                <div className="mario-character">👑</div>
                <h3 className="h4 text-white mb-3">NIVEL LEGENDARIO</h3>
                <div className="progress-bar-gamer">
                  <div className="progress-fill bg-warning" style={{width: '90%'}}></div>
                </div>
                <p className="text-light">20% DESCUENTO + Eventos VIP</p>
                <p className="text-secondary small">1501+ puntos</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <button className="btn btn-gamer btn-lg">
              <i className="bi bi-rocket-takeoff me-2"></i> 
              ¡COMIENZA TU AVENTURA!
            </button>
          </div>
        </div>
      </section>

      {/* Reseñas de Nuestros Clientes Épicas */}
      <section id="reseñas" className="py-5 bg-black text-white">
        <div className="container">
          <header className="text-center mb-5">
            <h2 className="display-4 fw-bold text-primary mb-3">RESEÑAS DE NUESTROS CLIENTES</h2>
            <p className="text-light fs-5">Lo que dicen los gamers sobre nosotros ⭐</p>
          </header>

          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="review-card">
                <div className="d-flex align-items-center mb-3">
                  <div className="mario-character">😎</div>
                  <div className="ms-3">
                    <h4 className="h6 mb-0 text-white">Carlos "ProGamer" Méndez</h4>
                    <div className="text-warning">★★★★★</div>
                  </div>
                </div>
                <p className="text-light">
                  "Compré mi setup completo y todo llegó perfecto. El servicio post-venta es increíble, siempre están dispuestos a ayudar. ¡Recomendado 100%!"
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="review-card">
                <div className="d-flex align-items-center mb-3">
                  <div className="mario-character">🎮</div>
                  <div className="ms-3">
                    <h4 className="h6 mb-0 text-white">Ana "GameQueen" Rodríguez</h4>
                    <div className="text-warning">★★★★☆</div>
                  </div>
                </div>
                <p className="text-light">
                  "Los puntos LevelUp me encantan, ya canjeé varios descuentos. La comunidad es muy activa y los eventos son geniales. ¡Sigan así!"
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="review-card">
                <div className="d-flex align-items-center mb-3">
                  <div className="mario-character">⚡</div>
                  <div className="ms-3">
                    <h4 className="h6 mb-0 text-white">Miguel "SpeedRunner" Torres</h4>
                    <div className="text-warning">★★★★★</div>
                  </div>
                </div>
                <p className="text-light">
                  "El envío express es real, en 24h tenía mi nuevo mouse. La calidad de los productos es excelente y los precios son justos. ¡Volveré a comprar!"
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <button className="btn btn-gamer btn-lg">
              <i className="bi bi-pencil-square me-2"></i> 
              DEJAR TU RESEÑA ÉPICA
            </button>
          </div>
        </div>
      </section>

      {/* Eventos Gamer en Chile Mejorado */}
      <section id="eventos" className="py-5 bg-dark text-white">
        <div className="container">
          <header className="text-center mb-5">
            <h2 className="display-4 fw-bold text-success mb-3">EVENTOS GAMER EN CHILE</h2>
            <p className="text-light fs-5">No te pierdas los mejores eventos del país 🗺️</p>
          </header>

          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-4">
              <div className="mario-character">🎯</div>
              <h3 className="h4 text-primary mb-3">¡PARTICIPA Y GANA PUNTOS LEVELUP!</h3>
              <p className="text-light mb-4">
                Asiste a eventos oficiales y suma puntos en tu cuenta LevelUp. 
                Torneos de eSports, lanzamientos exclusivos y ferias tecnológicas te esperan.
              </p>
              
              <div className="feature-card p-3 mb-3">
                <h5 className="text-warning">🏆 Santiago Game Expo</h5>
                <p className="text-light small">15-17 Marzo 2024 | +500 Puntos LevelUp</p>
              </div>
              <div className="feature-card p-3 mb-3">
                <h5 className="text-warning">⚡ Torneo Nacional eSports</h5>
                <p className="text-light small">5 Abril 2024 | +1000 Puntos LevelUp</p>
              </div>
              <div className="feature-card p-3">
                <h5 className="text-warning">🎮 Feria Gamer Concepción</h5>
                <p className="text-light small">20 Mayo 2024 | +300 Puntos LevelUp</p>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="map-container">
                <div className="ratio ratio-16x9">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26630.963406591197!2d-70.6692656!3d-33.4488897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c57e6bbf0f6d%3A0x76aa1e7a65bb3c4!2sSantiago%2C%20Chile!5e0!3m2!1ses!2scl!4v1685834958045!5m2!1ses!2scl" 
                    style={{border: "0"}} 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Épico */}
      <section id="contacto" className="py-5 bg-black text-white">
        <div className="container text-center">
          <header className="mb-5">
            <h2 className="display-4 fw-bold text-primary mb-3">CONTACTO</h2>
            <p className="text-light fs-5">¿Listo para subir de nivel? Escríbenos ✉️</p>
          </header>

          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="feature-card p-5">
                <div className="mario-character">📞</div>
                <h4 className="text-white mb-4">HABLEMOS</h4>
                
                <div className="d-flex flex-column gap-3">
                  <a href="mailto:contacto@levelupgamer.cl" className="btn btn-outline-light">
                    <i className="bi bi-envelope-fill me-2"></i> 
                    contacto@levelupgamer.cl
                  </a>
                  
                  <a href="https://wa.me/56912345678" className="btn btn-outline-success">
                    <i className="bi bi-whatsapp me-2"></i> 
                    +56 9 1234 5678
                  </a>
                  
                  <a href="#" className="btn btn-outline-primary">
                    <i className="bi bi-messenger me-2"></i> 
                    Messenger
                  </a>
                </div>

                <div className="mt-4 pt-3 border-top border-secondary">
                  <small className="text-light">
                    ⚡ Soporte 24/7 para la comunidad gamer
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};