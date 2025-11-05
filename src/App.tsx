import './index.css'
import { Home } from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout' // ✅ Importar Layout

function App() {
  return (
    <Router>
      <Layout> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App