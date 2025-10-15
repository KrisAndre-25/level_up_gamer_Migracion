import React from 'react'

export const Footer = () => {
  return (
    <>
        <footer className="py-5 bg-dark text-white-50">
  <div className="container">
    <div className="row gy-4">
      
      <div className="col-12 col-md-4 text-center text-md-start">
        <img src="assets/logo_gamer.png" alt="Logo Level Up Gamer" width="60" className="mb-3" />
        <p className="small">
          Level Up Gamer es tu tienda online gamer en Chile 🎮. Consolas, accesorios y más,
          con despacho a todo el país.
        </p>
      </div>

      <div className="modal fade" id="loginModal" tabIndex={-1} aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-secondary">
              <h5 className="modal-title" id="loginModalLabel">Iniciar Sesión</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">Correo electrónico</label>
                  <input type="email" className="form-control bg-dark text-white border-secondary" id="loginEmail" placeholder="ejemplo@correo.com" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">Contraseña</label>
                  <input type="password" className="form-control bg-dark text-white border-secondary" id="loginPassword" placeholder="********" required />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-gamer">Ingresar</button>
                </div>
              </form>
              <p className="mt-3 small text-secondary text-center">
                ¿No tienes cuenta? <a href="#" data-bs-toggle="modal" data-bs-target="#registerModal" className="text-primary">Regístrate aquí</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="registerModal" tabIndex={-1} aria-labelledby="registerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-secondary">
              <h5 className="modal-title" id="registerModalLabel">Crear Cuenta</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="registerName" className="form-label">Nombre completo</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" id="registerName" placeholder="Tu nombre" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerEmail" className="form-label">Correo electrónico</label>
                  <input type="email" className="form-control bg-dark text-white border-secondary" id="registerEmail" placeholder="ejemplo@correo.com" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerAge" className="form-label">Edad</label>
                  <input type="number" className="form-control bg-dark text-white border-secondary" id="registerAge" placeholder="Ej: 20" min="18" required />
                  <small className="text-secondary">* Solo usuarios mayores de 18 años</small>
                </div>
                <div className="mb-3">
                  <label htmlFor="registerPassword" className="form-label">Contraseña</label>
                  <input type="password" className="form-control bg-dark text-white border-secondary" id="registerPassword" placeholder="********" required />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-gamer">Registrarse</button>
                </div>
              </form>
              <p className="mt-3 small text-secondary text-center">
                ¿Ya tienes cuenta? <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" className="text-primary">Inicia sesión</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6 col-md-4">
        <h5 className="text-white">Enlaces</h5>
        <ul className="list-unstyled small">
          <li><a href="#inicio" className="text-decoration-none text-secondary">Inicio</a></li>
          <li><a href="#catalogo" className="text-decoration-none text-secondary">Catálogo</a></li>
          <li><a href="#mision-vision" className="text-decoration-none text-secondary">Misión & Visión</a></li>
          <li><a href="#comunidad" className="text-decoration-none text-secondary">Comunidad</a></li>
          <li><a href="#contacto" className="text-decoration-none text-secondary">Contacto</a></li>
        </ul>
      </div>

      <div className="col-6 col-md-4 text-center text-md-start">
        <h5 className="text-white">Síguenos</h5>
        <div className="d-flex gap-3 justify-content-center justify-content-md-start">
          <a href="#" className="text-secondary fs-4"><i className="bi bi-facebook"></i></a>
          <a href="#" className="text-secondary fs-4"><i className="bi bi-instagram"></i></a>
          <a href="#" className="text-secondary fs-4"><i className="bi bi-twitter-x"></i></a>
          <a href="#" className="text-secondary fs-4"><i className="bi bi-youtube"></i></a>
        </div>
      </div>
    </div>

    <hr className="border-secondary my-4" />

    <div className="text-center small">
      <p className="mb-0">&copy; <span id="year"></span> Level Up Gamer. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>
    </>
  )
}