import React from 'react'

export const Home = () => {
  return (
    <>

      <section id="inicio" className="py-5 text-center bg-dark text-white">
        <div className="container">
          <div className="row align-items-center g-4">
            
            <div className="col-12 col-lg-6 text-lg-start">
              <h1 className="display-4 fw-bold mb-3">
                Bienvenido a <span className="text-primary">Level Up Gamer</span>
              </h1>
              <p className="lead mb-4 text-secondary">
                La tienda online gamer que es para ti!. Consolas, accesorios, PCs, sillas y mucho más al mejor precio.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <a href="#catalogo" className="btn btn-gamer btn-lg">
                  <i className="bi bi-controller"></i> Ver Catálogo
                </a>
                <a href="#comunidad" className="btn btn-outline-light btn-lg">
                  <i className="bi bi-people-fill"></i> Únete a la Comunidad
                </a>
              </div>
            </div>

            <div className="col-12 col-lg-6 text-center">
              <img 
                src="assets/logo_gamer.png" 
                alt="Level Up Gamer Logo" 
                className="img-fluid rounded shadow-lg" 
                style={{maxWidth: "350px"}} 
              />
            </div>

          </div>
        </div>
      </section>

      <section id="mision-vision" className="py-5 bg-black text-white">
        <div className="container">
          <header className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary">Nuestra Identidad</h2>
            <p className="text-secondary">Conoce más sobre quiénes somos y hacia dónde vamos 🚀</p>
          </header>

          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <div className="card h-100 bg-dark border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-shop display-4 text-success mb-3"></i>
                  <h3 className="h4 text-white">Enunciado</h3>
                  <p className="text-secondary">
                    Level-Up Gamer es una tienda online dedicada a satisfacer las necesidades
                    de los entusiastas de los videojuegos en Chile. Ofrecemos consolas, accesorios,
                    computadores y mucho más, con despacho a todo el país.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card h-100 bg-dark border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-bullseye display-4 text-primary mb-3"></i>
                  <h3 className="h4 text-white">Misión</h3>
                  <p className="text-secondary">
                    Proporcionar productos de alta calidad para gamers en todo Chile, 
                    ofreciendo una experiencia de compra única y personalizada, 
                    enfocada en la satisfacción del cliente y el crecimiento de la comunidad gamer.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card h-100 bg-dark border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-stars display-4 text-warning mb-3"></i>
                  <h3 className="h4 text-white">Visión</h3>
                  <p className="text-secondary">
                    Ser la tienda online líder en productos para gamers en Chile, 
                    reconocida por innovación, servicio al cliente excepcional, 
                    y un programa de fidelización basado en gamificación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalogo" className="py-5 bg-dark text-white">
        <div className="container">
          <header className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary">Catálogo de Productos</h2>
            <p className="text-secondary">Explora nuestras categorías gamer 🎮</p>
          </header>

          <div className="row justify-content-center mb-4">
            <div className="col-12 col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-black text-secondary border-secondary">
                  <i className="bi bi-search"></i>
                </span>
                <input id="searchCatalogo" type="text" 
                      className="form-control bg-black text-white border-secondary" 
                      placeholder="Buscar producto..." />
                <button id="clearSearch" className="btn btn-outline-light">Limpiar</button>
              </div>
            </div>
          </div>

          <ul className="nav nav-pills justify-content-center mb-4" id="catalogoTabs" role="tablist">
            <li className="nav-item"><button className="nav-link active" data-bs-toggle="pill" data-bs-target="#juegos">Juegos de Mesa</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#accesorios">Accesorios</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#consolas">Consolas</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#pcs">Computadores</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#sillas">Sillas</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#mouse">Mouse</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#mousepad">Mousepad</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#poleras">Poleras</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#polerones">Polerones</button></li>
          </ul>

          <div className="tab-content">
            <div className="tab-pane fade show active" id="juegos">
              <div className="row g-4">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="card h-100 bg-black border-0 shadow-sm">
                    <img src="assets/img/cartasGamer.png" className="card-img-top" alt="Juegos de Mesa" />
                    <div className="card-body text-center">
                      <h5 className="card-title text-white">Juego de Cartas Gamer</h5>
                      <p className="card-text text-secondary">$24.990</p>
                      <button type="button" className="btn btn-gamer btn-sm"><i className="bi bi-cart-plus"></i> Agregar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="accesorios">
              <div className="row g-4">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="card h-100 bg-black border-0 shadow-sm">
                    <img src="assets/img/headset.png" className="card-img-top" alt="Accesorios" />
                    <div className="card-body text-center">
                      <h5 className="card-title text-white">Headset Gamer</h5>
                      <p className="card-text text-secondary">$49.990</p>
                      <button type="button" className="btn btn-gamer btn-sm"><i className="bi bi-cart-plus"></i> Agregar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="consolas">
              <div className="row g-4">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="card h-100 bg-black border-0 shadow-sm">
                    <img src="assets/img/ps5.png" className="card-img-top" alt="Consola" />
                    <div className="card-body text-center">
                      <h5 className="card-title text-white">Consola Next Gen</h5>
                      <p className="card-text text-secondary">$499.990</p>
                      <button type="button" className="btn btn-gamer btn-sm"><i className="bi bi-cart-plus"></i> Agregar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="pcs">
              <div className="row g-4">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="card h-100 bg-black border-0 shadow-sm">
                    <img src="assets/img/pc.png" className="card-img-top" alt="PC Gamer" />
                    <div className="card-body text-center">
                      <h5 className="card-title text-white">PC Gamer RTX</h5>
                      <p className="card-text text-secondary">$899.990</p>
                      <button type="button" className="btn btn-gamer btn-sm"><i className="bi bi-cart-plus"></i> Agregar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="sillas">
              <div className="row g-4">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="card h-100 bg-black border-0 shadow-sm">
                    <img src="assets/img/silla.png" className="card-img-top" alt="Silla Gamer" />
                    <div className="card-body text-center">
                      <h5 className="card-title text-white">Silla Gamer Pro</h5>
                      <p className="card-text text-secondary">$199.990</p>
                      <button type="button" className="btn btn-gamer btn-sm"><i className="bi bi-cart-plus"></i> Agregar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="mouse">
              <div className="row g-4">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="card h-100 bg-black border-0 shadow-sm">
                    <img src="assets/img/mouse.png" className="card-img-top" alt="Mouse Gamer" />
                    <div className="card-body text-center">
                      <h5 className="card-title text-white">Mouse RGB</h5>
                      <p className="card-text text-secondary">$29.990</p>
                      <button type="button" className="btn btn-gamer btn-sm"><i className="bi bi-cart-plus"></i> Agregar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="mousepad">
              <div className="row g-4">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="card h-100 bg-black border-0 shadow-sm">
                    <img src="assets/img/pad.png" className="card-img-top" alt="Mousepad" />
                    <div className="card-body text-center">
                      <h5 className="card-title text-white">Mousepad XL</h5>
                      <p className="card-text text-secondary">$14.990</p>
                      <button type="button" className="btn btn-gamer btn-sm"><i className="bi bi-cart-plus"></i> Agregar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="poleras">
              <div className="row g-4">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="card h-100 bg-black border-0 shadow-sm">
                    <img src="assets/img/polera.png" className="card-img-top" alt="Polera Gamer" />
                    <div className="card-body text-center">
                      <h5 className="card-title text-white">Polera Gamer</h5>
                      <p className="card-text text-secondary">$19.990</p>
                      <button type="button" className="btn btn-gamer btn-sm"><i className="bi bi-cart-plus"></i> Agregar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="polerones">
              <div className="row g-4">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="card h-100 bg-black border-0 shadow-sm">
                    <img src="assets/img/poleron.png" className="card-img-top" alt="Polerón Gamer" />
                    <div className="card-body text-center">
                      <h5 className="card-title text-white">Polerón Gamer</h5>
                      <p className="card-text text-secondary">$29.990</p>
                      <button type="button" className="btn btn-gamer btn-sm"><i className="bi bi-cart-plus"></i> Agregar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="social" className="py-5 bg-black text-white">
        <div className="container text-center">
          <header className="mb-5">
            <h2 className="display-5 fw-bold text-primary">Comparte tu Experiencia</h2>
            <p className="text-secondary">Ayuda a que más gamers descubran Level Up Gamer ⚡</p>
          </header>

          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://levelupgamer.cl" 
              target="_blank" className="btn btn-outline-light" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i> Compartir en Facebook
            </a>

            <a href="https://twitter.com/intent/tweet?url=https://levelupgamer.cl&text=🔥%20Mira%20estos%20productos%20gamer%20increíbles!" 
              target="_blank" className="btn btn-outline-light" rel="noopener noreferrer">
              <i className="bi bi-twitter-x"></i> Compartir en Twitter
            </a>

            <a href="https://api.whatsapp.com/send?text=🎮%20Revisa%20los%20mejores%20productos%20gamer%20en%20https://levelupgamer.cl" 
              target="_blank" className="btn btn-outline-light" rel="noopener noreferrer">
              <i className="bi bi-whatsapp"></i> Compartir en WhatsApp
            </a>

            <a href="https://instagram.com/levelupgamer" target="_blank" className="btn btn-outline-light" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i> Síguenos en Instagram
            </a>
          </div>
        </div>
      </section>

      <section id="comunidad" className="py-5 bg-black text-white">
        <div className="container">
          <header className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary">Comunidad Gamer</h2>
            <p className="text-secondary">Noticias, consejos y guías para llevar tu experiencia al siguiente nivel ⚡</p>
          </header>

          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <article className="card h-100 bg-dark border-0 shadow-sm">
                <img src="assets/img/headset.png" className="card-img-top" alt="Noticia gamer 1" />
                <div className="card-body d-flex flex-column">
                  <h3 className="h5 text-white">🎮 Top 5 accesorios gamer del 2025</h3>
                  <p className="text-secondary flex-grow-1">
                    Descubre cuáles son los gadgets que no pueden faltar en tu setup gamer este año.
                  </p>
                  <a href="https://www.educaciontrespuntocero.com/tecnologia/accesorios-para-gamers/" className="btn btn-outline-light mt-auto" target="_blank" rel="noopener noreferrer">Leer más</a>
                </div>
              </article>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <article className="card h-100 bg-dark border-0 shadow-sm">
                <img src="assets/img/silla.png" className="card-img-top" alt="Noticia gamer 2" />
                <div className="card-body d-flex flex-column">
                  <h3 className="h5 text-white">🔥 Consejos para mejorar tu setup</h3>
                  <p className="text-secondary flex-grow-1">
                    Optimiza tu espacio gamer con tips de ergonomía, iluminación y hardware.
                  </p>
                  <a href="https://www.youtube.com/watch?v=UeiTuWNUaEs" className="btn btn-outline-light mt-auto" target="_blank" rel="noopener noreferrer">Ver más</a>
                </div>
              </article>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <article className="card h-100 bg-dark border-0 shadow-sm">
                <img src="assets/img/expogame.png" className="card-img-top" alt="Noticia gamer 3" />
                <div className="card-body d-flex flex-column">
                  <h3 className="h5 text-white">⚡ Próximos eventos gamer en Chile</h3>
                  <p className="text-secondary flex-grow-1">
                    Entérate de los torneos, lanzamientos y ferias gamers que se vienen este año.
                  </p>
                  <a href="https://www.expogamechile.cl/" className="btn btn-outline-light mt-auto" target="_blank" rel="noopener noreferrer">Leer más</a>
                </div>
              </article>
            </div>
          </div>

          <div className="text-center mt-5">
            <a href="#" className="btn btn-gamer btn-lg">
              <i className="bi bi-chat-dots-fill"></i> Ver más artículos
            </a>
          </div>
        </div>
      </section>

      <section id="fidelizacion" className="py-5 bg-dark text-white">
        <div className="container">
          <header className="text-center mb-5">
            <h2 className="display-5 fw-bold text-success">Programa LevelUp ⚡</h2>
            <p className="text-secondary">Gana puntos con tus compras, sube de nivel y obtén recompensas exclusivas 🎁</p>
          </header>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card h-100 bg-black border border-success shadow-sm text-center p-3">
                <i className="bi bi-joystick display-4 text-success mb-3"></i>
                <h3 className="h5 text-white">Nivel 1 - Rookie</h3>
                <p className="text-secondary">Acumula 0 a 500 Puntos LevelUp y obtén un 5% de descuento en tu primera compra.</p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 bg-black border border-primary shadow-sm text-center p-3">
                <i className="bi bi-trophy display-4 text-primary mb-3"></i>
                <h3 className="h5 text-white">Nivel 2 - Pro Gamer</h3>
                <p className="text-secondary">Acumula 501 a 1500 Puntos LevelUp y accede a un 10% de descuento + productos exclusivos.</p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 bg-black border border-warning shadow-sm text-center p-3">
                <i className="bi bi-star-fill display-4 text-warning mb-3"></i>
                <h3 className="h5 text-white">Nivel 3 - Legendario</h3>
                <p className="text-secondary">Más de 1500 Puntos LevelUp: 20% de descuento, acceso anticipado a lanzamientos y eventos exclusivos.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <a href="#registro" data-bs-toggle="modal" data-bs-target="#registerModal" className="btn btn-gamer btn-lg">
              <i className="bi bi-rocket-takeoff"></i> ¡Únete y comienza a ganar puntos!
            </a>
          </div>
        </div>
      </section>

      <section id="reseñas" className="py-5 bg-black text-white">
        <div className="container">
          <header className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary">Reseñas de Gamers</h2>
            <p className="text-secondary">Lo que dicen nuestros clientes sobre Level Up Gamer ⭐</p>
          </header>

          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 bg-dark border-0 shadow-sm p-3">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-person-circle fs-2 me-2 text-primary"></i>
                  <h3 className="h6 mb-0 text-white">Carlos Méndez</h3>
                </div>
                <p className="text-secondary flex-grow-1">
                  Compré mi silla gamer aquí y llegó rapidísimo. Excelente calidad y servicio ⭐⭐⭐⭐⭐
                </p>
                <div className="text-warning">
                  ★★★★★
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 bg-dark border-0 shadow-sm p-3">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-person-circle fs-2 me-2 text-success"></i>
                  <h3 className="h6 mb-0 text-white">María López</h3>
                </div>
                <p className="text-secondary flex-grow-1">
                  Los precios son buenísimos y el sistema de puntos LevelUp me encanta. ⭐⭐⭐⭐☆
                </p>
                <div className="text-warning">
                  ★★★★☆
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 bg-dark border-0 shadow-sm p-3">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-person-circle fs-2 me-2 text-danger"></i>
                  <h3 className="h6 mb-0 text-white">Ignacio Torres</h3>
                </div>
                <p className="text-secondary flex-grow-1">
                  Compré una consola y todo perfecto. Recomendados al 100% ⭐⭐⭐⭐⭐
                </p>
                <div className="text-warning">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <button className="btn btn-outline-light btn-lg" data-bs-toggle="modal" data-bs-target="#reviewModal">
              <i className="bi bi-pencil-square"></i> Dejar una Reseña
            </button>
          </div>
        </div>
      </section>

      <section id="eventos" className="py-5 bg-dark text-white">
  <div className="container">
    <header className="text-center mb-5">
      <h2 className="display-5 fw-bold text-success">Eventos Gamer en Chile</h2>
      <p className="text-secondary">Ubica los torneos, ferias y lanzamientos más importantes del país 🗺️</p>
    </header>

    <div className="row g-4 align-items-center">
      <div className="col-12 col-lg-4">
        <h3 className="h5 text-primary">¡Participa y gana Puntos LevelUp!</h3>
        <p className="text-secondary">
          Asiste a eventos oficiales y suma puntos en tu cuenta LevelUp. 
          Torneos de eSports, lanzamientos exclusivos y ferias tecnológicas. 
        </p>
        <ul className="list-unstyled text-secondary">
          <li>🎮 Santiago Game Expo</li>
          <li>⚡ Torneo Nacional de eSports</li>
          <li>🕹️ Feria Gamer Concepción</li>
          <li>🔥 Lanzamiento de consolas 2025</li>
        </ul>
      </div>

      <div className="col-12 col-lg-8">
        <div className="ratio ratio-16x9 rounded shadow">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26630.963406591197!2d-70.6692656!3d-33.4488897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c57e6bbf0f6d%3A0x76aa1e7a65bb3c4!2sSantiago%2C%20Chile!5e0!3m2!1ses!2scl!4v1685834958045!5m2!1ses!2scl" 
            width={600} 
            height={450} 
            style={{border: "0"}} 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="contacto" className="py-5 bg-black text-white">
  <div className="container" style={{maxWidth: "720px"}}>
    <header className="text-center mb-5">
      <h2 className="display-5 fw-bold text-primary">Contacto</h2>
      <p className="text-secondary">¿Tienes dudas, sugerencias o quieres cotizar? Escríbenos ✉️</p>
    </header>

    <div className="text-center mt-4">
      <a href="mailto:contacto@levelupgamer.cl" className="text-secondary me-3">
        <i className="bi bi-envelope-fill"></i> contacto@levelupgamer.cl
      </a>
      <a href="https://wa.me/56912345678" target="_blank" className="text-success" rel="noopener noreferrer">
        <i className="bi bi-whatsapp"></i> WhatsApp
      </a>
    </div>
  </div>
</section>
</>)}