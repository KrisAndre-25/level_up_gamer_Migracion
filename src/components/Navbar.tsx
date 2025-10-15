import React from 'react'

export const Navbar = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top border-bottom border-primary">
  <div className="container">
    <li className="nav-item ms-lg-3">
      <a className="btn btn-outline-light btn-sm" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">
        <i className="bi bi-box-arrow-in-right"></i> Login
      </a>
    </li>
    <a className="btn btn-gamer btn-sm" href="carrito.html">
      <i className="bi bi-cart4"></i> Carrito
    </a>

    <a className="navbar-brand d-flex align-items-center" href="#inicio">
      <img src="assets/logo_gamer.png" alt="Logo Level Up Gamer" width="50" height="50" className="me-2" />
      <span className="fw-bold text-uppercase">Level Up Gamer</span>
    </a>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item"><a className="nav-link active" href="#inicio">Inicio</a></li>
        <li className="nav-item"><a className="nav-link" href="#catalogo">Catálogo</a></li>
        <li className="nav-item"><a className="nav-link" href="#mision-vision">Misión & Visión</a></li>
        <li className="nav-item"><a className="nav-link" href="#comunidad">Comunidad</a></li>
        <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
