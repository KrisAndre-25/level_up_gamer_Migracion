import React from 'react'

export const Footer = () => {
  return (
    <footer className="py-5 bg-dark text-white-50" style={{ marginTop: 'auto' }}>
      <div className="container">
        <div className="row gy-4">
          
          {/* Logo y descripción */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <img 
              src="src/assets/img/logo_gamer.png" 
              alt="Logo Level Up Gamer" 
              width="60" 
              className="mb-3" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <p className="small">
              Level Up Gamer es tu tienda online gamer en Chile 🎮. Consolas, accesorios y más,
              con despacho a todo el país.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-6 col-md-4">
            <h5 className="text-white">Enlaces</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/" className="text-decoration-none text-secondary">Inicio</a>
              </li>
              <li className="mb-2">
                <a href="/products" className="text-decoration-none text-secondary">Catálogo</a>
              </li>
              <li className="mb-2">
                <a href="#mision-vision" className="text-decoration-none text-secondary">Misión & Visión</a>
              </li>
              <li className="mb-2">
                <a href="#comunidad" className="text-decoration-none text-secondary">Comunidad</a>
              </li>
              <li className="mb-2">
                <a href="#contacto" className="text-decoration-none text-secondary">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="col-6 col-md-4 text-center text-md-start">
            <h5 className="text-white">Síguenos</h5>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#" className="text-secondary fs-4">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-secondary fs-4">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-secondary fs-4">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="text-secondary fs-4">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
            
            {/* Información de contacto */}
            <div className="mt-3 small">
              <div>
                <i className="bi bi-envelope me-2"></i>
                <span>contacto@levelupgamer.cl</span>
              </div>
              <div className="mt-1">
                <i className="bi bi-whatsapp me-2"></i>
                <span>+56 9 1234 5678</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center small">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Level Up Gamer. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}