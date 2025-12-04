import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/users";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[e.target.name]) {
      setErrors(prev => ({...prev, [e.target.name]: ''}));
    }
  };

  // Validar email
  const isValidEmail = (email: string): boolean => {
    const validDomains = ['@duocuc.cl', '@gmail.com', '@profesor.duoc.cl'];
    return validDomains.some(domain => email.endsWith(domain));
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Validar email
    if (!form.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!isValidEmail(form.correo)) {
      newErrors.correo = "Solo correos de @duocuc.cl, @gmail.com o @profesor.duoc.cl";
    }

    // Validar contraseña
    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(form);
      
      localStorage.setItem("token", response.token);
      localStorage.setItem("usuario", JSON.stringify(response.usuario));
      
      // Mostrar mensaje de bienvenida
      alert(`¡Login exitoso! Bienvenido/a ${response.usuario.nombre}`);
      navigate("/");
    } catch (error: any) {
      console.error("Error en login:", error);
      
      // Manejar errores específicos
      if (error.response?.status === 401) {
        const errorMsg = error.response.data;
        if (errorMsg.includes("Correo")) {
          setErrors(prev => ({...prev, correo: "Correo no encontrado"}));
        } else if (errorMsg.includes("Contrasena")) {
          setErrors(prev => ({...prev, password: "Contraseña incorrecta"}));
        } else {
          alert("Credenciales incorrectas");
        }
      } else {
        alert(error.response?.data?.message || error.response?.data || "Error en el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card card-gamer auth-card" style={{ margin: '3rem 0' }}>
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-gamer">
                <i className="bi bi-controller me-2"></i>
                Iniciar Sesión
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    className={`form-control form-gamer ${errors.correo ? 'is-invalid' : ''}`}
                    id="correo"
                    name="correo"
                    placeholder="ejemplo@duocuc.cl"
                    required
                    value={form.correo}
                    onChange={handleChange}
                  />
                  {errors.correo && (
                    <div className="invalid-feedback d-block">
                      {errors.correo}
                    </div>
                  )}
                  {!errors.correo && (
                    <small className="text-muted">
                      Solo correos de @duocuc.cl, @gmail.com o @profesor.duoc.cl
                    </small>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    className={`form-control form-gamer ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    value={form.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Recordar contraseña */}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                  />
                  <label className="form-check-label text-light" htmlFor="remember">
                    Recordar mi sesión
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-gamer w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Iniciando sesión...
                    </>
                  ) : (
                    'Ingresar'
                  )}
                </button>

                {/* Opción de recuperación de contraseña */}
                <div className="text-center mb-3">
                  <Link to="#" className="text-gamer text-decoration-none">
                    <small>
                      <i className="bi bi-key me-1"></i>
                      ¿Olvidaste tu contraseña?
                    </small>
                  </Link>
                </div>

                <div className="text-center">
                  <span className="text-light">¿No tienes cuenta? </span>
                  <Link to="/register" className="text-gamer text-decoration-none">
                    Regístrate aquí
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;