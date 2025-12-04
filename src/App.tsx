import './index.css'
import { Home } from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
// Importa las páginas de Login y Register (si las tienes)
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Layout> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          {/* Agregar estas rutas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App