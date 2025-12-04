import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/users";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    confirmPassword: "",
    fechaNacimiento: "",
    tipoUsuario: "GAMER",
    nombreGamer: "",
    nivel: 1,
    puntosExperiencia: 0
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

  // Validar edad
  const isAdult = (fechaNacimiento: string): boolean => {
    const birthDate = new Date(fechaNacimiento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18;
  };

  // Validar contraseña segura
  const isStrongPassword = (password: string): {valid: boolean, errors: string[]} => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push("La contraseña debe tener al menos 8 caracteres");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("La contraseña debe contener al menos una mayúscula");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("La contraseña debe contener al menos una minúscula");
    }
    if (!/\d/.test(password)) {
      errors.push("La contraseña debe contener al menos un número");
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Validar nombre
    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    // Validar apellido
    if (!form.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    }

    // Validar nombre gamer
    if (!form.nombreGamer.trim()) {
      newErrors.nombreGamer = "El nombre gamer es obligatorio";
    }

    // Validar email
    if (!form.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!isValidEmail(form.correo)) {
      newErrors.correo = "El correo debe terminar en @duocuc.cl, @gmail.com o @profesor.duoc.cl";
    }

    // Validar fecha de nacimiento
    if (!form.fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    } else if (!isAdult(form.fechaNacimiento)) {
      newErrors.fechaNacimiento = "Debes ser mayor de edad (18 años o más)";
    }

    // Validar contraseña
    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else {
      const passwordValidation = isStrongPassword(form.password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.errors.join(", ");
      }
    }

    // Validar confirmación de contraseña
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar la contraseña";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
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
      // Preparar datos para enviar (sin confirmPassword)
      const userData = {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        correo: form.correo.trim(),
        password: form.password,
        fechaNacimiento: form.fechaNacimiento,
        tipoUsuario: form.tipoUsuario,
        nombreGamer: form.nombreGamer.trim(),
        nivel: form.nivel,
        puntosExperiencia: form.puntosExperiencia
      };

      const response = await registerUser(userData);
      
      // Si el registro fue exitoso, también iniciamos sesión automáticamente
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("usuario", JSON.stringify(response.usuario));
        
        alert("¡Registro exitoso! Bienvenido/a " + form.nombre);
        navigate("/");
      } else {
        // Intentar login después del registro
        const loginResponse = await fetch("http://localhost:8081/api/v1/usuarios/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correo: form.correo,
            password: form.password
          })
        });
        
        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("usuario", JSON.stringify(loginData.usuario));
          
          alert("¡Registro exitoso! Bienvenido/a " + form.nombre);
          navigate("/");
        } else {
          alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
          navigate("/login");
        }
      }
    } catch (error: any) {
      console.error("Error en registro:", error);
      
      // Manejo específico de errores del backend
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        if (errorData.includes("correo")) {
          setErrors(prev => ({...prev, correo: "Este correo ya está registrado"}));
        }
      } else {
        alert(error.response?.data?.message || error.response?.data || "Error al registrar usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  // Calcular edad para mostrar en tiempo real
  const calculateAge = (fechaNacimiento: string): string => {
    if (!fechaNacimiento) return "";
    
    const birthDate = new Date(fechaNacimiento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 0 ? `${age} años` : "Fecha inválida";
  };

  // Verificar fortaleza de contraseña en tiempo real
  const getPasswordStrength = (password: string): {score: number, color: string, text: string} => {
    if (!password) return {score: 0, color: "#666", text: ""};
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    
    const colors = ["#ff4444", "#ffbb33", "#00C851", "#00C851"];
    const texts = ["Débil", "Regular", "Buena", "Excelente"];
    
    return {
      score,
      color: colors[score - 1] || "#666",
      text: texts[score - 1] || ""
    };
  };

  const passwordStrength = getPasswordStrength(form.password);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card card-gamer auth-card" style={{ margin: '3rem 0' }}>
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-gamer">
                <i className="bi bi-person-plus me-2"></i>
                Crear Cuenta Gamer
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        className={`form-control form-gamer ${errors.nombre ? 'is-invalid' : ''}`}
                        id="nombre"
                        name="nombre"
                        placeholder="Tu nombre"
                        required
                        value={form.nombre}
                        onChange={handleChange}
                      />
                      {errors.nombre && (
                        <div className="invalid-feedback d-block">
                          {errors.nombre}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="apellido" className="form-label">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        className={`form-control form-gamer ${errors.apellido ? 'is-invalid' : ''}`}
                        id="apellido"
                        name="apellido"
                        placeholder="Tu apellido"
                        required
                        value={form.apellido}
                        onChange={handleChange}
                      />
                      {errors.apellido && (
                        <div className="invalid-feedback d-block">
                          {errors.apellido}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="nombreGamer" className="form-label">
                    Nombre Gamer *
                  </label>
                  <input
                    type="text"
                    className={`form-control form-gamer ${errors.nombreGamer ? 'is-invalid' : ''}`}
                    id="nombreGamer"
                    name="nombreGamer"
                    placeholder="Tu nickname gamer"
                    required
                    value={form.nombreGamer}
                    onChange={handleChange}
                  />
                  {errors.nombreGamer && (
                    <div className="invalid-feedback d-block">
                      {errors.nombreGamer}
                    </div>
                  )}
                </div>

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
                  {errors.correo ? (
                    <div className="invalid-feedback d-block">
                      {errors.correo}
                    </div>
                  ) : (
                    <small className="text-muted">
                      Solo correos de @duocuc.cl, @gmail.com o @profesor.duoc.cl
                    </small>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
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
                      
                      {/* Indicador de fortaleza de contraseña */}
                      {form.password && (
                        <div className="mt-2">
                          <div className="d-flex align-items-center">
                            <div className="progress flex-grow-1" style={{ height: '5px' }}>
                              <div 
                                className="progress-bar" 
                                style={{ 
                                  width: `${(passwordStrength.score / 4) * 100}%`,
                                  backgroundColor: passwordStrength.color,
                                  transition: 'width 0.3s ease'
                                }}
                              ></div>
                            </div>
                            <small 
                              className="ms-2" 
                              style={{ color: passwordStrength.color, fontWeight: 'bold' }}
                            >
                              {passwordStrength.text}
                            </small>
                          </div>
                          <small className="text-muted">
                            Requerido: 8+ caracteres, mayúscula, minúscula, número
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirmar Contraseña *
                      </label>
                      <input
                        type="password"
                        className={`form-control form-gamer ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="••••••••"
                        required
                        value={form.confirmPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback d-block">
                          {errors.confirmPassword}
                        </div>
                      )}
                      {!errors.confirmPassword && form.confirmPassword && form.password === form.confirmPassword && (
                        <small className="text-success">
                          <i className="bi bi-check-circle me-1"></i>
                          Las contraseñas coinciden
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="fechaNacimiento" className="form-label">
                    Fecha de Nacimiento *
                  </label>
                  <input
                    type="date"
                    className={`form-control form-gamer ${errors.fechaNacimiento ? 'is-invalid' : ''}`}
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    required
                    value={form.fechaNacimiento}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.fechaNacimiento ? (
                    <div className="invalid-feedback d-block">
                      {errors.fechaNacimiento}
                    </div>
                  ) : (
                    form.fechaNacimiento && (
                      <small className={isAdult(form.fechaNacimiento) ? "text-success" : "text-danger"}>
                        <i className={`bi ${isAdult(form.fechaNacimiento) ? 'bi-check-circle' : 'bi-exclamation-circle'} me-1`}></i>
                        {calculateAge(form.fechaNacimiento)} - {
                          isAdult(form.fechaNacimiento) 
                            ? "Mayor de edad ✓" 
                            : "Menor de edad ✗"
                        }
                      </small>
                    )
                  )}
                </div>

                {/* Términos y condiciones */}
                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    required
                  />
                  <label className="form-check-label text-light" htmlFor="terms">
                    Acepto los términos y condiciones y la política de privacidad
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
                      Registrando...
                    </>
                  ) : (
                    'Crear Cuenta Gamer'
                  )}
                </button>

                <div className="text-center">
                  <span className="text-light">¿Ya tienes cuenta? </span>
                  <Link to="/login" className="text-gamer text-decoration-none">
                    Inicia sesión aquí
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

export default Register;